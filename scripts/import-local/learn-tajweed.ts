/**
 * Importer: Learn Tajweed (Markdown with front matter and fenced custom blocks, Arabic).
 * Reads `src/content/lessons/*.md` and the unit titles in `src/lib/units.ts` as text. Nothing
 * from the Qur'an corpus, surah names, audio or fonts is read.
 */
import type {
	Block,
	CalloutKind,
	Inline,
	LocalLesson,
	LocalLessonMeta,
	LocalTrack
} from '../../src/lib/domain/local-content/types.js';
import { listDir, makeSource, readSourceFile, type ImportResult } from './common.js';
import { inlinesFromMarkdown, markdownToBlocks, plainInlines } from './markdown.js';
import { parseYaml, splitFrontMatter, type YamlValue } from './yaml-lite.js';

const TRACK_ID = 'tajweed';

type YMap = { [key: string]: YamlValue };
const isMap = (v: YamlValue | undefined): v is YMap =>
	v !== null && typeof v === 'object' && !Array.isArray(v);
const str = (v: YamlValue | undefined): string =>
	typeof v === 'string' ? v : v == null ? '' : String(v);
const arr = (v: YamlValue | undefined): YamlValue[] => (Array.isArray(v) ? v : []);

const para = (inlines: Inline[]): Block => ({ type: 'paragraph', inlines });
const md = (text: string) => inlinesFromMarkdown(text, { tagArabic: false });
const label = (text: string): Inline => ({ text, bold: true });

/** Arabic structural labels for the generated blocks (the source app draws these itself). */
const LABELS = { wrong: 'الخطأ: ', right: 'الصواب: ', why: 'السبب: ', answer: 'الجواب: ' };

const MARKDOWN_KINDS: Record<string, CalloutKind> = {
	rule: 'rule',
	note: 'note',
	tip: 'tip',
	warning: 'warning'
};

function fenceToBlocks(lang: string, body: string): Block[] | undefined {
	const kind = MARKDOWN_KINDS[lang];
	if (kind) {
		return [{ type: 'callout', kind, blocks: markdownToBlocks(body, { tagArabic: false }) }];
	}
	if (!['examples', 'ayah', 'mistake', 'quiz', 'compare', 'letters'].includes(lang))
		return undefined;
	const data = parseYaml(body);
	if (!isMap(data)) throw new Error(`fenced "${lang}" block is not a mapping`);
	switch (lang) {
		case 'examples': {
			const blocks: Block[] = [];
			for (const raw of arr(data.items)) {
				if (!isMap(raw)) continue;
				blocks.push({
					type: 'arabic',
					variant: 'plain',
					text: str(raw.word),
					...(raw.ref ? { reference: str(raw.ref) } : {})
				});
				const note: Inline[] = [];
				if (raw.highlight)
					note.push({ text: str(raw.highlight), lang: 'ar', bold: true }, { text: ' · ' });
				note.push(...md(str(raw.note)));
				if (note.length > 0) blocks.push(para(note));
			}
			return [{ type: 'callout', kind: 'example', blocks }];
		}
		case 'ayah': {
			const blocks: Block[] = [
				{
					type: 'arabic',
					variant: 'ayat',
					text: str(data.show),
					...(data.ref ? { reference: str(data.ref) } : {})
				}
			];
			const marked = [data.highlight, ...arr(data.marks).map((m) => (isMap(m) ? m.text : null))]
				.filter((v) => v != null && str(v) !== '')
				.map(str);
			const note: Inline[] = [];
			marked.forEach((m, i) =>
				note.push({ text: i > 0 ? '، ' : '' }, { text: m, lang: 'ar', bold: true })
			);
			if (marked.length > 0 && data.note) note.push({ text: ' · ' });
			if (data.note) note.push(...md(str(data.note)));
			if (note.length > 0) blocks.push(para(note));
			return blocks;
		}
		case 'mistake':
			return [
				{
					type: 'callout',
					kind: 'mistake',
					blocks: [
						para([label(LABELS.wrong), ...md(str(data.wrong))]),
						para([label(LABELS.right), ...md(str(data.right))]),
						...(data.why ? [para([label(LABELS.why), ...md(str(data.why))])] : [])
					]
				}
			];
		case 'quiz': {
			const blocks: Block[] = [];
			for (const raw of arr(data.questions)) {
				if (!isMap(raw)) continue;
				const options = arr(raw.options).map(str);
				const answer = typeof raw.answer === 'number' ? options[raw.answer] : undefined;
				blocks.push(para([{ text: str(raw.q), bold: true }]));
				if (raw.word) {
					blocks.push({
						type: 'arabic',
						variant: 'plain',
						text: str(raw.word),
						...(raw.ref ? { reference: str(raw.ref) } : {})
					});
				}
				if (options.length > 0) {
					blocks.push({ type: 'list', ordered: true, items: options.map((o) => md(o)) });
				}
				const reveal: Inline[] = [label(LABELS.answer), ...md(answer ?? '')];
				if (raw.why) reveal.push({ text: ' · ' }, ...md(str(raw.why)));
				blocks.push(para(reveal));
			}
			return [{ type: 'callout', kind: 'quiz', blocks }];
		}
		case 'compare': {
			const columns = arr(data.columns).filter(isMap);
			const depth = Math.max(0, ...columns.map((c) => arr(c.points).length));
			const rows: Inline[][][] = [];
			for (let i = 0; i < depth; i++) {
				rows.push(columns.map((c) => md(str(arr(c.points)[i]))));
			}
			return [
				{
					type: 'callout',
					kind: 'compare',
					blocks: [{ type: 'table', header: columns.map((c) => md(str(c.title))), rows }]
				}
			];
		}
		case 'letters': {
			const blocks: Block[] = [
				{ type: 'arabic', variant: 'plain', text: arr(data.items).map(str).join('  ') }
			];
			if (data.mnemonic)
				blocks.push({ type: 'arabic', variant: 'plain', text: str(data.mnemonic) });
			if (data.note) blocks.push(para(md(str(data.note))));
			return [{ type: 'callout', kind: 'letters', title: str(data.title), blocks }];
		}
	}
	return undefined;
}

/** Group titles from `src/lib/units.ts`: read `id` / `title` pairs as text, never executed. */
export function parseUnitTitles(unitsSource: string): Map<string, string> {
	const titles = new Map<string, string>();
	const re = /id:\s*'([^']+)',\s*title:\s*'((?:[^'\\]|\\.)*)'/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(unitsSource))) titles.set(m[1]!, m[2]!.replace(/\\'/g, "'"));
	return titles;
}

export function convertLesson(
	text: string,
	ctx: { slug: string; origin: string; units: Map<string, string> }
): LocalLesson {
	const { data, body } = splitFrontMatter(text);
	const blocks = markdownToBlocks(body, { tagArabic: false, fence: fenceToBlocks });

	const videos = arr(data.videos).filter(isMap);
	if (videos.length > 0) {
		blocks.push({ type: 'heading', level: 2, inlines: [{ text: 'مقاطع مرئية' }] });
		blocks.push({
			type: 'list',
			ordered: false,
			items: videos.map((v) => {
				const id = str(v.youtubeId);
				const title = str(v.title);
				return /^[\w-]{6,20}$/.test(id)
					? [{ text: title, href: `https://www.youtube.com/watch?v=${id}` }]
					: [{ text: title }];
			})
		});
	}
	const resources = arr(data.resources).filter(isMap);
	if (resources.length > 0) {
		blocks.push({ type: 'heading', level: 2, inlines: [{ text: 'مراجع' }] });
		blocks.push({
			type: 'list',
			ordered: false,
			items: resources.map((r) => {
				const url = str(r.url);
				const head: Inline = /^https?:\/\//i.test(url)
					? { text: str(r.title), href: url }
					: { text: str(r.title) };
				return [
					head,
					...(r.note ? [{ text: ': ' }, ...plainInlines(str(r.note), { tagArabic: false })] : [])
				];
			})
		});
	}

	const unit = str(data.unit);
	return {
		id: `${TRACK_ID}-${ctx.slug}`,
		slug: ctx.slug,
		title: str(data.title) || ctx.slug,
		order: typeof data.order === 'number' ? data.order : 0,
		...(typeof data.minutes === 'number' ? { minutes: data.minutes } : {}),
		...(unit ? { group: ctx.units.get(unit) ?? unit } : {}),
		source: 'learn-tajweed',
		trackId: TRACK_ID,
		lang: 'ar',
		...(data.description ? { subtitle: str(data.description) } : {}),
		blocks,
		origin: ctx.origin
	};
}

export function importSource(root: string, options: { now?: Date } = {}): ImportResult {
	let units = new Map<string, string>();
	try {
		units = parseUnitTitles(readSourceFile(root, 'src/lib/units.ts'));
	} catch {
		// Without unit titles the unit id is used as the group label.
	}
	const lessons: LocalLesson[] = [];
	for (const file of listDir(root, 'src/content/lessons')) {
		if (!file.endsWith('.md')) continue;
		const path = `src/content/lessons/${file}`;
		lessons.push(
			convertLesson(readSourceFile(root, path), { slug: file.slice(0, -3), origin: path, units })
		);
	}
	lessons.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
	const metas: LocalLessonMeta[] = lessons.map((l) => ({
		id: l.id,
		slug: l.slug,
		title: l.title,
		order: l.order,
		...(l.minutes !== undefined ? { minutes: l.minutes } : {}),
		...(l.group ? { group: l.group } : {})
	}));
	const track: LocalTrack = {
		id: TRACK_ID,
		slug: TRACK_ID,
		source: 'learn-tajweed',
		title: 'Tajwid riwayat Hafsh',
		description: 'Pelajaran tajwid berbahasa Arab, dikelompokkan per unit.',
		lang: 'ar',
		lessons: metas
	};
	return {
		index: {
			schemaVersion: 1,
			source: makeSource('learn-tajweed', root, options.now),
			tracks: [track],
			vocabSets: [],
			tables: []
		},
		lessons,
		vocabSets: [],
		tables: []
	};
}
