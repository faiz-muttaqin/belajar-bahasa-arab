import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { competencies } from './competencies.js';

describe('RM-02 competency catalog', () => {
	it('includes every original and intermediate-reading graph node', () => {
		const graph = readFileSync('docs/curriculum/COMPETENCY_GRAPH.md', 'utf8');
		const original = graph.split('## 2. Nodes')[1]!.split('## 3. Units')[0]!;
		const reading = graph
			.split('### Cakupan bacaan tingkat menengah')[1]!
			.split('## 4. Activity gates')[0]!;
		const ids = Array.from(
			(original + reading).matchAll(/^\|\s+(C[ABR]-\d{2})\s+\|/gm),
			([, id]) => id
		);
		expect(competencies.map((node) => node.id).sort()).toEqual(ids.sort());
		expect(competencies).toHaveLength(33);
	});

	it('preserves all documented graph edges and the three reading extensions', () => {
		const graph = readFileSync('docs/curriculum/COMPETENCY_GRAPH.md', 'utf8');
		const documented = Array.from(
			graph
				.split('## 7. Edge reasons')[1]!
				.matchAll(/^\|\s+(C[ABR]-\d{2})\s+\|\s+(C[ABR]-\d{2})\s+\|\s+(hard|soft|optional)\s+\|/gm),
			([, from, to, strength]) => `${from}:${to}:${strength}`
		);
		const actual = competencies.flatMap((node) =>
			node.prerequisites.map((dependency) => `${dependency.id}:${node.id}:${dependency.strength}`)
		);
		const reading = [
			'CB-07:CB-22:soft',
			'CB-12:CB-22:soft',
			'CB-15:CB-22:soft',
			'CB-22:CB-23:soft',
			'CB-12:CB-24:soft',
			'CB-22:CB-24:soft',
			'CB-23:CB-24:soft'
		];
		expect(actual.sort()).toEqual([...documented, ...reading].sort());
		expect(actual).toHaveLength(55);
	});

	it('keeps every goal sourced and draft without adding Arabic lesson text', () => {
		expect(
			competencies.every(
				(node) =>
					node.reviewStatus === 'draft' &&
					node.canDo.startsWith('Saya ') &&
					node.sources.length > 0 &&
					node.sources.every((source) => source.usageType === 'independent-original')
			)
		).toBe(true);
		expect(
			competencies
				.flatMap((node) => node.prerequisites)
				.filter((dependency) => dependency.strength === 'hard')
		).toHaveLength(4);
	});
});
