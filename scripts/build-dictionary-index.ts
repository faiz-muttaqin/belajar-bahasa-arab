import { createHash } from 'node:crypto';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dictionaryPilot } from '../src/lib/content/dictionary-pilot.js';
import { buildDictionaryShards } from '../src/lib/domain/dictionary/shards.js';

const entries = dictionaryPilot;
const revision = createHash('sha256').update(JSON.stringify(entries)).digest('hex').slice(0, 24);
const { manifest, shards } = buildDictionaryShards(entries, revision);
const output = 'static/data/dictionary-generated';
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const [id, shard] of shards.entries())
	writeFileSync(output + '/' + revision + '-' + id + '.json', JSON.stringify(shard) + '\n');
writeFileSync(output + '/manifest-v1.json', JSON.stringify(manifest) + '\n');
console.log('Dictionary index:', manifest.total, 'lemmas;', manifest.shardCount, 'shards; revision', revision);
