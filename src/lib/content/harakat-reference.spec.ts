import { describe, expect, it } from 'vitest';
import { harakatReference } from './harakat-reference.js';
import { isPublishable, validateReferenceTable } from '#lib/domain/reference/table.js';

describe('R-03 harakat reference', () => {
	it('keeps eleven sourced, uniquely identified reading examples', () => {
		expect(harakatReference.rows).toHaveLength(11);
		expect(harakatReference.sources).toContain('https://www.w3.org/TR/alreq/');
		expect(new Set(harakatReference.rows.map((row) => row.id)).size).toBe(11);
		expect(validateReferenceTable(harakatReference)).toEqual([]);
	});

	it('shows diacritics on tatweel instead of a dotted circle', () => {
		for (const row of harakatReference.rows) {
			expect(row.cells.tanda).toMatch(/^ـ/u);
			expect(row.cells.contoh).toMatch(/[\u064B-\u0652]/u);
		}
	});

	it('distinguishes the three short vowel forms and long-vowel comparison', () => {
		expect(harakatReference.rows.slice(0, 3).map((row) => row.cells.bunyi)).toEqual([
			'ba',
			'bi',
			'bu'
		]);
		expect(harakatReference.rows.slice(-3).map((row) => row.cells.bunyi)).toEqual([
			'bā',
			'bī',
			'bū'
		]);
	});

	it('cannot be marked approved without an Arabic-teacher review', () => {
		expect(harakatReference.reviewStatus).toBe('draft');
		expect(isPublishable(harakatReference)).toBe(false);
	});
});
