import { describe, expect, it } from 'vitest';
import { grammarRules, validateGrammarRules, GRAMMAR_ROLE_LABELS } from './grammar-rules.js';

describe('grammar knowledge map foundation', () => {
	it('has three source-backed constructions with stable unique identifiers', () => {
		expect(grammarRules.map((rule) => rule.id)).toEqual([
			'nat-manut',
			'mubtada-khabar',
			'idafah'
		]);
		expect(validateGrammarRules(grammarRules)).toEqual([]);
	});

	it('keeps every Arabic token joined to a gloss and a visible role name', () => {
		for (const rule of grammarRules) {
			for (const example of rule.examples) {
				expect(example.tokens).toHaveLength(2);
				expect(example.translation).not.toBe('');
				for (const token of example.tokens) {
					expect(token.arabic.trim()).not.toBe('');
					expect(token.gloss.trim()).not.toBe('');
					expect(GRAMMAR_ROLE_LABELS[token.role].length).toBeGreaterThan(2);
				}
			}
			expect(rule.sources.every((source) => source.url.startsWith('https://'))).toBe(true);
		}
	});

	it('rejects examples without a word gloss', () => {
		const bad = [
			{
				...grammarRules[0]!,
				examples: [
					{
						...grammarRules[0]!.examples[0]!,
						tokens: [{ arabic: 'كِتَابٌ', gloss: '', role: 'manut' as const }]
					}
				]
			}
		];
		expect(validateGrammarRules(bad)).toContain('Missing Arabic or gloss: nat-manut/sifat-nakirah');
	});
});
