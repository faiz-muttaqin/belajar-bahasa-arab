import { describe, expect, it } from 'vitest';
import { currentPosition, stepStatus } from '#lib/domain/roadmap/progress.js';
import { roadmap } from '#lib/content/roadmap.js';
import { lessonsFor } from '#lib/content/lessons/index.js';
import {
	mergeStepMark,
	mergeStepMarks,
	parseProgressBackup,
	serializeProgress,
	type LessonProgress
} from './lessons.js';

const lessons = [...lessonsFor('belajar'), ...lessonsFor('iqra')];
const first = roadmap.stages.find((stage) => stage.id === 'stage-1')!.steps[0]!;
const completed: LessonProgress = {
	lessonId: 'lesson-u1-01',
	contentRevision: 1,
	lastOpenedAt: 100,
	completedRevision: 1
};

describe('RM-04 backup schema and deterministic merge', () => {
	it('upgrades schema 1 records to schema 2 without fabricating marks or attempts', () => {
		const backup = parseProgressBackup(JSON.stringify({ schemaVersion: 1, lessons: [completed] }));
		expect(backup).toEqual({ schemaVersion: 2, lessons: [completed], marks: [], attempts: [] });
		expect(currentPosition(roadmap, lessons, backup.lessons)?.stepId).toBe('step-u2');
	});

	it('round-trips timestamped marks, including cleared tombstones', () => {
		const marks = [
			{ stepId: first.id, mark: 'skipped' as const, at: 1 },
			{ stepId: first.id, mark: 'cleared' as const, at: 2 }
		];
		const backup = parseProgressBackup(serializeProgress([completed], marks));
		expect(backup.marks).toEqual([marks[1]]);
		expect(stepStatus(first, lessons, backup.lessons, backup.marks)).toBe('completed');
		expect(currentPosition(roadmap, lessons, backup.lessons, backup.marks)?.stepId).toBe('step-u2');
	});

	it('keeps the latest mark even when importing older backups in either order', () => {
		const old = { stepId: first.id, mark: 'learning' as const, at: 500 };
		const next = { stepId: first.id, mark: 'skipped' as const, at: 800 };
		expect(mergeStepMark(next, old)).toEqual(next);
		expect(mergeStepMarks([old, next, old])).toEqual([next]);
		expect(mergeStepMarks([next, old])).toEqual([next]);
		const clear = { stepId: first.id, mark: 'cleared' as const, at: 801 };
		expect(mergeStepMarks([clear, next])).toEqual([clear]);
		expect(mergeStepMark(old, { ...old, mark: 'cleared' })).toEqual({
			...old,
			mark: 'cleared'
		});
	});

	it('deduplicates lesson records and rejects invalid or invented evidence', () => {
		const parsed = parseProgressBackup(
			JSON.stringify({
				schemaVersion: 2,
				lessons: [completed, { ...completed, completedRevision: undefined, lastOpenedAt: 150 }],
				marks: [],
				attempts: []
			})
		);
		expect(parsed.lessons).toEqual([{ ...completed, lastOpenedAt: 150 }]);
		for (const backup of [
			{
				schemaVersion: 2,
				lessons: [],
				marks: [{ stepId: 'step-u1', mark: 'invalid', at: 1 }],
				attempts: []
			},
			{ schemaVersion: 2, lessons: [], marks: [], attempts: [{ correct: true }] },
			{ schemaVersion: 3, lessons: [] },
			{ schemaVersion: 1, lessons: [{ lessonId: 'bad!', contentRevision: 1, lastOpenedAt: 1 }] }
		]) {
			expect(() => parseProgressBackup(JSON.stringify(backup))).toThrow(
				'Format cadangan progres tidak didukung.'
			);
		}
	});
});
