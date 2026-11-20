"""Search pinned classical dictionaries for review locators, not new glosses."""
import argparse
from collections import Counter, defaultdict
import json
from pathlib import Path
import re
import unicodedata
from urllib.request import urlopen

from audit_unresolved_verbs import exact, loose_root, write_json
from extract_lane_full import git_blob, root_search_key

PINS = Path(__file__).with_name("p3-classical-sources.json")
TOKEN = re.compile(r"[\u0621-\u063a\u0641-\u064a\u064b-\u065f\u0670\u0671\u0640]+")
PAGE = re.compile(r"PageV\d+P\d+")
CAP = 20


def search_key(value):
    return root_search_key(exact(value))


def query_keys(row):
    lemma = exact(row["lemma"])
    return lemma, search_key(lemma), loose_root(row["root"])


def scan(text, rows):
    heads, bare, roots = defaultdict(set), defaultdict(set), defaultdict(set)
    for i, row in enumerate(rows):
        head, spelling, root = query_keys(row)
        heads[head].add(i)
        bare[spelling].add(i)
        if root and row["root"] != "جذر":
            roots[root].add(i)
    result = defaultdict(lambda: {"counts": Counter(), "locators": defaultdict(list)})
    page = None
    in_body = False
    if "#META#Header#End#" not in text:
        raise ValueError("Missing OpenITI header terminator")
    for line_no, line in enumerate(text.splitlines(), 1):
        if not in_body:
            in_body = "#META#Header#End#" in line
            continue
        if line.startswith("#META#"):
            continue
        # Page codes may occur at line ends. Line number is the canonical locator.
        found_pages = PAGE.findall(line)
        if found_pages:
            page = found_pages[-1]
        matches = defaultdict(set)
        for token in TOKEN.findall(line):
            spelling = search_key(token)
            if spelling in bare:
                for i in bare[spelling]:
                    matches[i].add("spelling")
            if exact(token) in heads and any(unicodedata.category(c).startswith("M") for c in token):
                for i in heads[exact(token)]:
                    matches[i].add("vocalized_lemma")
        # Parenthesized root/headword labels are stronger structural leads than
        # arbitrary root strings in prose, but editions vary; not guaranteed heads.
        for token in re.findall(r"[\(\[]\s*([^()\[\]\n]{1,24})\s*[\)\]]", line):
            if not TOKEN.fullmatch(token.strip()):
                continue
            key = loose_root(token)
            for i in roots.get(key, ()):
                matches[i].add("parenthesized_root")
        for i, kinds in matches.items():
            for kind in kinds:
                record = result[i]
                record["counts"][kind] += 1
                if len(record["locators"][kind]) < CAP:
                    record["locators"][kind].append({"line": line_no, "near_page": page})
    return result


def retrieve(pin, directory):
    destination = directory / pin["id"]
    if not destination.exists():
        url = f"https://raw.githubusercontent.com/{pin['repository']}/{pin['revision']}/{pin['path']}"
        with urlopen(url, timeout=120) as response:
            data = response.read(pin["bytes"] + 1)
        if len(data) != pin["bytes"] or git_blob(data) != pin["gitBlob"]:
            raise ValueError(f"Source pin mismatch: {pin['id']}")
        destination.write_bytes(data)
    data = destination.read_bytes()
    if len(data) != pin["bytes"] or git_blob(data) != pin["gitBlob"]:
        raise ValueError(f"Cached source pin mismatch: {pin['id']}")
    return data.decode("utf-8-sig")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("audit", type=Path)
    parser.add_argument("cache", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    rows = json.loads((args.audit / "review-queue.json").read_text(encoding="utf-8"))
    pins = json.loads(PINS.read_text(encoding="utf-8"))
    args.cache.mkdir(parents=True, exist_ok=True)
    args.output.mkdir(parents=True, exist_ok=False)
    result = [{"lemma": r["lemma"], "root": r["root"], "bab": r["bab"],
               "decision": r["decision"], "sources": {}} for r in rows]
    for pin in pins:
        matches = scan(retrieve(pin, args.cache), rows)
        for i, value in matches.items():
            result[i]["sources"][pin["id"]] = value
    counts = {
        "records": len(rows),
        "any_classical_lead": sum(bool(r["sources"]) for r in result),
        "vocalized_lead": sum(any(v["counts"]["vocalized_lemma"] for v in r["sources"].values()) for r in result),
        "parenthesized_root_lead": sum(any(v["counts"]["parenthesized_root"] for v in r["sources"].values()) for r in result),
        "by_source": {pin["id"]: sum(pin["id"] in r["sources"] for r in result) for pin in pins},
        "glosses_approved_automatically": 0,
    }
    # Only input lemma/root/bab, hit counts and pinned-source line locators
    # are written. No OpenITI text, reconstructed excerpts or adapted dataset.
    write_json(args.output / "classical-locators.json", result)
    write_json(args.output / "summary.json", counts)
    write_json(args.output / "sources.json", pins)
    (args.output / "ATTRIBUTION.txt").write_text(
        "Open Islamicate Texts Initiative (OpenITI), digital editions identified in sources.json.\n"
        "CC BY-NC-SA 4.0: https://creativecommons.org/licenses/by-nc-sa/4.0/\n"
        "Reference-only research locators; no corpus text is distributed.\n"
        "Source license: https://openiti.org/documentation/\n", encoding="utf-8")
    print(json.dumps(counts, ensure_ascii=False))
    for row in result:
        if row["decision"] == "unresolved" and row["sources"]:
            print("CLASSICAL", json.dumps(row, ensure_ascii=False, separators=(",", ":")))


if __name__ == "__main__":
    main()
