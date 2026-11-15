import { firstMainLesson, lessonsFor, evidenceItems } from '#lib/content/lessons/index.js';
import { competencies } from '#lib/content/competencies.js';
import { roadmap } from '#lib/content/roadmap.js';
import { presentRoadmap } from '#lib/domain/roadmap/presentation.js';

export function load() {
	const lessons = [...lessonsFor('belajar'), ...lessonsFor('iqra')].map(
		({ id, slug, track, title, goal, minutes }) => ({ id, slug, track, title, goal, minutes })
	);
	return {
		evidenceItems,
		map: presentRoadmap(roadmap, competencies, lessons),
		roadmap,
		roadmapLessons: [...lessonsFor('belajar'), ...lessonsFor('iqra')].map(
			({ id, revision, track, competencies }) => ({ id, revision, track, competencies })
		),
		start: firstMainLesson()
	};
}
