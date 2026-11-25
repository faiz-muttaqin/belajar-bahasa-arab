/**
 * Importer: Unified Arabic Grammar (English). Reads `app/data/content.js` and
 * `app/data/reference.js` as text and evaluates them statically with the TypeScript compiler
 * API (`static-eval.ts`); the files are never executed. Nothing else in the clone is read.
 */
import type {
	Block,
	CalloutKind,
	Inline,
	LocalLesson,
	LocalLessonMeta,
	LocalTable,
	LocalTableColumn,
	LocalTrack
} from '../../src/lib/domain/local-content/types.js';
import { makeSource, readSourceFile, type ImportResult } from './common.js';
import { htmlToInlines, plainInlines, stripHtml } from './markdown.js';
import { evaluateWindowModule, type Data } from './static-eval.js';

const TRACK_ID = 'arabic-grammar';
const CONTENT_FILE = 'app/data/content.js';
const REFERENCE_FILE = 'app/data/reference.js';

type DMap = { [key: string]: Data };
const isMap = (v: Data): v is DMap => v !== null && typeof v === 'object' && !Array.isArray(v);
const arr = (v: Data): Data[] => (Array.isArray(v) ? v : []);
const maps = (v: Data): DMap[] => arr(v).filter(isMap);
const text = (v: Data): string => (typeof v === 'string' ? v : v == null ? '' : String(v));
const plain = (v: Data): string => stripHtml(text(v)).trim();
const html = (v: Data): Inline[] => htmlToInlines(text(v));
const para = (inlines: Inline[]): Block => ({ type: 'paragraph', inlines });

/* ----------------------------------------------------------------- tables */

type ColumnSpec = { key: string; label: string; lang: 'ar' | 'en'; hideable?: boolean };

function makeTable(
	id: string,
	title: string,
	order: number,
	caption: string,
	columns: ColumnSpec[],
	rows: { cells: Record<string, string>; explanation?: string }[],
	origin: string
): LocalTable {
	const cols: LocalTableColumn[] = columns.map(({ key, label, lang, hideable }) => ({
		key,
		label,
		lang,
		...(hideable ? { hideable: true } : {})
	}));
	return {
		id,
		slug: id,
		title,
		order,
		source: 'arabic-grammar',
		caption,
		columns: cols,
		rows: rows.map((row, i) => ({
			id: `r${i + 1}`,
			cells: row.cells,
			...(row.explanation ? { explanation: row.explanation } : {})
		})),
		origin
	};
}

const join = (v: Data): string => arr(v).map(plain).filter(Boolean).join(' · ');

export function buildTables(
	content: Record<string, Data>,
	reference: Record<string, Data>
): LocalTable[] {
	const tables: LocalTable[] = [];
	const ref = (name: string) => `${REFERENCE_FILE}#${name}`;
	let order = 0;
	const add = (t: LocalTable) => tables.push(t);

	// The four i'rab states (content.js STATES).
	const states = Object.values(isMap(content.STATES) ? content.STATES : {}).filter(isMap);
	if (states.length > 0) {
		add(
			makeTable(
				'states',
				'The four iʿrāb states',
				++order,
				'The four marks that organise the whole app: one word carrying each state.',
				[
					{ key: 'ar', label: 'Arabic', lang: 'ar' },
					{ key: 'tr', label: 'Transliteration', lang: 'en' },
					{ key: 'en', label: 'English', lang: 'en', hideable: true },
					{ key: 'mark', label: 'Mark', lang: 'ar', hideable: true },
					{ key: 'demo', label: 'Example', lang: 'ar', hideable: true },
					{ key: 'demoEn', label: 'Example meaning', lang: 'en', hideable: true },
					{ key: 'desc', label: 'Description', lang: 'en' }
				],
				states.map((s) => ({
					cells: {
						ar: plain(s.ar),
						tr: plain(s.tr),
						en: plain(s.en),
						mark: `${plain(s.markName)} ـ${plain(s.mark)}`,
						demo: plain(s.demo),
						demoEn: plain(s.demoEn),
						desc: plain(s.desc)
					}
				})),
				`${CONTENT_FILE}#STATES`
			)
		);
	}

	const seeghas = maps(reference.SEEGHAS);
	if (seeghas.length > 0) {
		add(
			makeTable(
				'seegha',
				'The fourteen seeghas',
				++order,
				'The 14 verb forms, cited by number throughout all three books.',
				[
					{ key: 'n', label: 'No.', lang: 'en' },
					{ key: 'person', label: 'Person', lang: 'ar' },
					{ key: 'gender', label: 'Gender', lang: 'ar' },
					{ key: 'num', label: 'Number', lang: 'ar' },
					{ key: 'madi', label: 'Past', lang: 'ar', hideable: true },
					{ key: 'mudari', label: 'Imperfect', lang: 'ar', hideable: true },
					{ key: 'amr', label: 'Imperative', lang: 'ar', hideable: true },
					{ key: 'en', label: 'English', lang: 'en', hideable: true }
				],
				seeghas.map((s) => ({
					cells: Object.fromEntries(
						['n', 'person', 'gender', 'num', 'madi', 'mudari', 'amr', 'en'].map((k) => [
							k,
							plain(s[k] ?? '')
						])
					)
				})),
				ref('SEEGHAS')
			)
		);
	}

	for (const [group, label] of [
		['PARTICLE_SETS', 'particles'],
		['SISTERS', 'sisters']
	] as const) {
		const sets = isMap(reference[group]) ? (reference[group] as DMap) : {};
		for (const [key, value] of Object.entries(sets)) {
			if (!isMap(value)) continue;
			const items = maps(value.items);
			const hasNote = items.some((i) => plain(i.note ?? '') !== '');
			const columns: ColumnSpec[] = [
				{ key: 'ar', label: 'Arabic', lang: 'ar' },
				{ key: 'tr', label: 'Transliteration', lang: 'en' },
				{ key: 'en', label: 'English', lang: 'en', hideable: true },
				...(hasNote ? [{ key: 'note', label: 'Note', lang: 'en' as const }] : [])
			];
			const captionParts = [plain(value.title), plain(value.effect), plain(value.source)].filter(
				Boolean
			);
			add(
				makeTable(
					`${label}-${key}`,
					plain(value.titleEn) || key,
					++order,
					captionParts.join(' · '),
					columns,
					items.map((i) => ({
						cells: {
							ar: plain(i.ar),
							tr: plain(i.tr),
							en: plain(i.en),
							...(hasNote ? { note: plain(i.note ?? '') } : {})
						}
					})),
					ref(`${group}.${key}`)
				)
			);
		}
	}

	const fem = maps(reference.FEM_SIGNS);
	if (fem.length > 0) {
		add(
			makeTable(
				'feminine-signs',
				'Feminine signs',
				++order,
				'The three written signs of the feminine.',
				[
					{ key: 'sign', label: 'Sign', lang: 'ar' },
					{ key: 'name', label: 'Name', lang: 'ar' },
					{ key: 'tr', label: 'Transliteration', lang: 'en' },
					{ key: 'ex', label: 'Examples', lang: 'ar', hideable: true }
				],
				fem.map((f) => ({
					cells: { sign: plain(f.sign), name: plain(f.name), tr: plain(f.tr), ex: join(f.ex) }
				})),
				ref('FEM_SIGNS')
			)
		);
	}

	const plurals = maps(reference.PLURAL_TYPES);
	if (plurals.length > 0) {
		add(
			makeTable(
				'plural-types',
				'Plural types',
				++order,
				'The three kinds of plural.',
				[
					{ key: 'ar', label: 'Arabic', lang: 'ar' },
					{ key: 'tr', label: 'Transliteration', lang: 'en' },
					{ key: 'en', label: 'English', lang: 'en', hideable: true },
					{ key: 'rule', label: 'Rule', lang: 'en' },
					{ key: 'ex', label: 'Example', lang: 'ar', hideable: true },
					{ key: 'signs', label: 'Signs of case', lang: 'en', hideable: true }
				],
				plurals.map((p) => ({
					cells: Object.fromEntries(
						['ar', 'tr', 'en', 'rule', 'ex', 'signs'].map((k) => [k, plain(p[k] ?? '')])
					)
				})),
				ref('PLURAL_TYPES')
			)
		);
	}

	const sifat = maps(reference.SIFAT_PATTERNS);
	if (sifat.length > 0) {
		add(
			makeTable(
				'adjective-patterns',
				'Adjective patterns',
				++order,
				'Common patterns of the adjective (ṣifa).',
				[
					{ key: 'ar', label: 'Pattern', lang: 'ar' },
					{ key: 'tr', label: 'Transliteration', lang: 'en' },
					{ key: 'ex', label: 'Examples', lang: 'ar', hideable: true }
				],
				sifat.map((s) => ({ cells: { ar: plain(s.ar), tr: plain(s.tr), ex: join(s.ex) } })),
				ref('SIFAT_PATTERNS')
			)
		);
	}

	const five = maps(reference.FIVE_NOUNS);
	if (five.length > 0) {
		add(
			makeTable(
				'five-nouns',
				'The five nouns',
				++order,
				'Nouns that take letters instead of ḍamma, fatḥa and kasra when annexed.',
				[
					{ key: 'base', label: 'Base', lang: 'ar' },
					{ key: 'raf', label: 'Raf‘', lang: 'ar', hideable: true },
					{ key: 'nasb', label: 'Naṣb', lang: 'ar', hideable: true },
					{ key: 'jarr', label: 'Jarr', lang: 'ar', hideable: true },
					{ key: 'en', label: 'English', lang: 'en' }
				],
				five.map((f) => ({
					cells: Object.fromEntries(
						['base', 'raf', 'nasb', 'jarr', 'en'].map((k) => [k, plain(f[k] ?? '')])
					)
				})),
				ref('FIVE_NOUNS')
			)
		);
	}

	const master = maps(reference.MASTER_SIGNS);
	if (master.length > 0) {
		const pair = (v: Data) => arr(v).map(plain).filter(Boolean).join(' · ');
		add(
			makeTable(
				'master-signs',
				'Master table of signs',
				++order,
				'The sign of each state for every kind of noun.',
				[
					{ key: 'cat', label: 'Category', lang: 'en' },
					{ key: 'ar', label: 'Arabic', lang: 'ar' },
					{ key: 'raf', label: 'Raf‘', lang: 'en', hideable: true },
					{ key: 'nasb', label: 'Naṣb', lang: 'en', hideable: true },
					{ key: 'jarr', label: 'Jarr', lang: 'en', hideable: true }
				],
				master.map((m) => ({
					cells: {
						cat: plain(m.cat),
						ar: plain(m.ar),
						raf: pair(m.raf),
						nasb: pair(m.nasb),
						jarr: pair(m.jarr)
					}
				})),
				ref('MASTER_SIGNS')
			)
		);
	}

	const agreement = maps(reference.AGREEMENT);
	if (agreement.length > 0) {
		add(
			makeTable(
				'agreement',
				'Agreement pairs',
				++order,
				'Pairs of words that must agree, with examples.',
				[
					{ key: 'a', label: 'First', lang: 'ar' },
					{ key: 'aEn', label: 'First (English)', lang: 'en' },
					{ key: 'b', label: 'Second', lang: 'ar' },
					{ key: 'bEn', label: 'Second (English)', lang: 'en' },
					{ key: 'ex', label: 'Examples', lang: 'ar', hideable: true }
				],
				agreement.map((a) => ({
					cells: Object.fromEntries(
						['a', 'aEn', 'b', 'bEn', 'ex'].map((k) => [k, plain(a[k] ?? '')])
					)
				})),
				ref('AGREEMENT')
			)
		);
	}

	const books = maps(reference.BOOKS);
	if (books.length > 0) {
		add(
			makeTable(
				'book-index',
				'Book and lesson index',
				++order,
				'Where each topic is taught in the three source textbooks.',
				[
					{ key: 'book', label: 'Book', lang: 'en' },
					{ key: 'l', label: 'Lesson', lang: 'en' },
					{ key: 'ar', label: 'Arabic', lang: 'ar' },
					{ key: 'en', label: 'English', lang: 'en' },
					{ key: 'pages', label: 'Pages', lang: 'en' }
				],
				books.flatMap((b) =>
					maps(b.lessons).map((l) => ({
						cells: {
							book: plain(b.title),
							l: plain(l.l),
							ar: plain(l.ar),
							en: plain(l.en),
							pages: plain(l.pages)
						}
					}))
				),
				ref('BOOKS')
			)
		);
	}

	const glossary = maps(reference.GLOSSARY);
	if (glossary.length > 0) {
		add(
			makeTable(
				'glossary',
				'Glossary',
				order + 1,
				'Terms with transliteration and definition.',
				[
					{ key: 'ar', label: 'Arabic', lang: 'ar' },
					{ key: 'tr', label: 'Transliteration', lang: 'en' },
					{ key: 'en', label: 'English', lang: 'en', hideable: true },
					{ key: 'def', label: 'Definition', lang: 'en', hideable: true }
				],
				glossary.map((g) => ({
					cells: { ar: plain(g.ar), tr: plain(g.tr), en: plain(g.en), def: plain(g.def) }
				})),
				ref('GLOSSARY')
			)
		);
	}
	return tables;
}

/* ---------------------------------------------------------------- lessons */

const CALLOUT_KINDS: Record<string, CalloutKind> = {
	key: 'tip',
	link: 'note',
	note: 'note',
	gap: 'warning'
};

/** Widget blocks of the source app that map to a reference table (by id). */
function widgetTable(block: DMap): string | undefined {
	const set = plain(block.set ?? '');
	switch (plain(block.type)) {
		case 'seegha':
			return 'seegha';
		case 'particles':
			return set ? `particles-${set}` : undefined;
		case 'sisters':
			return set ? `sisters-${set}` : undefined;
		case 'signs':
			return 'feminine-signs';
		case 'plurals':
			return 'plural-types';
		case 'patterns':
			return 'adjective-patterns';
		case 'five-nouns':
			return 'five-nouns';
		case 'master':
		case 'standard-signs':
			return 'master-signs';
		case 'agreement':
			return 'agreement';
		default:
			return undefined;
	}
}

function tableBlock(block: DMap): Block[] {
	const rtl = plain(block.dir) === 'rtl';
	// An RTL table lists its first column on the right. Reverse the columns so the left-to-right
	// table shows the same visual order as the original.
	const order = <T>(cells: T[]): T[] => (rtl ? [...cells].reverse() : cells);
	const out: Block[] = [];
	if (plain(block.caption)) out.push(para([{ text: plain(block.caption), italic: true }]));
	out.push({
		type: 'table',
		header: order(arr(block.head).map(html)),
		rows: arr(block.rows).map((row) => order(arr(row).map(html)))
	});
	return out;
}

function exampleBlocks(example: DMap): Block[] {
	const blocks: Block[] = [{ type: 'arabic', variant: 'plain', text: plain(example.ar) }];
	if (plain(example.en)) blocks.push(para(html(example.en)));
	const tokens = maps(example.tokens);
	const items = tokens.map((t): Inline[] => {
		const runs: Inline[] = [{ text: plain(t.w), lang: 'ar', bold: true }];
		const role = [plain(t.roleEn ?? ''), plain(t.role ?? '')].filter(Boolean);
		const extra = [plain(t.state ?? ''), plain(t.sign ?? ''), plain(t.why ?? '')].filter(Boolean);
		const detail = [...(role.length ? [role.join(' · ')] : []), ...extra].join(' · ');
		if (detail) runs.push(...plainInlines(` ${'—'} ${detail}`));
		return runs;
	});
	if (items.length > 0) blocks.push({ type: 'list', ordered: false, items });
	if (plain(example.note)) blocks.push(para(html(example.note)));
	return blocks;
}

export function convertTopic(
	topic: DMap,
	ctx: { order: number; group: string; tableTitles: Map<string, string> }
): LocalLesson {
	const id = plain(topic.id);
	const blocks: Block[] = [];
	if (plain(topic.summary)) blocks.push(para(html(topic.summary)));

	for (const block of maps(topic.body)) {
		switch (plain(block.type)) {
			case 'p':
				blocks.push(para(html(block.text)));
				break;
			case 'h':
				blocks.push({ type: 'heading', level: 2, inlines: html(block.text) });
				break;
			case 'ol':
			case 'ul':
				blocks.push({
					type: 'list',
					ordered: plain(block.type) === 'ol',
					items: arr(block.items).map(html)
				});
				break;
			case 'table':
				blocks.push(...tableBlock(block));
				break;
			case 'callout':
				blocks.push({
					type: 'callout',
					kind: CALLOUT_KINDS[plain(block.kind)] ?? 'note',
					...(plain(block.title) ? { title: plain(block.title) } : {}),
					blocks: [para(html(block.text))]
				});
				break;
			default: {
				const tableId = widgetTable(block);
				const title = tableId ? ctx.tableTitles.get(tableId) : undefined;
				blocks.push(
					para([
						{
							text: title
								? `Reference table: ${title} (under "Tabel rujukan" in Pustaka).`
								: 'An interactive table in the source app is not copied here.',
							italic: true
						}
					])
				);
			}
		}
	}

	const rules = maps(topic.rules);
	if (rules.length > 0) {
		blocks.push({
			type: 'callout',
			kind: 'rule',
			blocks: rules.map((r) => para(html(r.en)))
		});
	}
	if (isMap(topic.callout)) {
		const c = topic.callout;
		blocks.push({
			type: 'callout',
			kind: CALLOUT_KINDS[plain(c.kind)] ?? 'note',
			...(plain(c.title) ? { title: plain(c.title) } : {}),
			blocks: [para(html(c.text))]
		});
	}

	const examples = maps(topic.examples);
	if (examples.length > 0) {
		const provenance = [...new Set(examples.map((e) => plain(e.prov ?? '')).filter(Boolean))];
		blocks.push({
			type: 'callout',
			kind: 'example',
			title: provenance.length ? `Examples (${provenance.join(', ')})` : 'Examples',
			blocks: examples.flatMap(exampleBlocks)
		});
	}

	const vocab = arr(topic.vocab).filter((v): v is Data[] => Array.isArray(v));
	if (vocab.length > 0) {
		blocks.push({ type: 'heading', level: 2, inlines: [{ text: 'Vocabulary' }] });
		blocks.push({
			type: 'table',
			header: [[{ text: 'Arabic' }], [{ text: 'Meaning' }]],
			rows: vocab.map((pair) => [html(pair[0] ?? ''), html(pair[1] ?? '')])
		});
	}

	const source = isMap(topic.source) ? topic.source : {};
	const where = source.synthesis
		? `synthesis of ${plain(source.from ?? '')}`
		: `Arabic ${plain(source.book ?? '')}, lesson ${plain(source.lesson ?? '')}, pages ${plain(source.pages ?? '')}`;
	return {
		id: `${TRACK_ID}-${id}`,
		slug: id,
		title: plain(topic.title),
		order: ctx.order,
		group: ctx.group,
		source: 'arabic-grammar',
		trackId: TRACK_ID,
		lang: 'en',
		...(plain(topic.ar) ? { subtitle: plain(topic.ar) } : {}),
		blocks,
		origin: `${CONTENT_FILE}#${id} (${where})`
	};
}

export function importSource(root: string, options: { now?: Date } = {}): ImportResult {
	const content = evaluateWindowModule(readSourceFile(root, CONTENT_FILE), CONTENT_FILE);
	const reference = evaluateWindowModule(readSourceFile(root, REFERENCE_FILE), REFERENCE_FILE);

	const tables = buildTables(content, reference);
	const tableTitles = new Map(tables.map((t) => [t.id, t.title]));

	const parts = new Map(maps(content.PARTS).map((p) => [plain(p.id), p]));
	const lessons: LocalLesson[] = maps(content.TOPICS).map((topic, i) => {
		const part = parts.get(plain(topic.part));
		const group = part
			? [plain(part.n), plain(part.title)].filter(Boolean).join('. ')
			: 'Reference';
		return convertTopic(topic, { order: i + 1, group, tableTitles });
	});

	const metas: LocalLessonMeta[] = lessons.map((l) => ({
		id: l.id,
		slug: l.slug,
		title: l.title,
		order: l.order,
		...(l.group ? { group: l.group } : {})
	}));
	const track: LocalTrack = {
		id: TRACK_ID,
		slug: TRACK_ID,
		source: 'arabic-grammar',
		title: 'Unified Arabic Grammar',
		description: 'Topik nahwu dan sharaf berbahasa Inggris, disusun per bagian.',
		lang: 'en',
		lessons: metas
	};
	return {
		index: {
			schemaVersion: 1,
			source: makeSource('arabic-grammar', root, options.now),
			tracks: [track],
			vocabSets: [],
			tables: tables.map(({ id, slug, title, order }) => ({ id, slug, title, order }))
		},
		lessons,
		vocabSets: [],
		tables
	};
}
