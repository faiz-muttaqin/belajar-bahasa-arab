import { firstMainLesson, lessonsFor } from '#lib/content/lessons/index.js';
import { competencies } from '#lib/content/competencies.js';
import { roadmap } from '#lib/content/roadmap.js';
import { presentRoadmap } from '#lib/domain/roadmap/presentation.js';

export function load() {
	const lessons = [...lessonsFor('belajar'), ...lessonsFor('iqra')].map(
		({ id, slug, track, title, goal, minutes }) => ({ id, slug, track, title, goal, minutes })
	);
	return { map: presentRoadmap(roadmap, competencies, lessons), start: firstMainLesson() };
}
