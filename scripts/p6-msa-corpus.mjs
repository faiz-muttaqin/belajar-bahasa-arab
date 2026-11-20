import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { checksum, normalizeLemma } from './p6-msa-audit.mjs';

const sourceUrl =
	'https://github.com/UniversalDependencies/UD_Arabic-PUD/blob/r2.17/ar_pud-ud-test.conllu';
const included = new Set([
	'NOUN',
	'ADJ',
	'ADV',
	'VERB',
	'ADP',
	'PART',
	'PRON',
	'NUM',
	'CCONJ',
	'SCONJ',
	'DET',
	'INTJ'
]);

/** Count annotated word rows, never multiword-token headers or empty nodes. */
export function rankCorpus(text) {
	const index = new Map();
	let sentence = '';
	let tokens = 0;
	let selected = 0;
	for (const [offset, line] of text.split(/\r?\n/).entries()) {
		if (line.startsWith('# sent_id = ')) sentence = line.slice(12).trim();
		if (!line || line.startsWith('#')) continue;
		const [id, , rawLemma, pos] = line.split('\t');
		if (!/^\d+$/.test(id)) continue;
		tokens++;
		if (
			!included.has(pos) ||
			!rawLemma ||
			rawLemma === '_' ||
			!/\p{Script=Arabic}/u.test(rawLemma)
		)
			continue;
		const lemma = rawLemma.normalize('NFC');
		const key = JSON.stringify([lemma, pos]);
		const row = index.get(key) ?? {
			id: checksum(key),
			lemma,
			lookup: normalizeLemma(lemma),
			pos,
			count: 0,
			witnesses: [],
			status: 'needs-review'
		};
		row.count++;
		selected++;
		if (row.witnesses.length < 3) {
			row.witnesses.push({ sentence, token: id, line: offset + 1 });
		}
		index.set(key, row);
	}
	if (!tokens || !selected) throw new Error('No eligible annotated Arabic words');
	return {
		schema: 1,
		source: {
			id: 'ud-arabic-pud',
			url: sourceUrl,
			version: 'r2.17',
			sha256: checksum(text),
			license: 'CC BY-SA 3.0',
			attribution: 'Universal Dependencies Arabic PUD contributors',
			changes: 'Annotated lemma/POS counts and up to three token locators per candidate.'
		},
		basis: 'annotated lemma and UPOS in this translated news/wiki sample only',
		totals: { tokens, selected, lemmaPosKeys: index.size },
		entries: [...index.values()].sort((a, b) => b.count - a.count || a.id.localeCompare(b.id))
	};
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
	const [input, output] = process.argv.slice(2);
	if (!input || !output) throw new Error('Usage: node scripts/p6-msa-corpus.mjs <conllu> <json>');
	const report = rankCorpus(readFileSync(input, 'utf8'));
	writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
	console.log(JSON.stringify(report.totals));
}
