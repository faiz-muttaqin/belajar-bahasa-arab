import { describe, expect, it } from 'vitest';
import {
	evaluateAdjectiveAgreement,
	evaluateSlotCandidate,
	type SlotCandidate,
	type SlotContract
} from './grammar-constraints.js';

const evidence: SlotCandidate['evidence'] = {
	kind: 'curated-example',
	reviewStatus: 'draft',
	sourceUrls: ['https://madinaharabic.com/free-content/grammar'],
	note: 'Bentuk contoh belum ditashih pengajar.'
};

const nominative: SlotCandidate = {
	id: 'msa-kitab',
	wordClass: 'noun',
	features: { gender: 'masculine', number: 'singular', case: 'raf', definiteness: 'definite' },
	evidence
};

const subject: SlotContract = {
	expectedClass: 'noun',
	required: { number: 'singular', case: 'raf', definiteness: 'definite' },
	explanation: 'Contoh mubtada berstatus marfū‘.'
};

describe('D-04a fail-closed replacement constraints', () => {
	it('accepts an explicitly sourced teaching form and keeps review status draft', () => {
		const result = evaluateSlotCandidate(subject, nominative);
		expect(result.allowed).toBe(true);
		expect(result.reasons).toEqual([]);
		expect(result.allowedExplanation).toContain('mubtada');
		expect(nominative.evidence.reviewStatus).toBe('draft');
	});

	it('does not assume a dictionary headword can be inserted as an inflected surface', () => {
		const result = evaluateSlotCandidate(subject, {
			...nominative,
			evidence: { ...evidence, kind: 'dictionary-lemma' }
		});
		expect(result.allowed).toBe(false);
		expect(result.reasons.map((reason) => reason.code)).toContain('unverified-surface');
	});

	it('rejects missing morphology rather than guessing from the Arabic ending', () => {
		const result = evaluateSlotCandidate(subject, {
			...nominative,
			features: { gender: 'masculine' }
		});
		expect(result.allowed).toBe(false);
		expect(result.reasons.filter((reason) => reason.code === 'missing-feature')).toHaveLength(3);
		expect(result.reasons[0]!.message).toContain('Belum ada data');
	});

	it('checks part of speech, noun case, definiteness and number independently', () => {
		const result = evaluateSlotCandidate(subject, {
			...nominative,
			wordClass: 'adjective',
			features: { ...nominative.features, case: 'nasb', definiteness: 'indefinite', number: 'dual' }
		});
		expect(result.allowed).toBe(false);
		expect(result.reasons.filter((reason) => reason.code === 'word-class')).toHaveLength(1);
		expect(result.reasons.filter((reason) => reason.code === 'feature-mismatch')).toHaveLength(3);
	});

	it('distinguishes verb mood from nominal case and enforces actor agreement', () => {
		const contract: SlotContract = {
			expectedClass: 'verb',
			required: {
				aspect: 'imperfect',
				mood: 'jussive',
				voice: 'active',
				person: 3,
				gender: 'masculine',
				number: 'singular'
			},
			explanation: 'Contoh lam + muḍāri‘ majzūm.'
		};
		const verb: SlotCandidate = {
			id: 'fiil-kataba',
			wordClass: 'verb',
			features: {
				aspect: 'imperfect',
				mood: 'indicative',
				voice: 'active',
				person: 3,
				gender: 'masculine',
				number: 'singular'
			},
			evidence
		};
		expect(evaluateSlotCandidate(contract, verb).reasons.map((x) => x.code)).toContain(
			'feature-mismatch'
		);
		expect(
			evaluateSlotCandidate(contract, { ...verb, features: { ...verb.features, mood: 'jussive' } })
				.allowed
		).toBe(true);
		expect(
			evaluateSlotCandidate(contract, {
				...verb,
				features: { ...verb.features, mood: 'jussive', person: 2 }
			}).allowed
		).toBe(false);
	});

	it('rejects unsourced candidate and invalid evidence URL', () => {
		for (const sourceUrls of [[], ['http://unsafe.invalid']]) {
			const result = evaluateSlotCandidate(subject, {
				...nominative,
				evidence: { ...evidence, sourceUrls }
			});
			expect(result.reasons.map((reason) => reason.code)).toContain('unverified-surface');
		}
	});

	it('reports uncurated collocation as missing evidence, not a universal Arabic error', () => {
		const contract: SlotContract = {
			expectedClass: 'noun',
			required: { case: 'nasb', number: 'singular' },
			requiresCollocation: true,
			allowedLexemeIds: ['msa-kitab'],
			explanation: 'Objek terkurasi.'
		};
		const other: SlotCandidate = {
			...nominative,
			id: 'msa-risalah',
			features: { ...nominative.features, case: 'nasb' }
		};
		const excluded = evaluateSlotCandidate(contract, other);
		expect(excluded.allowed).toBe(false);
		expect(excluded.reasons[0]!.code).toBe('unlisted-collocation');
		expect(excluded.reasons[0]!.message).toContain('tidak berarti');
		expect(evaluateSlotCandidate(contract, { ...other, id: 'msa-kitab' }).allowed).toBe(true);
		expect(
			evaluateSlotCandidate({ ...contract, allowedLexemeIds: [] }, other).reasons[0]!.code
		).toBe('unverified-collocation');
	});

	it('requires agreement in na‘at, including definiteness and inherited noun case', () => {
		const head = {
			gender: 'masculine' as const,
			number: 'singular' as const,
			case: 'jarr' as const,
			definiteness: 'definite' as const
		};
		const adjective = { ...head };
		expect(evaluateAdjectiveAgreement({ head, adjective, relation: 'attributive' }).allowed).toBe(
			true
		);
		expect(
			evaluateAdjectiveAgreement({
				head,
				adjective: { ...adjective, case: 'raf', definiteness: 'indefinite' },
				relation: 'attributive'
			}).reasons.filter((r) => r.code === 'feature-mismatch')
		).toHaveLength(2);
	});

	it('does not force a definite nominal subject and its indefinite predicate to match definiteness', () => {
		const head = nominative.features;
		const predicate = {
			gender: 'masculine' as const,
			number: 'singular' as const,
			case: 'raf' as const,
			definiteness: 'indefinite' as const
		};
		expect(
			evaluateAdjectiveAgreement({ head, adjective: predicate, relation: 'nominal-predicate' })
				.allowed
		).toBe(true);
		expect(
			evaluateAdjectiveAgreement({
				head,
				adjective: { ...predicate, gender: 'feminine' },
				relation: 'nominal-predicate'
			}).allowed
		).toBe(false);
	});

	it('checks non-human plural feminine singular only with explicit animacy and blocks unknown', () => {
		const head = {
			gender: 'masculine' as const,
			number: 'plural' as const,
			case: 'raf' as const,
			definiteness: 'definite' as const
		};
		const adjective = {
			gender: 'feminine' as const,
			number: 'singular' as const,
			case: 'raf' as const,
			definiteness: 'definite' as const
		};
		expect(
			evaluateAdjectiveAgreement({
				head,
				adjective,
				relation: 'attributive',
				pluralAnimacy: 'nonhuman'
			}).allowed
		).toBe(true);
		const unknown = evaluateAdjectiveAgreement({ head, adjective, relation: 'attributive' });
		expect(unknown.allowed).toBe(false);
		expect(unknown.reasons.some((reason) => reason.code === 'unverified-plural-agreement')).toBe(
			true
		);
		expect(
			evaluateAdjectiveAgreement({
				head,
				adjective,
				relation: 'attributive',
				pluralAnimacy: 'human'
			}).allowed
		).toBe(false);
	});

	it('cannot claim agreement when the head noun itself lacks morphology', () => {
		expect(
			evaluateAdjectiveAgreement({
				head: { number: 'singular' },
				adjective: nominative.features,
				relation: 'attributive'
			}).reasons.some((reason) => reason.code === 'missing-feature')
		).toBe(true);
	});
});
