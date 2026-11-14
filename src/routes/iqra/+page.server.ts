import { lessonSummaries } from '#lib/content/lessons/index.js';

export function load() {
	return { lessons: lessonSummaries('iqra') };
}
