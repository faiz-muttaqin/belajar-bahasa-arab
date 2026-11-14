import { describe, expect, it } from 'vitest';
import { sharafEntries } from '#lib/content/sharaf.js';
import { babGroups, selectedBabRows, selectableVerbs, tashrifColumns, tashrifValue } from './matrix.js';
import { parseSharafCatalog, SHARAF_CACHE_SCHEMA } from './cache.js';

describe('transposed tashrif matrix', () => {
	it('shows six bab rows and eleven morphology columns in right-to-left order', () => {
		expect(babGroups(sharafEntries).map((b) => b.number)).toEqual([1, 2, 3, 4, 5, 6]);
		expect(tashrifColumns).toHaveLength(11);
		expect(tashrifColumns[0].key).toBe('madhi');
		expect(tashrifColumns[10].key).toBe('alah');
		expect(selectedBabRows(sharafEntries, {}, 'all')).toHaveLength(6);
	});

	it('uses an existing glossary word only within its actual bab', () => {
		const rows = selectedBabRows(sharafEntries, { 1: 'fiil-kataba' }, 'all');
		expect(rows.find((row) => row.bab?.number === 1)?.lemma).toBe('كَتَبَ');
		expect(selectableVerbs(sharafEntries, 3, 'كتب')).toEqual([]);
	});

	it('never guesses forms not listed in the glossary', () => {
		const kataba = sharafEntries.find((entry) => entry.id === 'fiil-kataba')!;
		expect(tashrifValue(kataba, 'madhi')).toBe('كَتَبَ');
		expect(tashrifValue(kataba, 'mudhari')).toBe('يَكْتُبُ');
		expect(tashrifValue(kataba, 'maful')).toBeUndefined();
		const example = sharafEntries.find((entry) => entry.id === 'fiil-nasara')!;
		expect(tashrifValue(example, 'alah')).toBeDefined();
	});

	it('rejects wrong cache schema or malformed records', () => {
		expect(parseSharafCatalog({ schema: 999, entries: sharafEntries })).toBeNull();
		expect(parseSharafCatalog({ schema: SHARAF_CACHE_SCHEMA, entries: [{ id: 'x' }] })).toBeNull();
		expect(parseSharafCatalog({ schema: SHARAF_CACHE_SCHEMA, entries: [...sharafEntries] })?.entries.length)
			.toBe(sharafEntries.length);
	});
});
