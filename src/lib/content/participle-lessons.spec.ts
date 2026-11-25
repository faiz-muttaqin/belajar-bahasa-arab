import { describe, expect, it } from 'vitest';
import {
	participlePairs,
	participleRules,
	participleSources,
	participleTasks
} from './participle-lessons.js';

describe('OER-02b participle lesson', () => {
	it('provides 26 attested families across Forms I to X and rubā‘ī and four kinds of contextual task', () => {
		expect(participlePairs).toHaveLength(26);
		expect(new Set(participlePairs.map((pair) => pair.form))).toEqual(
			new Set(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'Iq', 'IIq'])
		);
		expect(new Set(participlePairs.map((pair) => pair.id)).size).toBe(26);
		expect(participlePairs.find((pair) => pair.id === 'baa')?.passive).toBe('مَبِيعٌ');
		expect(participleTasks).toHaveLength(104);
		expect(new Set(participleTasks.map((task) => task.id)).size).toBe(104);
		expect(new Set(participleTasks.map((task) => task.arabic)).size).toBe(104);
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
		expect(participleSources.some((source) => source.id === 'wiktionary')).toBe(true);
	});

	it('marks intransitive or fixed-form cases instead of inventing a passive participle', () => {
		const unusual = participlePairs.filter((pair) => pair.passive === null);
		expect(unusual.map((pair) => pair.id).sort()).toEqual([
			'ihmarra',
			'inqataa',
			'istamarra',
			'ittasala',
			'tadahraja'
		]);
		for (const pair of unusual) expect(pair.passiveMeaning).toBe('tidak lazim');
		for (const pair of participlePairs) {
			if (pair.passive !== null) expect(pair.active === pair.passive).toBe(pair.id === 'ikhtara');
		}
	});

	it('covers sound, mithal, ajwaf, naqis, lafif, mahmuz, mudaaf and quadriliteral roots', () => {
		const kinds = new Set(participlePairs.map((pair) => pair.rootKind));
		expect(kinds).toEqual(
			new Set([
				'صَحِيحٌ',
				'أَجْوَفُ',
				'مِثَالٌ',
				'نَاقِصٌ',
				'لَفِيفٌ مَفْرُوقٌ',
				'لَفِيفٌ مَقْرُونٌ',
				'مَهْمُوزٌ',
				'مُضَاعَفٌ',
				'رُبَاعِيٌّ صَحِيحٌ'
			])
		);
		const byKind = (kind: string) => participlePairs.filter((pair) => pair.rootKind === kind);
		expect(byKind('نَاقِصٌ').map((pair) => pair.id)).toEqual(['daa', 'banaa']);
		expect(byKind('لَفِيفٌ مَفْرُوقٌ').map((pair) => pair.id)).toEqual(['waqaa']);
		expect(byKind('لَفِيفٌ مَقْرُونٌ').map((pair) => pair.id)).toEqual(['rawaa']);
		expect(byKind('مَهْمُوزٌ').map((pair) => pair.id)).toEqual(['akhadha', 'saala', 'qaraa']);
		expect(byKind('مُضَاعَفٌ').map((pair) => pair.id)).toEqual(['madda', 'istamarra']);
		expect(byKind('رُبَاعِيٌّ صَحِيحٌ').map((pair) => pair.id)).toEqual(['tarjama', 'tadahraja']);
	});

	it('writes the nāqiṣ isim fā‘il without its final yā’ and the isim maf‘ūl with shadda', () => {
		const naqis = participlePairs.filter((pair) => pair.rootKind === 'نَاقِصٌ');
		for (const pair of naqis) {
			expect(pair.active.endsWith('ٍ')).toBe(true);
			expect(pair.passive).toMatch(/[\u064C\u0651]{2}$/u);
			expect(pair.passive).toMatch(/\u0651/u);
		}
		expect(participlePairs.find((pair) => pair.id === 'waqaa')?.present).toBe('يَقِي');
		expect(participlePairs.find((pair) => pair.id === 'akhadha')?.active).toBe('آخِذٌ');
		expect(participlePairs.find((pair) => pair.id === 'madda')?.active).toBe('مَادٌّ');
		expect(participlePairs.find((pair) => pair.id === 'madda')?.passive).toBe('مَمْدُودٌ');
	});

	it('keeps rubā‘ī forms on the wazan groups 19 and 20 with the right participle vowels', () => {
		const tarjama = participlePairs.find((pair) => pair.id === 'tarjama');
		const tadahraja = participlePairs.find((pair) => pair.id === 'tadahraja');
		expect([tarjama?.wazanBab, tadahraja?.wazanBab]).toEqual([19, 20]);
		expect([tarjama?.active, tarjama?.passive]).toEqual(['مُتَرْجِمٌ', 'مُتَرْجَمٌ']);
		expect(tarjama?.masdar).toBe('تَرْجَمَةٌ');
		expect(tadahraja?.masdar).toBe('تَدَحْرُجٌ');
		expect(tadahraja?.passive).toBeNull();
	});

	it('gives every rule a stable ID and prerequisites and every pair a known rule', () => {
		const ids = participleRules.map((rule) => rule.id);
		expect(new Set(ids).size).toBe(ids.length);
		for (const id of ids) expect(id).toMatch(/^g02\.[a-z0-9-]+$/);
		for (const pair of participlePairs) expect(ids).toContain(pair.ruleId);
		expect(ids).toEqual(
			expect.arrayContaining([
				'g02.akar-naqis',
				'g02.akar-lafif',
				'g02.akar-mahmuz',
				'g02.akar-mudaaf',
				'g02.ruba-i-mujarrad',
				'g02.ruba-i-mazid'
			])
		);
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
