import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildAuditQueue, normalizeLemma } from './p6-msa-audit.mjs';

test('retrieval keeps hamza and only removes vowel marks', () => {
	assert.equal(normalizeLemma('أَكْلٌ'), 'أكل');
	assert.notEqual(normalizeLemma('أَكْلٌ'), normalizeLemma('اَكْلٌ'));
});

test('queue retains unaudited entries and only compatible candidate leads', () => {
	const item = { id: 'msa-test', arabic: 'كِتَابٌ', meaning: 'buku', msa: { wordClass: 'noun' } };
	const candidate = {
		ar: 'كِتَاب',
		pos: 'noun',
		bucket: 'candidate',
		register: 'unspecified',
		lemmaId: 'lemma',
		senseId: 'sense',
		provenance: [{ line: 1, senseIndex: 1 }]
	};
	const extract = {
		schema: 1,
		source: { id: 'wiktionary' },
		entries: [
			candidate,
			{ ...candidate, pos: 'adj' },
			{ ...candidate, bucket: 'dialect' },
			{ ...candidate, register: 'classical-or-historical' }
		]
	};
	const report = buildAuditQueue([item, { ...item, id: 'audited', research: {} }], extract);
	assert.equal(report.totals.pending, 1);
	assert.equal(report.totals.withCandidate, 1);
	assert.equal(report.entries[0].status, 'needs-review');
	assert.equal(report.entries[0].candidates.length, 1);
	assert.equal(buildAuditQueue([item]).totals.withCandidate, 0);
	assert.throws(() => buildAuditQueue([item], { schema: 2 }));
});
