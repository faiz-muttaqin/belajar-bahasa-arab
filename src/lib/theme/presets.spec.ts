import { describe, expect, it } from 'vitest';
import { auditContrast, formatRatio } from './contrast.js';
import { THEME_PRESETS, findPreset } from './presets.js';
import { COLOR_TOKENS, DEFAULT_THEME, cloneTheme } from './tokens.js';
import { isValidColor } from './color.js';

describe('theme presets', () => {
	it('offers 20 themes, including warm low-glare ones', () => {
		expect(THEME_PRESETS).toHaveLength(20);
		expect(THEME_PRESETS.filter((p) => p.warm).length).toBeGreaterThanOrEqual(6);
	});

	it('starts with the site default', () => {
		expect(THEME_PRESETS[0]?.theme).toEqual(DEFAULT_THEME);
		expect(findPreset(cloneTheme(DEFAULT_THEME))?.id).toBe('hijau-tenang');
	});

	it('have unique ids and complete, valid tokens', () => {
		expect(new Set(THEME_PRESETS.map((p) => p.id)).size).toBe(THEME_PRESETS.length);
		for (const preset of THEME_PRESETS) {
			for (const mode of ['light', 'dark'] as const) {
				for (const token of COLOR_TOKENS) {
					expect(isValidColor(preset.theme[mode][token]), `${preset.id} ${mode} ${token}`).toBe(
						true
					);
				}
			}
		}
	});

	it.each(THEME_PRESETS.map((p) => [p.id, p] as const))(
		'%s passes WCAG AA in both modes',
		(_, preset) => {
			for (const mode of ['light', 'dark'] as const) {
				const failures = auditContrast(preset.theme[mode])
					.filter((r) => !r.passes)
					.map((r) => `${mode} ${r.id} ${formatRatio(r.ratio)}`);
				expect(failures).toEqual([]);
			}
		}
	);

	it('does not match an edited theme', () => {
		const edited = cloneTheme(DEFAULT_THEME);
		edited.shared.radius = 0;
		expect(findPreset(edited)).toBeUndefined();
	});
});
