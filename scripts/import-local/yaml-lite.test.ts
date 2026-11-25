import { describe, expect, it } from 'vitest';
import { parseYaml, splitFrontMatter, YamlError } from './yaml-lite.js';

describe('parseYaml', () => {
	it('reads mappings, nested mappings and scalar types', () => {
		expect(
			parseYaml("a: 1\nb: text here\nc: true\nd: null\ne:\n  f: \"q\\\"x\"\n  g: 'it''s'")
		).toEqual({
			a: 1,
			b: 'text here',
			c: true,
			d: null,
			e: { f: 'q"x', g: "it's" }
		});
	});

	it('reads flow sequences with plain and quoted items', () => {
		expect(parseYaml('tags: [a, \'b, c\', "d"]\nempty: []')).toEqual({
			tags: ['a', 'b, c', 'd'],
			empty: []
		});
	});

	it('reads sequences of mappings and nested sequences', () => {
		const src = [
			'questions:',
			'  - q: first',
			'    options:',
			'      - one',
			'      - two',
			'    answer: 0',
			'  - q: second',
			'    options: [x, y]',
			'    answer: 1'
		].join('\n');
		expect(parseYaml(src)).toEqual({
			questions: [
				{ q: 'first', options: ['one', 'two'], answer: 0 },
				{ q: 'second', options: ['x', 'y'], answer: 1 }
			]
		});
	});

	it('accepts a sequence at the same indent as its key', () => {
		expect(parseYaml('list:\n- a\n- b\nafter: 1')).toEqual({ list: ['a', 'b'], after: 1 });
	});

	it('keeps values with colons inside quotes and "2:87"-style references as strings', () => {
		expect(parseYaml("ref: 2:87\nnote: 'a: b'")).toEqual({ ref: '2:87', note: 'a: b' });
	});

	it('ignores comments and blank lines', () => {
		expect(parseYaml('# top\n\na: 1 # trailing\n')).toEqual({ a: 1 });
	});

	it('rejects shapes outside the subset instead of guessing', () => {
		expect(() => parseYaml('a: |\n  text')).toThrow(YamlError);
		expect(() => parseYaml('a: {b: 1}')).toThrow(YamlError);
		expect(() => parseYaml('a: 1\na: 2')).toThrow(YamlError);
		expect(() => parseYaml('a: &x 1')).toThrow(YamlError);
	});
});

describe('splitFrontMatter', () => {
	it('splits data from body', () => {
		const { data, body } = splitFrontMatter('---\ntitle: T\norder: 2\n---\n\nBody **text**\n');
		expect(data).toEqual({ title: 'T', order: 2 });
		expect(body.trim()).toBe('Body **text**');
	});

	it('returns the whole text when there is no front matter', () => {
		expect(splitFrontMatter('just text')).toEqual({ data: {}, body: 'just text' });
	});
});
