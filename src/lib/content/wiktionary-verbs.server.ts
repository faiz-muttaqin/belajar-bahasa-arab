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

export function loadVerbs() {
	const source = readJson<{ attribution: string; verbs: WiktionaryVerb[] }>('verbs-form-i.json', {
		attribution: '',
		verbs: []
	});
	const translations = readJson<Record<string, VerbTranslation>>('verbs-form-i.id.json', {});
	const google = readJson<Record<string, string>>('verbs-form-i.google.json', {});
	return { attribution: source.attribution, verbs: source.verbs, translations, google };
}
