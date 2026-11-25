/**
 * Registry of every stable G-02 rule ID, collected from the lesson modules. Prerequisites point
 * at other G-02 rules and at competencies in the learning map (`competencies.ts`).
 */
import { competencies } from './competencies.js';
import { amalRules } from './participle-amal.js';
import { masdarRules } from './masdar-lessons.js';
import { participleRules } from './participle-lessons.js';
import { sharafSections } from './sharaf-lessons.js';
import { G02_RULE_ID, type RulePrerequisites } from './g02-types.js';

export type G02RulePage =
	'kaidah/sharaf/' | 'kaidah/participle/' | 'kaidah/participle/amal/' | 'kaidah/masdar/';

export type G02Rule = {
	id: string;
	title: string;
	page: G02RulePage;
	prerequisites: RulePrerequisites;
};

export const g02Rules: readonly G02Rule[] = [
	...sharafSections.map((section) => ({
		id: section.ruleId,
		title: section.title,
		page: 'kaidah/sharaf/' as const,
		prerequisites: section.prerequisites
	})),
	...participleRules.map((rule) => ({
		id: rule.id,
		title: rule.title,
		page: 'kaidah/participle/' as const,
		prerequisites: rule.prerequisites
	})),
	...masdarRules.map((rule) => ({
		id: rule.ruleId,
		title: rule.title,
		page: 'kaidah/masdar/' as const,
		prerequisites: rule.prerequisites
	})),
	...amalRules.map((rule) => ({
		id: rule.id,
		title: rule.title,
		page: 'kaidah/participle/amal/' as const,
		prerequisites: rule.prerequisites
	}))
];

export const g02RuleIndex: ReadonlyMap<string, G02Rule> = new Map(
	g02Rules.map((rule) => [rule.id, rule])
);

const competencyIndex = new Map(competencies.map((item) => [item.id, item]));

/** Title of a learning-map competency, or undefined when the ID is unknown. */
export function competencyTitle(id: string): string | undefined {
	return competencyIndex.get(id)?.titleId;
}

/** Checks IDs, references to rules and competencies, and that prerequisites form no cycle. */
export function validateG02Rules(rules: readonly G02Rule[] = g02Rules): string[] {
	const errors: string[] = [];
	const ids = new Set<string>();
	for (const rule of rules) {
		if (!G02_RULE_ID.test(rule.id)) errors.push(`Invalid rule ID: ${rule.id}`);
		if (ids.has(rule.id)) errors.push(`Duplicate rule ID: ${rule.id}`);
		ids.add(rule.id);
	}
	for (const rule of rules) {
		for (const dep of rule.prerequisites.rules) {
			if (!ids.has(dep)) errors.push(`Unknown rule prerequisite: ${rule.id} needs ${dep}`);
			if (dep === rule.id) errors.push(`Self prerequisite: ${rule.id}`);
		}
		for (const dep of rule.prerequisites.competencies) {
			if (!competencyIndex.has(dep))
				errors.push(`Unknown competency prerequisite: ${rule.id} needs ${dep}`);
		}
	}
	const state = new Map<string, 'visiting' | 'done'>();
	const byId = new Map(rules.map((rule) => [rule.id, rule]));
	const visit = (id: string, path: string[]) => {
		const mark = state.get(id);
		if (mark === 'done') return;
		if (mark === 'visiting') {
			errors.push(`Prerequisite cycle: ${[...path, id].join(' -> ')}`);
			return;
		}
		state.set(id, 'visiting');
		for (const dep of byId.get(id)?.prerequisites.rules ?? []) {
			if (byId.has(dep)) visit(dep, [...path, id]);
		}
		state.set(id, 'done');
	};
	for (const rule of rules) visit(rule.id, []);
	return errors;
}
