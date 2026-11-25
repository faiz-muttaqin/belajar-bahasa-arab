import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import type { Block } from '../../src/lib/domain/local-content/types.js';
import { importSource as importGrammar, buildTables, convertTopic } from './arabic-grammar.js';
import { convertBook, importSource as importVocab } from './arabic-vocab.js';
import { convertLesson as convertCahaya, importSource as importCahaya } from './cahaya-tauhid.js';
import { summarise, validateResult, writeSource, readSourceFile } from './common.js';
import {
	convertLesson as convertTajweed,
	importSource as importTajweed,
	parseUnitTitles
} from './learn-tajweed.js';
import { blocksText } from './markdown.js';

// Every input is a synthetic string or fixture written for these tests, never source text.
const tmp = mkdtempSync(join(tmpdir(), 'import-local-test-'));
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

function fixture(files: Record<string, string>): string {
	const root = mkdtempSync(join(tmp, 'repo-'));
	for (const [path, content] of Object.entries(files)) {
		mkdirSync(join(root, path, '..'), { recursive: true });
		writeFileSync(join(root, path), content);
	}
	return root;
}

const NOW = new Date('2026-01-02T00:00:00Z');

describe('cahaya-tauhid importer', () => {
	it('converts a lesson with macros, quote and em dashes', () => {
		const lesson = convertCahaya(
			'---\ntitle: "Pelajaran 3 --- Judul"\nlang: id\n---\n\n# Bab\n\nKata \\ar{\u0628\u0627\u0628} di sini.\n\n\\ayat{\u0627\u0644\u0647}\n\n> terjemah',
			{
				trackId: 'cahaya-buku',
				slug: 'pelajaran-03',
				order: 3,
				origin: 'textbook/pelajaran-03/index.md'
			}
		);
		expect(lesson).toMatchObject({
			id: 'cahaya-buku-03',
			title: 'Pelajaran 3 \u2014 Judul',
			lang: 'id',
			source: 'cahaya-tauhid',
			trackId: 'cahaya-buku'
		});
		expect(lesson.blocks.map((b) => b.type)).toEqual(['heading', 'paragraph', 'arabic', 'quote']);
	});

	it('reads only textbook/workbook index.md files and builds two tracks', () => {
		const root = fixture({
			'textbook/pelajaran-02/index.md': '---\ntitle: B\n---\n\nisi',
			'textbook/pelajaran-01/index.md': '---\ntitle: A\n---\n\nisi',
			'textbook/level-1.pdf': 'not read',
			'workbook/pelajaran-01/index.md': '---\ntitle: W\n---\n\nisi',
			'_build/secret.md': 'must not be read',
			'logo.svg': '<svg/>'
		});
		const result = importCahaya(root, { now: NOW });
		expect(result.index.tracks.map((t) => [t.slug, t.lessons.map((l) => l.slug)])).toEqual([
			['cahaya-buku', ['pelajaran-01', 'pelajaran-02']],
			['cahaya-latihan', ['pelajaran-01']]
		]);
		expect(summarise(result).lessons).toBe(3);
		expect(JSON.stringify(result)).not.toContain('must not be read');
		expect(result.index.source.importedAt).toBe('2026-01-02');
		expect(() => validateResult(result)).not.toThrow();
	});
});

describe('learn-tajweed importer', () => {
	const units = parseUnitTitles(
		"{ id: 'u1', title: 'Unit Satu', description: 'x' }, { id: 'u2', title: 'It\\'s' }"
	);

	it('reads unit titles as text', () => {
		expect(units.get('u1')).toBe('Unit Satu');
		expect(units.get('u2')).toBe("It's");
	});

	const lessonText = [
		'---',
		'title: \u062F\u0631\u0633',
		'description: \u0648\u0635\u0641',
		'unit: u1',
		'order: 4',
		'minutes: 7',
		'tags: [\u0623, \u0628]',
		'videos:',
		'  - title: \u0641\u064A\u062F\u064A\u0648',
		'    youtubeId: abcdefghijk',
		'resources:',
		'  - title: \u0645\u0631\u062C\u0639',
		'    url: https://example.test/ref',
		'    note: \u0645\u0644\u0627\u062D\u0638\u0629',
		'  - title: \u0628\u062F\u0648\u0646 \u0631\u0627\u0628\u0637',
		'    url: javascript:alert(1)',
		'---',
		'',
		'## \u0639\u0646\u0648\u0627\u0646',
		'',
		'```rule',
		'**\u0642\u0627\u0639\u062F\u0629** \u0646\u0635',
		'```',
		'',
		'```examples',
		'rule: r1',
		'items:',
		'  - ref: 2:87',
		'    word: \u0643\u0644\u0645\u0629',
		'    highlight: \u0643\u0644',
		'    note: \u0634\u0631\u062D',
		'```',
		'',
		'```ayah',
		'ref: 1:1',
		'show: \u0646\u0635 \u0627\u0644\u0622\u064A\u0629',
		'marks:',
		'  - text: \u0645\u0627',
		'    rule: x',
		'note: \u062D\u0627\u0634\u064A\u0629',
		'```',
		'',
		'```mistake',
		'wrong: \u062E\u0637\u0623',
		'right: \u0635\u0648\u0627\u0628',
		'why: \u0633\u0628\u0628',
		'```',
		'',
		'```quiz',
		'questions:',
		'  - q: \u0633\u0624\u0627\u0644\u061F',
		'    word: \u0643\u0644\u0645\u0629',
		'    ref: 3:4',
		'    options:',
		'      - \u0623',
		'      - \u0628',
		'    answer: 1',
		'    why: \u0644\u0623\u0646',
		'```',
		'',
		'```compare',
		'columns:',
		'  - title: \u0623',
		'    points:',
		'      - \u0646\u0642\u0637\u0629 \u0661',
		'      - \u0646\u0642\u0637\u0629 \u0662',
		'  - title: \u0628',
		'    points:',
		'      - \u0646\u0642\u0637\u0629 \u0663',
		'```',
		'',
		'```letters',
		'title: \u062D\u0631\u0648\u0641',
		'items: [\u064A, \u0631, \u0645]',
		'mnemonic: \u064A\u064E\u0631\u0652\u0645\u064E',
		'note: \u0645\u0644\u0627\u062D\u0638\u0629',
		'```'
	].join('\n');

	it('maps every fenced block type to the block model', () => {
		const lesson = convertTajweed(lessonText, {
			slug: 'dars',
			origin: 'src/content/lessons/dars.md',
			units
		});
		expect(lesson).toMatchObject({
			id: 'tajweed-dars',
			lang: 'ar',
			order: 4,
			minutes: 7,
			group: 'Unit Satu',
			subtitle: '\u0648\u0635\u0641'
		});
		const callouts = lesson.blocks.filter(
			(b): b is Extract<Block, { type: 'callout' }> => b.type === 'callout'
		);
		expect(callouts.map((c) => c.kind)).toEqual([
			'rule',
			'example',
			'mistake',
			'quiz',
			'compare',
			'letters'
		]);
		const arabic = lesson.blocks.filter((b) => b.type === 'arabic');
		expect(arabic).toEqual([
			{
				type: 'arabic',
				variant: 'ayat',
				text: '\u0646\u0635 \u0627\u0644\u0622\u064A\u0629',
				reference: '1:1'
			}
		]);
		const text = blocksText(lesson.blocks);
		// The quiz keeps the word under test and reveals the answer with its reason.
		expect(text).toContain('\u0633\u0624\u0627\u0644\u061F');
		expect(text).toContain('\u0643\u0644\u0645\u0629');
		expect(text).toContain('\u0644\u0623\u0646');
		// The compare table keeps all three points in two columns.
		const compare = callouts.find((c) => c.kind === 'compare')!.blocks[0]!;
		expect(compare).toMatchObject({ type: 'table' });
		expect((compare as Extract<Block, { type: 'table' }>).rows).toHaveLength(2);
	});

	it('keeps only http(s) resource and video links', () => {
		const lesson = convertTajweed(lessonText, { slug: 'dars', origin: 'x', units });
		const hrefs = JSON.stringify(lesson.blocks).match(/"href":"[^"]+"/g);
		expect(hrefs).toEqual([
			'"href":"https://www.youtube.com/watch?v=abcdefghijk"',
			'"href":"https://example.test/ref"'
		]);
	});

	it('fails loudly on a fenced block outside the supported YAML subset', () => {
		const bad = '---\ntitle: t\n---\n\n```examples\nitems: {a: 1}\n```';
		expect(() => convertTajweed(bad, { slug: 's', origin: 'o', units })).toThrow();
	});

	it('imports a folder, sorts by order and groups by unit', () => {
		const root = fixture({
			'src/lib/units.ts': "{ id: 'u1', title: 'Unit Satu' }",
			'src/content/lessons/b.md': '---\ntitle: B\nunit: u1\norder: 2\n---\n\nنص',
			'src/content/lessons/a.md': '---\ntitle: A\nunit: u1\norder: 1\n---\n\nنص',
			'data/quran-uthmani.txt': 'must not be read'
		});
		const result = importTajweed(root, { now: NOW });
		expect(result.index.tracks[0]!.lessons.map((l) => [l.slug, l.group])).toEqual([
			['a', 'Unit Satu'],
			['b', 'Unit Satu']
		]);
		expect(JSON.stringify(result)).not.toContain('must not be read');
	});
});

describe('arabic-grammar importer', () => {
	const contentJs = `window.CONTENT = (function () {
	const S = (book, lesson, pages) => ({ book, lesson, pages });
	const STATES = { raf: { id: 'raf', ar: '\u0631\u0641\u0639', tr: 'raf', en: 'Nominative', mark: '\u064F', markName: 'damma', demo: '\u062F', demoEn: 'demo', desc: 'The default.' } };
	const PARTS = [{ id: 'p1', n: 'I', title: 'Foundations', ar: '\u0623' }];
	const TOPICS = [
		{ id: 't1', part: 'p1', title: 'First topic', ar: '\u0645\u0648\u0636\u0648\u0639', source: S(1, 2, '3\u20135'),
		  summary: 'A <b>bold</b> summary.',
		  body: [
		    { type: 'p', text: 'Word <span class="ar-inline">\u0643\u0644\u0645\u0629</span> here.' },
		    { type: 'table', dir: 'rtl', caption: 'Cap', head: ['one', 'two'], rows: [['1', '2']] },
		    { type: 'callout', kind: 'key', title: 'Key', text: 'Remember <i>this</i>.' },
		    { type: 'seegha' },
		    { type: 'widget-without-table' }
		  ],
		  rules: [{ en: 'Rule <b>one</b>.' }],
		  examples: [{ ar: '\u062C\u0645\u0644\u0629', en: 'A sentence.', prov: 'solved', tokens: [{ w: '\u062C', role: '\u0631', roleEn: 'Role', state: 'raf' }] }],
		  vocab: [['\u0643\u0644\u0645\u0629', 'word']],
		  related: ['t2'] },
		{ id: 't2', part: 'p1', title: 'Second', ar: '', source: { synthesis: true, from: 'Both' }, summary: 's', body: [] }
	];
	return { STATES, PARTS, TOPICS };
})();`;
	const referenceJs = `window.REFERENCE = (function () {
	const SEEGHAS = [{ n: 1, person: '\u063A', gender: '\u0645', num: '\u0648', madi: '\u0641', mudari: '\u064A', amr: '\u0644', en: 'he' }];
	const PARTICLE_SETS = { nasiba: { title: '\u062D', titleEn: 'Particles of nasb', effect: 'Fatha.', state: 'nasb', topic: 't1', source: 'Book 1', items: [{ ar: '\u0623', tr: 'an', en: 'that' }] } };
	const GLOSSARY = [['\u0627', 'ism', 'Noun', 'A noun.', 't1', ['isim']]].map(([ar, tr, en, def, topic, alts]) => ({ ar, tr, en, def, topic, alts }));
	return { SEEGHAS, PARTICLE_SETS, GLOSSARY };
})();`;

	const root = fixture({ 'app/data/content.js': contentJs, 'app/data/reference.js': referenceJs });
	const result = importGrammar(root, { now: NOW });

	it('builds lessons grouped by part, with provenance in the origin', () => {
		expect(result.lessons.map((l) => [l.slug, l.group, l.order])).toEqual([
			['t1', 'I. Foundations', 1],
			['t2', 'I. Foundations', 2]
		]);
		expect(result.lessons[0]!.origin).toContain('Arabic 1, lesson 2, pages 3\u20135');
		expect(result.lessons[1]!.origin).toContain('synthesis of Both');
	});

	it('converts HTML fragments to runs and never keeps markup', () => {
		const json = JSON.stringify(result.lessons);
		expect(json).not.toMatch(/<(b|i|span)\b/);
		const lesson = result.lessons[0]!;
		const callouts = lesson.blocks.filter((b) => b.type === 'callout');
		expect(callouts.map((c) => (c.type === 'callout' ? c.kind : ''))).toEqual([
			'tip',
			'rule',
			'example'
		]);
		const example = callouts[2]! as Extract<Block, { type: 'callout' }>;
		expect(example.title).toBe('Examples (solved)');
		expect(blocksText(lesson.blocks)).toContain('Reference table: The fourteen seeghas');
		expect(blocksText(lesson.blocks)).toContain('not copied here');
	});

	it('reverses the columns of an RTL table so the visual order is kept', () => {
		const table = result.lessons[0]!.blocks.find((b) => b.type === 'table');
		expect(table).toMatchObject({
			type: 'table',
			header: [[{ text: 'two' }], [{ text: 'one' }]],
			rows: [[[{ text: '2' }], [{ text: '1' }]]]
		});
	});

	it('builds reference tables with unique slugs and row ids', () => {
		const slugs = result.tables.map((t) => t.slug);
		expect(slugs).toEqual(['states', 'seegha', 'particles-nasiba', 'glossary']);
		expect(summarise(result)).toMatchObject({ lessons: 2, tables: 4 });
		expect(() => validateResult(result)).not.toThrow();
		const tables = buildTables({}, {});
		expect(tables).toEqual([]);
	});

	it('exposes convertTopic for a topic without optional parts', () => {
		const lesson = convertTopic(
			{ id: 'x', title: 'X', source: {}, summary: '' },
			{ order: 1, group: 'G', tableTitles: new Map() }
		);
		expect(lesson.blocks).toEqual([]);
	});
});

describe('arabic-vocab importer', () => {
	const raw = [
		{
			book: 1,
			lesson: 2,
			lesson_label: 'Lesson 2',
			items: [
				{
					id: 'a1',
					english: 'Book',
					arabic: '\u0643\u0650\u062A\u064E\u0627\u0628',
					transliteration: 'broken ocr',
					plural: '\u0643\u062A\u0628'
				},
				{ id: 'a2', english: 'Pen', arabic: '\u0642\u0644\u0645', transliteration: 'x' },
				{ id: 'a3', english: '', arabic: 'dropped' }
			]
		},
		{
			book: 3,
			lesson: 1,
			items: [{ id: 'c1', english: 'at that time', arabic: '\u062D\u064A\u0646' }]
		}
	];

	it('keeps Arabic and English as they are, drops transliteration and empty rows', () => {
		const sets = convertBook(raw, 'public/data/book1.json');
		expect(sets.map((s) => [s.id, s.slug, s.itemCount, s.meaningLang])).toEqual([
			['vocab-b1-l02', 'buku-1-pelajaran-02', 2, 'en'],
			['vocab-b3-l01', 'buku-3-pelajaran-01', 1, 'en']
		]);
		expect(sets[0]!.items[0]).toEqual({
			id: 'a1',
			arabic: '\u0643\u0650\u062A\u064E\u0627\u0628',
			meaning: 'Book',
			plural: '\u0643\u062A\u0628'
		});
		expect(JSON.stringify(sets)).not.toContain('broken ocr');
		expect(sets[0]!.caveats?.join(' ')).toContain('1 dari 2 kata berharakat');
		expect(sets[1]!.caveats?.join(' ')).toContain('buku 3');
	});

	it('rejects a file that is not a list of lessons', () => {
		expect(() => convertBook({ not: 'an array' }, 'x')).toThrow();
		expect(() => convertBook([{ book: 1 }], 'x')).toThrow();
	});

	it('reads only public/data/book*.json and never the files that hold secrets', () => {
		const root = fixture({
			'public/data/book1.json': JSON.stringify(raw),
			'public/index.html': '<script>apiKey: "SECRET-KEY"</script>',
			'FIRESTORE_RULES.md': 'admin@example.test'
		});
		const result = importVocab(root, { now: NOW });
		const json = JSON.stringify(result);
		expect(json).not.toContain('SECRET-KEY');
		expect(json).not.toContain('admin@example.test');
		expect(summarise(result)).toMatchObject({ vocabSets: 2, vocabItems: 3 });
	});
});

describe('writeSource and readSourceFile', () => {
	it('wipes and rewrites one source folder with the documented layout', () => {
		const root = fixture({
			'public/data/book1.json': JSON.stringify([
				{ book: 1, lesson: 1, items: [{ id: 'z', english: 'e', arabic: 'ا' }] }
			])
		});
		const out = join(tmp, 'out');
		const result = importVocab(root, { now: NOW });
		mkdirSync(join(out, 'arabic-vocab'), { recursive: true });
		writeFileSync(join(out, 'arabic-vocab', 'stale.txt'), 'old');
		writeSource(out, result);
		expect(readdirSync(join(out, 'arabic-vocab')).sort()).toEqual([
			'index.json',
			'lessons',
			'tables',
			'vocab'
		]);
		expect(readdirSync(join(out, 'arabic-vocab', 'vocab'))).toEqual(['vocab-b1-l01.json']);
		const index = JSON.parse(readFileSync(join(out, 'arabic-vocab', 'index.json'), 'utf8'));
		expect(index.schemaVersion).toBe(1);
		expect(index.vocabSets[0].itemCount).toBe(1);
	});

	it('refuses to read outside the source repo', () => {
		const root = fixture({ 'a.txt': 'ok' });
		expect(readSourceFile(root, 'a.txt')).toBe('ok');
		expect(() => readSourceFile(root, '../outside.txt')).toThrow();
	});

	it('rejects results that break the loader invariants', () => {
		const root = fixture({ 'public/data/book1.json': JSON.stringify(raw()) });
		const result = importVocab(root, { now: NOW });
		result.vocabSets.push({ ...result.vocabSets[0]! });
		expect(() => validateResult(result)).toThrow(/duplicate/);
	});
});

function raw() {
	return [{ book: 1, lesson: 1, items: [{ id: 'q', english: 'e', arabic: 'ا' }] }];
}
