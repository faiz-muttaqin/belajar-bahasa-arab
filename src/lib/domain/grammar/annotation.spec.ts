import { describe, expect, it } from 'vitest';
import {
	annotatedText,
	relatedTokenIds,
	relationsOf,
	stripAnnotationMarks,
	validateAnnotatedSentences,
	type AnnotatedSentence
} from './annotation.js';

/** Synthetic fixture for contract tests only; never shown to learners. */
function fixture(): AnnotatedSentence {
	return {
		id: 'fx-one',
		unit: 'sentence',
		origins: [{ kind: 'lesson', lessonSlug: 'fixture', group: 0, sentence: 0 }],
		translation: 'Terjemahan uji.',
		analysis: {
			sources: [{ label: 'Sumber uji', url: 'https://example.test/bab-1', locator: 'Bab 1' }],
			usageType: 'independent-original',
			status: 'draft',
			limits: 'Hanya untuk uji kontrak.'
		},
		ruleLinks: [],
		tokens: [
			{
				id: 'fx-one.t1',
				text: 'الْأُولَى',
				gloss: 'satu',
				wordClass: 'isim',
				wordClassReason: 'Alasan.',
				role: 'mubtada',
				roleReason: 'Alasan.',
				segments: [
					{ text: 'الْ', kind: 'definite-article', note: 'Artikel.' },
					{ text: 'أُولَى', kind: 'stem', note: 'Batang.' }
				]
			},
			{
				id: 'fx-one.t2',
				text: 'ثَانِيَةٌ',
				gloss: 'dua',
				wordClass: 'isim',
				wordClassReason: 'Alasan.',
				role: 'khabar',
				roleReason: 'Alasan.'
			},
			{
				id: 'fx-one.t3',
				text: 'ثَالِثَةٌ',
				gloss: 'tiga',
				wordClass: 'isim',
				wordClassReason: 'Alasan.',
				role: 'naat',
				roleReason: 'Alasan.'
			}
		],
		relations: [
			{
				id: 'fx-one.r1',
				type: 'mubtada-khabar',
				from: ['fx-one.t1'],
				to: ['fx-one.t2'],
				reason: 'Alasan.'
			}
		]
	};
}

const clone = (): AnnotatedSentence => structuredClone(fixture());

describe('VP-01 annotation contract', () => {
	it('accepts a well-formed sentence', () => {
		expect(validateAnnotatedSentences([fixture()])).toEqual([]);
	});

	it('keeps the written text with harakat and joins tokens with single spaces', () => {
		expect(annotatedText(fixture())).toBe('الْأُولَى ثَانِيَةٌ ثَالِثَةٌ');
		expect(stripAnnotationMarks('الْأُولَى')).toBe('الأولى');
	});

	it('requires unique sentence ids', () => {
		const errors = validateAnnotatedSentences([fixture(), fixture()]);
		expect(errors).toContain('fx-one: duplicate sentence id');
		expect(errors).toContain('fx-one.t1: duplicate token id');
		expect(errors).toContain('fx-one.r1: duplicate relation id');
	});

	it('requires token and relation ids that follow the sentence id and are stable', () => {
		const sentence = clone();
		(sentence.tokens[1] as { id: string }).id = 'fx-one.t9';
		(sentence.relations[0] as { id: string }).id = 'r1';
		const errors = validateAnnotatedSentences([sentence]);
		expect(errors.some((e) => e.includes('token id fx-one.t9 should be fx-one.t2'))).toBe(true);
		expect(errors.some((e) => e.includes('relation id r1 should be fx-one.r1'))).toBe(true);
	});

	it('rejects relations that point to a missing token', () => {
		const sentence = clone();
		(sentence.relations[0] as { to: readonly string[] }).to = ['fx-one.t7'];
		expect(validateAnnotatedSentences([sentence])).toContain(
			'fx-one.r1: to points to missing token fx-one.t7'
		);
	});

	it('rejects a relation that does not match the roles of its tokens', () => {
		const sentence = clone();
		(sentence.relations[0] as { to: readonly string[] }).to = ['fx-one.t3'];
		expect(
			validateAnnotatedSentences([sentence]).some((e) => e.includes('not valid for mubtada-khabar'))
		).toBe(true);
	});

	it('lets a phrase role or another role satisfy a relation end', () => {
		const sentence = clone();
		const third = sentence.tokens[2] as { role: string; partOf?: string; alsoRoles?: string[] };
		third.role = 'harf-jar';
		third.partOf = 'khabar';
		expect(validateAnnotatedSentences([sentence])).toEqual([]);
		(sentence.relations[0] as { to: readonly string[] }).to = ['fx-one.t2', 'fx-one.t3'];
		expect(validateAnnotatedSentences([sentence])).toEqual([]);
	});

	it('requires every analysis to carry a specific source, usage type, status and limits', () => {
		const noSource = clone();
		(noSource.analysis as { sources: unknown }).sources = [];
		expect(validateAnnotatedSentences([noSource])).toContain('fx-one: analysis has no source');

		const vague = clone();
		(vague.analysis.sources[0] as { locator: string }).locator = ' ';
		expect(validateAnnotatedSentences([vague])).toContain(
			'fx-one: source needs a chapter or lesson'
		);

		const http = clone();
		(http.analysis.sources[0] as { url: string }).url = 'http://example.test';
		expect(validateAnnotatedSentences([http])).toContain('fx-one: source needs an https url');

		const usage = clone();
		(usage.analysis as { usageType: string }).usageType = 'copied';
		expect(validateAnnotatedSentences([usage])).toContain('fx-one: unknown usage type');

		const status = clone();
		(status.analysis as { status: string }).status = 'approved';
		expect(validateAnnotatedSentences([status])).toContain(
			'fx-one: status must be draft until review'
		);

		const limits = clone();
		(limits.analysis as { limits: string }).limits = '';
		expect(validateAnnotatedSentences([limits])).toContain(
			'fx-one: analysis must state its limits'
		);
	});

	it('never turns an attached word into several tokens or segments that change the text', () => {
		const split = clone();
		(split.tokens[0] as { text: string }).text = 'الْ أُولَى';
		const errors = validateAnnotatedSentences([split]);
		expect(errors).toContain('fx-one.t1: a token is exactly one written word');
		expect(errors).toContain('fx-one.t1: segments must add up to the written word');

		const lossy = clone();
		(lossy.tokens[0]!.segments as unknown as { text: string }[])[1]!.text = 'أُولَ';
		expect(validateAnnotatedSentences([lossy])).toContain(
			'fx-one.t1: segments must add up to the written word'
		);
	});

	it('finds related tokens from either end of a relation', () => {
		const sentence = fixture();
		expect(relationsOf(sentence, 'fx-one.t2')).toHaveLength(1);
		expect(relatedTokenIds(sentence, 'fx-one.t1')).toEqual(['fx-one.t2']);
		expect(relatedTokenIds(sentence, 'fx-one.t2')).toEqual(['fx-one.t1']);
		expect(relatedTokenIds(sentence, 'fx-one.t3')).toEqual([]);
	});

	it('supports a pronoun–referent relation without a role constraint', () => {
		const sentence = clone();
		sentence.relations = [
			{
				id: 'fx-one.r1',
				type: 'dhamir-marji',
				from: ['fx-one.t2'],
				to: ['fx-one.t1'],
				reason: 'Alasan.'
			}
		];
		expect(validateAnnotatedSentences([sentence])).toEqual([]);
	});
});
