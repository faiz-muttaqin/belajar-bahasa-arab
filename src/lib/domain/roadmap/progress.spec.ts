import { describe, expect, it } from 'vitest';
import { roadmap } from '#lib/content/roadmap.js';
import { lessonsFor } from '#lib/content/lessons/index.js';
import type { LessonProgress } from '#lib/progress/lessons.js';
import { currentPosition, stepStatus, summarizeRoadmap } from './progress.js';
import type { StepMark } from './types.js';

const lessons = [...lessonsFor('iqra'), ...lessonsFor('belajar')];
const first = roadmap.stages[1]!.steps[0]!;
function record(lessonId: string, changes: Partial<LessonProgress> = {}): LessonProgress {
	const lesson = lessons.find((lesson) => lesson.id === lessonId)!;
	return { lessonId, contentRevision: lesson.revision, lastOpenedAt: 100, ...changes };
}
function complete(lessonId: string) {
	return record(lessonId, {
		completedRevision: lessons.find((lesson) => lesson.id === lessonId)!.revision
	});
}

describe('RM-02 path position without inferred understanding', () => {
	it('starts on the main path and offers Iqra as a separate optional track', () => {
		expect(stepStatus(first, lessons, [])).toBe('not_started');
		expect(currentPosition(roadmap, lessons, [])).toEqual({
			stageId: 'stage-1',
			stageNumber: 1,
			stepId: 'step-u1',
			stepNumber: 1,
			stepCount: 1
		});
		expect(currentPosition(roadmap, lessons, [], [], 'iqra')?.stepId).toBe('step-a1');
	});

	it('opening a lesson marks only its own step as learning', () => {
		expect(stepStatus(first, lessons, [record('lesson-u1-01')])).toBe('learning');
		expect(stepStatus(first, lessons, [record('lesson-u2-01')])).toBe('not_started');
	});

	it('completion requires the current revision, never an older or future revision', () => {
		expect(stepStatus(first, lessons, [complete('lesson-u1-01')])).toBe('completed');
		const revised = lessons.map((lesson) =>
			lesson.id === 'lesson-u1-01' ? { ...lesson, revision: lesson.revision + 1 } : lesson
		);
		expect(stepStatus(first, revised, [complete('lesson-u1-01')])).toBe('learning');
		expect(stepStatus(first, lessons, [record('lesson-u1-01', { completedRevision: 99 })])).toBe(
			'learning'
		);
	});

	it('a step with several lessons is complete only when every lesson is complete', () => {
		const step = roadmap.stages[0]!.steps[1]!;
		const records = step.lessonIds.map(complete);
		expect(stepStatus(step, lessons, records.slice(0, -1))).toBe('learning');
		expect(stepStatus(step, lessons, records)).toBe('completed');
	});

	it('supports skipped and manual learning marks without lesson records', () => {
		expect(stepStatus(first, lessons, [], [{ stepId: first.id, mark: 'skipped', at: 10 }])).toBe(
			'skipped'
		);
		expect(stepStatus(first, lessons, [], [{ stepId: first.id, mark: 'learning', at: 10 }])).toBe(
			'learning'
		);
		expect(
			currentPosition(roadmap, lessons, [], [{ stepId: first.id, mark: 'skipped', at: 10 }])?.stepId
		).toBe('step-u2');
	});

	it('opening a completed U1 again does not move the map backwards', () => {
		const progress = [
			record('lesson-u1-01', {
				completedRevision: complete('lesson-u1-01').completedRevision,
				lastOpenedAt: 900
			})
		];
		expect(currentPosition(roadmap, lessons, progress)?.stepId).toBe('step-u2');
	});

	it('latest explicit learning mark wins, including deliberate review of completed material', () => {
		const marks: StepMark[] = [
			{ stepId: 'step-u4', mark: 'learning', at: 200 },
			{ stepId: 'step-u2', mark: 'learning', at: 100 },
			{ stepId: 'step-u1', mark: 'learning', at: 300 }
		];
		expect(currentPosition(roadmap, lessons, [complete('lesson-u1-01')], marks)?.stepId).toBe(
			'step-u1'
		);
		expect(stepStatus(first, lessons, [complete('lesson-u1-01')], marks)).toBe('learning');
	});

	it('a newer skip supersedes an older learning mark on the same step', () => {
		const marks: StepMark[] = [
			{ stepId: first.id, mark: 'learning', at: 100 },
			{ stepId: first.id, mark: 'skipped', at: 200 }
		];
		expect(stepStatus(first, lessons, [], marks)).toBe('skipped');
		expect(currentPosition(roadmap, lessons, [], marks)?.stepId).toBe('step-u2');
		expect(currentPosition(roadmap, lessons, [], [...marks].reverse())?.stepId).toBe('step-u2');
	});

	it('ignores unknown marks, invalid timestamps and marks on the other track', () => {
		const marks: StepMark[] = [
			{ stepId: 'missing', mark: 'learning', at: 999 },
			{ stepId: 'step-a3', mark: 'learning', at: 900 },
			{ stepId: first.id, mark: 'skipped', at: NaN }
		];
		expect(currentPosition(roadmap, lessons, [], marks)?.stepId).toBe('step-u1');
	});

	it('has no next position after every main step is complete or skipped', () => {
		const marks: StepMark[] = [{ stepId: first.id, mark: 'skipped', at: 10 }];
		const progress = lessons
			.filter((lesson) => lesson.id !== 'lesson-u1-01')
			.map((lesson) => complete(lesson.id));
		expect(currentPosition(roadmap, lessons, progress, marks)).toBeUndefined();
	});

	it('summarizes coverage with counts and keeps optional branches out of main denominators', () => {
		const summary = summarizeRoadmap(roadmap, lessons, [
			complete('lesson-u1-01'),
			record('lesson-u2-01')
		]);
		expect(summary.stages[1]!).toMatchObject({
			totalSteps: 1,
			totalLessons: 1,
			completedLessons: 1,
			totalCompetencies: 1,
			counts: { completed: 1, learning: 0, skipped: 0, not_started: 0 }
		});
		expect(summary.stages[2]!).toMatchObject({
			totalSteps: 3,
			totalCompetencies: 5,
			counts: { completed: 0, learning: 1, skipped: 0, not_started: 2 }
		});
		expect(summary.stages[0]!).toMatchObject({
			optional: true,
			track: 'iqra',
			totalSteps: 4,
			totalLessons: 6
		});
		expect(summary.stages[6]!.totalCompetencies).toBe(1);
		expect(summary.position?.stepId).toBe('step-u2');
	});
});
