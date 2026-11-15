import { describe, expect, it } from 'vitest';
import { msaVocabulary } from '#lib/content/msa-vocabulary.js';
import { publishedVocabulary } from '#lib/content/vocabulary.js';
import { sharafEntries } from '#lib/content/sharaf.js';
import {
	curatedFrameSurface,
	lexemeFromSharaf,
	lexemeFromVocabulary,
	searchLexemeRecords,
	validateLexemeRecord,
	withCuratedValency,
	type LexemeRecord
} from './lexeme-forms.js';

const msa = (id: string) => {
	const word = msaVocabulary.find((entry) => entry.id === id);
	if (!word) throw new Error('Missing MSA fixture ' + id);
	return lexemeFromVocabulary(word);
};

const verb = (id: string) => {
	const word = sharafEntries.find((entry) => entry.id === id);
	if (!word) throw new Error('Missing sharaf fixture ' + id);
	return lexemeFromSharaf(word);
};

describe('D-02 lexical records and word-form provenance', () => {
	it('preserves dictionary identity, gloss, source and draft review without inferring case', () => {
		const book = msa('msa-kitab');
		expect(book.lexicon).toBe('vocabulary');
		expect(book.wordClass).toBe('noun');
		expect(book.lemma).toBe('كِتَابٌ');
		expect(book.register).toBe('msa');
		expect(book.lemmaEvidence.kind).toBe('dictionary-lemma');
		expect(book.lemmaEvidence.reviewStatus).toBe('draft');
		expect(book.forms[0]!.features).toEqual({});
		expect(book.forms.find((form) => form.id === 'plural-reference')?.text).toBe('كُتُبٌ');
		expect(book.forms.find((form) => form.id === 'plural-reference')?.features).toEqual({
			number: 'plural'
		});
		expect(validateLexemeRecord(book)).toEqual([]);
	});

	it('uses explicitly stored feminine reference forms without inventing other inflections', () => {
		const adjective = msa('msa-jadid');
		expect(adjective.wordClass).toBe('adjective');
		expect(adjective.forms).toHaveLength(2);
		expect(adjective.forms[1]!.text).toBe('جَدِيدَةٌ');
		expect(adjective.forms[1]!.features.gender).toBe('feminine');
		expect(adjective.forms[1]!.features.case).toBeUndefined();
	});

	it('preserves sharaf bab and actual stored mudhari but does not assume person or voice', () => {
		const written = verb('fiil-kataba');
		expect(written.wordClass).toBe('verb');
		expect(written.bab).toBe(1);
		expect(written.forms.find((form) => form.features.aspect === 'imperfect')?.text).toBe('يَكْتُبُ');
		expect(written.forms[0]!.features).toEqual({});
		expect(written.valency.kind).toBe('unknown');
		expect(validateLexemeRecord(written)).toEqual([]);
	});

	it('supports sourced MSA and sharaf searching without merging ambiguous unvowelled lemmas', () => {
		const records = [msa('msa-kitab'), msa('msa-madrasah'), verb('fiil-kataba')];
		expect(searchLexemeRecords(records, 'مدرسة').map((item) => item.id)).toEqual(['msa-madrasah']);
		expect(searchLexemeRecords(records, 'menulis').map((item) => item.id)).toEqual(['fiil-kataba']);
		expect(searchLexemeRecords(records, 'كتب').map((item) => item.id)).toEqual(['msa-kitab', 'fiil-kataba']);
		expect(searchLexemeRecords(records, '').length).toBe(3);
	});

	it('only creates a selectable wordform with an explicit frame and leaves it draft', () => {
		const book = msa('msa-kitab');
		const surface = curatedFrameSurface({
			lexeme: book,
			id: 'object',
			surface: 'الْكِتَابَ',
			features: {
				case: 'nasb',
				gender: 'masculine',
				number: 'singular',
				definiteness: 'definite'
			},
			reason: 'Manually curated teaching frame'
		});
		expect(surface.text).toBe('الْكِتَابَ');
		expect(surface.evidence.kind).toBe('curated-example');
		expect(surface.evidence.reviewStatus).toBe('draft');
		expect(surface.evidence.sourceUrls).toEqual(book.lemmaEvidence.sourceUrls);
		expect(surface.features.case).toBe('nasb');
	});

	it('distinguishes scoped collocations from universal lexical valency', () => {
		const v = verb('fiil-kataba');
		expect(v.valency.kind).toBe('unknown');
		const framed = withCuratedValency(v, ['msa-risalah', 'msa-kitab']);
		expect(framed.valency).toEqual({
			kind: 'transitive',
			exampleObjectIds: ['msa-risalah', 'msa-kitab'],
			evidence: 'curated-frame'
		});
		expect(v.valency.kind).toBe('unknown');
		expect(() => withCuratedValency(msa('msa-kitab'), ['msa-risalah'])).toThrow(
			'Invalid curated verb/object frame'
		);
	});

	it('requires an explicit per-frame POS override for untyped everyday vocabulary', () => {
		const doorEntry = publishedVocabulary('harian').find((item) => item.id === 'bab')!;
		const door = lexemeFromVocabulary(doorEntry);
		expect(door.wordClass).toBe('expression');
		const args = {
			lexeme: door,
			id: 'direct-object',
			surface: 'الْبَابَ',
			features: { case: 'nasb' as const, definiteness: 'definite' as const },
			reason: 'Manual object frame from existing sample'
		};
		expect(() => curatedFrameSurface(args)).toThrow('Noun case');
		const correct = curatedFrameSurface({ ...args, frameWordClass: 'noun' });
		expect(correct.evidence.kind).toBe('curated-example');
		expect(correct.evidence.note).toContain('Kelas kata ditetapkan manual');
		expect(correct.evidence.reviewStatus).toBe('draft');
	});

	it('rejects invalid case, mood and type combinations instead of synthesizing forms', () => {
		const book = msa('msa-kitab');
		const kataba = verb('fiil-kataba');
		expect(() =>
			curatedFrameSurface({
				lexeme: kataba,
				id: 'wrong-case',
				surface: 'كَتَبَ',
				features: { case: 'raf' },
				reason: 'Invalid assignment'
			})
		).toThrow('Noun case');
		expect(() =>
			curatedFrameSurface({
				lexeme: book,
				id: 'wrong-mood',
				surface: 'كِتَابٌ',
				features: { mood: 'jussive' },
				reason: 'Invalid assignment'
			})
		).toThrow('Verb mood');
		expect(() =>
			curatedFrameSurface({
				lexeme: kataba,
				id: 'wrong-aspect',
				surface: 'يَكْتُبْ',
				features: { mood: 'jussive', aspect: 'perfect' },
				reason: 'Invalid assignment'
			})
		).toThrow('Verb mood');

		const broken: LexemeRecord = {
			...book,
			forms: [{ ...book.forms[0]!, id: 'bad', text: 'بَيْتٌ', features: { mood: 'jussive' } }]
		};
		expect(validateLexemeRecord(broken)).toContain('Missing exact lemma form');
		expect(validateLexemeRecord(broken)).toContain('Mood without imperfect verb: bad');
	});

	it('does not misclassify unannotated Qur’an or prayer entries as regular MSA nouns', () => {
		const prayerWord = publishedVocabulary('shalat')[0]!;
		const lexical = lexemeFromVocabulary(prayerWord);
		expect(lexical.register).toBe('classical');
		expect(lexical.wordClass).toBe('expression');
	});
});
