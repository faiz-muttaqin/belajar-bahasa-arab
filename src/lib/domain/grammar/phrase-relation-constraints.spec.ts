import { describe, expect, it } from 'vitest';
import { phraseRules } from '#lib/content/phrase-rules.js';
import { clauseRules } from '#lib/content/clause-rules.js';
import { attachedPronouns } from '#lib/content/reference-isim.js';
import type { MorphFeatures } from './lexeme-forms.js';
import {
	evaluateIdafa,
	evaluatePrepositionalPhrase,
	evaluateRelativeClause,
	resolveAttachedPossessive,
	type CuratedPair,
	type RelationWord
} from './phrase-relation-constraints.js';

const phrases = phraseRules.find((rule) => rule.id === 'idafah-jar')!;
const relative = clauseRules.find((rule) => rule.id === 'relative-clauses')!;
const sample = (id: string) => phrases.examples.find((item) => item.id === id)!;
const relativeSample = (id: string) => relative.examples.find((item) => item.id === id)!;

function sourced(
	id: string,
	text: string,
	features: MorphFeatures,
	sources: readonly string[],
	wordClass: RelationWord['wordClass'] = 'noun'
): RelationWord {
	return {
		id,
		text,
		wordClass,
		features,
		evidence: {
			kind: 'curated-example',
			reviewStatus: 'draft',
			sourceUrls: sources.map((source) => source),
			note: 'Contoh terkurasi dari materi proyek; belum ditashih guru.'
		}
	};
}

const door = sample('idafah-door');
const doorHead = sourced(
	'bab',
	door.tokens[0]!.arabic,
	{
		case: 'raf',
		number: 'singular'
	},
	phrases.sources.map((source) => source.url)
);
const doorDependent = sourced(
	'msa-bayt',
	door.tokens[1]!.arabic,
	{
		case: 'jarr',
		number: 'singular',
		definiteness: 'definite'
	},
	phrases.sources.map((source) => source.url)
);
const idafaDoorPair: CuratedPair[] = [
	{
		headId: 'bab',
		headText: door.tokens[0]!.arabic,
		dependentId: 'msa-bayt',
		dependentText: door.tokens[1]!.arabic
	}
];

const normalIdafa = () => ({
	head: doorHead,
	dependent: doorDependent,
	headCase: 'raf' as const,
	construct: 'construct' as const,
	headHasArticle: false,
	headHasTanwin: false,
	allowedPairs: idafaDoorPair
});

describe('D-04b iḍāfah and jar–majrūr relation constraints', () => {
	it('uses exact G-03 source tokens for a straightforward nominal iḍāfah', () => {
		expect(door.tokens.map((item) => item.arabic)).toEqual(['بَابُ', 'الْبَيْتِ']);
		expect(door.tokens.map((item) => item.irab)).toEqual(['raf', 'jarr']);
		expect(phrases.reviewStatus).toBe('draft');
		const checked = evaluateIdafa(normalIdafa());
		expect(checked.allowed).toBe(true);
		expect(checked.explanation).toContain('muḍāf ilaih');
	});

	it('recognizes preposition + iḍāfah as two separate reasons for jarr', () => {
		const example = sample('preposition-idafah');
		expect(example.tokens.map((item) => item.arabic)).toEqual(['فِي', 'كِتَابِ', 'الطَّالِبِ']);
		const head = sourced(
			'msa-kitab',
			example.tokens[1]!.arabic,
			{
				case: 'jarr',
				number: 'singular'
			},
			phrases.sources.map((source) => source.url)
		);
		const dependent = sourced(
			'msa-talib',
			example.tokens[2]!.arabic,
			{
				case: 'jarr',
				number: 'singular',
				definiteness: 'definite'
			},
			phrases.sources.map((source) => source.url)
		);
		expect(
			evaluateIdafa({
				head,
				dependent,
				headCase: 'jarr',
				construct: 'construct',
				headHasArticle: false,
				headHasTanwin: false,
				allowedPairs: [
					{
						headId: 'msa-kitab',
						headText: 'كِتَابِ',
						dependentId: 'msa-talib',
						dependentText: 'الطَّالِبِ'
					}
				]
			}).allowed
		).toBe(true);
		const particle = sourced(
			'fi',
			example.tokens[0]!.arabic,
			{},
			phrases.sources.map((s) => s.url),
			'particle'
		);
		expect(
			evaluatePrepositionalPhrase({
				preposition: particle,
				complement: head,
				allowedPairs: [{ particle: 'فِي', complementId: 'msa-kitab', complementText: 'كِتَابِ' }]
			}).allowed
		).toBe(true);
	});

	it('rejects nominal surface that only has a dictionary lemma rather than curated syntax', () => {
		const denied = evaluateIdafa({
			...normalIdafa(),
			head: { ...doorHead, evidence: { ...doorHead.evidence, kind: 'dictionary-lemma' } }
		});
		expect(denied.allowed).toBe(false);
		expect(denied.reasons.map((r) => r.code)).toContain('unverified-surface');
	});

	it('does not infer construct status, article, tanwin or dependent definiteness', () => {
		const unknown = evaluateIdafa({
			...normalIdafa(),
			construct: 'unknown',
			headHasArticle: undefined,
			dependent: {
				...doorDependent,
				features: { case: 'jarr', number: 'singular' }
			}
		});
		expect(unknown.allowed).toBe(false);
		expect(unknown.reasons.filter((r) => r.code === 'missing-relation-metadata')).toHaveLength(2);
	});

	it('rejects tanwin/article on ordinary mudaf even with the right lexical pair', () => {
		expect(
			evaluateIdafa({ ...normalIdafa(), headHasTanwin: true }).reasons.map((r) => r.code)
		).toContain('invalid-construct-state');
		expect(
			evaluateIdafa({ ...normalIdafa(), headHasArticle: true }).reasons.map((r) => r.code)
		).toContain('invalid-construct-state');
	});

	it('rejects dependent in nasb and does not confuse case of head with the dependent', () => {
		const invalid = evaluateIdafa({
			...normalIdafa(),
			dependent: { ...doorDependent, features: { ...doorDependent.features, case: 'nasb' } }
		});
		expect(invalid.reasons.map((r) => r.code)).toContain('feature-mismatch');
		const wrongHead = evaluateIdafa({ ...normalIdafa(), headCase: 'jarr' });
		expect(wrongHead.allowed).toBe(false);
	});

	it('does not treat a different idafa pairing as invalid Arabic universally', () => {
		const result = evaluateIdafa({ ...normalIdafa(), allowedPairs: [] });
		expect(result.allowed).toBe(false);
		expect(result.reasons.find((r) => r.code === 'uncurated-relation')?.message).toContain(
			'bukan berarti selalu salah'
		);
	});

	it('checks a preposition candidate with exact sourced complement and no generated case', () => {
		const example = sample('preposition-house');
		expect(example.tokens.map((item) => item.arabic)).toEqual(['فِي', 'الْبَيْتِ']);
		const particle = sourced(
			'fi',
			'فِي',
			{},
			phrases.sources.map((s) => s.url),
			'particle'
		);
		const complement = sourced(
			'msa-bayt',
			'الْبَيْتِ',
			{
				case: 'jarr',
				number: 'singular',
				definiteness: 'definite'
			},
			phrases.sources.map((s) => s.url)
		);
		const pair = [{ particle: 'فِي', complementId: 'msa-bayt', complementText: 'الْبَيْتِ' }];
		expect(
			evaluatePrepositionalPhrase({ preposition: particle, complement, allowedPairs: pair }).allowed
		).toBe(true);
		expect(
			evaluatePrepositionalPhrase({
				preposition: particle,
				complement: { ...complement, features: { case: 'raf', number: 'singular' } },
				allowedPairs: pair
			}).allowed
		).toBe(false);
		expect(
			evaluatePrepositionalPhrase({
				preposition: { ...particle, text: 'بِ' },
				complement,
				allowedPairs: pair
			}).reasons.map((r) => r.code)
		).toContain('unsupported-particle');
		expect(
			evaluatePrepositionalPhrase({
				preposition: particle,
				complement,
				allowedPairs: []
			}).reasons.map((r) => r.code)
		).toContain('uncurated-relation');
	});
});

describe('D-04b whole-word attached pronoun guard', () => {
	it('uses exact first-party source row, not joining suffix strings', () => {
		const row = attachedPronouns.rows.find((x) => x.id === 'i')!;
		expect(row.cells.example).toBe('كِتَابِي');
		const result = resolveAttachedPossessive({
			hostId: 'msa-kitab',
			suffixId: row.id,
			surface: row.cells.example!
		});
		expect(result.assessment.allowed).toBe(true);
		expect(result.value?.surface).toBe('كِتَابِي');
		expect(result.value?.suffix).toBe('ـي');
		expect(result.value?.reviewStatus).toBe('draft');
		expect(result.value?.sourceUrls.length).toBeGreaterThan(0);
	});

	it('rejects other stems, changed full word, unknown suffix and assumed case', () => {
		const fixture = { hostId: 'msa-kitab', suffixId: 'hu', surface: 'كِتَابُهُ' };
		expect(resolveAttachedPossessive(fixture).assessment.allowed).toBe(true);
		for (const input of [
			{ ...fixture, hostId: 'msa-bayt' },
			{ ...fixture, surface: 'كِتَابِهُ' },
			{ ...fixture, suffixId: 'unknown' },
			{ ...fixture, requiredCase: 'jarr' as const }
		]) {
			expect(resolveAttachedPossessive(input).assessment.allowed).toBe(false);
			expect(resolveAttachedPossessive(input).value).toBeUndefined();
		}
		expect(
			resolveAttachedPossessive({ ...fixture, requiredCase: 'raf' }).assessment.reasons.map(
				(r) => r.code
			)
		).toContain('unsupported-clitic-context');
	});
});

describe('D-04b G-05 relative clause guards', () => {
	function makeRelative(id: string) {
		const example = relativeSample(id);
		const topic = example.spans.find((span) => span.id === 'topic')!.tokens[0]!;
		const connector = example.spans.find((span) => span.id === 'relative')!.tokens[0]!;
		const silaTokens = example.spans
			.find((span) => span.id === 'sila')!
			.tokens.map((x) => x.arabic);
		const gender = id === 'relative-female' ? ('feminine' as const) : ('masculine' as const);
		const sources = relative.sources.map((source) => source.url);
		return {
			exampleId: id,
			antecedent: sourced(
				'topic-' + id,
				topic.arabic,
				{
					case: 'raf',
					number: 'singular',
					gender,
					definiteness: 'definite'
				},
				sources
			),
			relative: sourced(
				'relative-' + id,
				connector.arabic,
				{
					number: 'singular',
					gender,
					definiteness: 'definite'
				},
				sources
			),
			silaTokens,
			returnLink:
				id === 'relative-object-return'
					? ('explicit-object-suffix' as const)
					: ('implicit-subject' as const)
		};
	}

	it('accepts three exact sourced male/female/object-return frames as whole examples', () => {
		expect(relative.reviewStatus).toBe('draft');
		for (const id of ['relative-male', 'relative-female', 'relative-object-return']) {
			const fixture = makeRelative(id);
			const result = evaluateRelativeClause(fixture);
			expect(result.allowed).toBe(true);
			expect(result.explanation).toContain('ṣilah');
		}
		expect(makeRelative('relative-object-return').silaTokens).toEqual(['قَرَأْتُهُ']);
	});

	it('blocks wrong gender, indefinite antecedent and relative mismatch', () => {
		const fixture = makeRelative('relative-female');
		expect(
			evaluateRelativeClause({
				...fixture,
				relative: {
					...fixture.relative,
					features: { ...fixture.relative.features, gender: 'masculine' }
				}
			}).allowed
		).toBe(false);
		expect(
			evaluateRelativeClause({
				...fixture,
				antecedent: {
					...fixture.antecedent,
					features: { ...fixture.antecedent.features, definiteness: 'indefinite' }
				}
			}).allowed
		).toBe(false);
		expect(
			evaluateRelativeClause({
				...fixture,
				relative: { ...fixture.relative, text: 'الَّذِي' }
			}).allowed
		).toBe(false);
	});

	it('refuses unverified ṣilah, untraced return pronoun and split orthographic token', () => {
		const fixture = makeRelative('relative-object-return');
		expect(
			evaluateRelativeClause({ ...fixture, returnLink: 'unknown' }).reasons.map((r) => r.code)
		).toContain('unverified-relative-return');
		expect(evaluateRelativeClause({ ...fixture, silaTokens: ['قَرَأْتُ', 'هُ'] }).allowed).toBe(false);
		expect(
			evaluateRelativeClause({
				...fixture,
				exampleId: 'not-curated'
			}).allowed
		).toBe(false);
	});

	it('does not substitute only the relative pronoun while keeping another clause', () => {
		const male = makeRelative('relative-male');
		const female = makeRelative('relative-female');
		expect(
			evaluateRelativeClause({
				...male,
				relative: female.relative
			}).allowed
		).toBe(false);
	});
});
