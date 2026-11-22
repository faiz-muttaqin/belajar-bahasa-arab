import copy
import unittest

from p7_compile_decisions import compile_decisions


class P7DecisionCompilerTest(unittest.TestCase):
    def setUp(self):
        self.rights = {
            "status": "reviewed-for-private-staging",
            "rightsDisposition": "research-only-no-redistribution",
            "reviewedBy": "fixture-reviewer",
            "reviewedOn": "2026-11-22",
            "sourceTerms": "fixture-only open-license review; not publication approval",
            "attributionPlan": "source-specific attribution required before publishing",
            "rightsNotes": "postprocessing and redistribution still on hold"
        }
        self.task = {
            "lemmaId": "a" * 64, "senseId": "b" * 64,
            "sourceRegister": "unspecified",
            "sourceUrl": "https://en.wiktionary.org/wiki/%D9%83%D8%AA%D8%A7%D8%A8#Arabic",
            "sourceLocations": [{"line": 4, "senseIndex": 1}],
            "reviewStatus": "ready",
            "decisionDraft": {
                "entryId": "kitab", "localSenseId": "book",
                "glossId": "buku", "register": "unspecified",
                "checkedOn": "2026-11-22",
                "locator": "Arabic > Noun > sense 1 (synthetic test)"
            },
            "audit": {
                "sourceSenseChecked": True,
                "originalIndonesianGlossChecked": True,
                "registerEvidenceChecked": True,
                "reviewedBy": "fixture-reviewer",
                "notes": "synthetic fixture only"
            }
        }
        self.packet = {
            "schema": 1, "privateResearchOnly": True,
            "publicationApproved": False, "licenseReviewApproved": False,
            "source": {
                "id": "wiktionary", "snapshot": "2026-10-01",
                "sha256": "c" * 64
            },
            "tasks": [self.task]
        }

    def test_ready_requires_explicit_human_audit_and_preserves_ids(self):
        result = compile_decisions(self.packet, self.rights)
        self.assertEqual(result["decisions"], [{
            "lemmaId": "a" * 64, "senseId": "b" * 64,
            **self.task["decisionDraft"]
        }])
        self.assertEqual(result["reviewSummary"], {"pending": 0, "hold": 0, "ready": 1})
        self.assertIs(result["publicationApproved"], False)
        self.assertEqual(result["licenseReview"]["rightsDisposition"],
                         "research-only-no-redistribution")

    def test_pending_or_hold_with_text_is_never_implicitly_promoted(self):
        packet = copy.deepcopy(self.packet)
        held = copy.deepcopy(self.task)
        held["senseId"] = "d" * 64
        held["reviewStatus"] = "hold"
        pending = copy.deepcopy(self.task)
        pending["senseId"] = "e" * 64
        pending["reviewStatus"] = "pending"
        packet["tasks"].extend([held, pending])
        result = compile_decisions(packet, self.rights)
        self.assertEqual(result["reviewSummary"], {"pending": 1, "hold": 1, "ready": 1})
        self.assertEqual(len(result["decisions"]), 1)

    def test_no_ready_tasks_cannot_generate_an_import_file(self):
        packet = copy.deepcopy(self.packet)
        packet["tasks"][0]["reviewStatus"] = "hold"
        with self.assertRaisesRegex(ValueError, "No explicitly reviewed"):
            compile_decisions(packet, self.rights)

    def test_unreviewed_register_promotion_is_refused(self):
        packet = copy.deepcopy(self.packet)
        packet["tasks"][0]["decisionDraft"]["register"] = "msa"
        with self.assertRaisesRegex(ValueError, "register"):
            compile_decisions(packet, self.rights)

    def test_false_signoffs_are_refused(self):
        for field in ("sourceSenseChecked", "originalIndonesianGlossChecked",
                      "registerEvidenceChecked"):
            with self.subTest(field=field):
                packet = copy.deepcopy(self.packet)
                packet["tasks"][0]["audit"][field] = False
                with self.assertRaisesRegex(ValueError, "human review"):
                    compile_decisions(packet, self.rights)

    def test_incomplete_gloss_or_source_locator_is_refused(self):
        for field in ("glossId", "entryId", "localSenseId", "locator"):
            with self.subTest(field=field):
                packet = copy.deepcopy(self.packet)
                packet["tasks"][0]["decisionDraft"][field] = "pending"
                with self.assertRaisesRegex(ValueError, "incomplete"):
                    compile_decisions(packet, self.rights)

    def test_bad_rights_metadata_and_publication_flag_are_refused(self):
        for key, value in (("rightsDisposition", "approved"),
                           ("status", "pending"), ("sourceTerms", ""),
                           ("reviewedOn", "2026-02-30")):
            with self.subTest(key=key):
                rights = {**self.rights, key: value}
                with self.assertRaisesRegex(ValueError, "rights review"):
                    compile_decisions(self.packet, rights)
        packet = {**self.packet, "publicationApproved": True}
        with self.assertRaisesRegex(ValueError, "private"):
            compile_decisions(packet, self.rights)

    def test_pinned_identity_and_duplicate_upstream_are_refused(self):
        packet = copy.deepcopy(self.packet)
        packet["source"]["sha256"] = "invalid"
        with self.assertRaisesRegex(ValueError, "source identity"):
            compile_decisions(packet, self.rights)
        packet = copy.deepcopy(self.packet)
        packet["tasks"].append(copy.deepcopy(self.task))
        with self.assertRaisesRegex(ValueError, "upstream sense"):
            compile_decisions(packet, self.rights)


if __name__ == "__main__":
    unittest.main()
