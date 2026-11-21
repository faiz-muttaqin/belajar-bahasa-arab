#!/usr/bin/env python3
"""Prepare a private, deterministic P7.4/P7.5 sense review batch from P4+P6.

Output contains upstream snippets and must remain OUTSIDE the repository and
CI artifacts. It is NOT an approved P4Decision list or publication input.
"""
import argparse
from collections import Counter, defaultdict
import json
from pathlib import Path
from urllib.parse import quote

from p7_preflight import SUPPORTED_P5_POS, analyze


def review_batch(snapshot, queue, limit=25, offset=0):
    if not isinstance(limit, int) or not 1 <= limit <= 100:
        raise ValueError("Review batch limit must be 1..100")
    if not isinstance(offset, int) or offset < 0:
        raise ValueError("Review batch offset must be nonnegative")

    # Also verifies source identity, queue statistics and snapshot checksum.
    preflight = analyze(snapshot, queue)
    counts = Counter((row.get("lemmaId"), row.get("senseId"))
                     for row in snapshot.get("entries", []))
    eligible = {}
    for row in snapshot.get("entries", []):
        key = (row.get("lemmaId"), row.get("senseId"))
        if (counts[key] != 1 or row.get("bucket") != "candidate"
                or row.get("pos") not in SUPPORTED_P5_POS
                or row.get("canonical") != [row.get("ar")]
                or not row.get("ar") or not row.get("glosses")
                or not row.get("provenance")
                or row.get("register") not in
                {"unspecified", "msa", "classical-or-historical"}):
            continue
        eligible[key] = row

    leads = defaultdict(set)
    gaps = []
    for item in queue["entries"]:
        if not item.get("candidates"):
            gaps.append({
                "msaId": item["id"], "arabic": item["arabic"],
                "wordClass": item.get("wordClass"),
                "status": "needs-independent-retrieval",
                "lookupUrl": item.get("lookupUrl")
            })
        for candidate in item.get("candidates", []):
            key = (candidate.get("lemmaId"), candidate.get("senseId"))
            # Reject stale or cross-snapshot references rather than silently
            # dropping an MSA candidate from the queue.
            if key not in counts:
                raise ValueError("P6 candidate not found in the pinned P4 snapshot")
            leads[key].add(item["id"])

    # Prioritize P6 vocabulary without conflating orthographic leads with
    # linguistic verification. The rest is ordered by stable upstream IDs.
    keys = sorted(eligible, key=lambda key: (not bool(leads.get(key)), key))
    selected = keys[offset:offset + limit]
    tasks = []
    for lemma_id, sense_id in selected:
        row = eligible[(lemma_id, sense_id)]
        tasks.append({
            "lemmaId": lemma_id,
            "senseId": sense_id,
            "arabic": row["ar"],
            "pos": row["pos"],
            "sourceRegister": row["register"],
            "sourceGlosses": row["glosses"],
            "sourceTags": row.get("tags", []),
            "sourceUrl": "https://en.wiktionary.org/wiki/"
                         + quote(row.get("page", ""), safe="") + "#Arabic",
            "sourceLocations": row["provenance"],
            "relatedMsaIds": sorted(leads.get((lemma_id, sense_id), [])),
            "reviewStatus": "pending",
            "decisionDraft": {
                "entryId": None,
                "localSenseId": None,
                "glossId": None,
                "register": None,
                "checkedOn": None,
                "locator": None
            }
        })

    return {
        "schema": 1,
        "privateResearchOnly": True,
        "publicationApproved": False,
        "licenseReviewApproved": False,
        "source": preflight["source"],
        "selection": {
            "limit": limit,
            "offset": offset,
            "eligibleSenseKeys": len(keys),
            "selectedSenseKeys": len(tasks),
            "remainingSenseKeys": max(0, len(keys) - offset - len(tasks))
        },
        "msaWithoutP4Lead": sorted(gaps, key=lambda item: item["msaId"]),
        "tasks": tasks,
        "notes": [
            "English glosses are upstream research hints, not approved Indonesian translations.",
            "A P6 spelling/POS lead is not evidence for the same sense or register.",
            "Manually audit license, lemma identity, source section, Indonesian gloss and register per sense.",
            "This file is not a P4Decision list and cannot be imported or published automatically."
        ]
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("p4", type=Path)
    parser.add_argument("p6", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--limit", type=int, default=25)
    parser.add_argument("--offset", type=int, default=0)
    args = parser.parse_args()

    output = args.output.resolve()
    repository = Path(__file__).resolve().parent.parent
    if output.is_relative_to(repository):
        raise ValueError("Private review batches must be written outside repository")
    if output in {args.p4.resolve(), args.p6.resolve()}:
        raise ValueError("Review output must not overwrite input")
    snapshot = json.loads(args.p4.read_text(encoding="utf-8"))
    queue = json.loads(args.p6.read_text(encoding="utf-8"))
    result = review_batch(snapshot, queue, args.limit, args.offset)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("x", encoding="utf-8") as file:
        json.dump(result, file, ensure_ascii=False, sort_keys=True, indent=2)
        file.write("\n")
    print(json.dumps({
        "tasks": result["selection"]["selectedSenseKeys"],
        "eligible": result["selection"]["eligibleSenseKeys"],
        "msaGaps": len(result["msaWithoutP4Lead"]),
        "approved": 0
    }, sort_keys=True))


if __name__ == "__main__":
    main()
