import { describe, expect, it } from 'vitest';
import { contrastRatio, isValidColor, parseColor, toHex } from './color.js';

describe('parseColor', () => {
	it.each([
		['#fff', '#ffffff'],
		['#145F4C', '#145f4c'],
		['#145f4c80', '#145f4c'],
		['rgb(20, 95, 76)', '#145f4c'],
		['rgb(20 95 76 / 50%)', '#145f4c'],
		['rgba(255,0,0,0.5)', '#ff0000'],
		['hsl(210 40% 50%)', '#4d80b3'],
		['hsl(210deg, 40%, 50%)', '#4d80b3'],
		['oklch(0.205 0 0)', '#171717'],
		['oklch(1 0 0)', '#ffffff'],
		['oklch(57.7% 0.245 27.325)', '#e7000b'],
		['OKLCH(0.5 0.1 none)', toHex('oklch(0.5 0.1 0)')]
	])('reads %s', (input, hex) => {
		expect(toHex(input)).toBe(hex);
	});

	it('keeps alpha', () => {
		expect(parseColor('oklch(1 0 0 / 10%)')?.a).toBeCloseTo(0.1);
		expect(parseColor('#00000080')?.a).toBeCloseTo(128 / 255);
	});

	it.each([
		'',
		'red',
		'notacolor',
		'#12',
		'#ggg',
		'rgb(1 2)',
		'rgb(1, 2 3)',
		'rgb(10% 2 3)',
		'hsl(10 20px 30%)',
		'oklch(0.5 0.1 20 / 1 / 2)',
		'var(--primary)',
		'red; } body { color: red'
	])('rejects %j', (input) => {
		expect(isValidColor(input)).toBe(false);
	});
});

describe('contrastRatio', () => {
	it('matches known WCAG values', () => {
		expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 5);
		expect(contrastRatio('#fff', '#fff')).toBeCloseTo(1, 5);
		expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.48, 2);
	});

	it('is symmetric', () => {
		expect(contrastRatio('#145f4c', '#fbfaf7')).toBeCloseTo(
			contrastRatio('#fbfaf7', '#145f4c')!,
			10
		);
	});

	it('composites translucent colours before measuring', () => {
		// 10% white over near-black reads as a dark grey, not as white.
		const ratio = contrastRatio('oklch(1 0 0 / 10%)', '#111111')!;
		expect(ratio).toBeLessThan(2);
	});

	it('returns null for invalid input', () => {
		expect(contrastRatio('nope', '#fff')).toBeNull();
	});
});
