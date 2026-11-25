import { localContent } from '#lib/content/local/index.js';

export function load() {
	return {
		sources: localContent.sources().map(({ source, tracks, vocabSets, tables }) => ({
			source,
			tracks: tracks.map(({ id, slug, title, description, lang, lessons }) => ({
				id,
				slug,
				title,
				description,
				lang,
				lessonCount: lessons.length
			})),
			vocabSets,
			tables
		}))
	};
}
