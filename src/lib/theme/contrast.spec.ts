import { describe, expect, it } from 'vitest';
import { auditContrast, formatRatio } from './contrast.js';
import { DEFAULT_THEME } from './tokens.js';

describe('default theme contrast (WCAG 2.2 AA)', () => {
	it.each(['light', 'dark'] as const)('%s mode passes every audited pair', (mode) => {
		const failures = auditContrast(DEFAULT_THEME[mode]).filter((r) => !r.passes);
		expect(failures.map((f) => `${f.id} ${formatRatio(f.ratio)}`)).toEqual([]);
	});

	it('flags a failing pair', () => {
		const colors = { ...DEFAULT_THEME.light, 'muted-foreground': '#bbbbbb' };
		const result = auditContrast(colors).find((r) => r.id === 'muted-page');
		expect(result?.passes).toBe(false);
	});

	it('never rounds a failing ratio up to the minimum', () => {
		expect(formatRatio(4.499)).toBe('4.49:1');
		expect(formatRatio(null)).toBe('tidak terbaca');
	});
});
