import { error } from '@sveltejs/kit';
import { grammarTermList } from '#lib/content/grammar-glossary.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => grammarTermList.map(({ id }) => ({ slug: id }));

export const load: PageServerLoad = ({ params }) => {
	const term = grammarTermList.find(({ id }) => id === params.slug);
	if (!term) error(404, 'Istilah tidak ditemukan.');
	const related = grammarTermList
		.filter(({ id }) => id !== term.id)
		.map(({ id, title }) => ({ id, title }));
	return { term, related };
};
