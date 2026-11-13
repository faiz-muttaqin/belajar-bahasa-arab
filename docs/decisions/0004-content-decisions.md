# ADR-004: Content decisions D-1 to D-7

**Status:** accepted by the product owner, 14 November 2026
**Context:** [curriculum re-research](../research/2026-11-14-riset-ulang-kurikulum.md) §7 and [content tracker](../content/tracker.md). Licensing and regulatory points are background, not legal advice; confirm with an IP or legal adviser before launch.

## D-1 Content licence: CC BY-SA 4.0

Text we write (explanations, glosses, exercises, notes) is licensed **CC BY-SA 4.0**.

- Compatible sources may be imported with attribution: Wikibooks, Wiktionary and Wikisource (CC BY-SA 4.0), Tatoeba sentences (CC BY 2.0 FR, name the sentence author).
- Not importable into our text: CC BY-NC / NC-SA material (MSU _Elementary Arabic I_, Edinburgh _Roots & Routes_). They can still inform our own original writing.
- Third-party texts we display verbatim keep their own terms and are labelled as such, not relicensed: Tanzil Qur'an text (CC BY 3.0, verbatim), QuranEnc translation (its terms, see D-3), Quranic Arabic Corpus data (GNU GPL plus terms of use).
- The code licence is a separate decision and is not made here.

## D-2 Arabic script per surface

- **Qur'anic words and quotations:** Tanzil Uthmani text, verbatim, with credit and a link to tanzil.net; record `textVersion`. Aligns with Quranic Arabic Corpus word locations.
- **MSA lessons, everyday vocabulary, reference tables:** ordinary vocalised Naskh text (our own, reviewed), shown in Noto Naskh Arabic.
- Mushaf Standar Indonesia is not used unless LPMQ grants permission.

## D-3 Qur'an translation: QuranEnc `indonesian_affairs`

The product owner's intent: open, non-commercial, educational reuse. A non-commercial purpose does not by itself grant rights to a text marked "All Rights Reserved" (LPMQ), so we use the channel with **explicit** reuse permission:

- Source: QuranEnc API, translation key `indonesian_affairs` (Kemenag translation), stored with its version number per ayah.
- Conditions to honour: no modification, attribution to QuranEnc.com, show the version, update to new versions, notify QuranEnc of any notes we attach to the translation, no inappropriate ads.
- Our own per-word glosses are visibly separate from the translation and are our CC BY-SA text.
- Before first use: spot-check QuranEnc against quran.kemenag.go.id for al-Fatihah and the chosen short surahs, and record which edition it matches.
- Courtesy request to LPMQ: [draft letter](../content/permission-request-lpmq.md) (also asks whether tashih applies).
- Whole surahs stay off the site until the tashih question (PMA 44/2016) is answered.

## D-4 First units of the main path

1. **Opening unit: core shalat words** that are not disputed (e.g. Allāhu akbar, subḥāna, rabbī, al-ʿaẓīm, al-aʿlā, as-salāmu ʿalaikum), for a quick first success with words learners already hear daily. Word list from RS-04, reviewed by an ustadz.
2. Then a **Madinah-like order**, written entirely in our own words and examples: pointing words with question words (hādhā, mā, man) → definite al- → huruf jarr and pronouns → iḍāfah → feminine pointing words → adjective phrase → attached pronouns → the most frequent verbs (qāla, kāna and others from the frequency work).
3. The old Jalur B list (B0 to B12) is kept as the can-do backlog and will be re-numbered when unit 1 is designed. Order remains a hypothesis until a teacher reviews it and learners test it.

## D-5 Shalat reading variants

- Early units teach only the shared core words.
- Where practice differs (iftitah, tasyahud wording, "sayyidina" in the shalawat, "wa bihamdih" in the tasbih), variants are shown **side by side with neutral labels** (e.g. "umum di NU / Syafi'i", "HPT Muhammadiyah", plus the narration), never presenting one as the only correct form.
- Data fields for variants: `variantOf`, `riwayat`, `commonIn`, `isOptional`. Every variant text needs an ustadz review.

## D-6 Icon policy

- The Indonesian meaning is always shown.
- Icons only for **concrete** nouns; abstract words get a short context sentence; function words get no icon.
- After the association step, the next exercise hides the picture.
- Enforced in code: vocabulary items carry `concreteness`, and the validator rejects an icon on a non-concrete item.

## D-7 Reviewers

- Every publishable item needs at least one recorded human review: an Arabic teacher for language, and an ustadz for shalat and Qur'anic content.
- Review record per item: reviewer name, role, date, decision (`approved` / `changes_requested` / `rejected`), notes.
- Enforced in code: `approved` content without an approving review record is not publishable.
- Recruitment: [reviewer invitation pack](../content/reviewer-pack.md).

## Consequences

- Tracker items V-01 (still needs an MSA source, RS-01), V-03, V-04 and V-05 are unblocked or re-scoped as noted in the tracker.
- The vocabulary schema gains `concreteness` and `reviews`; the reference-table schema gains `reviews`.
