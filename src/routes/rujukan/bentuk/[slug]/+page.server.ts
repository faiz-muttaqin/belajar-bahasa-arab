import { error } from '@sveltejs/kit';
import { morphologyGuideList, morphologyGuides } from '#lib/content/morphology-guides.js';
import type { TashrifColumnKey } from '#lib/domain/sharaf/matrix.js';
import type { EntryGenerator, PageServerLoad } from './$types';

// All eleven explanations have concrete HTML when JavaScript is disabled.
export const entries: EntryGenerator = () =>
	morphologyGuideList.map(({ key }) => ({ slug: key }));

export const load: PageServerLoad = ({ params }) => {
	const guide = morphologyGuides[params.slug as TashrifColumnKey];
	if (!guide || guide.key !== params.slug) error(404, 'Bentuk tashrif belum tersedia.');
	return {
		guide,
		related: guide.related.map((key) => ({ key, title: morphologyGuides[key].title }))
	};
};
