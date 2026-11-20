/** OER-02b: sourced forms; original teaching text and exercises remain draft. */
export const participleSources = [
	{
		id: 'active',
		title: 'Arabic Level Four · 2.6 Active Participle',
		url: 'https://human.libretexts.org/Bookshelves/Languages/Arabic/Arabic_Level_Four/02:/2.06:___(Active_Participle)',
		section: 'Formation from a trilateral/non-trilateral verb; Agreement and Function',
		author: 'Hana Kassas',
		license: 'CC BY 4.0'
	},
	{
		id: 'passive',
		title: 'Arabic Level Four · 3.5 اسم المفعول',
		url: 'https://human.libretexts.org/Bookshelves/Languages/Arabic/Arabic_Level_Four/03:/3.05:___Past_Participle-',
		section: 'Pembentukan اسم المفعول; tabel pola verba I–X',
		author: 'Hana Kassas',
		license: 'CC BY 4.0'
	},
	{
		id: 'contrast',
		title: 'Intermediate Arabic I · 5.2 Active and Passive Participles',
		url: 'https://openbooks.lib.msu.edu/arb201/chapter/5-2-grammar-in-context/',
		section: 'Grammar 1–2, Rules',
		author: 'Ayman Mohamed dan Sadam Issa',
		license: 'CC BY-NC 4.0 · rujukan konsep saja'
	}
] as const;

export const participlePairs = [
	{
		id: 'kataba',
		form: 'I',
		rootKind: 'صَحِيحٌ',
		verb: 'كَتَبَ',
		present: 'يَكْتُبُ',
		active: 'كَاتِبٌ',
		passive: 'مَكْتُوبٌ',
		meaning: 'menulis',
		activeMeaning: 'penulis',
		passiveMeaning: 'tertulis / yang ditulis',
		source: 'https://en.wiktionary.org/wiki/كتب#Arabic',
		section: 'Arabic — Conjugation of كَتَبَ (Form I), active/passive participle'
	},
	{
		id: 'fataha',
		form: 'I',
		rootKind: 'صَحِيحٌ',
		verb: 'فَتَحَ',
		present: 'يَفْتَحُ',
		active: 'فَاتِحٌ',
		passive: 'مَفْتُوحٌ',
		meaning: 'membuka',
		activeMeaning: 'yang membuka',
		passiveMeaning: 'terbuka',
		source: 'https://en.wiktionary.org/wiki/فتح#Arabic',
		section: 'Arabic — Conjugation of فَتَحَ (Form I), active/passive participle'
	},
	{
		id: 'nazama',
		form: 'II',
		rootKind: 'صَحِيحٌ',
		verb: 'نَظَّمَ',
		present: 'يُنَظِّمُ',
		active: 'مُنَظِّمٌ',
		passive: 'مُنَظَّمٌ',
		meaning: 'menata / menyelenggarakan',
		activeMeaning: 'penyelenggara',
		passiveMeaning: 'tertata',
		source: 'https://en.wiktionary.org/wiki/نظم#Arabic',
		section: 'Arabic — Conjugation of نَظَّمَ (Form II), active/passive participle'
	},
	{
		id: 'arsala',
		form: 'IV',
		rootKind: 'صَحِيحٌ',
		verb: 'أَرْسَلَ',
		present: 'يُرْسِلُ',
		active: 'مُرْسِلٌ',
		passive: 'مُرْسَلٌ',
		meaning: 'mengirim',
		activeMeaning: 'pengirim',
		passiveMeaning: 'yang dikirim',
		source: 'https://en.wiktionary.org/wiki/أرسل#Arabic',
		section: 'Arabic — Conjugation of أَرْسَلَ (Form IV), active/passive participle'
	},
	{
		id: 'istakhdama',
		form: 'X',
		rootKind: 'صَحِيحٌ',
		verb: 'اِسْتَخْدَمَ',
		present: 'يَسْتَخْدِمُ',
		active: 'مُسْتَخْدِمٌ',
		passive: 'مُسْتَخْدَمٌ',
		meaning: 'menggunakan',
		activeMeaning: 'pengguna',
		passiveMeaning: 'yang digunakan',
		source: 'https://en.wiktionary.org/wiki/استخدم#Arabic',
		section: 'Arabic — Conjugation of اِسْتَخْدَمَ (Form X), active/passive participle'
	},
	{
		id: 'baa',
		form: 'I',
		rootKind: 'أَجْوَفُ',
		verb: 'بَاعَ',
		present: 'يَبِيعُ',
		active: 'بَائِعٌ',
		passive: 'مَبِيعٌ',
		meaning: 'menjual',
		activeMeaning: 'penjual',
		passiveMeaning: 'yang dijual',
		source: 'https://en.wiktionary.org/wiki/باع#Arabic',
		section: 'Arabic — Conjugation of بَاعَ (Form I), active/passive participle'
	}
] as const;

export type ParticiplePairId = (typeof participlePairs)[number]['id'];
export type ParticipleKind = 'formation' | 'role' | 'agreement' | 'meaning';

export type ParticipleTask = {
	id: string;
	pairId: ParticiplePairId;
	kind: ParticipleKind;
	arabic: string;
	question: string;
	answer: string;
	status: 'draft';
};

export const participleTasks: readonly ParticipleTask[] = [
	{
		id: 'part-01',
		pairId: 'kataba',
		kind: 'role',
		arabic: 'الْكَاتِبُ فِي الْمَكْتَبَةِ.',
		question: 'Apakah الْكَاتِبُ di sini fi‘il atau isim?',
		answer:
			'Isim fā‘il (penulis), berfungsi sebagai mubtada. فِي الْمَكْتَبَةِ adalah khabar berupa frasa jar–majrūr.',
		status: 'draft'
	},
	{
		id: 'part-02',
		pairId: 'kataba',
		kind: 'role',
		arabic: 'حَضَرَتِ الْكَاتِبَةُ إِلَى الْمَدْرَسَةِ.',
		question: 'Tentukan fi‘il dan fā‘il dalam kalimat ini.',
		answer:
			'حَضَرَتِ adalah fi‘il māḍī. Tā’ feminin yang asalnya sukun dibaca dengan kasrah saat disambung ke الْكَاتِبَةُ. Kata الْكَاتِبَةُ berbentuk isim fā‘il dan berfungsi sebagai fā‘il marfū‘.',
		status: 'draft'
	},
	{
		id: 'part-03',
		pairId: 'kataba',
		kind: 'meaning',
		arabic: 'الْعُنْوَانُ مَكْتُوبٌ بِالْعَرَبِيَّةِ.',
		question: 'Apakah kalimat ini menyebut siapa yang menulis judul?',
		answer:
			'Tidak. مَكْتُوبٌ adalah isim maf‘ūl sebagai khabar: judul itu tertulis dalam bahasa Arab. Pelakunya tidak disebut.',
		status: 'draft'
	},
	{
		id: 'part-04',
		pairId: 'kataba',
		kind: 'agreement',
		arabic: 'قَرَأْتُ رِسَالَةً مَكْتُوبَةً بِالْعَرَبِيَّةِ.',
		question: 'Mengapa مَكْتُوبَةً berakhir fatḥatain?',
		answer:
			'Na‘at untuk رِسَالَةً, mengikuti feminin, tunggal, nakirah dan naṣb; surat yang dibaca tertulis dalam bahasa Arab.',
		status: 'draft'
	},
	{
		id: 'part-05',
		pairId: 'fataha',
		kind: 'meaning',
		arabic: 'بَابُ الْمَكْتَبِ مَفْتُوحٌ.',
		question: 'Apakah pernyataan ini menekankan tindakan membuka atau keadaan pintu?',
		answer: 'Keadaan pintu kantor yang terbuka. مَفْتُوحٌ merupakan isim maf‘ūl, bukan fi‘il māḍī.',
		status: 'draft'
	},
	{
		id: 'part-06',
		pairId: 'fataha',
		kind: 'agreement',
		arabic: 'النَّافِذَةُ الْمَفْتُوحَةُ قَرِيبَةٌ مِنِّي.',
		question: 'Kata manakah yang merupakan na‘at, dan mana khabar?',
		answer:
			'الْمَفْتُوحَةُ adalah na‘at yang mengikuti النَّافِذَةُ dalam jenis feminin, jumlah tunggal, bentuk ma‘rifah, dan raf‘. قَرِيبَةٌ adalah khabar yang diikuti keterangan مِنِّي.',
		status: 'draft'
	},
	{
		id: 'part-07',
		pairId: 'fataha',
		kind: 'meaning',
		arabic: 'الْمَتَاجِرُ مَفْتُوحَةٌ صَبَاحًا.',
		question: 'Apa yang diketahui dari pemberitahuan ini?',
		answer:
			'Toko-toko buka pada pagi hari. Jamak benda tak berakal lazim memakai bentuk feminin tunggal: مَفْتُوحَةٌ.',
		status: 'draft'
	},
	{
		id: 'part-08',
		pairId: 'fataha',
		kind: 'formation',
		arabic: 'فَتَحَ الْحَارِسُ الْبَابَ. الْبَابُ مَفْتُوحٌ الْآنَ.',
		question: 'Bandingkan فَتَحَ dan مَفْتُوحٌ.',
		answer:
			'Yang pertama fi‘il lampau, yang kedua isim maf‘ūl pola مَفْعُولٌ. Kalimat kedua menyatakan keadaan sekarang.',
		status: 'draft'
	},
	{
		id: 'part-09',
		pairId: 'nazama',
		kind: 'formation',
		arabic: 'مُنَظِّمٌ / مُنَظَّمٌ',
		question: 'Harakat mana yang membedakan pelaku dan yang ditata?',
		answer:
			'Kasrah pada ظّ menghasilkan مُنَظِّمٌ (aktif), fatḥah menghasilkan مُنَظَّمٌ (pasif); keduanya Form II.',
		status: 'draft'
	},
	{
		id: 'part-10',
		pairId: 'nazama',
		kind: 'role',
		arabic: 'الْمُنَظِّمُ يُرَاجِعُ قَائِمَةَ الْأَسْمَاءِ.',
		question: 'Apakah الْمُنَظِّمُ otomatis fā‘il hanya karena bentuknya?',
		answer:
			'الْمُنَظِّمُ adalah isim fā‘il yang berfungsi sebagai mubtada. Khabarnya mencakup seluruh klausa يُرَاجِعُ قَائِمَةَ الْأَسْمَاءِ, dengan fā‘il tersirat هُوَ dan objek قَائِمَةَ الْأَسْمَاءِ.',
		status: 'draft'
	},
	{
		id: 'part-11',
		pairId: 'nazama',
		kind: 'agreement',
		arabic: 'فِي الْمَكْتَبِ مَلَفَّاتٌ مُنَظَّمَةٌ.',
		question: 'Mengapa مُنَظَّمَةٌ bukan مُنَظِّمَةٌ atau bentuk jamak?',
		answer:
			'Berkas-berkasnya ditata, bukan menata. Na‘at feminin tunggal sesuai jamak benda tak berakal.',
		status: 'draft'
	},
	{
		id: 'part-12',
		pairId: 'nazama',
		kind: 'meaning',
		arabic: 'الْجَدْوَلُ مُنَظَّمٌ حَسَبَ التَّارِيخِ.',
		question: 'Apakah informasi ini tentang orang penyelenggara?',
		answer: 'Tidak. Jadwal tertata berdasarkan tanggal. مُنَظَّمٌ ialah khabar yang menyatakan keadaan.',
		status: 'draft'
	},
	{
		id: 'part-13',
		pairId: 'arsala',
		kind: 'role',
		arabic: 'اِسْمُ الْمُرْسِلِ فِي أَعْلَى الصَّفْحَةِ.',
		question: 'Mengapa الْمُرْسِلِ berakhir kasrah, walaupun isim fā‘il?',
		answer: 'Ia muḍāf ilaih dari اِسْمُ: nama pengirim. Bentuk isim fā‘il tidak menentukan i‘rab.',
		status: 'draft'
	},
	{
		id: 'part-14',
		pairId: 'arsala',
		kind: 'meaning',
		arabic: 'هَذِهِ نُسْخَةٌ مُرْسَلَةٌ بِالْبَرِيدِ.',
		question: 'Apakah نُسْخَةٌ itu mengirim atau dikirim?',
		answer:
			'Salinan itu dikirim lewat pos. مُرْسَلَةٌ adalah isim maf‘ūl feminin yang menerangkan نُسْخَةٌ.',
		status: 'draft'
	},
	{
		id: 'part-15',
		pairId: 'arsala',
		kind: 'formation',
		arabic: 'يُرْسِلُ / مُرْسِلٌ / مُرْسَلٌ',
		question: 'Tentukan satu bentuk fi‘il dan dua bentuk isim.',
		answer:
			'يُرْسِلُ (fi‘il muḍāri‘); مُرْسِلٌ (pengirim, kasrah pada س); مُرْسَلٌ (yang dikirim, fatḥah pada س).',
		status: 'draft'
	},
	{
		id: 'part-16',
		pairId: 'arsala',
		kind: 'agreement',
		arabic: 'مَرَرْتُ بِالْمُرْسِلِ فِي الْمَكْتَبِ.',
		question: 'Apa sebab kasrah terakhir pada الْمُرْسِلِ?',
		answer: 'Huruf jar بِـ membuatnya majrūr. Makna bentuk aktifnya tetap pengirim.',
		status: 'draft'
	},
	{
		id: 'part-17',
		pairId: 'istakhdama',
		kind: 'meaning',
		arabic: 'كُلُّ مُسْتَخْدِمٍ لَهُ حِسَابٌ.',
		question: 'Siapa yang dimaksud oleh مُسْتَخْدِمٍ?',
		answer: 'Setiap pengguna memiliki akun. Isim fā‘il ini menjadi muḍāf ilaih dari كُلُّ.',
		status: 'draft'
	},
	{
		id: 'part-18',
		pairId: 'istakhdama',
		kind: 'formation',
		arabic: 'الْجِهَازُ الْمُسْتَخْدَمُ فِي الْفَصْلِ جَدِيدٌ.',
		question: 'Mengapa huruf د pada الْمُسْتَخْدَمُ berfatḥah?',
		answer:
			'Fatḥah pada د menandai isim maf‘ūl Form X dalam contoh ini. الْمُسْتَخْدَمُ berarti “yang digunakan” dan mengikuti الْجِهَازُ sebagai na‘at ma‘rifah dan marfū‘. Kata جَدِيدٌ adalah khabar.',
		status: 'draft'
	},
	{
		id: 'part-19',
		pairId: 'istakhdama',
		kind: 'agreement',
		arabic: 'تَحْتَاجُ الْمُسْتَخْدِمَةُ إِلَى كَلِمَةِ مُرُورٍ.',
		question: 'Apa fā‘il dari تَحْتَاجُ dan apa tanda raf‘-nya?',
		answer:
			'الْمُسْتَخْدِمَةُ (pengguna perempuan) adalah fā‘il marfū‘ dengan ḍammah pada tā’ marbūṭah. Kata ini berbentuk isim fā‘il feminin.',
		status: 'draft'
	},
	{
		id: 'part-20',
		pairId: 'istakhdama',
		kind: 'meaning',
		arabic: 'الْبَرْنَامَجُ مُسْتَخْدَمٌ فِي الْمَدْرَسَةِ.',
		question: 'Apakah مُسْتَخْدَمٌ sendiri memberi tahu kapan program itu dipakai?',
		answer:
			'Kalimat ini menyatakan bahwa program itu dipakai di sekolah. Waktu pemakaiannya perlu dipahami dari konteks atau keterangan waktu.',
		status: 'draft'
	},
	{
		id: 'part-21',
		pairId: 'baa',
		kind: 'formation',
		arabic: 'بَاعَ / بَائِعٌ / مَبِيعٌ',
		question: 'Mengapa jangan menerapkan pola ṣaḥīḥ secara mekanis?',
		answer:
			'Akar ب ي ع adalah ajwaf. Bentuk yang tercatat ialah بَائِعٌ dan مَبِيعٌ; perhatikan hamzah dan vokal panjang pada perubahan akar lemah.',
		status: 'draft'
	},
	{
		id: 'part-22',
		pairId: 'baa',
		kind: 'role',
		arabic: 'سَأَلْتُ الْبَائِعَ عَنِ السِّعْرِ.',
		question: 'Apakah الْبَائِعَ di sini berfungsi sebagai fā‘il?',
		answer:
			'Tidak. Ia isim fā‘il secara bentuk, tetapi maf‘ūl bih manṣūb dari سَأَلْتُ. Pelakunya adalah tā’ pada fi‘il.',
		status: 'draft'
	},
	{
		id: 'part-23',
		pairId: 'baa',
		kind: 'meaning',
		arabic: 'هَذَا الْكِتَابُ مَبِيعٌ.',
		question: 'Dalam daftar penjualan, apa status buku ini?',
		answer:
			'Dalam konteks ini, buku sudah terjual. مَبِيعٌ adalah khabar dan isim maf‘ūl dari بَاعَ. Kalimat ini menyatakan status buku tanpa menyebut waktu transaksi.',
		status: 'draft'
	},
	{
		id: 'part-24',
		pairId: 'baa',
		kind: 'agreement',
		arabic: 'سَلَّمْتُ عَلَى الْبَائِعَةِ فِي السُّوقِ.',
		question: 'Apa yang berubah dibandingkan بَائِعٌ?',
		answer:
			'الْبَائِعَةِ adalah bentuk feminin ma‘rifah, majrūr setelah عَلَى. Bentuk dasar tetap isim fā‘il.',
		status: 'draft'
	}
];

export const participleRules = [
	{
		title: 'Dua bentuk isim, bukan dua bentuk fi‘il',
		text: 'Isim fā‘il mengacu kepada pelaku atau pemilik keadaan; isim maf‘ūl biasanya mengacu kepada yang dikenai perbuatan. Keduanya termasuk isim. Fungsi sintaksisnya bisa menjadi mubtada, khabar, na‘at, fā‘il atau maf‘ūl bih.',
		sourceId: 'active'
	},
	{
		title: 'Pola dasar dan pola mazīd',
		text: 'Untuk verba Form I ṣaḥīḥ yang cocok, pola umum adalah فَاعِلٌ dan مَفْعُولٌ. Pada contoh Form II, IV dan X di bawah, bentuk aktif memakai kasrah sebelum radikal terakhir dan bentuk pasif memakai fatḥah, dengan awalan مُـ. Jangan mengganti vokal tanpa memperhatikan pola dan jenis akar.',
		sourceId: 'passive'
	},
	{
		title: 'Batas pola: akar lemah dan transitivitas',
		text: 'Akar ajwaf seperti ب ي ع mempunyai perubahan bentuk: بَائِعٌ dan مَبِيعٌ. Bentuk pasif yang biasa dipakai bergantung pada transitivitas dan konteks; jangan menganggap setiap verba memiliki bentuk pasif mandiri yang lazim. Gunakan entri kamus.',
		sourceId: 'passive'
	},
	{
		title: 'I‘rab, gender dan makna dalam konteks',
		text: 'Bentuk turunan yang menerangkan isim mengikuti kaidah na‘at; ketika menjadi khabar atau muḍāf ilaih, akhir katanya mengikuti kedudukan itu. Jamak benda tak berakal lazim memakai sifat feminin tunggal. Bentuk yang sama bisa menjadi nama profesi atau menyatakan keadaan, tanpa menandai kala tertentu.',
		sourceId: 'contrast'
	}
] as const;
