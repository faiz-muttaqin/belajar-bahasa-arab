from unittest import TestCase

from crosscheck_p3 import crosscheck


class CrosscheckTests(TestCase):
    def test_all_rows_and_no_automatic_approval(self):
        row = {"lemma": "كَتَبَ", "root": "كتب", "bab": 1, "decision": "unresolved",
               "status": "no_lane_candidate", "candidates": []}
        wiki = {"id": "test", "ar": "كَتَبَ", "bab": 1, "altBabs": [2],
                "babSource": "wiktionary-pattern", "page": "https://en.wiktionary.org/wiki/test",
                "en": ["write"], "nonPast": "يَكْتُبُ"}
        morph = {"id": "t1", "lemma": "كَتَبَ", "root": "كتب", "bab": 1, "transitivity": "م"}
        rows = crosscheck([row, {**row, "bab": 2}], [wiki], {}, {"qutrub": [morph]})
        self.assertEqual(len(rows), 2)
        self.assertEqual(rows[0]["action"], "review_wiktionary_exact_lemma_bab")
        self.assertEqual(rows[1]["action"], "review_wiktionary_alternate_bab")
        self.assertEqual(rows[0]["decision"], "unresolved")
        self.assertTrue(rows[0]["morphology"][0]["bab_match"])
        self.assertFalse(rows[1]["morphology"][0]["bab_match"])

    def test_wrong_vowel_is_not_exact(self):
        row = {"lemma": "كَتِبَ", "root": "كتب", "bab": 1, "decision": "unresolved",
               "status": "no_lane_candidate", "candidates": []}
        wiki = {"id": "test", "ar": "كَتَبَ", "bab": 1, "babSource": "wiktionary-pattern",
                "page": "https://en.wiktionary.org/wiki/test", "en": ["write"]}
        result = crosscheck([row], [wiki], {}, {})[0]
        self.assertFalse(result["wiktionary"][0]["primary_bab_match"])
        self.assertEqual(result["action"], "investigate_upstream_root_or_bab")
