/**
 * D-05a: auditable, static-first inline variant registry for G-01 and G-03.
 *
 * Every proposed output is an EXISTING, complete example from curriculum data.
 * An individual word can open the picker, but the whole frame (including its
 * dependent adjective / possessor) changes together; we do not synthesize
 * inflections or mix arbitrary dictionary lemmas in unreviewed constructions.
 */
import { grammarRules, type GrammarExample } from '#lib/content/grammar-rules.js';
import { phraseRules, type PhraseExample } from '#lib/content/phrase-rules.js';
import { normalizeArabicSearch } from '#lib/domain/sharaf/lexicon.js';
import {
	evaluateAdjectiveAgreement,
	evaluateSlotCandidate,
	type ConstraintReason
} from './grammar-constraints.js';
import {
	evaluateIdafa,
	evaluatePrepositionalPhrase,
	type RelationWord
} from './phrase-relation-constraints.js';
import type { MorphFeatures, WordClass } from './lexeme-forms.js';

export type InlineExampleSource = 'grammar' | 'phrase';
type FrameKind = 'naat' | 'khabar' | 'idafa' | 'definiteness' | 'preposition';
export type InlineFrameSpec = {
	source: InlineExampleSource;
	ruleId: string;
	exampleId: string;
	family: string;
	kind: FrameKind;
	/** Exact Arabic surfaces from the original authored example; fail closed if changed. */
	arabic: readonly string[];
	lexemeIds: readonly string[];
	classes: readonly WordClass[];
	/** Curator-supplied, scoped morphology; not parsed from the example spelling. */
	features: readonly MorphFeatures[];
	pluralAnimacy?: 'human' | 'nonhuman';
};

/**
 * Only complete, recorded examples. Definite and indefinite adjective phrases
 * must NEVER be mixed token-by-token, and broken plurals are not generalized.
 */
const frames: readonly InlineFrameSpec[] = [
	{
		source: 'grammar', ruleId: 'nat-manut', exampleId: 'sifat-nakirah',
		family: 'g01-naat', kind: 'naat',
		arabic: ['كِتَابٌ', 'جَدِيدٌ'], lexemeIds: ['msa-kitab', 'msa-jadid'],
		classes: ['noun', 'adjective'],
		features: [
			{ gender: 'masculine', number: 'singular', case: 'raf', definiteness: 'indefinite' },
			{ gender: 'masculine', number: 'singular', case: 'raf', definiteness: 'indefinite' }
		]
	},
	{
		source: 'grammar', ruleId: 'nat-manut', exampleId: 'sifat-feminin',
		family: 'g01-naat', kind: 'naat',
		arabic: ['مَدْرَسَةٌ', 'كَبِيرَةٌ'], lexemeIds: ['msa-madrasah', 'msa-kabir'],
		classes: ['noun', 'adjective'],
		features: [
			{ gender: 'feminine', number: 'singular', case: 'raf', definiteness: 'indefinite' },
			{ gender: 'feminine', number: 'singular', case: 'raf', definiteness: 'indefinite' }
		]
	},
	{
		source: 'grammar', ruleId: 'mubtada-khabar', exampleId: 'khabar-buku',
		family: 'g01-khabar', kind: 'khabar',
		arabic: ['الْكِتَابُ', 'جَدِيدٌ'], lexemeIds: ['msa-kitab', 'msa-jadid'],
		classes: ['noun', 'adjective'],
		features: [
			{ gender: 'masculine', number: 'singular', case: 'raf', definiteness: 'definite' },
			{ gender: 'masculine', number: 'singular', case: 'raf', definiteness: 'indefinite' }
		]
	},
	{
		source: 'grammar', ruleId: 'mubtada-khabar', exampleId: 'khabar-sekolah',
		family: 'g01-khabar', kind: 'khabar',
		arabic: ['الْمَدْرَسَةُ', 'كَبِيرَةٌ'], lexemeIds: ['msa-madrasah', 'msa-kabir'],
		classes: ['noun', 'adjective'],
		features: [
			{ gender: 'feminine', number: 'singular', case: 'raf', definiteness: 'definite' },
			{ gender: 'feminine', number: 'singular', case: 'raf', definiteness: 'indefinite' }
		]
	},
	{
		source: 'grammar', ruleId: 'idafah', exampleId: 'idafah-buku',
		family: 'g01-idafa', kind: 'idafa',
		arabic: ['كِتَابُ', 'الطَّالِبِ'], lexemeIds: ['msa-kitab', 'msa-talib'],
		classes: ['noun', 'noun'],
		features: [
			{ number: 'singular', case: 'raf' },
			{ number: 'singular', case: 'jarr', definiteness: 'definite' }
		]
	},
	{
		source: 'grammar', ruleId: 'idafah', exampleId: 'idafah-pintu',
		family: 'g01-idafa', kind: 'idafa',
		arabic: ['بَابُ', 'الْبَيْتِ'], lexemeIds: ['bab', 'msa-bayt'],
		classes: ['noun', 'noun'],
		features: [
			{ number: 'singular', case: 'raf' },
			{ number: 'singular', case: 'jarr', definiteness: 'definite' }
		]
	},
	{
		source: 'phrase', ruleId: 'marifah-nakirah', exampleId: 'indefinite-book',
		family: 'g03-definiteness', kind: 'definiteness',
		arabic: ['كِتَابٌ'], lexemeIds: ['msa-kitab'], classes: ['noun'],
		features: [{ number: 'singular', case: 'raf', definiteness: 'indefinite' }]
	},
	{
		source: 'phrase', ruleId: 'marifah-nakirah', exampleId: 'definite-book',
		family: 'g03-definiteness', kind: 'definiteness',
		arabic: ['الْكِتَابُ'], lexemeIds: ['msa-kitab'], classes: ['noun'],
		features: [{ number: 'singular', case: 'raf', definiteness: 'definite' }]
	},
	{
		source: 'phrase', ruleId: 'naat-agreement', exampleId: 'indefinite-adjective',
		family: 'g03-naat', kind: 'naat',
		arabic: ['كِتَابٌ', 'جَدِيدٌ'], lexemeIds: ['msa-kitab', 'msa-jadid'],
		classes: ['noun', 'adjective'],
		features: [
			{ gender: 'masculine', number: 'singular', case: 'raf', definiteness: 'indefinite' },
			{ gender: 'masculine', number: 'singular', case: 'raf', definiteness: 'indefinite' }
		]
	},
	{
		source: 'phrase', ruleId: 'naat-agreement', exampleId: 'definite-adjective',
		family: 'g03-naat', kind: 'naat',
		arabic: ['الْكِتَابُ', 'الْجَدِيدُ'], lexemeIds: ['msa-kitab', 'msa-jadid'],
		classes: ['noun', 'adjective'],
		features: [
			{ gender: 'masculine', number: 'singular', case: 'raf', definiteness: 'definite' },
			{ gender: 'masculine', number: 'singular', case: 'raf', definiteness: 'definite' }
		]
	},
	{
		source: 'phrase', ruleId: 'naat-agreement', exampleId: 'feminine-adjective',
		family: 'g03-naat', kind: 'naat',
		arabic: ['مَدْرَسَةٌ', 'كَبِيرَةٌ'], lexemeIds: ['msa-madrasah', 'msa-kabir'],
		classes: ['noun', 'adjective'],
		features: [
			{ gender: 'feminine', number: 'singular', case: 'raf', definiteness: 'indefinite' },
			{ gender: 'feminine', number: 'singular', case: 'raf', definiteness: 'indefinite' }
		]
	},
	{
		source: 'phrase', ruleId: 'naat-agreement', exampleId: 'nonhuman-plural',
		family: 'g03-naat', kind: 'naat',
		arabic: ['كُتُبٌ', 'جَدِيدَةٌ'], lexemeIds: ['msa-kitab', 'msa-jadid'],
		classes: ['noun', 'adjective'], pluralAnimacy: 'nonhuman',
		features: [
			{ gender: 'masculine', number: 'plural', case: 'raf', definiteness: 'indefinite' },
			{ gender: 'feminine', number: 'singular', case: 'raf', definiteness: 'indefinite' }
		]
	},
	{
		source: 'phrase', ruleId: 'idafah-jar', exampleId: 'preposition-house',
		family: 'g03-jar', kind: 'preposition',
		arabic: ['فِي', 'الْبَيْتِ'], lexemeIds: ['fi', 'msa-bayt'],
		classes: ['particle', 'noun'],
		features: [{}, { number: 'singular', case: 'jarr', definiteness: 'definite' }]
	},
	{
		source: 'phrase', ruleId: 'idafah-jar', exampleId: 'preposition-idafah',
		family: 'g03-jar', kind: 'preposition',
		arabic: ['فِي', 'كِتَابِ', 'الطَّالِبِ'],
		lexemeIds: ['fi', 'msa-kitab', 'msa-talib'],
		classes: ['particle', 'noun', 'noun'],
		features: [
			{},
			{ number: 'singular', case: 'jarr' },
			{ number: 'singular', case: 'jarr', definiteness: 'definite' }
		]
	}
];

function findGrammarExample(frame: InlineFrameSpec): GrammarExample | undefined {
	return grammarRules.find((rule) => rule.id === frame.ruleId)?.examples.find((example) => example.id === frame.exampleId);
}

function findPhraseExample(frame: InlineFrameSpec): PhraseExample | undefined {
	return phraseRules.find((rule) => rule.id === frame.ruleId)?.examples.find((example) => example.id === frame.exampleId);
}

function sourced(frame: InlineFrameSpec) {
	const grammar = frame.source === 'grammar'
		? grammarRules.find((rule) => rule.id === frame.ruleId)
		: undefined;
	const phrase = frame.source === 'phrase'
		? phraseRules.find((rule) => rule.id === frame.ruleId)
		: undefined;
	const example = grammar?.examples.find((item) => item.id === frame.exampleId)
		?? phrase?.examples.find((item) => item.id === frame.exampleId);
	const sources = grammar?.sources.map((item) => item.url) ?? phrase?.sources.map((item) => item.url) ?? [];
	return { example, sources };
}

function word(frame: InlineFrameSpec, index: number, sourceUrls: readonly string[]): RelationWord {
	return {
		id: frame.lexemeIds[index]!,
		text: frame.arabic[index]!,
		wordClass: frame.classes[index]!,
		features: frame.features[index]!,
		evidence: {
			kind: 'curated-example', reviewStatus: 'draft',
			sourceUrls, note: 'Bentuk contoh dari teks kurikulum saat ini; menunggu tashih pengajar.'
		}
	};
}

export type InlineExampleAssessment = {
	id: string;
	surfaces: readonly string[];
	glosses: readonly string[];
	translation: string;
	allowed: boolean;
	reasons: readonly ConstraintReason[];
	sourceUrls: readonly string[];
	/** Relation-specific summary, not approval of a new synthetic phrase. */
	explanation: string;
};

/** Fail closed if any current example spelling or metadata differs from the curator contract. */
export function assessInlineFrame(frame: InlineFrameSpec): InlineExampleAssessment {
	const { example, sources } = sourced(frame);
	const tokens = example?.tokens ?? [];
	const reasons: ConstraintReason[] = [];
	if (
		!example || !sources.length || !sources.every((url) => url.startsWith('https://')) ||
		frame.arabic.length !== tokens.length ||
		frame.lexemeIds.length !== tokens.length ||
		frame.classes.length !== tokens.length ||
		frame.features.length !== tokens.length ||
		tokens.some((token, i) => token.arabic !== frame.arabic[i])
	) {
		reasons.push({
			code: 'unverified-surface',
			message: 'Bentuk contoh berubah atau data per-slot belum lengkap; pilihan ini perlu audit ulang.'
		});
	}
	const words = frame.arabic.map((_, index) => word(frame, index, sources));
	for (const item of words) {
		reasons.push(
			...evaluateSlotCandidate({
				expectedClass: item.wordClass,
				required: item.features,
				explanation: 'Bentuk lengkap harus ada di contoh sumber.'
			}, item).reasons
		);
	}
	let explanation = 'Pilihan menggunakan seluruh contoh yang telah dicatat, bukan merangkai bentuk baru.';
	if (frame.kind === 'naat' || frame.kind === 'khabar') {
		if (words.length !== 2 || words[0]?.wordClass !== 'noun' || words[1]?.wordClass !== 'adjective') {
			reasons.push({ code: 'word-class', message: 'Pasangan isim dan sifat belum terverifikasi.' });
		} else {
			const relation = evaluateAdjectiveAgreement({
				head: words[0].features,
				adjective: words[1].features,
				relation: frame.kind === 'naat' ? 'attributive' : 'nominal-predicate',
				pluralAnimacy: frame.pluralAnimacy
			});
			reasons.push(...relation.reasons);
			explanation = relation.allowedExplanation;
		}
	} else if (frame.kind === 'idafa') {
		if (words.length !== 2) {
			reasons.push({ code: 'unverified-surface', message: 'Iḍāfah memerlukan dua isim utuh.' });
		} else {
			const relation = evaluateIdafa({
				head: words[0]!, dependent: words[1]!,
				headCase: 'raf',
				construct: 'construct', headHasArticle: false, headHasTanwin: false,
				allowedPairs: [{
					headId: words[0]!.id, headText: words[0]!.text,
					dependentId: words[1]!.id, dependentText: words[1]!.text
				}]
			});
			reasons.push(...relation.reasons);
			explanation = relation.explanation;
		}
	} else if (frame.kind === 'preposition') {
		if (words.length !== 2 && words.length !== 3) {
			reasons.push({ code: 'unverified-surface', message: 'Susunan jar pilot belum terverifikasi.' });
		} else {
			const prepositional = evaluatePrepositionalPhrase({
				preposition: words[0]!, complement: words[1]!,
				allowedPairs: [{ particle: words[0]!.text, complementId: words[1]!.id, complementText: words[1]!.text }]
			});
			reasons.push(...prepositional.reasons);
			explanation = prepositional.explanation;
			if (words.length === 3) {
				const nested = evaluateIdafa({
					head: words[1]!, dependent: words[2]!, headCase: 'jarr',
					construct: 'construct', headHasArticle: false, headHasTanwin: false,
					allowedPairs: [{
						headId: words[1]!.id, headText: words[1]!.text,
						dependentId: words[2]!.id, dependentText: words[2]!.text
					}]
				});
				reasons.push(...nested.reasons);
			}
		}
	} else if (frame.kind === 'definiteness') {
		if (words.length !== 1 || words[0]?.features.case !== 'raf'
			|| !words[0]?.features.definiteness || words[0]?.features.number !== 'singular') {
			reasons.push({ code: 'missing-feature', message: 'Kasus atau ma‘rifah/nakirah isim belum diketahui.' });
		}
		explanation = 'Satu lema dengan bentuk ma‘rifah atau nakirah yang sudah tertulis pada contoh G-03.';
	}
	return {
		id: frame.exampleId,
		surfaces: frame.arabic,
		glosses: tokens.map((token) => token.gloss),
		translation: example?.translation ?? '',
		allowed: reasons.length === 0,
		reasons,
		sourceUrls: sources,
		explanation
	};
}

/** Stable registry lookup for audit and regression checks. */
export function curatedInlineFrame(source: InlineExampleSource, id: string): InlineFrameSpec | undefined {
	return frames.find((frame) => frame.source === source && frame.exampleId === id);
}

function framesFor(source: InlineExampleSource, originalId: string): readonly InlineFrameSpec[] {
	const base = frames.find((frame) => frame.source === source && frame.exampleId === originalId);
	if (!base) return [];
	return frames.filter((frame) => frame.source === source && frame.family === base.family);
}

export function canEditInlineExample(source: InlineExampleSource, id: string): boolean {
	const options = framesFor(source, id);
	return options.length > 1 && options.some((frame) => assessInlineFrame(frame).allowed);
}

export function searchInlineExampleChoices(
	source: InlineExampleSource,
	originalId: string,
	tokenIndex: number,
	query: string
): InlineExampleAssessment[] {
	const normalized = normalizeArabicSearch(query);
	return framesFor(source, originalId)
		.filter((frame) => tokenIndex >= 0 && tokenIndex < frame.arabic.length)
		.map(assessInlineFrame)
		.filter((item) => !normalized || [
			...item.surfaces,
			...item.glosses,
			item.translation
		].some((text) => normalizeArabicSearch(text).includes(normalized)));
}

/** Never accept a frame from a different source/family or an unvalidated item. */
function acceptedFrame(source: InlineExampleSource, originalId: string, selectedId: string) {
	return framesFor(source, originalId).find(
		(frame) => frame.exampleId === selectedId && assessInlineFrame(frame).allowed
	);
}

export function resolveInlineGrammarExample(
	originalId: string,
	selectedId: string
): GrammarExample | undefined {
	const frame = acceptedFrame('grammar', originalId, selectedId);
	return frame ? findGrammarExample(frame) : undefined;
}

export function resolveInlinePhraseExample(
	originalId: string,
	selectedId: string
): PhraseExample | undefined {
	const frame = acceptedFrame('phrase', originalId, selectedId);
	return frame ? findPhraseExample(frame) : undefined;
}

export function validateInlineFrameRegistry(): string[] {
	const errors: string[] = [];
	const keys = new Set<string>();
	for (const frame of frames) {
		const key = frame.source + ':' + frame.exampleId;
		if (keys.has(key)) errors.push('Duplicate frame ID: ' + key);
		keys.add(key);
		const result = assessInlineFrame(frame);
		for (const reason of result.reasons)
			errors.push(key + ': ' + reason.code + ' — ' + reason.message);
	}
	for (const frame of frames) {
		if (framesFor(frame.source, frame.exampleId).length < 2)
			errors.push('Singleton interactive family: ' + frame.source + '/' + frame.exampleId);
	}
	return errors;
}
