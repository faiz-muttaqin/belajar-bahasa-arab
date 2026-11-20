import type {
	DictionaryEntry,
	DictionaryPos,
	DictionaryRegister,
	SnapshotIdentity
} from './senses.js';
import { validateDictionary } from './senses.js';

type P4Location = { sourceId: 'wiktionary'; url: string; line: number; senseIndex: number };
export type P4Row = {
	bucket: string;
	lemmaId: string;
	senseId: string;
	ar: string;
	page: string;
	pos: string;
	canonical: string[];
	register: string;
	tags: string[];
	glosses: string[];
	provenance: P4Location[];
};
export type P4Snapshot = {
	schema: 1;
	source: { id: 'wiktionary'; snapshot: string; sha256: string; license: string };
	entries: P4Row[];
};
/** Explicit human-reviewed mapping, not an automatic translation of upstream glosses. */
export type P4Decision = {
	lemmaId: string;
	senseId: string;
	entryId: string;
	localSenseId: string;
	glossId: string;
	register: DictionaryRegister;
	checkedOn: string;
	/** Specific source section and justification for the Indonesian gloss/register. */
	locator: string;
};
const POS: Record<string, DictionaryPos> = {
	noun: 'noun',
	adj: 'adjective',
	adv: 'adverb',
	pron: 'pronoun',
	prep: 'particle',
	postp: 'particle',
	conj: 'particle',
	particle: 'particle',
	interj: 'other',
	num: 'other',
	det: 'other',
	article: 'particle',
	phrase: 'expression',
	prep_phrase: 'expression',
	proverb: 'expression',
	abbrev: 'other'
};

/** Fail closed: unpublished candidates need explicit, snapshot-scoped review decisions. */
export function adaptP4Snapshot(snapshot: P4Snapshot, decisions: readonly P4Decision[]) {
	if (
		snapshot.schema !== 1 ||
		snapshot.source.id !== 'wiktionary' ||
		snapshot.source.license !== 'CC BY-SA 4.0 and GFDL' ||
		!/^\d{4}-\d{2}-\d{2}$/.test(snapshot.source.snapshot) ||
		!/^[a-f0-9]{64}$/.test(snapshot.source.sha256)
	)
		throw new Error('Invalid P4 snapshot metadata');
	const selected = new Map<string, P4Row[]>();
	for (const row of snapshot.entries) {
		const key = row.lemmaId + ':' + row.senseId;
		const rows = selected.get(key) ?? [];
		rows.push(row);
		selected.set(key, rows);
	}
	const entries = new Map<string, DictionaryEntry>();
	const upstreamLemmas = new Map<string, string>();
	const localLemmas = new Map<string, string>();
	const seen = new Set<string>();
	for (const decision of decisions) {
		const key = decision.lemmaId + ':' + decision.senseId;
		const matches = selected.get(key) ?? [];
		if (seen.has(key) || matches.length !== 1)
			throw new Error('Ambiguous or repeated P4 sense: ' + key);
		seen.add(key);
		const row = matches[0]!;
		const pos = Object.hasOwn(POS, row.pos) ? POS[row.pos] : undefined;
		if (
			row.bucket !== 'candidate' ||
			!pos ||
			row.canonical.length !== 1 ||
			row.canonical[0] !== row.ar ||
			!row.glosses.length ||
			!row.provenance.length
		)
			throw new Error('Ineligible P4 candidate: ' + key);
		// A missing source tag is not proof of MSA. Require an independent audit to promote it.
		if (
			(row.register === 'unspecified' && decision.register !== 'unspecified') ||
			(row.register === 'msa' && !['msa', 'unspecified'].includes(decision.register)) ||
			(row.register === 'classical-or-historical' &&
				!['classical', 'historical', 'unspecified'].includes(decision.register)) ||
			!['msa', 'classical-or-historical', 'unspecified'].includes(row.register)
		)
			throw new Error('Unsupported register mapping: ' + key);
		const url = 'https://en.wiktionary.org/wiki/' + encodeURIComponent(row.page) + '#Arabic';
		if (row.provenance.some((loc) => loc.sourceId !== 'wiktionary' || loc.url !== url))
			throw new Error('Inconsistent P4 locator: ' + key);
		const previousLocal = upstreamLemmas.get(row.lemmaId);
		const previousUpstream = localLemmas.get(decision.entryId);
		if (
			(previousLocal && previousLocal !== decision.entryId) ||
			(previousUpstream && previousUpstream !== row.lemmaId)
		)
			throw new Error('Explicit identity conflict: ' + key);
		upstreamLemmas.set(row.lemmaId, decision.entryId);
		localLemmas.set(decision.entryId, row.lemmaId);
		const origin: SnapshotIdentity = {
			sourceId: 'wiktionary',
			snapshot: snapshot.source.snapshot,
			sha256: snapshot.source.sha256,
			lemmaId: row.lemmaId,
			senseId: row.senseId,
			pos: row.pos,
			tags: row.tags,
			locations: row.provenance.map(({ line, senseIndex }) => ({ line, senseIndex }))
		};
		const evidence = {
			sourceId: 'wiktionary' as const,
			url,
			locator: decision.locator,
			checkedOn: decision.checkedOn
		};
		const previous = entries.get(decision.entryId);
		if (previous && (previous.lemma !== row.ar || previous.pos !== pos))
			throw new Error('Conflicting P4 lemma or POS: ' + key);
		const sense = {
			id: decision.localSenseId,
			glossId: decision.glossId,
			register: decision.register,
			evidence,
			upstream: [origin]
		};
		entries.set(decision.entryId, {
			id: decision.entryId,
			lemma: row.ar,
			pos,
			evidence: previous?.evidence ?? evidence,
			senses: [...(previous?.senses ?? []), sense],
			forms: [],
			reviewStatus: 'draft'
		});
	}
	const result = [...entries.values()];
	const errors = validateDictionary(result);
	if (errors.length) throw new Error(errors.join('\n'));
	return result;
}
