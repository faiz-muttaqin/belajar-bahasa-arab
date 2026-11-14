import { describe, expect, it } from 'vitest';
import {
	SENTENCE_ROLE_LABELS,
	VERB_MOOD_LABELS,
	sentenceRules,
	validateSentenceRules,
	type SentenceRule
} from './sentence-rules.js';

describe('G-04: complete Arabic sentences', () => {
	it('covers six scoped topics with 18 sourced and vocalized examples', () => {
		expect(sentenceRules.map((rule) => rule.id)).toEqual([
			'nominal', 'verbal', 'passive', 'negation', 'nawasikh', 'questions'
		]);
		expect(sentenceRules.map((rule) => rule.examples.length)).toEqual([3, 2, 4, 4, 3, 2]);
		expect(sentenceRules.every((rule) => rule.reviewStatus === 'draft')).toBe(true);
		expect(validateSentenceRules(sentenceRules)).toEqual([]);
	});

	it('all tokens have Arabic script, a gloss below, and a legible grammatical function', () => {
		for (const rule of sentenceRules) {
			for (const example of rule.examples) {
				expect(example.translation.length).toBeGreaterThan(3);
				for (const token of example.tokens) {
					expect(token.arabic).toMatch(/[\u0621-\u064a]/);
					expect(token.gloss).not.toBe('');
					expect(SENTENCE_ROLE_LABELS[token.role]).toBeTruthy();
					expect(token.detail).not.toBe('');
				}
			}
		}
	});

	it('does not confuse the noun case with present-tense verb mood', () => {
		for (const rule of sentenceRules) {
			for (const example of rule.examples) {
				for (const token of example.tokens) {
					if (token.irab) expect(token.mood).toBeUndefined();
					if (token.mood) expect(token.irab).toBeUndefined();
				}
			}
		}
		expect(VERB_MOOD_LABELS.jussive).toContain('jazm');
	});

	it('keeps the passive deputy in raf, unlike the active direct object', () => {
		const rule = sentenceRules.find((rule) => rule.id === 'passive')!;
		const activeObject = rule.examples.find((ex) => ex.id === 'active-writing')!.tokens.at(-1)!;
		const passiveDeputy = rule.examples.find((ex) => ex.id === 'passive-writing')!.tokens.at(-1)!;
		expect(activeObject.arabic).toBe('الدَّرْسَ');
		expect(activeObject.irab).toBe('nasb');
		expect(passiveDeputy.arabic).toBe('الدَّرْسُ');
		expect(passiveDeputy.role).toBe('deputy');
		expect(passiveDeputy.irab).toBe('raf');
	});

	it('distinguishes la/lam/lan and their different muḍāri‘ endings', () => {
		const rule = sentenceRules.find((rule) => rule.id === 'negation')!;
		const forms = rule.examples.map((ex) => ex.tokens.find((token) => token.role === 'verb')!);
		expect(forms.map((token) => token.arabic)).toEqual([
			'يَكْتُبُ', 'يَكْتُبُ', 'يَكْتُبْ', 'يَكْتُبَ'
		]);
		expect(forms.map((token) => token.mood)).toEqual([
			'indicative', 'indicative', 'jussive', 'subjunctive'
		]);
	});

	it('distinguishes inna ism in nasb versus kana khabar in nasb', () => {
		const rule = sentenceRules.find((rule) => rule.id === 'nawasikh')!;
		const inna = rule.examples.find((ex) => ex.id === 'nawasikh-inna')!;
		const kana = rule.examples.find((ex) => ex.id === 'nawasikh-kana')!;
		expect(inna.tokens[1]!.irab).toBe('nasb');
		expect(inna.tokens[2]!.irab).toBe('raf');
		expect(kana.tokens[1]!.irab).toBe('raf');
		expect(kana.tokens[2]!.irab).toBe('nasb');
	});

	it('rejects case/mood collisions and tokens lacking glosses', () => {
		const first = sentenceRules[0]!;
		const bad: SentenceRule = {
			...first,
			examples: [
				{
					...first.examples[0]!,
					tokens: [
						{ ...first.examples[0]!.tokens[0]!, gloss: '', mood: 'jussive' }
					]
				}
			]
		};
		expect(validateSentenceRules([bad])).toContain('Incomplete token: nominal/nominal-simple');
		expect(validateSentenceRules([bad])).toContain(
			'Mixed noun case and verb mood: nominal/nominal-simple'
		);
	});
});
