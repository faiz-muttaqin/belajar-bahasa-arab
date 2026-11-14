import { patternCatalog } from '#lib/domain/sharaf/patterns.js';
import type { SharafEntry } from '#lib/domain/sharaf/lexicon.js';

/**
 * SMALL, traceable lexical preview from the owner's 2026-11-14 staging archive.
 * This is NOT a full import of Qutrub, Arramooz, or Arabic Stopwords.
 *
 * Dataset snapshots and upstream row identifiers are retained for audit.
 * Their large, GPL-licensed raw dictionaries are not copied into this app.
 * Only directly observed madhi forms are recorded; mudhari and Indonesian
 * meanings were not present in the preview and must not be invented.
 *
 * See docs/data/sharaf-staging-preview.md before extending this file.
 */
const sources = {
	qutrub: {
		url: 'https://github.com/linuxscout/qutrub/blob/52e1412ccbaaf429136412183318fcbf0cf9bcd7/data/ar_verb_normalized.dict',
		license: 'GPL',
		sourceBab: 'qutrub'
	},
	arramooz: {
		url: 'https://github.com/linuxscout/arramooz/blob/b055c5dea51b8a9152e7e66a7ca3b6f713fb187d/data/verbs/verb_triliteral.csv',
		license: 'GPL-2.0',
		sourceBab: 'arramooz'
	},
	arabicstopwords: {
		url: 'https://github.com/linuxscout/arabicstopwords/blob/f6018e22e02067022231d4dbda0e46b4b1b7e1e7/releases/latest/csv/stopwords_classified.csv',
		license: 'GPL',
		sourceBab: 'not-applicable'
	}
} as const;

type VerbSeed = readonly [
	lemma: string,
	root: string,
	internalBab: number,
	id: string,
	source: 'qutrub' | 'arramooz',
	sourceRowId: string,
	sourceBab: number,
	transitivityOriginal: string
];

const stagedVerbs: readonly VerbSeed[] = [
	['أَبَأَ', 'ءبء', 3, 'ar-verb-3a0b83594d01e8cc39', 'arramooz', 't1', 3, 'م'],
	['أَبَّ', 'ءبب', 1, 'ar-verb-55744d8ae1082deece', 'arramooz', 't2', 1, 'ك'],
	['أَبَّ', 'ءبب', 2, 'ar-verb-a2b8e804d7ee2b70f4', 'arramooz', 't3', 2, 'ك'],
	['أَبَتَ', 'ءبت', 1, 'ar-verb-f6abbbf17520b2cc31', 'arramooz', 't4', 1, 'ل'],
	['أَبَتَ', 'ءبت', 2, 'ar-verb-1f78f312c9e381ed3a', 'arramooz', 't5', 2, 'ل'],
	['أَبِتَ', 'ءبت', 4, 'ar-verb-9585d7f1ad4faf0535', 'arramooz', 't6', 4, 'ل'],
	['أَبَثَ', 'ءبث', 2, 'ar-verb-398059defd3a8c8eac', 'arramooz', 't7', 2, 'ك'],
	['أَبِثَ', 'ءبث', 4, 'ar-verb-4111315e636e2772d8', 'arramooz', 't8', 4, 'ل'],
	['حَسِبَ', 'حسب', 4, 'ar-verb-bd126872fd5126afbb', 'qutrub', 't1386', 4, 'ك'],
	['حَسِبَ', 'حسب', 5, 'ar-verb-640bb8f0eefb034e4a', 'qutrub', 't1388', 6, 'م'],
	['حَسُنَ', 'حسن', 6, 'ar-verb-3ba4873ae4ed415790', 'qutrub', 't1404', 5, 'ل'],
	['ضَرَبَ', 'ضرب', 2, 'ar-verb-28ff56d1ea3a989b7c', 'qutrub', 't2259', 2, 'ك'],
	['عَلِمَ', 'علم', 4, 'ar-verb-14a951aa096906b2fd', 'qutrub', 't2967', 4, 'ك'],
	['فَتَحَ', 'فتح', 3, 'ar-verb-d9529b9da9f279be8e', 'qutrub', 't3325', 3, 'ك'],
	['كَتَبَ', 'كتب', 1, 'ar-verb-de4d9e804aca81a4ac', 'qutrub', 't4065', 1, 'ك'],
	['كَتَبَ', 'كتب', 2, 'ar-verb-992502ac2973cfa7dd', 'qutrub', 't4066', 2, 'ك'],
	['نَصَرَ', 'نصر', 1, 'ar-verb-0b5c0d68b6eb83139b', 'qutrub', 't5353', 1, 'م']
];

type FunctionSeed = readonly [lemma: string, id: string, sourceRow: number];
const stagedFunctionWords: readonly FunctionSeed[] = [
	['أَنَّ', 'ar-function-3414d630254eb43595', 2],
	['إِنَّ', 'ar-function-2f2573dc6c1e92c4f8', 3],
	['عَلًّ', 'ar-function-62ff39e5fa5e68e1aa', 4]
];

export const stagedPreviewCounts = {
	verbSourceRecords: stagedVerbs.length,
	functionWordSourceRecords: stagedFunctionWords.length,
	rootFormCandidatesNotImported: 6
} as const;

export const MISSING_GLOSS = 'Arti Indonesia belum tersedia';

/**
 * Merge by vocalized lemma + root + internal bab (never by undiacritized
 * spelling). Distinct bab variants such as كَتَبَ in Qutrub 1 and 2 survive.
 * Existing, reviewed/teaching examples retain their meanings and forms;
 * extra upstream provenance is appended instead of duplicating them.
 */
export function mergeStagedSharafPreview(existing: readonly SharafEntry[]): SharafEntry[] {
	const entries = [...existing];
	const keys = new Map<string, number>();

	const verbKey = (lemma: string, root: string, number: number) =>
		JSON.stringify([lemma.normalize('NFC'), root.normalize('NFC'), number]);
	for (const [index, entry] of entries.entries()) {
		if (entry.partOfSpeech === 'verb' && entry.root && entry.bab) {
			keys.set(verbKey(entry.lemma, entry.root, entry.bab.number), index);
		}
	}

	for (const [lemma, root, number, id, source, rowId, upstreamBab, transitivity] of stagedVerbs) {
		const pattern = patternCatalog.find((candidate) => candidate.number === number);
		if (!pattern) throw new Error(`Unknown normalized bab ${number} for ${id}`);
		const key = verbKey(lemma, root, number);
		const match = keys.get(key);
		const sourceUrl = sources[source].url;

		if (match !== undefined) {
			const canonical = entries[match]!;
			entries[match] = {
				...canonical,
				sources: [...new Set([...canonical.sources, sourceUrl])]
			};
			continue;
		}

		keys.set(key, entries.length);
		entries.push({
			id,
			lemma,
			meaning: MISSING_GLOSS,
			partOfSpeech: 'verb',
			root,
			bab: {
				number,
				exemplar: pattern.madhi,
				pattern: `${pattern.madhi} – ${pattern.mudhari}`
			},
			forms: [],
			babSelection: 'lexical',
			formBehavior: 'unverified',
			explanation:
				`Entri sampel kamus ${source} (baris ${rowId}; bab sumber ${upstreamBab}, ` +
				`bab internal ${number}; kode transitivitas asli ${transitivity}). Hanya madhi ` +
				'dan akar yang tersedia; mudhari, arti, dan bentuk lainnya belum diverifikasi.',
			sources: [sourceUrl],
			reviewStatus: 'draft'
		});
	}

	for (const [lemma, id, sourceRow] of stagedFunctionWords) {
		if (entries.some((entry) => entry.partOfSpeech === 'particle' && entry.lemma === lemma)) {
			continue;
		}
		entries.push({
			id,
			lemma,
			meaning: MISSING_GLOSS,
			partOfSpeech: 'particle',
			forms: [],
			babSelection: 'not-applicable',
			formBehavior: 'fixed',
			explanation:
				`Kata tugas dari Arabic Stopwords (baris sumber ${sourceRow}; kategori ` +
				'إنّ وأخواتها). Arti dan penggunaan kontekstual belum diverifikasi.',
			sources: [sources.arabicstopwords.url],
			reviewStatus: 'draft'
		});
	}

	return entries;
}
