import { describe, expect, it } from 'vitest';
import {
	IRAB_CASE_LABELS,
	phraseRules,
	validatePhraseRules,
	type PhraseRule
} from './phrase-rules.js';

describe('G-03: sourced phrase and i‘rab lessons', () => {
	it('has twelve topics, stable anchors and original vocalized examples', () => {
		expect(phraseRules.map((rule) => rule.id)).toEqual([
			'marifah-nakirah',
			'naat-agreement',
			'idafah-jar',
			'perubahan-irab',
			'jumlah-dan-gender',
			'zharf-makan-zaman',
			'muannath-salim',
			'asma-khamsa',
			'jamak-taksir-mamnu',
			'maqshur-manqush',
			'kata-mabni',
			'idafah-nasb-marifah'
		]);
		expect(phraseRules.map((rule) => rule.examples.length)).toEqual([
			2, 4, 3, 3, 4, 5, 6, 4, 5, 5, 5, 5
		]);
		expect(phraseRules.every((rule) => rule.reviewStatus === 'draft')).toBe(true);
		expect(validatePhraseRules(phraseRules)).toEqual([]);
	});

	it('every token has Indonesian gloss and a visible role independent from its case color', () => {
		for (const rule of phraseRules) {
			expect(rule.sources.length).toBeGreaterThan(0);
			for (const example of rule.examples) {
				expect(example.translation.trim()).not.toBe('');
				for (const token of example.tokens) {
					expect(token.arabic).toMatch(/[\u0621-\u064a]/);
					expect(token.gloss.length).toBeGreaterThan(0);
					expect(token.role.length).toBeGreaterThan(0);
					if (token.irab) {
						expect(IRAB_CASE_LABELS[token.irab]).toBeTruthy();
						expect(token.marker).toBeTruthy();
					}
				}
			}
		}
	});

	it('shows raf, nasb and jarr on the same noun in three different contexts', () => {
		const rule = phraseRules.find((item) => item.id === 'perubahan-irab')!;
		const nouns = rule.examples.map((example) => example.tokens.at(-1)!);
		expect(nouns.map((noun) => noun.arabic)).toEqual(['الطَّالِبُ', 'الطَّالِبَ', 'الطَّالِبِ']);
		expect(nouns.map((noun) => noun.irab)).toEqual(['raf', 'nasb', 'jarr']);
	});

	it('distinguishes the cause of jarr in nested preposition and idafah examples', () => {
		const rule = phraseRules.find((item) => item.id === 'idafah-jar')!;
		const example = rule.examples.find((item) => item.id === 'preposition-idafah')!;
		expect(example.tokens.map((token) => token.arabic)).toEqual(['فِي', 'كِتَابِ', 'الطَّالِبِ']);
		expect(example.tokens.map((token) => token.irab)).toEqual([undefined, 'jarr', 'jarr']);
		expect(example.explanation).toContain('alasannya berbeda');
	});

	it('distinguishes dual and masculine sound plural case signs', () => {
		const rule = phraseRules.find((item) => item.id === 'jumlah-dan-gender')!;
		const endings = rule.examples.map((example) => example.tokens.at(-1)!);
		expect(endings.map((token) => token.marker)).toEqual(['alif', 'yā’', 'wāw', 'yā’']);
	});

	it('rejects incomplete gloss or missing case marker', () => {
		const first = phraseRules[0]!;
		const missingGloss: PhraseRule = {
			...first,
			examples: [
				{
					...first.examples[0]!,
					tokens: [{ ...first.examples[0]!.tokens[0]!, gloss: '' }]
				}
			]
		};
		expect(validatePhraseRules([missingGloss])).toContain(
			'Missing token gloss or role: marifah-nakirah/indefinite-book'
		);
		const missingMarker: PhraseRule = {
			...first,
			examples: [
				{
					...first.examples[0]!,
					tokens: [{ ...first.examples[0]!.tokens[0]!, marker: '' }]
				}
			]
		};
		expect(validatePhraseRules([missingMarker])).toContain(
			'Missing i‘rab sign: marifah-nakirah/indefinite-book'
		);
	});

	it('cites specific chapters, lessons and sections rather than a bare site', () => {
		for (const rule of phraseRules) {
			for (const source of rule.sources) {
				expect(source.locator, rule.id).toBeTruthy();
				expect(source.url).toMatch(/^https:\/\//);
			}
			const keys = rule.sources.map((source) => source.url + '|' + source.locator);
			expect(new Set(keys).size, rule.id).toBe(keys.length);
		}
		const hosts = new Set(
			phraseRules.flatMap((rule) => rule.sources.map((s) => new URL(s.url).host))
		);
		expect(hosts).toEqual(new Set(['ar.wikisource.org', 'madinaharabic.com']));
	});

	it('shows the kasrah-in-naṣb, wāw/alif/yā’ and fatḥa-in-jarr edge cases on stated forms', () => {
		const marker = (ruleId: string, exampleId: string, index: number) =>
			phraseRules
				.find((rule) => rule.id === ruleId)!
				.examples.find((example) => example.id === exampleId)!.tokens[index]!;
		expect(marker('muannath-salim', 'fem-plural-object', 1).arabic).toBe('الْمُعَلِّمَاتِ');
		expect(marker('muannath-salim', 'fem-plural-object', 1).irab).toBe('nasb');
		expect(marker('muannath-salim', 'fem-plural-object', 1).marker).toContain('kasra');
		expect(
			['father-raf', 'father-nasb', 'father-jarr'].map(
				(id, i) => marker('asma-khamsa', id, i === 2 ? 2 : 1).marker
			)
		).toEqual(['wāw', 'alif', 'yā’']);
		expect(marker('jamak-taksir-mamnu', 'mamnu-jarr', 1).marker).toContain('fatḥa');
		expect(marker('jamak-taksir-mamnu', 'mamnu-definite', 1).marker).toBe('kasra');
	});

	it('never marks a mabnī word with a case sign', () => {
		const rule = phraseRules.find((item) => item.id === 'kata-mabni')!;
		for (const example of rule.examples)
			for (const token of example.tokens)
				if (token.role.includes('mabnī') && !token.role.includes('muḍāf +'))
					expect(token.irab, token.arabic).toBeUndefined();
	});
});
