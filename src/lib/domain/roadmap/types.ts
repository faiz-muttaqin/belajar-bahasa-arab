import type { Lesson, LessonLevel, LessonTrack } from '#lib/content/lessons/types.js';

export type RoadmapSource = {
	label: string;
	href: string;
	usageType: 'independent-original' | 'adaptation' | 'verbatim';
};

export type SourcedDraft = {
	sources: readonly RoadmapSource[];
	reviewStatus: 'draft';
};

export type Prerequisite = {
	id: string;
	strength: 'hard' | 'soft' | 'optional';
	impossibleBecause?: string;
};

export type Competency = SourcedDraft & {
	id: string;
	track: 'A' | 'B' | 'reference';
	titleId: string;
	canDo: string;
	prerequisites: readonly Prerequisite[];
};

export type RoadmapStep = SourcedDraft & {
	id: string;
	title: string;
	canDo: string;
	lessonIds: readonly string[];
	/** Includes capabilities whose main home is elsewhere in the map. */
	competencyIds: readonly string[];
	/** A capability has exactly one main home, used for stage counts. */
	primaryCompetencyIds: readonly string[];
};

export type RoadmapCheckpoint = SourcedDraft & {
	id: string;
	title: string;
	competencyIds: readonly string[];
	status: 'planned';
};

export type RoadmapStage = SourcedDraft & {
	id: string;
	number: number;
	title: string;
	canDo: string;
	track: LessonTrack;
	level: LessonLevel;
	optional: boolean;
	steps: readonly RoadmapStep[];
	checkpoint: RoadmapCheckpoint;
};

export type RoadmapBranch = SourcedDraft & {
	id: string;
	stageId: string;
	title: string;
	canDo: string;
	competencyIds: readonly string[];
	status: 'available' | 'planned';
	links: readonly { label: string; path: string }[];
};

export type Roadmap = {
	stages: readonly RoadmapStage[];
	branches: readonly RoadmapBranch[];
};

export type RoadmapLesson = Pick<Lesson, 'id' | 'revision' | 'track' | 'competencies'>;

/** Input contract only. IndexedDB marks are introduced separately in RM-04. */
export type StepMark = {
	stepId: string;
	mark: 'learning' | 'skipped';
	at: number;
};

export type StepStatus = 'not_started' | 'learning' | 'completed' | 'skipped';

export type RoadmapPosition = {
	stageId: string;
	stageNumber: number;
	stepId: string;
	stepNumber: number;
	stepCount: number;
};
