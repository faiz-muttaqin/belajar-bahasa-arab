/**
 * A root is a lexical relationship, not a proof of a verb's bab.
 * Never infer the Form-I bab from three consonants alone.
 */
export type PartOfSpeech = 'verb' | 'noun' | 'particle';
export type SharafFilter = PartOfSpeech | 'all';
export type BabSelection = 'lexical' | 'rule' | 'not-applicable';
export type FormBehavior = 'regular' | 'special-rule' | 'irregular' | 'fixed';

export type SharafForm = {
	label: string;
	value: string;
};

export type SharafEntry = {
	id: string;
	lemma: string;
	meaning: string;
	partOfSpeech: PartOfSpeech;
	/** Undiacritized consonantal root; absent for particles without an applicable root. */
	root?: string;
	/** Only for verbs with a documented Form-I bab. */
	bab?: { number: number; exemplar: string; pattern: string };
	forms: readonly SharafForm[];
	/** How the bab is established; independent from how forms are produced. */
	babSelection: BabSelection;
	formBehavior: FormBehavior;
	explanation: string;
	sources: readonly string[];
	reviewStatus: 'draft' | 'linguist_reviewed' | 'approved';
};

/**
 * Search normalization only. Do not store this as an identity key:
 * removing marks and unifying alif/ya can merge distinct Arabic analyses.
 */
export function normalizeArabicSearch(input: string): string {
	return input
		.normalize('NFKC')
		.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, '')
		.replace(/[أإآٱ]/g, 'ا')
		.replace(/ى/g, 'ي')
		.replace(/\s+/g, '')
		.trim();
}

/**
 * Return every plausible match, not only the first: unvocalized Arabic is ambiguous.
 * Exact spelling ranks ahead of root-family and prefix matches.
 */
export function searchSharaf(
	entries: readonly SharafEntry[],
	input: string,
	filter: SharafFilter = 'all'
): SharafEntry[] {
	const query = normalizeArabicSearch(input);
	const filtered = entries.filter((entry) => filter === 'all' || entry.partOfSpeech === filter);
	if (!query) return filtered;

	return filtered
		.map((entry) => {
			const forms = [entry.lemma, ...entry.forms.map((form) => form.value)].map(
				normalizeArabicSearch
			);
			const root = entry.root ? normalizeArabicSearch(entry.root) : undefined;
			let score = Number.POSITIVE_INFINITY;
			if (forms.includes(query)) score = 0;
			else if (root === query) score = 1;
			else if (query.length >= 2 && forms.some((form) => form.startsWith(query))) score = 2;
			else if (query.length >= 2 && root?.startsWith(query)) score = 3;
			return { entry, score };
		})
		.filter(({ score }) => Number.isFinite(score))
		.sort((a, b) => a.score - b.score)
		.map(({ entry }) => entry);
}
