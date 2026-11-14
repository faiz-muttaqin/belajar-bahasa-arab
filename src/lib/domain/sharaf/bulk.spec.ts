import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { sharafEntries } from '#lib/content/sharaf.js';
import {
	isBulkSharafLexicon,
	mergeBulkSharaf,
	type BulkSharafLexicon
} from './bulk.js';
import { searchSharaf } from './lexicon.js';

const raw: unknown = JSON.parse(readFileSync('static/data/sharaf-lexicon-v1.json', 'utf8'));
const data = raw as BulkSharafLexicon;

describe('full versioned Qutrub + Arramooz import', () => {
	it('preserves all 7,938 unique lexical verb combinations and 596 stopword-source rows', () => {
		expect(isBulkSharafLexicon(raw)).toBe(true);
		expect(data.totals).toMatchObject({
			qutrub: 7889,
			arramooz: 7952,
			uniqueVerbs: 7938,
			stopwordRecords: 596
		});
		expect(new Set(data.verbs.map((row) => JSON.stringify(row.slice(0, 3)))).size).toBe(7938);
	});

	it('normalizes source bab 5/6 into the existing textbook numbering', () => {
		const hasuna = data.verbs.find((row) => row[0] === 'حَسُنَ');
		const hasiba = data.verbs.filter((row) => row[0] === 'حَسِبَ');
		expect(hasuna?.[2]).toBe(6);
		expect(hasiba.some((row) => row[2] === 5)).toBe(true);
	});

	it('merges duplicates into teaching entries without losing Indonesian meaning', () => {
		const merged = mergeBulkSharaf(sharafEntries, data);
		expect(mergeBulkSharaf(sharafEntries, data)).toBe(merged);
		const kataba = merged.filter(
			(entry) => entry.lemma === 'كَتَبَ' && entry.root === 'كتب' && entry.bab?.number === 1
		);
		expect(kataba).toHaveLength(1);
		expect(kataba[0]!.meaning).toBe('menulis');
		expect(kataba[0]!.forms.some((form) => form.value === 'يَكْتُبُ')).toBe(true);
		expect(merged.filter((entry) => entry.partOfSpeech === 'verb').length).toBeGreaterThanOrEqual(7938);
	});

	it('keeps unattested derivations and missing Indonesian glosses blank', () => {
		const merged = mergeBulkSharaf(sharafEntries, data);
		const sample = merged.find((entry) => entry.id.startsWith('bulk-qutrub-'));
		expect(sample?.forms).toEqual([]);
		expect(sample?.meaning).toBe('Arti Indonesia belum tersedia');
		expect(sample?.formBehavior).toBe('unverified');
		expect(sample?.sources.some((source) => source.includes('/qutrub/blob/'))).toBe(true);
	});

	it('supports diacritic-tolerant search over the entire imported catalogue', () => {
		const merged = mergeBulkSharaf(sharafEntries, data);
		expect(searchSharaf(merged, 'أبأ', 'verb').some((entry) => entry.lemma === 'أَبَأَ')).toBe(true);
		expect(searchSharaf(merged, 'كتب', 'verb').some((entry) => entry.bab?.number === 2)).toBe(true);
	});

	it('does not accept truncated or out-of-schema bulk snapshots', () => {
		expect(isBulkSharafLexicon({ ...data, verbs: data.verbs.slice(1) })).toBe(false);
		expect(isBulkSharafLexicon({ ...data, revision: 'not-this-version' })).toBe(false);
	});
});
