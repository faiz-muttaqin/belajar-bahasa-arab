/** P5 lexical evidence is scoped to one assertion, never inherited from a root. */
import { normalizeArabicSearch } from '#lib/domain/sharaf/lexicon.js';

export type DictionaryPos =
	'noun' | 'adjective' | 'verb' | 'adverb' | 'pronoun' | 'particle' | 'expression' | 'other';
export type DictionaryRegister = 'msa' | 'classical' | 'historical' | 'unspecified';
export type Evidence = {
	sourceId: 'wiktionary' | 'lane';
	url: string;
	locator: string;
	checkedOn: string;
};
export type ComparisonEvidence = {
	sourceId: 'lane' | 'wasit' | 'wiktionary';
	url: string;
	locator: string;
	checkedOn: string;
	outcome: 'supports' | 'partial' | 'conflicts' | 'not-found';
};
export type SnapshotIdentity = {
	sourceId: 'wiktionary';
	snapshot: string;
	sha256: string;
	lemmaId: string;
	senseId: string;
	pos: string;
	tags: readonly string[];
	locations: readonly { line: number; senseIndex: number }[];
};
export type DictionarySense = {
	id: string;
	glossId: string;
	definitionId?: string;
	upstream?: readonly SnapshotIdentity[];
	supportingEvidence?: readonly Evidence[];
	comparisons?: readonly ComparisonEvidence[];
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
	relations?: readonly {
		targetId: string;
		kind: 'masdar-of' | 'derived-from';
		evidence: Evidence;
	}[];
	reviewStatus: 'draft';
};

function validSourceUrl(sourceId: ComparisonEvidence['sourceId'], raw: string): boolean {
	try {
		const url = new URL(raw);
		if (url.protocol !== 'https:' || url.username || url.password) return false;
		if (sourceId === 'wiktionary')
			return url.hostname === 'en.wiktionary.org' && /^\/wiki\/.+/.test(url.pathname) &&
				url.hash === '#Arabic';
		if (sourceId === 'lane')
			return url.hostname === 'www.arabic-english-dictionary.com' &&
				url.pathname.startsWith('/content/') && url.pathname.length > 9;
		return sourceId === 'wasit' && url.hostname === 'www.arabicacademy.gov.eg' && url.pathname.length > 5;
	} catch {
		return false;
	}
}

function validDate(value: string): boolean {
	return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) &&
		new Date(value).toISOString().slice(0, 10) === value;
}

function validEvidence(evidence: Evidence): boolean {
	return (
		(evidence.sourceId === 'wiktionary' || evidence.sourceId === 'lane') &&
		validSourceUrl(evidence.sourceId, evidence.url) &&
		!!evidence.locator.trim() &&
		validDate(evidence.checkedOn)
	);
}

export function validateDictionary(entries: readonly DictionaryEntry[], knownIds: ReadonlySet<string> = new Set()): string[] {
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
			for (const evidence of sense.supportingEvidence ?? []) {
				if (!validEvidence(evidence)) fail('Invalid supporting evidence');
			}
			for (const comparison of sense.comparisons ?? []) {
				if (!validSourceUrl(comparison.sourceId, comparison.url) || !comparison.locator.trim() ||
					!validDate(comparison.checkedOn) || !['supports', 'partial', 'conflicts', 'not-found'].includes(comparison.outcome))
					fail('Invalid comparison evidence');
			}
			for (const origin of sense.upstream ?? []) {
				if (origin.sourceId !== 'wiktionary' || !validDate(origin.snapshot) ||
					![origin.sha256, origin.lemmaId, origin.senseId].every((id) => /^[a-f0-9]{64}$/.test(id)) ||
					!origin.pos.trim() || !origin.locations.length || origin.locations.some((loc) =>
						!Number.isSafeInteger(loc.line) || loc.line < 1 || !Number.isSafeInteger(loc.senseIndex) || loc.senseIndex < 1))
					fail('Invalid snapshot provenance');
			}
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
				(!ids.has(relation.targetId) && !knownIds.has(relation.targetId)) ||
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
		(other) => other.id !== entry.id && other.root?.ar.normalize('NFC').replace(/\s/g, '') === root
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
			const words = [
				entry.lemma,
				...entry.forms.filter((f) => f.origin === 'attested').map((f) => f.ar)
			];
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
