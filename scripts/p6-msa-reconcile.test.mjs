import assert from 'node:assert/strict';
import { test } from 'node:test';
import { reconcileCandidates } from './p6-msa-reconcile.mjs';

test('returns all matching lemma/POS leads without deduplicating senses or claiming register', () => {
	const corpus = {
		schema: 1,
		entries: [
			{ id: 'a', lemma: 'عَقْد', pos: 'NOUN' },
			{ id: 'b', lemma: 'عَقْد', pos: 'VERB' },
			{ id: 'c', lemma: 'عَقْد', pos: 'ADJ' }
		]
	};
	const msa = [{ id: 'msa-aqd', arabic: 'عَقْدٌ', msa: { wordClass: 'noun' } }];
	const p5 = [
		{
			id: 'p5-contract',
			lemma: 'عَقْد',
			pos: 'noun',
			reviewStatus: 'draft',
			senses: [{ id: 'contract' }, { id: 'knot' }]
		},
		{ id: 'p5-verb', lemma: 'عَقَدَ', pos: 'verb', reviewStatus: 'draft', senses: [] }
	];
	const result = reconcileCandidates(corpus, msa, p5);
	assert.equal(result.entries[0].matches.length, 2);
	assert.deepEqual(result.entries[0].matches[1].senseIds, ['contract', 'knot']);
	assert.equal(result.entries[0].status, 'compare-senses');
	assert.equal(result.entries[1].matches[0].id, 'p5-verb');
	assert.equal(result.entries[2].matches.length, 0);
	assert.equal(result.entries[2].status, 'needs-review');
	assert.equal(reconcileCandidates(corpus, msa).dictionaryProvided, false);
});
