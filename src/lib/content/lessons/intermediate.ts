import { comparisonLesson } from './document-reading.js';
import { readingPractice } from './reading-practice.js';
import type { Lesson } from './types.js';

const reading = {
	label: 'Al Jazeera Learning Arabic · Bacaan dengan pertanyaan pemahaman',
	href: 'https://learning.aljazeera.net/ar'
};
const framework = {
	label: 'Council of Europe · Deskriptor pemahaman bacaan',
	href: 'https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors'
};
const base = {
	track: 'belajar',
	level: 'Menengah',
	register: 'msa',
	reviewStatus: 'draft',
	revision: 1,
	references: [reading, framework]
} as const;

export const intermediateLessons: readonly Lesson[] = [
	{
		...base,
		id: 'lesson-u10-01',
		slug: 'hubungkan-antar-kalimat',
		title: 'Baca urutan, alasan, dan pertentangan',
		minutes: 9,
		competencies: ['CB-22'],
		goal: 'Jelaskan hubungan antarbagian kalimat dan tunjuk kata yang mendukung tafsiran Anda.',
		intro:
			'Baca dua gagasan paling dulu. Setelah itu, cari bagaimana penulis menghubungkannya. Satu kata penghubung dapat menentukan apakah gagasan kedua adalah alasan, akibat, kelanjutan, atau pengecualian terhadap dugaan awal.',
		examples: [
			{
				arabic: 'أَغْلَقَتْ لِينَا النَّافِذَةَ لِأَنَّ الْغُرْفَةَ بَارِدَةٌ.',
				meaning: 'Lina menutup jendela karena ruangan itu dingin.',
				note: 'Pertanyaan “mengapa?” dijawab setelah kata penghubung.'
			},
			{
				arabic: 'أَغْلَقَتْ لِينَا النَّافِذَةَ، ثُمَّ جَلَسَتْ.',
				meaning: 'Lina menutup jendela, lalu duduk.',
				note: 'Kata penghubung menunjukkan urutan. Pelaku tindakan kedua dapat dipahami dari tindakan pertama.'
			},
			{
				arabic: 'الْمَكْتَبَةُ صَغِيرَةٌ، وَلَكِنَّهَا هَادِئَةٌ.',
				meaning: 'Perpustakaan itu kecil, tetapi tenang.',
				note: 'Klausa kedua memberi sisi lain. Akhiran -hā merujuk pada perpustakaan.'
			}
		],
		patterns: [
			'Tanyakan apa fungsi klausa kedua. Jika memberi alasan, tuliskan “terjadi karena …”. Jika menyusul, buat garis waktu pendek.',
			'Tandai dua jenis bukti: kata penghubung yang terlihat dan informasi yang hanya disimpulkan. Urutan waktu saja belum membuktikan sebab.'
		],
		exercises: [
			{
				arabic: 'تَأَخَّرَتِ الْحَافِلَةُ، لِذَلِكَ بَدَأَ الدَّرْسُ مُتَأَخِّرًا.',
				prompt: 'Apa peristiwa awal dan apa akibat yang dinyatakan?',
				answer:
					'Bus terlambat. Akibatnya, pelajaran mulai terlambat. Penanda akibatnya لِذَلِكَ, “oleh karena itu”.'
			},
			{
				arabic: 'دَخَلَ سَامِي الْمَكْتَبَةَ، ثُمَّ بَحَثَ عَنْ كِتَابٍ.',
				prompt: 'Apa yang terjadi lebih dulu? Apakah penulis menyebut alasannya secara langsung?',
				answer:
					'Sami masuk perpustakaan lebih dulu, kemudian mencari buku. “Kemudian” menunjukkan urutan. Tujuan masuk dapat diduga dari tindakannya, tetapi tidak dinyatakan secara langsung.'
			},
			{
				arabic: 'الْكِتَابُ قَصِيرٌ، وَلَكِنَّهُ صَعْبٌ.',
				prompt: 'Apa dua penilaian penulis? Di mana kontrasnya?',
				answer:
					'Bukunya pendek, tetapi sulit. Penulis mempertemukan panjang yang sedikit dan tingkat kesulitan yang relatif tinggi.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u11-01',
		slug: 'gagasan-utama-paragraf',
		title: 'Temukan gagasan utama paragraf',
		minutes: 9,
		competencies: ['CB-23'],
		goal: 'Tulis ringkasan satu kalimat dengan memilih bukti yang mendukung gagasan utama.',
		intro:
			'Baca paragraf sekali tanpa kamus. Tulis siapa atau apa yang dibahas. Baca lagi untuk menemukan apa yang paling penting tentang topik itu.',
		examples: [],
		passage: {
			title: 'Sebuah rak untuk bertukar buku',
			arabicTitle: 'رَفٌّ لِتَبَادُلِ الْكُتُبِ',
			glossary: [
				{ arabic: 'رَفٌّ', meaning: 'Rak' },
				{ arabic: 'تَبَادُلٌ', meaning: 'Pertukaran' },
				{ arabic: 'آخَرَ', meaning: 'Yang lain' },
				{ arabic: 'أَصْبَحَ', meaning: 'Menjadi, mulai berada dalam suatu keadaan' }
			],
			paragraphs: [
				{
					arabic:
						'وَضَعَ الطُّلَّابُ رَفًّا صَغِيرًا عِنْدَ بَابِ الْفَصْلِ لِتَبَادُلِ الْكُتُبِ. يَضَعُ كُلُّ طَالِبٍ كِتَابًا عَلَى الرَّفِّ، وَيَسْتَطِيعُ أَنْ يَأْخُذَ كِتَابًا آخَرَ. وَبَعْدَ أُسْبُوعٍ، أَصْبَحَ عَلَى الرَّفِّ عِشْرُونَ كِتَابًا.',
					meaning:
						'Para siswa menaruh sebuah rak kecil di dekat pintu kelas untuk bertukar buku. Setiap siswa menaruh satu buku di rak dan boleh mengambil buku lain. Setelah seminggu, ada dua puluh buku di rak.',
					role: 'Kalimat pertama mengenalkan kegiatan dan tujuannya. Kalimat kedua menjelaskan caranya. Kalimat ketiga memberi hasil awal dalam bentuk angka.'
				}
			]
		},
		patterns: [
			'Pisahkan topik dari gagasan utama. “Rak” adalah topik. “Siswa memakai rak sebagai tempat bertukar buku” menyatakan apa yang ingin disampaikan tentangnya.',
			'Gunakan detail sebagai bukti. Letak rak menjawab “di mana”, sedangkan angka menjawab “berapa”. Ringkasan boleh meninggalkan keduanya.'
		],
		exercises: [
			{
				prompt: 'Ringkas paragraf dalam satu kalimat tanpa menyebut angka atau letak rak.',
				answer: 'Para siswa menyediakan rak untuk saling bertukar buku.'
			},
			{
				prompt: 'Bagian mana yang menjelaskan tujuan pemasangan rak?',
				answer:
					'لِتَبَادُلِ الْكُتُبِ, “untuk bertukar buku”. Bagian itu berada setelah keterangan lokasi pada kalimat pertama.'
			},
			{
				prompt: 'Apa fungsi angka dua puluh? Apakah angka itu menunjukkan jumlah siswa?',
				answer:
					'Angka itu memberi gambaran hasil awal. Yang dihitung adalah buku di rak setelah satu minggu.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u11-02',
		slug: 'struktur-dokumen-pendek',
		title: 'Petakan fungsi setiap paragraf',
		minutes: 12,
		competencies: ['CB-24'],
		goal: 'Susun peta masalah, tindakan, dan hasil dari teks tiga paragraf, lalu ringkas keseluruhannya.',
		intro:
			'Baca judul dan kalimat pertama setiap paragraf. Buat dugaan tentang isi tulisan, lalu periksa seluruh bacaan. Setelah itu beri setiap paragraf satu label fungsi.',
		examples: [],
		passage: {
			title: 'Jam baru untuk perpustakaan',
			arabicTitle: 'مَوَاعِيدُ الْمَكْتَبَةِ الْجَدِيدَةُ',
			glossary: [
				{ arabic: 'عِنْدَ الظُّهْرِ', meaning: 'Pada tengah hari' },
				{ arabic: 'تَمْدِيدُ سَاعَاتِ الْعَمَلِ', meaning: 'Perpanjangan jam layanan' },
				{ arabic: 'تَظَلُّ مَفْتُوحَةً', meaning: 'Tetap buka' },
				{ arabic: 'الزُّوَّارُ', meaning: 'Para pengunjung' },
				{ arabic: 'تُوَاصِلَ', meaning: 'Melanjutkan' }
			],
			paragraphs: [
				{
					arabic:
						'كَانَتِ الْمَكْتَبَةُ تُغْلِقُ عِنْدَ الظُّهْرِ. وَكَانَ بَعْضُ الطُّلَّابِ يَصِلُونَ إِلَيْهَا بَعْدَ الدَّرْسِ، فَيَجِدُونَ الْبَابَ مُغْلَقًا.',
					meaning:
						'Perpustakaan biasa tutup pada tengah hari. Sebagian siswa tiba setelah pelajaran dan mendapati pintunya sudah tertutup.',
					role: 'Latar dan masalah. Jam tutup membuat sebagian siswa tidak bisa masuk setelah pelajaran.'
				},
				{
					arabic:
						'لِحَلِّ هَذِهِ الْمُشْكِلَةِ، قَرَّرَتْ إِدَارَةُ الْمَدْرَسَةِ تَمْدِيدَ سَاعَاتِ الْعَمَلِ. وَمُنْذُ ذَلِكَ الْوَقْتِ، تَظَلُّ الْمَكْتَبَةُ مَفْتُوحَةً حَتَّى السَّاعَةِ الثَّالِثَةِ فِي يَوْمَيْنِ مِنْ كُلِّ أُسْبُوعٍ.',
					meaning:
						'Untuk mengatasi masalah ini, pihak sekolah memutuskan memperpanjang jam layanan. Perpustakaan mulai buka sampai pukul tiga pada dua hari setiap minggu.',
					role: 'Tindakan. Frasa “masalah ini” mengacu pada keadaan di paragraf pertama.'
				},
				{
					arabic:
						'بَعْدَ شَهْرٍ، زَادَ عَدَدُ الزُّوَّارِ بَعْدَ الظُّهْرِ. لِذَلِكَ قَرَّرَتِ الْإِدَارَةُ أَنْ تُوَاصِلَ الْعَمَلَ بِالْمَوْعِدِ الْجَدِيدِ.',
					meaning:
						'Setelah sebulan, jumlah pengunjung selepas tengah hari meningkat. Karena itu, pihak sekolah memutuskan mempertahankan jadwal baru.',
					role: 'Hasil dan keputusan lanjutan. Kenaikan pengunjung menjadi alasan yang dinyatakan untuk melanjutkan jadwal.'
				}
			]
		},
		patterns: [
			'Peta pendeknya adalah masalah → tindakan → hasil. Kenali kaitan antarpagraf dari rujukan seperti “masalah ini” dan penanda seperti “karena itu”.',
			'Ringkasan dokumen memuat hubungan antarbagian. Satukan masalah dan tindakan, lalu sebutkan hasil yang membuat tindakan itu dipertahankan.'
		],
		exercises: [
			{
				prompt: 'Apa rujukan “masalah ini” pada awal paragraf kedua?',
				answer:
					'Sebagian siswa tiba setelah pelajaran dan mendapati perpustakaan sudah tutup. Itulah masalah pada paragraf pertama.'
			},
			{
				prompt: 'Apakah perpustakaan buka sampai pukul tiga setiap hari? Apa buktinya?',
				answer:
					'Hanya pada dua hari setiap minggu. Keterangan itu ada di kalimat kedua paragraf kedua.'
			},
			{
				prompt: 'Ringkas dokumen dalam dua kalimat.',
				answer:
					'Sekolah memperpanjang jam perpustakaan pada dua hari tiap minggu agar siswa bisa datang selepas pelajaran. Karena pengunjung setelah tengah hari bertambah, jadwal baru dipertahankan.'
			}
		]
	},
	comparisonLesson,
	...readingPractice,
	{
		...base,
		id: 'lesson-u12-01',
		slug: 'uji-membaca-dokumen',
		title: 'Uji pemahaman dengan teks baru',
		minutes: 14,
		competencies: ['CB-21', 'CB-24'],
		goal: 'Pahami pengumuman baru, pisahkan fakta dari dugaan, lalu ringkas dengan bukti dari teks.',
		intro:
			'Baca pengumuman berikut tanpa membuka terjemahan. Tulis tujuan dokumen dalam satu kalimat. Setelah menjawab pertanyaan, cocokkan bukti yang Anda gunakan dengan pembahasan.',
		examples: [],
		passage: {
			title: 'Pengumuman klub baca',
			arabicTitle: 'إِعْلَانٌ مِنْ نَادِي الْقِرَاءَةِ',
			glossary: [
				{ arabic: 'سَيُعْقَدُ', meaning: 'Akan diadakan' },
				{ arabic: 'بَدَلًا مِنْ', meaning: 'Sebagai ganti' },
				{ arabic: 'أَوْسَعُ', meaning: 'Lebih luas' },
				{ arabic: 'يُرْجَى', meaning: 'Diharapkan atau diminta' },
				{ arabic: 'تَعَذَّرَ', meaning: 'Tidak memungkinkan' }
			],
			paragraphs: [
				{
					arabic:
						'يُعْلِنُ نَادِي الْقِرَاءَةِ أَنَّ لِقَاءَ يَوْمِ الْخَمِيسِ سَيُعْقَدُ فِي الْقَاعَةِ الثَّانِيَةِ بَدَلًا مِنَ الْمَكْتَبَةِ. وَيَبْقَى وَقْتُ اللِّقَاءِ كَمَا هُوَ: السَّاعَةُ الرَّابِعَةُ بَعْدَ الظُّهْرِ.',
					meaning:
						'Klub baca mengumumkan pertemuan hari Kamis akan berlangsung di aula kedua sebagai ganti perpustakaan. Waktu pertemuan tetap sama, pukul empat sore.',
					role: 'Perubahan tempat dan keterangan yang tetap. Informasi utama muncul sebelum alasan.'
				},
				{
					arabic:
						'اخْتَارَ النَّادِي هَذِهِ الْقَاعَةَ لِأَنَّهَا أَوْسَعُ. وَيُرْجَى مِنَ الْمُشَارِكِينَ أَنْ يُحْضِرُوا نُسْخَةً مِنَ الْقِصَّةِ وَسُؤَالًا وَاحِدًا لِلنِّقَاشِ.',
					meaning:
						'Klub memilih aula itu karena lebih luas. Peserta diminta membawa satu salinan cerita dan satu pertanyaan untuk diskusi.',
					role: 'Alasan perubahan tempat dan tindakan yang diharapkan dari peserta.'
				},
				{
					arabic: 'إِذَا تَعَذَّرَ عَلَى أَحَدٍ الْحُضُورُ، فَيُمْكِنُهُ إِرْسَالُ سُؤَالِهِ إِلَى النَّادِي قَبْلَ اللِّقَاءِ.',
					meaning:
						'Jika seseorang tidak dapat hadir, ia dapat mengirim pertanyaannya kepada klub sebelum pertemuan.',
					role: 'Ketentuan tambahan untuk peserta yang berhalangan.'
				}
			]
		},
		patterns: [
			'Gunakan tiga pertanyaan untuk membaca pengumuman. Apa yang berubah? Apa yang tetap? Apa yang perlu dilakukan pembaca?',
			'Uji jawaban dengan menunjuk cuplikan yang mendukungnya. Jika pengumuman hanya mengatakan aula lebih luas, jumlah peserta masih belum diketahui.'
		],
		exercises: [
			{
				prompt: 'Anda akan hadir. Kapan, ke mana, dan apa yang perlu dibawa?',
				answer:
					'Kamis pukul empat sore, ke aula kedua. Bawa salinan cerita dan satu pertanyaan diskusi. Buktinya ada pada paragraf satu dan dua.'
			},
			{
				prompt:
					'Apakah teks mengatakan bahwa jumlah peserta bertambah? Kutip alasan yang benar-benar disebut.',
				answer:
					'Jumlah peserta tidak disebut. Alasan yang dinyatakan adalah لِأَنَّهَا أَوْسَعُ, “karena aula itu lebih luas”.'
			},
			{
				prompt:
					'Apa fungsi paragraf terakhir dan bagaimana peserta yang absen bisa ikut berkontribusi?',
				answer:
					'Ini ketentuan untuk ketidakhadiran. Peserta yang tidak bisa hadir boleh mengirim pertanyaannya kepada klub sebelum pertemuan.'
			},
			{
				prompt: 'Tulis ringkasan dua kalimat yang akan membantu anggota klub bertindak.',
				answer:
					'Pertemuan klub baca Kamis pukul empat sore pindah ke aula kedua, dan peserta diminta membawa cerita serta satu pertanyaan. Peserta yang tidak bisa hadir boleh mengirim pertanyaan sebelum pertemuan.'
			}
		]
	}
];
