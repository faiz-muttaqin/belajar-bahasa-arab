import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { competencies } from './competencies.js';
import { lessonsFor } from './lessons/index.js';
import { roadmap, roadmapReferencePaths } from './roadmap.js';
import { validateRoadmap } from '#lib/domain/roadmap/validate.js';

describe('RM-02 published lesson mapping', () => {
	it('maps all 29 lessons exactly once into 27 steps and seven stages', () => {
		const lessons = [...lessonsFor('iqra'), ...lessonsFor('belajar')];
		const steps = roadmap.stages.flatMap((stage) => stage.steps);
		expect(lessons).toHaveLength(29);
		expect(steps).toHaveLength(27);
		expect(roadmap.stages).toHaveLength(7);
		expect(steps.flatMap((step) => step.lessonIds).sort()).toEqual(
			lessons.map((lesson) => lesson.id).sort()
		);
		expect(() =>
			validateRoadmap(roadmap, competencies, lessons, roadmapReferencePaths)
		).not.toThrow();
	});

	it('counts a competency at one primary home while allowing cross-step reading', () => {
		const homes = [
			...roadmap.stages.flatMap((stage) =>
				stage.steps.flatMap((step) => step.primaryCompetencyIds)
			),
			...roadmap.branches.flatMap((branch) => branch.competencyIds)
		];
		expect(homes.sort()).toEqual(competencies.map((node) => node.id).sort());
		expect(roadmap.stages[4]!.steps[2]!.competencyIds).toContain('CB-20');
		expect(roadmap.stages[4]!.steps[2]!.primaryCompetencyIds).not.toContain('CB-20');
		expect(
			roadmap.branches.find((branch) => branch.id === 'branch-conversation')?.competencyIds
		).toEqual(['CB-20']);
	});

	it('keeps foundations optional, future work unlinked and reference links real', () => {
		expect(roadmap.stages[0]!).toMatchObject({ optional: true, track: 'iqra', number: 0 });
		expect(roadmap.branches.filter((branch) => branch.status === 'planned')).toHaveLength(3);
		expect(
			roadmap.branches
				.filter((branch) => branch.status === 'planned')
				.every((branch) => branch.links.length === 0)
		).toBe(true);
		expect(roadmap.stages.filter((stage) => stage.checkpoint.status === 'available')).toHaveLength(1);
		expect(roadmap.stages[3]!.checkpoint.path).toBe('belajar/checkpoint-3/');
		expect(roadmap.stages.filter((stage) => stage.number !== 3).every((stage) => stage.checkpoint.status === 'planned')).toBe(true);
		for (const path of roadmapReferencePaths)
			expect(existsSync(`src/routes/${path}+page.svelte`)).toBe(true);
	});
});
