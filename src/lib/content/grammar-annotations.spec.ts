import { describe, expect, it } from 'vitest';
import {
	annotatedText,
	validateAnnotatedSentences,
	type AnnotationOrigin
} from '#lib/domain/grammar/annotation.js';
import { analyzedText } from './lessons/analysis.js';
import { wordClassesLesson } from './lessons/word-classes.js';
import { grammarRules } from './grammar-rules.js';
import { phraseRules } from './phrase-rules.js';
import {
	annotationForLessonSentence,
	annotationsForGrammarRule,
	annotationsForLessonGroup,
	annotationsForPhraseRule,
	grammarAnnotations,
	phraseAnnotations,
	wordClassAnnotations
} from './grammar-annotations.js';
import { phraseEdgeAnnotations } from './phrase-edge-annotations.js';

function originOf(origin: AnnotationOrigin) {
	if (origin.kind === 'lesson') {
		const source = wordClassesLesson.analysis![origin.group]!.sentences[origin.sentence]!;
		return {
			text: analyzedText(source),
			translation: source.translation,
			glosses: source.words.map(([, meaning]) => meaning)
		};
	}
	const rules = origin.kind === 'phrase-rule' ? phraseRules : grammarRules;
	const rule = rules.find((r) => r.id === origin.ruleId)!;
	const example = (
		rule.examples as readonly {
			id: string;
			tokens: readonly { arabic: string; gloss: string }[];
			translation: string;
		}[]
	).find((e) => e.id === origin.exampleId)!;
	return {
		text: example.tokens.map((token) => token.arabic).join(' '),
		translation: example.translation,
		glosses: example.tokens.map((token) => token.gloss)
	};
}

describe('VP-01 pilot annotations', () => {
	it('pass the annotation contract', () => {
		expect(validateAnnotatedSentences(grammarAnnotations)).toEqual([]);
	});

	it('cover all five word-class lesson sentences, all six G-01 and every G-03 example', () => {
		expect(wordClassAnnotations).toHaveLength(5);
		expect(phraseAnnotations).toHaveLength(10);
		expect(phraseEdgeAnnotations).toHaveLength(34);
		expect(grammarAnnotations).toHaveLength(52);
		expect(annotationsForGrammarRule('nat-manut').map((s) => s.id)).toEqual([
			'ph-kitab-jadid',
			'ph-madrasa-kabira'
		]);
		expect(annotationsForGrammarRule('mubtada-khabar').map((s) => s.id)).toEqual([
			'g1-kitab-jadid-khabar',
			'g1-madrasa-kabira-khabar'
		]);
		expect(annotationsForGrammarRule('idafah').map((s) => s.id)).toEqual([
			'g1-kitab-talib',
			'ph-bab-al-bait'
		]);
		expect(annotationsForLessonGroup('isim-fiil-harf', 0)).toHaveLength(2);
		expect(annotationsForLessonGroup('isim-fiil-harf', 1)).toHaveLength(2);
		expect(annotationsForLessonGroup('isim-fiil-harf', 2)).toHaveLength(1);
		expect(annotationsForPhraseRule('naat-agreement')).toHaveLength(4);
		expect(annotationsForPhraseRule('idafah-jar')).toHaveLength(3);
		expect(annotationsForPhraseRule('perubahan-irab')).toHaveLength(3);
		// Every edge-case example of /kaidah/frasa/ has an annotation; `definite-idafah` shares g1-kitab-talib.
		const edgeRules = [
			['zharf-makan-zaman', 5],
			['muannath-salim', 6],
			['asma-khamsa', 4],
			['jamak-taksir-mamnu', 5],
			['maqshur-manqush', 5],
			['kata-mabni', 5],
			['idafah-nasb-marifah', 5]
		] as const;
		for (const [ruleId, count] of edgeRules)
			expect(annotationsForPhraseRule(ruleId), ruleId).toHaveLength(count);
		expect(annotationsForPhraseRule('idafah-nasb-marifah').map((s) => s.id)[1]).toBe(
			'g1-kitab-talib'
		);
		expect(annotationForLessonSentence('isim-fiil-harf', 2, 0)?.id).toBe('wc-kunci-di-tas');
	});

	it('invent no sentence: text, glosses and translation match the existing content', () => {
		for (const item of grammarAnnotations)
			for (const origin of item.origins) {
				const source = originOf(origin);
				// Mark order (shadda before or after a vowel) differs between content files; compare canonically.
				expect(annotatedText(item).normalize('NFC'), item.id).toBe(source.text.normalize('NFC'));
				expect(item.translation, item.id).toBe(source.translation);
				expect(
					item.tokens.map((token) => token.gloss),
					item.id
				).toEqual(source.glosses);
			}
	});

	it('annotate each existing source sentence only once', () => {
		const keys = grammarAnnotations.flatMap((item) => item.origins.map((o) => JSON.stringify(o)));
		expect(new Set(keys).size).toBe(keys.length);
	});

	it('mark every analysis as a draft with a specific, linkable source', () => {
		for (const item of grammarAnnotations) {
			expect(item.analysis.status).toBe('draft');
			expect(item.analysis.usageType).toBe('independent-original');
			for (const source of item.analysis.sources) {
				expect(source.url).toMatch(/^https:\/\//);
				expect(source.locator.length).toBeGreaterThan(5);
			}
		}
	});

	it('give a final vowel only to tokens whose case the annotation supports', () => {
		for (const item of grammarAnnotations) {
			for (const token of item.tokens) {
				if (token.wordClass !== 'isim') expect(token.finalVowel, token.id).toBeUndefined();
				if (token.finalVowel) expect(token.finalVowel.reason.length).toBeGreaterThan(10);
			}
		}
	});

	it('does not give a derived-form isim a role from its sharaf name alone', () => {
		const guard = grammarAnnotations
			.flatMap((item) => item.tokens)
			.filter((token) => token.sharaf?.kind === 'isim-fail');
		expect(guard.length).toBeGreaterThan(0);
		for (const token of guard) expect(token.sharaf!.note).toMatch(/bukan karena bentuknya/);
	});

	it('keep a subject pronoun inside the verb word instead of splitting it off', () => {
		const raaytu = phraseAnnotations
			.flatMap((item) => item.tokens)
			.find((token) => token.text === 'رَأَيْتُ')!;
		expect(raaytu.segments?.map((segment) => segment.text)).toEqual(['رَأَيْ', 'تُ']);
		expect(raaytu.segments?.at(-1)?.kind).toBe('attached-pronoun');
	});

	it('cover every relation type the pilot sources can support', () => {
		const types = new Set(grammarAnnotations.flatMap((item) => item.relations.map((r) => r.type)));
		for (const type of [
			'naat-manut',
			'mudhaf-mudhaf-ilaih',
			'jar-majrur',
			'mubtada-khabar',
			'fiil-fail',
			'fiil-naib-fail',
			'fiil-maful-bih'
		] as const)
			expect(types.has(type), type).toBe(true);
		// No pilot sentence has a pronoun with a referent inside the same text.
		expect(types.has('dhamir-marji')).toBe(false);
	});

	it('annotates the edge cases with the roles and case signs the rules teach', () => {
		const sign = (id: string, index: number) =>
			grammarAnnotations.find((item) => item.id === id)!.tokens[index]!.finalVowel?.sign;
		expect(sign('ph-raaytu-muallimat', 1)).toBe('kasrah');
		expect(sign('ph-jaa-abu-talib', 1)).toBe('wāw');
		expect(sign('ph-raaytu-aba-talib', 1)).toBe('alif');
		expect(sign('ph-sallamtu-abi-talib', 2)).toBe('yā’');
		expect(sign('ph-fi-madaris-kathira', 1)).toBe('fatḥah');
		expect(sign('ph-fi-al-madaris', 1)).toBe('kasrah');
		expect(sign('ph-raaytu-fata', 1)).toBe('fatḥah muqaddarah');
		expect(sign('ph-raaytu-qadiya', 1)).toBe('fatḥah ẓāhirah');
		const zharf = grammarAnnotations.find((item) => item.id === 'ph-wasala-qabla-dars')!;
		expect(zharf.tokens[2]!.role).toBe('zharf');
		expect(zharf.tokens[2]!.alsoRoles).toContain('mudhaf');
	});

	it('gives no case sign to a mabnī word and explains why', () => {
		const mabni = ['ph-huwa-talib', 'ph-hadha-kitab', 'ph-raaytu-hadha', 'ph-saaltu-an-hadha']
			.map((id) => grammarAnnotations.find((item) => item.id === id)!)
			.flatMap((item) => item.tokens)
			.filter((token) => token.note?.startsWith('Mabnī'));
		expect(mabni).toHaveLength(4);
		for (const token of mabni) expect(token.finalVowel).toBeUndefined();
	});
});
