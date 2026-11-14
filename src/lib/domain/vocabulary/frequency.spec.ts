import { describe, expect, it } from 'vitest';
import { quranVocabulary } from '#lib/content/quran-vocabulary.js';
import { quranFrequencies, verifiedQuranFrequencyCount } from '#lib/content/quran-frequency.js';
import { sortQuranVocabulary, verifiedFrequencyCount } from './frequency.js';
import { validateVocab } from './types.js';

describe('Qur’anic word frequency', () => {
	it('covers only existing curated words and preserves the 3 additional sourced lemmas', () => {
		const slugs = new Set(quranVocabulary.map((item) => item.id.replace(/^quran-/, '')));
		expect(quranVocabulary).toHaveLength(98);
		expect(verifiedQuranFrequencyCount()).toBe(85);
		expect(verifiedFrequencyCount(quranVocabulary)).toBe(85);
		expect(Object.keys(quranFrequencies).every((slug) => slugs.has(slug))).toBe(true);
		for (const id of ['quran-kull', 'quran-ghayr', 'quran-sabil']) {
			expect(quranVocabulary.find((item) => item.id === id)?.quranOccurrence).toBeDefined();
		}
	});

	it('ranks descending by verified lemma/verb frequency, not alphabetically', () => {
		const sorted = sortQuranVocabulary(quranVocabulary);
		expect(sorted.slice(0, 4).map((item) => item.id)).toEqual([
			'quran-min',
			'quran-allah',
			'quran-fi',
			'quran-inna'
		]);
		expect(sorted.at(-1)?.quranFrequency).toBeUndefined();
		expect(sorted.filter((item) => item.quranFrequency).at(-1)?.quranFrequency?.occurrences).toBe(15);
	});

	it('keeps unknown counts last even in reverse order', () => {
		const reversed = sortQuranVocabulary(quranVocabulary, 'rare');
		expect(reversed[0]?.quranFrequency?.occurrences).toBe(15);
		expect(reversed.at(-1)?.quranFrequency).toBeUndefined();
	});

	it('distinguishes identical orthography with different grammatical functions', () => {
		const negative = quranVocabulary.find((word) => word.id === 'quran-la-nafy');
		const prohibition = quranVocabulary.find((word) => word.id === 'quran-la-nahy');
		expect(negative?.arabic).toBe(prohibition?.arabic);
		expect(negative?.quranFrequency?.occurrences).toBe(1364);
		expect(prohibition?.quranFrequency?.occurrences).toBe(327);
		expect(quranVocabulary.find((word) => word.id === 'quran-alladhina')?.quranFrequency).toBeUndefined();
	});

	it('validates positive count and a linked corpus source', () => {
		const base = quranVocabulary.find((word) => word.id === 'quran-kull')!;
		expect(validateVocab(base)).toEqual([]);
		expect(validateVocab({
			...base,
			quranFrequency: { ...base.quranFrequency!, occurrences: -1 }
		}).map((issue) => issue.message)).toContain('Quran frequency must be a positive verified integer');
		expect(validateVocab({
			...base,
			quranFrequency: { ...base.quranFrequency!, source: 'https://example.com' }
		}).map((issue) => issue.message)).toContain('Quran frequency requires a Quranic Arabic Corpus source URL');
	});
});
