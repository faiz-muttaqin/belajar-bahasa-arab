import { describe, expect, it } from 'vitest';
import { evaluateWindowModule, StaticEvalError } from './static-eval.js';

// Synthetic module text written for these tests, in the same shape as the real data files.
const wrap = (body: string) => `window.DATA = (function () {\n${body}\n})();`;

describe('evaluateWindowModule', () => {
	it('evaluates literals, shorthand returns, spreads and local arrow helpers', () => {
		const data = evaluateWindowModule(
			wrap(`
			const S = (book, lesson) => ({ book, lesson });
			const BASE = [1, 2];
			const OBJ = { a: 'x', n: -3, t: \`tpl\`, flag: true, none: null, src: S(2, 'L') };
			const LIST = [...BASE, 3];
			const PICK = OBJ.src.book;
			const JOINED = 'a' + 'b';
			return { OBJ, LIST, PICK, JOINED };
		`),
			'test.js'
		);
		expect(data).toEqual({
			OBJ: { a: 'x', n: -3, t: 'tpl', flag: true, none: null, src: { book: 2, lesson: 'L' } },
			LIST: [1, 2, 3],
			PICK: 2,
			JOINED: 'ab'
		});
	});

	it('maps an array with a destructured parameter, as the glossary does', () => {
		const data = evaluateWindowModule(
			wrap(`
			const ROWS = [['a', 'one'], ['b', 'two']].map(([k, v]) => ({ k, v }));
			return { ROWS };
		`),
			'test.js'
		);
		expect(data.ROWS).toEqual([
			{ k: 'a', v: 'one' },
			{ k: 'b', v: 'two' }
		]);
	});

	it('never runs source code: calls, new, imports and loops are refused', () => {
		const globalWithSideEffect = globalThis as unknown as { pwned?: boolean };
		const attempts = [
			'return { x: (globalThis.pwned = true) };',
			'return { x: eval("1") };',
			'return { x: new Function("return 1")() };',
			'return { x: require("fs") };',
			'return { x: process.exit(0) };',
			'globalThis.pwned = true; return {};',
			'for (;;) {} return {};',
			'return { x: import("fs") };',
			'return { x: `${globalThis.pwned}` };'
		];
		for (const body of attempts) {
			expect(() => evaluateWindowModule(wrap(body), 'evil.js'), body).toThrow(StaticEvalError);
		}
		expect(globalWithSideEffect.pwned).toBeUndefined();
	});

	it('reports the line of an unsupported node', () => {
		expect(() => evaluateWindowModule(wrap('const A = 1;\nreturn { x: foo() };'), 'x.js')).toThrow(
			/line 3/
		);
	});

	it('rejects a file without the window wrapper', () => {
		expect(() => evaluateWindowModule('const a = 1;', 'x.js')).toThrow(StaticEvalError);
	});
});
