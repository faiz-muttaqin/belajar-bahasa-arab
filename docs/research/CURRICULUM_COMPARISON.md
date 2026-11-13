# Curriculum comparison

> **Status:** research deliverable for [the audit brief](../ARABIC_CURRICULUM_SOURCES_AND_LICENSES.md) section D, Phase 2. **DRAFT — NOT LINGUISTICALLY REVIEWED.** Nothing here is a final syllabus. Every order, outcome, threshold and analogy caveat is a hypothesis until an Arabic teacher (language) and an ustadz (shalat and Qur'anic content) review it, as [ADR-004 D-7](../decisions/0004-content-decisions.md#d-7-reviewers) requires.
> **Date:** 14 November 2026. Source clones audited 2026-11-13T17:24Z, read only, nothing executed.
> **Licence statements** in this file are background analysis, not legal advice. Confirm with an IP or legal adviser before relying on them.
> **Imported third-party material:** zero. This file cites paths and paraphrases; it copies no lesson text, examples, exercises, translations or code.
> **Companion:** the graph derived from this comparison is [COMPETENCY_GRAPH.md](../curriculum/COMPETENCY_GRAPH.md).

## 1. How to read this file

**Evidence labels.** The brief asks us to separate three kinds of claim. Every claim below carries one label.

| Label                       | Meaning                                                                                                                                                                                                                                      | Example                                                             |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **[P] Published pedagogy**  | A finding from a cited study or meta-analysis, as summarised in [riset ulang §4](./2026-11-14-riset-ulang-kurikulum.md#4-ilmu-belajar-empat-pilihan-desain) or the [main research doc](../arabic-learning-pedagogy-ux-research-reissued.md). | Retrieval practice beats re-reading; corrective feedback is needed. |
| **[C] Teaching convention** | What a course or tradition does. A course using an order does **not** make the order validated.                                                                                                                                              | Madinah-like order starts with pointing and question words.         |
| **[H] Our hypothesis**      | Agent synthesis for this project. Must be tested with a teacher and 5 to 10 learners.                                                                                                                                                        | Put core shalat words first for a quick first success.              |

**Arabic in this file.** Arabic items appear only as transliterations that already exist in ADR-004 or our research docs. Anything else is a placeholder such as `[ARABIC: core shalat word from RS-04]`. Grammar term names that do not yet appear in our docs or a cited source are marked _(term to confirm)_; spelling of all terms waits on the transliteration standard (tracker RS-07).

**IDs.** Competency IDs are new: `CA-*` for the optional foundation track (Jalur A), `CB-*` for the post-Iqra core track (Jalur B), `CR-*` for optional reference layers. Each maps to tracker IDs (`A*`, `B*`, `V-*`, `R-*`) where one corresponds. Units `U1` to `U10` are provisional and follow [ADR-004 D-4](../decisions/0004-content-decisions.md#d-4-first-units-of-the-main-path).

## 2. Sources compared

| Key     | Source                                                                                                                                                                   | Pinned revision                                                             | What it gives us                                                                                                        | Licence verdict (background, not legal advice)                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **CT**  | Cahaya Tauhid, _Belajar Bahasa Arab_                                                                                                                                     | `d27cb0c549c782ca4f5a0c010bf9ea0a70f716d9`                                  | A complete Level 1 order (34 lessons) for Indonesian adults who already read the Qur'an; Levels 2 to 5 as syllabus only | Conditional: CC BY-SA 4.0 text, logo excluded (also inside every PDF). Inspiration-only for now.    |
| **M**   | Madinah-like order (Durus al-Lughah, V. Abdur Rahim), as summarised in [riset ulang §6](./2026-11-14-riset-ulang-kurikulum.md#6-kurikulum-pembanding-dan-materi-terbuka) | N/A (summary of a commercial course page; lesson numbers differ by edition) | The order ADR-004 D-4 adopts after unit 1                                                                               | View and analyse only; no reuse licence. Order facts only.                                          |
| **UAG** | Unified Arabic Grammar (zeusopera9/arabic-grammar)                                                                                                                       | `2bfab7f01b20eacb3dcc3b70f13ed990776ff257`                                  | A concept graph of 33 topics in 7 parts, organised around iʿrāb, with 138 hand-curated related links                    | Research-only: no licence, textbook-derived. Zero imports.                                          |
| **D-4** | Our [ADR-004 D-4](../decisions/0004-content-decisions.md#d-4-first-units-of-the-main-path)                                                                               | This repo, commit `34e8aca`                                                 | Accepted order: core shalat words, then a Madinah-like order                                                            | Our own decision; our text is CC BY-SA 4.0 (D-1).                                                   |
| OLK     | OpenLanguageKit                                                                                                                                                          | `036c313f788a7a7880df80d1c299617fecc588a7`                                  | Prerequisite modelling, exercise contract shape (not Arabic)                                                            | Research-only: CC BY-NC 4.0, not importable into BY-SA text (D-1).                                  |
| LT      | Learn Tajweed                                                                                                                                                            | `426b71f660f45e97661f436646b4a3b17549c7ae`                                  | Topic checklist for Jalur A; Qur'an verification pipeline                                                               | Conditional: own work 0BSD; Tanzil, audio, surah names, videos excluded.                            |
| LL      | Lingo Lessons                                                                                                                                                            | `dcdd61268126c780499ef5e74a5874d2f9bb99b8`                                  | Within-lesson exercise micro-sequence, retry queue                                                                      | Research-only. Licence: UNKNOWN (root LICENSE is Expo MIT boilerplate; authors' grant unconfirmed). |
| AV      | Arabic Vocab                                                                                                                                                             | `9b91347ea96fb457dcd7473d908a0a7c500290ce`                                  | Separate recognition and recall states per item                                                                         | Research-only: no standard licence; data from copyrighted books.                                    |

URL bases for the paths cited below (append the path):

- CT: `https://github.com/cahayatauhid/belajar-bahasa-arab/blob/d27cb0c549c782ca4f5a0c010bf9ea0a70f716d9/`
- UAG: `https://github.com/zeusopera9/arabic-grammar/blob/2bfab7f01b20eacb3dcc3b70f13ed990776ff257/` (topic definitions in `app/data/content.js`; line anchors such as `#L71` point to the topic's `id` line)
- OLK: `https://github.com/ywEdAi/OpenLanguageKit/blob/036c313f788a7a7880df80d1c299617fecc588a7/`
- LT: `https://github.com/edriso/learn-tajweed/blob/426b71f660f45e97661f436646b4a3b17549c7ae/`
- LL: `https://github.com/Open-Apps-Studio/lingo-lessons/blob/dcdd61268126c780499ef5e74a5874d2f9bb99b8/`
- AV: `https://github.com/arifgov/Arabic-Vocab/blob/9b91347ea96fb457dcd7473d908a0a7c500290ce/`

CT lesson IDs `CT-L1-NN` refer to `textbook/pelajaran-NN/index.md` (with `workbook/` and `slides/` siblings). Madinah positions `M1` to `M10` refer to the ten groups listed in riset ulang §6.

## 3. The four orders side by side

### 3.1 What drives each order

| Order   | Organising idea                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Audience and mode                                                                                                                                                                           | Kind of claim                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **CT**  | Survey the whole grammar map at overview level first, grouped by the al-Jurumiyyah role categories: introduction and word classes, then marfūʿāt, manṣūbāt, majrūrāt, majzūmāt, pronouns, then sarf ([`docs/desain-kurikulum.md`](https://github.com/cahayatauhid/belajar-bahasa-arab/blob/d27cb0c549c782ca4f5a0c010bf9ea0a70f716d9/docs/desain-kurikulum.md), sections _Prinsip Pedagogis_ and _Cakupan Paket Level 1_; [`docs/silabus.md`](https://github.com/cahayatauhid/belajar-bahasa-arab/blob/d27cb0c549c782ca4f5a0c010bf9ea0a70f716d9/docs/silabus.md), Level 1 blocks 1 to 7).  | Indonesian adults with tajwid reading; teacher-led weekly 90-minute class; goal is written comprehension and iʿrāb of Qur'an, hadith and kitab. Deductive by design; conversation excluded. | [C]. The design doc argues for its choices but cites no study.                                                      |
| **M**   | Usable sentences from lesson 1: pointing and question words, then al-, prepositions, pronouns, iḍāfah, feminine pointing words, adjective phrase, attached pronouns and past verbs around lesson 10 ([riset ulang §6](./2026-11-14-riset-ulang-kurikulum.md#6-kurikulum-pembanding-dan-materi-terbuka)).                                                                                                                                                                                                                                                                                  | Non-Arab learners; Book 1 lightly bilingual; accumulative vocabulary.                                                                                                                       | [C]. Widely used; not an experiment.                                                                                |
| **UAG** | A reference, not a course. Parts p1 to p7 (sentence and word classes, verb, verb states, sentence roles, operators, noun, case-sign exceptions), with "related" links between topics ([`README.md`](https://github.com/zeusopera9/arabic-grammar/blob/2bfab7f01b20eacb3dcc3b70f13ed990776ff257/README.md), [`GUIDE.md`](https://github.com/zeusopera9/arabic-grammar/blob/2bfab7f01b20eacb3dcc3b70f13ed990776ff257/GUIDE.md), [`notes/PHASE2-ARCHITECTURE.md`](https://github.com/zeusopera9/arabic-grammar/blob/2bfab7f01b20eacb3dcc3b70f13ed990776ff257/notes/PHASE2-ARCHITECTURE.md)). | English-medium learners who have already finished a three-book madrasa course. No exercises.                                                                                                | [C]. Its "related" links are undirected see-also links, **not** prerequisites; its part order is a suggested walk.  |
| **D-4** | Unit 1 = undisputed core shalat words for a quick first success, then the Madinah-like order rewritten in our own words, ending with the most frequent verbs (qāla, kāna).                                                                                                                                                                                                                                                                                                                                                                                                                | Our post-Iqra Indonesian adults, self-study static site, listen-first and meaning-first.                                                                                                    | [H]. Accepted as a working order; still a hypothesis until a teacher reviews it and learners test it (D-4 point 3). |

### 3.2 Where the big topics land

| Topic                                | CT                                                                                                                                                                                                                                                                                              | M                                        | UAG                                                                                                                                       | D-4 and our units                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Word classes ism / fiʿl / ḥarf named | Lesson 5 (early, by definition)                                                                                                                                                                                                                                                                 | Not a separate lesson in the summary     | p1 `word-classes` (entry point)                                                                                                           | Named late (U10, CB-16) after learners have used examples of each [H]          |
| Pointing and question words          | Pointing words named only as examples in CT-L1-05 (kinds of isim) and CT-L1-06 (isim mabni), with no dedicated Level 1 lesson; the syllabus treats them in Level 3 (isim mabni) and completes them in Level 4 (`docs/silabus.md`, Level 3 block 1 items 4 and 5; Level 4 block 1 items 7 and 8) | M1                                       | No topic page (`app/data/content.js`); pointing words appear only as a term pair in `app/data/reference.js`; no question-word topic found | U2 (CB-04)                                                                     |
| Definite al-                         | Inside lesson 5 (signs of ism)                                                                                                                                                                                                                                                                  | M3                                       | Not a topic; appears within `sifat` and `mubtada-khabar`                                                                                  | U3 (CB-05)                                                                     |
| Nominal sentence                     | Lesson 8 (mubtadaʾ and khabar)                                                                                                                                                                                                                                                                  | M4 named; implicit from M1               | p4 `nominal-sentence`, `mubtada-khabar`                                                                                                   | U3 (CB-06), implicit from U2                                                   |
| Prepositions                         | Lesson 19                                                                                                                                                                                                                                                                                       | M4                                       | p5 `jarr-particles`                                                                                                                       | U4 (CB-07)                                                                     |
| Pronouns                             | Lessons 26 to 28 (late)                                                                                                                                                                                                                                                                         | M4 independent, M10 attached             | Not covered in depth                                                                                                                      | U4 independent (CB-08), U8 attached (CB-12)                                    |
| Iḍāfah                               | Lesson 20                                                                                                                                                                                                                                                                                       | M5                                       | p6 `idafa`                                                                                                                                | U5 (CB-09)                                                                     |
| Adjective phrase                     | Lesson 12 (naʿt, overview)                                                                                                                                                                                                                                                                      | M9                                       | p6 `sifat`, ref `agreement`                                                                                                               | U7 (CB-11)                                                                     |
| Verbs                                | Lesson 5 (types), 9 (fāʿil), 23 (muḍāriʿ states), 29 to 34 (sarf)                                                                                                                                                                                                                               | M4 verbal sentence named, M10 past verbs | p2 verb family, hub `seegha-grid`                                                                                                         | U9 frequent verbs and doer/action (CB-13, CB-14), U10 past vs non-past (CB-15) |
| Iʿrāb (four end states)              | Lessons 6 and 7 (before any sentence type)                                                                                                                                                                                                                                                      | Not foregrounded in the summary          | Organising principle of p3 and p7                                                                                                         | Optional reference only (CR-03); never a gate [H]                              |
| Root and pattern                     | Lessons 30 to 34                                                                                                                                                                                                                                                                                | Not in M1 to M10                         | Out of scope (forms II to X not covered)                                                                                                  | Backlog (CB-18), optional table (CR-01, blocked on RS-06)                      |
| Shalat and Qur'an texts              | _Lab Shalat_ practice sections in the workbooks of CT-L1-03 to CT-L1-29, after each grammar point (workbook Format A, `docs/desain-kurikulum.md` line 471)                                                                                                                                      | No                                       | No                                                                                                                                        | **U1 is shalat words** (CB-01); variants side by side (CB-02)                  |

### 3.3 Main disagreements and what we take

1. **Terms first vs examples first.** CT defines ism, fiʿl, ḥarf and iʿrāb in lessons 5 to 7 before learners build sentences; M and D-4 give usable sentences first. [P] Explicit instruction shows a small advantage over implicit instruction, and guided induction has mixed small-study results (riset ulang §4, citing Spada & Tomita 2010). Neither finding settles the order for our learners. [H] We follow the brief (Phase 3: usable sentence before category names) and introduce terms in an "Explain" step after examples, with no gate on terminology (brief Phase 4).
2. **Pronouns early vs late.** CT places pronouns at lessons 26 to 28 and builds verb conjugation on them; M and D-4 introduce independent pronouns around M4/U4. [H] Early, because short identity sentences with pronouns are usable from the start; to be checked with a teacher.
3. **Iʿrāb as organiser.** CT and UAG organise grammar around the four end states. [H] For a meaning-first reader, iʿrāb is an optional reference layer (CR-03), and if taught, the vowel-only model must be labelled partial from its first mention (UAG first simplifies, then corrects the vowel-only model in its `signs-bridge` topic,, `app/data/content.js#L770`).
4. **What unit 1 is.** No compared source starts with shalat words as vocabulary. CT uses prayer texts as grammar practice after a concept is taught (_Lab Shalat_ section, for example `workbook/pelajaran-08/index.md` line 71). D-4 makes them the first content. [H] Motivation and familiarity; needs testing (RS-08).
5. **Scope.** CT aims at classical iʿrāb and kitab reading over about four years; UAG stops where its source books stop. Neither covers listening-first everyday comprehension. D-4 and the brief do.

## 4. Order matrix

Positions only. "none" means the source does not teach it. Our unit numbers are provisional.

| ID    | Indonesian title                               | CT                                                                 | M                 | UAG topic (part)                                 | D-4 step          | Our unit             | Tracker         |
| ----- | ---------------------------------------------- | ------------------------------------------------------------------ | ----------------- | ------------------------------------------------ | ----------------- | -------------------- | --------------- |
| CA-01 | Membedakan bunyi yang sering tertukar          | none (entry prerequisite)                                          | none              | none                                             | none              | Jalur A              | A0, B0          |
| CA-02 | Mengenali huruf dan bentuknya                  | CT-L1-04 (writing)                                                 | none              | none                                             | none              | Jalur A              | A1              |
| CA-03 | Membaca harakat, mad, sukun                    | none (entry prerequisite)                                          | none              | none                                             | none              | Jalur A              | A2, R-03        |
| CA-04 | Membaca tasydid dan tanwin                     | none (entry prerequisite)                                          | none              | none                                             | none              | Jalur A              | A3              |
| CA-05 | Membaca ungkapan dan kalimat pendek berharakat | none (entry prerequisite)                                          | none              | none                                             | none              | Jalur A (join point) | A4              |
| CA-06 | Membaca al- dan hamzah waṣl                    | none                                                               | M5, M7            | none                                             | none              | Jalur A              | A4 (part)       |
| CB-01 | Kata inti bacaan shalat                        | Practice only (_Lab Shalat_, from CT-L1-03)                        | none              | none                                             | Unit 1            | U1                   | V-04, RS-04     |
| CB-02 | Varian bacaan shalat berdampingan              | One wording each, unlabelled                                       | none              | none                                             | D-5               | U1 (optional panel)  | V-04            |
| CB-03 | Benda di sekitar                               | Vocabulary within lessons (no lists found)                         | M1 onward         | none                                             | Implied by step 2 | U2                   | B1, V-01        |
| CB-04 | Menunjuk dan bertanya                          | Examples only in CT-L1-05, 06; Level 3 and Level 4 (syllabus only) | M1, M2            | none (term pair in `app/data/reference.js` only) | Step 2a           | U2                   | B2, B8          |
| CB-05 | Yang tertentu: al-                             | CT-L1-05 (part)                                                    | M3                | none                                             | Step 2b           | U3                   | B2              |
| CB-06 | Kalimat nominal sederhana                      | CT-L1-08                                                           | M1 (implicit), M4 | `nominal-sentence`, `mubtada-khabar` (p4)        | Not listed        | U3                   | B3              |
| CB-07 | Lokasi dengan ḥarf jarr                        | CT-L1-19                                                           | M4                | `jarr-particles` (p5)                            | Step 2c           | U4                   | B5, R-01 (part) |
| CB-08 | Kata ganti terpisah                            | CT-L1-26                                                           | M4                | none                                             | Step 2c           | U4                   | B4              |
| CB-09 | Milik: iḍāfah                                  | CT-L1-20                                                           | M5                | `idafa` (p6)                                     | Step 2d           | U5                   | B4              |
| CB-10 | Kata tunjuk feminin dan penanda gender         | Within CT-L1-08 agreement                                          | M6, M7            | `gender` (p6)                                    | Step 2e           | U6                   | B9 (part)       |
| CB-11 | Frasa sifat                                    | CT-L1-12                                                           | M9                | `sifat` (p6), `agreement` (ref)                  | Step 2f           | U7                   | B3              |
| CB-12 | Kata ganti melekat                             | CT-L1-27                                                           | M10               | none                                             | Step 2g           | U8                   | B4              |
| CB-13 | Kata kerja paling sering                       | CT-L1-05 (verb types)                                              | M10               | `madi` (p2)                                      | Step 2h           | U9                   | B6, V-03        |
| CB-14 | Pelaku dan tindakan                            | CT-L1-09                                                           | M4                | `verbal-sentence`, `fail` (p4)                   | Not listed        | U9                   | B6              |
| CB-15 | Lampau dan bukan lampau                        | CT-L1-05, 23, 29                                                   | M10 (past only)   | `madi`, `mudari` (p2)                            | Not listed        | U10                  | B7              |
| CB-16 | Tiga jenis kata: ism, fiʿl, ḥarf               | CT-L1-05                                                           | none              | `word-classes` (p1)                              | Not listed        | U10                  | none            |
| CB-17 | Gender dan jumlah                              | CT-L1-22 (numbers); Level 2                                        | none              | `gender`, `number`, `plurals` (p6)               | none              | Backlog              | B9              |
| CB-18 | Keluarga akar kata                             | CT-L1-30 to 34                                                     | none              | none                                             | none              | Backlog              | B10             |
| CB-19 | Kata tugas Al-Qur'an paling sering             | Scattered                                                          | none              | `particles` (ref)                                | none              | Thread               | V-03            |
| CB-20 | Bertanya dan dialog pendek                     | none (conversation excluded)                                       | M1 (questions)    | none                                             | none              | Backlog              | B8, B11         |
| CB-21 | Integrasi dan transfer                         | Workbook _Eksplorasi Mendalam_ sections (iʿrāb of a whole ayah)    | none              | none                                             | none              | Backlog              | B11, B12        |
| CR-01 | Tabel tashrif istilahi                         | CT-L1-29 to 34                                                     | none              | `seegha-grid` (p2)                               | none              | Reference            | R-02            |
| CR-02 | Tabel jenis ḥarf                               | CT-L1-19, 24, 25                                                   | none              | `particles` (ref)                                | none              | Reference            | R-01            |
| CR-03 | Iʿrāb: empat keadaan akhir kata                | CT-L1-06, 07                                                       | none              | p3, p7 (`signs-bridge`, `signs-master`)          | none              | Reference            | none            |

**Tracker gaps (open).** These tracker items map to no node above and match the gap list in [COMPETENCY_GRAPH.md](../curriculum/COMPETENCY_GRAPH.md) check I-10:

- **V-02** (everyday MSA verbs): not covered by CB-13, which is limited to the most frequent Qur'anic verbs (V-03). Needs its own node once an MSA verb source exists (compare RS-01 for nouns).
- **V-05** (short surahs word by word): blocked on the tashih question (RS-09, RS-10); no node yet.

## 5. Competency records

Each record uses the fields from brief section D, Phase 2. "Exercises" lists one idea per skill: **Listen**, **Imitate**, **Read**, **Meaning**, **Grammar**, **Apply**, **Review**. Exercise ideas borrowed from other repos are patterns only (inspiration-only); no wording is reused. Measurable outcomes follow the product rule in the main research doc §6.1: success on **two separate occasions** with **items not seen before**. Any numeric threshold is a hypothesis.

Shared fields, unless a record says otherwise:

- **Review status:** not reviewed. Needs an Arabic teacher (D-7); records marked "ustadz" also need an ustadz.
- **Licensing pathway:** `PROJECT_ORIGINAL`, our text under CC BY-SA 4.0 (D-1). Sources are `inspiration-only` (order facts and patterns, cited in research notes, nothing copied). Evidence ledger rows are still required for each shipped item.
- **Hard prerequisites:** none at competency level unless stated. Unassisted reading activities in every CB record are gated by `G-READ` (see [COMPETENCY_GRAPH.md §4](../curriculum/COMPETENCY_GRAPH.md#4-activity-gates)); listening routes stay open.
- **Deferred fields:** backlog and reference records may defer a field from brief section D, Phase 2. Each such record names the deferred fields and the reason in a **Deferred fields** line; a skill marked "none" is a design choice, not a deferral.

### Foundation track (Jalur A, optional)

#### CA-01 Membedakan bunyi yang sering tertukar

- **Arabic term:** makhārij al-ḥurūf (LT lesson title); contrasts such as ح/ه, ع/ء, ق/ك are named in the main research doc §6.1.
- **Explanation:** hearing the difference between Arabic sounds that Indonesian speakers often merge, before or alongside reading.
- **Entry → outcome:** no Arabic needed. Outcome: hears a contrast pair item and picks the matching written form, on two occasions with unseen items `[ARABIC: minimal pair, teacher to supply]`.
- **Where taught:** CT: assumed (entry prerequisite, `docs/desain-kurikulum.md`, section _Prasyarat_). LT: `src/content/lessons/makharij.md`, `sifat.md` (Arabic-medium, for Arabic readers). OLK: contract `prim:sound-contrast` in `curriculum/primitives/primitives.json` (not Arabic). M, UAG, D-4: not covered.
- **Prerequisites:** none.
- **Exercises:** Listen: same/different pairs. Imitate: listen and repeat, self-checked, no automatic scoring. Read: match audio to one of two written forms. Meaning: pairs where the contrast changes the meaning `[ARABIC: teacher to supply]`. Grammar: none. Apply: spot the sound in a known word from CB-01. Review: spaced contrast sets.
- **Evidence vs synthesis:** [C] LT and tajwid tradition teach articulation before rules. [C] OLK's contract forbids building items from unverified synthetic speech. [H] Do the same: reviewed audio only (A-01, A-02). No [P] source for which contrasts are hardest for Indonesian speakers; that list needs a teacher (tracker B0).
- **Analogy risk:** describing an Arabic sound as "like" an Indonesian letter can fix a wrong pronunciation. Qualify every comparison as approximate and pair it with audio.
- **Review:** Arabic teacher plus audio listener (A-02).

#### CA-02 Mengenali huruf dan bentuknya

- **Arabic term:** ḥurūf hijāʾiyyah _(term to confirm)_; initial, medial, final forms.
- **Explanation:** recognising each letter in its joined forms.
- **Entry → outcome:** none → identifies letters in unseen joined words on two occasions.
- **Where taught:** CT-L1-04 teaches four letter forms and non-joining letters as a writing lesson (`textbook/pelajaran-04/index.md`). M, UAG, D-4: not covered. Tracker A1.
- **Prerequisites:** none.
- **Exercises:** Listen: hear the letter name or sound, pick the shape. Imitate: optional tracing, never required (research doc §5.2 "jangan menuntut kaligrafi"). Read: find a letter in a word. Meaning: none. Grammar: none. Apply: find letters in CB-01 words. Review: mixed-form recognition.
- **Evidence vs synthesis:** [C] CT treats letter forms as a writing skill for adults who already read. [H] Recognition only, writing optional. Original exercises only; no reproduction of Iqra pages (tracker A1).
- **Analogy risk:** Latin letter equivalents can suggest one-to-one sound mapping. Label transliteration as a reading aid.

#### CA-03 Membaca harakat, vokal panjang dan sukun

- **Arabic term:** harakat, sukun, mad (tracker A2; LT `madd-tabee3i.md`).
- **Explanation:** decoding short vowels, long vowels and the no-vowel mark on words the learner has not memorised.
- **Entry → outcome:** knows letters → reads unseen vocalised words correctly on two occasions, checked against reviewed audio.
- **Where taught:** CT: assumed. LT: `madd-tabee3i.md` (natural madd). OLK: `prim:reading-aid-fade` (pattern for removing an aid gradually). Tracker A2, R-03 harakat chart.
- **Prerequisites:** **hard** CA-02 (a mark cannot be read without identifying the letter that carries it). Soft CA-01.
- **Exercises:** Listen: hear a syllable, pick the vocalised form. Imitate: read aloud then compare with audio. Read: unseen words. Meaning: words whose meaning changes with a vowel `[ARABIC: teacher to supply]`. Grammar: none. Apply: read CB-01 words without audio. Review: spaced decoding sets with fading support.
- **Evidence vs synthesis:** [C] Iqra and tajwid courses teach this first. [H] This is the one place a hard gate is justified, because unassisted reading is impossible without it (brief Phase 4).
- **Analogy risk:** Indonesian vowel letters vs Arabic marks; long vowels are easy to shorten. Teacher to supply the list of common errors.

#### CA-04 Membaca tasydid dan tanwin

- **Arabic term:** tasydid, tanwin (tracker A3).
- **Explanation:** reading doubled consonants and the end marks of indefinite words.
- **Entry → outcome:** CA-03 → reads unseen words containing these marks on two occasions.
- **Where taught:** CT: assumed. Tracker A3. Others: not covered.
- **Prerequisites:** **hard** CA-03 (these marks are read together with the vowel marks; wording to confirm with a teacher).
- **Exercises:** Listen: hear a word, pick the written form with or without the mark. Imitate: read aloud then compare with reviewed audio. Read: unseen words containing the marks. Meaning: words where the mark changes the meaning `[ARABIC: teacher to supply]`. Grammar: none (reading skill only). Apply: read CB-01 words that contain the marks. Review: spaced decoding sets tagged by mark.
- **Evidence vs synthesis:** [C] standard foundation order. [H] Whether to point forward from these marks to CB-05 (al-) is a teacher decision; Jalur A teaches reading only.
- **Analogy risk:** none specific; avoid any spelling-only explanation of these marks without audio _(teacher to confirm)_.

#### CA-05 Membaca ungkapan dan kalimat pendek berharakat

- **Arabic term:** none needed.
- **Explanation:** reading short vocalised phrases fluently enough to join Jalur B.
- **Entry → outcome:** CA-03 → reads short unseen vocalised phrases on two occasions. Joining point for Jalur B (research doc §5.2, A4).
- **Where taught:** CT: this is roughly its entry requirement. Tracker A4.
- **Prerequisites:** **hard** CA-03. Soft CA-04, CA-06 (only items that contain those marks need them; enforced per item by `G-READ`).
- **Exercises:** Listen: phrase then text. Imitate: shadow reading. Read: unseen phrases. Meaning: link a phrase to a picture or situation. Grammar: none (reading fluency only). Apply: read a CB-01 phrase. Review: fluency sets.
- **Evidence vs synthesis:** [H] Learners may join Jalur B without finishing advanced tajwid topics (research doc §5.2).
- **Analogy risk:** none specific.

#### CA-06 Membaca al- dan hamzah waṣl

- **Arabic term:** lam syamsiyah dan qamariyah, hamzat al-waṣl (LT `lam-shamsiyyah-qamariyyah.md`, `hamzat-al-wasl.md`; M5, M7 in riset ulang §6).
- **Explanation:** how the definite prefix and the joining hamzah are read in connected speech.
- **Entry → outcome:** CA-03 → reads unseen al- words correctly on two occasions.
- **Where taught:** LT (topics above, Arabic-medium). M: M5 (hamzah qaṭʿ/waṣl), M7 (sun letters). CT: assumed. Tracker: not yet listed (fits A4).
- **Prerequisites:** **hard** CA-03. Optional for CB-05 (meaning of al- can be taught audio-first).
- **Exercises:** Listen: sorting al- words by how they sound. Imitate: read aloud then compare with reviewed audio. Read: unseen al- words. Meaning: none here (the meaning of al- is CB-05). Grammar: none (reading rule only). Apply: read al- words met in U3. Review: mixed sets.
- **Evidence vs synthesis:** [C] M teaches this inside the core path, LT in tajwid. [H] Keep reading rules in Jalur A and the meaning of al- in CB-05, so post-Iqra learners are not slowed down.
- **Analogy risk:** Tanzil Uthmani spelling of these words differs from Mushaf Standar Indonesia (riset ulang §3); a short reviewed explainer may be needed wherever Qur'anic words are shown (LT audit).
- **Review:** Arabic teacher; ustadz if Qur'anic items are used.

### Core track (Jalur B, post-Iqra)

#### CB-01 Kata inti bacaan shalat

- **Arabic term:** items from ADR-004 D-4: Allāhu akbar, subḥāna, rabbī, al-ʿaẓīm, al-aʿlā, as-salāmu ʿalaikum. Final list comes from RS-04.
- **Explanation:** knowing the meaning of the undisputed core words learners already say in every prayer.
- **Entry → outcome:** post-Iqra (or audio-first) → hears or reads a core word in context and chooses its Indonesian meaning; recalls the meaning without options; both on two occasions, with the word in a new position in the prayer sequence.
- **Where taught:** D-4 unit 1. CT uses prayer texts only as grammar practice (_Lab Shalat_ sections from CT-L1-03, for example `workbook/pelajaran-08/index.md` line 71), one wording each, no variant labels. M, UAG: not covered. Tracker V-04, RS-04.
- **Prerequisites:** none (entry node). Reading activities use `G-READ`; audio-first route available.
- **Exercises:** Listen: hear the word in the recited phrase, tap it. Imitate: optional repeat, no scoring. Read: find the word in the vocalised phrase. Meaning: choose the meaning, then recall it with the meaning hidden. Grammar: none yet; at most a "notice" that one word appears in two phrases `[ARABIC: core shalat word from RS-04]`. Apply: identify where in the prayer it is said. Review: spaced recognition and recall cards (AV pattern: separate recognition and recall states, `public/main.js` lines 935 to 980).
- **Evidence vs synthesis:** [P] Recall beats recognition for retention; feedback must be corrective (riset ulang §4). [C] No compared course starts here. [H] A quick first success with familiar words (research doc §4.2, §6.1b). Adab: CT's workbook does grammar analysis after the prayer, not during it; [H] we keep that note.
- **Analogy risk:** learners may treat a memorised phrase as one word, or carry a meaning from an Indonesian loanword; meaning shifts in loanwords are a known risk (RS-07). Show word boundaries per our segmentation rule (riset ulang §3) and say a phrase gloss is not a word-by-word gloss.
- **Review:** Arabic teacher and **ustadz**. Licensing: our glosses are CC BY-SA; any Qur'anic word (for example inside al-Fatihah) is shown from Tanzil Uthmani verbatim as a separately labelled item (D-2).

#### CB-02 Varian bacaan shalat berdampingan (optional)

- **Arabic term:** riwayat; fields `variantOf`, `riwayat`, `commonIn`, `isOptional` (D-5).
- **Explanation:** seeing that some prayer wordings differ by practice, shown side by side with neutral labels.
- **Entry → outcome:** CB-01 → can say which part of a variant is shared core and which part differs, without ranking the variants.
- **Where taught:** D-5. CT: one wording per text; the tasyahud is typeset with the same `\ayat` macro as Qur'anic verses (`workbook/pelajaran-08/index.md` line 110; audit risk). UAG offers a side-by-side contrast page pattern (`kana-vs-inna`, `app/data/content.js#L564`), pattern only. LT asks to always name the riwayah and keep disputed points marked (`docs/writing-lessons.md`).
- **Prerequisites:** soft CB-01 (the shared core words are the anchor of the comparison).
- **Exercises:** Listen: hear two variants. Imitate: none (variants are compared, not drilled). Read: spot the differing words. Meaning: what the extra phrase adds `[ARABIC: variant text from RS-04, ustadz to supply]`. Grammar: none. Apply: none required (optional panel). Review: none required (optional knowledge).
- **Evidence vs synthesis:** [C] NU and Muhammadiyah references differ (riset ulang §3). [H] Optional panel, never a gate, never a "correct form" label.
- **Analogy risk:** none linguistic; the risk is presenting one practice as standard. Neutral labels only.
- **Review:** **ustadz** for every variant text.

#### CB-03 Benda di sekitar

- **Arabic term:** none needed; examples `[ARABIC: concrete noun from RS-01 list]`.
- **Explanation:** a small set of concrete everyday nouns to point at and talk about.
- **Entry → outcome:** post-Iqra → hears a noun and picks the picture; recalls the meaning with the picture hidden; two occasions.
- **Where taught:** M from M1 (neutral nouns such as house, mosque, pen, book are also CT's stated vocabulary principle, `docs/desain-kurikulum.md`, section _Prinsip Pedagogis_ point 5, though no vocabulary lists exist in CT lessons). UAG: vocabulary per lesson, textbook-derived (excluded). Tracker B1, V-01 (blocked on RS-01).
- **Prerequisites:** none.
- **Exercises:** Listen: audio to picture. Imitate: repeat. Read: word to picture. Meaning: recall with picture hidden (D-6). Grammar: none (vocabulary unit; no pattern taught yet). Apply: label objects in a scene. Review: spaced cards. LL micro-sequence (recognition, reverse recognition, listening, then matching; `src/app/lesson/[id].tsx`) is a pattern to compare against our lesson flow.
- **Evidence vs synthesis:** [P] Pictures help concrete words; picture and text glosses do not differ significantly; recall with the picture removed is what helps (riset ulang §4). [H] Icons only for concrete nouns (D-6).
- **Analogy risk:** gender of nouns is invisible in Indonesian; do not explain yet, just keep items consistent for CB-10.

#### CB-04 Menunjuk dan bertanya

- **Arabic term:** hādhā, mā, man (D-4); pointing word for far things per M2 _(placement to confirm)_; class names _(terms to confirm)_.
- **Explanation:** saying and understanding "ini ..." and asking "apa ini?" / "siapa ini?".
- **Entry → outcome:** CB-03 → understands an unseen pointing sentence or question about a pictured scene and picks the matching picture; two occasions.
- **Where taught:** M1, M2. CT: pointing words are named as examples in Level 1 without a dedicated lesson: in CT-L1-05 as one kind of isim (`textbook/pelajaran-05/index.md` line 33) and in CT-L1-06 as isim mabni (`textbook/pelajaran-06/index.md` lines 159 and 187 to 195). The syllabus treats them in Level 3 as isim mabni (`docs/silabus.md` line 174) and completes them in Level 4 (line 249); question words follow the same path (lines 175 and 250). UAG: no topic page (`app/data/content.js`); pointing words appear only as a term pair in `app/data/reference.js` (line 149); no question-word topic found. D-4 step 2a. Tracker B2, B8.
- **Prerequisites:** soft CB-03 (there must be nouns to point at; they can be introduced in the same unit).
- **Exercises:** Listen: question then scene. Imitate: repeat a question. Read: match sentence to picture. Meaning: choose a natural Indonesian rendering. Grammar: notice that the question word changes for people vs things. Apply: answer a picture question by choosing words. Review: mixed questions.
- **Evidence vs synthesis:** [C] M starts here; riset ulang §1 point 8 flags that our old B8 placed questions too late. [H] Pairing pointing with questions gives a usable exchange in the first lessons.
- **Analogy risk:** Indonesian "ini" maps neatly onto the near pointing word, but Indonesian does not mark gender; CB-10 must not surprise learners. Note this in the Explain step.

#### CB-05 Yang tertentu: al-

- **Arabic term:** al-; definite and indefinite (CT: maʿrifah / nakirah).
- **Explanation:** the difference between a book in general and a specific book (Indonesian _buku tertentu_, not _buku itu_), shown with the contrast in research doc §5.3 (visual example 1), which is itself marked as needing expert review.
- **Entry → outcome:** CB-04 → given two pictured scenes, picks which one matches the phrase with or without al-; two occasions with new nouns.
- **Where taught:** M3. CT-L1-05 treats al- as a sign of ism and as definiteness, comparing it with English _the_ and with Indonesian _si_ or _itu_ (`textbook/pelajaran-05/index.md` lines 61 to 90). UAG: no own topic. Reading rules: CA-06. D-4 step 2b. Tracker B2.
- **Prerequisites:** soft CB-04 (the contrast in research doc §5.3 uses the pointing word). Optional CA-06.
- **Exercises:** Listen: two phrases, pick the scene. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: spot al-. Meaning: choose the Indonesian rendering. Grammar: guided induction with 3 to 5 contrasting pairs, then a one-line rule (riset ulang §4 template). Apply: describe a specific object. Review: contrast pairs.
- **Evidence vs synthesis:** [P] Guided induction shows mixed small-study results; explicit rules have a small advantage (riset ulang §4). [C] M and CT both teach it early. [H] Use the guided-induction template here as the pilot (the research suggested a pilot on verb suffixes; this is an alternative to discuss).
- **Analogy risk:** "itu" is itself a pointing word in Indonesian, so glossing al- as "itu" (as in our own research doc example) may blur al- with the far pointing word. CT's _si_ or _itu_ comparison has the same risk. Qualify with wording such as _buku tertentu_ or a `[GLOSS: teacher to supply]` placeholder, never _itu_, and show a pointing word and al- together in one example.

#### CB-06 Kalimat nominal sederhana

- **Arabic term:** jumlah ismiyyah; mubtadaʾ and khabar (terms later, not a gate).
- **Explanation:** sentences of the "X Y" kind that need no written "adalah" (research doc §5.2 B3).
- **Entry → outcome:** CB-05 → understands an unseen two-part sentence and picks the matching scene or Indonesian sentence; two occasions.
- **Where taught:** M1 (implicit), M4 (named). CT-L1-08 (mubtadaʾ and khabar, after iʿrāb lessons 6 and 7). UAG: `nominal-sentence` (`app/data/content.js#L441`) and `mubtada-khabar` (`#L465`). D-4: not named; we insert it in U3 [H]. Tracker B3.
- **Prerequisites:** soft CB-04 (first sentences are already of this kind), soft CB-05.
- **Exercises:** Listen: sentence to scene. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: sentence to picture. Meaning: natural Indonesian with "adalah" optional. Grammar: notice the missing verb. Apply: build a sentence from tiles (tap, not drag). Review: transfer to new nouns.
- **Evidence vs synthesis:** [C] all three sources teach it; CT teaches it via role labels. [H] Name the term only after use.
- **Analogy risk (brief requirement):** "jumlah ismiyyah = kalimat yang diawali kata benda" over-simplifies, and "mubtadaʾ = subjek" is a first approximation only (CT audit caveat 2). Research doc §5.3: do not conclude that a sentence without a fiʿl is a fragment. Qualify in the Explain step and add a counter-example `[ARABIC: teacher to supply]`.

#### CB-07 Lokasi dengan ḥarf jarr

- **Arabic term:** ḥarf jarr; fī (research doc §5.2 B5).
- **Explanation:** understanding where something is: "di/dalam", "atas", "dekat".
- **Entry → outcome:** CB-03 → picks the picture matching an unseen location phrase; two occasions.
- **Where taught:** M4. CT-L1-19 (`textbook/pelajaran-19/index.md`). UAG: `jarr-particles` (`#L577`), with a cross-link to iḍāfah to separate two routes to the same case state. D-4 step 2c. Tracker B5, R-01.
- **Prerequisites:** soft CB-03.
- **Exercises:** Listen: phrase to picture. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: phrase to picture. Meaning: choose the Indonesian preposition. Grammar: notice the change at the end of the noun only as a pattern, without naming the case (optional link to CR-03). Apply: place objects in a scene. Review: mixed prepositions.
- **Evidence vs synthesis:** [C] all sources teach it early-middle. [H] Meaning first, case naming optional.
- **Analogy risk:** research doc §5.3: ḥarf jarr is not "kata hubung". Also one Arabic preposition does not map to one Indonesian word; show context examples.

#### CB-08 Kata ganti terpisah

- **Arabic term:** ḍamīr munfaṣil (CT: dhamir munfashil).
- **Explanation:** words for "saya, kamu, dia ...", used as the first part of short sentences.
- **Entry → outcome:** CB-06 → understands unseen short sentences with a pronoun subject and picks the right person in a scene; two occasions.
- **Where taught:** M4. CT-L1-26 (14 pronouns, late). UAG: no topic; the 14-form grid (`seegha-grid`, `#L99`) is person × gender × number. D-4 step 2c. Tracker B4.
- **Prerequisites:** soft CB-06.
- **Exercises:** Listen: pronoun sentence to person. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: same. Meaning: choose the Indonesian pronoun. Grammar: notice that the pronoun changes with the person's gender, which Indonesian does not mark. Apply: describe people in a picture. Review: spaced recall.
- **Evidence vs synthesis:** [C] M early, CT late. [H] Early; introduce only the forms needed by the unit's sentences, not the full grid (the full grid is optional reference).
- **Analogy risk:** Indonesian "dia" covers both genders and "kamu/Anda" encode politeness, not gender; Arabic forms encode gender and number (CT-L1-04 comparison; UAG grid). Say so explicitly.

#### CB-09 Milik: iḍāfah

- **Arabic term:** iḍāfah; muḍāf, muḍāf ilaih (CT).
- **Explanation:** "the book of the student" type phrases.
- **Entry → outcome:** CB-05 → picks the owner and the owned thing in unseen two-word phrases; two occasions.
- **Where taught:** M5. CT-L1-20 (concepts include no tanwin or al- on the first word; compares the construction with English _of_ and _'s_ and Indonesian _-nya_, `textbook/pelajaran-20/index.md` lines 42 to 49). UAG: `idafa` (`#L733`). D-4 step 2d. Tracker B4.
- **Prerequisites:** soft CB-03, soft CB-05 (the first word of the pair behaves differently from a word with al-; CT-L1-20 lists this).
- **Exercises:** Listen: phrase to picture of owner. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: same. Meaning: natural Indonesian word order. Grammar: guided noticing of the first word's ending. Apply: describe what belongs to whom. Review: new pairs.
- **Evidence vs synthesis:** [C] all sources teach it. [H] Research doc §5.2 B4: avoid stacking the term iḍāfah too early.
- **Analogy risk:** Indonesian "buku murid" has the same order as the Arabic pair, which helps, but "-nya" is a pronoun clitic, not a possessive marker of the whole construction (CT audit caveat 1, to be confirmed by a teacher).

#### CB-10 Kata tunjuk feminin dan penanda gender

- **Arabic term:** feminine pointing words per M6, M7 _(forms to confirm)_; muʾannath / mudhakkar _(terms to confirm)_.
- **Explanation:** that nouns have grammatical gender and pointing words change with it.
- **Entry → outcome:** CB-04 → chooses the right pointing word for an unseen noun with a visible gender marker; two occasions.
- **Where taught:** M6, M7. CT: gender appears within agreement in CT-L1-08. UAG: `gender` (`#L612`). D-4 step 2e. Tracker B9 (part).
- **Prerequisites:** soft CB-04.
- **Exercises:** Listen: pick pointing word for a noun. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: spot the marker. Meaning: same meaning, different form. Grammar: sort nouns by marker; include nouns with no visible marker as a labelled exception `[ARABIC: teacher to supply]`. Apply: point at mixed objects. Review: mixed sets.
- **Evidence vs synthesis:** [C] M teaches it right after iḍāfah. [H] Teach the visible marker first; exceptions labelled, not hidden (UAG's "gap" and "key" callout idea).
- **Analogy risk:** Indonesian has no grammatical gender; do not link it to biological sex beyond people. Teacher to supply wording.

#### CB-11 Frasa sifat

- **Arabic term:** murakkab waṣfī (riset ulang §6); naʿt / ṣifah (CT, UAG).
- **Explanation:** noun plus describing word, which must match the noun.
- **Entry → outcome:** CB-10 → picks the matching picture for unseen noun + adjective phrases and spots a mismatched phrase; two occasions.
- **Where taught:** M9. CT-L1-12 (naʿt as a tabiʿ, overview). UAG: `sifat` (`#L700`, agreement in case, number, gender and definiteness) and `agreement` (`#L913`). D-4 step 2f. Tracker B3.
- **Prerequisites:** soft CB-10 (gender), soft CB-05 (definiteness).
- **Exercises:** Listen: phrase to picture. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: same. Meaning: Indonesian order is similar. Grammar: find the mismatch. Apply: describe objects. Review: new combinations.
- **Evidence vs synthesis:** [C] all teach it. [H] Contrast with CB-06 (phrase vs sentence) using research doc §5.3 visual example 1.
- **Analogy risk:** "buku baru" works as both phrase and, in Indonesian, often as a sentence; Arabic separates the two by definiteness agreement. Explicitly contrast "the new book" with "the book is new" `[ARABIC: teacher to supply]` (UAG `sifat`; teacher to confirm wording).

#### CB-12 Kata ganti melekat

- **Arabic term:** ḍamīr muttaṣil (CT: dhamir muttashil).
- **Explanation:** pronoun endings on nouns (and later verbs and particles), such as "my book".
- **Entry → outcome:** CB-08, CB-09 → picks the owner for unseen noun + ending items; two occasions.
- **Where taught:** M10. CT-L1-27 (builds on lessons 20 and 26). UAG: not covered in depth. D-4 step 2g. Tracker B4.
- **Prerequisites:** soft CB-08 (mapping to independent pronouns), soft CB-09 (CT-L1-27 builds on iḍāfah).
- **Exercises:** Listen: pick owner. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: segment ending from noun. Meaning: Indonesian "-ku/-mu/-nya". Grammar: table of the endings used so far (optional reference). Apply: talk about own things. Review: spaced recall.
- **Evidence vs synthesis:** [C] M and CT agree on placing it after independent pronouns. [H] Link back to CB-01 words if a teacher confirms that a core shalat word carries such an ending.
- **Analogy risk:** Indonesian "-ku/-mu/-nya" are a good bridge here, but "-nya" also has non-possessive uses in Indonesian; do not over-extend.

#### CB-13 Kata kerja paling sering

- **Arabic term:** qāla, kāna (D-4; QAC verb ranks in riset ulang §2.1); fiʿl māḍī (UAG `madi`, `#L114`).
- **Explanation:** recognising and understanding the most frequent Qur'anic verbs in context.
- **Scope:** Qur'anic frequency only (V-03). Everyday MSA verbs (tracker V-02) are **not** covered by this node; V-02 is an open gap (see the tracker gaps after §4 and COMPETENCY_GRAPH.md check I-10).
- **Entry → outcome:** CB-06 → understands an unseen short sentence with one of these verbs and picks its meaning; two occasions.
- **Where taught:** M10 (past verbs). CT-L1-05 (verb types), CT-L1-29 (conjugation). UAG: `madi`. Note: both CT (CT-L1-11) and UAG (`kana-sisters`, `#L494`) treat kāna under the family of words that operate on a nominal sentence; how much of that to show when kāna is taught as a frequent verb is a teacher decision. D-4 step 2h. Tracker B6, V-03.
- **Prerequisites:** soft CB-06 (kāna relates to the nominal sentence in both CT and UAG).
- **Exercises:** Listen: sentence to scene. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: spot the verb. Meaning: choose meaning. Grammar: notice form changes across known examples `[ARABIC: teacher to supply]` (pattern only). Apply: report what someone said, with tiles. Review: spaced recall. Display counts as "muncul N kali dalam Al-Qur'an", never "paham X%" (riset ulang §2.1).
- **Evidence vs synthesis:** [C] Frequency-first is a method used by Qur'anic vocabulary courses (riset ulang §2). [H] Frequency decides which verbs first; meaning in context decides how.
- **Analogy risk:** glossing the past form with Indonesian _telah_ hides aspect (CT audit caveat 3; for example `textbook/pelajaran-23/index.md` line 17); give natural Indonesian renderings instead.

#### CB-14 Pelaku dan tindakan

- **Arabic term:** jumlah fiʿliyyah; fāʿil.
- **Explanation:** who does what in a sentence that starts with a verb (research doc §5.3 visual example 2).
- **Entry → outcome:** CB-13 → identifies doer and action in unseen sentences; two occasions.
- **Where taught:** M4 (named). CT-L1-09 (fāʿil). UAG: `verbal-sentence` (`#L348`), `fail` (`#L369`). Tracker B6.
- **Prerequisites:** soft CB-13, soft CB-03.
- **Exercises:** Listen: scene choice. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: tap doer, tap action. Meaning: natural Indonesian (CT's literal "Berdiri Zayd" order confuses without a natural rendering, `textbook/pelajaran-09/index.md` line 31, CT audit caveat 5; this is the only CT quotation in this file). Grammar: arrows from doer to action (research doc §7). Apply: swap doer or object (transfer). Review: new sentences.
- **Evidence vs synthesis:** [P] Transfer items show understanding beyond memory (research doc §6.3). [H] Labels fiʿl and fāʿil only after the meaning is clear.
- **Analogy risk (brief requirement):** "jumlah fiʿliyyah = kalimat yang diawali kata kerja" is a first approximation; Indonesian S-P-O order is flexible and different (research doc §5.3). Teacher to supply the agreement caveat.

#### CB-15 Lampau dan bukan lampau

- **Arabic term:** fiʿl māḍī, fiʿl muḍāriʿ (UAG `madi`, `mudari` at `#L143`).
- **Explanation:** telling a completed action from a not-completed or general one, from form and context.
- **Entry → outcome:** CB-13, CB-14 → picks the scene matching the verb form in unseen sentences; two occasions.
- **Where taught:** M10 (past only in M1 to M10). CT-L1-05, 23, 29. UAG p2. Tracker B7.
- **Prerequisites:** soft CB-13, soft CB-14.
- **Exercises:** Listen: two forms, pick scene. Imitate: repeat the model phrase after reviewed audio (deferred until A-01/A-02 deliver reviewed clips). Read: spot the prefix. Meaning: choose rendering by context. Grammar: guided induction on 3 to 5 pairs `[ARABIC: teacher to supply]`. Apply: retell. Review: mixed.
- **Evidence vs synthesis:** [P] Guided induction mixed; explicit short rule after examples (riset ulang §4). [H] Pilot candidate for the "temukan pola" template.
- **Analogy risk:** research doc §5.2 B7: do not equate muḍāriʿ with the English present tense; CT's glosses with _telah_ for past and _sedang_ or _akan_ for non-past (`textbook/pelajaran-23/index.md` line 17; `textbook/pelajaran-05/index.md` lines 134 to 135) hide aspect and context.

#### CB-16 Tiga jenis kata: ism, fiʿl, ḥarf

- **Arabic term:** ism, fiʿl, ḥarf.
- **Explanation:** naming the three word classes learners have already used, with precise caveats.
- **Entry → outcome:** CB-06, CB-07, CB-14 → sorts unseen words into the three classes and gives the reason (explanation item, research doc §6.3); two occasions.
- **Where taught:** CT-L1-05 (early, by definition; the isim explanation states up front that isim is broader than Indonesian _kata benda_, `textbook/pelajaran-05/index.md` line 27). UAG: `word-classes` (`#L71`), glossing ism as "Noun" in its glossary (do not carry over). Brief Phase 3 layer 3.
- **Prerequisites:** soft CB-06, CB-07, CB-14 (needs used examples of each class). **Not** a gate for anything (brief Phase 4).
- **Exercises:** Listen: none (classification task; each item keeps its audio). Imitate: none. Read: read each item before sorting it. Grammar: sort with reasons. Meaning: why a word is ism though Indonesian calls it a sifat or kata ganti. Apply: classify words in a CB-01 phrase. Review: occasional.
- **Evidence vs synthesis:** [C] CT and UAG put this at the start; M does not foreground it. [H] Late naming, early use.
- **Analogy risk (brief requirement):** research doc §5.3: ism is **not** identical to kata benda (it includes adjectives, pronouns, pointing words); ḥarf is **not** just kata hubung (prepositions, conjunctions, negation). CT's ḥarf analogy lists Indonesian prepositions and conjunctions together (`textbook/pelajaran-05/index.md` line 165); qualify.
- **Licensing:** the one candidate **adaptation** in this file: CT's isim explanation pattern (`textbook/pelajaran-05/index.md`, section _ISIM_), CC BY-SA 4.0, with attribution to Cahaya Tauhid, a link to the file at SHA `d27cb0c`, a licence link and a change note; new examples; teacher review. Default remains our own wording.

#### CB-17 Gender dan jumlah (backlog)

- **Arabic term:** tunggal, dua, jamak; UAG `number` (`#L644`), `plurals` (`#L671`).
- **Explanation:** recognising how gender and number change words and agreement.
- **Entry → outcome:** CB-10, CB-11 → recognises the effect on unseen items; does not memorise irregular plurals (research doc §5.2 B9).
- **Where taught:** CT-L1-22 (numbers), Level 2. UAG p6. Tracker B9.
- **Prerequisites:** soft CB-10, CB-11.
- **Exercises:** Grammar: sort forms. Meaning: pictures with one, two, many. Review: spaced.
- **Deferred fields:** Listen, Imitate, Read and Apply exercises. Reason: backlog node, not scheduled in U1 to U10; these fields are written when the node is scheduled into a unit and reviewed.
- **Evidence vs synthesis:** [H] Recognition only on the main path.
- **Analogy risk:** Indonesian marks plural by reduplication or context (CT audit caveat 4 notes CT's own contradiction on this); there is no dual. Teacher to word it.

#### CB-18 Keluarga akar kata (backlog)

- **Arabic term:** jadhr (akar), wazn (pola) (research doc §5.3).
- **Explanation:** word families that share consonants (research doc §5.3 visual example 3).
- **Entry → outcome:** CB-15 → groups unseen words into families and says when a meaning cannot be guessed; two occasions.
- **Where taught:** CT-L1-30 to 34 (with a root-first dictionary lab in `workbook/pelajaran-30/index.md`). UAG: out of scope. Tracker B10.
- **Prerequisites:** soft CB-15 (several verb meanings known first, research doc §5.3).
- **Exercises:** Read: highlight shared consonants. Meaning: guess then check. Grammar: pattern noticing. Apply: dictionary lookup by root (optional, CT idea). Review: family sets.
- **Deferred fields:** Listen and Imitate exercises. Reason: backlog node, not scheduled in U1 to U10; these fields are written when the node is scheduled into a unit and reviewed.
- **Evidence vs synthesis:** [C] CT and the pesantren tradition teach patterns explicitly. [H] After meaning, never as a gate.
- **Analogy risk:** "lego" analogy (research doc §5.3) suggests meanings are predictable; they are not always. Show exceptions.

#### CB-19 Kata tugas Al-Qur'an paling sering (thread)

- **Arabic term:** min, fī, inna, ʿalā, alladhī, mā, lā (riset ulang §2.1).
- **Explanation:** short usage lessons for the most frequent Qur'anic function words, which do not suit picture cards.
- **Entry → outcome:** CB-04, CB-07 → understands the function word in an unseen short phrase; two occasions.
- **Where taught:** riset ulang §2 (frequency method, Arabic 101 idea of a dedicated lesson for one function word; idea only). UAG: `particles` compendium (`#L902`). CT: scattered across lessons. Tracker V-03.
- **Prerequisites:** soft CB-04 (mā), soft CB-07 (fī). Optional CB-01.
- **Exercises:** Listen: hear the phrase, tap the function word. Imitate: optional repeat, no scoring. Read: spot the word in a vocalised phrase. Meaning: phrase-level glosses. Grammar: one usage at a time. Apply: deferred to the unit where each word first appears (thread node; the word order waits on the V-03 candidate list, RS-03). Review: spaced. Qur'anic phrases from Tanzil verbatim, labelled.
- **Evidence vs synthesis:** [C] frequency courses do this. [H] Threaded through units as each word appears; no icons (D-6).
- **Analogy risk:** one Arabic function word often has several Indonesian renderings; mā alone has several uses (riset ulang §2.1 notes a dedicated lesson for it). Teacher to supply.
- **Review:** Arabic teacher and **ustadz** (Qur'anic phrases).

#### CB-20 Bertanya dan dialog pendek (backlog)

- **Arabic term:** mā, man (D-4); question words as a class are isim istifham in the CT syllabus (`docs/silabus.md` lines 175 and 250) _(term to confirm)_.
- **Explanation:** understanding simple questions and answers in short dialogues (B8, B11).
- **Entry → outcome:** CB-04, CB-08 → chooses a fitting response in an unseen dialogue; two occasions.
- **Where taught:** M (questions from M1). CT: conversation excluded by design. Al-ʿArabiyyah Bayna Yadayk unit shape (3 dialogues) noted in riset ulang §6 (form only).
- **Prerequisites:** soft CB-04, CB-08.
- **Evidence vs synthesis:** [H] Receptive first; productive answers by choosing, not speaking.
- **Analogy risk:** none specific.
- **Deferred fields:** exercises. Reason: backlog node, not scheduled in U1 to U10; these fields are written when the node is scheduled into a unit and reviewed.

#### CB-21 Integrasi dan transfer (backlog)

- **Arabic term:** none needed (integration node).
- **Explanation:** understanding a short paragraph or story and answering about it (B11, B12), with harakat reduced step by step.
- **Entry → outcome:** CB-11, CB-15, CB-20 → answers comprehension items on an **unseen** text.
- **Where taught:** CT workbook _Eksplorasi Mendalam_ sections (full analysis of one ayah or surah) is a different goal (iʿrāb, not comprehension). Tracker B11, B12.
- **Prerequisites:** soft CB-11, CB-15, CB-20.
- **Evidence vs synthesis:** [P] Transfer to new examples is the test of understanding (research doc §6.3). [H] Harakat fading is a hypothesis (OLK `prim:reading-aid-fade` as a pattern); teacher to judge.
- **Deferred fields:** exercises and analogy risk (both depend on the texts chosen). Reason: backlog node, not scheduled in U1 to U10; these fields are written when the node is scheduled into a unit and reviewed.

### Optional reference layers

#### CR-01 Tabel tashrif istilahi

- **Arabic term:** tashrif istilahi (tracker R-02; spelling per RS-07).
- **Explanation:** a reference table of verb forms by pattern, for lookup and optional recall drills.
- **Where taught:** CT-L1-29 to 34; UAG `seegha-grid` (`#L99`); Al-Amtsilah at-Tashrifiyyah tradition (riset ulang §6). Tracker R-02 (**blocked**: bab and column order unverified, RS-06).
- **Prerequisites:** soft CB-15; optional CB-18.
- **Evidence vs synthesis:** [C] memorised through lalaran in pesantren. [H] Optional reference and retrieval drill, never a gate (research doc §6.1a). No data, not even fixtures, until RS-06.
- **Deferred fields:** entry → outcome, exercises and analogy risk. Reason: optional reference layer, never a gate; these fields are written only if the teacher review keeps the layer. Also blocked on RS-06.

#### CR-02 Tabel jenis ḥarf

- **Arabic term:** ḥarf; names of the particle types _(terms to confirm)_.
- **Explanation:** a reference table of particle types, each row linked to an example in context.
- **Where taught:** CT-L1-19, 24, 25; UAG `particles` (`#L902`). Tracker R-01.
- **Prerequisites:** soft CB-07; optional CB-16.
- **Evidence vs synthesis:** [H] Decide MSA vs classical scope first (tracker R-01). Each row links to an example in context.
- **Analogy risk:** as CB-16: ḥarf is not just Indonesian _kata hubung_.
- **Deferred fields:** entry → outcome and exercises. Reason: optional reference layer, never a gate; these fields are written only if the teacher review keeps the layer. Scope decision (R-01) comes first.

#### CR-03 Iʿrāb: empat keadaan akhir kata

- **Arabic term:** iʿrāb; rafʿ, naṣb, jarr, jazm (CT-L1-07; UAG `STATES` in `app/data/content.js`).
- **Explanation:** the four states a word's ending can show for its role in the sentence, and the signs that mark them.
- **Where taught:** CT-L1-06, 07 (before sentence types). UAG p3 and p7 (`signs-bridge` `#L770`, `signs-master` `#L887`).
- **Prerequisites:** soft CB-06, CB-14, CB-16.
- **Evidence vs synthesis:** [C] central to CT and UAG. [H] Optional for our meaning-first path. If taught, label the vowel-only model as partial from the start, and generate any exception table from data with an explicit exception field (UAG pattern).
- **Analogy risk:** CT compares iʿrāb to traffic signs and to English pronoun case forms, and treats the Indonesian possessive endings as a small role marker (`textbook/pelajaran-06/index.md` lines 28, 49 and 57); the auditor considers the last one questionable (pronoun clitics). Indonesian has no case inflection; any Indonesian framing is our hypothesis (UAG audit caveat 3).
- **Deferred fields:** entry → outcome and exercises. Reason: optional reference layer, never a gate; these fields are written only if the teacher review keeps the layer.

## 6. Cross-cutting findings

| Finding                                                                                        | Label                                    | Consequence for the graph                                                                                                      |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Retrieval practice beats re-reading; recall beats recognition; corrective feedback is required | [P] riset ulang §4                       | Every competency's outcome includes a recall item; feedback explains why (LL omits the why; LT makes it mandatory in quizzes). |
| Spacing helps L2 learning; equal and expanding gaps are similar                                | [P] riset ulang §4 (Kim & Webb 2022)     | Review via ts-fsrs (F-09); thresholds are hypotheses.                                                                          |
| Pictures help concrete words; recall with the picture hidden matters                           | [P] riset ulang §4                       | Icons only on CB-03 style nouns (D-6).                                                                                         |
| Explicit vs implicit: small advantage for explicit; guided induction mixed                     | [P] riset ulang §4                       | Examples, then a short rule, then the term; never a terminology gate.                                                          |
| Pointing and questions first; pronouns early; verbs around lesson 10                           | [C] M                                    | Adopted by D-4 as a working order.                                                                                             |
| Whole grammar map first, organised by iʿrāb roles; pronouns late                               | [C] CT                                   | Used as a contrast column, not a template.                                                                                     |
| Topic links are see-also, not prerequisites                                                    | [C] UAG                                  | Our graph keeps prerequisite edges and see-also links as separate fields.                                                      |
| Two prerequisite strengths, re-checked per track with "assumes"                                | [C] OLK (design pattern, uncited by OLK) | We use three strengths (hard, soft, optional) and track-level `assumes`.                                                       |
| Unit 1 = core shalat words                                                                     | [H] D-4                                  | Entry node CB-01; tested in RS-08 and with learners.                                                                           |

## 7. Open questions for the teacher review

1. Is the U2 to U9 order (D-4) workable for self-study adults, and where should the nominal sentence be named (our U3 insertion)?
2. Should the far pointing word (M2) be taught in U2 with hādhā, or later with the feminine forms (M7)?
3. How should kāna be presented when it first appears as a frequent verb (CB-13), given that CT and UAG both treat it as an operator on the nominal sentence?
4. Which sound contrasts (CA-01) and decoding errors (CA-03) are most common for Indonesian Iqra graduates?
5. Wording of each "analogy risk" above, especially CB-06, CB-14 and CB-16 (brief quality criteria).
6. Whether any core shalat word in CB-01 can serve as an early, gentle example for CB-12 (attached pronouns).
7. Which grammatical term spellings to use in Indonesian (RS-07).

## 8. Licence summary (background, not legal advice)

- **Imported material: zero.** Every competency is `PROJECT_ORIGINAL` until written and reviewed.
- **CT (CC BY-SA 4.0):** order facts may be cited with attribution and a file link. One candidate adaptation (CB-16 isim explanation pattern) would need attribution, a change note and CC BY-SA on the adapted text. Never copy the logo, the PDFs, or CT's Qur'an, translation or prayer texts.
- **M:** order facts only, from a summary of a commercial course; no text.
- **UAG, AV:** no usable licence for their content; ideas only, re-expressed in our own words and code.
- **LL:** licence UNKNOWN (root LICENSE is Expo MIT boilerplate; authors' grant unconfirmed); ideas only, re-expressed in our own words and code.
- **OLK (CC BY-NC 4.0):** modelling ideas only; nothing imported into CC BY-SA text or into our code.
- **LT (0BSD own work):** topic checklist and pipeline ideas may be adapted with provenance recorded; Tanzil text comes from tanzil.net directly.
