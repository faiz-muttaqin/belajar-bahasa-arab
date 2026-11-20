"""Build a conservative, review-only audit of unresolved recall verbs."""
import argparse
from collections import Counter, defaultdict
import hashlib
import json
from pathlib import Path
import re
import unicodedata
import xml.etree.ElementTree as ET

from extract_lane_full import root_search_key

VOWELS = {1: ("َ", "Bu"), 2: ("َ", "Bi"), 3: ("َ", "Ba"),
          4: ("ِ", "Ba"), 5: ("ِ", "Bi"), 6: ("ُ", "Bu")}
HAMZA = str.maketrans("أإآٱؤئءى", "اااااااي")
REVISION = "7dd04e1182c13a4b0883978867d2a3b04616542a"
DECISIONS = Path(__file__).with_name("p3-reviewed-decisions.json")


def exact(value):
    return unicodedata.normalize("NFC", value or "").replace("ـ", "")


def loose_root(value):
    key = root_search_key(value or "").translate(HAMZA)
    # Lane often labels geminate roots with only two consonants.
    if len(key) == 3 and key[-1] == key[-2]:
        return key[:-1]
    return key


def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
                    encoding="utf-8")


def evidence(entry, lemma, bab):
    xml = ET.fromstring(entry["xml"])
    # Only the primary form is a headword. Infl forms are not past lemmas.
    main_forms = [form for form in xml.findall("./form") if form.get("n") != "infl"]
    heads = [exact(orth.text) for form in main_forms for orth in form.findall("orth")
             if orth.text]
    if entry.get("key"):
        heads.append(exact(entry["key"]))
    heads = list(dict.fromkeys(heads))
    lemma = exact(lemma)
    head_exact = lemma in heads
    # Attached hu is only a lead, not a morphological or semantic validation.
    head_object = any(head in {lemma + "هُ", lemma + "ه"} for head in heads)
    infl = []
    for form in xml.findall("./form[@n='infl']"):
        for orth in form.findall("orth"):
            infl.append({"code": orth.get("orig"), "form": exact(orth.text)})
    form_i = "1" in entry.get("itypes", [])
    # Lane's encoded vowel markers occur in mixed articles. Do not assume that
    # an infl marker belongs to this particular sense or even this past variant.
    expected_code = VOWELS.get(bab, (None, None))[1]
    matching_codes = [item for item in infl if item["code"] == expected_code and expected_code]
    other_codes = [item for item in infl if item["code"] in {"Ba", "Bi", "Bu"}
                   and item["code"] != expected_code]
    sense_markers = len(xml.findall(".//milestone[@unit='sense']"))
    text = entry.get("text", "")
    cross_reference = bool(re.search(r"\b(?:see|q\. v\.)\b", text, re.I))
    # Capture explicit Arabic forms adjacent to aor. and inf. n. as review
    # signals, not as a syntactic interpretation of the entire article.
    source_xml = entry["xml"]
    aor = re.findall(r"\baor\.\s*(?:<[^>]+>\s*){0,3}([\u0600-\u06ff]+)", source_xml, re.I)
    masdar = re.findall(r"\binf\.\s*n\.\s*(?:<[^>]+>\s*){0,3}([\u0600-\u06ff]+)", source_xml, re.I)
    return {
        "locator": entry["locator"], "id": entry["id"],
        "root": entry.get("root"), "headwords": heads,
        "explicit_form_i": form_i, "head_exact": head_exact,
        "head_with_object_suffix": head_object, "inflections": infl,
        "expected_mudhari_code": expected_code,
        "matching_code_present": bool(matching_codes),
        "other_code_present": bool(other_codes),
        "aorist_leads": list(dict.fromkeys(aor)),
        "masdar_leads": list(dict.fromkeys(masdar)),
        "sense_milestones": sense_markers, "contains_cross_reference": cross_reference,
    }


def rank(item):
    if item["explicit_form_i"] and item["head_exact"] and item["matching_code_present"]:
        return 0
    if item["explicit_form_i"] and item["head_exact"]:
        return 1
    if item["explicit_form_i"] and item["head_with_object_suffix"]:
        return 2
    if item["explicit_form_i"]:
        return 3
    if item["head_exact"]:
        return 4
    return 5


def audit(recall, entries, applied_keys=()):
    root_index, root_loose_index, head_index = defaultdict(list), defaultdict(list), defaultdict(list)
    bare_head_index = defaultdict(list)
    for entry in entries:
        root = root_search_key(entry.get("root") or "")
        if root:
            root_index[root].append(entry)
            root_loose_index[loose_root(root)].append(entry)
        # Secondary search includes entries whose root differs from recall.
        for head in {entry.get("key"), *entry.get("orths", [])}:
            if head:
                head_index[exact(head)].append(entry)
                bare_head_index[root_search_key(head)].append(entry)
    seen = set()
    result = []
    for row in recall:
        key = (row["ar"], row["root"], row["bab"])
        if row["kind"] != "tidak_diketahui" and key not in applied_keys:
            continue
        if key in seen:
            raise ValueError(f"Duplicate unresolved recall key: {key}")
        seen.add(key)
        lemma, root, bab = key
        exact_roots = root_index.get(root_search_key(root), [])
        aliases = root_loose_index.get(loose_root(root), [])
        cross_heads = head_index.get(exact(lemma), [])
        bare = root_search_key(lemma)
        spelling_leads = [*bare_head_index.get(bare, []), *bare_head_index.get(bare + "ه", [])]
        candidates = {item["locator"]: item for item in [*exact_roots, *aliases, *cross_heads, *spelling_leads]}
        leads = [evidence(item, lemma, bab) for item in candidates.values()]
        leads.sort(key=lambda item: (rank(item), item["locator"]))
        best = rank(leads[0]) if leads else None
        if root == "جذر" or not root:
            status = "suspect_root"
        elif best == 0:
            status = "head_and_vowel_marker_lead"
        elif best == 1:
            status = "exact_form_i_head_lead"
        elif best == 2:
            status = "object_suffix_lead"
        elif best == 3:
            status = "form_i_under_candidate_root_only"
        elif best == 4:
            status = "head_without_explicit_form_i"
        elif leads:
            status = "root_or_alias_only"
        else:
            status = "no_lane_candidate"
        result.append({
            "lemma": lemma, "root": root, "bab": bab, "code": row.get("code"),
            "status": status, "decision": "unresolved", "gloss": None,
            "exact_root_records": len(exact_roots), "normalized_root_records": len(aliases),
            "exact_head_records": len(cross_heads),
            "bare_head_records": len({item["locator"] for item in spelling_leads}), "candidates": leads,
        })
    return result


def attach_reviews(rows, decisions):
    by_key = {(row["lemma"], row["root"], row["bab"]): row for row in rows}
    seen = set()
    for decision in decisions:
        key = (decision["lemma"], decision["root"], decision["bab"])
        if key in seen or key not in by_key:
            raise ValueError(f"Duplicate or stale review: {key}")
        seen.add(key)
        row = by_key[key]
        matches = [item for item in row["candidates"] if item["locator"] == decision["locator"]
                   and item["id"] == decision["source_entry_id"]]
        if len(matches) != 1:
            raise ValueError(f"Review source locator missing: {key}")
        if not matches[0]["explicit_form_i"] or not matches[0]["head_exact"]:
            raise ValueError(f"Review requires exact Form I head: {key}")
        if decision["decision"] not in {"draft_supported", "hold_bab"}:
            raise ValueError(f"Unknown review decision: {key}")
        supported = decision["decision"] == "draft_supported"
        if supported != bool(decision.get("gloss")):
            raise ValueError(f"Inconsistent review gloss: {key}")
        row["decision"] = decision["decision"]
        row["gloss"] = decision.get("gloss")
        row["manual_review"] = decision
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("recall", type=Path)
    parser.add_argument("lane", type=Path, help="P2 output directory")
    parser.add_argument("output", type=Path)
    parser.add_argument("--expect", type=int, default=537)
    args = parser.parse_args()
    source = json.loads(args.recall.read_text(encoding="utf-8"))
    manifest = json.loads((args.lane / "manifest.json").read_text(encoding="utf-8"))
    path = args.lane / "entries.jsonl"
    if hashlib.sha256(path.read_bytes()).hexdigest() != manifest["outputs"]["entries.jsonl"]:
        raise ValueError("Lane entries checksum mismatch")
    with path.open(encoding="utf-8") as stream:
        entries = [json.loads(line) for line in stream]
    if len(entries) != manifest["counts"]["entries"]:
        raise ValueError("Lane entry count mismatch")
    decisions = json.loads(DECISIONS.read_text(encoding="utf-8"))["decisions"]
    applied = {(d["lemma"], d["root"], d["bab"]): d for d in decisions if d.get("applied")}
    for row in source["verbs"]:
        key = (row["ar"], row["root"], row["bab"])
        if key in applied:
            decision = applied[key]
            if row["kind"] != "padanan" or row["meanings"] != [decision["gloss"]] or row.get("audit", {}).get("sourceId") != "lane":
                raise ValueError(f"Applied review differs from recall: {key}")
    rows = audit(source["verbs"], entries, applied)
    if manifest["revision"] != REVISION:
        raise ValueError("Unexpected Lane revision")
    attach_reviews(rows, decisions)
    if len(rows) != args.expect:
        raise ValueError(f"Unresolved baseline changed: {len(rows)} != {args.expect}")
    args.output.mkdir(parents=True, exist_ok=False)
    counts = dict(sorted(Counter(row["status"] for row in rows).items()))
    review_counts = Counter(row["decision"] for row in rows)
    summary = {
        "schema": 1, "recall_sha256": hashlib.sha256(args.recall.read_bytes()).hexdigest(),
        "lane_revision": manifest["revision"], "lane_entries_sha256": manifest["outputs"]["entries.jsonl"],
        "lane_license": manifest["license"], "unresolved": len(rows),
        "reviewed_semantically": len(rows) - review_counts["unresolved"],
        "draft_supported": review_counts["draft_supported"], "held_bab": review_counts["hold_bab"],
        "glosses_added_to_learner_data": len(applied),
        "remaining_unknown": sum(row["kind"] == "tidak_diketahui" for row in source["verbs"]),
        "candidate_counts": counts,
    }
    write_json(args.output / "review-queue.json", rows)
    write_json(args.output / "summary.json", summary)
    write_json(args.output / "draft-glosses.json", [row["manual_review"] for row in rows
               if row["decision"] == "draft_supported"])
    (args.output / "ATTRIBUTION.txt").write_bytes((args.lane / "ATTRIBUTION.txt").read_bytes())
    print(json.dumps(summary, ensure_ascii=False))
    # Expose the most useful candidate locators in CI log without bulk dictionary text.
    for row in rows:
        if row["status"] in {"head_and_vowel_marker_lead", "exact_form_i_head_lead", "suspect_root"}:
            print(json.dumps({k: row[k] for k in ("lemma", "root", "bab", "code", "status")},
                             ensure_ascii=False), json.dumps(row["candidates"][:2], ensure_ascii=False))


if __name__ == "__main__":
    main()
