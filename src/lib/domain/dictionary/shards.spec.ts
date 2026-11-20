import { describe, expect, it } from 'vitest';
import { dictionaryPilot } from '#lib/content/dictionary-pilot.js';
import { buildDictionaryShards, createDictionaryLoader, selectDictionaryShards } from './shards.js';
import { searchDictionary } from './senses.js';

const revision = 'a'.repeat(16);
describe('P5 sharded search', () => {
	it('selects shards without dropping Arabic forms, roots or Indonesian substrings', () => {
		const { manifest, shards } = buildDictionaryShards(dictionaryPilot, revision, 1);
		expect(shards).toHaveLength(5);
		for (const query of ['كتب', 'كُتُب', 'مَكَاتِب', 'kantor', 'tulis', 'perpus', 'x']) {
			const selected = selectDictionaryShards(manifest, query).flatMap((id) => shards[id] ?? []);
			const ids = searchDictionary(selected, query).map((entry) => entry.id).sort();
			expect(ids).toEqual(searchDictionary(dictionaryPilot, query).map((entry) => entry.id).sort());
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
});
