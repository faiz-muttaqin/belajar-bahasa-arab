import { describe, expect, it } from 'vitest';
import { sharafEntries } from '#lib/content/sharaf.js';
import { normalizeArabicSearch, searchSharaf } from './lexicon.js';

describe('normalizeArabicSearch', () => {
	it('ignores Arabic vowel marks, tatweel and variant alifs for searching', () => {
		expect(normalizeArabicSearch(' كَتَبَ ')).toBe('كتب');
		expect(normalizeArabicSearch('إِلَى')).toBe('الي');
		expect(normalizeArabicSearch('ٱلْكِتَابُ')).toBe('الكتاب');
	});
});

describe('searchSharaf', () => {
	it('finds a verb by madhi, mudhari and its consonantal root', () => {
		for (const query of ['كَتَبَ', 'كتب', 'يكتب']) {
			expect(searchSharaf(sharafEntries, query).some((item) => item.id === 'fiil-kataba')).toBe(
				true
			);
		}
	});

	it('can show multiple words from one root while preserving distinct lexemes', () => {
		const results = searchSharaf(sharafEntries, 'فتح');
		expect(results.some((item) => item.id === 'fiil-fataha')).toBe(true);
		expect(results.some((item) => item.id === 'isim-maftuh')).toBe(true);
	});

	it('filters function words separately from verbs', () => {
		expect(searchSharaf(sharafEntries, 'في', 'particle').map((item) => item.id)).toContain(
			'partikel-fi'
		);
		expect(searchSharaf(sharafEntries, 'في', 'verb')).toEqual([]);
	});

	it('keeps lexical bab determination separate from special-rule conjugation', () => {
		const [qala] = searchSharaf(sharafEntries, 'قال');
		expect(qala?.babSelection).toBe('lexical');
		expect(qala?.formBehavior).toBe('special-rule');
		expect(qala?.root).toBe('قول');
	});

	it('does not claim a missing query is an invalid Arabic word', () => {
		expect(searchSharaf(sharafEntries, 'غيرموجود')).toEqual([]);
	});
});
