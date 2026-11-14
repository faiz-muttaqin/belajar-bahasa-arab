import { describe, expect, it } from 'vitest';
import {
	CLAUSE_SPAN_LABELS,
	clauseRules,
	validateClauseRules,
	type ClauseRule
} from './clause-rules.js';

describe('G-05: connected clauses and syntax', () => {
	it('covers six grouped topics with 16 sourced examples in draft status', () => {
		expect(clauseRules.map((rule) => rule.id)).toEqual([
			'coordination',
			'relative-clauses',
			'conditions',
			'reasons',
			'contrast',
			'adjuncts'
		]);
		expect(clauseRules.map((rule) => rule.examples.length)).toEqual([3, 3, 3, 2, 2, 3]);
		expect(clauseRules.every((rule) => rule.reviewStatus === 'draft')).toBe(true);
		expect(validateClauseRules(clauseRules)).toEqual([]);
	});

	it('has labelled clause spans, glossed tokens and case/mood annotations that do not collide', () => {
		for (const rule of clauseRules) {
			expect(rule.sources.length).toBeGreaterThan(0);
			for (const example of rule.examples) {
				expect(example.translation).not.toBe('');
				expect(example.explanation).not.toBe('');
				for (const span of example.spans) {
					expect(CLAUSE_SPAN_LABELS[span.kind]).toBeTruthy();
					expect(span.note).not.toBe('');
					for (const token of span.tokens) {
						expect(token.arabic).toMatch(/[\u0621-\u064a]/);
						expect(token.gloss).not.toBe('');
						expect(token.role).not.toBe('');
						expect(Boolean(token.irab && token.mood)).toBe(false);
						if (token.irab || token.mood) expect(token.marker).toBeTruthy();
					}
				}
			}
		}
	});

	it('keeps Arabic attached conjunctions as complete orthographic words', () => {
		const rule = clauseRules.find((item) => item.id === 'coordination')!;
		const first = rule.examples.find((item) => item.id === 'and-two-actions')!;
		expect(first.spans.find((span) => span.kind === 'link')!.tokens[0]!.arabic).toBe('وَكَتَبَ');
		const subjects = rule.examples.find((item) => item.id === 'coordinated-subjects')!;
		expect(subjects.spans.find((span) => span.kind === 'link')!.tokens[0]!.arabic).toBe('وَالطَّالِبُ');
		expect(subjects.spans.find((span) => span.kind === 'link')!.tokens[0]!.irab).toBe('raf');
	});

	it('distinguishes antecedent, relative pronoun, sila and main predicate', () => {
		const relative = clauseRules.find((item) => item.id === 'relative-clauses')!;
		const ex = relative.examples.find((item) => item.id === 'relative-object-return')!;
		expect(ex.spans.map((span) => span.kind)).toEqual(['main', 'link', 'relative', 'main']);
		expect(ex.spans[1]!.tokens[0]!.arabic).toBe('الَّذِي');
		expect(ex.spans[2]!.tokens[0]!.arabic).toBe('قَرَأْتُهُ');
		expect(ex.explanation).toContain('‘ā’id');
	});

	it('requires jussive on both condition and simple verbal result, but not nominal answer', () => {
		const condition = clauseRules.find((item) => item.id === 'conditions')!;
		const simple = condition.examples.find((item) => item.id === 'if-study')!;
		expect(simple.spans.filter((span) => ['condition', 'result'].includes(span.kind))
			.flatMap((span) => span.tokens.map((token) => token.mood))).toEqual(['jussive', 'jussive']);
		const nominal = condition.examples.find((item) => item.id === 'if-nominal-result')!;
		expect(nominal.spans.at(-1)!.tokens[0]!.arabic).toBe('فَأَنْتَ');
		expect(nominal.spans.at(-1)!.tokens[1]!.irab).toBe('raf');
	});

	it('distinguishes li-anna nominal cause from bi-sabab genitive phrase', () => {
		const reason = clauseRules.find((item) => item.id === 'reasons')!;
		const nominal = reason.examples.find((item) => item.id === 'because-sentence')!;
		expect(nominal.spans.at(-1)!.tokens.map((t) => t.irab)).toEqual(['nasb', 'raf']);
		const prepositional = reason.examples.find((item) => item.id === 'because-of-noun')!;
		expect(prepositional.spans.at(-1)!.tokens.map((t) => t.irab)).toEqual(['jarr', 'jarr']);
	});

	it('retains different functions for hal, tamyiz and complete affirmative exception', () => {
		const extra = clauseRules.find((item) => item.id === 'adjuncts')!;
		expect(extra.examples.map((ex) => ex.spans.at(-1)!.kind)).toEqual([
			'circumstance',
			'exception',
			'specification'
		]);
		expect(extra.examples.map((ex) => ex.spans.at(-1)!.tokens.at(-1)!.irab))
			.toEqual(['nasb', 'nasb', 'nasb']);
	});

	it('rejects missing glosses, duplicate spans, and mixed noun case with verb mood', () => {
		const rule = clauseRules[0]!;
		const base = rule.examples[0]!;
		const first = base.spans[0]!;
		const broken: ClauseRule = {
			...rule,
			examples: [{
				...base,
				spans: [
					{ ...first, tokens: [{ ...first.tokens[0]!, gloss: '', irab: 'raf', mood: 'jussive' }] },
					{ ...first }
				]
			}]
		};
		expect(validateClauseRules([broken])).toContain('Incomplete token: coordination/and-two-actions/first');
		expect(validateClauseRules([broken])).toContain('Case/mood collision: coordination/and-two-actions/first');
		expect(validateClauseRules([broken])).toContain('Duplicate span: coordination/and-two-actions/first');
	});
});
