import { describe, expect, it } from 'vitest';
import { stage6CheckpointGroups } from './checkpoints-stage6.js';
import { collectCheckpointEvidenceItems } from './checkpoints.js';
import { evidenceItems, lessonsFor } from './lessons/index.js';

describe('RM-06 checkpoint Tahap 6', () => {
	it('provides 20 original new document-reading situations per competency', () => {
		expect(stage6CheckpointGroups.map((group) => group.questions.length)).toEqual([20, 20]);
		expect(stage6CheckpointGroups.map((group) => group.competencyId)).toEqual(['CB-21', 'CB-24']);
		const questions = stage6CheckpointGroups.flatMap((group) => group.questions);
		expect(questions).toHaveLength(40);
		expect(new Set(questions.map((question) => question.id)).size).toBe(40);
		expect(new Set(questions.map((question) => question.arabic.normalize('NFC'))).size).toBe(40);
		for (const question of questions) {
			expect(question.kind).toBe('transfer');
			expect(question.choices).toHaveLength(3);
			expect(new Set(question.choices).size).toBe(3);
			expect(question.choices[question.correct]).toBeTruthy();
			expect(question.reason.trim()).not.toBe('');
			expect(question.arabic.length).toBeGreaterThan(80);
			expect(question.sources).toHaveLength(2);
			expect(question.sources.every((source) => source.href.startsWith('https://'))).toBe(true);
		}
	});

	it('uses stable original lesson U12 ownership and separates meaning from structure', () => {
		const lessons = lessonsFor('belajar');
		const owner = lessons.find((lesson) => lesson.id === 'lesson-u12-01');
		expect(owner?.revision).toBe(1);
		const items = collectCheckpointEvidenceItems(stage6CheckpointGroups);
		expect(items).toHaveLength(40);
		for (const group of stage6CheckpointGroups) {
			expect(group.lessonId).toBe('lesson-u12-01');
			expect(owner?.competencies).toContain(group.competencyId);
			expect(items.filter((item) => item.competencyIds.includes(group.competencyId))).toHaveLength(
				20
			);
		}
		expect(items.find((item) => item.competencyIds.includes('CB-21'))?.skill).toBe('meaning');
		expect(items.find((item) => item.competencyIds.includes('CB-24'))?.skill).toBe('structure');
		for (const item of items) expect(evidenceItems).toContainEqual(item);
	});
});
