import { bagAnalysis } from './reading-words/bag.js';
import { photoAnalysis } from './reading-words/photo.js';
import { bottlesAnalysis } from './reading-words/bottles.js';
import type { Lesson } from './types.js';

const base = {
	track: 'belajar',
	level: 'Menengah',
	register: 'msa',
	reviewStatus: 'draft',
	revision: 3,
	related: [
		{ label: 'Hafalkan kata penghubung dan efeknya', path: 'rujukan/harf/#kata-penghubung' }
	],
	examples: []
} as const;

const relative = {
	label: 'Madinah Arabic · Klausa relatif',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-9/part-1'
};
const pronouns = {
	label: 'Madinah Arabic · Kata ganti melekat',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-47/part-2'
};
const passive = {
	label: 'Madinah Arabic · Kalimat aktif dan pasif',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-34/part-1'
};
const reading = {
	label: 'Al Jazeera Learning Arabic · Bacaan menengah',
	href: 'https://learning.aljazeera.net/ar'
};

export const readingPractice: readonly Lesson[] = [
	{
		...base,
		id: 'lesson-u11-04',
		slug: 'bedah-kalimat-bacaan',
		title: 'Bedah kalimat dalam cerita',
		goal: 'Temukan inti kalimat, bedakan klausa penjelas dan keterangan, lalu hubungkan keduanya dengan gagasan utama cerita.',
		minutes: 12,
		competencies: ['CB-14', 'CB-19', 'CB-23'],
		references: [relative, passive, reading],
		intro:
			'Baca cerita sampai akhir. Pada bacaan kedua, pilih satu kalimat dan tandai tiga hal: tindakan utama, siapa atau apa yang terlibat, dan bagian yang menambahkan rincian.',
		passage: {
			title: 'Tas di halte',
			analysis: bagAnalysis,
			arabicTitle: 'حَقِيبَةٌ فِي مَحَطَّةِ الْحَافِلَاتِ',
			glossary: [
				{ arabic: 'تُغَادِرَ', meaning: 'Berangkat, meninggalkan tempat' },
				{ arabic: 'مَقْعَدٌ', meaning: 'Tempat duduk' },
				{ arabic: 'أَحْضَرَتْ', meaning: 'Ia (perempuan) membawa' },
				{ arabic: 'الْمَفْقُودَاتُ', meaning: 'Barang-barang yang hilang' }
			],
			paragraphs: [
				{
					arabic:
						'قَبْلَ أَنْ تُغَادِرَ الْحَافِلَةُ، رَأَتْ لِينَا حَقِيبَةً صَغِيرَةً تَحْتَ الْمَقْعَدِ. لَمْ تَكُنِ الْحَقِيبَةُ لَهَا، فَسَأَلَتِ السَّائِقَ عَنْ صَاحِبِهَا.',
					meaning:
						'Sebelum bus berangkat, Lina melihat tas kecil di bawah tempat duduk. Tas itu bukan miliknya, jadi ia bertanya kepada sopir tentang pemiliknya.',
					role: 'Masalah muncul. Lina menemukan tas yang pemiliknya belum diketahui.'
				},
				{
					arabic:
						'قَالَ السَّائِقُ إِنَّ رَاكِبَةً نَزَلَتْ قَبْلَ قَلِيلٍ. أَحْضَرَتْ لِينَا الْحَقِيبَةَ إِلَى الْمَكْتَبِ الَّذِي يَسْتَقْبِلُ الْمَفْقُودَاتِ. وَسُجِّلَ وَقْتُ الْعُثُورِ عَلَيْهَا فِي سِجِلِّ الْمَكْتَبِ.',
					meaning:
						'Sopir berkata seorang penumpang perempuan baru saja turun. Lina membawa tas ke kantor penerimaan barang hilang. Waktu penemuan tas dicatat di buku kantor.',
					role: 'Tindakan. Tas diserahkan ke kantor dan penemuannya dicatat.'
				},
				{
					arabic:
						'بَعْدَ سَاعَةٍ عَادَتِ الرَّاكِبَةُ إِلَى الْمَحَطَّةِ. وَصَفَتْ حَقِيبَتَهَا لِلْمُوَظَّفِ، فَأَعَادَهَا إِلَيْهَا. ثُمَّ اتَّصَلَتِ الرَّاكِبَةُ بِلِينَا وَشَكَرَتْهَا.',
					meaning:
						'Sejam kemudian penumpang itu kembali ke halte. Ia mendeskripsikan tasnya kepada petugas, lalu petugas mengembalikannya. Setelah itu penumpang menelepon Lina dan berterima kasih kepadanya.',
					role: 'Penyelesaian. Pemilik mendeskripsikan tasnya dan mendapatkannya kembali.'
				}
			]
		},
		patterns: [
			'Untuk menemukan inti, baca tanpa keterangan waktu atau tempat terlebih dahulu. Tambahkan rincian itu lagi saat menerjemahkan keseluruhan.',
			'Untuk membedakan dua akhiran yang sama, tanyakan fungsi kata tempat akhiran itu melekat. Benda yang dikembalikan berbeda dari penerimanya.'
		],
		exercises: [
			{
				arabic: 'قَبْلَ أَنْ تُغَادِرَ الْحَافِلَةُ، رَأَتْ لِينَا حَقِيبَةً صَغِيرَةً تَحْتَ الْمَقْعَدِ.',
				prompt:
					'Paragraf 1. Sebutkan verba utama, pelaku, dan objek. Bagian mana yang menjelaskan waktu dan tempat?',
				answer:
					'Verba utama رَأَتْ (“melihat”), pelaku لِينَا, dan objek حَقِيبَةً صَغِيرَةً (“tas kecil”). Bagian sebelum koma menjelaskan kapan. تَحْتَ الْمَقْعَدِ menjelaskan letak tas.'
			},
			{
				arabic: 'أَحْضَرَتْ لِينَا الْحَقِيبَةَ إِلَى الْمَكْتَبِ الَّذِي يَسْتَقْبِلُ الْمَفْقُودَاتِ.',
				prompt:
					'Paragraf 2. Apa tindakan utama Lina? Klausa setelah الَّذِي menjelaskan tas atau kantor?',
				answer:
					'Lina membawa tas ke kantor. الَّذِي يَسْتَقْبِلُ الْمَفْقُودَاتِ menerangkan kantor dan menjelaskan fungsinya: menerima barang hilang.'
			},
			{
				arabic: 'وَسُجِّلَ وَقْتُ الْعُثُورِ عَلَيْهَا.',
				prompt: 'Paragraf 2. Apa yang dicatat? Apakah kalimat ini menentukan siapa yang mencatat?',
				answer:
					'Yang dicatat adalah waktu penemuan tas. سُجِّلَ berbentuk pasif. Kalimat tidak menyebut siapa yang mencatat.'
			},
			{
				arabic: 'فَأَعَادَهَا إِلَيْهَا.',
				prompt: 'Paragraf 3. Temukan pelakunya. Apa rujukan -hā pertama dan kedua?',
				answer:
					'Pelakunya petugas, dipahami dari kalimat sebelumnya dan bentuk verba maskulin tunggal. -hā pertama melekat pada verba dan merujuk pada tas. -hā kedua melekat pada “kepada” dan merujuk pada penumpang.'
			},
			{
				prompt:
					'Tulis gagasan utama cerita dalam satu kalimat. Pilih satu detail pendukung dari paragraf 2 atau 3.',
				answer:
					'Lina menyerahkan tas yang ditemukannya sehingga tas kembali kepada pemiliknya. Detail pendukung: Lina membawanya ke kantor barang hilang, atau pemilik mendeskripsikannya kepada petugas. Waktu penemuan merupakan rincian tambahan.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u11-05',
		slug: 'lacak-kata-ganti',
		title: 'Lacak kata ganti antarparagraf',
		goal: 'Hubungkan akhiran kata ganti dengan orang atau benda yang dirujuk dan buktikan pilihan lewat perannya dalam kalimat.',
		minutes: 12,
		competencies: ['CB-12', 'CB-14', 'CB-23', 'CB-24'],
		references: [pronouns, relative, reading],
		intro:
			'Setiap kali menemukan akhiran -hā, tulis kata yang digantikannya. Jika ada beberapa kandidat feminin, uji mana yang masuk akal berdasarkan tindakan dan konteks.',
		passage: {
			title: 'Foto untuk pameran',
			analysis: photoAnalysis,
			arabicTitle: 'صُورَةٌ لِلْمَعْرِضِ',
			glossary: [
				{ arabic: 'مَعْرِضٌ', meaning: 'Pameran' },
				{ arabic: 'اِسْتَعَارَتْ', meaning: 'Ia (perempuan) meminjam' },
				{ arabic: 'عَلَّقَتْ', meaning: 'Ia (perempuan) menggantung atau memasang' },
				{ arabic: 'مَوْضُوعٌ', meaning: 'Topik atau tema' }
			],
			paragraphs: [
				{
					arabic:
						'أَعْلَنَتِ الْمَدْرَسَةُ عَنْ مَعْرِضٍ لِلصُّوَرِ. أَرَادَتْ لِينَا أَنْ تُشَارِكَ فِيهِ، فَاسْتَعَارَتْ كَامِيرَا مِنْ أُخْتِهَا وَذَهَبَتْ إِلَى السُّوقِ.',
					meaning:
						'Sekolah mengumumkan pameran foto. Lina ingin ikut, jadi ia meminjam kamera dari saudara perempuannya dan pergi ke pasar.',
					role: 'Tujuan dan persiapan. Kata ganti pada fīhi merujuk pada pameran.'
				},
				{
					arabic:
						'اِلْتَقَطَتْ لِينَا صُورَةً لِبَائِعَةٍ تَعْمَلُ فِي السُّوقِ مُنْذُ عِشْرِينَ سَنَةً. ثُمَّ عَرَضَتْهَا عَلَى الْبَائِعَةِ وَسَأَلَتْهَا إِنْ كَانَتْ تُوَافِقُ عَلَى عَرْضِ الصُّورَةِ. فَوَافَقَتِ الْبَائِعَةُ.',
					meaning:
						'Lina memotret seorang pedagang perempuan yang sudah bekerja di pasar selama dua puluh tahun. Ia menunjukkan foto itu kepada pedagang tersebut dan bertanya apakah ia setuju fotonya dipamerkan. Pedagang itu setuju.',
					role: 'Kegiatan utama. Lina mengambil foto, menunjukkannya, dan meminta persetujuan.'
				},
				{
					arabic:
						'فِي يَوْمِ الْمَعْرِضِ، عَلَّقَتْ لِينَا الصُّورَةَ وَكَتَبَتْ تَحْتَهَا جُمْلَةً عَنْ عَمَلِ الْبَائِعَةِ. قَرَأَ الزُّوَّارُ الْجُمْلَةَ، ثُمَّ سَأَلُوا لِينَا عَنِ السُّوقِ. وَهَكَذَا أَصْبَحَتِ الصُّورَةُ بَدَايَةً لِحِوَارٍ عَنْ حَيَاةِ الْعَامِلِينَ فِيهِ.',
					meaning:
						'Pada hari pameran, Lina memasang foto dan menulis satu kalimat tentang pekerjaan pedagang itu di bawahnya. Para pengunjung membaca kalimat itu lalu bertanya kepada Lina tentang pasar. Foto itu pun mengawali percakapan tentang kehidupan orang-orang yang bekerja di pasar.',
					role: 'Hasil. Foto dan keterangannya memicu percakapan tentang kehidupan pekerja pasar.'
				}
			]
		},
		patterns: [
			'Kata ganti yang bentuknya sama bisa menunjuk entitas berbeda dalam satu kalimat. Periksa verba dan kata depan yang membawanya.',
			'Bandingkan apa yang diinginkan tokoh pada awal bacaan dengan apa yang terjadi pada akhirnya. Perubahan itu membantu merangkum cerita.'
		],
		exercises: [
			{
				prompt:
					'Paragraf 1 dan 3. Apa rujukan فِيهِ dalam “ingin ikut di dalamnya” dan dalam “orang-orang yang bekerja di dalamnya”? Sebutkan bukti konteksnya.',
				answer:
					'Pada paragraf 1, rujukannya pameran karena Lina ingin berpartisipasi di sana. Pada paragraf 3, rujukannya pasar karena yang dibicarakan adalah kehidupan orang-orang yang bekerja di pasar.'
			},
			{
				arabic: 'عَرَضَتْهَا عَلَى الْبَائِعَةِ وَسَأَلَتْهَا.',
				prompt: 'Paragraf 2. Siapa melakukan kedua tindakan? Rujukannya apa pada setiap -hā?',
				answer:
					'Lina melakukan keduanya. Pada عَرَضَتْهَا, benda yang diperlihatkan adalah foto. Pada سَأَلَتْهَا, orang yang ditanya adalah pedagang perempuan.'
			},
			{
				arabic: 'قَرَأَ الزُّوَّارُ الْجُمْلَةَ، ثُمَّ سَأَلُوا لِينَا عَنِ السُّوقِ.',
				prompt: 'Paragraf 3. Sebutkan pelaku, dua tindakan, dan hal yang ditanyakan.',
				answer:
					'Pengunjung membaca kalimat dan kemudian bertanya kepada Lina tentang pasar. Akhiran jamak pada سَأَلُوا merujuk kembali pada pengunjung.'
			},
			{
				prompt: 'Apa gagasan utama teks? Gunakan informasi dari paragraf pertama dan terakhir.',
				answer:
					'Lina menyiapkan foto untuk pameran dan foto itu memulai percakapan tentang kehidupan pekerja pasar. Cerita bergerak dari tujuan ikut pameran ke dampak foto saat dipamerkan.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u11-06',
		slug: 'rangkum-gagasan-dokumen',
		title: 'Rangkum gagasan utama dari empat paragraf',
		goal: 'Bedakan masalah, tanggapan, hasil awal, dan langkah lanjut, lalu tulis ringkasan yang sesuai bukti.',
		minutes: 15,
		competencies: ['CB-12', 'CB-22', 'CB-23', 'CB-24'],
		references: [pronouns, passive, reading],
		intro:
			'Baca teks sebagai laporan singkat. Beri setiap paragraf satu label fungsi. Ketika menulis ringkasan, cek apakah laporan sudah mengukur hasil atau masih menyatakan rencana.',
		passage: {
			title: 'Wadah air yang dapat diisi ulang',
			analysis: bottlesAnalysis,
			arabicTitle: 'قَوَارِيرُ يُمْكِنُ تَعْبِئَتُهَا مِنْ جَدِيدٍ',
			glossary: [
				{ arabic: 'يُرْمَى', meaning: 'Dibuang' },
				{ arabic: 'تَعْبِئَةٌ', meaning: 'Pengisian' },
				{ arabic: 'بَدَلًا مِنْ', meaning: 'Sebagai ganti, alih-alih' },
				{ arabic: 'يَقِيسُ', meaning: 'Mengukur' },
				{ arabic: 'النَّفَايَاتُ', meaning: 'Sampah' }
			],
			paragraphs: [
				{
					arabic:
						'لَاحَظَ فَرِيقُ النَّظَافَةِ أَنَّ عَدَدًا كَبِيرًا مِنْ قَوَارِيرِ الْمَاءِ يُرْمَى بَعْدَ فُسْحَةِ الظُّهْرِ. كَانَ مُعْظَمُهَا يُسْتَعْمَلُ مَرَّةً وَاحِدَةً، فَاقْتَرَحَ الْفَرِيقُ تَجْرِبَةَ حَلٍّ بَسِيطٍ.',
					meaning:
						'Tim kebersihan melihat banyak botol air dibuang setelah istirahat siang. Sebagian besar hanya dipakai sekali, jadi tim mengusulkan untuk mencoba solusi sederhana.',
					role: 'Masalah dan alasan untuk mencoba solusi. Banyak botol dibuang setelah sekali pakai.'
				},
				{
					arabic:
						'وَضَعَتْ إِدَارَةُ الْمَدْرَسَةِ نُقْطَةً لِتَعْبِئَةِ الْمَاءِ قُرْبَ الْمَلْعَبِ. وَطَلَبَتْ مِنَ الطُّلَّابِ أَنْ يُحْضِرُوا قَوَارِيرَهُمْ وَأَنْ يَمْلَؤُوهَا هُنَاكَ بَدَلًا مِنْ شِرَاءِ قَوَارِيرَ جَدِيدَةٍ.',
					meaning:
						'Pihak sekolah menyediakan tempat isi ulang air di dekat lapangan. Pihak sekolah meminta para siswa membawa botol sendiri dan mengisinya di sana alih-alih membeli botol baru.',
					role: 'Tindakan. Sekolah menyiapkan tempat isi ulang dan menjelaskan cara memakainya.'
				},
				{
					arabic:
						'خِلَالَ الْأُسْبُوعِ الْأَوَّلِ، اسْتَخْدَمَ كَثِيرٌ مِنَ الطُّلَّابِ نُقْطَةَ التَّعْبِئَةِ. وَلَكِنَّ فَرِيقَ النَّظَافَةِ لَمْ يَقِسْ كَمِّيَّةَ النَّفَايَاتِ بَعْدُ.',
					meaning:
						'Selama minggu pertama, banyak siswa menggunakan tempat isi ulang. Namun tim kebersihan belum mengukur jumlah sampah.',
					role: 'Hasil awal dan batas bukti. Pemakaian tempat isi ulang sudah diamati. Dampaknya pada sampah masih belum diukur.'
				},
				{
					arabic:
						'فِي الشَّهْرِ الْمُقْبِلِ، سَيُسَجِّلُ الْفَرِيقُ عَدَدَ الْقَوَارِيرِ الَّتِي تُرْمَى كُلَّ يَوْمٍ. وَسَيَعْرِضُ النَّتَائِجَ عَلَى الْإِدَارَةِ قَبْلَ أَنْ تُقَرِّرَ إِنْ كَانَتْ سَتَضَعُ نُقْطَةً ثَانِيَةً.',
					meaning:
						'Bulan depan, tim akan mencatat jumlah botol yang dibuang setiap hari. Tim akan menyampaikan hasilnya kepada pihak sekolah sebelum sekolah memutuskan apakah perlu menyediakan tempat isi ulang kedua.',
					role: 'Langkah berikutnya. Pengukuran akan memberi dasar untuk keputusan menambah tempat isi ulang.'
				}
			]
		},
		patterns: [
			'Ringkasan laporan menyatukan masalah dan tanggapan, kemudian menyebut apa yang diketahui tentang hasilnya.',
			'Periksa penanda waktu, negasi, dan kontras. Ketiganya membantu membedakan hasil yang sudah didapat, hasil yang belum diukur, dan langkah yang direncanakan.'
		],
		exercises: [
			{
				arabic: 'لَاحَظَ فَرِيقُ النَّظَافَةِ أَنَّ عَدَدًا كَبِيرًا مِنْ قَوَارِيرِ الْمَاءِ يُرْمَى.',
				prompt: 'Paragraf 1. Apa tindakan utama tim? Apa informasi yang dibawa klausa setelah أَنَّ?',
				answer:
					'Tim kebersihan memperhatikan sesuatu. Klausa setelah أَنَّ menyatakan apa yang mereka perhatikan: banyak botol air dibuang. Verba pasif يُرْمَى tidak menyebut pelaku pembuangan.'
			},
			{
				arabic: 'أَنْ يُحْضِرُوا قَوَارِيرَهُمْ وَأَنْ يَمْلَؤُوهَا هُنَاكَ.',
				prompt:
					'Paragraf 2. Siapa yang diminta membawa sesuatu? Apa yang dirujuk oleh -hum dan -hā?',
				answer:
					'Para siswa diminta membawa botol. -hum menunjukkan pemiliknya, para siswa. -hā adalah objek “mengisi” dan merujuk pada botol-botol itu. Jamak benda tak berakal di sini dirujuk dengan bentuk feminin tunggal.'
			},
			{
				prompt:
					'Apa hasil yang benar-benar diamati pada minggu pertama? Apakah teks sudah membuktikan sampah berkurang?',
				answer:
					'Banyak siswa menggunakan tempat isi ulang. Paragraf 3 mengatakan لَمْ يَقِسْ كَمِّيَّةَ النَّفَايَاتِ بَعْدُ, sehingga dampak pada jumlah sampah belum diketahui.'
			},
			{
				prompt:
					'Apa fungsi paragraf 4? Sebutkan pelaku pengukuran dan pihak yang akan memutuskan tentang tempat kedua.',
				answer:
					'Paragraf 4 menjelaskan rencana. Tim kebersihan akan menghitung botol yang dibuang. Pihak sekolah akan memakai hasilnya untuk memutuskan apakah perlu tempat isi ulang kedua.'
			},
			{
				prompt:
					'Ringkas laporan dalam dua kalimat yang memuat masalah, tindakan, dan status hasilnya.',
				answer:
					'Sekolah mencoba tempat isi ulang untuk menangani banyaknya botol yang dibuang setelah sekali pakai. Tempat itu sudah dipakai banyak siswa, dan tim akan mengukur hasilnya sebelum sekolah memutuskan apakah perlu menambah tempat kedua.'
			}
		]
	}
];
