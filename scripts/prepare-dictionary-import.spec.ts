import { describe, expect, it } from 'vitest';
import { preparePrivateStaging, type PrivateImportReview } from './prepare-dictionary-import.js';
import type { P4Snapshot } from '../src/lib/domain/dictionary/p4-adapter.js';

const snapshot: P4Snapshot = {
	schema: 1,
	source: {
		id: 'wiktionary',
		snapshot: '2026-10-01',
		sha256: 'c'.repeat(64),
		license: 'CC BY-SA 4.0 and GFDL'
	},
	entries: [
		{
			bucket: 'candidate',
			lemmaId: 'a'.repeat(64),
			senseId: 'b'.repeat(64),
			ar: 'كِتَاب',
			page: 'كتاب',
			pos: 'noun',
			canonical: ['كِتَاب'],
			register: 'unspecified',
			tags: [],
			glosses: ['book'],
			provenance: [
				{
					sourceId: 'wiktionary',
					url: 'https://en.wiktionary.org/wiki/' + encodeURIComponent('كتاب') + '#Arabic',
					line: 10,
					senseIndex: 1
				}
			]
		}
	]
};

const review: PrivateImportReview = {
	schema: 1,
	publicationApproved: false,
	sha256: snapshot.source.sha256,
	snapshot: snapshot.source.snapshot,
	licenseReview: {
		status: 'reviewed-for-private-staging',
		rightsDisposition: 'research-only-no-redistribution',
		reviewedBy: 'fixture-reviewer',
		reviewedOn: '2026-11-22',
		sourceTerms: 'Synthetic fixture, not a real redistribution clearance',
		attributionPlan: 'Original source must be attributed before any publication',
		rightsNotes: 'Postprocessed source rights remain unresolved'
	},
	reviewSummary: { ready: 1, hold: 0, pending: 0 },
	decisions: [
		{
			lemmaId: snapshot.entries[0]!.lemmaId,
			senseId: snapshot.entries[0]!.senseId,
			entryId: 'kitab',
			localSenseId: 'book',
			glossId: 'buku',
			register: 'unspecified',
			checkedOn: '2026-11-22',
			locator: 'Arabic > Noun > book (synthetic test)'
		}
	]
};

describe('P7 private decision importer', () => {
	it('reconciles only explicitly reviewed IDs and marks output non-publishable', () => {
		const staged = preparePrivateStaging(snapshot, review);
		expect(staged.privateStagingOnly).toBe(true);
		expect(staged.publicationApproved).toBe(false);
		expect(staged.reviewStatus).toBe('draft');
		expect(staged.entries.find((entry) => entry.id === 'kitab')).toBeDefined();
		expect(staged.entries).toHaveLength(5);
		expect(staged.reviewSummary.ready).toBe(1);
	});

	it('fails closed on a pending rights note or missing structured audit', () => {
		const invalid = {
			...review,
			licenseReview: { ...review.licenseReview, sourceTerms: 'pending' }
		};
		expect(() => preparePrivateStaging(snapshot, invalid)).toThrow('rights review');
		expect(() =>
			preparePrivateStaging(snapshot, {
				...review,
				licenseReview: 'pending'
			} as unknown as PrivateImportReview)
		).toThrow('rights review');
	});

	it('rejects stale hashes, fabricated publication approvals and count mismatches', () => {
		expect(() => preparePrivateStaging(snapshot, { ...review, sha256: 'bad' })).toThrow(
			'matching snapshot'
		);
		expect(() =>
			preparePrivateStaging(snapshot, {
				...review,
				publicationApproved: true
			} as unknown as PrivateImportReview)
		).toThrow('matching snapshot');
		expect(() =>
			preparePrivateStaging(snapshot, { ...review, reviewSummary: { ready: 2, hold: 0, pending: 0 } })
		).toThrow('review summary');
	});
});
