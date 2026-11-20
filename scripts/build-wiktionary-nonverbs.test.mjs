import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { extractEntry, extractFile } from './build-wiktionary-nonverbs.mjs';

// Synthetic fixtures only; not dictionary content.
const fixture = {
	word: 'كتب',
	lang_code: 'ar',
	pos: 'noun',
	forms: [
		{ form: 'كُتُب', tags: ['canonical'] },
		{ form: 'كِتَاب', tags: ['singular'] }
	],
	senses: [{ glosses: ['synthetic gloss'] }]
};

test('separates lexical senses, inflections, names, dialect and missing glosses', () => {
	const rows = extractEntry(
		{
			...fixture,
			senses: [
				{ glosses: ['one'] },
				{ glosses: ['two'], tags: ['Classical'] },
				{ glosses: ['three'], form_of: [{ word: 'b' }] },
				{ glosses: ['four'], tags: ['Egyptian'] },
				{ tags: ['no-gloss'] }
			]
		},
		42
	);
	assert.deepEqual(
		rows.map((r) => r.bucket),
		['candidate', 'candidate', 'form-or-variant', 'dialect', 'missing-gloss']
	);
	assert.equal(rows[0].register, 'unspecified');
	assert.equal(rows[1].register, 'classical-or-historical');
	assert.equal(rows[0].lemmaId, rows[1].lemmaId);
	assert.notEqual(rows[0].senseId, rows[1].senseId);
	assert.equal(rows[0].provenance.line, 42);
	assert.equal(extractEntry({ ...fixture, pos: 'name' }, 1)[0].bucket, 'proper-name');
	assert.deepEqual(extractEntry({ ...fixture, pos: 'verb' }, 1), []);
	assert.deepEqual(extractEntry({ ...fixture, lang_code: 'fa' }, 1), []);
});

test('keeps homographs and does not invent headword vocalization', () => {
	const a = extractEntry(fixture, 1)[0];
	const b = extractEntry({ ...fixture, pos: 'adj' }, 2)[0];
	const c = extractEntry({ ...fixture, etymology_number: 2 }, 3)[0];
	assert.notEqual(a.lemmaId, b.lemmaId);
	assert.notEqual(a.lemmaId, c.lemmaId);
	const ambiguous = extractEntry(
		{
			...fixture,
			forms: [
				{ form: 'كُتُب', tags: ['canonical'] },
				{ form: 'كَتْب', tags: ['canonical'] }
			]
		},
		4
	)[0];
	assert.equal(ambiguous.ar, fixture.word);
	assert.equal(ambiguous.canonical.length, 2);
});

test('counts duplicate locators without losing them; malformed JSON fails', async () => {
	const dir = await mkdtemp(join(tmpdir(), 'nonverbs-'));
	try {
		const source = join(dir, 'test.jsonl');
		const line = JSON.stringify(fixture);
		await writeFile(source, line + '\n' + line + '\n');
		const result = await extractFile(source, '2026-10-01');
		assert.equal(result.totals.candidateLemmaKeys, 1);
		assert.equal(result.totals.candidateSenses, 1);
		assert.equal(result.totals.duplicates, 1);
		assert.equal(result.entries[0].provenance.length, 2);
		assert.match(result.source.sha256, /^[a-f0-9]{64}$/);
		await writeFile(source, line + '\n{invalid\n');
		await assert.rejects(extractFile(source, '2026-10-01'), /line 2/);
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
});
