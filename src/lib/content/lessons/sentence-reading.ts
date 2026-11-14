import type { Lesson } from './types.js';

const madinah = (lesson: number, part: number) => ({
	label: `Madinah Arabic · Pelajaran ${lesson}, bagian ${part}`,
	href: `https://madinaharabic.com/free-content/grammar/lesson-${lesson}/part-${part}`
});

const base = {
	track: 'belajar',
	level: 'Menengah',
	register: 'msa',
	reviewStatus: 'draft',
	revision: 1
} as const;

export const sentenceReadingLessons: readonly Lesson[] = [
	{
		...base,
		id: 'lesson-u9-02',
		slug: 'negasi-dan-waktu',
		title: 'Temukan apa yang terjadi dan yang tidak',
		goal: 'Bedakan peristiwa yang tidak terjadi, kebiasaan yang tidak dilakukan, dan rencana yang tidak akan terjadi.',
		minutes: 7,
		competencies: ['CB-15', 'CB-16'],
		references: [madinah(31, 7)],
		intro:
			'Cari dulu kata yang dinegasikan. Dalam bahasa Arab, bentuk kata kerja saja belum cukup untuk menentukan waktunya. Kata kecil sebelum kata kerja juga memberi petunjuk.',
		examples: [
			{
				arabic: 'لَمْ يَفْتَحِ الْحَارِسُ الْبَابَ أَمْسِ.',
				meaning: 'Penjaga tidak membuka pintu kemarin.',
				note: 'Lam menegasikan peristiwa lampau. Akhiran i pada verba muncul ketika langsung disambung dengan kata sesudahnya.'
			},
			{
				arabic: 'لَا يَفْتَحُ الْحَارِسُ الْبَابَ لَيْلًا.',
				meaning: 'Penjaga tidak membuka pintu pada malam hari.',
				note: 'Di sini, lā dan keterangan malam menunjukkan kebiasaan.'
			},
			{
				arabic: 'لَنْ يَفْتَحَ الْحَارِسُ الْبَابَ غَدًا.',
				meaning: 'Penjaga tidak akan membuka pintu besok.',
				note: 'Lan menegasikan kejadian yang akan datang.'
			}
		],
		patterns: [
			'Baca kata tugas, verba, dan waktu sebagai satu kesatuan. Lam diikuti bentuk mudhari‘, tetapi makna negasinya mengarah ke masa lampau.',
			'Perhatikan cakupan negasi. Jika kalimat mengatakan pintu tidak dibuka kemarin, kalimat itu belum menjelaskan apakah pintu dibuka hari ini.'
		],
		exercises: [
			{
				arabic: 'لَمْ تَصِلِ الْحَافِلَةُ صَبَاحًا.',
				prompt: 'Apa yang tidak terjadi dan kapan?',
				answer: 'Bus tidak tiba pada pagi hari. Lam menunjukkan negasi lampau.'
			},
			{
				arabic: 'لَنْ نَقْرَأَ الْفَصْلَ غَدًا.',
				prompt: 'Apakah pembicara membahas tugas yang sudah lewat atau yang akan datang?',
				answer: 'Yang akan datang. Kami tidak akan membaca bab itu besok.'
			},
			{
				arabic: 'لَا تَعْمَلُ الْمَكْتَبَةُ يَوْمَ الْجُمُعَةِ.',
				prompt: 'Jika kalimat ini muncul pada pengumuman jam buka, apa artinya?',
				answer: 'Perpustakaan tutup pada hari Jumat. Kata kerja “beroperasi” dinegasikan.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u9-03',
		slug: 'klausa-yang-menjelaskan',
		title: 'Temukan informasi tambahan di dalam kalimat',
		goal: 'Gunakan alladzī dan allatī untuk mengetahui siapa atau apa yang dijelaskan, lalu temukan inti kalimatnya.',
		minutes: 8,
		competencies: ['CB-19', 'CB-20'],
		references: [madinah(9, 1), madinah(24, 5)],
		intro:
			'Bandingkan “guru itu datang” dengan “guru yang membuka pintu itu datang”. Keterangan tambahan membantu memilih guru yang dimaksud. Pisahkan keterangan itu sebelum menerjemahkan kalimat ke bahasa Indonesia.',
		examples: [
			{
				arabic: 'وَصَلَ الْمُدَرِّسُ الَّذِي فَتَحَ الْبَابَ.',
				meaning: 'Guru yang membuka pintu itu telah tiba.',
				note: 'Inti kalimat: guru itu telah tiba. Bagian yang dimulai dengan alladzī membantu mengenali gurunya.'
			},
			{
				arabic: 'هَذِهِ الْقَاعَةُ الَّتِي اخْتَارَهَا النَّادِي.',
				meaning: 'Ini aula yang dipilih oleh klub.',
				note: 'Allatī merujuk pada aula. Akhiran -hā pada kata kerja juga merujuk pada aula.'
			},
			{
				arabic: 'الرِّسَالَةُ الَّتِي قَرَأْتُهَا قَصِيرَةٌ.',
				meaning: 'Surat yang saya baca itu pendek.',
				note: 'Kata terakhir menyampaikan kabar utama. Bagian di tengah menerangkan surat yang mana.'
			}
		],
		patterns: [
			'Cari kata benda tepat sebelum alladzī atau allatī. Lalu cari kata atau akhiran dalam klausa yang merujuk kembali pada benda itu.',
			'Coba ringkas inti kalimat dalam tiga atau empat kata, lalu tambahkan rincian klausa setelah makna utamanya jelas.'
		],
		exercises: [
			{
				arabic: 'الْكِتَابُ الَّذِي قَرَأَهُ سَامِي جَدِيدٌ.',
				prompt: 'Apa kabar utama tentang buku?',
				answer: 'Bukunya baru. Klausa di tengah menjelaskan bahwa buku tersebut dibaca Sami.'
			},
			{
				arabic: 'زُرْنَا الْمَدْرَسَةَ الَّتِي تَدْرُسُ فِيهَا لِينَا.',
				prompt: 'Apa yang dirujuk oleh -hā pada kata terakhir sebelum nama Lina?',
				answer: 'Sekolah. Artinya, “Kami mengunjungi sekolah tempat Lina belajar.”'
			},
			{
				arabic: 'وَصَلَ الطَّالِبُ الَّذِي كَتَبَ الرِّسَالَةَ.',
				prompt: 'Apa tindakan utamanya dan apa tindakan yang membantu mengenali pelaku?',
				answer: 'Tindakan utamanya adalah tiba. Menulis surat membantu kita tahu siswa yang mana.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u9-04',
		slug: 'kalimat-aktif-dan-pasif',
		title: 'Baca kalimat ketika pelakunya tidak disebut',
		goal: 'Bedakan bentuk aktif dan pasif, lalu nyatakan apa yang diketahui tentang pelaku dari teks.',
		minutes: 8,
		competencies: ['CB-14', 'CB-15'],
		references: [madinah(34, 1)],
		intro:
			'Dalam pengumuman, penulis sering menyebut hasil tanpa menyebut siapa yang melakukannya. Bahasa Indonesia memakai bentuk seperti “pintu dibuka”. Dalam contoh Arab berikut, perubahan vokal pada verba membawa perbedaan itu.',
		examples: [
			{
				arabic: 'فَتَحَ الْحَارِسُ الْبَابَ.',
				meaning: 'Penjaga membuka pintu.',
				note: 'Penjaga disebut sebagai pelaku. Pintu dikenai tindakan.'
			},
			{
				arabic: 'فُتِحَ الْبَابُ.',
				meaning: 'Pintu dibuka.',
				note: 'Kata pertama berubah dari fataḥa menjadi futiḥa. Kalimat menyebut pintu dan tindakan, tanpa menyebut pelaku.'
			},
			{
				arabic: 'سَيُعْقَدُ اللِّقَاءُ غَدًا.',
				meaning: 'Pertemuan akan diadakan besok.',
				note: 'Bentuk pasif nonlampau ini lazim untuk menjadwalkan sebuah peristiwa. Awalan sa- mengarah ke masa depan.'
			}
		],
		patterns: [
			'Pada kata kerja dasar yang dipakai di atas, bentuk lampau pasif dapat dikenali dari pola bunyi u–i–a.',
			'Jangan menambahkan nama pelaku ke terjemahan jika kalimat pasif tidak menyebutkannya. Cari kalimat lain jika identitas pelaku memang penting.'
		],
		exercises: [
			{
				arabic: 'كُتِبَتِ الرِّسَالَةُ صَبَاحًا.',
				prompt: 'Apa yang diketahui tentang tindakan dan pelakunya?',
				answer: 'Surat itu ditulis pada pagi hari. Penulis surat tidak disebutkan.'
			},
			{
				arabic: 'قَرَأَتْ لِينَا الْخَبَرَ. ثُمَّ نُشِرَ خَبَرٌ آخَرُ.',
				prompt: 'Peristiwa mana yang memiliki pelaku yang disebut?',
				answer:
					'Lina membaca berita adalah kalimat yang menyebut pelaku. Kalimat berikut mengatakan berita lain diterbitkan tanpa menyebut penerbitnya.'
			},
			{
				arabic: 'أُغْلِقَ الْمَكْتَبُ بَعْدَ الظُّهْرِ.',
				prompt: 'Terjemahkan kalimat, lalu tandai kata yang menyatakan waktu.',
				answer: 'Kantor ditutup selepas tengah hari. Keterangan waktunya بَعْدَ الظُّهْرِ.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u9-05',
		slug: 'akar-dan-bentuk-kata',
		title: 'Gunakan tashrif untuk membaca kata baru',
		goal: 'Kenali bentuk kata kerja, mashdar, sebutan pelaku, dan kata yang dikenai tindakan dari akar yang sama.',
		minutes: 8,
		competencies: ['CB-18'],
		references: [
			{
				label: 'Cahaya Tauhid · Silabus sharaf, pelajaran 29–34',
				href: 'https://github.com/cahayatauhid/belajar-bahasa-arab/blob/d27cb0c549c782ca4f5a0c010bf9ea0a70f716d9/docs/silabus.md'
			},
			{
				label: 'Fundamentals of Classical Arabic · Pola kata kerja dasar',
				href: 'https://www.sacredlearning.org/resources/fundamentals_vol1.pdf'
			}
		],
		intro:
			'Saat menemukan kata yang mirip dengan kata yang sudah dikenal, tandai huruf akar dan periksa bentuknya. Akar memberi petunjuk hubungan makna. Bentuknya menunjukkan peran kata dalam kalimat.',
		examples: [
			{
				arabic: 'فَتَحَ الْحَارِسُ الْبَابَ.',
				meaning: 'Penjaga membuka pintu.',
				note: 'Fataḥa menyatakan tindakan lampau.'
			},
			{
				arabic: 'بَعْدَ فَتْحِ الْبَابِ، دَخَلَ الطُّلَّابُ.',
				meaning: 'Setelah pintu dibuka, para siswa masuk.',
				note: 'Fatḥ di sini merupakan mashdar. Frasa lengkap menamai tindakan yang sudah terjadi sebelum siswa masuk.'
			},
			{
				arabic: 'الْبَابُ مَفْتُوحٌ.',
				meaning: 'Pintu itu terbuka.',
				note: 'Maftūḥ memberi kabar tentang keadaan pintu.'
			},
			{
				arabic: 'كَاتِبُ الرِّسَالَةِ طَالِبٌ.',
				meaning: 'Penulis surat itu seorang siswa.',
				note: 'Kātib menamai pelaku dari akar yang berkaitan dengan menulis.'
			}
		],
		patterns: [
			'Akar bisa membantu menebak kelompok makna, tetapi periksa bentuk dan kalimat sebelum memilih terjemahan.',
			'Mashdar pada kata kerja dasar bisa berbeda-beda. Gunakan tabel sebagai rujukan, lalu kenali bentuk baru melalui pemakaian di kalimat.'
		],
		exercises: [
			{
				arabic: 'عَرَفْنَا اسْمَ كَاتِبِ الرِّسَالَةِ.',
				prompt: 'Kata berakar k–t–b di kalimat ini menyebut kegiatan atau pelaku?',
				answer:
					'Pelaku, yaitu penulis surat. Arti kalimat: “Kami mengetahui nama penulis surat itu.”'
			},
			{
				arabic: 'الْمَوْعِدُ مَكْتُوبٌ عَلَى الْبَابِ.',
				prompt: 'Apa arti kata berakar k–t–b dan apa yang diterangkannya?',
				answer: 'Maktūb berarti “tertulis”. Yang tertulis pada pintu adalah waktu yang dijadwalkan.'
			},
			{
				arabic: 'بَعْدَ كِتَابَةِ الرِّسَالَةِ، خَرَجَ سَامِي.',
				prompt: 'Mana kegiatan yang disebut sebagai penanda waktu, dan mana tindakan utama Sami?',
				answer: 'Penulisan surat menjadi penanda waktu. Tindakan utama adalah Sami keluar.'
			}
		],
		related: [{ label: 'Buka tabel tashrif istilahi', path: 'rujukan/#tashrif-istilahi' }]
	}
];
