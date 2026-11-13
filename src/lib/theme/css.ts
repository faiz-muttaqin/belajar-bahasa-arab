import { isValidColor } from './color.js';
import {
	ARABIC_FONTS,
	COLOR_TOKENS,
	DEFAULT_THEME,
	RADIUS_MAX,
	RADIUS_MIN,
	UI_FONTS,
	cloneTheme,
	isArabicFontId,
	isColorToken,
	isUiFontId,
	type ArabicFontId,
	type ColorToken,
	type ColorTokens,
	type Mode,
	type SharedTokens,
	type Theme,
	type UiFontId
} from './tokens.js';

/** Only the values that differ from the default theme. This is what we persist. */
export type ThemeOverrides = {
	light: Partial<ColorTokens>;
	dark: Partial<ColorTokens>;
	shared: Partial<SharedTokens>;
};

export type FontStacks = { ui: Record<string, string>; arabic: Record<string, string> };

export const FONT_STACKS: FontStacks = {
	ui: Object.fromEntries(Object.entries(UI_FONTS).map(([id, f]) => [id, f.stack])),
	arabic: Object.fromEntries(Object.entries(ARABIC_FONTS).map(([id, f]) => [id, f.stack]))
};

export const emptyOverrides = (): ThemeOverrides => ({ light: {}, dark: {}, shared: {} });

export function diffTheme(theme: Theme, base: Theme = DEFAULT_THEME): ThemeOverrides {
	const overrides = emptyOverrides();
	for (const mode of ['light', 'dark'] as const) {
		for (const token of COLOR_TOKENS) {
			const value = theme[mode][token];
			if (value.trim().toLowerCase() !== base[mode][token].toLowerCase()) {
				overrides[mode][token] = value.trim();
			}
		}
	}
	if (theme.shared.radius !== base.shared.radius) overrides.shared.radius = theme.shared.radius;
	if (theme.shared.uiFont !== base.shared.uiFont) overrides.shared.uiFont = theme.shared.uiFont;
	if (theme.shared.arabicFont !== base.shared.arabicFont) {
		overrides.shared.arabicFont = theme.shared.arabicFont;
	}
	return overrides;
}

export function applyOverrides(overrides: ThemeOverrides, base: Theme = DEFAULT_THEME): Theme {
	const theme = cloneTheme(base);
	Object.assign(theme.light, overrides.light);
	Object.assign(theme.dark, overrides.dark);
	Object.assign(theme.shared, overrides.shared);
	return theme;
}

export const hasOverrides = (o: ThemeOverrides) =>
	Object.keys(o.light).length + Object.keys(o.dark).length + Object.keys(o.shared).length > 0;

/**
 * Builds the stylesheet that layers a user's overrides over `layout.css`.
 *
 * This function must stay self-contained (no references outside its body): it is
 * also embedded, via `toString()`, in the inline script that applies a saved theme
 * before first paint. It therefore re-checks every key and value, because it runs
 * on raw `localStorage` data there.
 *
 * Selectors are one step more specific than the defaults (`:root`, `.dark`) so the
 * order of `<style>` and `<link>` elements in `<head>` does not matter, and light
 * overrides never leak into dark mode.
 */
export function overridesToCss(overrides: unknown, fonts: FontStacks): string {
	if (!overrides || typeof overrides !== 'object') return '';
	const source = overrides as Record<string, unknown>;
	const keyOk = (k: string) => /^[a-z0-9-]{1,40}$/.test(k);
	const valueOk = (v: unknown): v is string =>
		typeof v === 'string' && v.length > 0 && v.length <= 120 && !/[;{}<>\\]/.test(v);

	const block = (selector: string, entries: unknown) => {
		if (!entries || typeof entries !== 'object') return '';
		const lines: string[] = [];
		for (const [key, value] of Object.entries(entries as Record<string, unknown>)) {
			if (keyOk(key) && valueOk(value)) lines.push('--' + key + ': ' + value.trim() + ';');
		}
		return lines.length ? selector + ' { ' + lines.join(' ') + ' }\n' : '';
	};

	const shared = (
		source.shared && typeof source.shared === 'object' ? source.shared : {}
	) as Record<string, unknown>;
	const sharedVars: Record<string, string> = {};
	if (typeof shared.radius === 'number' && shared.radius >= 0 && shared.radius <= 4) {
		sharedVars.radius = shared.radius + 'rem';
	}
	if (typeof shared.uiFont === 'string' && Object.hasOwn(fonts.ui, shared.uiFont)) {
		sharedVars['ui-font'] = String(fonts.ui[shared.uiFont]);
	}
	if (typeof shared.arabicFont === 'string' && Object.hasOwn(fonts.arabic, shared.arabicFont)) {
		sharedVars['arabic-font'] = String(fonts.arabic[shared.arabicFont]);
	}

	return (
		block('html:root', sharedVars) +
		block('html:not(.dark)', source.light) +
		block('html.dark', source.dark)
	);
}

function formatRadius(rem: number) {
	return `${Number(rem.toFixed(3))}rem`;
}

/** Full theme as CSS in the same shape as `layout.css`, ready to paste. */
export function themeToCss(theme: Theme): string {
	const colorLines = (mode: Mode) =>
		COLOR_TOKENS.map((token) => `\t--${token}: ${theme[mode][token]};`).join('\n');
	const shared = [
		`\t--radius: ${formatRadius(theme.shared.radius)};`,
		`\t--ui-font: ${UI_FONTS[theme.shared.uiFont].stack};`,
		`\t--arabic-font: ${ARABIC_FONTS[theme.shared.arabicFont].stack};`
	].join('\n');
	return `:root {\n${colorLines('light')}\n${shared}\n}\n\n.dark {\n${colorLines('dark')}\n}\n`;
}

export type ParsedThemeCss = ThemeOverrides & { ignored: string[] };

const LIGHT_SELECTORS = new Set([':root', 'html', 'html:root', ':root:not(.dark)']);
const DARK_SELECTORS = new Set(['.dark', 'html.dark', ':root.dark']);

/** Accepts shadcn v3 style bare HSL channels (`222.2 84% 4.9%`) as well as normal colours. */
export function normaliseColor(value: string): string | null {
	const trimmed = value.trim().replace(/\s*!important$/i, '');
	if (isValidColor(trimmed)) return trimmed;
	if (/^[\d.]+(deg)?\s+[\d.]+%\s+[\d.]+%(\s*\/\s*[\d.]+%?)?$/.test(trimmed)) {
		const wrapped = `hsl(${trimmed})`;
		if (isValidColor(wrapped)) return wrapped;
	}
	return null;
}

function parseRadius(value: string): number | null {
	const match = /^([\d.]+)(rem|px)?$/.exec(value.trim());
	if (!match) return null;
	let rem = Number(match[1]);
	if (!Number.isFinite(rem)) return null;
	if (match[2] === 'px') rem = rem / 16;
	if (rem < RADIUS_MIN || rem > RADIUS_MAX) return null;
	return Number(rem.toFixed(3));
}

function firstFamily(value: string) {
	return (
		value
			.split(',')[0]
			?.trim()
			.replace(/^['"]|['"]$/g, '')
			.toLowerCase() ?? ''
	);
}

function matchFont<T extends string>(
	value: string,
	fonts: Record<T, { label: string; stack: string }>
): T | null {
	const family = firstFamily(value);
	for (const [id, font] of Object.entries(fonts) as [T, { label: string; stack: string }][]) {
		const stackFamily = firstFamily(font.stack).replace(/ variable$/, '');
		if (family === stackFamily || family === `${stackFamily} variable`) return id;
		if (family === font.label.toLowerCase()) return id;
	}
	return null;
}

/**
 * Reads theme variables from pasted CSS (`:root { ... }` and `.dark { ... }` blocks).
 * Unknown variables and invalid values are reported in `ignored` and never applied.
 * Shared values (radius, fonts) are read from the light block.
 */
export function parseThemeCss(input: string): ParsedThemeCss {
	const result: ParsedThemeCss = { ...emptyOverrides(), ignored: [] };
	const css = input.replace(/\/\*[\s\S]*?\*\//g, '');
	// The selector stops at `;` so preceding at-rules (`@import ...;`) are not part of it.
	const ruleRe = /([^{};]+)\{([^{}]*)\}/g;

	for (const match of css.matchAll(ruleRe)) {
		const selectors = (match[1] ?? '')
			.trim()
			.split(',')
			.map((s) => s.trim().replace(/\s+/g, ' '));
		const isDark = selectors.some((s) => DARK_SELECTORS.has(s));
		const isLight = !isDark && selectors.some((s) => LIGHT_SELECTORS.has(s));
		if (!isDark && !isLight) continue;
		const mode: Mode = isDark ? 'dark' : 'light';

		for (const declaration of (match[2] ?? '').split(';')) {
			const colon = declaration.indexOf(':');
			if (colon === -1) continue;
			const name = declaration.slice(0, colon).trim();
			const value = declaration.slice(colon + 1).trim();
			if (!name.startsWith('--') || !value) continue;
			const key = name.slice(2);

			if (isColorToken(key)) {
				const color = normaliseColor(value);
				if (color) result[mode][key as ColorToken] = color;
				else result.ignored.push(`${name} (${mode})`);
				continue;
			}

			if (mode === 'light' && key === 'radius') {
				const radius = parseRadius(value);
				if (radius !== null) result.shared.radius = radius;
				else result.ignored.push(name);
				continue;
			}
			if (mode === 'light' && (key === 'ui-font' || key === 'font-sans')) {
				const id = matchFont<UiFontId>(value, UI_FONTS);
				if (id && isUiFontId(id)) result.shared.uiFont = id;
				else result.ignored.push(name);
				continue;
			}
			if (mode === 'light' && key === 'arabic-font') {
				const id = matchFont<ArabicFontId>(value, ARABIC_FONTS);
				if (id && isArabicFontId(id)) result.shared.arabicFont = id;
				else result.ignored.push(name);
				continue;
			}
			result.ignored.push(name);
		}
	}
	return result;
}

export const countParsed = (parsed: ThemeOverrides) =>
	Object.keys(parsed.light).length +
	Object.keys(parsed.dark).length +
	Object.keys(parsed.shared).length;
