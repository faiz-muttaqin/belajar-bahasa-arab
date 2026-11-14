/**
 * Rebuild the independently licensed GPL-2.0 data asset from pinned upstream
 * dictionary snapshots, without scraping at runtime.
 *
 * Usage: bun scripts/build-sharaf-lexicon.mjs [--check]
 */
import { readFileSync, writeFileSync } from 'node:fs';

const root = 'data/sharaf-upstream/';
const output = 'static/data/sharaf-lexicon-v1.json';
const read = (file) => readFileSync(root + file, 'utf8').replace(/^\uFEFF/, '');

function verbRows(file) {
	const rows = [];
	for (const line of read(file).split(/\r?\n/)) {
		if (!line.trim() || line.startsWith('#')) continue;
		const fields = line.split('\t');
		if (fields.length !== 5 || !/^[1-6]$/.test(fields[2]) || !/^t\d+$/.test(fields[4])) {
			throw new Error('Unexpected verb row: ' + file + ' ' + line.slice(0, 80));
		}
		rows.push(fields);
	}
	return rows;
}

const qRows = verbRows('qutrub-ar_verb_normalized.dict');
const aRows = verbRows('arramooz-verb_triliteral.tsv');
const all = new Map();

for (const [source, rows] of [
	['q', qRows],
	['a', aRows]
]) {
	for (const [sourceLemma, sourceRoot, nativeBab, transitivity, id] of rows) {
		const lemma = sourceLemma.normalize('NFC');
		const root = sourceRoot.normalize('NFC');
		const bab = nativeBab === '5' ? 6 : nativeBab === '6' ? 5 : Number(nativeBab);
		const key = JSON.stringify([lemma, root, bab]);
		let record = all.get(key);
		if (!record) {
			record = [lemma, root, bab, '', '', '', ''];
			all.set(key, record);
		}
		const offset = source === 'q' ? 3 : 4;
		record[offset] = [
			...new Set((record[offset] ? record[offset].split(',') : []).concat([transitivity]))
		].join('/');
		record[offset + 2] = [
			...new Set((record[offset + 2] ? record[offset + 2].split(',') : []).concat([id]))
		].join(',');
	}
}

const types = {};
const words = [];
for (const [i, line] of read('arabicstopwords-classified.tsv').split(/\r?\n/).entries()) {
	if (!line.trim() || line.startsWith('#') || line.startsWith('word\t')) continue;
	const values = line.split('\t');
	if (values.length < 4) throw new Error('Malformed function word at line ' + (i + 1));
	types[values[2]] = (types[values[2]] || 0) + 1;
	words.push([values[1], values[0], values[2], values[3], i + 1]);
}

const verbs = [...all.values()].sort(
	(a, b) => a[2] - b[2] || a[0].localeCompare(b[0], 'ar') || a[1].localeCompare(b[1], 'ar')
);
const data = {
	schema: 1,
	revision: 'q400bdc3-a-d5ff8ffe-sf72f8b',
	license: 'GPL-2.0',
	licenseFile: 'data/sharaf-upstream/GPL-2.0.txt',
	sources: {
		qutrub: {
			repo: 'linuxscout/qutrub',
			commit: '52e1412ccbaaf429136412183318fcbf0cf9bcd7',
			blobSha: '400bdc328dfe6f4b983f44b160d14404aad61b67',
			file: 'data/ar_verb_normalized.dict',
			total: qRows.length
		},
		arramooz: {
			repo: 'linuxscout/arramooz',
			commit: 'b055c5dea51b8a9152e7e66a7ca3b6f713fb187d',
			blobSha: 'd5ff8ffe5439f03a3b37cad9a4dc5c1e497d8570',
			file: 'data/verbs/verb_triliteral.csv',
			total: aRows.length
		},
		arabicstopwords: {
			repo: 'linuxscout/arabicstopwords',
			commit: 'f6018e22e02067022231d4dbda0e46b4b1b7e1e7',
			blobSha: 'f72f8b565ea94cbe7c5f9c2e686b7b0a636fc59c',
			file: 'releases/latest/csv/stopwords_classified.csv',
			total: words.length
		}
	},
	totals: {
		qutrub: qRows.length,
		arramooz: aRows.length,
		uniqueVerbs: verbs.length,
		stopwordRecords: words.length,
		stopwordTypes: types
	},
	verbFields: [
		'vocalized_madhi',
		'root',
		'internal_bab',
		'qutrub_transitivity',
		'arramooz_transitivity',
		'qutrub_source_ids',
		'arramooz_source_ids'
	],
	wordFields: ['vocalized', 'unvocalized', 'source_pos', 'source_class', 'source_line'],
	verbs,
	words
};
if (
	qRows.length !== 7889 ||
	aRows.length !== 7952 ||
	verbs.length !== 7938 ||
	words.length !== 596
) {
	throw new Error('Unexpected upstream dictionary totals: ' + JSON.stringify(data.totals));
}

const serialized = JSON.stringify(data) + '\n';
if (process.argv.includes('--check')) {
	if (readFileSync(output, 'utf8') !== serialized) {
		throw new Error('Generated lexicon is not reproducible; run the build script to refresh it.');
	}
	console.log('Verified reproducible normalized dataset:', data.totals);
} else {
	writeFileSync(output, serialized);
	console.log('Wrote normalized static lexicon:', data.totals);
}
