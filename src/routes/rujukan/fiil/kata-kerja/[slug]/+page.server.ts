import { error } from '@sveltejs/kit';
import { loadVerbs } from '#lib/content/wiktionary-verbs.server.js';
import { babInfos, groupByLetter, stemWord, toRows } from '#lib/domain/sharaf/wiktionary-verbs.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	const { verbs } = loadVerbs();
	return babInfos
		.filter((info) => verbs.some((v) => v.bab === info.bab))
		.map((info) => ({ slug: info.slug }));
};

export const load: PageServerLoad = ({ params }) => {
	const info = babInfos.find((b) => b.slug === params.slug);
	if (!info) error(404, 'Bab tidak ditemukan');
	const { verbs, translations, google, attribution } = loadVerbs();
	const inBab = verbs.filter((v) => v.bab === info.bab);
	const rows = toRows(inBab, translations, google);
	const byId = new Map(rows.map((row) => [row.id, row]));
	const groups = groupByLetter(inBab, (v) => stemWord(v.ar, v.bab)).map(
		({ letter, verbs: items }) => ({
			letter,
			ids: items.map((v) => v.id)
		})
	);
	return {
		info,
		attribution,
		rows,
		groups,
		translated: inBab.filter((v) => translations[v.id]?.idGlosses.length).length,
		total: byId.size
	};
};
