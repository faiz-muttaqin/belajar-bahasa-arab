import type { ReferenceTableData } from '#lib/domain/reference/table.js';

export const questionWords: ReferenceTableData = {
	id: 'kata-tanya',
	title: 'Kata tanya',
	caption: 'Delapan kata tanya yang paling sering dipakai.',
	reviewStatus: 'draft',
	sources: [
		'https://corpus.quran.com/documentation/interrogative.jsp',
		'https://madinaharabic.com/free-content/grammar'
	],
	columns: [
		{ key: 'arabic', label: 'Bentuk', lang: 'ar', hideable: true },
		{ key: 'meaning', label: 'Arti', lang: 'id', hideable: true },
		{ key: 'example', label: 'Contoh', lang: 'ar' }
	],
	rows: [
		['ma', 'مَا', 'apa', 'مَا هَذَا؟', 'Apa ini?'],
		['man', 'مَنْ', 'siapa', 'مَنْ هَذَا؟', 'Siapa ini?'],
		['ayna', 'أَيْنَ', 'di mana', 'أَيْنَ الْكِتَابُ؟', 'Di mana buku itu?'],
		['mata', 'مَتَى', 'kapan', 'مَتَى الدَّرْسُ؟', 'Kapan pelajarannya?'],
		['kayfa', 'كَيْفَ', 'bagaimana', 'كَيْفَ حَالُكَ؟', 'Bagaimana kabarmu?'],
		['limadha', 'لِمَاذَا', 'mengapa', 'لِمَاذَا تَقْرَأُ؟', 'Mengapa kamu membaca?'],
		[
			'kam',
			'كَمْ',
			'berapa',
			'كَمْ كِتَابًا عِنْدَكَ؟',
			'Berapa buku yang kamu punya? Kata benda sesudah كَمْ berakhiran tanwin fathah.'
		],
		[
			'hal',
			'هَلْ',
			'apakah',
			'هَلْ هَذَا بَابٌ؟',
			'Apakah ini pintu? هَلْ membuka pertanyaan ya atau tidak. Hanya kata ini yang berupa harf; yang lain isim.'
		]
	].map(([id, arabic, meaning, example, explanation]) => ({
		id: id!,
		cells: { arabic: arabic!, meaning: meaning!, example: example! },
		explanation
	}))
};
