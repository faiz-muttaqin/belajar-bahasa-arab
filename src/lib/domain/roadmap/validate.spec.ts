import { describe, expect, it } from 'vitest';
import { competencies } from '#lib/content/competencies.js';
import { roadmap, roadmapReferencePaths } from '#lib/content/roadmap.js';
import { lessonsFor } from '#lib/content/lessons/index.js';
import { validateRoadmap } from './validate.js';

type Mutable<T> = { -readonly [Key in keyof T]: Mutable<T[Key]> };
function fixture() {
	return structuredClone({
		map: roadmap,
		nodes: competencies,
		lessons: [...lessonsFor('iqra'), ...lessonsFor('belajar')]
	}) as Mutable<{
		map: typeof roadmap;
		nodes: typeof competencies;
		lessons: ReturnType<typeof lessonsFor>;
	}>;
}

describe('RM-02 build-time validation rejects broken maps', () => {
	const cases: [string, (data: ReturnType<typeof fixture>) => void, RegExp][] = [
		[
			'unmapped lesson',
			({ map }) => {
				map.stages[1]!.steps[0]!.lessonIds = [];
			},
			/exactly once: lesson-u1-01/
		],
		[
			'lesson placed twice',
			({ map }) => {
				map.stages[1]!.steps[0]!.lessonIds.push('lesson-u1-01');
			},
			/exactly once: lesson-u1-01/
		],
		[
			'unknown lesson',
			({ map }) => {
				map.stages[1]!.steps[0]!.lessonIds.push('lesson-missing');
			},
			/Unknown lesson lesson-missing/
		],
		[
			'wrong track',
			({ lessons }) => {
				lessons[0]!.track = 'belajar';
			},
			/wrong track/
		],
		[
			'unknown lesson competency',
			({ lessons }) => {
				lessons[0]!.competencies = ['CB-99'];
			},
			/Unknown competency CB-99: lesson-a1-01/
		],
		[
			'unknown step competency',
			({ map }) => {
				map.stages[0]!.steps[0]!.competencyIds.push('CA-99');
			},
			/Unknown competency CA-99/
		],
		[
			'missing lesson capability on step',
			({ map }) => {
				map.stages[0]!.steps[0]!.competencyIds = [];
			},
			/Step omits lesson competency/
		],
		[
			'duplicate stage',
			({ map }) => {
				map.stages[1]!.id = map.stages[0]!.id;
			},
			/Duplicate or empty stage ID/
		],
		[
			'duplicate step',
			({ map }) => {
				map.stages[0]!.steps[1]!.id = map.stages[0]!.steps[0]!.id;
			},
			/Duplicate or empty step ID/
		],
		[
			'duplicate competency',
			({ nodes }) => {
				nodes.push(structuredClone(nodes[0]!));
			},
			/Duplicate or empty competency ID/
		],
		[
			'late hard prerequisite',
			({ map }) => {
				map.stages[0]!.steps.reverse();
			},
			/Hard prerequisite appears later/
		],
		[
			'missing hard reason',
			({ nodes }) => {
				nodes
					.find((node) => node.id === 'CA-03')!
					.prerequisites.find((dependency) => dependency.strength === 'hard')!.impossibleBecause =
					'';
			},
			/Hard prerequisite needs a reason/
		],
		[
			'hard main-track dependency',
			({ nodes }) => {
				nodes.find((node) => node.id === 'CB-04')!.prerequisites[0]! = {
					id: 'CB-03',
					strength: 'hard',
					impossibleBecause: 'TEST FIXTURE — NOT A LESSON'
				};
			},
			/Hard prerequisite inside main track/
		],
		[
			'hard terminology gate',
			({ nodes }) => {
				nodes[0]!.prerequisites.push({
					id: 'CB-16',
					strength: 'hard',
					impossibleBecause: 'TEST FIXTURE — NOT A LESSON'
				});
			},
			/Hard terminology prerequisite/
		],
		[
			'cycle through optional edges',
			({ nodes }) => {
				nodes[1]!.prerequisites.push({ id: 'CA-03', strength: 'optional' });
			},
			/Competency cycle/
		],
		[
			'unknown prerequisite',
			({ nodes }) => {
				nodes[0]!.prerequisites.push({ id: 'CA-99', strength: 'soft' });
			},
			/Unknown competency CA-99/
		],
		[
			'missing primary home',
			({ map }) => {
				map.branches[0]!.competencyIds = [];
			},
			/exactly one primary home: CA-01/
		],
		[
			'repeated primary home',
			({ map }) => {
				map.branches[0]!.competencyIds.push('CA-02');
			},
			/exactly one primary home: CA-02/
		],
		[
			'planned branch link',
			({ map }) => {
				map.branches[0]!.links.push({ label: 'Test', path: 'iqra/' });
			},
			/Planned branch has links/
		],
		[
			'unavailable branch route',
			({ map }) => {
				map.branches[3]!.links[0]!.path = 'missing/';
			},
			/Unknown branch route/
		],
		[
			'missing branch stage',
			({ map }) => {
				map.branches[0]!.stageId = 'missing';
			},
			/Unknown branch stage/
		],
		[
			'unsourced competency',
			({ nodes }) => {
				nodes[0]!.sources = [];
			},
			/Missing or invalid source: CA-01/
		],
		[
			'unsourced step',
			({ map }) => {
				map.stages[0]!.steps[0]!.sources = [];
			},
			/Missing or invalid source: step-a1/
		],
		[
			'invalid source URL',
			({ nodes }) => {
				nodes[0]!.sources[0]!.href = 'javascript:alert(1)';
			},
			/Missing or invalid source/
		]
	];
	for (const [name, corrupt, message] of cases) {
		it(name, () => {
			const data = fixture();
			corrupt(data);
			expect(() =>
				validateRoadmap(data.map, data.nodes, data.lessons, roadmapReferencePaths)
			).toThrow(message);
		});
	}

	it('accepts same-step hard prerequisites and later soft recommendations', () => {
		const data = fixture();
		const foundation = data.map.stages[0]!;
		const vowels = foundation.steps[1]!;
		const doubled = foundation.steps[2]!;
		vowels.lessonIds.push(...doubled.lessonIds);
		vowels.competencyIds = [...vowels.competencyIds, ...doubled.competencyIds];
		vowels.primaryCompetencyIds = [...vowels.primaryCompetencyIds, ...doubled.primaryCompetencyIds];
		foundation.steps.splice(2, 1);
		expect(() =>
			validateRoadmap(data.map, data.nodes, data.lessons, roadmapReferencePaths)
		).not.toThrow();
		expect(() =>
			validateRoadmap(
				roadmap,
				competencies,
				[...lessonsFor('iqra'), ...lessonsFor('belajar')],
				roadmapReferencePaths
			)
		).not.toThrow();
	});
});
