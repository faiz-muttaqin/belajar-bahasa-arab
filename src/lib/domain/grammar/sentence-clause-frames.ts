/**
 * D-05b/c: registry, assessment and search for curated G-04 (sentence) and G-05
 * (clause) frames, in the same static-first model as D-05a.
 *
 * Choosing an option replaces ONE complete frame: tokens, glosses, the natural
 * translation and the explanation together. A frame that fails any validator stays
 * visible and disabled with the reasons. Nothing is generated from a lemma.
 */
import { clauseRules, type ClauseExample } from '#lib/content/clause-rules.js';
import { grammarRules } from '#lib/content/grammar-rules.js';
import { phraseRules } from '#lib/content/phrase-rules.js';
import { sentenceRules, type SentenceExample } from '#lib/content/sentence-rules.js';
import { clauseFrames, clauseGaps, type ClauseFrame } from '#lib/content/clause-frames.js';
import {
	sentenceFrames,
	sentenceGapVerbs,
	sentenceGaps,
	sentenceVerbGapFamilies,
	type SentenceFrame
} from '#lib/content/sentence-frames.js';
import { recordedVerbs, verbValency } from '#lib/content/frame-verbs.js';
import { normalizeArabicSearch } from '#lib/domain/sharaf/lexicon.js';
import type { CuratedRelativeFrame } from './phrase-relation-constraints.js';
import type { FrameGap, SlotMeta } from './frame-types.js';
import {
	evaluateAthafActions,
	evaluateAthafSequence,
	evaluateAthafSubjects,
	evaluateCondition,
	evaluateImperativeFrame,
	evaluateLinkingKasra,
	evaluateNasikh,
	evaluateNegatedVerb,
	evaluateNominalAdjective,
	evaluateNominalPrepositional,
	evaluatePassiveFrame,
	evaluateQuestionParticle,
	evaluateRelativeFrame,
	evaluateVerbalFrame,
	negationMoodOf,
	type FrameReason,
	type FrameSlot
} from './sentence-clause-constraints.js';
import { resolveVerbFrame, verbFrameIds, verbFrameLabels } from './verb-frames.js';

export type FrameKind = 'sentence' | 'clause';
type AnyFrame = SentenceFrame | ClauseFrame;
type AnyExample = SentenceExample | ClauseExample;

type FlatToken = {
	arabic: string;
	gloss: string;
	irab?: 'raf' | 'nasb' | 'jarr';
	mood?: 'indicative' | 'jussive' | 'subjunctive';
	marker?: string;
};

/** One row of the picker. Structurally compatible with the D-05a assessment. */
export type FrameChoice = {
	id: string;
	surfaces: readonly string[];
	glosses: readonly string[];
	translation: string;
	allowed: boolean;
	reasons: readonly FrameReason[];
	sourceUrls: readonly string[];
	explanation: string;
	/** What came from recorded data and what the author wrote. */
	provenance?: string;
	/** True for a disabled placeholder for a form that is not recorded. */
	gap?: boolean;
};

const nfc = (text: string) => text.normalize('NFC');

function framesOf(kind: FrameKind): readonly AnyFrame[] {
	return kind === 'sentence' ? sentenceFrames : clauseFrames;
}

function ruleOf(kind: FrameKind, ruleId: string) {
	return kind === 'sentence'
		? sentenceRules.find((rule) => rule.id === ruleId)
		: clauseRules.find((rule) => rule.id === ruleId);
}

export function frameExample(kind: FrameKind, frame: AnyFrame): AnyExample | undefined {
	if (frame.example) return frame.example;
	if (!frame.original) return undefined;
	return ruleOf(kind, frame.ruleId)?.examples.find((example) => example.id === frame.id);
}

function flatTokens(kind: FrameKind, example: AnyExample): FlatToken[] {
	return kind === 'sentence'
		? [...(example as SentenceExample).tokens]
		: (example as ClauseExample).spans.flatMap((span) => [...span.tokens]);
}

/** Every NFC surface that is attested outside an authored variant: curriculum tokens, D-03 and recorded verbs. */
function attestedSurfaces(): Set<string> {
	const set = new Set<string>();
	for (const kind of ['sentence', 'clause'] as const) {
		for (const frame of framesOf(kind)) {
			const example = frameExample(kind, frame);
			if (!example) continue;
			flatTokens(kind, example).forEach((token, index) => {
				if (frame.slots[index]?.basis !== 'authored-variant') set.add(nfc(token.arabic));
			});
		}
	}
	// G-01 and G-03 curriculum tokens are attested surfaces too (for example كُتُبٌ).
	for (const rule of grammarRules)
		for (const example of rule.examples)
			for (const token of example.tokens) set.add(nfc(token.arabic));
	for (const rule of phraseRules)
		for (const example of rule.examples)
			for (const token of example.tokens) set.add(nfc(token.arabic));
	for (const verbId of Object.keys(verbValency)) {
		for (const frameId of verbFrameIds) {
			const resolved = resolveVerbFrame(verbId, frameId);
			if (resolved) set.add(nfc(resolved.form.text));
		}
	}
	for (const verb of recordedVerbs) {
		set.add(nfc(verb.past));
		set.add(nfc(verb.present));
	}
	return set;
}
let attestedCache: Set<string> | undefined;
const attested = () => (attestedCache ??= attestedSurfaces());

function unique<T>(items: readonly T[]): T[] {
	return [...new Set(items)];
}

function frameSources(kind: FrameKind, frame: AnyFrame): string[] {
	const urls: string[] = [
		...(ruleOf(kind, frame.ruleId)?.sources.map((source) => source.url) ?? []),
		...frame.provenance.sources
	];
	for (const meta of frame.slots) {
		if (meta.wordClass !== 'verb' || !meta.lexemeId.startsWith('fiil-')) continue;
		for (const frameId of verbFrameIds) {
			const resolved = resolveVerbFrame(meta.lexemeId, frameId);
			if (resolved) {
				urls.push(...resolved.form.evidence.sourceUrls);
				break;
			}
		}
	}
	return unique(urls);
}

function attestation(meta: SlotMeta, token: FlatToken): FrameReason[] {
	const text = nfc(token.arabic);
	if (meta.basis === 'verb-frame') {
		if (!meta.verbFrame)
			return [{ code: 'unattested-verb-form', message: 'Frame D-03 untuk fi‘il belum disebut.' }];
		const resolved = resolveVerbFrame(meta.lexemeId, meta.verbFrame);
		if (!resolved) {
			return [
				{
					code: 'unattested-verb-form',
					message:
						'Bentuk ' +
						verbFrameLabels[meta.verbFrame] +
						' untuk fi‘il ini belum tercatat pada D-03; bentuk tidak dibuat dari pola.'
				}
			];
		}
		const reasons: FrameReason[] = [];
		if (nfc(resolved.form.text) !== text)
			reasons.push({
				code: 'unattested-verb-form',
				message: 'Ejaan fi‘il berbeda dari bentuk D-03 yang tercatat (' + resolved.form.text + ').'
			});
		const given = { ...meta.features, mood: token.mood };
		for (const key of ['aspect', 'voice', 'person', 'gender', 'number', 'mood'] as const) {
			const expected = resolved.form.features[key];
			if (expected !== undefined && given[key] !== expected)
				reasons.push({
					code: 'feature-mismatch',
					message: 'Fitur ' + key + ' fi‘il tidak sama dengan bentuk D-03 yang tercatat.'
				});
		}
		return reasons;
	}
	if (meta.basis === 'wiktionary-form') {
		const verb = recordedVerbs.find((item) => item.id === meta.lexemeId);
		const expected = verb && (meta.verbFrame === 'past' ? verb.past : verb.present);
		if (!verb || (meta.verbFrame !== 'past' && meta.verbFrame !== 'present'))
			return [
				{ code: 'unattested-verb-form', message: 'Fi‘il ini belum tercatat pada data Form I.' }
			];
		return nfc(expected!) === text
			? []
			: [
					{
						code: 'unattested-verb-form',
						message: 'Ejaan berbeda dari bentuk Form I yang tercatat.'
					}
				];
	}
	if (meta.basis === 'authored-variant' && !meta.derivedFrom?.trim()) {
		return [
			{
				code: 'unverified-surface',
				message: 'Bentuk variasi penulis harus menyebut bentuk tercatat yang menjadi asalnya.'
			}
		];
	}
	return [];
}

function shapeReason(count: number, min: number, max: number): FrameReason[] {
	return count >= min && count <= max
		? []
		: [{ code: 'template-shape', message: 'Jumlah kata tidak sesuai dengan pola frame ini.' }];
}

function relativeFramesOf(family: string): CuratedRelativeFrame[] {
	const result: CuratedRelativeFrame[] = [];
	for (const frame of clauseFrames) {
		if (frame.family !== family || frame.template !== 'relative') continue;
		const example = frameExample('clause', frame);
		if (!example) continue;
		const tokens = flatTokens('clause', example);
		const silaTokens = tokens.slice(2, -1).map((token) => token.arabic);
		const objectReturn = silaTokens.length === 1 && frame.slots[2]?.features.person === 1;
		result.push({
			antecedent: tokens[0]!.arabic,
			relative: tokens[1]!.arabic,
			silaTokens,
			returnLink: objectReturn ? 'explicit-object-suffix' : 'implicit-subject'
		});
	}
	return result;
}

function checkTemplate(kind: FrameKind, frame: AnyFrame, s: FrameSlot[]): FrameReason[] {
	const valency = (slot: FrameSlot | undefined) => (slot ? verbValency[slot.id] : undefined);
	if (kind === 'sentence') {
		const sentence = frame as SentenceFrame;
		const animacy = sentence.pluralAnimacy;
		switch (sentence.template) {
			case 'nominal-adjective':
				return [
					...shapeReason(s.length, 2, 2),
					...evaluateNominalAdjective({ subject: s[0], predicate: s[1], pluralAnimacy: animacy })
				];
			case 'nominal-prepositional':
				return [
					...shapeReason(s.length, 3, 3),
					...evaluateNominalPrepositional({
						subject: s[0],
						preposition: s[1],
						complement: s[2]
					})
				];
			case 'nominal-verbal':
				return [
					...shapeReason(s.length, 2, 3),
					...evaluateVerbalFrame({
						verb: s[1],
						agent: s[0],
						object: s[2],
						valency: valency(s[1])
					})
				];
			case 'verbal':
				return [
					...shapeReason(s.length, 2, 3),
					...evaluateVerbalFrame({
						verb: s[0],
						agent: s[1],
						object: s[2],
						valency: valency(s[0])
					})
				];
			case 'imperative':
				return [
					...shapeReason(s.length, 1, 2),
					...evaluateImperativeFrame({ verb: s[0], object: s[1], valency: valency(s[0]) })
				];
			case 'passive': {
				const activeFrame = framesOf('sentence').find(
					(item) => item.id === sentence.pairedActiveId
				);
				const active =
					activeFrame && activeFrame.template === 'verbal' && activeFrame.slots[2]
						? { verbId: activeFrame.slots[0]!.lexemeId, objectId: activeFrame.slots[2].lexemeId }
						: undefined;
				return [
					...shapeReason(s.length, 2, 2),
					...evaluatePassiveFrame({ verb: s[0], deputy: s[1], active })
				];
			}
			case 'negation': {
				const mood = s[0] ? negationMoodOf(s[0].text) : undefined;
				return [
					...shapeReason(s.length, 3, 4),
					...evaluateNegatedVerb({ particle: s[0], verb: s[1] }),
					...evaluateVerbalFrame({
						verb: s[1],
						agent: s[2],
						object: s[3],
						valency: valency(s[1]),
						moods: mood ? [mood] : []
					})
				];
			}
			case 'inna':
				return [
					...shapeReason(s.length, 3, 3),
					...evaluateNasikh({
						kind: 'inna',
						operator: s[0],
						ism: s[1],
						khabar: s[2],
						pluralAnimacy: animacy
					})
				];
			case 'kana':
				return [
					...shapeReason(s.length, 3, 3),
					...evaluateNasikh({
						kind: 'kana',
						operator: s[0],
						ism: s[1],
						khabar: s[2],
						pluralAnimacy: animacy
					})
				];
			case 'question-nominal':
				return [
					...shapeReason(s.length, 3, 3),
					...evaluateQuestionParticle(s[0]),
					...evaluateNominalAdjective({ subject: s[1], predicate: s[2], pluralAnimacy: animacy })
				];
			case 'question-verbal':
				return [
					...shapeReason(s.length, 3, 4),
					...evaluateQuestionParticle(s[0]),
					...evaluateVerbalFrame({
						verb: s[1],
						agent: s[2],
						object: s[3],
						valency: valency(s[1])
					})
				];
		}
	}
	const clause = frame as ClauseFrame;
	switch (clause.template) {
		case 'athaf-actions':
			return [
				...shapeReason(s.length, 4, 5),
				...evaluateAthafActions({
					verb: s[0],
					agent: s[1],
					object: s[2],
					joined: s[3],
					joinedObject: s[4],
					valency: valency(s[0]),
					joinedValency: valency(s[3])
				})
			];
		case 'athaf-sequence':
			return [
				...shapeReason(s.length, 4, 4),
				...evaluateAthafSequence({
					verb: s[0],
					agent: s[1],
					particle: s[2],
					next: s[3],
					valency: valency(s[0]),
					nextValency: valency(s[3])
				})
			];
		case 'athaf-subjects':
			return [
				...shapeReason(s.length, 3, 3),
				...evaluateAthafSubjects({ verb: s[0], first: s[1], joined: s[2], valency: valency(s[0]) })
			];
		case 'relative': {
			const sila = s.slice(2, -1);
			return [
				...shapeReason(s.length, 4, 5),
				...evaluateRelativeFrame({
					frameId: clause.id,
					antecedent: s[0],
					relative: s[1],
					sila,
					khabar: s[s.length - 1],
					object: sila[1],
					allowedFrames: relativeFramesOf(clause.family),
					valency: valency(sila[0])
				})
			];
		}
		case 'condition':
			return [
				...shapeReason(s.length, 3, 3),
				...evaluateCondition({ particle: s[0], condition: s[1], result: s[2] })
			];
	}
}

function describeProvenance(frame: AnyFrame): string {
	const variants = frame.slots
		.map((meta) => (meta.basis === 'authored-variant' ? meta.derivedFrom : undefined))
		.filter(Boolean);
	return (
		frame.provenance.basis +
		(variants.length
			? ' Bentuk variasi penulis berasal dari: ' + unique(variants).join('، ') + '.'
			: '')
	);
}

/** Validate one frame. Fails closed: any missing metadata or mismatch blocks the option. */
export function assessFrame(kind: FrameKind, frame: AnyFrame): FrameChoice {
	const reasons: FrameReason[] = [];
	const example = frameExample(kind, frame);
	const tokens = example ? flatTokens(kind, example) : [];
	const sources = frameSources(kind, frame);
	if (!example) {
		reasons.push({
			code: 'unverified-surface',
			message: 'Contoh sumber untuk frame ini tidak ditemukan; pilihan perlu audit ulang.'
		});
	}
	if (
		!sources.length ||
		!sources.every((url) => url.startsWith('https://')) ||
		!frame.provenance.basis.trim()
	) {
		reasons.push({
			code: 'unverified-surface',
			message: 'Sumber atau catatan asal bentuk untuk frame ini belum lengkap.'
		});
	}
	if (frame.original && frame.example)
		reasons.push({
			code: 'unverified-surface',
			message: 'Frame asli tidak boleh membawa contoh sendiri.'
		});
	if (!frame.original && example && example.id !== frame.id)
		reasons.push({ code: 'unverified-surface', message: 'ID contoh tidak sama dengan ID frame.' });
	if (tokens.length !== frame.slots.length) {
		reasons.push({
			code: 'unverified-surface',
			message:
				'Bentuk contoh berubah atau data per-slot belum lengkap; pilihan ini perlu audit ulang.'
		});
	}

	const slots: FrameSlot[] = [];
	tokens.forEach((token, index) => {
		const meta = frame.slots[index];
		if (!meta) return;
		if (/\s/u.test(token.arabic.trim()))
			reasons.push({
				code: 'clitic-token',
				message: 'Setiap kata, termasuk klitik, harus menjadi satu token ortografis.'
			});
		reasons.push(...attestation(meta, token));
		slots.push({
			id: meta.lexemeId,
			text: token.arabic,
			wordClass: meta.wordClass,
			features: {
				...meta.features,
				...(token.irab ? { case: token.irab } : {}),
				...(token.mood ? { mood: token.mood } : {})
			},
			evidence: {
				kind: 'curated-example',
				reviewStatus: 'draft',
				sourceUrls: sources,
				note: 'Bentuk contoh G-04/G-05; menunggu tashih pengajar.'
			},
			marker: token.marker,
			clitic: meta.clitic,
			stem: meta.stem
		});
	});
	if (slots.length === frame.slots.length) {
		reasons.push(...checkTemplate(kind, frame, slots));
		reasons.push(...evaluateLinkingKasra(slots));
	}

	const seen = new Set<string>();
	const deduped = reasons.filter((item) => {
		const key = item.code + '|' + item.message;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
	return {
		id: frame.id,
		surfaces: tokens.map((token) => token.arabic),
		glosses: tokens.map((token) => token.gloss),
		translation: example?.translation ?? '',
		allowed: deduped.length === 0,
		reasons: deduped,
		sourceUrls: sources,
		explanation: example?.explanation ?? '',
		provenance: describeProvenance(frame)
	};
}

const assessmentCache = new Map<string, FrameChoice>();
function assessCached(kind: FrameKind, frame: AnyFrame): FrameChoice {
	const key = kind + ':' + frame.id;
	let result = assessmentCache.get(key);
	if (!result) {
		result = assessFrame(kind, frame);
		assessmentCache.set(key, result);
	}
	return result;
}

function familyOf(kind: FrameKind, originalId: string): readonly AnyFrame[] {
	const base = framesOf(kind).find((frame) => frame.id === originalId);
	return base ? framesOf(kind).filter((frame) => frame.family === base.family) : [];
}

/** Do not offer an edit affordance when no allowed alternative exists. */
export function canEditFrameExample(kind: FrameKind, originalId: string): boolean {
	const family = familyOf(kind, originalId);
	return (
		family.length > 1 && family.filter((frame) => assessCached(kind, frame).allowed).length > 1
	);
}

export function canEditFrameSlot(kind: FrameKind, originalId: string, tokenIndex: number): boolean {
	const surfaces = familyOf(kind, originalId)
		.map((frame) => assessCached(kind, frame))
		.filter((item) => item.allowed && tokenIndex >= 0 && tokenIndex < item.surfaces.length)
		.map((item) => nfc(item.surfaces[tokenIndex]!));
	return new Set(surfaces).size > 1;
}

function d03Gaps(family: string): FrameGap[] {
	if (!sentenceVerbGapFamilies.includes(family)) return [];
	const gaps: FrameGap[] = [];
	for (const verb of sentenceGapVerbs) {
		for (const frameId of verbFrameIds) {
			if (resolveVerbFrame(verb.id, frameId)) continue;
			gaps.push({
				id: 'gap-d03-' + verb.id + '-' + frameId,
				family,
				slotRole: 'verb',
				label: verb.lemma + ' · ' + verbFrameLabels[frameId],
				surfaces: [verb.lemma],
				reason:
					'Bentuk ' +
					verbFrameLabels[frameId] +
					' untuk ' +
					verb.lemma +
					' (' +
					verb.meaning +
					') belum tercatat pada tabel D-03; bentuk tidak dibuat dari pola.'
			});
		}
	}
	return gaps;
}

function gapsFor(
	kind: FrameKind,
	originalId: string,
	currentId: string,
	tokenIndex: number
): FrameChoice[] {
	const family = familyOf(kind, originalId)[0]?.family;
	if (!family) return [];
	const current = framesOf(kind).find((frame) => frame.id === currentId);
	const atVerb = current?.slots[tokenIndex]?.wordClass === 'verb';
	const explicit = kind === 'sentence' ? sentenceGaps : clauseGaps;
	const all = [
		...explicit.filter((gap) => gap.family === family),
		...(kind === 'sentence' ? d03Gaps(family) : [])
	];
	return all
		.filter((gap) => gap.slotRole !== 'verb' || atVerb)
		.map((gap) => ({
			id: gap.id,
			surfaces: gap.surfaces,
			glosses: [],
			translation: gap.label,
			allowed: false,
			reasons: [{ code: 'unrecorded-form', message: gap.reason }],
			sourceUrls: [],
			explanation: '',
			gap: true
		}));
}

/**
 * Choices for one token position: every frame of the family (allowed first, then
 * blocked) and the recorded gaps. Search covers Arabic without harakat and Indonesian.
 */
export function searchFrameChoices(
	kind: FrameKind,
	originalId: string,
	currentId: string,
	tokenIndex: number,
	query: string
): FrameChoice[] {
	const normalized = normalizeArabicSearch(query);
	const frames = familyOf(kind, originalId)
		.map((frame) => assessCached(kind, frame))
		.filter((item) => tokenIndex >= 0 && tokenIndex < item.surfaces.length);
	const rows = [
		...frames.filter((item) => item.allowed),
		...frames.filter((item) => !item.allowed),
		...gapsFor(kind, originalId, currentId, tokenIndex)
	];
	return rows.filter(
		(item) =>
			!normalized ||
			[...item.surfaces, ...item.glosses, item.translation].some((text) =>
				normalizeArabicSearch(text).includes(normalized)
			)
	);
}

/** Never accept a frame from another family or one that fails validation. */
export function resolveFrameExample(
	kind: 'sentence',
	originalId: string,
	selectedId: string
): SentenceExample | undefined;
export function resolveFrameExample(
	kind: 'clause',
	originalId: string,
	selectedId: string
): ClauseExample | undefined;
export function resolveFrameExample(
	kind: FrameKind,
	originalId: string,
	selectedId: string
): AnyExample | undefined {
	const frame = familyOf(kind, originalId).find((item) => item.id === selectedId);
	return frame && assessCached(kind, frame).allowed ? frameExample(kind, frame) : undefined;
}

/** Registry integrity for unit tests and audit: every error is a data problem to fix before shipping. */
export function validateFrameRegistry(kind: FrameKind): string[] {
	const errors: string[] = [];
	const ids = new Set<string>();
	const base = attested();
	for (const frame of framesOf(kind)) {
		if (ids.has(frame.id)) errors.push('Duplicate frame id: ' + frame.id);
		ids.add(frame.id);
		for (const reason of assessFrame(kind, frame).reasons)
			errors.push(frame.id + ': ' + reason.code + ' - ' + reason.message);
		for (const meta of frame.slots) {
			if (meta.basis === 'authored-variant' && !base.has(nfc(meta.derivedFrom ?? '')))
				errors.push(frame.id + ': variant source is not attested: ' + meta.derivedFrom);
		}
		if (familyOf(kind, frame.id).length < 2)
			errors.push('Singleton interactive family: ' + frame.id);
	}
	return errors;
}

export function frameRegistry(kind: FrameKind): readonly AnyFrame[] {
	return framesOf(kind);
}
