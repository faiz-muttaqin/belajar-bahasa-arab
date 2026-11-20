import { normalizeArabicSearch } from '#lib/domain/sharaf/lexicon.js';
import { searchDictionary, validateDictionary, type DictionaryEntry } from './senses.js';

export type DictionaryManifest = {
	schema: 1;
	revision: string;
	total: number;
	shardCount: number;
	prefix: Record<string, number[]>;
	roots: Record<string, number[]>;
};

const normalizedRoot = (entry: DictionaryEntry) =>
	entry.root?.ar.normalize('NFC').replace(/\s/g, '') ?? '';

function add(index: Map<string, Set<number>>, key: string, shard: number) {
	if (!key) return;
	const shards = index.get(key) ?? new Set<number>();
	shards.add(shard);
	index.set(key, shards);
}

function serialize(index: Map<string, Set<number>>) {
	return Object.fromEntries(
		[...index]
			.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
			.map(([key, ids]) => [key, [...ids].sort((a, b) => a - b)])
	);
}

/** Exact/prefix Arabic or form search, and substring Indonesian gloss search. No full entries in manifest. */
export function buildDictionaryShards(
	entries: readonly DictionaryEntry[],
	revision: string,
	shardSize = 128
) {
	const issues = validateDictionary(entries);
	if (issues.length) throw new Error(issues.join('\n'));
	if (
		!/^[a-f0-9]{16,64}$/.test(revision) ||
		!Number.isSafeInteger(shardSize) ||
		shardSize < 1 ||
		shardSize > 512
	)
		throw new Error('Invalid shard configuration');
	const ordered = [...entries].sort((a, b) => {
		const x = normalizeArabicSearch(a.lemma);
		const y = normalizeArabicSearch(b.lemma);
		return x < y ? -1 : x > y ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
	});
	const shards: DictionaryEntry[][] = [];
	const prefix = new Map<string, Set<number>>();
	const roots = new Map<string, Set<number>>();
	for (const [i, entry] of ordered.entries()) {
		const shardId = Math.floor(i / shardSize);
		const shard = shards[shardId] ?? [];
		shards[shardId] = shard;
		shard.push(entry);
		const words = [
			entry.lemma,
			normalizedRoot(entry),
			...entry.forms.filter((form) => form.origin === 'attested').map((form) => form.ar)
		];
		for (const word of words.map(normalizeArabicSearch)) {
			for (let size = 1; size <= 3 && size <= word.length; size++)
				add(prefix, word.slice(0, size), shardId);
		}
		for (const sense of entry.senses) {
			const gloss = normalizeArabicSearch(sense.glossId);
			for (let i = 0; i < gloss.length; i++) {
				for (let size = 1; size <= 3 && i + size <= gloss.length; size++)
					add(prefix, gloss.slice(i, i + size), shardId);
			}
		}
		add(roots, normalizedRoot(entry), shardId);
	}
	const manifest: DictionaryManifest = {
		schema: 1,
		revision,
		total: entries.length,
		shardCount: shards.length,
		prefix: serialize(prefix),
		roots: serialize(roots)
	};
	return { manifest, shards };
}

export function selectDictionaryShards(manifest: DictionaryManifest, query: string): number[] {
	const key = normalizeArabicSearch(query).slice(0, 3);
	if (!key) return [];
	return Object.hasOwn(manifest.prefix, key) ? (manifest.prefix[key] ?? []) : [];
}

/** Loader caches successful and in-flight requests; errors are retryable. */
export function createDictionaryLoader(read: (path: string) => Promise<unknown>) {
	let manifestPromise: Promise<DictionaryManifest> | undefined;
	const cache = new Map<number, Promise<DictionaryEntry[]>>();
	function getManifest() {
		if (!manifestPromise) {
			manifestPromise = read('manifest-v1.json')
				.then((raw) => {
					const value = raw as DictionaryManifest;
					if (
						!value ||
						value.schema !== 1 ||
						!/^[a-f0-9]{16,64}$/.test(value.revision) ||
						!Number.isSafeInteger(value.shardCount) ||
						value.shardCount < 0 ||
						!value.prefix ||
						!value.roots
					)
						throw new Error('Invalid dictionary manifest');
					return value;
				})
				.catch((error: unknown) => {
					manifestPromise = undefined;
					throw error;
				});
		}
		return manifestPromise;
	}
	function getShard(manifest: DictionaryManifest, id: number) {
		if (!Number.isSafeInteger(id) || id < 0 || id >= manifest.shardCount)
			throw new Error('Invalid dictionary shard ID');
		let pending = cache.get(id);
		if (!pending) {
			pending = read(manifest.revision + '-' + id + '.json')
				.then((raw) => {
					if (!Array.isArray(raw)) throw new Error('Invalid dictionary shard');
					return raw as DictionaryEntry[];
				})
				.catch((error: unknown) => {
					cache.delete(id);
					throw error;
				});
			cache.set(id, pending);
		}
		return pending;
	}
	return {
		async search(query: string): Promise<DictionaryEntry[]> {
			if (!normalizeArabicSearch(query)) return [];
			const manifest = await getManifest();
			const ids = new Set(selectDictionaryShards(manifest, query));
			const candidates = (await Promise.all([...ids].map((id) => getShard(manifest, id)))).flat();
			// Only expand families of actual matches, never infer a root from spelling.
			const matches = searchDictionary(candidates, query);
			for (const entry of matches) {
				const root = normalizedRoot(entry);
				if (root && Object.hasOwn(manifest.roots, root)) {
					for (const id of manifest.roots[root] ?? []) ids.add(id);
				}
			}
			return (await Promise.all([...ids].map((id) => getShard(manifest, id)))).flat();
		}
	};
}
