// Versioned, defensive persistence for theme preferences in `localStorage`.
// Storage can be missing (prerender, private mode, blocked site data) or full; every
// access is wrapped so the site keeps working with the default theme.

import { normaliseColor, type ThemeOverrides } from './css.js';
import {
	MODE_PREFERENCES,
	RADIUS_MAX,
	RADIUS_MIN,
	isArabicFontId,
	isColorToken,
	isUiFontId,
	type ColorToken,
	type ModePreference
} from './tokens.js';

export const THEME_STORAGE_VERSION = 1;
/** The version is part of the key so an incompatible future format never misreads old data. */
export const THEME_STORAGE_KEY = `belajar-bahasa-arab:theme:v${THEME_STORAGE_VERSION}`;

export type StoredTheme = {
	version: typeof THEME_STORAGE_VERSION;
	mode: ModePreference;
	overrides: ThemeOverrides;
};

export const defaultStoredTheme = (): StoredTheme => ({
	version: THEME_STORAGE_VERSION,
	mode: 'system',
	overrides: { light: {}, dark: {}, shared: {} }
});

export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

/** Returns `localStorage` if it can actually be used, otherwise null. */
export function getBrowserStorage(): StorageLike | null {
	try {
		if (typeof window === 'undefined' || !window.localStorage) return null;
		const probe = `${THEME_STORAGE_KEY}:probe`;
		window.localStorage.setItem(probe, '1');
		window.localStorage.removeItem(probe);
		return window.localStorage;
	} catch {
		return null;
	}
}

export const isRecord = (value: unknown): value is Record<string, unknown> =>
	!!value && typeof value === 'object' && !Array.isArray(value);

function sanitiseColors(value: unknown): Partial<Record<ColorToken, string>> {
	const out: Partial<Record<ColorToken, string>> = {};
	if (!isRecord(value)) return out;
	for (const [key, raw] of Object.entries(value)) {
		if (!isColorToken(key) || typeof raw !== 'string') continue;
		const color = normaliseColor(raw);
		if (color) out[key] = color;
	}
	return out;
}

/** Keeps only known tokens with valid values; used for every override read from storage. */
export function sanitiseOverrides(value: unknown): ThemeOverrides {
	const overrides = isRecord(value) ? value : {};
	const result: ThemeOverrides = {
		light: sanitiseColors(overrides.light),
		dark: sanitiseColors(overrides.dark),
		shared: {}
	};
	const shared = isRecord(overrides.shared) ? overrides.shared : {};
	if (
		typeof shared.radius === 'number' &&
		Number.isFinite(shared.radius) &&
		shared.radius >= RADIUS_MIN &&
		shared.radius <= RADIUS_MAX
	) {
		result.shared.radius = shared.radius;
	}
	if (isUiFontId(shared.uiFont)) result.shared.uiFont = shared.uiFont;
	if (isArabicFontId(shared.arabicFont)) result.shared.arabicFont = shared.arabicFont;
	return result;
}

/**
 * Validates unknown data into a `StoredTheme`. Anything unrecognised is dropped,
 * so a corrupted or hand-edited entry degrades to defaults instead of breaking pages.
 * Returns null when the data is not a version this code understands.
 */
export function parseStoredTheme(data: unknown): StoredTheme | null {
	if (!isRecord(data) || data.version !== THEME_STORAGE_VERSION) return null;
	const stored = defaultStoredTheme();
	if (typeof data.mode === 'string' && MODE_PREFERENCES.includes(data.mode as ModePreference)) {
		stored.mode = data.mode as ModePreference;
	}
	stored.overrides = sanitiseOverrides(data.overrides);
	return stored;
}

/** Reads saved preferences, falling back to defaults on any problem. */
export function readStoredTheme(storage: StorageLike | null): StoredTheme {
	if (!storage) return defaultStoredTheme();
	try {
		const raw = storage.getItem(THEME_STORAGE_KEY);
		if (!raw) return defaultStoredTheme();
		return parseStoredTheme(JSON.parse(raw)) ?? defaultStoredTheme();
	} catch {
		return defaultStoredTheme();
	}
}

/** Saves preferences. Removes the entry when everything is default. Returns false on failure. */
export function writeStoredTheme(storage: StorageLike | null, theme: StoredTheme): boolean {
	if (!storage) return false;
	try {
		const isDefault =
			theme.mode === 'system' &&
			Object.keys(theme.overrides.light).length === 0 &&
			Object.keys(theme.overrides.dark).length === 0 &&
			Object.keys(theme.overrides.shared).length === 0;
		if (isDefault) storage.removeItem(THEME_STORAGE_KEY);
		else storage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
		return true;
	} catch {
		return false;
	}
}
