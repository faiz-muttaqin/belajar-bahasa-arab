import { describe, expect, it } from 'vitest';
import { msaVocabulary } from '#lib/content/msa-vocabulary.js';
import { isPublishableVocab, requiredResearchFields, validateVocab } from '#lib/domain/vocabulary/types.js';
import {
	supportedResearchFields,
	validateResearchAudit,
	type ResearchAudit
} from './evidence.js';

const example = msaVocabulary.find((item) => item.id === 'msa-hasub')!;
const fields = requiredResearchFields(example);
const audit = example.research!;
const sources = fields.map((field) => ({
	field,
	assertion: `Checked ${field} as printed`,
	sourceUrl: 'https://en.wiktionary.org/wiki/حاسوب',
	section: 'Arabic > Noun',
	checkedOn: '2026-11-17',
	outcome: 'supports' as const
}));

describe('research evidence gate for general MSA', () => {
	it('displays only audited fields and does not claim all 157 MSA lemmas have been checked', () => {
		expect(msaVocabulary.filter((item) => item.research)).toHaveLength(5);
		expect(msaVocabulary.every((item) => item.reviewStatus === 'draft')).toBe(true);
		expect(audit.status).toBe('partial');
		expect(supportedResearchFields(audit)).toContain('root');
		expect(requiredResearchFields(example)).toContain('register');
		expect(isPublishableVocab(example)).toBe(false);
		expect(validateVocab(example)).toEqual([]);
	});

	it('permits full research coverage only for a sourced ordinary MSA entry', () => {
		const research: ResearchAudit = { status: 'research_verified', claims: sources };
		expect(validateResearchAudit(research, fields)).toEqual([]);
		expect(isPublishableVocab({ ...example, research })).toBe(true);
		expect(isPublishableVocab({ ...example, research, sources: [] })).toBe(false);
		expect(isPublishableVocab({ ...example, research, collection: 'shalat' })).toBe(false);
		expect(isPublishableVocab({ ...example, research, collection: 'quran' })).toBe(false);
	});

	it('fails closed on missing fields, glossary homepages and conflicts', () => {
		const missing: ResearchAudit = { status: 'research_verified', claims: sources.slice(1) };
		expect(validateResearchAudit(missing, fields)).toContain('Missing positive evidence for arabic');
		const generic: ResearchAudit = {
			status: 'research_verified',
			claims: sources.map((claim) =>
				claim.field === 'meaning'
					? { ...claim, sourceUrl: 'https://en.wiktionary.org/wiki/Wiktionary:Copyrights' }
					: claim
			)
		};
		expect(validateResearchAudit(generic, fields)).toContain('Non-specific source URL for meaning');
		const conflict: ResearchAudit = {
			status: 'research_verified',
			claims: [...sources, { ...sources[0]!, outcome: 'conflicts' }]
		};
		expect(validateResearchAudit(conflict, fields)).toContain('Unresolved research conflict for arabic');
	});

	it('does not promote partial or unsourced evidence through the research gate', () => {
		const incomplete: ResearchAudit = {
			status: 'partial',
			claims: [sources[0]!]
		};
		expect(validateResearchAudit(incomplete, fields)).toEqual([]);
		expect(isPublishableVocab({ ...example, research: incomplete })).toBe(false);
	});
});
