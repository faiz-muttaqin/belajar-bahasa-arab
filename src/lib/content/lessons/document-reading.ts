import type { Lesson } from './types.js';

const base = {
	track: 'belajar',
	level: 'Menengah',
	register: 'msa',
	reviewStatus: 'draft',
	revision: 1
} as const;

const reading = {
	label: 'Al Jazeera Learning Arabic · Bacaan dan pemahaman',
	href: 'https://learning.aljazeera.net/ar'
};

export const numberLesson: Lesson = {
	...base,
	id: 'lesson-u9-06',
	slug: 'tunggal-dua-dan-jamak',
	title: 'Baca jumlah orang dan benda dengan tepat',
	minutes: 7,
	competencies: ['CB-17'],
	goal: 'Bedakan satu, dua, dan lebih dari dua dari kata benda dan konteks kalimat.',
	references: [
		{
			label: 'Madinah Arabic · Bentuk ganda',
			href: 'https://madinaharabic.com/free-content/grammar/lesson-55/part-1'
		},
		{
			label: 'Unified Arabic Grammar · Gender dan jumlah',
			href: 'https://github.com/zeusopera9/arabic-grammar/blob/2bfab7f01b20eacb3dcc3b70f13ed990776ff257/app/data/content.js'
		}
	],
	intro:
		'Bayangkan Anda mencatat jumlah orang yang datang ke perpustakaan. Kata Arab dapat membawa informasi jumlah meski tidak ada angka yang ditulis.',
	examples: [
		{ arabic: 'وَصَلَ طَالِبٌ.', meaning: 'Seorang siswa tiba.' },
		{
			arabic: 'وَصَلَ طَالِبَانِ.',
			meaning: 'Dua siswa tiba.',
			note: 'Akhiran -āni menandai dua pada posisi pelaku di kalimat ini.'
		},
		{
			arabic: 'رَأَيْتُ طَالِبَيْنِ.',
			meaning: 'Saya melihat dua siswa.',
			note: 'Akhiran -ayni tetap berarti dua. Di sini frasanya berperan sebagai objek.'
		},
		{
			arabic: 'وَصَلَ طُلَّابٌ.',
			meaning: 'Para siswa tiba.',
			note: 'Pola di dalam kata berubah. Ini salah satu bentuk jamak yang perlu dikenali bersama kata dasarnya.'
		}
	],
	patterns: [
		'Cari tanda jumlah pada kata benda. Dalam kalimat yang dimulai dengan kata kerja seperti contoh ini, verbanya tetap berbentuk tunggal meski pelakunya dua atau lebih.',
		'Dalam bacaan tanpa harakat, akhir ـين dapat menandai bentuk ganda atau jamak maskulin. Baca konteks atau bandingkan bentuk katanya sebelum memastikan jumlah.'
	],
	exercises: [
		{
			arabic: 'فِي الْقَاعَةِ كُرْسِيَّانِ.',
			prompt: 'Berapa kursi ada di aula?',
			answer: 'Dua kursi. Akhiran -āni ada pada kata kursi.'
		},
		{
			arabic: 'حَمَلَتْ لِينَا كِتَابَيْنِ.',
			prompt: 'Siapa pelaku dan berapa benda dibawa?',
			answer: 'Lina membawa dua buku. Bentuk -ayni menunjukkan dua untuk objek.'
		},
		{
			arabic: 'قَرَأَ الطُّلَّابُ الْخَبَرَ.',
			prompt: 'Apakah pembacanya satu orang? Bagian mana yang menunjukkan jumlah?',
			answer:
				'Pembacanya lebih dari satu. Kata untuk siswa berbentuk jamak. Kalimat tidak menyebut jumlah pastinya.'
		}
	]
};

export const comparisonLesson: Lesson = {
	...base,
	id: 'lesson-u11-03',
	slug: 'bandingkan-dua-pilihan',
	title: 'Baca perbandingan dan alasan pilihan',
	minutes: 12,
	competencies: ['CB-22', 'CB-23', 'CB-24'],
	goal: 'Kenali kriteria perbandingan, simpulkan pilihan penulis, dan temukan batas kesimpulannya.',
	references: [reading],
	intro:
		'Saat bacaan membandingkan dua pilihan, catat kriteria masing-masing dan siapa yang memilih. Pembaca bisa memahami alasan penulis tanpa harus setuju dengan pilihannya.',
	examples: [],
	passage: {
		title: 'Dua jalan menuju sekolah',
		arabicTitle: 'طَرِيقَانِ إِلَى الْمَدْرَسَةِ',
		glossary: [
			{ arabic: 'يَمُرُّ بِـ', meaning: 'Melewati' },
			{ arabic: 'مُزْدَحِمَةٌ', meaning: 'Ramai atau padat' },
			{ arabic: 'أَقَلُّ ازْدِحَامًا', meaning: 'Lebih sepi' },
			{ arabic: 'يَسْلُكُ', meaning: 'Menempuh atau melewati suatu jalan' }
		],
		paragraphs: [
			{
				arabic:
					'يَسْتَطِيعُ سَامِي أَنْ يَذْهَبَ إِلَى الْمَدْرَسَةِ مِنْ طَرِيقَيْنِ. الطَّرِيقُ الْأَوَّلُ يَمُرُّ بِالسُّوقِ، وَهُوَ أَقْصَرُ مِنَ الطَّرِيقِ الثَّانِي. لَكِنَّ السُّوقَ مُزْدَحِمَةٌ فِي الصَّبَاحِ.',
				meaning:
					'Sami bisa pergi ke sekolah melalui dua jalan. Jalan pertama melewati pasar dan lebih pendek daripada jalan kedua. Namun pasar ramai pada pagi hari.',
				role: 'Pilihan pertama. Kelebihannya adalah jarak yang lebih pendek. Kekurangannya adalah keramaian di pasar pada pagi hari.'
			},
			{
				arabic:
					'أَمَّا الطَّرِيقُ الثَّانِي فَيَمُرُّ بِالْحَدِيقَةِ. هُوَ أَطْوَلُ، وَلَكِنَّ السَّيْرَ فِيهِ أَسْهَلُ فِي الصَّبَاحِ لِأَنَّهُ أَقَلُّ ازْدِحَامًا.',
				meaning:
					'Jalan kedua melewati taman. Jaraknya lebih panjang, tetapi pada pagi hari lebih mudah dilalui karena lebih sepi.',
				role: 'Pilihan kedua. Paragraf kembali memakai dua kriteria, jarak dan kondisi pada pagi hari.'
			},
			{
				arabic:
					'لِذَلِكَ يَخْتَارُ سَامِي طَرِيقَ الْحَدِيقَةِ فِي الصَّبَاحِ. وَعِنْدَمَا يَعُودُ مِنَ الْمَدْرَسَةِ بَعْدَ الظُّهْرِ، يَسْلُكُ طَرِيقَ السُّوقِ.',
				meaning:
					'Karena itu, Sami memilih jalan melalui taman pada pagi hari. Ketika pulang dari sekolah selepas tengah hari, ia melewati jalan pasar.',
				role: 'Keputusan berubah menurut waktu. Teks menyebut alasan untuk pagi hari. Motif pilihan saat pulang tidak dijelaskan.'
			}
		]
	},
	patterns: [
		'Catat kriteria yang sama untuk setiap pilihan. Ini membantu melihat mengapa pilihan yang lebih panjang masih bisa dipilih.',
		'Pisahkan alasan yang ditulis dari alasan yang Anda duga. Pilihan untuk waktu tertentu belum cukup untuk menyimpulkan kebiasaan pada waktu lain.'
	],
	exercises: [
		{
			prompt: 'Jalan mana yang lebih pendek? Bagian mana yang menjadi bukti?',
			answer:
				'Jalan pertama, melalui pasar. Kalimat kedua menyebut أَقْصَرُ مِنَ الطَّرِيقِ الثَّانِي, “lebih pendek daripada jalan kedua”.'
		},
		{
			prompt: 'Mengapa Sami memilih jalan melalui taman pada pagi hari?',
			answer:
				'Lebih mudah dilalui karena lebih sepi. Alasannya ada di akhir paragraf kedua, lalu لِذَلِكَ mengaitkannya dengan keputusan di paragraf ketiga.'
		},
		{
			prompt: 'Apakah teks menyatakan bahwa pasar menjadi sepi selepas tengah hari?',
			answer: 'Tidak. Teks menyebut pilihan rute pulang, tanpa menjelaskan kondisi pasar saat itu.'
		}
	]
};
