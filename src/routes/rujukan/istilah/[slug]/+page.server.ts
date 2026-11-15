import { error } from '@sveltejs/kit';
import { grammarTermList, grammarTerms } from '#lib/content/grammar-glossary.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => grammarTermList.map(({ id }) => ({ slug: id }));

export const load: PageServerLoad = ({ params }) => {
	const term = grammarTermList.find(({ id }) => id === params.slug);
	if (!term) error(404, 'Istilah tidak ditemukan.');
	const related = term.related.map((id) => ({ id, title: grammarTerms[id].title }));
	return { term, related };
};
