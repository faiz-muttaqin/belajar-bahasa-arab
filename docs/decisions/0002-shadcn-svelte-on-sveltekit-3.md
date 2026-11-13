# ADR-002: shadcn-svelte on SvelteKit 3

**Status:** accepted (proof of compatibility with one Button)
**Date:** 13 November 2026

## Context

AGENTS.md requires checking the shadcn-svelte CLI against SvelteKit 3 before using it beyond one Button. Its installation docs still show SvelteKit 2 conventions (`svelte.config.js`, `$lib`).

## Findings (shadcn-svelte CLI 1.8.0, SvelteKit 3.2.0)

- The CLI detects SvelteKit 3 (major version check plus `node_modules/$app/tsconfig.json`). It does not need `svelte.config.js`.
- `#lib` aliases work when passed explicitly. `components.json` stores them and generated code imports `#lib/utils.js`.
- `init` now requires a design preset. Non-interactive runs need `--preset <name>`; we use `vega` (classic shadcn look, Lucide icons).
- `init` still asks before overwriting the CSS file even with every flag set, so a scripted run must answer that prompt.
- **Node 26 bug:** under Node 26 the CLI fails with "Failed to fetch registry" (`invalid onError method`) because its proxy layer (`node-fetch-native`) is incompatible with Node 26's built-in undici. Running the CLI with Node 22 works. The project itself stays on Node 26.

## Decision

Use shadcn-svelte for selected primitives, with these aliases and settings:

```bash
nvm exec 22 bunx shadcn-svelte@1.8.0 add <component>
```

`components.json` aliases: `#lib`, `#lib/components`, `#lib/components/ui`, `#lib/utils`, `#lib/hooks`.

After every `add`: run `bun run format`, pin any new dependency to an exact version, and review the generated source.

## Dependencies added

| Package                                  | Why                                                                |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `shadcn-svelte` 1.8.0                    | Provides `shadcn-svelte/tailwind.css` (custom variants, keyframes) |
| `cn` 0.5.2                               | `cn()` class merge helper (shadcn-ui organisation package)         |
| `tailwind-variants` 3.3.1                | Variant styling used by Button                                     |
| `tw-animate-css` 1.4.0                   | Animation utilities imported by the shadcn theme CSS               |
| `@fontsource-variable/plus-jakarta-sans` | Self-hosted UI font per AGENTS.md (replaces the preset's Inter)    |

`@lucide/svelte` was proposed by `init` but left out until a component needs an icon.

## Follow-ups

- Replace the neutral preset tokens with the project tokens in the stack guide, section 8, after a contrast audit.
- Light/dark/system switching (the theme uses a `.dark` class variant).
- Re-test the CLI under Node 26 on its next release.
