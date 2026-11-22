import unittest

from p7_preflight import analyze, diagnose_msa_gaps


class P7PreflightTest(unittest.TestCase):
    def setUp(self):
        self.source = {
            "id": "wiktionary", "snapshot": "2026-10-01",
            "license": "CC BY-SA 4.0 and GFDL",
            "sha256": "a" * 64,
        }
        self.base = {
            "bucket": "candidate", "lemmaId": "l1", "senseId": "s1",
            "pos": "noun", "ar": "كِتَاب", "canonical": ["كِتَاب"],
            "glosses": ["synthetic"], "register": "unspecified",
            "provenance": [{"line": 1, "senseIndex": 1}],
        }

    def snapshot(self, entries):
        return {"schema": 1, "source": self.source, "entries": entries}

    def queue(self, entries):
        items = [{"id": item.get("id", f"fixture-{i}"), **item}
                 for i, item in enumerate(entries)]
        return {"schema": 1, "source": self.source, "entries": items,
                "totals": {"pending": len(items),
                           "withCandidate": sum(bool(e["candidates"]) for e in items)}}

    def test_structural_gates_do_not_create_approved_words(self):
        entries = [
            self.base,
            {**self.base, "lemmaId": "l2", "senseId": "s2", "canonical": []},
            {**self.base, "lemmaId": "l3", "senseId": "s3",
             "canonical": ["كِتَاب", "كَتْب"]},
            {**self.base, "lemmaId": "l4", "senseId": "s4", "pos": "name"},
            {**self.base, "lemmaId": "l5", "senseId": "s5", "bucket": "dialect"},
        ]
        queue = self.queue([
            {"wordClass": "noun", "candidates": [{"senseId": "s1"}]},
            {"wordClass": "adjective", "candidates": []},
        ])
        result = analyze(self.snapshot(entries), queue)
        p4 = result["p4"]
        self.assertEqual(p4["candidateRows"], 4)
        self.assertEqual(p4["structurallyReviewableRows"], 1)
        self.assertEqual(p4["blockedByFirstReason"]["missing_canonical"], 1)
        self.assertEqual(p4["blockedByFirstReason"]["ambiguous_or_mismatched_canonical"], 1)
        self.assertEqual(p4["blockedByFirstReason"]["unsupported_pos"], 1)
        self.assertEqual(result["p6"]["withoutCandidate"], 1)
        self.assertEqual(result["p6"]["withoutCandidateIds"], ["fixture-1"])
        self.assertEqual(result["approvedGlosses"], 0)
        self.assertEqual(result["automaticallyImportedEntries"], 0)
        self.assertNotIn("synthetic", str(result))
        self.assertNotIn("كِتَاب", str(result))

    def test_gap_diagnostics_are_metadata_only_and_not_semantic_claims(self):
        historical = {
            **self.base, "ar": "قَلَم", "canonical": ["قَلَم"],
            "lemmaId": "d" * 64, "senseId": "e" * 64,
            "register": "classical-or-historical"
        }
        ignored = {
            **self.base, "ar": "مَاء", "canonical": ["مَاء"],
            "lemmaId": "f" * 64, "senseId": "1" * 64,
            "bucket": "dialect"
        }
        queue = [
            {"id": "msa-pos", "wordClass": "expression",
             "arabic": "كِتَاب", "candidates": []},
            {"id": "msa-none", "wordClass": "noun",
             "arabic": "غِيَاب", "candidates": []},
            {"id": "msa-historical", "wordClass": "noun",
             "arabic": "قَلَم", "candidates": []},
            {"id": "msa-noncandidate", "wordClass": "noun",
             "arabic": "مَاء", "candidates": []}
        ]
        rows = [self.base, historical, ignored]
        report = diagnose_msa_gaps(rows, queue)
        reasons = {item["msaId"]: item["reason"] for item in report}
        self.assertEqual(reasons, {
            "msa-historical": "excluded-classical-register",
            "msa-noncandidate": "only-noncandidate-buckets",
            "msa-none": "no-exact-full-form",
            "msa-pos": "different-pos"
        })
        self.assertEqual(report[-1]["sourceCandidatePos"], ["noun"])
        self.assertNotIn("synthetic", str(report))
        self.assertNotIn("كِتَاب", str(report))

    def test_missing_ids_are_deterministic_and_duplicate_ids_rejected(self):
        entries = [
            {"id": "msa-z", "wordClass": "expression", "candidates": []},
            {"id": "msa-a", "wordClass": "noun", "candidates": []}
        ]
        first = analyze(self.snapshot([self.base]), self.queue(entries))["p6"]
        second = analyze(self.snapshot([self.base]), self.queue(list(reversed(entries))))["p6"]
        self.assertEqual(first["withoutCandidateIds"], ["msa-a", "msa-z"])
        self.assertEqual(first["withoutCandidateIds"], second["withoutCandidateIds"])
        with self.assertRaisesRegex(ValueError, "unique MSA IDs"):
            analyze(self.snapshot([self.base]), self.queue([
                {"id": "dup", "candidates": []},
                {"id": "dup", "candidates": []}
            ]))

    def test_repeated_upstream_sense_is_blocked(self):
        entries = [self.base, {**self.base, "ar": "كِتَاب", "canonical": ["كِتَاب"]}]
        p4 = analyze(self.snapshot(entries), self.queue([]))["p4"]
        self.assertEqual(p4["blockedByFirstReason"]["ambiguous_upstream_identity"], 2)
        self.assertEqual(p4["structurallyReviewableRows"], 0)

    def test_snapshot_mismatch_fails(self):
        queue = self.queue([])
        queue["source"] = {**self.source, "sha256": "b" * 64}
        with self.assertRaisesRegex(ValueError, "checksum"):
            analyze(self.snapshot([self.base]), queue)


if __name__ == "__main__":
    unittest.main()
