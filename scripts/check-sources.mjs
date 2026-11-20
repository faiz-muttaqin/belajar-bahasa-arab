#!/usr/bin/env node
/**
 * Checks dictionary provenance against data/sources/registry.json (docs/data/copyright-policy.md).
 *
 * - Every source has a known copyrightStatus and usage.
 * - Only public-domain or open-license sources may be used verbatim.
 * - Every folder under data/third-party/ belongs to a verbatim, allowed source.
 * - Every audit.sourceId in the verb data exists in the registry.
 * - Quotations from sources that are not public domain or open stay short.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const STATUS = ['public-domain', 'open-license', 'copyrighted', 'unknown'];
const USAGE = ['verbatim', 'quotation', 'original-synthesis', 'reference-only'];
const OPEN = ['public-domain', 'open-license'];
const MAX_QUOTE = 120;

const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
const errors = [];
const fail = (message) => errors.push(message);

const registry = read('data/sources/registry.json');
const byId = new Map();
for (const source of registry.sources) {
	if (!source.id || byId.has(source.id)) fail(`registry: missing or duplicate id ${source.id}`);
	byId.set(source.id, source);
	if (!source.title) fail(`registry ${source.id}: missing title`);
	if (!STATUS.includes(source.copyrightStatus))
		fail(`registry ${source.id}: bad copyrightStatus ${source.copyrightStatus}`);
	if (!USAGE.includes(source.usage)) fail(`registry ${source.id}: bad usage ${source.usage}`);
	if (source.usage === 'verbatim' && !OPEN.includes(source.copyrightStatus))
		fail(`registry ${source.id}: verbatim use needs a public-domain or open-license source`);
	if (source.copyrightStatus === 'open-license' && !source.license)
		fail(`registry ${source.id}: open-license source needs a license`);
	if (source.path && !existsSync(source.path))
		fail(`registry ${source.id}: path ${source.path} missing`);
}

for (const dir of existsSync('data/third-party') ? readdirSync('data/third-party') : []) {
	const owner = registry.sources.find((s) => s.path === `data/third-party/${dir}`);
	if (!owner) fail(`data/third-party/${dir}: no registry entry with this path`);
	else if (owner.usage !== 'verbatim' || !OPEN.includes(owner.copyrightStatus))
		fail(`data/third-party/${dir}: source ${owner.id} may not be copied verbatim`);
	if (!existsSync(`data/third-party/${dir}/README.md`))
		fail(`data/third-party/${dir}: README.md with attribution and licence is required`);
}

function checkAudit(where, audit) {
	if (!audit) return;
	const source = byId.get(audit.sourceId);
	if (!source) return fail(`${where}: unknown audit.sourceId ${audit.sourceId}`);
	if (!/^https:\/\//.test(audit.source ?? '')) fail(`${where}: audit.source must be an https URL`);
	if (OPEN.includes(source.copyrightStatus)) return;
	for (const [, quote] of (audit.note ?? '').matchAll(/«([^»]*)»/g)) {
		if (quote.length > MAX_QUOTE)
			fail(`${where}: quotation from ${source.id} longer than ${MAX_QUOTE} characters`);
	}
}

for (const file of [
	'data/wiktionary/verbs-form-i.id.json',
	'data/wiktionary/verbs-mazid.id.json'
]) {
	for (const [id, entry] of Object.entries(read(file))) checkAudit(`${file} ${id}`, entry.audit);
}
for (const verb of read('data/recall/verbs-qutrub-arramooz-recall.json').verbs) {
	checkAudit(`recall ${verb.id}`, verb.audit);
}

if (errors.length) {
	console.error(errors.slice(0, 50).join('\n'));
	console.error(`check-sources: ${errors.length} problem(s)`);
	process.exit(1);
}
console.log(`check-sources: ${registry.sources.length} sources, provenance rules hold`);
