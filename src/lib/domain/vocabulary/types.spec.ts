import { describe, expect, it } from 'vitest';
import { isPublishableVocab, type VocabularyItem } from './types.js';

const base: VocabularyItem = {
	id: 'v1',
	collection: 'harian',
	register: 'msa',
	arabic: 'كتاب',
	meaning: 'x',
	reviewStatus: 'draft',
	sources: []
};

describe('isPublishableVocab', () => {
	it('rejects drafts, fixtures and unsourced items', () => {
		expect(isPublishableVocab(base)).toBe(false);
		expect(isPublishableVocab({ ...base, reviewStatus: 'fixture', sources: ['s'] })).toBe(false);
		expect(isPublishableVocab({ ...base, reviewStatus: 'approved' })).toBe(false);
	});

	it('accepts approved, sourced, complete items', () => {
		expect(isPublishableVocab({ ...base, reviewStatus: 'approved', sources: ['s'] })).toBe(true);
	});
});
