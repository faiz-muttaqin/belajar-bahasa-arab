/**
 * Build-time loader (prerender only) for the Wiktionary Form I verbs.
 * Reads data/wiktionary/*.json; missing optional files simply give empty data, so the
 * site still builds on a checkout without them.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type {
	RecallVerb,
	VerbTranslation,
	WiktionaryVerb
} from '#lib/domain/sharaf/wiktionary-verbs.js';

const root = join(process.cwd(), 'data');

function readJson<T>(name: string, fallback: T): T {
	const file = join(root, name);
	return existsSync(file) ? (JSON.parse(readFileSync(file, 'utf8')) as T) : fallback;
}

type Source = { attribution: string; verbs: WiktionaryVerb[] };

export function loadVerbs() {
	const formI = readJson<Source>('wiktionary/verbs-form-i.json', { attribution: '', verbs: [] });
	const mazid = readJson<Source>('wiktionary/verbs-mazid.json', { attribution: '', verbs: [] });
	const translations = {
		...readJson<Record<string, VerbTranslation>>('wiktionary/verbs-form-i.id.json', {}),
		...readJson<Record<string, VerbTranslation>>('wiktionary/verbs-mazid.id.json', {})
	};
	const google = readJson<Record<string, string>>('wiktionary/verbs-form-i.google.json', {});
	return {
		attribution: formI.attribution || mazid.attribution,
		verbs: [...formI.verbs, ...mazid.verbs],
		translations,
		google
	};
}

/** Verbs from the Qutrub and Arramooz list with meanings recalled by a model. */
export function loadRecall(): RecallVerb[] {
	return readJson<{ verbs: RecallVerb[] }>('recall/verbs-qutrub-arramooz-recall.json', {
		verbs: []
	}).verbs;
}
