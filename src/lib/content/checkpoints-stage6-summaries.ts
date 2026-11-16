import type { DocumentItem } from './checkpoints-stage6.js';

/** CB-24: 20 original micro-documents requiring summarisation and referent tracking. */
export const summaryItems: readonly DocumentItem[] = [
	{
		id: 'kelas-pindah',
		arabic: 'أَرَادَ الْمُدَرِّسُ اسْتِخْدَامَ الْقَاعَةِ الْأُولَى. لَكِنَّهَا كَانَتْ مُسْتَخْدَمَةً لِاجْتِمَاعٍ. فَنَقَلَ الدَّرْسَ إِلَى الْقَاعَةِ الثَّانِيَةِ وَأَخْبَرَ الطُّلَّابَ.',
		prompt: 'Ringkasan lengkap yang tepat?',
		choices: ['Kelas dipindahkan ke aula kedua karena aula pertama terpakai', 'Guru membatalkan pelajaran dan pulang', 'Siswa menunggu tanpa informasi'],
		correct: 0,
		reason: 'Sebab (aula terpakai), tindakan (memindahkan), serta pemberitahuan ada di ketiga kalimat.'
	},
	{
		id: 'sampah-kebun',
		arabic: 'وَجَدَ الطُّلَّابُ قُمَامَةً فِي حَدِيقَةِ الْمَدْرَسَةِ. جَمَعُوهَا فِي أَكْيَاسٍ وَوَضَعُوا صَنَادِيقَ لِلنُّفَايَاتِ. وَفِي الْأُسْبُوعِ التَّالِي قَلَّتِ الْقُمَامَةُ.',
		prompt: 'Apa hubungan bagian terakhir dengan dua bagian awal?',
		choices: ['Alasan sampah muncul', 'Hasil setelah pembersihan dan penyediaan tempat sampah', 'Rencana membuka toko'],
		correct: 1,
		reason: 'Kalimat akhir menyatakan hasil, setelah masalah dan tindakan digambarkan.'
	},
	{
		id: 'janji-klinik',
		arabic: 'يَسْتَطِيعُ الْمَرْضَى طَلَبَ مَوْعِدٍ بِالْهَاتِفِ. وَتُرْسِلُ الْعِيَادَةُ رِسَالَةَ تَأْكِيدٍ لِلْمَوْعِدِ. وَيَجِبُ عَلَى الْمَرِيضِ إِخْبَارُهَا إِذَا لَمْ يَسْتَطِعِ الْحُضُورَ.',
		prompt: 'Apa yang diminta saat pasien tidak bisa hadir?',
		choices: ['Mengabaikan janji', 'Datang ke rumah dokter', 'Memberi tahu klinik'],
		correct: 2,
		reason: 'إِخْبَارُهَا merujuk pada klinik yang harus diberi kabar jika berhalangan.'
	},
	{
		id: 'rak-buku-anak',
		arabic: 'وَضَعَتِ الْمَكْتَبَةُ كُتُبَ الْأَطْفَالِ عَلَى رَفٍّ قَرِيبٍ مِنَ الْبَابِ. فَأَصْبَحَ الصِّغَارُ يَجِدُونَهَا بِسُهُولَةٍ. وَلَكِنَّ الْمَكْتَبَةَ لَمْ تُغَيِّرْ قَوَاعِدَ الْإِعَارَةِ.',
		prompt: 'Ringkasan mana yang tidak berlebihan?',
		choices: ['Lokasi buku anak dipermudah, aturan peminjaman tetap', 'Peminjaman buku sekarang bebas tanpa aturan', 'Anak-anak harus membeli buku'],
		correct: 0,
		reason: 'Kalimat kedua menunjukkan kemudahan menemukan buku; akhir membatasi bahwa aturan pinjam tidak berubah.'
	},
	{
		id: 'pembagian-baju',
		arabic: 'جَمَعَ الْمُتَطَوِّعُونَ مَلَابِسَ نَظِيفَةً. وَفَرَزُوهَا بِحَسَبِ الْحَجْمِ ثُمَّ وَضَعُوهَا فِي صَنَادِيقَ. وَسَيُوَزِّعُونَهَا عَلَى الْأُسَرِ يَوْمَ الْجُمُعَةِ.',
		prompt: 'Urutan yang benar?',
		choices: ['Pembagian, pemilahan, pengumpulan', 'Pengumpulan, pemilahan, pembagian Jumat', 'Pengumpulan, pembagian Jumat, pemilahan'],
		correct: 1,
		reason: 'Rangkaian kegiatan dibuat eksplisit: kumpulkan, pilah, lalu distribusi pada Jumat.'
	},
	{
		id: 'kereta-lebih-awal',
		arabic: 'أَعْلَنَتِ الْمَحَطَّةُ أَنَّ الْقِطَارَ سَيَخْرُجُ نِصْفَ سَاعَةٍ أَبْكَرَ غَدًا. وَسَيَبْقَى الرَّصِيفُ نَفْسُهُ. وَطُلِبَ مِنَ الرُّكَّابِ الْحُضُورُ مُبَكِّرِينَ.',
		prompt: 'Apa pasangan informasi perubahan dan yang tetap?',
		choices: ['Kereta pindah peron, waktu tetap', 'Peron dan waktu sama', 'Keberangkatan lebih awal, peron tetap'],
		correct: 2,
		reason: 'Waktu berubah setengah jam lebih awal, tetapi tempat keberangkatan tetap.'
	},
	{
		id: 'tempat-penampungan',
		arabic: 'تَسَرَّبَ الْمَاءُ إِلَى غُرْفَةِ النَّوْمِ فِي الْمَرْكَزِ. فَنَقَلَ الْمُوَظَّفُونَ الْأَسِرَّةَ إِلَى قَاعَةٍ جَافَّةٍ. وَبَدَأَ فَرِيقٌ آخَرُ إِصْلَاحَ السَّقْفِ.',
		prompt: 'Apa dua tindakan yang dilakukan untuk mengatasi masalah?',
		choices: ['Memindahkan tempat tidur dan mulai memperbaiki atap', 'Membeli tempat tidur lalu pulang', 'Menutup seluruh pusat secara permanen'],
		correct: 0,
		reason: 'Dua respons adalah pemindahan tempat tidur dan dimulainya perbaikan atap.'
	},
	{
		id: 'tanda-bukti',
		arabic: 'سَجَّلَ نَادِي الْقِرَاءَةِ أَسْمَاءَ الْمُشَارِكِينَ. أَعْطَى كُلَّ مُشَارِكٍ وَرَقَةَ تَأْكِيدٍ. وَيَجِبُ إِحْضَارُ هَذِهِ الْوَرَقَةِ عِنْدَ الدُّخُولِ.',
		prompt: 'هَذِهِ الْوَرَقَةِ mengacu pada apa?',
		choices: ['Daftar nama klub', 'Lembar konfirmasi yang diberikan kepada peserta', 'Buku yang akan dibaca'],
		correct: 1,
		reason: 'Kata tunjuk merujuk lembar konfirmasi dari kalimat kedua, bukan daftar nama.'
	},
	{
		id: 'buka-pelatihan',
		arabic: 'أَعْلَنَ الْمَرْكَزُ عَنْ تَدْرِيبٍ عَلَى الْكِتَابَةِ. يَبْدَأُ التَّدْرِيبُ يَوْمَ الْخَمِيسِ، وَيَجِبُ التَّسْجِيلُ قَبْلَ ذَلِكَ. وَلَا يَذْكُرُ الْإِعْلَانُ عَدَدَ الْمَقَاعِدِ.',
		prompt: 'Apa batas kesimpulan dari dokumen?',
		choices: ['Pelatihan dibatalkan', 'Pendaftaran dibuka selama setahun', 'Jumlah kursi belum disebutkan'],
		correct: 2,
		reason: 'Waktu mulai dan kewajiban mendaftar ada, tetapi kapasitas tidak dinyatakan.'
	},
	{
		id: 'kegiatan-memasak',
		arabic: 'جَمَعَتِ الْمُدَرِّسَةُ الطُّلَّابَ فِي الْمَطْبَخِ. شَرَحَتْ لَهُمْ كَيْفَ يَغْسِلُونَ الْخُضْرَوَاتِ قَبْلَ الطَّبْخِ. ثُمَّ صَنَعُوا وَجْبَةً بَسِيطَةً مَعًا.',
		prompt: 'Apa gagasan utama dokumen?',
		choices: ['Kegiatan praktik memasak setelah penjelasan persiapan', 'Para siswa menutup dapur selamanya', 'Pelajaran hanya tentang mencuci tangan'],
		correct: 0,
		reason: 'Peristiwa menyeluruh adalah kegiatan belajar memasak dengan penjelasan dan praktik bersama.'
	},
	{
		id: 'alat-air',
		arabic: 'أَرَادَ الْمَرْكَزُ تَقْلِيلَ اسْتِهْلَاكِ الْمَاءِ. فَوَضَعَ أَدَوَاتٍ جَدِيدَةً عَلَى الصَّنَابِيرِ. وَبَعْدَ شَهْرٍ لَاحَظَ الْمُوَظَّفُونَ أَنَّ الِاسْتِهْلَاكَ قَلَّ.',
		prompt: 'Kalimat ketiga berfungsi sebagai ...',
		choices: ['Masalah awal', 'Hasil sesudah perubahan', 'Perintah yang belum dilakukan'],
		correct: 1,
		reason: 'Pengamatan sesudah satu bulan adalah hasil yang dikaitkan dengan pemasangan alat.'
	},
	{
		id: 'listrik-padam',
		arabic: 'انْقَطَعَتِ الْكَهْرَبَاءُ عَنِ الْمَكْتَبَةِ فِي الصَّبَاحِ. فَأَخَذَ الْمُوَظَّفُونَ الطُّلَّابَ إِلَى قَاعَةٍ فِيهَا نَوَافِذُ كَبِيرَةٌ. وَاسْتَمَرَّتِ الْقِرَاءَةُ هُنَاكَ.',
		prompt: 'Apa yang memungkinkan kegiatan tetap berlangsung?',
		choices: ['Penerangan listrik yang baru', 'Perpustakaan ditutup selama sebulan', 'Pindah ke ruangan berjendela besar'],
		correct: 2,
		reason: 'Ketika listrik padam, lokasi kegiatan berpindah ke ruangan dengan cahaya dari jendela.'
	},
	{
		id: 'foto-pameran',
		arabic: 'طَلَبَ النَّادِي صُوَرًا عَنْ حَيَاةِ الْمَدِينَةِ. وَيَجِبُ أَنْ تَصِلَ الصُّوَرُ قَبْلَ نِهَايَةِ الشَّهْرِ. بَعْدَ ذَلِكَ سَيَخْتَارُ الْمُنَظِّمُونَ بَعْضَهَا لِلْمَعْرِضِ.',
		prompt: 'Apakah setiap foto yang dikirim pasti dipamerkan?',
		choices: ['Tidak, hanya sebagian akan dipilih', 'Ya, semua dipamerkan', 'Tidak seorang pun boleh mengirim foto'],
		correct: 0,
		reason: 'بَعْضَهَا menyatakan hanya sebagian foto akan dipilih; mengirim belum menjamin dipamerkan.'
	},
	{
		id: 'peta-halte',
		arabic: 'كَانَ الزُّوَّارُ يَخْطِئُونَ فِي اخْتِيَارِ مَوْقِفِ الْحَافِلَةِ. فَرَسَمَ الْمُوَظَّفُونَ خَرِيطَةً وَوَضَعُوهَا فِي الْمَدْخَلِ. وَصَارَتِ الْمَسَارَاتُ أَوْضَحَ لِلزُّوَّارِ.',
		prompt: 'Apa yang dirujuk oleh ـهَا dalam وَضَعُوهَا?',
		choices: ['Halte bus', 'Peta yang dibuat', 'Para pengunjung'],
		correct: 1,
		reason: 'Pronomina objek ـهَا merujuk ke خَرِيطَةً, yang dipasang di pintu masuk.'
	},
	{
		id: 'dua-kelompok',
		arabic: 'كَانَ الصَّفُّ كَبِيرًا فِي دَرْسِ اللُّغَةِ. فَقَسَمَهُ الْمُدَرِّسُ إِلَى مَجْمُوعَتَيْنِ. وَجَعَلَ لِكُلِّ مَجْمُوعَةٍ وَقْتًا لِلتَّحَدُّثِ.',
		prompt: 'Apa masalah dan solusi utamanya?',
		choices: ['Tidak ada murid, guru pulang', 'Kelas dibatalkan, waktu bicara dihapus', 'Kelas besar dibagi dua agar masing-masing bisa berbicara'],
		correct: 2,
		reason: 'Pembagian menjadi dua kelompok menjawab kondisi kelas yang besar dan menyediakan waktu bicara.'
	},
	{
		id: 'pameran-bergilir',
		arabic: 'كَانَ عَدَدُ الزُّوَّارِ كَبِيرًا فِي الْمَتْحَفِ. فَسَمَحَ الْمُنَظِّمُونَ لِكُلِّ مَجْمُوعَةٍ بِالدُّخُولِ لِمُدَّةٍ مُحَدَّدَةٍ. وَانْتَظَرَتِ الْمَجْمُوعَاتُ الْأُخْرَى دَوْرَهَا.',
		prompt: 'Gagasan utama yang tepat?',
		choices: ['Museum mengatur kunjungan bergiliran karena pengunjung banyak', 'Museum menolak semua pengunjung', 'Museum mengganti semua koleksi'],
		correct: 0,
		reason: 'Kepadatan pengunjung ditangani dengan sistem giliran dan batas waktu masuk.'
	},
	{
		id: 'pohon-taman',
		arabic: 'أَرَادَ أَهْلُ الْحَيِّ زِيَادَةَ الظِّلِّ فِي الْحَدِيقَةِ. فَزَرَعُوا أَشْجَارًا صَغِيرَةً وَوَضَعُوا لَوْحَةً لِحِمَايَتِهَا. وَسَيَسْقُونَهَا كُلَّ أُسْبُوعٍ.',
		prompt: 'Apa yang masih berupa rencana, bukan hasil?',
		choices: ['Pohon sudah memberikan naungan luas', 'Warga akan menyirami pohon tiap minggu', 'Pohon telah dipindahkan'],
		correct: 1,
		reason: 'سَيَسْقُونَهَا menjelaskan kegiatan penyiraman yang akan dilakukan, bukan hasil yang sudah terjadi.'
	},
	{
		id: 'daftar-olahraga',
		arabic: 'أَعْلَنَ النَّادِي عَنْ مَشْيٍ جَمَاعِيٍّ صَبَاحَ السَّبْتِ. وَيَطْلُبُ مِنَ الْمُشَارِكِينَ إِحْضَارَ الْمَاءِ وَالْحِذَاءِ الْمُنَاسِبِ. وَسَيَكُونُ لِقَاءُ الْجَمِيعِ عِنْدَ الْبَوَّابَةِ الْكَبِيرَةِ.',
		prompt: 'Tujuan dokumen adalah ...',
		choices: ['Mengisahkan perlombaan kemarin', 'Menjelaskan cara membuat sepatu', 'Mengumumkan jalan bersama beserta persiapan dan titik temu'],
		correct: 2,
		reason: 'Pengumuman berisi acara, barang yang dibawa, dan lokasi berkumpul.'
	},
	{
		id: 'layanan-darah',
		arabic: 'يُنَظِّمُ الْمُسْتَشْفَى يَوْمًا لِلتَّبَرُّعِ بِالدَّمِ. يَجِبُ عَلَى الرَّاغِبِينَ سُؤَالُ الْفَرِيقِ الطِّبِّيِّ عَنْ الشُّرُوطِ قَبْلَ التَّسْجِيلِ. وَلَا يَعِدُ الْإِعْلَانُ بِقَبُولِ جَمِيعِ الْمُتَقَدِّمِينَ.',
		prompt: 'Pernyataan yang sesuai?',
		choices: ['Pendaftaran belum berarti pasti diterima sebagai pendonor', 'Semua orang diterima tanpa pemeriksaan', 'Tidak ada petugas medis di lokasi'],
		correct: 0,
		reason: 'Teks meminta konsultasi syarat dan tidak menjanjikan semua pendaftar diterima.'
	},
	{
		id: 'pameran-ilmu',
		arabic: 'أَعَدَّ الطُّلَّابُ تَجَارِبَ بَسِيطَةً لِلْمَعْرِضِ الْعِلْمِيِّ. شَرَحَ كُلُّ فَرِيقٍ طَرِيقَةَ عَمَلِهِ لِلزُّوَّارِ. وَبَعْدَ الْمَعْرِضِ نَاقَشُوا مَا تَعَلَّمُوهُ.',
		prompt: 'Bagaimana urutan kegiatan?',
		choices: ['Diskusi, pameran, persiapan', 'Persiapan, penjelasan kepada pengunjung, refleksi', 'Refleksi sebelum menyiapkan eksperimen'],
		correct: 1,
		reason: 'Tiga kalimat berurutan: menyiapkan eksperimen, menjelaskannya, lalu mendiskusikan pembelajaran.'
	}
];
