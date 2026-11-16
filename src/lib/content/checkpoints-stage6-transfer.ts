import type { DocumentItem } from './checkpoints-stage6.js';

/** CB-21: twenty independent announcements; supported inference vs unsupported guess. */
export const transferItems: readonly DocumentItem[] = [
	{
		id: 'museum-tiket',
		arabic:
			'أَعْلَنَ الْمَتْحَفُ أَنَّ زِيَارَةَ الْأُسَرِ سَتَكُونُ مَجَّانِيَّةً يَوْمَ الْجُمُعَةِ. وَسَيَبْقَى وَقْتُ الْإِغْلَاقِ كَمَا هُوَ. وَلَمْ يَذْكُرِ الْإِعْلَانُ شَيْئًا عَنْ يَوْمِ السَّبْتِ.',
		prompt: 'Kesimpulan mana yang didukung pengumuman?',
		choices: [
			'Kunjungan keluarga gratis Jumat, Sabtu belum dijelaskan',
			'Museum gratis setiap hari',
			'Jam tutup diperpanjang'
		],
		correct: 0,
		reason: 'Hanya Jumat yang disebut gratis; jam tutup tetap, Sabtu tidak dijelaskan.'
	},
	{
		id: 'buku-ahad',
		arabic:
			'سَتَفْتَحُ الْمَكْتَبَةُ يَوْمَ الْأَحَدِ لِأَوَّلِ مَرَّةٍ هَذَا الشَّهْرَ. وَيُسْمَحُ بِالدُّخُولِ لِلزُّوَّارِ، لَكِنَّ خِدْمَةَ اسْتِعَارَةِ الْكُتُبِ لَنْ تَعْمَلَ فِي ذَلِكَ الْيَوْمِ.',
		prompt: 'Apa yang boleh dilakukan pada Ahad tersebut?',
		choices: [
			'Meminjam buku pulang',
			'Masuk perpustakaan, tetapi tidak meminjam buku',
			'Mengembalikan alat elektronik'
		],
		correct: 1,
		reason:
			'Teks mengizinkan kunjungan namun secara eksplisit meniadakan layanan peminjaman pada Ahad itu.'
	},
	{
		id: 'hujan-pertandingan',
		arabic:
			'سَتُقَامُ الْمُبَارَاةُ السَّاعَةَ الْخَامِسَةَ إِنْ لَمْ تَنْزِلْ أَمْطَارٌ غَزِيرَةٌ. وَإِذَا نَزَلَتْ فَسَيُعْلَنُ مَوْعِدٌ جَدِيدٌ فِي الْمَسَاءِ.',
		prompt: 'Bagaimana status kepastian waktu pertandingan?',
		choices: ['Pasti dimulai pukul lima', 'Pasti dibatalkan', 'Pukul lima bersyarat pada cuaca'],
		correct: 2,
		reason: 'Kalimat bersyarat إِنْ لَمْ memberi batas pada waktu yang direncanakan.'
	},
	{
		id: 'makanan-pendaftaran',
		arabic:
			'أَعْلَنَتِ الْمَدْرَسَةُ عَنْ وَجْبَاتٍ لِلْمُشَارِكِينَ فِي الرِّحْلَةِ. وَطَلَبَتْ مِنْهُمْ تَسْجِيلَ أَسْمَائِهِمْ قَبْلَ الْخَمِيسِ. لَمْ تُحَدِّدِ الرِّسَالَةُ أَنْوَاعَ الطَّعَامِ.',
		prompt: 'Informasi apa yang belum tersedia?',
		choices: ['Jenis makanan', 'Batas pendaftaran', 'Kegiatan yang menyediakan makanan'],
		correct: 0,
		reason: 'Pesan menyebut layanan dan tenggat, bukan daftar makanan.'
	},
	{
		id: 'bus-tanpa-sebab',
		arabic:
			'أَرْسَلَتِ الْمَدْرَسَةُ رِسَالَةً: تَأَخَّرَتْ حَافِلَةُ الصَّفِّ الثَّالِثِ نِصْفَ سَاعَةٍ. وَسَتَصِلُ قَرِيبًا. لَمْ تَشْرَحِ الرِّسَالَةُ سَبَبَ التَّأَخُّرِ.',
		prompt: 'Pilih pernyataan yang tidak didukung.',
		choices: [
			'Bus terlambat setengah jam',
			'Bus terlambat karena hujan',
			'Bus diperkirakan segera tiba'
		],
		correct: 1,
		reason: 'Penyebab keterlambatan tidak dicantumkan, jadi hujan tidak boleh disimpulkan.'
	},
	{
		id: 'kartu-relawan',
		arabic:
			'يَسْتَطِيعُ الرَّاغِبُونَ فِي التَّطَوُّعِ إِرْسَالَ أَسْمَائِهِمْ إِلَى الْمَرْكَزِ. وَسَيَتَلَقَّى الْمَقْبُولُونَ رِسَالَةً يَوْمَ الْإِثْنَيْنِ. لَيْسَ فِي الْإِعْلَانِ وَعْدٌ بِقَبُولِ الْجَمِيعِ.',
		prompt: 'Siapa yang akan menerima pesan pada Senin?',
		choices: ['Setiap pengirim nama', 'Semua warga', 'Pelamar yang diterima'],
		correct: 2,
		reason: 'الْمَقْبُولُونَ membatasi penerima pesan pada pelamar yang diterima.'
	},
	{
		id: 'pindah-arsip',
		arabic:
			'سَتَنْتَقِلُ غُرْفَةُ الْأَرْشِيفِ إِلَى الطَّابِقِ الثَّانِي. وَيُمْكِنُ طَلَبُ الْمَلَفَّاتِ مِنَ الْمَكْتَبِ الْأَوَّلِ حَتَّى يَوْمِ الْأَرْبِعَاءِ. بَعْدَ ذَلِكَ تُقَدَّمُ الطَّلَبَاتُ فِي الْغُرْفَةِ الْجَدِيدَةِ.',
		prompt: 'Kapan permintaan arsip berpindah lokasi?',
		choices: ['Setelah hari Rabu', 'Sebelum hari Senin', 'Tidak ada perubahan'],
		correct: 0,
		reason: 'Teks menyebut kantor lama melayani sampai Rabu, lalu lokasi baru.'
	},
	{
		id: 'harga-pasar',
		arabic:
			'كَتَبَ التَّاجِرُ أَنَّ سِعْرَ الْأَرُزِّ انْخَفَضَ هَذَا الْأُسْبُوعَ. لَكِنَّهُ لَمْ يَكْتُبْ سِعْرَ الزَّيْتِ. وَطَلَبَ مِنَ الزُّبَائِنِ السُّؤَالَ عَنْ أَسْعَارِ السِّلَعِ الْأُخْرَى.',
		prompt: 'Manakah informasi yang pasti?',
		choices: ['Semua barang turun harga', 'Harga beras turun minggu ini', 'Harga minyak turun'],
		correct: 1,
		reason: 'Hanya penurunan harga beras dinyatakan; harga minyak tidak dijelaskan.'
	},
	{
		id: 'obat-habis',
		arabic:
			'كَتَبَتِ الصَّيْدَلِيَّةُ أَنَّ الدَّوَاءَ الْأَوَّلَ غَيْرُ مُتَاحٍ الْيَوْمَ. وَأَنَّ دَوَاءً آخَرَ مَوْجُودٌ، لَكِنَّ الصَّيْدَلِيَّ يَنْصَحُ بِسُؤَالِ الطَّبِيبِ قَبْلَ تَغْيِيرِ الْعِلَاجِ.',
		prompt: 'Apa yang dianjurkan sebelum mengganti obat?',
		choices: ['Membeli dua obat', 'Menunda membaca pengumuman', 'Berkonsultasi kepada dokter'],
		correct: 2,
		reason: 'Nasihat eksplisit adalah bertanya kepada dokter sebelum mengubah pengobatan.'
	},
	{
		id: 'hemat-air',
		arabic:
			'دَعَا الْمَرْكَزُ السُّكَّانَ إِلَى تَقْلِيلِ اسْتِهْلَاكِ الْمَاءِ. وَذَكَرَ أَنَّ إِصْلَاحَ الصَّنَابِيرِ التَّالِفَةِ يُسَاعِدُ عَلَى ذَلِكَ. وَلَمْ يَذْكُرْ فَرْضَ غَرَامَاتٍ.',
		prompt: 'Pernyataan yang sesuai dokumen adalah ...',
		choices: [
			'Memperbaiki keran bocor adalah salah satu anjuran',
			'Pelanggar pasti dikenai denda',
			'Pemakaian air sudah dilarang'
		],
		correct: 0,
		reason: 'Dokumen memberi ajakan dan contoh tindakan, bukan aturan denda.'
	},
	{
		id: 'grup-belajar',
		arabic:
			'سَيَجْتَمِعُ الطُّلَّابُ لِمُرَاجَعَةِ الدُّرُوسِ فِي الْقَاعَةِ الثَّالِثَةِ. وَلَا يَحْتَاجُونَ إِلَى الْإِنْتَرْنِتِ فِي هَذَا اللِّقَاءِ. وَسَيَحْضُرُ الْمُدَرِّسُ لِلْمُسَاعَدَةِ.',
		prompt: 'Mengapa internet tidak menjadi syarat?',
		choices: [
			'Pertemuan dibatalkan',
			'Kegiatan belajar dapat berlangsung tanpa internet',
			'Guru tidak akan hadir'
		],
		correct: 1,
		reason: 'Pesan menyatakan kegiatan tidak memerlukan internet dan guru tetap akan hadir.'
	},
	{
		id: 'air-pemadaman',
		arabic:
			'سَيَنْقَطِعُ الْمَاءُ مِنَ السَّاعَةِ الثَّامِنَةِ إِلَى الْعَاشِرَةِ صَبَاحَ الْأَرْبِعَاءِ. وَيَطْلُبُ الْمَكْتَبُ مِنَ السُّكَّانِ تَجْهِيزَ مَا يَحْتَاجُونَ إِلَيْهِ قَبْلَ ذَلِكَ.',
		prompt: 'Tindakan apa yang sesuai pengumuman?',
		choices: [
			'Menunggu sampai malam tanpa persiapan',
			'Menganggap air mati sepanjang hari',
			'Menyiapkan kebutuhan air sebelum pukul delapan'
		],
		correct: 2,
		reason: 'Pengumuman meminta persiapan sebelum jeda layanan pukul delapan sampai sepuluh.'
	},
	{
		id: 'bersih-taman',
		arabic:
			'سَيُنَظِّمُ الْحَيُّ عَمَلًا لِتَنْظِيفِ الْحَدِيقَةِ يَوْمَ السَّبْتِ. يَحْتَاجُ الْمُشَارِكُونَ إِلَى قُفَّازَاتٍ، وَسَيُوَفِّرُ الْمُنَظِّمُونَ أَكْيَاسَ الْقُمَامَةِ.',
		prompt: 'Siapa menyediakan kantong sampah?',
		choices: ['Panitia kegiatan', 'Setiap peserta sendiri', 'Para pedagang'],
		correct: 0,
		reason: 'وَسَيُوَفِّرُ الْمُنَظِّمُونَ menyebut panitia sebagai penyedia kantong.'
	},
	{
		id: 'ujian-ruangan',
		arabic:
			'سَيُجْرَى الِاخْتِبَارُ فِي الْقَاعَةِ الرَّابِعَةِ بَدَلًا مِنَ الثَّانِيَةِ. أَمَّا السَّاعَةُ فَلَنْ تَتَغَيَّرَ. يُرْجَى مِنَ الطُّلَّابِ الْحُضُورُ مُبَكِّرِينَ.',
		prompt: 'Apa yang berubah dalam pengaturan ujian?',
		choices: ['Jam ujian', 'Ruang ujian', 'Nama peserta'],
		correct: 1,
		reason: 'بَدَلًا مِنَ menunjukkan perubahan ruangan; waktu tetap.'
	},
	{
		id: 'sumbangan-sepatu',
		arabic:
			'سَيَجْمَعُ النَّادِي أَحْذِيَةً مُسْتَعْمَلَةً بِحَالَةٍ جَيِّدَةٍ. وَيَطْلُبُ مِنَ الْمُتَبَرِّعِينَ تَنْظِيفَهَا قَبْلَ تَسْلِيمِهَا. لَا يَقْبَلُ النَّادِي الْأَحْذِيَةَ التَّالِفَةَ.',
		prompt: 'Sumbangan apa yang memenuhi aturan?',
		choices: [
			'Sepatu rusak dan kotor',
			'Sepatu baru tanpa syarat',
			'Sepatu bekas layak dan bersih'
		],
		correct: 2,
		reason: 'Syaratnya masih bagus dan dibersihkan, bukan sepatu yang rusak.'
	},
	{
		id: 'pilih-tim',
		arabic:
			'سَيَخْتَارُ الْمُدَرِّبُ أَعْضَاءَ الْفَرِيقِ بَعْدَ تَمْرِينِ الْإِثْنَيْنِ. وَسَيُعْلِنُ الْأَسْمَاءَ يَوْمَ الثُّلَاثَاءِ. لَمْ يَذْكُرْ أَسْمَاءَ الْمُخْتَارِينَ حَتَّى الْآنَ.',
		prompt: 'Pernyataan yang dapat dibuktikan sekarang?',
		choices: ['Hasil pemilihan belum diumumkan', 'Ali sudah dipilih', 'Tim dibatalkan'],
		correct: 0,
		reason: 'Nama belum dipublikasikan sebelum latihan dan pengumuman Selasa.'
	},
	{
		id: 'sekolah-museum',
		arabic:
			'أَعْلَنَ الْمَتْحَفُ عَنْ تَذَاكِرَ مَجَّانِيَّةٍ لِطُلَّابِ الْمَدَارِسِ يَوْمَ الْخَمِيسِ. وَيَجِبُ عَلَى الْمُعَلِّمِ تَسْجِيلُ مَجْمُوعَتِهِ قَبْلَ الزِّيَارَةِ.',
		prompt: 'Untuk siapa tiket gratis yang dinyatakan?',
		choices: [
			'Semua pengunjung sepanjang pekan',
			'Siswa sekolah pada Kamis sesuai syarat',
			'Hanya pegawai museum'
		],
		correct: 1,
		reason: 'Tawaran dibatasi pada siswa sekolah untuk kunjungan Kamis dengan pendaftaran kelompok.'
	},
	{
		id: 'paket-terlambat',
		arabic:
			'قَالَ الْمَوْظَّفُ إِنَّ الطَّرْدَ لَمْ يَصِلْ إِلَى الْمَكْتَبِ بَعْدُ. وَسَيَتَّصِلُ بِالزَّبُونِ عِنْدَ وُصُولِهِ. وَمَا زَالَ الْمَوْعِدُ الدَّقِيقُ غَيْرَ مَعْرُوفٍ.',
		prompt: 'Apa yang belum dapat dipastikan?',
		choices: ['Paket belum tiba', 'Petugas akan menelepon', 'Waktu pasti kedatangan paket'],
		correct: 2,
		reason: 'Waktu kedatangan disebut belum diketahui; janji menelepon bukan tanggal pasti.'
	},
	{
		id: 'klub-bahasa',
		arabic:
			'يُرِيدُ نَادِي اللُّغَةِ فَتْحَ دَرْسٍ جَدِيدٍ. وَيَطْلُبُ مِنَ الرَّاغِبِينَ إِرْسَالَ أَسْمَائِهِمْ حَتَّى يَعْرِفَ الْعَدَدَ. وَسَيُعْلِنُ الْجَدْوَلَ بَعْدَ ذَلِكَ.',
		prompt: 'Mengapa jadwal belum disebut?',
		choices: [
			'Klub sedang mengumpulkan jumlah calon peserta',
			'Pelajaran telah selesai',
			'Tidak ada pengajar'
		],
		correct: 0,
		reason: 'Jadwal direncanakan sesudah jumlah peminat diketahui.'
	},
	{
		id: 'klinik-kedatangan',
		arabic:
			'يَحْضُرُ الْمَرْضَى بِمَوَاعِيدَ إِلَى الْعِيَادَةِ. وَإِذَا تَأَخَّرَ أَحَدُهُمْ فَعَلَيْهِ أَنْ يُخْبِرَ الْمَوْظَّفَ. وَلَا يَضْمَنُ الْإِعْلَانُ دُخُولَهُ فِي الْوَقْتِ الْأَصْلِيِّ.',
		prompt: 'Apa yang harus dilakukan pasien yang terlambat?',
		choices: [
			'Langsung masuk tanpa pemberitahuan',
			'Memberitahu petugas',
			'Membatalkan semua janji pasien lain'
		],
		correct: 1,
		reason: 'Pasien diminta memberi tahu petugas; waktu asli tidak dijamin.'
	}
];
