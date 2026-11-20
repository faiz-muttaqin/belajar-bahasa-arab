import { normalizeArabicSearch } from '#lib/domain/sharaf/lexicon.js';
import { validateDictionary, type DictionaryEntry, type DictionarySense } from './senses.js';

const unique = <T>(items: readonly T[]): T[] => [
	...new Map(items.map((item) => [JSON.stringify(item), item])).values()
];

/** Proposals only. No automatic merge by Arabic spelling, root or translated gloss. */
export function duplicateCandidates(entries: readonly DictionaryEntry[]) {
	const groups = new Map<string, string[]>();
	for (const entry of entries) {
		const key = entry.pos + ':' + normalizeArabicSearch(entry.lemma);
		const ids = groups.get(key) ?? [];
		ids.push(entry.id);
		groups.set(key, ids);
	}
	return [...groups.entries()]
		.filter(([, ids]) => ids.length > 1)
		.map(([key, ids]) => ({ key, ids }));
}

function mergeSense(old: DictionarySense, next: DictionarySense): DictionarySense {
	if (
		old.glossId !== next.glossId ||
		old.register !== next.register ||
		(next.definitionId && old.definitionId !== next.definitionId) ||
		(next.example && JSON.stringify(old.example) !== JSON.stringify(next.example))
	)
		throw new Error('Unresolved sense conflict: ' + old.id);
	return {
		...old,
		supportingEvidence: unique([
			...(old.supportingEvidence ?? []),
			next.evidence,
			...(next.supportingEvidence ?? [])
		]).filter((evidence) => JSON.stringify(evidence) !== JSON.stringify(old.evidence)),
		upstream: unique([...(old.upstream ?? []), ...(next.upstream ?? [])]),
		comparisons: unique([...(old.comparisons ?? []), ...(next.comparisons ?? [])])
	};
}

/** Existing IDs are authoritative. Incoming IDs must have been explicitly assigned during review. */
export function reconcileDictionary(
	existing: readonly DictionaryEntry[],
	incoming: readonly DictionaryEntry[]
): DictionaryEntry[] {
	const errors = [
		...validateDictionary(existing),
		...validateDictionary(incoming, new Set(existing.map((entry) => entry.id)))
	];
	if (errors.length) throw new Error(errors.join('\n'));
	const entries = new Map(existing.map((entry) => [entry.id, entry]));
	const incomingIds = new Set<string>();
	for (const next of incoming) {
		if (incomingIds.has(next.id)) throw new Error('Repeated incoming ID: ' + next.id);
		incomingIds.add(next.id);
		const old = entries.get(next.id);
		if (!old) {
			entries.set(next.id, next);
			continue;
		}
		if (old.lemma.normalize('NFC') !== next.lemma.normalize('NFC') || old.pos !== next.pos)
			throw new Error('Unresolved lemma conflict: ' + next.id);
		if (
			(old.root && next.root && old.root.ar !== next.root.ar) ||
			(old.gender && next.gender && old.gender.value !== next.gender.value) ||
			(old.bab && next.bab && old.bab.number !== next.bab.number)
		)
			throw new Error('Unresolved morphology conflict: ' + next.id);
		const senses = new Map(old.senses.map((sense) => [sense.id, sense]));
		for (const sense of next.senses) {
			const previous = senses.get(sense.id);
			senses.set(sense.id, previous ? mergeSense(previous, sense) : sense);
		}
		entries.set(next.id, {
			...old,
			root: old.root ?? next.root,
			gender: old.gender ?? next.gender,
			bab: old.bab ?? next.bab,
			senses: [...senses.values()],
			forms: unique([...old.forms, ...next.forms]),
			relations: unique([...(old.relations ?? []), ...(next.relations ?? [])])
		});
	}
	const result = [...entries.values()];
	const aliases = new Map<string, string>();
	for (const entry of result) {
		for (const sense of entry.senses) {
			for (const source of sense.upstream ?? []) {
				for (const [key, owner] of [
					['lemma:' + source.lemmaId, entry.id],
					['sense:' + source.senseId, entry.id + ':' + sense.id]
				] as const) {
					const previous = aliases.get(key);
					if (previous && previous !== owner) throw new Error('Source identity conflict: ' + key);
					aliases.set(key, owner);
				}
			}
		}
	}
	const issues = validateDictionary(result);
	if (issues.length) throw new Error(issues.join('\n'));
	return result;
}
