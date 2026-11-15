/**
 * D-04a: explicit, explainable compatibility gates for source-linked teaching slots.
 *
 * This is a validator, not a morphological parser or a form generator. A missing
 * feature is NOT treated as compatible. Scope is a single audited teaching frame;
 * unlisted collocations mean "not curated for this example", not "ungrammatical".
 */
import type {
	MorphFeatures,
	SurfaceEvidence,
	WordClass
} from './lexeme-forms.js';

export type ConstraintCode =
	| 'word-class'
	| 'missing-feature'
	| 'feature-mismatch'
	| 'unverified-surface'
	| 'unlisted-collocation'
	| 'unverified-collocation'
	| 'unverified-plural-agreement';

export type ConstraintReason = { code: ConstraintCode; message: string };
export type ConstraintResult = {
	allowed: boolean;
	reasons: readonly ConstraintReason[];
	/** Explanation of this template, NOT a certification of all word meanings. */
	allowedExplanation: string;
};

export type SlotCandidate = {
	id: string;
	wordClass: WordClass;
	features: MorphFeatures;
	evidence: SurfaceEvidence;
};

export type SlotContract = {
	expectedClass: WordClass;
	/** Each feature is explicitly required, never inferred from a lemma or last letter. */
	required: Partial<MorphFeatures>;
	/** A sample collocation whitelist, not a claim about verb transitivity in general. */
	allowedLexemeIds?: readonly string[];
	/** True when the example needs an audited semantic collocation set. */
	requiresCollocation?: boolean;
	explanation: string;
};

const featureLabels: Readonly<Record<keyof MorphFeatures, string>> = {
	gender: 'gender (mudzakkar/muannats)',
	number: 'jumlah (mufrad/mutsanna/jamak)',
	definiteness: 'ma‘rifah/nakirah',
	case: 'i‘rab (rafa‘/nashab/jarr)',
	mood: 'mood fi‘il (rafa‘/jazm/nashab)',
	aspect: 'bentuk waktu fi‘il',
	voice: 'aktif/pasif',
	person: 'dhamir pelaku'
};

function compareFeatures(required: Partial<MorphFeatures>, actual: MorphFeatures): ConstraintReason[] {
	const reasons: ConstraintReason[] = [];
	for (const key of Object.keys(required) as (keyof MorphFeatures)[]) {
		const expected = required[key];
		if (expected === undefined) continue;
		const given = actual[key];
		if (given === undefined) {
			reasons.push({
				code: 'missing-feature',
				message: 'Belum ada data ' + featureLabels[key] + ' untuk bentuk ini.'
			});
		} else if (given !== expected) {
			reasons.push({
				code: 'feature-mismatch',
				message: 'Bentuk ini memiliki ' + featureLabels[key] + ' = ' + given +
					', sedangkan contoh memerlukan ' + expected + '.'
			});
		}
	}
	return reasons;
}

export function evaluateSlotCandidate(contract: SlotContract, candidate: SlotCandidate): ConstraintResult {
	const reasons: ConstraintReason[] = [];
	if (candidate.wordClass !== contract.expectedClass) {
		reasons.push({
			code: 'word-class',
			message: 'Posisi ini memerlukan kelas kata ' + contract.expectedClass +
				', bukan ' + candidate.wordClass + '.'
		});
	}
	if (
		candidate.evidence.kind !== 'curated-example' ||
		!candidate.evidence.sourceUrls.length ||
		candidate.evidence.sourceUrls.some((url) => !url.startsWith('https://'))
	) {
		reasons.push({
			code: 'unverified-surface',
			message: 'Bentuk berharakat untuk posisi kalimat ini belum dikurasi dengan rujukan; lema kamus saja tidak cukup.'
		});
	}
	reasons.push(...compareFeatures(contract.required, candidate.features));
	if (contract.requiresCollocation && !contract.allowedLexemeIds?.length) {
		reasons.push({
			code: 'unverified-collocation',
			message: 'Pasangan fi‘il dan objek untuk contoh ini belum memiliki daftar kecocokan yang dikurasi.'
		});
	} else if (contract.allowedLexemeIds && !contract.allowedLexemeIds.includes(candidate.id)) {
		reasons.push({
			code: 'unlisted-collocation',
			message: 'Pasangan kata ini belum dikurasi untuk contoh tersebut. Ini tidak berarti susunannya selalu salah dalam bahasa Arab.'
		});
	}
	return { allowed: reasons.length === 0, reasons, allowedExplanation: contract.explanation };
}

export type AdjectiveRelation = 'attributive' | 'nominal-predicate';
export type PluralAnimacy = 'human' | 'nonhuman' | 'unknown';

/**
 * Agreement check for one specified syntactic relation. Nominal predicates are
 * usually *indefinite* here, unlike attributive adjectives that match the
 * head noun's definiteness. For non-human plural we only check the documented
 * feminine-singular beginner pattern; uncertain animacy stays blocked.
 */
export function evaluateAdjectiveAgreement(input: {
	head: MorphFeatures;
	adjective: MorphFeatures;
	relation: AdjectiveRelation;
	pluralAnimacy?: PluralAnimacy;
}): ConstraintResult {
	const { head, adjective, relation, pluralAnimacy = 'unknown' } = input;
	const reasons: ConstraintReason[] = [];
	const required: Partial<MorphFeatures> = {};

	if (head.gender === undefined || head.number === undefined) {
		reasons.push({
			code: 'missing-feature',
			message: 'Gender atau jumlah isim utama belum diketahui sehingga kecocokan sifat tidak dapat dipastikan.'
		});
	} else if (head.number === 'plural' && pluralAnimacy === 'unknown') {
		reasons.push({
			code: 'unverified-plural-agreement',
			message: 'Jamak manusia dan bukan manusia dapat memakai pola kecocokan sifat berbeda; jenis jamaknya belum dicatat.'
		});
	} else {
		required.gender = head.number === 'plural' && pluralAnimacy === 'nonhuman'
			? 'feminine' : head.gender;
		required.number = head.number === 'plural' && pluralAnimacy === 'nonhuman'
			? 'singular' : head.number;
	}

	if (relation === 'attributive') {
		if (head.case === undefined || head.definiteness === undefined) {
			reasons.push({
				code: 'missing-feature',
				message: 'Na‘at memerlukan informasi i‘rab serta ma‘rifah/nakirah dari man‘ūt.'
			});
		} else {
			required.case = head.case;
			required.definiteness = head.definiteness;
		}
	} else {
		// A standalone khabar is NOT a na‘at, so it need not copy the
		// definite mubtada's definiteness.
		required.case = 'raf';
		required.definiteness = 'indefinite';
	}
	reasons.push(...compareFeatures(required, adjective));
	return {
		allowed: reasons.length === 0,
		reasons,
		allowedExplanation: relation === 'attributive'
			? 'Sifat mengikuti isim yang diterangkan pada gender, jumlah, i‘rab dan ma‘rifah/nakirah sesuai bingkai contoh.'
			: 'Khabar mengikuti gender dan jumlah subjek; dalam contoh nominal ini khabar tetap nakirah dan marfū‘.'
	};
}
