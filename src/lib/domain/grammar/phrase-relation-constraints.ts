/**
 * D-04b: syntax boundaries around iḍāfah, ḥurūf al-jarr, attached
 * possessive pronouns, and definite relative clauses.
 *
 * A relation can only be selected in an explicitly curated teaching frame.
 * Neither morphology nor joined spellings are generated from lemma strings.
 * Everything here remains draft until linguist review of individual examples.
 */
import { attachedPronouns } from '#lib/content/reference-isim.js';
import { clauseRules } from '#lib/content/clause-rules.js';
import type { IrabCase } from '#lib/content/phrase-rules.js';
import {
	evaluateSlotCandidate,
	type ConstraintCode,
	type ConstraintReason,
	type SlotCandidate
} from './grammar-constraints.js';

export type RelationWord = SlotCandidate & { text: string };

export type RelationCode =
	| ConstraintCode
	| 'missing-relation-metadata'
	| 'invalid-construct-state'
	| 'uncurated-relation'
	| 'unsupported-particle'
	| 'unattested-clitic'
	| 'unsupported-clitic-context'
	| 'relative-agreement'
	| 'unverified-relative-return';

export type RelationReason = Omit<ConstraintReason, 'code'> & { code: RelationCode };
export type RelationAssessment = {
	allowed: boolean;
	reasons: readonly RelationReason[];
	explanation: string;
};

/** Whitelist is EXAMPLE-SPECIFIC; no claim that unlisted Arabic phrases are wrong. */
export type CuratedPair = {
	headId: string;
	headText: string;
	dependentId: string;
	dependentText: string;
};

function decision(reasons: RelationReason[], explanation: string): RelationAssessment {
	return { allowed: reasons.length === 0, reasons, explanation };
}

function requireNominal(word: RelationWord, irab: IrabCase): RelationReason[] {
	const result = evaluateSlotCandidate(
		{
			expectedClass: 'noun',
			required: { case: irab, number: 'singular' },
			explanation: 'Contoh isim dengan i‘rab eksplisit.'
		},
		word
	);
	return [...result.reasons];
}

function matchingPair(
	pairs: readonly CuratedPair[],
	head: RelationWord,
	dependent: RelationWord
): boolean {
	return pairs.some(
		(pair) =>
			pair.headId === head.id &&
			pair.headText === head.text &&
			pair.dependentId === dependent.id &&
			pair.dependentText === dependent.text
	);
}

/**
 * Construct-state markers are FRAME METADATA, not inferred from diacritics.
 * Scope: ordinary singular iḍāfah, not dual nouns, names, or all exceptions.
 *
 * The first noun's case is supplied by its role in the larger sentence. The
 * second noun is jarr, even when a preposition makes the first noun jarr too.
 */
export function evaluateIdafa(input: {
	head: RelationWord;
	dependent: RelationWord;
	headCase: IrabCase;
	construct: 'construct' | 'free' | 'unknown';
	headHasArticle?: boolean;
	headHasTanwin?: boolean;
	allowedPairs: readonly CuratedPair[];
}): RelationAssessment {
	const reasons = [
		...requireNominal(input.head, input.headCase),
		...requireNominal(input.dependent, 'jarr')
	];
	if (input.dependent.features.definiteness === undefined) {
		reasons.push({
			code: 'missing-relation-metadata',
			message: 'Ma‘rifah/nakirah muḍāf ilaih belum dicatat; status frasa belum dapat diperiksa.'
		});
	}
	if (
		input.construct !== 'construct' ||
		input.headHasArticle === undefined ||
		input.headHasTanwin === undefined
	) {
		reasons.push({
			code: 'missing-relation-metadata',
			message: 'Status muḍāf dan keberadaan al-/tanwin perlu dicatat eksplisit.'
		});
	} else if (input.headHasArticle || input.headHasTanwin) {
		reasons.push({
			code: 'invalid-construct-state',
			message: 'Muḍāf biasa pada bingkai ini tidak ber-ال dan tidak bertanwin.'
		});
	}
	if (!matchingPair(input.allowedPairs, input.head, input.dependent)) {
		reasons.push({
			code: 'uncurated-relation',
			message:
				'Pasangan muḍāf–muḍāf ilaih belum dikurasi untuk contoh ini, bukan berarti selalu salah.'
		});
	}
	return decision(
		reasons,
		'Muḍāf mengikuti kasus dari posisi frasa; muḍāf ilaih selalu jarr di bingkai ini, tanpa menyimpulkan kepemilikan pada setiap iḍāfah.'
	);
}

export type PrepositionWord = SlotCandidate & { text: string };
/** Only cited, individually checked ḥarf jarr frames; no automatic prefixes. */
export function evaluatePrepositionalPhrase(input: {
	preposition: PrepositionWord;
	complement: RelationWord;
	allowedPairs: readonly { particle: string; complementId: string; complementText: string }[];
}): RelationAssessment {
	const reasons: RelationReason[] = [
		...evaluateSlotCandidate(
			{ expectedClass: 'particle', required: {}, explanation: 'Huruf jar yang tercatat.' },
			input.preposition
		).reasons,
		...requireNominal(input.complement, 'jarr')
	];

	if (!['فِي', 'عَلَى'].includes(input.preposition.text)) {
		reasons.push({
			code: 'unsupported-particle',
			message:
				'Huruf jar ini belum dipetakan dalam pilot; tidak akan disisipkan atau digabung otomatis.'
		});
	}
	if (
		!input.allowedPairs.some(
			(item) =>
				item.particle === input.preposition.text &&
				item.complementId === input.complement.id &&
				item.complementText === input.complement.text
		)
	) {
		reasons.push({
			code: 'uncurated-relation',
			message: 'Pasangan huruf jar dan bentuk isim ini belum dikurasi untuk contoh.'
		});
	}
	return decision(
		reasons,
		'Huruf jar membuat isim berikutnya majrūr; dalam iḍāfah setelahnya, muḍāf ilaih juga majrūr karena hubungan yang berbeda.'
	);
}

export type AttestedPossessive = {
	surface: string;
	meaning: string;
	suffix: string;
	sourceUrls: readonly string[];
	reviewStatus: typeof attachedPronouns.reviewStatus;
};

/**
 * The existing table attests EXACT whole orthographic words on كِتَاب only.
 * In particular, adding ـي to arbitrary nouns or extracting ـهُ from a verb
 * such as قَرَأْتُهُ is outside this contract.
 */
export function resolveAttachedPossessive(input: {
	hostId: string;
	suffixId: string;
	surface: string;
	/** The table lacks syntactic case metadata. A requested case is blocked. */
	requiredCase?: IrabCase;
}): { assessment: RelationAssessment; value?: AttestedPossessive } {
	const reasons: RelationReason[] = [];
	if (input.hostId !== 'msa-kitab') {
		reasons.push({
			code: 'unattested-clitic',
			message:
				'Akhiran ini baru dicatat sebagai bentuk utuh pada كِتَاب; jangan disambung ke lema lain.'
		});
	}
	const row = attachedPronouns.rows.find((item) => item.id === input.suffixId);
	const matched = Boolean(
		row &&
		row.cells.example === input.surface &&
		row.cells.arabic?.trim() &&
		attachedPronouns.sources.length &&
		attachedPronouns.sources.every((url) => url.startsWith('https://'))
	);
	if (!matched) {
		reasons.push({
			code: 'unattested-clitic',
			message: 'Bentuk kata beserta dhamir sambung belum tercantum persis dalam tabel sumber.'
		});
	}
	if (input.requiredCase) {
		reasons.push({
			code: 'unsupported-clitic-context',
			message:
				'Tabel dhamir sambung belum memberi metadata i‘rab untuk bentuk ini; tidak boleh ditebak.'
		});
	}
	const assessment = decision(
		reasons,
		'Bentuk utuh diambil dari contoh pada tabel kata ganti sambung; harakat host tidak dibuat lewat penyambungan teks.'
	);
	if (!assessment.allowed || !row) return { assessment };
	return {
		assessment,
		value: {
			surface: input.surface,
			meaning: row.cells.meaning!,
			suffix: row.cells.arabic!,
			sourceUrls: attachedPronouns.sources,
			reviewStatus: attachedPronouns.reviewStatus
		}
	};
}

/**
 * For D-04b the only permitted relative clauses are the WHOLE curated G-05
 * examples. This blocks a dangerous substitution of al-ladhī/al-latī without
 * updating the predicate, concealed subject, or returning object pronoun.
 */
export function evaluateRelativeClause(input: {
	exampleId: string;
	antecedent: RelationWord;
	relative: RelationWord;
	silaTokens: readonly string[];
	returnLink: 'implicit-subject' | 'explicit-object-suffix' | 'unknown';
}): RelationAssessment {
	const reasons: RelationReason[] = [
		...evaluateSlotCandidate(
			{
				expectedClass: 'noun',
				required: { case: 'raf', number: 'singular', definiteness: 'definite' },
				explanation: 'Mubtada ma‘rifah pada contoh relatif G-05.'
			},
			input.antecedent
		).reasons,
		...evaluateSlotCandidate(
			{
				expectedClass: 'noun',
				required: {
					number: 'singular',
					definiteness: 'definite',
					...(input.antecedent.features.gender ? { gender: input.antecedent.features.gender } : {})
				},
				explanation: 'Isim mawṣūl mengikuti gender dan jumlah pada contoh ini.'
			},
			input.relative
		).reasons
	];
	if (!input.antecedent.features.gender) {
		reasons.push({
			code: 'relative-agreement',
			message: 'Gender isim yang diterangkan belum diketahui; isim mawṣūl tidak bisa dipilih.'
		});
	}

	const rule = clauseRules.find((item) => item.id === 'relative-clauses');
	const example = rule?.examples.find((item) => item.id === input.exampleId);
	const main = example?.spans.find((span) => span.id === 'topic')?.tokens[0]?.arabic;
	const connector = example?.spans.find((span) => span.id === 'relative')?.tokens[0]?.arabic;
	const sila = example?.spans
		.find((span) => span.id === 'sila')
		?.tokens.map((token) => token.arabic);
	const expectedReturn =
		input.exampleId === 'relative-object-return' ? 'explicit-object-suffix' : 'implicit-subject';
	if (
		!rule?.sources.length ||
		!example ||
		!['relative-male', 'relative-female', 'relative-object-return'].includes(input.exampleId) ||
		main !== input.antecedent.text ||
		connector !== input.relative.text ||
		!sila ||
		sila.length !== input.silaTokens.length ||
		sila.some((token, index) => token !== input.silaTokens[index])
	) {
		reasons.push({
			code: 'uncurated-relation',
			message: 'Rangkaian isim mawṣūl dan ṣilah ini belum tercantum sebagai contoh utuh G-05.'
		});
	}
	if (input.returnLink !== expectedReturn) {
		reasons.push({
			code: 'unverified-relative-return',
			message:
				'Hubungan subjek tersirat atau dhamir ‘ā’id yang kembali ke isim utama belum dibuktikan.'
		});
	}
	return decision(
		reasons,
		'Isim mawṣūl dan ṣilah diperiksa sebagai satu hubungan utuh; dhamir ـهُ pada قَرَأْتُهُ adalah bagian dari token, bukan kata terpisah.'
	);
}
