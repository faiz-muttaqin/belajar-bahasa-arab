import { base, resolve } from '$app/paths';
import { readCatalog, saveCatalog, readBulkSharafCache, saveBulkSharafCache } from './storage.js';
import { prepareSharafSearchIndex } from '#lib/domain/sharaf/lexicon.js';
import { BULK_SHARAF_PATH, isBulkSharafLexicon, mergeBulkSharaf, type BulkSharafLexicon } from '#lib/domain/sharaf/bulk.js';
import {
	CATALOG_PATH,
	MANIFEST_PATH,
	isCatalog,
	isCatalogManifest,
	type Catalog
} from './types.js';

export const catalogState = $state<{
	catalog?: Catalog;
	busy: boolean;
	saved: boolean;
	error: boolean;
}>({ busy: false, saved: false, error: false });

export const bulkSharafState = $state<{
	data?: BulkSharafLexicon;
	busy: boolean;
	saved: boolean;
	error: boolean;
}>({ busy: false, saved: false, error: false });

let bulkInFlight: Promise<void> | undefined;
let bulkChecked = false;
let inFlight: Promise<void> | undefined;
let checked = false;

function warmSharafSearch(entries: Catalog['sharaf']) {
	if (!entries?.length) return;
	// Lower-priority indexing happens after the currently displayed page has painted.
	const warm = () => void prepareSharafSearchIndex(entries);
	if ('requestIdleCallback' in window) {
		window.requestIdleCallback(warm, { timeout: 2_000 });
	} else {
		setTimeout(warm, 0);
	}
}

async function fetchCatalogFile(
	path: typeof CATALOG_PATH | typeof MANIFEST_PATH,
	version?: string
) {
	const url = new URL(resolve(path), location.href);
	if (version) url.searchParams.set('v', version);
	const response = await fetch(url, {
		cache: version ? 'default' : 'no-cache',
		signal: AbortSignal.timeout(15_000)
	});
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	return response;
}

async function sync() {
	catalogState.busy = true;
	catalogState.error = false;
	try {
		if (!catalogState.catalog) {
			const cached = await readCatalog().catch(() => undefined);
			if (isCatalog(cached)) {
				catalogState.catalog = cached;
				catalogState.saved = true;
				warmSharafSearch(cached.sharaf);
			}
		}
		if (!navigator.onLine) return;

		const manifest: unknown = await (await fetchCatalogFile(MANIFEST_PATH)).json();
		if (!isCatalogManifest(manifest)) throw new Error('Versi daftar materi tidak sesuai.');
		if (catalogState.catalog?.version !== manifest.version) {
			const response = await fetchCatalogFile(CATALOG_PATH, manifest.version);
			const bytes = await response.arrayBuffer();
			if (bytes.byteLength !== manifest.bytes) throw new Error('Unduhan materi tidak lengkap.');
			const downloaded: unknown = JSON.parse(new TextDecoder().decode(bytes));
			if (!isCatalog(downloaded) || downloaded.version !== manifest.version) {
				throw new Error('Versi unduhan materi tidak sesuai.');
			}
			// Keep the previous saved data until a complete replacement is ready.
			catalogState.catalog = downloaded;
			catalogState.saved = false;
			warmSharafSearch(downloaded.sharaf);
		}
		if (catalogState.catalog && !catalogState.saved) {
			await saveCatalog($state.snapshot(catalogState.catalog));
			catalogState.saved = true;
		}
		checked = true;
	} catch {
		catalogState.error = true;
	} finally {
		catalogState.busy = false;
	}
}

export function prepareCatalog(refresh = false) {
	if (inFlight) return inFlight;
	if (checked && !refresh) return Promise.resolve();
	inFlight = sync().finally(() => {
		inFlight = undefined;
	});
	return inFlight;
}

async function syncBulkSharaf() {
	bulkSharafState.busy = true;
	bulkSharafState.error = false;
	try {
		if (!bulkSharafState.data) {
			const cached = await readBulkSharafCache();
			if (isBulkSharafLexicon(cached)) {
				bulkSharafState.data = cached;
				bulkSharafState.saved = true;
			}
		}
		if (bulkSharafState.data) {
			bulkChecked = true;
			return;
		}
		if (!navigator.onLine) return;
		const response = await fetch(`${base}/${BULK_SHARAF_PATH}`, {
			cache: 'force-cache',
			signal: AbortSignal.timeout(30_000)
		});
		if (!response.ok) throw new Error(`Gagal mengambil leksikon: HTTP ${response.status}`);
		const parsed: unknown = await response.json();
		if (!isBulkSharafLexicon(parsed)) throw new Error('Skema leksikon tidak sesuai');
		bulkSharafState.data = parsed;
		// Build the normalized search index after the page has painted.
		if (catalogState.catalog?.sharaf) {
			const full = mergeBulkSharaf(catalogState.catalog.sharaf, parsed);
			warmSharafSearch(full);
		}
		bulkSharafState.saved = (await saveBulkSharafCache(parsed)) !== 'none';
		bulkChecked = true;
	} catch {
		bulkSharafState.error = true;
	} finally {
		bulkSharafState.busy = false;
	}
}

export function prepareBulkSharaf() {
	if (bulkInFlight) return bulkInFlight;
	if (bulkChecked) return Promise.resolve();
	bulkInFlight = syncBulkSharaf().finally(() => {
		bulkInFlight = undefined;
	});
	return bulkInFlight;
}

// Start after the current page has finished loading. An explicit visit to search starts immediately.
export function startBackgroundCatalog() {
	const refresh = () => {
		void prepareCatalog(true);
		void prepareBulkSharaf();
	};
	const warm = () => {
		void prepareCatalog();
		void prepareBulkSharaf();
	};
	let timer: ReturnType<typeof setTimeout> | undefined;

	const schedule = () => {
		timer = setTimeout(warm, 800);
	};
	if (document.readyState === 'complete') schedule();
	else window.addEventListener('load', schedule, { once: true });
	window.addEventListener('online', refresh);

	return () => {
		clearTimeout(timer);
		window.removeEventListener('load', schedule);
		window.removeEventListener('online', refresh);
	};
}
