import type { Catalog } from './types.js';

const DATABASE = 'belajar-bahasa-arab-materi';
const STORE = 'packages';
const KEY = 'active';
const LOCAL_FALLBACK_KEY = 'belajar-bahasa-arab:materi:v1';
// localStorage varies by browser; never make an oversized synchronous write.
const MAX_LOCAL_FALLBACK_LENGTH = 1_500_000;

function readLocalFallback(): unknown {
	try {
		const json = localStorage.getItem(LOCAL_FALLBACK_KEY);
		return json ? JSON.parse(json) : undefined;
	} catch {
		return undefined;
	}
}

function openCatalog() {
	return new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open(DATABASE, 1);
		request.onupgradeneeded = () => request.result.createObjectStore(STORE);
		request.onerror = () => reject(request.error);
		request.onblocked = () => reject(new Error('Penyimpanan materi sedang digunakan.'));
		request.onsuccess = () => {
			request.result.onversionchange = () => request.result.close();
			resolve(request.result);
		};
	});
}

async function readIndexedDb(): Promise<unknown> {
	const db = await openCatalog();
	try {
		return await new Promise((resolve, reject) => {
			const request = db.transaction(STORE, 'readonly').objectStore(STORE).get(KEY);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	} finally {
		db.close();
	}
}

async function writeIndexedDb(catalog: Catalog): Promise<void> {
	const db = await openCatalog();
	try {
		await new Promise<void>((resolve, reject) => {
			const transaction = db.transaction(STORE, 'readwrite');
			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
			transaction.onabort = () => reject(transaction.error);
			transaction.objectStore(STORE).put(catalog, KEY);
		});
	} finally {
		db.close();
	}
}

/** Prefer the versioned IndexedDB snapshot; try localStorage in restricted browsers. */
export async function readCatalog(): Promise<unknown> {
	try {
		const value = await readIndexedDb();
		if (value !== undefined) return value;
	} catch {
		// IndexedDB may be blocked in private browsing or restrictive WebViews.
	}
	return readLocalFallback();
}

/**
 * Preserve the existing last-good catalog until a complete, validated version
 * is downloaded. A small localStorage backup is only used if IndexedDB fails.
 */
export async function saveCatalog(catalog: Catalog): Promise<void> {
	try {
		await writeIndexedDb(catalog);
		try {
			localStorage.removeItem(LOCAL_FALLBACK_KEY);
		} catch {
			// IndexedDB is already durable; a blocked localStorage is harmless.
		}
		return;
	} catch (indexedDbError) {
		const serialized = JSON.stringify(catalog);
		if (serialized.length > MAX_LOCAL_FALLBACK_LENGTH) throw indexedDbError;
		try {
			localStorage.setItem(LOCAL_FALLBACK_KEY, serialized);
		} catch {
			throw indexedDbError;
		}
	}
}
