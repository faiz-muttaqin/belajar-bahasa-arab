"""Retrieve explicit Qamus bab-marker leads for active unknown verbs.

Bare headwords can be homographs. Neither a marker nor a line match proves
a sense; reviewers must inspect the pinned source and resolve vocalization.
Only project keys, marker labels and locators are emitted, never source prose.
"""
import argparse
from collections import Counter, defaultdict
import json
from pathlib import Path
import re
import unicodedata

from search_classical_p3 import PINS, retrieve
from audit_unresolved_verbs import write_json

MARKERS = {"نصر": 1, "ضرب": 2, "منع": 3, "فرح": 4, "حسب": 5, "كرم": 6}
# Restrict to explicit headword + model-verb syntax; do not match arbitrary
# occurrences of a marker elsewhere in a line.
PATTERN = re.compile(
    r"(?:^|[• ،:؛])([ء-ي]+)\s*،?\s*ك(نصر|ضرب|منع|فرح|حسب|كرم)(?=[،:؛\s.]|$)"
)


def bare(value):
    return "".join(
        ch for ch in unicodedata.normalize("NFC", value)
        if not unicodedata.category(ch).startswith("M") and ch != "ـ"
    )


def find_leads(text, rows):
    index = defaultdict(list)
    for i, row in enumerate(rows):
        index[bare(row["lemma"])].append(i)
    hits = defaultdict(list)
    in_body = False
    for number, raw in enumerate(text.splitlines(), 1):
        if not in_body:
            in_body = "#META#Header#End#" in raw
            continue
        for match in PATTERN.finditer(bare(raw)):
            head, marker = match.groups()
            # Exact bare head only. Attached waw is a weaker lead; preserve
            # both possibilities when the waw is part of a real headword.
            options = [(head, "bare-head")]
            if head.startswith("و") and len(head) > 1:
                options.append((head[1:], "possible-conjunction"))
            for key, kind in options:
                for i in index.get(key, []):
                    item = {"line": number, "marker": marker,
                            "markerBab": MARKERS[marker], "headMatch": kind,
                            "babMatches": MARKERS[marker] == rows[i]["bab"]}
                    if item not in hits[i]:
                        hits[i].append(item)
    if not in_body:
        raise ValueError("Missing source header terminator")
    return [{**row, "leads": hits[i]} for i, row in enumerate(rows)]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("recall", type=Path)
    parser.add_argument("audit", type=Path)
    parser.add_argument("cache", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    recall = json.loads(args.recall.read_text(encoding="utf-8"))["verbs"]
    baseline = json.loads((args.audit / "review-queue.json").read_text(encoding="utf-8"))
    prior = {(r["lemma"], r["root"], r["bab"]): r["decision"] for r in baseline}
    rows = [{"lemma": r["ar"], "root": r["root"], "bab": r["bab"],
             "priorDecision": prior[(r["ar"], r["root"], r["bab"])]}
            for r in recall if r["kind"] == "tidak_diketahui"]
    if len(rows) != len({(r["lemma"], r["root"], r["bab"]) for r in rows}):
        raise ValueError("Duplicate active unknown keys")
    pin = next(p for p in json.loads(PINS.read_text(encoding="utf-8")) if p["id"] == "qamus")
    args.cache.mkdir(parents=True, exist_ok=True)
    result = find_leads(retrieve(pin, args.cache), rows)
    counts = Counter()
    for row in result:
        matching = [x for x in row["leads"] if x["babMatches"]]
        exact = [x for x in matching if x["headMatch"] == "bare-head"]
        if row["priorDecision"] == "hold_bab":
            action = "prior_hold_requires_reassessment"
        elif exact and row["root"] != "جذر":
            action = "inspect_matching_marker"
        elif matching:
            action = "inspect_weak_head_or_root"
        elif row["leads"]:
            action = "inspect_other_bab"
        else:
            action = "no_explicit_marker_lead"
        row["action"] = action
        counts[action] += 1
    args.output.mkdir(parents=True, exist_ok=False)
    summary = {"schema": 1, "activeUnknown": len(rows), "actions": dict(counts),
               "source": pin, "glossesApproved": 0,
               "warning": "Bare head and marker are leads, not semantic proof."}
    write_json(args.output / "summary.json", summary)
    write_json(args.output / "leads.json", result)
    print(json.dumps(summary, ensure_ascii=False))
    for row in result:
        if row["action"] != "no_explicit_marker_lead":
            print("P7MARKER", json.dumps(row, ensure_ascii=False))


if __name__ == "__main__":
    main()
