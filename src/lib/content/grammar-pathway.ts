import type { ClauseExample } from './clause-rules.js';

export type GrammarStageId = 'g01' | 'g02' | 'g03' | 'g04' | 'g05' | 'g06';

export const grammarStages: readonly {
	id: GrammarStageId;
	label: string;
	title: string;
	outcome: string;
	prerequisites: readonly GrammarStageId[];
}[] = [
	{
		id: 'g01',
		label: 'G-01',
		title: 'Kaidah pertama',
		outcome: 'Membedakan frasa sifat, idafah dan kalimat nominal',
		prerequisites: []
	},
	{
		id: 'g02',
		label: 'G-02',
		title: 'Akar dan tashrif',
		outcome: 'Mengenali perubahan bentuk kata dan bab wazan',
		prerequisites: ['g01']
	},
	{
		id: 'g03',
		label: 'G-03',
		title: 'Frasa dan i‘rab',
		outcome: 'Menganalisis peran, agreement dan tanda kasus',
		prerequisites: ['g01']
	},
	{
		id: 'g04',
		label: 'G-04',
		title: 'Kalimat lengkap',
		outcome: 'Menganalisis fi‘il, fā‘il, maf‘ūl, pasif, negasi dan nāsikh',
		prerequisites: ['g02', 'g03']
	},
	{
		id: 'g05',
		label: 'G-05',
		title: 'Hubungan klausa',
		outcome: 'Menghubungkan kalimat melalui ‘aṭf, ṣilah, syarat dan alasan',
		prerequisites: ['g04']
	},
	{
		id: 'g06',
		label: 'G-06',
		title: 'Praktik terarah',
		outcome: 'Memilih kata yang cocok lalu membaca rangkaian kalimat',
		prerequisites: ['g04', 'g05']
	}
];

/** Original, hand-annotated paragraph; no automatic composition. */
export const practiceReading: ClauseExample = {
	id: 'guided-two-sentences',
	spans: [
		{
			id: 'first-sentence',
			kind: 'main',
			note: 'Kalimat pertama',
			tokens: [
				{ arabic: 'قَرَأَ', gloss: 'telah membaca', role: 'Fi‘il māḍī' },
				{ arabic: 'الطَّالِبُ', gloss: 'murid itu', role: 'Fā‘il', irab: 'raf', marker: 'ḍamma' },
				{ arabic: 'الْكِتَابَ', gloss: 'buku itu', role: 'Maf‘ūl bih', irab: 'nasb', marker: 'fatḥa' }
			]
		},
		{
			id: 'sequence',
			kind: 'link',
			note: 'Penghubung urutan',
			tokens: [{ arabic: 'ثُمَّ', gloss: 'kemudian', role: 'Huruf ‘aṭf' }]
		},
		{
			id: 'second-sentence',
			kind: 'result',
			note: 'Kalimat berikutnya; pelaku tersirat sama',
			tokens: [
				{ arabic: 'كَتَبَ', gloss: 'telah menulis', role: 'Fi‘il māḍī; fā‘il tersirat' },
				{
					arabic: 'رِسَالَةً',
					gloss: 'sebuah surat',
					role: 'Maf‘ūl bih',
					irab: 'nasb',
					marker: 'tanwin fatḥ'
				}
			]
		}
	],
	translation: 'Murid itu membaca buku, kemudian menulis sebuah surat.',
	explanation:
		'Pada kalimat kedua, fā‘il كَتَبَ tersirat (هُوَ) dan dipahami sebagai murid tadi; رِسَالَةً adalah objek manṣūb, bukan fā‘il.'
};

export const readingQuestions = [
	{
		id: 'action-order',
		question: 'Apa kegiatan pertama dan kedua?',
		answer: 'Pertama membaca buku, kemudian menulis surat.',
		reason: 'ثُمَّ menyambungkan dua tindakan secara berurutan.'
	},
	{
		id: 'hidden-agent',
		question: 'Siapa yang menulis surat dalam kalimat kedua?',
		answer: 'Murid yang sama, yaitu الطَّالِبُ.',
		reason: 'Subjek fi‘il كَتَبَ tersirat (هُوَ) dan mengacu pada pelaku sebelumnya.'
	},
	{
		id: 'object-case',
		question: 'Mengapa رِسَالَةً memakai tanwin fatḥ?',
		answer: 'Karena رِسَالَةً adalah maf‘ūl bih yang manṣūb.',
		reason: 'Status sebagai objek langsung ditandai naṣb untuk isim tunggal munṣarif ini.'
	}
] as const;

export function validateGrammarPathway(): string[] {
	const errors: string[] = [];
	const ids = new Set(grammarStages.map((node) => node.id));
	if (ids.size !== grammarStages.length) errors.push('Duplicate stage IDs');
	for (const node of grammarStages) {
		for (const prerequisite of node.prerequisites) {
			if (!ids.has(prerequisite)) errors.push('Unknown prerequisite: ' + node.id);
			if (prerequisite === node.id) errors.push('Self-dependency: ' + node.id);
		}
	}
	const processed = new Set<GrammarStageId>();
	let unresolved = grammarStages.length;
	while (unresolved > 0) {
		const ready = grammarStages.filter(
			(node) => !processed.has(node.id) && node.prerequisites.every((item) => processed.has(item))
		);
		if (!ready.length) return [...errors, 'Prerequisite cycle'];
		for (const node of ready) processed.add(node.id);
		unresolved -= ready.length;
	}
	if (practiceReading.spans.length < 2 || !readingQuestions.length)
		errors.push('No paragraph practice');
	return errors;
}
