import { describe, expect, it } from 'vitest';
import { stage3CheckpointGroups, collectCheckpointEvidenceItems } from './checkpoints.js';
import { evidenceItems, lessonsFor } from './lessons/index.js';

describe('RM-06 stage 3 source-backed checkpoint bank', () => {
	it('has 24 unique transfer questions, eight for each competency', () => {
		expect(stage3CheckpointGroups).toHaveLength(3);
		expect(stage3CheckpointGroups.map((group) => group.questions.length)).toEqual([8, 8, 8]);
		const questions = stage3CheckpointGroups.flatMap((group) => group.questions);
		expect(new Set(questions.map((item) => item.id)).size).toBe(24);
		expect(new Set(questions.map((item) => item.arabic.normalize('NFC'))).size).toBe(24);
		expect(questions.every((item) => item.kind === 'transfer' && item.sources.length > 0)).toBe(
			true
		);
		expect(questions.every((item) => item.choices[item.correct] !== undefined)).toBe(true);
	});
	it('registers published evidence for real lesson IDs without touching completion', () => {
		const items = collectCheckpointEvidenceItems(stage3CheckpointGroups);
		const lessons = lessonsFor('belajar');
		expect(items).toHaveLength(24);
		for (const group of stage3CheckpointGroups) {
			const lesson = lessons.find((item) => item.id === group.lessonId);
			expect(lesson?.revision).toBe(group.contentRevision);
			expect(lesson?.competencies).toContain(group.competencyId);
			expect(items.filter((item) => item.competencyIds.includes(group.competencyId))).toHaveLength(
				8
			);
		}
		for (const item of items) expect(evidenceItems).toContainEqual(item);
	});
});
