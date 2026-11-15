import { lessonProgressData, lessonsFor, evidenceItems } from '#lib/content/lessons/index.js';
import { roadmap } from '#lib/content/roadmap.js';

export function load() {
	return {
		evidenceItems,
		...lessonProgressData(),
		roadmap,
		roadmapLessons: [...lessonsFor('belajar'), ...lessonsFor('iqra')].map(
			({ id, revision, track, competencies }) => ({ id, revision, track, competencies })
		)
	};
}
