/**
 * Shared Markdown to block-model converter for the local-copy importers.
 *
 * `marked` (devDependency, import scripts only, never shipped) produces tokens; this module
 * maps them to the small `Block[]` model in `src/lib/domain/local-content/types.ts`, so pages
 * render with Svelte components and never with `{@html}`. Raw HTML in a source is reduced to
 * plain text (only bold, italic and Arabic spans survive in `htmlToInlines`).
 *
 * Plan: docs/plans/local-content-import.md, step 1.
 */
import { Lexer, type Token, type Tokens } from 'marked';
import type { Block, Inline } from '../../src/lib/domain/local-content/types.js';

// Private-use sentinels carry macro boundaries through the Markdown lexer untouched.
const AR_OPEN = '\uE000';
const AR_CLOSE = '\uE001';
const AYAT_OPEN = '\uE002';
const AYAT_CLOSE = '\uE003';
const HADITS_OPEN = '\uE004';
const HADITS_CLOSE = '\uE005';
const SENTINELS = /[\uE000-\uE005]/g;

export type MarkdownOptions = {
	/** Expand Cahaya Tauhid macros and Pandoc dashes (see `expandCahayaMacros`). */
	cahaya?: boolean;
	/** Wrap Arabic runs found in plain text in `lang: 'ar'` inlines. Default: true. */
	tagArabic?: boolean;
	/**
	 * Called for fenced code blocks. Return blocks to replace the default rendering, or
	 * undefined to fall back to a plain code paragraph.
	 */
	fence?: (lang: string, body: string) => Block[] | undefined;
};

/* ------------------------------------------------------------------ macros */

/** Index of the brace that closes the one opened just before `from`, or -1. */
function matchingBrace(src: string, from: number): number {
	let depth = 1;
	for (let i = from; i < src.length; i++) {
		const ch = src[i];
		if (ch === '\\') {
			i++;
			continue;
		}
		if (ch === '{') depth++;
		else if (ch === '}' && --depth === 0) return i;
	}
	return -1;
}

const MACRO = /\\(ar|ayat|hadits)\{/g;

/**
 * Cahaya Tauhid pre-pass.
 *
 * - `\ar{…}` becomes an inline Arabic run.
 * - `\ayat{…}` / `\hadits{…}` alone on a line become Arabic blocks; elsewhere they become
 *   inline Arabic runs (one source line mixes a hadith quotation into a sentence).
 * - `\textemdash{}` is an em dash, `\quad` a space, `$\to$` an arrow.
 * Nested braces inside a macro are kept. An unterminated macro is left as literal text.
 */
export function expandCahayaMacros(source: string): string {
	const src = source.replace(SENTINELS, '');
	let out = '';
	let last = 0;
	MACRO.lastIndex = 0;
	let m: RegExpExecArray | null;
	while ((m = MACRO.exec(src))) {
		const bodyStart = m.index + m[0].length;
		const close = matchingBrace(src, bodyStart);
		if (close === -1) continue;
		const kind = m[1]!;
		const body = src.slice(bodyStart, close).replace(/\s+/g, ' ').trim();
		const lineStart = src.lastIndexOf('\n', m.index - 1) + 1;
		const lineEndIdx = src.indexOf('\n', close);
		const lineEnd = lineEndIdx === -1 ? src.length : lineEndIdx;
		const alone =
			kind !== 'ar' &&
			src.slice(lineStart, m.index).trim() === '' &&
			src.slice(close + 1, lineEnd).trim() === '';
		out += src.slice(last, alone ? lineStart : m.index);
		if (alone) {
			const [open, end] = kind === 'ayat' ? [AYAT_OPEN, AYAT_CLOSE] : [HADITS_OPEN, HADITS_CLOSE];
			out += `\n${open}${body}${end}\n`;
			last = lineEnd;
		} else {
			out += `${AR_OPEN}${body}${AR_CLOSE}`;
			last = close + 1;
		}
		MACRO.lastIndex = last;
	}
	out += src.slice(last);
	return out
		.replace(/\\textemdash\{\}/g, '—')
		.replace(/\$\\to\$/g, '→')
		.replace(/\\quad\b/g, ' ');
}

/* ------------------------------------------------------------------ inlines */

const ARABIC_RUN =
	/([\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+(?:[ \u00A0\u200C\u200D][\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+)*)/u;

const ENTITIES: Record<string, string> = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#39;': "'",
	'&apos;': "'",
	'&nbsp;': '\u00A0'
};

function decodeEntities(text: string): string {
	return text.replace(/&(?:amp|lt|gt|quot|apos|nbsp|#39);/g, (e) => ENTITIES[e] ?? e);
}

type Flags = { bold?: boolean; italic?: boolean; code?: boolean; href?: string; lang?: 'ar' };

function makeInline(text: string, flags: Flags): Inline {
	const inline: Inline = { text };
	if (flags.bold) inline.bold = true;
	if (flags.italic) inline.italic = true;
	if (flags.code) inline.code = true;
	if (flags.lang) inline.lang = flags.lang;
	if (flags.href) inline.href = flags.href;
	return inline;
}

function sameFormat(a: Inline, b: Inline): boolean {
	return (
		a.bold === b.bold &&
		a.italic === b.italic &&
		a.code === b.code &&
		a.lang === b.lang &&
		a.href === b.href
	);
}

/** Merge neighbouring runs with the same formatting, drop empties, trim the ends. */
export function normaliseInlines(runs: Inline[]): Inline[] {
	const merged: Inline[] = [];
	for (const run of runs) {
		if (run.text === '') continue;
		const prev = merged[merged.length - 1];
		if (prev && sameFormat(prev, run)) prev.text += run.text;
		else merged.push({ ...run });
	}
	const first = merged[0];
	if (first && !first.code) first.text = first.text.replace(/^[ \t\n]+/, '');
	const last = merged[merged.length - 1];
	if (last && !last.code) last.text = last.text.replace(/[ \t\n]+$/, '');
	return merged.filter((run) => run.text !== '');
}

type InlineContext = { pandoc: boolean; tagArabic: boolean };

/** Split plain text on sentinels (macro boundaries) and, optionally, bare Arabic runs. */
function pushText(out: Inline[], raw: string, flags: Flags, ctx: InlineContext): void {
	let text = decodeEntities(raw)
		.replace(/[\uE002-\uE005]/g, '')
		.replace(/[ \t]*\n[ \t]*/g, ' ');
	if (ctx.pandoc) text = text.replace(/---/g, '—').replace(/--/g, '–');
	let inArabic = flags.lang === 'ar';
	for (const piece of text.split(/([\uE000\uE001])/)) {
		if (piece === AR_OPEN) {
			inArabic = true;
			continue;
		}
		if (piece === AR_CLOSE) {
			inArabic = flags.lang === 'ar';
			continue;
		}
		if (piece === '') continue;
		if (inArabic) {
			out.push(makeInline(piece, { ...flags, lang: 'ar' }));
		} else if (ctx.tagArabic && !flags.code) {
			piece.split(ARABIC_RUN).forEach((part, i) => {
				if (part !== '') out.push(makeInline(part, i % 2 ? { ...flags, lang: 'ar' } : flags));
			});
		} else {
			out.push(makeInline(piece, flags));
		}
	}
}

function inlinesFromTokens(tokens: Token[], flags: Flags, ctx: InlineContext): Inline[] {
	const out: Inline[] = [];
	for (const token of tokens) {
		switch (token.type) {
			case 'text':
			case 'escape': {
				const t = token as Tokens.Text | Tokens.Escape;
				const nested = (t as Tokens.Text).tokens;
				if (nested && nested.length > 0) out.push(...inlinesFromTokens(nested, flags, ctx));
				else pushText(out, t.text, flags, ctx);
				break;
			}
			case 'strong':
				out.push(
					...inlinesFromTokens((token as Tokens.Strong).tokens, { ...flags, bold: true }, ctx)
				);
				break;
			case 'em':
				out.push(
					...inlinesFromTokens((token as Tokens.Em).tokens, { ...flags, italic: true }, ctx)
				);
				break;
			case 'del':
				out.push(...inlinesFromTokens((token as Tokens.Del).tokens, flags, ctx));
				break;
			case 'codespan':
				out.push(
					makeInline(decodeEntities((token as Tokens.Codespan).text), { ...flags, code: true })
				);
				break;
			case 'br':
				out.push(makeInline('\n', flags));
				break;
			case 'link': {
				const link = token as Tokens.Link;
				const href = /^https?:\/\//i.test(link.href) ? link.href : undefined;
				out.push(...inlinesFromTokens(link.tokens, href ? { ...flags, href } : flags, ctx));
				break;
			}
			case 'image':
				pushText(out, (token as Tokens.Image).text, flags, ctx);
				break;
			case 'html': {
				const html = (token as Tokens.HTML).text;
				if (/^<br\s*\/?>$/i.test(html.trim())) out.push(makeInline('\n', flags));
				// Other tags are dropped; their text content arrives as separate text tokens.
				break;
			}
			default: {
				const raw = (token as { text?: string }).text;
				if (typeof raw === 'string') pushText(out, raw, flags, ctx);
			}
		}
	}
	return out;
}

function ctxFor(options: MarkdownOptions): InlineContext {
	return { pandoc: options.cahaya === true, tagArabic: options.tagArabic !== false };
}

/** Inline Markdown (bold, italic, code, links) to runs. Used for values inside YAML blocks. */
export function inlinesFromMarkdown(text: string, options: MarkdownOptions = {}): Inline[] {
	const prepared = options.cahaya ? expandCahayaMacros(text) : text;
	return normaliseInlines(inlinesFromTokens(Lexer.lexInline(prepared), {}, ctxFor(options)));
}

/** Plain text as one run per Arabic or non-Arabic stretch. No Markdown is interpreted. */
export function plainInlines(text: string, options: MarkdownOptions = {}): Inline[] {
	const out: Inline[] = [];
	pushText(out, text, {}, { ...ctxFor(options), pandoc: false });
	return normaliseInlines(out);
}

/* ------------------------------------------------------------------- HTML */

/**
 * Reduce the small HTML fragments used by `arabic-grammar` to runs: `<b>`/`<strong>` bold,
 * `<i>`/`<em>` italic, `<code>` code, `<span class="ar…">` Arabic, `<br>` newline. Every other
 * tag, attribute and link target is dropped; the text inside stays.
 */
export function htmlToInlines(html: string, options: MarkdownOptions = {}): Inline[] {
	const ctx = { ...ctxFor(options), pandoc: false };
	const out: Inline[] = [];
	const stack: { tag: string; flags: Flags }[] = [];
	let flags: Flags = {};
	let last = 0;
	const tag = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g;
	let m: RegExpExecArray | null;
	while ((m = tag.exec(html))) {
		if (m.index > last) pushText(out, html.slice(last, m.index), flags, ctx);
		last = m.index + m[0].length;
		const closing = m[1] === '/';
		const name = m[2]!.toLowerCase();
		if (closing) {
			const at = stack.map((s) => s.tag).lastIndexOf(name);
			if (at !== -1) {
				flags = stack[at]!.flags;
				stack.length = at;
			}
			continue;
		}
		if (name === 'br') {
			out.push(makeInline('\n', flags));
			continue;
		}
		if (/\/\s*$/.test(m[3]!)) continue;
		const next: Flags = { ...flags };
		if (name === 'b' || name === 'strong') next.bold = true;
		else if (name === 'i' || name === 'em') next.italic = true;
		else if (name === 'code') next.code = true;
		else if (name === 'span' && /class\s*=\s*["'][^"']*\bar(?:-[a-z]+)?\b/i.test(m[3]!)) {
			next.lang = 'ar';
		}
		stack.push({ tag: name, flags });
		flags = next;
	}
	if (last < html.length) pushText(out, html.slice(last), flags, ctx);
	return normaliseInlines(out);
}

/** Visible text of an HTML fragment, tags removed. */
export function stripHtml(html: string): string {
	return decodeEntities(html.replace(/<[^>]*>/g, ''));
}

/* ----------------------------------------------------------------- blocks */

type BlockContext = {
	options: MarkdownOptions;
	inline: InlineContext;
	/** Subtract this from a source heading depth, so the shallowest heading becomes level 2. */
	headingBase: number;
};

function plainOf(inlines: Inline[]): string {
	return inlines.map((i) => i.text).join('');
}

function blockMacro(text: string): Block | undefined {
	const t = text.trim();
	const m = /^([\uE002\uE004])([^\uE003\uE005]*)([\uE003\uE005])$/.exec(t);
	if (!m) return undefined;
	const variant = m[1] === AYAT_OPEN ? 'ayat' : 'hadits';
	return { type: 'arabic', variant, text: m[2]!.trim() };
}

function listItemInlines(
	item: Tokens.ListItem,
	ctx: BlockContext,
	nestedPrefix: boolean
): Inline[][] {
	const own: Inline[] = [];
	const nested: Inline[][] = [];
	for (const token of item.tokens) {
		if (token.type === 'list') {
			// The block model has flat lists: nested items follow their parent, marked with a dash.
			for (const sub of (token as Tokens.List).items) {
				nested.push(...listItemInlines(sub, ctx, true));
			}
		} else if (token.type === 'text' || token.type === 'paragraph') {
			const inlines = inlinesFromTokens((token as Tokens.Text).tokens ?? [token], {}, ctx.inline);
			if (own.length > 0) own.push({ text: ' ' });
			own.push(...inlines);
		} else if (token.type === 'code') {
			if (own.length > 0) own.push({ text: ' ' });
			own.push({ text: (token as Tokens.Code).text, code: true });
		} else if (token.type !== 'space') {
			const raw = (token as { text?: string }).text;
			if (typeof raw === 'string') {
				if (own.length > 0) own.push({ text: ' ' });
				pushText(own, token.type === 'html' ? stripHtml(raw) : raw, {}, ctx.inline);
			}
		}
	}
	const first = normaliseInlines(own);
	if (nestedPrefix) first.unshift({ text: '– ' });
	return [first, ...nested];
}

function tokensToBlocks(tokens: Token[], ctx: BlockContext): Block[] {
	const blocks: Block[] = [];
	for (const token of tokens) {
		switch (token.type) {
			case 'heading': {
				const h = token as Tokens.Heading;
				const level = Math.min(4, Math.max(2, h.depth - ctx.headingBase + 2)) as 2 | 3 | 4;
				const inlines = normaliseInlines(inlinesFromTokens(h.tokens, {}, ctx.inline));
				if (inlines.length > 0) blocks.push({ type: 'heading', level, inlines });
				break;
			}
			case 'paragraph':
			case 'text': {
				const p = token as Tokens.Paragraph;
				const macro = blockMacro(p.text);
				if (macro) {
					blocks.push(macro);
					break;
				}
				const inlines = normaliseInlines(inlinesFromTokens(p.tokens ?? [token], {}, ctx.inline));
				if (inlines.length > 0) blocks.push({ type: 'paragraph', inlines });
				break;
			}
			case 'list': {
				const list = token as Tokens.List;
				const items = list.items
					.flatMap((item) => listItemInlines(item, ctx, false))
					.filter((inlines) => inlines.length > 0);
				if (items.length > 0) blocks.push({ type: 'list', ordered: list.ordered, items });
				break;
			}
			case 'table': {
				const table = token as Tokens.Table;
				const cell = (c: Tokens.TableCell) =>
					normaliseInlines(inlinesFromTokens(c.tokens, {}, ctx.inline));
				blocks.push({
					type: 'table',
					header: table.header.map(cell),
					rows: table.rows.map((row) => row.map(cell))
				});
				break;
			}
			case 'blockquote': {
				const inner = tokensToBlocks((token as Tokens.Blockquote).tokens, ctx);
				if (inner.length > 0) blocks.push({ type: 'quote', blocks: inner });
				break;
			}
			case 'code': {
				const code = token as Tokens.Code;
				const custom = ctx.options.fence?.((code.lang ?? '').trim(), code.text);
				if (custom) blocks.push(...custom);
				else if (code.text.trim() !== '') {
					blocks.push({ type: 'paragraph', inlines: [{ text: code.text.trimEnd(), code: true }] });
				}
				break;
			}
			case 'html': {
				const text = stripHtml((token as Tokens.HTML).text).trim();
				if (text !== '')
					blocks.push({ type: 'paragraph', inlines: plainInlines(text, ctx.options) });
				break;
			}
			default:
				// space, hr, link definitions: nothing to show.
				break;
		}
	}
	return blocks;
}

/** Convert a Markdown body (front matter already removed) to blocks. */
export function markdownToBlocks(markdown: string, options: MarkdownOptions = {}): Block[] {
	const prepared = options.cahaya ? expandCahayaMacros(markdown) : markdown;
	const tokens = Lexer.lex(prepared, { gfm: true });
	const depths = tokens
		.filter((t): t is Tokens.Heading => t.type === 'heading')
		.map((t) => t.depth);
	const ctx: BlockContext = {
		options,
		inline: ctxFor(options),
		headingBase: depths.length > 0 ? Math.min(...depths) : 2
	};
	return tokensToBlocks(tokens, ctx);
}

/** Plain-text length of blocks, used by importers to report counts and by tests. */
export function blocksText(blocks: Block[]): string {
	const parts: string[] = [];
	for (const b of blocks) {
		switch (b.type) {
			case 'heading':
			case 'paragraph':
				parts.push(plainOf(b.inlines));
				break;
			case 'list':
				for (const item of b.items) parts.push(plainOf(item));
				break;
			case 'table':
				for (const row of [b.header, ...b.rows]) for (const c of row) parts.push(plainOf(c));
				break;
			case 'quote':
			case 'callout':
				parts.push(blocksText(b.blocks));
				break;
			case 'arabic':
				parts.push(b.text);
				break;
		}
	}
	return parts.join('\n');
}
