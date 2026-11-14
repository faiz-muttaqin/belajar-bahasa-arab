import { patternCatalog } from './patterns.js';
import type { SharafEntry } from './lexicon.js';

/**
 * This GPL-2.0 dataset is a separate static asset, not imported into the JS
 * bundle at build time. Raw sources, transformation and license live in
 * data/sharaf-upstream/. See docs/data/sharaf-full-import.md.
 */
export const BULK_SHARAF_PATH = 'data/sharaf-lexicon-v1.json';
export const BULK_SHARAF_REVISION = 'q400bdc3-a-d5ff8ffe-sf72f8b';
export const BULK_SHARAF_GLOSS_MISSING = 'Arti Indonesia belum tersedia';

type BulkVerb = [
	lemma: string,
	root: string,
	bab: number,
	qutrubTransitivity: string,
	arramoozTransitivity: string,
	qutrubIds: string,
	arramoozIds: string
];

type BulkFunctionWord = [
	vocalized: string,
	unvocalized: string,
	sourceType: string,
	sourceClass: string,
	sourceLine: number
];

export type BulkSharafLexicon = {
	schema: 1;
	revision: string;
	license: string;
	totals: { uniqueVerbs: number; qutrub: number; arramooz: number; stopwordRecords: number };
	verbs: BulkVerb[];
	words: BulkFunctionWord[];
};

export function isBulkSharafLexicon(value: unknown): value is BulkSharafLexicon {
	if (!value || typeof value !== 'object') return false;
	const data = value as Partial<BulkSharafLexicon>;
	if (
		data.schema !== 1 ||
		data.revision !== BULK_SHARAF_REVISION ||
		data.license !== 'GPL-2.0' ||
		!Array.isArray(data.verbs) ||
		!Array.isArray(data.words) ||
		!data.totals ||
		data.totals.uniqueVerbs !== 7938 ||
		data.totals.qutrub !== 7889 ||
		data.totals.arramooz !== 7952 ||
		data.totals.stopwordRecords !== 596 ||
		data.verbs.length !== data.totals.uniqueVerbs ||
		data.words.length !== data.totals.stopwordRecords
	) return false;

	const seen = new Set<string>();
	for (const row of data.verbs) {
		if (
			!Array.isArray(row) ||
			row.length !== 7 ||
			typeof row[0] !== 'string' ||
			typeof row[1] !== 'string' ||
			!Number.isInteger(row[2]) ||
			row[2] < 1 ||
			row[2] > 6 ||
			![3, 4, 5, 6].every((i) => typeof row[i] === 'string')
		) return false;
		const key = JSON.stringify([row[0].normalize('NFC'), row[1].normalize('NFC'), row[2]]);
		if (seen.has(key)) return false;
		seen.add(key);
	}
	return data.words.every(
		(row) =>
			Array.isArray(row) &&
			row.length === 5 &&
			row.slice(0, 4).every((value) => typeof value === 'string') &&
			Number.isInteger(row[4])
	);
}

const qutrubUrl =
	'https://github.com/linuxscout/qutrub/blob/52e1412ccbaaf429136412183318fcbf0cf9bcd7/data/ar_verb_normalized.dict';
const arramoozUrl =
	'https://github.com/linuxscout/arramooz/blob/b055c5dea51b8a9152e7e66a7ca3b6f713fb187d/data/verbs/verb_triliteral.csv';
const stopwordsUrl =
	'https://github.com/linuxscout/arabicstopwords/blob/f6018e22e02067022231d4dbda0e46b4b1b7e1e7/releases/latest/csv/stopwords_classified.csv';

const mergedCache = new WeakMap<readonly SharafEntry[], WeakMap<BulkSharafLexicon, readonly SharafEntry[]>>();

/** Do not infer mudhari, masdar or Indonesian gloss from a root/bab alone. */
export function mergeBulkSharaf(
	firstParty: readonly SharafEntry[],
	bulk: BulkSharafLexicon | undefined
): readonly SharafEntry[] {
	if (!bulk) return firstParty;
	const existing = mergedCache.get(firstParty)?.get(bulk);
	if (existing) return existing;
	const rows = [...firstParty];
	const verbKeys = new Set(
		firstParty
			.filter((entry) => entry.partOfSpeech === 'verb' && entry.root && entry.bab)
			.map((entry) =>
				JSON.stringify([entry.lemma.normalize('NFC'), entry.root!.normalize('NFC'), entry.bab!.number])
			)
	);
	const wordKeys = new Set(
		firstParty.filter((entry) => entry.partOfSpeech !== 'verb').map((entry) => entry.lemma.normalize('NFC'))
	);
	for (const [lemma, root, bab, qTrans, aTrans, qIds, aIds] of bulk.verbs) {
		const key = JSON.stringify([lemma, root, bab]);
		if (verbKeys.has(key)) continue;
		verbKeys.add(key);
		const pattern = patternCatalog.find((candidate) => candidate.number === bab);
		if (!pattern) throw new Error('Pola bab tidak ditemukan: ' + bab);
		const code = qIds ? `qutrub-${qIds.split(',')[0]}` : `arramooz-${aIds.split(',')[0]}`;
		rows.push({
			id: `bulk-${code}-bab-${bab}`,
			lemma,
			root,
			meaning: BULK_SHARAF_GLOSS_MISSING,
			partOfSpeech: 'verb',
			bab: { number: bab, exemplar: pattern.madhi, pattern: `${pattern.madhi} – ${pattern.mudhari}` },
			forms: [],
			babSelection: 'lexical',
			formBehavior: 'unverified',
			explanation:
				`Dari kamus Qutrub (${qIds || 'tidak tercatat'}; transitivitas ${qTrans || '—'}) dan ` +
				`Arramooz (${aIds || 'tidak tercatat'}; transitivitas ${aTrans || '—'}). ` +
				`Bab ${bab} telah dipetakan dari kode sumber. Hanya bentuk madhi dan akar yang tersedia. ` +
				'Mudhari, mashdar, arti Indonesia dan bentuk turunan perlu pemeriksaan sumber lain.',
			sources: [qIds ? qutrubUrl : undefined, aIds ? arramoozUrl : undefined].filter(
				(url): url is string => Boolean(url)
			),
			reviewStatus: 'draft'
		});
	}

	// Original labels matter: an Arabic pronoun (ضمير) is an ism, not a fi'il.
	// Some stopwords files also contain conjugated auxiliaries or alphabet signs;
	// these are kept in the raw archive but not misclassified in the glossary.
	for (const [lemma, , type, originalClass, line] of bulk.words) {
		const partOfSpeech =
			type === 'حرف'
				? 'particle'
				: ['اسم', 'ضمير', 'اسم فعل'].includes(type)
					? 'noun'
					: undefined;
		if (!partOfSpeech || wordKeys.has(lemma.normalize('NFC'))) continue;
		wordKeys.add(lemma.normalize('NFC'));
		rows.push({
			id: `bulk-stopwords-${line}`,
			lemma,
			meaning: BULK_SHARAF_GLOSS_MISSING,
			partOfSpeech,
			forms: [],
			babSelection: 'not-applicable',
			formBehavior: 'unverified',
			explanation: `Kelas kata menurut Arabic Stopwords: ${type} / ${originalClass}. Baris sumber ${line}. Tidak mempunyai nomor bab tashrif verba.`,
			sources: [stopwordsUrl],
			reviewStatus: 'draft'
		});
	}

	let byBulk = mergedCache.get(firstParty);
	if (!byBulk) {
		byBulk = new WeakMap();
		mergedCache.set(firstParty, byBulk);
	}
	byBulk.set(bulk, rows);
	return rows;
}
