import { describe, expect, it } from 'vitest';
import { stage2CheckpointGroups } from './checkpoints-stage2.js';
import { collectCheckpointEvidenceItems } from './checkpoints.js';
import { evidenceItems, lessonsFor } from './lessons/index.js';

describe('RM-06 checkpoint Tahap 2', () => {
	it('provides 20 source-backed, distinct transfer tasks for each competency', () => {
		expect(stage2CheckpointGroups.map((group) => group.questions.length)).toEqual([20, 20]);
		const questions = stage2CheckpointGroups.flatMap((group) => group.questions);
		expect(new Set(questions.map((question) => question.id)).size).toBe(40);
		expect(new Set(questions.map((question) => question.arabic.normalize('NFC'))).size).toBe(40);
		expect(questions.every((question) => question.kind === 'transfer')).toBe(true);
		for (const question of questions) {
			expect(question.choices).toHaveLength(3);
			expect(new Set(question.choices).size).toBe(3);
			expect(question.choices[question.correct]).toBeTruthy();
			expect(question.sources).toHaveLength(1);
			expect(question.sources[0]?.href).toMatch(/^https:\/\//);
		}
	});
	it('stores meaning and structure separately, with stable published lesson ownership', () => {
		const lessons = lessonsFor('belajar');
		const items = collectCheckpointEvidenceItems(stage2CheckpointGroups);
		expect(items).toHaveLength(40);
		expect(new Set(items.map((item) => item.id)).size).toBe(40);
		for (const group of stage2CheckpointGroups) {
			const owner = lessons.find((lesson) => lesson.id === group.lessonId);
			expect(owner?.revision).toBe(group.contentRevision);
			expect(owner?.competencies).toContain(group.competencyId);
			expect(items.filter((item) => item.competencyIds.includes(group.competencyId))).toHaveLength(
				20
			);
		}
		expect(items.find((item) => item.competencyIds.includes('CB-04'))?.skill).toBe('meaning');
		expect(items.find((item) => item.competencyIds.includes('CB-06'))?.skill).toBe('structure');
		for (const item of items) expect(evidenceItems).toContainEqual(item);
	});
});
