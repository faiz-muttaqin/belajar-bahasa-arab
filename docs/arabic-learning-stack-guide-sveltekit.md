# Belajar Bahasa Arab — SvelteKit Static-First Architecture & Agent Guide

**Status:** Architecture decision accepted for v1; implementation not started  
**Research reviewed:** 13 November 2026 (primary documentation and project repositories)  
**Suggested domain:** `https://arab.faizmuttaqin.com`  
**Suggested repository:** `belajar-bahasa-arab`  
**Audience:** Indonesian-speaking Arabic learners. The primary track starts **after Iqra**; an optional `/iqra/` track remains available for absolute beginners.

> **Decision (ADR-001): Build v1 on SvelteKit 3 + Svelte 5 + strict TypeScript, fully prerendered with `@sveltejs/adapter-static`, Bun for package management/scripts, Vite 8/Rolldown for bundling, Tailwind v4 + carefully selected shadcn-svelte components, browser-local persistence, and pre-generated static audio.** Deploy static files to Vercel; preserve GitHub Pages compatibility. No production server/SQL/auth required in v1. This document is a technology guide, not researched Arabic curriculum content.

## 1. Why SvelteKit is the chosen framework

Evaluate the **product**, not an individual engineer's past experience. The site is mostly readable lesson content, with islands of interactive audio/quiz/progress UI, and must be maintainable with few abstractions and dependencies. SvelteKit offers:

- **Prerendered HTML per URL** via `adapter-static`, ensuring public lessons exist in static HTML and can be read without client-side JavaScript.
- **SPA-like navigation** through built-in client routing and link preloading, without building a custom router or disabling SSR.
- **Single-component authoring model** (`.svelte` + Svelte 5 runes) suitable for modest interactive UI; no React/RSC/server-action boundary required for the static MVP.
- **Standard browser APIs** for IndexedDB, localStorage, native audio, CSS motion, Web Animations API.
- **Simple later migration**: move to an appropriate server adapter for dynamic endpoints/account sync without rewriting all lesson components. A real backend still requires new API/auth/storage work.

**Trade-offs, not glossed over:** Svelte has a smaller ecosystem than React; shadcn-svelte is a community port, not the original React library; generated examples may target obsolete versions; static export cannot handle write requests or private server sessions. A claim that SvelteKit always uses less laptop RAM or builds faster is **not established** for this specific project. Benchmark to set resource budgets, not to postpone the chosen architectural direction.

Verified sources:

- SvelteKit introduction/router/SSR/hydration: https://svelte.dev/docs/kit/introduction
- Official SSG adapter: https://svelte.dev/docs/kit/adapter-static
- Link navigation/preloading: https://svelte.dev/docs/kit/link-options
- Prerender/entries/SSR: https://svelte.dev/docs/kit/page-options
- SvelteKit 3 migration: https://svelte.dev/docs/kit/migrating-to-sveltekit-3
- shadcn-svelte description and implementation: https://www.shadcn-svelte.com/docs

## 2. Architecture contract: true static HTML + interactive navigation

**MUST:** all published public routes are statically prerendered (`index.html` at each final path), with meaningful HTML text, metadata and internal links. Keep SSR enabled at build-time for prerendering; hydrate interactive components in browsers.

**MUST NOT:** set `ssr = false` globally, choose a single SPA fallback as the default deployment, fetch the primary lesson text only after hydration, or rely on server-side POST/form actions/remote functions at runtime.

**Routing behavior:** direct URL or search crawler gets a complete HTML document; internal `<a>` navigation is handled by SvelteKit after hydration. Shared layouts can stay mounted, but a new lesson still causes its portion of the DOM to update. A global audio controller can be mounted in the root layout if playback needs to survive navigation.

**Suggested static output (illustrative):**

```text
build/
  index.html
  belajar/index.html
  belajar/isim-fiil-harf/index.html
  iqra/index.html
  bookmark/index.html
  progres/index.html
  audio/...
  fonts/...
  _app/...
```

**SvelteKit 3 configuration** — verified against current official docs. This is a configuration reference, not an already-tested project:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

export default defineConfig({
	plugins: [sveltekit({ adapter: adapter() })]
});
```

```ts
// src/routes/+layout.ts
export const prerender = true;
export const trailingSlash = 'always';
```

Keep the `adapter-static` `strict` default enabled so a missing prerendered route fails rather than silently shipping inaccessible pages. For dynamic lesson slugs (`src/routes/belajar/[slug]/`), enumerate published slugs using an `entries()` generator in `+page.server.ts` or reliable crawl links. Test that every generated URL has an actual HTML file. An example **shape** for a slug generator:

```ts
// src/routes/belajar/[slug]/+page.server.ts (illustration)
import type { EntryGenerator } from './$types';
import { publishedSlugs } from '#lib/content/published.js';

export const entries: EntryGenerator = () => publishedSlugs.map((slug) => ({ slug }));

// Export `load` separately once the versioned content schema exists.
```

`#lib/content/published.js` is a **future module**, not pre-existing code. Keep disk-reading/build-only libraries out of browser-side code. For this static MVP, `+page.server.ts` load functions can run at **build time** and supply prerendered data; they do not imply a server in production.

Sources: https://svelte.dev/docs/kit/adapter-static ; https://svelte.dev/docs/kit/page-options ; https://svelte.dev/docs/kit/routing

## 3. SvelteKit 3 compatibility policy (critical for coding agents)

**Do not mix SvelteKit 2 and 3 examples.** This is a real documentation hazard: current shadcn-svelte installation examples still show legacy `svelte.config.js` and `$lib`, whereas official SvelteKit 3 removed `svelte.config.js` and no longer generates `$lib` automatically.

Rules:

1. SvelteKit configuration belongs in `vite.config.ts` as options to `sveltekit(...)`; not `svelte.config.js`.
2. Prefer the SvelteKit 3 `#lib` package import mapping. The current official form is:

```json
{
	"imports": {
		"#lib": "./src/lib/index.js",
		"#lib/*": "./src/lib/*"
	}
}
```

3. Use Svelte 5 runes for new reactive components (`$state`, `$derived`, `$effect` only when needed); do not generate Svelte 3/4 legacy patterns as the house style.
4. Use `$app/state` rather than removed `$app/stores`. Check renamed/moved v3 APIs before using snippets found online.
5. The current shadcn-svelte CLI **must be tested in a fresh SvelteKit 3 scaffold**. Run `init`, inspect `components.json`, ensure import aliases resolve, then add **one Button**. If `#lib` is unsupported, configure a coherent explicit alias in Vite/TypeScript/`components.json` or adopt a compatible reviewed release. Do not blindly paste a legacy `kit.alias` block into `svelte.config.js`.
6. Pin verified versions in `package.json` and commit **one** lockfile; avoid unreviewed framework/CLI major upgrades. SvelteKit 3 documented minimums include Node 22.17, TypeScript 6, Svelte 5.57.1, Vite 8.0.12 and vite-plugin-svelte 7; verify the scaffold actually meets them before installing third-party UI tooling.

Sources: https://svelte.dev/docs/kit/migrating-to-sveltekit-3 ; https://www.shadcn-svelte.com/docs/installation/sveltekit ; https://www.shadcn-svelte.com/docs/migration/tailwind-v4

## 4. Toolchain for low-spec local development

| Layer           | Decision                                                     | Reason / guardrail                                                    |
| --------------- | ------------------------------------------------------------ | --------------------------------------------------------------------- |
| App             | **SvelteKit 3 / Svelte 5**                                   | Keep native routing/SSG; no extra router                              |
| Language        | **TypeScript strict**                                        | Explicit domain contracts; typecheck content and browser storage      |
| Package manager | **Bun**, `bun.lock`                                          | Fast install/scripts; use Node LTS fallback if a tool is incompatible |
| Dev/build       | **Vite 8 / Rolldown**                                        | Official SvelteKit integration; avoid extra bundler                   |
| Styling         | **Tailwind CSS v4 + CSS custom properties**                  | Consistent utility styling; keep global theme tokens small            |
| UI primitives   | **shadcn-svelte**, selected components                       | Owned source, accessible primitives via Bits UI; audit dependencies   |
| Icons           | `@lucide/svelte`, only needed icons                          | Avoid huge icon packs shipped to browser                              |
| Themes          | CSS semantic tokens; optional `mode-watcher`                 | Light/dark/system, prefer avoiding flash on load                      |
| Content         | Typed structured content; Markdown only when needed          | Build-time validation, no giant runtime Markdown parser               |
| Browser storage | `localStorage` + IndexedDB                                   | No auth or SQL in v1; optional small `idb` wrapper                    |
| Motion          | CSS transitions, Svelte transitions, Web Animations API      | Respect reduced motion; no heavy animation lib by default             |
| Audio           | Pre-generated reviewed MP3 (evaluate Opus)                   | Static hosting; never use web app to run Voicebox                     |
| Tests           | `svelte-check`, lint/format, focused unit and Playwright e2e | Install only as project starts requiring each suite                   |
| Hosting         | Vercel static build, GitHub Pages-compatible                 | Output is files only                                                  |

**Performance policy:** do not run Voicebox alongside the website dev server on a low-end laptop; lazy-load audio, rich quiz code and search indexes; avoid Storybook/monorepo/CMS/build-time remote APIs in v1. Measure cold/warm `bun run dev`, HMR, peak RAM, `bun run build` and transfer size. Bun is a package manager/script runner here; **Vite/Rolldown does the bundling**. Vite's headline benchmark does not guarantee a project-specific 10–30x speedup.

Sources: https://vite.dev/blog/announcing-vite8.html ; https://bun.com/docs/runtime ; https://svelte.dev/docs/kit/performance

### Local bootstrap checklist (run only after repository is created)

```bash
# Verify Bun and Node version first; use the Svelte CLI scaffold.
bunx sv create belajar-bahasa-arab
cd belajar-bahasa-arab

# In scaffold, choose SvelteKit + TypeScript; install dependencies using Bun.
# If not selected in CLI, add Tailwind following `sv`'s current documentation.
bunx sv add tailwindcss
bun add -d @sveltejs/adapter-static

# Update vite.config.ts and +layout.ts as in section 2.
# Then attempt shadcn-svelte setup; audit generated config for v3 compatibility.
bunx shadcn-svelte@latest init
bunx shadcn-svelte@latest add button

bun run dev
bun run check
bun run build
bun run preview
```

**CLI caveat:** actual CLI questions/options and the scaffold's scripts may change. `bun run check` is conditional on the scaffold adding that script; inspect `package.json`. The final shadcn-svelte setup is **verification required**, not a promise that its current documented aliases work unmodified with SvelteKit 3. Source: https://svelte.dev/docs/kit/creating-a-project ; https://www.shadcn-svelte.com/docs/installation/sveltekit

## 5. Data design: content in repo, learner state in browser

- Public lessons are authored in reviewed **typed JSON/TS + optionally Markdown**. Bundle/compile them to HTML at build; do not treat JSON as a writable user database.
- `localStorage`: theme (`system`/`light`/`dark`), Arabic font scale, playback speed, optional transliteration visibility and lightweight preferences.
- IndexedDB: progress, bookmarks, quiz attempts, schema version, revision markers. A tiny `idb` wrapper is acceptable if it reduces error-prone transaction code: https://github.com/jakearchibald/idb
- Stable `lessonId` and `contentRevision` must survive slug/title changes. Avoid corrupting progress after a course restructure.
- Define a UI-agnostic `ProgressRepository` contract with `get`, `save`, `list`, `exportJson`, `importJson` and `migrate`; implement IndexedDB first. Guard access to browser APIs (`onMount` or browser-only code) because prerendering executes in a non-browser environment.
- Provide JSON export/import, with schema validation and explicit conflict resolution; browser local data can be cleared and does not sync across devices.
- Future server sync can implement another repository and add auth/API endpoints behind a new adapter/service. SQLite requires a persistent server or compatible managed platform, **not** GitHub Pages.

Example domain object (not a DB schema):

```ts
type LessonProgress = {
	lessonId: string;
	contentRevision: number;
	status: 'not_started' | 'in_progress' | 'completed';
	score?: number; // scoring definition TBD
	updatedAt: string; // ISO 8601
};
```

Source: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

## 6. Product routes and content boundaries (no curriculum authored yet)

```text
/                       homepage and learning entry
/belajar/               post-Iqra learning path (primary)
/belajar/[slug]/        statically prerendered lesson
/latihan/               quizzes and activities
/kosakata/              glossary/index
/iqra/                  optional absolute-beginner entry point
/iqra/[slug]/           future Iqra lessons, separate from main path
/bookmark/              local bookmarks
/progres/               local progress
/tentang/               sources, methodology, disclosures
```

**Reserved, not researched:** determine later whether pedagogy is Fusha/MSA, classical Arabic or a staged combination; lesson sequence, spaced repetition, dialect choices and professional reviews need dedicated educational research. Never invent Arabic instructional examples or pronunciation as if reviewed facts. Synthetic fixtures must carry `TEST FIXTURE — NOT A LESSON` and must not appear as published curriculum.

**Content schema principles:** separate `id`, `slug`, `level`, `language`, `arabicVocalized`, `indonesianExplanation`, optional transliteration, translation, audio clip ID, source citation/provenance, review status and `contentRevision`. Validate data before prerender. Search can normalize diacritics **only in a search index**, not in displayed/quoted Arabic.

## 7. Arabic typography and readability

**Font test shortlist:**

1. **Noto Naskh Arabic** (first candidate) — https://github.com/notofonts/arabic and https://fonts.google.com/specimen/Noto+Naskh+Arabic
2. **Amiri** (book-like Naskh alternative) — https://github.com/aliftype/amiri
3. **Scheherazade New** (alternative for broad diacritic coverage) — https://software.sil.org/scheherazade/design/
4. **Plus Jakarta Sans** for Indonesian UI — https://github.com/tokotype/PlusJakartaSans ; fallback **Inter** — https://rsms.me/inter/

W3C Arabic layout requirements: https://www.w3.org/International/alreq/

**Rules:** set overall page `<html lang="id">`; use semantic Arabic text with `lang="ar" dir="rtl"` (and `bdi` when mixing scripts). Use real selectable text, not word images. Avoid fixed-height Arabic containers and clipped `overflow`. First test baseline Indonesian UI 16–18px / 1.6–1.75 line height; Arabic learning content 30–36px mobile and 36–44px larger screens with sufficient leading for stacked harakat. These are **testing starting points, not measured optimal values**. Permit user font-size adjustment. Optimize/local-host WOFF2 after license review; test Chrome/Firefox/Safari/low-end Android.

**Visual QA:** compare harakat placement, hamza, madd, shadda, tanwin, sukun, Allah ligatures, combined Latin/Arabic punctuation, text wrapping and dynamic scaling at 375px/768px/1280px, in both themes. Do not commit to a typeface without screenshots and manual assessment. Example specimens (not published lessons): `بِسْمِ اللَّهِ`, `السَّلَامُ عَلَيْكُمْ`, `مُعَلِّمٌ`, `قُرْآنٌ`.

## 8. Clean UI system, light/dark modes, responsiveness

**Visual direction:** calm, content-first reading app; not admin dashboard or gamification-heavy SaaS. Minimize cards, badges, decorative gradients and navigation chrome. Put the Arabic specimen/phrase, Indonesian guidance and play/practice controls at the center of a lesson.

**Design token proposals (not contrast-audited):**

| Token          | Light     | Dark      |
| -------------- | --------- | --------- |
| `--background` | `#FFFFFF` | `#111827` |
| `--foreground` | `#17212D` | `#F3F4F6` |
| `--surface`    | `#F7F9FA` | `#1F2937` |
| `--border`     | `#E1E7EB` | `#374151` |
| `--accent`     | `#176B56` | `#7AD4B0` |

Prefer semantic CSS variables with Tailwind v4 theme setup; audit actual rendered contrast (WCAG AA minimum normally 4.5:1 for body text). Use a persisted `system/light/dark` choice. `mode-watcher` is a viable shadcn-svelte-aligned helper (optional; audit dependency) if plain CSS theme initialization causes flash.

- **Mobile:** one-column reading, large touch controls, clear next lesson, compact navigation.
- **Tablet:** comfortable reading width, optional expandable contents rail.
- **Laptop:** navigation sidebar + centered constrained lesson column; avoid overlong lines.
- **Accessibility:** keyboard navigation, focus styles, labels on icon buttons, no color-only results, audio always user-triggered, transcript/text availability, `prefers-reduced-motion` support.

References: https://www.shadcn-svelte.com/docs/theming ; https://www.shadcn-svelte.com/docs/dark-mode/svelte ; https://www.w3.org/WAI/WCAG22/quickref/ ; https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

## 9. shadcn-svelte adoption, not React shadcn/ui

Use **shadcn-svelte**, which is a **community-led port** of the shadcn approach built on **Bits UI and Tailwind CSS**. Components are copied into the repository for customization and long-term ownership; that does **not** mean zero external dependencies. Review each generated component and its transitive packages.

**Start tiny:** Button, Tabs, Progress, Dialog/Sheet only if truly needed. Avoid importing all available components. Build domain-specific `ArabicText.svelte`, `AudioPlayButton.svelte`, `VocabularyCard.svelte`, `LessonStepper.svelte`, `ExerciseFeedback.svelte` in local source, not from a large education widget package.

- Official port docs: https://www.shadcn-svelte.com/docs
- Installation page (contains legacy Kit 2 snippets; **DO NOT COPY BLINDLY**): https://www.shadcn-svelte.com/docs/installation/sveltekit
- Svelte 5/Tailwind v4 migration info: https://www.shadcn-svelte.com/docs/migration/tailwind-v4
- Source and CLI: https://github.com/huntabyte/shadcn-svelte
- Agent skill (read/review before installing): https://www.shadcn-svelte.com/docs/skills

## 10. Pre-generated Voicebox audio (editor-side only)

Voicebox: https://github.com/jamiepine/voicebox ; https://docs.voicebox.sh/ . Chatterbox Multilingual lists Arabic among its supported languages: https://github.com/resemble-ai/chatterbox . This does **not** establish human-quality vowel/makhraj accuracy for educational use.

**Asset pipeline:** reviewed Arabic text → offline batch TTS through Voicebox → human listening/review → normalize/encode → stable static path and manifest → web playback via `<audio>`.

Manifest fields: utterance/lesson ID, source Arabic text, selected TTS engine and version, voice/license/consent, settings, review status/reviewer, duration, file checksum, output path. Avoid automatic regeneration in dev/HMR/CI. Review both app and model licensing, voice cloning consent, and output redistribution terms. Correctness review must specifically cover short vowels, shadda, hamza, tanwin, long vowels and pauses.

Do not preload a media catalog; `preload="none"` for non-immediate clips, user-controlled replay/playback speed, visible loading/error state and mobile Safari checks. Pre-encode assets, monitor repository/hosting quotas; if audio storage grows too large, move assets to static object storage/CDN with stable IDs and leave app framework unchanged.

## 11. SEO, AI-readable HTML and content distribution

- Published paths must return real prerendered HTML with title, description, canonical URL, one primary heading, semantic reading order and in-document lesson links.
- Include `sitemap.xml`, `robots.txt` and appropriate truthful structured data where justified. Do not assume `llms.txt` is a ranking requirement.
- Crawler and no-JS visitors must see educational copy. Client JS is enhancement for quizzes, audio, bookmark, progress and navigation.
- Provide meaningful 404 handling and stable routes; no hidden content solely behind client fetched JSON.
- Optional static public lesson metadata JSON can help external integrations and future agent consumption, but not replace actual readable HTML.

References: https://svelte.dev/docs/kit/seo ; https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## 12. Deployment and migration plan

**Primary:** Vercel **static output** from `adapter-static` (`build/` is the default). No production SvelteKit server, SQL database or dynamic API. Verify build/output settings in the actual Vercel project; do not unintentionally enable a server adapter or serverless functions.

**Secondary:** GitHub Pages. Use `trailingSlash = 'always'` to generate directory `index.html` pages, `static/.nojekyll` if needed, and the correct base path for project-site URLs (`username.github.io/repo/`). For a root custom domain, base path differs. Prefer SvelteKit 3 `$app/paths` `resolve`/`asset` helpers when constructing routes/assets if base paths matter; **do not import removed `base`**. Run a static-server preview and test direct URLs.

**No automatic runtime DB:** browser-only progress first. When users demand sync, add authenticated API and a persistent backend; consider an external managed service or move to Node/Bun/Vercel adapter. The choice of backend is a later ADR, not an obligation now.

Sources: https://svelte.dev/docs/kit/adapter-static ; https://svelte.dev/docs/kit/migrating-to-sveltekit-3 ; https://svelte.dev/docs/kit/adapters

## 13. Suggested repository layout (SvelteKit only)

```text
belajar-bahasa-arab/
  src/
    routes/
      +layout.svelte
      +layout.ts                   # prerender / trailingSlash
      +page.svelte                 # home
      belajar/
        +page.svelte
        [slug]/
          +page.svelte
          +page.server.ts         # build-time entries/load
      iqra/
        +page.svelte
      latihan/+page.svelte
      kosakata/+page.svelte
      bookmark/+page.svelte
      progres/+page.svelte
      tentang/+page.svelte
    lib/
      components/
        ui/                       # owned shadcn-svelte source
        learning/                 # ArabicText, AudioPlayButton, etc.
        layout/
      domain/
        lesson/
        exercise/
        progress/
      content/                    # typed build-time content access
      storage/                    # browser-only IndexedDB adapter
      styles/
        tokens.css
    app.html
  content/
    lessons/                      # reviewed, versioned content
    iqra/                         # separate future learning path
    glossary/
  static/
    audio/
    fonts/
    images/
    .nojekyll                     # if publishing with GitHub Pages
  scripts/
    content-validation/
    audio-manifest/
  tests/
  docs/
    decisions/
  AGENTS.md
  ARABIC_LEARNING_STACK_GUIDE.md
  bun.lock
  vite.config.ts
  package.json
```

Use `#lib` mapping for code in `src/lib`. Keep domain logic framework-agnostic. Avoid framework-specific imports in progress models. Do not add a `backend/` folder for v1.

## 14. Milestones and quality gates (before curriculum research)

1. Scaffold SvelteKit 3 + Svelte 5 + TypeScript and Bun; configure `adapter-static` and root prerender.
2. Create two static public routes (home + one fixture lesson) and verify `build/<route>/index.html` plus direct URL reload, with JS disabled.
3. Audit shadcn-svelte compatibility, install one Button, confirm Tailwind styling, TypeScript and aliases build correctly.
4. Build font specimen page at 375/768/1280px across light/dark/system; test real harakat and bidi behavior before declaring final font.
5. Implement `ArabicText.svelte` and `AudioPlayButton.svelte` with **technical sample audio only**, not invented curriculum.
6. Implement local preferences/IndexedDB progress + versioning, import/export and storage-disabled fallback.
7. Add an interactive fixture exercise with keyboard focus, screen reader labels and reduced-motion behavior.
8. Add stable typed content IDs and build-time validator; ensure all published slugs prerender and missing audio IDs fail build.
9. Add metadata, sitemap, 404, audit JS-disabled reading and Lighthouse; preview on Vercel and/or GitHub Pages.
10. Only then open an independently researched curriculum project: post-Iqra path, Iqra beginner track, expert review and Voicebox audio validation.

**Acceptance criteria:** `bun run build` emits static files only; published lessons are crawlable as HTML; navigation works without full document refresh after hydration; progress survives reload and export/import; audio loads on demand; text with harakat remains legible in major browsers; light/dark/system and responsive UI work; no auth/SQL/server at runtime.

## 15. Agent skills, docs and research links

**Prioritize official API docs over third-party snippets**; review any external skill before executing its code. Recommended reading order for coding agents:

1. [SvelteKit official docs](https://svelte.dev/docs/kit/introduction), [Svelte 5](https://svelte.dev/docs/svelte/overview), [SvelteKit 3 migration](https://svelte.dev/docs/kit/migrating-to-sveltekit-3).
2. [Static adapter](https://svelte.dev/docs/kit/adapter-static), [page options](https://svelte.dev/docs/kit/page-options), [link options](https://svelte.dev/docs/kit/link-options), [performance](https://svelte.dev/docs/kit/performance).
3. [shadcn-svelte official docs](https://www.shadcn-svelte.com/docs), [Svelte/Tailwind v4 migration](https://www.shadcn-svelte.com/docs/migration/tailwind-v4), and [shadcn-svelte agent skill](https://www.shadcn-svelte.com/docs/skills).
4. [Anthropic frontend-design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) — visual design direction, inspect before running.
5. [Vercel web-design-guidelines skill](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) — UI/accessibility review, not React-specific.
6. [W3C Arabic script layout](https://www.w3.org/International/alreq/), [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/), [MDN IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
7. [Voicebox](https://github.com/jamiepine/voicebox), [Chatterbox](https://github.com/resemble-ai/chatterbox) — offline content authoring, not frontend code.

**Last review note:** shadcn-svelte's installation documentation currently contains SvelteKit 2 conventions despite advertised Svelte 5 / Tailwind v4 support. Its actual compatibility with newly generated SvelteKit 3 aliases is an explicit **first-implementation validation task**. Do not claim this step was tested or solved by this research document.

## 16. Decisions deliberately deferred

- Actual Arabic curriculum, Fusha/classical scope, and placement of Iqra lessons: **separate research**.
- Final choice of Arabic font: **visual QA on devices**.
- Exact selected Voicebox model and permissible voice/output license: **license and pronunciation review**.
- Hosted media/CDN if audio collection grows: **usage-based decision**.
- Cross-device user accounts, sync/database/backend: **not required in v1**.
- Measured laptop RAM/HMR/build time: **benchmark after scaffold**.

**Confidence:** High on official SvelteKit 3 prerendering/client navigation/static adapter and known migration rules. Medium on shadcn-svelte's SvelteKit 3 setup compatibility and comparative low-end-laptop performance until actually tested. No fabricated benchmarks or educational claims.
