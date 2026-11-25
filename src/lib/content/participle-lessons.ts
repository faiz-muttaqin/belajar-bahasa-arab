/** OER-02b: sourced forms; original teaching text and exercises remain draft. */
import { rulePrerequisites } from './g02-types.js';

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
	},
	{
		id: 'wiktionary',
		title: 'English Wiktionary · tabel konjugasi verba Arab',
		url: 'https://kaikki.org/dictionary/Arabic/',
		section:
			'Baris verba menurut ID pada kolom dataId; data/wiktionary/verbs-form-i.json dan verbs-mazid.json',
		author: 'Kontributor Wiktionary (ekstrak kaikki.org)',
		license: 'CC BY-SA 4.0 dan GFDL · tabel verba'
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
		wazanBab: 1,
		ruleId: 'g02.participle-pola',
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
		wazanBab: 3,
		ruleId: 'g02.participle-pola',
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
		wazanBab: 7,
		ruleId: 'g02.participle-pola',
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
		wazanBab: 9,
		ruleId: 'g02.participle-pola',
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
		wazanBab: 15,
		ruleId: 'g02.participle-pola',
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
		wazanBab: 2,
		ruleId: 'g02.participle-batas-pola',
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
		wazanBab: 8,
		ruleId: 'g02.participle-pola',
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
		wazanBab: 11,
		ruleId: 'g02.participle-pola',
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
		wazanBab: 10,
		ruleId: 'g02.participle-pola',
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
		wazanBab: 13,
		ruleId: 'g02.participle-tidak-lazim',
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
		wazanBab: 12,
		ruleId: 'g02.participle-pola',
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
		wazanBab: 12,
		ruleId: 'g02.participle-batas-pola',
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
		wazanBab: 12,
		ruleId: 'g02.participle-batas-pola',
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
		wazanBab: 15,
		ruleId: 'g02.participle-pola',
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
		wazanBab: 14,
		ruleId: 'g02.participle-tidak-lazim',
		checked: '25 Nov 2026'
	},
	{
		id: 'daa',
		form: 'I',
		rootKind: 'نَاقِصٌ',
		verb: 'دَعَا',
		present: 'يَدْعُو',
		masdar: 'دُعَاءٌ',
		active: 'دَاعٍ',
		passive: 'مَدْعُوٌّ',
		meaning: 'memanggil; mengundang',
		masdarMeaning: 'seruan; doa (juga دَعْوَةٌ: undangan)',
		activeMeaning: 'yang memanggil; pengundang',
		passiveMeaning: 'yang diundang',
		note: 'Nāqiṣ wāwī (د ع و): wāw akhir menjadi alif pada دَعَا dan tetap tampak pada يَدْعُو. Isim fā‘il دَاعٍ: wāw akar menjadi yā’ karena kasrah sebelumnya, lalu yā’ itu tidak tertulis pada nakirah marfū‘ dan majrūr. Pada مَدْعُوٌّ, wāw pola مَفْعُولٌ dan wāw akar bertemu menjadi satu wāw bershadda. Maṣdar tidak dapat ditebak dari pola: دُعَاءٌ dan دَعْوَةٌ sama-sama tercatat.',
		source: 'https://en.wiktionary.org/wiki/دعا#Arabic',
		section: 'Arabic — Conjugation of دَعَا (Form I), active/passive participle, verbal nouns',
		dataId: 'دعا-1',
		wazanBab: 1,
		ruleId: 'g02.akar-naqis',
		checked: '25 Nov 2026'
	},
	{
		id: 'banaa',
		form: 'I',
		rootKind: 'نَاقِصٌ',
		verb: 'بَنَى',
		present: 'يَبْنِي',
		masdar: 'بِنَاءٌ',
		active: 'بَانٍ',
		passive: 'مَبْنِيٌّ',
		meaning: 'membangun; mendirikan',
		masdarMeaning: 'pembangunan; bangunan',
		activeMeaning: 'pembangun',
		passiveMeaning: 'yang dibangun',
		note: 'Nāqiṣ yā’ī (ب ن ي): yā’ akhir menjadi alif pada بَنَى dan tetap tampak pada يَبْنِي. Pada maṣdar بِنَاءٌ, yā’ yang sesudah alif menjadi hamzah. Isim fā‘il بَانٍ kehilangan yā’ tertulis pada nakirah marfū‘ dan majrūr. Pada مَبْنِيٌّ, wāw pola مَفْعُولٌ berubah menjadi yā’ lalu melebur dengan yā’ akar.',
		source: 'https://en.wiktionary.org/wiki/بنى#Arabic',
		section: 'Arabic — Conjugation of بَنَى (Form I), active/passive participle, verbal nouns',
		dataId: 'بنى-1',
		wazanBab: 2,
		ruleId: 'g02.akar-naqis',
		checked: '25 Nov 2026'
	},
	{
		id: 'waqaa',
		form: 'I',
		rootKind: 'لَفِيفٌ مَفْرُوقٌ',
		verb: 'وَقَى',
		present: 'يَقِي',
		masdar: 'وِقَايَةٌ',
		active: 'وَاقٍ',
		passive: 'مَوْقِيٌّ',
		meaning: 'melindungi; menjaga dari',
		masdarMeaning: 'perlindungan; pencegahan',
		activeMeaning: 'yang melindungi; pelindung',
		passiveMeaning: 'yang dilindungi',
		note: 'Lafīf mafrūq (و ق ي): wāw dan yā’ dipisahkan oleh huruf sehat ق. Wāw awal gugur pada muḍāri‘ (يَقِي), yā’ akhir menjadi alif pada وَقَى, dan isim fā‘il وَاقٍ kehilangan yā’ tertulis pada nakirah marfū‘ dan majrūr. Verba ini berpola فَعَلَ يَفْعِلُ (seperti بَنَى يَبْنِي); wāw awalnya gugur pada muḍāri‘. Data kelompok wazan situs ini belum mengklasifikasikannya, sehingga tautan menuju “Bab belum diketahui”.',
		source: 'https://en.wiktionary.org/wiki/وقى#Arabic',
		section: 'Arabic — Conjugation of وَقَى (Form I), active/passive participle, verbal nouns',
		dataId: 'وقى-1',
		wazanBab: 0,
		ruleId: 'g02.akar-lafif',
		checked: '25 Nov 2026'
	},
	{
		id: 'rawaa',
		form: 'I',
		rootKind: 'لَفِيفٌ مَقْرُونٌ',
		verb: 'رَوَى',
		present: 'يَرْوِي',
		masdar: 'رِوَايَةٌ',
		active: 'رَاوٍ',
		passive: 'مَرْوِيٌّ',
		meaning: 'menceritakan; meriwayatkan',
		masdarMeaning: 'penuturan; riwayat',
		activeMeaning: 'penutur; periwayat',
		passiveMeaning: 'yang diriwayatkan',
		note: 'Lafīf maqrūn (ر و ي): dua huruf lemah berurutan, wāw lalu yā’. Yā’ akhir menjadi alif pada رَوَى, sedangkan wāw tengah tetap tampak di semua bentuk. Pada maṣdar رِوَايَةٌ yā’ tertulis karena disusul tā’ marbūṭah (bandingkan بِنَاءٌ). Isim fā‘il رَاوٍ kehilangan yā’ tertulis pada nakirah marfū‘ dan majrūr.',
		source: 'https://en.wiktionary.org/wiki/روى#Arabic',
		section: 'Arabic — Conjugation of رَوَى (Form I), active/passive participle, verbal noun',
		dataId: 'روى-1',
		wazanBab: 2,
		ruleId: 'g02.akar-lafif',
		checked: '25 Nov 2026'
	},
	{
		id: 'akhadha',
		form: 'I',
		rootKind: 'مَهْمُوزٌ',
		verb: 'أَخَذَ',
		present: 'يَأْخُذُ',
		masdar: 'أَخْذٌ',
		active: 'آخِذٌ',
		passive: 'مَأْخُوذٌ',
		meaning: 'mengambil',
		masdarMeaning: 'pengambilan',
		activeMeaning: 'yang mengambil',
		passiveMeaning: 'yang diambil',
		note: 'Mahmūz fā’ (أ خ ذ): hamzah akar adalah huruf pertama. Pada isim fā‘il, hamzah akar dan alif pola فَاعِلٌ bertemu dan ditulis sebagai alif madd (آخِذٌ, bukan أَاخِذٌ). Wiktionary juga mencatat مَأْخَذٌ sebagai maṣdar kedua, dan perintah خُذْ yang kehilangan hamzahnya.',
		source: 'https://en.wiktionary.org/wiki/أخذ#Arabic',
		section: 'Arabic — Conjugation of أَخَذَ (Form I), active/passive participle, verbal noun',
		dataId: 'أخذ-1',
		wazanBab: 1,
		ruleId: 'g02.akar-mahmuz',
		checked: '25 Nov 2026'
	},
	{
		id: 'saala',
		form: 'I',
		rootKind: 'مَهْمُوزٌ',
		verb: 'سَأَلَ',
		present: 'يَسْأَلُ',
		masdar: 'سُؤَالٌ',
		active: 'سَائِلٌ',
		passive: 'مَسْؤُولٌ',
		meaning: 'bertanya; meminta',
		masdarMeaning: 'pertanyaan; permintaan',
		activeMeaning: 'penanya; peminta',
		passiveMeaning: 'yang ditanya; yang dimintai',
		note: 'Mahmūz ‘ain (س أ ل): hamzah di tengah akar. Kursi hamzah mengikuti harakat: pada سَائِلٌ hamzah berkasrah sesudah alif sehingga ditulis di atas yā’; pada مَسْؤُولٌ hamzah berḍammah sesudah sukun sehingga ditulis di atas wāw. Bentuk مَسْؤُولٌ juga lazim sebagai kata benda “penanggung jawab” (periksa entri مسؤول; ini bukan baris tabel verba).',
		source: 'https://en.wiktionary.org/wiki/سأل#Arabic',
		section: 'Arabic — Conjugation of سَأَلَ (Form I), active/passive participle, verbal nouns',
		dataId: 'سأل-1',
		wazanBab: 3,
		ruleId: 'g02.akar-mahmuz',
		checked: '25 Nov 2026'
	},
	{
		id: 'qaraa',
		form: 'I',
		rootKind: 'مَهْمُوزٌ',
		verb: 'قَرَأَ',
		present: 'يَقْرَأُ',
		masdar: 'قِرَاءَةٌ',
		active: 'قَارِئٌ',
		passive: 'مَقْرُوءٌ',
		meaning: 'membaca',
		masdarMeaning: 'pembacaan; kegiatan membaca',
		activeMeaning: 'pembaca',
		passiveMeaning: 'yang dibaca',
		note: 'Mahmūz lām (ق ر أ): hamzah di akhir akar. Kursi hamzah berganti menurut huruf sebelumnya: di atas yā’ pada قَارِئٌ (huruf sebelumnya, ر, berkasrah), di atas garis pada مَقْرُوءٌ dan قِرَاءَةٌ (sesudah huruf mad). Wiktionary juga mencatat قُرْآنٌ sebagai maṣdar lain.',
		source: 'https://en.wiktionary.org/wiki/قرأ#Arabic',
		section: 'Arabic — Conjugation of قَرَأَ (Form I), active/passive participle, verbal nouns',
		dataId: 'قرأ-1',
		wazanBab: 3,
		ruleId: 'g02.akar-mahmuz',
		checked: '25 Nov 2026'
	},
	{
		id: 'madda',
		form: 'I',
		rootKind: 'مُضَاعَفٌ',
		verb: 'مَدَّ',
		present: 'يَمُدُّ',
		masdar: 'مَدٌّ',
		active: 'مَادٌّ',
		passive: 'مَمْدُودٌ',
		meaning: 'membentangkan; memperpanjang',
		masdarMeaning: 'pembentangan; perpanjangan',
		activeMeaning: 'yang membentangkan',
		passiveMeaning: 'yang dibentangkan',
		note: 'Muḍā‘af (م د د): radikal kedua dan ketiga sama. Keduanya melebur menjadi satu د bershadda pada مَدَّ, يَمُدُّ dan مَادٌّ. Pada مَمْدُودٌ ada wāw di antara dua د, sehingga keduanya tertulis terpisah.',
		source: 'https://en.wiktionary.org/wiki/مد#Arabic',
		section: 'Arabic — Conjugation of مَدَّ (Form I), active/passive participle, verbal noun',
		dataId: 'مد-1',
		wazanBab: 1,
		ruleId: 'g02.akar-mudaaf',
		checked: '25 Nov 2026'
	},
	{
		id: 'istamarra',
		form: 'X',
		rootKind: 'مُضَاعَفٌ',
		verb: 'اِسْتَمَرَّ',
		present: 'يَسْتَمِرُّ',
		masdar: 'اِسْتِمْرَارٌ',
		active: 'مُسْتَمِرٌّ',
		passive: null,
		meaning: 'berlanjut; terus berlangsung',
		masdarMeaning: 'kelanjutan; kesinambungan',
		activeMeaning: 'yang berlanjut; berkelanjutan',
		passiveMeaning: 'tidak lazim',
		note: 'Muḍā‘af Form X اِسْتَفْعَلَ (م ر ر): dua ر melebur menjadi satu ر bershadda pada māḍī, muḍāri‘ dan isim fā‘il; pada maṣdar اِسْتِمْرَارٌ keduanya terpisah oleh alif. Dalam contoh di sini verba ini dipakai tanpa objek, jadi isim maf‘ūl mandiri tidak dicontohkan.',
		source: 'https://en.wiktionary.org/wiki/استمر#Arabic',
		section:
			'Arabic — Conjugation of اِسْتَمَرَّ (Form X), active participle, verbal noun; tabel memuat مُسْتَمَرٌّ yang tidak dipakai sebagai contoh',
		dataId: 'استمر-X-1',
		wazanBab: 15,
		ruleId: 'g02.akar-mudaaf',
		checked: '25 Nov 2026'
	},
	{
		id: 'tarjama',
		form: 'Iq',
		rootKind: 'رُبَاعِيٌّ صَحِيحٌ',
		verb: 'تَرْجَمَ',
		present: 'يُتَرْجِمُ',
		masdar: 'تَرْجَمَةٌ',
		active: 'مُتَرْجِمٌ',
		passive: 'مُتَرْجَمٌ',
		meaning: 'menerjemahkan',
		masdarMeaning: 'penerjemahan; terjemahan',
		activeMeaning: 'penerjemah',
		passiveMeaning: 'yang diterjemahkan',
		note: 'Rubā‘ī mujarrad فَعْلَلَ: empat huruf akar (ت ر ج م), sehingga tā’ pertama adalah huruf akar, bukan awalan seperti pada Form V. Muḍāri‘ memakai يُـ, isim fā‘il dan isim maf‘ūl memakai مُـ dengan kasrah atau fatḥah pada radikal ketiga (ج). Maṣdar berpola فَعْلَلَةٌ.',
		source: 'https://en.wiktionary.org/wiki/ترجم#Arabic',
		section: 'Arabic — Conjugation of تَرْجَمَ (Form Iq), active/passive participle, verbal noun',
		dataId: 'ترجم-Iq-1',
		wazanBab: 19,
		ruleId: 'g02.ruba-i-mujarrad',
		checked: '25 Nov 2026'
	},
	{
		id: 'tadahraja',
		form: 'IIq',
		rootKind: 'رُبَاعِيٌّ صَحِيحٌ',
		verb: 'تَدَحْرَجَ',
		present: 'يَتَدَحْرَجُ',
		masdar: 'تَدَحْرُجٌ',
		active: 'مُتَدَحْرِجٌ',
		passive: null,
		meaning: 'menggelinding',
		masdarMeaning: 'gerak menggelinding',
		activeMeaning: 'yang menggelinding',
		passiveMeaning: 'tidak lazim',
		note: 'Rubā‘ī mazīd تَفَعْلَلَ (د ح ر ج): tā’ awal adalah awalan pola, bukan huruf akar (bandingkan تَرْجَمَ). Verba ini intransitif, sehingga isim maf‘ūl mandiri tidak lazim. Maṣdar berpola تَفَعْلُلٌ.',
		source: 'https://en.wiktionary.org/wiki/تدحرج#Arabic',
		section:
			'Arabic — Conjugation of تَدَحْرَجَ (Form IIq), active participle, verbal noun; tabel memuat مُتَدَحْرَجٌ yang tidak dipakai sebagai contoh',
		dataId: 'تدحرج-IIq-1',
		wazanBab: 20,
		ruleId: 'g02.ruba-i-mazid',
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
	},
	{
		id: 'part-61',
		pairId: 'daa',
		kind: 'formation',
		arabic: 'دَعَا / يَدْعُو / دَاعٍ / مَدْعُوٌّ',
		question: 'Apa yang terjadi pada wāw akhir akar د ع و, dan bagaimana ujung dua isimnya?',
		answer:
			'Wāw akhir menjadi alif pada دَعَا dan tetap tampak pada يَدْعُو. Isim fā‘il دَاعٍ: wāw akar menjadi yā’ karena kasrah sebelumnya (seperti pada الدَّاعِي), lalu yā’ itu tidak tertulis pada nakirah marfū‘ dan majrūr, hanya tanwin kasrah yang tersisa. Pada مَدْعُوٌّ, wāw pola مَفْعُولٌ dan wāw akar bertemu menjadi satu wāw bershadda.',
		status: 'draft'
	},
	{
		id: 'part-62',
		pairId: 'daa',
		kind: 'role',
		arabic: 'دَعَا الْمُدِيرُ الْمُوَظَّفِينَ إِلَى الِاجْتِمَاعِ.',
		question: 'Tentukan fā‘il, maf‘ūl bih dan jar–majrūr.',
		answer:
			'دَعَا adalah fi‘il māḍī (ia mengundang). الْمُدِيرُ adalah fā‘il marfū‘, الْمُوَظَّفِينَ adalah maf‘ūl bih manṣūb (jamak mudhakkar sālim, yā’ sebelum nūn), dan إِلَى الِاجْتِمَاعِ adalah jar–majrūr: direktur mengundang para karyawan ke pertemuan.',
		status: 'draft'
	},
	{
		id: 'part-63',
		pairId: 'daa',
		kind: 'agreement',
		arabic: 'شَكَرْتُ الدَّاعِيَ وَقَبِلْتُ الدَّعْوَةَ.',
		question: 'Mengapa yā’ pada الدَّاعِيَ tertulis dan berfatḥah?',
		answer:
			'الدَّاعِيَ adalah maf‘ūl bih manṣūb dari شَكَرْتُ. Isim manqūṣ yang bersambung dengan ال menampakkan yā’-nya, dan tanda naṣb fatḥah tampak di atasnya. Bandingkan دَاعِيًا pada nakirah manṣūb. Artinya: saya berterima kasih kepada pengundang dan menerima undangan; الدَّعْوَةَ adalah maṣdar (undangan).',
		status: 'draft'
	},
	{
		id: 'part-64',
		pairId: 'daa',
		kind: 'meaning',
		arabic: 'الشَّخْصُ الْمَدْعُوُّ جَاءَ مُبَكِّرًا.',
		question: 'Apa arti الْمَدْعُوُّ, dan mengapa wāw-nya bershadda?',
		answer:
			'Yang diundang (isim maf‘ūl). Wāw pola مَفْعُولٌ dan wāw akar melebur menjadi satu wāw bershadda; ḍammah di atasnya menandai raf‘ karena ia na‘at untuk الشَّخْصُ. مُبَكِّرًا adalah ḥāl manṣūb: orang yang diundang itu datang lebih awal.',
		status: 'draft'
	},
	{
		id: 'part-65',
		pairId: 'banaa',
		kind: 'formation',
		arabic: 'بَنَى / يَبْنِي / بِنَاءٌ / بَانٍ / مَبْنِيٌّ',
		question: 'Apa yang terjadi pada yā’ akhir akar ب ن ي di tiap bentuk?',
		answer:
			'Yā’ akhir menjadi alif pada بَنَى dan tetap tampak pada يَبْنِي. Pada maṣdar بِنَاءٌ, yā’ yang sesudah alif menjadi hamzah. Isim fā‘il بَانٍ kehilangan yā’ tertulis pada nakirah marfū‘ dan majrūr. Pada مَبْنِيٌّ, wāw pola مَفْعُولٌ berubah menjadi yā’ lalu melebur dengan yā’ akar.',
		status: 'draft'
	},
	{
		id: 'part-66',
		pairId: 'banaa',
		kind: 'role',
		arabic: 'بَنَتِ الشَّرِكَةُ مَدْرَسَةً جَدِيدَةً.',
		question: 'Mengapa fi‘ilnya بَنَتِ, dan apa fā‘il serta maf‘ūl bih-nya?',
		answer:
			'الشَّرِكَةُ feminin, jadi fi‘il māḍī diberi tā’ ta’nīth; alif maqṣūrah akhir بَنَى gugur sebelum tā’ sukun (بَنَتْ), dan tā’ dibaca kasrah sebelum ال. الشَّرِكَةُ adalah fā‘il marfū‘ dan مَدْرَسَةً adalah maf‘ūl bih manṣūb: perusahaan itu membangun sebuah sekolah baru.',
		status: 'draft'
	},
	{
		id: 'part-67',
		pairId: 'banaa',
		kind: 'agreement',
		arabic: 'الْبُيُوتُ الْمَبْنِيَّةُ حَدِيثًا قَرِيبَةٌ مِنَ النَّهْرِ.',
		question: 'Mengapa الْمَبْنِيَّةُ feminin tunggal dan bershadda?',
		answer:
			'الْبُيُوتُ adalah jamak benda tak berakal, sehingga na‘at dan khabarnya lazim feminin tunggal. Shadda berasal dari peleburan dua yā’ pada مَبْنِيٌّ. الْمَبْنِيَّةُ adalah na‘at marfū‘, حَدِيثًا adalah keterangan manṣūb (baru saja), dan قَرِيبَةٌ adalah khabar: rumah-rumah yang baru dibangun itu dekat dengan sungai.',
		status: 'draft'
	},
	{
		id: 'part-68',
		pairId: 'banaa',
		kind: 'meaning',
		arabic: 'بِنَاءُ الْجِسْرِ يَحْتَاجُ إِلَى وَقْتٍ.',
		question: 'Apakah بِنَاءُ isim fā‘il? Apa artinya?',
		answer:
			'Bukan. بِنَاءُ adalah maṣdar (pembangunan) yang menjadi mubtada, dan الْجِسْرِ adalah muḍāf ilaih. Klausa يَحْتَاجُ إِلَى وَقْتٍ adalah khabar: pembangunan jembatan memerlukan waktu. Isim fā‘il dari verba ini ialah بَانٍ.',
		status: 'draft'
	},
	{
		id: 'part-69',
		pairId: 'waqaa',
		kind: 'formation',
		arabic: 'وَقَى / يَقِي / وَاقٍ',
		question: 'Huruf akar mana yang gugur atau berubah pada akar و ق ي?',
		answer:
			'Akar و ق ي adalah lafīf mafrūq: wāw dan yā’ dipisahkan oleh huruf sehat ق. Wāw awal gugur pada muḍāri‘ (يَقِي), yā’ akhir menjadi alif pada وَقَى, dan isim fā‘il وَاقٍ mempertahankan wāw awal tetapi kehilangan yā’ tertulis pada nakirah marfū‘ dan majrūr.',
		status: 'draft'
	},
	{
		id: 'part-70',
		pairId: 'waqaa',
		kind: 'role',
		arabic: 'تَقِي الْمِظَلَّةُ النَّاسَ مِنَ الْمَطَرِ.',
		question: 'Tentukan fā‘il dan maf‘ūl bih. Mengapa tanda raf‘ pada fi‘il tidak tampak?',
		answer:
			'الْمِظَلَّةُ adalah fā‘il marfū‘ (feminin, sehingga fi‘il memakai تـ) dan النَّاسَ adalah maf‘ūl bih manṣūb. Pada تَقِي tanda raf‘ berupa ḍammah muqaddarah pada yā’ akhir sehingga tidak tampak: payung itu melindungi orang dari hujan.',
		status: 'draft'
	},
	{
		id: 'part-71',
		pairId: 'waqaa',
		kind: 'agreement',
		arabic: 'اِشْتَرَى الْعَامِلُ خُوذَةً وَاقِيَةً.',
		question: 'Mengapa yā’ tampak pada وَاقِيَةً padahal isim fā‘il maskulinnya وَاقٍ?',
		answer:
			'وَاقِيَةً adalah na‘at untuk خُوذَةً; keduanya feminin, nakirah dan manṣūb (maf‘ūl bih). Dengan tā’ marbūṭah, yā’ yang hilang pada وَاقٍ tampak kembali: pekerja itu membeli helm pelindung.',
		status: 'draft'
	},
	{
		id: 'part-72',
		pairId: 'waqaa',
		kind: 'meaning',
		arabic: 'الْوِقَايَةُ مُهِمَّةٌ لِلصِّحَّةِ.',
		question: 'Apakah الْوِقَايَةُ isim fā‘il? Apa artinya?',
		answer:
			'Bukan. الْوِقَايَةُ adalah maṣdar berpola فِعَالَةٌ (perlindungan, pencegahan) dan menjadi mubtada; مُهِمَّةٌ adalah khabar: perlindungan itu penting bagi kesehatan. Isim fā‘il dari verba ini ialah وَاقٍ.',
		status: 'draft'
	},
	{
		id: 'part-73',
		pairId: 'rawaa',
		kind: 'formation',
		arabic: 'رَوَى / يَرْوِي / رِوَايَةٌ / رَاوٍ / مَرْوِيٌّ',
		question: 'Apa kekhasan akar ر و ي, dan huruf mana yang tetap tampak?',
		answer:
			'Akar ini lafīf maqrūn: dua huruf lemah berurutan (wāw lalu yā’). Yā’ akhir menjadi alif pada رَوَى, sedangkan wāw tengah tetap tampak di semua bentuk. Pada maṣdar رِوَايَةٌ yā’ tertulis karena disusul tā’ marbūṭah; bandingkan بِنَاءٌ yang berhamzah. Isim fā‘il رَاوٍ kehilangan yā’ tertulis pada nakirah marfū‘ dan majrūr.',
		status: 'draft'
	},
	{
		id: 'part-74',
		pairId: 'rawaa',
		kind: 'role',
		arabic: 'رَوَى الْجَدُّ حِكَايَةً قَدِيمَةً.',
		question: 'Tentukan fā‘il dan maf‘ūl bih.',
		answer:
			'رَوَى adalah fi‘il māḍī (ia menceritakan). الْجَدُّ adalah fā‘il marfū‘, dan حِكَايَةً adalah maf‘ūl bih manṣūb dengan قَدِيمَةً sebagai na‘at: kakek menceritakan sebuah kisah lama.',
		status: 'draft'
	},
	{
		id: 'part-75',
		pairId: 'rawaa',
		kind: 'agreement',
		arabic: 'الْقِصَّةُ مَرْوِيَّةٌ عَنِ الْجَدِّ.',
		question: 'Mengapa مَرْوِيَّةٌ memakai tā’ marbūṭah dan shadda?',
		answer:
			'مَرْوِيَّةٌ adalah isim maf‘ūl feminin yang menjadi khabar marfū‘ dan nakirah, mengikuti الْقِصَّةُ yang feminin tunggal. Shadda berasal dari wāw pola yang berubah menjadi yā’ dan melebur dengan yā’ akar. عَنِ الْجَدِّ adalah jar–majrūr: kisah itu diriwayatkan dari kakek.',
		status: 'draft'
	},
	{
		id: 'part-76',
		pairId: 'rawaa',
		kind: 'meaning',
		arabic: 'سَمِعْتُ رِوَايَةَ الْجَدِّ.',
		question: 'Apakah رِوَايَةَ isim fā‘il? Apa fungsinya?',
		answer:
			'Bukan. رِوَايَةَ adalah maṣdar (penuturan), maf‘ūl bih manṣūb sekaligus muḍāf, dan الْجَدِّ adalah muḍāf ilaih majrūr: saya mendengar penuturan kakek.',
		status: 'draft'
	},
	{
		id: 'part-77',
		pairId: 'akhadha',
		kind: 'formation',
		arabic: 'أَخَذَ / يَأْخُذُ / آخِذٌ / مَأْخُوذٌ',
		question: 'Mengapa isim fā‘il-nya آخِذٌ dan bukan أَاخِذٌ?',
		answer:
			'Akar أ خ ذ adalah mahmūz fā’: hamzah akar menjadi huruf pertama. Pada isim fā‘il, hamzah akar dan alif pola فَاعِلٌ bertemu dan ditulis sebagai alif madd (آ). Pada مَأْخُوذٌ hamzah tetap tampak sesudah مَـ.',
		status: 'draft'
	},
	{
		id: 'part-78',
		pairId: 'akhadha',
		kind: 'role',
		arabic: 'أَخَذَ الطَّالِبُ الْكِتَابَ مِنَ الْمَكْتَبَةِ.',
		question: 'Tentukan fā‘il, maf‘ūl bih dan jar–majrūr.',
		answer:
			'أَخَذَ adalah fi‘il māḍī (ia mengambil). الطَّالِبُ adalah fā‘il marfū‘, الْكِتَابَ adalah maf‘ūl bih manṣūb, dan مِنَ الْمَكْتَبَةِ adalah jar–majrūr: siswa itu mengambil buku dari perpustakaan.',
		status: 'draft'
	},
	{
		id: 'part-79',
		pairId: 'akhadha',
		kind: 'agreement',
		arabic: 'الْأَوْرَاقُ الْمَأْخُوذَةُ مِنَ الْمَكْتَبِ كَثِيرَةٌ.',
		question: 'Mengapa الْمَأْخُوذَةُ dan كَثِيرَةٌ feminin tunggal?',
		answer:
			'الْأَوْرَاقُ adalah jamak benda tak berakal, sehingga na‘at dan khabarnya lazim feminin tunggal. الْمَأْخُوذَةُ adalah isim maf‘ūl (yang diambil) sebagai na‘at, dan كَثِيرَةٌ adalah khabar: kertas-kertas yang diambil dari meja kerja itu banyak.',
		status: 'draft'
	},
	{
		id: 'part-80',
		pairId: 'akhadha',
		kind: 'meaning',
		arabic: 'الْمَبْلَغُ الْمَأْخُوذُ صَغِيرٌ.',
		question: 'Apa arti الْمَأْخُوذُ di sini?',
		answer:
			'Yang diambil (isim maf‘ūl), na‘at untuk الْمَبْلَغُ. صَغِيرٌ adalah khabar: jumlah yang diambil itu kecil.',
		status: 'draft'
	},
	{
		id: 'part-81',
		pairId: 'saala',
		kind: 'formation',
		arabic: 'سَأَلَ / يَسْأَلُ / سَائِلٌ / مَسْؤُولٌ',
		question: 'Mengapa hamzah ditulis di atas yā’ pada سَائِلٌ dan di atas wāw pada مَسْؤُولٌ?',
		answer:
			'Akar س أ ل adalah mahmūz ‘ain. Kursi hamzah mengikuti harakat: pada سَائِلٌ hamzah berkasrah sesudah alif sehingga ditulis di atas yā’; pada مَسْؤُولٌ hamzah berḍammah sesudah sukun sehingga ditulis di atas wāw.',
		status: 'draft'
	},
	{
		id: 'part-82',
		pairId: 'saala',
		kind: 'role',
		arabic: 'سَأَلَ الطَّالِبُ الْمُعَلِّمَ عَنِ الدَّرْسِ.',
		question: 'Tentukan fā‘il, maf‘ūl bih dan jar–majrūr.',
		answer:
			'سَأَلَ adalah fi‘il māḍī (ia bertanya). الطَّالِبُ adalah fā‘il marfū‘, الْمُعَلِّمَ adalah maf‘ūl bih manṣūb (orang yang ditanya), dan عَنِ الدَّرْسِ adalah jar–majrūr yang menyebut hal yang ditanyakan: siswa itu bertanya kepada guru tentang pelajaran.',
		status: 'draft'
	},
	{
		id: 'part-83',
		pairId: 'saala',
		kind: 'agreement',
		arabic: 'السَّائِلُ يَنْتَظِرُ الْجَوَابَ.',
		question: 'Apa kedudukan السَّائِلُ dan apa khabarnya?',
		answer:
			'السَّائِلُ adalah isim fā‘il (penanya) yang menjadi mubtada marfū‘. Klausa يَنْتَظِرُ الْجَوَابَ adalah khabar, dan الْجَوَابَ adalah maf‘ūl bih manṣūb: si penanya menunggu jawaban.',
		status: 'draft'
	},
	{
		id: 'part-84',
		pairId: 'saala',
		kind: 'meaning',
		arabic: 'الْمَسْؤُولُ عَنِ الْقِسْمِ غَائِبٌ الْيَوْمَ.',
		question: 'Apa arti الْمَسْؤُولُ di sini?',
		answer:
			'Penanggung jawab: isim maf‘ūl (yang dimintai pertanggungjawaban) dipakai sebagai kata benda dan menjadi mubtada. عَنِ الْقِسْمِ melengkapinya, dan غَائِبٌ adalah khabar: penanggung jawab bagian itu tidak hadir hari ini. Arti ini muncul dari pemakaian, bukan dari baris tabel verba.',
		status: 'draft'
	},
	{
		id: 'part-85',
		pairId: 'qaraa',
		kind: 'formation',
		arabic: 'قَرَأَ / يَقْرَأُ / قَارِئٌ / مَقْرُوءٌ',
		question: 'Bagaimana hamzah akhir akar ق ر أ ditulis pada dua isim ini?',
		answer:
			'Akar ini mahmūz lām. Pada قَارِئٌ hamzah berada di akhir kata sesudah huruf berkasrah (رِ), sehingga ditulis di atas yā’. Pada مَقْرُوءٌ hamzah akhir sesudah wāw mad ditulis di atas garis. Keduanya tetap berpola فَاعِلٌ dan مَفْعُولٌ.',
		status: 'draft'
	},
	{
		id: 'part-86',
		pairId: 'qaraa',
		kind: 'role',
		arabic: 'يَقْرَأُ الْأَطْفَالُ الْقِصَّةَ فِي الْمَكْتَبَةِ.',
		question: 'Tentukan fi‘il, fā‘il dan maf‘ūl bih.',
		answer:
			'يَقْرَأُ adalah fi‘il muḍāri‘ marfū‘. الْأَطْفَالُ adalah fā‘il marfū‘ dan الْقِصَّةَ adalah maf‘ūl bih manṣūb. Fi‘il yang mendahului fā‘il tampak tunggal meski fā‘ilnya jamak: anak-anak membaca cerita itu di perpustakaan.',
		status: 'draft'
	},
	{
		id: 'part-87',
		pairId: 'qaraa',
		kind: 'agreement',
		arabic: 'الْكُتُبُ الْمَقْرُوءَةُ مُفِيدَةٌ.',
		question: 'Mengapa الْمَقْرُوءَةُ dan مُفِيدَةٌ feminin tunggal?',
		answer:
			'الْكُتُبُ adalah jamak benda tak berakal, sehingga na‘at dan khabarnya lazim feminin tunggal. الْمَقْرُوءَةُ adalah isim maf‘ūl (yang dibaca) dan hamzahnya tetap ditulis di atas garis sesudah wāw: buku-buku yang dibaca itu bermanfaat.',
		status: 'draft'
	},
	{
		id: 'part-88',
		pairId: 'qaraa',
		kind: 'meaning',
		arabic: 'أَخِي قَارِئٌ جَيِّدٌ.',
		question: 'Apa arti قَارِئٌ dan apa fungsinya?',
		answer:
			'Pembaca. قَارِئٌ adalah isim fā‘il yang menjadi khabar marfū‘, dan جَيِّدٌ adalah na‘at-nya. أَخِي adalah mubtada marfū‘ dengan ḍammah muqaddarah: saudara laki-laki saya pembaca yang baik.',
		status: 'draft'
	},
	{
		id: 'part-89',
		pairId: 'madda',
		kind: 'formation',
		arabic: 'مَدَّ / يَمُدُّ / مَادٌّ / مَمْدُودٌ',
		question: 'Kapan dua د pada akar م د د melebur, dan kapan tidak?',
		answer:
			'Akar ini muḍā‘af: radikal kedua dan ketiga sama. Keduanya melebur menjadi satu د bershadda pada مَدَّ, يَمُدُّ dan مَادٌّ. Pada مَمْدُودٌ ada wāw di antara dua د, sehingga keduanya tertulis terpisah.',
		status: 'draft'
	},
	{
		id: 'part-90',
		pairId: 'madda',
		kind: 'role',
		arabic: 'مَدَّ الْمُزَارِعُ حَبْلًا بَيْنَ الشَّجَرَتَيْنِ.',
		question: 'Tentukan fā‘il, maf‘ūl bih dan keterangan tempat.',
		answer:
			'مَدَّ adalah fi‘il māḍī (ia membentangkan). الْمُزَارِعُ adalah fā‘il marfū‘, حَبْلًا adalah maf‘ūl bih manṣūb, dan بَيْنَ adalah ẓarf manṣūb yang menjadi muḍāf bagi الشَّجَرَتَيْنِ. Mutsannā yang majrūr memakai yā’ sebelum nūn: petani itu membentangkan tali di antara dua pohon.',
		status: 'draft'
	},
	{
		id: 'part-91',
		pairId: 'madda',
		kind: 'agreement',
		arabic: 'الْحِبَالُ الْمَمْدُودَةُ بَيْنَ الْأَشْجَارِ جَدِيدَةٌ.',
		question: 'Mengapa الْمَمْدُودَةُ dan جَدِيدَةٌ feminin tunggal?',
		answer:
			'الْحِبَالُ adalah jamak benda tak berakal, sehingga na‘at dan khabarnya lazim feminin tunggal. الْمَمْدُودَةُ adalah isim maf‘ūl (yang dibentangkan), بَيْنَ الْأَشْجَارِ adalah keterangan tempat, dan جَدِيدَةٌ adalah khabar: tali-tali yang dibentangkan di antara pepohonan itu baru.',
		status: 'draft'
	},
	{
		id: 'part-92',
		pairId: 'madda',
		kind: 'meaning',
		arabic: 'الْحَبْلُ الْمَمْدُودُ طَوِيلٌ.',
		question: 'Apa arti الْمَمْدُودُ di sini?',
		answer:
			'Yang dibentangkan (isim maf‘ūl), na‘at untuk الْحَبْلُ. طَوِيلٌ adalah khabar: tali yang dibentangkan itu panjang.',
		status: 'draft'
	},
	{
		id: 'part-93',
		pairId: 'istamarra',
		kind: 'formation',
		arabic: 'اِسْتَمَرَّ / يَسْتَمِرُّ / اِسْتِمْرَارٌ / مُسْتَمِرٌّ',
		question: 'Mengapa māḍī-nya bukan اِسْتَمْرَرَ, dan mengapa isim maf‘ūl tidak dicontohkan?',
		answer:
			'Akar م ر ر adalah muḍā‘af: pada Form X, dua ر yang berurutan melebur menjadi satu ر bershadda pada māḍī, muḍāri‘ dan isim fā‘il. Pada maṣdar اِسْتِمْرَارٌ alif memisahkan keduanya. Dalam arti “berlanjut” verba ini intransitif; tabel Wiktionary memuat مُسْتَمَرٌّ, tetapi bentuk itu tidak dipakai untuk arti ini, sehingga isim maf‘ūl tidak dicontohkan.',
		status: 'draft'
	},
	{
		id: 'part-94',
		pairId: 'istamarra',
		kind: 'role',
		arabic: 'اِسْتَمَرَّ الْمَطَرُ طَوَالَ اللَّيْلِ.',
		question: 'Tentukan fā‘il dan keterangan waktu.',
		answer:
			'اِسْتَمَرَّ adalah fi‘il māḍī (ia berlanjut). الْمَطَرُ adalah fā‘il marfū‘, طَوَالَ adalah ẓarf manṣūb dan muḍāf, dan اللَّيْلِ adalah muḍāf ilaih majrūr: hujan berlanjut sepanjang malam.',
		status: 'draft'
	},
	{
		id: 'part-95',
		pairId: 'istamarra',
		kind: 'agreement',
		arabic: 'الْمُحَاضَرَةُ مُسْتَمِرَّةٌ حَتَّى الظُّهْرِ.',
		question: 'Mengapa مُسْتَمِرَّةٌ feminin?',
		answer:
			'مُسْتَمِرَّةٌ adalah isim fā‘il feminin yang menjadi khabar marfū‘, mengikuti الْمُحَاضَرَةُ yang feminin tunggal. حَتَّى الظُّهْرِ menyebut batas waktu dan الظُّهْرِ majrūr setelah حَتَّى: kuliah itu berlangsung sampai siang.',
		status: 'draft'
	},
	{
		id: 'part-96',
		pairId: 'istamarra',
		kind: 'meaning',
		arabic: 'اِسْتِمْرَارُ التَّدْرِيبِ ضَرُورِيٌّ.',
		question: 'Apakah اِسْتِمْرَارُ isim fā‘il? Apa artinya?',
		answer:
			'Bukan. اِسْتِمْرَارُ adalah maṣdar Form X (keberlanjutan) dan menjadi mubtada, التَّدْرِيبِ adalah muḍāf ilaih, dan ضَرُورِيٌّ adalah khabar: berlanjutnya latihan itu perlu. Isim fā‘il verba ini ialah مُسْتَمِرٌّ.',
		status: 'draft'
	},
	{
		id: 'part-97',
		pairId: 'tarjama',
		kind: 'formation',
		arabic: 'تَرْجَمَ / يُتَرْجِمُ / تَرْجَمَةٌ / مُتَرْجِمٌ / مُتَرْجَمٌ',
		question: 'Apa bedanya dengan Form V, dan bagaimana dua isimnya dibentuk?',
		answer:
			'Akar tertulis empat huruf (ت ر ج م), sehingga ini rubā‘ī mujarrad berpola فَعْلَلَ: tā’ pertama adalah huruf akar, bukan awalan seperti pada Form V. Muḍāri‘ memakai يُـ, dan isimnya memakai مُـ. Kasrah pada radikal ketiga (ج) menghasilkan مُتَرْجِمٌ (penerjemah), fatḥah menghasilkan مُتَرْجَمٌ (yang diterjemahkan). Maṣdar تَرْجَمَةٌ berpola فَعْلَلَةٌ.',
		status: 'draft'
	},
	{
		id: 'part-98',
		pairId: 'tarjama',
		kind: 'role',
		arabic: 'تَرْجَمَ الْمُتَرْجِمُ النَّصَّ إِلَى الْعَرَبِيَّةِ.',
		question: 'Tentukan fi‘il, fā‘il dan maf‘ūl bih.',
		answer:
			'تَرْجَمَ adalah fi‘il māḍī rubā‘ī (ia menerjemahkan). الْمُتَرْجِمُ adalah fā‘il marfū‘ (isim fā‘il), النَّصَّ adalah maf‘ūl bih manṣūb, dan إِلَى الْعَرَبِيَّةِ adalah jar–majrūr: penerjemah itu menerjemahkan teks ke bahasa Arab.',
		status: 'draft'
	},
	{
		id: 'part-99',
		pairId: 'tarjama',
		kind: 'agreement',
		arabic: 'تَرْجَمَةُ الْكِتَابِ تَحْتَاجُ إِلَى صَبْرٍ.',
		question: 'Apakah تَرْجَمَةُ isim maf‘ūl feminin? Mengapa fi‘ilnya تَحْتَاجُ?',
		answer:
			'Bukan. تَرْجَمَةُ adalah maṣdar feminin (penerjemahan) yang menjadi mubtada dan muḍāf, dan الْكِتَابِ adalah muḍāf ilaih. Klausa تَحْتَاجُ إِلَى صَبْرٍ adalah khabar; verbanya memakai تـ karena fā‘il tersembunyinya merujuk pada maṣdar yang feminin: menerjemahkan buku memerlukan kesabaran.',
		status: 'draft'
	},
	{
		id: 'part-100',
		pairId: 'tarjama',
		kind: 'meaning',
		arabic: 'النَّصُّ الْمُتَرْجَمُ سَهْلٌ.',
		question: 'Apa arti الْمُتَرْجَمُ di sini?',
		answer:
			'Yang diterjemahkan (isim maf‘ūl), na‘at untuk النَّصُّ. Fatḥah pada ج menandai isim maf‘ūl; kasrah (مُتَرْجِمٌ) berarti penerjemah. سَهْلٌ adalah khabar: teks terjemahan itu mudah.',
		status: 'draft'
	},
	{
		id: 'part-101',
		pairId: 'tadahraja',
		kind: 'formation',
		arabic: 'تَدَحْرَجَ / يَتَدَحْرَجُ / تَدَحْرُجٌ / مُتَدَحْرِجٌ',
		question: 'Apa fungsi tā’ pertama di sini, dan mengapa tidak ada isim maf‘ūl?',
		answer:
			'Akar د ح ر ج berhuruf empat, dan ini rubā‘ī mazīd berpola تَفَعْلَلَ: tā’ pertama adalah awalan pola (berbeda dengan تَرْجَمَ). Maṣdar تَفَعْلُلٌ menjadi تَدَحْرُجٌ dan isim fā‘il-nya مُتَدَحْرِجٌ. Verba ini intransitif, sehingga isim maf‘ūl mandiri tidak lazim.',
		status: 'draft'
	},
	{
		id: 'part-102',
		pairId: 'tadahraja',
		kind: 'role',
		arabic: 'تَدَحْرَجَتِ الْكُرَةُ نَحْوَ الْبَابِ.',
		question: 'Mengapa fi‘ilnya berakhir tā’, dan apa fā‘ilnya?',
		answer:
			'الْكُرَةُ feminin, jadi fi‘il māḍī memakai tā’ ta’nīth yang dibaca kasrah sebelum ال. الْكُرَةُ adalah fā‘il marfū‘, dan نَحْوَ adalah ẓarf manṣūb yang menjadi muḍāf bagi الْبَابِ: bola itu menggelinding ke arah pintu.',
		status: 'draft'
	},
	{
		id: 'part-103',
		pairId: 'tadahraja',
		kind: 'agreement',
		arabic: 'الْأَحْجَارُ مُتَدَحْرِجَةٌ عَلَى السَّفْحِ.',
		question: 'Mengapa مُتَدَحْرِجَةٌ feminin tunggal?',
		answer:
			'الْأَحْجَارُ adalah jamak benda tak berakal, sehingga khabarnya lazim feminin tunggal. مُتَدَحْرِجَةٌ adalah isim fā‘il (yang menggelinding) dan عَلَى السَّفْحِ adalah jar–majrūr: batu-batu itu menggelinding di lereng.',
		status: 'draft'
	},
	{
		id: 'part-104',
		pairId: 'tadahraja',
		kind: 'meaning',
		arabic: 'الصَّخْرَةُ الْمُتَدَحْرِجَةُ خَطِيرَةٌ.',
		question: 'Apa arti الْمُتَدَحْرِجَةُ di sini?',
		answer:
			'Yang menggelinding (isim fā‘il feminin), na‘at untuk الصَّخْرَةُ. خَطِيرَةٌ adalah khabar: batu besar yang menggelinding itu berbahaya.',
		status: 'draft'
	}
];

export const participleRules = [
	{
		id: 'g02.participle-dua-bentuk',
		title: 'Dua bentuk isim, bukan dua bentuk fi‘il',
		prerequisites: rulePrerequisites(['g02.tashrif-istilahi'], ['CB-14', 'CB-16']),
		text: 'Isim fā‘il mengacu kepada pelaku atau pemilik keadaan; isim maf‘ūl biasanya mengacu kepada yang dikenai perbuatan. Keduanya termasuk isim. Fungsi sintaksisnya bisa menjadi mubtada, khabar, na‘at, fā‘il atau maf‘ūl bih.',
		sourceId: 'active'
	},
	{
		id: 'g02.participle-pola',
		title: 'Pola dasar dan pola mazīd',
		prerequisites: rulePrerequisites(['g02.participle-dua-bentuk'], ['CR-01']),
		text: 'Untuk verba Form I ṣaḥīḥ yang cocok, pola umum adalah فَاعِلٌ dan مَفْعُولٌ. Pada Form II sampai X, isim fā‘il dan isim maf‘ūl berawalan مُـ (dengan tambahan tā’ pada Form V dan VI, nūn pada VII, tā’ sisipan pada VIII dan sīn–tā’ pada X). Pada contoh ṣaḥīḥ Form II sampai X di bawah, bentuk aktif memakai kasrah sebelum radikal terakhir dan bentuk pasif memakai fatḥah; مُخْتَارٌ (ajwaf) dan مُحْمَرٌّ (Form IX) tidak menampakkan kasrah itu. Jangan mengganti vokal tanpa memperhatikan pola dan jenis akar.',
		sourceId: 'passive'
	},
	{
		id: 'g02.participle-batas-pola',
		title: 'Batas pola: akar lemah dan transitivitas',
		prerequisites: rulePrerequisites(['g02.participle-pola'], ['CB-18']),
		text: 'Akar ajwaf seperti ب ي ع mempunyai perubahan bentuk: بَائِعٌ dan مَبِيعٌ. Pada Form VIII, wāw akar mithāl و ص ل melebur dengan tā’ sisipan sehingga menjadi اِتَّصَلَ, dan akar ajwaf خ ي ر menghasilkan مُخْتَارٌ untuk aktif maupun pasif. Bentuk pasif yang biasa dipakai bergantung pada transitivitas dan konteks; jangan menganggap setiap verba memiliki bentuk pasif mandiri yang lazim. Gunakan entri kamus.',
		sourceId: 'passive'
	},
	{
		id: 'g02.participle-tidak-lazim',
		title: 'Bentuk yang tidak lazim',
		prerequisites: rulePrerequisites(['g02.participle-pola'], ['CB-14']),
		text: 'Verba intransitif seperti اِنْقَطَعَ (Form VII), اِحْمَرَّ (Form IX), تَدَحْرَجَ (rubā‘ī mazīd) dan, dalam pemakaian di halaman ini, اِسْتَمَرَّ (Form X) umumnya tidak memiliki isim maf‘ūl mandiri. Halaman ini menandainya “tidak lazim” dan tidak memberi contoh. Verba yang objeknya memakai huruf jar, seperti اِتَّصَلَ بِـ, hanya mempunyai bentuk pasif impersonal (الْمُتَّصَلُ بِهِ) yang tidak dicontohkan di sini. Kamus tidak selalu mencatat setiap bentuk pasif, dan sebuah tabel yang memuat bentuk belum membuktikan bahwa bentuk itu dipakai.',
		sourceId: 'passive'
	},
	{
		id: 'g02.participle-irab',
		title: 'I‘rab, gender dan makna dalam konteks',
		prerequisites: rulePrerequisites(['g02.participle-dua-bentuk'], ['CR-03']),
		text: 'Bentuk turunan yang menerangkan isim mengikuti kaidah na‘at; ketika menjadi khabar atau muḍāf ilaih, akhir katanya mengikuti kedudukan itu. Jamak benda tak berakal lazim memakai sifat feminin tunggal. Bentuk yang sama bisa menjadi nama profesi atau menyatakan keadaan, tanpa menandai kala tertentu.',
		sourceId: 'contrast'
	},
	{
		id: 'g02.akar-naqis',
		title: 'Akar nāqiṣ: huruf lemah di akhir',
		text: 'Pada akar nāqiṣ seperti د ع و dan ب ن ي, huruf lemah terakhir berubah: menjadi alif pada māḍī (دَعَا, بَنَى), tetap tampak pada muḍāri‘ (يَدْعُو, يَبْنِي) dan hilang dari tulisan pada isim fā‘il nakirah yang marfū‘ atau majrūr (دَاعٍ, بَانٍ). Yā’ itu muncul kembali bila ada ال (الدَّاعِي), pada naṣb (دَاعِيًا) atau pada bentuk feminin (دَاعِيَةٌ). Isim maf‘ūl dari akar wāw dan yā’ berakhir ـُوٌّ dan ـِيٌّ (مَدْعُوٌّ, مَبْنِيٌّ).',
		prerequisites: rulePrerequisites(['g02.participle-batas-pola'], ['CB-18']),
		sourceId: 'wiktionary'
	},
	{
		id: 'g02.akar-lafif',
		title: 'Akar lafīf: dua huruf lemah',
		text: 'Lafīf berarti akar dengan dua huruf lemah. Pada lafīf mafrūq (و ق ي) dua huruf lemah dipisahkan satu huruf sehat dan wāw awal gugur pada muḍāri‘ (وَقَى menjadi يَقِي). Pada lafīf maqrūn (ر و ي) dua huruf lemah berurutan dan akhir kata mengikuti perubahan nāqiṣ (رَوَى, رَاوٍ, مَرْوِيٌّ). Jangan menurunkan bentuk hanya dari tiga huruf akar: periksa tabel kamus.',
		prerequisites: rulePrerequisites(['g02.akar-naqis'], ['CB-18']),
		sourceId: 'wiktionary'
	},
	{
		id: 'g02.akar-mahmuz',
		title: 'Akar mahmūz: hamzah sebagai huruf akar',
		text: 'Hamzah dapat menjadi huruf pertama, kedua atau ketiga akar. Hamzah umumnya tetap diucapkan, tetapi tulisannya berubah: hamzah dan alif bertemu menjadi آ pada آخِذٌ, dan kursi hamzah mengikuti harakat sekitarnya (سَائِلٌ, مَسْؤُولٌ, قَارِئٌ, مَقْرُوءٌ). Perintah dari أَخَذَ, yaitu خُذْ, menghilangkan hamzah awal.',
		prerequisites: rulePrerequisites(['g02.participle-batas-pola'], ['CB-18']),
		sourceId: 'wiktionary'
	},
	{
		id: 'g02.akar-mudaaf',
		title: 'Akar muḍā‘af: dua huruf sama',
		text: 'Pada akar muḍā‘af (م د د, م ر ر), radikal kedua dan ketiga yang sama melebur menjadi satu huruf bershadda bila berurutan (مَدَّ, يَمُدُّ, مَادٌّ, مُسْتَمِرٌّ). Peleburan terjadi bila huruf kedua berharakat. Bila ada huruf lain di antaranya, atau huruf kedua bersukun karena akhiran, keduanya tertulis terpisah (مَمْدُودٌ, اِسْتِمْرَارٌ, مَدَدْتُ).',
		prerequisites: rulePrerequisites(['g02.participle-batas-pola'], ['CB-18']),
		sourceId: 'wiktionary'
	},
	{
		id: 'g02.ruba-i-mujarrad',
		title: 'Rubā‘ī mujarrad: فَعْلَلَ',
		text: 'Verba rubā‘ī mempunyai empat huruf akar. Pada pola dasar فَعْلَلَ (تَرْجَمَ) semua huruf pada māḍī adalah huruf akar. Muḍāri‘ memakai يُـ; isim fā‘il memakai مُـ dengan kasrah pada radikal ketiga (مُتَرْجِمٌ) dan isim maf‘ūl memakai fatḥah (مُتَرْجَمٌ). Maṣdar berpola فَعْلَلَةٌ (تَرْجَمَةٌ).',
		prerequisites: rulePrerequisites(['g02.participle-pola', 'g02.tashrif-istilahi'], ['CR-01']),
		sourceId: 'wiktionary'
	},
	{
		id: 'g02.ruba-i-mazid',
		title: 'Rubā‘ī mazīd: تَفَعْلَلَ',
		text: 'Pola mazīd تَفَعْلَلَ menambahkan awalan تَـ pada empat huruf akar (تَدَحْرَجَ). Muḍāri‘ memakai يَتَـ, maṣdar berpola تَفَعْلُلٌ (تَدَحْرُجٌ) dan isim fā‘il memakai مُتَـ dengan kasrah pada radikal ketiga (مُتَدَحْرِجٌ). Verba intransitif tidak mempunyai isim maf‘ūl mandiri yang lazim. Jangan menyamakan tā’ awal تَرْجَمَ (huruf akar) dengan tā’ awal تَدَحْرَجَ (awalan).',
		prerequisites: rulePrerequisites(['g02.ruba-i-mujarrad'], []),
		sourceId: 'wiktionary'
	}
] as const;
