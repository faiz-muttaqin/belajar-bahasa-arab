import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import {
	FONT_STACKS,
	applyOverrides,
	countParsed,
	diffTheme,
	emptyOverrides,
	overridesToCss,
	parseThemeCss,
	themeToCss
} from './css.js';
import { COLOR_TOKENS, DEFAULT_THEME, cloneTheme } from './tokens.js';

describe('themeToCss and parseThemeCss', () => {
	it('round-trips the default theme', () => {
		const parsed = parseThemeCss(themeToCss(DEFAULT_THEME));
		expect(parsed.ignored).toEqual([]);
		expect(applyOverrides(parsed)).toEqual(DEFAULT_THEME);
	});

	it('round-trips a customised theme', () => {
		const theme = cloneTheme(DEFAULT_THEME);
		theme.light.primary = 'oklch(0.5 0.12 160)';
		theme.dark.background = '#000000';
		theme.shared = { radius: 1, uiFont: 'system', arabicFont: 'amiri' };
		const parsed = parseThemeCss(themeToCss(theme));
		expect(applyOverrides(parsed)).toEqual(theme);
	});

	it('keeps light and dark values apart and reads shared values from :root', () => {
		const parsed = parseThemeCss(`
			/* comment with { braces } and --primary: red; */
			:root { --primary: #112233; --radius: 12px; --font-sans: 'Plus Jakarta Sans', sans-serif; }
			.dark { --primary: hsl(160 50% 60%); --radius: 2rem; }
			@theme inline { --color-primary: var(--primary); }
		`);
		expect(parsed.light.primary).toBe('#112233');
		expect(parsed.dark.primary).toBe('hsl(160 50% 60%)');
		expect(parsed.shared.radius).toBe(0.75);
		expect(parsed.shared.uiFont).toBe('plus-jakarta-sans');
		// --radius in .dark is not a shared source.
		expect(parsed.ignored).toContain('--radius');
		expect(countParsed(parsed)).toBe(4);
	});

	it('accepts shadcn v3 bare HSL channels', () => {
		const parsed = parseThemeCss(':root { --background: 0 0% 100%; --ring: 222.2 84% 4.9%; }');
		expect(parsed.light.background).toBe('hsl(0 0% 100%)');
		expect(parsed.light.ring).toBe('hsl(222.2 84% 4.9%)');
	});

	it('reports unknown variables and invalid values instead of applying them', () => {
		const parsed = parseThemeCss(
			':root { --primary: notacolor; --made-up: #fff; --accent: url(x); --radius: 9rem; }'
		);
		expect(countParsed(parsed)).toBe(0);
		expect(parsed.ignored).toEqual([
			'--primary (light)',
			'--made-up',
			'--accent (light)',
			'--radius'
		]);
	});

	it('matches Arabic fonts by family name', () => {
		const parsed = parseThemeCss(":root { --arabic-font: 'Scheherazade New', serif; }");
		expect(parsed.shared.arabicFont).toBe('scheherazade-new');
	});
});

describe('diffTheme', () => {
	it('is empty for the default theme', () => {
		expect(diffTheme(DEFAULT_THEME)).toEqual(emptyOverrides());
	});

	it('ignores case-only differences and keeps real changes', () => {
		const theme = cloneTheme(DEFAULT_THEME);
		theme.light.primary = DEFAULT_THEME.light.primary.toUpperCase();
		theme.dark.ring = '#ff0000';
		theme.shared.radius = 0;
		expect(diffTheme(theme)).toEqual({
			light: {},
			dark: { ring: '#ff0000' },
			shared: { radius: 0 }
		});
	});
});

describe('overridesToCss', () => {
	it('scopes overrides so light values never leak into dark mode', () => {
		const css = overridesToCss(
			{
				light: { primary: '#123456' },
				dark: { primary: '#abcdef' },
				shared: { radius: 1, arabicFont: 'amiri' }
			},
			FONT_STACKS
		);
		expect(css).toContain("html:root { --radius: 1rem; --arabic-font: 'Amiri', serif; }");
		expect(css).toContain('html:not(.dark) { --primary: #123456; }');
		expect(css).toContain('html.dark { --primary: #abcdef; }');
	});

	it('drops values that could break out of the declaration', () => {
		const css = overridesToCss(
			{
				light: { primary: 'red; } body { display: none', 'bad key': '#fff', ring: '</style>' },
				dark: 'nope',
				shared: { radius: 'huge', uiFont: '__proto__' }
			},
			FONT_STACKS
		);
		expect(css).toBe('');
	});

	it('returns an empty string for missing or malformed input', () => {
		expect(overridesToCss(null, FONT_STACKS)).toBe('');
		expect(overridesToCss('x', FONT_STACKS)).toBe('');
		expect(overridesToCss(emptyOverrides(), FONT_STACKS)).toBe('');
	});
});

describe('layout.css', () => {
	it('declares the same default tokens as DEFAULT_THEME', async () => {
		const css = await readFile('src/routes/layout.css', 'utf8');
		const parsed = parseThemeCss(css);
		for (const token of COLOR_TOKENS) {
			expect(parsed.light[token], `light ${token}`).toBe(DEFAULT_THEME.light[token]);
			expect(parsed.dark[token], `dark ${token}`).toBe(DEFAULT_THEME.dark[token]);
		}
		expect(parsed.shared).toEqual(DEFAULT_THEME.shared);
	});
});
