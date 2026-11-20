from unittest import TestCase
from search_classical_p3 import scan


class ClassicalSearchTests(TestCase):
    def test_locators_only_not_glosses(self):
        rows = [{"lemma": "كَتَبَ", "root": "كتب", "bab": 1}]
        text = "######OpenITI#\n#META#Header#End#\n### (كتب)\n# كَتَبَ الكتاب PageV01P002\n# مكتبة\n"
        result = scan(text, rows)[0]
        self.assertEqual(result["counts"]["vocalized_lemma"], 1)
        self.assertEqual(result["counts"]["parenthesized_root"], 1)
        self.assertEqual(result["locators"]["vocalized_lemma"], [{"line": 4, "near_page": "PageV01P002"}])
        self.assertNotIn("text", result)

    def test_wrong_vowels_are_spelling_only(self):
        rows = [{"lemma": "كَتَبَ", "root": "كتب", "bab": 1}]
        result = scan("#META#Header#End#\n# كُتِبَ\n", rows)[0]
        self.assertEqual(result["counts"]["spelling"], 1)
        self.assertEqual(result["counts"]["vocalized_lemma"], 0)

    def test_no_header_rejected(self):
        with self.assertRaisesRegex(ValueError, "header"):
            scan("كَتَبَ", [])
