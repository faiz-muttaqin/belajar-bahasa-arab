import type { ResearchAudit, ResearchField } from '#lib/domain/research/evidence.js';
import type { MsaLexicalInfo, MsaTopic, VocabularyItem } from '#lib/domain/vocabulary/types.js';

type ModernRow = {
	id: string;
	arabic: string;
	meaning: string;
	lemma: string;
	topic: MsaTopic;
	formation?: NonNullable<MsaLexicalInfo['formation']>;
	formationEvidence?: string;
};

// P6 / LM-03: individually checked Arabic noun sections, not a frequency list.
// Register and independent corroboration are still pending. No source prose is imported.
const rows: readonly ModernRow[] = [
	{
		id: 'tilifizyun',
		arabic: 'تِلِفِزْيُونٌ',
		meaning: 'televisi',
		lemma: 'تلفزيون',
		topic: 'technology',
		formation: 'loanword',
		formationEvidence: 'Sumber mencatat peminjaman dari bahasa Prancis dan Inggris.'
	},
	{
		id: 'radio',
		arabic: 'رَادْيُو',
		meaning: 'radio',
		lemma: 'راديو',
		topic: 'technology',
		formation: 'loanword',
		formationEvidence: 'Sumber mencatat peminjaman dari bahasa Prancis.'
	},
	{
		id: 'video',
		arabic: 'فِيدِيُو',
		meaning: 'video',
		lemma: 'فيديو',
		topic: 'technology',
		formation: 'loanword',
		formationEvidence: 'Sumber mencatat kemungkinan peminjaman melalui bahasa Inggris atau Prancis.'
	},
	{
		id: 'kamera',
		arabic: 'كَامِيرَا',
		meaning: 'kamera',
		lemma: 'كاميرا',
		topic: 'technology',
		formation: 'loanword',
		formationEvidence: 'Sumber mencatat peminjaman dari bahasa Inggris.'
	},
	{
		id: 'robot',
		arabic: 'رُوبُوتٌ',
		meaning: 'robot',
		lemma: 'روبوت',
		topic: 'technology',
		formation: 'loanword',
		formationEvidence: 'Sumber mencatat peminjaman melalui bahasa Inggris, asal lebih jauh bahasa Ceko.'
	},
	{
		id: 'istimarah',
		arabic: 'اِسْتِمَارَةٌ',
		meaning: 'formulir',
		lemma: 'استمارة',
		topic: 'documents'
	},
	{
		id: 'tashirah',
		arabic: 'تَأْشِيرَةٌ',
		meaning: 'visa',
		lemma: 'تأشيرة',
		topic: 'documents',
		formation: 'derived',
		formationEvidence: 'Sumber mengaitkan nomina ini dengan تَأْشِير sebagai bentuk turunannya.'
	},
	{
		id: 'jawaz-safar',
		arabic: 'جَوَازُ سَفَرٍ',
		meaning: 'paspor',
		lemma: 'جواز_سفر',
		topic: 'documents',
		formation: 'compound',
		formationEvidence: 'Sumber menganalisis istilah sebagai gabungan جَوَاز dan سَفَر.'
	}
];

function audit(row: ModernRow): ResearchAudit {
	const claim = (field: ResearchField, assertion: string, section: string) => ({
		field,
		assertion,
		sourceUrl: `https://en.wiktionary.org/wiki/${row.lemma}`,
		section: `Arabic > ${section}`,
		checkedOn: '2026-11-20',
		outcome: 'supports' as const
	});
	return {
		status: 'partial',
		claims: [
			claim('arabic', `Bentuk ${row.arabic} tercatat.`, 'Noun / declension'),
			claim('meaning', `Makna ${row.meaning} tercatat.`, 'Noun'),
			claim('wordClass', 'Lema atau frasa nominal tercatat sebagai nomina.', 'Noun'),
			...(row.formationEvidence ? [claim('formation', row.formationEvidence, 'Etymology')] : [])
		]
	};
}

export const msaModernVocabulary: readonly VocabularyItem[] = rows.map((row) => ({
	id: `msa-${row.id}`,
	collection: 'msa',
	register: 'msa',
	arabic: row.arabic,
	meaning: row.meaning,
	concreteness: row.topic === 'documents' ? 'abstract' : 'concrete',
	reviewStatus: 'draft',
	sources: [
		`https://en.wiktionary.org/wiki/${row.lemma}`,
		'https://en.wiktionary.org/wiki/Wiktionary:Copyrights'
	],
	research: audit(row),
	msa: {
		wordClass: 'noun',
		topic: row.topic,
		attestation: 'curated-draft',
		...(row.formation ? { formation: row.formation } : {})
	}
}));
