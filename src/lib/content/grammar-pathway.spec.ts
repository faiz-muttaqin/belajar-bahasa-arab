import { describe, expect, it } from 'vitest';
import {
	grammarStages,
	practiceReading,
	readingQuestions,
	validateGrammarPathway
} from './grammar-pathway.js';

describe('G-06 learning progression and paragraph', () => {
	it('has acyclic links from G-01 through G-06', () => {
		expect(grammarStages.map((stage) => stage.id)).toEqual([
			'g01',
			'g02',
			'g03',
			'g04',
			'g05',
			'g06'
		]);
		expect(validateGrammarPathway()).toEqual([]);
		expect(grammarStages.find((stage) => stage.id === 'g04')?.prerequisites).toEqual([
			'g02',
			'g03'
		]);
	});

	it('offers a short connected reading with token-level Indonesian gloss and roles', () => {
		expect(practiceReading.spans.map((span) => span.kind)).toEqual(['main', 'link', 'result']);
		expect(
			practiceReading.spans.flatMap((span) => span.tokens).map((token) => token.arabic)
		).toEqual(['قَرَأَ', 'الطَّالِبُ', 'الْكِتَابَ', 'ثُمَّ', 'كَتَبَ', 'رِسَالَةً']);
		for (const span of practiceReading.spans) {
			expect(span.note).not.toBe('');
			for (const token of span.tokens) {
				expect(token.gloss).not.toBe('');
				expect(token.role).not.toBe('');
			}
		}
		expect(readingQuestions).toHaveLength(3);
	});
});
