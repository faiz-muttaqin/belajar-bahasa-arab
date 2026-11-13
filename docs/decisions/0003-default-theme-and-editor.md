# ADR-003: Default theme and theme editor

**Status:** accepted
**Date:** 13 November 2026

## Context

`layout.css` shipped the neutral shadcn `vega` preset, and the stack guide (section 8) proposed project tokens without a contrast audit. We also want visitors to adjust the look themselves without a server, and maintainers to have a tool for trying palettes and exporting them. The editor is ported from the microblog theme editor (React, `src/features/editor-theme`), not copied: that code depends on React, zustand, culori and a remote API.

## Decision: default theme

A calm, content-first palette for long reading sessions and Arabic script:

- **Warm paper background** (`#fbfaf7`) instead of pure white, to reduce glare, with the guide's near-black blue-grey text (`#17212d`).
- **One deep green brand colour.** The guide's accent `#176B56` becomes shadcn's `primary`. In shadcn, `accent` means a subtle hover or highlight surface, not the brand colour. The green is deepened to `#145f4c` because the Button hover state (`bg-primary/80`) with white text measured only 4.16:1 at `#176B56`; at `#145f4c` it is 4.72:1. Dark mode keeps the guide's `#7ad4b0`.
- **Dark mode on a green-tinted near-black** (`#111715`) with off-white text (`#e8ece9`), not pure white, to limit halation around thin strokes and harakat.
- **Chart colours** are muted and distinct in hue (green, blue, ochre, violet, terracotta), each at least 3:1 against the background.
- **Input borders** reach 3:1 against the page (WCAG 1.4.11). Decorative `border` lines do not need to.
- **Fonts.** The Indonesian UI uses Plus Jakarta Sans (AGENTS.md). The default Arabic face is Noto Naskh Arabic, the first candidate in the stack guide (section 7). Amiri and Scheherazade New are available in the editor for the side-by-side comparison that section 7 asks for. Font choices are written to the standard Tailwind theme variables `--font-sans` and `--font-arabic`. Base typography and the site's `ArabicText` component belong to the app shell (see "Integration with the app shell").
- **Hex values.** Colours are written as hex because hex is readable, auditable and what native colour inputs use. The editor also accepts `rgb()`, `hsl()` and `oklch()`.

`DEFAULT_THEME` in `src/lib/theme/tokens.ts` is the single TypeScript source. This branch changes only the `:root` and `.dark` colour tokens in `layout.css`; `--radius` keeps its value. A unit test parses `layout.css` and fails if the colours or radius differ from `DEFAULT_THEME`.

### Palette

| Token                          | Light     | Dark      |
| ------------------------------ | --------- | --------- |
| `--background`                 | `#fbfaf7` | `#111715` |
| `--foreground`                 | `#17212d` | `#e8ece9` |
| `--card`                       | `#ffffff` | `#18201d` |
| `--card-foreground`            | `#17212d` | `#e8ece9` |
| `--popover`                    | `#ffffff` | `#1c2522` |
| `--popover-foreground`         | `#17212d` | `#e8ece9` |
| `--primary`                    | `#145f4c` | `#7ad4b0` |
| `--primary-foreground`         | `#ffffff` | `#0b2a20` |
| `--secondary`                  | `#eaf1ee` | `#22302b` |
| `--secondary-foreground`       | `#17302a` | `#e8ece9` |
| `--muted`                      | `#f1f1ec` | `#1e2825` |
| `--muted-foreground`           | `#56616b` | `#a2ada8` |
| `--accent`                     | `#ddefe7` | `#1f3b32` |
| `--accent-foreground`          | `#0f4a3b` | `#cdefe2` |
| `--destructive`                | `#a61e14` | `#f59d93` |
| `--border`                     | `#e1e4de` | `#2b3732` |
| `--input`                      | `#8a938e` | `#6b7873` |
| `--ring`                       | `#145f4c` | `#7ad4b0` |
| `--chart-1`                    | `#145f4c` | `#7ad4b0` |
| `--chart-2`                    | `#2f7fa3` | `#7cc0e0` |
| `--chart-3`                    | `#b7791f` | `#e8b661` |
| `--chart-4`                    | `#7a5ba6` | `#b9a2de` |
| `--chart-5`                    | `#c2554a` | `#ee9a8f` |
| `--sidebar`                    | `#f4f5f0` | `#151c19` |
| `--sidebar-foreground`         | `#17212d` | `#e8ece9` |
| `--sidebar-primary`            | `#145f4c` | `#7ad4b0` |
| `--sidebar-primary-foreground` | `#ffffff` | `#0b2a20` |
| `--sidebar-accent`             | `#e6eee9` | `#22302b` |
| `--sidebar-accent-foreground`  | `#17302a` | `#e8ece9` |
| `--sidebar-border`             | `#e1e4de` | `#2b3732` |
| `--sidebar-ring`               | `#145f4c` | `#7ad4b0` |

### Measured contrast (WCAG 2.2 AA)

The ratios are computed with the WCAG 2 relative luminance formula in `src/lib/theme/contrast.ts`, and `contrast.spec.ts` enforces them. They are rounded down, so a value shown as passing is never below the minimum. Text needs 4.5:1 (SC 1.4.3). UI parts and graphics need 3:1 (SC 1.4.11).

| Pair                                              | Kind | Minimum | Light   | Dark    |
| ------------------------------------------------- | ---- | ------- | ------- | ------- |
| `foreground` on `background`                      | text | 4.5:1   | 15.57:1 | 15.21:1 |
| `card-foreground` on `card`                       | text | 4.5:1   | 16.25:1 | 13.93:1 |
| `popover-foreground` on `popover`                 | text | 4.5:1   | 16.25:1 | 13.16:1 |
| `muted-foreground` on `background`                | text | 4.5:1   | 6.06:1  | 7.84:1  |
| `muted-foreground` on `muted`                     | text | 4.5:1   | 5.58:1  | 6.55:1  |
| `muted-foreground` on `card`                      | text | 4.5:1   | 6.32:1  | 7.18:1  |
| `primary-foreground` on `primary`                 | text | 4.5:1   | 7.57:1  | 8.68:1  |
| `primary` on `background`                         | text | 4.5:1   | 7.26:1  | 10.25:1 |
| `secondary-foreground` on `secondary`             | text | 4.5:1   | 12.27:1 | 11.53:1 |
| `accent-foreground` on `accent`                   | text | 4.5:1   | 8.51:1  | 9.85:1  |
| `destructive` on `background`                     | text | 4.5:1   | 7.14:1  | 8.75:1  |
| `sidebar-foreground` on `sidebar`                 | text | 4.5:1   | 14.83:1 | 14.52:1 |
| `sidebar-primary-foreground` on `sidebar-primary` | text | 4.5:1   | 7.57:1  | 8.68:1  |
| `sidebar-accent-foreground` on `sidebar-accent`   | text | 4.5:1   | 11.90:1 | 11.53:1 |
| `input` on `background`                           | ui   | 3:1     | 3.02:1  | 3.93:1  |
| `ring` on `background`                            | ui   | 3:1     | 7.26:1  | 10.25:1 |
| `chart-1` on `background`                         | ui   | 3:1     | 7.26:1  | 10.25:1 |
| `chart-2` on `background`                         | ui   | 3:1     | 4.29:1  | 9.05:1  |
| `chart-3` on `background`                         | ui   | 3:1     | 3.48:1  | 9.76:1  |
| `chart-4` on `background`                         | ui   | 3:1     | 5.19:1  | 8.02:1  |
| `chart-5` on `background`                         | ui   | 3:1     | 4.28:1  | 8.34:1  |

Interactive states, with translucent layers composited over the page:

| State                                                              | Light  | Dark   |
| ------------------------------------------------------------------ | ------ | ------ |
| `primary-foreground` on `primary/80` (button hover)                | 4.72:1 | 5.86:1 |
| `destructive` on its tinted hover background (20% light, 30% dark) | 5.03:1 | 4.68:1 |
| `ring/50` focus halo against the page                              | 2.35:1 | 3.48:1 |

The focus halo is only a supplement. On focus, shadcn controls also get a solid `border-ring`: 7.26:1 in light mode and 10.25:1 in dark mode. Editor-specific controls use a solid 2px `outline-ring`.

## Decision: theme editor (`/editor/theme/`)

- **Static and prerendered.** `build/editor/theme/index.html` contains the heading, the description, every control with its default value, the contrast report and the exported CSS. Without JavaScript the page is readable and the CSS can be copied. With JavaScript the page hydrates and edits apply live.
- **Persistence.** Choices are saved in `localStorage` under the versioned key `belajar-bahasa-arab:theme:v1`, with a `version` field.
  - Only overrides of the default are stored, so later changes to the default still reach someone who changed one colour.
  - Data is validated on read: unknown keys, invalid colours and out-of-range values are dropped.
  - The entry is removed once everything is back to default.
  - Every access is wrapped in `try/catch`, and the editor tells the user when storage is unavailable.
- **No flash on load.** An inline script in `<head>` (`themeInitScriptTag` from `src/lib/theme/runtime.ts`) reads storage before first paint. It sets `.dark` and `color-scheme`, and adds a `<style id="theme-overrides">`. The script is idempotent. For now only the editor page includes it; see the next section for adding it to the root layout.
  - The early script and the live editor share one CSS builder: `overridesToCss` is self-contained and is embedded with `toString()`.
  - The override selectors (`html:root`, `html:not(.dark)`, `html.dark`) win over the defaults whatever the element order in `<head>`, and light overrides never leak into dark mode.
- **Responsive navigation,** following the Material 3 window size classes and Apple HIG patterns:
  - phones: a bottom navigation bar with an icon and a label for each destination, targets of at least 48px and safe-area padding;
  - tablets (`md`): a left navigation rail;
  - desktop (`lg`): a left sidebar with labels and a two-column layout, with the preview pinned beside the controls.

  There are 5 destinations (Tema, Warna, Huruf, Pratinjau and Ekspor), which is the Material 3 maximum for a bottom bar. On phones, each preset group is a horizontal swipe row instead of a long stack of cards. Items are hash links, so they work without JavaScript. A skip link jumps to the content.

- **Accessibility.**
  - Every input has a label.
  - Invalid colour text is announced (`aria-invalid` plus an error message) and never applied.
  - Light, dark and system are native radio inputs.
  - Status messages use `role="status"`.
  - Smooth scrolling only happens when `prefers-reduced-motion` allows it.
  - Pass and fail are shown as text and an icon, not only by colour.
- **Scope.** The editor covers 20 theme presets and named saved themes (see below), colours per mode, corner radius, UI font, Arabic font, a contrast report, undo and redo, an undoable reset, and CSS import and export. These source features were left out:
  - presets, AI generation, and server save and share;
  - HSL bulk adjustment;
  - shadows, spacing and letter spacing. Our components do not use these tokens, and a live spacing change would also resize the editor itself.

## Integration with the app shell

The app shell (header, navigation, footer, typography and `ArabicText`) is being built separately on `main`. To keep the merge clean, this branch leaves `src/routes/+layout.svelte` and `src/routes/+page.svelte` unchanged. In `layout.css` it changes only the colour tokens. Everything theme-related lives in `src/lib/theme/`, and `src/lib/theme/index.ts` is the public API.

| Export                                       | Use                                                                                                                                                                                           |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `themeInitScriptTag`                         | `{@html themeInitScriptTag}` in the root layout's `<svelte:head>`. Applies the saved mode and colours before first paint. It is idempotent, so the copy in the editor page can stay.          |
| `themeMode.start()`                          | `onMount(() => themeMode.start())` in the root layout. Reads the saved preference, follows OS colour scheme changes and picks up other tabs. It is reference counted and returns its cleanup. |
| `themeMode.preference`, `themeMode.resolved` | Reactive state: `'light' \| 'dark' \| 'system'`, and the mode actually shown.                                                                                                                 |
| `themeMode.set(mode)`                        | Applies and saves a mode, keeping any saved colours. Use it for a header toggle.                                                                                                              |
| `MODE_LABELS`, `MODE_PREFERENCES`            | Indonesian labels (Terang, Gelap, Ikuti sistem). `ModeSwitcher.svelte` in `#lib/components/theme-editor/` is a ready, accessible radio group.                                                 |

The app shell still needs to do the following, otherwise the corresponding editor choices only show inside the editor:

1. **Site-wide no-flash and OS sync.** Add the script tag and `themeMode.start()` to the root layout.
2. **Selectable Arabic fonts on every page.** Import `src/lib/theme/fonts.css` once. It holds the `@font-face` rules for Noto Naskh Arabic, Amiri and Scheherazade New.
3. **Font choices that actually apply.** Read fonts through `var(--font-sans)` and `var(--font-arabic)`. The editor writes these variables on `html:root`. Tailwind's `@theme inline` copies a value into the utilities instead of referencing the variable, so either declare the two fonts in a plain `@theme` block, or have the utilities and base styles reference the variables.
4. **Nav entry.** Link to `/editor/theme/` (for example "Atur tampilan") from the shell's navigation.

## Decision: theme presets and saved themes

Visitors who have no starting point can pick from 20 ready-made themes (`src/lib/theme/presets.ts`). The editor's first section, "Pilihan tema", shows them in two groups:

- **"Hangat, nyaman di mata" (8 warm themes):** Kertas klasik, Teh susu, Lampu malam, Pasir, Madu, Senja hangat, Kayu manis and Kopi. Their light backgrounds are warm off-white or sepia (OKLCH hue 40 to 85), and their dark modes use warm browns instead of blue-black.
- **"Sejuk dan netral" (12 themes):** the default Hijau tenang, plus Biru laut, Langit pagi, Nila, Lavender lembut, Ungu anggur, Mawar lembut, Hijau zaitun, Hutan pinus, Mint teduh, Grafit and Kontras tinggi.

We call the warm themes "nyaman di mata" because they reduce glare and blue-tinted brightness. That is a comfort claim based on common reading-mode practice. It is not a measured health effect.

**Why not reuse the microblog presets.** All 63 microblog presets were run through the same audit. None passes WCAG AA in both modes:

- Every light mode fails at least the input border (1.0:1 to 2.9:1).
- Many fail muted text, button text or the destructive colour.

The new set takes its inspiration from the calmer families (Vintage Paper, Mocha, Ocean Breeze, Lavender Mist, Graphite and Mono). We left out themes named after brands or products, such as Twitter, Supabase, Vercel, T3 Chat and Claude.

**How the presets are built.** One hue and one chroma per theme, laid out in OKLCH with fixed lightness steps. The lightness of each text, UI and chart colour is then nudged until every audited pair passes with a small margin, including the button hover and destructive-tint states. `presets.spec.ts` runs the full contrast audit on all 20 themes in both modes.

Some presets also set the radius and fonts. For example, Kertas klasik and Lampu malam use Amiri, and Kontras tinggi uses Scheherazade New. These are suggestions, not the final typeface decision.

**Saved themes ("Tema saya").** A visitor can save the current theme under their own name.

- Themes are stored under `belajar-bahasa-arab:saved-themes:v1`, as overrides of the default and with a `version` field.
- Entries are validated on read.
- At most 12 themes can be saved, with names up to 40 characters.
- Saving under an existing name replaces that entry.
- A deleted theme can be restored with "Batalkan hapus".
- Applying a preset or a saved theme is one undo step.

## Bugs found in the microblog editor and how this port avoids them

I read the source and tested https://microblog.faizmuttaqin.com/editor/theme on 13 November 2026. The microblog repo was not changed.

1. **Invalid colours are accepted.** Text such as `notacolor` is applied live (the preview's primary elements disappear) and exported as `--primary: notacolor;`. Here, values are validated before they are applied.
2. **The light/dark switch shows the wrong state.** In system mode with a dark OS, the switch is "off" (`aria-checked="false"`) while the page is dark. It has no accessible name, and there is no explicit "system" option. Here, a labelled three-way radio group replaces it.
3. **OS colour scheme changes leave the old colours in place** in system mode. Only the `.dark` class flips: tokens are inline styles on `<html>`, and `resolvedTheme` is memoised on the preference only. Here, overrides live in a stylesheet scoped by mode, and the editor listens for system changes.
4. **The 32 colour text fields have no label.** Only the hidden colour input is labelled. Here, every field is labelled.
5. **Undo history is unreliable.**
   - Changes merged inside the 500 ms window do not clear the redo stack, so redo can jump to a stale state.
   - Edits to different fields within 500 ms merge into one undo step.
   - `undo` and `redo` overwrite the HSL checkpoint.

   Here, `History` fixes all three (`history.spec.ts`).

6. **A re-render can drop an edit.** The colour field rebuilds its debounced `onChange` on every parent render (the callback is an inline arrow), and the cleanup cancels the pending call.
7. **Import loses shared values and over-reports success.** Imported `:root` values for shared tokens (radius, fonts) are not copied to `.dark`, and import reports success even when nothing matched. Here, shared values are read from `:root` and apply to both modes, and an empty import shows an error and lists what was ignored.
8. **The import parser misreads CSS.** It treats preceding at-rules as part of the selector (`[^}]+` before `{`) and splits declarations on every colon. The first problem was also in this port at first, and a unit test caught it.
9. **The contrast checker is too coarse.** It applies 4.5:1 to every pair, including non-text UI, and ignores alpha. It rounds ratios, so 4.497 shows as "4.50". Its filter buttons are hidden below `md`.
10. **The export has self-referencing variables.** `@theme inline { --font-sans: var(--font-sans); }` and `--tracking-normal: var(--tracking-normal)` are invalid at computed-value time.
11. **Reset can miss variables.** `resetThemeStyles` enumerates `getComputedStyle()`, which does not list custom properties in every browser, so inline variables can survive a reset.
12. **HSL adjustments distort colours and lose edits.** Lightness is clamped to at least 10%, so a hue-only shift turns pure black into dark grey. Manual edits made while an adjustment is active are lost on the next slider move, because adjustments are recomputed from the checkpoint.
13. **Default updates never reach returning users.** The persisted zustand state stores the full theme.
14. **Import is unavailable on mobile.** The button is hidden there (`hidden md:flex`).
15. **The page renders client-side only.** A blank dark screen shows for about 2 seconds before content appears.

## Dependencies added

| Package                                  | Version | Why                                                                                                                   |
| ---------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `@fontsource-variable/noto-naskh-arabic` | 5.3.0   | Default Arabic face, self-hosted (OFL)                                                                                |
| `@fontsource/amiri`                      | 5.3.0   | Comparison face (OFL); only the Arabic 400 and 700 subsets are imported                                               |
| `@fontsource/scheherazade-new`           | 5.3.0   | Comparison face (OFL); only the Arabic 400 and 700 subsets are imported                                               |
| `@lucide/svelte`                         | 1.65.0  | Icons for navigation and icon buttons; it is the icon library set in `components.json`; icons are imported one by one |

The `@font-face` rules only cost CSS bytes: a font file downloads only when text uses that family. Colour maths (parsing, OKLCH conversion and WCAG contrast) is about 250 lines in `src/lib/theme/color.ts` instead of a dependency.

shadcn-svelte components were added with CLI 1.8.0 under Node 22: `input`, `textarea`, `card` and `badge`. None of them pulled in new packages.

## Sources

- WCAG 2.2: contrast minimum (1.4.3) and non-text contrast (1.4.11): https://www.w3.org/WAI/WCAG22/quickref/
- Relative luminance and contrast ratio: https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
- OKLCH conversion matrices: https://www.w3.org/TR/css-color-4/#color-conversion-code
- Material 3 navigation bar, navigation rail and window size classes: https://m3.material.io/components/navigation-bar/guidelines and https://m3.material.io/foundations/layout/applying-layout/window-size-classes
- Apple HIG tab bars and sidebars: https://developer.apple.com/design/human-interface-guidelines/tab-bars
- shadcn-svelte theming: https://www.shadcn-svelte.com/docs/theming
- Arabic layout requirements: https://www.w3.org/International/alreq/
- Stack guide, sections 7 and 8: `docs/arabic-learning-stack-guide-sveltekit.md`

## Not verified

- Real devices, Safari and Firefox. All checks used Chromium: Playwright, and the in-app browser at 375, 768 and 1280 px in light and dark.
- Screen reader testing.
- The final Arabic typeface. The manual screenshot review required by section 7 still has to happen.
