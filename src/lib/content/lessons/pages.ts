import { error } from '@sveltejs/kit';
import { lessonsFor } from './index.js';
import type { LessonTrack } from './types.js';

export function lessonPages(track: LessonTrack) {
	const lessons = lessonsFor(track);

	return {
		entries: () => lessons.map(({ slug }) => ({ slug })),
		load: ({ params }: { params: { slug: string } }) => {
			const index = lessons.findIndex((lesson) => lesson.slug === params.slug);
			const lesson = lessons[index];
			if (!lesson) error(404, 'Pelajaran tidak ditemukan.');

			const previous = lessons[index - 1];
			const next = lessons[index + 1];

			return {
				lesson,
				previous: previous && { title: previous.title, slug: previous.slug },
				next: next && { title: next.title, slug: next.slug }
			};
		}
	};
}
