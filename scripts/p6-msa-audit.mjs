import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function normalizeLemma(word) {
	return word.normalize('NFC').replace(/[\u064b-\u0652\u0670]/gu, '').trim();
}

const lexicalPos = {
	noun: 'noun',
	adjective: 'adj',
	expression: 'phrase',
	particle: 'particle'
};

/** Orthographic matches are retrieval leads only, not sense or register equivalence. */
export function buildAuditQueue(vocabulary, extract = null) {
	if (extract && (extract.schema !== 1 || extract.source?.id !== 'wiktionary')) {
		throw new Error('Expected P4 Wiktionary extract schema 1');
	}
	const index = new Map();
	for (const row of extract?.entries ?? []) {
		if (row.bucket !== 'candidate' || row.register === 'classical-or-historical') continue;
		const key = normalizeLemma(row.ar);
		const group = index.get(key) ?? [];
		group.push(row);
		index.set(key, group);
	}
	const queue = vocabulary
		.filter((item) => !item.research)
		.map((item) => {
			const key = normalizeLemma(item.arabic);
			const pos = lexicalPos[item.msa?.wordClass];
			const matches = (index.get(key) ?? []).filter((row) => row.pos === pos);
			return {
				id: item.id,
				arabic: item.arabic,
				meaning: item.meaning,
				wordClass: item.msa?.wordClass,
				status: 'needs-review',
				lookupUrl: 'https://en.wiktionary.org/wiki/' + encodeURIComponent(key) + '#Arabic',
				candidates: matches.map((row) => ({
					lemmaId: row.lemmaId,
					senseId: row.senseId,
					register: row.register,
					provenance: row.provenance
				}))
			};
		});
	return {
		schema: 1,
		source: extract?.source ?? null,
		totals: {
			pending: queue.length,
			withCandidate: queue.filter((item) => item.candidates.length > 0).length
		},
		entries: queue
	};
}

export function checksum(text) {
	return createHash('sha256').update(text).digest('hex');
}

async function main() {
	const [output, input] = process.argv.slice(2);
	if (!output) throw new Error('Usage: bun scripts/p6-msa-audit.mjs <output.json> [P4.json]');
	const { msaVocabulary } = await import('../src/lib/content/msa-vocabulary.ts');
	const extract = input ? JSON.parse(readFileSync(input, 'utf8')) : null;
	const report = buildAuditQueue(msaVocabulary, extract);
	writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
	console.log(JSON.stringify(report.totals));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
	main().catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
