import type { Lesson } from '#lib/content/lessons/types.js';

export const progressVersion = 1;

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

export function serializeProgress(records: readonly LessonProgress[]) {
	return JSON.stringify({ schemaVersion: progressVersion, lessons: records }, null, 2);
}

export function parseProgressBackup(json: string): LessonProgress[] {
	const data: unknown = JSON.parse(json);
	if (
		typeof data !== 'object' ||
		data === null ||
		!('schemaVersion' in data) ||
		data.schemaVersion !== progressVersion ||
		!('lessons' in data) ||
		!Array.isArray(data.lessons) ||
		!data.lessons.every(isLessonProgress)
	) {
		throw new Error('Format cadangan progres tidak didukung.');
	}
	const lessons = new Map<string, LessonProgress>();
	for (const record of data.lessons) {
		lessons.set(record.lessonId, mergeLessonProgress(lessons.get(record.lessonId), record));
	}
	return [...lessons.values()];
}
