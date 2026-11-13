DRAFT — NOT LINGUISTICALLY REVIEWED

# Lesson brief: Jalur A, A2 lesson 1, short-vowel harakat

> **Status:** sample lesson brief for the [audit brief](../../ARABIC_CURRICULUM_SOURCES_AND_LICENSES.md) section D, Phase 5. A specification for writers and reviewers, not lesson content. Optional foundation track (Jalur A, `/iqra/`).
> **Date:** 14 November 2026.
> **Arabic:** none. Letters, syllables, words and the names of the vowel marks are placeholders for the Arabic teacher. Original exercises only; no reproduction of Iqra pages (tracker A1).

| Field          | Value                                                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lesson ID      | `lesson-a2-01` (proposed)                                                                                                                             |
| Track and step | Jalur A (optional foundation), A2 "Harakat, vokal panjang, sukun"; this lesson covers the short vowels only                                           |
| Competency     | CA-03 Membaca harakat, mad, sukun ([CURRICULUM_COMPARISON §5](../../research/CURRICULUM_COMPARISON.md#ca-03-membaca-harakat-vokal-panjang-dan-sukun)) |
| Tracker        | A2, R-03 (harakat chart)                                                                                                                              |
| Length         | 3 to 7 minutes (UX hypothesis)                                                                                                                        |

## 1. Audience, outcome, prerequisite

- **Audience:** Indonesian adults on the foundation track: beginners who have just met the letters, and Iqra learners who want to refresh decoding (placement recommendation "P-3 wrong", ONBOARDING_SPEC §3.4). Also reachable directly from `/iqra/` via "mulai dari harakat" without a test.
- **Outcome (can-do, draft):** reads unseen syllables and short words that use only the three short-vowel marks, checked against reviewed audio, on two separate occasions. Long vowels, sukun, tasydid and tanwin come in later lessons (CA-03 rest, CA-04).
- **Prerequisite:** **hard** CA-02 (a vowel mark cannot be read without identifying the letter that carries it; COMPETENCY_GRAPH §7). Applied narrowly: the lesson uses a small letter set, and any letter can be tapped to hear its sound and name. A learner who does not yet know the letters keeps the listen-along route (audio first, then text) instead of unassisted reading items, and is offered A1. No other gate.
- **Letter set (hypothesis):** three or four letters the teacher picks as easy to hear and see apart, `[ARABIC: letter set, teacher to choose]`; preferably letters that also occur in the U1 words, so step 8 can link to them.

## 2. Items (placeholders)

| Item ID            | Arabic                                                                                             | What it is                              |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `ca03-mark-01..03` | `[ARABIC: each short-vowel mark shown alone on tatweel]`                                           | The three marks, displayed per taste.md |
| `ca03-syl-01..09`  | `[ARABIC: each chosen letter with each short vowel, teacher to supply]`                            | Syllables for listening and decoding    |
| `ca03-word-01..04` | `[ARABIC: unseen short word with short vowels only, teacher to supply]`                            | Decoding transfer items                 |
| `ca03-pair-01`     | `[ARABIC: two words that differ only in one short vowel and differ in meaning, teacher to supply]` | Meaning link (CA-03 Meaning exercise)   |
| `ca03-link-01`     | `[ARABIC: core shalat word from RS-04]`                                                            | Cross-link to U1                        |

- Names of the marks: `[TERM: names of the three short-vowel marks, teacher to supply; spelling per RS-07]`. The general word "harakat" is already used in our docs.
- All items are `concreteness: 'function'` or not vocabulary at all, except any noun inside `ca03-pair-01` (see §5).

## 3. Lesson flow

| Step | Name                 | What the learner does                                                                                                                                                                                                                                                  | Phase 5 point |
| ---- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| 1    | Hook                 | Indonesian prompt: "Satu huruf bisa dibaca dengan bunyi yang berbeda. Dengarkan."                                                                                                                                                                                      | 1             |
| 2    | Listen first         | Three play buttons for one letter with each vowel (`ca03-syl-01..03`), text hidden. "Apa bedanya?" Learner picks "bunyi akhirnya berbeda" or "sama". Then the text appears.                                                                                            | 2, 3          |
| 3    | Associate            | Each syllable shown large (`arabic-display`) with its audio. Tapping a syllable highlights its mark by colour **and** shows a text label under it.                                                                                                                     | 3, 4          |
| 4    | Syllable by syllable | The "word by word" step for this track: a short word (`ca03-word-01`) split into tappable syllables; each tap plays the syllable. Caveat: "Huruf Latin di bawah ini hanya bantu baca, bukan bunyi yang persis sama" (once RS-07 decides whether Latin aids are shown). | 5             |
| 5    | Notice               | Same letter, three marks side by side; then a different letter with the same mark. Guiding question: "Yang menentukan bunyi vokal: hurufnya atau tandanya?"                                                                                                            | 5             |
| 6    | Explain              | Indonesian first: short vowels are shown by marks, not letters [teacher to confirm wording]; the learner has just heard three of them. Then reveal the Arabic labels: "harakat" and `[TERM: names of the three marks]`. A link opens the harakat chart (R-03).         | 6             |
| 7    | Application 1        | **Decode unseen syllables.** Sees a syllable with a letter from the set; picks the matching clip from three. Then the reverse: hears a syllable and picks the written form.                                                                                            | 7             |
| 8    | Application 2        | **Find it in a word you know.** Shows `ca03-link-01` from U1 with its audio; the learner taps the syllable that carries a given short vowel. Links decoding to a word learners already say.                                                                            | 7             |
| 9    | Retrieval check      | **Read before you hear.** Shows `ca03-word-02` (unseen, audio hidden). "Baca dalam hati atau pelan-pelan, lalu dengarkan." Learner taps reveal, hears the reviewed clip, self-rates "Sama" or "Belum". No automatic pronunciation score (research doc §6.3).           | 7             |
| 10   | Exit                 | One-sentence summary; syllables enter spaced decoding review with support fading over time (pattern idea from OLK `prim:reading-aid-fade`, inspiration only). Next: long vowels and sukun. Link: "Anda juga bisa mulai jalur utama dengan bantuan audio."              | 7             |

## 4. Audio

- One clip per syllable and per word; proposed IDs `aud-ca03-syl-01` and so on; manifest fields per research doc §8.
- **Human recording preferred** for this phonology lesson; the research doc §8 recommends human recordings where TTS is unreliable for short or isolated vocalised items. Voicebox takes only with audio-listener approval per take (A-01, A-02).
- Each clip must match its vocalised text exactly, including the final form (research doc §8). `G-AUDIO` applies; this lesson cannot ship without reviewed clips, because listening is its core.
- Tap to play, replay, no autoplay, optional slower playback only if articulation is preserved; fetched on tap; on failure, the item shows the text and a one-line error.

## 5. Icons and images (D-6)

- Letters, syllables and marks are not vocabulary: **no icons**.
- If `ca03-pair-01` contains a concrete noun, it may carry its registry icon with the Indonesian meaning; any later item testing that word hides the picture. Abstract or function words in the pair get a short context sentence instead.
- Mark highlighting changes colour or background only on an inner span (no padding, border, weight or `dir` change; taste.md) and is always paired with a text label.

## 6. Feedback

- After every item: state the correct answer, replay the correct clip, and give one reason in the form "tandanya [where the mark sits], jadi bunyinya [vowel]", with the specifics supplied by the teacher. Riset ulang §4: corrective feedback is required.
- When the learner picks the wrong clip, also play the clip they chose, so the contrast is heard, not only told.
- Text labels and icons for correct or wrong, never colour alone. One retry, then continue. No penalty.

## 7. Accessibility

- Arabic in Noto Naskh Arabic with `lang="ar" dir="rtl"`; marks shown alone on tatweel, never on U+25CC; harakat line-height and collisions checked in light and dark themes and at 200 % zoom (taste.md, research doc §12F on testing fonts on low-end Android).
- Syllable buttons are 44 px targets with labels ("Suku kata 2 dari 3, putar").
- **Deaf and hard-of-hearing learners:** this lesson depends on sound. Provide a text description of each mark's vowel (teacher-worded) and a Latin reading aid once RS-07 is decided; listening items can be skipped without penalty (ONBOARDING_SPEC AC-5). Teacher to advise whether a separate non-audio route is sensible.
- Feedback in a polite live region; focus moves to the next step heading; reduced motion; no time limits.

## 8. Analogy caveats and common errors

- Indonesian writes every vowel as a letter. In this lesson, short vowels are shown by marks, not letters [teacher to confirm wording]. Learners may treat a Latin vowel as the exact sound. Present any Latin aid as approximate (CA-02, CA-03 records).
- Long vowels are easy to shorten and short vowels easy to lengthen (CA-03 record); this lesson keeps to short vowels and the next lesson contrasts them.
- Teacher to supply the list of decoding errors common among Indonesian Iqra graduates (CURRICULUM_COMPARISON §7 question 4, RS-08).

## 9. Source and licence metadata

- Lesson text and exercises: `PROJECT_ORIGINAL`, CC BY-SA 4.0 (D-1). Not a digital copy of any Iqra book (research doc §1, tracker A1).
- Imported third-party material: **zero**.

Evidence ledger rows (brief section E). Inspiration-only third-party material is not a ledger row and is not keyed to a shipping asset ID; it is listed under research references below. `linguistic_review` is `pending` until a reviewer decides.

| `asset_id`                     | `kind`             | `source_url`                                           | `source_repo_sha`     | `source_license`           | `usage_type`           | `compatibility_checked` | `linguistic_review`      | `publication_status` |
| ------------------------------ | ------------------ | ------------------------------------------------------ | --------------------- | -------------------------- | ---------------------- | ----------------------- | ------------------------ | -------------------- |
| `lesson-a2-01/structure`       | `lesson_structure` | Our research doc §5.2, §7; CURRICULUM_COMPARISON CA-03 | `34e8aca` (this repo) | `PROJECT_ORIGINAL`         | `independent-original` | true: own work          | pending                  | research-only        |
| `lesson-a2-01/explanation-01`  | `text`             | N/A                                                    | N/A                   | `PROJECT_ORIGINAL`         | `independent-original` | true: own work          | pending                  | research-only        |
| `lesson-a2-01/syllables-words` | `example`          | Teacher-supplied                                       | N/A                   | `PROJECT_ORIGINAL`         | `independent-original` | true: own work          | pending                  | blocked              |
| `lesson-a2-01/chart-link`      | `text`             | Harakat chart R-03 (not yet built)                     | this repo             | `PROJECT_ORIGINAL`         | `independent-original` | true: own work          | pending                  | blocked              |
| `aud-ca03-*`                   | `audio`            | Human recording or Voicebox take (A-01)                | N/A                   | To record per clip (RS-05) | `independent-original` | false: RS-05 open       | pending (audio listener) | blocked              |

Research references (inspiration only, nothing copied, nothing ships from these):

- OpenLanguageKit primitive `prim:reading-aid-fade` (idea re-expressed; nothing imported into CC BY-SA text, D-1): https://github.com/ywEdAi/OpenLanguageKit/blob/036c313f788a7a7880df80d1c299617fecc588a7/curriculum/primitives/primitives.json at `036c313f…`, as cited in CURRICULUM_COMPARISON CA-03. Licence: CC BY-NC 4.0.

## 10. Reviewer status

| Role           | Needed for                                                            | Status       |
| -------------- | --------------------------------------------------------------------- | ------------ |
| Arabic teacher | Letter set, syllables, words, mark names, explanation wording, errors | Not reviewed |
| Audio listener | Every clip (makharij, vowel length, final form)                       | Not reviewed |
| Ustadz         | `ca03-link-01` (shalat word)                                          | Not reviewed |

Tracker stage: 0 Idea for A2.

## 11. Open questions for reviewers

1. Which letters make the best first set, and should they overlap with the U1 words?
2. Should the mark names be taught in this lesson or only shown?
3. Is a Latin reading aid helpful here, or does it slow decoding (RS-07)?
4. Is self-rating after "read before you hear" reliable enough, or should decoding checks stay audio-matching only?
