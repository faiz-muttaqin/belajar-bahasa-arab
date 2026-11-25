/**
 * Shared builders for the VP-01 annotation files: source objects, limit notes, link targets and
 * the `sentence()` constructor. Moved out of grammar-annotations.ts so that G-03 edge-case
 * annotations (phrase-edge-annotations.ts) can use them without an import cycle.
 */
import type {
	AnnotatedSentence,
	AnnotatedToken,
	AnnotationAnalysis,
	AnnotationOrigin,
	AnnotationRelation,
	AnnotationSource,
	RelationType,
	RuleLink,
	TokenSegment
} from '#lib/domain/grammar/annotation.js';

export const ajurrumiyyahUrl =
	'https://ar.wikisource.org/wiki/%D8%A7%D9%84%D8%A2%D8%AC%D8%B1%D9%88%D9%85%D9%8A%D8%A9_%D9%81%D9%8A_%D8%A7%D9%84%D9%86%D8%AD%D9%88';
export const ajurrumiyyah = (locator: string): AnnotationSource => ({
	label: 'Al-Ājurrūmiyyah (Wikisource Arab)',
	url: ajurrumiyyahUrl,
	locator
});

export const aj = {
	kalam: ajurrumiyyah('Pembuka: pembagian kalām menjadi isim, fi‘il, harf dan tanda-tandanya'),
	irab: ajurrumiyyah('Bāb ma‘rifat ‘alāmāt al-i‘rāb'),
	marfuat: ajurrumiyyah('Bāb marfū‘āt al-asmā’'),
	manshubat: ajurrumiyyah('Bāb manṣūbāt al-asmā’'),
	fail: ajurrumiyyah('Bāb al-fā‘il'),
	naibFail: ajurrumiyyah('Bāb al-maf‘ūl alladhī lam yusamma fā‘iluh'),
	mubtada: ajurrumiyyah('Bāb al-mubtada’ wa-l-khabar'),
	naat: ajurrumiyyah('Bāb an-na‘t'),
	mafulBih: ajurrumiyyah('Bāb al-maf‘ūl bih'),
	makhfudat: ajurrumiyyah('Bāb makhfūḍāt al-asmā’'),
	bab_irab: ajurrumiyyah('Bāb al-i‘rāb'),
	zharf: ajurrumiyyah('Bāb ẓarf az-zamān wa ẓarf al-makān')
};

/**
 * Qaṭr an-Nadā wa Ball aṣ-Ṣadā (Ibn Hishām, d. 761 H). The original is a medieval text; the open
 * digital copy used for citing is on Arabic Wikisource (the copy is licensed CC BY-SA 4.0). It is
 * one long page without chapter pages, so a locator names the section by its opening words.
 */
const qatrUrl =
	'https://ar.wikisource.org/wiki/%D8%A7%D8%A8%D9%86_%D9%87%D8%B4%D8%A7%D9%85_%D8%A7%D9%84%D9%86%D8%B5%D8%A7%D8%B1%D9%8A_-_%D9%82%D8%B7%D8%B1_%D8%A7%D9%84%D9%86%D8%AF%D9%89_%D9%88%D8%A8%D9%84_%D8%A7%D9%84%D8%B5%D8%AF%D9%89';
const qatrAnNada = (locator: string): AnnotationSource => ({
	label: 'Qaṭr an-Nadā (Wikisource Arab)',
	url: qatrUrl,
	locator
});

export const qatr = {
	types: qatrAnNada(
		'Fasl “anwā‘ al-i‘rāb arba‘ah”: enam isim, mutsanna, jamak sālim, mamnū‘ min aṣ-ṣarf'
	),
	taqdir: qatrAnNada('Fasl “tuqaddaru jamī‘ al-ḥarakāt”: isim maqṣūr dan manqūṣ'),
	marifah: qatrAnNada('Fasl “al-ism ḍarbān”: nakirah dan ma‘rifah, ḍamīr dan isim isyārah'),
	mamnu: qatrAnNada('Bāb “mawāni‘ ṣarf al-ism tis‘ah”'),
	mabni: qatrAnNada('Pembuka “al-kalimah qawl mufrad”: pembagian isim mu‘rab dan mabnī'),
	idafah: qatrAnNada('Bāb “yakhfiḍu al-ism immā bi-ḥarfin …”: khafḍ dengan iḍāfah'),
	maful: qatrAnNada('Bāb “al-maf‘ūl manṣūb wa huwa khamsah”: termasuk al-maf‘ūl fīhi (ẓarf)')
};

export const madinah = {
	nominal: {
		label: 'Madinah Arabic · Kalimat nominal',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-58/part-1',
		locator: 'Grammar Lesson 58, bagian 1: The nominal sentence'
	},
	doer: {
		label: 'Madinah Arabic · Pelaku (fa‘il)',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-64/part-2',
		locator: 'Grammar Lesson 64, bagian 2: The doer'
	},
	passive: {
		label: 'Madinah Arabic · Kalimat aktif dan pasif',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-34/part-1',
		locator: 'Grammar Lesson 34, bagian 1: Active and Passive Voice'
	},
	idafah: {
		label: 'Madinah Arabic · Iḍāfah',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-5/part-2',
		locator: 'Grammar Lesson 5, bagian 2: ungkapan kepemilikan (muḍāf dan muḍāf ilaih)'
	},
	definite: {
		label: 'Madinah Arabic · Kata sandang tertentu',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-3/part-1',
		locator: 'Grammar Lesson 3: Definite Article (judul pelajaran; nomor bagian tidak dicek)'
	},
	adjective: {
		label: 'Madinah Arabic · Frasa sifat',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-9/part-2',
		locator: 'Grammar Lesson 9, bagian 2: Adjective Clause (kesesuaian sifat dan yang disifati)'
	},
	mabni: {
		label: 'Madinah Arabic · Kata mabnī',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-5/part-5',
		locator: 'Grammar Lesson 5, bagian 5: kata yang tidak berubah (mabnī)'
	},
	declinable: {
		label: 'Madinah Arabic · Isim mu‘rab dan mabnī',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-25/part-4',
		locator: 'Grammar Lesson 25, bagian 3 (isim mu‘rab) dan 4 (isim mabnī: ḍamīr, isim isyārah)'
	},
	pronouns: {
		label: 'Madinah Arabic · Kata ganti',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-23/part-4',
		locator: 'Grammar Lesson 23, bagian 4: Pronouns and their Types (ḍamīr munfaṣil dan muttaṣil)'
	},
	sixNouns: {
		label: 'Madinah Arabic · Enam isim',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-57/part-4',
		locator: 'Grammar Lesson 57, bagian 4: wāw, alif dan yā’ pada أَبٌ، أَخٌ، حَمٌ، فَمٌ، ذُو'
	},
	feminineSound: {
		label: 'Madinah Arabic · Jamak muannath sālim',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-54/part-6',
		locator: 'Grammar Lesson 54, bagian 6: kasrah pada naṣb dan jarr'
	},
	diptote: {
		label: 'Madinah Arabic · Isim mamnū‘ min aṣ-ṣarf',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-22/part-1',
		locator: 'Grammar Lesson 22: Cases of Diptotes (judul pelajaran; nomor bagian tidak dicek)'
	},
	maqsur: {
		label: 'Madinah Arabic · Maqṣūr, manqūṣ, mamdūd',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-27/part-1',
		locator:
			'Grammar Lesson 27: The Maqṣūr, Manqūṣ and Mamdūd Nouns (judul pelajaran; nomor bagian tidak dicek)'
	},
	adverbTime: {
		label: 'Madinah Arabic · Ẓarf zamān',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-69/part-4',
		locator: 'Grammar Lesson 69, bagian 4: keterangan waktu (qabla, ba‘da)'
	},
	adverbPlace: {
		label: 'Madinah Arabic · Ẓarf makān',
		url: 'https://madinaharabic.com/free-content/grammar/lesson-69/part-6',
		locator: 'Grammar Lesson 69, bagian 6: keterangan tempat (fawqa, taḥta, amāma)'
	}
} satisfies Record<string, AnnotationSource>;

export const ownedExampleLimits =
	'Kalimat ini contoh tertulis proyek, bukan kutipan dari sumber. Sumber hanya dipakai untuk memeriksa istilah dan kaidahnya. Analisis masih draf dan belum ditinjau ustadz.';

export const limitNotes = {
	phrase: ' Ini frasa, bukan kalimat lengkap.',
	prepositionPhrase: ' Ini frasa kata depan, bukan kalimat lengkap.',
	khafd: ' Al-Ājurrūmiyyah memakai istilah khafḍ untuk apa yang di sini disebut jarr.',
	sharaf:
		' Akar dan pola kata berasal dari pelajaran proyek; sumber yang dikutip tidak membahas akar, isim fā‘il, isim maf‘ūl atau isim alat. Perubahan vokal fi‘il pasif disebut Al-Ājurrūmiyyah dalam bab al-maf‘ūl alladhī lam yusamma fā‘iluh.',
	naatAgreement:
		' Kesesuaian jenis dan jumlah na‘at tidak dinyatakan dalam bab yang dikutip; perlu sumber tambahan.',
	khabarAgreement:
		' Kesesuaian jenis antara khabar dan mubtada’ tidak dinyatakan sebagai kaidah dalam sumber yang dikutip; perlu sumber tambahan.',
	nonhumanPlural:
		' Aturan sifat feminin tunggal untuk jamak benda tidak berakal tidak ada dalam sumber yang dikutip; perlu sumber tambahan.',
	naib: ' Istilah nā’ib al-fā‘il tidak ada dalam sumber yang dikutip; Al-Ājurrūmiyyah memakai al-maf‘ūl alladhī lam yusamma fā‘iluh.'
} as const;

export function analysis(
	sources: readonly [AnnotationSource, ...AnnotationSource[]],
	...notes: readonly string[]
): AnnotationAnalysis {
	return {
		sources,
		usageType: 'independent-original',
		status: 'draft',
		limits: ownedExampleLimits + notes.join('')
	};
}

/** الْـ at the start of a word: shown as a part of that word, never as a separate word. */
export function withArticle(text: string, stemNote: string): readonly TokenSegment[] {
	const article = /^الْ?/u.exec(text)?.[0];
	if (!article || article === text) throw new Error(`No definite article in ${text}`);
	return [
		{
			text: article,
			kind: 'definite-article',
			note:
				article === 'ال'
					? 'Awalan ال membuat kata ini tertentu (ma‘rifah). Lam-nya tidak dibaca; bunyinya melebur ke huruf bertasydid sesudahnya.'
					: 'Awalan الْـ membuat kata ini tertentu (ma‘rifah).'
		},
		{ text: text.slice(article.length), kind: 'stem', note: stemNote }
	];
}

/** A subject pronoun written onto the verb, as in رَأَيْتُ. */
export function withSubjectPronoun(
	text: string,
	suffix: string,
	stemNote: string
): readonly TokenSegment[] {
	if (!text.endsWith(suffix)) throw new Error(`${text} does not end in ${suffix}`);
	return [
		{ text: text.slice(0, -suffix.length), kind: 'stem', note: stemNote },
		{
			text: suffix,
			kind: 'attached-pronoun',
			note: 'Kata ganti pelaku “saya” (ḍamīr muttaṣil, berkedudukan sebagai fā‘il) yang melekat pada fi‘il. Ia tetap bagian dari satu kata ini.'
		}
	];
}

export type TokenInput = Omit<AnnotatedToken, 'id'>;
export type RelationInput = {
	type: RelationType;
	/** 1-based token numbers in reading order. */
	from: readonly [number, ...number[]];
	to: readonly [number, ...number[]];
	reason: string;
};

export function sentence(input: {
	id: string;
	unit: AnnotatedSentence['unit'];
	origins: AnnotatedSentence['origins'];
	translation: string;
	analysis: AnnotationAnalysis;
	ruleLinks: readonly RuleLink[];
	tokens: readonly TokenInput[];
	relations: readonly RelationInput[];
}): AnnotatedSentence {
	const tokenId = (n: number) => `${input.id}.t${n}`;
	const ids = (list: readonly [number, ...number[]]) =>
		list.map(tokenId) as unknown as readonly [string, ...string[]];
	return {
		id: input.id,
		unit: input.unit,
		origins: input.origins,
		translation: input.translation,
		analysis: input.analysis,
		ruleLinks: input.ruleLinks,
		tokens: input.tokens.map((token, index) => ({ id: tokenId(index + 1), ...token })),
		relations: input.relations.map((relation, index): AnnotationRelation => ({
			id: `${input.id}.r${index + 1}`,
			type: relation.type,
			from: ids(relation.from),
			to: ids(relation.to),
			reason: relation.reason
		}))
	};
}

export const lessonLink: RuleLink = {
	label: 'Pelajaran: isim, fi‘il, dan harf dalam kalimat',
	path: 'belajar/isim-fiil-harf/#bedah-kalimat'
};
export const naatLink: RuleLink = {
	label: 'Kaidah na‘at dan man‘ūt',
	path: 'kaidah/frasa/#naat-agreement'
};
export const idafahLink: RuleLink = {
	label: 'Kaidah iḍāfah dan jarr–majrūr',
	path: 'kaidah/frasa/#idafah-jar'
};
export const g1MubtadaLink: RuleLink = {
	label: 'Kaidah mubtada’ dan khabar (G-01)',
	path: 'kaidah/#mubtada-khabar'
};
export const g1IdafahLink: RuleLink = { label: 'Kaidah iḍāfah (G-01)', path: 'kaidah/#idafah' };
export const g1NaatLink: RuleLink = {
	label: 'Kaidah na‘at dan man‘ūt (G-01)',
	path: 'kaidah/#nat-manut'
};
export const irabLink: RuleLink = {
	label: 'Kaidah tiga kasus i‘rab',
	path: 'kaidah/frasa/#perubahan-irab'
};

export const tandaFiil =
	'Fi‘il māḍī: dapat didahului قَدْ dan menerima تْ penanda feminin; keduanya tanda fi‘il menurut Al-Ājurrūmiyyah.';
export const tandaIsimAl = 'Menyebut benda dan diawali الْـ, salah satu tanda isim.';
export const tandaIsimTanwin = 'Bertanwin; tanwin adalah salah satu tanda isim.';
export const jarrIsim = (letter: string) => `Isim yang dijarrkan oleh ${letter}.`;

export const lessonOrigin = (group: number, index: number): AnnotationOrigin => ({
	kind: 'lesson',
	lessonSlug: 'isim-fiil-harf',
	group,
	sentence: index
});
export const phraseOrigin = (ruleId: string, exampleId: string): AnnotationOrigin => ({
	kind: 'phrase-rule',
	ruleId,
	exampleId
});
export const grammarOrigin = (ruleId: string, exampleId: string): AnnotationOrigin => ({
	kind: 'grammar-rule',
	ruleId,
	exampleId
});
