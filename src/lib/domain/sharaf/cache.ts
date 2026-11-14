import type { SharafEntry } from './lexicon.js';

export const SHARAF_CACHE_SCHEMA = 1;
export type SharafCatalog = { schema: typeof SHARAF_CACHE_SCHEMA; entries: SharafEntry[] };
export type SharafCacheBackend = 'indexeddb' | 'localStorage' | 'none';

const DB_NAME = 'belajar-bahasa-arab-sharaf';
const STORE = 'catalog';
const KEY = 'current-v1';
const LS_KEY = 'belajar-bahasa-arab:sharaf-catalog:v1';

function record(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Validate the browser cache and the response before using either as content. */
export function parseSharafCatalog(value: unknown): SharafCatalog | null {
	if (!record(value) || value.schema !== SHARAF_CACHE_SCHEMA || !Array.isArray(value.entries)) {
		return null;
	}
	const valid = value.entries.every((entry) => {
		if (!record(entry) || !Array.isArray(entry.forms) || !Array.isArray(entry.sources)) {
			return false;
		}
		return (
			typeof entry.id === 'string' &&
			typeof entry.lemma === 'string' &&
			typeof entry.meaning === 'string' &&
			['verb', 'noun', 'particle'].includes(String(entry.partOfSpeech)) &&
			['lexical', 'rule', 'not-applicable'].includes(String(entry.babSelection)) &&
			['regular', 'special-rule', 'irregular', 'fixed'].includes(String(entry.formBehavior)) &&
			entry.sources.every((source: unknown) => typeof source === 'string') &&
			entry.forms.every(
				(form: unknown) =>
					record(form) && typeof form.label === 'string' && typeof form.value === 'string'
			) &&
			(entry.bab === undefined ||
				(record(entry.bab) &&
					typeof entry.bab.number === 'number' &&
					typeof entry.bab.exemplar === 'string' &&
					typeof entry.bab.pattern === 'string'))
		);
	});
	return valid ? (value as SharafCatalog) : null;
}

function openDb(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		if (typeof indexedDB === 'undefined') {
			reject(new Error('IndexedDB unavailable'));
			return;
		}
		const request = indexedDB.open(DB_NAME, 1);
		request.onupgradeneeded = () => {
			if (!request.result.objectStoreNames.contains(STORE)) {
				request.result.createObjectStore(STORE);
			}
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
		request.onblocked = () => reject(new Error('IndexedDB blocked'));
	});
}

async function readIndexedDb(): Promise<unknown> {
	const db = await openDb();
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

async function writeIndexedDb(catalog: SharafCatalog): Promise<void> {
	const db = await openDb();
	try {
		await new Promise<void>((resolve, reject) => {
			const transaction = db.transaction(STORE, 'readwrite');
			transaction.objectStore(STORE).put(catalog, KEY);
			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
			transaction.onabort = () => reject(transaction.error);
		});
	} finally {
		db.close();
	}
}

export async function readSharafCache(): Promise<SharafCatalog | null> {
	try {
		const cached = parseSharafCatalog(await readIndexedDb());
		if (cached) return cached;
	} catch {
		// Some browsers disable IndexedDB in private browsing modes.
	}
	try {
		return parseSharafCatalog(JSON.parse(localStorage.getItem(LS_KEY) ?? 'null'));
	} catch {
		return null;
	}
}

export async function writeSharafCache(catalog: SharafCatalog): Promise<SharafCacheBackend> {
	if (!parseSharafCatalog(catalog)) return 'none';
	try {
		await writeIndexedDb(catalog);
		return 'indexeddb';
	} catch {
		// Gracefully try localStorage for smaller datasets.
	}
	try {
		localStorage.setItem(LS_KEY, JSON.stringify(catalog));
		return 'localStorage';
	} catch {
		return 'none';
	}
}
