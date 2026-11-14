import { beginnerLessons } from './beginner.js';
import { numberLesson } from './document-reading.js';
import { foundationLessons } from './foundation.js';
import { sentenceReadingLessons } from './sentence-reading.js';
import { intermediateLessons } from './intermediate.js';
import { validateLessons, type LessonSummary, type LessonTrack } from './types.js';
import { wordClassesLesson } from './word-classes.js';

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
