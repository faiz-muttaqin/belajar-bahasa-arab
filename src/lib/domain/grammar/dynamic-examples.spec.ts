import { describe, expect, it } from 'vitest';
import {
	chooseBuilderWord,
	composeBuilderExample,
	initialBuilderState,
	optionsForBuilderSlot,
	searchBuilderChoices,
	validateBuilderRegistry
} from './dynamic-examples.js';
import { publishedVocabulary } from '#lib/content/vocabulary.js';
import { sharafEntries } from '#lib/content/sharaf.js';

describe('G-06 dynamic example slots', () => {
	it('sources all choices from current dictionary entries, with audited surface frames', () => {
		expect(validateBuilderRegistry()).toEqual([]);
		const words = [...publishedVocabulary('msa'), ...publishedVocabulary('harian')];
		const options = [
			...optionsForBuilderSlot(initialBuilderState, 'subject'),
			...optionsForBuilderSlot(initialBuilderState, 'predicate'),
			...optionsForBuilderSlot(initialBuilderState, 'verb'),
			...optionsForBuilderSlot(initialBuilderState, 'agent'),
			...optionsForBuilderSlot(initialBuilderState, 'object')
		];
		for (const option of options) {
			expect(option.arabic).toMatch(/[\u0621-\u064a]/);
			expect(option.gloss.trim()).not.toBe('');
			expect(option.lemma.trim()).not.toBe('');
			expect(
				option.source === 'sharaf'
					? sharafEntries.some((item) => item.id === option.id && item.lemma === option.lemma)
					: words.some((item) => item.id === option.id && item.arabic === option.lemma)
			).toBe(true);
		}
	});

	it('shows female adjectives when a feminine noun replaces the nominal subject', () => {
		const next = chooseBuilderWord(initialBuilderState, 'subject', 'msa-madrasah').state;
		const example = composeBuilderExample('nominal', next);
		expect(example.tokens.map((item) => item.arabic)).toEqual(['الْمَدْرَسَةُ', 'جَدِيدَةٌ']);
		expect(example.tokens.map((item) => item.marker)).toEqual([
			'Rafa‘ · ḍamma',
			'Rafa‘ · tanwin ḍamm'
		]);
		expect(example.translation).toContain('Sekolah itu baru.');
	});

	it('searches Arabic with or without harakat and the Indonesian meaning', () => {
		expect(
			searchBuilderChoices(initialBuilderState, 'subject', 'مدرسة').map((item) => item.id)
		).toEqual(['msa-madrasah']);
		expect(searchBuilderChoices(initialBuilderState, 'verb', 'قرأ').map((item) => item.id)).toEqual(
			['fiil-qaraa']
		);
		expect(
			searchBuilderChoices(initialBuilderState, 'predicate', 'besar').map((item) => item.id)
		).toEqual(['msa-kabir']);
		expect(
			searchBuilderChoices(initialBuilderState, 'verb', 'Bab 3').some(
				(item) => item.id === 'fiil-fataha'
			)
		).toBe(true);
	});

	it('switches incompatible objects automatically when choosing a different verb', () => {
		const next = chooseBuilderWord(initialBuilderState, 'verb', 'fiil-fataha');
		expect(next.resetObject).toBe(true);
		expect(next.state.object).toBe('bab');
		expect(composeBuilderExample('verbal', next.state).tokens.map((item) => item.arabic)).toEqual([
			'فَتَحَ',
			'الطَّالِبُ',
			'الْبَابَ'
		]);
	});

	it('prevents incompatible verb/object combinations and arbitrary ids', () => {
		const withOpen = chooseBuilderWord(initialBuilderState, 'verb', 'fiil-fataha').state;
		expect(optionsForBuilderSlot(withOpen, 'object').map((item) => item.id)).toEqual([
			'bab',
			'msa-kitab'
		]);
		expect(() => chooseBuilderWord(withOpen, 'object', 'msa-risalah')).toThrow(
			'Incompatible replacement'
		);
		expect(() => chooseBuilderWord(initialBuilderState, 'verb', 'not-in-lexicon')).toThrow(
			'Incompatible replacement'
		);
	});

	it('generates a compositional Indonesian meaning for both selected frames', () => {
		const nominal = composeBuilderExample('nominal', initialBuilderState);
		const verbal = composeBuilderExample('verbal', initialBuilderState);
		expect(nominal.translation).toBe('Buku itu baru.');
		expect(verbal.translation).toBe('Murid itu menulis surat itu.');
		expect(verbal.tokens[2]!.role).toBe('Maf‘ūl bih');
	});
});
