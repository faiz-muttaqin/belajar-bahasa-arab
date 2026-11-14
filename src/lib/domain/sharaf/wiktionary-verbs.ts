/**
 * Form I (tsulatsi mujarrad) verbs extracted from Wiktionary by
 * scripts/build-wiktionary-verbs.mjs. This module only shapes that data for display:
 * grouping by bab and first root letter, and building tile rows. Nothing is invented here.
 */
import type { ReferenceTableData } from '#lib/domain/reference/table.js';
import { patternCatalog } from './patterns.js';

export type WiktionaryVerb = {
	id: string;
	ar: string;
	tr?: string;
	nonPast?: string;
	verbalNouns: string[];
	activeParticiple?: string;
	passiveParticiple?: string;
	bab: number;
	altBabs: number[];
	babSource: 'wiktionary-pattern' | 'derived-from-forms' | 'wiktionary-form' | 'unknown';
	/** Wiktionary verb form (I to XIII, Iq to IVq); only set for forms other than I. */
	form?: string;
	pattern: string | null;
	transitive: boolean;
	en: string[];
	page: string;
};

/** Indonesian meanings, kept apart from the source data so provenance stays clear. */
export type VerbTranslation = { idGlosses: string[]; uncertain?: boolean };

export type BabInfo = {
	slug: string;
	/** Group number 1 to 22 (site order), or 0 for "belum diketahui". */
	bab: number;
	title: string;
	family: string;
	madhi: string;
	mudhari: string;
	example: string;
};

const sixNames: Record<number, [string, string]> = {
	1: ['Menolong', 'نَصَرَ'],
	2: ['Memukul', 'ضَرَبَ'],
	3: ['Membuka', 'فَتَحَ'],
	4: ['Mengetahui', 'عَلِمَ'],
	5: ['Mengira', 'حَسِبَ'],
	6: ['Menjadi baik', 'حَسُنَ']
};

/** All 22 groups in site order (same numbering as the tashrif table) plus an unknown group. */
export const babInfos: readonly BabInfo[] = [
	...patternCatalog.map((pattern) => {
		const named = sixNames[pattern.number];
		return {
			slug: String(pattern.number),
			bab: pattern.number,
			title: named ? `Bab ${pattern.number} · ${named[0]}` : `Bab ${pattern.number}`,
			family: pattern.familyLabel,
			madhi: pattern.madhi,
			mudhari: pattern.mudhari,
			example: named?.[1] ?? ''
		};
	}),
	{
		slug: 'lain',
		bab: 0,
		title: 'Bab belum diketahui',
		family: '',
		madhi: '',
		mudhari: '',
		example: ''
	}
];

/**
 * Letters that belong to the wazan, not to the root, at the start of a madhi form. Removed
 * before grouping so mazid verbs sort by their first root letter, not by "ا" or "ت".
 */
const wazanPrefix: Record<number, string> = {
	9: 'أ',
	10: 'ت',
	11: 'ت',
	12: 'ا',
	13: 'ان',
	14: 'ا',
	15: 'است',
	16: 'ا',
	17: 'ا',
	18: 'ا',
	20: 'ت',
	21: 'ا',
	22: 'ا'
};

const MARKS = /[\u064B-\u0652\u0670]/g;

/** The word without the wazan prefix, used to group mazid verbs by first root letter. */
export function stemWord(arabic: string, bab: number): string {
	const bare = arabic
		.normalize('NFC')
		.replace(/\u0640/g, '')
		.replace(MARKS, '')
		.replace(/[ٱإآ]/g, 'ا');
	const prefix = wazanPrefix[bab];
	return prefix && bare.startsWith(prefix) && bare.length - prefix.length >= 2
		? bare.slice(prefix.length)
		: bare;
}

const alefs = new Set(['ا', 'أ', 'إ', 'آ', 'ٱ', 'ء', 'ؤ', 'ئ']);
const order = 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي';

/** First letter group of the word, with every alef and hamza form merged into أ. */
export function letterGroup(arabic: string): string {
	const first = [...arabic.normalize('NFC')].find((ch) => /[ء-يٱ]/.test(ch)) ?? '';
	if (alefs.has(first)) return 'أ';
	if (first === 'ة') return 'ت';
	if (first === 'ى') return 'ي';
	return first;
}

export function groupByLetter<T extends { ar: string }>(
	items: readonly T[],
	word: (item: T) => string = (item) => item.ar
) {
	const groups = new Map<string, T[]>();
	for (const item of items) {
		const key = letterGroup(word(item));
		groups.set(key, [...(groups.get(key) ?? []), item]);
	}
	return [...groups.entries()]
		.sort(([a], [b]) => ((order.indexOf(a) + 100) % 100) - ((order.indexOf(b) + 100) % 100))
		.map(([letter, verbs]) => ({ letter, verbs }));
}

const comma = '، ';
const short = (glosses: readonly string[]) => glosses.slice(0, 2).join('; ');

/** One tile row per verb, for the shared word grid. Empty fields are left out. */
export function toRows(
	verbs: readonly WiktionaryVerb[],
	translations: Readonly<Record<string, VerbTranslation>>,
	google: Readonly<Record<string, string>>
): ReferenceTableData['rows'] {
	return verbs.map((v) => {
		const idGlosses = translations[v.id]?.idGlosses ?? [];
		const cells: Record<string, string> = {
			arabic: v.ar,
			meaning: idGlosses.length ? short(idGlosses) : (v.en[0] ?? 'Arti belum tersedia'),
			page: v.page
		};
		const set = (key: string, value: string | undefined) => {
			if (value) cells[key] = value;
		};
		set('tr', v.tr);
		set('nonPast', v.nonPast);
		set('masdar', v.verbalNouns.join(comma));
		set('participles', [v.activeParticiple, v.passiveParticiple].filter(Boolean).join(comma));
		set('idFull', idGlosses.join('; '));
		set('en', v.en.join('; '));
		set('google', google[v.id]);
		set('type', v.transitive ? 'Transitif (membutuhkan objek)' : undefined);
		if (v.altBabs.length)
			cells.babNote = `Wiktionary juga mencatat bab ${v.altBabs.join(', ')} untuk kata ini.`;
		return { id: v.id, cells };
	});
}
