import { describe, expect, it } from 'vitest';
import {
	babInfos,
	groupByLetter,
	letterGroup,
	stemWord,
	toRows,
	type WiktionaryVerb
} from './wiktionary-verbs.js';

const verb = (over: Partial<WiktionaryVerb>): WiktionaryVerb => ({
	id: 'x-1',
	ar: 'كَتَبَ',
	verbalNouns: [],
	bab: 1,
	altBabs: [],
	babSource: 'wiktionary-pattern',
	pattern: 'a~u',
	transitive: true,
	en: ['to write'],
	page: 'https://en.wiktionary.org/wiki/x',
	...over
});

describe('letterGroup', () => {
	it('merges every alef and hamza form into alef', () => {
		for (const word of ['أَكَلَ', 'إِذَنَ', 'آمَنَ', 'ءَمَنَ', 'ٱتَّخَذَ']) {
			expect(letterGroup(word)).toBe('أ');
		}
	});

	it('uses the first base letter and ignores marks', () => {
		expect(letterGroup('كَتَبَ')).toBe('ك');
		expect(letterGroup('ُفَتَحَ')).toBe('ف');
	});
});

describe('groupByLetter', () => {
	it('orders groups by the Arabic alphabet', () => {
		const groups = groupByLetter([verb({ ar: 'يَدَ' }), verb({ ar: 'كَتَبَ' }), verb({ ar: 'أَكَلَ' })]);
		expect(groups.map((g) => g.letter)).toEqual(['أ', 'ك', 'ي']);
	});
});

describe('toRows', () => {
	it('prefers the Indonesian meaning and keeps provenance fields apart', () => {
		const [row] = toRows(
			[verb({ id: 'a' })],
			{ a: { idGlosses: ['menulis', 'mengarang'] } },
			{ a: 'buku' }
		);
		expect(row?.cells.meaning).toBe('menulis; mengarang');
		expect(row?.cells.en).toBe('to write');
		expect(row?.cells.google).toBe('buku');
	});

	it('falls back to the English gloss and never invents missing fields', () => {
		const [row] = toRows([verb({ id: 'b' })], {}, {});
		expect(row?.cells.meaning).toBe('to write');
		expect(row?.cells.idFull).toBeUndefined();
		expect(row?.cells.google).toBeUndefined();
		const [none] = toRows([verb({ id: 'c', en: [] })], {}, {});
		expect(none?.cells.meaning).toBe('Arti belum tersedia');
	});

	it('notes alternative bab recorded by the source', () => {
		const [row] = toRows([verb({ altBabs: [2] })], {}, {});
		expect(row?.cells.babNote).toContain('bab 2');
	});
});

describe('stemWord', () => {
	it('removes the wazan prefix so mazid verbs sort by the first root letter', () => {
		expect(stemWord('أَعْلَمَ', 9)).toBe('علم');
		expect(stemWord('تَكَلَّمَ', 11)).toBe('كلم');
		expect(stemWord('اِسْتَخْدَمَ', 15)).toBe('خدم');
		expect(stemWord('اِنْفَصَلَ', 13)).toBe('فصل');
	});

	it('leaves bab 1 to 8 words and very short words alone', () => {
		expect(stemWord('كَتَبَ', 1)).toBe('كتب');
		expect(stemWord('اِتَّ', 12)).toBe('اِتَّ'.replace(/[\u064B-\u0652]/g, ''));
	});
});

describe('babInfos', () => {
	it('lists all 22 groups in site order plus an unknown group', () => {
		expect(babInfos.map((b) => b.bab)).toEqual([...Array.from({ length: 22 }, (_, i) => i + 1), 0]);
		expect(babInfos[6]?.madhi.normalize('NFC')).toBe('فَعَّلَ'.normalize('NFC'));
		expect(babInfos[18]?.family).toBe('Ruba’i mujarrad');
	});
});
