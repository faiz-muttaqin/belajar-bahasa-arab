/**
 * Three introductory constructions: a modifier phrase, a nominal sentence and iḍāfah.
 * The examples and Indonesian explanations are original to this project.
 * Source pages identify the grammatical rules, not a verbatim text licence.
 */
export type GrammarRole = 'manut' | 'nat' | 'mubtada' | 'khabar' | 'mudaf' | 'mudaf-ilaih';

export const GRAMMAR_ROLE_LABELS: Record<GrammarRole, string> = {
	manut: 'Man‘ūt · diterangkan',
	nat: 'Na‘at · sifat',
	mubtada: 'Mubtada · pokok',
	khabar: 'Khabar · berita',
	mudaf: 'Muḍāf · unsur utama',
	'mudaf-ilaih': 'Muḍāf ilaih · pelengkap'
};

export type GlossedToken = {
	arabic: string;
	gloss: string;
	role: GrammarRole;
};

export type GrammarExample = {
	id: string;
	tokens: readonly GlossedToken[];
	translation: string;
	note: string;
};

export type GrammarRule = {
	id: 'nat-manut' | 'mubtada-khabar' | 'idafah';
	title: string;
	arabicTerm: string;
	kind: 'frasa' | 'kalimat';
	summary: string;
	keyRule: string;
	contrast: string;
	examples: readonly GrammarExample[];
	exercise: {
		question: string;
		answer: string;
		reason: string;
	};
	sources: readonly { name: string; url: string }[];
};

export const grammarRules: readonly GrammarRule[] = [
	{
		id: 'nat-manut',
		title: 'Na‘at dan man‘ūt',
		arabicTerm: 'النَّعْتُ وَالْمَنْعُوتُ',
		kind: 'frasa',
		summary: 'Sifat memperjelas kata benda. Gabungan ini belum otomatis menjadi kalimat berita.',
		keyRule:
			'Na‘at umumnya mengikuti man‘ūt dalam i‘rab, ma‘rifah/nakirah, gender, dan jumlah. Pengecualian penting: jamak benda tak berakal sering memakai sifat feminin tunggal.',
		contrast:
			'كِتَابٌ جَدِيدٌ berarti “sebuah buku baru”, sedangkan الْكِتَابُ جَدِيدٌ berarti “buku itu baru”. Perbedaan الْـ mengubah hubungan kedua unsur.',
		examples: [
			{
				id: 'sifat-nakirah',
				tokens: [
					{ arabic: 'كِتَابٌ', gloss: 'buku', role: 'manut' },
					{ arabic: 'جَدِيدٌ', gloss: 'baru', role: 'nat' }
				],
				translation: 'Sebuah buku baru.',
				note: 'Keduanya nakirah dan marfū‘ dengan tanwin. Ini frasa nomina, bukan berita lengkap.'
			},
			{
				id: 'sifat-feminin',
				tokens: [
					{ arabic: 'مَدْرَسَةٌ', gloss: 'sekolah', role: 'manut' },
					{ arabic: 'كَبِيرَةٌ', gloss: 'besar', role: 'nat' }
				],
				translation: 'Sebuah sekolah besar.',
				note: 'Kata benda dan sifat sama-sama feminin dan nakirah.'
			}
		],
		exercise: {
			question: 'Mengapa كِتَابٌ جَدِيدٌ belum menjadi kalimat “buku itu baru”?',
			answer: 'Karena جَدِيدٌ menerangkan كِتَابٌ sebagai na‘at, bukan berfungsi sebagai khabar.',
			reason:
				'Dua bentuk nakirah dengan kasus yang selaras membentuk frasa sifat. Kalimat الْكِتَابُ جَدِيدٌ memiliki mubtada ma‘rifah dan khabar nakirah.'
		},
		sources: [
			{
				name: 'Madinah Arabic — Lesson 9, adjective',
				url: 'https://madinaharabic.com/free-content/grammar/lesson-9/part-2'
			},
			{
				name: 'Al-Ājurrūmiyyah — bab na‘at (katalog materi)',
				url: 'https://en.mahdara.org/lessons/download-books/'
			}
		]
	},
	{
		id: 'mubtada-khabar',
		title: 'Mubtada dan khabar',
		arabicTerm: 'الْمُبْتَدَأُ وَالْخَبَرُ',
		kind: 'kalimat',
		summary: 'Mubtada menyatakan topik, khabar menyampaikan informasi sehingga maknanya lengkap.',
		keyRule:
			'Dalam contoh dasar jumlah ismiyyah, mubtada yang ma‘rifah diikuti khabar nakirah; keduanya marfū‘. Khabar tidak selalu satu kata dan urutannya dapat berubah dalam konstruksi lain.',
		contrast:
			'Bandingkan: الْكِتَابُ الْجَدِيدُ adalah frasa “buku baru itu”, bukan berita, tetapi الْكِتَابُ جَدِيدٌ merupakan kalimat “buku itu baru”.',
		examples: [
			{
				id: 'khabar-buku',
				tokens: [
					{ arabic: 'الْكِتَابُ', gloss: 'buku itu', role: 'mubtada' },
					{ arabic: 'جَدِيدٌ', gloss: 'baru', role: 'khabar' }
				],
				translation: 'Buku itu baru.',
				note: 'Mubtada ma‘rifah, khabar nakirah. Kedua kata marfū‘; tidak perlu kata “adalah”.'
			},
			{
				id: 'khabar-sekolah',
				tokens: [
					{ arabic: 'الْمَدْرَسَةُ', gloss: 'sekolah itu', role: 'mubtada' },
					{ arabic: 'كَبِيرَةٌ', gloss: 'besar', role: 'khabar' }
				],
				translation: 'Sekolah itu besar.',
				note: 'Khabar berbentuk sifat feminin yang sesuai dengan sekolah; fungsinya berita.'
			}
		],
		exercise: {
			question: 'Pada الْكِتَابُ جَدِيدٌ, kata manakah yang memberi berita baru?',
			answer: 'جَدِيدٌ adalah khabar.',
			reason: 'الْكِتَابُ menjadi pokok pembicaraan, sedangkan جَدِيدٌ menyatakan keadaannya.'
		},
		sources: [
			{
				name: 'Madinah Arabic — Lesson 58, nominal sentence',
				url: 'https://madinaharabic.com/free-content/grammar/lesson-58/part-1'
			},
			{
				name: 'Qaṭr al-Nadā — katalog kitab nahwu',
				url: 'https://sites.dlib.nyu.edu/viewer/books/auc_aco000948/1'
			}
		]
	},
	{
		id: 'idafah',
		title: 'Iḍāfah: hubungan dua isim',
		arabicTerm: 'الْإِضَافَةُ',
		kind: 'frasa',
		summary:
			'Dua isim digabung untuk menunjukkan kepemilikan atau hubungan, misalnya buku seorang murid.',
		keyRule:
			'Isim pertama adalah muḍāf dan tidak memakai tanwin. Isim kedua adalah muḍāf ilaih dan berstatus majrūr. Akhiran muḍāf dapat berubah mengikuti posisinya dalam kalimat.',
		contrast:
			'كِتَابُ الطَّالِبِ berarti “buku milik murid itu”, bukan “murid itu buku”. Iḍāfah adalah sebuah frasa yang bisa menjadi bagian kalimat lebih panjang.',
		examples: [
			{
				id: 'idafah-buku',
				tokens: [
					{ arabic: 'كِتَابُ', gloss: 'buku', role: 'mudaf' },
					{ arabic: 'الطَّالِبِ', gloss: 'murid itu', role: 'mudaf-ilaih' }
				],
				translation: 'Buku milik murid itu.',
				note: 'Muḍāf tanpa tanwin; muḍāf ilaih majrūr dengan kasrah.'
			},
			{
				id: 'idafah-pintu',
				tokens: [
					{ arabic: 'بَابُ', gloss: 'pintu', role: 'mudaf' },
					{ arabic: 'الْبَيْتِ', gloss: 'rumah itu', role: 'mudaf-ilaih' }
				],
				translation: 'Pintu rumah itu.',
				note: 'Iḍāfah juga menyatakan hubungan bagian dan keseluruhan, bukan hanya kepemilikan.'
			}
		],
		exercise: {
			question: 'Mengapa kata pertama dalam كِتَابُ الطَّالِبِ tidak menggunakan tanwin?',
			answer: 'Karena كِتَابُ berfungsi sebagai muḍāf.',
			reason:
				'Dalam susunan iḍāfah, muḍāf tidak menerima tanwin; muḍāf ilaih berada pada posisi majrūr.'
		},
		sources: [
			{
				name: 'Madinah Arabic — Lesson 5, iḍāfah',
				url: 'https://madinaharabic.com/free-content/grammar/lesson-5/part-2'
			},
			{
				name: 'Al-Ājurrūmiyyah — klasifikasi majrūrāt (katalog materi)',
				url: 'https://en.mahdara.org/lessons/download-books/'
			}
		]
	}
];

export function validateGrammarRules(rules: readonly GrammarRule[]): string[] {
	const issues: string[] = [];
	const ids = new Set<string>();
	for (const rule of rules) {
		if (ids.has(rule.id)) issues.push(`Duplicate grammar rule: ${rule.id}`);
		ids.add(rule.id);
		if (rule.sources.length === 0) issues.push(`Missing source: ${rule.id}`);
		if (rule.examples.length === 0) issues.push(`Missing example: ${rule.id}`);
		for (const example of rule.examples) {
			if (!example.tokens.length || !example.translation.trim())
				issues.push(`Incomplete example: ${rule.id}/${example.id}`);
			for (const token of example.tokens) {
				if (!token.arabic.trim() || !token.gloss.trim())
					issues.push(`Missing Arabic or gloss: ${rule.id}/${example.id}`);
				if (!GRAMMAR_ROLE_LABELS[token.role])
					issues.push(`Unrecognised role: ${rule.id}/${example.id}`);
			}
		}
	}
	return issues;
}
