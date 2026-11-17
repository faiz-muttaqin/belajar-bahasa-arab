import { describe, expect, it } from 'vitest';
import { nisbahRules, nisbahSources, nisbahTasks, validateNisbahTasks } from './nisbah-lessons.js';

describe('L-02 MSA nisbah lesson', () => {
	it('contains 20 stable original different stimuli and attributable grammar/lexeme sources', () => {
		expect(nisbahTasks).toHaveLength(20);
		expect(validateNisbahTasks(nisbahTasks)).toEqual([]);
		expect(nisbahRules).toHaveLength(3);
		expect(new Set(nisbahTasks.map((item) => item.id)).size).toBe(20);
		expect(new Set(nisbahTasks.map((item) => item.arabic)).size).toBe(20);
		expect(nisbahTasks.every((item) => item.status === 'draft')).toBe(true);
		expect(nisbahSources.grammar.license).toBe('CC BY 4.0');
		expect(nisbahSources.agreement.license).toBe('View-only');
		for (const task of nisbahTasks) {
			const source = nisbahSources[task.lexicalSource];
			expect(source.href.startsWith('https://en.wiktionary.org/wiki/')).toBe(true);
			expect(task.question.length).toBeGreaterThan(15);
			expect(task.answer.length).toBeGreaterThan(30);
		}
	});

	it('rejects duplicate, incomplete or incorrectly referenced practice', () => {
		const duplicate = { ...nisbahTasks[0]!, id: nisbahTasks[1]!.id };
		expect(validateNisbahTasks([duplicate, ...nisbahTasks.slice(1)])).toContain(
			'Duplicate ID: nis-02'
		);
		expect(
			validateNisbahTasks([{ ...nisbahTasks[0]!, answer: '' }, ...nisbahTasks.slice(1)])
		).toContain('Missing practice content: nis-01');
	});
});
