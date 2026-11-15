import { beginnerLessons } from './beginner.js';
import { numberLesson } from './document-reading.js';
import { foundationLessons } from './foundation.js';
import { sentenceReadingLessons } from './sentence-reading.js';
import { intermediateLessons } from './intermediate.js';
import { validateLessons, type LessonSummary, type LessonTrack } from './types.js';
import { wordClassesLesson } from './word-classes.js';
import type { ProgressLesson } from '#lib/progress/lessons.js';
import { competencies } from '../competencies.js';
import { collectEvidenceItems } from '../evidence.js';
import { stage3CheckpointGroups, collectCheckpointEvidenceItems } from '../checkpoints.js';
import { stage2CheckpointGroups } from '../checkpoints-stage2.js';
import { roadmap, roadmapReferencePaths } from '../roadmap.js';
import { validateRoadmap } from '#lib/domain/roadmap/validate.js';

const lessons = [
	...foundationLessons,
	...beginnerLessons.flatMap((lesson) =>
		lesson.id === 'lesson-u3-01' ? [lesson, wordClassesLesson] : [lesson]
	),
	...sentenceReadingLessons,
	numberLesson,
	...intermediateLessons
];
validateLessons(lessons);
validateRoadmap(roadmap, competencies, lessons, roadmapReferencePaths);
const publishedCheckpointGroups = [...stage2CheckpointGroups, ...stage3CheckpointGroups];
for (const group of publishedCheckpointGroups) {
	const lesson = lessons.find((item) => item.id === group.lessonId);
	if (!lesson || lesson.revision !== group.contentRevision || !lesson.competencies.includes(group.competencyId))
		throw new Error(`Invalid checkpoint lesson or competency: ${group.id}`);
}
export const evidenceItems = [
	...collectEvidenceItems(lessons),
	...collectCheckpointEvidenceItems(publishedCheckpointGroups)
];
if (new Set(evidenceItems.map((item) => item.id)).size !== evidenceItems.length)
	throw new Error('Duplicate evidence item across lessons and checkpoints');

export function lessonsFor(track: LessonTrack) {
	return lessons.filter((lesson) => lesson.track === track);
}

export function lessonSummaries(track: LessonTrack): LessonSummary[] {
	return lessonsFor(track).map(({ id, slug, title, goal, minutes, level }) => ({
		id,
		slug,
		title,
		goal,
		minutes,
		level
	}));
}

export function firstMainLesson() {
	const lesson = lessons.find((lesson) => lesson.track === 'belajar');
	if (!lesson) throw new Error('Jalur utama membutuhkan satu pelajaran pembuka.');
	return { slug: lesson.slug, title: lesson.title };
}

export function lessonProgressData() {
	const progressLessons: ProgressLesson[] = lessons.map(({ id, revision, slug, title, track }) => ({
		id,
		revision,
		slug,
		title,
		track
	}));
	return { progressLessons, startSlug: firstMainLesson().slug };
}
