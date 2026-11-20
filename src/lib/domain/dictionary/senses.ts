/** P5 lexical evidence is scoped to one assertion, never inherited from a root. */
import { normalizeArabicSearch } from '#lib/domain/sharaf/lexicon.js';

export type DictionaryPos =
	| 'noun'
	| 'adjective'
	| 'verb'
	| 'adverb'
	| 'pronoun'
	| 'particle'
	| 'expression'
	| 'other';
export type DictionaryRegister = 'msa' | 'classical' | 'historical' | 'unspecified';
export type Evidence = {
	sourceId: 'wiktionary';
	url: string;
	locator: string;
	checkedOn: string;
};
export type DictionarySense = {
	id: string;
	glossId: string;
	definitionId?: string;
	register: DictionaryRegister;
	evidence: Evidence;
	example?: { ar: string; id: string; status: 'draft'; origin: 'original' };
};
export type DictionaryForm = {
	ar: string;
	kind: 'plural' | 'feminine' | 'dual' | 'masdar' | 'mudhari' | 'other';
	evidence: Evidence;
	origin: 'attested' | 'rule-generated';
};
export type DictionaryEntry = {
	id: string;
	lemma: string;
	pos: DictionaryPos;
	evidence: Evidence;
	root?: { ar: string; evidence: Evidence };
	gender?: { value: 'masculine' | 'feminine'; evidence: Evidence };
	bab?: { number: number; evidence: Evidence };
	senses: readonly DictionarySense[];
	forms: readonly DictionaryForm[];
	relations?: readonly { targetId: string; kind: 'masdar-of' | 'derived-from'; evidence: Evidence }[];
	reviewStatus: 'draft';
};

function validEvidence(evidence: Evidence): boolean {
	return (
		evidence.sourceId === 'wiktionary' &&
		/^https:\/\/en\.wiktionary\.org\/wiki\/.+#Arabic$/.test(evidence.url) &&
		!!evidence.locator.trim() &&
		/^\d{4}-\d{2}-\d{2}$/.test(evidence.checkedOn)
	);
}

export function validateDictionary(entries: readonly DictionaryEntry[]): string[] {
	const errors: string[] = [];
	const ids = new Set(entries.map((entry) => entry.id));
	if (ids.size !== entries.length) errors.push('Duplicate entry ID');
	for (const entry of entries) {
		const fail = (message: string) => errors.push(entry.id + ': ' + message);
		if (!entry.id || !entry.lemma.trim() || !validEvidence(entry.evidence))
			fail('Missing lemma evidence');
		if (!entry.senses.length) fail('Missing senses');
		if (new Set(entry.senses.map((sense) => sense.id)).size !== entry.senses.length)
			fail('Duplicate sense ID');
		for (const sense of entry.senses) {
			if (!sense.id || !sense.glossId.trim() || !validEvidence(sense.evidence))
				fail('Missing sense evidence');
		}
		if (entry.root && (!entry.root.ar.trim() || !validEvidence(entry.root.evidence)))
			fail('Missing root evidence');
		if (entry.gender && !validEvidence(entry.gender.evidence)) fail('Missing gender evidence');
		if (
			entry.bab &&
			(entry.pos !== 'verb' ||
				!Number.isInteger(entry.bab.number) ||
				entry.bab.number < 1 ||
				entry.bab.number > 22 ||
				!validEvidence(entry.bab.evidence))
		)
			fail('Invalid bab');
		for (const form of entry.forms) {
			if (!form.ar.trim() || !validEvidence(form.evidence)) fail('Missing form evidence');
		}
		for (const relation of entry.relations ?? []) {
			if (
				!ids.has(relation.targetId) ||
				relation.targetId === entry.id ||
				!validEvidence(relation.evidence)
			)
				fail('Invalid lexical relation');
		}
	}
	return errors;
}

/** Exact attested root only; search normalization must not establish family membership. */
export function rootFamily(
	entries: readonly DictionaryEntry[],
	entry: DictionaryEntry
): DictionaryEntry[] {
	if (!entry.root) return [];
	const root = entry.root.ar.normalize('NFC').replace(/\s/g, '');
	return entries.filter(
		(other) =>
			other.id !== entry.id &&
			other.root?.ar.normalize('NFC').replace(/\s/g, '') === root
	);
}

export function searchDictionary(
	entries: readonly DictionaryEntry[],
	query: string,
	pos: DictionaryPos | 'all' = 'all',
	register: DictionaryRegister | 'all' = 'all'
): DictionaryEntry[] {
	const key = normalizeArabicSearch(query);
	const exact = query.trim().normalize('NFC');
	return entries
		.filter((entry) => pos === 'all' || entry.pos === pos)
		.map((entry) => {
			const senses = entry.senses.filter(
				(sense) => register === 'all' || sense.register === register
			);
			if (!senses.length) return { entry, score: Infinity };
			const words = [entry.lemma, ...entry.forms.filter((f) => f.origin === 'attested').map((f) => f.ar)];
			const normalized = words.map(normalizeArabicSearch);
			const root = normalizeArabicSearch(entry.root?.ar ?? '');
			const gloss = senses.map((sense) => normalizeArabicSearch(sense.glossId));
			const score = !key
				? 0
				: words.includes(exact)
					? 0
					: normalized.includes(key)
						? 1
						: root === key
							? 2
							: gloss.includes(key)
								? 3
								: normalized.some((word) => word.startsWith(key)) ||
									  gloss.some((word) => word.includes(key))
									? 4
									: Infinity;
			return { entry: { ...entry, senses }, score };
		})
		.filter((result) => Number.isFinite(result.score))
		.sort((a, b) => a.score - b.score)
		.map((result) => result.entry);
}
