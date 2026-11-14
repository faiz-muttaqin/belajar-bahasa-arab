/**
 * Build-time loader (prerender only) for the Wiktionary Form I verbs.
 * Reads data/wiktionary/*.json; missing optional files simply give empty data, so the
 * site still builds on a checkout without them.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { VerbTranslation, WiktionaryVerb } from '#lib/domain/sharaf/wiktionary-verbs.js';

const dir = join(process.cwd(), 'data', 'wiktionary');

function readJson<T>(name: string, fallback: T): T {
	const file = join(dir, name);
	return existsSync(file) ? (JSON.parse(readFileSync(file, 'utf8')) as T) : fallback;
}

type Source = { attribution: string; verbs: WiktionaryVerb[] };

export function loadVerbs() {
	const formI = readJson<Source>('verbs-form-i.json', { attribution: '', verbs: [] });
	const mazid = readJson<Source>('verbs-mazid.json', { attribution: '', verbs: [] });
	const translations = {
		...readJson<Record<string, VerbTranslation>>('verbs-form-i.id.json', {}),
		...readJson<Record<string, VerbTranslation>>('verbs-mazid.id.json', {})
	};
	const google = readJson<Record<string, string>>('verbs-form-i.google.json', {});
	return {
		attribution: formI.attribution || mazid.attribution,
		verbs: [...formI.verbs, ...mazid.verbs],
		translations,
		google
	};
}
