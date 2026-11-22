/** Private P7 staging only. Never publishes or infers approval from source glosses. */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { dictionaryPilot } from '../src/lib/content/dictionary-pilot.js';
import {
	adaptP4Snapshot,
	type P4Snapshot,
	type P4Decision
} from '../src/lib/domain/dictionary/p4-adapter.js';
import {
	reconcileDictionary,
	duplicateCandidates
} from '../src/lib/domain/dictionary/reconcile.js';

type PrivateLicenseReview = {
	status: 'reviewed-for-private-staging';
	rightsDisposition: 'research-only-no-redistribution';
	reviewedBy: string;
	reviewedOn: string;
	sourceTerms: string;
	attributionPlan: string;
	rightsNotes: string;
};

export type PrivateImportReview = {
	schema: 1;
	sha256: string;
	snapshot: string;
	publicationApproved: false;
	licenseReview: PrivateLicenseReview;
	reviewSummary: { pending: number; hold: number; ready: number };
	decisions: P4Decision[];
};

function nonempty(value: unknown): value is string {
	return (
		typeof value === 'string' &&
		!!value.trim() &&
		!['todo', 'tbd', 'pending', 'unknown', 'n/a', 'placeholder'].includes(
			value.trim().toLowerCase()
		)
	);
}

function dateValid(value: unknown) {
	return (
		typeof value === 'string' &&
		/^\d{4}-\d{2}-\d{2}$/.test(value) &&
		!Number.isNaN(Date.parse(value)) &&
		new Date(value).toISOString().slice(0, 10) === value
	);
}

/** The declared human review is a required input, not proof of legal or linguistic correctness. */
export function validatePrivateImportReview(snapshot: P4Snapshot, review: PrivateImportReview) {
	if (
		!review ||
		review.schema !== 1 ||
		review.publicationApproved !== false ||
		review.sha256 !== snapshot.source.sha256 ||
		review.snapshot !== snapshot.source.snapshot ||
		!Array.isArray(review.decisions) ||
		!review.decisions.length
	)
		throw new Error('Private staging requires explicit reviewed senses and a matching snapshot');
	const license = review.licenseReview;
	if (
		!license ||
		license.status !== 'reviewed-for-private-staging' ||
		license.rightsDisposition !== 'research-only-no-redistribution' ||
		!dateValid(license.reviewedOn) ||
		![
			license.reviewedBy,
			license.sourceTerms,
			license.attributionPlan,
			license.rightsNotes
		].every(nonempty)
	)
		throw new Error('Private staging requires structured rights review with a non-redistribution hold');
	const summary = review.reviewSummary;
	if (
		!summary ||
		![summary.pending, summary.hold, summary.ready].every(
			(value) => Number.isSafeInteger(value) && value >= 0
		) ||
		summary.ready !== review.decisions.length
	)
		throw new Error('Inconsistent private review summary');
	const upstreamIds = review.decisions.map((decision) => decision.lemmaId + ':' + decision.senseId);
	if (new Set(upstreamIds).size !== upstreamIds.length)
		throw new Error('Duplicate reviewed upstream sense ID');
}

/** Produces a draft envelope outside publication assets; no approval is inferred. */
export function preparePrivateStaging(snapshot: P4Snapshot, review: PrivateImportReview) {
	validatePrivateImportReview(snapshot, review);
	const entries = reconcileDictionary(dictionaryPilot, adaptP4Snapshot(snapshot, review.decisions));
	return {
		schema: 1 as const,
		reviewStatus: 'draft' as const,
		privateStagingOnly: true,
		publicationApproved: false,
		source: snapshot.source,
		licenseReview: review.licenseReview,
		reviewSummary: review.reviewSummary,
		entries,
		duplicateCandidates: duplicateCandidates(entries)
	};
}

if (import.meta.main) {
	const [snapshotPath, reviewPath, outputPath] = process.argv.slice(2);
	if (!snapshotPath || !reviewPath || !outputPath)
		throw new Error(
			'Usage: bun scripts/prepare-dictionary-import.ts <P4.json> <review.json> <output.json>'
		);
	const output = resolve(outputPath);
	const rel = relative(process.cwd(), output);
	if (!rel.startsWith('..' + '/') || isAbsolute(rel))
		throw new Error('Staging output must be outside the repository');
	if (output === resolve(snapshotPath) || output === resolve(reviewPath))
		throw new Error('Staging output must not overwrite either input');
	const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8')) as P4Snapshot;
	const review = JSON.parse(readFileSync(reviewPath, 'utf8')) as PrivateImportReview;
	const result = preparePrivateStaging(snapshot, review);
	writeFileSync(output, JSON.stringify(result) + '\n', { flag: 'wx', mode: 0o600 });
	console.log('Staged', result.entries.length, 'lemmas as private drafts; publication not approved.');
}
