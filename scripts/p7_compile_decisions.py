#!/usr/bin/env python3
"""Compile explicitly reviewed P7.5 tasks into PRIVATE P4 staging decisions.

This never approves publication or automatically translates source glosses.
The editable review packet and output must stay outside the repository.
"""
import argparse
from datetime import date
import json
import os
from pathlib import Path
import re


def _nonempty(value):
    return isinstance(value, str) and bool(value.strip()) and value.strip().lower() not in {
        "todo", "tbd", "pending", "unknown", "n/a", "placeholder"
    }


def _date(value):
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return False
    try:
        return date.fromisoformat(value).isoformat() == value
    except ValueError:
        return False


def _license_review(metadata):
    if not isinstance(metadata, dict):
        raise ValueError("Missing structured license-review metadata")
    if (metadata.get("status") != "reviewed-for-private-staging"
            or metadata.get("rightsDisposition") != "research-only-no-redistribution"
            or not _date(metadata.get("reviewedOn"))
            or not all(_nonempty(metadata.get(key)) for key in (
                "reviewedBy", "sourceTerms", "attributionPlan", "rightsNotes"
            ))):
        raise ValueError("Private-stage rights review requires explicit reviewer, terms, attribution and non-redistribution hold")
    return metadata


def compile_decisions(packet, metadata):
    if (not isinstance(packet, dict) or packet.get("schema") != 1
            or packet.get("privateResearchOnly") is not True
            or packet.get("publicationApproved") is not False
            or packet.get("licenseReviewApproved") is not False):
        raise ValueError("Expected an unapproved P7 private review packet")
    source = packet.get("source") or {}
    if (source.get("id") != "wiktionary"
            or not _date(source.get("snapshot"))
            or not re.fullmatch(r"[a-f0-9]{64}", source.get("sha256", ""))):
        raise ValueError("Invalid pinned P4 source identity")
    rights = _license_review(metadata)
    if not isinstance(packet.get("tasks"), list):
        raise ValueError("Missing private review tasks")

    counts = {"pending": 0, "hold": 0, "ready": 0}
    seen_upstream = set()
    seen_local_sense = set()
    decisions = []
    registers = {
        "unspecified": {"unspecified"},
        "msa": {"msa", "unspecified"},
        "classical-or-historical": {"classical", "historical", "unspecified"}
    }
    for task in packet["tasks"]:
        if not isinstance(task, dict):
            raise ValueError("Malformed review task")
        key = (task.get("lemmaId"), task.get("senseId"))
        if (not all(isinstance(value, str) and re.fullmatch(r"[a-f0-9]{64}", value) for value in key)
                or key in seen_upstream):
            raise ValueError("Repeated or invalid upstream sense identity")
        seen_upstream.add(key)
        status = task.get("reviewStatus")
        if status not in counts:
            raise ValueError("Unsupported review status: " + str(status))
        # Pending and held tasks are not converted, even if their draft fields
        # accidentally contain text. The reviewer must explicitly mark ready.
        if status != "ready":
            counts[status] += 1
            continue
        draft = task.get("decisionDraft")
        audit = task.get("audit")
        if not isinstance(draft, dict) or not isinstance(audit, dict):
            raise ValueError("Ready task lacks a decision and audit")
        fields = ("entryId", "localSenseId", "glossId", "register", "checkedOn", "locator")
        if (not all(_nonempty(draft.get(field)) for field in fields)
                or not _date(draft["checkedOn"])):
            raise ValueError("Ready task has incomplete explicit ID, Indonesian gloss, register or locator")
        if draft["register"] not in registers.get(task.get("sourceRegister"), set()):
            raise ValueError("Unsupported promotion of source register")
        if (audit.get("sourceSenseChecked") is not True
                or audit.get("originalIndonesianGlossChecked") is not True
                or audit.get("registerEvidenceChecked") is not True
                or not _nonempty(audit.get("reviewedBy"))
                or not _nonempty(audit.get("notes"))
                or not isinstance(task.get("sourceLocations"), list)
                or not task["sourceLocations"]
                or not isinstance(task.get("sourceUrl"), str)
                or not task["sourceUrl"].startswith("https://en.wiktionary.org/wiki/")
                or not task["sourceUrl"].endswith("#Arabic")):
            raise ValueError("Ready task lacks documented human review of source, sense, gloss and register")
        local = (draft["entryId"], draft["localSenseId"])
        if local in seen_local_sense:
            raise ValueError("Two source senses mapped to one local sense without explicit reconciliation")
        seen_local_sense.add(local)
        counts["ready"] += 1
        decisions.append({
            "lemmaId": key[0], "senseId": key[1],
            **{field: draft[field] for field in fields}
        })
    if not decisions:
        raise ValueError("No explicitly reviewed senses selected for private staging")
    return {
        "schema": 1,
        "sha256": source["sha256"],
        "snapshot": source["snapshot"],
        "licenseReview": rights,
        "decisions": decisions,
        "reviewSummary": counts,
        "publicationApproved": False
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("packet", type=Path)
    parser.add_argument("rights_review", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    repository = Path(__file__).resolve().parent.parent
    output = args.output.resolve()
    if output.is_relative_to(repository):
        raise ValueError("Decisions must be written outside the repository")
    if output in {args.packet.resolve(), args.rights_review.resolve()}:
        raise ValueError("Refusing to overwrite source reviews")
    packet = json.loads(args.packet.read_text(encoding="utf-8"))
    rights_review = json.loads(args.rights_review.read_text(encoding="utf-8"))
    result = compile_decisions(packet, rights_review)
    output.parent.mkdir(parents=True, exist_ok=True)
    # Owner-readable only: review output may contain original Indonesian wording.
    fd = os.open(output, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, "w", encoding="utf-8") as stream:
        json.dump(result, stream, ensure_ascii=False, sort_keys=True, indent=2)
        stream.write("\n")
    print(json.dumps({"ready": result["reviewSummary"]["ready"],
                      "hold": result["reviewSummary"]["hold"],
                      "pending": result["reviewSummary"]["pending"],
                      "publicationApproved": False}, sort_keys=True))


if __name__ == "__main__":
    main()
