import { describe, expect, it } from 'vitest';
import { hasApprovingReview, type ReviewRecord } from './review.js';

const ok: ReviewRecord = {
	reviewer: 'Ustadz A',
	role: 'ustadz',
	date: '2026-11-20',
	decision: 'approved'
};

describe('hasApprovingReview', () => {
	it('requires a review by the requested role', () => {
		expect(hasApprovingReview([ok], 'ustadz')).toBe(true);
		expect(hasApprovingReview([ok], 'arabic_teacher')).toBe(false);
		expect(hasApprovingReview(undefined, 'ustadz')).toBe(false);
	});

	it('uses the latest review of that role', () => {
		const later: ReviewRecord = { ...ok, date: '2026-12-01', decision: 'changes_requested' };
		expect(hasApprovingReview([ok, later], 'ustadz')).toBe(false);
		expect(hasApprovingReview([later, { ...ok, date: '2026-12-05' }], 'ustadz')).toBe(true);
	});

	it('ignores anonymous records', () => {
		expect(hasApprovingReview([{ ...ok, reviewer: ' ' }], 'ustadz')).toBe(false);
	});
});
