"""P7 aggregate-only snapshot report; no source glosses or lexical rows leave CI."""
import hashlib
import json
import sys
from collections import Counter
from pathlib import Path


def sha256(path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def summarize(extract, queue):
    if extract.get("schema") != 1 or extract["source"]["id"] != "wiktionary":
        raise ValueError("Unexpected P4 contract")
    if queue.get("schema") != 1 or queue["source"] != extract["source"]:
        raise ValueError("P6 queue is not based on the same snapshot")
    rows = extract["entries"]
    candidates = [row for row in rows if row["bucket"] == "candidate"]
    lemma = {row["lemmaId"] for row in candidates}
    sense = {row["senseId"] for row in candidates}
    totals = extract["totals"]
    if not candidates or len(lemma) != totals["candidateLemmaKeys"] or len(sense) != totals["candidateSenses"]:
        raise ValueError("Candidate totals mismatch")
    if Counter(row["bucket"] for row in rows) != totals["buckets"]:
        raise ValueError("Bucket totals mismatch")
    if any(row["reviewStatus"] != "draft" or not row["provenance"] for row in rows):
        raise ValueError("Unreviewed or untraceable row")
    if any(item["status"] != "needs-review" for item in queue["entries"]):
        raise ValueError("P6 leads must remain unreviewed")
    if len(queue["entries"]) != queue["totals"]["pending"]:
        raise ValueError("Queue totals mismatch")
    by_pos = {}
    for pos in sorted({row["pos"] for row in candidates}):
        selected = [row for row in candidates if row["pos"] == pos]
        by_pos[pos] = {
            "lemmaKeys": len({row["lemmaId"] for row in selected}),
            "senseKeys": len({row["senseId"] for row in selected}),
        }
    return {
        "p4": totals,
        "candidateByPos": by_pos,
        "candidateRowsByRegister": dict(Counter(row["register"] for row in candidates)),
        "candidateRowsWithoutCanonical": sum(not row["canonical"] for row in candidates),
        "candidateRowsWithAmbiguousCanonical": sum(len(row["canonical"]) > 1 for row in candidates),
        "candidateRowsWithExplicitForms": sum(bool(row["forms"]) for row in candidates),
        "p6": queue["totals"],
        "publishedNewEntries": 0,
    }


def main():
    work, output = map(Path, sys.argv[1:])
    extract = json.loads((work / "nonverbs.json").read_text(encoding="utf-8"))
    queue = json.loads((work / "msa-queue.json").read_text(encoding="utf-8"))
    source = work / "arabic.jsonl"
    digest = sha256(source)
    if digest != extract["source"]["sha256"]:
        raise ValueError("Input checksum mismatch")
    result = summarize(extract, queue)
    result["source"] = {
        "id": "wiktionary",
        "url": extract["source"]["url"],
        "variant": "postprocessed-research-only",
        "declaredDump": extract["source"]["snapshot"],
        "declaredExtraction": "2026-10-30",
        "sha256": digest,
        "bytes": source.stat().st_size,
        "extractSha256": sha256(work / "nonverbs.json"),
        "redistribution": "aggregate-only; source text and candidate rows excluded",
        "attribution": extract["source"]["attribution"],
        "licenseReview": "pending for merged postprocessing sources",
    }
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
