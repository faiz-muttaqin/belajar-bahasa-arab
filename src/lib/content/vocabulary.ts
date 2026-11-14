import {
	validateVocab,
	type VocabularyCollectionId,
	type VocabularyItem
} from '#lib/domain/vocabulary/types.js';
import { quranVocabulary } from './quran-vocabulary.js';
import { msaVocabulary } from './msa-vocabulary.js';

type Entry = Pick<
	VocabularyItem,
	'id' | 'arabic' | 'meaning' | 'concreteness' | 'context' | 'icon'
>;

const everyday: readonly Entry[] = [
	{
		id: 'daftar',
		arabic: 'دَفْتَرٌ',
		meaning: 'Buku catatan',
		concreteness: 'concrete',
		icon: 'book',
		context: 'Nama benda dalam pelajaran “Ini apa?”.'
	},
	{
		id: 'miftah',
		arabic: 'مِفْتَاحٌ',
		meaning: 'Kunci',
		concreteness: 'concrete',
		context: 'Temukan benda utama dalam frasa “kunci pintu”.'
	},
	{
		id: 'haqibah',
		arabic: 'حَقِيبَةٌ',
		meaning: 'Tas',
		concreteness: 'concrete',
		context: 'Kata feminin. “Tas itu ada di dalam ruangan.”'
	},
	{
		id: 'bab',
		arabic: 'بَابٌ',
		meaning: 'Pintu',
		concreteness: 'concrete',
		icon: 'door',
		context: 'Benda utama dalam “pintu kelas”.'
	},
	{
		id: 'ghurfah',
		arabic: 'غُرْفَةٌ',
		meaning: 'Ruangan',
		concreteness: 'concrete',
		context: 'Kata feminin. “Kunci ada di ruangan.”'
	},
	{
		id: 'maktabah',
		arabic: 'مَكْتَبَةٌ',
		meaning: 'Perpustakaan',
		concreteness: 'concrete',
		context: 'Lokasi dalam bacaan tentang perubahan jam layanan.'
	},
	{
		id: 'kursi',
		arabic: 'كُرْسِيٌّ',
		meaning: 'Kursi',
		concreteness: 'concrete',
		context: '“Buku catatan ada di atas kursi.”'
	},
	{
		id: 'mudarris',
		arabic: 'مُدَرِّسٌ',
		meaning: 'Guru',
		concreteness: 'concrete',
		context: 'Orang yang mengajar. Kata ini muncul sebagai pelaku dalam kalimat.'
	},
	{
		id: 'kataba',
		arabic: 'كَتَبَ',
		meaning: 'Ia menulis',
		concreteness: 'abstract',
		context: '“Sami menulis surat kemarin.”'
	},
	{
		id: 'qaraa',
		arabic: 'قَرَأَ',
		meaning: 'Ia membaca',
		concreteness: 'abstract',
		context: '“Ia membaca, lalu menulis.”'
	},
	{
		id: 'fataha',
		arabic: 'فَتَحَ',
		meaning: 'Ia membuka',
		concreteness: 'abstract',
		context: '“Guru membuka pintu pada pagi hari.”'
	},
	{
		id: 'maftuh',
		arabic: 'مَفْتُوحٌ',
		meaning: 'Terbuka, yang dibuka',
		concreteness: 'abstract',
		context: '“Pintu itu terbuka.” Akar katanya sama dengan kata kerja “membuka”.'
	},
	{ id: 'fi', arabic: 'فِي', meaning: 'Di dalam', concreteness: 'function' },
	{ id: 'thumma', arabic: 'ثُمَّ', meaning: 'Lalu, kemudian', concreteness: 'function' },
	{ id: 'lianna', arabic: 'لِأَنَّ', meaning: 'Karena', concreteness: 'function' },
	{ id: 'lakin', arabic: 'لَكِنَّ', meaning: 'Tetapi', concreteness: 'function' },
	{ id: 'lidhalika', arabic: 'لِذَلِكَ', meaning: 'Oleh karena itu', concreteness: 'function' }
];

const prayer: readonly Entry[] = [
	{
		id: 'akbar',
		arabic: 'أَكْبَرُ',
		meaning: 'Lebih besar atau paling besar, sesuai konteks',
		concreteness: 'abstract',
		context: 'Dalam takbir, keseluruhan frasa bermakna “Allah Mahabesar”.'
	},
	{
		id: 'subhana',
		arabic: 'سُبْحَانَ',
		meaning: 'Mahasuci',
		concreteness: 'abstract',
		context: 'Awal ungkapan tasbih dalam contoh rukuk dan sujud.'
	},
	{
		id: 'rabbi',
		arabic: 'رَبِّي',
		meaning: 'Tuhanku',
		concreteness: 'abstract',
		context: 'Akhiran membawa makna “-ku”.'
	},
	{
		id: 'azim',
		arabic: 'الْعَظِيمِ',
		meaning: 'Yang Mahaagung',
		concreteness: 'abstract',
		context: 'Kata terakhir pada frasa rukuk dalam pelajaran.'
	},
	{
		id: 'ala-prayer',
		arabic: 'الْأَعْلَى',
		meaning: 'Yang Mahatinggi',
		concreteness: 'abstract',
		context: 'Kata terakhir pada frasa sujud dalam pelajaran.'
	},
	{
		id: 'salam',
		arabic: 'السَّلَامُ',
		meaning: 'Keselamatan, kedamaian',
		concreteness: 'abstract',
		context: 'Salam mendoakan keselamatan bagi orang yang disapa.'
	},
	{
		id: 'alaykum',
		arabic: 'عَلَيْكُمْ',
		meaning: 'Atas kalian, kepada kalian dalam salam',
		concreteness: 'function'
	}
];

const everydaySource = 'https://madinaharabic.com/free-content/grammar';
const prayerSources = [
	'https://sunnah.com/bukhari:789',
	'https://sunnah.com/muslim:772',
	'https://sunnah.com/abudawud:996'
];

const vocabulary: readonly VocabularyItem[] = [
	...everyday.map((item): VocabularyItem => ({
		...item,
		collection: 'harian',
		register: 'msa',
		reviewStatus: 'draft',
		sources: [everydaySource]
	})),
	...prayer.map((item): VocabularyItem => ({
		...item,
		collection: 'shalat',
		register: 'classical',
		reviewStatus: 'draft',
		sources: prayerSources
	})),
	...msaVocabulary,
	...quranVocabulary
];

// This catalog contains original glosses and contextual notes, as allowed by ADR-004 D-8.
const ids = new Set<string>();
for (const item of vocabulary) {
	if (ids.has(item.id) || !item.sources.length || validateVocab(item).length) {
		throw new Error(`Kosakata tidak lengkap: ${item.id}`);
	}
	ids.add(item.id);
}

export function publishedVocabulary(collection: VocabularyCollectionId): VocabularyItem[] {
	return vocabulary.filter((item) => item.collection === collection);
}
