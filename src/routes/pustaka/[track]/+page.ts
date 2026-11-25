import { error } from '@sveltejs/kit';
import { localContent } from '#lib/content/local/index.js';

export function entries() {
	return localContent.tracks().map((track) => ({ track: track.slug }));
}

export function load({ params }: { params: { track: string } }) {
	const track = localContent.track(params.track);
	if (!track) error(404, 'Jalur tidak ditemukan');
	const { sourceInfo, ...rest } = track;
	return { track: { ...rest, lessons: localContent.sortedLessons(track) }, source: sourceInfo };
}
