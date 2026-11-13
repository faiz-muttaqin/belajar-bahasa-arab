import { describe, expect, it } from 'vitest';
import { hasHarakat, markOnTatweel, stripHarakat, TATWEEL } from './harakat.js';

describe('stripHarakat', () => {
	it('removes vowel marks, shadda, sukun and tanwin but keeps letters', () => {
		// Specimens from the stack guide's typography QA list (not lesson content).
		expect(stripHarakat('مُعَلِّمٌ')).toBe('معلم');
		expect(stripHarakat('السَّلَامُ عَلَيْكُمْ')).toBe('السلام عليكم');
	});

	it('keeps hamza and madda letters (only combining marks are removed)', () => {
		expect(stripHarakat('قُرْآنٌ')).toBe('قرآن');
	});

	it('is a no-op on unvocalised text', () => {
		expect(stripHarakat('كتاب')).toBe('كتاب');
	});
});

describe('hasHarakat', () => {
	it('detects marks', () => {
		expect(hasHarakat('بِسْمِ')).toBe(true);
		expect(hasHarakat('بسم')).toBe(false);
	});
});

describe('markOnTatweel', () => {
	it('places the mark on a tatweel base', () => {
		expect(markOnTatweel('َ')).toBe(`${TATWEEL}َ`);
	});
});
