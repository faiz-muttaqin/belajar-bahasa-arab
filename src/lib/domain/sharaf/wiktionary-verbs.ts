/**
 * Form I (tsulatsi mujarrad) verbs extracted from Wiktionary by
 * scripts/build-wiktionary-verbs.mjs. This module only shapes that data for display:
 * grouping by bab and first root letter, and building tile rows. Nothing is invented here.
 */
import type { ReferenceTableData } from '#lib/domain/reference/table.js';

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
	babSource: 'wiktionary-pattern' | 'derived-from-forms' | 'unknown';
	pattern: string | null;
	transitive: boolean;
	en: string[];
	page: string;
};

/** Indonesian meanings, kept apart from the source data so provenance stays clear. */
export type VerbTranslation = { idGlosses: string[]; uncertain?: boolean };

export type BabInfo = {
	slug: string;
	bab: number;
	title: string;
	madhi: string;
	mudhari: string;
	example: string;
};

/** Site order of the six bab, same as the tashrif reference. */
export const babInfos: readonly BabInfo[] = [
	{ slug: '1', bab: 1, title: 'Bab 1 · Menolong', madhi: 'فَعَلَ', mudhari: 'يَفْعُلُ', example: 'نَصَرَ' },
	{ slug: '2', bab: 2, title: 'Bab 2 · Memukul', madhi: 'فَعَلَ', mudhari: 'يَفْعِلُ', example: 'ضَرَبَ' },
	{ slug: '3', bab: 3, title: 'Bab 3 · Membuka', madhi: 'فَعَلَ', mudhari: 'يَفْعَلُ', example: 'فَتَحَ' },
	{ slug: '4', bab: 4, title: 'Bab 4 · Mengetahui', madhi: 'فَعِلَ', mudhari: 'يَفْعَلُ', example: 'عَلِمَ' },
	{ slug: '5', bab: 5, title: 'Bab 5 · Mengira', madhi: 'فَعِلَ', mudhari: 'يَفْعِلُ', example: 'حَسِبَ' },
	{
		slug: '6',
		bab: 6,
		title: 'Bab 6 · Menjadi baik',
		madhi: 'فَعُلَ',
		mudhari: 'يَفْعُلُ',
		example: 'حَسُنَ'
	},
	{ slug: 'lain', bab: 0, title: 'Bab belum diketahui', madhi: '', mudhari: '', example: '' }
];

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

export function groupByLetter<T extends { ar: string }>(items: readonly T[]) {
	const groups = new Map<string, T[]>();
	for (const item of items) {
		const key = letterGroup(item.ar);
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
