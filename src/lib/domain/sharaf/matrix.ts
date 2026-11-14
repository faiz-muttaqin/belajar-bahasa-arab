import { searchSharaf, type SharafEntry } from './lexicon.js';

export const tashrifColumns = [
	{ key: 'madhi', label: 'fi’il madhi' },
	{ key: 'mudhari', label: 'fi’il mudhari’' },
	{ key: 'mashdar', label: 'mashdar' },
	{ key: 'mimi', label: 'mashdar mimi' },
	{ key: 'fail', label: 'isim fa’il / sifat' },
	{ key: 'maful', label: 'isim maf’ul' },
	{ key: 'amr', label: 'fi’il amr' },
	{ key: 'nahy', label: 'fi’il nahy' },
	{ key: 'zaman', label: 'isim zaman' },
	{ key: 'makan', label: 'isim makan' },
	{ key: 'alah', label: 'isim alat' }
] as const;

export type TashrifColumnKey = (typeof tashrifColumns)[number]['key'];
export type BabGroup = { number: number; exemplar: string; pattern: string; count: number };

export function babGroups(entries: readonly SharafEntry[]): BabGroup[] {
	const verbs = entries.filter((entry) => entry.partOfSpeech === 'verb' && entry.bab);
	const numbers = new Set(verbs.map((entry) => entry.bab!.number));
	return [...numbers]
		.sort((a, b) => a - b)
		.map((number) => {
			const members = verbs.filter((entry) => entry.bab?.number === number);
			return {
				number,
				exemplar: members[0]!.bab!.exemplar,
				pattern: members[0]!.bab!.pattern,
				count: members.length
			};
		});
}

/** Never generate forms that have not been explicitly recorded in the glossary. */
export function tashrifValue(entry: SharafEntry, key: TashrifColumnKey): string | undefined {
	if (key === 'madhi' && entry.partOfSpeech === 'verb') return entry.lemma;
	return entry.forms.find((form) => form.label.toLowerCase() === key)?.value;
}

export function selectableVerbs(
	entries: readonly SharafEntry[],
	bab: number | 'all',
	query: string
): SharafEntry[] {
	return searchSharaf(entries, query, 'verb').filter(
		(entry) => entry.bab && (bab === 'all' || entry.bab.number === bab)
	);
}

/**
 * One selected lexical verb per bab; no mixing of rows from different paradigms.
 * Initially show the reference exemplar for every bab, if present.
 */
export function selectedBabRows(
	entries: readonly SharafEntry[],
	overrides: Readonly<Record<number, string>>,
	bab: number | 'all'
): SharafEntry[] {
	return babGroups(entries)
		.filter((group) => bab === 'all' || group.number === bab)
		.flatMap((group) => {
			const verbs = entries.filter(
				(entry) => entry.partOfSpeech === 'verb' && entry.bab?.number === group.number
			);
			const selected = verbs.find((entry) => entry.id === overrides[group.number]);
			const exemplar = verbs.find((entry) => entry.lemma === group.exemplar);
			const fallback = selected ?? exemplar ?? verbs[0];
			return fallback ? [fallback] : [];
		});
}
