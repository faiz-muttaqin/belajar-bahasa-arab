/**
 * OER-02: original MSA maṣdar learning with five attested verb/maṣdar pairs.
 * The lexical sources corroborate pairs, NOT all newly written Arabic sentences.
 * No external source lesson text or exercise is reproduced; material remains draft.
 */
export const masdarGrammarSource = {
	name: 'Elementary Arabic · 5.2 Grammar (Mohamed and Issa)',
	href: 'https://human.libretexts.org/Bookshelves/Languages/Arabic/Elementary_Arabic_(Mohamed_and_Issa)/05:_Hobbies_and_Sports/5.02:_Grammar',
	license: 'CC BY 4.0 (this page; checked 2026-11-17)',
	usage: 'Rujukan konsep maṣdar sebagai verbal noun, bukan salinan latihan'
} as const;

export const masdarLexemes = [
	{ id: 'kataba', verb: 'كَتَبَ', present: 'يَكْتُبُ', masdar: 'كِتَابَةٌ', meaning: 'menulis', source: 'https://en.wiktionary.org/wiki/كتب', status: 'draft' as const },
	{ id: 'qaraa', verb: 'قَرَأَ', present: 'يَقْرَأُ', masdar: 'قِرَاءَةٌ', meaning: 'membaca', source: 'https://en.wiktionary.org/wiki/قرأ', status: 'draft' as const },
	{ id: 'darasa', verb: 'دَرَسَ', present: 'يَدْرُسُ', masdar: 'دِرَاسَةٌ', meaning: 'belajar atau mempelajari', source: 'https://en.wiktionary.org/wiki/درس', status: 'draft' as const },
	{ id: 'istaamala', verb: 'اِسْتَعْمَلَ', present: 'يَسْتَعْمِلُ', masdar: 'اِسْتِعْمَالٌ', meaning: 'menggunakan', source: 'https://en.wiktionary.org/wiki/استعمل', status: 'draft' as const },
	{ id: 'ijtamaa', verb: 'اِجْتَمَعَ', present: 'يَجْتَمِعُ', masdar: 'اِجْتِمَاعٌ', meaning: 'berkumpul atau mengadakan pertemuan', source: 'https://en.wiktionary.org/wiki/اجتمع', status: 'draft' as const }
] as const;
export type MasdarId = (typeof masdarLexemes)[number]['id'];

export const masdarRules = [
	{
		id: 'masdar-vs-verb',
		title: 'Fi‘il menyatakan perbuatan; maṣdar menamai perbuatannya',
		note: 'Maṣdar adalah isim yang menyatakan kegiatan atau keadaan yang berkaitan dengan fi‘il. Ia tidak membawa kala atau dhamir sebagaimana bentuk fi‘il yang dikonjugasikan.',
		caution: 'Bentuk maṣdar fi‘il Form I sering tidak dapat ditebak dari satu pola. Catat pasangan verba dan maṣdar dari kamus.'
	},
	{
		id: 'masdar-as-noun',
		title: 'Maṣdar tetap mengikuti kaidah isim',
		note: 'Maṣdar dapat menjadi mubtada, maf‘ūl bih, dan berada dalam susunan iḍāfah atau sesudah kata depan. Akhir katanya dapat berubah karena kedudukannya dalam kalimat.',
		caution: 'Maṣdar tidak selalu memakai ال; bentuk nakirah dan konstruksi iḍāfah juga wajar.'
	},
	{
		id: 'masdar-document',
		title: 'Maṣdar banyak muncul dalam judul dan informasi formal',
		note: 'Bacaan jadwal atau dokumen formal dapat menamai kegiatan sebagai nomina, misalnya penggunaan, pembacaan atau pertemuan, tanpa selalu menuliskan kalimat kerja lengkap.',
		caution: 'Makna masing-masing maṣdar bisa bergeser menurut konteks. Menemukan akar yang sama belum memverifikasi semua padanan.'
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
	{ id: 'm01', kind: 'verb', arabic: 'كَتَبَ الْمُوَظَّفُ رِسَالَةً.', question: "Di mana fi‘il yang menyatakan perbuatan, bukan nama kegiatannya?", answer: "كَتَبَ adalah fi‘il māḍī (ia menulis). رِسَالَةً menjadi objek.", lexemeId: 'kataba', status: 'draft' },
	{ id: 'm02', kind: 'nominal', arabic: 'كِتَابَةُ الرِّسَالَةِ مُهِمَّةٌ.', question: "Kata mana yang menamai kegiatan dan menjadi pokok kalimat?", answer: "كِتَابَةُ menamai kegiatan menulis dan di sini menjadi mubtada; الرِّسَالَةِ melengkapinya dalam iḍāfah.", lexemeId: 'kataba', status: 'draft' },
	{ id: 'm03', kind: 'preposition', arabic: 'قَبْلَ كِتَابَةِ الرِّسَالَةِ', question: "Mengapa كِتَابَةِ di sini berakhir kasrah?", answer: "Setelah keterangan قَبْلَ, maṣdar كِتَابَةِ berfungsi sebagai muḍāf ilaih dan berstatus majrūr; ini frasa, belum kalimat lengkap.", lexemeId: 'kataba', status: 'draft' },
	{ id: 'm04', kind: 'meaning', arabic: 'تَحْتَاجُ الْكِتَابَةُ إِلَى تَدْرِيبٍ.', question: "Adakah maṣdar yang menjadi pelaku gramatikal, bukan tindakan berwaktu?", answer: "الْكِتَابَةُ adalah maṣdar yang berfungsi sebagai fā‘il untuk تَحْتَاجُ: menulis membutuhkan latihan.", lexemeId: 'kataba', status: 'draft' },
	{ id: 'm05', kind: 'verb', arabic: 'قَرَأَ الطَّالِبُ التَّقْرِيرَ.', question: "Apa bukti bahwa قَرَأَ bukan maṣdar?", answer: "قَرَأَ adalah bentuk fi‘il māḍī dengan pelaku الطَّالِبُ; peristiwa membaca diungkapkan melalui kata kerja.", lexemeId: 'qaraa', status: 'draft' },
	{ id: 'm06', kind: 'nominal', arabic: 'قِرَاءَةُ التَّقْرِيرِ مُفِيدَةٌ.', question: "Tentukan maṣdar yang menjadi subjek berita.", answer: "قِرَاءَةُ adalah maṣdar dan mubtada, sedangkan مُفِيدَةٌ adalah khabar feminin: membaca laporan itu bermanfaat.", lexemeId: 'qaraa', status: 'draft' },
	{ id: 'm07', kind: 'preposition', arabic: 'بَعْدَ قِرَاءَةِ التَّقْرِيرِ', question: "Apakah contoh ini menyatakan siapa yang membaca?", answer: "Tidak. Frasa ini berarti sesudah membaca laporan, tanpa pelaku yang dinyatakan. قِرَاءَةِ adalah maṣdar dalam susunan iḍāfah.", lexemeId: 'qaraa', status: 'draft' },
	{ id: 'm08', kind: 'meaning', arabic: 'أُحِبُّ الْقِرَاءَةَ.', question: "Apa fungsi kata الْقِرَاءَةَ?", answer: "Maṣdar ini menjadi maf‘ūl bih dari أُحِبُّ, yang berarti saya menyukai kegiatan membaca.", lexemeId: 'qaraa', status: 'draft' },
	{ id: 'm09', kind: 'verb', arabic: 'دَرَسَ الطَّالِبُ اللُّغَةَ.', question: "Bentuk apakah دَرَسَ dan apa objeknya?", answer: "دَرَسَ adalah fi‘il māḍī; اللُّغَةَ adalah objek yang dipelajari.", lexemeId: 'darasa', status: 'draft' },
	{ id: 'm10', kind: 'nominal', arabic: 'دِرَاسَةُ اللُّغَةِ مُفِيدَةٌ.', question: "Mengapa دِرَاسَةُ tidak dapat dianggap fi‘il lampau?", answer: "دِرَاسَةُ adalah isim maṣdar yang menamai kegiatan mempelajari bahasa; pada kalimat ini ia berfungsi sebagai mubtada.", lexemeId: 'darasa', status: 'draft' },
	{ id: 'm11', kind: 'preposition', arabic: 'قَبْلَ دِرَاسَةِ اللُّغَةِ', question: "Apa hubungan dua isim setelah قَبْلَ?", answer: "دِرَاسَةِ اللُّغَةِ membentuk iḍāfah; maṣdar menjadi bagian susunan waktu 'sebelum mempelajari bahasa'.", lexemeId: 'darasa', status: 'draft' },
	{ id: 'm12', kind: 'meaning', arabic: 'دِرَاسَةٌ جَدِيدَةٌ', question: "Adakah kata kerja dalam frasa ini?", answer: "Tidak ada fi‘il. دِرَاسَةٌ adalah nomina dan جَدِيدَةٌ sifatnya; konteks dapat bermakna sebuah studi baru.", lexemeId: 'darasa', status: 'draft' },
	{ id: 'm13', kind: 'verb', arabic: 'اِسْتَعْمَلَ الْمُوَظَّفُ الْحَاسُوبَ.', question: "Bentuk fi‘il mana yang menyatakan tindakan menggunakan?", answer: "اِسْتَعْمَلَ adalah fi‘il māḍī Form X dan الْحَاسُوبَ adalah objeknya.", lexemeId: 'istaamala', status: 'draft' },
	{ id: 'm14', kind: 'nominal', arabic: 'اِسْتِعْمَالُ الْحَاسُوبِ سَهْلٌ.', question: "Bandingkan اِسْتِعْمَالُ dengan اِسْتَعْمَلَ.", answer: "اِسْتِعْمَالُ menamai kegiatan penggunaan sebagai maṣdar Form X; سَهْلٌ memberitakan bahwa penggunaan komputer mudah.", lexemeId: 'istaamala', status: 'draft' },
	{ id: 'm15', kind: 'preposition', arabic: 'بَعْدَ اِسْتِعْمَالِ الْحَاسُوبِ', question: "Mengapa tidak ada bentuk kala dari verba dalam frasa ini?", answer: "Frasa ini memakai maṣdar اِسْتِعْمَالِ untuk kegiatan 'penggunaan', bukan fi‘il yang menunjukkan suatu peristiwa dengan pelaku.", lexemeId: 'istaamala', status: 'draft' },
	{ id: 'm16', kind: 'meaning', arabic: 'اِسْتِعْمَالٌ صَحِيحٌ', question: "Apa hubungan dua unsur ini?", answer: "اِسْتِعْمَالٌ adalah maṣdar dan صَحِيحٌ na‘at yang menilainya 'penggunaan yang benar'. Keduanya nakirah.", lexemeId: 'istaamala', status: 'draft' },
	{ id: 'm17', kind: 'verb', arabic: 'اِجْتَمَعَ الْمُدَرِّسُونَ.', question: "Mengapa اِجْتَمَعَ bukan kata benda 'rapat'?", answer: "اِجْتَمَعَ adalah fi‘il māḍī Form VIII. الْمُدَرِّسُونَ merupakan fā‘il jamak yang diletakkan setelah fi‘il.", lexemeId: 'ijtamaa', status: 'draft' },
	{ id: 'm18', kind: 'nominal', arabic: 'اِجْتِمَاعُ الْفَرِيقِ قَصِيرٌ.', question: "Apa yang diterangkan oleh قَصِيرٌ?", answer: "اِجْتِمَاعُ الْفَرِيقِ adalah frasa isim sebagai mubtada: rapat tim. قَصِيرٌ adalah khabar: berlangsung singkat.", lexemeId: 'ijtamaa', status: 'draft' },
	{ id: 'm19', kind: 'preposition', arabic: 'بَعْدَ اِجْتِمَاعِ الْفَرِيقِ', question: "Apakah ini frasa waktu atau kalimat predikatif?", answer: "Frasa waktu. Maṣdar اِجْتِمَاعِ berada dalam susunan iḍāfah setelah بَعْدَ dan belum menyatakan berita lengkap.", lexemeId: 'ijtamaa', status: 'draft' },
	{ id: 'm20', kind: 'meaning', arabic: 'اِجْتِمَاعٌ قَصِيرٌ', question: "Sifat manakah yang mengikuti maṣdar?", answer: "قَصِيرٌ adalah na‘at yang menerangkan اِجْتِمَاعٌ. Keduanya nakirah: sebuah pertemuan singkat.", lexemeId: 'ijtamaa', status: 'draft' }
];

export function validateMasdarTasks(items: readonly MasdarTask[]): string[] {
	const errors: string[] = [];
	const ids = new Set<string>();
	const stimuli = new Set<string>();
	if (items.length !== 20) errors.push('20 different reading prompts are required for the pilot');
	for (const item of items) {
		if (ids.has(item.id)) errors.push(`Duplicate task ID: ${item.id}`);
		if (stimuli.has(item.arabic.normalize('NFC'))) errors.push(`Duplicate Arabic stimulus: ${item.id}`);
		ids.add(item.id);
		stimuli.add(item.arabic.normalize('NFC'));
		if (!item.arabic.trim() || !item.question.trim() || !item.answer.trim()) errors.push(`Empty task: ${item.id}`);
		if (!masdarLexemes.some((lemma) => lemma.id === item.lexemeId)) errors.push(`Missing lexical source: ${item.id}`);
	}
	return errors;
}
