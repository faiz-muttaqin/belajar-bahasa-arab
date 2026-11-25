import { describe, expect, it } from 'vitest';
import {
	blocksText,
	expandCahayaMacros,
	htmlToInlines,
	inlinesFromMarkdown,
	markdownToBlocks
} from './markdown.js';

// Every input below is a synthetic string written for these tests, not copied source text.

describe('expandCahayaMacros', () => {
	it('turns an inline macro into a bracketed run and keeps nested braces', () => {
		const out = expandCahayaMacros('a \\ar{x {y} z} b');
		expect(out).toContain('\uE000x {y} z\uE001');
		expect(out).not.toContain('\\ar');
	});

	it('turns a macro alone on its line into a block, but a mixed line into an inline run', () => {
		const block = expandCahayaMacros('before\n\n\\ayat{abc}\n\nafter');
		expect(block).toContain('\uE002abc\uE003');
		const mixed = expandCahayaMacros('text \\hadits{abc} more');
		expect(mixed).toContain('\uE000abc\uE001');
		expect(mixed).not.toContain('\uE004');
	});

	it('replaces the small LaTeX leftovers', () => {
		expect(expandCahayaMacros('a \\textemdash{} b $\\to$ c\\quad d')).toBe(
			'a \u2014 b \u2192 c  d'
		);
	});

	it('leaves an unterminated macro as literal text', () => {
		expect(expandCahayaMacros('a \\ar{never closed')).toBe('a \\ar{never closed');
	});

	it('strips stray sentinel characters from the source first', () => {
		expect(expandCahayaMacros('a\uE000b')).toBe('ab');
	});
});

describe('markdownToBlocks', () => {
	it('maps headings so the shallowest becomes level 2', () => {
		const blocks = markdownToBlocks('# One\n\n## Two\n\n#### Four');
		expect(blocks.map((b) => (b.type === 'heading' ? b.level : 0))).toEqual([2, 3, 4]);
		const only = markdownToBlocks('### A\n\n#### B');
		expect(only.map((b) => (b.type === 'heading' ? b.level : 0))).toEqual([2, 3]);
	});

	it('keeps bold, italic and code runs and merges neighbours', () => {
		const [p] = markdownToBlocks('plain **bold *both*** and `code`');
		expect(p).toEqual({
			type: 'paragraph',
			inlines: [
				{ text: 'plain ' },
				{ text: 'bold ', bold: true },
				{ text: 'both', bold: true, italic: true },
				{ text: ' and ' },
				{ text: 'code', code: true }
			]
		});
	});

	it('keeps http(s) links and drops other targets', () => {
		const [p] = markdownToBlocks('[ok](https://example.test/x) [bad](javascript:alert(1))');
		expect(p).toEqual({
			type: 'paragraph',
			inlines: [{ text: 'ok', href: 'https://example.test/x' }, { text: ' bad' }]
		});
	});

	it('turns raw HTML into plain text, never into markup', () => {
		const blocks = markdownToBlocks(
			'<div><script>x()</script>shown</div>\n\ninline <b>tag</b> &amp; text'
		);
		expect(JSON.stringify(blocks)).not.toContain('<');
		expect(blocksText(blocks)).toContain('shown');
		expect(blocksText(blocks)).toContain('inline tag & text');
	});

	it('tags Arabic runs in plain text with lang ar', () => {
		const [p] = markdownToBlocks('kata \u0643\u062A\u0627\u0628 \u0648\u0642\u0644\u0645 selesai');
		expect(p).toEqual({
			type: 'paragraph',
			inlines: [
				{ text: 'kata ' },
				{ text: '\u0643\u062A\u0627\u0628 \u0648\u0642\u0644\u0645', lang: 'ar' },
				{ text: ' selesai' }
			]
		});
	});

	it('flattens nested lists into dashed items', () => {
		const [list] = markdownToBlocks('- a\n  - b\n- c');
		expect(list).toMatchObject({ type: 'list', ordered: false });
		const texts = (list as Extract<typeof list, { type: 'list' }>).items.map((i) =>
			i.map((r) => r.text).join('')
		);
		expect(texts).toEqual(['a', '\u2013 b', 'c']);
	});

	it('converts tables with inline formatting in cells', () => {
		const [t] = markdownToBlocks('| h1 | h2 |\n|---|---|\n| **x** | y |');
		expect(t).toEqual({
			type: 'table',
			header: [[{ text: 'h1' }], [{ text: 'h2' }]],
			rows: [[[{ text: 'x', bold: true }], [{ text: 'y' }]]]
		});
	});

	it('wraps blockquote content', () => {
		const [q] = markdownToBlocks('> quoted\n>\n> --- someone');
		expect(q).toMatchObject({ type: 'quote' });
	});

	it('renders unknown fences as a code paragraph and honours a fence hook', () => {
		const plain = markdownToBlocks('```\nline\n```');
		expect(plain[0]).toEqual({ type: 'paragraph', inlines: [{ text: 'line', code: true }] });
		const hooked = markdownToBlocks('```tip\nbody\n```', {
			fence: (lang, body) => [
				{
					type: 'callout',
					kind: 'tip',
					blocks: [{ type: 'paragraph', inlines: [{ text: `${lang}:${body.trim()}` }] }]
				}
			]
		});
		expect(hooked[0]).toMatchObject({ type: 'callout', kind: 'tip' });
	});

	it('does not leak sentinels or macro syntax into Cahaya output', () => {
		const blocks = markdownToBlocks(
			'# Judul \\ar{\u0627\u0628}\n\nKata \\ar{\u062C\u062F} tengah --- dan\n\n\\ayat{\u0627\u0644\u0644\u0647}\n\n> terjemah\n\n\\hadits{\u062D\u062F\u064A\u062B}\n',
			{ cahaya: true }
		);
		const json = JSON.stringify(blocks);
		expect(json).not.toMatch(/[\uE000-\uE005]/);
		expect(json).not.toContain('\\\\ar');
		expect(blocks[0]).toMatchObject({ type: 'heading', level: 2 });
		expect(blocks).toContainEqual({
			type: 'arabic',
			variant: 'ayat',
			text: '\u0627\u0644\u0644\u0647'
		});
		expect(blocks).toContainEqual({
			type: 'arabic',
			variant: 'hadits',
			text: '\u062D\u062F\u064A\u062B'
		});
		const para = blocks[1] as Extract<(typeof blocks)[number], { type: 'paragraph' }>;
		expect(para.inlines.find((r) => r.lang === 'ar')?.text).toBe('\u062C\u062F');
		expect(para.inlines.map((r) => r.text).join('')).toContain('\u2014');
	});

	it('keeps harakat inside Arabic runs', () => {
		const text = '\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650';
		const [b] = markdownToBlocks(`\\ayat{${text}}`, { cahaya: true });
		expect(b).toEqual({ type: 'arabic', variant: 'ayat', text });
	});
});

describe('inlinesFromMarkdown', () => {
	it('reads inline Markdown only', () => {
		expect(inlinesFromMarkdown('a **b** c')).toEqual([
			{ text: 'a ' },
			{ text: 'b', bold: true },
			{ text: ' c' }
		]);
	});
});

describe('htmlToInlines', () => {
	it('keeps bold, italic and Arabic spans and drops everything else', () => {
		const out = htmlToInlines(
			'Say <b>bold</b> and <em>it</em> then <span class="ar-inline">\u0643\u062A\u0627\u0628</span> <a href="javascript:x">link</a><br>next <u>u</u>'
		);
		expect(out).toEqual([
			{ text: 'Say ' },
			{ text: 'bold', bold: true },
			{ text: ' and ' },
			{ text: 'it', italic: true },
			{ text: ' then ' },
			{ text: '\u0643\u062A\u0627\u0628', lang: 'ar' },
			{ text: ' link\nnext u' }
		]);
	});

	it('survives unbalanced tags', () => {
		const out = htmlToInlines('<b>open <i>both</b> after</i> end');
		expect(out.map((r) => r.text).join('')).toBe('open both after end');
	});
});
