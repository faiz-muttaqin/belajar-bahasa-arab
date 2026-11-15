import { describe, expect, it } from 'vitest';
import { competencies } from '#lib/content/competencies.js';
import { roadmap } from '#lib/content/roadmap.js';
import { lessonsFor } from '#lib/content/lessons/index.js';
import { presentRoadmap } from './presentation.js';

const lessons = [...lessonsFor('iqra'), ...lessonsFor('belajar')];
describe('RM-03 static map presentation', () => {
	it('uses stable lesson IDs and aggregates the current catalog minutes', () => {
		const view = presentRoadmap(roadmap, competencies, lessons);
		const vowelStep = view.stages[0]!.steps[1]!;
		expect(view.mainLessons).toBe(23);
		expect(vowelStep.lessons.map((lesson) => lesson.id)).toEqual([
			'lesson-a2-01',
			'lesson-a2-02',
			'lesson-a2-03'
		]);
		expect(vowelStep.minutes).toBe(
			lessons
				.filter((lesson) => vowelStep.lessonIds.includes(lesson.id))
				.reduce((sum, lesson) => sum + lesson.minutes, 0)
		);
		const renamed = lessons.map((lesson) =>
			lesson.id === 'lesson-u1-01' ? { ...lesson, slug: 'a-new-slug', minutes: 99 } : lesson
		);
		expect(
			presentRoadmap(roadmap, competencies, renamed).stages[1]!.steps[0]!.lessons[0]
		).toMatchObject({ id: 'lesson-u1-01', slug: 'a-new-slug', minutes: 99 });
	});
	it('deduplicates suggested prerequisites and preserves planned competency homes', () => {
		const view = presentRoadmap(roadmap, competencies, lessons);
		const action = view.stages[4]!.steps[0]!;
		expect(action.prerequisites.map((dependency) => dependency.id)).toEqual(['CB-06', 'CB-03']);
		const clause = view.stages[4]!.steps[2]!;
		expect(clause.competencies.find((node) => node.id === 'CB-20')!.home).toMatchObject({
			id: 'branch-conversation',
			planned: true
		});
		expect(new Set(clause.sources.map((source) => source.href)).size).toBe(clause.sources.length);
	});
	it('rejects an unknown lesson instead of silently omitting its map entry', () => {
		expect(() => presentRoadmap(roadmap, competencies, lessons.slice(1))).toThrow(
			'Missing roadmap lesson: lesson-a1-01'
		);
	});
});
