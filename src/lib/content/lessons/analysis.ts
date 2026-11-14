export type Word = readonly [
	arabic: string,
	meaning: string,
	kind:
		| 'Isim'
		| 'Fi‘il'
		| 'Harf'
		| 'Isim + harf'
		| 'Fi‘il + harf'
		| 'Fi‘il + isim'
		| 'Fi‘il + harf + isim',
	sharaf: string,
	nahwu: string
];

export type SentenceAnalysis = {
	words: readonly Word[];
	structure: string;
	translation: string;
};

export type AnalysisGroup = {
	heading: string;
	/** 1-based location for a sentence from the lesson's reading. */
	paragraph?: number;
	sentences: readonly SentenceAnalysis[];
	comparison?: string;
};

export function analyzedText(sentence: SentenceAnalysis) {
	return sentence.words.map(([arabic]) => arabic).join(' ');
}
