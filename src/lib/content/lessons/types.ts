import type { Path } from '$app/types';

/** Pages lessons link to. Kept narrow: see SectionPath in navigation.ts for why. */
type RelatedPage =
	| 'rujukan/fiil/'
	| 'rujukan/harf/'
	| 'rujukan/isim/'
	| 'rujukan/kata-tanya/'
	| 'rujukan/'
	| 'sharaf/'
	| 'kosakata/'
	| 'belajar/'
	| 'iqra/'
	| 'latihan/'
	| 'cari/';
export const relatedPagesExist: RelatedPage extends Path ? true : never = true;
import { analyzedText, type AnalysisGroup, type SentenceAnalysis } from './analysis.js';
import { hasApprovingReview, type ReviewRecord } from '#lib/domain/review.js';

export type LessonTrack = 'belajar' | 'iqra';
export type LessonLevel = 'Fondasi' | 'Dasar' | 'Menengah';

type Example = { arabic: string; meaning: string; note?: string };
type Passage = {
	title: string;
	arabicTitle: string;
	glossary?: readonly Pick<Example, 'arabic' | 'meaning'>[];
	paragraphs: readonly { arabic: string; meaning: string; role: string }[];
	/** One array of complete sentence annotations per paragraph, in reading order. */
	analysis?: readonly (readonly SentenceAnalysis[])[];
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
	related?: readonly { label: string; path: `${RelatedPage}#${string}` }[];
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
			validateSentences(group.sentences, `${lesson.id} (${group.heading})`);
		}

		const passage = lesson.passage;
		if (passage?.analysis) {
			if (passage.analysis.length !== passage.paragraphs.length) {
				throw new Error(`Incomplete paragraph coverage: ${lesson.id}`);
			}
			for (const [i, paragraph] of passage.paragraphs.entries()) {
				const sentences = passage.analysis[i] ?? [];
				const location = `${lesson.id} (paragraph ${i + 1})`;
				validateSentences(sentences, location);
				const source = paragraph.arabic.normalize('NFC').split(/(?<=[.!؟])\s+/u);
				const analyzed = sentences.map((sentence) => analyzedText(sentence).normalize('NFC'));
				if (source.length !== analyzed.length || source.some((text, j) => text !== analyzed[j])) {
					throw new Error(`Incomplete sentence or word coverage: ${location}`);
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

function validateSentences(sentences: readonly SentenceAnalysis[], location: string) {
	if (
		!sentences.length ||
		sentences.some(
			(sentence) =>
				!sentence.structure.trim() ||
				!sentence.translation.trim() ||
				!sentence.words.length ||
				sentence.words.some((word) => word.some((field) => !field.trim()))
		)
	) {
		throw new Error(`Incomplete word analysis: ${location}`);
	}
}
