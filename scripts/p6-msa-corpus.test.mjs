import assert from 'node:assert/strict';
import { test } from 'node:test';
import { rankCorpus } from './p6-msa-corpus.mjs';

test('counts annotated lemma/POS and skips non-word token headers and empty nodes', () => {
	const input = [
		'# sent_id = n1',
		'1-2\tوالكتاب\t_\t_',
		'1\tو\tو\tCCONJ',
		'2\tالكتاب\tكِتَاب\tNOUN',
		'2.1\tكتاب\tكِتَاب\tNOUN',
		'3\tكتاب\tكِتَاب\tNOUN',
		'4\tكتب\tكِتَاب\tVERB',
		'5\t.\t.\tPUNCT'
	].join('\n');
	const report = rankCorpus(input);
	assert.equal(report.totals.tokens, 5);
	assert.equal(report.totals.selected, 4);
	assert.equal(report.totals.lemmaPosKeys, 3);
	assert.equal(report.entries[0].count, 2);
	assert.equal(report.entries[0].witnesses[0].sentence, 'n1');
	assert.equal(report.entries[0].status, 'needs-review');
	assert.throws(() => rankCorpus('# empty'));
});
