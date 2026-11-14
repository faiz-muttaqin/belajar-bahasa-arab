import { resolve } from '$app/paths';
import {
	ENRICHMENT_PATH,
	isVerbEnrichment,
	type VerbEnrichment
} from '#lib/domain/sharaf/enrichment.js';
import { CATALOG_PATH } from './types.js';

/** Fetches the verb enrichment asset (HTTP-cached) and checks its shape. */
export async function fetchEnrichment(): Promise<VerbEnrichment> {
	const url = new URL(
		ENRICHMENT_PATH.slice('data/'.length),
		new URL(resolve(CATALOG_PATH), location.href)
	);
	const response = await fetch(url, { cache: 'force-cache', signal: AbortSignal.timeout(30_000) });
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	const parsed: unknown = await response.json();
	if (!isVerbEnrichment(parsed)) throw new Error('Skema tidak sesuai');
	return parsed;
}
