import unittest

from p7_qamus_markers import find_leads


class MarkerLeadsTest(unittest.TestCase):
    def test_matching_other_bab_and_conjunction_are_distinguished(self):
        source = (
            "كتب كضرب\n#META#Header#End#\n"
            "كَتَبَ، كَنَصَرَ: test\n"
            "وكتب كضرب: test\n"
            "كتب في وسط الكلام نصر\n"
        )
        rows = [{"lemma": "كَتَبَ", "root": "كتب", "bab": 1},
                {"lemma": "كَتَبَ", "root": "كتب", "bab": 2}]
        a, b = find_leads(source, rows)
        self.assertEqual(len(a["leads"]), 2)
        self.assertEqual(a["leads"][0]["line"], 3)
        self.assertTrue(a["leads"][0]["babMatches"])
        self.assertFalse(a["leads"][1]["babMatches"])
        self.assertTrue(b["leads"][1]["babMatches"])
        self.assertEqual(b["leads"][1]["headMatch"], "possible-conjunction")

    def test_missing_header_fails(self):
        with self.assertRaises(ValueError):
            find_leads("كتب كنصر", [])

    def test_no_source_text_in_result(self):
        rows = [{"lemma": "كَتَبَ", "root": "كتب", "bab": 1}]
        result = find_leads("#META#Header#End#\nكتب كنصر: secret\n", rows)
        self.assertNotIn("secret", str(result))


if __name__ == "__main__":
    unittest.main()
