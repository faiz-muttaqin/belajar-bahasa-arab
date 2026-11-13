// Browser-side theme application, shared by the root layout and the theme editor.
// The inline script (`themeInitScript`) runs before first paint; the functions below
// keep the page in sync afterwards (system changes, other tabs, live editing).

import { FONT_STACKS, overridesToCss, type ThemeOverrides } from './css.js';
import {
	THEME_STORAGE_KEY,
	THEME_STORAGE_VERSION,
	getBrowserStorage,
	readStoredTheme
} from './storage.js';
import type { Mode, ModePreference } from './tokens.js';

export const OVERRIDES_STYLE_ID = 'theme-overrides';
const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * Runs inline in `<head>` before the body is parsed, so a saved theme is in place
 * before first paint. Must stay self-contained: it is serialised with `toString()`.
 */
export function initTheme(
	key: string,
	version: number,
	styleId: string,
	fonts: unknown,
	toCss: (overrides: unknown, fonts: unknown) => string
) {
	try {
		let mode = 'system';
		let overrides: unknown = null;
		try {
			const raw = window.localStorage.getItem(key);
			const data = raw ? JSON.parse(raw) : null;
			if (data && data.version === version) {
				if (data.mode === 'light' || data.mode === 'dark') mode = data.mode;
				overrides = data.overrides;
			}
		} catch {
			// Storage unavailable or corrupt: fall back to the default theme.
		}
		const dark =
			mode === 'dark' ||
			(mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', dark);
		const css = overrides ? toCss(overrides, fonts) : '';
		if (css) {
			const style = document.createElement('style');
			style.id = styleId;
			style.textContent = css;
			document.head.appendChild(style);
		}
	} catch {
		// Never block rendering because of theming.
	}
}

/** Inline script source. A literal `</script` is neutralised so it cannot end the element early. */
export const themeInitScript =
	`(${initTheme.toString()})(${JSON.stringify(THEME_STORAGE_KEY)}, ${THEME_STORAGE_VERSION}, ${JSON.stringify(OVERRIDES_STYLE_ID)}, ${JSON.stringify(FONT_STACKS)}, ${overridesToCss.toString()});`.replace(
		/<\/(script)/gi,
		'<\\/$1'
	);

/** Complete `<script>` element for `<svelte:head>`. Built here because a literal tag in a .svelte template confuses tooling. */
export const themeInitScriptTag = '<' + 'script>' + themeInitScript + '</' + 'script>';

export const systemPrefersDark = () =>
	typeof window !== 'undefined' && !!window.matchMedia?.(DARK_QUERY).matches;

export const resolveMode = (preference: ModePreference, systemDark: boolean): Mode =>
	preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;

export function applyMode(preference: ModePreference) {
	if (typeof document === 'undefined') return;
	const dark = resolveMode(preference, systemPrefersDark()) === 'dark';
	document.documentElement.classList.toggle('dark', dark);
}

export function applyOverrides(overrides: ThemeOverrides) {
	if (typeof document === 'undefined') return;
	const css = overridesToCss(overrides, FONT_STACKS);
	let style = document.getElementById(OVERRIDES_STYLE_ID) as HTMLStyleElement | null;
	if (!css) {
		style?.remove();
		return;
	}
	if (!style) {
		style = document.createElement('style');
		style.id = OVERRIDES_STYLE_ID;
		document.head.appendChild(style);
	}
	if (style.textContent !== css) style.textContent = css;
}

/**
 * Keeps the document in sync with saved preferences: follows the OS colour scheme
 * while the preference is "system", and picks up changes made in other tabs.
 * Returns a cleanup function.
 */
export function startThemeSync(onChange?: () => void): () => void {
	if (typeof window === 'undefined') return () => {};
	const media = window.matchMedia?.(DARK_QUERY);

	const reapply = () => {
		const stored = readStoredTheme(getBrowserStorage());
		applyMode(stored.mode);
		applyOverrides(stored.overrides);
		onChange?.();
	};
	const onSystemChange = () => {
		if (readStoredTheme(getBrowserStorage()).mode === 'system') reapply();
	};
	const onStorage = (event: StorageEvent) => {
		if (event.key === null || event.key === THEME_STORAGE_KEY) reapply();
	};

	media?.addEventListener('change', onSystemChange);
	window.addEventListener('storage', onStorage);
	return () => {
		media?.removeEventListener('change', onSystemChange);
		window.removeEventListener('storage', onStorage);
	};
}
