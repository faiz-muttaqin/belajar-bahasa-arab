import type { Path } from '$app/types';
import { analyzedText, type AnalysisGroup } from './analysis.js';
import { hasApprovingReview, type ReviewRecord } from '#lib/domain/review.js';

export type LessonTrack = 'belajar' | 'iqra';
export type LessonLevel = 'Fondasi' | 'Dasar' | 'Menengah';

type Example = { arabic: string; meaning: string; note?: string };
type Passage = {
	title: string;
	arabicTitle: string;
	glossary?: readonly Pick<Example, 'arabic' | 'meaning'>[];
	paragraphs: readonly { arabic: string; meaning: string; role: string }[];
};
type Exercise = {
	prompt: string;
	arabic?: string;
	answer: string;
};

export type Lesson = {
	id: string;
	slug: string;
	revision: number;
	level: LessonLevel;
	title: string;
	goal: string;
	minutes: number;
	competencies: readonly string[];
	track: LessonTrack;
	register: 'msa' | 'classical' | 'script';
	reviewStatus: 'draft' | 'approved';
	reviews?: readonly ReviewRecord[];
	references: readonly { label: string; href: string }[];
	intro: string;
	examples: readonly Example[];
	patterns: readonly string[];
	passage?: Passage;
	analysis?: readonly AnalysisGroup[];
	exercises: readonly Exercise[];
	related?: readonly { label: string; path: `${Path}#${string}` }[];
};

export type LessonSummary = Pick<Lesson, 'id' | 'slug' | 'title' | 'goal' | 'minutes' | 'level'>;

export const LESSON_LICENSE = 'https://creativecommons.org/licenses/by-sa/4.0/';

export function validateLessons(lessons: readonly Lesson[]) {
	const ids = new Set<string>();
	const paths = new Set<string>();

	for (const lesson of lessons) {
		const path = `${lesson.track}/${lesson.slug}`;
		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lesson.slug) || paths.has(path) || ids.has(lesson.id)) {
			throw new Error(`Invalid or duplicate lesson: ${lesson.id} (${path})`);
		}
		paths.add(path);
		ids.add(lesson.id);

		if (
			!Number.isInteger(lesson.revision) ||
			lesson.revision < 1 ||
			!Number.isInteger(lesson.minutes) ||
			lesson.minutes < 1 ||
			!lesson.competencies.length ||
			!lesson.references.length ||
			!lesson.exercises.length ||
			!lesson.patterns.length ||
			!(lesson.examples.length || lesson.passage?.paragraphs.length || lesson.analysis?.length) ||
			lesson.references.some(({ href }) => !href.startsWith('https://'))
		) {
			throw new Error(`Incomplete lesson: ${lesson.id}`);
		}

		for (const group of lesson.analysis ?? []) {
			const paragraph =
				group.paragraph === undefined ? undefined : lesson.passage?.paragraphs[group.paragraph - 1];
			if (!group.sentences.length || (group.paragraph !== undefined && !paragraph)) {
				throw new Error(`Invalid analysis location: ${lesson.id} (${group.heading})`);
			}
			for (const sentence of group.sentences) {
				if (
					!sentence.words.length ||
					sentence.words.some((word) => word.some((field) => !field.trim())) ||
					(paragraph &&
						!paragraph.arabic.normalize('NFC').includes(analyzedText(sentence).normalize('NFC')))
				) {
					throw new Error(`Invalid analysis text: ${lesson.id} (${group.heading})`);
				}
			}
		}

		if (
			lesson.reviewStatus === 'approved' &&
			(!hasApprovingReview(lesson.reviews, 'arabic_teacher') ||
				(lesson.register === 'classical' && !hasApprovingReview(lesson.reviews, 'ustadz')))
		) {
			throw new Error(`Missing approval for lesson: ${lesson.id}`);
		}
	}
}
