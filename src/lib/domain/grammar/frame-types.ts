/**
 * D-05b/c: shared types for curated G-04 sentence and G-05 clause frames.
 *
 * A frame is ONE complete, hand-authored (or curriculum) example. Choosing it in
 * the inline picker replaces the whole example: tokens, glosses, translation and
 * explanation together. Nothing here derives a surface form from a lemma.
 */
import type { MorphFeatures, WordClass } from './lexeme-forms.js';
import type { PluralAnimacy } from './grammar-constraints.js';
import type { VerbFrameId } from './verb-frames.js';

/**
 * Where the exact Arabic surface of one slot comes from.
 * - project-surface: a token that already ships in the project's curriculum or
 *   G-06 pilot data (checked against those data in unit tests).
 * - verb-frame: an exact D-03 `resolveVerbFrame` form (checked at run time).
 * - wiktionary-form: a madhi/mudhari form listed in data/wiktionary/verbs-form-i.json.
 * - authored-variant: a case, gender or clitic variant written by the author from
 *   the attested surface named in `derivedFrom`. Always flagged for teacher review.
 */
export type SlotBasis = 'project-surface' | 'verb-frame' | 'wiktionary-form' | 'authored-variant';

export type SlotMeta = {
	lexemeId: string;
	wordClass: WordClass;
	/** Explicit gender/number/definiteness/aspect/voice/person. Case and mood come from the token. */
	features: MorphFeatures;
	basis: SlotBasis;
	/** D-03 frame for `verb-frame`; 'past' or 'present' for `wiktionary-form`. */
	verbFrame?: VerbFrameId;
	/** Required for `authored-variant`: the attested surface this variant was written from. */
	derivedFrom?: string;
	/** A prefixed conjunction written as one orthographic token, for example وَكَتَبَ. */
	clitic?: 'وَ' | 'فَ';
	/** The word after `clitic`. */
	stem?: string;
};

export type SentenceTemplate =
	| 'nominal-adjective'
	| 'nominal-prepositional'
	| 'nominal-verbal'
	| 'verbal'
	| 'imperative'
	| 'passive'
	| 'negation'
	| 'inna'
	| 'kana'
	| 'question-nominal'
	| 'question-verbal';

export type ClauseTemplate =
	'athaf-actions' | 'athaf-sequence' | 'athaf-subjects' | 'relative' | 'condition';

export type FrameProvenance = {
	/** Indonesian note: what comes from recorded data and what the author wrote. */
	basis: string;
	/** Source URLs for the forms in this frame (the rule sources are added automatically). */
	sources: readonly string[];
};

export type FrameDef<E, T extends string> = {
	id: string;
	family: string;
	template: T;
	/** The G-04 / G-05 rule this frame illustrates; its sources apply to the frame. */
	ruleId: string;
	/** Set for an original curriculum example (its id equals this frame id): tokens come from the rule data. */
	original?: true;
	/** An authored example. Its `id` must equal the frame id. */
	example?: E;
	/** One entry per flat token, in reading order. */
	slots: readonly SlotMeta[];
	pluralAnimacy?: PluralAnimacy;
	/** Passive frames name their active counterpart frame. */
	pairedActiveId?: string;
	provenance: FrameProvenance;
};

/** A visible but disabled option that stands for a form the project has not recorded. */
export type FrameGap = {
	id: string;
	family: string;
	/** Which token positions list this gap (undefined = every position). */
	slotRole?: 'verb';
	label: string;
	/** Only surfaces that exist in the project data may appear here. */
	surfaces: readonly string[];
	reason: string;
};
