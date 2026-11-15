import { describe, expect, it } from 'vitest';
import { stage4CheckpointGroups } from './checkpoints-stage4.js';
import { collectCheckpointEvidenceItems } from './checkpoints.js';
import { evidenceItems, lessonsFor } from './lessons/index.js';

describe('RM-06 checkpoint Tahap 4', () => {
	it('provides 20 distinct sourced transfer questions per target competency', () => {
		expect(stage4CheckpointGroups.map((group) => group.questions.length)).toEqual([20, 20]);
		const questions = stage4CheckpointGroups.flatMap((group) => group.questions);
		expect(new Set(questions.map((question) => question.id)).size).toBe(40);
		expect(new Set(questions.map((question) => question.arabic.normalize('NFC'))).size).toBe(
			40
		);
		for (const question of questions) {
			expect(question.kind).toBe('transfer');
			expect(question.choices).toHaveLength(3);
			expect(new Set(question.choices).size).toBe(3);
			expect(question.choices[question.correct]).toBeTruthy();
			expect(question.reason.trim()).not.toBe('');
			expect(question.sources).toHaveLength(1);
			expect(question.sources[0]?.href).toMatch(/^https:\/\//);
		}
	});

	it('registers separate structure and meaning evidence with a published lesson owner', () => {
		const lessons = lessonsFor('belajar');
		const items = collectCheckpointEvidenceItems(stage4CheckpointGroups);
		expect(items).toHaveLength(40);
		for (const group of stage4CheckpointGroups) {
			const owner = lessons.find((lesson) => lesson.id === group.lessonId);
			expect(owner?.revision).toBe(group.contentRevision);
			expect(owner?.competencies).toContain(group.competencyId);
			expect(items.filter((item) => item.competencyIds.includes(group.competencyId))).toHaveLength(
				20
			);
		}
		expect(items.find((item) => item.competencyIds.includes('CB-14'))?.skill).toBe('structure');
		expect(items.find((item) => item.competencyIds.includes('CB-15'))?.skill).toBe('meaning');
		for (const item of items) expect(evidenceItems).toContainEqual(item);
	});
});
