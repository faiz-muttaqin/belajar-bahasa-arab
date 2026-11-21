import unittest

from p7_review_batch import review_batch


class P7ReviewBatchTest(unittest.TestCase):
    def setUp(self):
        self.source = {
            "id": "wiktionary", "snapshot": "2026-10-01",
            "sha256": "a" * 64, "license": "CC BY-SA 4.0 and GFDL"
        }
        self.valid = {
            "bucket": "candidate", "lemmaId": "b" * 64,
            "senseId": "c" * 64, "pos": "noun",
            "ar": "كِتَاب", "page": "كتاب",
            "canonical": ["كِتَاب"], "register": "unspecified",
            "glosses": ["book"], "tags": [],
            "provenance": [{"line": 1, "senseIndex": 1}]
        }

    def snapshot(self, rows):
        return {"schema": 1, "source": self.source, "entries": rows}

    def queue(self, items):
        return {
            "schema": 1, "source": self.source, "entries": items,
            "totals": {
                "pending": len(items),
                "withCandidate": sum(bool(x["candidates"]) for x in items)
            }
        }

    def test_review_queue_preserves_ids_and_never_approves_glosses(self):
        good = {
            "id": "msa-book", "arabic": "كِتَاب",
            "wordClass": "noun", "candidates": [{
                "lemmaId": self.valid["lemmaId"], "senseId": self.valid["senseId"]
            }]
        }
        gap = {
            "id": "msa-gap", "arabic": "مُفْرَد",
            "wordClass": "adjective", "candidates": []
        }
        invalid = {**self.valid, "lemmaId": "d" * 64,
                   "senseId": "e" * 64, "canonical": []}
        result = review_batch(self.snapshot([invalid, self.valid]),
                              self.queue([gap, good]), limit=20)
        self.assertEqual(result["selection"]["eligibleSenseKeys"], 1)
        self.assertEqual(result["selection"]["selectedSenseKeys"], 1)
        self.assertEqual(len(result["msaWithoutP4Lead"]), 1)
        self.assertEqual(result["msaWithoutP4Lead"][0]["msaId"], "msa-gap")
        task = result["tasks"][0]
        self.assertEqual(task["senseId"], self.valid["senseId"])
        self.assertEqual(task["relatedMsaIds"], ["msa-book"])
        self.assertEqual(task["sourceGlosses"], ["book"])
        self.assertIsNone(task["decisionDraft"]["glossId"])
        self.assertFalse(result["publicationApproved"])
        self.assertFalse(result["licenseReviewApproved"])

    def test_duplicate_upstream_identity_is_held(self):
        pack = review_batch(self.snapshot([self.valid, self.valid]),
                            self.queue([]))
        self.assertEqual(pack["selection"]["eligibleSenseKeys"], 0)
        self.assertEqual(pack["tasks"], [])

    def test_pinned_snapshot_and_queue_are_required(self):
        queue = self.queue([])
        queue["source"] = {**self.source, "sha256": "f" * 64}
        with self.assertRaisesRegex(ValueError, "checksum"):
            review_batch(self.snapshot([self.valid]), queue)

    def test_stale_p6_reference_fails_closed(self):
        queue = self.queue([{
            "id": "msa-stale", "candidates": [{
                "lemmaId": "f" * 64, "senseId": "e" * 64
            }]
        }])
        with self.assertRaisesRegex(ValueError, "not found"):
            review_batch(self.snapshot([self.valid]), queue)

    def test_paging_is_deterministic(self):
        other = {**self.valid, "lemmaId": "e" * 64,
                 "senseId": "f" * 64, "ar": "مَكْتَب",
                 "canonical": ["مَكْتَب"]}
        a = review_batch(self.snapshot([self.valid, other]), self.queue([]),
                         limit=1, offset=1)
        b = review_batch(self.snapshot([other, self.valid]), self.queue([]),
                         limit=1, offset=1)
        self.assertEqual(a, b)
        self.assertEqual(a["selection"]["remainingSenseKeys"], 0)


if __name__ == "__main__":
    unittest.main()
