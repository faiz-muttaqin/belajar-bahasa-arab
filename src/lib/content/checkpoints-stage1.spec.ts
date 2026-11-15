import { describe, expect, it } from 'vitest';
import { stage1CheckpointGroups } from './checkpoints-stage1.js';
import { collectCheckpointEvidenceItems } from './checkpoints.js';
import { evidenceItems, lessonsFor } from './lessons/index.js';
import { u1MeaningQuestions } from './lessons/u1-meaning-practice.js';

describe('RM-06 checkpoint Tahap 1', () => {
	it('publishes 20 truly distinct, source-backed first-person transfer words', () => {
		expect(stage1CheckpointGroups).toHaveLength(1);
		const questions = stage1CheckpointGroups[0]!.questions;
		expect(questions).toHaveLength(20);
		expect(new Set(questions.map((item) => item.id)).size).toBe(20);
		expect(new Set(questions.map((item) => item.arabic.normalize('NFC'))).size).toBe(20);
		const lessonWords = new Set(u1MeaningQuestions.map((item) => item.arabic.normalize('NFC')));
		expect(questions.every((item) => !lessonWords.has(item.arabic.normalize('NFC')))).toBe(true);
		for (const item of questions) {
			expect(item.kind).toBe('transfer');
			expect(item.choices).toHaveLength(3);
			expect(new Set(item.choices).size).toBe(3);
			expect(item.choices[item.correct]).toBeTruthy();
			expect(item.sources[0]?.href).toBe(
				'https://madinaharabic.com/free-content/grammar/lesson-47/part-2'
			);
		}
	});
	it('registers source-backed transfer attempts without inventing completion', () => {
		const group = stage1CheckpointGroups[0]!;
		expect(lessonsFor('belajar').find((lesson) => lesson.id === group.lessonId)?.revision).toBe(
			group.contentRevision
		);
		const items = collectCheckpointEvidenceItems(stage1CheckpointGroups);
		expect(items).toHaveLength(20);
		expect(items.every((item) => item.kind === 'transfer' && item.skill === 'meaning')).toBe(true);
		expect(items.every((item) => item.competencyIds.join() === 'CB-01')).toBe(true);
		for (const item of items) expect(evidenceItems).toContainEqual(item);
	});
});
