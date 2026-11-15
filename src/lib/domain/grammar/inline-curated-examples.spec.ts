import { describe, expect, it } from 'vitest';
import { grammarRules } from '#lib/content/grammar-rules.js';
import { phraseRules } from '#lib/content/phrase-rules.js';
import {
	assessInlineFrame,
	canEditInlineExample,
	curatedInlineFrame,
	resolveInlineGrammarExample,
	resolveInlinePhraseExample,
	searchInlineExampleChoices,
	validateInlineFrameRegistry
} from './inline-curated-examples.js';

describe('D-05a inline edit registry — source and morphology', () => {
	it('passes integrity checks on all original source-linked frames without promoting draft', () => {
		expect(validateInlineFrameRegistry()).toEqual([]);
		const cases = [
			['grammar', 'sifat-nakirah'],
			['grammar', 'khabar-buku'],
			['grammar', 'idafah-buku'],
			['phrase', 'indefinite-book'],
			['phrase', 'indefinite-adjective'],
			['phrase', 'preposition-house']
		] as const;
		for (const [source, exampleId] of cases) {
			const choices = searchInlineExampleChoices(source, exampleId, 0, '');
			expect(choices.length).toBeGreaterThanOrEqual(2);
			expect(choices.every((choice) => choice.allowed)).toBe(true);
			expect(choices.every((choice) => choice.sourceUrls.length > 0)).toBe(true);
		}
		expect(grammarRules[0]!.examples[0]!.tokens[0]!.arabic).toBe('كِتَابٌ');
		expect(phraseRules[1]!.reviewStatus).toBe('draft');
	});

	it('keeps G-01 noun–adjective replacement inside two complete authored frames', () => {
		expect(resolveInlineGrammarExample('sifat-nakirah', 'sifat-nakirah')?.translation)
			.toBe('Sebuah buku baru.');
		const selected = resolveInlineGrammarExample('sifat-nakirah', 'sifat-feminin')!;
		expect(selected.tokens.map((token) => token.arabic)).toEqual(['مَدْرَسَةٌ', 'كَبِيرَةٌ']);
		expect(selected.tokens.map((token) => token.role)).toEqual(['manut', 'nat']);
		expect(selected.translation).toBe('Sebuah sekolah besar.');
		expect(searchInlineExampleChoices('grammar', 'sifat-nakirah', 1, 'besar').map((x) => x.id))
			.toEqual(['sifat-feminin']);
	});

	it('does not treat a khabar as definite attributive adjective', () => {
		const selected = resolveInlineGrammarExample('khabar-buku', 'khabar-sekolah')!;
		expect(selected.tokens.map((t) => t.arabic)).toEqual(['الْمَدْرَسَةُ', 'كَبِيرَةٌ']);
		expect(searchInlineExampleChoices('grammar', 'khabar-buku', 0, '').every(
			(item) => item.explanation.includes('nakirah')
		)).toBe(true);
		const frame = curatedInlineFrame('grammar', 'khabar-buku')!;
		const changed = assessInlineFrame({
			...frame,
			features: [frame.features[0]!, { ...frame.features[1], definiteness: 'definite' }]
		});
		expect(changed.allowed).toBe(false);
		expect(changed.reasons.map((reason) => reason.code)).toContain('feature-mismatch');
	});

	it('changes an idafa as a whole, with a sourced majrur dependent', () => {
		const selected = resolveInlineGrammarExample('idafah-buku', 'idafah-pintu')!;
		expect(selected.tokens.map((t) => t.arabic)).toEqual(['بَابُ', 'الْبَيْتِ']);
		expect(selected.translation).toBe('Pintu rumah itu.');
		expect(searchInlineExampleChoices('grammar', 'idafah-buku', 1, 'rumah').map((x) => x.id))
			.toEqual(['idafah-pintu']);
		const frame = curatedInlineFrame('grammar', 'idafah-pintu')!;
		const wrong = assessInlineFrame({
			...frame, features: [
				frame.features[0]!, { ...frame.features[1], case: 'nasb' }
			]
		});
		expect(wrong.allowed).toBe(false);
		expect(wrong.reasons.map((x) => x.code)).toContain('feature-mismatch');
	});

	it('searches Arabic without harakat and Indonesian text within one local frame family', () => {
		expect(searchInlineExampleChoices('grammar', 'sifat-nakirah', 0, 'مدرسة')
			.map((item) => item.id)).toEqual(['sifat-feminin']);
		expect(searchInlineExampleChoices('grammar', 'sifat-nakirah', 0, 'sekolah')
			.map((item) => item.id)).toEqual(['sifat-feminin']);
		expect(searchInlineExampleChoices('grammar', 'sifat-nakirah', 0, 'xyz')).toEqual([]);
	});

	it('does not permit a variant from another family or an unlisted ID', () => {
		expect(resolveInlineGrammarExample('sifat-nakirah', 'idafah-pintu')).toBeUndefined();
		expect(resolveInlineGrammarExample('khabar-buku', 'sifat-feminin')).toBeUndefined();
		expect(resolveInlineGrammarExample('sifat-nakirah', 'hacked')).toBeUndefined();
		expect(resolveInlinePhraseExample('indefinite-adjective', 'preposition-house'))
			.toBeUndefined();
		expect(canEditInlineExample('grammar', 'nonexistent')).toBe(false);
		expect(canEditInlineExample('phrase', 'case-object')).toBe(false);
	});

	it('rejects stale spellings even if the lexical metadata is unchanged', () => {
		const frame = curatedInlineFrame('grammar', 'sifat-feminin')!;
		const denied = assessInlineFrame({
			...frame, arabic: ['مَدْرَسَةٌ', 'كَبِيرٌ']
		});
		expect(denied.allowed).toBe(false);
		expect(denied.reasons.map((x) => x.code)).toContain('unverified-surface');
	});

	it('rejects incomplete slot metadata instead of inferring gender from the script', () => {
		const frame = curatedInlineFrame('grammar', 'sifat-feminin')!;
		const denied = assessInlineFrame({
			...frame, features: [
				{ ...frame.features[0], gender: undefined },
				frame.features[1]!
			]
		});
		expect(denied.allowed).toBe(false);
		expect(denied.reasons.map((x) => x.code)).toContain('missing-feature');
	});

	it('only approved pilot example IDs gain interactive controls', () => {
		for (const id of ['sifat-nakirah', 'sifat-feminin', 'khabar-buku', 'khabar-sekolah',
			'idafah-buku', 'idafah-pintu']) {
			expect(canEditInlineExample('grammar', id)).toBe(true);
		}
		for (const id of ['case-subject', 'case-object', 'dual-object',
			'preposition-idafah', 'feminine-adjective']) {
			expect(canEditInlineExample('phrase', id)).toBe(
				id === 'preposition-idafah' || id === 'feminine-adjective'
			);
		}
	});
});

describe('D-05a G-03 source-linked phrase and case contracts', () => {
	it('switches explicit definite and indefinite surfaces of the same source lemma', () => {
		const selected = resolveInlinePhraseExample('indefinite-book', 'definite-book')!;
		expect(selected.tokens.map((token) => token.arabic)).toEqual(['الْكِتَابُ']);
		expect(selected.translation).toBe('Buku itu.');
		expect(selected.tokens[0]!.irab).toBe('raf');
		expect(resolveInlinePhraseExample('definite-book', 'indefinite-book')!.tokens[0]!.arabic)
			.toBe('كِتَابٌ');
	});

	it('preserves the grammar distinction between adjective and nominal predicate', () => {
		const adjective = resolveInlinePhraseExample('indefinite-adjective', 'definite-adjective')!;
		expect(adjective.tokens.map((token) => token.arabic))
			.toEqual(['الْكِتَابُ', 'الْجَدِيدُ']);
		expect(adjective.translation).toBe('Buku baru itu.');
		expect(adjective.tokens.every((token) => token.irab === 'raf')).toBe(true);
	});

	it('checks plural non-human agreement with explicitly curated animacy only', () => {
		const plural = resolveInlinePhraseExample('indefinite-adjective', 'nonhuman-plural')!;
		expect(plural.tokens.map((token) => token.arabic)).toEqual(['كُتُبٌ', 'جَدِيدَةٌ']);
		expect(plural.tokens[1]!.role).toContain('feminin tunggal');
		const spec = curatedInlineFrame('phrase', 'nonhuman-plural')!;
		expect(assessInlineFrame({ ...spec, pluralAnimacy: undefined }).reasons.map((x) => x.code))
			.toContain('unverified-plural-agreement');
		const wrong = assessInlineFrame({
			...spec, features: [
				spec.features[0]!, { ...spec.features[1], number: 'plural' }
			]
		});
		expect(wrong.allowed).toBe(false);
	});

	it('changes only a curated prepositional phrase as a whole, including nested idafa', () => {
		const simple = resolveInlinePhraseExample('preposition-idafah', 'preposition-house')!;
		expect(simple.tokens.map((t) => t.arabic)).toEqual(['فِي', 'الْبَيْتِ']);
		const nested = resolveInlinePhraseExample('preposition-house', 'preposition-idafah')!;
		expect(nested.tokens.map((t) => t.arabic)).toEqual(['فِي', 'كِتَابِ', 'الطَّالِبِ']);
		expect(nested.tokens[1]!.irab).toBe('jarr');
		expect(nested.tokens[2]!.irab).toBe('jarr');
		const frame = curatedInlineFrame('phrase', 'preposition-idafah')!;
		const invalid = assessInlineFrame({
			...frame, features: [
				frame.features[0]!, { ...frame.features[1], case: 'raf' }, frame.features[2]!
			]
		});
		expect(invalid.allowed).toBe(false);
		expect(invalid.reasons.map((x) => x.code)).toContain('feature-mismatch');
	});

	it('only lists selectable options that contain the requested token position', () => {
		const first = searchInlineExampleChoices('phrase', 'preposition-idafah', 0, '');
		expect(first.map((item) => item.id)).toEqual(['preposition-house', 'preposition-idafah']);
		const third = searchInlineExampleChoices('phrase', 'preposition-idafah', 2, '');
		expect(third.map((item) => item.id)).toEqual(['preposition-idafah']);
	});
});
