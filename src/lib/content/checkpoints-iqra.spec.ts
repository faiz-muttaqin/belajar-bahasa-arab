import { describe, expect, it } from 'vitest';
import { foundationLessons } from './lessons/foundation.js';
import { iqraSelfCheckGroups } from './checkpoints-iqra.js';

describe('RM-06 optional Iqra self-check', () => {
	it('publishes 20 unique, ungraded reading tasks in four progressive groups', () => {
		expect(iqraSelfCheckGroups.map((group) => group.items.length)).toEqual([5, 5, 5, 5]);
		const items = iqraSelfCheckGroups.flatMap((group) => group.items);
		expect(items).toHaveLength(20);
		expect(new Set(items.map((item) => item.id)).size).toBe(20);
		expect(new Set(items.map((item) => item.arabic.normalize('NFC'))).size).toBe(20);
		const lessonStimuli = foundationLessons.flatMap((lesson) => [
			...lesson.examples.map((item) => item.arabic),
			...lesson.exercises.map((item) => item.arabic)
		]);
		for (const item of items) {
			expect(item.arabic.trim()).not.toBe('');
			expect(item.focus.trim()).not.toBe('');
			expect(item.check.trim()).not.toBe('');
			expect(lessonStimuli).not.toContain(item.arabic);
		}
	});
});
