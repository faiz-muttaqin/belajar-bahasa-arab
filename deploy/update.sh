#!/usr/bin/env bash
# Pull the latest main and build, but only when there is a new commit.
#
# Meant for a dedicated clone on the server (never a development checkout), run from cron or
# a systemd timer every few minutes. Each build goes into its own release folder and the
# `current` symlink moves only after the build succeeded, so a broken commit never takes the
# site down. See deploy/README.md.
#
# Settings (environment variables, all optional):
#   BRANCH        branch to follow                      (default: main)
#   REMOTE        git remote to fetch from              (default: origin)
#   RELEASES_DIR  where releases and `current` live     (default: <repo>/../belajar-bahasa-arab-releases)
#   KEEP          how many releases to keep             (default: 3)
#   POST_DEPLOY   command to run after a new release    (default: none, e.g. "sudo systemctl reload caddy")
#   FORCE=1       rebuild even if this commit was already built or failed before
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${BRANCH:-main}"
REMOTE="${REMOTE:-origin}"
RELEASES_DIR="${RELEASES_DIR:-$ROOT/../belajar-bahasa-arab-releases}"
KEEP="${KEEP:-3}"
LOCK_DIR="${TMPDIR:-/tmp}/belajar-bahasa-arab-update.lock"

log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }

# One run at a time: a slow build must not overlap with the next scheduled run.
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
	# A lock older than an hour is left over from a crashed run.
	if [ -n "$(find "$LOCK_DIR" -maxdepth 0 -mmin +60 2>/dev/null)" ]; then
		rmdir "$LOCK_DIR" && mkdir "$LOCK_DIR"
	else
		exit 0
	fi
fi
trap 'rmdir "$LOCK_DIR" 2>/dev/null || true' EXIT

mkdir -p "$RELEASES_DIR"
RELEASES_DIR="$(cd "$RELEASES_DIR" && pwd)"
cd "$ROOT"

# Cheap check first: one small fetch of one branch.
timeout_cmd=""
command -v timeout >/dev/null 2>&1 && timeout_cmd="timeout 120"
if ! $timeout_cmd git fetch --quiet "$REMOTE" "$BRANCH"; then
	log "fetch failed (network or GitHub limit); keeping the current release"
	exit 0
fi
sha="$(git rev-parse FETCH_HEAD)"
short="$(printf '%s' "$sha" | cut -c1-7)"

deployed="$(cat "$RELEASES_DIR/.deployed-sha" 2>/dev/null || true)"
failed="$(cat "$RELEASES_DIR/.failed-sha" 2>/dev/null || true)"
if [ "${FORCE:-0}" != "1" ]; then
	[ "$sha" = "$deployed" ] && exit 0
	if [ "$sha" = "$failed" ]; then
		log "$short failed to build earlier; waiting for a newer commit (FORCE=1 to retry)"
		exit 0
	fi
fi

log "new commit $short, building"
fail() {
	log "build of $short FAILED at: $1; the previous release stays live"
	printf '%s' "$sha" >"$RELEASES_DIR/.failed-sha"
	exit 1
}

# Refuses (instead of overwriting) if someone edited tracked files in this clone.
git checkout -q --detach "$sha" || fail "checkout"

# Toolchain: Node from .nvmrc through nvm, and Bun from PATH or ~/.bun.
if [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
	# shellcheck disable=SC1091
	. "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
	nvm use >/dev/null 2>&1 || nvm install >/dev/null 2>&1 || fail "nvm install"
	nvm use >/dev/null 2>&1 || fail "nvm use"
fi
[ -d "$HOME/.bun/bin" ] && PATH="$HOME/.bun/bin:$PATH"
command -v bun >/dev/null 2>&1 || fail "bun not found"

bun install --frozen-lockfile >/dev/null 2>&1 || fail "bun install"
bun run build >/dev/null 2>&1 || fail "bun run build"
[ -f build/index.html ] || fail "build/index.html missing"

release="$RELEASES_DIR/$short"
rm -rf "$release"
mkdir -p "$release"
cp -R build/. "$release/"
ln -sfn "$release" "$RELEASES_DIR/current"
printf '%s' "$sha" >"$RELEASES_DIR/.deployed-sha"
rm -f "$RELEASES_DIR/.failed-sha"
log "deployed $short -> $RELEASES_DIR/current"

# Keep the newest releases only.
ls -1dt "$RELEASES_DIR"/*/ 2>/dev/null | tail -n +"$((KEEP + 1))" | while read -r old; do
	[ "$old" != "$release/" ] && rm -rf "$old"
done

if [ -n "${POST_DEPLOY:-}" ]; then
	log "post-deploy: $POST_DEPLOY"
	bash -c "$POST_DEPLOY" || log "post-deploy command failed (the release is live anyway)"
fi
