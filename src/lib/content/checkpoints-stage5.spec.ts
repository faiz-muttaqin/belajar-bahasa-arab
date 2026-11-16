import { describe, expect, it } from 'vitest';
import { stage5CheckpointGroups } from './checkpoints-stage5.js';
import { collectCheckpointEvidenceItems } from './checkpoints.js';
import { evidenceItems, lessonsFor } from './lessons/index.js';

describe('RM-06 checkpoint Tahap 5', () => {
	it('provides 20 new, distinct MSA reading stimuli for each competency', () => {
		expect(stage5CheckpointGroups.map((group) => group.questions.length)).toEqual([20, 20, 20]);
		expect(stage5CheckpointGroups.map((group) => group.competencyId)).toEqual([
			'CB-22',
			'CB-23',
			'CB-24'
		]);
		const questions = stage5CheckpointGroups.flatMap((group) => group.questions);
		expect(new Set(questions.map((question) => question.id)).size).toBe(60);
		expect(new Set(questions.map((question) => question.arabic.normalize('NFC'))).size).toBe(60);
		for (const question of questions) {
			expect(question.kind).toBe('transfer');
			expect(question.choices).toHaveLength(3);
			expect(new Set(question.choices).size).toBe(3);
			expect(question.choices[question.correct]).toBeTruthy();
			expect(question.reason.trim()).not.toBe('');
			expect(question.arabic.trim().length).toBeGreaterThan(35);
			expect(question.sources).toHaveLength(2);
			expect(question.sources.every((source) => source.href.startsWith('https://'))).toBe(true);
		}
	});

	it('registers meaningful reading and structure evidence with published lesson ownership', () => {
		const lessons = lessonsFor('belajar');
		const checkpointItems = collectCheckpointEvidenceItems(stage5CheckpointGroups);
		expect(checkpointItems).toHaveLength(60);
		for (const group of stage5CheckpointGroups) {
			const owner = lessons.find((lesson) => lesson.id === group.lessonId);
			expect(owner?.revision).toBe(group.contentRevision);
			expect(owner?.competencies).toContain(group.competencyId);
			expect(
				checkpointItems.filter((item) => item.competencyIds.includes(group.competencyId))
			).toHaveLength(20);
		}
		expect(checkpointItems.find((item) => item.competencyIds.includes('CB-22'))?.skill).toBe(
			'structure'
		);
		expect(checkpointItems.find((item) => item.competencyIds.includes('CB-23'))?.skill).toBe(
			'meaning'
		);
		expect(checkpointItems.find((item) => item.competencyIds.includes('CB-24'))?.skill).toBe(
			'structure'
		);
		for (const item of checkpointItems) expect(evidenceItems).toContainEqual(item);
	});
});
