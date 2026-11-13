import { describe, expect, it } from 'vitest';
import {
	THEME_STORAGE_KEY,
	defaultStoredTheme,
	parseStoredTheme,
	readStoredTheme,
	writeStoredTheme,
	type StoredTheme
} from './storage.js';

function memoryStorage(initial: Record<string, string> = {}) {
	const data = new Map(Object.entries(initial));
	return {
		data,
		getItem: (key: string) => data.get(key) ?? null,
		setItem: (key: string, value: string) => void data.set(key, value),
		removeItem: (key: string) => void data.delete(key)
	};
}

const throwingStorage = {
	getItem: () => {
		throw new Error('blocked');
	},
	setItem: () => {
		throw new Error('quota');
	},
	removeItem: () => {
		throw new Error('blocked');
	}
};

const custom: StoredTheme = {
	version: 1,
	mode: 'dark',
	overrides: { light: { primary: '#123456' }, dark: {}, shared: { radius: 1, arabicFont: 'amiri' } }
};

describe('theme storage', () => {
	it('uses a versioned key', () => {
		expect(THEME_STORAGE_KEY).toMatch(/:v1$/);
	});

	it('falls back to defaults without storage, when empty, or when corrupt', () => {
		expect(readStoredTheme(null)).toEqual(defaultStoredTheme());
		expect(readStoredTheme(memoryStorage())).toEqual(defaultStoredTheme());
		expect(readStoredTheme(memoryStorage({ [THEME_STORAGE_KEY]: '{not json' }))).toEqual(
			defaultStoredTheme()
		);
		expect(readStoredTheme(throwingStorage)).toEqual(defaultStoredTheme());
	});

	it('round-trips saved preferences', () => {
		const storage = memoryStorage();
		expect(writeStoredTheme(storage, custom)).toBe(true);
		expect(readStoredTheme(storage)).toEqual(custom);
	});

	it('removes the entry when everything is back to default', () => {
		const storage = memoryStorage();
		writeStoredTheme(storage, custom);
		writeStoredTheme(storage, defaultStoredTheme());
		expect(storage.data.has(THEME_STORAGE_KEY)).toBe(false);
	});

	it('reports failure instead of throwing when storage is blocked or full', () => {
		expect(writeStoredTheme(throwingStorage, custom)).toBe(false);
		expect(writeStoredTheme(null, custom)).toBe(false);
	});

	it('rejects unknown versions', () => {
		expect(parseStoredTheme({ ...custom, version: 2 })).toBeNull();
		expect(parseStoredTheme({ mode: 'dark' })).toBeNull();
		expect(parseStoredTheme(null)).toBeNull();
	});

	it('drops invalid fields but keeps valid ones', () => {
		const parsed = parseStoredTheme({
			version: 1,
			mode: 'sepia',
			overrides: {
				light: { primary: '#123456', background: 'red; }', 'not-a-token': '#fff' },
				dark: ['#000'],
				shared: { radius: 99, uiFont: 'comic-sans', arabicFont: 'amiri' }
			}
		});
		expect(parsed).toEqual({
			version: 1,
			mode: 'system',
			overrides: { light: { primary: '#123456' }, dark: {}, shared: { arabicFont: 'amiri' } }
		});
	});
});
