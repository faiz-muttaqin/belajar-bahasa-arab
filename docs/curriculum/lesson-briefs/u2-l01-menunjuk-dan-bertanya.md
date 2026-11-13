DRAFT — NOT LINGUISTICALLY REVIEWED

# Lesson brief: U2 lesson 1, pointing and asking

> **Status:** sample lesson brief for the [audit brief](../../ARABIC_CURRICULUM_SOURCES_AND_LICENSES.md) section D, Phase 5. A specification for writers and reviewers, not lesson content.
> **Date:** 14 November 2026.
> **Arabic:** only hādhā, mā and man, which [ADR-004 D-4](../../decisions/0004-content-decisions.md#d-4-first-units-of-the-main-path) lists. Nouns, sentence word order and term names are placeholders: the noun list is blocked on RS-01, and word order and terms are teacher decisions. Nothing is invented.

| Field          | Value                                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Lesson ID      | `lesson-u2-01` (proposed)                                                                                                  |
| Track and unit | Jalur B, U2 "Menunjuk" (first step of the Madinah-like order, D-4 point 2)                                                 |
| Competencies   | CB-04 Menunjuk dan bertanya (main); CB-03 Benda di sekitar (nouns introduced in the same lesson, soft edge CB-03 to CB-04) |
| Tracker        | B2, B8 (part), B1, V-01                                                                                                    |
| Order evidence | [C] Madinah-like order starts with pointing and question words (CURRICULUM_COMPARISON §3, M1, M2). Not a validated order.  |
| Length         | 3 to 7 minutes (UX hypothesis)                                                                                             |

## 1. Audience, outcome, prerequisite

- **Audience:** post-Iqra Indonesian adults who have met U1; audio-first learners can follow with audio support on every text item.
- **Outcome (can-do, draft):** "Saya bisa memahami 'ini apa?' dan 'ini siapa?' tentang benda di sekitar." Measurable form from CB-04: understands an unseen pointing sentence or question about a pictured scene and picks the matching picture, on two separate occasions. This lesson is occasion one with taught nouns; the unseen-item occasion comes in lesson 2 or review.
- **Prerequisites:** soft CB-03 (nouns to point at; introduced in step 3 of this lesson). No hard prerequisite. `G-READ` applies per item: items are tagged with the marks they contain, so an item with tanwin also needs CA-04 for unassisted reading, otherwise it is served with audio support (COMPETENCY_GRAPH §4).
- **Scope:** near pointing word **hādhā**; question words **mā** (things) and **man** (people). The far pointing word is out of scope (CURRICULUM_COMPARISON §7 question 2). A yes/no question form, which M1 also includes, is deferred to a teacher decision.

## 2. Items (placeholders)

| Item ID            | Arabic                                                                               | Indonesian meaning     | `concreteness` | Icon or picture                                                    |
| ------------------ | ------------------------------------------------------------------------------------ | ---------------------- | -------------- | ------------------------------------------------------------------ |
| `cb03-noun-01..03` | `[ARABIC: concrete noun from RS-01 list]` (three things)                             | `[GLOSS: teacher]`     | concrete       | Yes: registry icon (`VocabIconKey`), Indonesian label always shown |
| `cb03-noun-04`     | `[ARABIC: concrete noun for a person from RS-01 list]`                               | `[GLOSS: teacher]`     | concrete       | Picture: style decision (§5)                                       |
| `cb04-word-01`     | hādhā `[ARABIC: vocalised form, teacher to confirm]`                                 | "ini" (CB-04 record)   | function       | None                                                               |
| `cb04-word-02`     | mā `[ARABIC: vocalised form, teacher to confirm]`                                    | "apa" (CB-04 record)   | function       | None                                                               |
| `cb04-word-03`     | man `[ARABIC: vocalised form, teacher to confirm]`                                   | "siapa" (CB-04 record) | function       | None                                                               |
| `cb04-sent-01`     | `[ARABIC: hādhā + noun-01, teacher to supply]`                                       | `[GLOSS: teacher]`     | n/a            | Scene                                                              |
| `cb04-q-01`        | `[ARABIC: question "what is this?" with mā and hādhā, teacher to supply word order]` | "Apa ini?"             | n/a            | Scene                                                              |
| `cb04-q-02`        | `[ARABIC: question "who is this?" with man and hādhā, teacher to supply word order]` | "Siapa ini?"           | n/a            | Scene                                                              |

- Research doc §5.2 (B1) and §5.3 (visual example 1) contain a candidate noun and a pointing sentence, both flagged there as needing expert review; they may be used only if RS-01 and the teacher confirm them.
- Script: vocalised Naskh, our own text, reviewed (D-2, MSA surface). `register: 'msa'`.

## 3. Lesson flow

| Step | Name            | What the learner does                                                                                                                                                                                                                                                                                                         | Phase 5 point |
| ---- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| 1    | Hook            | A simple scene: a hand points at one object on a table. Indonesian prompt: "Bagaimana menunjuk benda ini dalam bahasa Arab?"                                                                                                                                                                                                  | 1             |
| 2    | Listen first    | Taps play on `cb04-sent-01` (text hidden). Chooses which of two scenes it describes. Then the text appears.                                                                                                                                                                                                                   | 2, 3          |
| 3    | Associate nouns | Three things and one person, each: picture with Indonesian label, audio button, Arabic text. One screen per noun (one focus per viewport, research doc §4.3).                                                                                                                                                                 | 3, 4          |
| 4    | Word by word    | `cb04-sent-01`, `cb04-q-01` and `cb04-q-02` with tappable words: each tap plays the word and shows its meaning. Caveats shown: "'adalah' tidak ditulis" (CB-06, research doc §5.2 B3) and "Satu kata Arab tidak selalu sama dengan satu kata Indonesia."                                                                      | 5             |
| 5    | Notice          | Two questions side by side, one about a thing and one about a person. Guiding question: "Kata tanya mana yang berubah, dan kenapa?" (CB-04 Grammar exercise: thing vs person).                                                                                                                                                | 5             |
| 6    | Explain         | Indonesian first: "Untuk menunjuk benda yang dekat, kita bilang 'ini'. Untuk bertanya tentang benda: 'apa'; tentang orang: 'siapa'." Then reveal the Arabic labels: `[TERM: class name for pointing words, teacher to supply]` and `[TERM: class name for question words, teacher to supply]`. Terms are shown, never tested. | 6             |
| 7    | Application 1   | **Answer a picture question.** Hears `cb04-q-01` about a pictured thing; builds the answer from word tiles (tap, not drag; research doc §6.3). Each tile has its own audio button.                                                                                                                                            | 7             |
| 8    | Application 2   | **Thing or person?** New scene with a person and a thing; the learner chooses mā or man for each pointing gesture, then hears the full question to check.                                                                                                                                                                     | 7             |
| 9    | Retrieval check | **Picture hidden, recall the meaning.** Hears `[ARABIC: hādhā + one of the lesson's nouns]` with no picture and no options visible: "Apa artinya? Ingat dulu, lalu buka." Reveals, then self-rates. This applies D-6: the exercise after association hides the picture.                                                       | 7             |
| 10   | Exit            | One-sentence summary; nouns and question words enter review with separate recognition and recall states. Preview: "Berikutnya: membedakan 'sebuah buku' dan 'buku tertentu'" (CB-05), final wording `[GLOSS: teacher to supply]`; al- is not glossed as "itu" (§8).                                                           | 7             |

## 4. Audio

- One clip per noun, per pointing or question word, and per sentence; proposed IDs `aud-cb03-noun-01`, `aud-cb04-q-01`, and so on; manifest fields per research doc §8.
- Voicebox (A-01) is acceptable for MSA items if the audio listener approves each take; pause form at the end of the sentence must match the vocalised text (research doc §8 quality gate). `G-AUDIO` applies.
- Tap to play, replay, optional slower playback, no autoplay, fetched on tap; on failure the item shows text and meaning and stays completable.

## 5. Icons and images (D-6)

- **Concrete nouns only** get an icon from the curated registry; the Indonesian meaning is always shown next to it; `validateVocab` rejects an icon on any non-concrete item.
- **hādhā, mā, man are function words: no icon.** The pointing hand in scenes is context, not an icon for hādhā.
- **The next exercise after association hides the picture** (step 9). Steps 7 and 8 may show scenes because they test sentence meaning, not noun recall.
- Person picture style (simple figure, silhouette or none): **assumption to confirm** with the product owner; text label always present.

## 6. Feedback

- After every item: state the correct answer and one reason in Indonesian, for example "'siapa', karena yang ditunjuk adalah orang". Riset ulang §4: corrective feedback is required for retrieval to help.
- For tile answers, highlight the first wrong tile with a text marker ("kata ini") as well as colour, then show the full correct answer with audio.
- One retry with the model sentence visible, then continue. No penalty, no streak.

## 7. Accessibility

- Arabic runs `lang="ar" dir="rtl"`; tile rows are RTL inside an LTR page; keyboard order follows reading order (right to left within the Arabic row) and is announced ("Kata 1 dari 3").
- Scenes have text alternatives describing what is pointed at, without giving away the answer before the learner chooses.
- Tiles and options are 44 px buttons; no drag-only interaction.
- Feedback in a polite live region; focus to next step heading; reduced motion; light and dark checked with harakat.
- Audio-off mode: listening steps become reading steps; for learners without decoding, every text tile keeps its audio button (`G-READ` assisted route).

## 8. Analogy caveats and common errors

- Indonesian "ini" maps neatly onto the near pointing word, but Arabic pointing words also change with grammatical gender (CB-10, U6). Say in the Explain step that this comes later, so it does not surprise learners (CB-04 record).
- Do not gloss al- as "itu" in the preview, because "itu" is itself an Indonesian pointing word (CB-05 record).
- "adalah" is not written in these sentences; do not suggest the sentence is incomplete (research doc §5.3).
- Teacher to list common errors of Indonesian learners for this lesson (`commonErrors` field, COMPETENCY_GRAPH §1).

## 9. Source and licence metadata

- Lesson text: `PROJECT_ORIGINAL`, CC BY-SA 4.0 (D-1). Order fact (pointing and questions first) from a summary of a commercial course: order only, no text (CURRICULUM_COMPARISON §2, key M).
- Imported third-party material: **zero**.

Evidence ledger rows (brief section E). Inspiration-only third-party material is not a ledger row and is not keyed to a shipping asset ID; it is listed under research references below. `linguistic_review` is `pending` until a reviewer decides.

| `asset_id`                    | `kind`             | `source_url`                                                         | `source_repo_sha`     | `source_license`                 | `usage_type`                           | `compatibility_checked` | `linguistic_review`      | `publication_status` |
| ----------------------------- | ------------------ | -------------------------------------------------------------------- | --------------------- | -------------------------------- | -------------------------------------- | ----------------------- | ------------------------ | -------------------- |
| `lesson-u2-01/structure`      | `lesson_structure` | Our research doc §7; CURRICULUM_COMPARISON CB-03, CB-04              | `34e8aca` (this repo) | `PROJECT_ORIGINAL`               | `independent-original`                 | true: own work          | pending                  | research-only        |
| `lesson-u2-01/explanation-01` | `text`             | N/A                                                                  | N/A                   | `PROJECT_ORIGINAL`               | `independent-original`                 | true: own work          | pending                  | research-only        |
| `lesson-u2-01/nouns`          | `example`          | RS-01 source (not yet found)                                         | N/A                   | To record                        | To record                              | false: RS-01 open       | pending                  | blocked              |
| `lesson-u2-01/sentences`      | `example`          | Teacher-supplied                                                     | N/A                   | `PROJECT_ORIGINAL`               | `independent-original`                 | true: own work          | pending                  | blocked              |
| `lesson-u2-01/icons`          | `image`            | Curated icon registry (`src/lib/components/learning/vocab-icons.ts`) | this repo             | Per icon set licence, to confirm | `independent-original` or `collection` | false: to check         | pending                  | research-only        |
| `aud-cb03-*`, `aud-cb04-*`    | `audio`            | Voicebox take or human recording (A-01)                              | N/A                   | To record per clip (RS-05)       | `independent-original`                 | false: RS-05 open       | pending (audio listener) | blocked              |

Research references (inspiration only, nothing copied, nothing ships from these):

- Madinah Arabic free grammar pages (order fact only: pointing and questions first), https://madinaharabic.com/free-content/grammar, and the riset ulang §6 summary. Licence: `UNKNOWN` (no reuse licence). No expression used.
- Lingo Lessons lesson micro-sequence (compared, nothing copied): https://github.com/Open-Apps-Studio/lingo-lessons/blob/dcdd61268126c780499ef5e74a5874d2f9bb99b8/src/app/lesson/%5Bid%5D.tsx at `dcdd6126…`, as cited in CURRICULUM_COMPARISON CB-03. Licence: UNKNOWN (root LICENSE is Expo MIT boilerplate; authors' grant unconfirmed).

## 10. Reviewer status

| Role           | Needed for                                                      | Status                                                                  |
| -------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Arabic teacher | Nouns, sentences, word order, vocalisation, term names, caveats | Not reviewed (required: `REQUIRED_REVIEWER.harian` is `arabic_teacher`) |
| Audio listener | Every clip                                                      | Not reviewed                                                            |
| Ustadz         | Not needed unless a Qur'anic example is added                   | n/a                                                                     |

Tracker stage: 0 Idea for B2 (blocked by RS-01 for nouns).

## 11. Open questions for reviewers

1. Should the far pointing word come in this unit or with the feminine forms (CURRICULUM_COMPARISON §7 question 2)?
2. Is introducing three things and one person, plus three function words, too much for one lesson (riset ulang §9 gap on words per lesson)?
3. Which term names (if any) to reveal in step 6, and their Indonesian spelling (RS-07)?
4. Should the yes/no question form from M1 be its own lesson?
