/**
 * P7.7: synthetic-only scale benchmark. No lexical claims, dictionary export,
 * or published entries are produced by this script.
 */
import { performance } from 'node:perf_hooks';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
	buildDictionaryShards,
	MAX_DICTIONARY_AUTO_FETCH_SHARDS,
	selectDictionaryShards
} from '../src/lib/domain/dictionary/shards.js';
import type { DictionaryEntry } from '../src/lib/domain/dictionary/senses.js';

const digits = [...'ابتثجحخدذر'];
const symbol = (index: number) => {
	let value = index;
	let text = '';
	do {
		text = digits[value % 10] + text;
		value = Math.floor(value / 10);
	} while (value > 0);
	return text.padStart(5, 'ا');
};

const fakeEvidence = {
	sourceId: 'wiktionary' as const,
	url: 'https://en.wiktionary.org/wiki/%D9%83%D8%AA%D8%A8#Arabic',
	checkedOn: '2026-11-21',
	locator: 'Synthetic performance fixture ONLY; not evidence for any invented lemma'
};

/** Fake alphabetic tokens, not curated Arabic; never ship this data to learners. */
function fixtureEntries(count: number): DictionaryEntry[] {
	return Array.from({ length: count }, (_, i) => ({
		id: 'synthetic-' + i,
		lemma: 'ك' + symbol(i),
		pos: 'noun' as const,
		evidence: fakeEvidence,
		senses: [
			{
				id: 's1',
				glossId: 'contoh' + i.toString(36),
				register: 'unspecified' as const,
				evidence: fakeEvidence
			}
		],
		forms: [],
		reviewStatus: 'draft' as const
	}));
}

export function runBenchmark(sizes: readonly number[] = [10000, 25000, 50000]) {
	const results = sizes.map((total) => {
		if (!Number.isSafeInteger(total) || total < 1 || total > 50000)
			throw new Error('Invalid synthetic benchmark size');
		const entries = fixtureEntries(total);
		const start = performance.now();
		const { manifest, shards } = buildDictionaryShards(entries, 'a'.repeat(24));
		const buildMs = Math.round(performance.now() - start);
		if (manifest.total !== total || manifest.shardCount !== Math.ceil(total / 128))
			throw new Error('Benchmark lost entries');
		if (shards.some((shard) => shard.length === 0 || shard.length > 128))
			throw new Error('Invalid shard size');

		const shardBytes = shards.map((shard) => Buffer.byteLength(JSON.stringify(shard), 'utf8'));
		const manifestBytes = Buffer.byteLength(JSON.stringify(manifest), 'utf8');
		const queries = ['ك', 'كا', 'كتب', 'con', 'contoh', 's1'];
		const fanout = Object.fromEntries(
			queries.map((query) => {
				const ids = selectDictionaryShards(manifest, query);
				if (ids.some((id) => id < 0 || id >= manifest.shardCount))
					throw new Error('Invalid shard locator');
				return [
					query,
					{
						shards: ids.length,
						requiresQueryRefinement:
							manifest.shardCount > MAX_DICTIONARY_AUTO_FETCH_SHARDS &&
							ids.length > MAX_DICTIONARY_AUTO_FETCH_SHARDS,
						percent: Math.round((ids.length / manifest.shardCount) * 10000) / 100,
						approxTransferBytes: ids.reduce((sum, id) => sum + shardBytes[id], 0)
					}
				];
			})
		);
		return {
			syntheticLemmas: total,
			shardCount: shards.length,
			manifestBytes,
			totalShardBytes: shardBytes.reduce((sum, bytes) => sum + bytes, 0),
			maxShardBytes: Math.max(...shardBytes),
			buildMs,
			fanout,
			peakRssBytesObserved: process.memoryUsage().rss
		};
	});
	return {
		schema: 1,
		syntheticOnly: true,
		noLinguisticValidation: true,
		benchmarkHardwareDependent: true,
		notes: [
			'Build timings are indicative, not stable CI assertions.',
			'Single-character and shared gloss-prefix queries are adversarial fanout checks.',
			'Queries exceeding 32 shards are explicitly rejected by the loader; selection metrics remain untruncated.',
			'No synthetic entries or source text are persisted or published.'
		],
		results
	};
}

const out = process.argv[2];
if (out && import.meta.main) {
	const path = resolve(out);
	mkdirSync(dirname(path), { recursive: true });
	const result = runBenchmark();
	writeFileSync(path, JSON.stringify(result, null, 2) + '\n');
	console.log(JSON.stringify(result));
}
