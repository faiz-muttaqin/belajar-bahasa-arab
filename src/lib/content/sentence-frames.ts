/**
 * D-05b: curated alternative frames for the G-04 sentence cards.
 *
 * Every frame is ONE complete sentence. The original curriculum examples are
 * referenced by id (their tokens stay in sentence-rules.ts). New sentences are
 * written by the author for this project from recorded forms and are `draft`.
 * Nothing here is generated from a lemma. Forms that the author varied (feminine
 * verb, case ending, clitic) are marked `authored-variant` with the attested
 * surface they came from, and each is listed in docs/data/dynamic-clauses-d05bc-audit.md.
 */
import type { SentenceExample, SentenceRole, SentenceToken, VerbMood } from './sentence-rules.js';
import type { IrabCase } from './phrase-rules.js';
import type {
	FrameDef,
	FrameGap,
	SentenceTemplate,
	SlotMeta
} from '#lib/domain/grammar/frame-types.js';
import type { VerbFrameId } from '#lib/domain/grammar/verb-frames.js';
import { d03, recorded, slot, sourcesFor } from './frame-authoring.js';

export type SentenceFrame = FrameDef<SentenceExample, SentenceTemplate>;

type Part = { token: SentenceToken; slot: SlotMeta };

function nominal(
	wordClass: 'noun' | 'adjective',
	arabic: string,
	gloss: string,
	role: SentenceRole,
	detail: string,
	irab: IrabCase,
	marker: string,
	lexemeId: string,
	features: string,
	from?: string
): Part {
	return {
		token: { arabic, gloss, role, detail, irab, marker },
		slot: slot(lexemeId, wordClass, features, { from })
	};
}

/** Noun with a case ending. */
const n = (
	arabic: string,
	gloss: string,
	role: SentenceRole,
	detail: string,
	irab: IrabCase,
	marker: string,
	lexemeId: string,
	features: string,
	from?: string
) => nominal('noun', arabic, gloss, role, detail, irab, marker, lexemeId, features, from);

/** Adjective used as khabar or predicate. */
const a = (
	arabic: string,
	gloss: string,
	role: SentenceRole,
	detail: string,
	irab: IrabCase,
	marker: string,
	lexemeId: string,
	features: string,
	from?: string
) => nominal('adjective', arabic, gloss, role, detail, irab, marker, lexemeId, features, from);

/** A D-03 verb form (exact attested spelling). */
function d03Verb(
	arabic: string,
	gloss: string,
	detail: string,
	lexemeId: string,
	frame: VerbFrameId,
	mood?: VerbMood,
	marker?: string
): Part {
	return {
		token: { arabic, gloss, role: 'verb', detail, mood, marker },
		slot: d03(lexemeId, frame)
	};
}

/** A verb whose spelling is a gender or clitic variant written from `from`. */
function variantVerb(
	arabic: string,
	gloss: string,
	detail: string,
	lexemeId: string,
	features: string,
	from: string,
	mood?: VerbMood,
	marker?: string
): Part {
	return {
		token: { arabic, gloss, role: 'verb', detail, mood, marker },
		slot: slot(lexemeId, 'verb', features, { from })
	};
}

/** A verb already printed in the curriculum or in the Wiktionary extract. */
function plainVerb(
	arabic: string,
	gloss: string,
	detail: string,
	meta: SlotMeta,
	mood?: VerbMood,
	marker?: string
): Part {
	return { token: { arabic, gloss, role: 'verb', detail, mood, marker }, slot: meta };
}

const particle = (
	arabic: string,
	gloss: string,
	detail: string,
	lexemeId: string,
	role: SentenceRole = 'particle'
): Part => ({
	token: { arabic, gloss, role, detail },
	slot: slot(lexemeId, 'particle', '')
});

type Extra = { pluralAnimacy?: 'human' | 'nonhuman'; pairedActiveId?: string };

function authored(
	id: string,
	family: string,
	ruleId: string,
	template: SentenceTemplate,
	parts: readonly Part[],
	translation: string,
	explanation: string,
	basis: string,
	extra: Extra = {}
): SentenceFrame {
	const slots = parts.map((part) => part.slot);
	return {
		id,
		family,
		ruleId,
		template,
		example: { id, tokens: parts.map((part) => part.token), translation, explanation },
		slots,
		...extra,
		provenance: { basis, sources: sourcesFor(slots) }
	};
}

function original(
	id: string,
	family: string,
	ruleId: string,
	template: SentenceTemplate,
	slots: readonly SlotMeta[],
	extra: Extra = {}
): SentenceFrame {
	return {
		id,
		family,
		ruleId,
		template,
		original: true,
		slots,
		...extra,
		provenance: {
			basis: 'Contoh asli G-04 dari kurikulum proyek; metadata slot ditulis oleh pengurasi.',
			sources: sourcesFor(slots)
		}
	};
}

// Reused slot metadata for original examples and shared tokens.
const talib = slot('msa-talib', 'noun', 'm sg def');
const dars = slot('curr-dars', 'noun', 'm sg def');
const kitabDef = slot('msa-kitab', 'noun', 'm sg def');
const jadid = slot('msa-jadid', 'adjective', 'm sg indef');
const HARF = (id: string) => slot(id, 'particle', '');

const own = (note: string) =>
	'Kalimat ditulis untuk proyek ini dari bentuk yang sudah tercatat. ' + note;

const FAM = {
	adj: 's-nominal-adjective',
	prep: 's-nominal-prepositional',
	verbal: 's-nominal-verbal',
	vso: 's-verbal',
	passive: 's-passive',
	negation: 's-negation',
	nasikh: 's-nawasikh',
	question: 's-questions'
} as const;

export const sentenceFrames: readonly SentenceFrame[] = [
	// ---- Jumlah ismiyyah: mubtada + khabar sifat ------------------------------------------
	original('nominal-simple', FAM.adj, 'nominal', 'nominal-adjective', [kitabDef, jadid]),
	authored(
		'nominal-school',
		FAM.adj,
		'nominal',
		'nominal-adjective',
		[
			n('الْمَدْرَسَةُ', 'sekolah itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'msa-madrasah', 'f sg def'),
			a(
				'كَبِيرَةٌ',
				'besar',
				'predicate',
				'Khabar mufrad',
				'raf',
				'tanwin ḍamm',
				'msa-kabir',
				'f sg indef'
			)
		],
		'Sekolah itu besar.',
		'Mubtada feminin menuntut khabar feminin (كَبِيرَةٌ); keduanya marfū‘ dan khabar tetap nakirah.',
		own('Kedua kata adalah contoh G-01 (khabar-sekolah).')
	),
	authored(
		'nominal-student',
		FAM.adj,
		'nominal',
		'nominal-adjective',
		[
			n('الطَّالِبُ', 'murid itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'msa-talib', 'm sg def'),
			a(
				'مُجْتَهِدٌ',
				'rajin',
				'predicate',
				'Khabar mufrad',
				'raf',
				'tanwin ḍamm',
				'curr-mujtahid',
				'm sg indef'
			)
		],
		'Murid itu rajin.',
		'Mubtada dan khabar maskulin tunggal sama-sama marfū‘; khabar nakirah meski mubtada ma‘rifah.',
		own('Kedua kata adalah token contoh G-05 (relative-male).')
	),
	authored(
		'nominal-student-f',
		FAM.adj,
		'nominal',
		'nominal-adjective',
		[
			n('الطَّالِبَةُ', 'siswi itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'curr-talibah', 'f sg def'),
			a(
				'مُجْتَهِدَةٌ',
				'rajin',
				'predicate',
				'Khabar mufrad',
				'raf',
				'tanwin ḍamm',
				'curr-mujtahid',
				'f sg indef'
			)
		],
		'Siswi itu rajin.',
		'Mubtada feminin الطَّالِبَةُ diikuti khabar feminin مُجْتَهِدَةٌ; keduanya marfū‘.',
		own('Kedua kata adalah token contoh G-05 (relative-female).')
	),
	authored(
		'nominal-lesson',
		FAM.adj,
		'nominal',
		'nominal-adjective',
		[
			n('الدَّرْسُ', 'pelajaran itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'curr-dars', 'm sg def'),
			a(
				'طَوِيلٌ',
				'panjang',
				'predicate',
				'Khabar mufrad',
				'raf',
				'tanwin ḍamm',
				'msa-tawil',
				'm sg indef'
			)
		],
		'Pelajaran itu panjang.',
		'Mubtada ma‘rifah dan khabar nakirah, keduanya marfū‘ dan maskulin tunggal.',
		own('Kedua kata adalah token contoh G-05 (but-lesson).')
	),
	authored(
		'nominal-lesson-easy',
		FAM.adj,
		'nominal',
		'nominal-adjective',
		[
			n('الدَّرْسُ', 'pelajaran itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'curr-dars', 'm sg def'),
			a(
				'سَهْلٌ',
				'mudah',
				'predicate',
				'Khabar mufrad',
				'raf',
				'tanwin ḍamm',
				'msa-sahl',
				'm sg indef'
			)
		],
		'Pelajaran itu mudah.',
		'Mubtada ma‘rifah marfū‘ dan khabar sifat marfū‘ yang tetap nakirah.',
		own('Kedua kata adalah token contoh G-05 (because-sentence memakai الدَّرْسَ سَهْلٌ).')
	),
	authored(
		'nominal-books',
		FAM.adj,
		'nominal',
		'nominal-adjective',
		[
			n(
				'الْكُتُبُ',
				'buku-buku itu',
				'topic',
				'Mubtada jamak',
				'raf',
				'ḍamma',
				'msa-kitab',
				'm pl def',
				'كُتُبٌ'
			),
			a(
				'جَدِيدَةٌ',
				'baru',
				'predicate',
				'Khabar feminin tunggal',
				'raf',
				'tanwin ḍamm',
				'msa-jadid',
				'f sg indef'
			)
		],
		'Buku-buku itu baru.',
		'Jamak benda tak berakal memakai khabar feminin tunggal (جَدِيدَةٌ), bukan bentuk jamak sifat. Khabar tetap nakirah dan marfū‘.',
		own(
			'Jamak كُتُبٌ dicatat pada entri msa-kitab dan G-03; bentuk ber-ال dan marfū‘ disusun penulis.'
		),
		{ pluralAnimacy: 'nonhuman' }
	),
	authored(
		'nominal-letter',
		FAM.adj,
		'nominal',
		'nominal-adjective',
		[
			n('الرِّسَالَةُ', 'surat itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'msa-risalah', 'f sg def'),
			a(
				'صَغِيرَةٌ',
				'kecil',
				'predicate',
				'Khabar mufrad',
				'raf',
				'tanwin ḍamm',
				'msa-saghir',
				'f sg indef'
			)
		],
		'Surat itu kecil.',
		'Mubtada feminin dengan khabar feminin صَغِيرَةٌ; keduanya marfū‘ dan khabar tetap nakirah.',
		own('Bentuk feminin صَغِيرَةٌ tercatat pada entri msa-saghir; الرِّسَالَةُ adalah bentuk pilot G-06.')
	),

	// ---- Syibh-jumlah sebagai khabar ------------------------------------------------------
	original('nominal-prepositional', FAM.prep, 'nominal', 'nominal-prepositional', [
		kitabDef,
		HARF('fi'),
		slot('haqibah', 'noun', 'f sg def')
	]),
	authored(
		'prep-student-school',
		FAM.prep,
		'nominal',
		'nominal-prepositional',
		[
			n('الطَّالِبُ', 'murid itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'msa-talib', 'm sg def'),
			particle('فِي', 'di (dalam)', 'Huruf jar · bagian khabar', 'fi', 'predicate'),
			n(
				'الْمَدْرَسَةِ',
				'sekolah itu',
				'predicate',
				'Majrūr · bagian khabar',
				'jarr',
				'kasra',
				'msa-madrasah',
				'f sg def',
				'الْمَدْرَسَةُ'
			)
		],
		'Murid itu ada di sekolah.',
		'فِي الْمَدْرَسَةِ adalah syibh-jumlah sebagai khabar; الْمَدْرَسَةِ majrūr karena فِي.',
		own('Bentuk majrūr الْمَدْرَسَةِ disusun dari الْمَدْرَسَةُ.')
	),
	authored(
		'prep-boy-house',
		FAM.prep,
		'nominal',
		'nominal-prepositional',
		[
			n('الْوَلَدُ', 'anak laki-laki itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'msa-walad', 'm sg def'),
			particle('فِي', 'di (dalam)', 'Huruf jar · bagian khabar', 'fi', 'predicate'),
			n(
				'الْبَيْتِ',
				'rumah itu',
				'predicate',
				'Majrūr · bagian khabar',
				'jarr',
				'kasra',
				'msa-bayt',
				'm sg def'
			)
		],
		'Anak laki-laki itu ada di rumah.',
		'فِي الْبَيْتِ adalah khabar syibh-jumlah; الْبَيْتِ majrūr oleh فِي.',
		own('الْبَيْتِ adalah token contoh G-03 (preposition-house); الْوَلَدُ adalah bentuk pilot G-06.')
	),
	authored(
		'prep-girl-house',
		FAM.prep,
		'nominal',
		'nominal-prepositional',
		[
			n('الطَّالِبَةُ', 'siswi itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'curr-talibah', 'f sg def'),
			particle('فِي', 'di (dalam)', 'Huruf jar · bagian khabar', 'fi', 'predicate'),
			n(
				'الْبَيْتِ',
				'rumah itu',
				'predicate',
				'Majrūr · bagian khabar',
				'jarr',
				'kasra',
				'msa-bayt',
				'm sg def'
			)
		],
		'Siswi itu ada di rumah.',
		'Mubtada feminin tetap marfū‘; isim setelah فِي tetap majrūr.',
		own('Kedua isim adalah token contoh G-03/G-05.')
	),

	// ---- Mubtada + khabar berupa jumlah fi‘liyyah -----------------------------------------
	original('nominal-verbal-predicate', FAM.verbal, 'nominal', 'nominal-verbal', [
		talib,
		d03('fiil-kataba', 'present'),
		dars
	]),
	authored(
		'nv-read',
		FAM.verbal,
		'nominal',
		'nominal-verbal',
		[
			n('الطَّالِبُ', 'murid itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'msa-talib', 'm sg def'),
			d03Verb(
				'يَقْرَأُ',
				'sedang membaca',
				'Fi‘il dalam jumlah khabar; fā‘il tersembunyi',
				'fiil-qaraa',
				'present',
				'indicative',
				'ḍamma'
			),
			n(
				'الْكِتَابَ',
				'buku itu',
				'object',
				'Maf‘ūl bih dalam khabar',
				'nasb',
				'fatḥa',
				'msa-kitab',
				'm sg def'
			)
		],
		'Murid itu sedang membaca buku itu.',
		'الطَّالِبُ mubtada; يَقْرَأُ الْكِتَابَ jumlah fi‘liyyah sebagai khabar dengan fā‘il tersirat هُوَ.',
		own('يَقْرَأُ dari bentuk D-03 (qaraa).')
	),
	authored(
		'nv-girl-read',
		FAM.verbal,
		'nominal',
		'nominal-verbal',
		[
			n('الطَّالِبَةُ', 'siswi itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'curr-talibah', 'f sg def'),
			variantVerb(
				'تَقْرَأُ',
				'sedang membaca',
				'Fi‘il dalam jumlah khabar; fā‘il tersembunyi هِيَ',
				'fiil-qaraa',
				'3 f sg impf act',
				'يَقْرَأُ',
				'indicative',
				'ḍamma'
			),
			n(
				'الْكِتَابَ',
				'buku itu',
				'object',
				'Maf‘ūl bih dalam khabar',
				'nasb',
				'fatḥa',
				'msa-kitab',
				'm sg def'
			)
		],
		'Siswi itu sedang membaca buku itu.',
		'Awalan ت menandai muḍāri‘ orang ketiga feminin yang sesuai dengan mubtada feminin; fā‘il tersirat هِيَ.',
		own('تَقْرَأُ disusun dari يَقْرَأُ (D-03) sebagai bentuk feminin.')
	),
	authored(
		'nv-teacher-open',
		FAM.verbal,
		'nominal',
		'nominal-verbal',
		[
			n('الْأُسْتَاذُ', 'guru itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'msa-ustadh', 'm sg def'),
			d03Verb(
				'يَفْتَحُ',
				'sedang membuka',
				'Fi‘il dalam jumlah khabar; fā‘il tersembunyi',
				'fiil-fataha',
				'present',
				'indicative',
				'ḍamma'
			),
			n(
				'الْبَابَ',
				'pintu itu',
				'object',
				'Maf‘ūl bih dalam khabar',
				'nasb',
				'fatḥa',
				'bab',
				'm sg def'
			)
		],
		'Guru itu sedang membuka pintu itu.',
		'الْأُسْتَاذُ mubtada; يَفْتَحُ الْبَابَ jumlah fi‘liyyah sebagai khabar dengan fā‘il tersirat هُوَ; objek الْبَابَ manṣūb.',
		own('الْأُسْتَاذُ adalah bentuk pilot G-06; الْبَابَ adalah token contoh G-04.')
	),
	authored(
		'nv-sit',
		FAM.verbal,
		'nominal',
		'nominal-verbal',
		[
			n('الطَّالِبُ', 'murid itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'msa-talib', 'm sg def'),
			plainVerb(
				'يَجْلِسُ',
				'sedang duduk',
				'Fi‘il lazim dalam jumlah khabar; fā‘il tersembunyi',
				recorded('wikt-jalasa', 'present'),
				'indicative',
				'ḍamma'
			)
		],
		'Murid itu sedang duduk.',
		'يَجْلِسُ lazim pada contoh ini sehingga tidak ada maf‘ūl bih; hanya jumlah khabar dengan fā‘il tersirat.',
		own('يَجْلِسُ tercatat pada data Form I Wiktionary (جلس-1).')
	),

	// ---- Jumlah fi‘liyyah: fi‘il, fā‘il, maf‘ūl bih --------------------------------------
	original('verbal-past', FAM.vso, 'verbal', 'verbal', [d03('fiil-kataba', 'past'), talib, dars]),
	original('verbal-present', FAM.vso, 'verbal', 'verbal', [
		d03('fiil-qaraa', 'present'),
		talib,
		kitabDef
	]),
	authored(
		'vso-girl-write',
		FAM.vso,
		'verbal',
		'verbal',
		[
			variantVerb(
				'كَتَبَتِ',
				'telah menulis',
				'Fi‘il māḍī; ت menandai fā‘il feminin',
				'fiil-kataba',
				'3 f sg perf act',
				'كَتَبَ'
			),
			n('الطَّالِبَةُ', 'siswi itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'curr-talibah', 'f sg def'),
			n('الدَّرْسَ', 'pelajaran itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'curr-dars', 'm sg def')
		],
		'Siswi itu telah menulis pelajaran itu.',
		'Fi‘il mengikuti gender fā‘il: كَتَبَ menjadi كَتَبَتْ. Di sini كَتَبَتْ dibaca كَتَبَتِ karena bertemu ال- sesudahnya (ت diberi kasra agar dua sukūn tidak bertemu).',
		own('كَتَبَتِ disusun dari كَتَبَ (D-03); الطَّالِبَةُ dan الدَّرْسَ adalah token contoh G-05/G-04.')
	),
	authored(
		'vso-girl-read',
		FAM.vso,
		'verbal',
		'verbal',
		[
			variantVerb(
				'تَقْرَأُ',
				'sedang membaca',
				'Fi‘il muḍāri‘; ت menandai fā‘il feminin',
				'fiil-qaraa',
				'3 f sg impf act',
				'يَقْرَأُ',
				'indicative',
				'ḍamma'
			),
			n('الطَّالِبَةُ', 'siswi itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'curr-talibah', 'f sg def'),
			n('الْكِتَابَ', 'buku itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'msa-kitab', 'm sg def')
		],
		'Siswi itu sedang membaca buku itu.',
		'Muḍāri‘ feminin diawali ت agar cocok dengan fā‘il feminin; fi‘il tetap marfū‘.',
		own('تَقْرَأُ disusun dari يَقْرَأُ (D-03).')
	),
	authored(
		'vso-guard-open',
		FAM.vso,
		'verbal',
		'verbal',
		[
			d03Verb('فَتَحَ', 'telah membuka', 'Fi‘il māḍī', 'fiil-fataha', 'past'),
			n('الْحَارِسُ', 'penjaga itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'curr-haris', 'm sg def'),
			n('الْبَابَ', 'pintu itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'bab', 'm sg def')
		],
		'Penjaga itu telah membuka pintu itu.',
		'فَتَحَ muta‘addi; pelaku marfū‘ dan objek manṣūb.',
		own('Fi‘il dari D-03 (fataha); kedua isim adalah token contoh G-04 (active-opening).')
	),
	authored(
		'vso-boy-letter',
		FAM.vso,
		'verbal',
		'verbal',
		[
			d03Verb('كَتَبَ', 'telah menulis', 'Fi‘il māḍī', 'fiil-kataba', 'past'),
			n('الْوَلَدُ', 'anak laki-laki itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'msa-walad', 'm sg def'),
			n('الرِّسَالَةَ', 'surat itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'msa-risalah', 'f sg def')
		],
		'Anak laki-laki itu telah menulis surat itu.',
		'Objek feminin الرِّسَالَةَ tetap manṣūb; gender objek tidak memengaruhi bentuk fi‘il.',
		own('Fi‘il dari D-03 (kataba); fā‘il dan objek adalah bentuk pilot G-06.')
	),
	authored(
		'vso-students',
		FAM.vso,
		'verbal',
		'verbal',
		[
			d03Verb('كَتَبَ', 'telah menulis', 'Fi‘il māḍī; tetap tunggal', 'fiil-kataba', 'past'),
			n('الطُّلَّابُ', 'para murid', 'agent', 'Fā‘il jamak', 'raf', 'ḍamma', 'msa-talib', 'm pl def'),
			n('الدَّرْسَ', 'pelajaran itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'curr-dars', 'm sg def')
		],
		'Para murid telah menulis pelajaran itu.',
		'Fi‘il yang mendahului fā‘il tetap tunggal (كَتَبَ) walaupun fā‘il jamak; fā‘il tetap marfū‘.',
		own('الطُّلَّابُ adalah token contoh G-05 (exception).'),
		{ pluralAnimacy: 'human' }
	),
	authored(
		'vso-sit',
		FAM.vso,
		'verbal',
		'verbal',
		[
			plainVerb('جَلَسَ', 'telah duduk', 'Fi‘il māḍī lazim', recorded('wikt-jalasa', 'past')),
			n('الطَّالِبُ', 'murid itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'msa-talib', 'm sg def')
		],
		'Murid itu telah duduk.',
		'جَلَسَ lazim pada contoh ini: hanya fi‘il dan fā‘il, tanpa maf‘ūl bih.',
		own('جَلَسَ adalah token contoh G-05 (then-sequence) dan tercatat pada Wiktionary Form I.')
	),
	authored(
		'vso-absent',
		FAM.vso,
		'verbal',
		'verbal',
		[
			plainVerb(
				'غَابَ',
				'telah absen',
				'Fi‘il māḍī mu‘tal ajwaf, lazim',
				recorded('wikt-ghaba', 'past')
			),
			n('الطَّالِبُ', 'murid itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'msa-talib', 'm sg def')
		],
		'Murid itu absen.',
		'غَابَ adalah fi‘il māḍī mu‘tal ajwaf (akar غ-ي-ب) dan lazim: cukup dengan fā‘il, tanpa objek.',
		own('غَابَ adalah token contoh G-05 (because-of-noun) dan tercatat pada Wiktionary Form I.')
	),
	authored(
		'imperative-open',
		FAM.vso,
		'verbal',
		'imperative',
		[
			{
				token: {
					arabic: 'اِفْتَحْ',
					gloss: 'bukalah',
					role: 'verb',
					detail: 'Fi‘il amr · mabnī ‘alā sukūn; fā‘il tersirat أَنْتَ'
				},
				slot: d03('fiil-fataha', 'imperative')
			},
			n('الْبَابَ', 'pintu itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'bab', 'm sg def')
		],
		'Bukalah pintu itu!',
		'Amr orang kedua maskulin tunggal: tidak ada fā‘il tertulis karena أَنْتَ tersirat. Sukūn mengikuti bentuk tabel; dalam bacaan bersambung sebelum ال- harakatnya menjadi kasra.',
		own('اِفْتَحْ tercatat pada tabel amr D-03 (fataha).')
	),

	// ---- Aktif dan pasif -----------------------------------------------------------------
	original('active-writing', FAM.passive, 'passive', 'verbal', [
		d03('fiil-kataba', 'past'),
		talib,
		dars
	]),
	original(
		'passive-writing',
		FAM.passive,
		'passive',
		'passive',
		[slot('fiil-kataba', 'verb', '3 m sg perf pass'), dars],
		{ pairedActiveId: 'active-writing' }
	),
	original('active-opening', FAM.passive, 'passive', 'verbal', [
		d03('fiil-fataha', 'past'),
		slot('curr-haris', 'noun', 'm sg def'),
		slot('bab', 'noun', 'm sg def')
	]),
	original(
		'passive-opening',
		FAM.passive,
		'passive',
		'passive',
		[slot('fiil-fataha', 'verb', '3 m sg perf pass'), slot('bab', 'noun', 'm sg def')],
		{ pairedActiveId: 'active-opening' }
	),
	authored(
		'active-letter',
		FAM.passive,
		'passive',
		'verbal',
		[
			d03Verb('كَتَبَ', 'telah menulis', 'Fi‘il aktif', 'fiil-kataba', 'past'),
			n('الْوَلَدُ', 'anak laki-laki itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'msa-walad', 'm sg def'),
			n('الرِّسَالَةَ', 'surat itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'msa-risalah', 'f sg def')
		],
		'Anak laki-laki itu telah menulis surat itu.',
		'Pada bentuk aktif, الرِّسَالَةَ adalah objek manṣūb.',
		own('Fi‘il dari D-03; fā‘il dan objek adalah bentuk pilot G-06.')
	),
	authored(
		'passive-letter',
		FAM.passive,
		'passive',
		'passive',
		[
			{
				token: {
					arabic: 'كُتِبَتِ',
					gloss: 'telah ditulis',
					role: 'verb',
					detail: 'Fi‘il pasif feminin'
				},
				slot: slot('fiil-kataba', 'verb', '3 f sg perf pass', { from: 'كُتِبَ' })
			},
			n(
				'الرِّسَالَةُ',
				'surat itu',
				'deputy',
				'Nā’ib al-fā‘il',
				'raf',
				'ḍamma',
				'msa-risalah',
				'f sg def'
			)
		],
		'Surat itu telah ditulis.',
		'الرِّسَالَةُ beralih dari objek aktif menjadi nā’ib al-fā‘il yang marfū‘; fi‘il pasif ikut feminin: كُتِبَتْ dibaca كُتِبَتِ karena bertemu ال- sesudahnya. Pelaku tidak disebut.',
		own('كُتِبَتِ disusun dari كُتِبَ (contoh G-04 passive-writing) sebagai bentuk feminin.'),
		{ pairedActiveId: 'active-letter' }
	),

	// ---- Negasi -------------------------------------------------------------------------
	original('affirmative-present', FAM.negation, 'negation', 'verbal', [
		d03('fiil-kataba', 'present'),
		talib,
		dars
	]),
	original('negation-la', FAM.negation, 'negation', 'negation', [
		HARF('curr-la'),
		d03('fiil-kataba', 'present'),
		talib,
		dars
	]),
	original('negation-lam', FAM.negation, 'negation', 'negation', [
		HARF('curr-lam'),
		d03('fiil-kataba', 'lam'),
		talib,
		dars
	]),
	original('negation-lan', FAM.negation, 'negation', 'negation', [
		HARF('curr-lan'),
		d03('fiil-kataba', 'lan'),
		talib,
		dars
	]),
	authored(
		'neg-la-open',
		FAM.negation,
		'negation',
		'negation',
		[
			particle('لَا', 'tidak', 'Negasi biasa', 'curr-la'),
			d03Verb('يَفْتَحُ', 'membuka', 'Muḍāri‘', 'fiil-fataha', 'present', 'indicative', 'ḍamma'),
			n('الْحَارِسُ', 'penjaga itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'curr-haris', 'm sg def'),
			n('الْبَابَ', 'pintu itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'bab', 'm sg def')
		],
		'Penjaga itu tidak membuka pintu itu.',
		'لَا tidak mengubah mood: يَفْتَحُ tetap marfū‘.',
		own('Fi‘il dari D-03 (fataha); partikel dan isim adalah token contoh G-04.')
	),
	authored(
		'neg-la-girl-read',
		FAM.negation,
		'negation',
		'negation',
		[
			particle('لَا', 'tidak', 'Negasi biasa', 'curr-la'),
			variantVerb(
				'تَقْرَأُ',
				'membaca',
				'Muḍāri‘ feminin',
				'fiil-qaraa',
				'3 f sg impf act',
				'يَقْرَأُ',
				'indicative',
				'ḍamma'
			),
			n('الطَّالِبَةُ', 'siswi itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'curr-talibah', 'f sg def'),
			n('الْكِتَابَ', 'buku itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'msa-kitab', 'm sg def')
		],
		'Siswi itu tidak membaca buku itu.',
		'Fi‘il feminin تَقْرَأُ tetap marfū‘ setelah لَا.',
		own('تَقْرَأُ disusun dari يَقْرَأُ (D-03).')
	),
	authored(
		'neg-lan-letter',
		FAM.negation,
		'negation',
		'negation',
		[
			particle('لَنْ', 'tidak akan', 'Harf naṣb', 'curr-lan'),
			d03Verb('يَكْتُبَ', 'menulis', 'Muḍāri‘ manṣūb', 'fiil-kataba', 'lan', 'subjunctive', 'fatḥa'),
			n('الْوَلَدُ', 'anak laki-laki itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'msa-walad', 'm sg def'),
			n('الرِّسَالَةَ', 'surat itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'msa-risalah', 'f sg def')
		],
		'Anak laki-laki itu tidak akan menulis surat itu.',
		'لَنْ menashabkan muḍāri‘ sehingga akhir fi‘il menjadi يَكْتُبَ.',
		own('يَكْتُبَ tercatat pada contoh G-04 (negation-lan) dan D-03.')
	),
	authored(
		'neg-la-absent',
		FAM.negation,
		'negation',
		'negation',
		[
			particle('لَا', 'tidak', 'Negasi biasa', 'curr-la'),
			plainVerb(
				'يَغِيبُ',
				'absen',
				'Muḍāri‘ mu‘tal ajwaf, lazim',
				recorded('wikt-ghaba', 'present'),
				'indicative',
				'ḍamma'
			),
			n('الطَّالِبُ', 'murid itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'msa-talib', 'm sg def')
		],
		'Murid itu tidak absen.',
		'يَغِيبُ adalah muḍāri‘ dari fi‘il mu‘tal ajwaf; setelah لَا ia tetap marfū‘ dengan ḍamma. لَا di sini adalah لَا nāfiyah (penyangkal), bukan لَا larangan, sehingga fi‘il tidak majzūm.',
		own('يَغِيبُ tercatat pada Wiktionary Form I (غاب-1).')
	),

	// ---- Kāna dan inna -------------------------------------------------------------------
	original('nawasikh-base', FAM.nasikh, 'nawasikh', 'nominal-adjective', [kitabDef, jadid]),
	original('nawasikh-inna', FAM.nasikh, 'nawasikh', 'inna', [HARF('curr-inna'), kitabDef, jadid]),
	original('nawasikh-kana', FAM.nasikh, 'nawasikh', 'kana', [
		slot('curr-kana', 'verb', '3 m sg perf act'),
		kitabDef,
		jadid
	]),
	authored(
		'nasikh-base-school',
		FAM.nasikh,
		'nawasikh',
		'nominal-adjective',
		[
			n('الْمَدْرَسَةُ', 'sekolah itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'msa-madrasah', 'f sg def'),
			a('كَبِيرَةٌ', 'besar', 'predicate', 'Khabar', 'raf', 'tanwin ḍamm', 'msa-kabir', 'f sg indef')
		],
		'Sekolah itu besar.',
		'Sebelum nāsikh, mubtada dan khabar feminin sama-sama marfū‘.',
		own('Kedua kata adalah contoh G-01 (khabar-sekolah).')
	),
	authored(
		'nasikh-inna-school',
		FAM.nasikh,
		'nawasikh',
		'inna',
		[
			particle('إِنَّ', 'sesungguhnya', 'Harf nāsikh', 'curr-inna'),
			n(
				'الْمَدْرَسَةَ',
				'sekolah itu',
				'topic',
				'Ism inna',
				'nasb',
				'fatḥa',
				'msa-madrasah',
				'f sg def',
				'الْمَدْرَسَةُ'
			),
			a(
				'كَبِيرَةٌ',
				'besar',
				'predicate',
				'Khabar inna',
				'raf',
				'tanwin ḍamm',
				'msa-kabir',
				'f sg indef'
			)
		],
		'Sesungguhnya sekolah itu besar.',
		'إِنَّ menashabkan ism-nya (الْمَدْرَسَةَ); khabar feminin كَبِيرَةٌ tetap marfū‘.',
		own('Bentuk manṣūb الْمَدْرَسَةَ disusun dari الْمَدْرَسَةُ.')
	),
	authored(
		'nasikh-kana-school',
		FAM.nasikh,
		'nawasikh',
		'kana',
		[
			{
				token: {
					arabic: 'كَانَتِ',
					gloss: 'adalah (dahulu)',
					role: 'verb',
					detail: 'Fi‘il nāsikh; ت menandai ism feminin'
				},
				slot: slot('curr-kana', 'verb', '3 f sg perf act', { from: 'كَانَ' })
			},
			n('الْمَدْرَسَةُ', 'sekolah itu', 'topic', 'Ism kāna', 'raf', 'ḍamma', 'msa-madrasah', 'f sg def'),
			a(
				'كَبِيرَةً',
				'besar',
				'predicate',
				'Khabar kāna',
				'nasb',
				'tanwin fatḥ',
				'msa-kabir',
				'f sg indef',
				'كَبِيرَةٌ'
			)
		],
		'Sekolah itu dahulu besar.',
		'كَانَ mengikuti gender ism feminin: كَانَتْ dibaca كَانَتِ karena bertemu ال-. Khabar-nya manṣūb (كَبِيرَةً), ism-nya tetap marfū‘.',
		own('كَانَتِ disusun dari كَانَ, dan كَبِيرَةً dari كَبِيرَةٌ.')
	),
	authored(
		'nasikh-base-lesson',
		FAM.nasikh,
		'nawasikh',
		'nominal-adjective',
		[
			n('الدَّرْسُ', 'pelajaran itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'curr-dars', 'm sg def'),
			a('طَوِيلٌ', 'panjang', 'predicate', 'Khabar', 'raf', 'tanwin ḍamm', 'msa-tawil', 'm sg indef')
		],
		'Pelajaran itu panjang.',
		'Sebelum nāsikh, mubtada dan khabar sama-sama marfū‘.',
		own('Kedua kata adalah token contoh G-05 (but-lesson).')
	),
	authored(
		'nasikh-inna-lesson',
		FAM.nasikh,
		'nawasikh',
		'inna',
		[
			particle('إِنَّ', 'sesungguhnya', 'Harf nāsikh', 'curr-inna'),
			n('الدَّرْسَ', 'pelajaran itu', 'topic', 'Ism inna', 'nasb', 'fatḥa', 'curr-dars', 'm sg def'),
			a(
				'طَوِيلٌ',
				'panjang',
				'predicate',
				'Khabar inna',
				'raf',
				'tanwin ḍamm',
				'msa-tawil',
				'm sg indef'
			)
		],
		'Sesungguhnya pelajaran itu panjang.',
		'إِنَّ menashabkan ism-nya (الدَّرْسَ); khabar-nya tetap marfū‘.',
		own('الدَّرْسَ adalah token contoh G-04 (verbal-past).')
	),
	authored(
		'nasikh-kana-lesson',
		FAM.nasikh,
		'nawasikh',
		'kana',
		[
			{
				token: { arabic: 'كَانَ', gloss: 'adalah (dahulu)', role: 'verb', detail: 'Fi‘il nāsikh' },
				slot: slot('curr-kana', 'verb', '3 m sg perf act')
			},
			n('الدَّرْسُ', 'pelajaran itu', 'topic', 'Ism kāna', 'raf', 'ḍamma', 'curr-dars', 'm sg def'),
			a(
				'طَوِيلًا',
				'panjang',
				'predicate',
				'Khabar kāna',
				'nasb',
				'tanwin fatḥ',
				'msa-tawil',
				'm sg indef',
				'طَوِيلٌ'
			)
		],
		'Pelajaran itu dahulu panjang.',
		'كَانَ membuat khabar-nya manṣūb (طَوِيلًا), sementara ism-nya tetap marfū‘.',
		own('طَوِيلًا disusun dari طَوِيلٌ sebagai bentuk manṣūb nakirah.')
	),

	// ---- Kalimat tanya dengan hal -------------------------------------------------------
	original('question-nominal', FAM.question, 'questions', 'question-nominal', [
		HARF('curr-hal'),
		kitabDef,
		jadid
	]),
	original('question-verbal', FAM.question, 'questions', 'question-verbal', [
		HARF('curr-hal'),
		d03('fiil-kataba', 'past'),
		talib,
		dars
	]),
	authored(
		'q-school',
		FAM.question,
		'questions',
		'question-nominal',
		[
			particle('هَلْ', 'apakah', 'Partikel tanya', 'curr-hal'),
			n('الْمَدْرَسَةُ', 'sekolah itu', 'topic', 'Mubtada', 'raf', 'ḍamma', 'msa-madrasah', 'f sg def'),
			a('كَبِيرَةٌ', 'besar', 'predicate', 'Khabar', 'raf', 'tanwin ḍamm', 'msa-kabir', 'f sg indef')
		],
		'Apakah sekolah itu besar?',
		'هَلْ hanya menanyakan benar atau tidaknya berita; mubtada dan khabar tetap marfū‘. هَلْ aslinya bersukūn; bila disambung dengan ال- sesudahnya, ia dibaca هَلِ (seperti كَتَبَتْ menjadi كَتَبَتِ).',
		own('Kedua kata adalah contoh G-01 (khabar-sekolah); هَلْ adalah token G-04.')
	),
	authored(
		'q-guard-open',
		FAM.question,
		'questions',
		'question-verbal',
		[
			particle('هَلْ', 'apakah', 'Partikel tanya', 'curr-hal'),
			d03Verb('فَتَحَ', 'telah membuka', 'Fi‘il māḍī', 'fiil-fataha', 'past'),
			n('الْحَارِسُ', 'penjaga itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'curr-haris', 'm sg def'),
			n('الْبَابَ', 'pintu itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'bab', 'm sg def')
		],
		'Apakah penjaga itu telah membuka pintu itu?',
		'هَلْ tidak mengubah pelaku marfū‘ dan objek manṣūb.',
		own('Fi‘il dari D-03 (fataha); isim adalah token contoh G-04.')
	),
	authored(
		'q-absent',
		FAM.question,
		'questions',
		'question-verbal',
		[
			particle('هَلْ', 'apakah', 'Partikel tanya', 'curr-hal'),
			plainVerb(
				'غَابَ',
				'telah absen',
				'Fi‘il māḍī mu‘tal ajwaf, lazim',
				recorded('wikt-ghaba', 'past')
			),
			n('الطَّالِبُ', 'murid itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'msa-talib', 'm sg def')
		],
		'Apakah murid itu absen?',
		'Pertanyaan ya/tidak dengan fi‘il mu‘tal lazim: tidak ada objek.',
		own('غَابَ tercatat pada Wiktionary Form I (غاب-1).')
	),
	authored(
		'q-girl-write',
		FAM.question,
		'questions',
		'question-verbal',
		[
			particle('هَلْ', 'apakah', 'Partikel tanya', 'curr-hal'),
			variantVerb(
				'كَتَبَتِ',
				'telah menulis',
				'Fi‘il māḍī; ت menandai fā‘il feminin',
				'fiil-kataba',
				'3 f sg perf act',
				'كَتَبَ'
			),
			n('الطَّالِبَةُ', 'siswi itu', 'agent', 'Fā‘il', 'raf', 'ḍamma', 'curr-talibah', 'f sg def'),
			n('الدَّرْسَ', 'pelajaran itu', 'object', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'curr-dars', 'm sg def')
		],
		'Apakah siswi itu telah menulis pelajaran itu?',
		'Fi‘il feminin mengikuti fā‘il feminin: كَتَبَتْ dibaca كَتَبَتِ karena bertemu ال-. هَلْ tidak mengubah i‘rab.',
		own('كَتَبَتِ disusun dari كَتَبَ (D-03).')
	)
];

/** Disabled options that stand for forms the project has not recorded. They never show unattested Arabic. */
export const sentenceGaps: readonly FrameGap[] = [
	{
		id: 'gap-dual-subject',
		family: FAM.adj,
		label: 'Mubtada mutsanna (dua benda), misalnya buku itu berdua',
		surfaces: [],
		reason:
			'Bentuk mutsanna beserta khabarnya belum tercatat pada data contoh; engine tidak membuatnya dari pola.'
	},
	{
		id: 'gap-passive-mutal',
		family: FAM.passive,
		label: 'Pasif dari fi‘il mu‘tal',
		surfaces: ['قَالَ'],
		reason:
			'Bentuk pasif fi‘il mu‘tal (misalnya dari قَالَ) belum tercatat; materi pasif dibatasi pada fi‘il shahih Form I.'
	},
	{
		id: 'gap-passive-present',
		family: FAM.passive,
		label: 'Pasif muḍāri‘',
		surfaces: [],
		reason: 'Pasif muḍāri‘ belum tercatat pada data contoh; contoh pasif hanya māḍī.'
	}
];

/** Families whose verb slot lists D-03 forms that are not recorded (lam, lan, amr per verb). */
export const sentenceVerbGapFamilies: readonly string[] = [FAM.vso, FAM.negation];

/** Verbs whose D-03 frames are checked for gaps. */
export const sentenceGapVerbs: readonly { id: string; lemma: string; meaning: string }[] = [
	{ id: 'fiil-kataba', lemma: 'كَتَبَ', meaning: 'menulis' },
	{ id: 'fiil-qaraa', lemma: 'قَرَأَ', meaning: 'membaca' },
	{ id: 'fiil-fataha', lemma: 'فَتَحَ', meaning: 'membuka' }
];
