import type { ReadingItem } from './checkpoints-stage5.js';

/** CB-22: independently written MSA links; each item tests a distinct contextual inference. */
export const relationItems: readonly ReadingItem[] = [
	{
		id: 'dingin-jendela',
		arabic: 'أَغْلَقَ سَامِي النَّافِذَةَ لِأَنَّ الرِّيحَ قَوِيَّةٌ.',
		prompt: 'Mengapa Sami menutup jendela?',
		choices: ['Angin bertiup kencang', 'Jendela sudah rusak', 'Ia hendak keluar'],
		correct: 0,
		reason: 'لِأَنَّ memperkenalkan sebab: angin kencang.'
	},
	{
		id: 'kertas-habis',
		arabic: 'نَفِدَ الْوَرَقُ، لِذَلِكَ أَجَّلَ الْمُدَرِّسُ النَّشَاطَ.',
		prompt: 'Apa akibat kertas habis?',
		choices: ['Siswa pulang', 'Guru menunda kegiatan', 'Guru membeli pena'],
		correct: 1,
		reason: 'لِذَلِكَ menunjukkan akibat: kegiatan ditunda.'
	},
	{
		id: 'lina-aula',
		arabic: 'وَصَلَتْ لِينَا مُبَكِّرَةً، لَكِنَّ الْقَاعَةَ كَانَتْ مُغْلَقَةً.',
		prompt: 'Fungsi لَكِنَّ dalam bacaan ini apa?',
		choices: ['Menunjukkan penyebab', 'Mengulang informasi', 'Menunjukkan hal yang berlawanan'],
		correct: 2,
		reason: 'Lina datang lebih awal, tetapi aula justru tertutup; لَكِنَّ menandai kontras.'
	},
	{
		id: 'judul-buku',
		arabic: 'قَرَأَ حَسَنٌ الْعُنْوَانَ، ثُمَّ فَتَحَ الْكِتَابَ.',
		prompt: 'Apa yang Hasan lakukan lebih dulu?',
		choices: ['Membaca judul', 'Membuka buku', 'Menutup buku'],
		correct: 0,
		reason: 'ثُمَّ menghubungkan tindakan berurutan: membaca judul mendahului membuka buku.'
	},
	{
		id: 'salma-absen',
		arabic: 'لَمْ تَحْضُرْ سَلْمَى الْيَوْمَ لِأَنَّهَا مَرِيضَةٌ.',
		prompt: 'Kalimat kedua memberi informasi tentang ...',
		choices: ['Tempat pertemuan', 'Alasan Salma tidak hadir', 'Keputusan guru'],
		correct: 1,
		reason: 'Bagian لِأَنَّهَا مَرِيضَةٌ menyebut sakit sebagai alasan ketidakhadiran.'
	},
	{
		id: 'jalan-panjang',
		arabic: 'كَانَ الطَّرِيقُ طَوِيلًا، وَلَكِنَّهُ هَادِئٌ.',
		prompt: 'Pilih hubungan dua sifat jalan itu.',
		choices: ['Akibat', 'Urutan waktu', 'Kontras'],
		correct: 2,
		reason: 'وَلَكِنَّهُ mempertentangkan jalan yang panjang dengan kelebihannya: tenang.'
	},
	{
		id: 'bus-terlambat',
		arabic: 'تَأَخَّرَتِ الْحَافِلَةُ، فَوَصَلَ الطُّلَّابُ بَعْدَ الْجَرَسِ.',
		prompt: 'Peristiwa mana yang pertama?',
		choices: ['Bus terlambat', 'Para siswa tiba setelah bel', 'Bel sekolah rusak'],
		correct: 0,
		reason: 'Keterlambatan bus mendahului kedatangan siswa; فَ menghubungkan akibat yang menyusul.'
	},
	{
		id: 'ali-kacamata',
		arabic: 'أَرَادَ عَلِيٌّ الْقِرَاءَةَ، لَكِنَّهُ نَسِيَ نَظَّارَتَهُ.',
		prompt: 'Apa hambatan yang disebut?',
		choices: ['Buku hilang', 'Ali lupa kacamatanya', 'Ruangan gelap'],
		correct: 1,
		reason: 'لَكِنَّهُ memperkenalkan kendala terhadap niat Ali untuk membaca.'
	},
	{
		id: 'hind-berkas',
		arabic: 'جَمَعَتْ هِنْدٌ الْأَوْرَاقَ قَبْلَ أَنْ تُغْلِقَ الْمَكْتَبَ.',
		prompt: 'Bagaimana urutan tindakan Hind?',
		choices: ['Menutup kantor lalu mengumpulkan kertas', 'Membaca surat lalu pulang', 'Mengumpulkan kertas sebelum menutup kantor'],
		correct: 2,
		reason: 'قَبْلَ أَنْ menyatakan bahwa mengumpulkan berkas mendahului menutup kantor.'
	},
	{
		id: 'sesudah-pelajaran',
		arabic: 'بَعْدَ أَنْ انْتَهَى الدَّرْسُ، ذَهَبَ الطُّلَّابُ إِلَى الْمَكْتَبَةِ.',
		prompt: 'Kapan para siswa pergi ke perpustakaan?',
		choices: ['Sesudah pelajaran selesai', 'Sebelum pelajaran', 'Pada saat ujian'],
		correct: 0,
		reason: 'بَعْدَ أَنْ menandai kejadian sesudah pelajaran berakhir.'
	},
	{
		id: 'hujan-anak',
		arabic: 'نَزَلَ الْمَطَرُ، لِذَلِكَ بَقِيَ الْأَطْفَالُ فِي الْبَيْتِ.',
		prompt: 'Apa hubungan hujan dan anak-anak tinggal di rumah?',
		choices: ['Kontras', 'Sebab dan akibat', 'Dua peristiwa tak terkait'],
		correct: 1,
		reason: 'Penanda لِذَلِكَ memperkenalkan akibat dari turunnya hujan.'
	},
	{
		id: 'pena-mahal',
		arabic: 'لَا أَشْتَرِي هَذَا الْقَلَمَ لِأَنَّهُ غَالٍ.',
		prompt: 'Apa alasan tidak membeli pena?',
		choices: ['Warnanya buruk', 'Pena hilang', 'Harganya mahal'],
		correct: 2,
		reason: 'لِأَنَّهُ غَالٍ berarti karena pena itu mahal.'
	},
	{
		id: 'fatimah-adik',
		arabic: 'أَحْضَرَتْ فَاطِمَةُ كِتَابًا جَدِيدًا، أَمَّا أَخُوهَا فَأَحْضَرَ دَفْتَرًا.',
		prompt: 'Apa yang dibedakan oleh أَمَّا?',
		choices: ['Barang yang dibawa dua orang', 'Waktu kunjungan', 'Tempat belajar'],
		correct: 0,
		reason: 'أَمَّا membedakan Fatimah yang membawa buku dengan saudara laki-lakinya yang membawa buku catatan.'
	},
	{
		id: 'pintu-pengunjung',
		arabic: 'فَتَحَ الْمُوَظَّفُ الْبَابَ، وَبَعْدَ ذَلِكَ دَخَلَ الزُّوَّارُ.',
		prompt: 'Tindakan mana yang terjadi sesudah pintu dibuka?',
		choices: ['Pengunjung pulang', 'Pengunjung masuk', 'Petugas menulis catatan'],
		correct: 1,
		reason: 'وَبَعْدَ ذَلِكَ berarti setelah itu; pengunjung masuk setelah pintu dibuka.'
	},
	{
		id: 'janji-pagi',
		arabic: 'الْمَوْعِدُ فِي الصَّبَاحِ، وَلَيْسَ فِي الْمَسَاءِ.',
		prompt: 'Informasi apa yang diperjelas pada bagian akhir?',
		choices: ['Lokasi', 'Pelaku', 'Bukan sore/malam, melainkan pagi'],
		correct: 2,
		reason: 'وَلَيْسَ فِي الْمَسَاءِ menolak pilihan waktu sore/malam.'
	},
	{
		id: 'dua-tas',
		arabic: 'هَذِهِ الْحَقِيبَةُ خَفِيفَةٌ، أَمَّا تِلْكَ فَثَقِيلَةٌ.',
		prompt: 'Bagaimana hubungan dua tas?',
		choices: ['Dibandingkan menurut beratnya', 'Sama-sama ringan', 'Disebut dalam urutan waktu'],
		correct: 0,
		reason: 'أَمَّا memperkenalkan tas lain sebagai pembanding: ringan vs berat.'
	},
	{
		id: 'maryam-bab',
		arabic: 'أَغْلَقَتْ مَرْيَمُ الْكِتَابَ بَعْدَ أَنْ قَرَأَتِ الْفَصْلَ.',
		prompt: 'Apa yang dilakukan Maryam sebelum menutup buku?',
		choices: ['Membeli buku', 'Membaca bab', 'Menulis surat'],
		correct: 1,
		reason: 'بَعْدَ أَنْ menunjukkan bahwa membaca bab berlangsung lebih dulu.'
	},
	{
		id: 'murid-lupa',
		arabic: 'نَسِيَ الطَّالِبُ وَاجِبَهُ، فَاعْتَذَرَ لِلْمُعَلِّمِ.',
		prompt: 'Peristiwa yang merupakan tindak lanjut adalah ...',
		choices: ['Guru meminta tugas', 'Siswa mengerjakan tugas', 'Siswa meminta maaf kepada guru'],
		correct: 2,
		reason: 'فَاعْتَذَرَ menunjukkan tindak lanjut atas lupa membawa tugas.'
	},
	{
		id: 'pengumuman-jam',
		arabic: 'قَالَ الْمُدِيرُ إِنَّ الْمَكْتَبَةَ سَتُفْتَحُ غَدًا، لَكِنَّهُ لَمْ يَذْكُرِ السَّاعَةَ.',
		prompt: 'Kesimpulan manakah yang benar dari kedua bagian?',
		choices: ['Hari pembukaan diketahui, jamnya belum', 'Perpustakaan dibuka pukul delapan', 'Perpustakaan tidak jadi dibuka'],
		correct: 0,
		reason: 'Disebut besok, tetapi jam pembukaan tidak disampaikan.'
	},
	{
		id: 'omar-catatan',
		arabic: 'اسْتَمَعَ عُمَرُ إِلَى الشَّرْحِ، ثُمَّ كَتَبَ مُلَاحَظَاتٍ.',
		prompt: 'Apa yang ditandai oleh ثُمَّ?',
		choices: ['Alasan', 'Urutan mendengar lalu mencatat', 'Kejadian yang bertentangan'],
		correct: 1,
		reason: 'ثُمَّ menunjukkan urutan kegiatan belajar: menyimak penjelasan kemudian mencatat.'
	}
];
