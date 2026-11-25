import { describe, expect, it } from 'vitest';
import { annotatedText } from '#lib/domain/grammar/annotation.js';
import { validateChangeSequences, type ResolvedStep } from '#lib/domain/grammar/change-steps.js';
import {
	changeSequences,
	changeSequencesForGrammarRule,
	changeSequencesForLesson,
	changeSequencesForPhraseRule
} from './change-sequences.js';
import { grammarAnnotations } from './grammar-annotations.js';
import { grammarRules } from './grammar-rules.js';
import { phraseRules } from './phrase-rules.js';
import { sentenceReadingLessons } from './lessons/sentence-reading.js';

describe('VP-03 pilot change sequences', () => {
	it('pass the change-step contract against the annotated sentences', () => {
		expect(validateChangeSequences(changeSequences, grammarAnnotations)).toEqual([]);
	});

	it('cover the three pilot pairs in order', () => {
		expect(
			changeSequences.map((sequence) => [sequence.before, sequence.after, sequence.steps.length])
		).toEqual([
			['ph-kitab-jadid-def', 'g1-kitab-jadid-khabar', 2],
			['g1-kitab-talib', 'ph-fi-kitab-talib', 2],
			['wc-penjaga-membuka', 'wc-pintu-dibuka', 3],
			['g1-kitab-talib', 'ph-raaytu-kitab-talib', 2],
			['ph-jaa-abu-talib', 'ph-raaytu-aba-talib', 2],
			['ph-jaat-muallimat', 'ph-raaytu-muallimat', 2]
		]);
	});

	it('shows only sentences that already exist as annotated, sourced content', () => {
		for (const sequence of changeSequences) {
			for (const id of [sequence.before, sequence.after]) {
				const found = grammarAnnotations.find((item) => item.id === id);
				expect(found, id).toBeDefined();
				expect(found?.analysis.sources.length).toBeGreaterThan(0);
				expect(annotatedText(found!)).not.toBe('');
			}
		}
	});

	it('gives every step a source and a reason, and every sequence draft status and limits', () => {
		for (const sequence of changeSequences) {
			expect(sequence.status).toBe('draft');
			expect(sequence.limits.length).toBeGreaterThan(40);
			for (const step of sequence.steps) {
				expect(step.reason.length).toBeGreaterThan(20);
				expect(step.sources.length).toBeGreaterThan(0);
			}
		}
	});

	it('has at least one step where another word changes with the main change', () => {
		const withDependents = changeSequences.flatMap((sequence) =>
			sequence.steps.filter((step) => step.dependents.length > 0)
		);
		expect(withDependents.length).toBeGreaterThan(0);
	});

	it('is placed on pages that exist and show the same Arabic', () => {
		for (const sequence of changeSequences) {
			const { placement } = sequence;
			if (placement.kind === 'grammar-rule')
				expect(grammarRules.some((rule) => rule.id === placement.ruleId)).toBe(true);
			if (placement.kind === 'phrase-rule')
				expect(phraseRules.some((rule) => rule.id === placement.ruleId)).toBe(true);
			if (placement.kind === 'lesson') {
				const lesson = sentenceReadingLessons.find((item) => item.slug === placement.lessonSlug);
				expect(lesson, placement.lessonSlug).toBeDefined();
				const arabic = lesson!.examples.map((example) => example.arabic.replace(/[.\s]+$/u, ''));
				const before = grammarAnnotations.find((item) => item.id === sequence.before)!;
				const after = grammarAnnotations.find((item) => item.id === sequence.after)!;
				expect(arabic).toContain(annotatedText(before));
				expect(arabic).toContain(annotatedText(after));
			}
		}
	});

	it('looks sequences up by page', () => {
		expect(changeSequencesForGrammarRule('mubtada-khabar').map((item) => item.id)).toEqual([
			'cs-sifat-ke-khabar'
		]);
		expect(changeSequencesForPhraseRule('idafah-jar').map((item) => item.id)).toEqual([
			'cs-fi-mudhaf'
		]);
		expect(changeSequencesForPhraseRule('idafah-nasb-marifah').map((item) => item.id)).toEqual([
			'cs-idafah-nasb'
		]);
		expect(changeSequencesForPhraseRule('asma-khamsa').map((item) => item.id)).toEqual([
			'cs-abu-aba'
		]);
		expect(changeSequencesForPhraseRule('muannath-salim').map((item) => item.id)).toEqual([
			'cs-muallimat-nasb'
		]);
		expect(changeSequencesForLesson('kalimat-aktif-dan-pasif').map((item) => item.id)).toEqual([
			'cs-aktif-ke-pasif'
		]);
		expect(changeSequencesForLesson('tidak-ada')).toEqual([]);
	});

	it('resolves the active to passive steps from the annotations', () => {
		const [sequence] = changeSequencesForLesson('kalimat-aktif-dan-pasif');
		const [verb, agent, object] = sequence!.steps as [ResolvedStep, ResolvedStep, ResolvedStep];
		expect([verb.changes[0]!.before?.text, verb.changes[0]!.after?.text]).toEqual(['فَتَحَ', 'فُتِحَ']);
		expect(agent.changes[0]!.before?.text).toBe('الْحَارِسُ');
		expect(agent.changes[0]!.after).toBeUndefined();
		expect(object.changes.map((change) => change.aspect)).toEqual(['role', 'ending']);
		expect([object.changes[1]!.before?.text, object.changes[1]!.after?.text]).toEqual([
			'الْبَابَ',
			'الْبَابُ'
		]);
	});

	it('shows kasrah in naṣb for the feminine sound plural and the alif of أَبَا', () => {
		const [muannath] = changeSequencesForPhraseRule('muannath-salim');
		const noun = muannath!.steps[1]!.changes.find((change) => change.aspect === 'ending')!;
		expect([noun.before?.text, noun.after?.text]).toEqual(['الْمُعَلِّمَاتُ', 'الْمُعَلِّمَاتِ']);
		const [father] = changeSequencesForPhraseRule('asma-khamsa');
		const form = father!.steps[1]!.changes.find((change) => change.aspect === 'form')!;
		expect([form.before?.text, form.after?.text]).toEqual(['أَبُو', 'أَبَا']);
	});
});
