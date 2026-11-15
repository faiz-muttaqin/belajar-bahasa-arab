import type { LessonProgress } from '#lib/progress/lessons.js';
import type { LessonTrack } from '#lib/content/lessons/types.js';
import type {
	Roadmap,
	RoadmapLesson,
	RoadmapPosition,
	RoadmapStep,
	StepMark,
	StepStatus
} from './types.js';

function latestMarks(marks: readonly StepMark[]) {
	const latest = new Map<string, StepMark>();
	for (const mark of marks) {
		if (!Number.isSafeInteger(mark.at) || mark.at <= 0) continue;
		const previous = latest.get(mark.stepId);
		if (
			!previous ||
			mark.at > previous.at ||
			(mark.at === previous.at && mark.mark > previous.mark)
		) {
			latest.set(mark.stepId, mark);
		}
	}
	return latest;
}

export function stepStatus(
	step: RoadmapStep,
	lessons: readonly RoadmapLesson[],
	lessonProgress: readonly LessonProgress[],
	marks: readonly StepMark[] = []
): StepStatus {
	// An explicit choice also allows revisiting a previously completed step.
	const mark = latestMarks(marks).get(step.id);
	if (mark && mark.mark !== 'cleared') return mark.mark;
	const byLesson = new Map(lessons.map((lesson) => [lesson.id, lesson]));
	const byProgress = new Map(lessonProgress.map((record) => [record.lessonId, record]));
	if (
		step.lessonIds.length > 0 &&
		step.lessonIds.every((id) => {
			const lesson = byLesson.get(id);
			return lesson && byProgress.get(id)?.completedRevision === lesson.revision;
		})
	)
		return 'completed';
	return step.lessonIds.some((id) => byProgress.has(id)) ? 'learning' : 'not_started';
}

export function currentPosition(
	roadmap: Roadmap,
	lessons: readonly RoadmapLesson[],
	lessonProgress: readonly LessonProgress[],
	marks: readonly StepMark[] = [],
	track: LessonTrack = 'belajar'
): RoadmapPosition | undefined {
	const positions = roadmap.stages
		.filter((stage) => stage.track === track)
		.flatMap((stage) =>
			stage.steps.map((step, index) => ({
				step,
				position: {
					stageId: stage.id,
					stageNumber: stage.number,
					stepId: step.id,
					stepNumber: index + 1,
					stepCount: stage.steps.length
				}
			}))
		);
	const byMark = latestMarks(marks);
	const explicit = positions
		.filter(({ step }) => byMark.get(step.id)?.mark === 'learning')
		.sort(
			(a, b) =>
				byMark.get(b.step.id)!.at - byMark.get(a.step.id)!.at || a.step.id.localeCompare(b.step.id)
		);
	if (explicit[0]) return explicit[0].position;
	return positions.find(({ step }) => {
		const status = stepStatus(step, lessons, lessonProgress, marks);
		return status !== 'completed' && status !== 'skipped';
	})?.position;
}

/** Counts describe path coverage only. Opening/completing a lesson proves no mastery. */
export function summarizeRoadmap(
	roadmap: Roadmap,
	lessons: readonly RoadmapLesson[],
	lessonProgress: readonly LessonProgress[],
	marks: readonly StepMark[] = [],
	track: LessonTrack = 'belajar'
) {
	const byProgress = new Map(lessonProgress.map((record) => [record.lessonId, record]));
	return {
		position: currentPosition(roadmap, lessons, lessonProgress, marks, track),
		stages: roadmap.stages.map((stage) => {
			const counts: Record<StepStatus, number> = {
				not_started: 0,
				learning: 0,
				completed: 0,
				skipped: 0
			};
			for (const step of stage.steps) counts[stepStatus(step, lessons, lessonProgress, marks)]++;
			const lessonIds = new Set(stage.steps.flatMap((step) => step.lessonIds));
			return {
				stageId: stage.id,
				track: stage.track,
				optional: stage.optional,
				totalSteps: stage.steps.length,
				counts,
				totalLessons: lessonIds.size,
				completedLessons: lessons.filter(
					(lesson) =>
						lessonIds.has(lesson.id) &&
						byProgress.get(lesson.id)?.completedRevision === lesson.revision
				).length,
				totalCompetencies: new Set(stage.steps.flatMap((step) => step.primaryCompetencyIds)).size
			};
		})
	};
}
