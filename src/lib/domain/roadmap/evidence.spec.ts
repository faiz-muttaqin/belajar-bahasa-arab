import { describe, expect, it } from 'vitest';
import { evidenceItems } from '#lib/content/lessons/index.js';
import {
	competencyUnderstanding,
	isLearningAttempt,
	mergeAttempts,
	summarizeEvidence,
	type EvidenceItem,
	type LearningAttempt
} from './evidence.js';

const attempt = (
	itemId: string,
	outcome: LearningAttempt['outcome'],
	at: number,
	options: Partial<LearningAttempt> = {}
): LearningAttempt => {
	const item = evidenceItems.find((entry) => entry.id === itemId)!;
	return {
		id: `answer-${at}`,
		itemId,
		lessonId: item.lessonId,
		contentRevision: 1,
		competencyIds: [...item.competencyIds],
		skill: item.skill,
		outcome,
		assisted: false,
		selfAssessed: item.kind === 'self-assessment',
		seenWhileAuthoring: false,
		at,
		...options
	};
};
const result = (id: string, records: LearningAttempt[]) =>
	competencyUnderstanding(id, records, evidenceItems);

describe('RM-05 competence evidence', () => {
	it('distinguishes missing exercises from available but untried exercises', () => {
		expect(result('CB-01', [])).toMatchObject({ level: 0, hasPractice: true, hasAttempts: false });
		expect(result('CB-13', [])).toMatchObject({ level: 0, hasPractice: false, hasAttempts: false });
	});

	it('records trying, wrong or dont-know as 1, without inferring understanding', () => {
		expect(result('CB-01', [attempt('u1-rabbi-meaning', 'dont_know', 1)]).level).toBe(1);
		expect(result('CB-01', [attempt('u1-rabbi-meaning', 'incorrect', 1)]).level).toBe(1);
		expect(
			result('CB-01', [attempt('u1-rabbi-meaning', 'correct', 1, { assisted: true })]).level
		).toBe(1);
	});

	it('guided answer gives 2; first unseen transfer gives 3', () => {
		const records = [
			attempt('u1-rabbi-meaning', 'correct', 1),
			attempt('u1-kitabi-transfer', 'correct', 2)
		];
		expect(result('CB-01', records).level).toBe(3);
		expect(result('CB-01', records.slice(0, 1)).level).toBe(2);
		expect(summarizeEvidence(['CB-01'], records, evidenceItems)).toEqual({
			total: 1,
			counts: { 0: 0, 1: 0, 2: 0, 3: 1 }
		});
	});

	it('repeating transfer after any earlier answer is not new', () => {
		const records = [
			attempt('u1-kitabi-transfer', 'incorrect', 1),
			attempt('u1-kitabi-transfer', 'correct', 2),
			attempt('u1-kitabi-transfer', 'correct', 3)
		];
		expect(result('CB-01', records).level).toBe(2);
	});

	it('seen-while-authoring and assisted transfer cannot give 3', () => {
		expect(
			result('CB-01', [attempt('u1-kitabi-transfer', 'correct', 1, { seenWhileAuthoring: true })])
				.level
		).toBe(2);
		expect(
			result('CB-01', [attempt('u1-kitabi-transfer', 'correct', 1, { assisted: true })]).level
		).toBe(1);
	});

	it('self-assessment reaches at most 2 and stays explicitly labelled', () => {
		const records = [attempt('u2-key-question', 'correct', 1)];
		expect(result('CB-04', records)).toMatchObject({
			level: 2,
			hasAttempts: true,
			selfAssessed: true
		});
		expect(result('CB-03', records).level).toBe(0);
		expect(result('CB-04', [attempt('u2-key-question', 'incorrect', 1)]).level).toBe(1);
	});

	it('recall never gives 2 or 3 and wrong self-assessment never downgrades', () => {
		const recall = attempt('u1-rabbi-meaning', 'correct', 1, { skill: 'recall' });
		expect(result('CB-01', [recall]).level).toBe(0); // mismatched skill cannot claim evidence
		const self = attempt('u2-key-question', 'correct', 1);
		const disagree = attempt('u2-student-question', 'incorrect', 2);
		expect(result('CB-04', [self, disagree]).level).toBe(2);
	});

	it('caps valid recall and assisted self-assessments at recognizing the item', () => {
		// TEST FIXTURE — no recall item is currently published.
		const self = attempt('u2-key-question', 'correct', 1);
		const recallItems: EvidenceItem[] = [
			{ ...evidenceItems.find((item) => item.id === self.itemId)!, skill: 'recall' }
		];
		expect(
			competencyUnderstanding('CB-04', [{ ...self, skill: 'recall' }], recallItems).level
		).toBe(1);
		expect(result('CB-04', [{ ...self, assisted: true }]).level).toBe(1);
	});

	it('allows a fresh wrong answer to lower evidence again after recovery', () => {
		const records = [
			attempt('u1-kitabi-transfer', 'correct', 1),
			attempt('u1-rabbi-meaning', 'incorrect', 2),
			attempt('u1-rabbi-meaning', 'correct', 3),
			attempt('u1-kitabi-transfer', 'incorrect', 4),
			attempt('u1-rabbi-meaning', 'correct', 5)
		];
		expect(result('CB-01', records).level).toBe(2);
		expect(result('CB-01', [...records, attempt('u1-kitabi-transfer', 'incorrect', 6)]).level).toBe(
			1
		);
	});

	it('wrong on a different item lowers exactly one level; repeated wrong on same item does not', () => {
		const records = [
			attempt('u1-kitabi-transfer', 'correct', 1),
			attempt('u1-rabbi-meaning', 'incorrect', 2),
			attempt('u1-rabbi-meaning', 'incorrect', 3)
		];
		expect(result('CB-01', records).level).toBe(2);
		expect(result('CB-01', [...records, attempt('u1-rabbi-meaning', 'correct', 4)]).level).toBe(2);
	});

	it('validates attempts, ignores retired or incompatible evidence and rejects conflicting IDs', () => {
		const a = attempt('u1-rabbi-meaning', 'correct', 1);
		expect(isLearningAttempt(a)).toBe(true);
		expect(isLearningAttempt({ ...a, at: NaN })).toBe(false);
		expect(isLearningAttempt({ ...a, competencyIds: [] })).toBe(false);
		expect(isLearningAttempt({ ...a, skill: 'fake' })).toBe(false);
		expect(mergeAttempts([a, a])).toEqual([a]);
		expect(() => mergeAttempts([a, { ...a, outcome: 'incorrect' }])).toThrow('isi berbeda');
		expect(result('CB-01', [{ ...a, itemId: 'retired-item' }]).level).toBe(0);
		expect(result('CB-01', [{ ...a, competencyIds: ['CB-10'] }]).level).toBe(0);
	});

	it('merges semantically identical answers regardless of JSON property or competency order', () => {
		const a = attempt('u1-rabbi-meaning', 'correct', 1, { competencyIds: ['CB-01', 'CB-03'] });
		const reordered = Object.fromEntries(Object.entries(a).reverse()) as LearningAttempt;
		reordered.competencyIds = [...a.competencyIds].reverse();
		expect(mergeAttempts([a, reordered])).toHaveLength(1);
	});
});
