#!/usr/bin/env python3
"""P7.3/P7.4 research-only preflight for an actual P4 + P6 snapshot.

Only aggregate metrics and first-party MSA IDs leave CI; no upstream lexical
rows, source glosses or inferred meanings are published. Structural eligibility
does not grant linguistic or legal approval.
"""
import argparse
from collections import Counter, defaultdict
import json
from pathlib import Path
import unicodedata

# Mirrors the explicitly supported P4 POS in src/lib/domain/dictionary/p4-adapter.ts.
SUPPORTED_P5_POS = frozenset({
    "noun", "adj", "adv", "pron", "prep", "postp", "conj", "particle",
    "interj", "num", "det", "article", "phrase", "prep_phrase",
    "proverb", "abbrev"
})
DIACRITICS = frozenset(chr(n) for n in (*range(0x064B, 0x0653), 0x0670))


def approximate_spelling(value):
    # Only a triage heuristic. NOT an identity key or P5 normalization contract.
    return "".join(c for c in unicodedata.normalize("NFC", value)
                   if c not in DIACRITICS).strip()


def analyze(snapshot, queue):
    source = snapshot.get("source", {})
    if snapshot.get("schema") != 1 or source.get("id") != "wiktionary":
        raise ValueError("Unsupported P4 snapshot")
    if source.get("license") != "CC BY-SA 4.0 and GFDL":
        raise ValueError("Source metadata requires separate licence review")
    if len(source.get("sha256", "")) != 64:
        raise ValueError("Missing input digest")
    if queue.get("schema") != 1 or queue.get("source", {}).get("sha256") != source["sha256"]:
        raise ValueError("P6/P4 snapshot checksum mismatch")
    upstream_keys = Counter((row.get("lemmaId"), row.get("senseId"))
                            for row in snapshot.get("entries", []))
    counts = Counter()
    per_pos = Counter()
    per_register = Counter()
    lemma_ids = set()
    sense_ids = set()
    spelling_groups = defaultdict(set)
    for row in snapshot.get("entries", []):
        if row.get("bucket") != "candidate":
            continue
        counts["candidates"] += 1
        canonical = row.get("canonical", [])
        if upstream_keys[(row.get("lemmaId"), row.get("senseId"))] != 1:
            counts["ambiguous_upstream_identity"] += 1
            continue
        if row.get("pos") not in SUPPORTED_P5_POS:
            counts["unsupported_pos"] += 1
            continue
        if len(canonical) == 0:
            counts["missing_canonical"] += 1
            continue
        if len(canonical) != 1 or canonical[0] != row.get("ar"):
            counts["ambiguous_or_mismatched_canonical"] += 1
            continue
        if not row.get("glosses"):
            counts["missing_source_gloss"] += 1
            continue
        if not row.get("provenance"):
            counts["missing_provenance"] += 1
            continue
        if row.get("register") not in {"unspecified", "msa", "classical-or-historical"}:
            counts["unsupported_register"] += 1
            continue
        counts["structurally_reviewable"] += 1
        per_pos[row["pos"]] += 1
        per_register[row["register"]] += 1
        lemma_ids.add(row["lemmaId"])
        sense_ids.add(row["senseId"])
        spelling_groups[(row["pos"], approximate_spelling(row["ar"]))].add(row["lemmaId"])

    listed = queue.get("entries", [])
    if len(listed) != queue.get("totals", {}).get("pending"):
        raise ValueError("P6 queue length mismatch")
    msa_ids = [item.get("id") for item in listed]
    if (any(not isinstance(item_id, str) or not item_id.strip()
            for item_id in msa_ids)
            or len(set(msa_ids)) != len(msa_ids)):
        raise ValueError("P6 queue needs stable unique MSA IDs")
    missing_ids = sorted(item["id"] for item in listed
                         if not item.get("candidates"))
    with_candidate = sum(bool(item.get("candidates")) for item in listed)
    if with_candidate != queue.get("totals", {}).get("withCandidate"):
        raise ValueError("P6 candidate totals mismatch")
    pending_by_class = Counter(item.get("wordClass") or "unspecified" for item in listed)
    missing_by_class = Counter(item.get("wordClass") or "unspecified"
                               for item in listed if not item.get("candidates"))
    candidates_by_class = Counter(item.get("wordClass") or "unspecified"
                                  for item in listed if item.get("candidates"))
    reviewable = counts["structurally_reviewable"]
    if reviewable > counts["candidates"]:
        raise ValueError("Internal preflight count mismatch")

    return {
        "schema": 1,
        "p4": {
            "candidateRows": counts["candidates"],
            "structurallyReviewableRows": reviewable,
            "structurallyReviewableLemmaKeys": len(lemma_ids),
            "structurallyReviewableSenseKeys": len(sense_ids),
            "blockedByFirstReason": {
                key: counts[key] for key in (
                    "ambiguous_upstream_identity", "unsupported_pos", "missing_canonical",
                    "ambiguous_or_mismatched_canonical", "missing_source_gloss",
                    "missing_provenance", "unsupported_register"
                )
            },
            "reviewableRowsByPos": dict(sorted(per_pos.items())),
            "reviewableRowsByRegister": dict(sorted(per_register.items())),
            "approximateOrthographicCollisionGroups": sum(
                len(ids) > 1 for ids in spelling_groups.values()
            ),
        },
        "p6": {
            "pending": len(listed),
            "withCandidate": with_candidate,
            "withoutCandidate": len(listed) - with_candidate,
            "withoutCandidateIds": missing_ids,
            "pendingByClass": dict(sorted(pending_by_class.items())),
            "withCandidateByClass": dict(sorted(candidates_by_class.items())),
            "withoutCandidateByClass": dict(sorted(missing_by_class.items())),
        },
        "source": {
            "id": source["id"],
            "snapshot": source["snapshot"],
            "sha256": source["sha256"],
        },
        "reviewRequired": True,
        "licenseReviewRequired": True,
        "approvedGlosses": 0,
        "automaticallyImportedEntries": 0,
        "notes": [
            "Structural counts mirror preliminary P5 adapter gates, not a successful review decision.",
            "Orthographic collisions are approximate retrieval leads; never merge by normalized spelling.",
            "Unspecified register is not proof of MSA; English glosses are not Indonesian translations.",
        ],
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("p4", type=Path)
    parser.add_argument("p6", type=Path)
    parser.add_argument("report", type=Path)
    args = parser.parse_args()
    if args.report.exists():
        raise ValueError("Refusing to overwrite existing report")
    p4 = json.loads(args.p4.read_text(encoding="utf-8"))
    p6 = json.loads(args.p6.read_text(encoding="utf-8"))
    result = analyze(p4, p6)
    args.report.write_text(
        json.dumps(result, ensure_ascii=False, sort_keys=True, indent=2) + "\n",
        encoding="utf-8"
    )
    print(json.dumps({"p4": result["p4"], "p6": result["p6"]}, sort_keys=True))


if __name__ == "__main__":
    main()
