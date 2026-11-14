import { tashrifIstilahi } from '#lib/content/reference.js';
import { publishedVocabulary } from '#lib/content/vocabulary.js';
import type { SharafEntry } from '#lib/domain/sharaf/lexicon.js';

/**
 * First-party teaching index. Reuses the project's own reference tables.
 * This is deliberately small: no third-party lexicon has been imported.
 */
const babs = [
	{ key: 'nasara', root: 'نصر', meaning: 'menolong', number: 1, exemplar: 'نَصَرَ', pattern: 'فَعَلَ – يَفْعُلُ' },
	{ key: 'daraba', root: 'ضرب', meaning: 'memukul', number: 2, exemplar: 'ضَرَبَ', pattern: 'فَعَلَ – يَفْعِلُ' },
	{ key: 'fataha', root: 'فتح', meaning: 'membuka', number: 3, exemplar: 'فَتَحَ', pattern: 'فَعَلَ – يَفْعَلُ' },
	{ key: 'alima', root: 'علم', meaning: 'mengetahui', number: 4, exemplar: 'عَلِمَ', pattern: 'فَعِلَ – يَفْعَلُ' },
	{ key: 'hasiba', root: 'حسب', meaning: 'mengira', number: 5, exemplar: 'حَسِبَ', pattern: 'فَعِلَ – يَفْعِلُ' },
	{ key: 'hasuna', root: 'حسن', meaning: 'menjadi baik', number: 6, exemplar: 'حَسُنَ', pattern: 'فَعُلَ – يَفْعُلُ' }
] as const;

function referenceForm(rowId: string, column: string): string {
	const value = tashrifIstilahi.rows.find((row) => row.id === rowId)?.cells[column];
	if (!value || value === '—') throw new Error(`Missing reference form: ${rowId}/${column}`);
	return value;
}

const everyday = publishedVocabulary('harian');
function vocabularyWord(id: string) {
	const item = everyday.find((word) => word.id === id);
	if (!item) throw new Error(`Missing vocabulary item: ${id}`);
	return item;
}

const referenceVerbs: SharafEntry[] = babs.map((bab) => ({
	id: `fiil-${bab.key}`,
	lemma: referenceForm('madhi', bab.key),
	meaning: bab.meaning,
	partOfSpeech: 'verb',
	root: bab.root,
	bab: { number: bab.number, exemplar: bab.exemplar, pattern: bab.pattern },
	forms: tashrifIstilahi.rows
		.filter((row) => row.cells[bab.key] && row.cells[bab.key] !== '—')
		.map((row) => ({ label: row.id, value: row.cells[bab.key]! })),
	babSelection: 'lexical',
	formBehavior: 'regular',
	explanation:
		'Bab tsulatsi mujarrad ditentukan dari pasangan madhi–mudhari yang digunakan, bukan dari akar konsonannya saja. Setelah bab diketahui, bentuk reguler mengikuti polanya.',
	sources: tashrifIstilahi.sources,
	reviewStatus: 'draft'
}));

const kataba = vocabularyWord('kataba');
const maftuh = vocabularyWord('maftuh');
const fi = vocabularyWord('fi');
const thumma = vocabularyWord('thumma');
const qaraa = vocabularyWord('qaraa');
const connectors = [fi, thumma];

const additional: SharafEntry[] = [
	{
		id: 'fiil-kataba',
		lemma: kataba.arabic,
		meaning: 'menulis',
		partOfSpeech: 'verb',
		root: 'كتب',
		bab: { number: 1, exemplar: 'نَصَرَ', pattern: 'فَعَلَ – يَفْعُلُ' },
		forms: [{ label: 'mudhari', value: 'يَكْتُبُ' }],
		babSelection: 'lexical',
		formBehavior: 'regular',
		explanation:
			'كَتَبَ – يَكْتُبُ masuk bab نَصَرَ. Pemilihan bab perlu data leksikal; tashrif berikutnya mengikuti kaidah reguler.',
		sources: kataba.sources,
		reviewStatus: 'draft'
	},
	{
		id: 'fiil-qaraa',
		lemma: qaraa.arabic,
		meaning: 'membaca',
		partOfSpeech: 'verb',
		root: 'قرأ',
		bab: { number: 3, exemplar: 'فَتَحَ', pattern: 'فَعَلَ – يَفْعَلُ' },
		forms: [{ label: 'mudhari', value: 'يَقْرَأُ' }],
		babSelection: 'lexical',
		formBehavior: 'special-rule',
		explanation:
			'قَرَأَ – يَقْرَأُ mengikuti pola bab فَتَحَ, tetapi memiliki hamzah asli (mahmuz). Hamzah bukan alasan menganggap semua tashrifnya tidak beraturan.',
		sources: qaraa.sources,
		reviewStatus: 'draft'
	},
	{
		id: 'fiil-qala',
		lemma: 'قَالَ',
		meaning: 'berkata',
		partOfSpeech: 'verb',
		root: 'قول',
		bab: { number: 1, exemplar: 'نَصَرَ', pattern: 'فَعَلَ – يَفْعُلُ' },
		forms: [
			{ label: 'mudhari', value: 'يَقُولُ' },
			{ label: 'amr', value: 'قُلْ' }
		],
		babSelection: 'lexical',
		formBehavior: 'special-rule',
		explanation:
			'قَالَ – يَقُولُ – قُلْ adalah fi’il mu’tal ajwaf. Perubahan huruf illat mengikuti kaidah i‘lal khusus, bukan irregular tanpa pola.',
		sources: ['https://corpus.quran.com/qurandictionary.jsp?q=qwl'],
		reviewStatus: 'draft'
	},
	{
		id: 'isim-maftuh',
		lemma: maftuh.arabic,
		meaning: maftuh.meaning,
		partOfSpeech: 'noun',
		root: 'فتح',
		forms: [{ label: 'Dasar fi’il terkait', value: 'فَتَحَ' }],
		babSelection: 'not-applicable',
		formBehavior: 'regular',
		explanation: 'مَفْتُوحٌ adalah isim maf’ul, bukan fi’il yang mempunyai nomor bab sendiri. Keluarga akar katanya ف ت ح.',
		sources: maftuh.sources,
		reviewStatus: 'draft'
	},
	...connectors.map((word): SharafEntry => ({
		id: `partikel-${word.id}`,
		lemma: word.arabic,
		meaning: word.meaning,
		partOfSpeech: 'particle',
		forms: [],
		babSelection: 'not-applicable',
		formBehavior: 'fixed',
		explanation: 'Ini kata tugas. Hafalkan fungsi dan contoh pemakaiannya, bukan mencari bab tashrif fi’il.',
		sources: word.sources,
		reviewStatus: 'draft'
	}))
];

export const sharafEntries: readonly SharafEntry[] = [...referenceVerbs, ...additional];
