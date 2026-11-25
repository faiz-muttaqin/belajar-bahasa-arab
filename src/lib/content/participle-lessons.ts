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
		masdar: 'كِتَابَةٌ',
		active: 'كَاتِبٌ',
		passive: 'مَكْتُوبٌ',
		meaning: 'menulis',
		masdarMeaning: 'kegiatan menulis',
		activeMeaning: 'penulis',
		passiveMeaning: 'tertulis / yang ditulis',
		note: 'Form I ṣaḥīḥ: فَاعِلٌ dan مَفْعُولٌ. Maṣdar Form I tidak selalu bisa ditebak dari polanya; catat dari kamus.',
		source: 'https://en.wiktionary.org/wiki/كتب#Arabic',
		section: 'Arabic — Conjugation of كَتَبَ (Form I), active/passive participle',
		dataId: 'كتب-1',
		checked: '20 Nov 2026'
	},
	{
		id: 'fataha',
		form: 'I',
		rootKind: 'صَحِيحٌ',
		verb: 'فَتَحَ',
		present: 'يَفْتَحُ',
		masdar: 'فَتْحٌ',
		active: 'فَاتِحٌ',
		passive: 'مَفْتُوحٌ',
		meaning: 'membuka',
		masdarMeaning: 'pembukaan',
		activeMeaning: 'yang membuka',
		passiveMeaning: 'terbuka',
		note: 'Form I ṣaḥīḥ: فَاعِلٌ dan مَفْعُولٌ; maṣdar فَعْلٌ.',
		source: 'https://en.wiktionary.org/wiki/فتح#Arabic',
		section: 'Arabic — Conjugation of فَتَحَ (Form I), active/passive participle',
		dataId: 'فتح-1',
		checked: '20 Nov 2026'
	},
	{
		id: 'nazama',
		form: 'II',
		rootKind: 'صَحِيحٌ',
		verb: 'نَظَّمَ',
		present: 'يُنَظِّمُ',
		masdar: 'تَنْظِيمٌ',
		active: 'مُنَظِّمٌ',
		passive: 'مُنَظَّمٌ',
		meaning: 'menata / menyelenggarakan',
		masdarMeaning: 'penataan; penyelenggaraan',
		activeMeaning: 'penyelenggara',
		passiveMeaning: 'tertata',
		note: 'Form II فَعَّلَ: radikal kedua bershadda; maṣdar تَفْعِيلٌ.',
		source: 'https://en.wiktionary.org/wiki/نظم#Arabic',
		section: 'Arabic — Conjugation of نَظَّمَ (Form II), active/passive participle',
		dataId: 'نظم-II-1',
		checked: '20 Nov 2026'
	},
	{
		id: 'arsala',
		form: 'IV',
		rootKind: 'صَحِيحٌ',
		verb: 'أَرْسَلَ',
		present: 'يُرْسِلُ',
		masdar: 'إِرْسَالٌ',
		active: 'مُرْسِلٌ',
		passive: 'مُرْسَلٌ',
		meaning: 'mengirim',
		masdarMeaning: 'pengiriman',
		activeMeaning: 'pengirim',
		passiveMeaning: 'yang dikirim',
		note: 'Form IV أَفْعَلَ: maṣdar إِفْعَالٌ.',
		source: 'https://en.wiktionary.org/wiki/أرسل#Arabic',
		section: 'Arabic — Conjugation of أَرْسَلَ (Form IV), active/passive participle',
		dataId: 'أرسل-IV-1',
		checked: '20 Nov 2026'
	},
	{
		id: 'istakhdama',
		form: 'X',
		rootKind: 'صَحِيحٌ',
		verb: 'اِسْتَخْدَمَ',
		present: 'يَسْتَخْدِمُ',
		masdar: 'اِسْتِخْدَامٌ',
		active: 'مُسْتَخْدِمٌ',
		passive: 'مُسْتَخْدَمٌ',
		meaning: 'menggunakan',
		masdarMeaning: 'penggunaan',
		activeMeaning: 'pengguna',
		passiveMeaning: 'yang digunakan',
		note: 'Form X اِسْتَفْعَلَ: maṣdar اِسْتِفْعَالٌ.',
		source: 'https://en.wiktionary.org/wiki/استخدم#Arabic',
		section: 'Arabic — Conjugation of اِسْتَخْدَمَ (Form X), active/passive participle',
		dataId: 'استخدم-X-1',
		checked: '20 Nov 2026'
	},
	{
		id: 'baa',
		form: 'I',
		rootKind: 'أَجْوَفُ',
		verb: 'بَاعَ',
		present: 'يَبِيعُ',
		masdar: 'بَيْعٌ',
		active: 'بَائِعٌ',
		passive: 'مَبِيعٌ',
		meaning: 'menjual',
		masdarMeaning: 'penjualan',
		activeMeaning: 'penjual',
		passiveMeaning: 'yang dijual',
		note: 'Ajwaf: yā’ akar menjadi alif pada بَاعَ, tampak sebagai ī pada يَبِيعُ dan مَبِيعٌ, dan menjadi hamzah pada isim fā‘il بَائِعٌ.',
		source: 'https://en.wiktionary.org/wiki/باع#Arabic',
		section: 'Arabic — Conjugation of بَاعَ (Form I), active/passive participle',
		dataId: 'باع-1',
		checked: '20 Nov 2026'
	},
	{
		id: 'saada',
		form: 'III',
		rootKind: 'صَحِيحٌ',
		verb: 'سَاعَدَ',
		present: 'يُسَاعِدُ',
		masdar: 'مُسَاعَدَةٌ',
		active: 'مُسَاعِدٌ',
		passive: 'مُسَاعَدٌ',
		meaning: 'membantu',
		masdarMeaning: 'bantuan',
		activeMeaning: 'pembantu; asisten',
		passiveMeaning: 'yang dibantu',
		note: 'Form III فَاعَلَ: alif sesudah radikal pertama. Maṣdar مُفَاعَلَةٌ; bentuk feminin isim maf‘ūl (مُسَاعَدَةٌ) sama tulisannya dengan maṣdar.',
		source: 'https://en.wiktionary.org/wiki/ساعد#Arabic',
		section: 'Arabic — Conjugation of سَاعَدَ (Form III), active/passive participle, verbal noun',
		dataId: 'ساعد-III-1',
		checked: '25 Nov 2026'
	},
	{
		id: 'taallama',
		form: 'V',
		rootKind: 'صَحِيحٌ',
		verb: 'تَعَلَّمَ',
		present: 'يَتَعَلَّمُ',
		masdar: 'تَعَلُّمٌ',
		active: 'مُتَعَلِّمٌ',
		passive: 'مُتَعَلَّمٌ',
		meaning: 'belajar (sesuatu)',
		masdarMeaning: 'kegiatan belajar',
		activeMeaning: 'pelajar; yang belajar',
		passiveMeaning: 'yang dipelajari',
		note: 'Form V تَفَعَّلَ: awalan تَـ dan radikal kedua bershadda; maṣdar تَفَعُّلٌ. Kasrah pada radikal kedua untuk aktif, fatḥah untuk pasif.',
		source: 'https://en.wiktionary.org/wiki/تعلم#Arabic',
		section: 'Arabic — Conjugation of تَعَلَّمَ (Form V), active/passive participle, verbal noun',
		dataId: 'تعلم-V-1',
		checked: '25 Nov 2026'
	},
	{
		id: 'tabadala',
		form: 'VI',
		rootKind: 'صَحِيحٌ',
		verb: 'تَبَادَلَ',
		present: 'يَتَبَادَلُ',
		masdar: 'تَبَادُلٌ',
		active: 'مُتَبَادِلٌ',
		passive: 'مُتَبَادَلٌ',
		meaning: 'saling bertukar',
		masdarMeaning: 'pertukaran',
		activeMeaning: 'yang saling bertukar',
		passiveMeaning: 'yang dipertukarkan; timbal balik',
		note: 'Form VI تَفَاعَلَ: alif sesudah radikal pertama dan sering bermakna saling. Maṣdar تَفَاعُلٌ.',
		source: 'https://en.wiktionary.org/wiki/تبادل#Arabic',
		section: 'Arabic — Conjugation of تَبَادَلَ (Form VI), active/passive participle, verbal noun',
		dataId: 'تبادل-VI-1',
		checked: '25 Nov 2026'
	},
	{
		id: 'inqataa',
		form: 'VII',
		rootKind: 'صَحِيحٌ',
		verb: 'اِنْقَطَعَ',
		present: 'يَنْقَطِعُ',
		masdar: 'اِنْقِطَاعٌ',
		active: 'مُنْقَطِعٌ',
		passive: null,
		meaning: 'terputus',
		masdarMeaning: 'keterputusan; terhentinya',
		activeMeaning: 'yang terputus',
		passiveMeaning: 'tidak lazim',
		note: 'Form VII اِنْفَعَلَ menyatakan hasil atau keadaan sendiri dan tidak membawa objek, sehingga isim maf‘ūl mandiri tidak lazim. Maṣdar اِنْفِعَالٌ.',
		source: 'https://en.wiktionary.org/wiki/انقطع#Arabic',
		section:
			'Arabic — Conjugation of اِنْقَطَعَ (Form VII), active participle, verbal noun; tabel menandai “no passive (?)”',
		dataId: 'انقطع-VII-1',
		checked: '25 Nov 2026'
	},
	{
		id: 'intazara',
		form: 'VIII',
		rootKind: 'صَحِيحٌ',
		verb: 'اِنْتَظَرَ',
		present: 'يَنْتَظِرُ',
		masdar: 'اِنْتِظَارٌ',
		active: 'مُنْتَظِرٌ',
		passive: 'مُنْتَظَرٌ',
		meaning: 'menunggu',
		masdarMeaning: 'penantian',
		activeMeaning: 'yang menunggu',
		passiveMeaning: 'yang ditunggu',
		note: 'Form VIII اِفْتَعَلَ: tā’ disisipkan sesudah radikal pertama. Maṣdar اِفْتِعَالٌ.',
		source: 'https://en.wiktionary.org/wiki/انتظر#Arabic',
		section: 'Arabic — Conjugation of اِنْتَظَرَ (Form VIII), active/passive participle, verbal noun',
		dataId: 'انتظر-VIII-1',
		checked: '25 Nov 2026'
	},
	{
		id: 'ikhtara',
		form: 'VIII',
		rootKind: 'أَجْوَفُ',
		verb: 'اِخْتَارَ',
		present: 'يَخْتَارُ',
		masdar: 'اِخْتِيَارٌ',
		active: 'مُخْتَارٌ',
		passive: 'مُخْتَارٌ',
		meaning: 'memilih',
		masdarMeaning: 'pemilihan; pilihan',
		activeMeaning: 'yang memilih',
		passiveMeaning: 'yang dipilih',
		note: 'Ajwaf Form VIII: isim fā‘il dan isim maf‘ūl sama persis (مُخْتَارٌ), baik tulisan maupun ucapan, karena yā’ akar berubah menjadi alif. Konteks yang menentukan.',
		source: 'https://en.wiktionary.org/wiki/اختار#Arabic',
		section: 'Arabic — Conjugation of اِخْتَارَ (Form VIII), active/passive participle, verbal noun',
		dataId: 'اختار-VIII-1',
		checked: '25 Nov 2026'
	},
	{
		id: 'ittasala',
		form: 'VIII',
		rootKind: 'مِثَالٌ',
		verb: 'اِتَّصَلَ',
		present: 'يَتَّصِلُ',
		masdar: 'اِتِّصَالٌ',
		active: 'مُتَّصِلٌ',
		passive: null,
		meaning: 'menghubungi; terhubung dengan',
		masdarMeaning: 'hubungan; komunikasi',
		activeMeaning: 'yang terhubung; bersambung',
		passiveMeaning: 'tidak lazim',
		note: 'Mithāl Form VIII: wāw akar (و ص ل) menjadi tā’ dan melebur dengan tā’ sisipan (shadda). Verba ini memakai بِـ, jadi isim maf‘ūl mandiri tidak dipakai sebagai contoh.',
		source: 'https://en.wiktionary.org/wiki/اتصل#Arabic',
		section:
			'Arabic — Conjugation of اِتَّصَلَ (Form VIII), active participle, verbal noun; tabel memuat pasif impersonal مُتَّصَلٌ yang tidak dipakai sebagai contoh',
		dataId: 'اتصل-VIII-1',
		checked: '25 Nov 2026'
	},
	{
		id: 'istaqbala',
		form: 'X',
		rootKind: 'صَحِيحٌ',
		verb: 'اِسْتَقْبَلَ',
		present: 'يَسْتَقْبِلُ',
		masdar: 'اِسْتِقْبَالٌ',
		active: 'مُسْتَقْبِلٌ',
		passive: 'مُسْتَقْبَلٌ',
		meaning: 'menyambut; menerima (tamu)',
		masdarMeaning: 'penyambutan',
		activeMeaning: 'penyambut',
		passiveMeaning: 'yang disambut; juga kata benda “masa depan”',
		note: 'Form X اِسْتَفْعَلَ. Bentuk مُسْتَقْبَلٌ juga menjadi kata benda tersendiri “masa depan”; jangan selalu memaknainya sebagai yang disambut.',
		source: 'https://en.wiktionary.org/wiki/استقبل#Arabic',
		section: 'Arabic — Conjugation of اِسْتَقْبَلَ (Form X), active/passive participle, verbal noun',
		dataId: 'استقبل-X-1',
		checked: '25 Nov 2026'
	},
	{
		id: 'ihmarra',
		form: 'IX',
		rootKind: 'صَحِيحٌ',
		verb: 'اِحْمَرَّ',
		present: 'يَحْمَرُّ',
		masdar: 'اِحْمِرَارٌ',
		active: 'مُحْمَرٌّ',
		passive: null,
		meaning: 'menjadi merah; tersipu',
		masdarMeaning: 'kemerahan',
		activeMeaning: 'yang memerah',
		passiveMeaning: 'tidak lazim',
		note: 'Form IX اِفْعَلَّ untuk warna atau cacat; radikal ketiga digandakan dan ditulis bershadda. Intransitif, jadi isim maf‘ūl tidak lazim. Maṣdar اِفْعِلَالٌ.',
		source: 'https://en.wiktionary.org/wiki/احمر#Arabic',
		section:
			'Arabic — Conjugation of اِحْمَرَّ (Form IX), active participle, verbal noun; tabel menandai “no passive (?)”',
		dataId: 'احمر-IX-1',
		checked: '25 Nov 2026'
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
	},
	{
		id: 'part-25',
		pairId: 'saada',
		kind: 'role',
		arabic: 'سَاعَدَ الْمُعَلِّمُ الطُّلَّابَ.',
		question: 'Tentukan fi‘il, fā‘il dan maf‘ūl bih.',
		answer:
			'سَاعَدَ adalah fi‘il māḍī Form III (ia membantu). الْمُعَلِّمُ adalah fā‘il marfū‘, dan الطُّلَّابَ adalah maf‘ūl bih manṣūb: guru itu membantu para siswa.',
		status: 'draft'
	},
	{
		id: 'part-26',
		pairId: 'saada',
		kind: 'formation',
		arabic: 'يُسَاعِدُ / مُسَاعِدٌ / مُسَاعَدٌ',
		question: 'Apa yang membedakan dua isim Form III ini?',
		answer:
			'Keduanya berawalan مُـ dan alif tetap ada sesudah س. Kasrah pada ع menghasilkan isim fā‘il (yang membantu), fatḥah menghasilkan isim maf‘ūl (yang dibantu).',
		status: 'draft'
	},
	{
		id: 'part-27',
		pairId: 'saada',
		kind: 'agreement',
		arabic: 'قَابَلْتُ مُسَاعِدَ الْمُدِيرِ.',
		question: 'Mengapa مُسَاعِدَ berfatḥah dan الْمُدِيرِ berkasrah?',
		answer:
			'قَابَلْتُ memiliki tā’ sebagai fā‘il. مُسَاعِدَ adalah maf‘ūl bih manṣūb sekaligus muḍāf, dan الْمُدِيرِ adalah muḍāf ilaih majrūr: saya menemui asisten direktur.',
		status: 'draft'
	},
	{
		id: 'part-28',
		pairId: 'saada',
		kind: 'meaning',
		arabic: 'شُكْرًا عَلَى الْمُسَاعَدَةِ.',
		question: 'Apakah الْمُسَاعَدَةِ di sini isim maf‘ūl feminin?',
		answer:
			'Bukan. Di sini ia maṣdar (bantuan) yang majrūr setelah عَلَى. Isim maf‘ūl feminin Form III tertulis sama, sehingga konteks yang membedakan: terima kasih atas bantuan.',
		status: 'draft'
	},
	{
		id: 'part-29',
		pairId: 'taallama',
		kind: 'formation',
		arabic: 'تَعَلَّمَ / يَتَعَلَّمُ / مُتَعَلِّمٌ / مُتَعَلَّمٌ',
		question: 'Bagaimana membedakan pelajar dari hal yang dipelajari?',
		answer:
			'Form V berawalan تَـ dan huruf ل bershadda. Pada isim memakai مُتَـ: kasrah pada ل menghasilkan مُتَعَلِّمٌ (yang belajar), fatḥah menghasilkan مُتَعَلَّمٌ (yang dipelajari).',
		status: 'draft'
	},
	{
		id: 'part-30',
		pairId: 'taallama',
		kind: 'role',
		arabic: 'الْمُتَعَلِّمُ يَقْرَأُ الدَّرْسَ.',
		question: 'Apa fungsi الْمُتَعَلِّمُ dan apa khabarnya?',
		answer:
			'الْمُتَعَلِّمُ adalah isim fā‘il yang menjadi mubtada marfū‘. Klausa يَقْرَأُ الدَّرْسَ adalah khabar: pelajar itu membaca pelajaran.',
		status: 'draft'
	},
	{
		id: 'part-31',
		pairId: 'taallama',
		kind: 'meaning',
		arabic: 'تَعَلَّمْتُ الْعَرَبِيَّةَ فِي الْمَدْرَسَةِ.',
		question: 'Apa arti تَعَلَّمْتُ, dan apa objeknya?',
		answer:
			'Saya mempelajari bahasa Arab di sekolah. تَعَلَّمْتُ adalah fi‘il māḍī Form V dengan tā’ sebagai fā‘il, dan الْعَرَبِيَّةَ adalah maf‘ūl bih manṣūb.',
		status: 'draft'
	},
	{
		id: 'part-32',
		pairId: 'taallama',
		kind: 'agreement',
		arabic: 'الدُّرُوسُ الْمُتَعَلَّمَةُ مُفِيدَةٌ.',
		question: 'Mengapa الْمُتَعَلَّمَةُ berbentuk feminin tunggal?',
		answer:
			'الدُّرُوسُ adalah jamak benda tak berakal, sehingga na‘at dan khabarnya lazim feminin tunggal. الْمُتَعَلَّمَةُ adalah isim maf‘ūl (yang dipelajari) dan مُفِيدَةٌ adalah khabar.',
		status: 'draft'
	},
	{
		id: 'part-33',
		pairId: 'tabadala',
		kind: 'formation',
		arabic: 'تَبَادَلَ / يَتَبَادَلُ / مُتَبَادِلٌ / مُتَبَادَلٌ',
		question: 'Apa ciri pola Form VI dan makna yang sering menyertainya?',
		answer:
			'Form VI berpola تَفَاعَلَ: awalan تَـ dan alif sesudah radikal pertama, sering bermakna saling. Kasrah pada د menghasilkan isim fā‘il, fatḥah menghasilkan isim maf‘ūl.',
		status: 'draft'
	},
	{
		id: 'part-34',
		pairId: 'tabadala',
		kind: 'role',
		arabic: 'تَبَادَلَ الْفَرِيقَانِ الْهَدَايَا.',
		question: 'Tentukan fā‘il dan maf‘ūl bih.',
		answer:
			'الْفَرِيقَانِ adalah fā‘il marfū‘ dengan alif karena mutsannā. الْهَدَايَا adalah maf‘ūl bih manṣūb dengan fatḥah muqaddarah: kedua tim saling bertukar hadiah.',
		status: 'draft'
	},
	{
		id: 'part-35',
		pairId: 'tabadala',
		kind: 'meaning',
		arabic: 'الِاحْتِرَامُ الْمُتَبَادَلُ أَسَاسُ الصَّدَاقَةِ.',
		question: 'Bagaimana memaknai الْمُتَبَادَلُ di sini?',
		answer:
			'Timbal balik atau saling. Bentuk isim maf‘ūl Form VI ini lazim dipakai sebagai sifat bermakna saling. الْمُتَبَادَلُ adalah na‘at untuk الِاحْتِرَامُ.',
		status: 'draft'
	},
	{
		id: 'part-36',
		pairId: 'tabadala',
		kind: 'agreement',
		arabic: 'الْعَلَاقَةُ مُتَبَادَلَةٌ.',
		question: 'Mengapa مُتَبَادَلَةٌ memakai tā’ marbūṭah dan tanwin ḍammah?',
		answer:
			'Ia khabar yang marfū‘ dan nakirah, serta mengikuti الْعَلَاقَةُ yang feminin tunggal: hubungan itu timbal balik.',
		status: 'draft'
	},
	{
		id: 'part-37',
		pairId: 'inqataa',
		kind: 'formation',
		arabic: 'اِنْقَطَعَ / يَنْقَطِعُ / مُنْقَطِعٌ',
		question: 'Mengapa contoh ini tidak memuat isim maf‘ūl?',
		answer:
			'Form VII اِنْفَعَلَ menyatakan keadaan yang terjadi pada subjeknya dan tidak membawa objek, sehingga isim maf‘ūl mandiri tidak lazim. Yang dipakai ialah مُنْقَطِعٌ (yang terputus).',
		status: 'draft'
	},
	{
		id: 'part-38',
		pairId: 'inqataa',
		kind: 'role',
		arabic: 'اِنْقَطَعَتِ الْكَهْرَبَاءُ عَنِ الْمَدِينَةِ.',
		question: 'Apa fā‘il kalimat ini dan mengapa fi‘ilnya berakhir tā’?',
		answer:
			'الْكَهْرَبَاءُ adalah fā‘il marfū‘ dan dianggap feminin, jadi fi‘ilnya memakai tā’ ta’nīth. Tā’ itu dibaca kasrah sebelum الْ. عَنِ الْمَدِينَةِ adalah jar–majrūr.',
		status: 'draft'
	},
	{
		id: 'part-39',
		pairId: 'inqataa',
		kind: 'meaning',
		arabic: 'الِاتِّصَالُ مُنْقَطِعٌ بِسَبَبِ الْعَاصِفَةِ.',
		question: 'Apakah kalimat ini menyebut kejadian atau keadaan?',
		answer:
			'Keadaan. مُنْقَطِعٌ adalah khabar yang menyatakan sambungan itu terputus, dan بِسَبَبِ الْعَاصِفَةِ memberi alasan: sambungan terputus karena badai.',
		status: 'draft'
	},
	{
		id: 'part-40',
		pairId: 'inqataa',
		kind: 'agreement',
		arabic: 'أَصْلَحْنَا خُطُوطًا مُنْقَطِعَةً.',
		question: 'Mengapa مُنْقَطِعَةً feminin dan berfatḥatain?',
		answer:
			'Ia na‘at untuk خُطُوطًا, jamak benda tak berakal yang diikuti sifat feminin tunggal. Keduanya nakirah dan manṣūb karena خُطُوطًا adalah maf‘ūl bih: kami memperbaiki saluran-saluran yang terputus.',
		status: 'draft'
	},
	{
		id: 'part-41',
		pairId: 'intazara',
		kind: 'formation',
		arabic: 'اِنْتَظَرَ / يَنْتَظِرُ / مُنْتَظِرٌ / مُنْتَظَرٌ',
		question: 'Di mana huruf tambahan Form VIII, dan harakat mana yang membedakan isimnya?',
		answer:
			'Form VIII berpola اِفْتَعَلَ: تـ disisipkan sesudah radikal pertama ن. Kasrah pada ظ menghasilkan مُنْتَظِرٌ (yang menunggu), fatḥah menghasilkan مُنْتَظَرٌ (yang ditunggu).',
		status: 'draft'
	},
	{
		id: 'part-42',
		pairId: 'intazara',
		kind: 'role',
		arabic: 'اِنْتَظَرَ الْمُسَافِرُونَ الْحَافِلَةَ.',
		question: 'Tentukan fā‘il dan maf‘ūl bih serta tandanya.',
		answer:
			'الْمُسَافِرُونَ adalah fā‘il marfū‘ dengan wāw sebagai tanda jamak mudhakkar sālim. الْحَافِلَةَ adalah maf‘ūl bih manṣūb: para penumpang menunggu bus.',
		status: 'draft'
	},
	{
		id: 'part-43',
		pairId: 'intazara',
		kind: 'meaning',
		arabic: 'الضَّيْفُ الْمُنْتَظَرُ وَصَلَ.',
		question: 'Apakah الْمُنْتَظَرُ berarti yang menunggu atau yang ditunggu?',
		answer:
			'Yang ditunggu, karena fatḥah pada ظ menandai isim maf‘ūl. الْمُنْتَظَرُ adalah na‘at untuk الضَّيْفُ, dan وَصَلَ adalah khabar: tamu yang ditunggu sudah tiba.',
		status: 'draft'
	},
	{
		id: 'part-44',
		pairId: 'intazara',
		kind: 'agreement',
		arabic: 'رَأَيْتُ الْمُنْتَظِرِينَ أَمَامَ الْمَكْتَبِ.',
		question: 'Mengapa الْمُنْتَظِرِينَ berakhir ـِينَ?',
		answer:
			'Ia maf‘ūl bih manṣūb dari رَأَيْتُ. Jamak mudhakkar sālim memakai yā’ sebelum nūn pada kedudukan naṣb dan jarr: saya melihat orang-orang yang menunggu di depan kantor.',
		status: 'draft'
	},
	{
		id: 'part-45',
		pairId: 'ikhtara',
		kind: 'formation',
		arabic: 'اِخْتَارَ / يَخْتَارُ / مُخْتَارٌ',
		question: 'Apa yang khas pada isim fā‘il dan isim maf‘ūl dari akar ajwaf ini?',
		answer:
			'Keduanya tertulis sama, مُخْتَارٌ. Yā’ akar (خ ي ر) muncul sebagai vokal panjang, sehingga kasrah dan fatḥah yang membedakan aktif dan pasif tidak terlihat. Konteks yang menentukan.',
		status: 'draft'
	},
	{
		id: 'part-46',
		pairId: 'ikhtara',
		kind: 'meaning',
		arabic: 'الْكِتَابُ مُخْتَارٌ لِلْمُسَابَقَةِ.',
		question: 'Aktif atau pasif, dan apa petunjuknya?',
		answer:
			'Pasif: buku itu dipilih untuk lomba. Petunjuknya makna, bukan bentuk: buku tidak dapat memilih, jadi مُخْتَارٌ di sini bermakna yang dipilih. Bentuk aktif dan pasifnya sama. Ia khabar dari الْكِتَابُ.',
		status: 'draft'
	},
	{
		id: 'part-47',
		pairId: 'ikhtara',
		kind: 'agreement',
		arabic: 'الْكِتَابُ الْمُخْتَارُ عَلَى الطَّاوِلَةِ.',
		question: 'Apa fungsi الْمُخْتَارُ dan mengapa maknanya pasif?',
		answer:
			'الْمُخْتَارُ adalah na‘at yang mengikuti الْكِتَابُ dalam raf‘ dan ketakrifan. Buku tidak memilih, jadi maknanya yang dipilih. عَلَى الطَّاوِلَةِ adalah khabar.',
		status: 'draft'
	},
	{
		id: 'part-48',
		pairId: 'ikhtara',
		kind: 'role',
		arabic: 'اِخْتِيَارُ الْمَوْضُوعِ صَعْبٌ.',
		question: 'Apakah اِخْتِيَارُ isim fā‘il atau isim maf‘ūl?',
		answer:
			'Bukan keduanya. اِخْتِيَارُ adalah maṣdar yang menjadi mubtada, الْمَوْضُوعِ adalah muḍāf ilaih, dan صَعْبٌ adalah khabar: memilih topik itu sulit.',
		status: 'draft'
	},
	{
		id: 'part-49',
		pairId: 'ittasala',
		kind: 'formation',
		arabic: 'اِتَّصَلَ / يَتَّصِلُ / اِتِّصَالٌ / مُتَّصِلٌ',
		question: 'Mengapa verba ini tidak berbentuk اِوْتَصَلَ?',
		answer:
			'Akar و ص ل adalah mithāl. Pada Form VIII, wāw akar berubah menjadi tā’ dan melebur dengan tā’ sisipan, sehingga muncul satu tā’ bershadda. Isim fā‘il-nya مُتَّصِلٌ.',
		status: 'draft'
	},
	{
		id: 'part-50',
		pairId: 'ittasala',
		kind: 'role',
		arabic: 'اِتَّصَلَ الْمُدِيرُ بِالْمُوَظَّفَةِ.',
		question: 'Apa fā‘il dan fungsi بِالْمُوَظَّفَةِ?',
		answer:
			'الْمُدِيرُ adalah fā‘il marfū‘. بِالْمُوَظَّفَةِ adalah jar–majrūr yang melengkapi اِتَّصَلَ: direktur menghubungi karyawati itu.',
		status: 'draft'
	},
	{
		id: 'part-51',
		pairId: 'ittasala',
		kind: 'meaning',
		arabic: 'الْجِهَازُ مُتَّصِلٌ بِالشَّبَكَةِ.',
		question: 'Apakah kalimat ini menyatakan tindakan atau keadaan?',
		answer:
			'Keadaan: perangkat itu terhubung dengan jaringan. مُتَّصِلٌ adalah khabar dan بِالشَّبَكَةِ melengkapi maknanya.',
		status: 'draft'
	},
	{
		id: 'part-52',
		pairId: 'ittasala',
		kind: 'agreement',
		arabic: 'الْخُطُوطُ مُتَّصِلَةٌ بِالْمَحَطَّةِ.',
		question: 'Mengapa مُتَّصِلَةٌ feminin tunggal?',
		answer:
			'الْخُطُوطُ adalah jamak benda tak berakal, sehingga khabarnya lazim feminin tunggal: jalur-jalur itu tersambung ke stasiun.',
		status: 'draft'
	},
	{
		id: 'part-53',
		pairId: 'istaqbala',
		kind: 'formation',
		arabic: 'اِسْتَقْبَلَ / يَسْتَقْبِلُ / مُسْتَقْبِلٌ / مُسْتَقْبَلٌ',
		question: 'Bagaimana Form X membentuk dua isimnya?',
		answer:
			'Form X berpola اِسْتَفْعَلَ. Pada isim, اِسْتَـ menjadi مُسْتَـ; kasrah pada ب menghasilkan مُسْتَقْبِلٌ (penyambut), fatḥah menghasilkan مُسْتَقْبَلٌ.',
		status: 'draft'
	},
	{
		id: 'part-54',
		pairId: 'istaqbala',
		kind: 'role',
		arabic: 'اِسْتَقْبَلَتِ الْمُدِيرَةُ الضُّيُوفَ.',
		question: 'Tentukan fā‘il dan maf‘ūl bih.',
		answer:
			'الْمُدِيرَةُ adalah fā‘il marfū‘ dan الضُّيُوفَ adalah maf‘ūl bih manṣūb. Tā’ pada fi‘il dibaca kasrah sebelum الْ: direktur perempuan itu menyambut para tamu.',
		status: 'draft'
	},
	{
		id: 'part-55',
		pairId: 'istaqbala',
		kind: 'meaning',
		arabic: 'نَدْرُسُ الْيَوْمَ لِلْمُسْتَقْبَلِ.',
		question: 'Apa arti الْمُسْتَقْبَلِ di sini?',
		answer:
			'Masa depan. Bentuknya sama dengan isim maf‘ūl Form X, tetapi dipakai sebagai kata benda tersendiri, bukan “yang disambut”. Ia majrūr setelah لِـ.',
		status: 'draft'
	},
	{
		id: 'part-56',
		pairId: 'istaqbala',
		kind: 'agreement',
		arabic: 'الْمُسْتَقْبِلُونَ يَنْتَظِرُونَ الْوَفْدَ.',
		question: 'Apa bentuk dan fungsi الْمُسْتَقْبِلُونَ, dan apa khabarnya?',
		answer:
			'Isim fā‘il jamak mudhakkar sālim (para penyambut), marfū‘ dengan wāw, sebagai mubtada. Klausa يَنْتَظِرُونَ الْوَفْدَ adalah khabar, dan الْوَفْدَ adalah maf‘ūl bih manṣūb: para penyambut menunggu delegasi.',
		status: 'draft'
	},
	{
		id: 'part-57',
		pairId: 'ihmarra',
		kind: 'formation',
		arabic: 'اِحْمَرَّ / يَحْمَرُّ / اِحْمِرَارٌ / مُحْمَرٌّ',
		question: 'Apa ciri Form IX dan mengapa tidak ada isim maf‘ūl?',
		answer:
			'Form IX berpola اِفْعَلَّ untuk warna atau cacat, dengan radikal ketiga (ر) digandakan sehingga bershadda. Verbanya intransitif sehingga isim maf‘ūl mandiri tidak lazim; isim fā‘il-nya مُحْمَرٌّ.',
		status: 'draft'
	},
	{
		id: 'part-58',
		pairId: 'ihmarra',
		kind: 'role',
		arabic: 'اِحْمَرَّ وَجْهُ الطِّفْلِ مِنَ الْحَرِّ.',
		question: 'Tentukan fi‘il, fā‘il dan keterangan sebab.',
		answer:
			'اِحْمَرَّ adalah fi‘il māḍī Form IX. وَجْهُ adalah fā‘il marfū‘ sekaligus muḍāf, الطِّفْلِ adalah muḍāf ilaih, dan مِنَ الْحَرِّ adalah jar–majrūr yang menyatakan sebab.',
		status: 'draft'
	},
	{
		id: 'part-59',
		pairId: 'ihmarra',
		kind: 'meaning',
		arabic: 'وَجْهُهَا مُحْمَرٌّ مِنَ الْخَجَلِ.',
		question: 'Mengapa dipakai مُحْمَرٌّ dan bukan أَحْمَرُ?',
		answer:
			'مُحْمَرٌّ menyatakan keadaan memerah akibat suatu sebab (di sini malu), dari verba اِحْمَرَّ. أَحْمَرُ adalah sifat warna dasar. وَجْهُهَا adalah mubtada dan مُحْمَرٌّ khabarnya.',
		status: 'draft'
	},
	{
		id: 'part-60',
		pairId: 'ihmarra',
		kind: 'agreement',
		arabic: 'الْعُيُونُ مُحْمَرَّةٌ بَعْدَ السَّهَرِ.',
		question: 'Mengapa مُحْمَرَّةٌ berbentuk feminin tunggal?',
		answer:
			'الْعُيُونُ adalah jamak benda tak berakal, sehingga khabarnya lazim feminin tunggal. بَعْدَ السَّهَرِ menyatakan waktu: mata itu memerah sesudah begadang.',
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
		text: 'Untuk verba Form I ṣaḥīḥ yang cocok, pola umum adalah فَاعِلٌ dan مَفْعُولٌ. Pada Form II sampai X, isim fā‘il dan isim maf‘ūl berawalan مُـ (dengan tambahan tā’ pada Form V dan VI, nūn pada VII, tā’ sisipan pada VIII dan sīn–tā’ pada X). Pada contoh ṣaḥīḥ Form II sampai X di bawah, bentuk aktif memakai kasrah sebelum radikal terakhir dan bentuk pasif memakai fatḥah; مُخْتَارٌ (ajwaf) dan مُحْمَرٌّ (Form IX) tidak menampakkan kasrah itu. Jangan mengganti vokal tanpa memperhatikan pola dan jenis akar.',
		sourceId: 'passive'
	},
	{
		title: 'Batas pola: akar lemah dan transitivitas',
		text: 'Akar ajwaf seperti ب ي ع mempunyai perubahan bentuk: بَائِعٌ dan مَبِيعٌ. Pada Form VIII, wāw akar mithāl و ص ل melebur dengan tā’ sisipan sehingga menjadi اِتَّصَلَ, dan akar ajwaf خ ي ر menghasilkan مُخْتَارٌ untuk aktif maupun pasif. Bentuk pasif yang biasa dipakai bergantung pada transitivitas dan konteks; jangan menganggap setiap verba memiliki bentuk pasif mandiri yang lazim. Gunakan entri kamus.',
		sourceId: 'passive'
	},
	{
		title: 'Bentuk yang tidak lazim',
		text: 'Verba intransitif seperti اِنْقَطَعَ (Form VII) dan اِحْمَرَّ (Form IX) umumnya tidak memiliki isim maf‘ūl mandiri. Halaman ini menandainya “tidak lazim” dan tidak memberi contoh. Verba yang objeknya memakai huruf jar, seperti اِتَّصَلَ بِـ, hanya mempunyai bentuk pasif impersonal (الْمُتَّصَلُ بِهِ) yang tidak dicontohkan di sini. Kamus tidak selalu mencatat setiap bentuk pasif, dan sebuah tabel yang memuat bentuk belum membuktikan bahwa bentuk itu dipakai.',
		sourceId: 'passive'
	},
	{
		title: 'I‘rab, gender dan makna dalam konteks',
		text: 'Bentuk turunan yang menerangkan isim mengikuti kaidah na‘at; ketika menjadi khabar atau muḍāf ilaih, akhir katanya mengikuti kedudukan itu. Jamak benda tak berakal lazim memakai sifat feminin tunggal. Bentuk yang sama bisa menjadi nama profesi atau menyatakan keadaan, tanpa menandai kala tertentu.',
		sourceId: 'contrast'
	}
] as const;
