/**
 * VP-01 pilot: structured word-role annotations for sentences that already exist on the site.
 *
 * Nothing here is a new example sentence. Every sentence comes from the word-class lesson
 * (`isim-fiil-harf`, "Bedah per kata") or from the G-03 examples on /kaidah/frasa/; a unit test
 * checks that Arabic, glosses and translations still match that content. The analysis text is
 * original Indonesian teaching material. The cited sources check terms and rules; they are not
 * the origin of the sentences. Everything stays `draft` (ADR-004 D-9). Inventory and limits of the
 * evidence: docs/data/vp01-annotation-pilot.md.
 */
import { grammarRules } from './grammar-rules.js';
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

const ajurrumiyyahUrl =
	'https://ar.wikisource.org/wiki/%D8%A7%D9%84%D8%A2%D8%AC%D8%B1%D9%88%D9%85%D9%8A%D8%A9_%D9%81%D9%8A_%D8%A7%D9%84%D9%86%D8%AD%D9%88';
const ajurrumiyyah = (locator: string): AnnotationSource => ({
	label: 'Al-Ājurrūmiyyah (Wikisource Arab)',
	url: ajurrumiyyahUrl,
	locator
});

const aj = {
	kalam: ajurrumiyyah('Pembuka: pembagian kalām menjadi isim, fi‘il, harf dan tanda-tandanya'),
	irab: ajurrumiyyah('Bāb ma‘rifat ‘alāmāt al-i‘rāb'),
	marfuat: ajurrumiyyah('Bāb marfū‘āt al-asmā’'),
	manshubat: ajurrumiyyah('Bāb manṣūbāt al-asmā’'),
	fail: ajurrumiyyah('Bāb al-fā‘il'),
	naibFail: ajurrumiyyah('Bāb al-maf‘ūl alladhī lam yusamma fā‘iluh'),
	mubtada: ajurrumiyyah('Bāb al-mubtada’ wa-l-khabar'),
	naat: ajurrumiyyah('Bāb an-na‘t'),
	mafulBih: ajurrumiyyah('Bāb al-maf‘ūl bih'),
	makhfudat: ajurrumiyyah('Bāb makhfūḍāt al-asmā’')
};

const madinah = {
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
	}
} satisfies Record<string, AnnotationSource>;

const ownedExampleLimits =
	'Kalimat ini contoh tertulis proyek, bukan kutipan dari sumber. Sumber hanya dipakai untuk memeriksa istilah dan kaidahnya. Analisis masih draf dan belum ditinjau ustadz.';

const limitNotes = {
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

function analysis(
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
function withArticle(text: string, stemNote: string): readonly TokenSegment[] {
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
function withSubjectPronoun(
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

type TokenInput = Omit<AnnotatedToken, 'id'>;
type RelationInput = {
	type: RelationType;
	/** 1-based token numbers in reading order. */
	from: readonly [number, ...number[]];
	to: readonly [number, ...number[]];
	reason: string;
};

function sentence(input: {
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

const lessonLink: RuleLink = {
	label: 'Pelajaran: isim, fi‘il, dan harf dalam kalimat',
	path: 'belajar/isim-fiil-harf/#bedah-kalimat'
};
const naatLink: RuleLink = {
	label: 'Kaidah na‘at dan man‘ūt',
	path: 'kaidah/frasa/#naat-agreement'
};
const idafahLink: RuleLink = {
	label: 'Kaidah iḍāfah dan jarr–majrūr',
	path: 'kaidah/frasa/#idafah-jar'
};
const g1MubtadaLink: RuleLink = {
	label: 'Kaidah mubtada’ dan khabar (G-01)',
	path: 'kaidah/#mubtada-khabar'
};
const g1IdafahLink: RuleLink = { label: 'Kaidah iḍāfah (G-01)', path: 'kaidah/#idafah' };
const g1NaatLink: RuleLink = { label: 'Kaidah na‘at dan man‘ūt (G-01)', path: 'kaidah/#nat-manut' };
const irabLink: RuleLink = {
	label: 'Kaidah tiga kasus i‘rab',
	path: 'kaidah/frasa/#perubahan-irab'
};

const tandaFiil =
	'Fi‘il māḍī: dapat didahului قَدْ dan menerima تْ penanda feminin; keduanya tanda fi‘il menurut Al-Ājurrūmiyyah.';
const tandaIsimAl = 'Menyebut benda dan diawali الْـ, salah satu tanda isim.';
const tandaIsimTanwin = 'Bertanwin; tanwin adalah salah satu tanda isim.';
const jarrIsim = (letter: string) => `Isim yang dijarrkan oleh ${letter}.`;

const lessonOrigin = (group: number, index: number): AnnotationOrigin => ({
	kind: 'lesson',
	lessonSlug: 'isim-fiil-harf',
	group,
	sentence: index
});
const phraseOrigin = (ruleId: string, exampleId: string): AnnotationOrigin => ({
	kind: 'phrase-rule',
	ruleId,
	exampleId
});
const grammarOrigin = (ruleId: string, exampleId: string): AnnotationOrigin => ({
	kind: 'grammar-rule',
	ruleId,
	exampleId
});

/** The five sentences of the word-class lesson, in the order of "Bedah per kata". */
export const wordClassAnnotations: readonly AnnotatedSentence[] = [
	sentence({
		id: 'wc-pintu-terbuka',
		unit: 'sentence',
		origins: [lessonOrigin(0, 0)],
		translation: 'Pintu itu terbuka.',
		analysis: analysis(
			[aj.kalam, aj.mubtada, aj.marfuat, aj.irab, madinah.nominal],
			limitNotes.sharaf
		),
		ruleLinks: [lessonLink, { label: 'Kaidah kalimat nominal', path: 'kaidah/kalimat/' }],
		tokens: [
			{
				text: 'الْبَابُ',
				gloss: 'pintu itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'mubtada',
				roleReason: 'Topik kalimat nominal: kalimat memberi kabar tentang pintu.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason: 'Mubtada’ berstatus rafa‘, tandanya ḍammah.'
				},
				segments: withArticle('الْبَابُ', 'بَابٌ berarti “pintu”.')
			},
			{
				text: 'مَفْتُوحٌ',
				gloss: 'terbuka',
				wordClass: 'isim',
				wordClassReason: tandaIsimTanwin,
				role: 'khabar',
				roleReason: 'Informasi yang melengkapi mubtada’: pintu itu terbuka.',
				finalVowel: {
					sign: 'tanwīn ḍammah',
					case: 'raf',
					reason: 'Khabar berstatus rafa‘, tandanya ḍammah; di sini ia bertanwin.'
				},
				sharaf: {
					kind: 'isim-maful',
					root: 'ف ت ح',
					pattern: 'مَفْعُول',
					note: 'Isim maf‘ūl dari فَتَحَ (membuka): “yang dibuka”, jadi “terbuka”. Ini bentuk kata; perannya di kalimat ini adalah khabar.'
				}
			}
		],
		relations: [
			{
				type: 'mubtada-khabar',
				from: [1],
				to: [2],
				reason: 'Kalimat ini memberi satu kabar yang utuh tentang pintu: ia terbuka.'
			}
		]
	}),
	sentence({
		id: 'wc-pintu-yang-terbuka',
		unit: 'phrase',
		origins: [lessonOrigin(0, 1)],
		translation: 'Pintu yang terbuka itu.',
		analysis: analysis(
			[aj.naat, aj.irab],
			limitNotes.phrase,
			limitNotes.naatAgreement,
			limitNotes.sharaf
		),
		ruleLinks: [lessonLink, naatLink],
		tokens: [
			{
				text: 'الْبَابُ',
				gloss: 'pintu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'manut',
				roleReason: 'Kata benda yang diterangkan oleh sifat sesudahnya.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason:
						'Dibaca rafa‘ sebagai contoh. Di kalimat lain akhirnya mengikuti perannya, jadi posisi ini tidak otomatis rafa‘.'
				},
				segments: withArticle('الْبَابُ', 'بَابٌ berarti “pintu”.')
			},
			{
				text: 'الْمَفْتُوحُ',
				gloss: 'yang terbuka',
				wordClass: 'isim',
				wordClassReason: 'Diawali الْـ; menyebut sifat.',
				role: 'naat',
				roleReason:
					'Sifat yang mengikuti الْبَابُ dalam i‘rab dan ketentuan (sama-sama tertentu). Keduanya juga sama-sama maskulin tunggal; kesesuaian jenis dan jumlah ini tidak disebut dalam bab yang dikutip.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason: 'Na‘at mengikuti i‘rab man‘ūt-nya; pada contoh ini keduanya rafa‘.'
				},
				sharaf: {
					kind: 'isim-maful',
					root: 'ف ت ح',
					pattern: 'مَفْعُول',
					note: 'Isim maf‘ūl dari فَتَحَ yang ditambah الْـ. Di sini ia berperan sebagai na‘at.'
				},
				segments: withArticle('الْمَفْتُوحُ', 'مَفْتُوحٌ: isim maf‘ūl dari فَتَحَ.')
			}
		],
		relations: [
			{
				type: 'naat-manut',
				from: [2],
				to: [1],
				reason: 'Sifat الْمَفْتُوحُ ikut tertentu dan ikut rafa‘ bersama الْبَابُ; keduanya satu frasa.'
			}
		]
	}),
	sentence({
		id: 'wc-penjaga-membuka',
		unit: 'sentence',
		origins: [lessonOrigin(1, 0)],
		translation: 'Penjaga membuka pintu itu.',
		analysis: analysis(
			[aj.kalam, aj.fail, aj.mafulBih, aj.marfuat, aj.manshubat, aj.irab, madinah.doer],
			limitNotes.sharaf
		),
		ruleLinks: [lessonLink, { label: 'Kaidah kalimat verbal', path: 'kaidah/kalimat/' }],
		tokens: [
			{
				text: 'فَتَحَ',
				gloss: 'membuka',
				wordClass: 'fiil',
				wordClassReason: tandaFiil,
				role: 'fiil',
				roleReason: 'Verba utama kalimat verbal. Pelaku disebut sesudahnya.',
				sharaf: {
					kind: 'fiil-madhi-aktif',
					root: 'ف ت ح',
					pattern: 'فَعَلَ',
					note: 'Māḍī aktif dari akar ف ت ح, pola فَعَلَ.'
				}
			},
			{
				text: 'الْحَارِسُ',
				gloss: 'penjaga itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'fail',
				roleReason: 'Pelaku yang disebut sesudah fi‘il: penjagalah yang membuka.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason: 'Fā‘il berstatus rafa‘, tandanya ḍammah.'
				},
				sharaf: {
					kind: 'isim-fail',
					root: 'ح ر س',
					pattern: 'فَاعِل',
					note: 'حَارِسٌ adalah isim fā‘il dari حَرَسَ, pola فَاعِل. Peran fā‘il di sini muncul karena ia pelaku yang disebut sesudah فَتَحَ, bukan karena bentuknya isim fā‘il.'
				},
				segments: withArticle('الْحَارِسُ', 'حَارِسٌ: isim fā‘il dari حَرَسَ.')
			},
			{
				text: 'الْبَابَ',
				gloss: 'pintu itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'maful-bih',
				roleReason: 'Objek langsung: sesuatu yang dikenai pekerjaan membuka.',
				finalVowel: {
					sign: 'fatḥah',
					case: 'nasb',
					reason:
						'Maf‘ūl bih berstatus naṣb, tandanya fatḥah. Karena itu akhirnya -a, bukan -u seperti pada contoh “pintu itu terbuka”.'
				},
				segments: withArticle('الْبَابَ', 'بَابٌ berarti “pintu”.')
			}
		],
		relations: [
			{
				type: 'fiil-fail',
				from: [1],
				to: [2],
				reason: 'Pelaku فَتَحَ adalah الْحَارِسُ.'
			},
			{
				type: 'fiil-maful-bih',
				from: [1],
				to: [3],
				reason: 'Yang dikenai pekerjaan فَتَحَ adalah الْبَابَ.'
			}
		]
	}),
	sentence({
		id: 'wc-pintu-dibuka',
		unit: 'sentence',
		origins: [lessonOrigin(1, 1)],
		translation: 'Pintu itu dibuka.',
		analysis: analysis(
			[aj.kalam, aj.naibFail, aj.marfuat, aj.irab, madinah.passive],
			limitNotes.naib,
			limitNotes.sharaf
		),
		ruleLinks: [lessonLink, { label: 'Kaidah kalimat pasif', path: 'kaidah/kalimat/' }],
		tokens: [
			{
				text: 'فُتِحَ',
				gloss: 'dibuka',
				wordClass: 'fiil',
				wordClassReason: tandaFiil,
				role: 'fiil',
				roleReason: 'Verba pasif: pelaku tidak disebut.',
				sharaf: {
					kind: 'fiil-madhi-pasif',
					root: 'ف ت ح',
					pattern: 'فُعِلَ',
					note: 'Māḍī pasif dengan akar yang sama. Vokalnya berubah dari pola فَعَلَ ke فُعِلَ.'
				}
			},
			{
				text: 'الْبَابُ',
				gloss: 'pintu itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'naib-fail',
				roleReason:
					'Pelaku tidak disebut, jadi الْبَابُ mengisi tempat fā‘il sebagai nā’ib al-fā‘il (pengganti fā‘il). Al-Ājurrūmiyyah menyebutnya al-maf‘ūl alladhī lam yusamma fā‘iluh.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason:
						'Nā’ib al-fā‘il berstatus rafa‘, tandanya ḍammah. Pada فَتَحَ الْحَارِسُ الْبَابَ kata yang sama berakhir fatḥah karena menjadi objek.'
				},
				segments: withArticle('الْبَابُ', 'بَابٌ berarti “pintu”.')
			}
		],
		relations: [
			{
				type: 'fiil-naib-fail',
				from: [1],
				to: [2],
				reason: 'Pada fi‘il pasif, الْبَابُ yang menempati posisi fā‘il.'
			}
		]
	}),
	sentence({
		id: 'wc-kunci-di-tas',
		unit: 'sentence',
		origins: [lessonOrigin(2, 0)],
		translation: 'Kunci itu ada di dalam tas.',
		analysis: analysis(
			[aj.kalam, aj.mubtada, aj.makhfudat, aj.irab, madinah.nominal],
			limitNotes.khafd,
			limitNotes.sharaf
		),
		ruleLinks: [lessonLink, idafahLink],
		tokens: [
			{
				text: 'الْمِفْتَاحُ',
				gloss: 'kunci itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'mubtada',
				roleReason: 'Topik kalimat nominal: kalimat memberi kabar tentang tempat kunci.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason: 'Mubtada’ berstatus rafa‘, tandanya ḍammah.'
				},
				sharaf: {
					kind: 'isim-alat',
					root: 'ف ت ح',
					pattern: 'مِفْعَال',
					note: 'Isim alat مِفْتَاحٌ dari akar ف ت ح, pola مِفْعَال.'
				},
				segments: withArticle('الْمِفْتَاحُ', 'مِفْتَاحٌ: isim alat dari فَتَحَ.')
			},
			{
				text: 'فِي',
				gloss: 'di dalam',
				wordClass: 'harf',
				wordClassReason:
					'Salah satu harf jarr yang disebut Al-Ājurrūmiyyah. Bentuknya tetap dan tidak punya tanda isim atau fi‘il.',
				role: 'harf-jar',
				partOf: 'khabar',
				roleReason:
					'Harf jarr: membuat isim sesudahnya majrūr. Bersama الْحَقِيبَةِ ia membentuk khabar tempat.'
			},
			{
				text: 'الْحَقِيبَةِ',
				gloss: 'tas itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'majrur',
				partOf: 'khabar',
				roleReason: 'Isim yang dijarrkan oleh فِي. Frasa فِي الْحَقِيبَةِ menjadi khabar tempat.',
				finalVowel: {
					sign: 'kasrah',
					case: 'jarr',
					reason: 'Majrūr sesudah فِي; tanda jarr pada bentuk ini adalah kasrah.'
				},
				segments: withArticle('الْحَقِيبَةِ', 'حَقِيبَةٌ adalah nomina feminin.')
			}
		],
		relations: [
			{
				type: 'jar-majrur',
				from: [2],
				to: [3],
				reason: 'فِي menjarrkan الْحَقِيبَةِ, maka akhirnya berkasrah.'
			},
			{
				type: 'mubtada-khabar',
				from: [1],
				to: [2, 3],
				reason: 'Frasa kata depan فِي الْحَقِيبَةِ menjadi khabar tempat bagi الْمِفْتَاحُ.'
			}
		]
	})
];

/** Selected G-03 examples (na‘at, iḍāfah, jarr–majrūr and the three cases) on /kaidah/frasa/. */
export const phraseAnnotations: readonly AnnotatedSentence[] = [
	sentence({
		id: 'ph-kitab-jadid',
		unit: 'phrase',
		origins: [
			phraseOrigin('naat-agreement', 'indefinite-adjective'),
			grammarOrigin('nat-manut', 'sifat-nakirah')
		],
		translation: 'Sebuah buku baru.',
		analysis: analysis([aj.naat, madinah.nominal], limitNotes.phrase),
		ruleLinks: [naatLink, g1NaatLink],
		tokens: [
			{
				text: 'كِتَابٌ',
				gloss: 'buku',
				wordClass: 'isim',
				wordClassReason: tandaIsimTanwin,
				role: 'manut',
				roleReason: 'Kata benda yang diterangkan oleh sifat جَدِيدٌ.',
				finalVowel: {
					sign: 'tanwīn ḍammah',
					case: 'raf',
					reason:
						'Contoh ini ditulis dalam posisi rafa‘ sebagai bentuk rujukan. Pada posisi naṣb atau jarr akhirnya ikut berubah.'
				}
			},
			{
				text: 'جَدِيدٌ',
				gloss: 'baru',
				wordClass: 'isim',
				wordClassReason: tandaIsimTanwin,
				role: 'naat',
				roleReason: 'Sifat yang mengikuti كِتَابٌ: sama-sama nakirah dan sama-sama rafa‘.',
				finalVowel: {
					sign: 'tanwīn ḍammah',
					case: 'raf',
					reason: 'Na‘at mengikuti i‘rab man‘ūt-nya; keduanya rafa‘ pada contoh ini.'
				}
			}
		],
		relations: [
			{
				type: 'naat-manut',
				from: [2],
				to: [1],
				reason: 'Keduanya nakirah dan rafa‘. Ini frasa sifat, bukan kalimat nominal.'
			}
		]
	}),
	sentence({
		id: 'ph-kitab-jadid-def',
		unit: 'phrase',
		origins: [phraseOrigin('naat-agreement', 'definite-adjective')],
		translation: 'Buku baru itu.',
		analysis: analysis([aj.naat, aj.mubtada], limitNotes.phrase),
		ruleLinks: [naatLink],
		tokens: [
			{
				text: 'الْكِتَابُ',
				gloss: 'buku itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'manut',
				roleReason: 'Kata benda yang diterangkan oleh sifat الْجَدِيدُ.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason:
						'Contoh ini ditulis dalam posisi rafa‘ sebagai bentuk rujukan. Pada posisi naṣb atau jarr akhirnya ikut berubah.'
				},
				segments: withArticle('الْكِتَابُ', 'كِتَابٌ berarti “buku”.')
			},
			{
				text: 'الْجَدِيدُ',
				gloss: 'yang baru',
				wordClass: 'isim',
				wordClassReason: 'Diawali الْـ; menyebut sifat.',
				role: 'naat',
				roleReason:
					'Sifat yang mengikuti الْكِتَابُ: sama-sama tertentu dengan الْـ dan sama-sama rafa‘.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason: 'Na‘at mengikuti i‘rab man‘ūt-nya; keduanya rafa‘ pada contoh ini.'
				},
				segments: withArticle('الْجَدِيدُ', 'جَدِيدٌ berarti “baru”.')
			}
		],
		relations: [
			{
				type: 'naat-manut',
				from: [2],
				to: [1],
				reason:
					'Keduanya ma‘rifah dengan الْـ. Bila sifatnya nakirah, maknanya dapat berubah menjadi berita.'
			}
		]
	}),
	sentence({
		id: 'ph-madrasa-kabira',
		unit: 'phrase',
		origins: [
			phraseOrigin('naat-agreement', 'feminine-adjective'),
			grammarOrigin('nat-manut', 'sifat-feminin')
		],
		translation: 'Sebuah sekolah besar.',
		analysis: analysis([aj.naat], limitNotes.phrase, limitNotes.naatAgreement),
		ruleLinks: [naatLink, g1NaatLink],
		tokens: [
			{
				text: 'مَدْرَسَةٌ',
				gloss: 'sekolah',
				wordClass: 'isim',
				wordClassReason: tandaIsimTanwin,
				role: 'manut',
				roleReason: 'Kata benda feminin yang diterangkan oleh sifat كَبِيرَةٌ.',
				finalVowel: {
					sign: 'tanwīn ḍammah',
					case: 'raf',
					reason:
						'Contoh ini ditulis dalam posisi rafa‘ sebagai bentuk rujukan. Pada posisi naṣb atau jarr akhirnya ikut berubah.'
				}
			},
			{
				text: 'كَبِيرَةٌ',
				gloss: 'besar',
				wordClass: 'isim',
				wordClassReason: tandaIsimTanwin,
				role: 'naat',
				roleReason: 'Sifat yang mengikuti مَدْرَسَةٌ: sama-sama feminin, nakirah dan rafa‘.',
				finalVowel: {
					sign: 'tanwīn ḍammah',
					case: 'raf',
					reason: 'Na‘at mengikuti i‘rab man‘ūt-nya; keduanya rafa‘ pada contoh ini.'
				}
			}
		],
		relations: [
			{
				type: 'naat-manut',
				from: [2],
				to: [1],
				reason: 'Kata benda dan sifat sama-sama feminin.'
			}
		]
	}),
	sentence({
		id: 'ph-kutub-jadida',
		unit: 'phrase',
		origins: [phraseOrigin('naat-agreement', 'nonhuman-plural')],
		translation: 'Buku-buku baru.',
		analysis: analysis(
			[aj.naat],
			limitNotes.phrase,
			limitNotes.naatAgreement,
			limitNotes.nonhumanPlural
		),
		ruleLinks: [naatLink],
		tokens: [
			{
				text: 'كُتُبٌ',
				gloss: 'buku-buku',
				wordClass: 'isim',
				wordClassReason: tandaIsimTanwin,
				role: 'manut',
				roleReason: 'Jamak taksīr benda tidak berakal yang diterangkan oleh sifat جَدِيدَةٌ.',
				finalVowel: {
					sign: 'tanwīn ḍammah',
					case: 'raf',
					reason:
						'Contoh ini ditulis dalam posisi rafa‘ sebagai bentuk rujukan. Pada posisi naṣb atau jarr akhirnya ikut berubah.'
				}
			},
			{
				text: 'جَدِيدَةٌ',
				gloss: 'baru',
				wordClass: 'isim',
				wordClassReason: tandaIsimTanwin,
				role: 'naat',
				roleReason:
					'Sifat dalam bentuk feminin tunggal untuk menerangkan jamak benda tidak berakal.',
				finalVowel: {
					sign: 'tanwīn ḍammah',
					case: 'raf',
					reason: 'Na‘at mengikuti i‘rab man‘ūt-nya; keduanya rafa‘ pada contoh ini.'
				},
				note: 'Feminin tunggal di sini adalah pola khusus untuk jamak benda tidak berakal, bukan kesalahan jumlah.'
			}
		],
		relations: [
			{
				type: 'naat-manut',
				from: [2],
				to: [1],
				reason: 'Jamak benda tidak berakal lazim diterangkan oleh sifat feminin tunggal.'
			}
		]
	}),
	sentence({
		id: 'ph-bab-al-bait',
		unit: 'phrase',
		origins: [phraseOrigin('idafah-jar', 'idafah-door'), grammarOrigin('idafah', 'idafah-pintu')],
		translation: 'Pintu rumah itu.',
		analysis: analysis([aj.makhfudat, madinah.idafah], limitNotes.phrase, limitNotes.khafd),
		ruleLinks: [idafahLink, g1IdafahLink],
		tokens: [
			{
				text: 'بَابُ',
				gloss: 'pintu',
				wordClass: 'isim',
				wordClassReason:
					'Dapat menerima tanwin (بَابٌ) dan الْـ (الْبَابُ), tanda isim. Di sini tidak bertanwin karena menjadi muḍāf.',
				role: 'mudhaf',
				roleReason: 'Kata pertama iḍāfah: “pintu” yang dimiliki atau dikaitkan dengan rumah.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason:
						'Di sini ditulis rafa‘ sebagai bentuk rujukan. Kasus muḍāf mengikuti fungsi frasa dalam kalimat.'
				}
			},
			{
				text: 'الْبَيْتِ',
				gloss: 'rumah itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'mudhaf-ilaih',
				roleReason: 'Kata kedua iḍāfah: kata yang dikaitkan dengan muḍāf.',
				finalVowel: {
					sign: 'kasrah',
					case: 'jarr',
					reason: 'Muḍāf ilaih berstatus jarr, tandanya kasrah.'
				},
				segments: withArticle('الْبَيْتِ', 'بَيْتٌ berarti “rumah”.')
			}
		],
		relations: [
			{
				type: 'mudhaf-mudhaf-ilaih',
				from: [1],
				to: [2],
				reason:
					'Muḍāf ilaih majrūr; muḍāf tidak bertanwin. Susunan ini frasa, bukan kalimat lengkap.'
			}
		]
	}),
	sentence({
		id: 'ph-fi-al-bait',
		unit: 'phrase',
		origins: [phraseOrigin('idafah-jar', 'preposition-house')],
		translation: 'Di dalam rumah itu.',
		analysis: analysis([aj.kalam, aj.makhfudat], limitNotes.prepositionPhrase, limitNotes.khafd),
		ruleLinks: [idafahLink],
		tokens: [
			{
				text: 'فِي',
				gloss: 'di dalam',
				wordClass: 'harf',
				wordClassReason:
					'Salah satu harf jarr yang disebut Al-Ājurrūmiyyah. Bentuknya tetap dan tidak punya tanda isim atau fi‘il.',
				role: 'harf-jar',
				roleReason: 'Harf jarr: membuat isim sesudahnya majrūr.'
			},
			{
				text: 'الْبَيْتِ',
				gloss: 'rumah itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'majrur',
				roleReason: jarrIsim('فِي'),
				finalVowel: {
					sign: 'kasrah',
					case: 'jarr',
					reason: 'Kasrah pada الْبَيْتِ disebabkan harf jarr فِي.'
				},
				segments: withArticle('الْبَيْتِ', 'بَيْتٌ berarti “rumah”.')
			}
		],
		relations: [
			{
				type: 'jar-majrur',
				from: [1],
				to: [2],
				reason: 'فِي menjarrkan الْبَيْتِ.'
			}
		]
	}),
	sentence({
		id: 'ph-fi-kitab-talib',
		unit: 'phrase',
		origins: [phraseOrigin('idafah-jar', 'preposition-idafah')],
		translation: 'Di dalam buku murid itu.',
		analysis: analysis(
			[aj.kalam, aj.makhfudat, madinah.idafah],
			limitNotes.prepositionPhrase,
			limitNotes.khafd
		),
		ruleLinks: [idafahLink],
		tokens: [
			{
				text: 'فِي',
				gloss: 'di',
				wordClass: 'harf',
				wordClassReason:
					'Salah satu harf jarr yang disebut Al-Ājurrūmiyyah. Bentuknya tetap dan tidak punya tanda isim atau fi‘il.',
				role: 'harf-jar',
				roleReason: 'Harf jarr: membuat isim sesudahnya majrūr.'
			},
			{
				text: 'كِتَابِ',
				gloss: 'buku',
				wordClass: 'isim',
				wordClassReason:
					'Didahului harf jarr فِي dan dibaca jarr; keduanya tanda isim. Tidak bertanwin karena menjadi muḍāf.',
				role: 'mudhaf',
				alsoRoles: ['majrur'],
				roleReason:
					'Kata pertama iḍāfah (muḍāf). Pada saat yang sama ia majrūr karena didahului فِي.',
				finalVowel: {
					sign: 'kasrah',
					case: 'jarr',
					reason: 'Berkasrah karena فِي, bukan karena menjadi muḍāf.'
				}
			},
			{
				text: 'الطَّالِبِ',
				gloss: 'murid itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'mudhaf-ilaih',
				roleReason: 'Kata kedua iḍāfah: murid yang memiliki atau dikaitkan dengan buku.',
				finalVowel: {
					sign: 'kasrah',
					case: 'jarr',
					reason: 'Berkasrah karena menjadi muḍāf ilaih, bukan karena فِي.'
				},
				segments: withArticle('الطَّالِبِ', 'طَالِبٌ berarti “murid”.')
			}
		],
		relations: [
			{
				type: 'jar-majrur',
				from: [1],
				to: [2],
				reason: 'فِي menjarrkan كِتَابِ.'
			},
			{
				type: 'mudhaf-mudhaf-ilaih',
				from: [2],
				to: [3],
				reason:
					'Kedua isim berkasrah, tetapi alasannya berbeda: كِتَابِ karena فِي, الطَّالِبِ karena iḍāfah.'
			}
		]
	}),
	sentence({
		id: 'ph-jaa-talib',
		unit: 'sentence',
		origins: [phraseOrigin('perubahan-irab', 'case-subject')],
		translation: 'Murid itu datang.',
		analysis: analysis([aj.kalam, aj.fail, aj.irab]),
		ruleLinks: [irabLink],
		tokens: [
			{
				text: 'جَاءَ',
				gloss: 'telah datang',
				wordClass: 'fiil',
				wordClassReason: tandaFiil,
				role: 'fiil',
				roleReason: 'Verba kalimat verbal; pelaku disebut sesudahnya.'
			},
			{
				text: 'الطَّالِبُ',
				gloss: 'murid itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'fail',
				roleReason: 'الطَّالِبُ menjadi pelaku (fā‘il).',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason: 'Fā‘il berstatus rafa‘, tandanya ḍammah.'
				},
				segments: withArticle('الطَّالِبُ', 'طَالِبٌ berarti “murid”.')
			}
		],
		relations: [
			{
				type: 'fiil-fail',
				from: [1],
				to: [2],
				reason: 'Pelaku جَاءَ adalah الطَّالِبُ.'
			}
		]
	}),
	sentence({
		id: 'ph-raaytu-talib',
		unit: 'sentence',
		origins: [phraseOrigin('perubahan-irab', 'case-object')],
		translation: 'Saya melihat murid itu.',
		analysis: analysis([aj.kalam, aj.fail, aj.mafulBih, aj.manshubat, aj.irab]),
		ruleLinks: [irabLink],
		tokens: [
			{
				text: 'رَأَيْتُ',
				gloss: 'saya melihat',
				wordClass: 'fiil',
				wordClassReason: tandaFiil,
				role: 'fiil',
				roleReason: 'Verba kalimat verbal. Pelakunya, “saya”, melekat pada kata ini sebagai تُ.',
				segments: withSubjectPronoun(
					'رَأَيْتُ',
					'تُ',
					'Batang fi‘il māḍī رَأَى; di depan تُ alif akhirnya kembali menjadi يْ (ya bersukun).'
				)
			},
			{
				text: 'الطَّالِبَ',
				gloss: 'murid itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'maful-bih',
				roleReason: 'الطَّالِبَ menjadi objek langsung.',
				finalVowel: {
					sign: 'fatḥah',
					case: 'nasb',
					reason: 'Maf‘ūl bih berstatus naṣb, tandanya fatḥah.'
				},
				segments: withArticle('الطَّالِبَ', 'طَالِبٌ berarti “murid”.')
			}
		],
		relations: [
			{
				type: 'fiil-maful-bih',
				from: [1],
				to: [2],
				reason: 'Yang dilihat adalah الطَّالِبَ.'
			}
		]
	}),
	sentence({
		id: 'ph-sallamtu-talib',
		unit: 'sentence',
		origins: [phraseOrigin('perubahan-irab', 'case-preposition')],
		translation: 'Saya memberi salam kepada murid itu.',
		analysis: analysis([aj.kalam, aj.fail, aj.makhfudat, aj.irab], limitNotes.khafd),
		ruleLinks: [irabLink, idafahLink],
		tokens: [
			{
				text: 'سَلَّمْتُ',
				gloss: 'saya memberi salam',
				wordClass: 'fiil',
				wordClassReason: tandaFiil,
				role: 'fiil',
				roleReason: 'Verba kalimat verbal. Pelakunya, “saya”, melekat pada kata ini sebagai تُ.',
				segments: withSubjectPronoun(
					'سَلَّمْتُ',
					'تُ',
					'Batang fi‘il māḍī سَلَّمَ; di depan تُ huruf akhirnya bersukun.'
				)
			},
			{
				text: 'عَلَى',
				gloss: 'kepada',
				wordClass: 'harf',
				wordClassReason:
					'Salah satu harf jarr yang disebut Al-Ājurrūmiyyah. Bentuknya tetap dan tidak punya tanda isim atau fi‘il.',
				role: 'harf-jar',
				roleReason: 'Harf jarr: membuat isim sesudahnya majrūr.'
			},
			{
				text: 'الطَّالِبِ',
				gloss: 'murid itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'majrur',
				roleReason: jarrIsim('عَلَى'),
				finalVowel: {
					sign: 'kasrah',
					case: 'jarr',
					reason: 'Majrūr sesudah عَلَى; tandanya kasrah.'
				},
				segments: withArticle('الطَّالِبِ', 'طَالِبٌ berarti “murid”.')
			}
		],
		relations: [
			{
				type: 'jar-majrur',
				from: [2],
				to: [3],
				reason: 'عَلَى menjarrkan الطَّالِبِ.'
			}
		]
	})
];

/** G-01 examples on /kaidah/ that have no counterpart among the G-03 phrase examples. */
const grammarOnlyAnnotations: readonly AnnotatedSentence[] = [
	sentence({
		id: 'g1-kitab-jadid-khabar',
		unit: 'sentence',
		origins: [grammarOrigin('mubtada-khabar', 'khabar-buku')],
		translation: 'Buku itu baru.',
		analysis: analysis([aj.mubtada, aj.marfuat, aj.irab, madinah.nominal]),
		ruleLinks: [g1MubtadaLink, naatLink],
		tokens: [
			{
				text: 'الْكِتَابُ',
				gloss: 'buku itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'mubtada',
				roleReason: 'Topik kalimat nominal: kalimat memberi kabar tentang buku itu.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason: 'Mubtada’ berstatus rafa‘, tandanya ḍammah.'
				},
				segments: withArticle('الْكِتَابُ', 'كِتَابٌ berarti “buku”.')
			},
			{
				text: 'جَدِيدٌ',
				gloss: 'baru',
				wordClass: 'isim',
				wordClassReason: tandaIsimTanwin,
				role: 'khabar',
				roleReason: 'Menyampaikan keadaan buku itu: baru.',
				finalVowel: {
					sign: 'tanwīn ḍammah',
					case: 'raf',
					reason: 'Khabar berstatus rafa‘, tandanya ḍammah; di sini ia bertanwin.'
				}
			}
		],
		relations: [
			{
				type: 'mubtada-khabar',
				from: [1],
				to: [2],
				reason:
					'Mubtada’ ma‘rifah, khabar nakirah; keduanya marfū‘. Tidak perlu kata “adalah”. Bandingkan dengan frasa الْكِتَابُ الْجَدِيدُ.'
			}
		]
	}),
	sentence({
		id: 'g1-madrasa-kabira-khabar',
		unit: 'sentence',
		origins: [grammarOrigin('mubtada-khabar', 'khabar-sekolah')],
		translation: 'Sekolah itu besar.',
		analysis: analysis(
			[aj.mubtada, aj.marfuat, aj.irab, madinah.nominal],
			limitNotes.khabarAgreement
		),
		ruleLinks: [g1MubtadaLink],
		tokens: [
			{
				text: 'الْمَدْرَسَةُ',
				gloss: 'sekolah itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'mubtada',
				roleReason: 'Topik kalimat nominal: kalimat memberi kabar tentang sekolah itu.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason: 'Mubtada’ berstatus rafa‘, tandanya ḍammah.'
				},
				segments: withArticle('الْمَدْرَسَةُ', 'مَدْرَسَةٌ berarti “sekolah”.')
			},
			{
				text: 'كَبِيرَةٌ',
				gloss: 'besar',
				wordClass: 'isim',
				wordClassReason: tandaIsimTanwin,
				role: 'khabar',
				roleReason:
					'Menyampaikan keadaan sekolah itu: besar. Fungsinya berita, bukan sifat penerang.',
				finalVowel: {
					sign: 'tanwīn ḍammah',
					case: 'raf',
					reason: 'Khabar berstatus rafa‘, tandanya ḍammah; di sini ia bertanwin.'
				}
			}
		],
		relations: [
			{
				type: 'mubtada-khabar',
				from: [1],
				to: [2],
				reason: 'Khabar berbentuk sifat feminin yang sesuai dengan sekolah; fungsinya berita.'
			}
		]
	}),
	sentence({
		id: 'g1-kitab-talib',
		unit: 'phrase',
		origins: [grammarOrigin('idafah', 'idafah-buku')],
		translation: 'Buku milik murid itu.',
		analysis: analysis([aj.makhfudat, madinah.idafah], limitNotes.phrase, limitNotes.khafd),
		ruleLinks: [g1IdafahLink],
		tokens: [
			{
				text: 'كِتَابُ',
				gloss: 'buku',
				wordClass: 'isim',
				wordClassReason:
					'Dapat menerima tanwin (كِتَابٌ) dan الْـ (الْكِتَابُ), tanda isim. Di sini tidak bertanwin karena menjadi muḍāf.',
				role: 'mudhaf',
				roleReason: 'Kata pertama iḍāfah: “buku” yang dimiliki oleh murid itu.',
				finalVowel: {
					sign: 'ḍammah',
					case: 'raf',
					reason:
						'Di sini ditulis rafa‘ sebagai bentuk rujukan. Kasus muḍāf mengikuti fungsi frasa dalam kalimat.'
				}
			},
			{
				text: 'الطَّالِبِ',
				gloss: 'murid itu',
				wordClass: 'isim',
				wordClassReason: tandaIsimAl,
				role: 'mudhaf-ilaih',
				roleReason: 'Kata kedua iḍāfah: murid yang memiliki buku itu.',
				finalVowel: {
					sign: 'kasrah',
					case: 'jarr',
					reason: 'Muḍāf ilaih berstatus jarr, tandanya kasrah.'
				},
				segments: withArticle('الطَّالِبِ', 'طَالِبٌ berarti “murid”.')
			}
		],
		relations: [
			{
				type: 'mudhaf-mudhaf-ilaih',
				from: [1],
				to: [2],
				reason: 'Muḍāf tanpa tanwin; muḍāf ilaih majrūr dengan kasrah.'
			}
		]
	})
];

export const grammarAnnotations: readonly AnnotatedSentence[] = [
	...wordClassAnnotations,
	...phraseAnnotations,
	...grammarOnlyAnnotations
];

export type AnnotatedPhraseRuleId = 'naat-agreement' | 'idafah-jar' | 'perubahan-irab';
export type AnnotatedGrammarRuleId = 'nat-manut' | 'mubtada-khabar' | 'idafah';

/** Annotated G-03 examples for one rule, in the order of the rule's examples. */
const hasOrigin = (item: AnnotatedSentence, test: (origin: AnnotationOrigin) => boolean) =>
	item.origins.some(test);

/** Annotated G-03 examples for one rule, in the order of the rule's examples. */
export function annotationsForPhraseRule(ruleId: AnnotatedPhraseRuleId): AnnotatedSentence[] {
	return phraseAnnotations.filter((item) =>
		hasOrigin(item, (o) => o.kind === 'phrase-rule' && o.ruleId === ruleId)
	);
}

/** Annotated G-01 examples (/kaidah/) for one rule, in the order of the rule's examples. */
export function annotationsForGrammarRule(ruleId: AnnotatedGrammarRuleId): AnnotatedSentence[] {
	const rule = grammarRules.find((item) => item.id === ruleId);
	return (rule?.examples ?? []).flatMap((example) => {
		const found = grammarAnnotations.find((item) =>
			hasOrigin(
				item,
				(o) => o.kind === 'grammar-rule' && o.ruleId === ruleId && o.exampleId === example.id
			)
		);
		return found ? [found] : [];
	});
}

export function annotationsForLessonGroup(lessonSlug: string, group: number): AnnotatedSentence[] {
	return grammarAnnotations.filter((item) =>
		hasOrigin(item, (o) => o.kind === 'lesson' && o.lessonSlug === lessonSlug && o.group === group)
	);
}

export function annotationForLessonSentence(
	lessonSlug: string,
	group: number,
	index: number
): AnnotatedSentence | undefined {
	return grammarAnnotations.find((item) =>
		hasOrigin(
			item,
			(o) =>
				o.kind === 'lesson' &&
				o.lessonSlug === lessonSlug &&
				o.group === group &&
				o.sentence === index
		)
	);
}
