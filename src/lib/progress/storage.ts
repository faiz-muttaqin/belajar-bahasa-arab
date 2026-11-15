import type { StepMark } from '#lib/domain/roadmap/types.js';
import {
	mergeLessonProgress,
	mergeStepMark,
	type LessonProgress,
	type ProgressBackup
} from './lessons.js';

/** Database schema version is independent of the JSON backup version. */
export const progressDatabaseVersion = 2;
const databaseName = 'belajar-bahasa-arab-progres';
const lessonsStore = 'lessons';
const marksStore = 'marks';

function openProgress() {
	return new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open(databaseName, progressDatabaseVersion);
		let blocked = false;
		request.onupgradeneeded = () => {
			const database = request.result;
			// Upgrade v1 in place; never replace existing lesson records.
			if (!database.objectStoreNames.contains(lessonsStore))
				database.createObjectStore(lessonsStore, { keyPath: 'lessonId' });
			if (!database.objectStoreNames.contains(marksStore))
				database.createObjectStore(marksStore, { keyPath: 'stepId' });
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

export type ProgressSnapshot = { lessons: LessonProgress[]; marks: StepMark[] };

export async function readProgressSnapshot(): Promise<ProgressSnapshot> {
	const database = await openProgress();
	try {
		return await new Promise((resolve, reject) => {
			const transaction = database.transaction([lessonsStore, marksStore], 'readonly');
			const lessons = transaction.objectStore(lessonsStore).getAll();
			const marks = transaction.objectStore(marksStore).getAll();
			transaction.oncomplete = () => resolve({ lessons: lessons.result, marks: marks.result });
			transaction.onabort = () => reject(transaction.error);
			transaction.onerror = () => reject(transaction.error);
		});
	} finally {
		database.close();
	}
}

/** Retained for any lesson-only consumer. */
export async function readProgress(): Promise<LessonProgress[]> {
	return (await readProgressSnapshot()).lessons;
}

/** Read and merge within the write transaction so tabs cannot overwrite each other's progress. */
export async function saveProgress(records: readonly LessonProgress[]) {
	const database = await openProgress();
	try {
		return await new Promise<Map<string, LessonProgress>>((resolve, reject) => {
			const transaction = database.transaction(lessonsStore, 'readwrite');
			const store = transaction.objectStore(lessonsStore);
			const merged = new Map<string, LessonProgress>();
			transaction.oncomplete = () => resolve(merged);
			transaction.onabort = () => reject(transaction.error);
			transaction.onerror = () => reject(transaction.error);
			for (const record of records) {
				const request = store.get(record.lessonId);
				request.onsuccess = () => {
					const next = mergeLessonProgress(merged.get(record.lessonId) ?? request.result, record);
					merged.set(record.lessonId, next);
					store.put(next);
				};
			}
		});
	} finally {
		database.close();
	}
}

/** Saves both setting and clearing choices as timestamped records. */
export async function saveStepMark(mark: StepMark): Promise<void> {
	const database = await openProgress();
	try {
		await new Promise<void>((resolve, reject) => {
			const transaction = database.transaction(marksStore, 'readwrite');
			const store = transaction.objectStore(marksStore);
			const request = store.get(mark.stepId);
			request.onsuccess = () => store.put(mergeStepMark(request.result, mark));
			transaction.oncomplete = () => resolve();
			transaction.onabort = () => reject(transaction.error);
			transaction.onerror = () => reject(transaction.error);
		});
	} finally {
		database.close();
	}
}

/** Atomic backup merge across both stores; never overwrite more recent local choices. */
export async function importProgressBackup(backup: ProgressBackup): Promise<void> {
	const database = await openProgress();
	try {
		await new Promise<void>((resolve, reject) => {
			const transaction = database.transaction([lessonsStore, marksStore], 'readwrite');
			const lessonStore = transaction.objectStore(lessonsStore);
			const markStore = transaction.objectStore(marksStore);
			// Reads are queued before callback writes; preserve earlier merges in this batch.
			const mergedLessons = new Map<string, LessonProgress>();
			const mergedMarks = new Map<string, StepMark>();
			for (const record of backup.lessons) {
				const request = lessonStore.get(record.lessonId);
				request.onsuccess = () => {
					const next = mergeLessonProgress(
						mergedLessons.get(record.lessonId) ?? request.result,
						record
					);
					mergedLessons.set(record.lessonId, next);
					lessonStore.put(next);
				};
			}
			for (const mark of backup.marks) {
				const request = markStore.get(mark.stepId);
				request.onsuccess = () => {
					const next = mergeStepMark(mergedMarks.get(mark.stepId) ?? request.result, mark);
					mergedMarks.set(mark.stepId, next);
					markStore.put(next);
				};
			}
			transaction.oncomplete = () => resolve();
			transaction.onabort = () => reject(transaction.error);
			transaction.onerror = () => reject(transaction.error);
		});
	} finally {
		database.close();
	}
}

export async function readPersistenceStatus(): Promise<'granted' | 'not-granted' | 'unsupported'> {
	if (typeof navigator === 'undefined' || !navigator.storage?.persisted) return 'unsupported';
	try {
		return (await navigator.storage.persisted()) ? 'granted' : 'not-granted';
	} catch {
		return 'unsupported';
	}
}

/** Do NOT call before RM-05 saves the first real answer. */
export async function requestPersistentStorage(): Promise<boolean> {
	if (typeof navigator === 'undefined' || !navigator.storage?.persist) return false;
	try {
		return await navigator.storage.persist();
	} catch {
		return false;
	}
}
