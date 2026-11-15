import type { Lesson } from '#lib/content/lessons/types.js';
import type { StepMark } from '#lib/domain/roadmap/types.js';

/** JSON backup schema, distinct from the IndexedDB database version. */
export const progressVersion = 2;

export type LessonProgress = {
	lessonId: string;
	contentRevision: number;
	lastOpenedAt: number;
	completedRevision?: number;
};

export type ProgressLesson = Pick<Lesson, 'id' | 'revision' | 'slug' | 'title' | 'track'>;

export function mergeLessonProgress(
	current: LessonProgress | undefined,
	incoming: LessonProgress
): LessonProgress {
	const completedRevision = Math.max(
		current?.completedRevision ?? 0,
		incoming.completedRevision ?? 0
	);
	return {
		lessonId: incoming.lessonId,
		contentRevision: Math.max(current?.contentRevision ?? 0, incoming.contentRevision),
		lastOpenedAt: Math.max(current?.lastOpenedAt ?? 0, incoming.lastOpenedAt),
		completedRevision: completedRevision || undefined
	};
}

/** A cleared mark is a tombstone: an older backup must not resurrect an erased choice. */
export function mergeStepMark(current: StepMark | undefined, incoming: StepMark): StepMark {
	if (!current) return incoming;
	if (incoming.at !== current.at) return incoming.at > current.at ? incoming : current;
	const priority = { learning: 0, skipped: 1, cleared: 2 };
	return priority[incoming.mark] > priority[current.mark] ? incoming : current;
}

export function mergeStepMarks(marks: readonly StepMark[]): StepMark[] {
	const merged = new Map<string, StepMark>();
	for (const mark of marks) {
		merged.set(mark.stepId, mergeStepMark(merged.get(mark.stepId), mark));
	}
	return [...merged.values()];
}

export function isLessonComplete(lesson: ProgressLesson, record: LessonProgress | undefined) {
	return record?.completedRevision === lesson.revision;
}

export function summarizeProgress(
	lessons: readonly ProgressLesson[],
	records: readonly LessonProgress[]
) {
	const byId = new Map(records.map((record) => [record.lessonId, record]));
	const isComplete = (lesson: ProgressLesson) => isLessonComplete(lesson, byId.get(lesson.id));
	const recent = lessons
		.filter((lesson) => byId.has(lesson.id))
		.sort((a, b) => (byId.get(b.id)?.lastOpenedAt ?? 0) - (byId.get(a.id)?.lastOpenedAt ?? 0));
	const latest = recent[0];
	const track = lessons.filter((lesson) => lesson.track === latest?.track);
	const resume =
		latest &&
		(isComplete(latest)
			? (track.slice(track.indexOf(latest) + 1).find((lesson) => !isComplete(lesson)) ??
				track.find((lesson) => !isComplete(lesson)) ??
				lessons.find((lesson) => lesson.track === 'belajar' && !isComplete(lesson)))
			: latest);

	return { recent, resume, isComplete };
}

function isPositiveInteger(value: unknown): value is number {
	return typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
}
function isStepMark(value: unknown): value is StepMark {
	if (typeof value !== 'object' || value === null) return false;
	const mark = value as Record<string, unknown>;
	return (
		typeof mark.stepId === 'string' &&
		/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(mark.stepId) &&
		(mark.mark === 'learning' || mark.mark === 'skipped' || mark.mark === 'cleared') &&
		isPositiveInteger(mark.at)
	);
}
function isLessonProgress(value: unknown): value is LessonProgress {
	if (typeof value !== 'object' || value === null) return false;
	const { lessonId, contentRevision, lastOpenedAt, completedRevision } = value as Record<
		string,
		unknown
	>;
	return (
		typeof lessonId === 'string' &&
		/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lessonId) &&
		isPositiveInteger(contentRevision) &&
		isPositiveInteger(lastOpenedAt) &&
		(completedRevision === undefined ||
			(isPositiveInteger(completedRevision) && completedRevision <= contentRevision))
	);
}

export type ProgressBackup = {
	schemaVersion: 2;
	lessons: LessonProgress[];
	marks: StepMark[];
	/** Reserved for RM-05; RM-04 never fabricates practice evidence. */
	attempts: [];
};

export function serializeProgress(records: readonly LessonProgress[], marks: readonly StepMark[] = []) {
	const backup: ProgressBackup = {
		schemaVersion: progressVersion,
		lessons: [...records].sort((a, b) => a.lessonId.localeCompare(b.lessonId)),
		marks: mergeStepMarks(marks).sort((a, b) => a.stepId.localeCompare(b.stepId)),
		attempts: []
	};
	return JSON.stringify(backup, null, 2);
}

export function parseProgressBackup(json: string): ProgressBackup {
	const data: unknown = JSON.parse(json);
	if (typeof data !== 'object' || data === null) {
		throw new Error('Format cadangan progres tidak didukung.');
	}
	const backup = data as Record<string, unknown>;
	const legacy = backup.schemaVersion === 1;
	const current = backup.schemaVersion === progressVersion;
	if (
		(!legacy && !current) ||
		!Array.isArray(backup.lessons) ||
		!backup.lessons.every(isLessonProgress) ||
		(current &&
			(!Array.isArray(backup.marks) ||
				!backup.marks.every(isStepMark) ||
				!Array.isArray(backup.attempts) ||
				backup.attempts.length !== 0))
	) {
		throw new Error('Format cadangan progres tidak didukung.');
	}
	const lessons = new Map<string, LessonProgress>();
	for (const record of backup.lessons as LessonProgress[]) {
		lessons.set(record.lessonId, mergeLessonProgress(lessons.get(record.lessonId), record));
	}
	return {
		schemaVersion: 2,
		lessons: [...lessons.values()],
		marks: legacy ? [] : mergeStepMarks(backup.marks as StepMark[]),
		attempts: []
	};
}
