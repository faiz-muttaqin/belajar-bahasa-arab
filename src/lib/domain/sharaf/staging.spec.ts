import { describe, expect, it } from 'vitest';
import { sharafEntries } from '#lib/content/sharaf.js';
import { MISSING_GLOSS, stagedPreviewCounts } from '#lib/content/sharaf-staging-preview.js';
import {
	isSharafEntries,
	prepareSharafSearchIndex,
	searchSharaf
} from '#lib/domain/sharaf/lexicon.js';

describe('the normalized off-repo staging preview', () => {
	it('imports the 17 sourced verb rows with 3 fixed function-word rows, not root-only candidates', () => {
		expect(stagedPreviewCounts).toEqual({
			verbSourceRecords: 17,
			functionWordSourceRecords: 3,
			rootFormCandidatesNotImported: 6
		});
		expect(sharafEntries.filter((entry) => entry.id.startsWith('ar-verb-'))).toHaveLength(10);
		expect(sharafEntries.filter((entry) => entry.id.startsWith('ar-function-'))).toHaveLength(3);
		expect(isSharafEntries(sharafEntries)).toBe(true);
	});

	it('preserves the original first-party meaning and forms for duplicate lexical keys', () => {
		const kataba = sharafEntries.filter(
			(entry) => entry.partOfSpeech === 'verb' && entry.lemma === 'كَتَبَ'
		);
		expect(kataba.map((entry) => entry.bab?.number).sort()).toEqual([1, 2]);
		expect(kataba.find((entry) => entry.bab?.number === 1)?.meaning).toBe('menulis');
		expect(kataba.find((entry) => entry.bab?.number === 1)?.sources).toContain(
			'https://github.com/linuxscout/qutrub/blob/52e1412ccbaaf429136412183318fcbf0cf9bcd7/data/ar_verb_normalized.dict'
		);
		const variant = kataba.find((entry) => entry.bab?.number === 2);
		expect(variant?.meaning).toBe(MISSING_GLOSS);
		expect(variant?.forms).toEqual([]);
		expect(variant?.explanation).toContain('bab sumber 2');
	});

	it('keeps several bab variants of the same unvocalized Arabic spelling separate', () => {
		const matches = searchSharaf(sharafEntries, 'أَبَتَ', 'verb').filter(
			(entry) => entry.root === 'ءبت'
		);
		expect(matches.map((entry) => entry.bab?.number).sort()).toEqual([1, 2, 4]);
		expect(matches.every((entry) => entry.reviewStatus === 'draft')).toBe(true);
	});

	it('does not invent glosses, mudhari or masdar for a preview-only lemma', () => {
		const preview = sharafEntries.find((entry) => entry.id === 'ar-verb-3a0b83594d01e8cc39');
		expect(preview?.lemma).toBe('أَبَأَ');
		expect(preview?.forms).toEqual([]);
		expect(preview?.formBehavior).toBe('unverified');
		expect(preview?.meaning).toBe(MISSING_GLOSS);
		expect(preview?.sources[0]).toContain('/arramooz/blob/');
	});

	it('reuses prepared search indexes without losing exact root or Indonesian search', () => {
		const indexed = prepareSharafSearchIndex(sharafEntries);
		expect(prepareSharafSearchIndex(sharafEntries)).toBe(indexed);
		expect(searchSharaf(sharafEntries, 'ءبء', 'verb')[0]?.lemma).toBe('أَبَأَ');
		expect(searchSharaf(sharafEntries, 'menulis', 'verb')[0]?.id).toBe('fiil-kataba');
		expect(searchSharaf(sharafEntries, 'Arti Indonesia', 'verb')).toEqual([]);
	});
});
