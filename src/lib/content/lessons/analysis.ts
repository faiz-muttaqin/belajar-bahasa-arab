export type Word = readonly [
	arabic: string,
	meaning: string,
	kind:
		| 'Isim'
		| 'Fi‘il'
		| 'Harf'
		| 'Harf + isim'
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
	sentences: readonly SentenceAnalysis[];
	comparison?: string;
};

export function analyzedText(sentence: SentenceAnalysis) {
	return sentence.words.map(([arabic]) => arabic).join(' ');
}
