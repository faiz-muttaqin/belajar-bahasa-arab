import { describe, expect, it } from 'vitest';
import {
	participlePairs,
	participleRules,
	participleSources,
	participleTasks
} from './participle-lessons.js';

describe('OER-02b participle lesson', () => {
	it('provides 15 attested families across Forms I to X and four kinds of contextual task', () => {
		expect(participlePairs).toHaveLength(15);
		expect(new Set(participlePairs.map((pair) => pair.form))).toEqual(
			new Set(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'])
		);
		expect(new Set(participlePairs.map((pair) => pair.id)).size).toBe(15);
		expect(participlePairs.find((pair) => pair.id === 'baa')?.passive).toBe('مَبِيعٌ');
		expect(participleTasks).toHaveLength(60);
		expect(new Set(participleTasks.map((task) => task.id)).size).toBe(60);
		expect(new Set(participleTasks.map((task) => task.arabic)).size).toBe(60);
		expect(new Set(participleTasks.map((task) => task.kind)).size).toBe(4);
		for (const pair of participlePairs) {
			expect(pair.source).toMatch(/^https:\/\/en\.wiktionary\.org\/wiki\/.+#Arabic$/);
			expect(pair.dataId).toMatch(/-/);
			expect(pair.masdar.trim().length).toBeGreaterThan(2);
			expect(pair.note.trim().length).toBeGreaterThan(20);
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

	it('marks intransitive or fixed-form cases instead of inventing a passive participle', () => {
		const unusual = participlePairs.filter((pair) => pair.passive === null);
		expect(unusual.map((pair) => pair.id).sort()).toEqual(['ihmarra', 'inqataa', 'ittasala']);
		for (const pair of unusual) expect(pair.passiveMeaning).toBe('tidak lazim');
		for (const pair of participlePairs) {
			if (pair.passive !== null) expect(pair.active === pair.passive).toBe(pair.id === 'ikhtara');
		}
	});

	it('covers sound, mithal and ajwaf roots', () => {
		const kinds = new Set(participlePairs.map((pair) => pair.rootKind));
		expect(kinds).toEqual(new Set(['صَحِيحٌ', 'أَجْوَفُ', 'مِثَالٌ']));
	});

	it('uses the expected pattern vowels for each participle', () => {
		const patterns: Record<string, [string, string | null]> = {
			saada: ['مُسَاعِدٌ', 'مُسَاعَدٌ'],
			taallama: ['مُتَعَلِّمٌ', 'مُتَعَلَّمٌ'],
			tabadala: ['مُتَبَادِلٌ', 'مُتَبَادَلٌ'],
			intazara: ['مُنْتَظِرٌ', 'مُنْتَظَرٌ'],
			istaqbala: ['مُسْتَقْبِلٌ', 'مُسْتَقْبَلٌ']
		};
		for (const [id, [active, passive]] of Object.entries(patterns)) {
			const pair = participlePairs.find((item) => item.id === id);
			expect(pair?.active).toBe(active);
			expect(pair?.passive).toBe(passive);
		}
	});
});
