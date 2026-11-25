/**
 * OER-02: original MSA maṣdar learning with thirteen attested verb/maṣdar pairs
 * (Form I, II, III, IV, V, VI, VII, VIII, IX and X).
 * The lexical sources corroborate pairs, NOT all newly written Arabic sentences.
 * No external source lesson text or exercise is reproduced; material remains draft.
 */
import { rulePrerequisites } from './g02-types.js';

export const masdarGrammarSource = {
	name: 'Elementary Arabic · 5.2 Grammar (Mohamed and Issa)',
	href: 'https://human.libretexts.org/Bookshelves/Languages/Arabic/Elementary_Arabic_(Mohamed_and_Issa)/05:_Hobbies_and_Sports/5.02:_Grammar',
	license: 'CC BY 4.0 (this page; checked 2026-11-17)',
	usage: 'Rujukan konsep maṣdar sebagai verbal noun, bukan salinan latihan'
} as const;

export const masdarLexemes = [
	{
		id: 'kataba',
		form: 'I',
		verb: 'كَتَبَ',
		present: 'يَكْتُبُ',
		masdar: 'كِتَابَةٌ',
		meaning: 'menulis',
		pattern: 'فِعَالَةٌ',
		dataId: 'كتب-1',
		wazanBab: 1,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/كتب',
		status: 'draft' as const
	},
	{
		id: 'qaraa',
		form: 'I',
		verb: 'قَرَأَ',
		present: 'يَقْرَأُ',
		masdar: 'قِرَاءَةٌ',
		meaning: 'membaca',
		pattern: 'فِعَالَةٌ',
		dataId: 'قرأ-1',
		wazanBab: 3,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/قرأ',
		status: 'draft' as const
	},
	{
		id: 'darasa',
		form: 'I',
		verb: 'دَرَسَ',
		present: 'يَدْرُسُ',
		masdar: 'دِرَاسَةٌ',
		meaning: 'belajar atau mempelajari',
		pattern: 'فِعَالَةٌ',
		dataId: 'درس-1',
		wazanBab: 1,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/درس',
		status: 'draft' as const
	},
	{
		id: 'istaamala',
		form: 'X',
		verb: 'اِسْتَعْمَلَ',
		present: 'يَسْتَعْمِلُ',
		masdar: 'اِسْتِعْمَالٌ',
		meaning: 'menggunakan',
		pattern: 'اِسْتِفْعَالٌ',
		dataId: 'استعمل-X-1',
		wazanBab: 15,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/استعمل',
		status: 'draft' as const
	},
	{
		id: 'ijtamaa',
		form: 'VIII',
		verb: 'اِجْتَمَعَ',
		present: 'يَجْتَمِعُ',
		masdar: 'اِجْتِمَاعٌ',
		meaning: 'berkumpul atau mengadakan pertemuan',
		pattern: 'اِفْتِعَالٌ',
		dataId: 'اجتمع-VIII-1',
		wazanBab: 12,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/اجتمع',
		status: 'draft' as const
	},
	{
		id: 'saada',
		form: 'III',
		verb: 'سَاعَدَ',
		present: 'يُسَاعِدُ',
		masdar: 'مُسَاعَدَةٌ',
		pattern: 'مُفَاعَلَةٌ',
		meaning: 'membantu',
		dataId: 'ساعد-III-1',
		wazanBab: 8,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/ساعد',
		status: 'draft' as const
	},
	{
		id: 'qatala',
		form: 'III',
		verb: 'قَاتَلَ',
		present: 'يُقَاتِلُ',
		masdar: 'قِتَالٌ',
		pattern: 'فِعَالٌ',
		meaning: 'bertempur; memerangi',
		dataId: 'قاتل-III-1',
		wazanBab: 8,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/قاتل',
		status: 'draft' as const
	},
	{
		id: 'taallama',
		form: 'V',
		verb: 'تَعَلَّمَ',
		present: 'يَتَعَلَّمُ',
		masdar: 'تَعَلُّمٌ',
		pattern: 'تَفَعُّلٌ',
		meaning: 'belajar (sesuatu)',
		dataId: 'تعلم-V-1',
		wazanBab: 11,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/تعلم',
		status: 'draft' as const
	},
	{
		id: 'taawana',
		form: 'VI',
		verb: 'تَعَاوَنَ',
		present: 'يَتَعَاوَنُ',
		masdar: 'تَعَاوُنٌ',
		pattern: 'تَفَاعُلٌ',
		meaning: 'bekerja sama',
		dataId: 'تعاون-VI-1',
		wazanBab: 10,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/تعاون',
		status: 'draft' as const
	},
	{
		id: 'inqataa',
		form: 'VII',
		verb: 'اِنْقَطَعَ',
		present: 'يَنْقَطِعُ',
		masdar: 'اِنْقِطَاعٌ',
		pattern: 'اِنْفِعَالٌ',
		meaning: 'terputus',
		dataId: 'انقطع-VII-1',
		wazanBab: 13,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/انقطع',
		status: 'draft' as const
	},
	{
		id: 'ihmarra',
		form: 'IX',
		verb: 'اِحْمَرَّ',
		present: 'يَحْمَرُّ',
		masdar: 'اِحْمِرَارٌ',
		pattern: 'اِفْعِلَالٌ',
		meaning: 'menjadi merah; tersipu',
		dataId: 'احمر-IX-1',
		wazanBab: 14,
		ruleId: 'g02.masdar-vs-fiil',
		source: 'https://en.wiktionary.org/wiki/احمر',
		status: 'draft' as const
	},
	{
		id: 'nazama',
		form: 'II',
		verb: 'نَظَّمَ',
		present: 'يُنَظِّمُ',
		masdar: 'تَنْظِيمٌ',
		pattern: 'تَفْعِيلٌ',
		meaning: 'menata; menyelenggarakan',
		dataId: 'نظم-II-1',
		wazanBab: 7,
		ruleId: 'g02.masdar-form-ii-iv',
		source: 'https://en.wiktionary.org/wiki/نظم',
		status: 'draft' as const
	},
	{
		id: 'arsala',
		form: 'IV',
		verb: 'أَرْسَلَ',
		present: 'يُرْسِلُ',
		masdar: 'إِرْسَالٌ',
		pattern: 'إِفْعَالٌ',
		meaning: 'mengirim',
		dataId: 'أرسل-IV-1',
		wazanBab: 9,
		ruleId: 'g02.masdar-form-ii-iv',
		source: 'https://en.wiktionary.org/wiki/أرسل',
		status: 'draft' as const
	}
] as const;
export type MasdarId = (typeof masdarLexemes)[number]['id'];

export const masdarRules = [
	{
		id: 'masdar-vs-verb',
		ruleId: 'g02.masdar-vs-fiil',
		prerequisites: rulePrerequisites(['g02.tashrif-istilahi'], ['CB-15', 'CB-16']),
		evidence: 'Konsep: Mohamed dan Issa, 5.2 Grammar (CC BY 4.0).',
		title: 'Fi‘il menyatakan perbuatan; maṣdar menamai perbuatannya',
		note: 'Maṣdar adalah isim yang menyatakan kegiatan atau keadaan yang berkaitan dengan fi‘il. Ia tidak membawa kala atau dhamir sebagaimana bentuk fi‘il yang dikonjugasikan.',
		caution:
			'Bentuk maṣdar fi‘il Form I sering tidak dapat ditebak dari satu pola. Catat pasangan verba dan maṣdar dari kamus.'
	},
	{
		id: 'masdar-as-noun',
		ruleId: 'g02.masdar-sebagai-isim',
		prerequisites: rulePrerequisites(['g02.masdar-vs-fiil'], ['CR-03']),
		evidence: 'Konsep: Mohamed dan Issa, 5.2 Grammar (CC BY 4.0).',
		title: 'Maṣdar tetap mengikuti kaidah isim',
		note: 'Maṣdar dapat menjadi mubtada, maf‘ūl bih, dan berada dalam susunan iḍāfah atau sesudah kata depan. Akhir katanya dapat berubah karena kedudukannya dalam kalimat.',
		caution: 'Maṣdar tidak selalu memakai ال; bentuk nakirah dan konstruksi iḍāfah juga wajar.'
	},
	{
		id: 'masdar-document',
		ruleId: 'g02.masdar-dalam-dokumen',
		prerequisites: rulePrerequisites(['g02.masdar-sebagai-isim'], ['CB-21']),
		evidence: 'Konsep: Mohamed dan Issa, 5.2 Grammar (CC BY 4.0).',
		title: 'Maṣdar banyak muncul dalam judul dan informasi formal',
		note: 'Bacaan jadwal atau dokumen formal dapat menamai kegiatan sebagai nomina, misalnya penggunaan, pembacaan atau pertemuan, tanpa selalu menuliskan kalimat kerja lengkap.',
		caution:
			'Makna masing-masing maṣdar bisa bergeser menurut konteks. Menemukan akar yang sama belum memverifikasi semua padanan.'
	},
	{
		id: 'masdar-form-ii-iv',
		ruleId: 'g02.masdar-form-ii-iv',
		prerequisites: rulePrerequisites(['g02.masdar-vs-fiil'], ['CR-01']),
		evidence:
			'Pasangan نَظَّمَ dan أَرْسَلَ diperiksa pada baris نظم-II-1 dan أرسل-IV-1 di data/wiktionary/verbs-mazid.json. Halaman konsep Mohamed dan Issa tidak memuat pola maṣdar bentuk turunan.',
		title: 'Form II dan Form IV: pola yang lebih teratur',
		note: 'Verba Form II berpola فَعَّلَ mempunyai maṣdar تَفْعِيلٌ (نَظَّمَ menjadi تَنْظِيمٌ). Verba Form IV berpola أَفْعَلَ mempunyai maṣdar إِفْعَالٌ (أَرْسَلَ menjadi إِرْسَالٌ). Pola ini membantu menebak bentuk untuk akar ṣaḥīḥ, tidak untuk semua akar.',
		caution:
			'Akar mu‘tal atau mahmūz dapat mengubah bentuk maṣdar Form II dan IV. Periksa entri kamus sebelum memakai pola ini pada akar lain.'
	}
] as const;

export type MasdarTask = {
	id: string;
	kind: 'verb' | 'nominal' | 'preposition' | 'meaning';
	arabic: string;
	question: string;
	answer: string;
	lexemeId: MasdarId;
	status: 'draft';
};

export const masdarTasks: readonly MasdarTask[] = [
	{
		id: 'm01',
		kind: 'verb',
		arabic: 'كَتَبَ الْمُوَظَّفُ رِسَالَةً.',
		question: 'Di mana fi‘il yang menyatakan perbuatan, bukan nama kegiatannya?',
		answer: 'كَتَبَ adalah fi‘il māḍī (ia menulis). رِسَالَةً menjadi objek.',
		lexemeId: 'kataba',
		status: 'draft'
	},
	{
		id: 'm02',
		kind: 'nominal',
		arabic: 'كِتَابَةُ الرِّسَالَةِ مُهِمَّةٌ.',
		question: 'Kata mana yang menamai kegiatan dan menjadi pokok kalimat?',
		answer:
			'كِتَابَةُ menamai kegiatan menulis dan di sini menjadi mubtada; الرِّسَالَةِ melengkapinya dalam iḍāfah.',
		lexemeId: 'kataba',
		status: 'draft'
	},
	{
		id: 'm03',
		kind: 'preposition',
		arabic: 'قَبْلَ كِتَابَةِ الرِّسَالَةِ',
		question: 'Mengapa كِتَابَةِ di sini berakhir kasrah?',
		answer:
			'Setelah keterangan قَبْلَ, maṣdar كِتَابَةِ berfungsi sebagai muḍāf ilaih dan berstatus majrūr; ini frasa, belum kalimat lengkap.',
		lexemeId: 'kataba',
		status: 'draft'
	},
	{
		id: 'm04',
		kind: 'meaning',
		arabic: 'تَحْتَاجُ الْكِتَابَةُ إِلَى تَدْرِيبٍ.',
		question: 'Adakah maṣdar yang menjadi pelaku gramatikal, bukan tindakan berwaktu?',
		answer:
			'الْكِتَابَةُ adalah maṣdar yang berfungsi sebagai fā‘il untuk تَحْتَاجُ: menulis membutuhkan latihan.',
		lexemeId: 'kataba',
		status: 'draft'
	},
	{
		id: 'm05',
		kind: 'verb',
		arabic: 'قَرَأَ الطَّالِبُ التَّقْرِيرَ.',
		question: 'Apa bukti bahwa قَرَأَ bukan maṣdar?',
		answer:
			'قَرَأَ adalah bentuk fi‘il māḍī dengan pelaku الطَّالِبُ; peristiwa membaca diungkapkan melalui kata kerja.',
		lexemeId: 'qaraa',
		status: 'draft'
	},
	{
		id: 'm06',
		kind: 'nominal',
		arabic: 'قِرَاءَةُ التَّقْرِيرِ مُفِيدَةٌ.',
		question: 'Tentukan maṣdar yang menjadi subjek berita.',
		answer:
			'قِرَاءَةُ adalah maṣdar dan mubtada, sedangkan مُفِيدَةٌ adalah khabar feminin: membaca laporan itu bermanfaat.',
		lexemeId: 'qaraa',
		status: 'draft'
	},
	{
		id: 'm07',
		kind: 'preposition',
		arabic: 'بَعْدَ قِرَاءَةِ التَّقْرِيرِ',
		question: 'Apakah contoh ini menyatakan siapa yang membaca?',
		answer:
			'Tidak. Frasa ini berarti sesudah membaca laporan, tanpa pelaku yang dinyatakan. قِرَاءَةِ adalah maṣdar dalam susunan iḍāfah.',
		lexemeId: 'qaraa',
		status: 'draft'
	},
	{
		id: 'm08',
		kind: 'meaning',
		arabic: 'أُحِبُّ الْقِرَاءَةَ.',
		question: 'Apa fungsi kata الْقِرَاءَةَ?',
		answer: 'Maṣdar ini menjadi maf‘ūl bih dari أُحِبُّ, yang berarti saya menyukai kegiatan membaca.',
		lexemeId: 'qaraa',
		status: 'draft'
	},
	{
		id: 'm09',
		kind: 'verb',
		arabic: 'دَرَسَ الطَّالِبُ اللُّغَةَ.',
		question: 'Bentuk apakah دَرَسَ dan apa objeknya?',
		answer: 'دَرَسَ adalah fi‘il māḍī; اللُّغَةَ adalah objek yang dipelajari.',
		lexemeId: 'darasa',
		status: 'draft'
	},
	{
		id: 'm10',
		kind: 'nominal',
		arabic: 'دِرَاسَةُ اللُّغَةِ مُفِيدَةٌ.',
		question: 'Mengapa دِرَاسَةُ tidak dapat dianggap fi‘il lampau?',
		answer:
			'دِرَاسَةُ adalah isim maṣdar yang menamai kegiatan mempelajari bahasa; pada kalimat ini ia berfungsi sebagai mubtada.',
		lexemeId: 'darasa',
		status: 'draft'
	},
	{
		id: 'm11',
		kind: 'preposition',
		arabic: 'قَبْلَ دِرَاسَةِ اللُّغَةِ',
		question: 'Apa hubungan dua isim setelah قَبْلَ?',
		answer:
			"دِرَاسَةِ اللُّغَةِ membentuk iḍāfah; maṣdar menjadi bagian susunan waktu 'sebelum mempelajari bahasa'.",
		lexemeId: 'darasa',
		status: 'draft'
	},
	{
		id: 'm12',
		kind: 'meaning',
		arabic: 'دِرَاسَةٌ جَدِيدَةٌ',
		question: 'Adakah kata kerja dalam frasa ini?',
		answer:
			'Tidak ada fi‘il. دِرَاسَةٌ adalah nomina dan جَدِيدَةٌ sifatnya; konteks dapat bermakna sebuah studi baru.',
		lexemeId: 'darasa',
		status: 'draft'
	},
	{
		id: 'm13',
		kind: 'verb',
		arabic: 'اِسْتَعْمَلَ الْمُوَظَّفُ الْحَاسُوبَ.',
		question: 'Bentuk fi‘il mana yang menyatakan tindakan menggunakan?',
		answer: 'اِسْتَعْمَلَ adalah fi‘il māḍī Form X dan الْحَاسُوبَ adalah objeknya.',
		lexemeId: 'istaamala',
		status: 'draft'
	},
	{
		id: 'm14',
		kind: 'nominal',
		arabic: 'اِسْتِعْمَالُ الْحَاسُوبِ سَهْلٌ.',
		question: 'Bandingkan اِسْتِعْمَالُ dengan اِسْتَعْمَلَ.',
		answer:
			'اِسْتِعْمَالُ menamai kegiatan penggunaan sebagai maṣdar Form X; سَهْلٌ memberitakan bahwa penggunaan komputer mudah.',
		lexemeId: 'istaamala',
		status: 'draft'
	},
	{
		id: 'm15',
		kind: 'preposition',
		arabic: 'بَعْدَ اِسْتِعْمَالِ الْحَاسُوبِ',
		question: 'Mengapa tidak ada bentuk kala dari verba dalam frasa ini?',
		answer:
			"Frasa ini memakai maṣdar اِسْتِعْمَالِ untuk kegiatan 'penggunaan', bukan fi‘il yang menunjukkan suatu peristiwa dengan pelaku.",
		lexemeId: 'istaamala',
		status: 'draft'
	},
	{
		id: 'm16',
		kind: 'meaning',
		arabic: 'اِسْتِعْمَالٌ صَحِيحٌ',
		question: 'Apa hubungan dua unsur ini?',
		answer:
			"اِسْتِعْمَالٌ adalah maṣdar dan صَحِيحٌ na‘at yang menilainya 'penggunaan yang benar'. Keduanya nakirah.",
		lexemeId: 'istaamala',
		status: 'draft'
	},
	{
		id: 'm17',
		kind: 'verb',
		arabic: 'اِجْتَمَعَ الْمُدَرِّسُونَ.',
		question: "Mengapa اِجْتَمَعَ bukan kata benda 'rapat'?",
		answer:
			'اِجْتَمَعَ adalah fi‘il māḍī Form VIII. الْمُدَرِّسُونَ merupakan fā‘il jamak yang diletakkan setelah fi‘il.',
		lexemeId: 'ijtamaa',
		status: 'draft'
	},
	{
		id: 'm18',
		kind: 'nominal',
		arabic: 'اِجْتِمَاعُ الْفَرِيقِ قَصِيرٌ.',
		question: 'Apa yang diterangkan oleh قَصِيرٌ?',
		answer:
			'اِجْتِمَاعُ الْفَرِيقِ adalah frasa isim sebagai mubtada: rapat tim. قَصِيرٌ adalah khabar: berlangsung singkat.',
		lexemeId: 'ijtamaa',
		status: 'draft'
	},
	{
		id: 'm19',
		kind: 'preposition',
		arabic: 'بَعْدَ اِجْتِمَاعِ الْفَرِيقِ',
		question: 'Apakah ini frasa waktu atau kalimat predikatif?',
		answer:
			'Frasa waktu. Maṣdar اِجْتِمَاعِ berada dalam susunan iḍāfah setelah بَعْدَ dan belum menyatakan berita lengkap.',
		lexemeId: 'ijtamaa',
		status: 'draft'
	},
	{
		id: 'm20',
		kind: 'meaning',
		arabic: 'اِجْتِمَاعٌ قَصِيرٌ',
		question: 'Sifat manakah yang mengikuti maṣdar?',
		answer:
			'قَصِيرٌ adalah na‘at yang menerangkan اِجْتِمَاعٌ. Keduanya nakirah: sebuah pertemuan singkat.',
		lexemeId: 'ijtamaa',
		status: 'draft'
	},
	{
		id: 'm21',
		kind: 'verb',
		arabic: 'سَاعَدَ الطَّبِيبُ الْمَرِيضَ.',
		question: 'Di mana fi‘il yang menyatakan perbuatan, bukan nama kegiatannya?',
		answer:
			'سَاعَدَ adalah fi‘il māḍī Form III (ia membantu). الطَّبِيبُ adalah fā‘il dan الْمَرِيضَ adalah objek.',
		lexemeId: 'saada',
		status: 'draft'
	},
	{
		id: 'm22',
		kind: 'nominal',
		arabic: 'مُسَاعَدَةُ الْمَرِيضِ ضَرُورِيَّةٌ.',
		question: 'Kata mana yang menamai kegiatan dan menjadi pokok kalimat?',
		answer:
			'مُسَاعَدَةُ adalah maṣdar Form III berpola مُفَاعَلَةٌ dan menjadi mubtada. الْمَرِيضِ adalah muḍāf ilaih, dan ضَرُورِيَّةٌ adalah khabar: membantu pasien itu perlu.',
		lexemeId: 'saada',
		status: 'draft'
	},
	{
		id: 'm23',
		kind: 'preposition',
		arabic: 'بِمُسَاعَدَةِ الْمُدَرِّسِ',
		question: 'Mengapa kedua isim dalam frasa ini berkasrah?',
		answer:
			'مُسَاعَدَةِ majrūr karena huruf jar بِـ, dan الْمُدَرِّسِ adalah muḍāf ilaih majrūr. Ini frasa, belum kalimat: dengan bantuan guru.',
		lexemeId: 'saada',
		status: 'draft'
	},
	{
		id: 'm24',
		kind: 'meaning',
		arabic: 'نَحْتَاجُ إِلَى مُسَاعَدَةٍ.',
		question: 'Apakah مُسَاعَدَةٍ menyebut pelaku atau nama kegiatan?',
		answer: 'Nama kegiatan. Maṣdar nakirah ini majrūr setelah إِلَى: kita memerlukan bantuan.',
		lexemeId: 'saada',
		status: 'draft'
	},
	{
		id: 'm25',
		kind: 'verb',
		arabic: 'قَاتَلَ الْجُنُودُ بِشَجَاعَةٍ.',
		question: 'Bentuk apakah قَاتَلَ dan siapa pelakunya?',
		answer:
			'قَاتَلَ adalah fi‘il māḍī Form III. الْجُنُودُ adalah fā‘il marfū‘ yang diletakkan sesudah fi‘il, dan بِشَجَاعَةٍ menyatakan cara: para prajurit bertempur dengan berani.',
		lexemeId: 'qatala',
		status: 'draft'
	},
	{
		id: 'm26',
		kind: 'nominal',
		arabic: 'الْقِتَالُ خَطِيرٌ.',
		question: 'Maṣdar apakah الْقِتَالُ dan apa fungsinya?',
		answer:
			'الْقِتَالُ adalah maṣdar Form III berpola فِعَالٌ (entri kamus juga mencatat مُقَاتَلَةٌ). Ia menjadi mubtada, dan خَطِيرٌ adalah khabar: pertempuran itu berbahaya.',
		lexemeId: 'qatala',
		status: 'draft'
	},
	{
		id: 'm27',
		kind: 'preposition',
		arabic: 'بَعْدَ الْقِتَالِ',
		question: 'Apa hubungan بَعْدَ dan الْقِتَالِ?',
		answer:
			'بَعْدَ adalah muḍāf dan الْقِتَالِ adalah muḍāf ilaih majrūr. Frasa waktu ini berarti sesudah pertempuran, belum kalimat lengkap.',
		lexemeId: 'qatala',
		status: 'draft'
	},
	{
		id: 'm28',
		kind: 'meaning',
		arabic: 'قِتَالٌ طَوِيلٌ',
		question: 'Adakah fi‘il dalam frasa ini?',
		answer:
			'Tidak ada fi‘il. قِتَالٌ adalah maṣdar nakirah dan طَوِيلٌ adalah na‘at: pertempuran yang panjang.',
		lexemeId: 'qatala',
		status: 'draft'
	},
	{
		id: 'm29',
		kind: 'verb',
		arabic: 'تَعَلَّمَ الطِّفْلُ الْحُرُوفَ.',
		question: 'Apa bukti bahwa تَعَلَّمَ bukan maṣdar?',
		answer:
			'تَعَلَّمَ berfatḥah pada ل dan berakhir fatḥah, sedangkan maṣdar تَعَلُّمٌ berḍammah pada ل dan bertanwin. تَعَلَّمَ juga memiliki fā‘il الطِّفْلُ dan objek الْحُرُوفَ: anak itu mempelajari huruf.',
		lexemeId: 'taallama',
		status: 'draft'
	},
	{
		id: 'm30',
		kind: 'nominal',
		arabic: 'تَعَلُّمُ الْعَرَبِيَّةِ يَحْتَاجُ إِلَى صَبْرٍ.',
		question: 'Kata mana yang menamai kegiatan dan menjadi mubtada?',
		answer:
			'تَعَلُّمُ adalah maṣdar Form V berpola تَفَعُّلٌ dan menjadi mubtada. الْعَرَبِيَّةِ adalah muḍāf ilaih, dan klausa يَحْتَاجُ إِلَى صَبْرٍ adalah khabar.',
		lexemeId: 'taallama',
		status: 'draft'
	},
	{
		id: 'm31',
		kind: 'preposition',
		arabic: 'قَبْلَ تَعَلُّمِ الْقِرَاءَةِ',
		question: 'Apa hubungan tiga kata dalam frasa ini?',
		answer:
			'قَبْلَ adalah muḍāf, تَعَلُّمِ adalah muḍāf ilaih sekaligus muḍāf, dan الْقِرَاءَةِ adalah muḍāf ilaih. Artinya sebelum belajar membaca.',
		lexemeId: 'taallama',
		status: 'draft'
	},
	{
		id: 'm32',
		kind: 'meaning',
		arabic: 'تَعَلُّمٌ سَرِيعٌ',
		question: 'Apa arti frasa ini dan adakah fi‘il?',
		answer:
			'Tidak ada fi‘il. تَعَلُّمٌ adalah maṣdar dan سَرِيعٌ adalah na‘at: pembelajaran yang cepat. Maṣdar ini berbeda dari تَعْلِيمٌ (pengajaran, maṣdar Form II).',
		lexemeId: 'taallama',
		status: 'draft'
	},
	{
		id: 'm33',
		kind: 'verb',
		arabic: 'تَعَاوَنَ الْجِيرَانُ فِي تَنْظِيفِ الشَّارِعِ.',
		question: 'Tunjukkan fi‘il dan fā‘ilnya.',
		answer:
			'تَعَاوَنَ adalah fi‘il māḍī Form VI dan الْجِيرَانُ adalah fā‘il marfū‘. فِي تَنْظِيفِ الشَّارِعِ menyatakan kegiatan bersama: para tetangga bekerja sama membersihkan jalan.',
		lexemeId: 'taawana',
		status: 'draft'
	},
	{
		id: 'm34',
		kind: 'nominal',
		arabic: 'التَّعَاوُنُ مُهِمٌّ فِي الْعَمَلِ.',
		question: 'Maṣdar mana yang menjadi pokok kalimat?',
		answer:
			'التَّعَاوُنُ adalah maṣdar Form VI berpola تَفَاعُلٌ dan menjadi mubtada. مُهِمٌّ adalah khabar: kerja sama itu penting dalam pekerjaan.',
		lexemeId: 'taawana',
		status: 'draft'
	},
	{
		id: 'm35',
		kind: 'preposition',
		arabic: 'بِالتَّعَاوُنِ مَعَ الْمَدَارِسِ',
		question: 'Mengapa التَّعَاوُنِ berkasrah?',
		answer:
			'Karena huruf jar بِـ. مَعَ الْمَدَارِسِ menyebut mitra kerja samanya (مَعَ adalah muḍāf dan الْمَدَارِسِ muḍāf ilaih). Ini frasa: melalui kerja sama dengan sekolah-sekolah.',
		lexemeId: 'taawana',
		status: 'draft'
	},
	{
		id: 'm36',
		kind: 'meaning',
		arabic: 'تَعَاوُنٌ دَائِمٌ',
		question: 'Apa hubungan dua kata ini?',
		answer:
			'دَائِمٌ adalah na‘at yang menerangkan maṣdar تَعَاوُنٌ. Keduanya nakirah dan tidak ada fi‘il: kerja sama yang berkelanjutan.',
		lexemeId: 'taawana',
		status: 'draft'
	},
	{
		id: 'm37',
		kind: 'verb',
		arabic: 'اِنْقَطَعَ الْمَاءُ صَبَاحًا.',
		question: 'Bentuk fi‘il apakah اِنْقَطَعَ?',
		answer:
			'اِنْقَطَعَ adalah fi‘il māḍī Form VII. الْمَاءُ adalah fā‘il dan صَبَاحًا menyatakan waktu: air terputus pada pagi hari.',
		lexemeId: 'inqataa',
		status: 'draft'
	},
	{
		id: 'm38',
		kind: 'nominal',
		arabic: 'اِنْقِطَاعُ الْمَاءِ مُزْعِجٌ.',
		question: 'Kata mana yang menamai kejadian dan apa fungsinya?',
		answer:
			'اِنْقِطَاعُ adalah maṣdar Form VII berpola اِنْفِعَالٌ dan menjadi mubtada. الْمَاءِ adalah muḍāf ilaih, dan مُزْعِجٌ adalah khabar: terputusnya air itu mengganggu.',
		lexemeId: 'inqataa',
		status: 'draft'
	},
	{
		id: 'm39',
		kind: 'preposition',
		arabic: 'بِسَبَبِ اِنْقِطَاعِ الْكَهْرَبَاءِ',
		question: 'Berapa susunan iḍāfah dalam frasa ini?',
		answer:
			'Dua. سَبَبِ (majrūr karena بِـ) adalah muḍāf dan اِنْقِطَاعِ muḍāf ilaih-nya; lalu اِنْقِطَاعِ menjadi muḍāf bagi الْكَهْرَبَاءِ. Ketiganya majrūr: karena listrik terputus.',
		lexemeId: 'inqataa',
		status: 'draft'
	},
	{
		id: 'm40',
		kind: 'meaning',
		arabic: 'اِنْقِطَاعٌ عَنِ الدِّرَاسَةِ',
		question: 'Bagaimana memahami frasa ini?',
		answer:
			'Maṣdar اِنْقِطَاعٌ dilengkapi jar–majrūr عَنِ الدِّرَاسَةِ. Artinya berhenti dari kegiatan belajar. Frasa ini tidak menyebut pelaku.',
		lexemeId: 'inqataa',
		status: 'draft'
	},
	{
		id: 'm41',
		kind: 'verb',
		arabic: 'اِحْمَرَّ وَجْهُهُ.',
		question: 'Bentuk fi‘il apakah اِحْمَرَّ dan siapa fā‘ilnya?',
		answer:
			'اِحْمَرَّ adalah fi‘il māḍī Form IX. وَجْهُهُ adalah fā‘il marfū‘ sekaligus muḍāf dengan dhamir ـهُ: wajahnya memerah.',
		lexemeId: 'ihmarra',
		status: 'draft'
	},
	{
		id: 'm42',
		kind: 'nominal',
		arabic: 'اِحْمِرَارُ الْعَيْنِ مُزْعِجٌ.',
		question: 'Kata mana yang menamai keadaan dan apa fungsinya?',
		answer:
			'اِحْمِرَارُ adalah maṣdar Form IX berpola اِفْعِلَالٌ dan menjadi mubtada. الْعَيْنِ adalah muḍāf ilaih, dan مُزْعِجٌ adalah khabar: kemerahan pada mata itu mengganggu.',
		lexemeId: 'ihmarra',
		status: 'draft'
	},
	{
		id: 'm43',
		kind: 'preposition',
		arabic: 'بَعْدَ اِحْمِرَارِ الْجِلْدِ',
		question: 'Apakah frasa ini kalimat lengkap?',
		answer:
			'Bukan. بَعْدَ adalah muḍāf, اِحْمِرَارِ adalah muḍāf ilaih sekaligus muḍāf, dan الْجِلْدِ adalah muḍāf ilaih: sesudah kulit memerah.',
		lexemeId: 'ihmarra',
		status: 'draft'
	},
	{
		id: 'm44',
		kind: 'meaning',
		arabic: 'اِحْمِرَارٌ خَفِيفٌ',
		question: 'Apa hubungan dua kata ini?',
		answer:
			'خَفِيفٌ adalah na‘at yang menerangkan maṣdar اِحْمِرَارٌ. Keduanya nakirah dan tidak ada fi‘il: kemerahan yang ringan.',
		lexemeId: 'ihmarra',
		status: 'draft'
	},
	{
		id: 'm45',
		kind: 'verb',
		arabic: 'نَظَّمَتِ الْمَدْرَسَةُ رِحْلَةً.',
		question: 'Di mana fi‘il yang menyatakan perbuatan, dan siapa pelakunya?',
		answer:
			'نَظَّمَتْ adalah fi‘il māḍī Form II (ia menyelenggarakan) dengan tā’ ta’nīth, dibaca kasrah sebelum ال. الْمَدْرَسَةُ adalah fā‘il marfū‘ dan رِحْلَةً adalah maf‘ūl bih manṣūb: sekolah itu menyelenggarakan sebuah perjalanan.',
		lexemeId: 'nazama',
		status: 'draft'
	},
	{
		id: 'm46',
		kind: 'nominal',
		arabic: 'تَنْظِيمُ الْمَكْتَبَةِ ضَرُورِيٌّ.',
		question: 'Kata mana yang menamai kegiatan, dan apa polanya?',
		answer:
			'تَنْظِيمُ adalah maṣdar Form II berpola تَفْعِيلٌ dan menjadi mubtada. الْمَكْتَبَةِ adalah muḍāf ilaih, dan ضَرُورِيٌّ adalah khabar: penataan perpustakaan itu perlu.',
		lexemeId: 'nazama',
		status: 'draft'
	},
	{
		id: 'm47',
		kind: 'preposition',
		arabic: 'مِنْ أَجْلِ تَنْظِيمِ الْمُؤْتَمَرِ',
		question: 'Berapa susunan iḍāfah dalam frasa ini?',
		answer:
			'Dua. أَجْلِ (majrūr karena مِنْ) adalah muḍāf dan تَنْظِيمِ muḍāf ilaih-nya; lalu تَنْظِيمِ menjadi muḍāf bagi الْمُؤْتَمَرِ. Ketiganya majrūr: demi penyelenggaraan konferensi.',
		lexemeId: 'nazama',
		status: 'draft'
	},
	{
		id: 'm48',
		kind: 'meaning',
		arabic: 'تَنْظِيمٌ دَقِيقٌ',
		question: 'Adakah fi‘il dalam frasa ini, dan bagaimana kedua katanya berhubungan?',
		answer:
			'Tidak ada fi‘il. دَقِيقٌ adalah na‘at yang menerangkan maṣdar تَنْظِيمٌ; keduanya nakirah dan marfū‘ sebagai bentuk berdiri sendiri: penataan yang teliti.',
		lexemeId: 'nazama',
		status: 'draft'
	},
	{
		id: 'm49',
		kind: 'verb',
		arabic: 'أَرْسَلَ الْمُوَظَّفُ الْمِلَفَّ إِلَى الْمُدِيرِ.',
		question: 'Tentukan fi‘il, fā‘il, maf‘ūl bih dan jar–majrūr.',
		answer:
			'أَرْسَلَ adalah fi‘il māḍī Form IV (ia mengirim). الْمُوَظَّفُ adalah fā‘il marfū‘, الْمِلَفَّ adalah maf‘ūl bih manṣūb, dan إِلَى الْمُدِيرِ adalah jar–majrūr: karyawan itu mengirim berkas kepada direktur.',
		lexemeId: 'arsala',
		status: 'draft'
	},
	{
		id: 'm50',
		kind: 'nominal',
		arabic: 'إِرْسَالُ الْمِلَفِّ سَرِيعٌ.',
		question: 'Kata mana yang menamai kegiatan, dan bagaimana ia berfungsi?',
		answer:
			'إِرْسَالُ adalah maṣdar Form IV berpola إِفْعَالٌ dan menjadi mubtada. الْمِلَفِّ adalah muḍāf ilaih, dan سَرِيعٌ adalah khabar: pengiriman berkas itu cepat.',
		lexemeId: 'arsala',
		status: 'draft'
	},
	{
		id: 'm51',
		kind: 'preposition',
		arabic: 'بَعْدَ إِرْسَالِ الرِّسَالَةِ',
		question: 'Apakah frasa ini kalimat lengkap?',
		answer:
			'Bukan. بَعْدَ adalah ẓarf manṣūb dan muḍāf, إِرْسَالِ adalah muḍāf ilaih sekaligus muḍāf, dan الرِّسَالَةِ adalah muḍāf ilaih: sesudah pengiriman surat.',
		lexemeId: 'arsala',
		status: 'draft'
	},
	{
		id: 'm52',
		kind: 'meaning',
		arabic: 'إِرْسَالٌ مَجَّانِيٌّ',
		question: 'Bagaimana memahami frasa ini?',
		answer:
			'مَجَّانِيٌّ adalah na‘at yang menerangkan maṣdar إِرْسَالٌ. Tidak ada fi‘il dan tidak disebut pelaku: pengiriman gratis.',
		lexemeId: 'arsala',
		status: 'draft'
	}
];

export function validateMasdarTasks(items: readonly MasdarTask[]): string[] {
	const errors: string[] = [];
	const ids = new Set<string>();
	const stimuli = new Set<string>();
	for (const item of items) {
		if (ids.has(item.id)) errors.push(`Duplicate task ID: ${item.id}`);
		if (stimuli.has(item.arabic.normalize('NFC')))
			errors.push(`Duplicate Arabic stimulus: ${item.id}`);
		ids.add(item.id);
		stimuli.add(item.arabic.normalize('NFC'));
		if (!item.arabic.trim() || !item.question.trim() || !item.answer.trim())
			errors.push(`Empty task: ${item.id}`);
		if (!masdarLexemes.some((lemma) => lemma.id === item.lexemeId))
			errors.push(`Missing lexical source: ${item.id}`);
	}
	for (const lemma of masdarLexemes) {
		const count = items.filter((item) => item.lexemeId === lemma.id).length;
		if (count !== 4) errors.push(`Four tasks are required per lexeme: ${lemma.id} has ${count}`);
	}
	return errors;
}
