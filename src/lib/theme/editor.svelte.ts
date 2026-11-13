// Reactive state for the theme editor page. Domain logic lives in the plain modules
// next to this file; this class only wires them to Svelte 5 runes.

import {
	applyOverrides as layerOverrides,
	diffTheme,
	hasOverrides,
	type ThemeOverrides
} from './css.js';
import { History } from './history.js';
import { themeMode } from './mode.svelte.js';
import { applyOverrides } from './runtime.js';
import { getBrowserStorage, readStoredTheme, writeStoredTheme } from './storage.js';
import {
	DEFAULT_THEME,
	cloneTheme,
	type ColorToken,
	type Mode,
	type SharedTokens,
	type Theme
} from './tokens.js';

export class ThemeEditor {
	theme = $state<Theme>(cloneTheme(DEFAULT_THEME));
	/** False until saved preferences are loaded on the client. */
	ready = $state(false);
	/** Set when saving fails (for example storage is full or blocked). */
	storageAvailable = $state(true);

	#history = new History<Theme>();
	#historyVersion = $state(0);

	/** The mode being shown and edited; shared with the rest of the app via `themeMode`. */
	resolvedMode: Mode = $derived(themeMode.resolved);
	overrides: ThemeOverrides = $derived(diffTheme(this.theme));
	isCustomised = $derived(hasOverrides(this.overrides));
	canUndo = $derived(this.#historyVersion >= 0 && this.#history.canUndo);
	canRedo = $derived(this.#historyVersion >= 0 && this.#history.canRedo);

	/** Loads saved preferences. Call from `onMount` (browser only). */
	load() {
		const storage = getBrowserStorage();
		this.storageAvailable = storage !== null;
		const stored = readStoredTheme(storage);
		this.theme = layerOverrides(stored.overrides);
		this.ready = true;
	}

	/** Re-reads storage after a change in another tab. */
	reload() {
		this.load();
		this.#history.clear();
		this.#historyVersion++;
	}

	/** Applies the current colours to the document and saves them (mode is kept as saved). */
	sync() {
		// Before `load()` the state is still the SSR default; touching the document
		// now would undo the inline init script and cause the flash it prevents.
		if (!this.ready) return;
		applyOverrides(this.overrides);
		const storage = getBrowserStorage();
		const saved = writeStoredTheme(storage, {
			version: 1,
			mode: readStoredTheme(storage).mode,
			overrides: $state.snapshot(this.overrides) as ThemeOverrides
		});
		this.storageAvailable = saved;
	}

	#change(field: string | null, update: (draft: Theme) => void) {
		const before = $state.snapshot(this.theme) as Theme;
		const draft = cloneTheme(before);
		update(draft);
		if (JSON.stringify(draft) === JSON.stringify(before)) return;
		this.#history.record(before, field);
		this.#historyVersion++;
		this.theme = draft;
	}

	setColor(mode: Mode, token: ColorToken, value: string) {
		this.#change(`${mode}:${token}`, (draft) => {
			draft[mode][token] = value;
		});
	}

	setShared<K extends keyof SharedTokens>(key: K, value: SharedTokens[K]) {
		this.#change(`shared:${key}`, (draft) => {
			draft.shared[key] = value;
		});
	}

	/** Replaces values from an import. One undo step. */
	merge(overrides: ThemeOverrides) {
		this.#change(null, (draft) => {
			Object.assign(draft.light, overrides.light);
			Object.assign(draft.dark, overrides.dark);
			Object.assign(draft.shared, overrides.shared);
		});
	}

	/** Replaces the whole theme (a preset or a saved theme). One undo step. */
	applyTheme(theme: Theme) {
		this.#change(null, (draft) => {
			const fresh = cloneTheme(theme);
			draft.light = fresh.light;
			draft.dark = fresh.dark;
			draft.shared = fresh.shared;
		});
	}

	/** Back to the site default. Undoable, so an accidental reset is not destructive. */
	reset() {
		this.#change(null, (draft) => {
			const fresh = cloneTheme(DEFAULT_THEME);
			draft.light = fresh.light;
			draft.dark = fresh.dark;
			draft.shared = fresh.shared;
		});
	}

	/** Resets one mode's colours only. */
	resetMode(mode: Mode) {
		this.#change(null, (draft) => {
			draft[mode] = { ...DEFAULT_THEME[mode] };
		});
	}

	undo() {
		const previous = this.#history.undo($state.snapshot(this.theme) as Theme);
		if (previous) {
			this.theme = previous;
			this.#historyVersion++;
		}
	}

	redo() {
		const next = this.#history.redo($state.snapshot(this.theme) as Theme);
		if (next) {
			this.theme = next;
			this.#historyVersion++;
		}
	}
}
