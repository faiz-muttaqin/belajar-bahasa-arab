# Compact Arabic fonts — 20 November 2026

## Decision

Add two optional Arabic-only self-hosted WOFF2 faces to the theme editor. Preserve all three existing choices and the Noto Naskh Arabic default. Do not shrink learning typography globally: compact tables and fully vocalised lessons have different needs.

- [Noto Sans Arabic](https://notofonts.github.io/noto-docs/specimen/NotoSansArabic/): neutral sans, variable weight 100–900, candidate for dense tables and vocabulary. [Fontsource details](https://fontsource.org/fonts/noto-sans-arabic/about).
- [IBM Plex Sans Arabic](https://fontsource.org/fonts/ibm-plex-sans-arabic/about): modern sans, static; bundle only 400 and 700 to match existing options. [Upstream license](https://github.com/IBM/plex/blob/master/packages/plex-sans-arabic/LICENSE.txt).
- [Readex Pro](https://fontsource.org/fonts/readex-pro/about): reading-oriented candidate for later comparison. Its Latin design rationale is not evidence of superiority for fully vocalised Arabic or Indonesian post-Iqra learners.

Both additions use OFL-1.1 Fontsource packages pinned to 5.3.0, following existing dependencies. No CDN, server or storage schema change. WOFF2 files are bundled by Vite; their additional bytes will also enter the current service-worker precache. Font licences accompany the upstream packages.

## Verification

- Compare the editor specimens at 14, 18 and 30 CSS px; these sizes are a comparison tool, not a recommendation to shrink lessons.
- Confirm stored choice, theme export/import, first paint after reload and navigation.
- On real Android, iOS and desktop browsers, check 14–24 px table cells and larger text in both modes, including shadda with kasra, sukun, tanwin, hamza, dotted letters and mixed direction: أَكْتُبُ، مُعَلِّمٌ، سُئِلَ، كِتَابًا.
- Check that marks do not overlap adjacent lines, disappear, or clip; compare legibility before changing any default.
- Measure actual WOFF2 and offline cache deltas in a production build.

No visual shaping measurements or learner trials were performed for these two additions. CI must verify the dependency lock, build, and tests. Real-device typography review remains open.
