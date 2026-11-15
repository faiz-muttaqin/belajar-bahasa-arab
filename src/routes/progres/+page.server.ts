import { lessonProgressData, lessonsFor } from '#lib/content/lessons/index.js';
import { roadmap } from '#lib/content/roadmap.js';

export function load() {
	return {
		...lessonProgressData(),
		roadmap,
		roadmapLessons: [...lessonsFor('belajar'), ...lessonsFor('iqra')].map(
			({ id, revision, track, competencies }) => ({ id, revision, track, competencies })
		)
	};
}
