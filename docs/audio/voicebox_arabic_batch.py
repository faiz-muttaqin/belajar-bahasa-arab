#!/usr/bin/env python3
"""Offline, editor-side batch generator for reviewed Arabic audio through Voicebox.

Reads a JSON list of reviewed Arabic utterances, asks a locally running Voicebox
server to synthesise each one with Chatterbox Multilingual (language "ar"),
encodes the result for the web and writes a manifest. Every clip is written with
reviewStatus "needs_human_review"; a human reviewer changes that later.

This script is NOT part of the website. It must never run in the frontend, a
server, or CI. It refuses to run when CI is set or when the website dev server
port is open. Standard library only; needs ffmpeg/ffprobe on PATH.

Usage:
  python3 voicebox_arabic_batch.py --input utterances.json --out ./out \
      --profile-id <voicebox profile id> \
      --voice "QA Arabic ref (synthetic Kokoro am_michael)" \
      --voice-consent "Synthetic Kokoro-82M voice am_michael, Apache-2.0; no real person"

Input JSON (array):
  [{"id": "qa-001", "arabicText": "مُعَلِّمٌ", "variant": "msa",
    "textVersion": "2026-11-13.1", "takes": 3}]
"""

from __future__ import annotations

import argparse
import ast
import datetime as dt
import hashlib
import json
import os
import re
import shutil
import socket
import subprocess
import sys
import time
import unicodedata
import urllib.error
import urllib.request
from pathlib import Path

REVIEW_PENDING = "needs_human_review"
VARIANTS = {"msa", "classical"}
HARAKAT = set("ًٌٍَُِّْٰ")
ARABIC_LETTER = re.compile(r"[ء-يٱ]")
LATIN_OR_DIGIT = re.compile(r"[A-Za-z0-9]")

ENCODINGS = {
    # Mono, 24 kHz source. Bitrates chosen from the smoke-test measurements.
    "opus": {"ext": "opus", "args": ["-c:a", "libopus", "-b:a", "32k", "-vbr", "on", "-application", "audio"]},
    "mp3": {"ext": "mp3", "args": ["-c:a", "libmp3lame", "-b:a", "64k", "-ac", "1"]},
}


def die(msg: str) -> None:
    print(f"error: {msg}", file=sys.stderr)
    sys.exit(2)


def port_open(port: int) -> bool:
    for host in ("127.0.0.1", "::1"):
        try:
            fam = socket.AF_INET6 if ":" in host else socket.AF_INET
            with socket.socket(fam, socket.SOCK_STREAM) as s:
                s.settimeout(0.3)
                if s.connect_ex((host, port)) == 0:
                    return True
        except OSError:
            pass
    return False


def http_json(url: str, payload: dict | None = None, timeout: float = 30) -> dict:
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        die(f"{url} -> HTTP {e.code}: {e.read().decode(errors='replace')[:300]}")
    except urllib.error.URLError as e:
        die(f"cannot reach Voicebox at {url}: {e.reason}. Is the backend running?")
    return {}


def http_download(url: str, dest: Path) -> None:
    with urllib.request.urlopen(url, timeout=60) as r, open(dest, "wb") as f:
        shutil.copyfileobj(r, f)


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for block in iter(lambda: f.read(1 << 16), b""):
            h.update(block)
    return h.hexdigest()


def duration_ms(path: Path) -> int:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
        check=True, capture_output=True, text=True,
    ).stdout.strip()
    return round(float(out) * 1000)


def unvocalised_letters(text: str) -> int:
    """Count Arabic letters with no haraka directly after them (informational only)."""
    count = 0
    for i, ch in enumerate(text):
        if ARABIC_LETTER.match(ch):
            nxt = text[i + 1] if i + 1 < len(text) else ""
            if nxt not in HARAKAT:
                count += 1
    return count


def engine_info(server: str, voicebox_dir: Path | None) -> tuple[str, dict]:
    """Build an engineVersion string and the engine's fixed sampling defaults."""
    root = http_json(f"{server}/")
    status = http_json(f"{server}/models/status")
    model = next((m for m in status.get("models", []) if m["model_name"] == "chatterbox-tts"), None)
    if not model:
        die("Voicebox does not list the chatterbox-tts model")
    repo = model["hf_repo_id"]
    parts = [f"voicebox {root.get('version', '?')}", repo]

    cache = Path(http_json(f"{server}/models/cache-dir")["path"])
    ref = cache / ("models--" + repo.replace("/", "--")) / "refs" / "main"
    if ref.exists():
        parts[-1] += "@" + ref.read_text().strip()[:12]

    defaults: dict = {}
    if voicebox_dir:
        dist = sorted((voicebox_dir / "backend" / "venv").glob("lib/python*/site-packages/mlx_audio-*.dist-info"))
        if dist:
            parts.append("mlx-audio " + dist[-1].name.split("-")[1].removesuffix(".dist"))
        src = voicebox_dir / "backend" / "backends" / "chatterbox_mlx_backend.py"
        if src.exists():
            for node in ast.walk(ast.parse(src.read_text())):
                if isinstance(node, ast.AnnAssign) and getattr(node.target, "id", "") == "_DEFAULTS":
                    defaults = ast.literal_eval(node.value)
    return "; ".join(parts), defaults


def wait_for(server: str, gen_id: str, timeout_s: int) -> dict:
    start = time.time()
    while time.time() - start < timeout_s:
        h = http_json(f"{server}/history/{gen_id}")
        if h.get("status") in ("completed", "failed"):
            return h
        time.sleep(1.5)
    die(f"generation {gen_id} timed out after {timeout_s}s")
    return {}


def write_manifest(out: Path, clips: list) -> None:
    manifest = {
        "schemaVersion": 1,
        "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "notice": "Unreviewed synthetic audio. Do not present as a pronunciation standard until reviewStatus is 'approved'.",
        "clips": clips,
    }
    tmp = out / "manifest.json.tmp"
    tmp.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp.replace(out / "manifest.json")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--input", required=True, type=Path)
    ap.add_argument("--out", required=True, type=Path)
    ap.add_argument("--profile-id", required=True, help="Voicebox voice profile id (GET /profiles)")
    ap.add_argument("--voice", required=True, help="Human-readable voice label for the manifest")
    ap.add_argument("--voice-consent", required=True,
                    help="Licence or consent record for the reference voice (who, what, where the signed consent is)")
    ap.add_argument("--server", default="http://127.0.0.1:17493")
    ap.add_argument("--voicebox-dir", type=Path, default=Path(os.environ.get("VOICEBOX_DIR", "~/git/voicebox")).expanduser())
    ap.add_argument("--format", choices=["opus", "mp3", "both"], default="mp3",
                    help="mp3 (default, plays everywhere), opus (half the size), or both")
    ap.add_argument("--takes", type=int, default=1, help="Default takes per utterance (input 'takes' overrides)")
    ap.add_argument("--seed-base", type=int, default=1000, help="Take n uses seed-base + n")
    ap.add_argument("--block-port", type=int, action="append", default=None,
                    help="Refuse to run while this port listens (default: 5173 and 4173, the website dev/preview servers)")
    ap.add_argument("--timeout", type=int, default=600, help="Seconds to wait per take")
    ap.add_argument("--force", action="store_true", help="Overwrite existing outputs")
    args = ap.parse_args()

    # Guards: editor-side only.
    if os.environ.get("CI"):
        die("CI is set. Voicebox audio is never generated in CI.")
    for port in args.block_port or [5173, 4173]:
        if port_open(port):
            die(f"port {port} is listening (website dev/preview server?). Stop it before generating audio.")
    for tool in ("ffmpeg", "ffprobe"):
        if not shutil.which(tool):
            die(f"{tool} not found on PATH")

    items = json.loads(args.input.read_text(encoding="utf-8"))
    if not isinstance(items, list) or not items:
        die("input must be a non-empty JSON array")
    seen = set()
    for it in items:
        for key in ("id", "arabicText", "variant", "textVersion"):
            if not it.get(key):
                die(f"utterance {it.get('id', '?')} is missing '{key}'")
        if it["id"] in seen:
            die(f"duplicate id {it['id']}")
        seen.add(it["id"])
        if it["variant"] not in VARIANTS:
            die(f"{it['id']}: variant must be one of {sorted(VARIANTS)}")
        if LATIN_OR_DIGIT.search(it["arabicText"]):
            die(f"{it['id']}: arabicText contains Latin letters or digits")
        if not ARABIC_LETTER.search(it["arabicText"]):
            die(f"{it['id']}: arabicText contains no Arabic letters")

    engine_version, engine_defaults = engine_info(args.server, args.voicebox_dir)
    formats = ["opus", "mp3"] if args.format == "both" else [args.format]
    out = args.out
    (out / "masters").mkdir(parents=True, exist_ok=True)
    clips = []
    # Resume: keep entries from an earlier run whose files are still present.
    previous: dict[tuple, list] = {}
    old_manifest = out / "manifest.json"
    if old_manifest.exists() and not args.force:
        for c in json.loads(old_manifest.read_text(encoding="utf-8")).get("clips", []):
            if c.get("outputPath") and (out / c["outputPath"]).exists():
                previous.setdefault((c["id"], c["take"], c["arabicText"], c["textVersion"]), []).append(c)

    for it in items:
        text = unicodedata.normalize("NFC", it["arabicText"].strip())
        if text != it["arabicText"]:
            print(f"note: {it['id']}: text normalised to NFC")
        bare = unvocalised_letters(text)
        if bare:
            print(f"note: {it['id']}: {bare} letter(s) carry no haraka. Expected for hamzat al-wasl, lam shamsiyyah and madd letters; anything else means the text is not fully vocalised.")
        for take in range(1, int(it.get("takes", args.takes)) + 1):
            seed = args.seed_base + take
            stem = f"{it['id']}/take-{take}"
            master = out / "masters" / f"{stem}.wav"
            targets = {f: out / f / f"{stem}.{ENCODINGS[f]['ext']}" for f in formats}
            kept = previous.get((it["id"], take, text, it["textVersion"]), [])
            if {c["settings"]["encoding"] for c in kept} >= set(formats):
                clips.extend(c for c in kept if c["settings"]["encoding"] in formats)
                print(f"skip {stem} (already in manifest)")
                continue
            if not args.force and any(p.exists() for p in [master, *targets.values()]):
                die(f"{stem} exists but is not in the manifest; use --force or a new --out")

            settings = {
                "language": "ar", "seed": seed, "normalize": True,
                "maxChunkChars": 800, "crossfadeMs": 0, "engineDefaults": engine_defaults,
            }
            t0 = time.time()
            gen = http_json(f"{args.server}/generate", {
                "profile_id": args.profile_id, "engine": "chatterbox", "language": "ar",
                "text": text, "seed": seed, "normalize": True, "crossfade_ms": 0,
            })
            hist = wait_for(args.server, gen["id"], args.timeout)
            if hist["status"] != "completed":
                print(f"FAILED {stem}: {hist.get('error')}", file=sys.stderr)
                clips.append({"id": it["id"], "take": take, "status": "failed", "error": hist.get("error")})
                continue
            master.parent.mkdir(parents=True, exist_ok=True)
            http_download(f"{args.server}/audio/{gen['id']}", master)
            elapsed = round(time.time() - t0, 1)

            for fmt, dest in targets.items():
                dest.parent.mkdir(parents=True, exist_ok=True)
                subprocess.run(
                    ["ffmpeg", "-y", "-v", "error", "-i", str(master), "-map_metadata", "-1", *ENCODINGS[fmt]["args"], str(dest)],
                    check=True,
                )
                clips.append({
                    "id": it["id"],
                    "take": take,
                    "arabicText": text,
                    "variant": it["variant"],
                    "engine": "chatterbox-multilingual (Voicebox engine 'chatterbox', MLX)",
                    "engineVersion": engine_version,
                    "voice": args.voice,
                    "voiceLicenceOrConsent": args.voice_consent,
                    "settings": {**settings, "encoding": fmt, "ffmpegArgs": ENCODINGS[fmt]["args"]},
                    "durationMs": duration_ms(dest),
                    "sha256": sha256(dest),
                    "outputPath": dest.relative_to(out).as_posix(),
                    "bytes": dest.stat().st_size,
                    "reviewStatus": REVIEW_PENDING,
                    "reviewer": None,
                    "textVersion": it["textVersion"],
                    "voiceboxGenerationId": gen["id"],
                    "generationSeconds": elapsed,
                })
            write_manifest(out, clips)  # after every take, so a crash loses nothing
            print(f"ok {stem} ({elapsed}s)")

    write_manifest(out, clips)
    print(f"wrote {out / 'manifest.json'} ({len(clips)} entries)")


if __name__ == "__main__":
    main()
