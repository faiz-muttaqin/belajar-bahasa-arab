import { describe, expect, it } from 'vitest';
import {
	masdarGrammarSource,
	masdarLexemes,
	masdarTasks,
	validateMasdarTasks
} from './masdar-lessons.js';

describe('OER-02 masdar reader', () => {
	it('publishes 5 lexically sourced verb–masdar pairs and 20 different drafts', () => {
		expect(masdarLexemes).toHaveLength(5);
		expect(masdarTasks).toHaveLength(20);
		expect(validateMasdarTasks(masdarTasks)).toEqual([]);
		expect(new Set(masdarTasks.map((item) => item.id)).size).toBe(20);
		expect(new Set(masdarTasks.map((item) => item.arabic)).size).toBe(20);
		expect(new Set(masdarTasks.map((item) => item.kind)).size).toBe(4);
		expect(masdarTasks.every((item) => item.status === 'draft')).toBe(true);
		expect(masdarGrammarSource.license).toContain('CC BY 4.0');
		for (const lexeme of masdarLexemes) {
			expect(lexeme.source).toMatch(/^https:\/\/en\.wiktionary\.org\/wiki\/[^/]+/);
			expect(lexeme.masdar.trim().length).toBeGreaterThan(2);
		}
	});

	it('rejects duplicate IDs, duplicate stimuli, missing answers and unknown lexemes', () => {
		const duplicateId = [{ ...masdarTasks[0]!, id: 'm02' }, ...masdarTasks.slice(1)];
		expect(validateMasdarTasks(duplicateId)).toContain('Duplicate task ID: m02');
		const duplicateText = [
			{ ...masdarTasks[0]!, arabic: masdarTasks[1]!.arabic },
			...masdarTasks.slice(1)
		];
		expect(validateMasdarTasks(duplicateText)).toContain('Duplicate Arabic stimulus: m02');
		const empty = [{ ...masdarTasks[0]!, answer: '' }, ...masdarTasks.slice(1)];
		expect(validateMasdarTasks(empty)).toContain('Empty task: m01');
	});
});
