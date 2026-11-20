import type {
	DictionaryEntry,
	DictionaryForm,
	DictionarySense,
	Evidence
} from '#lib/domain/dictionary/senses.js';
import { validateDictionary } from '#lib/domain/dictionary/senses.js';

// Small independently checked pilot. Indonesian wording is original, not a copied definition.
function evidence(page: string, locator: string): Evidence {
	return {
		sourceId: 'wiktionary',
		url: 'https://en.wiktionary.org/wiki/' + encodeURIComponent(page) + '#Arabic',
		locator: 'Arabic > ' + locator,
		checkedOn: '2026-11-20'
	};
}
function sense(page: string, id: string, glossId: string, locator: string): DictionarySense {
	return { id, glossId, register: 'unspecified', evidence: evidence(page, locator) };
}
function form(page: string, ar: string, kind: DictionaryForm['kind'], locator: string): DictionaryForm {
	return { ar, kind, origin: 'attested', evidence: evidence(page, locator) };
}
function root(page: string, ar: string) {
	return { ar, evidence: evidence(page, 'Root') };
}

export const dictionaryPilot: readonly DictionaryEntry[] = [
	{
		id: 'kataba',
		lemma: 'كَتَبَ',
		pos: 'verb',
		evidence: evidence('كتب', 'Etymology 1 > Verb, Form I'),
		root: root('كتب', 'كتب'),
		bab: { number: 1, evidence: evidence('كتب', 'Etymology 1 > Verb, non-past يَكْتُبُ') },
		senses: [sense('كتب', 'write', 'menulis', 'Etymology 1 > Verb, write')],
		forms: [
			form('كتب', 'يَكْتُبُ', 'mudhari', 'Etymology 1 > Verb, non-past'),
			form('كتب', 'كِتَابَة', 'masdar', 'Etymology 1 > Verb, verbal noun')
		],
		reviewStatus: 'draft'
	},
	{
		id: 'kitab',
		lemma: 'كِتَاب',
		pos: 'noun',
		evidence: evidence('كتاب', 'Etymology 1 > Noun'),
		root: root('كتاب', 'كتب'),
		senses: [sense('كتاب', 'book', 'buku', 'Etymology 1 > Noun, book')],
		forms: [form('كتاب', 'كُتُب', 'plural', 'Etymology 1 > Noun, plural')],
		reviewStatus: 'draft'
	},
	{
		id: 'maktab',
		lemma: 'مَكْتَب',
		pos: 'noun',
		evidence: evidence('مكتب', 'Noun'),
		root: root('مكتب', 'كتب'),
		senses: [
			sense('مكتب', 'desk', 'meja kerja', 'Noun, desk'),
			sense('مكتب', 'office', 'kantor', 'Noun, office')
		],
		forms: [],
		reviewStatus: 'draft'
	},
	{
		id: 'maktabah',
		lemma: 'مَكْتَبَة',
		pos: 'noun',
		evidence: evidence('مكتبة', 'Noun'),
		root: { ar: 'كتب', evidence: evidence('مكتبة', 'Etymology, noun of place') },
		gender: { value: 'feminine', evidence: evidence('مكتبة', 'Noun, headword gender') },
		senses: [
			sense('مكتبة', 'library', 'perpustakaan', 'Noun, library'),
			sense('مكتبة', 'bookshop', 'toko buku', 'Noun, bookstore'),
			sense('مكتبة', 'stationery', 'toko alat tulis', 'Noun, stationery store')
		],
		forms: [
			form('مكتبة', 'مَكْتَبَات', 'plural', 'Noun, plural'),
			form('مكتبة', 'مَكَاتِب', 'plural', 'Noun, alternative plural')
		],
		reviewStatus: 'draft'
	},
	{
		id: 'kitabah',
		lemma: 'كِتَابَة',
		pos: 'noun',
		evidence: evidence('كتابة', 'Noun'),
		root: root('كتابة', 'كتب'),
		gender: { value: 'feminine', evidence: evidence('كتابة', 'Noun, headword gender') },
		senses: [
			sense('كتابة', 'writing', 'kegiatan menulis', 'Noun, writing'),
			sense('كتابة', 'handwriting', 'tulisan tangan', 'Noun, handwriting'),
			sense('كتابة', 'script', 'sistem tulisan', 'Noun, script')
		],
		forms: [form('كتابة', 'كِتَابَات', 'plural', 'Noun, plural')],
		relations: [
			{ targetId: 'kataba', kind: 'masdar-of', evidence: evidence('كتابة', 'Etymology') }
		],
		reviewStatus: 'draft'
	}
];

const errors = validateDictionary(dictionaryPilot);
if (errors.length) throw new Error(errors.join('\n'));
