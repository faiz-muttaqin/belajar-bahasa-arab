# Licence decisions for curriculum sources

> **This is background analysis, not legal advice.** It records how we read each source's licence against our own accepted content licence so the team can act consistently. Before any third-party material ships, confirm the reading with an IP or legal adviser, and ask the rights holder where something is unclear.
> **Audit time:** 2026-11-13T17:24Z, at the pinned SHAs in [SOURCE_INVENTORY.md](./SOURCE_INVENTORY.md). Re-check LICENSE and NOTICE at a new SHA before relying on anything here.
> **Imported materials: 0.** The verdicts say what _could_ be done later under conditions. Today every source is used for ideas only.

## Our side of the comparison

- **Our text** (explanations, glosses, exercises, notes) is **CC BY-SA 4.0** ([ADR-004 D-1](../decisions/0004-content-decisions.md)). An adaptation of someone else's text that we publish inside our text must be licensable under BY-SA 4.0 or a [compatible licence](https://creativecommons.org/compatible-licenses/).
- **Third-party texts shown verbatim** keep their own terms and are labelled separately: Tanzil Uthmani (CC BY 3.0, no changes, D-2), QuranEnc `indonesian_affairs` (no modification, attribution, version, D-3).
- **Our code licence is not decided** (brief, executive decision item 6; ADR-004 D-1). It is expected to be an OSI licence, so anything copied into code must be compatible with that, which rules out NC terms.
- **Every publishable item needs a human review record** (D-7), whatever its source.

## Verdicts

| Source                                                               | Verdict                       | Use allowed now                                                                   | Could later allow                                                                      |
| -------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Cahaya Tauhid                                                        | **conditional**               | Ideas, sequence facts as a comparison column                                      | Adapting Markdown lesson text under BY-SA, with the conditions below                   |
| OpenLanguageKit                                                      | **research-only**             | Ideas and structure, re-expressed in our own schema and words                     | Nothing imported; a separately licensed NC module is possible in theory but not useful |
| Learn Tajweed                                                        | **conditional**               | Ideas                                                                             | Adapting or reimplementing its 0BSD code and docs; NOTICE items excluded               |
| Lingo Lessons                                                        | **research-only**             | Generic design ideas                                                              | Code only after maintainers confirm the licence in writing                             |
| Arabic Vocab Trainer                                                 | **research-only**             | Unprotected mechanism ideas                                                       | Nothing; data is blocked                                                               |
| Unified Arabic Grammar                                               | **research-only**             | Structural and UX ideas; general grammar facts only from other, permitted sources | Nothing                                                                                |
| Madinah Arabic, Al Jazeera Learning Arabic, Dar Al-Lughah (websites) | **research-only** (view only) | Observing order and UX                                                            | Nothing without permission                                                             |

No source is **blocked** as a whole, because studying ideas and facts is always possible. Specific materials inside sources are blocked; they are listed under each source and in [SOURCE_INVENTORY.md](./SOURCE_INVENTORY.md#material-excluded-from-consideration).

## 1. Cahaya Tauhid: conditional

**Evidence:** root [`LICENSE`](https://github.com/cahayatauhid/belajar-bahasa-arab/blob/d27cb0c549c782ca4f5a0c010bf9ea0a70f716d9/LICENSE) is CC BY-SA 4.0 held by "Cahaya Tauhid"; [`assets/logo/README.md`](https://github.com/cahayatauhid/belajar-bahasa-arab/blob/d27cb0c549c782ca4f5a0c010bf9ea0a70f716d9/assets/logo/README.md) excludes the logo from that licence.

**What it means for us:** CC BY-SA 4.0 is the same licence as our text, so adapting the Markdown lesson text, workbook prompts or slide HTML is possible. The adapted passage then carries ShareAlike, which D-1 already gives it.

**Conditions for any future adaptation**

1. Credit Cahaya Tauhid, link the upstream file at the pinned SHA, link the CC BY-SA 4.0 licence, and state what we changed (template below).
2. Release the adapted item under CC BY-SA 4.0 and add no extra restrictions (no technical measures, no NC term).
3. No logo, no logo-bearing PDFs, no brand palette, and nothing that implies Cahaya Tauhid endorses our site.
4. Take nothing from its Qur'anic text, Qur'an translations, shalat or dhikr wordings or hadith text. The Qur'anic text names a print edition (Mushaf Madinah, King Fahd Complex, Hafs), but its digital text source and version are not stated and few lines actually use Uthmani characters; the translations, shalat, dhikr and hadith wordings have no credited source. ADR-004 sends us to Tanzil (D-2), QuranEnc (D-3) and labelled variants (D-5).
5. Keep the adapted item separate from verbatim Tanzil and QuranEnc items (separate fields or blocks with their own notices), so no single passage blends licences.
6. Arabic teacher review per D-7 before publication. The upstream text is partly AI-assisted, has no review record, and the audit found internal errors (counts in `textbook/pelajaran-05` and `-34`, the pattern drill in `workbook/pelajaran-30`, a wrong cross-reference in `textbook/pelajaran-04`).
7. Record the pinned SHA. The upstream `CLAUDE.md` calls the repo private, so it may disappear or change; our attribution must still point to what we used.

**Background note:** how copyright, and so the CC licence, attaches to AI-assisted text can differ by jurisdiction. It does not reduce our duties (we still attribute and share alike); it raises review risk.

**Current use:** inspiration-only. The most likely first adaptation candidate is the `isim` explanation structure in `textbook/pelajaran-05/index.md` (ledger row `ct/isim-explanation`), with all examples replaced by reviewed ones.

## 2. OpenLanguageKit: research-only

**Evidence:** [`LICENSE`](https://github.com/ywEdAi/OpenLanguageKit/blob/036c313f788a7a7880df80d1c299617fecc588a7/LICENSE) is CC BY-NC 4.0; the README applies it to data, docs and code; [`COMMERCIAL.md`](https://github.com/ywEdAi/OpenLanguageKit/blob/036c313f788a7a7880df80d1c299617fecc588a7/COMMERCIAL.md) sets out the author's paid commercial policy.

**What it means for us:**

- BY-NC material cannot be adapted into our BY-SA text. BY-SA would let others use our text commercially, which NC forbids, and BY-NC is not on the BY-SA compatible list. Our project being non-commercial does not change this, because the licence of the adaptation is the problem.
- Copying OLK code into our app would carry NC terms into a code base meant for an OSI licence.
- The brief allows a _collection_ in theory: an OLK item kept whole, under its own BY-NC notice, as a separate module. OLK has no Arabic content, so there is nothing worth embedding, and an NC module would constrain forks and future uses.

**Conditions:** ideas, structure and design only, written in our own schema, code and words. Cite OLK in research notes. Thresholds from its contracts (for example its percentage cut-offs) are its assertions, not evidence; if we use similar numbers they are our own assumptions.

## 3. Learn Tajweed: conditional

**Evidence:** [`LICENSE`](https://github.com/edriso/learn-tajweed/blob/426b71f660f45e97661f436646b4a3b17549c7ae/LICENSE) is 0BSD with an explicit scope covering code, scripts, docs and lesson text; [`NOTICE`](https://github.com/edriso/learn-tajweed/blob/426b71f660f45e97661f436646b4a3b17549c7ae/NOTICE) lists four items outside that scope.

**What it means for us:** 0BSD is permissive and needs no attribution, so the author's own code and docs can be adapted into our code (any licence) and their prose into our CC BY-SA text. 0BSD is a software licence applied here to prose by a scope statement; that combination is unusual, so confirm it with an adviser before adapting lesson prose.

**Conditions**

1. **NOTICE items are excluded and taken from their own sources:**
   - Tanzil text: download from tanzil.net ourselves (D-2), keep the full Tanzil copyright notice in generated files and on the credits page, record `textVersion` and our own checksum. Do not take `data/quran-uthmani.txt` from this repo.
   - Surah names (quran.com API, no terms stated; Quran Foundation terms bar bundling at build): do not use; source names elsewhere with a checked licence.
   - everyayah audio and the 26 YouTube embeds: do not use or hotlink (licence unknown, and hotlinking sends learners' IP addresses to third parties). Audio stays with RS-05 and A-01.
   - Fonts (OFL 1.1): if needed, take them from upstream with the OFL text.
2. Record every reused piece in the ledger with `source_license: 0BSD`, even though attribution is not required.
3. Any tajweed or Qur'an-related wording we adapt needs ustadz review (D-7), must name the riwayah and must keep disputed points marked, as the author requests.
4. Decide with an adviser whether stripping the basmala prefix or dropping pause marks in short quotes, as this pipeline does, fits Tanzil's no-change term and our D-2 verbatim rule. Write the rule into our pipeline docs before copying the approach.

**Current use:** inspiration-only. The strongest candidates are the Qur'an-by-reference build pipeline, checksum pin, accessible highlighting and audio button pattern (ledger rows `lt/*`).

## 4. Lingo Lessons: research-only

**Evidence:** [`LICENSE`](https://github.com/Open-Apps-Studio/lingo-lessons/blob/dcdd61268126c780499ef5e74a5874d2f9bb99b8/LICENSE) is MIT text naming only 650 Industries (Expo) as holder. The app's own developers give no notice of their own, and nothing licenses the lesson packs, TTS audio, sound effects or images.

**What it means for us:** it is unclear whether the MIT notice was meant to cover the developers' own code; it looks inherited from the Expo template (inference). Without a clear grant from the actual authors, record every Lingo Lessons item as `source_license: UNKNOWN (root LICENSE is Expo MIT boilerplate; authors' grant unconfirmed)`, covering code, content and assets. We build on SvelteKit and need none of it.

**Conditions:** generic ideas only (exercise union type, retry queue, text-hashed audio manifest, seeded shuffle), rewritten from a description. Avoid its Duolingo-style look. If verbatim code is ever wanted, first ask the maintainers to confirm in writing that MIT covers their code, and keep the Expo notice.

## 5. Arabic Vocab Trainer: research-only

**Evidence:** no licence file; [`README.md`](https://github.com/arifgov/Arabic-Vocab/blob/9b91347ea96fb457dcd7473d908a0a7c500290ce/README.md) limits use to personal and educational use; `package.json` says MIT with no text or holder. All vocabulary data comes from copyrighted, copy-restricted "Arabic Vocabulary Bank" PDFs for the Madinah books.

**What it means for us:** a use statement is not a licence to copy, modify and redistribute, and an npm field alone is not a grant. The word lists carry two rights layers (compilers and textbook), neither licensed. Facts and ideas only: the mastery mechanics (separate recognition and recall, review-mistakes queue, open navigation) are unprotected ideas we can reimplement in our own code.

**Conditions:** import nothing, including word lists, glosses, per-lesson selection and order, or ID sets. Even with our own Arabic and Indonesian, mirroring the Vocabulary Bank's per-lesson selection could reproduce a compiler's selection; our lists come from RS-04 and our own frequency work (RS-03). Describe the code's actual behaviour, not the README's, if we cite it.

## 6. Unified Arabic Grammar: research-only

**Evidence:** no licence file anywhere; [`README.md`](https://github.com/zeusopera9/arabic-grammar/blob/2bfab7f01b20eacb3dcc3b70f13ed990776ff257/README.md) says the content reorganises three unidentified textbooks.

**What it means for us:** two layers, neither granting anything. The repo author's code, design and English prose have no licence, so all rights are reserved by default. The Arabic content, rules wording, examples, vocabulary and glossary are transcriptions of third-party textbooks. Public visibility is not permission.

**Conditions:** facts and ideas only. Structural and UX ideas (concept graph with backlinks, provenance badges, colour plus text label, callout types, contrast pages) can inspire our own work. A grammar fact we need must be verified against permitted sources and a teacher and cited to those sources, not to this repo, so we do not carry over its textbook framing, terminology or example selection.

## 7. Public websites: research-only (view only)

Madinah Arabic, Al Jazeera Learning Arabic and Dar Al-Lughah state no content licence. We may observe order, levels and UX and describe them in our own words. Copy no text, examples, exercises, audio, video or images.

## Attribution template

Adapted from section E of the brief for our case: Indonesian user-facing text, CC BY-SA 4.0 output (D-1). Shown in the lesson's credits panel and generated into `CONTENT_LICENSES.md` from the item's provenance metadata, not hand-typed per page.

**For an item adapted from a CC BY-SA 4.0 source (for example Cahaya Tauhid):**

```text
Bagian ini mengadaptasi materi dari [PENULIS/PENERBIT], "[JUDUL SUMBER]",
[URL FILE SUMBER PADA SHA TERKUNCI], berlisensi CC BY-SA 4.0
(https://creativecommons.org/licenses/by-sa/4.0/).
Perubahan: [mis. diterjemahkan ke struktur baru, ditulis ulang, contoh diganti
dengan contoh yang sudah ditinjau, latihan baru ditambahkan].
Hasil adaptasi ini dirilis dengan lisensi CC BY-SA 4.0.
[PENULIS/PENERBIT] tidak terlibat dalam dan tidak mendukung situs ini.
```

English equivalent for `CONTENT_LICENSES.md`:

```text
This item adapts material by [AUTHOR/PUBLISHER], "[SOURCE TITLE]",
[SOURCE FILE URL AT PINNED SHA], licensed under CC BY-SA 4.0
(https://creativecommons.org/licenses/by-sa/4.0/).
Changes: [e.g. restructured, rewritten, examples replaced with reviewed ones,
new exercises added]. This adaptation is licensed under CC BY-SA 4.0.
[AUTHOR/PUBLISHER] is not involved in and does not endorse this site.
```

**For 0BSD code or docs (for example Learn Tajweed):** no notice is required. Add a voluntary credit in `CONTENT_LICENSES.md` naming the project, author and pinned URL, and record the ledger row.

**For verbatim third-party text:** use the source's own required notice (Tanzil notice and link; QuranEnc attribution and version), kept in a separate labelled block, never merged into our adapted text.

**Never** add attribution that implies a CC BY-NC source gave commercial permission, and never label third-party content as MIT or as our own CC BY-SA text.

## Release gate rule

Proposed for the build-time validator (tracker F-06), extending `validateReferenceTable`, `isPublishableVocab` and the D-7 review check. Until it exists, reviewers apply it by hand on every PR.

The build or PR **fails** if any item that would ship:

1. has a third-party `source_url` and `publication_status` other than `approved`;
2. has `source_license: UNKNOWN` (or no licence, or a use-only statement) and contains third-party expression of any kind;
3. has a CC BY-NC or BY-NC-SA source and `usage_type: adaptation`, or sits inside a CC BY-SA adapted passage;
4. has `usage_type` of `adaptation`, `verbatim` or `collection` without `attribution_text`, a licence link and `compatibility_checked: true` with a reason;
5. has `linguistic_review` other than `approved`, or lacks an approving D-7 review record (reviewer name, role, date, decision);
6. contains Qur'anic text that does not match our pinned Tanzil corpus, or a Qur'an translation not from QuranEnc with its version (D-2, D-3);
7. includes any excluded asset (publisher logos, logo-bearing PDFs, fonts without licence text, hotlinked third-party audio or video).

Original content may use `source_license: PROJECT_ORIGINAL` and list research references separately. [ADR-004 D-8](../decisions/0004-content-decisions.md#d-8-materi-teks-di-build-publik) permits original text lessons and sourced reference text written by the project to appear before human review. Item 5 still applies to approved content, audio and third-party materials.

The ledger count of imported materials stays at **zero** until an item passes all seven checks and a human reviewer signs it off.

## Open questions for an adviser

- Whether 0BSD prose can be combined into CC BY-SA 4.0 text without further steps (Learn Tajweed).
- Whether stripping the Tanzil basmala prefix or omitting pause marks in short quotes is consistent with Tanzil's no-change term.
- Whether AI-assisted upstream text (Cahaya Tauhid) changes anything about relying on its CC licence.
- Whether the Lingo Lessons MIT notice can be relied on for the developers' own code (only relevant if we ever want it).
