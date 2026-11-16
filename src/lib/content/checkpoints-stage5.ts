import type { MeaningPractice, MeaningQuestion } from './lessons/types.js';
import type { CheckpointGroup } from './checkpoints.js';
import { relationItems } from './checkpoints-stage5-relations.js';
import { mainIdeaItems } from './checkpoints-stage5-main-ideas.js';
import { documentItems } from './checkpoints-stage5-documents.js';

/**
 * Independently authored short MSA texts for reading-transfer checkpoints.
 * Method references (not reproductions of third-party reading passages):
 * https://www.coe.int/en/web/common-european-framework-reference-languages/reading-comprehension
 * https://learning.aljazeera.net/en/pages/about-us
 */
export type ReadingItem = {
	id: string;
	arabic: string;
	prompt: string;
	choices: MeaningQuestion['choices'];
	correct: MeaningQuestion['correct'];
	reason: string;
};

const pedagogySources = [
	{
		label: 'Council of Europe · Reading comprehension (jenis teks, tugas, dan bukti)',
		href: 'https://www.coe.int/en/web/common-european-framework-reference-languages/reading-comprehension',
		usageType: 'independent-original'
	},
	{
		label: 'Al Jazeera Learning Arabic · bacaan dan pertanyaan pemahaman',
		href: 'https://learning.aljazeera.net/en/pages/about-us',
		usageType: 'independent-original'
	}
] as const;

function questions(items: readonly ReadingItem[], context: string): MeaningPractice {
	const first = items[0];
	const second = items[1];
	if (!first || !second) throw new Error('Checkpoint requires at least two reading tasks');
	const toQuestion = (item: ReadingItem): MeaningQuestion => ({
		id: `rm06-stage5-${item.id}`,
		kind: 'transfer',
		context,
		arabic: item.arabic,
		prompt: item.prompt,
		choices: item.choices,
		correct: item.correct,
		reason: item.reason,
		sources: pedagogySources
	});
	return [toQuestion(first), toQuestion(second), ...items.slice(2).map(toQuestion)];
}

/** Distinct contexts; 20 each for relations, main ideas, and document structure. */
export const stage5CheckpointGroups: readonly CheckpointGroup[] = [
	{
		id: 'hubungan-antar-kalimat',
		title: 'Hubungkan sebab, akibat, urutan, dan kontras',
		competencyId: 'CB-22',
		lessonId: 'lesson-u10-01',
		contentRevision: 1,
		skill: 'structure',
		questions: questions(relationItems, 'Titik cek Tahap 5 · hubungan antarkalimat')
	},
	{
		id: 'gagasan-utama-bacaan',
		title: 'Pisahkan gagasan utama dan rincian pendukung',
		competencyId: 'CB-23',
		lessonId: 'lesson-u11-01',
		contentRevision: 1,
		skill: 'meaning',
		questions: questions(mainIdeaItems, 'Titik cek Tahap 5 · gagasan utama')
	},
	{
		id: 'struktur-dokumen',
		title: 'Telusuri masalah, tindakan, hasil, dan batas simpulan',
		competencyId: 'CB-24',
		lessonId: 'lesson-u11-02',
		contentRevision: 1,
		skill: 'structure',
		questions: questions(documentItems, 'Titik cek Tahap 5 · struktur dokumen')
	}
];
