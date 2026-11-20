#!/usr/bin/env node
/** P4: extract non-verbal lexical candidates, not reviewed dictionary entries. */
import { createHash } from 'node:crypto';
import { createReadStream, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { pathToFileURL } from 'node:url';

const POS = new Set([
	'noun',
	'adj',
	'adv',
	'pron',
	'prep',
	'postp',
	'conj',
	'particle',
	'interj',
	'num',
	'det',
	'article',
	'phrase',
	'prep_phrase',
	'proverb',
	'name',
	'abbrev'
]);
const DIALECT =
	/dialect|egyptian|levantine|moroccan|tunisian|algerian|iraqi|gulf|sudanese|yemeni|hejazi|najdi|libyan|omani|palestinian|syrian|lebanese|jordanian|colloquial/i;
const strings = (values = []) => [...new Set(values.filter((v) => typeof v === 'string'))];
const normalized = (value) => value.normalize('NFC').trim();
const hash = (value) => createHash('sha256').update(value).digest('hex');
const key = (value) => hash(JSON.stringify(value));
const registerOf = (tags) => {
	if (tags.some((tag) => DIALECT.test(tag))) return 'dialect';
	if (tags.some((tag) => /^(classical|archaic|obsolete|historical)$/i.test(tag)))
		return 'classical-or-historical';
	if (tags.some((tag) => /^(modern standard arabic|msa)$/i.test(tag))) return 'msa';
	return 'unspecified';
};

export function extractEntry(entry, line) {
	if (entry.lang_code !== 'ar' || !POS.has(entry.pos) || typeof entry.word !== 'string') {
		return [];
	}
	const page = normalized(entry.word);
	if (!page) return [];
	const canonical = strings(
		(entry.forms ?? []).filter((f) => f.tags?.includes('canonical')).map((f) => f.form)
	)
		.map(normalized)
		.filter((f) => f && f !== '-');
	// Ambiguous headwords stay ambiguous: never choose an arbitrary vocalization.
	const lemma = canonical.length === 1 ? canonical[0] : page;
	const url = 'https://en.wiktionary.org/wiki/' + encodeURIComponent(page) + '#Arabic';
	const entryTags = strings(entry.tags);
	const forms = (entry.forms ?? [])
		.filter(
			(f) =>
				typeof f.form === 'string' &&
				f.form.trim() &&
				f.form !== '-' &&
				f.tags?.some((tag) => ['plural', 'dual', 'feminine', 'masculine'].includes(tag))
		)
		.map((f) => ({ ar: normalized(f.form), tags: strings(f.tags).sort() }));
	const rows = [];
	for (const [index, sense] of (entry.senses ?? []).entries()) {
		const tags = strings([...entryTags, ...(sense.tags ?? [])]).sort();
		const glosses = strings(sense.glosses).filter((gloss) => gloss.trim());
		const register = registerOf(tags);
		const bucket =
			sense.form_of?.length ||
			sense.alt_of?.length ||
			tags.includes('form-of') ||
			tags.includes('alt-of')
				? 'form-or-variant'
				: entry.pos === 'name'
					? 'proper-name'
					: register === 'dialect'
						? 'dialect'
						: !glosses.length || tags.includes('no-gloss')
							? 'missing-gloss'
							: 'candidate';
		// The IDs identify this extract, not an immutable upstream lexical identity.
		const lemmaId = key([page, lemma, entry.pos, entry.etymology_number ?? null]);
		const senseId = key([lemmaId, glosses, tags, sense.form_of ?? [], sense.alt_of ?? []]);
		rows.push({
			bucket,
			lemmaId,
			senseId,
			ar: lemma,
			page,
			canonical,
			pos: entry.pos,
			etymologyNumber: entry.etymology_number ?? null,
			register,
			tags,
			glosses,
			forms,
			formOf: sense.form_of ?? [],
			altOf: sense.alt_of ?? [],
			reviewStatus: 'draft',
			provenance: { sourceId: 'wiktionary', url, line, senseIndex: index + 1 }
		});
	}
	return rows;
}

export async function extractFile(source, snapshot) {
	const digest = createHash('sha256');
	const stream = createReadStream(source);
	stream.on('data', (chunk) => digest.update(chunk));
	const reader = createInterface({ input: stream, crlfDelay: Infinity });
	const buckets = {};
	const perPos = {};
	const seen = new Map();
	const entries = [];
	let lines = 0;
	let duplicates = 0;
	for await (const line of reader) {
		lines++;
		if (!line.trim()) continue;
		let entry;
		try {
			entry = JSON.parse(line);
		} catch {
			throw new Error('Invalid JSONL at line ' + lines);
		}
		for (const row of extractEntry(entry, lines)) {
			const identity = key([row.bucket, row.senseId, row.forms, row.canonical]);
			const previous = seen.get(identity);
			if (previous) {
				previous.provenance.push(row.provenance);
				duplicates++;
				continue;
			}
			const record = { ...row, provenance: [row.provenance] };
			seen.set(identity, record);
			entries.push(record);
			buckets[row.bucket] = (buckets[row.bucket] ?? 0) + 1;
			if (row.bucket === 'candidate') perPos[row.pos] = (perPos[row.pos] ?? 0) + 1;
		}
	}
	const candidates = entries.filter((row) => row.bucket === 'candidate');
	return {
		schema: 1,
		source: {
			id: 'wiktionary',
			url: 'https://kaikki.org/dictionary/Arabic/kaikki.org-dictionary-Arabic.jsonl',
			snapshot,
			sha256: digest.digest('hex'),
			license: 'CC BY-SA 4.0 and GFDL',
			attribution: 'English Wiktionary contributors; extracted by Kaikki.org / Wiktextract.',
			changes: 'Selected non-verbal POS and lexical senses; retained explicit forms and tags.'
		},
		totals: {
			lines,
			duplicates,
			buckets,
			candidateSenses: new Set(candidates.map((row) => row.senseId)).size,
			candidateLemmaKeys: new Set(candidates.map((row) => row.lemmaId)).size,
			perPos
		},
		entries
	};
}

async function main() {
	const args = process.argv.slice(2);
	const value = (flag) => {
		const index = args.indexOf(flag);
		return index < 0 ? undefined : args[index + 1];
	};
	const source = value('--source');
	const output = value('--out');
	const snapshot = value('--snapshot');
	if (!source || !output || !/^\d{4}-\d{2}-\d{2}$/.test(snapshot ?? ''))
		throw new Error(
			'Usage: node scripts/build-wiktionary-nonverbs.mjs --source <jsonl> --snapshot <dump YYYY-MM-DD> --out <json>'
		);
	if (resolve(source) === resolve(output)) throw new Error('Input and output must differ');
	const result = await extractFile(source, snapshot);
	if (!result.totals.candidateSenses) throw new Error('No lexical candidates; check the source');
	mkdirSync(dirname(output), { recursive: true });
	writeFileSync(output, JSON.stringify(result) + '\n');
	console.log(JSON.stringify(result.totals, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
	main().catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
