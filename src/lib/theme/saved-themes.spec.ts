import { describe, expect, it } from 'vitest';
import {
	SAVED_THEMES_KEY,
	SAVED_THEMES_LIMIT,
	addSavedTheme,
	parseSavedThemes,
	readSavedThemes,
	writeSavedThemes,
	type SavedTheme
} from './saved-themes.js';

const overrides = { light: { primary: '#123456' }, dark: {}, shared: { radius: 1 } };
const now = new Date('2026-11-13T10:00:00Z');

function memoryStorage() {
	const data = new Map<string, string>();
	return {
		data,
		getItem: (k: string) => data.get(k) ?? null,
		setItem: (k: string, v: string) => void data.set(k, v),
		removeItem: (k: string) => void data.delete(k)
	};
}

describe('saved themes', () => {
	it('adds, persists and reads back', () => {
		const result = addSavedTheme([], '  Tema   malam ', overrides, now, 'a');
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.themes[0]).toMatchObject({
			id: 'a',
			name: 'Tema malam',
			savedAt: now.toISOString()
		});

		const storage = memoryStorage();
		expect(writeSavedThemes(storage, result.themes)).toBe(true);
		expect(readSavedThemes(storage)).toEqual(result.themes);
	});

	it('replaces a theme saved under the same name', () => {
		const first = addSavedTheme([], 'Saya', overrides, now, 'a');
		if (!first.ok) throw new Error();
		const second = addSavedTheme(
			first.themes,
			'saya',
			{ light: {}, dark: {}, shared: {} },
			now,
			'b'
		);
		expect(second).toMatchObject({ ok: true, replaced: true });
		if (!second.ok) return;
		expect(second.themes).toHaveLength(1);
		expect(second.themes[0]?.id).toBe('a');
	});

	it('refuses empty names and a full list', () => {
		expect(addSavedTheme([], '   ', overrides)).toEqual({ ok: false, reason: 'empty' });
		const full: SavedTheme[] = Array.from({ length: SAVED_THEMES_LIMIT }, (_, i) => ({
			id: `id${i}`,
			name: `Tema ${i}`,
			savedAt: now.toISOString(),
			overrides
		}));
		expect(addSavedTheme(full, 'Baru', overrides)).toEqual({ ok: false, reason: 'full' });
	});

	it('drops invalid entries and unknown versions', () => {
		expect(parseSavedThemes({ version: 2, themes: [] })).toEqual([]);
		const parsed = parseSavedThemes({
			version: 1,
			themes: [
				{
					id: 'a',
					name: 'Baik',
					savedAt: 'not a date',
					overrides: { light: { primary: 'red; }' } }
				},
				{ id: 'a', name: 'Duplikat id' },
				{ id: 'b', name: '' },
				'junk'
			]
		});
		expect(parsed).toEqual([
			{
				id: 'a',
				name: 'Baik',
				savedAt: new Date(0).toISOString(),
				overrides: { light: {}, dark: {}, shared: {} }
			}
		]);
	});

	it('removes the key when the list is empty and survives broken storage', () => {
		const storage = memoryStorage();
		storage.setItem(SAVED_THEMES_KEY, '{oops');
		expect(readSavedThemes(storage)).toEqual([]);
		writeSavedThemes(storage, []);
		expect(storage.data.has(SAVED_THEMES_KEY)).toBe(false);
		expect(readSavedThemes(null)).toEqual([]);
		expect(writeSavedThemes(null, [])).toBe(false);
	});
});
