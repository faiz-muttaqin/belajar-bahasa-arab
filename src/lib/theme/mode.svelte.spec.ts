import { afterEach, describe, expect, it } from 'vitest';
import { themeMode } from './mode.svelte.js';
import { THEME_STORAGE_KEY } from './storage.js';

describe('themeMode (browser)', () => {
	afterEach(() => {
		localStorage.clear();
		document.documentElement.classList.remove('dark');
	});

	it('applies and saves a preference', () => {
		expect(themeMode.set('dark')).toBe(true);
		expect(themeMode.preference).toBe('dark');
		expect(themeMode.resolved).toBe('dark');
		expect(document.documentElement.classList.contains('dark')).toBe(true);
		expect(document.documentElement.style.colorScheme).toBe('dark');
		expect(JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) ?? '{}').mode).toBe('dark');

		themeMode.set('system');
		// Back to defaults: nothing left to store.
		expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
	});

	it('keeps saved colour overrides when the mode changes', () => {
		localStorage.setItem(
			THEME_STORAGE_KEY,
			JSON.stringify({
				version: 1,
				mode: 'system',
				overrides: { light: { primary: '#123456' }, dark: {}, shared: {} }
			})
		);
		themeMode.set('light');
		const saved = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) ?? '{}');
		expect(saved).toMatchObject({ mode: 'light', overrides: { light: { primary: '#123456' } } });
	});

	it('reads the saved preference on start and can be started more than once', () => {
		localStorage.setItem(
			THEME_STORAGE_KEY,
			JSON.stringify({ version: 1, mode: 'light', overrides: {} })
		);
		const stopA = themeMode.start();
		const stopB = themeMode.start();
		expect(themeMode.preference).toBe('light');
		stopA();
		stopB();
		stopB();
	});
});
