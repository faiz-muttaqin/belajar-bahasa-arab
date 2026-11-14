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

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isSharafEntries(value: unknown): value is SharafEntry[] {
	if (!Array.isArray(value) || value.length === 0) return false;
	const ids = new Set<string>();
	return value.every((entry: unknown) => {
		if (
			!isRecord(entry) ||
			typeof entry.id !== 'string' ||
			ids.has(entry.id) ||
			typeof entry.lemma !== 'string' ||
			typeof entry.meaning !== 'string' ||
			typeof entry.explanation !== 'string' ||
			(entry.root !== undefined && typeof entry.root !== 'string') ||
			!Array.isArray(entry.forms) ||
			!Array.isArray(entry.sources) ||
			!['verb', 'noun', 'particle'].some((kind) => kind === entry.partOfSpeech) ||
			!['lexical', 'rule', 'not-applicable'].some((kind) => kind === entry.babSelection) ||
			!['regular', 'special-rule', 'irregular', 'fixed'].some(
				(kind) => kind === entry.formBehavior
			) ||
			!['draft', 'linguist_reviewed', 'approved'].some((status) => status === entry.reviewStatus)
		)
			return false;
		ids.add(entry.id);
		const bab = entry.bab;
		return (
			(bab === undefined ||
				(entry.partOfSpeech === 'verb' &&
					isRecord(bab) &&
					Number.isInteger(bab.number) && bab.number >= 1 && bab.number <= 22 &&
					typeof bab.exemplar === 'string' &&
					typeof bab.pattern === 'string')) &&
			entry.sources.every(
				(source: unknown) => typeof source === 'string' && source.startsWith('https://')
			) &&
			entry.forms.every(
				(form: unknown) =>
					isRecord(form) && typeof form.label === 'string' && typeof form.value === 'string'
			)
		);
	});
}

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
		.trim()
		.toLocaleLowerCase('id');
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
			const gloss = normalizeArabicSearch(entry.meaning);
			let score = Number.POSITIVE_INFINITY;
			if (forms.includes(query)) score = 0;
			else if (root === query) score = 1;
			else if (gloss === query) score = 2;
			else if (query.length >= 2 && forms.some((form) => form.startsWith(query))) score = 3;
			else if (query.length >= 2 && root?.startsWith(query)) score = 4;
			else if (query.length >= 2 && gloss.includes(query)) score = 5;
			return { entry, score };
		})
		.filter(({ score }) => Number.isFinite(score))
		.sort((a, b) => a.score - b.score)
		.map(({ entry }) => entry);
}
