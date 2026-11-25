/**
 * VP-03: a "change sequence" explains how word forms and relations change between two annotated
 * sentences, one step at a time (docs/plans/visual-pembelajaran.md §3).
 *
 * The sequence is written by hand from annotations that already carry a source (VP-01). Nothing
 * is derived from the dictionary and no intermediate Arabic is invented: a step only points at
 * tokens of the two annotated sentences, so every Arabic form a learner sees already exists as
 * sourced, annotated content. `validateChangeSequences` checks that each claimed change is really
 * a difference between the two annotations and that every token of both sentences is accounted
 * for. Status stays `draft` until the single end-to-end ustadz review of ADR-004 D-9.
 *
 * Pure TypeScript: no UI, no storage.
 */
import {
	ROLE_LABELS,
	tokenById,
	type AnnotatedSentence,
	type AnnotatedToken,
	type AnnotationSource,
	type AnnotationUsageType,
	type RoleId
} from './annotation.js';

/** What kind of difference a change shows. One token can have several changes, one per aspect. */
export type ChangeAspect = 'form' | 'ending' | 'pattern' | 'role' | 'added' | 'dropped';

export const CHANGE_ASPECT_LABELS: Record<ChangeAspect, string> = {
	form: 'Bentuk kata',
	ending: 'Harakat akhir',
	pattern: 'Pola vokal fi‘il',
	role: 'Peran dalam kalimat',
	added: 'Kata ditambahkan',
	dropped: 'Kata tidak disebut'
};

export type TokenChange = {
	/** Token id in the sentence before the change. Missing when the word is added. */
	before?: string;
	/** Token id in the sentence after the change. Missing when the word is dropped. */
	after?: string;
	aspect: ChangeAspect;
	/** Indonesian: what happens to this word. Arabic may be quoted; it is shown isolated. */
	summary: string;
};

/** A word that is part of the step's story but keeps its written form. */
export type StayNote = {
	before: string;
	after: string;
	note: string;
};

export type ChangeStep = {
	id: string;
	/** Short Indonesian title of the step. */
	title: string;
	/** The words this step changes. At least one. */
	changes: readonly [TokenChange, ...TokenChange[]];
	/** Other words that change together with them (agreement, case or role). */
	dependents: readonly TokenChange[];
	/** Words that look affected but stay the same, with the reason. */
	stays: readonly StayNote[];
	/** Why the change happens, in Indonesian. */
	reason: string;
	sources: readonly [AnnotationSource, ...AnnotationSource[]];
};

/** Pages a change sequence can be shown on. */
export type ChangePlacement =
	| { kind: 'grammar-rule'; ruleId: string }
	| { kind: 'phrase-rule'; ruleId: string }
	| { kind: 'lesson'; lessonSlug: string };

export type ChangeSequence = {
	id: string;
	title: string;
	/** One Indonesian sentence on what the learner can compare. */
	intro: string;
	placement: ChangePlacement;
	/** Id of the annotated sentence shown first. */
	before: string;
	/** Id of the annotated sentence the steps lead to. */
	after: string;
	steps: readonly [ChangeStep, ...ChangeStep[]];
	usageType: AnnotationUsageType;
	status: 'draft';
	/** What the evidence does not cover. Shown to the learner. */
	limits: string;
};

export const SEQUENCE_ID = /^cs-[a-z][a-z0-9-]*$/;

/** How a token is marked while a step is shown. */
export type StepMark = 'changing' | 'dependent' | 'stays';

export const STEP_MARK_LABELS: Record<StepMark, string> = {
	changing: 'Berubah',
	dependent: 'Ikut berubah',
	stays: 'Tetap'
};

/** A change with the annotation data it points at, ready to show. */
export type ResolvedChange = {
	aspect: ChangeAspect;
	aspectLabel: string;
	summary: string;
	before?: { id: string; text: string; gloss: string; roleLabel: string };
	after?: { id: string; text: string; gloss: string; roleLabel: string };
};

export type ResolvedStay = {
	before: { id: string; text: string };
	after: { id: string; text: string };
	note: string;
};

export type ResolvedStep = {
	id: string;
	number: number;
	title: string;
	changes: readonly ResolvedChange[];
	dependents: readonly ResolvedChange[];
	stays: readonly ResolvedStay[];
	reason: string;
	sources: readonly AnnotationSource[];
	/** Marks by token id in the sentence before and in the sentence after. */
	marks: { before: Record<string, StepMark>; after: Record<string, StepMark> };
};

export type ResolvedSequence = {
	id: string;
	title: string;
	intro: string;
	before: AnnotatedSentence;
	after: AnnotatedSentence;
	steps: readonly ResolvedStep[];
	usageType: AnnotationUsageType;
	limits: string;
};

function roleLabel(role: RoleId): string {
	return ROLE_LABELS[role];
}

function sideOf(token: AnnotatedToken) {
	return { id: token.id, text: token.text, gloss: token.gloss, roleLabel: roleLabel(token.role) };
}

function resolveChange(
	change: TokenChange,
	before: AnnotatedSentence,
	after: AnnotatedSentence
): ResolvedChange {
	const from = change.before ? tokenById(before, change.before) : undefined;
	const to = change.after ? tokenById(after, change.after) : undefined;
	return {
		aspect: change.aspect,
		aspectLabel: CHANGE_ASPECT_LABELS[change.aspect],
		summary: change.summary,
		before: from && sideOf(from),
		after: to && sideOf(to)
	};
}

/** Marks for one step. A token already marked `changing` is never downgraded. */
function marksOf(step: ChangeStep): ResolvedStep['marks'] {
	const marks: ResolvedStep['marks'] = { before: {}, after: {} };
	const put = (side: 'before' | 'after', id: string | undefined, mark: StepMark) => {
		if (!id) return;
		const order: StepMark[] = ['stays', 'dependent', 'changing'];
		const current = marks[side][id];
		if (!current || order.indexOf(mark) > order.indexOf(current)) marks[side][id] = mark;
	};
	for (const stay of step.stays) {
		put('before', stay.before, 'stays');
		put('after', stay.after, 'stays');
	}
	for (const change of step.dependents) {
		put('before', change.before, 'dependent');
		put('after', change.after, 'dependent');
	}
	for (const change of step.changes) {
		put('before', change.before, 'changing');
		put('after', change.after, 'changing');
	}
	return marks;
}

/**
 * Joins a sequence with its two annotated sentences. Throws when either sentence is missing so a
 * page build fails instead of showing a step that points at nothing; `validateChangeSequences`
 * gives the detailed reason in tests.
 */
export function resolveChangeSequence(
	sequence: ChangeSequence,
	sentences: readonly AnnotatedSentence[]
): ResolvedSequence {
	const before = sentences.find((item) => item.id === sequence.before);
	const after = sentences.find((item) => item.id === sequence.after);
	if (!before || !after) throw new Error(`${sequence.id}: annotated sentence not found`);
	return {
		id: sequence.id,
		title: sequence.title,
		intro: sequence.intro,
		before,
		after,
		usageType: sequence.usageType,
		limits: sequence.limits,
		steps: sequence.steps.map((step, index): ResolvedStep => ({
			id: step.id,
			number: index + 1,
			title: step.title,
			changes: step.changes.map((change) => resolveChange(change, before, after)),
			dependents: step.dependents.map((change) => resolveChange(change, before, after)),
			stays: step.stays.map((stay) => ({
				before: { id: stay.before, text: tokenById(before, stay.before)?.text ?? '' },
				after: { id: stay.after, text: tokenById(after, stay.after)?.text ?? '' },
				note: stay.note
			})),
			reason: step.reason,
			sources: step.sources,
			marks: marksOf(step)
		}))
	};
}

/** Short text for a live region: step number, title and what changes. */
export function stepAnnouncement(step: ResolvedStep, total: number): string {
	const changes = [...step.changes, ...step.dependents].map((change) => {
		const from = change.before?.text;
		const to = change.after?.text;
		if (from && to) return `${change.aspectLabel}: ${from} menjadi ${to}`;
		if (to) return `${change.aspectLabel}: ${to}`;
		return `${change.aspectLabel}: ${from ?? ''}`;
	});
	return `Langkah ${step.number} dari ${total}: ${step.title}. ${changes.join('. ')}.`;
}

function sharafDiffers(a: AnnotatedToken, b: AnnotatedToken): boolean {
	if (!a.sharaf || !b.sharaf) return false;
	return a.sharaf.kind !== b.sharaf.kind || a.sharaf.pattern !== b.sharaf.pattern;
}

function checkChange(
	at: string,
	change: TokenChange,
	before: AnnotatedSentence,
	after: AnnotatedSentence,
	errors: string[]
) {
	if (!change.summary.trim()) errors.push(`${at}: change has no summary`);
	const from = change.before ? tokenById(before, change.before) : undefined;
	const to = change.after ? tokenById(after, change.after) : undefined;
	if (change.before && !from) errors.push(`${at}: before token ${change.before} not found`);
	if (change.after && !to) errors.push(`${at}: after token ${change.after} not found`);
	if ((change.before && !from) || (change.after && !to)) return;

	if (change.aspect === 'added') {
		if (change.before || !to) errors.push(`${at}: an added word has only an after token`);
		return;
	}
	if (change.aspect === 'dropped') {
		if (change.after || !from) errors.push(`${at}: a dropped word has only a before token`);
		return;
	}
	if (!from || !to) {
		errors.push(`${at}: ${change.aspect} needs a before and an after token`);
		return;
	}
	if (change.aspect === 'form' || change.aspect === 'ending' || change.aspect === 'pattern') {
		if (from.text === to.text)
			errors.push(`${at}: ${change.aspect} change but ${from.text} is written the same`);
	}
	if (change.aspect === 'role' && from.role === to.role)
		errors.push(`${at}: role change but both are ${from.role}`);
	if (change.aspect === 'ending') {
		const a = from.finalVowel;
		const b = to.finalVowel;
		if (!a || !b) errors.push(`${at}: ending change needs a final vowel on both tokens`);
		else if (a.sign === b.sign && a.case === b.case)
			errors.push(`${at}: ending change but the final vowel is the same`);
	}
	if (change.aspect === 'pattern' && !sharafDiffers(from, to))
		errors.push(`${at}: pattern change needs two different sharaf notes`);
}

export function validateChangeSequences(
	sequences: readonly ChangeSequence[],
	sentences: readonly AnnotatedSentence[]
): string[] {
	const errors: string[] = [];
	const ids = new Set<string>();

	for (const sequence of sequences) {
		const at = sequence.id;
		if (!SEQUENCE_ID.test(at)) errors.push(`${at}: invalid sequence id`);
		if (ids.has(at)) errors.push(`${at}: duplicate sequence id`);
		ids.add(at);
		if (!sequence.title.trim()) errors.push(`${at}: missing title`);
		if (!sequence.intro.trim()) errors.push(`${at}: missing intro`);
		if (sequence.status !== 'draft') errors.push(`${at}: status must be draft until review`);
		if (!sequence.limits.trim()) errors.push(`${at}: sequence must state its limits`);
		if (sequence.steps.length === 0) errors.push(`${at}: no steps`);

		const before = sentences.find((item) => item.id === sequence.before);
		const after = sentences.find((item) => item.id === sequence.after);
		if (!before) errors.push(`${at}: before sentence ${sequence.before} not found`);
		if (!after) errors.push(`${at}: after sentence ${sequence.after} not found`);
		if (sequence.before === sequence.after) errors.push(`${at}: before and after are the same`);
		if (!before || !after) continue;

		const covered = { before: new Set<string>(), after: new Set<string>() };
		sequence.steps.forEach((step, index) => {
			const stepAt = step.id;
			const expected = `${sequence.id}.s${index + 1}`;
			if (step.id !== expected) errors.push(`${at}: step id ${step.id} should be ${expected}`);
			if (!step.title.trim()) errors.push(`${stepAt}: missing title`);
			if (!step.reason.trim()) errors.push(`${stepAt}: missing reason`);
			if (!step.sources?.length) errors.push(`${stepAt}: step has no source`);
			for (const source of step.sources ?? []) {
				if (!source.url.startsWith('https://')) errors.push(`${stepAt}: source needs an https url`);
				if (!source.locator.trim()) errors.push(`${stepAt}: source needs a chapter or lesson`);
				if (!source.label.trim()) errors.push(`${stepAt}: source needs a label`);
			}
			if (step.changes.length === 0) errors.push(`${stepAt}: no changes`);

			for (const change of [...step.changes, ...step.dependents]) {
				checkChange(stepAt, change, before, after, errors);
				if (change.before) covered.before.add(change.before);
				if (change.after) covered.after.add(change.after);
			}
			for (const stay of step.stays) {
				const from = tokenById(before, stay.before);
				const to = tokenById(after, stay.after);
				if (!from || !to) {
					errors.push(`${stepAt}: stay points at a missing token`);
					continue;
				}
				if (from.text !== to.text)
					errors.push(`${stepAt}: ${from.text} and ${to.text} are not written the same`);
				if (!stay.note.trim()) errors.push(`${stepAt}: stay without a note`);
				covered.before.add(stay.before);
				covered.after.add(stay.after);
			}
		});

		for (const token of before.tokens)
			if (!covered.before.has(token.id)) errors.push(`${at}: ${token.id} is not in any step`);
		for (const token of after.tokens)
			if (!covered.after.has(token.id)) errors.push(`${at}: ${token.id} is not in any step`);
	}
	return errors;
}
