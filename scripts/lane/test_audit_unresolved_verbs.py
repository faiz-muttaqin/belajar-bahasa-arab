from unittest import TestCase

from audit_unresolved_verbs import audit, attach_reviews, loose_root


def record(locator, root="كتب", head="كَتَبَ", infl="Bu", itype="1"):
    return {
        "id": None, "locator": locator, "root": root, "key": head,
        "orths": [head], "itypes": [itype],
        "xml": f'<entryFree><form><itype>{itype}</itype><orth>{head}</orth></form>'
               f'aor. <form n="infl"><orth orig="{infl}">كَتُبَ</orth></form></entryFree>',
        "text": "aor. see another article",
    }


def row(lemma="كَتَبَ", root="كتب", bab=1, kind="tidak_diketahui"):
    return {"ar": lemma, "root": root, "bab": bab, "kind": kind, "code": "test"}


class AuditTests(TestCase):
    def test_exact_head_and_vowel_marker_is_not_a_gloss(self):
        result = audit([row()], [record("a")])[0]
        self.assertEqual(result["status"], "head_and_vowel_marker_lead")
        self.assertIsNone(result["gloss"])
        self.assertEqual(result["decision"], "unresolved")

    def test_different_bab_and_root_only(self):
        self.assertEqual(audit([row(bab=2)], [record("a")])[0]["status"],
                         "exact_form_i_head_lead")
        self.assertEqual(audit([row(lemma="كَتِبَ", bab=4)], [record("a")])[0]["status"],
                         "form_i_under_candidate_root_only")

    def test_idless_and_multiple_candidates_preserved(self):
        result = audit([row()], [record("a"), record("b")])[0]
        self.assertEqual([item["locator"] for item in result["candidates"]], ["a", "b"])

    def test_suspect_root_and_skip_known(self):
        result = audit([row(root="جذر"), row(kind="padanan")], [record("a")])
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]["status"], "suspect_root")
        self.assertEqual(result[0]["exact_head_records"], 1)

    def test_missing_and_suffix(self):
        self.assertEqual(audit([row(root="سلم", lemma="سَلَمَ")], [record("a")])[0]["status"],
                         "no_lane_candidate")
        self.assertEqual(audit([row()], [record("a", head="كَتَبَهُ")])[0]["status"],
                         "object_suffix_lead")

    def test_non_form_i_does_not_prove_verb(self):
        self.assertEqual(audit([row()], [record("a", itype="noun")])[0]["status"],
                         "head_without_explicit_form_i")

    def test_aliases_and_bare_head_are_only_leads(self):
        self.assertEqual(loose_root("جظظ"), loose_root("جظ"))
        self.assertEqual(loose_root("مطء"), loose_root("مطأ"))
        result = audit([row(root="خطأ")], [record("a", root="كتب", head="كَتِبَ")])[0]
        self.assertEqual(result["bare_head_records"], 1)
        self.assertEqual(result["decision"], "unresolved")

    def test_review_requires_exact_locator_and_id(self):
        rows = audit([row()], [record("a")])
        decision = {"lemma": "كَتَبَ", "root": "كتب", "bab": 1, "locator": "a",
                    "source_entry_id": None, "decision": "draft_supported", "gloss": "menulis"}
        self.assertEqual(attach_reviews(rows, [decision])[0]["gloss"], "menulis")
        with self.assertRaisesRegex(ValueError, "locator missing"):
            attach_reviews(rows, [{**decision, "locator": "missing"}])
