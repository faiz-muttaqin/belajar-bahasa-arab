/**
 * D-05b/c: the small set of verbs that curated G-04 / G-05 frames may use.
 *
 * Forms are recorded, never conjugated. The three D-03 teaching verbs keep their
 * attested madhi / mudhari / lam / lan / amr forms in `verb-frames.ts`. The other
 * verbs list only the madhi and mudhari forms found in data/wiktionary/verbs-form-i.json
 * (English Wiktionary via kaikki.org, CC BY-SA 4.0). Transitivity is scoped to the
 * curated frames: it is not a claim about the verb in general.
 */
import type { VerbValency } from '#lib/domain/grammar/sentence-clause-constraints.js';

export type RecordedVerb = {
	id: string;
	lemma: string;
	meaning: string;
	/** Id of the entry in data/wiktionary/verbs-form-i.json. */
	wiktionaryId: string;
	past: string;
	present: string;
	page: string;
};

const wikt = (word: string) => 'https://en.wiktionary.org/wiki/' + encodeURIComponent(word);

/** Verbs outside D-03. Every value is copied from the Wiktionary Form-I extract. */
export const recordedVerbs: readonly RecordedVerb[] = [
	{
		id: 'wikt-jalasa',
		lemma: 'جَلَسَ',
		meaning: 'duduk',
		wiktionaryId: 'جلس-1',
		past: 'جَلَسَ',
		present: 'يَجْلِسُ',
		page: wikt('جلس')
	},
	{
		id: 'wikt-ghaba',
		lemma: 'غَابَ',
		meaning: 'absen',
		wiktionaryId: 'غاب-1',
		past: 'غَابَ',
		present: 'يَغِيبُ',
		page: wikt('غاب')
	},
	{
		id: 'wikt-dakhala',
		lemma: 'دَخَلَ',
		meaning: 'masuk',
		wiktionaryId: 'دخل-1',
		past: 'دَخَلَ',
		present: 'يَدْخُلُ',
		page: wikt('دخل')
	},
	{
		id: 'wikt-jaa',
		lemma: 'جَاءَ',
		meaning: 'datang',
		wiktionaryId: 'جاء-1',
		past: 'جَاءَ',
		present: 'يَجِيءُ',
		page: wikt('جاء')
	},
	{
		id: 'wikt-hadara',
		lemma: 'حَضَرَ',
		meaning: 'hadir',
		wiktionaryId: 'حضر-1',
		past: 'حَضَرَ',
		present: 'يَحْضُرُ',
		page: wikt('حضر')
	}
];

/**
 * Per-frame valency. Object ids are meaning-checked sample collocations in the
 * curated frames. An unlisted object means "not curated", not "ungrammatical".
 */
export const verbValency: Readonly<Record<string, VerbValency>> = {
	'fiil-kataba': { kind: 'transitive', objectIds: ['msa-risalah', 'msa-kitab', 'curr-dars'] },
	'fiil-qaraa': { kind: 'transitive', objectIds: ['msa-risalah', 'msa-kitab', 'curr-dars'] },
	'fiil-fataha': { kind: 'transitive', objectIds: ['bab', 'msa-kitab'] },
	'wikt-jalasa': { kind: 'intransitive' },
	'wikt-ghaba': { kind: 'intransitive' },
	'wikt-dakhala': { kind: 'intransitive' },
	'wikt-jaa': { kind: 'intransitive' },
	'wikt-hadara': { kind: 'intransitive' }
};

/** Lexeme ids of verbs that must appear in the recorded verb data or in the D-03 registry. */
export const frameVerbIds: readonly string[] = [
	'fiil-kataba',
	'fiil-qaraa',
	'fiil-fataha',
	...recordedVerbs.map((verb) => verb.id)
];

/** Source URLs for the Wiktionary-backed verbs, used when a frame lists them. */
export const wiktionaryPage = (verbId: string): string | undefined =>
	recordedVerbs.find((verb) => verb.id === verbId)?.page;
