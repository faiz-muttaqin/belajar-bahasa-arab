import { describe, expect, it } from 'vitest';
import type { AnnotatedSentence } from './annotation.js';
import {
	resolveChangeSequence,
	stepAnnouncement,
	validateChangeSequences,
	type ChangeSequence,
	type ResolvedStep
} from './change-steps.js';

/** Synthetic fixtures for contract tests only; never shown to learners. */
function token(
	sentence: string,
	n: number,
	text: string,
	role: AnnotatedSentence['tokens'][number]['role'],
	extra: Partial<AnnotatedSentence['tokens'][number]> = {}
): AnnotatedSentence['tokens'][number] {
	return {
		id: `${sentence}.t${n}`,
		text,
		gloss: 'glos',
		wordClass: 'isim',
		wordClassReason: 'Alasan.',
		role,
		roleReason: 'Alasan.',
		...extra
	};
}

function sentence(id: string, tokens: AnnotatedSentence['tokens']): AnnotatedSentence {
	return {
		id,
		unit: 'phrase',
		origins: [{ kind: 'lesson', lessonSlug: 'fixture', group: 0, sentence: 0 }],
		translation: 'Terjemahan uji.',
		analysis: {
			sources: [{ label: 'Sumber uji', url: 'https://example.test/a', locator: 'Bab 1' }],
			usageType: 'independent-original',
			status: 'draft',
			limits: 'Hanya uji.'
		},
		ruleLinks: [],
		tokens,
		relations: []
	};
}

const sign = (value: string, kase: 'raf' | 'nasb' | 'jarr') => ({
	sign: value,
	case: kase,
	reason: 'Alasan.'
});

function fixtures() {
	const before = sentence('fx-a', [
		token('fx-a', 1, 'كِتَابُ', 'mudhaf', { finalVowel: sign('ḍammah', 'raf') }),
		token('fx-a', 2, 'الطَّالِبِ', 'mudhaf-ilaih', { finalVowel: sign('kasrah', 'jarr') })
	]);
	const after = sentence('fx-b', [
		token('fx-b', 1, 'فِي', 'harf-jar', { wordClass: 'harf' }),
		token('fx-b', 2, 'كِتَابِ', 'mudhaf', { finalVowel: sign('kasrah', 'jarr') }),
		token('fx-b', 3, 'الطَّالِبِ', 'mudhaf-ilaih', { finalVowel: sign('kasrah', 'jarr') })
	]);
	const sequence: ChangeSequence = {
		id: 'cs-fixture',
		title: 'Judul uji',
		intro: 'Pengantar uji.',
		placement: { kind: 'lesson', lessonSlug: 'fixture' },
		before: 'fx-a',
		after: 'fx-b',
		usageType: 'independent-original',
		status: 'draft',
		limits: 'Hanya uji.',
		steps: [
			{
				id: 'cs-fixture.s1',
				title: 'Tambah harf',
				changes: [{ after: 'fx-b.t1', aspect: 'added', summary: 'Harf muncul.' }],
				dependents: [],
				stays: [],
				reason: 'Alasan.',
				sources: [{ label: 'Sumber uji', url: 'https://example.test/a', locator: 'Bab 1' }]
			},
			{
				id: 'cs-fixture.s2',
				title: 'Akhir berubah',
				changes: [
					{ before: 'fx-a.t1', after: 'fx-b.t2', aspect: 'ending', summary: 'Ḍammah ke kasrah.' }
				],
				dependents: [],
				stays: [{ before: 'fx-a.t2', after: 'fx-b.t3', note: 'Tetap.' }],
				reason: 'Alasan.',
				sources: [{ label: 'Sumber uji', url: 'https://example.test/a', locator: 'Bab 2' }]
			}
		]
	};
	return { before, after, sequence };
}

const check = (sequence: ChangeSequence, sentences: AnnotatedSentence[]) =>
	validateChangeSequences([sequence], sentences);

describe('VP-03 change sequence contract', () => {
	it('accepts a well-formed sequence', () => {
		const { before, after, sequence } = fixtures();
		expect(check(sequence, [before, after])).toEqual([]);
	});

	it('keeps steps in order with stable ids', () => {
		const { before, after, sequence } = fixtures();
		const swapped = {
			...sequence,
			steps: [sequence.steps[1], sequence.steps[0]]
		} as ChangeSequence;
		expect(check(swapped, [before, after])).toEqual(
			expect.arrayContaining([expect.stringContaining('should be cs-fixture.s1')])
		);
	});

	it('requires every step to carry a source and a reason', () => {
		const { before, after, sequence } = fixtures();
		const [first, second] = sequence.steps;
		const noReason = { ...sequence, steps: [{ ...first, reason: ' ' }, second] } as ChangeSequence;
		expect(check(noReason, [before, after])).toContain('cs-fixture.s1: missing reason');

		const noSource = {
			...sequence,
			steps: [{ ...first, sources: [] }, second]
		} as unknown as ChangeSequence;
		expect(check(noSource, [before, after])).toContain('cs-fixture.s1: step has no source');

		const badUrl = {
			...sequence,
			steps: [
				{ ...first, sources: [{ label: 'x', url: 'http://example.test', locator: 'Bab' }] },
				second
			]
		} as ChangeSequence;
		expect(check(badUrl, [before, after])).toContain('cs-fixture.s1: source needs an https url');
	});

	it('rejects tokens that do not exist, including dependents', () => {
		const { before, after, sequence } = fixtures();
		const [first, second] = sequence.steps;
		const missing = {
			...sequence,
			steps: [
				first,
				{
					...second,
					dependents: [{ before: 'fx-a.t9', after: 'fx-b.t3', aspect: 'role', summary: 'x' }]
				}
			]
		} as ChangeSequence;
		expect(check(missing, [before, after])).toContain(
			'cs-fixture.s2: before token fx-a.t9 not found'
		);
	});

	it('rejects a claimed change that is not a difference between the annotations', () => {
		const { before, after, sequence } = fixtures();
		const [first, second] = sequence.steps;
		const same = {
			...sequence,
			steps: [
				first,
				{
					...second,
					changes: [
						{ before: 'fx-a.t2', after: 'fx-b.t3', aspect: 'ending', summary: 'Tidak berubah.' }
					]
				}
			]
		} as ChangeSequence;
		const errors = check(same, [before, after]);
		expect(errors.some((error) => error.includes('is written the same'))).toBe(true);

		const sameRole = {
			...sequence,
			steps: [
				first,
				{
					...second,
					changes: [{ before: 'fx-a.t2', after: 'fx-b.t3', aspect: 'role', summary: 'Sama.' }]
				}
			]
		} as ChangeSequence;
		expect(check(sameRole, [before, after]).some((error) => error.includes('role change'))).toBe(
			true
		);
	});

	it('requires an ending change to differ in sign or case and a pattern change to differ in sharaf', () => {
		const { before, after, sequence } = fixtures();
		const [first, second] = sequence.steps;
		const noVowel = {
			...sequence,
			steps: [
				first,
				{
					...second,
					changes: [{ before: 'fx-a.t1', after: 'fx-b.t2', aspect: 'pattern', summary: 'Pola.' }]
				}
			]
		} as ChangeSequence;
		expect(check(noVowel, [before, after]).some((error) => error.includes('sharaf'))).toBe(true);
	});

	it('limits added and dropped words to one side', () => {
		const { before, after, sequence } = fixtures();
		const [first, second] = sequence.steps;
		const bad = {
			...sequence,
			steps: [
				{
					...first,
					changes: [{ before: 'fx-a.t1', after: 'fx-b.t1', aspect: 'added', summary: 'x' }]
				},
				second
			]
		} as ChangeSequence;
		expect(check(bad, [before, after]).some((error) => error.includes('an added word'))).toBe(true);
	});

	it('requires every token of both sentences to appear in some step', () => {
		const { before, after, sequence } = fixtures();
		const [first, second] = sequence.steps;
		const partial = { ...sequence, steps: [first, { ...second, stays: [] }] } as ChangeSequence;
		const errors = check(partial, [before, after]);
		expect(errors).toContain('cs-fixture: fx-a.t2 is not in any step');
		expect(errors).toContain('cs-fixture: fx-b.t3 is not in any step');
	});

	it('requires a stay to be written the same on both sides', () => {
		const { before, after, sequence } = fixtures();
		const [first, second] = sequence.steps;
		const bad = {
			...sequence,
			steps: [first, { ...second, stays: [{ before: 'fx-a.t1', after: 'fx-b.t2', note: 'x' }] }]
		} as ChangeSequence;
		expect(
			check(bad, [before, after]).some((error) => error.includes('not written the same'))
		).toBe(true);
	});

	it('keeps status draft and states limits', () => {
		const { before, after, sequence } = fixtures();
		const wrong = { ...sequence, limits: '' } as ChangeSequence;
		expect(check(wrong, [before, after])).toContain('cs-fixture: sequence must state its limits');
	});

	it('resolves surfaces and marks for each step without inventing text', () => {
		const { before, after, sequence } = fixtures();
		const resolved = resolveChangeSequence(sequence, [before, after]);
		expect(resolved.steps.map((step) => step.number)).toEqual([1, 2]);

		const [one, two] = resolved.steps as [ResolvedStep, ResolvedStep];
		expect(one.changes[0]!.before).toBeUndefined();
		expect(one.changes[0]!.after?.text).toBe('فِي');
		expect(one.marks.after['fx-b.t1']).toBe('changing');

		expect(two.changes[0]!.before?.text).toBe('كِتَابُ');
		expect(two.changes[0]!.after?.text).toBe('كِتَابِ');
		expect(two.marks.before['fx-a.t1']).toBe('changing');
		expect(two.marks.before['fx-a.t2']).toBe('stays');
		expect(two.marks.after['fx-b.t3']).toBe('stays');
		expect(two.stays[0]!.before.text).toBe(two.stays[0]!.after.text);
	});

	it('throws when a sentence is missing so a page cannot show a step that points at nothing', () => {
		const { before, sequence } = fixtures();
		expect(() => resolveChangeSequence(sequence, [before])).toThrow(/not found/);
	});

	it('announces the step number, title and each change', () => {
		const { before, after, sequence } = fixtures();
		const resolved = resolveChangeSequence(sequence, [before, after]);
		expect(stepAnnouncement(resolved.steps[1]!, 2)).toBe(
			'Langkah 2 dari 2: Akhir berubah. Harakat akhir: كِتَابُ menjadi كِتَابِ.'
		);
		expect(stepAnnouncement(resolved.steps[0]!, 2)).toContain('Kata ditambahkan: فِي');
	});
});
