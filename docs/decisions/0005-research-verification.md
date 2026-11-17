# ADR-005 — Research-verified content without mandatory teacher sign-off for ordinary MSA

**17 November 2026 · Owner direction accepted for ordinary, non-religious Arabic learning.**
Scope: ordinary MSA vocabulary and future sourced grammar lessons; this ADR narrows the human-approval requirement of ADR-004 D-7/D-9. It does not retroactively approve existing drafts.

## Decision

- `draft` remains available in the public learning build under ADR-004 D-8/D-9, with visible uncertainty.
- `research_verified` means **every substantive claim displayed as verified** was checked against a precise, relevant entry or grammar chapter, with a date, scope, outcome and conflict notes. Evidence must be claim-specific. A course homepage, keyword match, or a model-generated explanation is not sufficient.
- Research verification is **not** `human_approved`. An Arabic teacher can provide an optional extra review of ordinary MSA text; approval is never fabricated. If a source is ambiguous or sources conflict, leave the claim as draft and state why.
- Qur'an, shalat/adhkar, religious variants, recitation/audio pronunciation, reuse permissions and regulatory tashih remain under existing specialist gates (ADR-004). An open grammar book does not validate recitation.
- Separate validation of **lexical fields**, **grammar rules**, **example sentences** and **pedagogical effectiveness**. A dictionary entry confirming a noun or its plural does not validate a newly authored sentence.
- Our own Indonesian explanations and examples stay original CC BY-SA 4.0 text. Using a source as evidence does not give us permission to copy protected prose, activities, images or audio.

## Pilot implementation

Five existing MSA entries have partial research audits in `src/lib/content/msa-research.ts` with claim-level references and explicit source sections. No item is promoted to fully `research_verified` because not every displayed field, sense, register or original example has been checked.

The gate `validateResearchAudit` rejects non-specific URLs, missing evidence and unresolved conflicts; `isPublishableVocab` permits a non-religious MSA entry through the research path **only when the full coverage gate passes**. Validating metadata mechanically cannot prove the page actually supports each claim: research checking remains a distinct editorial task. The UI shows partial evidence without claiming that the whole entry is approved.

## Source usage / licensing

- Five checked lexemes: [Wiktionary Arabic entries](https://en.wiktionary.org/wiki/Wiktionary:Copyrights), CC BY-SA 4.0 / GFDL, used to cross-check lexical facts, not as copied prose; author/entry link, source section and date are stored on each claim.
- [LibreTexts Introduction to Arabic II · grammar](<https://human.libretexts.org/Bookshelves/Languages/Arabic/Introduction_to_Arabic_II_(Hanaa_Alkassas_Layla_Bahar_Al-Aloom_and_Samira_Murtada)/01:_Myself_and_My_Family/1.06:_Grammar_(1)>), licensed CC BY 4.0: suitable basis for independently authored lessons about the definite article, nisbah, and interrogatives.
- [Madinah Arabic grammar](https://madinaharabic.com/free-content/grammar) and [Al Jazeera Arabic](https://learning.aljazeera.net/en/pages/about-us) are reference-only because free access does not supply reuse permission. Never copy their examples or exercises.
- Avoid LibreTexts chapters that mirror MSU publications with a conflicting CC BY-NC licence until the original authors' grant is clarified.

## Extension sequence

1. Audit every field for the five pilot lemmas including original examples and register, noting independent corroboration and conflicting variants.
2. Extend to the remaining 152 MSA starters, prioritising the most used words and those used to compose sentences in the curriculum.
3. Add lesson-rule provenance and original examples for new pages, with tests covering exceptions and agreement rather than only a bibliography.
4. Cross-check sample texts against corpus attestation and test them on target learners. Human listening remains mandatory for any claim about pronunciation.

**Not a claim of full linguistic validation**: a green CI only checks recorded evidence structure and application behaviour.
