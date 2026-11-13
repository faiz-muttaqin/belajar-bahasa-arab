# Arabic Learning — Curriculum Source Research & License Audit

> **Status:** research brief / preliminary licensing assessment, not an authorization to import all material.  
> **Verified:** 2026-11-14 (public repositories, official project pages and Creative Commons documentation).  
> **Project:** `belajar-bahasa-arab` / `arab.faizmuttaqin.com` (proposed).  
> **Audience:** Indonesian learners, especially adults who can read Arabic/Iqra but do not yet understand vocabulary or grammar; a separate optional Iqra/beginner pathway.  
> **Distribution:** public-access, noncommercial, open project, static-first SvelteKit.  
> **Purpose of this file:** instruct a research/coding agent to clone and audit external resources, compare curricula, and produce an original, source-traceable curriculum before writing lessons.

## Executive decision

1. **Use, study and compare multiple curricula; do not copy everything at once.** Curriculum sequence, general grammatical facts and teaching ideas may inform an original design. Exact expression, lesson text, exercises, translations, illustrations, audio, and substantive adaptations need separate rights and provenance checks.
2. **Preferred primary Arabic curriculum comparison:** Cahaya Tauhid + Madinah Arabic + Dar Al-Lughah. Add a listening/contextual axis from Al Jazeera Learning Arabic. Arabic grammar reference can inform cross-linked concepts, but not be automatically copied.
3. **Preferred interactive-learning architecture comparison:** OpenLanguageKit (knowledge points, prerequisite graph, practice contracts) + Lingo Lessons (activity UX, review and offline progress) + Arabic Vocab (mastery mechanism) + Learn Tajweed (source validation). These have different licensing gates.
4. **For this noncommercial project:** CC BY-NC 4.0 resources can be used **subject to license conditions and asset-level provenance**, but are **not automatically compatible** with CC BY-SA 4.0 when producing a _single remix/adaptation_. Separate independently licensed learning modules or write original explanations and retain provenance. Creative Commons distinguishes _collections_ from _adaptations_; the legal analysis depends on how works are combined.
5. **Never import assets** from a `NO LICENSE`, `PERSONAL/EDUCATIONAL ONLY`, `UNCERTAIN`, or third-party copyrighted source without separate permission or another clear legal basis. Public GitHub visibility alone does not grant reuse rights.
6. **Keep code and content license scopes separate.** The project's original code can use an OSI-approved license chosen later (e.g. MIT); a lesson adapted from CC BY-SA must retain its ShareAlike obligations. Do not label all third-party content as MIT.

## A. Clone-and-audit sources (priority order)

All repositories are **references for the research stage**. Clone into a separate research folder, not into `src/`, `content/`, `static/`, or another distribution/build directory. Pin a commit SHA in the inventory to prevent silently changing licensing between reviews.

| Priority | Source                                  | Repository / review link                            | Observed license                                                                                                | Safe next step                                                                                                                                              |
| -------- | --------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | **Cahaya Tauhid — Belajar Bahasa Arab** | https://github.com/cahayatauhid/belajar-bahasa-arab | **CC BY-SA 4.0**, with **logo excluded**                                                                        | Read and compare; may adapt lesson content with attribution, ShareAlike and changes disclosed; **do not import publisher logos**                            |
| P0       | **OpenLanguageKit**                     | https://github.com/ywEdAi/OpenLanguageKit           | **CC BY-NC 4.0** applies to data, docs and code according to project README                                     | Noncommercial reuse potentially allowed with attribution; study curriculum/primitives; avoid remix with BY-SA content unless license compatibility resolved |
| P0       | **Learn Tajweed**                       | https://github.com/edriso/learn-tajweed             | **0BSD** for original app/lessons/scripts; third-party components different                                     | May inspect/adapt original work; audit `NOTICE` before reusing Quran corpus, audio, names or fonts                                                          |
| P1       | **Lingo Lessons**                       | https://github.com/Open-Apps-Studio/lingo-lessons   | Root `LICENSE` contains **MIT boilerplate credited to Expo/650 Industries**, not clearly this project's authors | Study UI and curriculum pipeline; **do not wholesale copy code/content** before confirming rights and scope                                                 |
| P1       | **Arabic Vocab Trainer**                | https://github.com/arifgov/Arabic-Vocab             | README: personal/educational use; **no explicit standard reuse license established**                            | Study the approach; implement original mastery logic; don't import vocab dataset/PDF extraction unverified                                                  |
| P1       | **Unified Arabic Grammar**              | https://github.com/zeusopera9/arabic-grammar        | **No explicit license located** in reviewed root files; work is based on referenced textbooks                   | Study topic graph, term distinctions and color semantics; **do not copy text/data/code** without permission or independent sources                          |

### Direct curriculum and license links

**Cahaya Tauhid**

- Repo: https://github.com/cahayatauhid/belajar-bahasa-arab
- Full curriculum design: https://github.com/cahayatauhid/belajar-bahasa-arab/blob/main/docs/desain-kurikulum.md
- Syllabus: https://github.com/cahayatauhid/belajar-bahasa-arab/blob/main/docs/silabus.md
- Textbook source: https://github.com/cahayatauhid/belajar-bahasa-arab/tree/main/textbook
- Workbook source: https://github.com/cahayatauhid/belajar-bahasa-arab/tree/main/workbook
- Slide source: https://github.com/cahayatauhid/belajar-bahasa-arab/tree/main/slides
- License: https://github.com/cahayatauhid/belajar-bahasa-arab/blob/main/LICENSE
- Logo exception: https://github.com/cahayatauhid/belajar-bahasa-arab/blob/main/assets/logo/README.md
- Website: https://cahayatauhid.github.io/belajar-bahasa-arab/
- Why: explicitly designed for adult Indonesian Muslim learners already able to read Arabic, with 34 completed foundation lessons. Levels 2–5 are described in the syllabus, not all implemented.
- Audit: unit order, assessment assumptions, use of Indonesian analogies, explanation of `isim`/`fi'il`/`harf`, practice translation, distinction between rote memorization and conceptual understanding, and non-gated exploration.

**OpenLanguageKit**

- Repo: https://github.com/ywEdAi/OpenLanguageKit
- Curriculum folder: https://github.com/ywEdAi/OpenLanguageKit/tree/main/curriculum
- Practice primitives: https://github.com/ywEdAi/OpenLanguageKit/tree/main/curriculum/primitives
- README and warnings about review status: https://github.com/ywEdAi/OpenLanguageKit/blob/main/README.md
- License: https://github.com/ywEdAi/OpenLanguageKit/blob/main/LICENSE
- Commercial-policy statement: https://github.com/ywEdAi/OpenLanguageKit/blob/main/COMMERCIAL.md
- Why: a pedagogical knowledge layer with prerequisites, reusable exercise contracts, a planner and self-reported limits. It is **not an Arabic curriculum**, and some Japanese/Chinese material remains pending review.
- Audit: identify actual schema for knowledge points, prerequisites, activity specifications, pedagogical claims, QA flags and testable graph invariants. Treat the planner's scheduling numbers as assumptions unless substantiated.

**Learn Tajweed**

- Repo: https://github.com/edriso/learn-tajweed
- Lesson-writing guidelines: https://github.com/edriso/learn-tajweed/blob/main/docs/writing-lessons.md
- Quran verification pipeline: https://github.com/edriso/learn-tajweed/blob/main/docs/quran-pipeline.md
- License: https://github.com/edriso/learn-tajweed/blob/main/LICENSE
- Third-party notices: https://github.com/edriso/learn-tajweed/blob/main/NOTICE
- Website: https://edriso.github.io/learn-tajweed/
- Why: original course comprises 34 tajweed lessons in 11 units and builds verify quoted Quranic text against a pinned corpus.
- Audit: content validation, reviewer requirements, audio/verse linking, RTL behavior, scoped highlighting, accessibility and build-time rejection of invalid material. Do not confuse its Quran-reading objectives with a full Arabic-language curriculum.

**Lingo Lessons**

- Repo: https://github.com/Open-Apps-Studio/lingo-lessons
- Root license: https://github.com/Open-Apps-Studio/lingo-lessons/blob/main/LICENSE
- README: https://github.com/Open-Apps-Studio/lingo-lessons/blob/main/README.md
- Why: mobile-first learn-path, lesson engines, mistake review and spaced repetition; bundled JSON and pre-generated TTS; not an Arabic course.
- Audit: exercise sequencing, state transitions, feedback, local-first data and audio packaging. If a file in the codebase uses a different license, document per-path. **Do not presume root `LICENSE` licenses authors' original materials.**

**Arabic Vocab Trainer**

- Repo: https://github.com/arifgov/Arabic-Vocab
- README: https://github.com/arifgov/Arabic-Vocab/blob/main/README.md
- Why: displays lesson unlocks, localStorage progress, word accuracy and a three-consecutive-correct rule.
- Audit: mastery logic as an illustrative implementation, not as a research-backed optimal threshold. Avoid copying vocabulary derived from copyrighted books without checking that data's rights.

**Unified Arabic Grammar**

- Repo: https://github.com/zeusopera9/arabic-grammar
- User guide: https://github.com/zeusopera9/arabic-grammar/blob/main/GUIDE.md
- README: https://github.com/zeusopera9/arabic-grammar/blob/main/README.md
- Why: organizes nahw and sarf by grammatical concept and provides backlinks between topics. It explicitly describes derivation from Arabic 1–3 textbooks; that makes material-level provenance important.
- Audit: concept indexing, link graph, color usage with non-color cues, presentation of exceptions. Don't import lesson text, examples, or code without license clarity.

### Suggested clone commands (research-only)

```bash
mkdir -p research/external && cd research/external

git clone --depth 1 https://github.com/cahayatauhid/belajar-bahasa-arab.git cahaya-tauhid
git clone --depth 1 https://github.com/ywEdAi/OpenLanguageKit.git open-language-kit
git clone --depth 1 https://github.com/edriso/learn-tajweed.git learn-tajweed
git clone --depth 1 https://github.com/Open-Apps-Studio/lingo-lessons.git lingo-lessons
git clone --depth 1 https://github.com/arifgov/Arabic-Vocab.git arabic-vocab
git clone --depth 1 https://github.com/zeusopera9/arabic-grammar.git arabic-grammar

# Record pinned audit revision; repeat in each cloned directory.
for repo in */.git; do
  dir=${repo%/.git}
  printf '%-24s %s\n' "$dir" "$(git -C "$dir" rev-parse HEAD)"
done
```

> `.gitignore`: add `research/external/` to the **application repository**. Keep audit notes and an evidence ledger in `docs/research/`; don't commit cloned third-party trees to the production app accidentally. Some links above are confirmed from the public pages, but agent should verify the paths exist after cloning, as upstream repos can change.

## B. Public websites: curriculum/UX reference only (no presumed reuse permission)

| Website                    | Link                                           | Observe                                                                                                                       | Rights decision                                                       |
| -------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Madinah Arabic             | https://madinaharabic.com/free-content/grammar | Grammar progression, starting with demonstratives, nominal structures and inflection. Its reading course is a separate entry. | View and analyze only; no general content-reuse license established   |
| Al Jazeera Learning Arabic | https://learning.aljazeera.net/                | Placement levels, authentic listening, text/harakat toggles, contextual language.                                             | View and analyze only; media and texts remain third-party copyrighted |
| Dar Al-Lughah curriculum   | https://darallughah.com/curriculum             | How Madinah, Bayna Yadayk and sarf materials form a staged progression.                                                       | View and analyze only; don't copy lesson content                      |
| Creative Commons FAQ       | https://creativecommons.org/faq/               | Official distinction between collections, remixes/adaptations and compliance                                                  | Legal/policy reference                                                |

If the agent discovers another public course, add it to the register with URL, license evidence, date, educational focus, and scope of allowed use. Do not assume "free to view" = "free to redistribute".

## C. License analysis for a free and public project

**Declared project intent:** noncommercial and freely accessible. This helps with CC BY-NC resources but does **not** erase attribution, ShareAlike, or third-party terms. "Open to the public" is different from an **Open Source Initiative–approved** license: CC BY-NC is not an OSI-style unrestricted open-source software license.

| License or status                  | Research                     | Adapt and publish in this noncommercial project? | Conditions / caveat                                                                                                                                                             |
| ---------------------------------- | ---------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CC BY-SA 4.0                       | Yes                          | **Yes, conditionally**                           | Attribute, link license, disclose modification, license the _adaptation_ under BY-SA or officially compatible terms; do not add restrictions; exclude reserved trademarks/logos |
| CC BY-NC 4.0                       | Yes                          | **Yes, conditionally**                           | Noncommercial use only, attribution, license link, indicate changes; don't imply commercial permission; don't mix with BY-SA in one incompatible remix                          |
| 0BSD                               | Yes                          | **Generally yes for original covered work**      | Verify individual third-party assets, fonts, Quran corpus, audio and source attribution requirements                                                                            |
| MIT (clear valid scope)            | Yes                          | **Generally yes for covered software**           | Retain required copyright/license notice; cannot assume every bundled dataset/artwork shares MIT                                                                                |
| No explicit license                | Yes (read/learn facts/ideas) | **Do not copy protected expression**             | Obtain permission, or independently create from permitted sources                                                                                                               |
| "Personal/educational use" only    | Yes                          | **Not automatically**                            | A use statement is not the same as permission to copy, modify and redistribute publicly                                                                                         |
| Public website, no content license | Yes                          | **No copying by default**                        | Analyze pedagogy and lesson order; author original content                                                                                                                      |

### Combining CC BY-SA and CC BY-NC (important)

- **Collection/anthology:** it is sometimes possible to publish separate independently licensed works in a noncommercial collection, preserving the original license and attribution of **each item**. The collection license does **not** change the underlying works' terms.
- **Remix/adaptation:** taking protected expressive material from BY-SA and BY-NC works and blending it into _one inseparable derivative lesson_ may create license incompatibility. **Do not auto-merge those passages.** Use new original text informed by general educational principles, separate licensed modules, or obtain additional permission.
- **Dataset/code boundary:** a content pack may have a different license from framework code. Maintain per-lesson and per-asset notices, not only a root license.
- **Future options:** even if the project is noncommercial today, NC assets create constraints for forks and future uses. Track them separately to allow later removal/replacement.

Official guidance:

- BY-SA: https://creativecommons.org/licenses/by-sa/4.0/
- BY-NC: https://creativecommons.org/licenses/by-nc/4.0/
- Combining/collections FAQ: https://creativecommons.org/faq/#combining-and-adapting-cc-material
- ShareAlike compatible licenses: https://creativecommons.org/compatible-licenses/
- Creative Commons attribution best practices: https://creativecommons.org/use-remix/attribution/

**Not legal advice:** before substantial redistribution of a mixed copyrighted curriculum, request legal review or rights-holder permission if there is a genuine incompatibility. Never make an AI agent treat uncertain licensing as permission.

## D. Research plan for agent: separate analysis from content production

### Phase 1 — Inventory and provenance (no publishing)

For each GitHub source:

1. Clone into `research/external` and record full URL, default branch, SHA, last-seen timestamp, license file/README evidence link.
2. Enumerate curricula, lesson manifests, ordering, prerequisites, practice types, test requirements, expected knowledge at each level, external media and textbooks.
3. Check for nested `LICENSE`, `NOTICE`, `COPYING`, asset-level terms and any explicit logo/trademark exceptions.
4. Flag any dataset built from textbooks, PDF extraction or media APIs; do not assume an author's license over content they do not own.
5. Write `docs/research/SOURCE_INVENTORY.md` with an entry for every imported/considered item, not just every repository.

### Phase 2 — Curriculum comparison

Deliver `docs/research/CURRICULUM_COMPARISON.md` with a table for each candidate competency:

- `competency_id`, Indonesian title, Arabic term, plain-language explanation;
- intended learner entry level and measurable outcome;
- where each source teaches it (URL/path/lesson ID);
- prerequisites (`hard`, `soft`, `optional`), with reasons;
- listening, imitation, reading, meaning, grammar, application and review exercises;
- evidence from source and an explicit **agent synthesis** column;
- possible misleading Indonesian analogy and how to qualify it;
- teacher review status and licensing pathway.

Do not claim a teaching sequence is scientifically validated merely because a course uses it. Separate published pedagogy, teaching conventions and our hypotheses.

### Phase 3 — Propose our own learning paths

**Main path: post-Iqra.** A short optional diagnostic detects whether learners can read fully-vowelled words, recognize common audio, and connect a phrase to meaning. Do **not** assume Quran literacy means vocabulary/grammar proficiency.

**Parallel optional path: Iqra / absolute beginner.** Sounds, letter shapes, contextual letter joining, harakat, word decoding and reading fluency. Keep it accessible from onboarding, navigation and a placement-result recommendation.

Suggested competency layers (a _hypothesis to test_, not a fixed syllabus):

1. Listen to a meaningful word/phrase -> recognize referent/image -> imitate -> read fully-vowelled text.
2. High-frequency words, demonstratives, pronouns, common nouns and simple nominal sentences; everyday context and Indonesian meanings.
3. Understand the practical function of `isim`, `fi'il` and `harf`, then give precise linguistic caveats; do **not** equate `isim` exclusively with Indonesian `kata benda` or `harf` exclusively with `kata hubung`.
4. Simple verb and sentence structures, subject/object, gender/number, familiar root-pattern examples; gradually introduce tashrif concepts.
5. Sentence comprehension, listening-to-text, grammar explanation, transfer to unseen examples and retrieval-based review.
6. Advanced optional tracks: Quranic/classical Arabic, modern standard Arabic comprehension, and structured nahw/sarf reference.

A meaningful lesson may introduce a _usable sentence_ **before** naming its grammatical categories; the explicit grammar explanation can follow once the learner has a referent.

### Phase 4 — Assessment and prerequisite design

- Define **hard prerequisites only for capabilities that make the next activity impossible** (e.g. reading a fully-vowelled word independently before an unassisted reading task). For listening, offer an audio-first route even to users who cannot read.
- Avoid gates based solely on memorizing Arabic technical terminology.
- Mix recognition with **independent recall**. Multiple-choice success alone is not mastery.
- Use spaced review but treat all initial scheduling thresholds as hypotheses.
- Track mistakes by skill (sound recognition, harakat, meaning, form, word order), not only pass/fail.
- Keep a manual "continue anyway" affordance except where a feature literally requires an unavailable prerequisite.

### Phase 5 — Pedagogy + UI design specification

For every sample lesson generate:

1. Audience, outcome and prerequisite.
2. One _listen-first_ step, optionally with image/animation, rather than an opening glossary dump.
3. A tap-to-replay Arabic audio action; no autoplay surprise, low-bandwidth fallback.
4. Arabic displayed in readable Noto Naskh Arabic with reliable diacritics and RTL; Indonesian in Plus Jakarta Sans or equivalent.
5. Tappable word-by-word association, with token boundaries and translation caveats.
6. Explain the concept in Indonesian first, then reveal Arabic grammatical terminology.
7. Two meaningful applications and one retrieval-based check.
8. Clear feedback; animation and color cannot be the sole carriers of meaning.
9. Light/dark, responsive touch targets and keyboard/screen-reader behavior.
10. Source/license metadata and reviewer status.

Keep generated audio separate from lesson content. If using Voicebox, validate pronunciation and licensing of **models, voices and outputs**, not just the GitHub application's code.

## E. Required source evidence ledger

One row per _piece of material_, not per repository:

| Field                   | Required example / instruction                                                     |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `asset_id`              | `lesson-demonstratives-01/explanation-01`                                          |
| `kind`                  | `text`, `example`, `audio`, `image`, `lesson_structure`, `code`                    |
| `source_url`            | Exact upstream file URL or public lesson URL                                       |
| `source_repo_sha`       | Pinned SHA or `N/A` for public site                                                |
| `source_author`         | Publisher / original author                                                        |
| `source_license`        | Exact label, **or `UNKNOWN`**                                                      |
| `rights_scope`          | What the license actually covers; any nested exceptions                            |
| `usage_type`            | `independent-original`, `inspiration-only`, `adaptation`, `verbatim`, `collection` |
| `changes`               | Specific edits, translation or synthesis history                                   |
| `attribution_text`      | Text shown to users or attribution index                                           |
| `compatibility_checked` | `true/false` with documented reason                                                |
| `linguistic_review`     | `pending / approved / rejected`                                                    |
| `publication_status`    | `research-only / approved / blocked`                                               |

**Release gate:** reject the build/PR if `publication_status != approved` for any copied/adapted third-party asset that ships, or if `source_license=UNKNOWN` and the item contains protected third-party expression. Genuine original content may have `source_license=PROJECT_ORIGINAL`, with research references listed separately.

### Suggested repo structure

```text
belajar-bahasa-arab/
  docs/
    research/
      CURRICULUM_SOURCE_AUDIT.md      # this document
      SOURCE_INVENTORY.md              # generated by research agent
      CURRICULUM_COMPARISON.md         # generated by research agent
      LICENSE_DECISIONS.md             # decisions with evidence
    curriculum/
      COMPETENCY_GRAPH.md              # proposed, subject to review
      ONBOARDING_SPEC.md
  content/
    curriculum/                      # authored, structured, original
    lessons/                         # lesson files with provenance metadata
  static/
    audio/                           # only rights-cleared assets
  research/
    external/                        # ignored; cloned third-party repos
  LICENSE                            # own code license (separate)
  CONTENT_LICENSES.md                # per-source rights and attribution
  AGENTS.md                          # must link this guide
```

### Attribution template for a published adapted lesson

```text
This lesson adapts material by [AUTHOR], "[SOURCE TITLE]", [SOURCE URL],
licensed under [LICENSE NAME + URL]. Modified: translated, restructured,
and supplemented with original exercises. Adapted educational content
is made available under [LICENSE REQUIRED FOR THE ADAPTATION].
```

For CC BY-SA materials, ensure the adapted content's license actually matches the ShareAlike condition. For BY-NC materials, make sure no claim implies commercial permission. Place the attribution in a visible credits panel and in `CONTENT_LICENSES.md`; linking a lesson's license metadata programmatically is preferable to handwritten scattered text.

## F. Required deliverables and completion checklist

**The agent's research task ends before implementation or mass content generation.** Return:

- [ ] `SOURCE_INVENTORY.md`: all sources, pinned SHAs, license and asset exceptions.
- [ ] `CURRICULUM_COMPARISON.md`: competing concept orders and reasons; URLs to exact lessons/files.
- [ ] `LICENSE_DECISIONS.md`: per-source `allow / conditional / research-only / blocked` with citations.
- [ ] `COMPETENCY_GRAPH.md`: initial graph for post-Iqra core and optional Iqra track.
- [ ] `ONBOARDING_SPEC.md`: minimal onboarding + optional placement test + accessibility.
- [ ] Three sample lesson briefs only, each marked `DRAFT — NOT LINGUISTICALLY REVIEWED`.
- [ ] Count of imported materials = **zero** until the license and editorial review gates are met.

### Quality criteria

- Distinguish Arabic linguistic facts from a textbook's copyrighted wording and pedagogy from implementation.
- Explain Indonesian analogy limitations, especially `isim`, `fi'il`, `harf`, `jumlah ismiyah`, and `jumlah fi'liyah`.
- Evaluate all four skills (listening, speaking/imitation, reading, writing) without assuming each requires equal weight in the first prototype.
- Identify which exact prereqs deserve a hard gate, versus optional assistance/review.
- Identify every Arabic audio/image/text asset that would create a third-party-license obligation.
- Preserve machine-readable source metadata, human-readable attribution and a human review step.
- No copied logo or trademark, no unverified book-derived vocab imports, no mass AI-generated Arabic educational content published unchecked.

## G. Verified source and policy links

### Repository licensing / provenance

1. Cahaya Tauhid repository: https://github.com/cahayatauhid/belajar-bahasa-arab
2. Cahaya Tauhid CC BY-SA LICENSE: https://github.com/cahayatauhid/belajar-bahasa-arab/blob/main/LICENSE
3. Cahaya Tauhid excluded logo rights: https://github.com/cahayatauhid/belajar-bahasa-arab/blob/main/assets/logo/README.md
4. OpenLanguageKit repository: https://github.com/ywEdAi/OpenLanguageKit
5. OpenLanguageKit LICENSE: https://github.com/ywEdAi/OpenLanguageKit/blob/main/LICENSE
6. OpenLanguageKit COMMERCIAL.md: https://github.com/ywEdAi/OpenLanguageKit/blob/main/COMMERCIAL.md
7. Learn Tajweed repository and 0BSD notice: https://github.com/edriso/learn-tajweed
8. Learn Tajweed NOTICE: https://github.com/edriso/learn-tajweed/blob/main/NOTICE
9. Lingo Lessons root MIT file with Expo authorship ambiguity: https://github.com/Open-Apps-Studio/lingo-lessons/blob/main/LICENSE
10. Arabic Vocab README (personal/educational statement): https://github.com/arifgov/Arabic-Vocab
11. Unified Arabic Grammar README, textbook-derived work: https://github.com/zeusopera9/arabic-grammar

### Official licensing explanation

12. Creative Commons BY-SA deed: https://creativecommons.org/licenses/by-sa/4.0/
13. Creative Commons BY-NC deed: https://creativecommons.org/licenses/by-nc/4.0/
14. Creative Commons FAQ about combining works: https://creativecommons.org/faq/
15. Official ShareAlike-compatible licenses list: https://creativecommons.org/compatible-licenses/

### Curriculum references

16. Cahaya Tauhid curriculum design: https://github.com/cahayatauhid/belajar-bahasa-arab/blob/main/docs/desain-kurikulum.md
17. Cahaya Tauhid syllabus: https://github.com/cahayatauhid/belajar-bahasa-arab/blob/main/docs/silabus.md
18. Madinah Arabic grammar: https://madinaharabic.com/free-content/grammar
19. Al Jazeera Learning Arabic: https://learning.aljazeera.net/
20. Dar Al-Lughah curriculum: https://darallughah.com/curriculum

## H. Immediate next action for a coding/research agent

> Clone the six listed GitHub repositories to `research/external/`, record exact commit SHAs and current license/NOTICE conditions, inspect curriculum and lesson data without importing any copyrighted content to the app, then produce the five Markdown deliverables above. Treat this website as public and noncommercial; CC BY-NC resources may be considered but must remain traceable and should not be remixed into incompatible BY-SA derivatives. Prefer an independently authored Indonesian-first, listen-to-meaning-to-grammar Arabic curriculum. Stop before code generation and public content publishing; provide a decision memo that requires human approval and Arabic-teacher review.

---

_This is a preliminary source audit, not a legal opinion, a grant of third-party rights, or a verification of every file in each repository. Recheck licenses at the pinned revision and audit individual assets before publication._
