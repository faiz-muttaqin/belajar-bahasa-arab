import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { LessonProgress, ProgressBackup } from './lessons.js';
import { importProgressBackup, readProgressSnapshot, saveProgress } from './storage.js';

// TEST FIXTURE — NOT A LESSON. The browser runner uses its own isolated origin.
const completed: LessonProgress = {
	lessonId: 'lesson-fixture-batch',
	contentRevision: 2,
	lastOpenedAt: 100,
	completedRevision: 2
};
const reopened: LessonProgress = {
	lessonId: completed.lessonId,
	contentRevision: 3,
	lastOpenedAt: 200
};

async function clearTestProgress() {
	await new Promise<void>((resolve, reject) => {
		const request = indexedDB.deleteDatabase('belajar-bahasa-arab-progres');
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
		request.onblocked = () => reject(new Error('Test database is still open'));
	});
}

beforeEach(clearTestProgress);
afterEach(clearTestProgress);

describe('progress transactions preserve every record in a batch', () => {
	it('keeps completion when the same lesson is reopened later in the batch', async () => {
		const saved = await saveProgress([completed, reopened]);
		const expected = { ...reopened, completedRevision: 2 };
		expect(saved.get(completed.lessonId)).toEqual(expected);
		expect((await readProgressSnapshot()).lessons).toEqual([expected]);
	});

	for (const reversed of [false, true]) {
		it(`merges duplicate backup records without resurrecting a cleared mark (reversed=${reversed})`, async () => {
			const backup: ProgressBackup = {
				schemaVersion: 2,
				lessons: [completed, reopened],
				marks: [
					{ stepId: 'step-fixture', mark: 'cleared', at: 300 },
					{ stepId: 'step-fixture', mark: 'learning', at: 100 }
				],
				attempts: []
			};
			if (reversed) {
				backup.lessons.reverse();
				backup.marks.reverse();
			}
			await importProgressBackup(backup);
			expect(await readProgressSnapshot()).toEqual({
				lessons: [{ ...reopened, completedRevision: 2 }],
				marks: [{ stepId: 'step-fixture', mark: 'cleared', at: 300 }],
				attempts: []
			});
		});
	}
});
