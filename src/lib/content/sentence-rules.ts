/**
 * G-04: original beginner illustrations of complete Arabic clauses and their operators.
 * Each sentence is curated; this module is NOT an automatic syntax/i‘rab analyzer.
 * The source URLs justify the general grammar, not necessarily these exact example sentences.
 */

import type { IrabCase } from './phrase-rules.js';

export type SentenceRole =
	'topic' | 'predicate' | 'verb' | 'agent' | 'object' | 'deputy' | 'particle';

export const SENTENCE_ROLE_LABELS: Record<SentenceRole, string> = {
	topic: 'Topik / ism',
	predicate: 'Khabar / berita',
	verb: 'Fi‘il',
	agent: 'Fā‘il / pelaku',
	object: 'Maf‘ūl bih / objek',
	deputy: 'Nā’ib al-fā‘il',
	particle: 'Kata tugas'
};

export type VerbMood = 'indicative' | 'jussive' | 'subjunctive';
export const VERB_MOOD_LABELS: Record<VerbMood, string> = {
	indicative: 'Marfū‘ · indikatif',
	jussive: 'Majzūm · jazm',
	subjunctive: 'Manṣūb · subjungtif'
};

export type SentenceToken = {
	arabic: string;
	gloss: string;
	role: SentenceRole;
	/** Distinguish specific grammatical function, especially the nested khabar. */
	detail: string;
	/** Noun case, not the mood of a present-tense verb. */
	irab?: IrabCase;
	/** Present-tense verb mood, never a noun case. */
	mood?: VerbMood;
	/** Explicit visible ending. Never inferred automatically from the last character. */
	marker?: string;
};

export type SentenceExample = {
	id: string;
	tokens: readonly SentenceToken[];
	translation: string;
	explanation: string;
};

export type SentenceRule = {
	id: 'nominal' | 'verbal' | 'passive' | 'negation' | 'nawasikh' | 'questions';
	title: string;
	arabicTerm: string;
	summary: string;
	keyRule: string;
	limitation: string;
	examples: readonly SentenceExample[];
	exercise: { question: string; answer: string; reason: string };
	sources: readonly { name: string; url: string }[];
	reviewStatus: 'draft';
};

const course = (lesson: number, label: string) => ({
	name: 'Madinah Arabic — ' + label + ' (pelajaran ' + lesson + ')',
	url: 'https://madinaharabic.com/free-content/grammar/lesson-' + lesson + '/part-1'
});

const nominalSources = [
	{
		name: 'Madinah Arabic — jumlah ismiyyah, jenis khabar (pelajaran 4)',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-4/part-9'
	},
	course(58, 'mubtada dan khabar')
];
const verbalSources = [course(64, 'fā‘il'), course(66, 'maf‘ūl bih')];
const passiveSources = [course(34, 'aktif dan pasif'), course(65, 'nā’ib al-fā‘il')];
const negationSources = [course(31, 'kalimat negatif'), course(36, 'i‘rab fi‘il muḍāri‘')];
const nasikhSources = [
	course(59, 'kāna dan saudara-saudaranya'),
	course(60, 'inna dan saudara-saudaranya')
];

export const sentenceRules: readonly SentenceRule[] = [
	{
		id: 'nominal',
		title: 'Jumlah ismiyyah dan bentuk khabar',
		arabicTerm: 'الْجُمْلَةُ الْاِسْمِيَّةُ',
		summary:
			'Kalimat nominal menempatkan pokok pembicaraan sebagai mubtada, kemudian memberi berita melalui khabar.',
		keyRule:
			'Khabar dapat berupa satu kata, syibh-jumlah (jar–majrūr atau zharf), atau kalimat lain. Jika mubtada diikuti fi‘il, fi‘il itu dapat menjadi bagian dari jumlah fi‘liyyah yang berfungsi sebagai khabar; jangan otomatis melabeli mubtada sebagai fā‘il fi‘il tersebut.',
		limitation:
			'Pola pengantar memakai mubtada ma‘rifah. Khabar yang berupa syibh-jumlah tidak berarti setiap token penyusunnya berkasus rafa‘; isim sesudah huruf jar tetap majrūr.',
		examples: [
			{
				id: 'nominal-simple',
				tokens: [
					{
						arabic: 'الْكِتَابُ',
						gloss: 'buku itu',
						role: 'topic',
						detail: 'Mubtada',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'جَدِيدٌ',
						gloss: 'baru',
						role: 'predicate',
						detail: 'Khabar mufrad',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					}
				],
				translation: 'Buku itu baru.',
				explanation:
					'Mubtada dan khabar mufrad sama-sama marfū‘. Ini berbeda dari frasa الْكِتَابُ الْجَدِيدُ.'
			},
			{
				id: 'nominal-prepositional',
				tokens: [
					{
						arabic: 'الْكِتَابُ',
						gloss: 'buku itu',
						role: 'topic',
						detail: 'Mubtada',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'فِي',
						gloss: 'di dalam',
						role: 'predicate',
						detail: 'Huruf jar · bagian khabar'
					},
					{
						arabic: 'الْحَقِيبَةِ',
						gloss: 'tas itu',
						role: 'predicate',
						detail: 'Majrūr · bagian khabar',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Buku itu ada di dalam tas.',
				explanation: 'فِي الْحَقِيبَةِ merupakan syibh-jumlah sebagai khabar; الْحَقِيبَةِ majrūr karena فِي.'
			},
			{
				id: 'nominal-verbal-predicate',
				tokens: [
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'topic',
						detail: 'Mubtada',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'يَكْتُبُ',
						gloss: 'sedang menulis',
						role: 'predicate',
						detail: 'Fi‘il dalam jumlah khabar; fā‘il tersembunyi',
						mood: 'indicative',
						marker: 'ḍamma'
					},
					{
						arabic: 'الدَّرْسَ',
						gloss: 'pelajaran itu',
						role: 'object',
						detail: 'Maf‘ūl bih dalam khabar',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				],
				translation: 'Murid itu sedang menulis pelajaran tersebut.',
				explanation:
					'الطَّالِبُ adalah mubtada; jumlah fi‘liyyah يَكْتُبُ الدَّرْسَ merupakan khabar, dengan fā‘il tersirat هُوَ.'
			}
		],
		exercise: {
			question: 'Mengapa الْحَقِيبَةِ tetap berkasra meski menjadi bagian khabar?',
			answer: 'Karena ia majrūr oleh فِي dalam syibh-jumlah yang menjadi khabar.',
			reason: 'Fungsi seluruh frasa sebagai khabar tidak menghapus i‘rab internalnya.'
		},
		sources: nominalSources,
		reviewStatus: 'draft'
	},
	{
		id: 'verbal',
		title: 'Jumlah fi‘liyyah: tindakan, pelaku dan objek',
		arabicTerm: 'الْفِعْلُ وَالْفَاعِلُ وَالْمَفْعُولُ بِهِ',
		summary:
			'Kalimat verbal dasar diawali fi‘il, diikuti fā‘il sebagai pelaku dan—bila fi‘il transitif—maf‘ūl bih sebagai objek.',
		keyRule:
			'Fā‘il adalah marfū‘, sedangkan maf‘ūl bih biasa manṣūb. Tidak semua fi‘il memerlukan objek. Perubahan urutan subjek dan verba memengaruhi analisis struktur: الطَّالِبُ يَكْتُبُ adalah jumlah ismiyyah dengan khabar berupa jumlah fi‘liyyah.',
		limitation:
			'Contoh dibatasi pada satu pelaku dan satu objek. Dalam VSO dasar, fi‘il sebelum fā‘il jamak sering memakai bentuk tunggal; perlu contoh khusus ketika membahas agreement.',
		examples: [
			{
				id: 'verbal-past',
				tokens: [
					{ arabic: 'كَتَبَ', gloss: 'telah menulis', role: 'verb', detail: 'Fi‘il māḍī' },
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'agent',
						detail: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الدَّرْسَ',
						gloss: 'pelajaran itu',
						role: 'object',
						detail: 'Maf‘ūl bih',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				],
				translation: 'Murid itu telah menulis pelajaran tersebut.',
				explanation:
					'Pelaku الطَّالِبُ marfū‘ dan objek الدَّرْسَ manṣūb; kedua akhir kata berbeda karena fungsi, bukan karena makna kamus.'
			},
			{
				id: 'verbal-present',
				tokens: [
					{
						arabic: 'يَقْرَأُ',
						gloss: 'sedang membaca',
						role: 'verb',
						detail: 'Fi‘il muḍāri‘',
						mood: 'indicative',
						marker: 'ḍamma'
					},
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'agent',
						detail: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الْكِتَابَ',
						gloss: 'buku itu',
						role: 'object',
						detail: 'Maf‘ūl bih',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				],
				translation: 'Murid itu sedang membaca buku itu.',
				explanation:
					'Fi‘il muḍāri‘ memiliki mood (marfū‘), sedangkan isim fā‘il dan objek memiliki i‘rab nomina.'
			}
		],
		exercise: {
			question: 'Dalam كَتَبَ الطَّالِبُ الدَّرْسَ, mana pelaku dan mana objek?',
			answer: 'الطَّالِبُ adalah fā‘il, sedangkan الدَّرْسَ adalah maf‘ūl bih.',
			reason: 'Fā‘il marfū‘ dan objek manṣūb dalam contoh isim tunggal ini.'
		},
		sources: verbalSources,
		reviewStatus: 'draft'
	},
	{
		id: 'passive',
		title: 'Aktif dan pasif: perubahan pelaku',
		arabicTerm: 'الْمَبْنِيُّ لِلْمَعْلُومِ وَالْمَبْنِيُّ لِلْمَجْهُولِ',
		summary:
			'Bentuk pasif mengubah fi‘il dan posisi unsur: objek aktif dapat menjadi nā’ib al-fā‘il pada kalimat pasif.',
		keyRule:
			'Bentuk lampau pasif Form I yang reguler mengikuti pola فُعِلَ, misalnya كُتِبَ. Pada kalimat pasif sederhana, pelaku tidak disebut; objek sebelumnya menjadi nā’ib al-fā‘il yang marfū‘. Jangan menerjemahkan nā’ib al-fā‘il sebagai “pelaku tersembunyi”.',
		limitation:
			'Materi ini hanya menguji dua pasangan fi‘il shahih Form I pada masa lampau. Pasif muḍāri‘, bentuk mu‘tal, dan konstruksi dengan pelengkap lain memerlukan pembahasan berikutnya.',
		examples: [
			{
				id: 'active-writing',
				tokens: [
					{ arabic: 'كَتَبَ', gloss: 'telah menulis', role: 'verb', detail: 'Fi‘il aktif' },
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'agent',
						detail: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الدَّرْسَ',
						gloss: 'pelajaran itu',
						role: 'object',
						detail: 'Maf‘ūl bih',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				],
				translation: 'Murid itu telah menulis pelajaran tersebut.',
				explanation: 'Dalam kalimat aktif, pelaku disebut dan objek berada pada naṣb.'
			},
			{
				id: 'passive-writing',
				tokens: [
					{ arabic: 'كُتِبَ', gloss: 'telah ditulis', role: 'verb', detail: 'Fi‘il pasif' },
					{
						arabic: 'الدَّرْسُ',
						gloss: 'pelajaran itu',
						role: 'deputy',
						detail: 'Nā’ib al-fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					}
				],
				translation: 'Pelajaran itu telah ditulis.',
				explanation:
					'الدَّرْسُ beralih dari objek aktif (الدَّرْسَ) menjadi nā’ib al-fā‘il yang marfū‘. Pelaku tidak disebut.'
			},
			{
				id: 'active-opening',
				tokens: [
					{ arabic: 'فَتَحَ', gloss: 'telah membuka', role: 'verb', detail: 'Fi‘il aktif' },
					{
						arabic: 'الْحَارِسُ',
						gloss: 'penjaga itu',
						role: 'agent',
						detail: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الْبَابَ',
						gloss: 'pintu itu',
						role: 'object',
						detail: 'Maf‘ūl bih',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				],
				translation: 'Penjaga itu telah membuka pintu.',
				explanation: 'Pada bentuk aktif, الْبَابَ menjadi objek manṣūb.'
			},
			{
				id: 'passive-opening',
				tokens: [
					{ arabic: 'فُتِحَ', gloss: 'telah dibuka', role: 'verb', detail: 'Fi‘il pasif' },
					{
						arabic: 'الْبَابُ',
						gloss: 'pintu itu',
						role: 'deputy',
						detail: 'Nā’ib al-fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					}
				],
				translation: 'Pintu itu telah dibuka.',
				explanation: 'Posisi nā’ib al-fā‘il ditandai rafa‘; siapa yang membuka tidak dinyatakan.'
			}
		],
		exercise: {
			question: 'Pada كُتِبَ الدَّرْسُ, apakah الدَّرْسُ menjadi orang yang menulis?',
			answer: 'Tidak. الدَّرْسُ adalah nā’ib al-fā‘il, bukan pelaku sebenarnya.',
			reason:
				'Bentuk pasif tidak menyebut pelaku; unsur yang dikenai perbuatan menempati fungsi gramatikal marfū‘.'
		},
		sources: passiveSources,
		reviewStatus: 'draft'
	},
	{
		id: 'negation',
		title: 'Negasi dan perubahan akhir muḍāri‘',
		arabicTerm: 'النَّفْيُ وَإِعْرَابُ الْمُضَارِعِ',
		summary:
			'Lā, lam dan lan sama-sama menegasikan, tetapi memengaruhi waktu/mood fi‘il secara berbeda.',
		keyRule:
			'لَا pada negasi biasa diikuti muḍāri‘ marfū‘; لَمْ menegasikan kejadian lampau dan menjazmkan muḍāri‘; لَنْ menegasikan masa depan dan menashabkan muḍāri‘. Jangan mencampurnya dengan لَا الناهية (larangan), yang juga menjazmkan.',
		limitation:
			'Contoh memakai fi‘il shahih dengan penanda akhir terlihat (ḍamma, sukūn, fatḥa). Fi‘il mu‘tal dan af‘āl al-khamsah memiliki tanda mood lain.',
		examples: [
			{
				id: 'affirmative-present',
				tokens: [
					{
						arabic: 'يَكْتُبُ',
						gloss: 'menulis',
						role: 'verb',
						detail: 'Muḍāri‘ positif',
						mood: 'indicative',
						marker: 'ḍamma'
					},
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'agent',
						detail: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الدَّرْسَ',
						gloss: 'pelajaran itu',
						role: 'object',
						detail: 'Maf‘ūl bih',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				],
				translation: 'Murid itu menulis pelajaran.',
				explanation:
					'Tanpa partikel yang menashabkan atau menjazmkan, يَكْتُبُ berada dalam keadaan marfū‘.'
			},
			{
				id: 'negation-la',
				tokens: [
					{ arabic: 'لَا', gloss: 'tidak', role: 'particle', detail: 'Negasi biasa' },
					{
						arabic: 'يَكْتُبُ',
						gloss: 'menulis',
						role: 'verb',
						detail: 'Muḍāri‘',
						mood: 'indicative',
						marker: 'ḍamma'
					},
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'agent',
						detail: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الدَّرْسَ',
						gloss: 'pelajaran itu',
						role: 'object',
						detail: 'Maf‘ūl bih',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				],
				translation: 'Murid itu tidak menulis pelajaran.',
				explanation: 'لَا النافية tidak membuat fi‘il muḍāri‘ menjadi majzūm dalam contoh ini.'
			},
			{
				id: 'negation-lam',
				tokens: [
					{ arabic: 'لَمْ', gloss: 'tidak (lampau)', role: 'particle', detail: 'Harf jazm' },
					{
						arabic: 'يَكْتُبْ',
						gloss: 'menulis',
						role: 'verb',
						detail: 'Muḍāri‘ majzūm',
						mood: 'jussive',
						marker: 'sukūn'
					},
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'agent',
						detail: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الدَّرْسَ',
						gloss: 'pelajaran itu',
						role: 'object',
						detail: 'Maf‘ūl bih',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				],
				translation: 'Murid itu tidak menulis pelajaran tersebut (pada waktu lampau).',
				explanation: 'لَمْ mengubah akhir muḍāri‘ dari يَكْتُبُ menjadi يَكْتُبْ (majzūm).'
			},
			{
				id: 'negation-lan',
				tokens: [
					{ arabic: 'لَنْ', gloss: 'tidak akan', role: 'particle', detail: 'Harf naṣb' },
					{
						arabic: 'يَكْتُبَ',
						gloss: 'menulis',
						role: 'verb',
						detail: 'Muḍāri‘ manṣūb',
						mood: 'subjunctive',
						marker: 'fatḥa'
					},
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'agent',
						detail: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الدَّرْسَ',
						gloss: 'pelajaran itu',
						role: 'object',
						detail: 'Maf‘ūl bih',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				],
				translation: 'Murid itu tidak akan menulis pelajaran tersebut.',
				explanation: 'لَنْ menashabkan muḍāri‘ sehingga akhir fi‘il menjadi يَكْتُبَ.'
			}
		],
		exercise: {
			question: 'Mengapa يَكْتُبُ berubah menjadi يَكْتُبْ setelah لَمْ?',
			answer: 'Karena لَمْ adalah harf jazm yang membuat muḍāri‘ menjadi majzūm.',
			reason: 'Pada fi‘il shahih tunggal ini tanda jazm-nya berupa sukūn, bukan fatḥa atau ḍamma.'
		},
		sources: negationSources,
		reviewStatus: 'draft'
	},
	{
		id: 'nawasikh',
		title: 'Kāna dan inna mengubah susunan nominal',
		arabicTerm: 'كَانَ وَإِنَّ وَأَخَوَاتُهُمَا',
		summary: 'Amil nāsikh masuk ke kalimat nominal lalu mengubah status kasus salah satu unsurnya.',
		keyRule:
			'كَانَ (fi‘il nāsikh) membuat ism-nya marfū‘ dan khabar-nya manṣūb. إِنَّ (harf nāsikh) membuat ism-nya manṣūb dan khabar-nya marfū‘. Yang berubah adalah fungsi sintaksis dan penanda akhir, bukan jenis kata kamus.',
		limitation:
			'Contoh memakai khabar mufrad (kata sifat). Jika khabar berbentuk syibh-jumlah atau klausa lain, hubungan kasusnya harus dijelaskan pada tingkat frasa/kalimat.',
		examples: [
			{
				id: 'nawasikh-base',
				tokens: [
					{
						arabic: 'الْكِتَابُ',
						gloss: 'buku itu',
						role: 'topic',
						detail: 'Mubtada',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'جَدِيدٌ',
						gloss: 'baru',
						role: 'predicate',
						detail: 'Khabar',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					}
				],
				translation: 'Buku itu baru.',
				explanation: 'Sebelum nāsikh, mubtada dan khabar mufrad sama-sama marfū‘.'
			},
			{
				id: 'nawasikh-inna',
				tokens: [
					{ arabic: 'إِنَّ', gloss: 'sesungguhnya', role: 'particle', detail: 'Harf nāsikh' },
					{
						arabic: 'الْكِتَابَ',
						gloss: 'buku itu',
						role: 'topic',
						detail: 'Ism inna',
						irab: 'nasb',
						marker: 'fatḥa'
					},
					{
						arabic: 'جَدِيدٌ',
						gloss: 'baru',
						role: 'predicate',
						detail: 'Khabar inna',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					}
				],
				translation: 'Sesungguhnya buku itu baru.',
				explanation: 'إِنَّ menyebabkan ism-nya manṣūb (الْكِتَابَ), sedangkan khabar-nya tetap marfū‘.'
			},
			{
				id: 'nawasikh-kana',
				tokens: [
					{ arabic: 'كَانَ', gloss: 'dahulu', role: 'verb', detail: 'Fi‘il nāsikh' },
					{
						arabic: 'الْكِتَابُ',
						gloss: 'buku itu',
						role: 'topic',
						detail: 'Ism kāna',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'جَدِيدًا',
						gloss: 'baru',
						role: 'predicate',
						detail: 'Khabar kāna',
						irab: 'nasb',
						marker: 'tanwin fatḥ'
					}
				],
				translation: 'Buku itu dahulu baru.',
				explanation: 'كَانَ menyebabkan khabar-nya manṣūb (جَدِيدًا), sementara ism-nya tetap marfū‘.'
			}
		],
		exercise: {
			question: 'Mana yang manṣūb setelah إِنَّ, dan mana yang manṣūb setelah كَانَ?',
			answer: 'Ism إِنَّ manṣūb; khabar كَانَ manṣūb.',
			reason: 'Kedua kelompok nāsikh memiliki pengaruh gramatikal yang berbeda.'
		},
		sources: nasikhSources,
		reviewStatus: 'draft'
	},
	{
		id: 'questions',
		title: 'Kalimat tanya dengan hal',
		arabicTerm: 'الْاِسْتِفْهَامُ بِهَلْ',
		summary: 'Partikel هَلْ membentuk pertanyaan ya/tidak tanpa mengubah tanda kasus isim.',
		keyRule:
			'هَلْ dapat mendahului jumlah ismiyyah maupun jumlah fi‘liyyah. Partikel ini mengubah fungsi komunikatif menjadi pertanyaan; ia tidak mengubah fā‘il marfū‘ atau maf‘ūl bih manṣūb.',
		limitation:
			'Pertanyaan dengan أَ، مَنْ، مَا، أَيْنَ dan sebagainya memiliki konstruksi lain dan dikembangkan pada tahap berikutnya.',
		examples: [
			{
				id: 'question-nominal',
				tokens: [
					{ arabic: 'هَلْ', gloss: 'apakah', role: 'particle', detail: 'Partikel tanya' },
					{
						arabic: 'الْكِتَابُ',
						gloss: 'buku itu',
						role: 'topic',
						detail: 'Mubtada',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'جَدِيدٌ',
						gloss: 'baru',
						role: 'predicate',
						detail: 'Khabar',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					}
				],
				translation: 'Apakah buku itu baru?',
				explanation:
					'هَلْ menanyakan benar/tidaknya berita; i‘rab dasar mubtada dan khabar tidak berubah.'
			},
			{
				id: 'question-verbal',
				tokens: [
					{ arabic: 'هَلْ', gloss: 'apakah', role: 'particle', detail: 'Partikel tanya' },
					{ arabic: 'كَتَبَ', gloss: 'telah menulis', role: 'verb', detail: 'Fi‘il māḍī' },
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'agent',
						detail: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الدَّرْسَ',
						gloss: 'pelajaran itu',
						role: 'object',
						detail: 'Maf‘ūl bih',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				],
				translation: 'Apakah murid itu telah menulis pelajaran tersebut?',
				explanation: 'هَلْ tidak menghapus pemisahan pelaku marfū‘ dan objek manṣūb.'
			}
		],
		exercise: {
			question: 'Jika هَلْ diletakkan sebelum كَتَبَ الطَّالِبُ الدَّرْسَ, apakah objek menjadi marfū‘?',
			answer: 'Tidak. الدَّرْسَ tetap maf‘ūl bih yang manṣūb.',
			reason: 'هَلْ membuat kalimat tanya, bukan amil yang mengubah i‘rab objek.'
		},
		sources: nominalSources,
		reviewStatus: 'draft'
	}
];

export function validateSentenceRules(rules: readonly SentenceRule[]): string[] {
	const errors: string[] = [];
	const ids = new Set<string>();
	for (const rule of rules) {
		if (ids.has(rule.id)) errors.push('Duplicate sentence rule: ' + rule.id);
		ids.add(rule.id);
		if (
			!rule.examples.length ||
			!rule.sources.length ||
			rule.sources.some((s) => !s.url.startsWith('https://'))
		)
			errors.push('Missing example or source: ' + rule.id);
		const exampleIds = new Set<string>();
		for (const example of rule.examples) {
			if (exampleIds.has(example.id))
				errors.push('Duplicate sentence example: ' + rule.id + '/' + example.id);
			exampleIds.add(example.id);
			if (!example.tokens.length || !example.translation.trim() || !example.explanation.trim())
				errors.push('Incomplete example: ' + rule.id + '/' + example.id);
			for (const token of example.tokens) {
				if (
					!token.arabic.trim() ||
					!token.gloss.trim() ||
					!token.detail.trim() ||
					!SENTENCE_ROLE_LABELS[token.role]
				)
					errors.push('Incomplete token: ' + rule.id + '/' + example.id);
				if (token.irab && token.mood)
					errors.push('Mixed noun case and verb mood: ' + rule.id + '/' + example.id);
				if ((token.irab || token.mood) && !token.marker?.trim())
					errors.push('Missing case/mood sign: ' + rule.id + '/' + example.id);
				if (!token.irab && !token.mood && token.marker)
					errors.push('Sign without case/mood: ' + rule.id + '/' + example.id);
			}
		}
	}
	return errors;
}
