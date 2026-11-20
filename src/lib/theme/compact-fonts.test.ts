import { describe, expect, it } from 'vitest';
import { FONT_STACKS, overridesToCss, parseThemeCss, themeToCss } from './css.js';
import { parseStoredTheme, THEME_STORAGE_VERSION } from './storage.js';
import { ARABIC_FONTS, cloneTheme, DEFAULT_THEME, isArabicFontId } from './tokens.js';

describe('compact Arabic font choices', () => {
	it.each(['noto-sans-arabic', 'ibm-plex-sans-arabic'] as const)(
		'round-trips %s through CSS and stored preferences',
		(id) => {
			expect(isArabicFontId(id)).toBe(true);
			const theme = cloneTheme(DEFAULT_THEME);
			theme.shared.arabicFont = id;
			expect(parseThemeCss(themeToCss(theme)).shared.arabicFont).toBe(id);
			const stored = parseStoredTheme({
				version: THEME_STORAGE_VERSION,
				mode: 'dark',
				overrides: { shared: { arabicFont: id } }
			});
			expect(stored?.overrides.shared.arabicFont).toBe(id);
			expect(overridesToCss(stored?.overrides, FONT_STACKS)).toContain(ARABIC_FONTS[id].stack);
		}
	);

	it('preserves the default and rejects unknown choices', () => {
		expect(DEFAULT_THEME.shared.arabicFont).toBe('noto-naskh-arabic');
		expect(isArabicFontId('unknown-font')).toBe(false);
	});
});
