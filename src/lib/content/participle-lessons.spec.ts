import { describe, expect, it } from 'vitest';
import {
	participlePairs,
	participleRules,
	participleSources,
	participleTasks
} from './participle-lessons.js';

describe('OER-02b participle lesson', () => {
	it('provides six attested pairs and four kinds of contextual task', () => {
		expect(participlePairs).toHaveLength(6);
		expect(new Set(participlePairs.map((pair) => pair.form))).toEqual(
			new Set(['I', 'II', 'IV', 'X'])
		);
		expect(participlePairs.find((pair) => pair.id === 'baa')?.passive).toBe('مَبِيعٌ');
		expect(participleTasks).toHaveLength(24);
		expect(new Set(participleTasks.map((task) => task.id)).size).toBe(24);
		expect(new Set(participleTasks.map((task) => task.arabic)).size).toBe(24);
		expect(new Set(participleTasks.map((task) => task.kind)).size).toBe(4);
		for (const pair of participlePairs) {
			expect(pair.source).toMatch(/^https:\/\/en\.wiktionary\.org\/wiki\/.+#Arabic$/);
			expect(pair.active).not.toBe(pair.passive);
			expect(participleTasks.filter((task) => task.pairId === pair.id)).toHaveLength(4);
		}
		for (const task of participleTasks) {
			expect(participlePairs.some((pair) => pair.id === task.pairId)).toBe(true);
			expect(task.status).toBe('draft');
			expect(task.answer.trim().length).toBeGreaterThan(20);
		}
		for (const rule of participleRules) {
			expect(participleSources.some((source) => source.id === rule.sourceId)).toBe(true);
		}
		expect(participleSources.filter((source) => source.license === 'CC BY 4.0')).toHaveLength(2);
	});
});
