import { describe, expect, it } from 'vitest';
import { tashrifColumns } from '#lib/domain/sharaf/matrix.js';
import {
	morphologyGuides,
	morphologyGuideList,
	validateMorphologyGuides
} from './morphology-guides.js';
import { wordClassGuides, validateWordClassGuides } from './word-class-guides.js';

describe('F-16 source-linked morphology guides', () => {
	it('covers every actual tashrif header exactly once', () => {
		expect(validateMorphologyGuides()).toEqual([]);
		expect(morphologyGuideList.map((guide) => guide.key)).toEqual(
			tashrifColumns.map((column) => column.key)
		);
		expect(new Set(morphologyGuideList.map((guide) => guide.key)).size).toBe(11);
	});

	it('does not mislabel nominal derivatives as verbs', () => {
		for (const key of ['mashdar', 'mimi', 'fail', 'maful', 'zaman', 'makan', 'alah'] as const) {
			expect(morphologyGuides[key].group).toBe('isim');
		}
		for (const key of ['madhi', 'mudhari', 'amr', 'nahy'] as const) {
			expect(morphologyGuides[key].group).toBe('fiil');
		}
		expect(morphologyGuides.nahy.distinction).toMatch(/partikel.*muḍāri‘ majzūm/);
	});

	it('keeps the basic examples complete and draft for teacher review', () => {
		for (const guide of morphologyGuideList) {
			expect(guide.reviewStatus).toBe('draft');
			expect(guide.sections.length).toBeGreaterThanOrEqual(3);
			expect(guide.examples.length).toBeGreaterThanOrEqual(2);
			expect(
				guide.examples.every(
					(example) =>
						example.arabic.length > 0 && example.gloss.length > 0 && example.observation.length > 0
				)
			).toBe(true);
			expect(guide.watchOut.length).toBeGreaterThan(0);
			expect(guide.references.every((reference) => reference.url.startsWith('https://'))).toBe(
				true
			);
		}
	});

	it('connects each guide to real related headings without loops', () => {
		for (const guide of morphologyGuideList) {
			for (const key of guide.related) {
				expect(morphologyGuides[key]).toBeDefined();
				expect(key).not.toBe(guide.key);
			}
		}
	});

	it('models isim and fiil with independent classification axes', () => {
		expect(validateWordClassGuides()).toEqual([]);
		expect(wordClassGuides.isim.axes.map((axis) => axis.id)).toEqual([
			'isim-makna',
			'isim-asal',
			'isim-ketetapan',
			'isim-perubahan'
		]);
		expect(wordClassGuides.fiil.axes.map((axis) => axis.id)).toEqual([
			'fiil-bentuk',
			'fiil-bab',
			'fiil-kesehatan-akar',
			'fiil-objek',
			'fiil-mood'
		]);
	});

	it('only links actual form pages from the term guides', () => {
		for (const guide of Object.values(wordClassGuides)) {
			expect(guide.reviewStatus).toBe('draft');
			for (const axis of guide.axes) {
				for (const example of axis.entries) {
					if (example.form) expect(morphologyGuides[example.form]).toBeDefined();
				}
			}
		}
	});
});
