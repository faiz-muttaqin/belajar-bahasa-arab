import { describe, expect, it } from 'vitest';
import {
	amalExamples,
	amalRules,
	amalSources,
	amalTasks,
	validateAmal
} from './participle-amal.js';

describe('G-02 ‘amal of isim fā‘il and isim maf‘ūl', () => {
	it('has four rules, seven examples and seven draft exercises with no duplicates', () => {
		expect(amalRules).toHaveLength(4);
		expect(amalExamples).toHaveLength(7);
		expect(amalTasks).toHaveLength(7);
		expect(validateAmal()).toEqual([]);
		expect(amalTasks.every((task) => task.status === 'draft')).toBe(true);
		for (const rule of amalRules) {
			expect(amalSources.some((source) => source.id === rule.sourceId)).toBe(true);
			expect(rule.id).toMatch(/^g02\.amal-[a-z-]+$/);
		}
	});

	it('writes every Arabic sentence with harakat on every word', () => {
		const mark = /[ً-ْ]/u;
		for (const item of [...amalExamples, ...amalTasks]) {
			const words = item.arabic
				.replace(/[؟.]/gu, '')
				.split(/\s+/u)
				.filter(Boolean)
				// Function words with no vowel to show: هُوَ and the like still carry harakat.
				.filter((word) => /[ء-ي]/u.test(word));
			for (const word of words) expect(word, `${item.id}: ${word}`).toMatch(mark);
		}
	});

	it('shows the object manṣūb after a working isim fā‘il and majrūr under iḍāfah', () => {
		const text = (id: string) => amalExamples.find((item) => item.id === id)?.arabic ?? '';
		expect(text('amal-ex-02')).toContain('كَاتِبٌ الدَّرْسَ');
		expect(text('amal-ex-04')).toContain('كَاتِبُ الدَّرْسِ');
		expect(text('amal-ex-05')).toContain('الْمَفْتُوحَ بَابُهَا');
	});

	it('keeps source limits explicit instead of claiming more than was checked', () => {
		const naib = amalSources.find((source) => source.id === 'naib');
		expect(naib?.note).toContain('ringkasan pemeriksa');
		expect(naib?.license).toContain('belum diperiksa');
		expect(amalRules.find((rule) => rule.id === 'g02.amal-isim-maful')?.caution).toContain(
			'tidak diuraikan'
		);
		expect(amalSources.find((source) => source.id === 'fail')?.note).toContain('tampak rusak');
	});
});
