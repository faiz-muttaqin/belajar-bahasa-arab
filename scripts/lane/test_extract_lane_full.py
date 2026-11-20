"""Regression checks for preservation of Lane's root and entry structure."""
from collections import Counter
from io import StringIO
import json
import unittest

from extract_lane_full import extract_document, root_search_key

FIXTURE = """<TEI.2><text><body><div1>
<div2 type="alphabetical letter"><entryFree id="letter"><form><itype>alphabetical letter</itype></form></entryFree></div2>
<div2 type="root"><head><foreign lang="ar">كتب</foreign></head>
<entryFree id="n1" key="كَتَبَ"><form><itype>1</itype><orth>كَتَبَ</orth></form> First <hi>meaning</hi>.
<milestone unit="sense" n="2"/> Second &amp; further meaning.</entryFree>
<entryFree id="n2"><form><itype>1</itype><orth>كَتِبَ</orth></form> Another article.</entryFree>
<entryFree id="n3"><form><itype>2</itype><orth>كَتَّبَ</orth></form> Derived form.</entryFree>
<entryFree id="n4"><form><orth>كِتَابٌ</orth></form> Nominal.</entryFree>
</div2></div1></body></text></TEI.2>""".encode()


class ExtractionTests(unittest.TestCase):
    def test_all_entries_and_markup(self):
        roots, entries, counts = StringIO(), StringIO(), Counter()
        extract_document(FIXTURE, "fixture.xml", roots, entries, set(), counts)
        root = json.loads(roots.getvalue())
        rows = {r["id"]: r for r in map(json.loads, entries.getvalue().splitlines())}
        self.assertEqual(root["entry_ids"], ["n1", "n2", "n3", "n4"])
        self.assertEqual(counts["explicit_form_i_entries"], 2)
        self.assertEqual(counts["entries"], 5)
        self.assertEqual(counts["entries_outside_roots"], 1)
        self.assertEqual(counts["sense_milestones"], 1)
        self.assertEqual(rows["n1"]["root_locator"], root["locator"])
        self.assertIn("Second & further meaning.", rows["n1"]["text"])
        self.assertIn("<milestone", rows["n1"]["xml"])
        self.assertEqual(rows["n4"]["itypes"], [])
        self.assertIsNone(rows["letter"]["root"])
        self.assertEqual(root_search_key("كَـتَبَ"), "كتب")

    def test_cross_file_ids_are_retained_and_counted(self):
        roots, entries, counts, ids = StringIO(), StringIO(), Counter(), set()
        extract_document(FIXTURE, "a.xml", roots, entries, ids, counts)
        extract_document(FIXTURE, "b.xml", roots, entries, ids, counts)
        self.assertEqual(counts["entries"], 10)
        self.assertEqual(counts["repeated_source_ids"], 5)
        with self.assertRaisesRegex(ValueError, "Duplicate entry locator"):
            extract_document(FIXTURE, "a.xml", roots, entries, ids, counts)

    def test_refuse_dtd(self):
        with self.assertRaisesRegex(ValueError, "DTD"):
            extract_document(b'<!DOCTYPE test><test/>', "fixture.xml", StringIO(), StringIO(), set(), Counter())


if __name__ == "__main__":
    unittest.main()
