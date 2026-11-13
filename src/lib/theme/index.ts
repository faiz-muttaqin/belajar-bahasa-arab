// Public theme API for the rest of the app. See docs/decisions/0003-default-theme-and-editor.md.
//
// Root layout integration:
//   <svelte:head>{@html themeInitScriptTag}</svelte:head>   (no flash on load)
//   onMount(() => themeMode.start());                        (OS changes, other tabs)
// Header toggle: read `themeMode.preference` / `themeMode.resolved`, call `themeMode.set(...)`,
// or reuse `#lib/components/theme-editor/ModeSwitcher.svelte`.

export { themeMode, type ThemeModeState } from './mode.svelte.js';
export { themeInitScriptTag } from './runtime.js';
export { MODE_LABELS, MODE_PREFERENCES, type Mode, type ModePreference } from './tokens.js';
