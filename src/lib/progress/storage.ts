import { mergeLessonProgress, progressVersion, type LessonProgress } from './lessons.js';

const databaseName = 'belajar-bahasa-arab-progres';
const storeName = 'lessons';

function openProgress() {
	return new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open(databaseName, progressVersion);
		let blocked = false;
		request.onupgradeneeded = () => {
			request.result.createObjectStore(storeName, { keyPath: 'lessonId' });
		};
		request.onblocked = () => {
			blocked = true;
			reject(new Error('Penyimpanan progres sedang digunakan.'));
		};
		request.onerror = () => reject(request.error);
		request.onsuccess = () => {
			const database = request.result;
			database.onversionchange = () => database.close();
			if (blocked) database.close();
			else resolve(database);
		};
	});
}

export async function readProgress(): Promise<LessonProgress[]> {
	const database = await openProgress();
	try {
		return await new Promise((resolve, reject) => {
			const transaction = database.transaction(storeName, 'readonly');
			const request = transaction.objectStore(storeName).getAll();
			transaction.oncomplete = () => resolve(request.result);
			transaction.onabort = () => reject(transaction.error);
		});
	} finally {
		database.close();
	}
}

/** Read and merge within the write transaction so tabs cannot overwrite each other's progress. */
export async function saveProgress(records: readonly LessonProgress[]) {
	const database = await openProgress();
	try {
		const saved = await new Promise<Map<string, LessonProgress>>((resolve, reject) => {
			const transaction = database.transaction(storeName, 'readwrite');
			const store = transaction.objectStore(storeName);
			const merged = new Map<string, LessonProgress>();
			transaction.oncomplete = () => resolve(merged);
			transaction.onabort = () => reject(transaction.error);

			for (const record of records) {
				const request = store.get(record.lessonId);
				// Enqueue writes in the request callback, while the transaction is active in WebKit.
				request.onsuccess = () => {
					const next = mergeLessonProgress(merged.get(record.lessonId) ?? request.result, record);
					merged.set(record.lessonId, next);
					store.put(next);
				};
			}
		});
		return saved;
	} finally {
		database.close();
	}
}
