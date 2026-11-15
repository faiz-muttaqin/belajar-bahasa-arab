import type { Lesson } from '#lib/content/lessons/types.js';
import type {
	Competency,
	Prerequisite,
	Roadmap,
	RoadmapBranch,
	RoadmapStage,
	RoadmapStep
} from './types.js';

type MapLesson = Pick<Lesson, 'id' | 'slug' | 'track' | 'title' | 'goal' | 'minutes'>;
type CompetencyHome = { id: string; title: string; planned: boolean };
export type RoadmapStepView = RoadmapStep & {
	lessons: readonly MapLesson[];
	minutes: number;
	competencies: readonly (Competency & { home: CompetencyHome })[];
	prerequisites: readonly (Prerequisite & { title: string; home: CompetencyHome })[];
};
export type RoadmapStageView = Omit<RoadmapStage, 'steps'> & {
	steps: readonly RoadmapStepView[];
	minutes: number;
	branches: readonly RoadmapBranch[];
};

/** Static reader data only. Position and understanding remain separate RM-04/RM-05 work. */
export function presentRoadmap(
	map: Roadmap,
	nodes: readonly Competency[],
	lessons: readonly MapLesson[]
) {
	const byLesson = new Map(lessons.map((lesson) => [lesson.id, lesson]));
	const byCompetency = new Map(nodes.map((node) => [node.id, node]));
	const homes = new Map<string, CompetencyHome>();
	for (const stage of map.stages) {
		for (const step of stage.steps) {
			for (const id of step.primaryCompetencyIds)
				homes.set(id, { id: step.id, title: step.title, planned: false });
		}
	}
	for (const branch of map.branches) {
		for (const id of branch.competencyIds)
			homes.set(id, { id: branch.id, title: branch.title, planned: branch.status === 'planned' });
	}
	function homeFor(id: string) {
		const home = homes.get(id);
		if (!home) throw new Error(`Missing competency home: ${id}`);
		return home;
	}
	const strength = { optional: 0, soft: 1, hard: 2 };
	const stages: RoadmapStageView[] = map.stages.map((stage) => {
		const steps = stage.steps.map((step): RoadmapStepView => {
			const stepLessons = step.lessonIds.map((id) => {
				const lesson = byLesson.get(id);
				if (!lesson) throw new Error(`Missing roadmap lesson: ${id}`);
				return lesson;
			});
			const competencies = step.competencyIds.map((id) => {
				const node = byCompetency.get(id);
				if (!node) throw new Error(`Missing roadmap competency: ${id}`);
				return { ...node, home: homeFor(id) };
			});
			const dependencies = new Map<string, Prerequisite>();
			for (const node of competencies) {
				for (const dependency of node.prerequisites) {
					if (step.competencyIds.includes(dependency.id)) continue;
					const existing = dependencies.get(dependency.id);
					if (!existing || strength[dependency.strength] > strength[existing.strength])
						dependencies.set(dependency.id, dependency);
				}
			}
			return {
				...step,
				lessons: stepLessons,
				minutes: stepLessons.reduce((sum, lesson) => sum + lesson.minutes, 0),
				competencies,
				prerequisites: [...dependencies.values()].map((dependency) => ({
					...dependency,
					title: byCompetency.get(dependency.id)?.titleId ?? dependency.id,
					home: homeFor(dependency.id)
				})),
				sources: [
					...new Map(
						[...step.sources, ...competencies.flatMap((node) => node.sources)].map((source) => [
							source.href,
							source
						])
					).values()
				]
			};
		});
		return {
			...stage,
			steps,
			minutes: steps.reduce((sum, step) => sum + step.minutes, 0),
			branches: map.branches.filter((branch) => branch.stageId === stage.id)
		};
	});
	return {
		stages,
		mainLessons: stages
			.filter((stage) => !stage.optional)
			.flatMap((stage) => stage.steps.flatMap((step) => step.lessons)).length
	};
}

export type RoadmapView = ReturnType<typeof presentRoadmap>;
