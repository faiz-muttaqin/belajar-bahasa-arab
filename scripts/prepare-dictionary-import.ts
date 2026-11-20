/** Offline staging only; never writes to static/. Use actual reviewed decisions, not synthetic fixtures. */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { dictionaryPilot } from '../src/lib/content/dictionary-pilot.js';
import { adaptP4Snapshot, type P4Snapshot, type P4Decision } from '../src/lib/domain/dictionary/p4-adapter.js';
import { reconcileDictionary, duplicateCandidates } from '../src/lib/domain/dictionary/reconcile.js';

const [snapshotPath, reviewPath, outputPath] = process.argv.slice(2);
if (!snapshotPath || !reviewPath || !outputPath)
	throw new Error('Usage: bun scripts/prepare-dictionary-import.ts <P4.json> <review.json> <output.json>');
const output = resolve(outputPath);
const rel = relative(process.cwd(), output);
if (!rel.startsWith('..' + '/') || isAbsolute(rel))
	throw new Error('Staging output must be outside the repository');
if (output === resolve(snapshotPath) || output === resolve(reviewPath))
	throw new Error('Staging output must not overwrite either input');
const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8')) as P4Snapshot;
const review = JSON.parse(readFileSync(reviewPath, 'utf8')) as {
	sha256: string;
	snapshot: string;
	licenseReview: string;
	decisions: P4Decision[];
};
if (review.sha256 !== snapshot.source.sha256 || review.snapshot !== snapshot.source.snapshot ||
	!review.licenseReview?.trim() || !Array.isArray(review.decisions) || !review.decisions.length)
	throw new Error('Review must identify the snapshot, document the license audit and select senses');
const entries = reconcileDictionary(dictionaryPilot, adaptP4Snapshot(snapshot, review.decisions));
writeFileSync(output, JSON.stringify({
	schema: 1,
	reviewStatus: 'draft',
	source: snapshot.source,
	licenseReview: review.licenseReview,
	entries,
	duplicateCandidates: duplicateCandidates(entries)
}) + '\n', { flag: 'wx' });
console.log('Staged', entries.length, 'lemmas; never automatically published.');
