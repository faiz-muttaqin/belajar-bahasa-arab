/**
 * VP-01: annotation contract for the word-role explorer (docs/plans/visual-pembelajaran.md §2).
 *
 * A sentence (or phrase) is annotated once, with stable ids for the sentence, every token and
 * every relation. Display position is never an identity: the order of `tokens` is reading order
 * (right to left for Arabic) and a nahwu role always comes from the annotation, not from the
 * token's number.
 *
 * Rules the contract enforces (see `validateAnnotatedSentences`):
 * - Each token keeps the full orthographic word with its harakat and clitics. `segments` only
 *   describe the parts of that one word; they never create new words.
 * - Every analysis names a specific source (chapter or lesson plus URL), a usage type and a
 *   status. Status is `draft` until the single end-to-end ustadz review of ADR-004 D-9.
 * - Relations point to existing tokens of the same sentence and agree with the token roles.
 *
 * Pure TypeScript: no UI, no storage, no parser. Content lives in `#lib/content/`.
 */
import type { IrabCase } from '#lib/content/phrase-rules.js';

export type AnnotationStatus = 'draft';

/** Same vocabulary as `MeaningQuestion.sources[].usageType`. */
export type AnnotationUsageType = 'independent-original' | 'adaptation' | 'verbatim';
export const ANNOTATION_USAGE_TYPES: readonly AnnotationUsageType[] = [
	'independent-original',
	'adaptation',
	'verbatim'
];

export type AnnotationSource = {
	label: string;
	/** https URL of the cited page. */
	url: string;
	/** Chapter, lesson or section the claim rests on. Never empty. */
	locator: string;
};

export type AnnotationAnalysis = {
	sources: readonly [AnnotationSource, ...AnnotationSource[]];
	usageType: AnnotationUsageType;
	status: AnnotationStatus;
	/** What the evidence does not cover, in Indonesian. Shown to the learner. */
	limits: string;
};

export type WordClass = 'isim' | 'fiil' | 'harf';
export const WORD_CLASS_LABELS: Record<WordClass, string> = {
	isim: 'Isim',
	fiil: 'Fi‘il',
	harf: 'Harf'
};

export type RoleId =
	| 'mubtada'
	| 'khabar'
	| 'fiil'
	| 'fail'
	| 'naib-fail'
	| 'maful-bih'
	| 'naat'
	| 'manut'
	| 'mudhaf'
	| 'mudhaf-ilaih'
	| 'harf-jar'
	| 'majrur'
	| 'zharf';

export const ROLE_LABELS: Record<RoleId, string> = {
	mubtada: 'Mubtada’',
	khabar: 'Khabar',
	fiil: 'Fi‘il',
	fail: 'Fā‘il',
	'naib-fail': 'Nā’ib al-fā‘il',
	'maful-bih': 'Maf‘ūl bih',
	naat: 'Na‘at',
	manut: 'Man‘ūt',
	mudhaf: 'Muḍāf',
	'mudhaf-ilaih': 'Muḍāf ilaih',
	'harf-jar': 'Harf jarr',
	majrur: 'Majrūr',
	zharf: 'Ẓarf'
};

/** Short Indonesian gloss of the role itself, shown with the legend. */
export const ROLE_MEANINGS: Record<RoleId, string> = {
	mubtada: 'topik kalimat nominal',
	khabar: 'kabar tentang mubtada’',
	fiil: 'kata kerja yang memulai kalimat verbal',
	fail: 'pelaku',
	'naib-fail': 'pengganti pelaku pada kalimat pasif',
	'maful-bih': 'objek langsung',
	naat: 'sifat yang menerangkan',
	manut: 'kata yang diterangkan sifat',
	mudhaf: 'kata pertama iḍāfah',
	'mudhaf-ilaih': 'kata kedua iḍāfah',
	'harf-jar': 'huruf yang menjarrkan isim sesudahnya',
	majrur: 'isim yang dijarrkan',
	zharf: 'keterangan tempat atau waktu (maf‘ūl fīh)'
};

export type RelationType =
	| 'naat-manut'
	| 'mudhaf-mudhaf-ilaih'
	| 'jar-majrur'
	| 'mubtada-khabar'
	| 'fiil-fail'
	| 'fiil-naib-fail'
	| 'fiil-maful-bih'
	| 'dhamir-marji';

export const RELATION_LABELS: Record<RelationType, string> = {
	'naat-manut': 'Na‘at–man‘ūt',
	'mudhaf-mudhaf-ilaih': 'Muḍāf–muḍāf ilaih',
	'jar-majrur': 'Jarr–majrūr',
	'mubtada-khabar': 'Mubtada’–khabar',
	'fiil-fail': 'Fi‘il–fā‘il',
	'fiil-naib-fail': 'Fi‘il–nā’ib al-fā‘il',
	'fiil-maful-bih': 'Fi‘il–maf‘ūl bih',
	'dhamir-marji': 'Kata ganti–rujukan'
};

/**
 * Allowed roles at each end of a relation. `from` and `to` follow the order of the type name.
 * `dhamir-marji` joins a pronoun to the word it refers to; it has no role constraint because a
 * pronoun's own role comes from the clause it sits in.
 */
export const RELATION_ROLES: Record<
	RelationType,
	{ from: readonly RoleId[]; to: readonly RoleId[] } | null
> = {
	'naat-manut': { from: ['naat'], to: ['manut'] },
	'mudhaf-mudhaf-ilaih': { from: ['mudhaf'], to: ['mudhaf-ilaih'] },
	'jar-majrur': { from: ['harf-jar'], to: ['majrur'] },
	'mubtada-khabar': { from: ['mubtada'], to: ['khabar'] },
	'fiil-fail': { from: ['fiil'], to: ['fail'] },
	'fiil-naib-fail': { from: ['fiil'], to: ['naib-fail'] },
	'fiil-maful-bih': { from: ['fiil'], to: ['maful-bih'] },
	'dhamir-marji': null
};

export type SharafKind =
	'fiil-madhi-aktif' | 'fiil-madhi-pasif' | 'isim-fail' | 'isim-maful' | 'isim-alat';

export const SHARAF_KIND_LABELS: Record<SharafKind, string> = {
	'fiil-madhi-aktif': 'Fi‘il māḍī aktif',
	'fiil-madhi-pasif': 'Fi‘il māḍī pasif',
	'isim-fail': 'Isim fā‘il',
	'isim-maful': 'Isim maf‘ūl',
	'isim-alat': 'Isim alat'
};

export type SharafNote = {
	kind: SharafKind;
	/** Root letters as written in the source, e.g. ف ت ح. */
	root?: string;
	/** Pattern as written in the source, e.g. مَفْعُول. */
	pattern?: string;
	/** Indonesian explanation of the form. The nahwu role belongs in `roleReason`; a sharaf note only says the form does not decide it. */
	note: string;
};

export type FinalVowel = {
	/** Visible sign, e.g. “ḍammah” or “tanwīn kasrah”. */
	sign: string;
	case: IrabCase;
	/** Why the ending has this sign. Only given where the source analysis supports it. */
	reason: string;
};

export type TokenSegmentKind = 'definite-article' | 'stem' | 'attached-pronoun';

/** A part of one word. Segments are explanation only and never become separate words. */
export type TokenSegment = {
	text: string;
	kind: TokenSegmentKind;
	note: string;
};

export type AnnotatedToken = {
	id: string;
	/** The whole word as written, with harakat and attached clitics. */
	text: string;
	/** Indonesian gloss of this word. */
	gloss: string;
	wordClass: WordClass;
	/** Short reason for the word class, in Indonesian. */
	wordClassReason: string;
	role: RoleId;
	/** The role of the phrase this word is part of, e.g. a jarr–majrūr pair serving as khabar. */
	partOf?: RoleId;
	/** Other roles the same word fills at once, e.g. a muḍāf that is also majrūr after a harf jarr. */
	alsoRoles?: readonly RoleId[];
	roleReason: string;
	finalVowel?: FinalVowel;
	sharaf?: SharafNote;
	segments?: readonly TokenSegment[];
	/** Extra remark that fits no other field, e.g. agreement of a plural. */
	note?: string;
};

export type AnnotationRelation = {
	id: string;
	type: RelationType;
	from: readonly [string, ...string[]];
	to: readonly [string, ...string[]];
	reason: string;
};

/** Where an annotated sentence comes from in existing site content. Used to detect drift. */
export type AnnotationOrigin =
	| { kind: 'lesson'; lessonSlug: string; group: number; sentence: number }
	| { kind: 'grammar-rule'; ruleId: string; exampleId: string }
	| { kind: 'phrase-rule'; ruleId: string; exampleId: string };

export type RuleLink = {
	label: string;
	path: RuleLinkPath;
};

/** Pages an annotation may link to. Narrow on purpose: see `SectionPath` in navigation.ts. */
export type RuleLinkPath =
	| 'kaidah/#nat-manut'
	| 'kaidah/#mubtada-khabar'
	| 'kaidah/#idafah'
	| 'kaidah/frasa/#naat-agreement'
	| 'kaidah/frasa/#idafah-jar'
	| 'kaidah/frasa/#perubahan-irab'
	| 'kaidah/frasa/#zharf-makan-zaman'
	| 'kaidah/frasa/#muannath-salim'
	| 'kaidah/frasa/#asma-khamsa'
	| 'kaidah/frasa/#jamak-taksir-mamnu'
	| 'kaidah/frasa/#maqshur-manqush'
	| 'kaidah/frasa/#kata-mabni'
	| 'kaidah/frasa/#idafah-nasb-marifah'
	| 'belajar/isim-fiil-harf/#bedah-kalimat'
	| 'kaidah/kalimat/';

export type AnnotatedSentence = {
	id: string;
	/** `phrase` is a noun phrase or preposition phrase without a complete predicate. */
	unit: 'sentence' | 'phrase';
	/** Every existing example this annotation describes; the same text may appear on two pages. */
	origins: readonly [AnnotationOrigin, ...AnnotationOrigin[]];
	tokens: readonly AnnotatedToken[];
	relations: readonly AnnotationRelation[];
	/** Natural Indonesian translation of the whole sentence. */
	translation: string;
	analysis: AnnotationAnalysis;
	ruleLinks: readonly RuleLink[];
};

export const SENTENCE_ID = /^[a-z][a-z0-9-]*$/;

/** The sentence as written: tokens joined by single spaces. */
export function annotatedText(sentence: Pick<AnnotatedSentence, 'tokens'>): string {
	return sentence.tokens.map((token) => token.text).join(' ');
}

export function tokenById(sentence: AnnotatedSentence, id: string): AnnotatedToken | undefined {
	return sentence.tokens.find((token) => token.id === id);
}

/** Relations that include the token at either end. */
export function relationsOf(sentence: AnnotatedSentence, tokenId: string): AnnotationRelation[] {
	return sentence.relations.filter(
		(relation) => relation.from.includes(tokenId) || relation.to.includes(tokenId)
	);
}

/** Tokens linked to `tokenId` by any relation, excluding the token itself. */
export function relatedTokenIds(sentence: AnnotatedSentence, tokenId: string): string[] {
	const ids = new Set<string>();
	for (const relation of relationsOf(sentence, tokenId)) {
		for (const id of [...relation.from, ...relation.to]) if (id !== tokenId) ids.add(id);
	}
	return [...ids];
}

/** Roles a token can answer to in a relation: its own, its other roles and its phrase role. */
function rolesForRelation(token: AnnotatedToken): RoleId[] {
	return [token.role, ...(token.alsoRoles ?? []), ...(token.partOf ? [token.partOf] : [])];
}

const MARKS = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/gu;
/** Letters without harakat, used to compare an annotation with older content. */
export function stripAnnotationMarks(text: string): string {
	return text.replace(MARKS, '');
}

export function validateAnnotatedSentences(sentences: readonly AnnotatedSentence[]): string[] {
	const errors: string[] = [];
	const sentenceIds = new Set<string>();
	const tokenIds = new Set<string>();
	const relationIds = new Set<string>();

	for (const sentence of sentences) {
		const at = sentence.id;
		if (!SENTENCE_ID.test(sentence.id)) errors.push(`${at}: invalid sentence id`);
		if (sentenceIds.has(sentence.id)) errors.push(`${at}: duplicate sentence id`);
		sentenceIds.add(sentence.id);

		if (!sentence.origins?.length) errors.push(`${at}: missing origin`);
		if (!sentence.translation.trim()) errors.push(`${at}: missing translation`);
		if (sentence.tokens.length === 0) errors.push(`${at}: no tokens`);

		const analysis = sentence.analysis;
		if (!analysis.sources?.length) errors.push(`${at}: analysis has no source`);
		for (const source of analysis.sources ?? []) {
			if (!source.url.startsWith('https://')) errors.push(`${at}: source needs an https url`);
			if (!source.locator.trim()) errors.push(`${at}: source needs a chapter or lesson`);
			if (!source.label.trim()) errors.push(`${at}: source needs a label`);
		}
		if (!ANNOTATION_USAGE_TYPES.includes(analysis.usageType))
			errors.push(`${at}: unknown usage type`);
		if (analysis.status !== 'draft') errors.push(`${at}: status must be draft until review`);
		if (!analysis.limits.trim()) errors.push(`${at}: analysis must state its limits`);

		const local = new Map<string, AnnotatedToken>();
		sentence.tokens.forEach((token, index) => {
			const expected = `${sentence.id}.t${index + 1}`;
			if (token.id !== expected) errors.push(`${at}: token id ${token.id} should be ${expected}`);
			if (tokenIds.has(token.id)) errors.push(`${token.id}: duplicate token id`);
			tokenIds.add(token.id);
			local.set(token.id, token);

			if (!token.text.trim() || /\s/u.test(token.text))
				errors.push(`${token.id}: a token is exactly one written word`);
			if (!token.gloss.trim()) errors.push(`${token.id}: missing gloss`);
			if (!token.wordClassReason.trim()) errors.push(`${token.id}: missing word class reason`);
			if (!token.roleReason.trim()) errors.push(`${token.id}: missing role reason`);
			if (token.finalVowel && !token.finalVowel.reason.trim())
				errors.push(`${token.id}: final vowel without a reason`);
			if (token.sharaf && !token.sharaf.note.trim())
				errors.push(`${token.id}: sharaf note is empty`);
			if (token.segments) {
				if (token.segments.map((segment) => segment.text).join('') !== token.text)
					errors.push(`${token.id}: segments must add up to the written word`);
				if (token.segments.some((segment) => !segment.note.trim()))
					errors.push(`${token.id}: segment without a note`);
			}
		});

		sentence.relations.forEach((relation, index) => {
			const expected = `${sentence.id}.r${index + 1}`;
			if (relation.id !== expected)
				errors.push(`${at}: relation id ${relation.id} should be ${expected}`);
			if (relationIds.has(relation.id)) errors.push(`${relation.id}: duplicate relation id`);
			relationIds.add(relation.id);
			if (!relation.reason.trim()) errors.push(`${relation.id}: missing reason`);

			const ends = [
				['from', relation.from],
				['to', relation.to]
			] as const;
			for (const [end, ids] of ends) {
				if (ids.length === 0) errors.push(`${relation.id}: ${end} is empty`);
				for (const id of ids) {
					if (!local.has(id)) errors.push(`${relation.id}: ${end} points to missing token ${id}`);
				}
			}
			if (relation.from.some((id) => relation.to.includes(id)))
				errors.push(`${relation.id}: a token cannot relate to itself`);

			const roles = RELATION_ROLES[relation.type];
			if (!roles) return;
			for (const [end, ids] of ends) {
				for (const id of ids) {
					const token = local.get(id);
					if (token && !rolesForRelation(token).some((role) => roles[end].includes(role)))
						errors.push(
							`${relation.id}: ${id} has role ${token.role}, not valid for ${relation.type}`
						);
				}
			}
		});
	}
	return errors;
}
