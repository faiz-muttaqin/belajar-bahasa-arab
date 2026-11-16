import type { ReadingItem } from './checkpoints-stage5.js';

/** CB-23: 20 different original mini-paragraphs, not isolated word-meaning drills. */
export const mainIdeaItems: readonly ReadingItem[] = [
	{
		id: 'kebun-sekolah',
		arabic: 'زَرَعَ الطُّلَّابُ خَضْرَوَاتٍ فِي حَدِيقَةِ الْمَدْرَسَةِ. يَسْقُونَهَا كُلَّ صَبَاحٍ، ثُمَّ يَأْكُلُونَ بَعْضَهَا فِي الْمَطْعَمِ.',
		prompt: 'Apa gagasan utama paragraf?',
		choices: [
			'Siswa merawat kebun sayur sekolah',
			'Kantin buka pada pagi hari',
			'Siswa hanya belajar di kelas'
		],
		correct: 0,
		reason: 'Seluruh kalimat menjelaskan kegiatan menanam, merawat, dan memanfaatkan kebun sekolah.'
	},
	{
		id: 'bus-perpustakaan',
		arabic:
			'تَزُورُ حَافِلَةُ الْكُتُبِ الْقَرْيَةَ كُلَّ أُسْبُوعٍ. يَسْتَعِيرُ الْأَطْفَالُ مِنْهَا قِصَصًا وَيُعِيدُونَهَا فِي الزِّيَارَةِ التَّالِيَةِ.',
		prompt: 'Apa inti informasi?',
		choices: [
			'Anak-anak membeli bus',
			'Perpustakaan keliling melayani peminjaman di desa',
			'Bus rusak setiap pekan'
		],
		correct: 1,
		reason: 'Kedua kalimat membahas layanan buku keliling dan cara meminjamnya.'
	},
	{
		id: 'kelas-gambar',
		arabic: 'فَتَحَتِ الْمَدْرَسَةُ صَفًّا لِلرَّسْمِ يَوْمَ السَّبْتِ. يَتَعَلَّمُ الْأَطْفَالُ فِيهِ رَسْمَ الْأَشْجَارِ وَالْبُيُوتِ.',
		prompt: 'Pilih ringkasan paling tepat.',
		choices: [
			'Anak-anak hanya melukis rumah',
			'Sekolah menutup kelas seni',
			'Sekolah menyediakan kegiatan menggambar pada Sabtu'
		],
		correct: 2,
		reason: 'Topik keseluruhan adalah kelas menggambar, bukan salah satu benda yang digambar.'
	},
	{
		id: 'air-tanam',
		arabic: 'قَلَّ الْمَاءُ فِي الْحَدِيقَةِ هَذَا الشَّهْرَ. لِذَلِكَ جَمَعَ السُّكَّانُ مَاءَ الْمَطَرِ لِسَقْيِ النَّبَاتَاتِ.',
		prompt: 'Apa gagasan utamanya?',
		choices: [
			'Warga mengatasi kekurangan air untuk tanaman',
			'Air hujan hanya turun pagi',
			'Taman telah ditutup'
		],
		correct: 0,
		reason: 'Paragraf menghubungkan kurangnya air dengan upaya warga menampung hujan.'
	},
	{
		id: 'jalan-sepeda',
		arabic: 'وَضَعَتِ الْبَلَدِيَّةُ مَسَارًا خَاصًّا لِلدَّرَّاجَاتِ. أَصْبَحَ الطُّلَّابُ يَرْكَبُونَ دَرَّاجَاتِهِمْ إِلَى الْمَدْرَسَةِ بِسُهُولَةٍ.',
		prompt: 'Apa inti paragraf?',
		choices: [
			'Bersepeda dilarang',
			'Jalur sepeda memudahkan perjalanan siswa',
			'Sekolah dipindahkan'
		],
		correct: 1,
		reason: 'Kalimat awal menjelaskan pembangunan jalur dan akhir menjelaskan manfaatnya.'
	},
	{
		id: 'pelatihan-komputer',
		arabic: 'قَدَّمَ الْمَرْكَزُ دُرُوسًا مَجَّانِيَّةً فِي الْحَاسُوبِ. تَعَلَّمَ الْمُشَارِكُونَ كِتَابَةَ الرَّسَائِلِ وَحِفْظَ الْمَلَفَّاتِ.',
		prompt: 'Pilih judul/gagasan utama terbaik.',
		choices: [
			'Penyimpanan satu berkas',
			'Surat elektronik yang sulit',
			'Pelatihan komputer gratis dan keterampilannya'
		],
		correct: 2,
		reason: 'Kegiatan pusat adalah pelatihan komputer; contoh keterampilan menjadi detail.'
	},
	{
		id: 'pasar-pagi',
		arabic: 'يَفْتَحُ السُّوقُ الصَّغِيرُ أَبْوَابَهُ عِنْدَ الْفَجْرِ. يَشْتَرِي سُكَّانُ الْحَيِّ الْخُبْزَ وَالْخُضْرَوَاتِ قَبْلَ الْعَمَلِ.',
		prompt: 'Apa gagasan utamanya?',
		choices: [
			'Pasar pagi melayani kebutuhan warga sebelum bekerja',
			'Hanya roti dijual di pasar',
			'Pasar baru buka malam'
		],
		correct: 0,
		reason: 'Dua kalimat menjelaskan fungsi pasar pagi bagi kebutuhan warga.'
	},
	{
		id: 'tim-kebersihan',
		arabic: 'نَظَّمَ الشَّبَابُ حَمْلَةً لِتَنْظِيفِ النَّهْرِ. جَمَعُوا الْقُمَامَةَ وَوَضَعُوا لَوْحَاتٍ لِحِمَايَةِ الْمَكَانِ.',
		prompt: 'Ringkasan mana yang mencakup seluruh paragraf?',
		choices: [
			'Papan baru dipasang saja',
			'Pemuda membersihkan dan menjaga sungai',
			'Sungai dipakai untuk berenang'
		],
		correct: 1,
		reason: 'Pembersihan dan papan pelindung adalah dua tindakan dalam satu kampanye lingkungan.'
	},
	{
		id: 'perubahan-jam',
		arabic: 'أَعْلَنَتِ الْمَكْتَبَةُ أَنَّهَا سَتَفْتَحُ أَبْكَرَ فِي يَوْمِ الْجُمُعَةِ. يُرِيدُ الْمُوَظَّفُونَ مُسَاعَدَةَ الطُّلَّابِ قَبْلَ دُرُوسِهِمْ.',
		prompt: 'Apa inti pengumuman?',
		choices: [
			'Perpustakaan tutup Jumat',
			'Semua pelajaran dibatalkan',
			'Perpustakaan memajukan jam buka untuk siswa'
		],
		correct: 2,
		reason: 'Perubahan jam dan tujuannya menjadi pesan utama; teks tidak menyebut penutupan.'
	},
	{
		id: 'tukar-pakaian',
		arabic:
			'جَمَعَ سُكَّانُ الْحَيِّ مَلَابِسَ نَظِيفَةً لِلْأُسَرِ الْمُحْتَاجَةِ. فَرَزَ الْمُتَطَوِّعُونَ الْمَلَابِسَ حَسَبَ الْحَجْمِ قَبْلَ تَوْزِيعِهَا.',
		prompt: 'Pilih gagasan utama.',
		choices: [
			'Warga menyiapkan pakaian untuk dibagikan kepada keluarga membutuhkan',
			'Relawan hanya menghitung ukuran',
			'Warga membeli mobil baru'
		],
		correct: 0,
		reason: 'Pengumpulan dan pemilahan mendukung tujuan pembagian pakaian.'
	},
	{
		id: 'klub-cerita',
		arabic: 'يَلْتَقِي أَعْضَاءُ نَادِي الْقِرَاءَةِ بَعْدَ الْعَصْرِ. يَقْرَأُ كُلُّ شَخْصٍ قِصَّةً قَصِيرَةً، ثُمَّ يَتَحَدَّثُ الْجَمِيعُ عَنْهَا.',
		prompt: 'Apa ide pokoknya?',
		choices: [
			'Seseorang membaca sendiri di rumah',
			'Anggota klub berbagi dan membahas cerita',
			'Cerita hanya boleh dibaca pagi'
		],
		correct: 1,
		reason: 'Kegiatan utama klub adalah membaca lalu mendiskusikan cerita bersama.'
	},
	{
		id: 'lampu-jalan',
		arabic: 'كَانَ الطَّرِيقُ مُظْلِمًا بَعْدَ الْمَغْرِبِ. وَضَعَتِ الْبَلَدِيَّةُ مَصَابِيحَ جَدِيدَةً، فَأَصْبَحَ السَّيْرُ أَسْهَلَ.',
		prompt: 'Apa yang paling mewakili seluruh isi?',
		choices: [
			'Lampu dijual di pasar',
			'Orang berjalan saat siang',
			'Pemasangan lampu membuat jalan malam lebih mudah dilalui'
		],
		correct: 2,
		reason: 'Teks memaparkan masalah gelap, pemasangan lampu, dan hasilnya.'
	},
	{
		id: 'perpustakaan-anak',
		arabic: 'أَعَدَّتِ الْمَدْرَسَةُ رُكْنًا خَاصًّا بِكُتُبِ الْأَطْفَالِ. وَضَعَتْ فِيهِ قِصَصًا قَصِيرَةً وَمَقَاعِدَ صَغِيرَةً.',
		prompt: 'Apa gagasan utama?',
		choices: [
			'Sekolah membuat area membaca khusus anak-anak',
			'Kursi kecil tidak cukup',
			'Sekolah menutup perpustakaan'
		],
		correct: 0,
		reason: 'Kisah dan kursi kecil merupakan rincian tentang area baca khusus anak.'
	},
	{
		id: 'latihan-pertolongan',
		arabic: 'تَدَرَّبَ الطُّلَّابُ عَلَى طَلَبِ الْمُسَاعَدَةِ عِنْدَ الطَّوَارِئِ. شَرَحَ الْمُدَرِّسُ لَهُمْ كَيْفَ يَتَّصِلُونَ بِالْمَسْؤُولِينَ.',
		prompt: 'Ringkasan paling tepat?',
		choices: [
			'Telepon siswa hilang',
			'Siswa belajar meminta bantuan saat darurat',
			'Pelajaran olahraga ditiadakan'
		],
		correct: 1,
		reason: 'Penjelasan cara menghubungi petugas memperinci pelatihan menghadapi keadaan darurat.'
	},
	{
		id: 'taman-bunga',
		arabic: 'زَرَعَتِ الْأُسْرَةُ أَزْهَارًا عِنْدَ الْبَابِ. تَعَاوَنَ الْأَبُ وَالْأُمُّ وَالْأَطْفَالُ عَلَى سَقْيِهَا كُلَّ يَوْمٍ.',
		prompt: 'Apa gagasan utamanya?',
		choices: [
			'Bunga tumbuh di pasar',
			'Ibu bekerja sendiri',
			'Keluarga bersama-sama merawat bunga di rumah'
		],
		correct: 2,
		reason: 'Pelaku bersama keluarga dan perawatan harian mengikat seluruh isi paragraf.'
	},
	{
		id: 'pengiriman-buku',
		arabic: 'أَرْسَلَ الْمَرْكَزُ صَنَادِيقَ كُتُبٍ إِلَى ثَلَاثِ مَدَارِسَ. فَتَحَ الْمُدَرِّسُونَ الصَّنَادِيقَ وَوَزَّعُوا الْكُتُبَ عَلَى الصُّفُوفِ.',
		prompt: 'Apa inti bacaan?',
		choices: [
			'Pusat mengirim buku ke sekolah untuk digunakan siswa',
			'Sekolah membuang kotak',
			'Guru membeli kertas'
		],
		correct: 0,
		reason: 'Pengiriman dan distribusi buku membentuk satu peristiwa utama.'
	},
	{
		id: 'kursus-memasak',
		arabic:
			'تَعَلَّمَ الْمُشَارِكُونَ طَبْخَ وَجْبَاتٍ بَسِيطَةٍ فِي الدَّوْرَةِ. اسْتَخْدَمُوا الْخُضْرَوَاتِ وَالْأَرُزَّ، ثُمَّ تَنَاوَلُوا الطَّعَامَ مَعًا.',
		prompt: 'Ide pokok paragraf ialah ...',
		choices: [
			'Nasi mahal di toko',
			'Peserta berlatih memasak makanan sederhana bersama',
			'Peserta hanya belajar teori'
		],
		correct: 1,
		reason: 'Bahan makanan dan makan bersama adalah rincian aktivitas kursus memasak.'
	},
	{
		id: 'pelajaran-sains',
		arabic: 'أَحْضَرَ الْمُدَرِّسُ نَبَاتَاتٍ مُخْتَلِفَةً إِلَى الْفَصْلِ. قَارَنَ الطُّلَّابُ بَيْنَ أَوْرَاقِهَا وَجُذُورِهَا لِفَهْمِ اخْتِلَافِهَا.',
		prompt: 'Pilih gagasan utama terbaik.',
		choices: [
			'Akar tanaman dilarang disentuh',
			'Siswa hanya menulis daftar',
			'Siswa mengamati perbedaan tanaman dalam pelajaran'
		],
		correct: 2,
		reason: 'Aktivitas membandingkan daun dan akar mendukung tujuan mempelajari perbedaan tanaman.'
	},
	{
		id: 'papan-arahan',
		arabic: 'وَضَعَ الْمُسْتَشْفَى لَافِتَاتٍ جَدِيدَةً فِي الْمَمَرَّاتِ. أَصْبَحَ الزُّوَّارُ يَجِدُونَ الْغُرَفَ بِسُهُولَةٍ.',
		prompt: 'Ringkasan tepat adalah ...',
		choices: [
			'Papan petunjuk membantu pengunjung menemukan ruangan',
			'Semua pengunjung menjadi dokter',
			'Lorong dipindahkan ke luar'
		],
		correct: 0,
		reason: 'Pemasangan petunjuk dan kemudahan menemukan ruangan adalah inti hubungan sebab-akibat.'
	},
	{
		id: 'tiket-museum',
		arabic: 'أَعْلَنَ الْمَتْحَفُ عَنْ يَوْمِ زِيَارَةٍ مَجَّانِيٍّ لِلْأُسَرِ. جَاءَ الْأَطْفَالُ مَعَ وَالِدَيْهِمْ وَشَاهَدُوا الْمَعْرُوضَاتِ.',
		prompt: 'Apa ide utamanya?',
		choices: [
			'Museum menutup pintu',
			'Museum memberi kesempatan kunjungan gratis untuk keluarga',
			'Anak-anak membeli barang pameran'
		],
		correct: 1,
		reason:
			'Hari gratis menjadi topik, sedangkan kunjungan keluarga dan melihat koleksi adalah rinciannya.'
	}
];
