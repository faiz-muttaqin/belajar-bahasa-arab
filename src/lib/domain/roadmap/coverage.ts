import type { LessonProgress } from '#lib/progress/lessons.js';
import {
	competencyUnderstanding,
	type EvidenceItem,
	type LearningAttempt,
	type UnderstandingLevel
} from './evidence.js';
import { summarizeRoadmap } from './progress.js';
import type { Roadmap, RoadmapLesson, StepMark, StepStatus } from './types.js';

export type StepCounts = Record<StepStatus, number>;

/**
 * Evidence comes only from stored answers. Opening, completing or skipping a step never
 * changes a number here. Each competency is counted once, at its home step.
 */
export type StageEvidence = {
	/** Competencies whose home is in this stage. */
	totalCompetencies: number;
	/** Competencies per understanding level (0 = no evidence yet). */
	levels: Record<UnderstandingLevel, number>;
	/** Competencies with at least one stored answer. */
	withAnswers: number;
	/** Competencies whose current level rests on the learner's own assessment. */
	selfAssessed: number;
	/** Competencies that have no published exercise yet (a subset of level 0). */
	withoutPractice: number;
};

export type StageCoverage = {
	stageId: string;
	number: number;
	title: string;
	totalSteps: number;
	counts: StepCounts;
	evidence: StageEvidence;
};

export type BranchCoverage = {
	id: string;
	stageId: string;
	title: string;
	status: 'available' | 'planned';
	competencyCount: number;
};

export type RoadmapCoverage = {
	/** Main-path stages only. Their steps form the denominator. */
	stages: StageCoverage[];
	totals: { totalSteps: number; counts: StepCounts; evidence: StageEvidence };
	/** Iqra and any other optional stage. Never part of the main-path denominator. */
	foundation: StageCoverage[];
	/** Optional branches, including planned ones. Counted by competency, never by step. */
	branches: BranchCoverage[];
	/** Checkpoints without published questions yet. */
	plannedCheckpoints: { id: string; stageId: string; title: string }[];
};

const emptyCounts = (): StepCounts => ({ not_started: 0, learning: 0, completed: 0, skipped: 0 });
const emptyEvidence = (): StageEvidence => ({
	totalCompetencies: 0,
	levels: { 0: 0, 1: 0, 2: 0, 3: 0 },
	withAnswers: 0,
	selfAssessed: 0,
	withoutPractice: 0
});

function addEvidence(into: StageEvidence, from: StageEvidence) {
	into.totalCompetencies += from.totalCompetencies;
	for (const level of [0, 1, 2, 3] as const) into.levels[level] += from.levels[level];
	into.withAnswers += from.withAnswers;
	into.selfAssessed += from.selfAssessed;
	into.withoutPractice += from.withoutPractice;
}

/**
 * Per-stage step coverage and answer evidence. Reuses stepStatus/summarizeRoadmap for
 * positions and competencyUnderstanding for evidence; it adds no stored state.
 */
export function summarizeCoverage(
	roadmap: Roadmap,
	lessons: readonly RoadmapLesson[],
	lessonProgress: readonly LessonProgress[],
	marks: readonly StepMark[],
	attempts: readonly LearningAttempt[],
	evidenceItems: readonly EvidenceItem[]
): RoadmapCoverage {
	const summary = summarizeRoadmap(roadmap, lessons, lessonProgress, marks);
	const stepSummary = new Map(summary.stages.map((stage) => [stage.stageId, stage]));
	// A competency has one home: the first step that lists it as primary. Main-path stages
	// claim theirs first, so an optional stage can never take evidence away from the path.
	const counted = new Set<string>();
	const evidenceByStage = new Map<string, StageEvidence>();
	for (const stage of [...roadmap.stages].sort((a, b) => Number(a.optional) - Number(b.optional))) {
		const evidence = emptyEvidence();
		for (const id of stage.steps.flatMap((step) => step.primaryCompetencyIds)) {
			if (counted.has(id)) continue;
			counted.add(id);
			const result = competencyUnderstanding(id, attempts, evidenceItems);
			evidence.totalCompetencies++;
			evidence.levels[result.level]++;
			if (result.hasAttempts) evidence.withAnswers++;
			if (result.level > 0 && result.selfAssessed) evidence.selfAssessed++;
			if (!result.hasPractice) evidence.withoutPractice++;
		}
		evidenceByStage.set(stage.id, evidence);
	}
	const stages = roadmap.stages.map((stage) => {
		const steps = stepSummary.get(stage.id)!;
		return {
			optional: stage.optional,
			coverage: {
				stageId: stage.id,
				number: stage.number,
				title: stage.title,
				totalSteps: steps.totalSteps,
				counts: { ...steps.counts },
				evidence: evidenceByStage.get(stage.id)!
			} satisfies StageCoverage
		};
	});
	const main = stages.filter((stage) => !stage.optional).map((stage) => stage.coverage);
	const totals = { totalSteps: 0, counts: emptyCounts(), evidence: emptyEvidence() };
	for (const stage of main) {
		totals.totalSteps += stage.totalSteps;
		for (const status of Object.keys(totals.counts) as StepStatus[])
			totals.counts[status] += stage.counts[status];
		addEvidence(totals.evidence, stage.evidence);
	}
	return {
		stages: main,
		totals,
		foundation: stages.filter((stage) => stage.optional).map((stage) => stage.coverage),
		branches: roadmap.branches.map((branch) => ({
			id: branch.id,
			stageId: branch.stageId,
			title: branch.title,
			status: branch.status,
			competencyCount: new Set(branch.competencyIds).size
		})),
		plannedCheckpoints: roadmap.stages
			.filter((stage) => stage.checkpoint.status === 'planned')
			.map((stage) => ({
				id: stage.checkpoint.id,
				stageId: stage.id,
				title: stage.checkpoint.title
			}))
	};
}
