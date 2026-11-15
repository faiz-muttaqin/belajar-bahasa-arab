import { describe, expect, it } from 'vitest';
import {
	assessBuilderChoices,
	chooseBuilderWord,
	chooseVerbFrame,
	contractForBuilderSlot,
	composeBuilderExample,
	initialBuilderState,
	optionsForBuilderSlot,
	searchBuilderChoices,
	searchBuilderChoiceAssessments,
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

	it('exposes D-02 provenance and slot morphology without promoting draft to approved', () => {
		const forms = [
			...optionsForBuilderSlot(initialBuilderState, 'subject'),
			...optionsForBuilderSlot(initialBuilderState, 'predicate'),
			...optionsForBuilderSlot(initialBuilderState, 'verb'),
			...optionsForBuilderSlot(initialBuilderState, 'agent'),
			...optionsForBuilderSlot(initialBuilderState, 'object')
		];
		for (const form of forms) {
			expect(form.evidence.kind).toBe('curated-example');
			expect(form.evidence.reviewStatus).toBe('draft');
			expect(form.evidence.sourceUrls.length).toBeGreaterThan(0);
			expect(form.evidence.note).toContain('tashih');
		}
		expect(optionsForBuilderSlot(initialBuilderState, 'subject')[0]!.features).toEqual({
			case: 'raf',
			number: 'singular',
			definiteness: 'definite',
			gender: 'masculine'
		});
		expect(optionsForBuilderSlot(initialBuilderState, 'verb')[0]!.features).toEqual({
			aspect: 'perfect',
			voice: 'active',
			number: 'singular',
			person: 3,
			gender: 'masculine'
		});
		expect(optionsForBuilderSlot(initialBuilderState, 'verb')[0]!.valency).toEqual([
			'msa-risalah',
			'msa-kitab'
		]);
		expect(optionsForBuilderSlot(initialBuilderState, 'object')[0]!.features.case).toBe('nasb');
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

	it('switches the same VSO actor between perfect and imperfect, with explicit case and mood', () => {
		const present = chooseVerbFrame(initialBuilderState, 'present');
		const example = composeBuilderExample('verbal', present);
		expect(example.tokens.map((token) => token.arabic)).toEqual(['يَكْتُبُ', 'الطَّالِبُ', 'الرِّسَالَةَ']);
		expect(example.tokens[0]!.marker).toContain('marfū‘');
		expect(example.tokens[1]!.marker).toBe('Rafa‘ · ḍamma');
		expect(example.tokens[2]!.marker).toBe('Naṣb · fatḥa');
	});

	it('applies lam/lan operators as independent tokens, without treating mood as noun case', () => {
		const negativePast = composeBuilderExample(
			'verbal',
			chooseVerbFrame(initialBuilderState, 'lam')
		);
		expect(negativePast.tokens.map((token) => token.arabic)).toEqual([
			'لَمْ',
			'يَكْتُبْ',
			'الطَّالِبُ',
			'الرِّسَالَةَ'
		]);
		expect(negativePast.translation).toContain('tidak menulis');
		const negativeFuture = composeBuilderExample(
			'verbal',
			chooseVerbFrame(initialBuilderState, 'lan')
		);
		expect(negativeFuture.tokens.map((token) => token.arabic)).toEqual([
			'لَنْ',
			'يَكْتُبَ',
			'الطَّالِبُ',
			'الرِّسَالَةَ'
		]);
		expect(negativeFuture.translation).toContain('tidak akan menulis');
	});

	it('removes the explicit actor in imperative and preserves the selected compatible object', () => {
		const state = chooseBuilderWord(initialBuilderState, 'verb', 'fiil-fataha').state;
		const command = composeBuilderExample('verbal', chooseVerbFrame(state, 'imperative'));
		expect(command.tokens.map((token) => token.arabic)).toEqual(['اِفْتَحْ', 'الْبَابَ']);
		expect(command.tokens.some((token) => token.slot === 'agent')).toBe(false);
		expect(command.translation).toBe('Bukalah pintu itu!');
		expect(command.explanation).toContain('أَنْتَ');
	});

	it('rejects undocumented frames and resets incompatible form on replacing the verb', () => {
		expect(() => chooseVerbFrame(initialBuilderState, 'imperative')).toThrow(
			'Unavailable verbal frame'
		);
		const jussive = chooseVerbFrame(initialBuilderState, 'lam');
		const result = chooseBuilderWord(jussive, 'verb', 'fiil-qaraa');
		expect(result.resetFrame).toBe(true);
		expect(result.state.verbFrame).toBe('past');
		expect(result.resetObject).toBe(false);
		expect(composeBuilderExample('verbal', result.state).tokens[0]!.arabic).toBe('قَرَأَ');
	});

	it('D-04a explains excluded semantic candidates without exposing them as selectable choices', () => {
		const opened = chooseBuilderWord(initialBuilderState, 'verb', 'fiil-fataha').state;
		const decisions = assessBuilderChoices(opened, 'object');
		expect(decisions.map(({ choice }) => choice.id)).toEqual([
			'msa-risalah', 'msa-kitab', 'bab'
		]);
		expect(decisions.find(({ choice }) => choice.id === 'msa-risalah')?.compatibility)
			.toMatchObject({
				allowed: false,
				reasons: [expect.objectContaining({ code: 'unlisted-collocation' })]
			});
		expect(decisions.find(({ choice }) => choice.id === 'bab')?.compatibility.allowed)
			.toBe(true);
		expect(searchBuilderChoiceAssessments(opened, 'object', 'رسالة')).toHaveLength(1);
		expect(searchBuilderChoices(opened, 'object', 'رسالة')).toEqual([]);
		expect(() => chooseBuilderWord(opened, 'object', 'msa-risalah'))
			.toThrow('Incompatible replacement');
	});

	it('D-04a contracts distinguish gender-dependent nominal khabar from object case', () => {
		const initial = contractForBuilderSlot(initialBuilderState, 'predicate');
		expect(initial.required).toMatchObject({
			gender: 'masculine', number: 'singular',
			definiteness: 'indefinite', case: 'raf'
		});
		const feminine = chooseBuilderWord(initialBuilderState, 'subject', 'msa-madrasah').state;
		expect(contractForBuilderSlot(feminine, 'predicate').required.gender).toBe('feminine');
		for (const candidate of assessBuilderChoices(feminine, 'predicate')) {
			expect(candidate.compatibility.allowed).toBe(true);
			expect(candidate.choice.features.gender).toBe('feminine');
			expect(candidate.compatibility.allowedExplanation).toContain('nakirah');
		}
		expect(contractForBuilderSlot(initialBuilderState, 'object').required.case).toBe('nasb');
		expect(contractForBuilderSlot(initialBuilderState, 'agent').required).toMatchObject({
			case: 'raf', gender: 'masculine', number: 'singular'
		});
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
