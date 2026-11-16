import type { MeaningQuestion } from './lessons/types.js';

/** Independently authored, unapproved transfer stimuli to bring each Stage 3 bank to 20. */

const locationSource = {
	label: 'Madinah Arabic · lokasi',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-4/part-1',
	usageType: 'independent-original'
} as const;
export const locationExtras: readonly MeaningQuestion[] = [
	{
		id: 'rm06-stage3-more-maryam-perpustakaan',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'مَرْيَمُ فِي الْمَكْتَبَةِ. هِيَ تَقْرَأُ كِتَابًا.',
		prompt: 'هِيَ merujuk kepada siapa?',
		choices: ['Maryam', 'Perpustakaan', 'Buku'],
		correct: 0,
		reason: 'Kata ganti هِيَ merujuk pada Maryam yang sedang membaca.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-pena-di-bawah',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْقَلَمُ تَحْتَ الدَّفْتَرِ. هُوَ أَزْرَقُ.',
		prompt: 'Di mana pena berada?',
		choices: ['Di atas buku', 'Di bawah buku catatan', 'Di samping pintu'],
		correct: 1,
		reason: 'تَحْتَ الدَّفْتَرِ menunjukkan tempat pena di bawah buku catatan.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-saudari-di-taman',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْوَلَدُ وَأُخْتُهُ فِي الْحَدِيقَةِ. هِيَ تَلْعَبُ.',
		prompt: 'Siapa yang sedang bermain?',
		choices: ['Anak laki-laki', 'Keduanya', 'Saudari anak itu'],
		correct: 2,
		reason: 'هِيَ merupakan kata ganti feminin yang merujuk pada أُخْتُهُ.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-guru-di-pintu',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْمُعَلِّمَةُ أَمَامَ الْبَابِ. هِيَ تَنْتَظِرُ الطَّالِبَ.',
		prompt: 'Di mana guru perempuan?',
		choices: ['Di depan pintu', 'Di balik meja', 'Di dalam tas'],
		correct: 0,
		reason: 'أَمَامَ الْبَابِ artinya di depan pintu.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-kursi-samping-jendela',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْكُرْسِيُّ بِجَانِبِ النَّافِذَةِ. هُوَ قَدِيمٌ.',
		prompt: 'Apa yang dinyatakan tua?',
		choices: ['Jendela', 'Kursi', 'Meja'],
		correct: 1,
		reason: 'هُوَ merujuk pada الْكُرْسِيُّ; قَدِيمٌ mendeskripsikannya.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-bus-dekat-sekolah',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْحَافِلَةُ عِنْدَ الْمَدْرَسَةِ. هِيَ تَنْتَظِرُ الطُّلَّابَ.',
		prompt: 'Apa yang menunggu siswa?',
		choices: ['Sekolah', 'Guru', 'Bus'],
		correct: 2,
		reason: 'هِيَ pada kalimat kedua mengacu pada الْحَافِلَةُ.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-kantor-di-belakang',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْمَكْتَبُ خَلْفَ الْبَيْتِ. هُوَ صَغِيرٌ.',
		prompt: 'Di mana kantor itu?',
		choices: ['Di belakang rumah', 'Di atas rumah', 'Di dalam sekolah'],
		correct: 0,
		reason: 'خَلْفَ الْبَيْتِ menunjukkan posisi di belakang rumah.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-buku-di-antara',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْكِتَابُ بَيْنَ الدَّفْتَرِ وَالْقَلَمِ. هُوَ جَدِيدٌ.',
		prompt: 'Buku berada di antara apa?',
		choices: ['Pintu dan kursi', 'Buku catatan dan pena', 'Dua tas'],
		correct: 1,
		reason: 'بَيْنَ menghubungkan buku dengan buku catatan dan pena sebagai dua batas lokasi.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-anak-di-kursi',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْبِنْتُ عَلَى الْكُرْسِيِّ. هِيَ تَكْتُبُ.',
		prompt: 'Siapa yang menulis?',
		choices: ['Kursi', 'Buku', 'Anak perempuan'],
		correct: 2,
		reason: 'هِيَ sesuai dengan الْبِنْتُ, bukan kursi.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-masjid-dekat-pasar',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْمَسْجِدُ قُرْبَ السُّوقِ. هُوَ كَبِيرٌ.',
		prompt: 'Bagaimana lokasi masjid?',
		choices: ['Dekat pasar', 'Di dalam rumah', 'Jauh dari kota'],
		correct: 0,
		reason: 'قُرْبَ السُّوقِ menunjukkan masjid dekat pasar.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-tas-di-dalam-kotak',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْحَقِيبَةُ دَاخِلَ الصُّنْدُوقِ. هِيَ ثَقِيلَةٌ.',
		prompt: 'Apa yang disebut berat?',
		choices: ['Kotak', 'Tas', 'Pintu'],
		correct: 1,
		reason: 'هِيَ mengacu pada tas, yang berada di dalam kotak.',
		sources: [locationSource]
	},
	{
		id: 'rm06-stage3-more-kunci-di-luar',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'الْمِفْتَاحُ خَارِجَ الْبَيْتِ. هُوَ عَلَى الْأَرْضِ.',
		prompt: 'Tepatnya di mana kunci?',
		choices: ['Di dalam rumah', 'Di atas meja', 'Di atas tanah di luar rumah'],
		correct: 2,
		reason: 'خَارِجَ dan عَلَى الْأَرْضِ bersama-sama menjelaskan letak kunci.',
		sources: [locationSource]
	}
];

const idafahSource = {
	label: 'Madinah Book 1 · iḍāfah',
	href: 'https://madinah.arabic.aramb.dev/books/book1/lessons/lesson5',
	usageType: 'independent-original'
} as const;
export const idafahExtras: readonly MeaningQuestion[] = [
	{
		id: 'rm06-stage3-more-pintu-kantor',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'بَابُ الْمَكْتَبِ مَفْتُوحٌ.',
		prompt: 'Apa yang terbuka?',
		choices: ['Pintu kantor', 'Jendela sekolah', 'Tas guru'],
		correct: 0,
		reason: 'بَابُ الْمَكْتَبِ adalah frasa iḍāfah yang menunjukkan pintu kantor.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-kunci-mobil',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'مِفْتَاحُ السَّيَّارَةِ عَلَى الْمَكْتَبِ.',
		prompt: 'Kunci apa yang berada di meja?',
		choices: ['Kunci kamar', 'Kunci mobil', 'Kunci kelas'],
		correct: 1,
		reason: 'السَّيَّارَةِ menerangkan kunci yang dimaksud: kunci mobil.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-warna-pena',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'لَوْنُ الْقَلَمِ أَحْمَرُ.',
		prompt: 'Apa yang berwarna merah?',
		choices: ['Seluruh kelas', 'Buku catatan', 'Warna pena'],
		correct: 2,
		reason: 'لَوْنُ adalah kata utama pada frasa لَوْنُ الْقَلَمِ.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-ruang-dokter',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'غُرْفَةُ الطَّبِيبِ نَظِيفَةٌ.',
		prompt: 'Ruangan siapa yang bersih?',
		choices: ['Dokter', 'Guru', 'Siswa'],
		correct: 0,
		reason: 'الطَّبِيبِ setelah غُرْفَةُ menerangkan hubungan ruangan dengan dokter.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-suara-guru',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'صَوْتُ الْمُعَلِّمِ وَاضِحٌ.',
		prompt: 'Apa makna frasa صَوْتُ الْمُعَلِّمِ?',
		choices: ['Buku guru', 'Suara guru', 'Kursi guru'],
		correct: 1,
		reason: 'صَوْتُ berarti suara dan الْمُعَلِّمِ menjelaskan sumber suara.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-nama-siswi',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'اسْمُ الطَّالِبَةِ لَيْلَى.',
		prompt: 'Kata pertama frasa ini merujuk kepada ...',
		choices: ['Kelas', 'Sekolah', 'Nama'],
		correct: 2,
		reason: 'اسْمُ adalah kata benda utama: nama siswi itu Layla.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-halaman-buku',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'صَفْحَةُ الْكِتَابِ مَفْتُوحَةٌ.',
		prompt: 'Apa yang terbuka?',
		choices: ['Halaman buku', 'Pintu rumah', 'Kantor guru'],
		correct: 0,
		reason: 'صَفْحَةُ الْكِتَابِ adalah frasa yang menunjuk halaman buku.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-judul-surat',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'عُنْوَانُ الرِّسَالَةِ قَصِيرٌ.',
		prompt: 'Apa yang dinyatakan pendek?',
		choices: ['Surat seluruhnya', 'Judul surat', 'Waktu kegiatan'],
		correct: 1,
		reason: 'عُنْوَانُ sebagai mudhaf menunjuk judul; الرِّسَالَةِ menerangkan judul surat.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-waktu-salat',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'وَقْتُ الصَّلَاةِ قَرِيبٌ.',
		prompt: 'Apa makna وَقْتُ الصَّلَاةِ?',
		choices: ['Pakaian salat', 'Ruang salat', 'Waktu salat'],
		correct: 2,
		reason: 'وَقْتُ adalah kata utama dan الصَّلَاةِ menerangkan waktu apa.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-makanan-anak',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'طَعَامُ الطِّفْلِ عَلَى الطَّاوِلَةِ.',
		prompt: 'Apa yang berada di meja?',
		choices: ['Makanan anak', 'Buku guru', 'Tas siswa'],
		correct: 0,
		reason: 'طَعَامُ الطِّفْلِ adalah gabungan makanan dan anak yang memilikinya.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-taman-sekolah',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'حَدِيقَةُ الْمَدْرَسَةِ جَمِيلَةٌ.',
		prompt: 'Tempat apa yang indah?',
		choices: ['Pasar kecil', 'Taman sekolah', 'Ruang dokter'],
		correct: 1,
		reason: 'حَدِيقَةُ adalah inti benda: taman; الْمَدْرَسَةِ menerangkan keterkaitannya.',
		sources: [idafahSource]
	},
	{
		id: 'rm06-stage3-more-jam-direktur',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'سَاعَةُ الْمُدِيرِ جَدِيدَةٌ.',
		prompt: 'Apa yang baru?',
		choices: ['Kantor direktur', 'Tas direktur', 'Jam milik direktur'],
		correct: 2,
		reason: 'سَاعَةُ الْمُدِيرِ adalah iḍāfah yang menunjukkan jam milik direktur.',
		sources: [idafahSource]
	}
];

const possessiveSource = {
	label: 'Madinah Arabic · pronomina sambung',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-47/part-2',
	usageType: 'independent-original'
} as const;
export const possessiveExtras: readonly MeaningQuestion[] = [
	{
		id: 'rm06-stage3-more-tas-maryam',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'هَذِهِ حَقِيبَةُ مَرْيَمَ. كِتَابُهَا دَاخِلَهَا.',
		prompt: 'Buku siapa yang ada di dalam tas?',
		choices: ['Maryam', 'Sami', 'Guru'],
		correct: 0,
		reason: 'ـهَا pada كِتَابُهَا mengacu ke Maryam; pada دَاخِلَهَا mengacu ke tas.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-bukuku',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'أَنَا طَالِبٌ. هَذَا دَفْتَرِي.',
		prompt: 'Apa arti دَفْتَرِي?',
		choices: ['Buku catatannya', 'Buku catatanku', 'Buku catatan kalian'],
		correct: 1,
		reason: 'Akhiran ـي menandai milik penutur, sesuai أَنَا.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-pena-saudara',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'هَذَا أَخِي. وَهَذَا قَلَمُهُ.',
		prompt: 'Pena kedua merujuk ke milik siapa?',
		choices: ['Ibu', 'Pembicara', 'Saudara laki-laki pembicara'],
		correct: 2,
		reason: 'ـهُ pada قَلَمُهُ mengacu kepada أَخِي.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-rumah-layla',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'هَذِهِ لَيْلَى. هَذَا بَيْتُهَا.',
		prompt: 'Rumah siapa yang ditunjuk?',
		choices: ['Layla', 'Guru laki-laki', 'Para siswa'],
		correct: 0,
		reason: 'ـهَا adalah akhiran posesif yang merujuk pada Layla.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-guru-kami',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'نَحْنُ فِي الْفَصْلِ. مُعَلِّمُنَا هُنَا.',
		prompt: 'Apa makna مُعَلِّمُنَا?',
		choices: ['Gurumu', 'Guru kami', 'Guru mereka'],
		correct: 1,
		reason: 'ـنَا menunjukkan hubungan dengan kami/nَحْنُ.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-bukumu-laki',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'أَنْتَ طَالِبٌ. هَذَا كِتَابُكَ.',
		prompt: 'Akhiran ـكَ menunjukkan ...',
		choices: ['Milikku', 'Milik mereka', 'Milikmu (laki-laki tunggal)'],
		correct: 2,
		reason: 'أَنْتَ sesuai dengan akhiran orang kedua tunggal maskulin ـكَ.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-tasmu-perempuan',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'أَنْتِ طَالِبَةٌ. هَذِهِ حَقِيبَتُكِ.',
		prompt: 'Siapa pemilik tas menurut kalimat?',
		choices: ['Lawan bicara perempuan tunggal', 'Penutur', 'Murid-murid'],
		correct: 0,
		reason: 'ـكِ adalah akhiran posesif untuk lawan bicara perempuan tunggal.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-sekolah-mereka',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'هُمْ طُلَّابٌ. مَدْرَسَتُهُمْ قَرِيبَةٌ.',
		prompt: 'Apa arti مَدْرَسَتُهُمْ?',
		choices: ['Sekolahmu', 'Sekolah mereka', 'Sekolahku'],
		correct: 1,
		reason: 'ـهُمْ merujuk ke kelompok siswa هُمْ.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-kelas-mereka-perempuan',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'هُنَّ طَالِبَاتٌ. صَفُّهُنَّ كَبِيرٌ.',
		prompt: 'Kelas itu milik/terkait siapa?',
		choices: ['Seorang siswa laki-laki', 'Guru perempuan', 'Kelompok siswi'],
		correct: 2,
		reason: 'ـهُنَّ mengacu pada jamak perempuan yang disebut sebagai siswi.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-ibu-dua-siswi',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'مَرْيَمُ وَفَاطِمَةُ فِي الْبَيْتِ. أُمُّهُمَا هُنَا.',
		prompt: 'Ibu siapa yang berada di sini?',
		choices: ['Maryam dan Fatimah', 'Hanya Maryam', 'Anak laki-laki'],
		correct: 0,
		reason: 'ـهُمَا menunjukkan kepemilikan/pertalian dua orang yang disebut sebelumnya.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-buku-kalian',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'أَنْتُمْ فِي الْمَكْتَبَةِ. كُتُبُكُمْ هُنَا.',
		prompt: 'Apa arti akhiran ـكُمْ?',
		choices: ['Miliknya', 'Milik kalian', 'Milikku'],
		correct: 1,
		reason: 'ـكُمْ pada كُتُبُكُمْ merujuk pada banyak lawan bicara.',
		sources: [possessiveSource]
	},
	{
		id: 'rm06-stage3-more-teleponku',
		kind: 'transfer',
		context: 'Titik cek Tahap 3 · contoh baru',
		arabic: 'أَنَا أَبْحَثُ عَنْ هَاتِفِي. هُوَ فِي الْحَقِيبَةِ.',
		prompt: 'Siapa pemilik telepon?',
		choices: ['Guru', 'Maryam', 'Pembicara'],
		correct: 2,
		reason: 'Akhiran ـي pada هَاتِفِي menandai telepon milik penutur.',
		sources: [possessiveSource]
	}
];
