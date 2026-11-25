import { describe, expect, it } from 'vitest';
import { composite, contrastRatio, parseColor, toHex } from '#lib/theme/color.js';
import { DEFAULT_THEME, type ColorTokens } from '#lib/theme/tokens.js';
import { grammarAnnotations, wordClassAnnotations } from '#lib/content/grammar-annotations.js';
import {
	availableLayers,
	layerCategories,
	layerCategory,
	SWATCHES,
	SWATCH_TOKEN,
	TINT_PERCENT,
	type TintState
} from './annotation-layers.js';

/** Same arithmetic as CSS `color-mix(in srgb, <swatch> N%, <backdrop>)`. */
function tint(
	colors: ColorTokens,
	swatch: (typeof SWATCHES)[number],
	percent: number,
	backdrop: string
) {
	const top = parseColor(colors[SWATCH_TOKEN[swatch]])!;
	const back = parseColor(backdrop)!;
	return toHex(composite({ ...top, a: percent / 100 }, back))!;
}

describe('VP-02 layers', () => {
	it('offers sharaf only where the annotations carry sharaf notes', () => {
		expect(availableLayers(wordClassAnnotations)).toEqual(['wordClass', 'role', 'sharaf']);
		const noSharaf = grammarAnnotations.filter((s) => s.id.startsWith('ph-kitab-jadid'));
		expect(availableLayers(noSharaf)).toEqual(['wordClass', 'role']);
	});

	it('gives every token a role and word-class label, so colour is never the only cue', () => {
		for (const sentence of grammarAnnotations) {
			for (const token of sentence.tokens) {
				expect(layerCategory(token, 'wordClass')?.label).toBeTruthy();
				expect(layerCategory(token, 'role')?.label).toBeTruthy();
			}
		}
	});

	it('builds a legend of the categories used, in order of appearance', () => {
		const labels = layerCategories(wordClassAnnotations.slice(0, 1), 'role').map((c) => c.label);
		expect(labels).toEqual(['Mubtada’', 'Khabar']);
	});

	describe.each(['light', 'dark'] as const)('%s theme contrast (WCAG 2.2 AA)', (mode) => {
		const colors = DEFAULT_THEME[mode];
		const states = Object.keys(TINT_PERCENT) as TintState[];

		it.each(states)('foreground text on a %s tint reaches 4.5:1 on page and card', (state) => {
			for (const swatch of SWATCHES) {
				for (const surface of ['background', 'card'] as const) {
					const bg = tint(colors, swatch, TINT_PERCENT[state][mode], colors[surface]);
					const ratio = contrastRatio(colors.foreground, bg)!;
					expect(ratio, `${swatch} ${state} ${surface}`).toBeGreaterThanOrEqual(4.5);
				}
			}
		});

		it('keeps muted label text readable on an idle tint', () => {
			for (const swatch of SWATCHES) {
				const bg = tint(colors, swatch, TINT_PERCENT.idle[mode], colors.background);
				expect(contrastRatio(colors['muted-foreground'], bg)!, swatch).toBeGreaterThanOrEqual(4.5);
			}
		});

		it('keeps swatch dots in the legend at 3:1 against the page', () => {
			for (const swatch of SWATCHES) {
				const ratio = contrastRatio(colors[SWATCH_TOKEN[swatch]], colors.background)!;
				expect(ratio, swatch).toBeGreaterThanOrEqual(3);
			}
		});
	});
});
