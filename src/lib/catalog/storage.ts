import type { Catalog } from './types.js';
import type { BulkSharafLexicon } from '#lib/domain/sharaf/bulk.js';

const DATABASE = 'belajar-bahasa-arab-materi';
const STORE = 'packages';
const BULK_STORE = 'sharaf-lexicon';
const BULK_LOCAL_KEY = 'belajar-bahasa-arab:sharaf-bulk:v1';
const BULK_LOCAL_MAX = 850_000;
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
		const request = indexedDB.open(DATABASE, 2);
		request.onupgradeneeded = () => {
			for (const store of [STORE, BULK_STORE]) {
				if (!request.result.objectStoreNames.contains(store)) {
					request.result.createObjectStore(store);
				}
			}
		};
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

/**
 * Bulk GPL lexicon uses its own IndexedDB object store. The existing small
 * learning catalog stays unchanged; migrating v1→v2 never clears it.
 */
export async function readBulkSharafCache(): Promise<unknown> {
	try {
		const db = await openCatalog();
		try {
			return await new Promise((resolve, reject) => {
				const request = db.transaction(BULK_STORE, 'readonly').objectStore(BULK_STORE).get(KEY);
				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject(request.error);
			});
		} finally {
			db.close();
		}
	} catch {
		return readBulkLocalFallback();
	}
}

function readBulkLocalFallback(): unknown {
	try {
		const value = localStorage.getItem(BULK_LOCAL_KEY);
		return value ? JSON.parse(value) : undefined;
	} catch {
		return undefined;
	}
}

export async function saveBulkSharafCache(
	data: BulkSharafLexicon
): Promise<'indexeddb' | 'localStorage' | 'none'> {
	try {
		const db = await openCatalog();
		try {
			await new Promise<void>((resolve, reject) => {
				const transaction = db.transaction(BULK_STORE, 'readwrite');
				transaction.objectStore(BULK_STORE).put(data, KEY);
				transaction.oncomplete = () => resolve();
				transaction.onerror = () => reject(transaction.error);
				transaction.onabort = () => reject(transaction.error);
			});
		} finally {
			db.close();
		}
		try {
			localStorage.removeItem(BULK_LOCAL_KEY);
		} catch {
			// The IndexedDB copy is already persisted.
		}
		return 'indexeddb';
	} catch {
		// Private browsing / restrictive WebViews may disable IndexedDB.
	}
	try {
		const text = JSON.stringify(data);
		if (text.length > BULK_LOCAL_MAX) return 'none';
		localStorage.setItem(BULK_LOCAL_KEY, text);
		return 'localStorage';
	} catch {
		return 'none';
	}
}
