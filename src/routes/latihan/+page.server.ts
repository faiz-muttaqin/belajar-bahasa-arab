import { lessonsFor } from '#lib/content/lessons/index.js';

export function load() {
	return {
		lessons: [...lessonsFor('belajar'), ...lessonsFor('iqra')].map(
			({ id, track, slug, title, level, exercises }) => ({
				id,
				track,
				slug,
				title,
				level,
				count: exercises.length
			})
		)
	};
}
