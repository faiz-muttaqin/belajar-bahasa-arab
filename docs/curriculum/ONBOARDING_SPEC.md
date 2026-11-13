# Onboarding and placement specification

> **Status: PROPOSAL, PENDING PRODUCT-OWNER APPROVAL. DRAFT — NOT LINGUISTICALLY REVIEWED.** Every placement item, threshold and recommendation rule below is a hypothesis to calibrate in the placement pilot (tracker RS-08) and to review with an Arabic teacher and an ustadz ([ADR-004 D-7](../decisions/0004-content-decisions.md#d-7-reviewers)). No item here is publishable content.
> **Date:** 14 November 2026.
> **Brief:** [audit brief](../ARABIC_CURRICULUM_SOURCES_AND_LICENSES.md) section D, Phases 3 and 4, and deliverable `ONBOARDING_SPEC.md` in section F.
> **Builds on:** [main research doc](../arabic-learning-pedagogy-ux-research-reissued.md) §1, §4, §6.1, §6.3, §7, §9, §10.1; [riset ulang](../research/2026-11-14-riset-ulang-kurikulum.md) §4; [COMPETENCY_GRAPH.md](./COMPETENCY_GRAPH.md) §1 and §4 (tracks, `G-READ`, `G-AUDIO`); [design direction](../design/taste.md).
> **Arabic:** none. Placement items use placeholders such as `[ARABIC: core shalat word from RS-04]`.
> **Licence:** our own text, CC BY-SA 4.0 (D-1). Usage type for every idea here: `independent-original`, informed by the research doc and NN/g guidance it cites (R14, R15). No third-party text, item or code is copied.

## 1. Goals and rules

| ID   | Rule                                                                                                                                                                                     | Basis                                                    |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| O-1  | **No account, no form.** No name, email, age or location is asked for, ever.                                                                                                             | Research doc §1 (MVP limits), §4.1 point 1               |
| O-2  | **First lesson immediately.** The primary call to action on `/` opens lesson 1 of unit 1, not a questionnaire.                                                                           | §4.1 points 1 and 4, §4.2                                |
| O-3  | **Value before questions.** The only onboarding question ("can you read vocalised Arabic?") comes after the first lesson, or when the learner chooses to answer it.                      | §4.1 point 4; R14, R15 (long onboarding does not help)   |
| O-4  | **One decision per screen**, always skippable. No wizard, no tour carousel.                                                                                                              | §4.1 point 3; taste.md "Avoid"                           |
| O-5  | **Placement is optional and never a block.** It recommends; the learner decides. Every recommendation screen has "Lewati" and an alternative route.                                      | Brief Phase 4; §4.2; research doc §0 point 7             |
| O-6  | **Audio-first route for non-readers.** A learner who cannot read Arabic yet can still use Jalur B through listening and meaning; only unassisted reading items are held back (`G-READ`). | Brief Phase 4; COMPETENCY_GRAPH §1 "Tracks", §4          |
| O-7  | **Route can change at any time** from `/progres/` and from the Iqra and Belajar pages, with no penalty and no lost progress.                                                             | §4.1 point 6; §6.1 (manual override)                     |
| O-8  | **Placement is not certification.** No CEFR or ACTFL level, no percentage, no pass or fail wording.                                                                                      | §2 (skills assessed separately), §10.1                   |
| O-9  | **Placement cannot establish mastery.** Mastery needs two occasions with unseen items (§6.1). Placement results only set a recommendation and a provisional reading flag (§3.4).         | Research doc §6.1; CURRICULUM_COMPARISON §5              |
| O-10 | **Corrective feedback after every placement item**, as in lessons, so the check itself teaches something.                                                                                | Riset ulang §4 (retrieval helps only with feedback, R11) |
| O-11 | **No speaking or recording** in onboarding; no automatic pronunciation score.                                                                                                            | §4.2, §6.3                                               |
| O-12 | **Nothing leaves the device.** Onboarding sends no data to any server. Pilot data for RS-08 is collected only if a learner chooses to export and share it.                               | `/tentang/` data statement; tracker RS-08                |

## 2. Entry flow

```text
/  (landing, static HTML)
 ├─ "Mulai belajar"  ──────────────▶ lesson 1 of U1 (core shalat words, audio-first by design)
 │                                     └─ lesson exit screen
 │                                          ├─ Q1 "Sudah bisa membaca tulisan Arab berharakat?" (optional)
 │                                          │     ├─ "Bisa"      → continue Jalur B, unassisted for short-vowel and sukun items only (§3.4)
 │                                          │     ├─ "Sedikit"   → offer placement check (core set)
 │                                          │     ├─ "Belum"     → offer /iqra/ AND audio-first Jalur B
 │                                          │     └─ "Lewati"    → continue Jalur B, no flag stored
 │                                          └─ "Cek kesiapan (opsional)" link → placement check
 ├─ "Belum bisa baca tulisan Arab?" ──▶ /iqra/ (Jalur A start, with a link back to audio-first Jalur B)
 └─ "Pilih titik mulai" tiles  ───────▶ /belajar/ or /iqra/
```

Why lesson 1 can come first for everyone: U1 (CB-01) has no prerequisite and is designed listen-first, so a non-reader still gets a first success (see the [U1 lesson brief](./lesson-briefs/u1-l01-kata-inti-shalat.md)). "First success" is the research doc's design metric (§4.2): sound, text and meaning linked, with understandable feedback, in one short session. It is not an empirical claim.

**Dependency:** lesson 1 cannot ship until its clips pass `G-AUDIO` (tracker A-01, A-02) and its items pass `G-REVIEW` (D-7, ustadz). Until then `/` keeps the current links to `/belajar/` and `/iqra/`.

## 3. Optional placement check

### 3.1 Shape

- **Length:** 3 to 6 items per run, drawn from the item bank in §3.2. Target under 3 minutes (UX hypothesis, §7).
- **Entry points:** lesson 1 exit screen, a panel on `/belajar/`, the Q1 answer "Sedikit", and `/progres/` ("Ulangi cek kesiapan").
- **Every item** has a visible "Saya belum tahu" option (recorded as `dont_know`, not as wrong) and a "Lewati soal" link. No timer, no countdown, no score during the run.
- **Order:** Q1 self-report first (one screen), then items, easiest first. The learner can stop at any item; partial results still produce a recommendation.
- **Feedback:** after each item, show the correct answer and one short reason in Indonesian, plus where it is taught ("Ini dipelajari di unit 2"). Pair colour with text and an icon (O-10, taste.md).
- **Location:** a prerendered page, proposed `/belajar/cek-kesiapan/` (new route; see §6). Without JavaScript the page shows the explanation and links to `/belajar/` and `/iqra/`.

### 3.2 Item bank (content placeholders)

Item types follow the research doc §4.2 list (sound to picture, read vocalised text, word meaning, sentence meaning, pattern difference), plus a sound-contrast item for non-readers. Skills follow `UserMastery.skill` in research doc §9.

| ID  | Type                    | Learner sees and does                                                                                                                                | Competency | Skill              | Needs reading? | Content status                                                            |
| --- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------ | -------------- | ------------------------------------------------------------------------- |
| P-0 | Sound contrast          | Plays two clips, answers "sama" or "beda". Pair: `[ARABIC: minimal pair, teacher to supply]`                                                         | CA-01      | listening          | No             | Blocked: pair list (tracker B0), reviewed audio                           |
| P-1 | Listen to meaning       | Plays a clip of `[ARABIC: core shalat word from RS-04]`, picks its Indonesian meaning from three written options                                     | CB-01      | listening, meaning | No             | Blocked: RS-04 list, ustadz review, reviewed audio                        |
| P-2 | Listen to picture       | Plays a clip of `[ARABIC: concrete noun from RS-01 list]`, picks one of three pictures, each with an Indonesian text label (D-6: concrete noun only) | CB-03      | listening, meaning | No             | Blocked: RS-01                                                            |
| P-3 | Read vocalised word     | Sees `[ARABIC: unseen word with short vowels and sukun only, teacher to supply]`, picks the matching clip from three                                 | CA-03      | decoding           | Yes            | Blocked: teacher item, reviewed audio                                     |
| P-4 | Read tasydid and tanwin | As P-3 with `[ARABIC: unseen word with tasydid or tanwin, teacher to supply]`                                                                        | CA-04      | decoding           | Yes            | Blocked: teacher item, reviewed audio                                     |
| P-5 | Sentence meaning        | Plays and shows `[ARABIC: pointing sentence for CB-04, teacher to supply]`, picks the matching scene. Audio-first runs hide the text                 | CB-04      | listening, meaning | Optional       | Blocked: RS-01 nouns, teacher sentence                                    |
| P-6 | Pattern difference      | Two phrases differing only in al- `[ARABIC: CB-05 contrast pair, teacher to supply]`; picks which one means "the specific one"                       | CB-05      | structure          | Optional       | Blocked: teacher pair; research doc §5.3 example is pending expert review |

### 3.3 Item sets

| Set           | Shown when                                         | Items                                            | Count  |
| ------------- | -------------------------------------------------- | ------------------------------------------------ | ------ |
| Audio-first   | Q1 = "Belum", or the learner picks "Tanpa membaca" | P-0, P-1, P-5 (text hidden)                      | 3      |
| Core          | Q1 = "Sedikit" or "Lewati", or no Q1 answer        | P-1, P-3, P-5                                    | 3      |
| Core extended | Q1 = "Bisa" and the learner opts in                | P-1, P-3, P-4, P-5, P-6 (+ P-2 when RS-01 lands) | 5 to 6 |

If any item in a set is not yet publishable, the set shrinks; a run with fewer than 3 publishable items is not offered, and the page says so in one sentence (the placement check never ships half-empty).

### 3.4 Recommendation rules (hypotheses, calibrate in RS-08)

Results are counted per skill, never as one total. `dont_know` and skipped items count as "not shown yet", not as errors.

| Observation                                      | Recommendation shown                                                                                                                                                                                                                                  | Stored effect                                                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| P-3 correct and P-4 correct                      | "Lanjutkan jalur utama." Primary: next Jalur B lesson. Secondary: "Lihat jalur fondasi".                                                                                                                                                              | `readingSupport: 'unassisted'`, `decodingProvisionalMarks: ['short_vowel', 'sukun', 'tasydid', 'tanwin']` |
| P-3 wrong or `dont_know`                         | "Anda bisa ikut jalur utama dengan bantuan audio, dan berlatih harakat di jalur fondasi." Primary: `/iqra/` at A2 (CA-03). Secondary: Jalur B with audio support.                                                                                     | `readingSupport: 'audio-first'`                                                                           |
| P-3 correct, P-4 wrong, `dont_know` or not shown | Jalur B; items with tasydid or tanwin keep audio support; suggest the A3 lessons.                                                                                                                                                                     | `readingSupport: 'unassisted'`, `decodingProvisionalMarks: ['short_vowel', 'sukun']`, CA-04 not flagged   |
| Audio-first set, P-1 or P-5 correct              | "Anda sudah bisa mulai memahami lewat suara." Primary: `/iqra/` from the start. Secondary: Jalur B audio-first.                                                                                                                                       | `readingSupport: 'audio-first'`                                                                           |
| _Note_                                           | `readingSupport: 'unassisted'` applies only to items whose mark tags are all in `decodingProvisionalMarks`; every other item (including long vowels / `mad`, which P-3 does not test) keeps audio support until a placement item or lesson covers it. |                                                                                                           |
| Audio-first set, nothing correct                 | Same two buttons, gentler copy; no "failed" wording.                                                                                                                                                                                                  | `readingSupport: 'audio-first'`                                                                           |
| P-1, P-5 and P-6 all correct (core extended)     | Offer, never force: "Mau langsung ke unit 2?" Unit 1 stays open and its words still enter review.                                                                                                                                                     | `suggestedStart: 'U2'` (suggestion only)                                                                  |

**Provisional reading flag and `G-READ`.** COMPETENCY_GRAPH §4 gates unassisted reading items on CA-03. A post-Iqra learner who never visits Jalur A would otherwise always get assisted items. Proposal (needs product-owner agreement because it interprets `G-READ`): `G-READ` is satisfied provisionally by any of (a) CA-03 mastered in Jalur A, (b) P-3 correct in placement, (c) the learner's own "Bisa" answer to Q1, consistent with the track-level assumption that Jalur B assumes CA-05. Because `G-READ` is checked per mark (COMPETENCY_GRAPH §4), (b) and (c) unlock only items tagged with short vowels and sukun alone, the marks P-3 tests. Items with tasydid or tanwin stay assisted unless P-4 was answered correctly (or CA-04 is mastered in Jalur A), and items with al- or hamzah waṣl stay assisted until CA-06 is mastered, since no placement item tests it. The audio button stays available on every item regardless. A learner can switch reading support on or off at any time in `/progres/`.

## 4. Routes to the Iqra track (Jalur A)

Every entry point is a plain link; none is a forced redirect.

| Entry point                                                             | Where                                      | Exists today?                            |
| ----------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------- |
| "Belum bisa baca tulisan Arab?" secondary link                          | `/` hero                                   | Yes (`src/routes/+page.svelte`)          |
| "Mulai dari huruf" start-point tile                                     | `/` "Pilih titik mulai"                    | Yes                                      |
| "Iqra" in the desktop header and the mobile menu                        | Site navigation (`src/lib/navigation.ts`)  | Yes (not in the mobile tab bar)          |
| "Ke jalur fondasi" button                                               | `/belajar/` empty state                    | Yes                                      |
| Q1 answer "Belum"                                                       | Lesson 1 exit screen, `/belajar/` panel    | Proposed                                 |
| Placement recommendation                                                | `/belajar/cek-kesiapan/`                   | Proposed                                 |
| Inline help on an assisted reading item: "Mau belajar membaca harakat?" | Any Jalur B item served with audio support | Proposed; shown at most once per session |
| "Ubah jalur"                                                            | `/progres/`                                | Proposed                                 |

**Inside `/iqra/`:** two starts, "Mulai dari huruf" (A1, CA-02) and "Saya sudah kenal huruf, mulai dari harakat" (A2, CA-03; self-chosen, no test). Every Jalur A page links back to "Belajar memahami lewat suara" (Jalur B, audio-first), so the two tracks can run in parallel. The join point is CA-05 (A4); reaching it sets `readingSupport: 'unassisted'` and offers to continue in Jalur B.

**Back from Jalur A:** a learner can leave Jalur A at any time; progress is kept.

## 5. Accessibility requirements

Target WCAG 2.2 AA (R32), plus the Arabic layout points in the research doc §7 (R28) and taste.md. These apply to onboarding, placement and the lesson shell.

| ID    | Requirement                                                                                                                                                                                                                                                                               |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1  | **Keyboard:** every control reachable and operable by keyboard in a logical order; visible focus style from taste.md; no keyboard trap in the placement run.                                                                                                                              |
| AC-2  | **Focus management:** after each step, move focus to the new step's heading; after feedback, to the feedback text. The step counter ("Soal 2 dari 3") is plain text, not only a bar.                                                                                                      |
| AC-3  | **Screen readers:** feedback is announced through a polite live region; correct or wrong is stated in words. Arabic runs carry `lang="ar" dir="rtl"`; the page stays `lang="id"` and LTR. Each audio button has a label naming what it plays ("Putar kata 1"), not the Arabic text alone. |
| AC-4  | **Audio:** tap to play only, never autoplay; replay always available; slower playback only if it keeps pitch and articulation (research doc §8); `preload="none"` or metadata only; a visible error with a text fallback if a clip fails.                                                 |
| AC-5  | **Deaf and hard-of-hearing learners and silent settings:** no listening item is required. "Saya tidak bisa memutar audio sekarang" skips listening items for the session without counting them. The audio-first set then falls back to Q1 plus the routes in §4.                          |
| AC-6  | **Touch targets:** 44 px minimum for every control (taste.md); answer options are full-width buttons on mobile. Tap, never drag-only (research doc §6.3).                                                                                                                                 |
| AC-7  | **No time pressure:** no timers, no speed scoring (research doc §6.1).                                                                                                                                                                                                                    |
| AC-8  | **Colour and motion:** correctness is never shown by colour or animation alone; transitions stop under `prefers-reduced-motion`; no confetti, streaks or mascots (taste.md "Avoid").                                                                                                      |
| AC-9  | **Themes and zoom:** light, dark and system themes; Arabic with harakat tested in both themes; usable at 200 % text zoom and at 375, 768 and 1280 px without page-level horizontal scroll.                                                                                                |
| AC-10 | **Plain language:** one short sentence per instruction; Indonesian first; Arabic grammar terms are never needed to complete onboarding.                                                                                                                                                   |
| AC-11 | **No JavaScript and low bandwidth:** landing, lesson text and route links work as static HTML; placement degrades to links (§3.1); audio files are small and fetched on tap; after assets load the lesson works offline (research doc §11, rule 7).                                       |
| AC-12 | **Storage unavailable** (private mode, blocked storage): everything still works; one sentence says progress will not be kept on this device.                                                                                                                                              |

## 6. What is stored locally

Everything stays in the learner's browser. Follows research doc §9 (IndexedDB for progress, `localStorage` for preferences) and AGENTS.md (stable IDs, never only slugs; content revision stored).

| Store                              | Key or table (proposed)                                       | Fields                                                                                                                                                                                                                                                                                           | Why                                                                 |
| ---------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `localStorage` (exists)            | `belajar-bahasa-arab:theme:v{N}` (`src/lib/theme/storage.ts`) | Theme preferences                                                                                                                                                                                                                                                                                | Already shipped (F-01)                                              |
| `localStorage` (proposed)          | `belajar-bahasa-arab:onboarding:v1`                           | `schemaVersion`; `route` (`'belajar'`, `'iqra'`, `'both'`, or null); `q1Answer` (`'bisa'`, `'sedikit'`, `'belum'`, `'skipped'`, or null); `readingSupport` (`'unassisted'`, `'audio-first'`); `audioUnavailable` (session only, not persisted); `dismissedPrompts` (IDs); `lastVisitedLessonId`  | Small preferences read before first paint                           |
| IndexedDB (proposed, part of F-07) | `placementRuns`                                               | `runId`, `startedAt`, `contentVersion`, `set`, per item `{ itemId, competencyId, skill, outcome: 'correct' \| 'incorrect' \| 'dont_know' \| 'skipped' }`, `recommendation`, `suggestedStart`, `decodingProvisionalMarks` (list of mark tags: `short_vowel`, `sukun`, `tasydid`, `tanwin`, `mad`) | Shown on `/progres/`; input to RS-08 only if the learner exports it |
| IndexedDB (F-07)                   | lesson progress, review queue, bookmarks                      | As designed in F-07 and F-09; keyed by stable lesson and item IDs                                                                                                                                                                                                                                | Not part of onboarding, listed for completeness                     |

**Not stored anywhere:** names, email, age, gender, location, device fingerprints, audio recordings, free-text answers, analytics IDs. No cookies are set for onboarding.

**Learner controls on `/progres/`:** view the last placement result per skill; change route and reading support; retake the check; export all local data as JSON; import it on another device; delete all local data (with a confirmation that names what will be removed and that it cannot be undone).

**Versioning:** every record carries `schemaVersion` and `contentVersion`; a migration runs on load. If an item ID in an old run no longer exists, the run is kept but marked "soal sudah diperbarui".

## 7. Mapping to existing routes

Current routes all exist as prerendered pages (`src/routes/`, `prerender = true`, `trailingSlash = 'always'`). Most show empty states today.

| Route                             | Today                                                                                                                                                                        | Onboarding behaviour (proposed)                                                                                                                                                                                                                                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                               | Hero with "Mulai belajar" (to `/belajar/`) and "Belum bisa baca tulisan Arab?" (to `/iqra/`); "Tanpa akun" and "Data tersimpan di perangkat Anda" signals; start-point tiles | When lesson 1 is published, "Mulai belajar" links straight to it (static link, works without JS). Progressive enhancement: a returning visitor with `lastVisitedLessonId` sees "Lanjutkan" instead. A one-sentence demo with audio is added only when a reviewed clip exists. No modal, no pop-up question on arrival. |
| `/belajar/`                       | Empty state with "Ke jalur fondasi"                                                                                                                                          | Unit map (U1 first). First visit: "Mulai pelajaran 1" primary. After lesson 1: a dismissible Q1 panel and a "Cek kesiapan (opsional)" link. If `readingSupport` is `'audio-first'`, a short note says audio support is on and how to change it.                                                                        |
| `/belajar/cek-kesiapan/` (new)    | Does not exist                                                                                                                                                               | Placement check (§3). Prerendered explanation plus links; the interactive run needs JS. Not in the navigation; reached from the entry points in §3.1.                                                                                                                                                                  |
| `/belajar/<unit>/<lesson>/` (new) | Does not exist                                                                                                                                                               | Lesson pages. URL scheme to be fixed in F-04 and F-05; progress is keyed by lesson ID, not slug. Lesson 1 exit screen hosts Q1.                                                                                                                                                                                        |
| `/iqra/`                          | Empty state with "Lihat jalur utama"                                                                                                                                         | Two starts (A1 or A2), each lesson links back to audio-first Jalur B; join point at CA-05 (§4).                                                                                                                                                                                                                        |
| `/kosakata/`                      | Collections "Kosakata harian" and "Al-Qur'an dan bacaan shalat", empty until items are published                                                                             | Not an onboarding step. After lesson 1, its words appear in "Al-Qur'an dan bacaan shalat" only once approved by an ustadz (`REQUIRED_REVIEWER.quran`). Empty state for new visitors links to lesson 1.                                                                                                                 |
| `/progres/`                       | Empty state "Belum ada progres di perangkat ini"                                                                                                                             | Shows route, reading support and the last placement result as one plain sentence per skill (no percentage); "Ubah jalur", "Ulangi cek kesiapan", export, import, delete.                                                                                                                                               |
| `/latihan/`                       | Empty state                                                                                                                                                                  | Review items from lesson 1 appear here after it is finished; placement items never enter review.                                                                                                                                                                                                                       |
| `/tentang/`                       | Data and privacy section mentions IndexedDB                                                                                                                                  | Add one sentence on placement data and the delete option when this ships.                                                                                                                                                                                                                                              |

## 8. Measures (design metrics, not learning claims)

From research doc §10.1: time to first lesson, first task completion, share of learners who skip Q1 or placement (a high share is acceptable), route changes after placement, and delayed recall on lesson 1 items. These are measured only in moderated tests or from data a learner chooses to export (O-12).

## 9. Dependencies and open points

| ID    | Item                                                                                                                                                                                                                                                                                                      | Owner or blocker              |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| OP-1  | Reviewed audio for lesson 1 and placement items (`G-AUDIO`)                                                                                                                                                                                                                                               | A-01, A-02                    |
| OP-2  | Core shalat word list (P-1, lesson 1)                                                                                                                                                                                                                                                                     | RS-04, ustadz                 |
| OP-3  | Concrete noun list (P-2, P-5)                                                                                                                                                                                                                                                                             | RS-01                         |
| OP-4  | Teacher-supplied items for P-0, P-3, P-4, P-6                                                                                                                                                                                                                                                             | Arabic teacher (D-7)          |
| OP-5  | Recommendation thresholds in §3.4                                                                                                                                                                                                                                                                         | RS-08 pilot, 5 to 10 learners |
| OP-6  | Whether a self-declared "Bisa" may satisfy `G-READ` provisionally (§3.4). Interaction: (b) and (c) cover short-vowel and sukun items only; the Core set has no P-4, so its learners keep audio support on tasydid and tanwin items. Alternative for the product owner: add P-4 to the Core set (4 items). | Product owner                 |
| OP-7  | Transliteration as an alternative reading aid for non-readers                                                                                                                                                                                                                                             | RS-07                         |
| OP-8  | Data schema and migrations for `placementRuns`                                                                                                                                                                                                                                                            | F-04, F-07                    |
| OP-9  | Whether `/belajar/cek-kesiapan/` is a route or a panel inside `/belajar/`                                                                                                                                                                                                                                 | Product owner, usability test |
| OP-10 | Learners from the third profile (studied nahwu or sharaf before): is "Core extended" plus the U2 suggestion enough, or is a separate review path needed (research doc §1 "Jalur review")?                                                                                                                 | Teacher review, RS-08         |
