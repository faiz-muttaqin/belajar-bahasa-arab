import type { MeaningPractice, MeaningQuestion } from './lessons/types.js';
import type { CheckpointGroup } from './checkpoints.js';
import { transferItems } from './checkpoints-stage6-transfer.js';
import { summaryItems } from './checkpoints-stage6-summaries.js';

/**
 * Original, source-backed MSA document reading tests.
 * Sources describe reading-assessment methodology, not copied texts.
 */
export type DocumentItem = {
	id: string;
	arabic: string;
	prompt: string;
	choices: MeaningQuestion['choices'];
	correct: MeaningQuestion['correct'];
	reason: string;
};

const sources = [
	{
		label: 'Council of Europe · Reading comprehension (evidence, text and context)',
		href: 'https://www.coe.int/en/web/common-european-framework-reference-languages/reading-comprehension',
		usageType: 'independent-original'
	},
	{
		label: 'Al Jazeera Learning Arabic · lesson and comprehension formats',
		href: 'https://learning.aljazeera.net/en/pages/about-us',
		usageType: 'independent-original'
	}
] as const;

function questions(items: readonly DocumentItem[], context: string): MeaningPractice {
	const first = items[0];
	const second = items[1];
	if (!first || !second) throw new Error('Stage 6 requires at least two source-backed tasks');
	const convert = (item: DocumentItem): MeaningQuestion => ({
		id: `rm06-stage6-${item.id}`,
		kind: 'transfer',
		context,
		arabic: item.arabic,
		prompt: item.prompt,
		choices: item.choices,
		correct: item.correct,
		reason: item.reason,
		sources
	});
	return [convert(first), convert(second), ...items.slice(2).map(convert)];
}

/** 20 per competency: integrated reading transfer and document structure. */
export const stage6CheckpointGroups: readonly CheckpointGroup[] = [
	{
		id: 'integrasi-dokumen',
		title: 'Terapkan bacaan baru: bukti vs dugaan',
		competencyId: 'CB-21',
		lessonId: 'lesson-u12-01',
		contentRevision: 1,
		skill: 'meaning',
		questions: questions(transferItems, 'Titik cek Tahap 6 · integrasi bacaan')
	},
	{
		id: 'ringkas-dokumen',
		title: 'Ringkas informasi dan ikuti rujukannya',
		competencyId: 'CB-24',
		lessonId: 'lesson-u12-01',
		contentRevision: 1,
		skill: 'structure',
		questions: questions(summaryItems, 'Titik cek Tahap 6 · struktur dokumen')
	}
];
