/** Original Indonesian explanations and example sentences based on cited grammar rules.
 * Status remains draft; references validate rule/lexeme, not necessarily every new sentence.
 * No examples copied from course materials. */
export const nisbahSources = {
	grammar: {
		label: 'LibreTexts · Introduction to Arabic II, Grammar (1)',
		href: 'https://human.libretexts.org/Bookshelves/Languages/Arabic/Introduction_to_Arabic_II_(Hanaa_Alkassas_Layla_Bahar_Al-Aloom_and_Samira_Murtada)/01:_Myself_and_My_Family/1.06:_Grammar_(1)',
		license: 'CC BY 4.0',
		usage: 'Kaida nisbah dan ma‘rifah; tidak menyalin teks atau latihan'
	},
	agreement: {
		label: 'Madinah Arabic · Lesson 9 Part 2',
		href: 'https://madinaharabic.com/free-content/grammar/lesson-9/part-2',
		license: 'View-only',
		usage: 'Rujukan kesesuaian na‘at; contoh dibuat mandiri'
	},
	arabic: { label: 'Wiktionary · عربي', href: 'https://en.wiktionary.org/wiki/عربي', license: 'CC BY-SA 4.0/GFDL', usage: 'Pemeriksaan lema, bukan izin menyalin contoh' },
	official: { label: 'Wiktionary · رسمي', href: 'https://en.wiktionary.org/wiki/رسمي', license: 'CC BY-SA 4.0/GFDL', usage: 'Pemeriksaan lema, bukan izin menyalin contoh' },
	digital: { label: 'Wiktionary · رقمي', href: 'https://en.wiktionary.org/wiki/رقمي', license: 'CC BY-SA 4.0/GFDL', usage: 'Pemeriksaan lema, bukan izin menyalin contoh' },
	medical: { label: 'Wiktionary · طبي', href: 'https://en.wiktionary.org/wiki/طبي', license: 'CC BY-SA 4.0/GFDL', usage: 'Pemeriksaan lema, bukan izin menyalin contoh' }
} as const;

export type NisbahSourceId = keyof typeof nisbahSources;

export const nisbahRules = [
	{
		id: 'nisbah-gender',
		title: 'Nisbah: sifat yang menyatakan hubungan',
		arabic: 'نِسْبَةٌ',
		explanation: 'Kata sifat nisbah biasa digunakan untuk menyatakan hubungan dengan bahasa, bidang, sifat resmi, atau sistem tertentu. Contoh bentuk maskulin berakhir dengan يّ (sering ditulis ـِيّ) dan feminin dengan ـِيَّة; tidak semua sifat atau kata modern harus dibentuk dengan menambahkan akhiran secara otomatis.',
		sourceIds: ['grammar', 'arabic', 'official'] as const
	},
	{
		id: 'nisbah-agreement',
		title: 'Sifat mengikuti kata benda yang diterangkan',
		arabic: 'النَّعْتُ وَالْمَنْعُوتُ',
		explanation: 'Pada frasa sifat sederhana, bentuk feminin dan ma‘rifah/nakirah disesuaikan dengan kata benda. Contoh: رِسَالَةٌ رَسْمِيَّةٌ adalah frasa “surat resmi”, sedangkan الرِّسَالَةُ الرَّسْمِيَّةُ adalah “surat resmi itu”. Akhiran i‘rab juga mengikuti fungsi frasa dalam kalimat.',
		sourceIds: ['grammar', 'agreement', 'official'] as const
	},
	{
		id: 'nisbah-predicate',
		title: 'Bedakan sifat dalam frasa dan khabar',
		arabic: 'الْمُبْتَدَأُ وَالْخَبَرُ',
		explanation: 'الْمَوْقِعُ الرَّسْمِيُّ merupakan frasa “situs resmi itu”. Tetapi الْمَوْقِعُ رَسْمِيٌّ menjadi kalimat “situs itu resmi”: kata kedua adalah khabar, bukan na‘at. Jangan menyimpulkan setiap dua kata Arab merupakan kalimat lengkap.',
		sourceIds: ['grammar', 'agreement', 'official'] as const
	}
] as const;

export type NisbahTask = {
	id: string;
	arabic: string;
	question: string;
	answer: string;
	lexicalSource: NisbahSourceId;
	ruleId: (typeof nisbahRules)[number]['id'];
	status: 'draft';
};

export const nisbahTasks: readonly NisbahTask[] = [
	{ id: 'nis-01', arabic: 'كِتَابٌ عَرَبِيٌّ', question: 'Bagian mana menyatakan hubungan dengan bahasa?', answer: 'عَرَبِيٌّ menerangkan كِتَابٌ: buku berbahasa Arab; keduanya tidak tertentu (nakirah).', lexicalSource: 'arabic', ruleId: 'nisbah-gender', status: 'draft' },
	{ id: 'nis-02', arabic: 'رِسَالَةٌ رَسْمِيَّةٌ', question: 'Mengapa sifat di akhir memakai bentuk feminin?', answer: 'رِسَالَةٌ feminin; رَسْمِيَّةٌ mengikuti gendernya dalam frasa “surat resmi”.', lexicalSource: 'official', ruleId: 'nisbah-agreement', status: 'draft' },
	{ id: 'nis-03', arabic: 'مَلَفٌّ رَقْمِيٌّ', question: 'Apa makna sifat dalam konteks berkas?', answer: 'رَقْمِيٌّ berarti digital; frasa ini menunjuk sebuah berkas digital.', lexicalSource: 'digital', ruleId: 'nisbah-gender', status: 'draft' },
	{ id: 'nis-04', arabic: 'مَجَلَّةٌ طِبِّيَّةٌ', question: 'Apakah طِبِّيَّةٌ di sini nama orang?', answer: 'Bukan. Kata ini sifat “medis” yang menerangkan majalah; bentuknya feminin mengikuti مَجَلَّةٌ.', lexicalSource: 'medical', ruleId: 'nisbah-agreement', status: 'draft' },
	{ id: 'nis-05', arabic: 'بَيَانٌ رَسْمِيٌّ', question: 'Tentukan kata yang berarti resmi.', answer: 'رَسْمِيٌّ adalah sifat resmi untuk بَيَانٌ, sehingga keseluruhan berarti suatu pernyataan resmi.', lexicalSource: 'official', ruleId: 'nisbah-gender', status: 'draft' },
	{ id: 'nis-06', arabic: 'خِدْمَةٌ رَقْمِيَّةٌ', question: 'Bagaimana kesesuaian gender bekerja?', answer: 'خِدْمَةٌ dan رَقْمِيَّةٌ sama-sama feminin; artinya layanan digital.', lexicalSource: 'digital', ruleId: 'nisbah-agreement', status: 'draft' },
	{ id: 'nis-07', arabic: 'مَوْقِعٌ رَسْمِيٌّ', question: 'Apakah ini sudah pasti satu kalimat berita lengkap?', answer: 'Tidak. Dalam pembacaan frasa dasar, keduanya nakirah dan رَسْمِيٌّ menjadi sifat: sebuah situs resmi.', lexicalSource: 'official', ruleId: 'nisbah-agreement', status: 'draft' },
	{ id: 'nis-08', arabic: 'صَفْحَةٌ رَقْمِيَّةٌ', question: 'Apa sifat yang menjelaskan halaman?', answer: 'رَقْمِيَّةٌ berarti digital dan memakai bentuk feminin mengikuti صَفْحَةٌ.', lexicalSource: 'digital', ruleId: 'nisbah-agreement', status: 'draft' },
	{ id: 'nis-09', arabic: 'تَقْرِيرٌ طِبِّيٌّ', question: 'Bidang apa yang dinyatakan oleh nisbah?', answer: 'طِبِّيٌّ berkaitan dengan kedokteran, sehingga frasa berarti laporan medis.', lexicalSource: 'medical', ruleId: 'nisbah-gender', status: 'draft' },
	{ id: 'nis-10', arabic: 'مَعْلُومَاتٌ رَسْمِيَّةٌ', question: 'Mengapa sifat berbentuk feminin tunggal meski kata pertama jamak?', answer: 'Jamak benda tak berakal seperti مَعْلُومَاتٌ lazim diikuti sifat feminin tunggal: informasi resmi.', lexicalSource: 'official', ruleId: 'nisbah-agreement', status: 'draft' },
	{ id: 'nis-11', arabic: 'الْكِتَابُ الْعَرَبِيُّ', question: 'Apa fungsi الْـ pada kedua kata?', answer: 'Keduanya ma‘rifah; الْعَرَبِيُّ menerangkan الْكِتَابُ, yakni buku berbahasa Arab itu.', lexicalSource: 'arabic', ruleId: 'nisbah-agreement', status: 'draft' },
	{ id: 'nis-12', arabic: 'الرِّسَالَةُ الرَّسْمِيَّةُ', question: 'Bedakan bentuk ini dari رِسَالَةٌ رَسْمِيَّةٌ.', answer: 'الْـ membuat frasa lebih tertentu: surat resmi itu, bukan sembarang surat resmi.', lexicalSource: 'official', ruleId: 'nisbah-agreement', status: 'draft' },
	{ id: 'nis-13', arabic: 'الْمَلَفُّ الرَّقْمِيُّ', question: 'Apa tanda sifat ini termasuk bagian dari frasa benda yang sama?', answer: 'Kata benda dan sifat sama-sama memakai الْـ dan marfū‘ pada bentuk contoh; artinya berkas digital itu.', lexicalSource: 'digital', ruleId: 'nisbah-agreement', status: 'draft' },
	{ id: 'nis-14', arabic: 'الْمَجَلَّةُ الطِّبِّيَّةُ', question: 'Bagaimana bentuk ini berbeda dari مَجَلَّةٌ طِبِّيَّةٌ?', answer: 'Kedua unsur kini ma‘rifah dengan الْـ: majalah medis itu.', lexicalSource: 'medical', ruleId: 'nisbah-agreement', status: 'draft' },
	{ id: 'nis-15', arabic: 'الْمَوْقِعُ رَسْمِيٌّ', question: 'Sifat kedua menjadi na‘at atau khabar?', answer: 'رَسْمِيٌّ adalah khabar nakirah, memberikan informasi “situs itu resmi” terhadap mubtada ma‘rifah.', lexicalSource: 'official', ruleId: 'nisbah-predicate', status: 'draft' },
	{ id: 'nis-16', arabic: 'الرِّسَالَةُ رَسْمِيَّةٌ', question: 'Apa berita utama dalam kalimat ini?', answer: 'Bahwa surat tersebut resmi. رَسْمِيَّةٌ adalah khabar feminin, bukan na‘at yang memakai الْـ.', lexicalSource: 'official', ruleId: 'nisbah-predicate', status: 'draft' },
	{ id: 'nis-17', arabic: 'الْخِدْمَةُ رَقْمِيَّةٌ', question: 'Terjemahkan makna kalimat, bukan hanya dua kata lepas.', answer: 'Layanan itu bersifat digital. الْخِدْمَةُ mubtada, رَقْمِيَّةٌ khabar.', lexicalSource: 'digital', ruleId: 'nisbah-predicate', status: 'draft' },
	{ id: 'nis-18', arabic: 'التَّقْرِيرُ طِبِّيٌّ', question: 'Apakah kedua kata sama-sama ma‘rifah?', answer: 'Tidak. التَّقْرِيرُ ma‘rifah, طِبِّيٌّ nakirah berfungsi sebagai khabar: laporan itu bersifat medis.', lexicalSource: 'medical', ruleId: 'nisbah-predicate', status: 'draft' },
	{ id: 'nis-19', arabic: 'هَذَا مَلَفٌّ رَقْمِيٌّ', question: 'Apa peran kata tunjuk هَذَا?', answer: 'هَذَا menunjuk satu benda maskulin; مَلَفٌّ رَقْمِيٌّ menjelaskan bahwa ini sebuah berkas digital.', lexicalSource: 'digital', ruleId: 'nisbah-predicate', status: 'draft' },
	{ id: 'nis-20', arabic: 'هَذِهِ صَفْحَةٌ رَسْمِيَّةٌ', question: 'Mengapa memilih هَذِهِ, bukan هَذَا?', answer: 'صَفْحَةٌ termasuk feminin; هَذِهِ menunjuk benda feminin dan رَسْمِيَّةٌ menerangkan halaman resmi.', lexicalSource: 'official', ruleId: 'nisbah-predicate', status: 'draft' }
];

export function validateNisbahTasks(tasks: readonly NisbahTask[]): string[] {
	const issues: string[] = [];
	if (tasks.length !== 20) issues.push('Expected 20 independently authored practice stimuli');
	const ids = new Set<string>();
	const examples = new Set<string>();
	for (const task of tasks) {
		if (ids.has(task.id)) issues.push(`Duplicate ID: ${task.id}`);
		ids.add(task.id);
		if (examples.has(task.arabic.normalize('NFC'))) issues.push(`Duplicate stimulus: ${task.id}`);
		examples.add(task.arabic.normalize('NFC'));
		if (!task.arabic || !task.question.trim() || !task.answer.trim()) issues.push(`Missing practice content: ${task.id}`);
		if (!Object.hasOwn(nisbahSources, task.lexicalSource)) issues.push(`Missing lexical source: ${task.id}`);
		if (!nisbahRules.some((rule) => rule.id === task.ruleId)) issues.push(`Unknown rule: ${task.id}`);
	}
	return issues;
}
