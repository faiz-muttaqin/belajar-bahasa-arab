import { firstMainLesson, lessonSummaries } from '#lib/content/lessons/index.js';

export function load() {
	return { lessons: lessonSummaries('belajar'), start: firstMainLesson() };
}
