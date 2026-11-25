/**
 * VP-03 pilot: three change sequences between sentences that VP-01 already annotated.
 *
 * Every Arabic form a step mentions is a token of an annotated, sourced sentence; no intermediate
 * sentence is invented and nothing is derived from the dictionary. The Indonesian reasons are
 * original teaching text. Sources are the ones the underlying annotations cite. Everything stays
 * `draft` (ADR-004 D-9). Inventory, sources and review notes: docs/data/vp01-annotation-pilot.md.
 */
import { qatr } from './annotation-builders.js';
import { aj, grammarAnnotations, madinah } from './grammar-annotations.js';
import {
	resolveChangeSequence,
	type ChangeSequence,
	type ResolvedSequence
} from '#lib/domain/grammar/change-steps.js';

const ownedLimits =
	'Pasangan kalimat ini contoh tertulis proyek. Langkah-langkahnya penjelasan proyek yang disusun dari anotasi bersumber; sumber hanya dipakai untuk memeriksa istilah dan kaidah. Masih draf dan belum ditinjau ustadz.';

/** Pair 1 (G-01): a phrase with an adjective becomes a nominal sentence. */
const adjectivePhraseToNominal: ChangeSequence = {
	id: 'cs-sifat-ke-khabar',
	title: 'Dari frasa sifat ke kalimat nominal',
	intro:
		'Bandingkan frasa “buku baru itu” dengan kalimat “buku itu baru”. Hanya satu kata yang berubah bentuk, tetapi hubungan kedua kata berubah.',
	placement: { kind: 'grammar-rule', ruleId: 'mubtada-khabar' },
	before: 'ph-kitab-jadid-def',
	after: 'g1-kitab-jadid-khabar',
	usageType: 'independent-original',
	status: 'draft',
	limits:
		ownedLimits +
		' Aturan bahwa sifat dan kata yang disifati sama-sama tertentu atau tidak tertentu berasal dari bab na‘at; kesesuaian jenis dan jumlah tidak dibahas di sini dan perlu sumber tambahan. Frasa pertama ditulis berḍammah sebagai bentuk rujukan.',
	steps: [
		{
			id: 'cs-sifat-ke-khabar.s1',
			title: 'Kata sifat melepas الْـ',
			changes: [
				{
					before: 'ph-kitab-jadid-def.t2',
					after: 'g1-kitab-jadid-khabar.t2',
					aspect: 'form',
					summary:
						'الْجَدِيدُ menjadi جَدِيدٌ. Awalan الْـ lepas, sehingga kata itu tidak tertentu lagi dan huruf akhirnya kembali bertanwin.'
				}
			],
			dependents: [],
			stays: [
				{
					before: 'ph-kitab-jadid-def.t1',
					after: 'g1-kitab-jadid-khabar.t1',
					note: 'الْكِتَابُ tidak berubah bentuk: tetap tertentu dengan الْـ dan tetap marfū‘ dengan ḍammah.'
				}
			],
			reason:
				'Na‘at mengikuti man‘ūt-nya dalam i‘rab dan ketertentuan. Selama sifatnya tertentu seperti الْكِتَابُ, keduanya menyatu sebagai satu frasa. Setelah الْـ dilepas, جَدِيدٌ tidak lagi tertentu seperti الْكِتَابُ, sehingga tidak dibaca sebagai penerang kata benda itu.',
			sources: [aj.naat, aj.irab]
		},
		{
			id: 'cs-sifat-ke-khabar.s2',
			title: 'Sifat menjadi khabar, kata benda menjadi mubtada’',
			changes: [
				{
					before: 'ph-kitab-jadid-def.t2',
					after: 'g1-kitab-jadid-khabar.t2',
					aspect: 'role',
					summary: 'جَدِيدٌ tidak lagi menerangkan kata benda, tetapi memberi kabar tentangnya.'
				}
			],
			dependents: [
				{
					before: 'ph-kitab-jadid-def.t1',
					after: 'g1-kitab-jadid-khabar.t1',
					aspect: 'role',
					summary:
						'الْكِتَابُ ditulis sama, tetapi kini menjadi topik kalimat, bukan kata yang diterangkan.'
				}
			],
			stays: [],
			reason:
				'Frasa “buku baru itu” menjadi kalimat nominal “buku itu baru”. الْكِتَابُ menjadi mubtada’ dan جَدِيدٌ menjadi khabar. Keduanya tetap berḍammah, jadi pada langkah ini tidak ada harakat yang berubah. Bedanya, pada frasa ḍammah itu hanya bentuk rujukan; pada kalimat, mubtada’ dan khabar memang marfū‘. Kalimat nominal Arab tidak memerlukan kata “adalah”.',
			sources: [aj.mubtada, madinah.nominal]
		}
	]
};

/** Pair 2 (G-03): the muḍāf takes the case of a preceding harf jarr. */
const idafahAfterPreposition: ChangeSequence = {
	id: 'cs-fi-mudhaf',
	title: 'Iḍāfah setelah harf jarr',
	intro:
		'Bandingkan iḍāfah “buku murid itu” dengan “di dalam buku murid itu”. Harf jarr mengubah akhir kata pertama, bukan kata kedua.',
	placement: { kind: 'phrase-rule', ruleId: 'idafah-jar' },
	before: 'g1-kitab-talib',
	after: 'ph-fi-kitab-talib',
	usageType: 'independent-original',
	status: 'draft',
	limits:
		ownedLimits +
		' Al-Ājurrūmiyyah memakai istilah khafḍ untuk apa yang di sini disebut jarr. Pada frasa pertama كِتَابُ ditulis berḍammah hanya sebagai bentuk rujukan; frasa itu belum menempati kedudukan apa pun dalam kalimat.',
	steps: [
		{
			id: 'cs-fi-mudhaf.s1',
			title: 'Harf jarr فِي ditambahkan di depan',
			changes: [
				{
					after: 'ph-fi-kitab-talib.t1',
					aspect: 'added',
					summary: 'فِي (“di”) muncul di awal frasa. Frasa lama tetap utuh di belakangnya.'
				}
			],
			dependents: [],
			stays: [],
			reason:
				'فِي adalah harf jarr: ia diletakkan sebelum isim dan membuat isim itu majrūr. Pada frasa yang berupa iḍāfah, isim pertama yang langsung mengikutinya adalah muḍāf.',
			sources: [aj.makhfudat]
		},
		{
			id: 'cs-fi-mudhaf.s2',
			title: 'Muḍāf menjadi majrūr',
			changes: [
				{
					before: 'g1-kitab-talib.t1',
					after: 'ph-fi-kitab-talib.t2',
					aspect: 'ending',
					summary: 'كِتَابُ menjadi كِتَابِ. Ḍammah (bentuk rujukan) diganti kasrah.'
				}
			],
			dependents: [],
			stays: [
				{
					before: 'g1-kitab-talib.t2',
					after: 'ph-fi-kitab-talib.t3',
					note: 'الطَّالِبِ tetap berkasrah dengan alasan yang sama seperti sebelumnya: ia majrūr karena iḍāfah, bukan karena فِي. Jadi dua kasrah pada frasa ini punya sebab yang berbeda.'
				}
			],
			reason:
				'Isim yang didahului harf jarr berstatus jarr; pada kata ini tandanya kasrah. Muḍāf ilaih sudah majrūr karena iḍāfah, jadi harakat akhirnya tidak berubah. Muḍāf tetap tanpa tanwin.',
			sources: [aj.makhfudat, aj.irab, madinah.idafah]
		}
	]
};

/** Pair 4 (G-03): the muḍāf becomes manṣūb as an object; the muḍāf ilaih stays majrūr. */
const idafahAsObject: ChangeSequence = {
	id: 'cs-idafah-nasb',
	title: 'Iḍāfah menjadi objek',
	intro:
		'Bandingkan iḍāfah “buku milik murid itu” dengan “saya melihat buku milik murid itu”. Hanya kata pertama yang berubah akhirnya; kata kedua tetap berkasrah.',
	placement: { kind: 'phrase-rule', ruleId: 'idafah-nasb-marifah' },
	before: 'g1-kitab-talib',
	after: 'ph-raaytu-kitab-talib',
	usageType: 'independent-original',
	status: 'draft',
	limits:
		ownedLimits +
		' Al-Ājurrūmiyyah memakai istilah khafḍ untuk apa yang di sini disebut jarr. Pada frasa pertama كِتَابُ ditulis berḍammah hanya sebagai bentuk rujukan; frasa itu belum menempati kedudukan apa pun dalam kalimat.',
	steps: [
		{
			id: 'cs-idafah-nasb.s1',
			title: 'Fi‘il ditambahkan di depan',
			changes: [
				{
					after: 'ph-raaytu-kitab-talib.t1',
					aspect: 'added',
					summary:
						'رَأَيْتُ (“saya melihat”) muncul di awal. Frasa iḍāfah yang lama tetap utuh di belakangnya.'
				}
			],
			dependents: [],
			stays: [],
			reason:
				'Fi‘il ini membutuhkan objek. Frasa iḍāfah yang tadinya berdiri sendiri kini menjadi objek langsung (maf‘ūl bih) dari fi‘il itu.',
			sources: [aj.mafulBih]
		},
		{
			id: 'cs-idafah-nasb.s2',
			title: 'Muḍāf menjadi manṣūb',
			changes: [
				{
					before: 'g1-kitab-talib.t1',
					after: 'ph-raaytu-kitab-talib.t2',
					aspect: 'ending',
					summary: 'كِتَابُ menjadi كِتَابَ. Ḍammah (bentuk rujukan) diganti fatḥah.'
				},
				{
					before: 'g1-kitab-talib.t1',
					after: 'ph-raaytu-kitab-talib.t2',
					aspect: 'role',
					summary: 'Dari muḍāf saja menjadi muḍāf yang sekaligus objek langsung (maf‘ūl bih).'
				}
			],
			dependents: [],
			stays: [
				{
					before: 'g1-kitab-talib.t2',
					after: 'ph-raaytu-kitab-talib.t3',
					note: 'الطَّالِبِ tetap berkasrah. Ia majrūr karena iḍāfah, apa pun kedudukan frasa itu dalam kalimat.'
				}
			],
			reason:
				'Maf‘ūl bih berstatus naṣb. Yang menerima tanda naṣb adalah muḍāf, yaitu kata pertama frasa, sedangkan muḍāf ilaih tetap majrūr. Muḍāf tetap tanpa tanwin.',
			sources: [aj.manshubat, aj.mafulBih, aj.irab, aj.makhfudat, madinah.idafah]
		}
	]
};

/** Pair 5 (G-03): al-asmā’ al-khamsa takes alif in naṣb instead of wāw. */
const fatherFromSubjectToObject: ChangeSequence = {
	id: 'cs-abu-aba',
	title: 'Dari أَبُو ke أَبَا',
	intro:
		'Bandingkan “ayah murid itu datang” dengan “saya melihat ayah murid itu”. Tanda i‘rab kata أَبٌ berpindah dari huruf wāw ke huruf alif.',
	placement: { kind: 'phrase-rule', ruleId: 'asma-khamsa' },
	before: 'ph-jaa-abu-talib',
	after: 'ph-raaytu-aba-talib',
	usageType: 'independent-original',
	status: 'draft',
	limits:
		ownedLimits +
		' Dua kalimat ini memakai fi‘il yang berbeda, jadi pergantian fi‘il bukan perubahan bentuk satu kata. Syarat lengkap penggunaan wāw, alif dan yā’ tidak dirinci dalam sumber yang dikutip.',
	steps: [
		{
			id: 'cs-abu-aba.s1',
			title: 'Fi‘il diganti',
			changes: [
				{
					before: 'ph-jaa-abu-talib.t1',
					aspect: 'dropped',
					summary:
						'جَاءَ (“telah datang”) tidak dipakai lagi. Ini bukan perubahan bentuk, tetapi fi‘il lain.'
				},
				{
					after: 'ph-raaytu-aba-talib.t1',
					aspect: 'added',
					summary: 'رَأَيْتُ (“saya melihat”) dipakai sebagai gantinya.'
				}
			],
			dependents: [],
			stays: [],
			reason:
				'Fi‘il yang baru membutuhkan objek, sehingga kata yang tadi menjadi pelaku kini menjadi objek langsung. Pergantian fi‘il inilah yang mengubah kedudukannya, bukan perubahan pada kata أَبُو sendiri.',
			sources: [aj.fail, aj.mafulBih]
		},
		{
			id: 'cs-abu-aba.s2',
			title: 'Wāw berganti alif',
			changes: [
				{
					before: 'ph-jaa-abu-talib.t2',
					after: 'ph-raaytu-aba-talib.t2',
					aspect: 'form',
					summary: 'أَبُو menjadi أَبَا. Huruf akhir wāw diganti alif.'
				},
				{
					before: 'ph-jaa-abu-talib.t2',
					after: 'ph-raaytu-aba-talib.t2',
					aspect: 'ending',
					summary: 'Tanda i‘rab berpindah dari wāw (rafa‘) ke alif (naṣb).'
				},
				{
					before: 'ph-jaa-abu-talib.t2',
					after: 'ph-raaytu-aba-talib.t2',
					aspect: 'role',
					summary: 'Dari pelaku (fā‘il) menjadi objek langsung (maf‘ūl bih).'
				}
			],
			dependents: [],
			stays: [
				{
					before: 'ph-jaa-abu-talib.t3',
					after: 'ph-raaytu-aba-talib.t3',
					note: 'الطَّالِبِ tetap berkasrah karena iḍāfah.'
				}
			],
			reason:
				'Al-asmā’ al-khamsa memakai wāw untuk rafa‘, alif untuk naṣb dan yā’ untuk jarr ketika muḍāf. Jadi tanda perubahan kasusnya adalah pergantian huruf (wāw menjadi alif); harakat pada bā’ ikut menyesuaikan, tetapi bukan itu tanda i‘rabnya.',
			sources: [aj.irab, qatr.types, madinah.sixNouns]
		}
	]
};

/** Pair 6 (G-03): jamak muannath sālim takes kasrah in naṣb, not fatḥah. */
const feminineSoundPluralToObject: ChangeSequence = {
	id: 'cs-muallimat-nasb',
	title: 'Jamak muannath sālim menjadi objek',
	intro:
		'Bandingkan “para guru perempuan itu datang” dengan “saya melihat para guru perempuan itu”. Akhir kata berubah dari ḍammah ke kasrah, bukan ke fatḥah.',
	placement: { kind: 'phrase-rule', ruleId: 'muannath-salim' },
	before: 'ph-jaat-muallimat',
	after: 'ph-raaytu-muallimat',
	usageType: 'independent-original',
	status: 'draft',
	limits:
		ownedLimits +
		' Dua kalimat ini memakai fi‘il yang berbeda, jadi pergantian fi‘il bukan perubahan bentuk satu kata. Contoh nakirah (مُعَلِّمَاتٍ) tidak ada dalam urutan ini.',
	steps: [
		{
			id: 'cs-muallimat-nasb.s1',
			title: 'Fi‘il diganti',
			changes: [
				{
					before: 'ph-jaat-muallimat.t1',
					aspect: 'dropped',
					summary:
						'جَاءَتِ (“telah datang”, feminin) tidak dipakai lagi. Ini fi‘il lain, bukan perubahan bentuk.'
				},
				{
					after: 'ph-raaytu-muallimat.t1',
					aspect: 'added',
					summary: 'رَأَيْتُ (“saya melihat”) dipakai sebagai gantinya.'
				}
			],
			dependents: [],
			stays: [],
			reason:
				'Fi‘il yang baru membutuhkan objek, sehingga الْمُعَلِّمَاتُ yang tadi menjadi pelaku kini menjadi objek langsung.',
			sources: [aj.fail, aj.mafulBih]
		},
		{
			id: 'cs-muallimat-nasb.s2',
			title: 'Ḍammah menjadi kasrah',
			changes: [
				{
					before: 'ph-jaat-muallimat.t2',
					after: 'ph-raaytu-muallimat.t2',
					aspect: 'ending',
					summary: 'الْمُعَلِّمَاتُ menjadi الْمُعَلِّمَاتِ. Ḍammah (rafa‘) diganti kasrah (naṣb).'
				},
				{
					before: 'ph-jaat-muallimat.t2',
					after: 'ph-raaytu-muallimat.t2',
					aspect: 'role',
					summary: 'Dari pelaku (fā‘il) menjadi objek langsung (maf‘ūl bih).'
				}
			],
			dependents: [],
			stays: [],
			reason:
				'Maf‘ūl bih berstatus naṣb. Untuk isim tunggal tandanya fatḥah, tetapi jamak muannath sālim memakai kasrah sebagai tanda naṣb (Al-Ājurrūmiyyah).',
			sources: [aj.irab, aj.manshubat, qatr.types, madinah.feminineSound]
		}
	]
};

/** Pair 3 (lesson "Baca kalimat ketika pelakunya tidak disebut"): active to passive. */
const activeToPassive: ChangeSequence = {
	id: 'cs-aktif-ke-pasif',
	title: 'Dari aktif ke pasif',
	intro:
		'Bandingkan “penjaga membuka pintu itu” dengan “pintu itu dibuka”. Tiga hal berubah: vokal fi‘il, penyebutan pelaku dan kedudukan pintu.',
	placement: { kind: 'lesson', lessonSlug: 'kalimat-aktif-dan-pasif' },
	before: 'wc-penjaga-membuka',
	after: 'wc-pintu-dibuka',
	usageType: 'independent-original',
	status: 'draft',
	limits:
		ownedLimits +
		' Istilah nā’ib al-fā‘il tidak ada di Al-Ājurrūmiyyah; di sana disebut al-maf‘ūl alladhī lam yusamma fā‘iluh. Akar dan pola kata berasal dari pelajaran proyek; perubahan vokal fi‘il pasif didukung bab al-maf‘ūl alladhī lam yusamma fā‘iluh. Halaman Madinah 34 bagian 1 hanya memberi contoh pasif; aturan vokalnya didukung Al-Ājurrūmiyyah. Halaman Madinah dibaca melalui peringkas halaman, bukan teks mentah. Bentuk pasif nonlampau dan pasif dari pola fi‘il lain tidak dibahas.',
	steps: [
		{
			id: 'cs-aktif-ke-pasif.s1',
			title: 'Vokal fi‘il berubah',
			changes: [
				{
					before: 'wc-penjaga-membuka.t1',
					after: 'wc-pintu-dibuka.t1',
					aspect: 'pattern',
					summary: 'فَتَحَ menjadi فُتِحَ. Pola فَعَلَ menjadi فُعِلَ (fataḥa menjadi futiḥa). Akar ف ت ح sama.'
				}
			],
			dependents: [],
			stays: [],
			reason:
				'Pada fi‘il māḍī tiga huruf seperti ini, bentuk pasif dibuat dengan mengganti vokal, bukan dengan menambah kata: huruf pertama berḍammah, huruf sebelum akhir (di sini huruf kedua) berkasrah, dan huruf terakhir tetap berfatḥah. Maknanya bergeser dari “membuka” menjadi “dibuka”.',
			sources: [aj.naibFail]
		},
		{
			id: 'cs-aktif-ke-pasif.s2',
			title: 'Pelaku tidak disebut',
			changes: [
				{
					before: 'wc-penjaga-membuka.t2',
					aspect: 'dropped',
					summary:
						'الْحَارِسُ tidak muncul dalam kalimat pasif. Tidak ada kata lain yang menyebut pelakunya.'
				}
			],
			dependents: [],
			stays: [],
			reason:
				'Kalimat pasif ini hanya menyatakan tindakan dan apa yang dikenainya. Teks tidak memberi tahu siapa yang membuka, jadi terjemahannya tidak menambahkan “oleh penjaga”.',
			sources: [aj.naibFail, madinah.passive]
		},
		{
			id: 'cs-aktif-ke-pasif.s3',
			title: 'Objek menempati tempat pelaku',
			changes: [
				{
					before: 'wc-penjaga-membuka.t3',
					after: 'wc-pintu-dibuka.t2',
					aspect: 'role',
					summary: 'Dari objek (maf‘ūl bih) menjadi pengganti pelaku (nā’ib al-fā‘il).'
				},
				{
					before: 'wc-penjaga-membuka.t3',
					after: 'wc-pintu-dibuka.t2',
					aspect: 'ending',
					summary: 'الْبَابَ menjadi الْبَابُ. Fatḥah (naṣb) diganti ḍammah (rafa‘).'
				}
			],
			dependents: [],
			stays: [],
			reason:
				'Pada kalimat ini fi‘il pasif tidak lagi punya objek langsung. الْبَابَ naik ke tempat fā‘il sebagai nā’ib al-fā‘il (Al-Ājurrūmiyyah: al-maf‘ūl alladhī lam yusamma fā‘iluh), sehingga ia marfū‘ dan berḍammah.',
			sources: [aj.naibFail, aj.mafulBih, aj.manshubat, aj.marfuat, aj.irab, madinah.passive]
		}
	]
};

export const changeSequences: readonly ChangeSequence[] = [
	adjectivePhraseToNominal,
	idafahAfterPreposition,
	activeToPassive,
	idafahAsObject,
	fatherFromSubjectToObject,
	feminineSoundPluralToObject
];

function placed(test: (sequence: ChangeSequence) => boolean): ResolvedSequence[] {
	return changeSequences
		.filter(test)
		.map((sequence) => resolveChangeSequence(sequence, grammarAnnotations));
}

/** Sequences for one G-01 rule on /kaidah/. */
export function changeSequencesForGrammarRule(ruleId: string): ResolvedSequence[] {
	return placed((s) => s.placement.kind === 'grammar-rule' && s.placement.ruleId === ruleId);
}

/** Sequences for one G-03 rule on /kaidah/frasa/. */
export function changeSequencesForPhraseRule(ruleId: string): ResolvedSequence[] {
	return placed((s) => s.placement.kind === 'phrase-rule' && s.placement.ruleId === ruleId);
}

/** Sequences for one lesson page. */
export function changeSequencesForLesson(lessonSlug: string): ResolvedSequence[] {
	return placed((s) => s.placement.kind === 'lesson' && s.placement.lessonSlug === lessonSlug);
}
