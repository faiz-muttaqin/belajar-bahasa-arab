import type { Catalog } from './types.js';

const DATABASE = 'belajar-bahasa-arab-materi';
const STORE = 'packages';
const KEY = 'active';

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

export async function readCatalog(): Promise<unknown> {
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

export async function saveCatalog(catalog: Catalog) {
	const db = await openCatalog();
	try {
		await new Promise<void>((resolve, reject) => {
			const transaction = db.transaction(STORE, 'readwrite');
			transaction.oncomplete = () => resolve();
			transaction.onabort = () => reject(transaction.error);
			transaction.objectStore(STORE).put(catalog, KEY);
		});
	} finally {
		db.close();
	}
}
