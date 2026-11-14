import { describe, expect, it } from 'vitest';
import { sharafEntries } from '#lib/content/sharaf.js';
import {
	babGroups,
	referenceWazanValue,
	selectedBabRows,
	selectableVerbs,
	tashrifColumns,
	tashrifValue
} from './matrix.js';
import { isSharafEntries } from './lexicon.js';

describe('transposed tashrif matrix', () => {
	it('shows twenty-two bab rows and eleven morphology columns in right-to-left order', () => {
		expect(babGroups(sharafEntries).map((b) => b.number)).toEqual(Array.from({ length: 22 }, (_, i) => i + 1));
		expect(tashrifColumns).toHaveLength(11);
		expect(tashrifColumns[0].key).toBe('madhi');
		expect(tashrifColumns[10].key).toBe('alah');
		expect(selectedBabRows(sharafEntries, {}, 'all')).toHaveLength(22);
	});

	it('renders ف-ع-ل teaching patterns by default, preserving different bab harakat', () => {
		expect(referenceWazanValue(1, 'madhi')).toBe('فَعَلَ');
		expect(referenceWazanValue(2, 'mudhari')).toBe('يَفْعِلُ');
		expect(referenceWazanValue(3, 'mudhari')).toBe('يَفْعَلُ');
		expect(referenceWazanValue(6, 'madhi')).toBe('فَعُلَ');
		expect(referenceWazanValue(1, 'fail')).toBe('فَاعِلٌ');
		expect(referenceWazanValue(6, 'maful')).toBeUndefined();
	});

	it('provides representative extended wazan with their own families', () => {
		const rows = babGroups(sharafEntries);
		expect(rows.find((row) => row.number === 7)?.family).toBe('tsulatsi-mazid-1');
		expect(rows.find((row) => row.number === 15)?.family).toBe('tsulatsi-mazid-3');
		expect(rows.find((row) => row.number === 19)?.family).toBe('rubai-mujarrad');
		expect(rows.find((row) => row.number === 22)?.family).toBe('rubai-mazid-2');
		expect(referenceWazanValue(7, 'madhi')).toBe('فَعَّلَ');
		expect(referenceWazanValue(15, 'madhi')).toBe('اِسْتَفْعَلَ');
		expect(referenceWazanValue(19, 'mudhari')).toBe('يُفَعْلِلُ');
	});

	it('finds Indonesian glosses within matching bab without inventing paradigms', () => {
		const examples = selectableVerbs(sharafEntries, 'all', 'mengajarkan');
		expect(examples.some((entry) => entry.bab?.number === 7 && entry.lemma === 'عَلَّمَ')).toBe(true);
		expect(selectableVerbs(sharafEntries, 7, 'belajar')).toEqual([]);
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

	it('rejects malformed or duplicate glossary records in the public catalog', () => {
		expect(isSharafEntries(sharafEntries)).toBe(true);
		expect(isSharafEntries([{ id: 'x' }])).toBe(false);
		expect(isSharafEntries([...sharafEntries, sharafEntries[0]])).toBe(false);
	});
});
