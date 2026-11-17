/** Research provenance is claim-scoped. A URL is NOT proof that the claim is true. */
export const RESEARCH_FIELDS = [
	'arabic',
	'meaning',
	'wordClass',
	'register',
	'root',
	'plural',
	'feminine',
	'formation',
	'example'
] as const;

export type ResearchField = (typeof RESEARCH_FIELDS)[number];

export type ClaimEvidence = {
	field: ResearchField;
	/** Precise Indonesian claim checked by the researcher, not imported dictionary prose. */
	assertion: string;
	/** Specific entry or chapter, never a dictionary or course homepage. */
	sourceUrl: string;
	section: string;
	checkedOn: string;
	outcome: 'supports' | 'conflicts' | 'not_found';
};

export type ResearchAudit = {
	/** Partial means that at least one published field has not been audited. */
	status: 'partial' | 'research_verified';
	claims: readonly ClaimEvidence[];
};

function isSpecificSource(raw: string): boolean {
	try {
		const url = new URL(raw);
		if (url.protocol !== 'https:' || !url.hostname || !url.pathname || url.pathname === '/') {
			return false;
		}
		const path = decodeURIComponent(url.pathname).replace(/\/$/, '');
		if (/^\/(dictionary\/Arabic\/index\.html|wiki\/(Wiktionary:Copyrights|Main_Page)|en\/courses|free-content\/grammar)$/iu.test(path)) {
			return false;
		}
		return path.split('/').filter(Boolean).length >= 2;
	} catch {
		return false;
	}
}

export function validateResearchAudit(
	audit: ResearchAudit,
	required: readonly ResearchField[]
): string[] {
	const issues: string[] = [];
	const supported = new Set<ResearchField>();
	const blocked = new Set<ResearchField>();
	if (!audit.claims.length) issues.push('Research audit contains no claims');
	for (const claim of audit.claims) {
		if (!RESEARCH_FIELDS.includes(claim.field)) issues.push('Unknown evidence field');
		if (!required.includes(claim.field)) issues.push(`Research claim outside vocabulary fields: ${claim.field}`);
		if (!claim.assertion.trim() || !claim.section.trim()) {
			issues.push(`Missing assertion or source section for ${claim.field}`);
		}
		if (!isSpecificSource(claim.sourceUrl)) issues.push(`Non-specific source URL for ${claim.field}`);
		if (!/^\d{4}-\d{2}-\d{2}$/.test(claim.checkedOn) || Number.isNaN(Date.parse(claim.checkedOn))) {
			issues.push(`Invalid research date for ${claim.field}`);
		}
		if (claim.outcome === 'supports') supported.add(claim.field);
		else blocked.add(claim.field);
	}
	if (audit.status === 'research_verified') {
		for (const field of required) {
			if (!supported.has(field)) issues.push(`Missing positive evidence for ${field}`);
			if (blocked.has(field)) issues.push(`Unresolved research conflict for ${field}`);
		}
	}
	return issues;
}

export function supportedResearchFields(audit: ResearchAudit): ResearchField[] {
	const disputed = new Set(
		audit.claims.filter((claim) => claim.outcome !== 'supports').map((claim) => claim.field)
	);
	return [...new Set(audit.claims.filter((claim) => claim.outcome === 'supports').map((claim) => claim.field))].filter(
		(field) => !disputed.has(field)
	);
}
