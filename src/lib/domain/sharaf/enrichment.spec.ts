import { describe, expect, it } from 'vitest';
import { BULK_SHARAF_GLOSS_MISSING } from './bulk.js';
import { isVerbEnrichment, mergeEnrichment, type VerbEnrichment } from './enrichment.js';
import type { SharafEntry } from './lexicon.js';

const bulk = (lemma: string, root: string, bab: number): SharafEntry => ({
	id: `bulk-x-${lemma}-${bab}`,
	lemma,
	root,
	meaning: BULK_SHARAF_GLOSS_MISSING,
	partOfSpeech: 'verb',
	bab: { number: bab, exemplar: 'فَعَلَ', pattern: 'فَعَلَ – يَفْعُلُ' },
	forms: [],
	babSelection: 'lexical',
	formBehavior: 'unverified',
	explanation: 'Dari kamus.',
	sources: [],
	reviewStatus: 'draft'
});

const data: VerbEnrichment = {
	schema: 1,
	attribution: '',
	totals: { wiktionary: 2, recall: 2 },
	wk: [
		['كَتَبَ', 1, 'kataba', 'يَكْتُبُ', 'كِتَابَة،كَتْب', 'كَاتِب', 'مَكْتُوب', 'menulis', 'to write', 'كتب'],
		['اِسْتَخْرَجَ', 15, 'istaḵraja', 'يَسْتَخْرِجُ', 'اِسْتِخْرَاج', '', '', '', 'to extract', 'استخرج']
	],
	rc: [
		['أَبَتَ', 'ءبت', 1, 0, 'menolak', 2, 1, 'ل'],
		['أَبَثَ', 'ءبث', 2, 2, '', 0, 1, 'ل']
	]
};

describe('mergeEnrichment', () => {
	const entries = [bulk('كَتَبَ', 'كتب', 1), bulk('أَبَتَ', 'ءبت', 1), bulk('أَبَثَ', 'ءبث', 2)];
	const merged = mergeEnrichment(entries, data);

	it('fills meaning and forms from Wiktionary and says where they come from', () => {
		const row = merged.find((e) => e.lemma === 'كَتَبَ')!;
		expect(row.meaning).toBe('menulis');
		expect(row.meaningSource).toBe('terjemahan');
		expect(row.forms.map((f) => f.label)).toEqual(['mudhari', 'mashdar', 'fail', 'maful']);
		expect(row.sources.some((s) => s.includes('wiktionary.org'))).toBe(true);
	});

	it('uses model recall for the rest, labelled, and leaves unknown ones unknown', () => {
		expect(merged.find((e) => e.lemma === 'أَبَتَ')).toMatchObject({
			meaning: 'menolak',
			meaningSource: 'model'
		});
		expect(merged.find((e) => e.lemma === 'أَبَثَ')).toMatchObject({
			meaning: BULK_SHARAF_GLOSS_MISSING,
			meaningSource: 'belum-diketahui'
		});
	});

	it('adds Wiktionary verbs no entry covers, under their own bab', () => {
		const added = merged.find((e) => e.lemma === 'اِسْتَخْرَجَ');
		expect(added?.bab?.number).toBe(15);
		expect(added?.meaning).toBe('to extract');
		expect(added?.meaningSource).toBe('wiktionary');
	});

	it('does not touch hand-written entries and is a no-op without data', () => {
		const curated = {
			...bulk('كَتَبَ', 'كتب', 1),
			id: 'curated-1',
			meaning: 'menulis (tulisan tangan)'
		};
		const out = mergeEnrichment([curated], data);
		expect(out.find((e) => e.id === 'curated-1')?.meaning).toBe('menulis (tulisan tangan)');
		expect(mergeEnrichment(entries, undefined)).toBe(entries);
	});
});

describe('isVerbEnrichment', () => {
	it('checks the totals', () => {
		expect(isVerbEnrichment(data)).toBe(true);
		expect(isVerbEnrichment({ ...data, totals: { wiktionary: 1, recall: 2 } })).toBe(false);
		expect(isVerbEnrichment(null)).toBe(false);
	});
});
