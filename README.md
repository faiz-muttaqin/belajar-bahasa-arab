# Belajar Bahasa Arab

Static-first Arabic learning website for Indonesian-speaking learners. Built with SvelteKit 3, Svelte 5, strict TypeScript, `adapter-static`, Vite 8 and Tailwind CSS v4. Every public route is prerendered to HTML.

Read [AGENTS.md](./AGENTS.md) and the [stack guide](./docs/arabic-learning-stack-guide-sveltekit.md) before changing the architecture.

Curriculum content is prepared separately. This repository currently holds only the application shell and tooling; no lessons are published yet.

## Requirements

- Node.js 26.13.1 (see `.nvmrc`; run `nvm use`)
- Bun 1.4.4 (package manager and script runner; Vite does the bundling)

## Setup

```bash
nvm use
bun install
bun run browsers:install   # Chromium headless shell for Playwright and Vitest browser tests
```

## Commands

| Command             | What it does                                                  |
| ------------------- | ------------------------------------------------------------- |
| `bun run dev`       | Start the dev server                                          |
| `bun run build`     | Prerender the site to `build/`                                |
| `bun run preview`   | Serve the production build locally (smoke test, not a server) |
| `bun run check`     | Type-check with `svelte-check`                                |
| `bun run lint`      | Prettier check and ESLint                                     |
| `bun run format`    | Format with Prettier                                          |
| `bun run test:unit` | Vitest (node tests and browser component tests)               |
| `bun run test:e2e`  | Build, then run Playwright against the prerendered output     |
| `bun run test`      | Unit tests once, then e2e                                     |
| `bun run verify`    | Full gate: check, lint, unit tests, build and e2e             |

## Project layout

```text
src/routes/        SvelteKit routes (root +layout.ts sets prerender and trailingSlash)
src/lib/           shared code, imported through the `#lib` subpath import
tests/e2e/         Playwright tests against the static build
static/            files copied as-is into the build
docs/              architecture guide and decisions
```

## Licence

- Text written for this site (explanations, glosses, exercises) is licensed **CC BY-SA 4.0** ([ADR-004](./docs/decisions/0004-content-decisions.md)).
- Third-party material keeps its own terms and is labelled where shown: Qur'an text from Tanzil (CC BY 3.0, verbatim), the Indonesian translation via QuranEnc (its terms), Quranic Arabic Corpus data (GNU GPL), fonts (SIL OFL 1.1), icons (Lucide, ISC).
- The code licence has not been chosen yet.
