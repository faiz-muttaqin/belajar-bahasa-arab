// Themes a visitor saved under their own name ("Tema saya"), kept in localStorage.
// Same rules as the active theme: versioned key, validated on read, never throws.

import type { ThemeOverrides } from './css.js';
import { isRecord, sanitiseOverrides, type StorageLike } from './storage.js';

export const SAVED_THEMES_VERSION = 1;
export const SAVED_THEMES_KEY = `belajar-bahasa-arab:saved-themes:v${SAVED_THEMES_VERSION}`;
export const SAVED_THEMES_LIMIT = 12;
export const SAVED_THEME_NAME_MAX = 40;

export type SavedTheme = {
	id: string;
	name: string;
	/** ISO 8601 */
	savedAt: string;
	overrides: ThemeOverrides;
};

export function cleanThemeName(name: string): string {
	return name.replace(/\s+/g, ' ').trim().slice(0, SAVED_THEME_NAME_MAX);
}

export function parseSavedThemes(data: unknown): SavedTheme[] {
	if (!isRecord(data) || data.version !== SAVED_THEMES_VERSION || !Array.isArray(data.themes)) {
		return [];
	}
	const themes: SavedTheme[] = [];
	const ids = new Set<string>();
	for (const item of data.themes) {
		if (!isRecord(item)) continue;
		const name = typeof item.name === 'string' ? cleanThemeName(item.name) : '';
		const id = typeof item.id === 'string' ? item.id.slice(0, 64) : '';
		if (!name || !id || ids.has(id)) continue;
		const savedAt =
			typeof item.savedAt === 'string' && !Number.isNaN(Date.parse(item.savedAt))
				? item.savedAt
				: new Date(0).toISOString();
		ids.add(id);
		themes.push({ id, name, savedAt, overrides: sanitiseOverrides(item.overrides) });
		if (themes.length >= SAVED_THEMES_LIMIT) break;
	}
	return themes;
}

export function readSavedThemes(storage: StorageLike | null): SavedTheme[] {
	if (!storage) return [];
	try {
		const raw = storage.getItem(SAVED_THEMES_KEY);
		return raw ? parseSavedThemes(JSON.parse(raw)) : [];
	} catch {
		return [];
	}
}

export function writeSavedThemes(storage: StorageLike | null, themes: SavedTheme[]): boolean {
	if (!storage) return false;
	try {
		if (themes.length === 0) storage.removeItem(SAVED_THEMES_KEY);
		else
			storage.setItem(SAVED_THEMES_KEY, JSON.stringify({ version: SAVED_THEMES_VERSION, themes }));
		return true;
	} catch {
		return false;
	}
}

export type AddResult =
	{ ok: true; themes: SavedTheme[]; replaced: boolean } | { ok: false; reason: 'empty' | 'full' };

/**
 * Adds a theme to the front of the list. Saving under an existing name (case-insensitive)
 * replaces that entry instead of creating a duplicate.
 */
export function addSavedTheme(
	themes: SavedTheme[],
	name: string,
	overrides: ThemeOverrides,
	now = new Date(),
	id = `t${now.getTime().toString(36)}${Math.random().toString(36).slice(2, 6)}`
): AddResult {
	const clean = cleanThemeName(name);
	if (!clean) return { ok: false, reason: 'empty' };
	const existing = themes.find((t) => t.name.toLowerCase() === clean.toLowerCase());
	const others = themes.filter((t) => t !== existing);
	if (!existing && themes.length >= SAVED_THEMES_LIMIT) return { ok: false, reason: 'full' };
	const entry: SavedTheme = {
		id: existing?.id ?? id,
		name: clean,
		savedAt: now.toISOString(),
		overrides: structuredClone(overrides)
	};
	return { ok: true, themes: [entry, ...others], replaced: !!existing };
}
