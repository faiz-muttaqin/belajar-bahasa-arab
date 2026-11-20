"""Reproducible extraction of the pinned Alpheios Lane corpus (Python stdlib)."""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import re
import unicodedata
import xml.etree.ElementTree as ET

PIN = Path(__file__).with_name("lane-source-manifest.json")
SOURCE = "https://github.com/alpheios-project/lan"
LICENSE = "CC-BY-SA-3.0-US"


def normalized_text(element):
    return " ".join("".join(element.itertext()).split())


def root_search_key(text):
    # Search aid only: never merge or rewrite the source root.
    return "".join(
        char for char in unicodedata.normalize("NFC", text)
        if not unicodedata.category(char).startswith("M")
        and not char.isspace() and char != "\u0640"
    )


def json_line(stream, value):
    stream.write(json.dumps(value, ensure_ascii=False, sort_keys=True) + "\n")


def git_blob(data):
    return hashlib.sha1(f"blob {len(data)}\0".encode() + data).hexdigest()


def extract_document(data, path, roots_out, entries_out, ids, counters):
    # The pinned XML has no need for external entities.
    if re.search(rb"<!DOCTYPE|<!ENTITY", data, re.IGNORECASE):
        raise ValueError(f"Unexpected DTD or entity declaration: {path}")
    document = ET.fromstring(data)
    root_by_entry = {}
    for ordinal, root in enumerate(
        document.findall(".//div2[@type='root']"), start=1
    ):
        head = root.find("head")
        if head is None:
            raise ValueError(f"Missing root head: {path} #{ordinal}")
        label = normalized_text(head)
        if not label:
            raise ValueError(f"Empty root head: {path} #{ordinal}")
        locator = f"{path}#root-{ordinal}"
        members = list(root.iter("entryFree"))
        for member in members:
            if member in root_by_entry:
                raise ValueError(f"Nested root articles: {locator}")
            root_by_entry[member] = (locator, label)
        json_line(roots_out, {
            "locator": locator,
            "source_file": path,
            "root_ordinal": ordinal,
            "root": label,
            "root_search_key": root_search_key(label),
            "entry_ids": [m.get("id") or m.get("{http://www.w3.org/XML/1998/namespace}id") for m in members],
            "xml": ET.tostring(root, encoding="unicode"),
        })
        counters["root_articles"] += 1

    for ordinal, entry in enumerate(document.iter("entryFree"), start=1):
        entry_id = entry.get("id") or entry.get("{http://www.w3.org/XML/1998/namespace}id")
        if not entry_id:
            raise ValueError(f"Missing entry ID: {path} entry {ordinal}")
        if entry_id in ids:
            raise ValueError(f"Duplicate entry ID: {entry_id}")
        ids.add(entry_id)
        root_locator, label = root_by_entry.get(entry, (None, None))
        itypes = [normalized_text(item) for item in entry.findall("./form/itype")]
        orths = [normalized_text(item) for item in entry.findall("./form/orth")]
        json_line(entries_out, {
            "id": entry_id,
            "locator": f"{path}#{entry_id}",
            "source_file": path,
            "root_locator": root_locator,
            "root": label,
            "root_search_key": root_search_key(label) if label is not None else None,
            "key": entry.get("key"),
            "type": entry.get("type"),
            "itypes": itypes,
            "orths": orths,
            "text": normalized_text(entry),
            "xml": ET.tostring(entry, encoding="unicode"),
        })
        counters["entries"] += 1
        counters["entries_in_roots" if root_locator else "entries_outside_roots"] += 1
        if "1" in itypes:
            counters["explicit_form_i_entries"] += 1
        counters["sense_milestones"] += len(entry.findall(".//milestone[@unit='sense']"))
        if not itypes:
            counters["entries_without_itype"] += 1


def build(source_dir, output_dir):
    pin = json.loads(PIN.read_text(encoding="utf-8"))
    # Verify every source byte before extracting; refuse partial or changed input.
    observed = {
        item.relative_to(source_dir).as_posix()
        for item in (source_dir / "db/lexica/ara/lan").glob("*.xml")
        if item.name != "__contents__.xml"
    }
    expected = {item["path"] for item in pin["files"]}
    if observed != expected:
        raise ValueError(f"Unexpected source files: missing={expected - observed}, extra={observed - expected}")
    for item in pin["files"]:
        data = (source_dir / item["path"]).read_bytes()
        if len(data) != item["bytes"] or git_blob(data) != item["gitBlob"]:
            raise ValueError(f"Pinned source mismatch: {item['path']}")

    # Never overwrite previous output or silently leave stale results in it.
    output_dir.mkdir(parents=True, exist_ok=False)
    counters = Counter()
    ids = set()
    with (output_dir / "roots.jsonl").open("w", encoding="utf-8", newline="\n") as roots, (
        output_dir / "entries.jsonl"
    ).open("w", encoding="utf-8", newline="\n") as entries:
        for item in pin["files"]:
            path = item["path"]
            before = counters.copy()
            extract_document((source_dir / path).read_bytes(), path, roots, entries, ids, counters)
            if counters["entries"] == before["entries"]:
                raise ValueError(f"No entries parsed: {path}")
    if not counters["root_articles"] or not counters["explicit_form_i_entries"]:
        raise ValueError("No roots or explicitly marked Form I entries")
    if counters["entries"] != counters["entries_in_roots"] + counters["entries_outside_roots"]:
        raise ValueError("Entry coverage mismatch")
    attribution = (
        "Edward William Lane, An Arabic-English Lexicon, 1863–1893.\n"
        "Original digitization: Perseus Digital Library, Tufts University, supported by "
        "the U.S. Department of Education and Max Planck Society. "
        "Corrections: Alpheios Project, Ltd.\n"
        "Licensed CC BY-SA 3.0 US: https://creativecommons.org/licenses/by-sa/3.0/us/\n"
        f"Source: {SOURCE}/tree/{pin['revision']}\n"
        "Changes: XML elements extracted and reserialized; text whitespace normalized "
        "for searching only. No translation or inferred senses.\n"
    )
    (output_dir / "ATTRIBUTION.txt").write_text(attribution, encoding="utf-8")
    manifest = {
        "schema": 1,
        "source": SOURCE,
        "revision": pin["revision"],
        "license": LICENSE,
        "input_files": pin["files"],
        "counts": dict(sorted(counters.items())),
        "outputs": {
            filename: hashlib.sha256((output_dir / filename).read_bytes()).hexdigest()
            for filename in ("roots.jsonl", "entries.jsonl", "ATTRIBUTION.txt")
        },
    }
    (output_dir / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(manifest["counts"], sort_keys=True))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Pinned Alpheios repository checkout")
    parser.add_argument("output", type=Path, help="New output directory, outside static assets")
    args = parser.parse_args()
    build(args.source, args.output)


if __name__ == "__main__":
    main()
