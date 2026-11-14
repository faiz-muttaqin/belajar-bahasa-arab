import { tashrifIstilahi } from '#lib/content/reference.js';
import { publishedVocabulary } from '#lib/content/vocabulary.js';
import { mergeStagedSharafPreview } from '#lib/content/sharaf-staging-preview.js';
import type { SharafEntry } from '#lib/domain/sharaf/lexicon.js';
import type { TashrifColumnKey } from '#lib/domain/sharaf/matrix.js';
import { patternCatalog } from '#lib/domain/sharaf/patterns.js';

/**
 * First-party teaching index. Reuses the project's own reference tables.
 * This is deliberately small: no third-party lexicon has been imported.
 */
const babs = [
	{
		key: 'nasara',
		root: 'نصر',
		meaning: 'menolong',
		number: 1,
		exemplar: 'نَصَرَ',
		pattern: 'فَعَلَ – يَفْعُلُ'
	},
	{
		key: 'daraba',
		root: 'ضرب',
		meaning: 'memukul',
		number: 2,
		exemplar: 'ضَرَبَ',
		pattern: 'فَعَلَ – يَفْعِلُ'
	},
	{
		key: 'fataha',
		root: 'فتح',
		meaning: 'membuka',
		number: 3,
		exemplar: 'فَتَحَ',
		pattern: 'فَعَلَ – يَفْعَلُ'
	},
	{
		key: 'alima',
		root: 'علم',
		meaning: 'mengetahui',
		number: 4,
		exemplar: 'عَلِمَ',
		pattern: 'فَعِلَ – يَفْعَلُ'
	},
	{
		key: 'hasiba',
		root: 'حسب',
		meaning: 'mengira',
		number: 5,
		exemplar: 'حَسِبَ',
		pattern: 'فَعِلَ – يَفْعِلُ'
	},
	{
		key: 'hasuna',
		root: 'حسن',
		meaning: 'menjadi baik',
		number: 6,
		exemplar: 'حَسُنَ',
		pattern: 'فَعُلَ – يَفْعُلُ'
	}
] as const;

const referenceMeanings: Record<string, Partial<Record<TashrifColumnKey, string>>> = {
	nasara: {
		mashdar: 'pertolongan',
		mimi: 'pertolongan',
		fail: 'penolong',
		maful: 'yang ditolong',
		amr: 'tolonglah!',
		nahy: 'jangan menolong!',
		zaman: 'waktu menolong',
		makan: 'tempat menolong',
		alah: 'alat bantu'
	},
	daraba: {
		mashdar: 'pukulan',
		mimi: 'pemukulan',
		fail: 'pemukul (orang)',
		maful: 'yang dipukul',
		amr: 'pukullah!',
		nahy: 'jangan memukul!',
		zaman: 'waktu memukul',
		makan: 'tempat memukul',
		alah: 'alat pemukul'
	},
	fataha: {
		mashdar: 'pembukaan',
		mimi: 'pembukaan',
		fail: 'pembuka',
		maful: 'yang dibuka',
		amr: 'bukalah!',
		nahy: 'jangan membuka!',
		zaman: 'waktu membuka',
		makan: 'tempat membuka',
		alah: 'kunci'
	},
	alima: {
		mashdar: 'pengetahuan',
		mimi: 'hal mengetahui',
		fail: 'orang yang tahu',
		maful: 'yang diketahui',
		amr: 'ketahuilah!',
		nahy: 'jangan sampai tahu!',
		zaman: 'waktu mengetahui',
		makan: 'tempat mengetahui'
	},
	hasiba: {
		mashdar: 'perhitungan',
		mimi: 'hal mengira',
		fail: 'orang yang menghitung',
		maful: 'yang dihitung',
		amr: 'kiralah!',
		nahy: 'jangan mengira!',
		zaman: 'waktu mengira',
		makan: 'tempat mengira'
	},
	hasuna: {
		mashdar: 'kebaikan',
		mimi: 'hal menjadi baik',
		fail: 'baik (sifat)',
		amr: 'jadilah baik!',
		nahy: 'jangan menjadi baik!',
		zaman: 'waktu menjadi baik',
		makan: 'tempat menjadi baik'
	}
};

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
		.map((row) => ({
			label: row.id,
			value: row.cells[bab.key]!,
			meaning: referenceMeanings[bab.key]?.[row.id as TashrifColumnKey]
		})),
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
		id: 'fiil-akala',
		lemma: 'أَكَلَ',
		meaning: 'makan',
		partOfSpeech: 'verb',
		root: 'أكل',
		bab: { number: 1, exemplar: 'نَصَرَ', pattern: 'فَعَلَ – يَفْعُلُ' },
		forms: [
			{ label: 'mudhari', value: 'يَأْكُلُ' },
			{ label: 'mashdar', value: 'أَكْلٌ', meaning: 'kegiatan makan' },
			{ label: 'mimi', value: 'مَأْكَلٌ', meaning: 'kegiatan makan' },
			{ label: 'fail', value: 'آكِلٌ', meaning: 'orang yang makan' },
			{ label: 'maful', value: 'مَأْكُولٌ', meaning: 'yang dimakan' },
			{ label: 'amr', value: 'كُلْ', meaning: 'makanlah!' },
			{ label: 'nahy', value: 'لَا تَأْكُلْ', meaning: 'jangan makan!' },
			{ label: 'zaman', value: 'مَأْكَلٌ', meaning: 'waktu makan' },
			{ label: 'makan', value: 'مَأْكَلٌ', meaning: 'tempat makan' }
		],
		babSelection: 'lexical',
		formBehavior: 'special-rule',
		explanation:
			'أَكَلَ – يَأْكُلُ mengikuti pasangan madhi–mudhari bab pertama. Hamzah awal kata dasar dilepas dalam bentuk perintah yang lazim, كُلْ. Kata مَأْكَلٌ dapat menunjukkan kegiatan, waktu, atau tempat sesuai konteks.',
		sources: [
			'https://www.arabicacademy.gov.eg/ar/search_engine/roots/%D8%A3%D9%83%D9%84',
			'https://faculty.kfupm.edu.sa/ics/sukairi/swe423%28021%29/schoolarabia/arabic/masadr_moshtaqat/masader_moshtaqat13.htm',
			'https://qkt.journals.ekb.eg/article_47844_be91503905660c8fe032b8a033f5523a.pdf'
		],
		reviewStatus: 'draft'
	},
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
		explanation:
			'مَفْتُوحٌ adalah isim maf’ul, bukan fi’il yang mempunyai nomor bab sendiri. Keluarga akar katanya ف ت ح.',
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
		explanation:
			'Ini kata tugas. Hafalkan fungsi dan contoh pemakaiannya, bukan mencari bab tashrif fi’il.',
		sources: word.sources,
		reviewStatus: 'draft'
	}))
];

/**
 * Lexical examples for the sixteen additional teaching patterns.
 * The forms below are explicitly recorded examples, not generated from roots.
 * Keep source URLs next to entries for future lexicographic audit.
 */
const expandedVerbs = [
	{
		number: 7,
		lemma: 'عَلَّمَ',
		root: 'علم',
		meaning: 'mengajarkan',
		mudhari: 'يُعَلِّمُ',
		mashdar: ['تَعْلِيمٌ', 'pengajaran']
	},
	{
		number: 8,
		lemma: 'قَاتَلَ',
		root: 'قتل',
		meaning: 'berperang, memerangi',
		mudhari: 'يُقَاتِلُ',
		mashdar: ['مُقَاتَلَةٌ', 'pertempuran']
	},
	{
		number: 9,
		lemma: 'أَكْرَمَ',
		root: 'كرم',
		meaning: 'memuliakan',
		mudhari: 'يُكْرِمُ',
		mashdar: ['إِكْرَامٌ', 'penghormatan']
	},
	{
		number: 10,
		lemma: 'تَعَاوَنَ',
		root: 'عون',
		meaning: 'saling membantu',
		mudhari: 'يَتَعَاوَنُ',
		mashdar: ['تَعَاوُنٌ', 'kerja sama']
	},
	{
		number: 11,
		lemma: 'تَعَلَّمَ',
		root: 'علم',
		meaning: 'belajar',
		mudhari: 'يَتَعَلَّمُ',
		mashdar: ['تَعَلُّمٌ', 'proses belajar']
	},
	{
		number: 12,
		lemma: 'اِجْتَمَعَ',
		root: 'جمع',
		meaning: 'berkumpul',
		mudhari: 'يَجْتَمِعُ',
		mashdar: ['اِجْتِمَاعٌ', 'pertemuan']
	},
	{
		number: 13,
		lemma: 'اِنْكَسَرَ',
		root: 'كسر',
		meaning: 'pecah, menjadi patah',
		mudhari: 'يَنْكَسِرُ',
		mashdar: ['اِنْكِسَارٌ', 'peristiwa pecah']
	},
	{
		number: 14,
		lemma: 'اِحْمَرَّ',
		root: 'حمر',
		meaning: 'menjadi merah',
		mudhari: 'يَحْمَرُّ',
		mashdar: ['اِحْمِرَارٌ', 'perubahan menjadi merah']
	},
	{
		number: 15,
		lemma: 'اِسْتَغْفَرَ',
		root: 'غفر',
		meaning: 'memohon ampun',
		mudhari: 'يَسْتَغْفِرُ',
		mashdar: ['اِسْتِغْفَارٌ', 'permohonan ampun']
	},
	{
		number: 16,
		lemma: 'اِعْشَوْشَبَ',
		root: 'عشب',
		meaning: 'ditumbuhi rumput lebat',
		mudhari: 'يَعْشَوْشِبُ',
		mashdar: ['اِعْشِيشَابٌ', 'tumbuhnya rumput lebat'],
		source: 'https://sina.birzeit.edu/qabas/lemma/2020895100'
	},
	{
		number: 17,
		lemma: 'اِجْلَوَّذَ',
		root: 'جلذ',
		meaning: 'melaju cepat',
		mudhari: 'يَجْلَوِّذُ',
		source:
			'https://www.arabicterminology.com/content/%D8%A7%D9%90%D8%AC%D9%92%D9%84%D9%8E%D9%88%D9%91%D9%8E%D8%B0%D9%8E'
	},
	{ number: 18, lemma: 'اِحْمَارَّ', root: 'حمر', meaning: 'menjadi semakin merah', mudhari: 'يَحْمَارُّ' },
	{
		number: 19,
		lemma: 'دَحْرَجَ',
		root: 'دحرج',
		meaning: 'menggelindingkan',
		mudhari: 'يُدَحْرِجُ',
		mashdar: ['دَحْرَجَةٌ', 'tindakan menggelindingkan']
	},
	{
		number: 20,
		lemma: 'تَدَحْرَجَ',
		root: 'دحرج',
		meaning: 'menggelinding',
		mudhari: 'يَتَدَحْرَجُ',
		mashdar: ['تَدَحْرُجٌ', 'gerak menggelinding']
	},
	{
		number: 21,
		lemma: 'اِحْرَنْجَمَ',
		root: 'حرجم',
		meaning: 'berkumpul berdesakan',
		mudhari: 'يَحْرَنْجِمُ',
		mashdar: ['اِحْرِنْجَامٌ', 'peristiwa berkumpul berdesakan'],
		source: 'https://www.arabicacademy.gov.eg/ar/search_engine/roots/%D8%AD%D8%B1%D8%AC%D9%85'
	},
	{
		number: 22,
		lemma: 'اِطْمَأَنَّ',
		root: 'طمأن',
		meaning: 'menjadi tenang, merasa tenteram',
		mudhari: 'يَطْمَئِنُّ',
		mashdar: ['اِطْمِئْنَانٌ', 'ketenteraman'],
		source: 'https://www.arabicacademy.gov.eg/ar/search_engine/roots/%D8%B7%D9%85%D8%A3%D9%86'
	}
] as const;

const advancedVerbs: readonly SharafEntry[] = expandedVerbs.map((word) => {
	const pattern = patternCatalog.find((p) => p.number === word.number);
	if (!pattern) throw new Error(`Missing pattern ${word.number}`);
	return {
		id: `fiil-expanded-${word.number}`,
		lemma: word.lemma,
		meaning: word.meaning,
		partOfSpeech: 'verb',
		root: word.root,
		bab: {
			number: word.number,
			exemplar: pattern.madhi,
			pattern: `${pattern.madhi} – ${pattern.mudhari}`
		},
		forms: [
			{ label: 'mudhari', value: word.mudhari },
			...('mashdar' in word && word.mashdar
				? [{ label: 'mashdar', value: word.mashdar[0], meaning: word.mashdar[1] }]
				: [])
		],
		babSelection: 'lexical',
		formBehavior: word.number >= 16 && word.number <= 18 ? 'special-rule' : 'regular',
		explanation: `${pattern.notes} Kata ini adalah contoh yang tercatat untuk kelompok ${pattern.number}; daftar bentuknya belum berarti seluruh turunan telah diverifikasi.`,
		sources: [pattern.source, ...('source' in word && word.source ? [word.source] : [])],
		reviewStatus: 'draft'
	};
});

export const sharafEntries: readonly SharafEntry[] = mergeStagedSharafPreview([
	...referenceVerbs,
	...additional,
	...advancedVerbs
]);
