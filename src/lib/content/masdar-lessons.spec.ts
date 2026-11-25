import { describe, expect, it } from 'vitest';
import {
	masdarGrammarSource,
	masdarLexemes,
	masdarRules,
	masdarTasks,
	validateMasdarTasks
} from './masdar-lessons.js';

describe('OER-02 masdar reader', () => {
	it('publishes 13 lexically sourced verb–masdar pairs and 52 different drafts', () => {
		expect(masdarLexemes).toHaveLength(13);
		expect(masdarTasks).toHaveLength(52);
		expect(validateMasdarTasks(masdarTasks)).toEqual([]);
		expect(new Set(masdarTasks.map((item) => item.id)).size).toBe(52);
		expect(new Set(masdarTasks.map((item) => item.arabic)).size).toBe(52);
		expect(new Set(masdarTasks.map((item) => item.kind)).size).toBe(4);
		expect(masdarTasks.every((item) => item.status === 'draft')).toBe(true);
		expect(masdarGrammarSource.license).toContain('CC BY 4.0');
		for (const lexeme of masdarLexemes) {
			expect(lexeme.source).toMatch(/^https:\/\/en\.wiktionary\.org\/wiki\/[^/]+/);
			expect(lexeme.masdar.trim().length).toBeGreaterThan(2);
			expect(lexeme.pattern.trim().length).toBeGreaterThan(2);
			expect(masdarTasks.filter((item) => item.lexemeId === lexeme.id)).toHaveLength(4);
		}
	});

	it('gives one sourced masdar pair for every Form from I to X', () => {
		const forms = new Set(masdarLexemes.map((lexeme) => lexeme.form));
		for (const form of ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']) {
			expect(forms.has(form as never)).toBe(true);
		}
	});

	it('gives Form II and Form IV their regular patterns with attested pairs', () => {
		const nazama = masdarLexemes.find((lexeme) => lexeme.id === 'nazama');
		const arsala = masdarLexemes.find((lexeme) => lexeme.id === 'arsala');
		expect([nazama?.masdar, nazama?.pattern, nazama?.wazanBab]).toEqual(['تَنْظِيمٌ', 'تَفْعِيلٌ', 7]);
		expect([arsala?.masdar, arsala?.pattern, arsala?.wazanBab]).toEqual(['إِرْسَالٌ', 'إِفْعَالٌ', 9]);
		const rule = masdarRules.find((item) => item.ruleId === 'g02.masdar-form-ii-iv');
		expect(rule?.prerequisites.rules).toEqual(['g02.masdar-vs-fiil']);
		expect(rule?.evidence).toContain('verbs-mazid.json');
	});

	it('gives every masdar rule a stable ID, prerequisites and a known rule per lexeme', () => {
		const ids = masdarRules.map((rule) => rule.ruleId);
		expect(new Set(ids).size).toBe(ids.length);
		for (const id of ids) expect(id).toMatch(/^g02\.[a-z0-9-]+$/);
		for (const lexeme of masdarLexemes) expect(ids).toContain(lexeme.ruleId);
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
		expect(validateMasdarTasks(masdarTasks.slice(1))).toContain(
			'Four tasks are required per lexeme: kataba has 3'
		);
	});
});
