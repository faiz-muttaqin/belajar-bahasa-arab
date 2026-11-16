import type { ReadingItem } from './checkpoints-stage5.js';

/** CB-24: 20 original multi-sentence micro-documents with varying reasoning tasks. */
export const documentItems: readonly ReadingItem[] = [
	{
		id: 'klinik-jam',
		arabic: 'كَانَتِ الْعِيَادَةُ تُغْلِقُ قَبْلَ وَصُولِ بَعْضِ الْمَرْضَى. لِذَلِكَ أَضَافَتْ سَاعَةً لِلْعَمَلِ يَوْمَ الْإِثْنَيْنِ. وَبَعْدَ أُسْبُوعَيْنِ اسْتَفَادَ مَرْضَى أَكْثَرُ مِنَ الْخِدْمَةِ.',
		prompt: 'Bagian mana menyatakan tindakan untuk mengatasi masalah?',
		choices: ['Jam layanan ditambah pada Senin', 'Sebagian pasien datang terlambat', 'Pasien lebih banyak terbantu'],
		correct: 0,
		reason: 'Kalimat kedua adalah tindakan; kalimat pertama masalah, ketiga hasil.'
	},
	{
		id: 'papan-bus',
		arabic: 'كَانَ الرُّكَّابُ لَا يَعْرِفُونَ مَكَانَ الْحَافِلَةِ الْجَدِيدَةِ. وَضَعَتِ الشَّرِكَةُ خَرِيطَةً عِنْدَ الْمَحَطَّةِ. بَعْدَ ذَلِكَ صَارَ الرُّكَّابُ يَجِدُونَ الْمَوْقِفَ بِسُهُولَةٍ.',
		prompt: 'Apa fungsi kalimat terakhir?',
		choices: ['Latar tempat', 'Hasil pemasangan peta', 'Larangan naik bus'],
		correct: 1,
		reason: 'Kalimat terakhir menunjukkan dampak penambahan peta setelah masalah dikenalkan.'
	},
	{
		id: 'lapangan-hujan',
		arabic: 'كَانَ الْفَرِيقُ يُرِيدُ اللَّعِبَ فِي الْمَلْعَبِ الْكَبِيرِ. وَلَكِنَّ الْمَطَرَ مَنَعَ الْمُبَارَاةَ هُنَاكَ. فَنُقِلَتِ الْمُبَارَاةُ إِلَى الصَّالَةِ الدَّاخِلِيَّةِ.',
		prompt: 'Ringkasan yang paling tepat?',
		choices: ['Pertandingan dibatalkan selamanya', 'Tim membeli lapangan baru', 'Pertandingan dipindahkan ke ruangan karena hujan'],
		correct: 2,
		reason: 'Teks tidak menyebut pembatalan permanen; masalah hujan diikuti pemindahan lokasi.'
	},
	{
		id: 'daur-ulang',
		arabic: 'كَثُرَ الْوَرَقُ الْمُسْتَعْمَلُ فِي الْمَدْرَسَةِ. جَمَعَهُ الطُّلَّابُ فِي صَنَادِيقَ خَاصَّةٍ. ثُمَّ أَرْسَلُوهُ إِلَى مَرْكَزِ إِعَادَةِ التَّدْوِيرِ.',
		prompt: 'Akhiran ـهُ pada جَمَعَهُ merujuk kepada apa?',
		choices: ['Kertas bekas', 'Para siswa', 'Sekolah'],
		correct: 0,
		reason: 'Objek yang dikumpulkan pada kalimat kedua adalah الْوَرَقُ الْمُسْتَعْمَلُ.'
	},
	{
		id: 'lampu-kelas',
		arabic: 'لَمْ يَعْمَلِ الْمِصْبَاحُ فِي الْفَصْلِ صَبَاحًا. أَخْبَرَ الطُّلَّابُ الْمُوَظَّفَ بِالْمُشْكِلَةِ. وَجَاءَ الْمُوَظَّفُ لِإِصْلَاحِ الْمِصْبَاحِ بَعْدَ الظُّهْرِ.',
		prompt: 'Apa yang belum dikonfirmasi oleh teks?',
		choices: ['Petugas diberi tahu', 'Lampu sudah berhasil diperbaiki', 'Lampu bermasalah pagi hari'],
		correct: 1,
		reason: 'Kalimat akhir menyatakan petugas datang untuk memperbaiki, bukan memastikan selesai.'
	},
	{
		id: 'pinjam-buku',
		arabic: 'طَلَبَ سَامِي كِتَابًا مِنَ الْمَكْتَبَةِ. لَمْ يَكُنِ الْكِتَابُ مُتَاحًا فِي ذَلِكَ الْيَوْمِ. فَسَجَّلَ الْمُوَظَّفُ اسْمَ سَامِي لِيُخْبِرَهُ عِنْدَ وُصُولِ الْكِتَابِ.',
		prompt: 'Bagaimana urutan peristiwanya?',
		choices: ['Buku tiba lalu Sami datang', 'Sami membayar lalu pulang', 'Permintaan, buku belum tersedia, pencatatan nama'],
		correct: 2,
		reason: 'Tiga kalimat membentuk urutan permintaan, kendala ketersediaan, dan tindakan pencatatan.'
	},
	{
		id: 'pipa-air',
		arabic: 'انْقَطَعَ الْمَاءُ عَنْ بَعْضِ الْبُيُوتِ صَبَاحًا. أَرْسَلَتِ الْبَلَدِيَّةُ فَرِيقًا لِإِصْلَاحِ الْأَنْبُوبِ. وَعَادَ الْمَاءُ إِلَى الْبُيُوتِ مَسَاءً.',
		prompt: 'Apa hasil yang dinyatakan?',
		choices: ['Air kembali pada malam hari', 'Pipa baru dibeli warga', 'Tim gagal mencapai lokasi'],
		correct: 0,
		reason: 'Kalimat ketiga mengabarkan kembalinya air pada malam hari.'
	},
	{
		id: 'taman-aman',
		arabic: 'كَانَ الْأَطْفَالُ يَلْعَبُونَ قُرْبَ الطَّرِيقِ. فَطَلَبَ الْأَهَالِي مِنَ الْبَلَدِيَّةِ إِصْلَاحَ سُورِ الْحَدِيقَةِ. وَبَعْدَ الْإِصْلَاحِ أَصْبَحَ مَكَانُ اللَّعِبِ أَكْثَرَ أَمَانًا.',
		prompt: 'Apa alasan tindakan pada kalimat kedua?',
		choices: ['Harga tiket taman naik', 'Anak-anak bermain terlalu dekat jalan', 'Taman tutup pada pagi hari'],
		correct: 1,
		reason: 'Perbaikan pagar diminta agar area bermain dekat jalan menjadi lebih aman.'
	},
	{
		id: 'pameran-foto',
		arabic: 'أَعْلَنَ النَّادِي عَنْ مَعْرِضٍ لِلصُّوَرِ يَوْمَ الْجُمُعَةِ. يَسْتَطِيعُ الْمُشَارِكُونَ تَسْلِيمَ صُوَرِهِمْ قَبْلَ الْخَمِيسِ. وَلَنْ تُقْبَلَ الصُّوَرُ بَعْدَ ذَلِكَ.',
		prompt: 'Apa tujuan utama dokumen?',
		choices: ['Mengisahkan pameran lama', 'Menjelaskan cara membeli kamera', 'Mengumumkan pameran dan batas pengiriman foto'],
		correct: 2,
		reason: 'Dokumen berisi acara, tenggat, dan aturan penyerahan, bukan cerita masa lalu.'
	},
	{
		id: 'donasi-buku',
		arabic: 'أَرَادَ الْمَرْكَزُ جَمْعَ كُتُبٍ لِلْمَدْرَسَةِ. فَوَضَعَ قَائِمَةً بِالْكُتُبِ الْمَطْلُوبَةِ. وَطَلَبَ مِنَ النَّاسِ إِحْضَارَهَا يَوْمَ السَّبْتِ.',
		prompt: 'Apa yang dirujuk oleh ـهَا dalam إِحْضَارَهَا?',
		choices: ['Buku-buku yang diminta', 'Daftar nama warga', 'Bangunan sekolah'],
		correct: 0,
		reason: 'Rujukan ـهَا adalah الْكُتُبِ الْمَطْلُوبَةِ dalam kalimat sebelumnya.'
	},
	{
		id: 'stasiun-peron',
		arabic: 'أَعْلَنَتِ الْمَحَطَّةُ أَنَّ الْقِطَارَ سَيَنْطَلِقُ مِنَ الرَّصِيفِ الثَّانِي بَدَلًا مِنَ الْأَوَّلِ. لَمْ يَتَغَيَّرْ وَقْتُ الْمُغَادَرَةِ. وَطَلَبَ الْمُوَظَّفُونَ مِنَ الرُّكَّابِ اتِّبَاعَ اللَّافِتَاتِ.',
		prompt: 'Apa yang berubah dan yang tetap?',
		choices: ['Waktu berubah, peron tetap', 'Peron berubah, waktu berangkat tetap', 'Keduanya berubah'],
		correct: 1,
		reason: 'بَدَلًا مِنَ menunjukkan perubahan peron, sedangkan لَمْ يَتَغَيَّرْ menegaskan waktu tetap.'
	},
	{
		id: 'pendaftaran-klub',
		arabic: 'سَيَبْدَأُ نَادِي اللُّغَةِ الْعَرَبِيَّةِ يَوْمَ الْأَحَدِ. يَجِبُ عَلَى الطُّلَّابِ تَسْجِيلُ أَسْمَائِهِمْ قَبْلَ يَوْمِ الْجُمُعَةِ. وَسَيَتَلَقَّى الْمُسَجَّلُونَ رِسَالَةَ تَأْكِيدٍ.',
		prompt: 'Siapa yang dijanjikan menerima pesan konfirmasi?',
		choices: ['Semua warga', 'Hanya para guru', 'Siswa yang sudah mendaftar'],
		correct: 2,
		reason: 'الْمُسَجَّلُونَ mengacu pada mereka yang telah melakukan pendaftaran.'
	},
	{
		id: 'museum-jumlah',
		arabic: 'تَسْمَحُ الْقَاعَةُ بِدُخُولِ ثَلَاثِينَ زَائِرًا فَقَطْ. وَإِذَا امْتَلَأَتِ الْقَاعَةُ يَنْتَظِرُ الْبَاقُونَ خَارِجَهَا. ثُمَّ يَدْخُلُونَ عِنْدَمَا يَخْرُجُ زُوَّارٌ آخَرُونَ.',
		prompt: 'Simpulan mana yang didukung dokumen?',
		choices: ['Masuk bergiliran ketika ruangan penuh', 'Semua pengunjung harus pulang', 'Jumlah pengunjung tidak dibatasi'],
		correct: 0,
		reason: 'Batas tiga puluh orang membuat sisanya menunggu giliran masuk.'
	},
	{
		id: 'jemput-anak',
		arabic: 'تَأَخَّرَتِ الْحَافِلَةُ الْمَدْرَسِيَّةُ الْيَوْمَ. أَرْسَلَتِ الْمَدْرَسَةُ رِسَالَةً إِلَى الْأُسَرِ. وَذَكَرَتْ فِيهَا أَنَّ الْحَافِلَةَ سَتَصِلُ بَعْدَ نِصْفِ سَاعَةٍ.',
		prompt: 'Apa isi utama pesan sekolah?',
		choices: ['Pelajaran dipindahkan', 'Bus sekolah terlambat dan perkiraan tiba diberikan', 'Bus baru dibeli'],
		correct: 1,
		reason: 'Pesan tersebut memberi informasi penundaan serta perkiraan waktu kedatangan.'
	},
	{
		id: 'internet-lambat',
		arabic: 'بَطُؤَ الْإِنْتَرْنِتُ فِي مَعْمَلِ الْحَاسُوبِ. أَوْقَفَ الْمُدَرِّسُ النَّشَاطَ الْإِلِكْتُرُونِيَّ وَوَزَّعَ أَوْرَاقًا لِلْعَمَلِ. وَأَكْمَلَ الطُّلَّابُ الدَّرْسَ دُونَ اتِّصَالٍ.',
		prompt: 'Apa penyelesaian masalah yang dipilih?',
		choices: ['Menunda semua pelajaran seminggu', 'Mengganti semua komputer', 'Melanjutkan pelajaran di kertas tanpa internet'],
		correct: 2,
		reason: 'Kegiatan dialihkan dari daring ke kertas agar pelajaran tetap berlangsung.'
	},
	{
		id: 'masjid-jalur',
		arabic: 'كَانَ بَابُ الْمَسْجِدِ الْجَانِبِيُّ ضَيِّقًا لِبَعْضِ الزُّوَّارِ. فَوُسِّعَ الْمَمَرُّ وَوُضِعَ مَقْعَدٌ لِلرَّاحَةِ. وَصَارَ الدُّخُولُ أَسْهَلَ لِمَنْ يَحْتَاجُ إِلَى الْمُسَاعَدَةِ.',
		prompt: 'Apa hubungan tiga kalimat?',
		choices: ['Kesulitan akses, perbaikan jalur, akses lebih mudah', 'Larangan, hukuman, pembatalan', 'Sejarah, tokoh, perjalanan'],
		correct: 0,
		reason: 'Susunannya adalah masalah fasilitas lalu perubahan dan manfaatnya bagi pengunjung.'
	},
	{
		id: 'antrian-apotek',
		arabic: 'ازْدَحَمَتِ الصَّيْدَلِيَّةُ فِي الصَّبَاحِ. فَخَصَّصَتْ مَكَانًا مُنْفَصِلًا لِاسْتِلَامِ الْأَدْوِيَةِ الْجَاهِزَةِ. وَقَلَّ وَقْتُ انْتِظَارِ بَعْضِ الزَّبَائِنِ.',
		prompt: 'Apa yang tidak boleh digeneralisasi dari bacaan?',
		choices: ['Ada tempat pengambilan obat', 'Semua pelanggan tidak lagi menunggu', 'Waktu tunggu sebagian pelanggan menurun'],
		correct: 1,
		reason: 'Kata بَعْضِ membatasi klaim pada sebagian pelanggan, bukan semuanya.'
	},
	{
		id: 'perbaikan-lapangan',
		arabic: 'وُجِدَتْ حُفَرٌ فِي الْمَلْعَبِ. فَأَغْلَقَ الْمَسْؤُولُونَ الْمَكَانَ لِلْإِصْلَاحِ. وَسَيُعْلَنُ مَوْعِدُ فَتْحِهِ بَعْدَ انْتِهَاءِ الْعَمَلِ.',
		prompt: 'Apakah tanggal pembukaan kembali sudah diketahui?',
		choices: ['Ya, besok', 'Ya, hari ini', 'Belum disebutkan'],
		correct: 2,
		reason: 'Teks hanya menjanjikan pengumuman sesudah pekerjaan selesai, tanpa tanggal tertentu.'
	},
	{
		id: 'komputer-bersama',
		arabic: 'كَانَ فِي الْمَرْكَزِ حَاسُوبٌ وَاحِدٌ يَسْتَعْمِلُهُ الْجَمِيعُ. وَضَعَ الْمُوَظَّفُ جَدْوَلًا لِوَقْتِ اسْتِخْدَامِهِ. فَأَصْبَحَ كُلُّ مُشَارِكٍ يَعْرِفُ دَوْرَهُ.',
		prompt: 'Apa fungsi jadwal yang ditambahkan?',
		choices: ['Mengatur giliran pemakaian komputer', 'Mengurangi jumlah komputer menjadi nol', 'Membatasi pelajaran ke malam'],
		correct: 0,
		reason: 'Jadwal dibuat agar pemakai mengetahui giliran penggunaan perangkat bersama.'
	},
	{
		id: 'botol-hilang',
		arabic: 'نَسِيَتْ لَيْلَى زُجَاجَةَ مَاءٍ فِي الْقَاعَةِ. وَجَدَهَا الْمُوَظَّفُ وَوَضَعَهَا فِي مَكْتَبِ الْمَفْقُودَاتِ. وَعَادَتْ لَيْلَى بَعْدَ الدَّرْسِ فَأَخَذَتْهَا.',
		prompt: 'Ringkasan yang benar?',
		choices: ['Botol dibuang setelah pelajaran', 'Botol Layla yang tertinggal berhasil dikembalikan', 'Botol milik petugas hilang'],
		correct: 1,
		reason: 'Peristiwa menyeluruh ialah lupa botol, ditemukan petugas, lalu diambil pemiliknya.'
	}
];
