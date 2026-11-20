import { describe, expect, it } from 'vitest';
import { dictionaryPilot } from '#lib/content/dictionary-pilot.js';
import { adaptP4Snapshot, type P4Snapshot, type P4Decision } from './p4-adapter.js';
import { duplicateCandidates, reconcileDictionary } from './reconcile.js';
import { validateDictionary } from './senses.js';

const row = {
	bucket: 'candidate',
	lemmaId: 'a'.repeat(64),
	senseId: 'b'.repeat(64),
	ar: 'كِتَاب',
	page: 'كتاب',
	pos: 'noun',
	canonical: ['كِتَاب'],
	register: 'unspecified',
	tags: ['masculine'],
	glosses: ['book'],
	provenance: [
		{
			sourceId: 'wiktionary' as const,
			url: 'https://en.wiktionary.org/wiki/' + encodeURIComponent('كتاب') + '#Arabic',
			line: 22,
			senseIndex: 1
		}
	]
};
const snapshot: P4Snapshot = {
	schema: 1,
	source: {
		id: 'wiktionary',
		snapshot: '2026-10-01',
		sha256: 'c'.repeat(64),
		license: 'CC BY-SA 4.0 and GFDL'
	},
	entries: [row]
};
const decision: P4Decision = {
	lemmaId: row.lemmaId,
	senseId: row.senseId,
	entryId: 'kitab',
	localSenseId: 'book',
	glossId: 'buku',
	register: 'unspecified',
	checkedOn: '2026-11-20',
	locator: 'Arabic > Noun, book (synthetic fixture)'
};

describe('P5 reviewed integration (synthetic P4 snapshot)', () => {
	it('does not publish unselected rows and preserves snapshot identity', () => {
		expect(adaptP4Snapshot(snapshot, [])).toEqual([]);
		const entry = adaptP4Snapshot(snapshot, [decision])[0]!;
		expect(entry.senses[0]!.upstream?.[0]).toMatchObject({
			sha256: snapshot.source.sha256,
			lemmaId: row.lemmaId,
			senseId: row.senseId,
			locations: [{ line: 22, senseIndex: 1 }],
			tags: ['masculine']
		});
		expect(entry.forms).toEqual([]);
		expect(entry.root).toBeUndefined();
	});

	it('rejects dialects, ambiguous records and unsupported MSA promotion', () => {
		expect(() =>
			adaptP4Snapshot({ ...snapshot, entries: [{ ...row, bucket: 'dialect' }] }, [decision])
		).toThrow();
		expect(() => adaptP4Snapshot({ ...snapshot, entries: [row, row] }, [decision])).toThrow();
		expect(() => adaptP4Snapshot(snapshot, [{ ...decision, register: 'msa' }])).toThrow();
	});

	it('reconciles only explicit IDs and preserves both source locators', () => {
		const incoming = adaptP4Snapshot(snapshot, [decision]);
		const result = reconcileDictionary(dictionaryPilot, incoming);
		expect(result).toHaveLength(dictionaryPilot.length);
		const book = result.find((entry) => entry.id === 'kitab')!;
		expect(book.senses[0]!.supportingEvidence).toHaveLength(1);
		expect(book.senses[0]!.upstream).toHaveLength(1);
		expect(book.forms).toHaveLength(1);
		expect(validateDictionary(result)).toEqual([]);
	});

	it('reports homographs without combining them and rejects contradictory senses', () => {
		const separate = adaptP4Snapshot(snapshot, [{ ...decision, entryId: 'other-book' }]);
		const result = reconcileDictionary(dictionaryPilot, separate);
		expect(result).toHaveLength(6);
		expect(duplicateCandidates(result).some((group) => group.ids.includes('other-book'))).toBe(
			true
		);
		const conflict = adaptP4Snapshot(snapshot, [{ ...decision, glossId: 'notebook' }]);
		expect(() => reconcileDictionary(dictionaryPilot, conflict)).toThrow(
			'Unresolved sense conflict'
		);
	});
});
