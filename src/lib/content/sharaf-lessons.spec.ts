import { describe, expect, it } from 'vitest';
import {
	SHARAF_FORM_LABELS,
	sharafSections,
	validateSharafSections,
	type SharafSection
} from './sharaf-lessons.js';

describe('G-02: source-backed sharaf forms', () => {
	it('has three scoped sections and all forms are source-backed draft material', () => {
		expect(sharafSections.map((section) => section.id)).toEqual([
			'akar-dan-wazan',
			'tashrif-istilahi',
			'tashrif-lughawi'
		]);
		expect(sharafSections.map((section) => section.forms.length)).toEqual([3, 6, 9]);
		expect(sharafSections.every((section) => section.reviewStatus === 'draft')).toBe(true);
		expect(validateSharafSections(sharafSections)).toEqual([]);
	});

	it('shows an explicit Indonesian gloss and category for every attested form', () => {
		for (const section of sharafSections) {
			for (const form of section.forms) {
				expect(form.arabic).toMatch(/[\u0621-\u064a]/);
				expect(form.gloss.length).toBeGreaterThan(2);
				expect(SHARAF_FORM_LABELS[form.category].length).toBeGreaterThan(2);
			}
		}
	});

	it('disambiguates identical taktubu spellings by their pronouns', () => {
		const paradigm = sharafSections.find((section) => section.id === 'tashrif-lughawi');
		const forms = paradigm?.forms.filter((form) => form.arabic === 'تَكْتُبُ') ?? [];
		expect(forms).toHaveLength(2);
		expect(forms.map((form) => form.pronoun?.arabic)).toEqual(['هِيَ', 'أَنْتَ']);
	});

	it('distinguishes different forms instead of deriving an unverified masdar', () => {
		const forms = sharafSections.find((section) => section.id === 'tashrif-istilahi')?.forms ?? [];
		expect(forms.find((form) => form.category === 'masdar')?.arabic).toBe('كِتَابَةٌ');
		expect(forms.find((form) => form.category === 'agent')?.arabic).toBe('كَاتِبٌ');
		expect(forms.find((form) => form.category === 'patient')?.arabic).toBe('مَكْتُوبٌ');
	});

	it('rejects missing glosses and missing evidence links', () => {
		const first = sharafSections[0]!;
		const missingGloss: SharafSection = {
			...first,
			forms: [{ ...first.forms[0]!, gloss: '' }]
		};
		expect(validateSharafSections([missingGloss])).toContain(
			'Missing form/gloss/label: akar-dan-wazan/root-k-t-b'
		);
		expect(validateSharafSections([{ ...first, sources: [] }])).toContain(
			'Missing source: akar-dan-wazan'
		);
	});
});
