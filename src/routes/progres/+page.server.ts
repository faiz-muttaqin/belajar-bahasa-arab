import { lessonProgressData, lessonsFor, evidenceItems } from '#lib/content/lessons/index.js';
import { roadmap } from '#lib/content/roadmap.js';
import { competencies } from '#lib/content/competencies.js';

export function load() {
	return {
		evidenceItems,
		competencies: competencies.map(({ id, canDo }) => ({ id, canDo })),
		...lessonProgressData(),
		roadmap,
		roadmapLessons: [...lessonsFor('belajar'), ...lessonsFor('iqra')].map(
			({ id, revision, track, competencies }) => ({ id, revision, track, competencies })
		)
	};
}
