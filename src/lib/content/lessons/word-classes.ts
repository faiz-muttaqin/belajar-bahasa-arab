import type { Lesson } from './types.js';
import type { Word } from './analysis.js';

const doorAsTopic: Word = [
	'الْبَابُ',
	'pintu itu',
	'Isim',
	'بَابٌ berarti “pintu”. Awalan الْـ membuatnya tertentu.',
	'Mubtada’ (topik kalimat), marfu‘ dengan dammah.'
];
const openAsPredicate: Word = [
	'مَفْتُوحٌ',
	'terbuka',
	'Isim',
	'Isim maf‘ul dari فَتَحَ, akar ف ت ح, pola مَفْعُول.',
	'Khabar (informasi tentang pintu), marfu‘ dengan dammah.'
];
const guard: Word = [
	'الْحَارِسُ',
	'penjaga itu',
	'Isim',
	'حَارِسٌ adalah isim fa‘il dari حَرَسَ, pola فَاعِل. الْـ menandai bentuk tertentu.',
	'Fa‘il (pelaku yang disebut), marfu‘ dengan dammah.'
];

export const wordClassesLesson: Lesson = {
	id: 'lesson-u3-02',
	slug: 'isim-fiil-harf',
	title: 'Isim, fi‘il, dan harf dalam kalimat',
	track: 'belajar',
	level: 'Dasar',
	register: 'msa',
	reviewStatus: 'draft',
	revision: 1,
	minutes: 10,
	competencies: ['CB-06', 'CB-16'],
	references: [
		{
			label: 'Madinah Arabic · Kalimat nominal',
			href: 'https://madinaharabic.com/free-content/grammar/lesson-58/part-1'
		},
		{
			label: 'Madinah Arabic · Pelaku (fa‘il)',
			href: 'https://madinaharabic.com/free-content/grammar/lesson-64/part-2'
		},
		{
			label: 'Madinah Arabic · Kalimat aktif dan pasif',
			href: 'https://madinaharabic.com/free-content/grammar/lesson-34/part-1'
		}
	],
	goal: 'Kenali tiga jenis kata, susun kalimat nominal dan verbal, lalu jelaskan perubahan bentuk dan perannya.',
	intro:
		'Mulai dari tiga jenis kata. Isim mencakup nama, sifat, dan kata ganti. Fi‘il menyatakan tindakan atau keadaan dengan bentuk verba. Harf seperti فِي (di dalam) atau لَمْ (penanda negasi lampau) menghubungkan atau mengubah makna kata lain. Setelah mengenali jenis katanya, cari peran kata itu di kalimat.',
	examples: [],
	analysis: [
		{
			heading: 'Kalimat nominal dan frasa sifat',
			sentences: [
				{
					words: [doorAsTopic, openAsPredicate],
					structure: 'Mubtada’ + khabar. Ada satu kabar yang selesai tentang pintu.',
					translation: 'Pintu itu terbuka.'
				},
				{
					words: [
						[
							'الْبَابُ',
							'pintu',
							'Isim',
							'Isim tertentu dengan الْـ.',
							'Nomina yang diterangkan. Dibaca marfu‘ di sini sebagai contoh; posisinya dapat berubah di kalimat lain.'
						],
						[
							'الْمَفْتُوحُ',
							'yang terbuka',
							'Isim',
							'Isim maf‘ul yang ditambah الْـ.',
							'Na‘t (sifat) yang mengikuti nomina dalam gender, jumlah, ketentuan, dan i‘rab pada contoh ini.'
						]
					],
					structure: 'Nomina + sifat. Dalam contoh ini keduanya membentuk frasa.',
					translation: 'Pintu yang terbuka itu.'
				}
			],
			comparison:
				'Bentuk مَفْتُوحٌ memberi kabar pada kalimat pertama. Bentuk الْمَفْتُوحُ mengikuti الْبَابُ sebagai sifat yang ikut tertentu dalam frasa kedua.'
		},
		{
			heading: 'Kalimat verbal aktif dan pasif',
			sentences: [
				{
					words: [
						[
							'فَتَحَ',
							'membuka',
							'Fi‘il',
							'Madhi aktif dari akar ف ت ح, pola فَعَلَ.',
							'Verba utama. Pelaku disebut sesudahnya.'
						],
						guard,
						[
							'الْبَابَ',
							'pintu itu',
							'Isim',
							'Bentuk tertentu dari بَابٌ. Akhir -a berasal dari perannya di kalimat.',
							'Maf‘ul bih (objek), manshub dengan fathah.'
						]
					],
					structure: 'Fi‘il + fa‘il + maf‘ul bih.',
					translation: 'Penjaga membuka pintu itu.'
				},
				{
					words: [
						[
							'فُتِحَ',
							'dibuka',
							'Fi‘il',
							'Madhi pasif dengan akar yang sama. Vokal berubah dari pola فَعَلَ ke فُعِلَ.',
							'Verba pasif. Pelaku tidak disebut.'
						],
						[
							'الْبَابُ',
							'pintu itu',
							'Isim',
							'Bentuk tertentu yang sama. Akhir -u berasal dari perannya di kalimat.',
							'Na’ib al-fa‘il (pengganti fa‘il pada struktur pasif), marfu‘ dengan dammah.'
						]
					],
					structure: 'Fi‘il pasif + na’ib al-fa‘il.',
					translation: 'Pintu itu dibuka.'
				}
			],
			comparison:
				'فَتَحَ menjadi فُتِحَ. Pelaku الْحَارِسُ hilang. Pintu yang tadinya objek الْبَابَ kini menjadi na’ib al-fa‘il الْبَابُ.'
		},
		{
			heading: 'Harf dan pengaruhnya pada kata sesudahnya',
			sentences: [
				{
					words: [
						[
							'الْمِفْتَاحُ',
							'kunci itu',
							'Isim',
							'Isim alat مِفْتَاحٌ dari akar ف ت ح, pola مِفْعَال. الْـ membuatnya tertentu.',
							'Mubtada’, marfu‘ dengan dammah.'
						],
						[
							'فِي',
							'di dalam',
							'Harf',
							'Kata depan dengan bentuk tetap.',
							'Harf jarr. Membuat isim setelahnya berstatus majrur.'
						],
						[
							'الْحَقِيبَةِ',
							'tas itu',
							'Isim',
							'حَقِيبَةٌ ialah nomina feminin. الْـ menandai bentuk tertentu.',
							'Isim majrur setelah فِي. Tanda jarr pada bentuk ini adalah kasrah.'
						]
					],
					structure: 'Mubtada’ + frasa kata depan yang memberi kabar tempat.',
					translation: 'Kunci itu ada di dalam tas.'
				}
			]
		}
	],
	patterns: [
		'Cari perubahan di dalam kata, seperti فَتَحَ → فُتِحَ, untuk mengenali bentuk aktif dan pasif. Perubahan bentuk ini dibahas dalam sharaf.',
		'Cari perubahan pada akhir kata, seperti الْبَابَ → الْبَابُ, dan tentukan perannya. Dalam contoh ini, nahwu menjelaskan mengapa akhirannya berubah.',
		'Isim fa‘il adalah bentuk kata dalam sharaf. Fa‘il adalah peran pelaku dalam nahwu. Isim fa‘il juga dapat memiliki peran lain.'
	],
	exercises: [
		{
			arabic: 'الْبَابُ جَدِيدٌ',
			prompt: 'Kedua kata ini termasuk jenis apa? Mana yang berperan sebagai khabar?',
			answer: 'Keduanya isim. الْبَابُ adalah mubtada’. جَدِيدٌ adalah khabar dari informasi “baru”.'
		},
		{
			arabic: 'كَتَبَ الطَّالِبُ الرِّسَالَةَ',
			prompt: 'Ubah kalimat ini ke pasif. Perhatikan bentuk verba dan akhir kata untuk surat.',
			answer:
				'كُتِبَتِ الرِّسَالَةُ. Verba memakai pola pasif dengan penanda feminin. Akhir الرِّسَالَةَ berubah menjadi الرِّسَالَةُ karena kini surat menjadi na’ib al-fa‘il.'
		},
		{
			arabic: 'فِي الْمَكْتَبَةِ',
			prompt: 'Mana harf dan apa pengaruhnya pada kata yang mengikuti?',
			answer: 'فِي adalah harf jarr. الْمَكْتَبَةِ menjadi majrur dengan kasrah.'
		}
	],
	related: [
		{ label: 'Bandingkan akar dan pola di tabel tashrif', path: 'rujukan/#tashrif-istilahi' }
	]
};
