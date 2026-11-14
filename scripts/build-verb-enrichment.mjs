#!/usr/bin/env node
/**
 * Packs the Wiktionary verb data and the model-recall data into one compact static file,
 * static/data/verbs-enrich-v1.json, loaded on demand by the tashrif modal (not bundled).
 *
 *   bun scripts/build-verb-enrichment.mjs
 *
 * Inputs (all in the repo): data/wiktionary/verbs-form-i.json, verbs-mazid.json and their
 * *.id.json translations, data/recall/verbs-qutrub-arramooz-recall.json.
 * Tuples keep the file small; field order is documented in src/lib/domain/sharaf/enrichment.ts.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const read = (path) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));
const formI = read('data/wiktionary/verbs-form-i.json');
const mazid = read('data/wiktionary/verbs-mazid.json');
const translations = {
	...read('data/wiktionary/verbs-form-i.id.json'),
	...read('data/wiktionary/verbs-mazid.id.json')
};
const recall = read('data/recall/verbs-qutrub-arramooz-recall.json');

const wk = [...formI.verbs, ...mazid.verbs].map((v) => [
	v.ar,
	v.bab,
	v.tr ?? '',
	v.nonPast ?? '',
	v.verbalNouns.join('،'),
	v.activeParticiple ?? '',
	v.passiveParticiple ?? '',
	(translations[v.id]?.idGlosses ?? []).join('; '),
	v.en.join('; '),
	v.id.replace(/-(?:[IVX]+q?-)?\d+$/, '')
]);

const KIND = { padanan: 0, deskripsi: 1, tidak_diketahui: 2 };
const CONF = { none: 0, low: 1, medium: 2, high: 3 };
const MODEL = { 'sonnet-5.5': 0, 'fable-5.2': 1 };
const rc = recall.verbs.map((v) => [
	v.ar,
	v.root,
	v.bab,
	KIND[v.kind],
	v.kind === 'padanan' ? v.meanings.join('; ') : v.kind === 'deskripsi' ? v.description : '',
	CONF[v.confidence],
	MODEL[v.model] ?? 0,
	v.code
]);

const out = new URL('../static/data/verbs-enrich-v1.json', import.meta.url).pathname;
writeFileSync(
	out,
	JSON.stringify({
		schema: 1,
		attribution: formI.attribution,
		totals: { wiktionary: wk.length, recall: rc.length },
		wk,
		rc
	}) + '\n'
);
console.log(`wrote ${out}: ${wk.length} Wiktionary verbs, ${rc.length} recall verbs`);
