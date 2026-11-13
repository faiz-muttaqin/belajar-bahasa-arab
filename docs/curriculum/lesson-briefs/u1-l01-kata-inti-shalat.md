DRAFT — NOT LINGUISTICALLY REVIEWED

# Lesson brief: U1 lesson 1, core shalat words

> **Status:** sample lesson brief for the [audit brief](../../ARABIC_CURRICULUM_SOURCES_AND_LICENSES.md) section D, Phase 5. A specification for writers and reviewers, not lesson content. Nothing here is publishable until the review gates below are met.
> **Date:** 14 November 2026.
> **Arabic:** transliterations only where [ADR-004 D-4](../../decisions/0004-content-decisions.md#d-4-first-units-of-the-main-path) already lists them. Arabic script, Indonesian glosses and prayer-position notes are placeholders for the ustadz and the RS-04 inventory. Nothing is invented.

| Field           | Value                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lesson ID       | `lesson-u1-01` (proposed; stable once used)                                                                                                                                   |
| Track and unit  | Jalur B (main, post-Iqra), U1 "Shalat"                                                                                                                                        |
| Competency      | CB-01 Kata inti bacaan shalat ([COMPETENCY_GRAPH](../COMPETENCY_GRAPH.md), [CURRICULUM_COMPARISON §5](../../research/CURRICULUM_COMPARISON.md#cb-01-kata-inti-bacaan-shalat)) |
| Tracker         | V-04, RS-04                                                                                                                                                                   |
| Decision basis  | ADR-004 D-4 (unit 1), D-5 (core words only, variants later), D-6 (icons), D-7 (ustadz review)                                                                                 |
| Length          | 3 to 7 minutes (UX hypothesis, research doc §7)                                                                                                                               |
| Vocabulary home | `/kosakata/`, collection `quran` ("Al-Qur'an dan bacaan shalat"), `register: 'classical'`                                                                                     |

## 1. Audience, outcome, prerequisite

- **Audience:** Indonesian adults who say the daily prayers and hear these words many times a day. Post-Iqra readers and non-readers alike: the lesson is listen-first, so a learner on the audio-first route (onboarding O-6) completes it fully.
- **Outcome (can-do, draft):** "Saya tahu arti kata inti yang saya ucapkan dalam shalat." Measurable form from CB-01: hears or reads a core word in context and chooses its Indonesian meaning, then recalls the meaning without options; both on two separate occasions, with the word met in a different place in the prayer sequence. This lesson is occasion one; the review queue supplies occasion two.
- **Prerequisite:** none (entry node). Reading items fall under `G-READ`; when it is not satisfied, the same items are served with audio support.
- **Scope of lesson 1 (hypothesis):** two or three of the six D-4 words, for example **Allāhu akbar**, **subḥāna**, **rabbī**. The remaining words (al-ʿaẓīm, al-aʿlā, as-salāmu ʿalaikum) go to lessons 2 and 3. Final selection and order come from RS-04 and the ustadz.

## 2. Items (placeholders)

| Item ID          | Arabic                                                                                                    | Indonesian meaning              | Context note                                        | `concreteness` | Icon |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------- | -------------- | ---- |
| `cb01-item-01`   | `[ARABIC: Allāhu akbar, vocalised, from RS-04]`                                                           | `[GLOSS: ustadz to supply]`     | `[CONTEXT: where in the prayer it is said, ustadz]` | abstract       | None |
| `cb01-item-02`   | `[ARABIC: subḥāna, vocalised, from RS-04]`                                                                | `[GLOSS: ustadz to supply]`     | `[CONTEXT: ustadz]`                                 | abstract       | None |
| `cb01-item-03`   | `[ARABIC: rabbī, vocalised, from RS-04]`                                                                  | `[GLOSS: ustadz to supply]`     | `[CONTEXT: ustadz]`                                 | abstract       | None |
| `cb01-phrase-01` | `[ARABIC: a short core recited phrase containing items 02 and 03, shared wording only (D-5), from RS-04]` | `[GLOSS: phrase-level, ustadz]` | `[CONTEXT: ustadz]`                                 | n/a            | None |

- **Script surface:** these are prayer words, not Qur'anic quotations, so the working assumption is vocalised Naskh written and reviewed by us (D-2, riset ulang §3). **Assumption:** the ustadz confirms this per item; any item that is a Qur'anic quotation is shown from Tanzil Uthmani verbatim, labelled separately (D-2, CB-01 record).
- **Variants:** only the shared core wording appears (D-5). Words that differ by practice (for example the tasbih addition named in D-5) are not shown here; a neutral link points to the later optional variants panel (CB-02).

## 3. Lesson flow

Steps follow the research doc §7 cycle. The right-hand column maps each step to brief Phase 5.

| Step | Name            | What the learner does                                                                                                                                                                                                                                                                                       | Phase 5 point |
| ---- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| 1    | Hook            | One sentence in Indonesian: "Anda mengucapkan kata-kata ini setiap hari. Apa artinya?" No glossary, no list.                                                                                                                                                                                                | 1             |
| 2    | Listen first    | Taps play on item 01 (no autoplay). Question: "Di bagian shalat mana Anda mendengar ini?" Options are text labels of prayer moments `[CONTEXT: ustadz]`. Arabic text is hidden until after the answer.                                                                                                      | 2, 3          |
| 3    | Associate       | Arabic text appears with the audio button and the Indonesian meaning. Repeat for items 02 and 03.                                                                                                                                                                                                           | 3, 4          |
| 4    | Word by word    | Plays `cb01-phrase-01`; the learner taps each word to hear it and see its meaning. Token boundaries follow our segmentation rule (riset ulang §3; rule to be written and confirmed by the teacher). Caveat shown: "Arti frasa bukan gabungan arti per kata."                                                | 5             |
| 5    | Notice          | "Kata yang sama muncul di dua bacaan." Learner taps where `[ARABIC: core shalat word from RS-04]` appears in two phrases. No grammar label.                                                                                                                                                                 | 5             |
| 6    | Explain         | Indonesian first: a short note that these are words learners already say, now with meanings, and that one phrase gloss is not a word-for-word translation. Arabic term revealed after: none needed in this lesson (CB-01 has no grammar term). Optional panel "Mengapa demikian?" holds the adab note (§8). | 6             |
| 7    | Application 1   | **Where is it said?** Text sequence of prayer moments `[CONTEXT: ustadz]`; the learner places item 01 at the right moment(s). Meaningful because it links the word to the learner's own practice.                                                                                                           | 7             |
| 8    | Application 2   | **Spot the word in a longer phrase.** Hears a recited core phrase and taps the word that means `[GLOSS: item 02 or 03]` (CB-01 Listen exercise). Text hidden on the first try, shown on retry.                                                                                                              | 7             |
| 9    | Retrieval check | **Recall without options.** Shows `[ARABIC: item 02 or 03]` (audio available, meaning hidden). "Apa artinya? Ingat dulu, lalu buka." Learner taps "Tampilkan", sees the meaning and rates "Saya ingat" or "Belum". No options are visible before the reveal.                                                | 7             |
| 10   | Exit            | One-sentence summary; "Kata ini akan muncul lagi di Latihan." Items enter the review queue (F-09) with separate recognition and recall states (pattern noted from AV in CURRICULUM_COMPARISON, re-implemented). Onboarding Q1 appears here (ONBOARDING_SPEC §2).                                            | 7             |

**Review with the image hidden:** this lesson uses no images (§5), so the D-6 "hide the picture" rule has nothing to hide; the equivalent rule applies to text: steps 8 and 9 hide the meaning and, on the first try, the Arabic text.

## 4. Audio

- One clip per item and one for `cb01-phrase-01`; proposed IDs `aud-cb01-item-01` and so on. Manifest fields per research doc §8 (`id`, `arabicText`, `variant`, `speaker/voice`, `engine/version`, `audioPath`, `durationMs`, `reviewStatus`, `reviewer`, `license`, `textVersion`).
- **Human recording preferred** for prayer words; Voicebox output only if the audio listener and the ustadz approve each take (tracker A-01, A-02; brief Phase 5 note on validating models, voices and outputs). Licence of model, voice and output recorded per clip (RS-05).
- Tap to play, replay always visible, slower playback optional (only if pitch and articulation survive), no autoplay, `preload="none"`.
- **Low-bandwidth fallback:** clips are fetched on tap; if one fails, the item shows the Arabic text, meaning and a one-line error; the item can be completed without audio.
- `G-AUDIO`: a listening step is shown only if its clip has a reviewed manifest entry. Without reviewed clips this lesson does not ship.

## 5. Icons and images (D-6)

- All items are abstract or phrases, so **no icons**. Meaning is carried by the Indonesian gloss and a short context line.
- Prayer moments are named in text (for example by their usual Indonesian names, `[CONTEXT: ustadz]`), not drawn. **Assumption:** no human figures in prayer positions; style decision for the product owner and ustadz.

## 6. Feedback

- **After every item**, correct or not: state the correct answer, then one reason in Indonesian (for example where the word is said, or which word in the phrase carries the meaning). Riset ulang §4: retrieval helps only with corrective feedback.
- Wrong answers are never only red: text label "Belum tepat" plus an icon, then the correct answer. Correct answers: "Tepat" plus the reason, not only a tick.
- Retry once with the text shown; then move on. No penalty, no lives, no streak.
- For the self-rated recall in step 9, "Belum" schedules the item sooner; it is never shown as a failure.

## 7. Accessibility

- Arabic in Noto Naskh Arabic with `lang="ar" dir="rtl"` on each run (`ArabicText`); Indonesian in Plus Jakarta Sans; page stays `lang="id"`, LTR (taste.md).
- Word-by-word taps are buttons with labels ("Kata 2 dari 3, putar dan lihat arti"), keyboard operable, 44 px targets.
- Feedback in a polite live region; focus moves to the next step heading.
- "Saya tidak bisa memutar audio sekarang" turns listening steps into reading steps for the session (ONBOARDING_SPEC AC-5).
- Light and dark themes; harakat checked in both; reduced motion respected; no time limits.
- Lesson page in focus mode (tab bar hidden, taste.md) with a visible exit link.

## 8. Analogy caveats and common errors

- Learners may treat a memorised phrase as one word; show word boundaries and say a phrase gloss is not a word-by-word gloss (CB-01 record).
- Meaning carried over from an Indonesian loanword can mislead (riset ulang §1 point 9, RS-07). Teacher and ustadz to list the relevant loanwords.
- No grammar claim in this lesson. Whether any item can later illustrate attached pronouns (CB-12) is an open teacher question (CURRICULUM_COMPARISON §7 question 6); this lesson says nothing about it.
- **Adab note (hypothesis, ustadz to word):** this lesson is for study outside the prayer; it does not suggest analysing words during the prayer (CB-01 record keeps CT's practice as a note, inspiration only).

## 9. Source and licence metadata

- Lesson text: `PROJECT_ORIGINAL`, CC BY-SA 4.0 (D-1). Prayer word list: RS-04 inventory with hadith references, not yet done. Organisational references (NU Online, Majelis Tarjih Muhammadiyah) are linked, never copied (riset ulang §3).
- Imported third-party material: **zero**.

Evidence ledger rows (brief section E). Fields not shown are `N/A` for original items. Inspiration-only third-party material is not a ledger row and is not keyed to a shipping asset ID; it is listed under research references below. `linguistic_review` is `pending` until a reviewer decides.

| `asset_id`                    | `kind`             | `source_url`                                     | `source_repo_sha`     | `source_license`                                                                    | `usage_type`           | `compatibility_checked` | `linguistic_review`              | `publication_status` |
| ----------------------------- | ------------------ | ------------------------------------------------ | --------------------- | ----------------------------------------------------------------------------------- | ---------------------- | ----------------------- | -------------------------------- | -------------------- |
| `lesson-u1-01/structure`      | `lesson_structure` | Our research doc §7; CURRICULUM_COMPARISON CB-01 | `34e8aca` (this repo) | `PROJECT_ORIGINAL`                                                                  | `independent-original` | true: own work          | pending                          | research-only        |
| `lesson-u1-01/explanation-01` | `text`             | N/A                                              | N/A                   | `PROJECT_ORIGINAL`                                                                  | `independent-original` | true: own work          | pending                          | research-only        |
| `lesson-u1-01/item-01..03`    | `example`          | RS-04 inventory (pending)                        | N/A                   | `PROJECT_ORIGINAL` for glosses; prayer wording from hadith texts, edition to record | `independent-original` | false: RS-04 not done   | pending (ustadz)                 | blocked              |
| `aud-cb01-*`                  | `audio`            | Human recording or Voicebox take (A-01)          | N/A                   | To record per clip (RS-05)                                                          | `independent-original` | false: RS-05 open       | pending (audio listener, ustadz) | blocked              |

Research references (inspiration only, nothing copied, nothing ships from these):

- Cahaya Tauhid workbook, pelajaran 08 (prayer words used as learning material): https://github.com/cahayatauhid/belajar-bahasa-arab/blob/d27cb0c549c782ca4f5a0c010bf9ea0a70f716d9/workbook/pelajaran-08/index.md at `d27cb0c5…`, as cited in SOURCE_INVENTORY (`av/recognition-recall-split`). Licence: CC BY-SA 4.0 (logo excluded). No expression used.
- Arabic Vocab recall states (idea re-implemented, no code): https://github.com/arifgov/Arabic-Vocab/blob/9b91347ea96fb457dcd7473d908a0a7c500290ce/public/main.js at `9b91347e…`, as cited in SOURCE_INVENTORY (`av/recognition-recall-split`). Licence: `UNKNOWN` (no standard licence).

Attribution text: none required for original items. If any CT wording were ever adapted, use the brief's attribution template; this brief adapts none.

## 10. Reviewer status

| Role           | Needed for                                             | Status                                             |
| -------------- | ------------------------------------------------------ | -------------------------------------------------- |
| Ustadz         | Word list, glosses, context notes, adab note, variants | Not reviewed (required: `REQUIRED_REVIEWER.quran`) |
| Arabic teacher | Segmentation rule, vocalisation, any language note     | Not reviewed                                       |
| Audio listener | Every clip                                             | Not reviewed                                       |

Review record per item: `reviews: [{ reviewer, role, date, decision, notes }]` (D-7, `src/lib/domain/review.ts`). Stage in the tracker pipeline: 1 Research.

## 11. Open questions for reviewers

1. Which two or three of the six D-4 words make the best lesson 1, and in which order?
2. Prayer-moment labels: which Indonesian names to use, and should NU and Muhammadiyah usage be named neutrally here or only in CB-02?
3. Does any item need Tanzil Uthmani instead of our vocalised Naskh?
4. Wording of the adab note.
