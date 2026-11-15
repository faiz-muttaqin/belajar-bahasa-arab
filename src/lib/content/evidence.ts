import type { Lesson } from './lessons/types.js';
import type { EvidenceItem } from '#lib/domain/roadmap/evidence.js';

/** Catalog of published, source-backed items. Retired IDs no longer contribute evidence. */
export function collectEvidenceItems(lessons: readonly Lesson[]): EvidenceItem[] {
	const items: EvidenceItem[] = [];
	const seen = new Set<string>();
	for (const lesson of lessons) {
		if (!lesson.references.length) throw new Error(`Evidence missing sources: ${lesson.id}`);
		for (const question of lesson.meaningPractice ?? []) {
			items.push({
				id: question.id,
				lessonId: lesson.id,
				competencyIds: [...lesson.competencies],
				skill: 'meaning',
				kind: question.kind
			});
		}
		for (const check of lesson.selfChecks ?? []) {
			items.push({
				id: check.id,
				lessonId: lesson.id,
				competencyIds: [...check.competencyIds],
				skill: check.skill,
				kind: 'self-assessment'
			});
		}
	}
	for (const item of items) {
		if (seen.has(item.id)) throw new Error(`Duplicate evidence item: ${item.id}`);
		seen.add(item.id);
	}
	return items;
}
