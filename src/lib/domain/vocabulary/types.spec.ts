import { describe, expect, it } from 'vitest';
import type { ReviewRecord } from '#lib/domain/review.js';
import { isPublishableVocab, validateVocab, type VocabularyItem } from './types.js';

const teacher: ReviewRecord = {
	reviewer: 'Guru A',
	role: 'arabic_teacher',
	date: '2026-11-20',
	decision: 'approved'
};

const base: VocabularyItem = {
	id: 'v1',
	collection: 'harian',
	register: 'msa',
	arabic: 'كتاب',
	meaning: 'x',
	concreteness: 'concrete',
	reviewStatus: 'draft',
	sources: []
};

describe('validateVocab', () => {
	it('rejects an icon on abstract or function words (D-6)', () => {
		expect(validateVocab({ ...base, icon: 'book' })).toEqual([]);
		expect(validateVocab({ ...base, icon: 'book', concreteness: 'abstract' })).toContainEqual({
			id: 'v1',
			message: 'Icon on a non-concrete word (D-6)'
		});
	});

	it("requires the classical label in the Qur'anic collection", () => {
		expect(validateVocab({ ...base, collection: 'quran' }).map((i) => i.message)).toContain(
			"Qur'anic collection items must use the classical register label"
		);
	});
});

describe('isPublishableVocab', () => {
	const approved: VocabularyItem = {
		...base,
		reviewStatus: 'approved',
		sources: ['s'],
		reviews: [teacher]
	};

	it('rejects drafts, fixtures, unsourced and unreviewed items', () => {
		expect(isPublishableVocab(base)).toBe(false);
		expect(isPublishableVocab({ ...approved, reviewStatus: 'fixture' })).toBe(false);
		expect(isPublishableVocab({ ...approved, sources: [] })).toBe(false);
		expect(isPublishableVocab({ ...approved, reviews: [] })).toBe(false);
	});

	it('accepts approved, sourced, valid items reviewed by the right role (D-7)', () => {
		expect(isPublishableVocab(approved)).toBe(true);
	});

	it("requires an ustadz for the Qur'anic collection", () => {
		const quran: VocabularyItem = { ...approved, collection: 'quran', register: 'classical' };
		expect(isPublishableVocab(quran)).toBe(false);
		expect(isPublishableVocab({ ...quran, reviews: [{ ...teacher, role: 'ustadz' }] })).toBe(true);
	});
});
