import { describe, expect, it } from 'vitest';
import { dictionaryPilot } from '#lib/content/dictionary-pilot.js';
import {
	buildDictionaryShards,
	createDictionaryLoader,
	DictionaryQueryTooBroadError,
	MAX_DICTIONARY_AUTO_FETCH_SHARDS,
	selectDictionaryShards
} from './shards.js';
import { searchDictionary } from './senses.js';

const revision = 'a'.repeat(16);
const seed = dictionaryPilot[0]!;
const seedSense = seed.senses[0]!;
describe('P5 sharded search', () => {
	it('selects shards without dropping Arabic forms, roots or Indonesian substrings', () => {
		const { manifest, shards } = buildDictionaryShards(dictionaryPilot, revision, 1);
		expect(shards).toHaveLength(5);
		for (const query of ['كتب', 'كُتُب', 'مَكَاتِب', 'kantor', 'tulis', 'perpus', 'x']) {
			const selected = selectDictionaryShards(manifest, query).flatMap((id) => shards[id] ?? []);
			const ids = searchDictionary(selected, query)
				.map((entry) => entry.id)
				.sort();
			expect(ids).toEqual(
				searchDictionary(dictionaryPilot, query)
					.map((entry) => entry.id)
					.sort()
			);
		}
	});
	it('loads only on search, caches requests and completes attested root families', async () => {
		const { manifest, shards } = buildDictionaryShards(dictionaryPilot, revision, 1);
		const requests: string[] = [];
		const loader = createDictionaryLoader(async (path) => {
			requests.push(path);
			if (path === 'manifest-v1.json') return manifest;
			const id = Number(path.slice(revision.length + 1, -5));
			return shards[id];
		});
		expect(await loader.search('')).toEqual([]);
		expect(requests).toEqual([]);
		expect(await loader.search('unmatched')).toEqual([]);
		expect(requests).toEqual(['manifest-v1.json']);
		const family = await loader.search('kantor');
		expect(family).toHaveLength(5);
		const count = requests.length;
		await loader.search('kantor');
		expect(requests).toHaveLength(count);
	});
	it('is deterministic and retries a failed manifest request', async () => {
		const expected = buildDictionaryShards(dictionaryPilot, revision, 2);
		expect(buildDictionaryShards([...dictionaryPilot].reverse(), revision, 2)).toEqual(expected);
		let calls = 0;
		const loader = createDictionaryLoader(async (path) => {
			if (path !== 'manifest-v1.json') throw new Error('unexpected shard');
			if (calls++ === 0) throw new Error('offline');
			return expected.manifest;
		});
		await expect(loader.search('unmatched')).rejects.toThrow('offline');
		expect(await loader.search('unmatched')).toEqual([]);
	});
	it('explicitly refuses a broad query before fetching shards and allows a narrow retry', async () => {
		const entries = Array.from({ length: MAX_DICTIONARY_AUTO_FETCH_SHARDS + 1 }, (_, i) => ({
			...seed,
			id: 'synthetic-' + i,
			root: undefined,
			lemma: 'كَتَبَ',
			senses: [{ ...seedSense, glossId: i === 0 ? 'unik' : 'umum' }],
			forms: []
		}));
		const { manifest, shards } = buildDictionaryShards(entries, revision, 1);
		const requested: string[] = [];
		const loader = createDictionaryLoader(async (path) => {
			requested.push(path);
			if (path === 'manifest-v1.json') return manifest;
			return shards[Number(path.slice(revision.length + 1, -5))];
		});
		expect(selectDictionaryShards(manifest, 'ك')).toHaveLength(entries.length);
		await expect(loader.search('ك')).rejects.toBeInstanceOf(DictionaryQueryTooBroadError);
		expect(requested).toEqual(['manifest-v1.json']);
		const results = await loader.search('unik');
		expect(results.map((entry) => entry.id)).toEqual(['synthetic-0']);
		expect(requested).toHaveLength(2);
	});

	it('rejects invalid prefix locators before fetching any shard', async () => {
		const { manifest, shards } = buildDictionaryShards(dictionaryPilot, revision, 1);
		const malformed = { ...manifest, prefix: { ...manifest.prefix, inv: [0, 999] } };
		const requests: string[] = [];
		const loader = createDictionaryLoader(async (path) => {
			requests.push(path);
			return path === 'manifest-v1.json'
				? malformed
				: shards[Number(path.slice(revision.length + 1, -5))];
		});
		await expect(loader.search('invalid')).rejects.toThrow('Invalid dictionary shard ID');
		expect(requests).toEqual(['manifest-v1.json']);
	});

	it('rejects invalid root-family locators without starting partial expansion', async () => {
		const { manifest, shards } = buildDictionaryShards(dictionaryPilot, revision, 1);
		const roots = Object.fromEntries(Object.keys(manifest.roots).map((root) => [root, [999]]));
		const malformed = { ...manifest, roots };
		const requests: string[] = [];
		const loader = createDictionaryLoader(async (path) => {
			requests.push(path);
			return path === 'manifest-v1.json'
				? malformed
				: shards[Number(path.slice(revision.length + 1, -5))];
		});
		await expect(loader.search('kantor')).rejects.toThrow('Invalid dictionary shard ID');
		expect(requests).toContain('manifest-v1.json');
		expect(requests).not.toContain(revision + '-999.json');
	});

	it('never returns a truncated root family when expansion crosses the shard limit', async () => {
		const entries = Array.from({ length: MAX_DICTIONARY_AUTO_FETCH_SHARDS + 1 }, (_, i) => ({
			...seed,
			id: 'family-' + i,
			lemma: 'كَتَبَ',
			senses: [{ ...seedSense, glossId: i === 0 ? 'unik' : 'umum' }],
			forms: []
		}));
		const { manifest, shards } = buildDictionaryShards(entries, revision, 1);
		const requests: string[] = [];
		const loader = createDictionaryLoader(async (path) => {
			requests.push(path);
			return path === 'manifest-v1.json'
				? manifest
				: shards[Number(path.slice(revision.length + 1, -5))];
		});
		await expect(loader.search('unik')).rejects.toBeInstanceOf(DictionaryQueryTooBroadError);
		expect(requests).toHaveLength(2);
	});
});
