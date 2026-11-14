import { searchSharaf, type SharafEntry } from './lexicon.js';
import { patternCatalog, type PatternFamily } from './patterns.js';

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

/**
 * Teaching wazan corresponding to the eleven reference-table rows. These are
 * *examples of form templates*, not claims that every masdar, ism makan or
 * instrument can be derived mechanically for every Arabic lexeme.
 *
 * Bab numbering deliberately follows this project's existing reference table.
 */
export const referenceWazans: Readonly<
	Record<number, Readonly<Partial<Record<TashrifColumnKey, string>>>>
> = {
	1: {
		madhi: 'فَعَلَ',
		mudhari: 'يَفْعُلُ',
		mashdar: 'فَعْلٌ',
		mimi: 'مَفْعَلٌ',
		fail: 'فَاعِلٌ',
		maful: 'مَفْعُولٌ',
		amr: 'اُفْعُلْ',
		nahy: 'لَا تَفْعُلْ',
		zaman: 'مَفْعَلٌ',
		makan: 'مَفْعَلٌ',
		alah: 'مِفْعَلٌ'
	},
	2: {
		madhi: 'فَعَلَ',
		mudhari: 'يَفْعِلُ',
		mashdar: 'فَعْلٌ',
		mimi: 'مَفْعَلٌ',
		fail: 'فَاعِلٌ',
		maful: 'مَفْعُولٌ',
		amr: 'اِفْعِلْ',
		nahy: 'لَا تَفْعِلْ',
		zaman: 'مَفْعِلٌ',
		makan: 'مَفْعِلٌ',
		alah: 'مِفْعَلٌ'
	},
	3: {
		madhi: 'فَعَلَ',
		mudhari: 'يَفْعَلُ',
		mashdar: 'فَعْلٌ',
		mimi: 'مَفْعَلٌ',
		fail: 'فَاعِلٌ',
		maful: 'مَفْعُولٌ',
		amr: 'اِفْعَلْ',
		nahy: 'لَا تَفْعَلْ',
		zaman: 'مَفْعَلٌ',
		makan: 'مَفْعَلٌ',
		alah: 'مِفْعَالٌ'
	},
	4: {
		madhi: 'فَعِلَ',
		mudhari: 'يَفْعَلُ',
		mashdar: 'فِعْلٌ',
		mimi: 'مَفْعَلٌ',
		fail: 'فَاعِلٌ',
		maful: 'مَفْعُولٌ',
		amr: 'اِفْعَلْ',
		nahy: 'لَا تَفْعَلْ',
		zaman: 'مَفْعَلٌ',
		makan: 'مَفْعَلٌ'
	},
	5: {
		madhi: 'فَعِلَ',
		mudhari: 'يَفْعِلُ',
		mashdar: 'فُعْلَانٌ',
		mimi: 'مَفْعَلٌ',
		fail: 'فَاعِلٌ',
		maful: 'مَفْعُولٌ',
		amr: 'اِفْعِلْ',
		nahy: 'لَا تَفْعِلْ',
		zaman: 'مَفْعِلٌ',
		makan: 'مَفْعِلٌ'
	},
	6: {
		madhi: 'فَعُلَ',
		mudhari: 'يَفْعُلُ',
		mashdar: 'فُعْلٌ',
		mimi: 'مَفْعَلٌ',
		fail: 'فَعَلٌ',
		amr: 'اُفْعُلْ',
		nahy: 'لَا تَفْعُلْ',
		zaman: 'مَفْعَلٌ',
		makan: 'مَفْعَلٌ'
	}
};

export function referenceWazanValue(bab: number, key: TashrifColumnKey): string | undefined {
	return referenceWazans[bab]?.[key] ?? patternCatalog.find((pattern) => pattern.number === bab)?.[key];
}

export type BabGroup = {
	number: number;
	exemplar: string;
	pattern: string;
	family: PatternFamily;
	familyLabel: string;
	count: number;
	notes: string;
	source: string;
};

/** Render all 22 teaching rows, including patterns without an attested glossary entry. */
export function babGroups(entries: readonly SharafEntry[]): BabGroup[] {
	return patternCatalog.map((pattern) => ({
		number: pattern.number,
		exemplar: pattern.madhi,
		pattern: `${pattern.madhi} – ${pattern.mudhari}`,
		family: pattern.family,
		familyLabel: pattern.familyLabel,
		count: entries.filter((entry) => entry.partOfSpeech === 'verb' && entry.bab?.number === pattern.number).length,
		notes: pattern.notes,
		source: pattern.source
	}));
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
