"""Cross-check the full P3 baseline against local independent dictionary data.

All matches are review leads, not newly approved meanings. Keep each source's
licensing and attribution separate; no Qabas data is distributed.
"""
import argparse
from collections import Counter, defaultdict
import hashlib
import json
from pathlib import Path
import unicodedata

from audit_unresolved_verbs import exact, loose_root, write_json
from extract_lane_full import root_search_key


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def upstream_records(path):
    result = []
    for line in path.read_text(encoding="utf-8-sig").splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        lemma, root, raw_bab, transitivity, source_id = line.split("\t")
        bab = {"5": 6, "6": 5}.get(raw_bab, int(raw_bab))
        result.append({"lemma": lemma, "root": root, "bab": bab,
                       "transitivity": transitivity, "id": source_id})
    return result


def crosscheck(queue, wiktionary, translations, upstream):
    wiki_index = defaultdict(list)
    for item in wiktionary:
        wiki_index[root_search_key(item["ar"])].append(item)
    upstream_index = defaultdict(list)
    for source, records in upstream.items():
        for record in records:
            upstream_index[exact(record["lemma"])].append((source, record))
    rows = []
    for row in queue:
        lemma, root, bab = row["lemma"], row["root"], row["bab"]
        wiki = []
        for item in wiki_index[root_search_key(lemma)]:
            same = exact(item["ar"]) == exact(lemma)
            primary = same and item["bab"] == bab and item["babSource"] != "unknown"
            alt = same and bab in item.get("altBabs", [])
            translation = translations.get(item["id"], {})
            wiki.append({
                "id": item["id"], "sourceId": "wiktionary", "source": item["page"],
                "head_exact": same, "primary_bab_match": primary, "alternate_bab_match": alt,
                "bab_source": item["babSource"], "bab": item["bab"],
                "alternate_babs": item.get("altBabs", []), "madhi": item["ar"],
                "mudhari": item.get("nonPast"), "masdar": item.get("verbalNouns", []),
                "transitive": item.get("transitive"),
                "english_glosses": item.get("en", []),
                "existing_indonesian_glosses": translation.get("idGlosses", []),
                "translation_uncertain": translation.get("uncertain"),
                "translation_audit": translation.get("audit"),
            })
        wiki.sort(key=lambda item: (not item["primary_bab_match"], not item["alternate_bab_match"],
                                   not item["head_exact"], item["id"]))
        morph = []
        for source, record in upstream_index[exact(lemma)]:
            morph.append({
                "source": source, "id": record["id"], "root": record["root"],
                "bab": record["bab"], "transitivity": record["transitivity"],
                "exact_root": exact(record["root"]) == exact(root),
                "root_alias": loose_root(record["root"]) == loose_root(root),
                "bab_match": record["bab"] == bab,
            })
        primary = [item for item in wiki if item["primary_bab_match"] and item["english_glosses"]]
        alternates = [item for item in wiki if item["alternate_bab_match"]]
        exact_roots = [item for item in morph if item["exact_root"] and item["bab_match"]]
        if row["decision"] != "unresolved":
            action = "review_decision_exists"
        elif primary:
            action = "review_wiktionary_exact_lemma_bab"
        elif alternates:
            action = "review_wiktionary_alternate_bab"
        elif any(item["head_exact"] for item in wiki):
            action = "review_other_bab_or_unknown"
        elif row["status"] == "suspect_root" or not exact_roots:
            action = "investigate_upstream_root_or_bab"
        elif row["candidates"]:
            action = "review_lane_candidates"
        elif wiki:
            action = "review_wiktionary_spelling"
        else:
            action = "no_evidence_in_available_lexicons"
        rows.append({
            "lemma": lemma, "root": root, "bab": bab, "code": row.get("code"),
            "lane_status": row["status"], "lane_candidate_count": len(row["candidates"]),
            "decision": row["decision"], "action": action,
            "wiktionary": wiki, "morphology": morph,
        })
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("project", type=Path)
    parser.add_argument("audit", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    wiki_path = args.project / "data/wiktionary/verbs-form-i.json"
    translation_path = args.project / "data/wiktionary/verbs-form-i.id.json"
    qutrub = args.project / "data/sharaf-upstream/qutrub-ar_verb_normalized.dict"
    arramooz = args.project / "data/sharaf-upstream/arramooz-verb_triliteral.tsv"
    queue = read_json(args.audit / "review-queue.json")
    source = read_json(wiki_path)
    rows = crosscheck(queue, source["verbs"], read_json(translation_path),
                      {"qutrub": upstream_records(qutrub), "arramooz": upstream_records(arramooz)})
    if len(rows) != len(queue):
        raise ValueError("Cross-check coverage mismatch")
    args.output.mkdir(parents=True, exist_ok=False)
    summary = {
        "records": len(rows),
        "actions": dict(sorted(Counter(row["action"] for row in rows).items())),
        "wiktionary_head_and_primary_bab_with_gloss": sum(
            any(item["primary_bab_match"] and item["english_glosses"]
                for item in row["wiktionary"]) for row in rows),
        "wiktionary_head_and_alt_bab": sum(
            any(item["alternate_bab_match"] for item in row["wiktionary"]) for row in rows),
        "source_hashes": {path.name: sha(path) for path in
                          (wiki_path, translation_path, qutrub, arramooz)},
        "qabas_status": "not_checked_source_download_not_available_in_ci",
        "new_glosses_approved": 0,
    }
    write_json(args.output / "crosscheck.json", rows)
    write_json(args.output / "summary.json", summary)
    (args.output / "ATTRIBUTION.txt").write_text(
        source["attribution"] + "\n"
        "Wiktionary: CC BY-SA 4.0 and GFDL; per-record source page in crosscheck.json.\n"
        "Qutrub and Arramooz morphology lists GPL-2.0; see project data/sharaf-upstream/.\n"
        "Review leads only; no Qabas dataset reused or redistributed.\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False))
    for row in rows:
        print("P3ROW", json.dumps({k: row[k] for k in
              ("lemma", "root", "bab", "lane_status", "action")}, ensure_ascii=False,
              separators=(",", ":")))


if __name__ == "__main__":
    main()
