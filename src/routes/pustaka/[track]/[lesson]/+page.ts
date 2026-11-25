import { error } from '@sveltejs/kit';
import { localContent } from '#lib/content/local/index.js';

export function entries() {
	return localContent.lessonEntries();
}

export async function load({ params }: { params: { track: string; lesson: string } }) {
	const track = localContent.track(params.track);
	const meta = track?.lessons.find((lesson) => lesson.slug === params.lesson);
	if (!track || !meta) error(404, 'Pelajaran tidak ditemukan');
	const lesson = await localContent.loadLesson(track.source, meta.id);
	if (!lesson) error(404, 'Berkas pelajaran tidak ditemukan');
	const { previous, next } = localContent.neighbours(track, params.lesson);
	return {
		lesson,
		track: { slug: track.slug, title: track.title, lang: track.lang },
		source: track.sourceInfo,
		previous: previous && { slug: previous.slug, title: previous.title },
		next: next && { slug: next.slug, title: next.title }
	};
}
