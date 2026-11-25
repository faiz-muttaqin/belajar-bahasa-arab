import { describe, expect, it } from 'vitest';
import { roadmap } from '#lib/content/roadmap.js';
import { evidenceItems, lessonsFor } from '#lib/content/lessons/index.js';
import type { LessonProgress } from '#lib/progress/lessons.js';
import { summarizeCoverage } from './coverage.js';
import type { LearningAttempt } from './evidence.js';
import type { Roadmap, StepMark } from './types.js';

const lessons = [...lessonsFor('iqra'), ...lessonsFor('belajar')];
const mainStages = roadmap.stages.filter((stage) => !stage.optional);
const mainSteps = mainStages.flatMap((stage) => stage.steps);
const complete = (lessonId: string, revision?: number): LessonProgress => {
	const lesson = lessons.find((item) => item.id === lessonId)!;
	return {
		lessonId,
		contentRevision: lesson.revision,
		lastOpenedAt: 100,
		completedRevision: revision ?? lesson.revision
	};
};
const opened = (lessonId: string): LessonProgress => ({
	lessonId,
	contentRevision: 1,
	lastOpenedAt: 100
});
const coverage = (
	records: LessonProgress[] = [],
	marks: StepMark[] = [],
	attempts: LearningAttempt[] = [],
	map: Roadmap = roadmap,
	lessonList = lessons
) => summarizeCoverage(map, lessonList, records, marks, attempts, evidenceItems);
const attempt = (
	itemId: string,
	outcome: LearningAttempt['outcome'],
	at: number,
	options: Partial<LearningAttempt> = {}
): LearningAttempt => {
	const item = evidenceItems.find((entry) => entry.id === itemId)!;
	return {
		id: `answer-${at}`,
		itemId,
		lessonId: item.lessonId,
		contentRevision: 1,
		competencyIds: [...item.competencyIds],
		skill: item.skill,
		outcome,
		assisted: false,
		selfAssessed: item.kind === 'self-assessment',
		seenWhileAuthoring: false,
		at,
		...options
	};
};

describe('VP-04 coverage per stage', () => {
	it('with no stored progress, every main-path step is not started and the denominator is the catalogue', () => {
		const result = coverage();
		expect(result.stages.map((stage) => stage.stageId)).toEqual(
			mainStages.map((stage) => stage.id)
		);
		for (const stage of result.stages) {
			const expected = mainStages.find((item) => item.id === stage.stageId)!;
			expect(stage.totalSteps).toBe(expected.steps.length);
			expect(stage.counts).toEqual({
				not_started: expected.steps.length,
				learning: 0,
				completed: 0,
				skipped: 0
			});
			expect(stage.evidence.withAnswers).toBe(0);
			expect(stage.evidence.levels[0]).toBe(stage.evidence.totalCompetencies);
		}
		expect(result.totals.totalSteps).toBe(mainSteps.length);
		expect(result.totals.counts.not_started).toBe(mainSteps.length);
	});

	it('counts mixed statuses and keeps each stage total equal to the sum of its counts', () => {
		const [first, second, third] = mainSteps;
		const result = coverage(
			[complete(first!.lessonIds[0]!), opened(third!.lessonIds[0]!)],
			[{ stepId: second!.id, mark: 'skipped', at: 10 }]
		);
		const counts = result.totals.counts;
		expect(counts.completed).toBeGreaterThanOrEqual(1);
		expect(counts.skipped).toBe(1);
		expect(counts.learning).toBeGreaterThanOrEqual(1);
		expect(counts.not_started + counts.learning + counts.completed + counts.skipped).toBe(
			result.totals.totalSteps
		);
		for (const stage of result.stages)
			expect(Object.values(stage.counts).reduce((sum, value) => sum + value, 0)).toBe(
				stage.totalSteps
			);
	});

	it('a skipped step is reported as skipped, never as completed', () => {
		const step = mainSteps[0]!;
		const result = coverage([], [{ stepId: step.id, mark: 'skipped', at: 5 }]);
		const stage = result.stages[0]!;
		expect(stage.counts.skipped).toBe(1);
		expect(stage.counts.completed).toBe(0);
	});

	it('a cleared mark falls back to lesson progress', () => {
		const step = mainSteps[0]!;
		const result = coverage(
			[],
			[
				{ stepId: step.id, mark: 'skipped', at: 5 },
				{ stepId: step.id, mark: 'cleared', at: 6 }
			]
		);
		expect(result.totals.counts.skipped).toBe(0);
		expect(result.totals.counts.not_started).toBe(mainSteps.length);
	});

	it('a lesson revision change turns a completed step back into learning', () => {
		const step = mainSteps[0]!;
		const records = step.lessonIds.map((id) => complete(id));
		expect(coverage(records).stages[0]!.counts.completed).toBe(1);
		const revised = lessons.map((lesson) =>
			step.lessonIds.includes(lesson.id) ? { ...lesson, revision: lesson.revision + 1 } : lesson
		);
		const after = coverage(records, [], [], roadmap, revised).stages[0]!;
		expect(after.counts.completed).toBe(0);
		expect(after.counts.learning).toBe(1);
		expect(after.totalSteps).toBe(mainStages[0]!.steps.length);
	});

	it('keeps Iqra, branches and planned items out of the main-path denominator', () => {
		const iqraStep = roadmap.stages[0]!.steps[0]!;
		const result = coverage(iqraStep.lessonIds.map((id) => complete(id)));
		expect(roadmap.stages[0]!.optional).toBe(true);
		expect(result.stages.some((stage) => stage.stageId === 'stage-iqra')).toBe(false);
		expect(result.totals.totalSteps).toBe(mainSteps.length);
		expect(result.totals.counts.completed).toBe(0);
		const iqra = result.foundation.find((stage) => stage.stageId === 'stage-iqra')!;
		expect(iqra.counts.completed).toBe(1);
		expect(iqra.totalSteps).toBe(roadmap.stages[0]!.steps.length);
		expect(result.branches.map((branch) => branch.id)).toEqual(
			roadmap.branches.map((branch) => branch.id)
		);
		expect(result.branches.filter((branch) => branch.status === 'planned').length).toBeGreaterThan(
			0
		);
	});

	it('reports a planned checkpoint separately when the map declares one', () => {
		const planned: Roadmap = {
			...roadmap,
			stages: roadmap.stages.map((stage) =>
				stage.id === 'stage-2'
					? { ...stage, checkpoint: { ...stage.checkpoint, status: 'planned' as const } }
					: stage
			)
		};
		const result = coverage([], [], [], planned);
		expect(result.plannedCheckpoints).toEqual([
			{ id: 'checkpoint-2', stageId: 'stage-2', title: planned.stages[2]!.checkpoint.title }
		]);
		expect(result.totals.totalSteps).toBe(mainSteps.length);
		expect(coverage().plannedCheckpoints).toEqual([]);
	});
});

describe('VP-04 evidence summary', () => {
	it('shows no evidence when there are no answers, even if every lesson is complete', () => {
		const everything = lessons.map((lesson) => complete(lesson.id));
		const result = coverage(everything);
		expect(result.totals.counts.completed).toBe(mainSteps.length);
		expect(result.totals.evidence.withAnswers).toBe(0);
		expect(result.totals.evidence.levels[1] + result.totals.evidence.levels[2]).toBe(0);
		expect(result.totals.evidence.levels[3]).toBe(0);
	});

	it('opening or skipping steps never changes evidence', () => {
		const before = coverage().stages.map((stage) => stage.evidence);
		const after = coverage(
			[opened(mainSteps[0]!.lessonIds[0]!)],
			[{ stepId: mainSteps[1]!.id, mark: 'skipped', at: 3 }]
		).stages.map((stage) => stage.evidence);
		expect(after).toEqual(before);
	});

	it('counts a stored answer at the competency home stage and nowhere else', () => {
		const result = coverage([], [], [attempt('u1-rabbi-meaning', 'correct', 1)]);
		const home = mainStages.find((stage) =>
			stage.steps.some((step) => step.primaryCompetencyIds.includes('CB-01'))
		)!;
		for (const stage of result.stages) {
			expect(stage.evidence.withAnswers).toBe(stage.stageId === home.id ? 1 : 0);
		}
		expect(result.totals.evidence.withAnswers).toBe(1);
		const homeEvidence = result.stages.find((stage) => stage.stageId === home.id)!.evidence;
		expect(homeEvidence.levels[2]).toBe(1);
		expect(homeEvidence.levels[0]).toBe(homeEvidence.totalCompetencies - 1);
	});

	it('counts every competency once across the whole path', () => {
		const result = coverage();
		const all = new Set(mainSteps.flatMap((step) => step.primaryCompetencyIds));
		expect(result.totals.evidence.totalCompetencies).toBe(all.size);
	});

	it('labels an answer that rests on self-assessment', () => {
		const selfItem = evidenceItems.find((item) => item.kind === 'self-assessment');
		expect(selfItem).toBeDefined();
		if (!selfItem) return;
		const result = coverage([], [], [attempt(selfItem.id, 'correct', 1)]);
		const stages = [...result.stages, ...result.foundation];
		expect(stages.reduce((sum, stage) => sum + stage.evidence.selfAssessed, 0)).toBeGreaterThan(0);
	});

	it('separates missing exercises from untried exercises', () => {
		const result = coverage();
		expect(result.totals.evidence.withoutPractice).toBeGreaterThan(0);
		expect(result.totals.evidence.withoutPractice).toBeLessThanOrEqual(
			result.totals.evidence.levels[0]
		);
	});
});
