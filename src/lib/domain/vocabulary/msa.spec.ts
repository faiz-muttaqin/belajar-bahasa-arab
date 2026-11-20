import { describe, expect, it } from 'vitest';
import { msaVocabulary } from '#lib/content/msa-vocabulary.js';
import { publishedVocabulary } from '#lib/content/vocabulary.js';
import { MSA_CLASSES, MSA_TOPICS, validateVocab } from './types.js';

describe('curated MSA nouns, adjectives and expressions', () => {
	it('contains 165 stable draft items from ten themes', () => {
		expect(msaVocabulary).toHaveLength(165);
		expect(Object.keys(MSA_TOPICS)).toHaveLength(10);
		expect(new Set(msaVocabulary.map((item) => item.id)).size).toBe(165);
		expect(publishedVocabulary('msa').length).toBe(165);
		expect(msaVocabulary.every((item) => item.reviewStatus === 'draft')).toBe(true);
		expect(msaVocabulary.every((item) => item.register === 'msa')).toBe(true);
		expect(msaVocabulary.flatMap(validateVocab)).toEqual([]);
	});

	it('does not confuse adjectives or forms of address with fiil', () => {
		const count = (kind: keyof typeof MSA_CLASSES) =>
			msaVocabulary.filter((item) => item.msa?.wordClass === kind).length;
		expect(count('noun')).toBe(119);
		expect(count('adjective')).toBe(34);
		expect(count('expression')).toBe(11);
		expect(count('particle')).toBe(1);
		expect(msaVocabulary.find((item) => item.id === 'msa-ya-nida')?.msa?.wordClass).toBe(
			'particle'
		);
	});

	it('stores selected lexical plurals and female adjectives without generating unknown forms', () => {
		const get = (id: string) => msaVocabulary.find((item) => item.id === `msa-${id}`);
		expect(get('imraah')?.msa?.plural).toEqual({ value: 'نِسَاءٌ', kind: 'lexical' });
		expect(get('kitab')?.msa?.plural?.kind).toBe('broken');
		expect(get('saghir')?.msa?.feminine).toBe('صَغِيرَةٌ');
		expect(get('qahwah')?.msa?.plural).toBeUndefined();
		expect(get('khubz')?.msa?.plural).toBeUndefined();
	});

	it('distinguishes borrowings from Arabic-derived neologisms', () => {
		const get = (id: string) => msaVocabulary.find((item) => item.id === `msa-${id}`)?.msa;
		expect(get('internet')?.formation).toBe('loanword');
		expect(get('hasub')?.formation).toBe('derived');
		expect(get('hasub')?.root).toBe('حسب');
		expect(get('hatif-dhaki')?.formation).toBe('compound');
	});

	it('includes the individually sourced P6 batch without promoting partial audits', () => {
		const batch = msaVocabulary.filter((item) =>
			item.research?.claims.some((claim) => claim.checkedOn === '2026-11-20')
		);
		expect(batch).toHaveLength(8);
		expect(batch.filter((item) => item.msa?.formation === 'loanword')).toHaveLength(5);
		expect(batch.every((item) => item.research?.status === 'partial')).toBe(true);
		expect(
			batch.every((item) =>
				item.research?.claims.every((claim) => item.sources.includes(claim.sourceUrl))
			)
		).toBe(true);
		const key = (item: (typeof msaVocabulary)[number]) =>
			item.arabic.normalize('NFC').replace(/\p{M}/gu, '') + '|' + item.msa?.wordClass;
		expect(new Set(msaVocabulary.map(key)).size).toBe(msaVocabulary.length);
	});

	it('does not permit a foreign-register classification or unsupported MSA subgroup', () => {
		const item = msaVocabulary[0]!;
		expect(
			validateVocab({ ...item, register: 'classical' }).map((issue) => issue.message)
		).toContain('MSA collection must use msa register');
		expect(validateVocab({ ...item, msa: undefined }).map((issue) => issue.message)).toContain(
			'MSA lexical metadata is required'
		);
	});
});
