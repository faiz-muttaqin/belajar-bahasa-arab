import { describe, expect, it } from 'vitest';
import { runBenchmark } from './p7-dictionary-benchmark.js';

describe('P7.7 per-asset compression report', () => {
	it('reports both transfer codecs without hiding broad-query fan-out', () => {
		const sample = runBenchmark([257]);
		expect(sample.syntheticOnly).toBe(true);
		const result = sample.results[0]!;
		const broad = result.fanout['ك']!;
		expect(result.shardCount).toBe(3);
		expect(result.manifestGzipBytes).toBeGreaterThan(0);
		expect(result.manifestBrotliBytes).toBeGreaterThan(0);
		expect(result.totalShardGzipBytes).toBeGreaterThan(0);
		expect(result.totalShardBrotliBytes).toBeGreaterThan(0);
		expect(result.maxShardGzipBytes).toBeGreaterThan(0);
		expect(result.maxShardBrotliBytes).toBeGreaterThan(0);
		expect(broad.shards).toBe(3);
		expect(broad.approxTransferBytes).toBe(result.totalShardBytes);
		expect(broad.approxTransferGzipBytes).toBe(result.totalShardGzipBytes);
		expect(broad.approxTransferBrotliBytes).toBe(result.totalShardBrotliBytes);
	});
});
