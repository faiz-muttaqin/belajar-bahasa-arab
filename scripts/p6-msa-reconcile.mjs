import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { normalizeLemma } from './p6-msa-audit.mjs';

const lexicalPos = {
	NOUN: 'noun',
	ADJ: 'adjective',
	VERB: 'verb',
	ADV: 'adverb',
	PRON: 'pronoun',
	PART: 'particle'
};
const key = (lemma, pos) => JSON.stringify([normalizeLemma(lemma), pos]);

/** Produce review leads only; never merge senses, change IDs or assert register. */
export function reconcileCandidates(corpus, vocabulary, dictionary = []) {
	if (corpus.schema !== 1 || !Array.isArray(corpus.entries)) {
		throw new Error('Expected P6 corpus schema 1');
	}
	if (!Array.isArray(dictionary)) throw new Error('Expected P5 DictionaryEntry array');
	const index = new Map();
	const add = (lemma, pos, lead) => {
		if (!lemma || !pos) return;
		const k = key(lemma, pos);
		const group = index.get(k) ?? [];
		group.push(lead);
		index.set(k, group);
	};
	for (const entry of vocabulary) {
		add(entry.arabic, entry.msa?.wordClass, { collection: 'msa', id: entry.id });
	}
	for (const entry of dictionary) {
		if (entry.reviewStatus !== 'draft' || !Array.isArray(entry.senses)) {
			throw new Error('Unsupported P5 entry contract');
		}
		add(entry.lemma, entry.pos, {
			collection: 'p5',
			id: entry.id,
			senseIds: entry.senses.map((sense) => sense.id)
		});
	}
	const entries = corpus.entries.map((row) => {
		const pos = lexicalPos[row.pos];
		const matches = pos ? (index.get(key(row.lemma, pos)) ?? []) : [];
		return {
			...row,
			matches,
			status: matches.length ? 'compare-senses' : 'needs-review'
		};
	});
	return {
		schema: 1,
		source: corpus.source,
		dictionaryProvided: dictionary.length > 0,
		totals: {
			candidates: entries.length,
			withMatches: entries.filter((row) => row.matches.length > 0).length
		},
		entries
	};
}

async function main() {
	const [input, output, p5] = process.argv.slice(2);
	if (!input || !output) {
		throw new Error('Usage: bun scripts/p6-msa-reconcile.mjs <corpus.json> <out.json> [p5.json]');
	}
	const { msaVocabulary } = await import('../src/lib/content/msa-vocabulary.ts');
	const corpus = JSON.parse(readFileSync(input, 'utf8'));
	const dictionary = p5 ? JSON.parse(readFileSync(p5, 'utf8')) : [];
	const report = reconcileCandidates(corpus, msaVocabulary, dictionary);
	writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
	console.log(JSON.stringify(report.totals));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
	main().catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
