/**
 * G-03: curated, vocalized examples for nominal phrase construction and case endings.
 * The examples and Indonesian word glosses are original teaching material, not copied text.
 * This is not a general-purpose Arabic grammar parser or an i‘rab inference engine.
 */

export type IrabCase = 'raf' | 'nasb' | 'jarr';

export const IRAB_CASE_LABELS: Record<IrabCase, string> = {
	raf: 'Rafa‘ · nominatif',
	nasb: 'Naṣb · akusatif',
	jarr: 'Jarr · genitif'
};

export type PhraseToken = {
	arabic: string;
	gloss: string;
	role: string;
	/** An explicitly attested case, not inferred from arbitrary vowel endings. */
	irab?: IrabCase;
	/** Surface sign on this form, e.g. ḍamma, kasra, alif, or yā’. */
	marker?: string;
};

export type PhraseExample = {
	id: string;
	tokens: readonly PhraseToken[];
	translation: string;
	explanation: string;
};

export type PhraseRule = {
	id: 'marifah-nakirah' | 'naat-agreement' | 'idafah-jar' | 'perubahan-irab' | 'jumlah-dan-gender';
	title: string;
	arabicTerm: string;
	summary: string;
	keyRule: string;
	limitation: string;
	examples: readonly PhraseExample[];
	exercise: { question: string; answer: string; reason: string };
	sources: readonly { name: string; url: string }[];
	reviewStatus: 'draft';
};

const ajurrumiyya = {
	name: 'Al-Ājurrūmiyyah — teks bab i‘rāb, na‘at, ma‘rifah, dan makhfūḍāt',
	url: 'https://www.mashraba.org/grammar/ajurrumiyya'
};
const madinah = {
	name: 'Madinah Arabic — pembelajaran gramatika bertahap',
	url: 'https://madinaharabic.com/free-content/grammar'
};

export const phraseRules: readonly PhraseRule[] = [
	{
		id: 'marifah-nakirah',
		title: 'Ma‘rifah dan nakirah',
		arabicTerm: 'الْمَعْرِفَةُ وَالنَّكِرَةُ',
		summary: 'Bedakan kata benda yang merujuk sesuatu yang tertentu dengan sesuatu yang belum ditentukan.',
		keyRule:
			'Kata benda biasa yang memakai الْـ menjadi ma‘rifah. Nakirah dari isim munṣarif sering tampak dengan tanwin, tetapi tanwin bukan definisi universal nakirah: kata diri, bentuk diptote, dan konstruksi iḍāfah memiliki aturan lain.',
		limitation:
			'Contoh tunggal di sini memakai akhir rafa‘ agar mudah dibandingkan. Ma‘rifah juga dapat dibentuk oleh dhamir, kata tunjuk, nama diri, atau idafah menuju isim ma‘rifah.',
		examples: [
			{
				id: 'indefinite-book',
				tokens: [{ arabic: 'كِتَابٌ', gloss: 'sebuah buku', role: 'Isim nakirah', irab: 'raf', marker: 'tanwin ḍamm' }],
				translation: 'Sebuah buku.',
				explanation: 'Kata benda biasa yang tidak tertentu; tanwin ḍamm dalam contoh marfū‘.'
			},
			{
				id: 'definite-book',
				tokens: [{ arabic: 'الْكِتَابُ', gloss: 'buku itu', role: 'Isim ma‘rifah', irab: 'raf', marker: 'ḍamma' }],
				translation: 'Buku itu.',
				explanation: 'Awalan الْـ menjadikan referennya tertentu; akhir rafa‘ di sini memakai ḍamma, bukan tanwin.'
			}
		],
		exercise: {
			question: 'Apakah setiap nakirah harus memakai tanwin?',
			answer: 'Tidak. Tanwin merupakan petunjuk umum pada isim munṣarif, bukan syarat mutlak.',
			reason: 'Beberapa isim nakirah tidak menerima tanwin, misalnya pola yang termasuk mamnū‘ min aṣ-ṣarf.'
		},
		sources: [ajurrumiyya, madinah],
		reviewStatus: 'draft'
	},
	{
		id: 'naat-agreement',
		title: 'Na‘at mengikuti man‘ūt',
		arabicTerm: 'النَّعْتُ وَالْمَنْعُوتُ',
		summary: 'Sifat menyesuaikan kata benda yang dijelaskannya, bukan berdiri otomatis sebagai khabar.',
		keyRule:
			'Na‘at yang sesungguhnya mengikuti man‘ūt dalam kasus i‘rab dan ma‘rifah/nakirah. Pada sifat biasa, kesesuaian jenis dan jumlah juga diperhatikan; jamak benda tidak berakal umumnya memakai sifat feminin tunggal.',
		limitation:
			'Semua contoh berikut berada dalam posisi rafa‘ sebagai bentuk rujukan. Pada posisi naṣb atau jarr, harakat akhir man‘ūt dan na‘at dapat ikut berubah.',
		examples: [
			{
				id: 'indefinite-adjective',
				tokens: [
					{ arabic: 'كِتَابٌ', gloss: 'buku', role: 'Man‘ūt', irab: 'raf', marker: 'tanwin ḍamm' },
					{ arabic: 'جَدِيدٌ', gloss: 'baru', role: 'Na‘at', irab: 'raf', marker: 'tanwin ḍamm' }
				],
				translation: 'Sebuah buku baru.',
				explanation: 'Keduanya nakirah dan marfū‘; ini frasa sifat, bukan jumlah ismiyyah.'
			},
			{
				id: 'definite-adjective',
				tokens: [
					{ arabic: 'الْكِتَابُ', gloss: 'buku itu', role: 'Man‘ūt', irab: 'raf', marker: 'ḍamma' },
					{ arabic: 'الْجَدِيدُ', gloss: 'yang baru', role: 'Na‘at', irab: 'raf', marker: 'ḍamma' }
				],
				translation: 'Buku baru itu.',
				explanation: 'Keduanya ma‘rifah dengan الْـ. Jika sifatnya nakirah, maknanya dapat berubah menjadi berita.'
			},
			{
				id: 'feminine-adjective',
				tokens: [
					{ arabic: 'مَدْرَسَةٌ', gloss: 'sekolah', role: 'Man‘ūt', irab: 'raf', marker: 'tanwin ḍamm' },
					{ arabic: 'كَبِيرَةٌ', gloss: 'besar', role: 'Na‘at', irab: 'raf', marker: 'tanwin ḍamm' }
				],
				translation: 'Sebuah sekolah besar.',
				explanation: 'Kata benda dan sifat sama-sama feminin.'
			},
			{
				id: 'nonhuman-plural',
				tokens: [
					{ arabic: 'كُتُبٌ', gloss: 'buku-buku', role: 'Man‘ūt · jamak taksir', irab: 'raf', marker: 'tanwin ḍamm' },
					{ arabic: 'جَدِيدَةٌ', gloss: 'baru', role: 'Na‘at · feminin tunggal', irab: 'raf', marker: 'tanwin ḍamm' }
				],
				translation: 'Buku-buku baru.',
				explanation: 'Jamak benda tidak berakal lazim diterangkan oleh sifat feminin tunggal.'
			}
		],
		exercise: {
			question: 'Mengapa sifat pada كُتُبٌ جَدِيدَةٌ berbentuk feminin tunggal?',
			answer: 'Karena كُتُبٌ adalah jamak benda tidak berakal.',
			reason: 'Ini pola agreement khusus yang tidak boleh disimpulkan hanya dari bentuk jamak kata bendanya.'
		},
		sources: [ajurrumiyya, madinah],
		reviewStatus: 'draft'
	},
	{
		id: 'idafah-jar',
		title: 'Iḍāfah serta jar–majrūr',
		arabicTerm: 'الْإِضَافَةُ وَالْجَارُّ وَالْمَجْرُورُ',
		summary: 'Pelajari dua jalan yang membuat isim menjadi majrūr: sesudah huruf jar atau sebagai muḍāf ilaih.',
		keyRule:
			'Muḍāf tidak memakai tanwin, sementara muḍāf ilaih berstatus jarr. Huruf jar seperti فِي atau عَلَى juga menjadikan isim sesudahnya majrūr. Kasus muḍāf sendiri ditentukan oleh fungsi frasa dalam kalimat.',
		limitation:
			'Contoh بَابُ الْبَيْتِ memakai rafa‘ pada muḍāf hanya sebagai satu konteks. Dalam فِي بَابِ الْبَيْتِ muḍāf menjadi jarr, tetapi muḍāf ilaih tetap jarr.',
		examples: [
			{
				id: 'idafah-door',
				tokens: [
					{ arabic: 'بَابُ', gloss: 'pintu', role: 'Muḍāf', irab: 'raf', marker: 'ḍamma' },
					{ arabic: 'الْبَيْتِ', gloss: 'rumah itu', role: 'Muḍāf ilaih', irab: 'jarr', marker: 'kasra' }
				],
				translation: 'Pintu rumah itu.',
				explanation: 'Muḍāf ilaih majrūr; muḍāf tidak bertanwin. Susunan ini frasa, bukan kalimat lengkap.'
			},
			{
				id: 'preposition-house',
				tokens: [
					{ arabic: 'فِي', gloss: 'di dalam', role: 'Huruf jar' },
					{ arabic: 'الْبَيْتِ', gloss: 'rumah itu', role: 'Isim majrūr', irab: 'jarr', marker: 'kasra' }
				],
				translation: 'Di dalam rumah itu.',
				explanation: 'Kasra pada الْبَيْتِ disebabkan huruf jar فِي.'
			},
			{
				id: 'preposition-idafah',
				tokens: [
					{ arabic: 'فِي', gloss: 'di', role: 'Huruf jar' },
					{ arabic: 'بَابِ', gloss: 'pintu', role: 'Muḍāf', irab: 'jarr', marker: 'kasra' },
					{ arabic: 'الْبَيْتِ', gloss: 'rumah itu', role: 'Muḍāf ilaih', irab: 'jarr', marker: 'kasra' }
				],
				translation: 'Di pintu rumah itu.',
				explanation: 'Kedua isim berkasra, tetapi alasannya berbeda: بَابِ karena فِي, الْبَيْتِ karena iḍāfah.'
			}
		],
		exercise: {
			question: 'Dalam فِي بَابِ الْبَيْتِ, apakah kedua isim majrūr dengan sebab yang sama?',
			answer: 'Tidak. بَابِ karena فِي, sedangkan الْبَيْتِ karena menjadi muḍāf ilaih.',
			reason: 'Peran sintaksis dan penyebab i‘rab perlu dibaca, bukan sekadar melihat kasra.'
		},
		sources: [ajurrumiyya, madinah],
		reviewStatus: 'draft'
	},
	{
		id: 'perubahan-irab',
		title: 'Tiga kasus: rafa‘, naṣb, jarr',
		arabicTerm: 'الرَّفْعُ وَالنَّصْبُ وَالْجَرُّ',
		summary: 'Satu isim dapat berubah harakat akhirnya karena berperan sebagai pelaku, objek, atau mengikuti huruf jar.',
		keyRule:
			'Pada isim tunggal munṣarif seperti الطَّالِب, rafa‘ ditandai ḍamma, naṣb oleh fatḥa, dan jarr oleh kasra. Ini salah satu kelas isim; tidak semua tanda i‘rab selalu berupa tiga harakat tersebut.',
		limitation:
			'Isim mutsanna menggunakan alif (rafa‘) atau ya (naṣb/jarr). Jamak mudzakkar salim juga memakai waw/ya, dan mamnū‘ min aṣ-ṣarf memiliki aturan khusus.',
		examples: [
			{
				id: 'case-subject',
				tokens: [
					{ arabic: 'جَاءَ', gloss: 'telah datang', role: 'Fi‘il māḍī' },
					{ arabic: 'الطَّالِبُ', gloss: 'murid itu', role: 'Fā‘il', irab: 'raf', marker: 'ḍamma' }
				],
				translation: 'Murid itu datang.',
				explanation: 'الطَّالِبُ menjadi pelaku (fā‘il), maka marfū‘.'
			},
			{
				id: 'case-object',
				tokens: [
					{ arabic: 'رَأَيْتُ', gloss: 'saya melihat', role: 'Fi‘il + dhamir subjek' },
					{ arabic: 'الطَّالِبَ', gloss: 'murid itu', role: 'Maf‘ūl bih', irab: 'nasb', marker: 'fatḥa' }
				],
				translation: 'Saya melihat murid itu.',
				explanation: 'الطَّالِبَ menjadi objek langsung, maka manṣūb.'
			},
			{
				id: 'case-preposition',
				tokens: [
					{ arabic: 'سَلَّمْتُ', gloss: 'saya memberi salam', role: 'Fi‘il + dhamir subjek' },
					{ arabic: 'عَلَى', gloss: 'kepada', role: 'Huruf jar' },
					{ arabic: 'الطَّالِبِ', gloss: 'murid itu', role: 'Isim majrūr', irab: 'jarr', marker: 'kasra' }
				],
				translation: 'Saya memberi salam kepada murid itu.',
				explanation: 'الطَّالِبِ menjadi majrūr sesudah عَلَى.'
			}
		],
		exercise: {
			question: 'Apakah الطَّالِبُ, الطَّالِبَ, dan الطَّالِبِ memiliki tiga makna kamus berbeda?',
			answer: 'Tidak. Lema dasarnya sama; kasus i‘rab menandai fungsi dalam susunan.',
			reason: 'Pahami hubungan amil dan fungsi sintaksis sebelum memilih harakat akhir.'
		},
		sources: [ajurrumiyya, madinah],
		reviewStatus: 'draft'
	},
	{
		id: 'jumlah-dan-gender',
		title: 'Jumlah dan gender memengaruhi bentuk i‘rab',
		arabicTerm: 'الْإِفْرَادُ وَالتَّثْنِيَةُ وَالْجَمْعُ',
		summary: 'Bentuk tunggal, ganda, dan jamak dapat memakai tanda i‘rab yang berbeda.',
		keyRule:
			'Isim mutsanna pada posisi rafa‘ biasanya berakhiran ـَانِ, sementara naṣb atau jarr ـَيْنِ. Jamak mudzakkar salim pada rafa‘ memakai ـُونَ, sementara naṣb/jarr memakai ـِينَ. Ini berbeda dari isim tunggal munṣarif.',
		limitation:
			'Jamak taksir tidak otomatis memakai pola jamak salim. Bentuk dengan ـان/ـين dalam konteks lain perlu analisis leksikal; contoh di sini dibatasi pada mutsanna dan jamak mudzakkar salim.',
		examples: [
			{
				id: 'dual-subject',
				tokens: [
					{ arabic: 'جَاءَ', gloss: 'telah datang', role: 'Fi‘il māḍī' },
					{ arabic: 'طَالِبَانِ', gloss: 'dua murid', role: 'Fā‘il · mutsanna', irab: 'raf', marker: 'alif' }
				],
				translation: 'Dua murid datang.',
				explanation: 'Tanda rafa‘ mutsanna adalah alif.'
			},
			{
				id: 'dual-object',
				tokens: [
					{ arabic: 'رَأَيْتُ', gloss: 'saya melihat', role: 'Fi‘il + dhamir subjek' },
					{ arabic: 'طَالِبَيْنِ', gloss: 'dua murid', role: 'Maf‘ūl bih · mutsanna', irab: 'nasb', marker: 'yā’' }
				],
				translation: 'Saya melihat dua murid.',
				explanation: 'Tanda naṣb mutsanna adalah yā’, bukan fatḥa akhir sebagaimana isim tunggal biasa.'
			},
			{
				id: 'sound-plural-subject',
				tokens: [
					{ arabic: 'جَاءَ', gloss: 'telah datang', role: 'Fi‘il māḍī' },
					{ arabic: 'الْمُعَلِّمُونَ', gloss: 'para guru itu', role: 'Fā‘il · jamak mudzakkar salim', irab: 'raf', marker: 'wāw' }
				],
				translation: 'Para guru itu datang.',
				explanation: 'Tanda rafa‘ jamak mudzakkar salim adalah wāw.'
			},
			{
				id: 'sound-plural-object',
				tokens: [
					{ arabic: 'رَأَيْتُ', gloss: 'saya melihat', role: 'Fi‘il + dhamir subjek' },
					{ arabic: 'الْمُعَلِّمِينَ', gloss: 'para guru itu', role: 'Maf‘ūl bih · jamak mudzakkar salim', irab: 'nasb', marker: 'yā’' }
				],
				translation: 'Saya melihat para guru itu.',
				explanation: 'Tanda naṣb/jarr jamak mudzakkar salim adalah yā’.'
			}
		],
		exercise: {
			question: 'Mengapa طَالِبَانِ berubah menjadi طَالِبَيْنِ ketika menjadi maf‘ūl bih?',
			answer: 'Karena isim mutsanna memakai alif untuk rafa‘ dan yā’ untuk naṣb/jarr.',
			reason: 'Tanda i‘rab bergantung pada jenis bentuk nomina, bukan sekadar aturan ḍamma/fatḥa/kasra.'
		},
		sources: [ajurrumiyya, madinah],
		reviewStatus: 'draft'
	}
];

export function validatePhraseRules(rules: readonly PhraseRule[]): string[] {
	const errors: string[] = [];
	const ids = new Set<string>();
	for (const rule of rules) {
		if (ids.has(rule.id)) errors.push('Duplicate rule: ' + rule.id);
		ids.add(rule.id);
		if (!rule.sources.length || rule.sources.some((source) => !source.url.startsWith('https://')))
			errors.push('Missing source: ' + rule.id);
		if (!rule.examples.length) errors.push('Missing examples: ' + rule.id);
		const exampleIds = new Set<string>();
		for (const example of rule.examples) {
			if (exampleIds.has(example.id)) errors.push('Duplicate example: ' + rule.id + '/' + example.id);
			exampleIds.add(example.id);
			if (!example.tokens.length || !example.translation.trim())
				errors.push('Incomplete example: ' + rule.id + '/' + example.id);
			for (const token of example.tokens) {
				if (!token.arabic.trim() || !token.gloss.trim() || !token.role.trim())
					errors.push('Missing token gloss or role: ' + rule.id + '/' + example.id);
				if (token.irab && (!IRAB_CASE_LABELS[token.irab] || !token.marker?.trim()))
					errors.push('Missing i‘rab sign: ' + rule.id + '/' + example.id);
				if (!token.irab && token.marker) errors.push('Marker without i‘rab: ' + rule.id + '/' + example.id);
			}
		}
	}
	return errors;
}
