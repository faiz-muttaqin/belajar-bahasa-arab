#!/usr/bin/env node
/**
 * Extracts Arabic Form I (tsulatsi mujarrad) verbs from a Wiktionary dump and writes
 * data/wiktionary/verbs-form-i.json.
 *
 * Source: kaikki.org Arabic extract of the English Wiktionary (CC BY-SA 4.0 + GFDL),
 *   https://kaikki.org/dictionary/Arabic/kaikki.org-dictionary-Arabic.jsonl  (about 870 MB)
 * Download it OUTSIDE the repo, then:
 *   bun scripts/build-wiktionary-verbs.mjs --source /path/to/kaikki.org-dictionary-Arabic.jsonl
 *
 * Nothing is guessed: a field is only written when the dump has it. The bab (1 to 6) comes
 * from the dump's vowel pattern (e.g. "a~u"); when that is missing it is derived only for
 * sound three-letter verbs, otherwise bab stays 0 ("belum diketahui").
 */
import { createReadStream, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { createInterface } from 'node:readline';

const args = process.argv.slice(2);
const sourceIndex = args.indexOf('--source');
if (sourceIndex < 0 || !args[sourceIndex + 1]) {
	console.error('usage: bun scripts/build-wiktionary-verbs.mjs --source <kaikki jsonl>');
	process.exit(1);
}
const source = args[sourceIndex + 1];
const out = new URL('../data/wiktionary/verbs-form-i.json', import.meta.url).pathname;

/** Site order of the first six bab: nasara, daraba, fataha, alima, hasiba, hasuna. */
const BAB = { 'a~u': 1, 'a~i': 2, 'a~a': 3, 'i~a': 4, 'i~i': 5, 'u~u': 6 };
const VOWEL = { a: 'َ', i: 'ِ', u: 'ُ' };
const MARKS = /[ً-ْٰ]/g;
const strip = (s) => s.normalize('NFC').replace(/ـ/g, '').replace(MARKS, '');

/** Pattern like "a~u", "a~u,i" or "a,i~a" to the list of bab numbers it allows. */
function babsFromPattern(pattern) {
	if (!pattern) return [];
	const [past, nonPast] = pattern.split('~');
	if (!past || !nonPast) return [];
	const babs = new Set();
	for (const p of past.split(',')) {
		for (const n of nonPast.split(',')) {
			const bab = BAB[`${p}~${n}`];
			if (bab) babs.add(bab);
		}
	}
	return [...babs].sort();
}

/** Splits an Arabic string into letter + mark clusters. */
function clusters(text) {
	return text.normalize('NFD').match(/[ء-يٱ][ً-ْٰ]*/g) ?? [];
}

/** Derives a bab from vocalised forms, for sound three-letter verbs only. */
function babFromForms(madhi, nonPast) {
	const past = clusters(madhi);
	const present = clusters(nonPast ?? '');
	if (past.length !== 3 || present.length !== 4) return 0;
	const pv = Object.entries(VOWEL).find(([, mark]) => past[1].includes(mark))?.[0];
	const nv = Object.entries(VOWEL).find(([, mark]) => present[2].includes(mark))?.[0];
	return (pv && nv && BAB[`${pv}~${nv}`]) || 0;
}

const tagged = (forms, ...tags) =>
	forms.find((f) => tags.every((t) => (f.tags ?? []).includes(t)))?.form;

/** Wiktionary uses "-" for a missing form. */
const clean = (form) => (form && form !== '-' ? form : undefined);

const verbs = [];
const seen = new Map();
const rl = createInterface({ input: createReadStream(source, { encoding: 'utf8' }) });
let lines = 0;
for await (const line of rl) {
	lines += 1;
	if (!line.includes('"pos": "verb"') || !line.includes('ar-verb')) continue;
	const entry = JSON.parse(line);
	if (entry.pos !== 'verb') continue;
	const template = (entry.head_templates ?? []).find((t) => t.name === 'ar-verb');
	const arg = template?.args?.['1'] ?? '';
	const match = arg.match(/^([IVX]+)(?=$|[/.:])(?:\/([^.:]+))?/);
	if (!match || match[1] !== 'I') continue;
	const forms = entry.forms ?? [];
	const madhi = forms.find((f) => (f.tags ?? []).includes('canonical'))?.form;
	if (!madhi) continue;
	const nonPast = tagged(forms, 'non-past');
	const verbalNouns = [
		...new Set(forms.filter((f) => (f.tags ?? []).includes('noun-from-verb')).map((f) => f.form))
	].slice(0, 3);
	const glosses = (entry.senses ?? [])
		.filter(
			(s) => s.glosses?.length && !(s.tags ?? []).some((t) => t === 'form-of' || t === 'alt-of')
		)
		.map((s) => s.glosses[s.glosses.length - 1]);
	const patternBabs = babsFromPattern(match[2]);
	const derived = patternBabs.length ? 0 : babFromForms(madhi, nonPast);
	const babs = patternBabs.length ? patternBabs : derived ? [derived] : [];
	const title = strip(entry.word ?? madhi);
	const count = (seen.get(title) ?? 0) + 1;
	seen.set(title, count);
	verbs.push({
		id: `${title}-${count}`,
		ar: madhi.normalize('NFC'),
		tr: tagged(forms, 'romanization'),
		nonPast,
		verbalNouns,
		activeParticiple: clean(tagged(forms, 'active', 'participle')),
		passiveParticiple: clean(tagged(forms, 'passive', 'participle')),
		bab: babs[0] ?? 0,
		altBabs: babs.slice(1),
		babSource: patternBabs.length
			? 'wiktionary-pattern'
			: derived
				? 'derived-from-forms'
				: 'unknown',
		pattern: match[2] ?? null,
		transitive: (entry.senses ?? []).some((s) => (s.tags ?? []).includes('transitive')),
		en: [...new Set(glosses)].slice(0, 3),
		page: `https://en.wiktionary.org/wiki/${encodeURIComponent(title)}`
	});
}

verbs.sort((a, b) => a.bab - b.bab || a.ar.localeCompare(b.ar, 'ar'));
const counts = Object.fromEntries(
	[0, 1, 2, 3, 4, 5, 6].map((bab) => [bab, verbs.filter((v) => v.bab === bab).length])
);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(
	out,
	JSON.stringify(
		{
			schema: 1,
			license: 'CC BY-SA 4.0',
			attribution:
				'Data from the English Wiktionary (en.wiktionary.org), extracted by kaikki.org (Tatu Ylonen), CC BY-SA 4.0 and GFDL. Each entry links to its Wiktionary page.',
			source: 'https://kaikki.org/dictionary/Arabic/kaikki.org-dictionary-Arabic.jsonl',
			totals: { verbs: verbs.length, perBab: counts },
			verbs
		},
		null,
		0
	) + '\n'
);
console.log(`read ${lines} lines, wrote ${verbs.length} Form I verbs`, counts);
