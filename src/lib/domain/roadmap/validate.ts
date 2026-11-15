import type { Competency, Roadmap, RoadmapLesson, SourcedDraft } from './types.js';

/** Runs with lesson validation during prerender; has no browser or storage dependencies. */
export function validateRoadmap(
	roadmap: Roadmap,
	competencies: readonly Competency[],
	lessons: readonly RoadmapLesson[],
	availablePaths: readonly string[]
): void {
	const issues: string[] = [];
	const ids = new Set<string>();
	const competencyById = new Map(competencies.map((node) => [node.id, node]));
	const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
	const lessonCounts = new Map<string, number>();
	const homes = new Map<string, { count: number; order?: number }>();
	const stageIds = new Set(roadmap.stages.map((stage) => stage.id));
	const routes = new Set(availablePaths);

	function identity(id: string, kind: string) {
		if (!id.trim() || ids.has(id)) issues.push(`Duplicate or empty ${kind} ID: ${id}`);
		ids.add(id);
	}
	function sourced(item: SourcedDraft, id: string) {
		if (item.reviewStatus !== 'draft') issues.push(`Invalid draft status: ${id}`);
		if (
			!item.sources.length ||
			item.sources.some((source) => {
				try {
					return (
						!source.label.trim() ||
						new URL(source.href).protocol !== 'https:' ||
						!['independent-original', 'adaptation', 'verbatim'].includes(source.usageType)
					);
				} catch {
					return true;
				}
			})
		)
			issues.push(`Missing or invalid source: ${id}`);
	}
	function references(references: readonly string[], id: string) {
		if (new Set(references).size !== references.length)
			issues.push(`Duplicate competency reference: ${id}`);
		for (const reference of references) {
			if (!competencyById.has(reference)) issues.push(`Unknown competency ${reference}: ${id}`);
		}
	}
	function home(references: readonly string[], order?: number) {
		for (const id of references) {
			const previous = homes.get(id);
			homes.set(id, { count: (previous?.count ?? 0) + 1, order });
		}
	}

	for (const node of competencies) {
		identity(node.id, 'competency');
		sourced(node, node.id);
		if (!node.titleId.trim() || !node.canDo.trim())
			issues.push(`Incomplete competency: ${node.id}`);
		references(
			node.prerequisites.map((prerequisite) => prerequisite.id),
			node.id
		);
		for (const prerequisite of node.prerequisites) {
			if (prerequisite.strength !== 'hard') continue;
			if (!prerequisite.impossibleBecause?.trim())
				issues.push(`Hard prerequisite needs a reason: ${node.id}`);
			if (['CB-16', 'CR-03'].includes(prerequisite.id))
				issues.push(`Hard terminology prerequisite: ${node.id}`);
			if (node.track === 'B' && competencyById.get(prerequisite.id)?.track === 'B')
				issues.push(`Hard prerequisite inside main track: ${node.id}`);
		}
	}

	let order = 0;
	for (const stage of roadmap.stages) {
		identity(stage.id, 'stage');
		sourced(stage, stage.id);
		if (!stage.steps.length || !stage.title.trim() || !stage.canDo.trim())
			issues.push(`Incomplete stage: ${stage.id}`);
		for (const step of stage.steps) {
			identity(step.id, 'step');
			sourced(step, step.id);
			if (!step.lessonIds.length || !step.title.trim() || !step.canDo.trim())
				issues.push(`Incomplete step: ${step.id}`);
			references(step.competencyIds, step.id);
			references(step.primaryCompetencyIds, step.id);
			if (step.primaryCompetencyIds.some((id) => !step.competencyIds.includes(id)))
				issues.push(`Primary competency outside step: ${step.id}`);
			home(step.primaryCompetencyIds, order);
			for (const id of step.lessonIds) {
				lessonCounts.set(id, (lessonCounts.get(id) ?? 0) + 1);
				const lesson = lessonById.get(id);
				if (!lesson) issues.push(`Unknown lesson ${id}: ${step.id}`);
				else {
					if (lesson.track !== stage.track) issues.push(`Lesson in wrong track ${id}: ${step.id}`);
					if (lesson.competencies.some((key) => !step.competencyIds.includes(key)))
						issues.push(`Step omits lesson competency ${id}: ${step.id}`);
				}
			}
			order++;
		}
		identity(stage.checkpoint.id, 'checkpoint');
		sourced(stage.checkpoint, stage.checkpoint.id);
		references(stage.checkpoint.competencyIds, stage.checkpoint.id);
		if ('links' in stage.checkpoint)
			issues.push(`Checkpoint has unsupported links: ${stage.checkpoint.id}`);
		if (stage.checkpoint.status === 'planned' && stage.checkpoint.path)
			issues.push(`Planned checkpoint must not link: ${stage.checkpoint.id}`);
		if (
			stage.checkpoint.status === 'available' &&
			(stage.checkpoint.id !== 'checkpoint-3' || stage.checkpoint.path !== 'belajar/checkpoint-3/')
		)
			issues.push(`Unknown published checkpoint route: ${stage.checkpoint.id}`);
	}
	for (const branch of roadmap.branches) {
		identity(branch.id, 'branch');
		sourced(branch, branch.id);
		references(branch.competencyIds, branch.id);
		home(branch.competencyIds);
		if (!stageIds.has(branch.stageId)) issues.push(`Unknown branch stage: ${branch.id}`);
		if (branch.status === 'planned' && branch.links.length)
			issues.push(`Planned branch has links: ${branch.id}`);
		if (branch.status === 'available' && !branch.links.length)
			issues.push(`Available branch has no links: ${branch.id}`);
		for (const link of branch.links) {
			if (!link.label.trim() || !routes.has(link.path))
				issues.push(`Unknown branch route ${link.path}: ${branch.id}`);
		}
	}
	for (const lesson of lessons) {
		references(lesson.competencies, lesson.id);
		if (lessonCounts.get(lesson.id) !== 1)
			issues.push(`Lesson must occur exactly once: ${lesson.id}`);
	}
	for (const node of competencies) {
		const placement = homes.get(node.id);
		if (placement?.count !== 1)
			issues.push(`Competency must have exactly one primary home: ${node.id}`);
		for (const prerequisite of node.prerequisites) {
			if (prerequisite.strength !== 'hard' || placement?.order === undefined) continue;
			const earlier = homes.get(prerequisite.id);
			if (earlier?.order === undefined || earlier.order > placement.order)
				issues.push(
					`Hard prerequisite appears later or is unavailable: ${prerequisite.id} -> ${node.id}`
				);
		}
	}

	// All edge strengths count: optional links must not introduce graph cycles either.
	const visiting = new Set<string>();
	const visited = new Set<string>();
	function visit(id: string) {
		if (visiting.has(id)) {
			issues.push(`Competency cycle: ${id}`);
			return;
		}
		if (visited.has(id)) return;
		visiting.add(id);
		for (const dependency of competencyById.get(id)?.prerequisites ?? []) visit(dependency.id);
		visiting.delete(id);
		visited.add(id);
	}
	for (const node of competencies) visit(node.id);
	if (issues.length) throw new Error(`Invalid learning roadmap:\n${issues.join('\n')}`);
}
