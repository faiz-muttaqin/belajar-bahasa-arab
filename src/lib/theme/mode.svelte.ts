// Shared light / dark / system state. One instance for the whole app, so a header
// toggle and the theme editor always agree.
//
// Usage (root layout):
//   onMount(() => themeMode.start());
//   themeMode.preference   // 'light' | 'dark' | 'system'
//   themeMode.resolved     // 'light' | 'dark' (what is shown now)
//   themeMode.set('dark')  // applies and saves

import {
	DARK_QUERY,
	applyMode,
	applyOverrides,
	resolveMode,
	systemPrefersDark
} from './runtime.js';
import {
	THEME_STORAGE_KEY,
	getBrowserStorage,
	readStoredTheme,
	writeStoredTheme
} from './storage.js';
import type { Mode, ModePreference } from './tokens.js';

export class ThemeModeState {
	/** The saved choice. Defaults to `system` (also during prerender). */
	preference = $state<ModePreference>('system');
	systemDark = $state(false);
	/** The mode actually shown. */
	resolved: Mode = $derived(resolveMode(this.preference, this.systemDark));
	/** Increases when another tab changes the saved theme, so editors can reload. */
	externalRevision = $state(0);

	#users = 0;
	#stop: (() => void) | null = null;

	/**
	 * Reads the saved preference and starts following OS colour scheme changes and other
	 * tabs. Browser only; safe to call from several components (reference counted).
	 * Returns a cleanup function, so it can be returned from `onMount` directly.
	 */
	start(): () => void {
		if (typeof window === 'undefined') return () => {};
		this.#users++;
		if (this.#users === 1) this.#stop = this.#listen();
		else this.#read();

		let stopped = false;
		return () => {
			if (stopped) return;
			stopped = true;
			this.#users--;
			if (this.#users === 0) {
				this.#stop?.();
				this.#stop = null;
			}
		};
	}

	/** Applies and saves a preference. Returns false if it could not be saved. */
	set(preference: ModePreference): boolean {
		this.preference = preference;
		this.systemDark = systemPrefersDark();
		applyMode(preference);
		const storage = getBrowserStorage();
		return writeStoredTheme(storage, { ...readStoredTheme(storage), mode: preference });
	}

	#read() {
		const stored = readStoredTheme(getBrowserStorage());
		this.preference = stored.mode;
		this.systemDark = systemPrefersDark();
		return stored;
	}

	#listen() {
		this.#read();
		const media = window.matchMedia?.(DARK_QUERY);
		const onSystem = () => {
			this.systemDark = !!media?.matches;
			applyMode(this.preference);
		};
		const onStorage = (event: StorageEvent) => {
			if (event.key !== null && event.key !== THEME_STORAGE_KEY) return;
			const stored = this.#read();
			applyMode(stored.mode);
			applyOverrides(stored.overrides);
			this.externalRevision++;
		};
		media?.addEventListener('change', onSystem);
		window.addEventListener('storage', onStorage);
		return () => {
			media?.removeEventListener('change', onSystem);
			window.removeEventListener('storage', onStorage);
		};
	}
}

export const themeMode = new ThemeModeState();
