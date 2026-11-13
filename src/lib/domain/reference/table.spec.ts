import { describe, expect, it } from 'vitest';
import { previewTable } from '#lib/fixtures/ui-preview.js';
import { isPublishable, validateReferenceTable, type ReferenceTableData } from './table.js';

const base: ReferenceTableData = {
	id: 't',
	title: 'T',
	caption: 'C',
	reviewStatus: 'draft',
	sources: [],
	columns: [
		{ key: 'a', label: 'A', lang: 'ar' },
		{ key: 'b', label: 'B', lang: 'id' }
	],
	rows: [{ id: 'r1', cells: { a: 'كتب', b: 'x' } }]
};

describe('validateReferenceTable', () => {
	it('accepts a well-formed table', () => {
		expect(validateReferenceTable(base)).toEqual([]);
	});

	it('flags empty cells, unknown columns and duplicate rows', () => {
		const bad: ReferenceTableData = {
			...base,
			rows: [
				{ id: 'r1', cells: { a: '', b: 'x', z: 'y' } },
				{ id: 'r1', cells: { a: 'كتب', b: 'x' } }
			]
		};
		const messages = validateReferenceTable(bad).map((i) => i.message);
		expect(messages).toContain('Empty cell: a');
		expect(messages).toContain('Unknown column: z');
		expect(messages).toContain('Duplicate row id');
	});

	it('requires sources before a table is approved', () => {
		expect(validateReferenceTable({ ...base, reviewStatus: 'approved' })).toContainEqual({
			message: 'Approved table without sources'
		});
	});
});

describe('isPublishable', () => {
	it('never publishes fixtures or drafts', () => {
		expect(isPublishable(previewTable)).toBe(false);
		expect(isPublishable(base)).toBe(false);
	});

	it('publishes approved, sourced, valid tables', () => {
		expect(isPublishable({ ...base, reviewStatus: 'approved', sources: ['src'] })).toBe(true);
	});

	it('keeps the UI preview fixture structurally valid', () => {
		expect(validateReferenceTable(previewTable)).toEqual([]);
	});
});
