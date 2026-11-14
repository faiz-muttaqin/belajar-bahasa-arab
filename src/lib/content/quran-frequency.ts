/**
 * Individually checked factual frequency figures, not a copy of the QAC
 * morphological corpus. An unlisted slug means "not verified", never zero.
 *
 * Non-verbs: QAC Lemmas by Frequency (grouped unless a grammatical reading
 * must be distinguished). Verbs: QAC Verb Concordance, root + form.
 *
 * Do not equate the number of Qur'anic word tokens with the number of lemmas,
 * roots, or orthographic substrings. Attached clitics need separate analysis.
 * See docs/data/quran-frequency-method.md.
 */
import type { QuranFrequency } from '#lib/domain/vocabulary/types.js';

const lemmas = 'https://corpus.quran.com/lemmas.jsp?group=1';
const split = 'https://corpus.quran.com/lemmas.jsp';
const lemmaPage = (page: number) => `https://corpus.quran.com/lemmas.jsp?group=1&page=${page}`;
const verbPage = (page: number) =>
	page === 1 ? 'https://corpus.quran.com/verbs.jsp' : `https://corpus.quran.com/verbs.jsp?page=${page}`;

function mapCounts(
	basis: QuranFrequency['basis'],
	source: string,
	counts: Record<string, number>
): Record<string, QuranFrequency> {
	return Object.fromEntries(
		Object.entries(counts).map(([slug, occurrences]) => [
			slug,
			{ occurrences, basis, source, evidence: 'manually-checked' as const }
		])
	);
}

export const quranFrequencies: Readonly<Record<string, QuranFrequency>> = {
	// Grouped lemmas: one headword may include grammatical forms and some POS.
	...mapCounts('lemma', lemmas, {
		min: 3226,
		fi: 1701,
		ala: 1445,
		ila: 742,
		'an-jarr': 465,
		thumma: 338,
		aw: 280,
		inna: 1682,
		lam: 353,
		qad: 406,
		dhalika: 520,
		ind: 197,
		maa: 159,
		allah: 2699,
		rabb: 975,
		kitab: 260,
		ayah: 382,
		rasul: 332,
		yawm: 405,
		nafs: 295,
		qawm: 383,
		nas: 241,
		ard: 461,
		sama: 310,
		azab: 322,
		haqq: 247,
		khayr: 178,
		alim: 163
	}),
	...mapCounts('lemma', lemmaPage(2), {
		jannah: 147,
		qalb: 132,
		rahim: 116,
		rahmah: 114,
		ilmun: 105,
		din: 92,
		ghafur: 91,
		salah: 83
	}),
	...mapCounts('lemma', lemmaPage(3), { 'maa-air': 63 }),
	...mapCounts('lemma', lemmaPage(4), { sami: 47, nur: 43, kabir: 40 }),
	...mapCounts('lemma', lemmaPage(5), { zakat: 32, karim: 30 }),
	...mapCounts('lemma', lemmaPage(8), { sabr: 15 }),
	// The same spelling is used with different grammatical roles. Do not
	// assign the combined count to an individual reading.
	...mapCounts('lemma', split, {
		'in-shart': 578,
		'an-masdar': 578,
		'la-nafy': 1364,
		'la-nahy': 327,
		hadha: 317,
		alladhi: 1442,
		man: 606,
		ma: 1266,
		'idha-time': 405
	}),
	illa: {
		occurrences: 102,
		basis: 'lemma',
		source: lemmas,
		evidence: 'manually-checked',
		note: 'Hanya kategori exceptive particle (pengecualian), bukan semua fungsi إِلَّا.'
	},
	// The displayed lemma ٱلَّذِى in the corpus covers inflectional variants.
	// Do not also copy this figure onto alladhina.
	// Verbs: each figure is for a particular verb lemma AND verbal form.
	...mapCounts('verb', verbPage(1), {
		qala: 1618,
		kana: 1358,
		amana: 537,
		alima: 382,
		jaala: 340,
		kafara: 289,
		jaa: 278,
		amila: 276,
		aata: 271,
		raa: 271,
		ata: 264,
		khalaqa: 184,
		anzala: 183,
		kadhdhaba: 176,
		daa: 170,
		ittaqa: 166,
		hada: 144,
		arada: 139,
		ittabaa: 136,
		akhadha: 127,
		abada: 122,
		saala: 106,
		wajada: 106,
		akala: 93,
		ghafara: 65
	}),
	...mapCounts('verb', verbPage(2), {
		allama: 41,
		istaghfara: 40
	}),
	...mapCounts('verb', verbPage(4), { qassa: 20 }),
	...mapCounts('verb', verbPage(5), { qaraa: 16 })
};

export function verifiedQuranFrequencyCount(): number {
	return Object.keys(quranFrequencies).length;
}
