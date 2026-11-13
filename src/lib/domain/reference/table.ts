/**
 * Reference tables (e.g. a future "Tabel Tashrif Istilahi" or a table of ḥarf types).
 * Content contract only. Real tables must come from reviewed, sourced curriculum research
 * (docs/arabic-learning-pedagogy-ux-research-reissued.md §6.1a); never author rows here.
 */

import { hasApprovingReview, type ReviewRecord } from '#lib/domain/review.js';

export type ReviewStatus = 'fixture' | 'draft' | 'linguist_reviewed' | 'approved';

export type ReferenceColumn = {
	key: string;
	label: string;
	/** 'ar' cells render RTL with the Arabic face; 'id' cells are Indonesian. */
	lang: 'ar' | 'id';
	/** Columns that make sense to hide in memorisation (hafalan) mode. */
	hideable?: boolean;
};

export type ReferenceRow = {
	id: string;
	cells: Record<string, string>;
	/** Short Indonesian explanation shown in the row's disclosure. */
	explanation?: string;
};

export type ReferenceTableData = {
	id: string;
	title: string;
	caption: string;
	columns: ReferenceColumn[];
	rows: ReferenceRow[];
	reviewStatus: ReviewStatus;
	sources: string[];
	/** ADR-004 D-7: approving review by an Arabic teacher required before publishing. */
	reviews?: ReviewRecord[];
};

export type ValidationIssue = { rowId?: string; message: string };

/** Structural checks run in tests and, later, the build-time content validator. */
export function validateReferenceTable(table: ReferenceTableData): ValidationIssue[] {
	const issues: ValidationIssue[] = [];
	const keys = new Set(table.columns.map((c) => c.key));
	if (keys.size !== table.columns.length) issues.push({ message: 'Duplicate column key' });
	const rowIds = new Set<string>();
	for (const row of table.rows) {
		if (rowIds.has(row.id)) issues.push({ rowId: row.id, message: 'Duplicate row id' });
		rowIds.add(row.id);
		for (const key of keys) {
			if (!row.cells[key]?.trim()) issues.push({ rowId: row.id, message: `Empty cell: ${key}` });
		}
		for (const key of Object.keys(row.cells)) {
			if (!keys.has(key)) issues.push({ rowId: row.id, message: `Unknown column: ${key}` });
		}
	}
	if (table.reviewStatus === 'approved' && table.sources.length === 0) {
		issues.push({ message: 'Approved table without sources' });
	}
	return issues;
}

/** Only approved, valid tables with an approving teacher review may be rendered publicly. */
export function isPublishable(table: ReferenceTableData): boolean {
	return (
		table.reviewStatus === 'approved' &&
		validateReferenceTable(table).length === 0 &&
		hasApprovingReview(table.reviews, 'arabic_teacher')
	);
}
