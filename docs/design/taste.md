# Design direction: calm Arabic reader

**Status:** accepted for the app shell, 13 November 2026; revised the same day after product-owner review ("too much text": more space and focus, use colour, icon markers and panels). Colour tokens live in `src/lib/theme/tokens.ts` and `layout.css` (see ADR-003, `/editor/theme/`); everything else here applies to all UI.

Sources: research digest of the local UI/UX skills (`frontend-design-direction`, `make-interfaces-feel-better`, `design-system`, `accessibility`, `seo`, `ui-refine-loop` rubric), Anthropic `frontend-design` and Vercel web interface guidelines, NN/g (navigation, onboarding, empty states), WCAG 2.2 Understanding pages, W3C alreq, Fontsource packages measured with HarfBuzz, and `docs/arabic-learning-pedagogy-ux-research-reissued.md` §4 and §7.

## Contract

| Field            | Value                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Purpose          | Help Indonesian adults understand Arabic, not just memorise terms.                                                 |
| Audience         | Mostly mobile; many can read vocalised Arabic (post-Iqra) but do not yet understand it.                            |
| Tone             | Calm, editorial, minimal. A reader, not a SaaS dashboard, not gamified.                                            |
| Memorable detail | Large, well-spaced vocalised Arabic is the visual signature. No decoration competes with it.                       |
| Constraints      | Static prerendered HTML, WCAG 2.2 AA, light/dark/system, reduced motion, no account. Test at 375, 768 and 1280 px. |

## Layout and navigation

- Reading column: use a comfortable line length for prose. Grids, tables, and editor panels use the available width. Gutters are 16 px on phones, 24 px on tablets, and 32–48 px on desktop.
- Spacing ladder (Tailwind steps): 1, 2, 3, 4, 6, 8, 12, 16, 24. Sections are separated by space and at most one hairline rule, not boxes.
- Panels are allowed for grouping, but quietly: `rounded-2xl`, `bg-card` with a 1 px border or a soft `bg-secondary` fill, no shadows, never a card inside a card. Use them for step tiles, start-point choices, collections, vocabulary cards and empty states.
- Keep copy short: one-sentence leads, one or two sentences per empty state, about six words per tile line. Space separates sections (`mt-16` to `mt-24`).
- Icon markers: one icon per section (`section-icons.ts`) shown in the tab bar, menu and above each H1; icons in tinted rounded squares (`bg-secondary text-primary`). Icons never carry meaning alone; a text label is always present.
- Colour: one accent (`primary`, teal) for actions, active states and markers. Secondary panels use `secondary`. A chart colour may tint an icon (e.g. amber `chart-3` for "harian") but never text.
- Desktop (`lg` and up): sticky 64 px header with visible text links; Beranda is the wordmark. Active link: `aria-current="page"` plus underline.
- Mobile: header with wordmark and a "Menu" button (Sheet listing every section with a one-line summary), plus a bottom tab bar with exactly five labelled destinations: Beranda, Belajar, Latihan, Kosakata, Progres. Lesson and exercise pages will hide the tab bar (focus mode).
- Footer is a restrained single-row status and privacy note, not another navigation menu; one optional link to the About/sources page.
- Every page: one H1, a lead paragraph, its own `<title>` (`Topik · Belajar Bahasa Arab`) and an honest meta description (`PageIntro`).
- Empty sections say what is missing, what will appear and how, and give one next action (`EmptyState`).

## Typography

- UI font: Plus Jakarta Sans. Body 17 px mobile, 18 px from `md`, line-height 1.65. Never `text-sm` for text learners read.
- Headings: H1 `clamp(2rem, 1.6rem + 2vw, 2.5rem)`, bold, balanced wrapping. Short descriptions use `text-pretty`.
- Numbers that change use `tabular-nums`.

### Arabic typography

- Face: Noto Naskh Arabic Variable (most compact for stacked harakat: collision-free line-height about 1.7, versus about 2.05 to 2.1 for Scheherazade New and Amiri). Amiri remains a candidate for lessons where kasra-below-shadda placement matters.
- Only the Arabic subset is loaded, through a hand-written `@font-face` in `layout.css` that adds U+0020 and U+00A0. The package `index.css` is not imported, because it would also download the Naskh Latin file for every space.
- Size roles (`@utility` in `layout.css`): `arabic-inline` 1.25em; `arabic-block` `clamp(1.625rem, 1.3rem + 1.5vw, 2rem)` / 1.9; `arabic-display` `clamp(2.5rem, 1.8rem + 3vw, 4.5rem)` / 1.7.
- Style by `:lang(ar)`. Every Arabic run carries `lang="ar" dir="rtl"` (`ArabicText`). Keep Indonesian punctuation outside the Arabic element and Arabic punctuation inside it.
- Never on Arabic: letter-spacing, `tracking-*`, ligature or feature overrides, `text-justify`, `font-size-adjust`, fixed heights, `leading-none`, `line-clamp`, `overflow-hidden`. Align with `text-start` and logical properties.
- To highlight a letter or mark, change only colour or background on an inner span (no padding, border, weight or `dir`).
- Show a mark on its own on tatweel (`ـَ`), not on U+25CC.
- Transliteration: Plus Jakarta Sans lacks ʿ (U+02BF) and ʾ (U+02BE); choose a fallback before transliteration ships.

## Components and states

- shadcn-svelte supplies behaviour (Button, Sheet). Button default height is 44 px, `lg` 48 px, icon buttons 44 px. Labels are at least 16 px.
- One focus style for everything: `:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px }`. `--ring` must reach 3:1 against the background in both themes.
- Touch targets: 44 px or more for every control (WCAG floor 24 px). Inline text links are exempt but stay underlined.
- Transitions list their properties (never `transition-all`), last 150 to 200 ms, use `ease-out`, and stop under `prefers-reduced-motion`.
- Reference tables (`ReferenceTable`): caption; Arabic cells RTL, no wrapping; horizontal scroll inside a focusable region (never the page); hafalan mode hides one column and reveals cells one by one; explanations are native disclosures in the first column.
- Never convey meaning by colour alone (feedback states pair colour with text or an icon with a label).

## Avoid

Gradients, glass, blobs, gradient text, emoji icons, shadows on panels, more than one accent hue for text, pastel badge washes, marketing sections before learning content, streaks/XP/hearts/confetti, autoplaying audio, tutorial carousels, centring everything, pure black dark surfaces, semi-transparent focus rings.

## Open questions

- Accent palette and its contrast audit (theme work).
- Kosakata or Iqra as the fifth tab: depends on the curriculum decision.
- Vocabulary association icons come from a curated registry (`vocab-icons.ts`, Lucide). Abstract words and function words may need no icon; decide per item during content review.
- 65ch for Indonesian prose comes from general typography sources; validate with users.
- Exact dark-mode weight for Arabic needs device testing (Naskh has no weight below 400).
