/**
 * Human review records (ADR-004, D-7). Content may only be published with at least one
 * approving review by the right kind of reviewer. Pure TypeScript: no UI, no storage.
 */

export type ReviewerRole = 'arabic_teacher' | 'ustadz' | 'audio_listener';

export type ReviewDecision = 'approved' | 'changes_requested' | 'rejected';

export type ReviewRecord = {
	reviewer: string;
	role: ReviewerRole;
	/** ISO 8601 date, e.g. '2026-11-20'. */
	date: string;
	decision: ReviewDecision;
	notes?: string;
};

/**
 * True when the latest review from a reviewer of `role` approves the item. A later
 * "changes requested" or "rejected" review by that role withdraws an earlier approval.
 */
export function hasApprovingReview(
	reviews: readonly ReviewRecord[] | undefined,
	role: ReviewerRole
): boolean {
	const ofRole = (reviews ?? []).filter((r) => r.role === role && r.reviewer.trim() !== '');
	if (ofRole.length === 0) return false;
	const latest = [...ofRole].sort((a, b) => a.date.localeCompare(b.date)).at(-1);
	return latest?.decision === 'approved';
}
