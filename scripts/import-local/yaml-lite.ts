/**
 * Minimal YAML reader for the subset used by the local-copy sources (tajweed front matter and
 * fenced blocks): block mappings, block sequences (including sequences of mappings), flow
 * sequences of scalars, and plain, single-quoted and double-quoted scalars.
 *
 * Deliberately not a full YAML parser. Anything outside the subset (block scalars, flow
 * mappings, anchors, tags, multi-document streams) throws, so an unexpected source shape fails
 * loudly during import instead of being half-read. The data is untrusted text: nothing here
 * evaluates anything.
 */

export type YamlValue =
	string | number | boolean | null | YamlValue[] | { [key: string]: YamlValue };

type Line = { indent: number; text: string; no: number };

export class YamlError extends Error {}

export function parseYaml(source: string): YamlValue {
	const lines: Line[] = [];
	source.split(/\r?\n/).forEach((raw, i) => {
		if (/^\s*(#.*)?$/.test(raw)) return;
		if (/\t/.test(raw.match(/^\s*/)![0])) throw new YamlError(`tab indentation on line ${i + 1}`);
		const indent = raw.length - raw.trimStart().length;
		lines.push({ indent, text: raw.trim(), no: i + 1 });
	});
	if (lines.length === 0) return null;
	const state = { lines, pos: 0 };
	const value = parseBlock(state, lines[0]!.indent);
	if (state.pos < lines.length) {
		throw new YamlError(`unexpected content on line ${lines[state.pos]!.no}`);
	}
	return value;
}

type State = { lines: Line[]; pos: number };

const KEY =
	/^("(?:[^"\\]|\\.)*"|'(?:[^']|'')*'|[^\s:#'"[\]{}&*!|>%@`,-][^:]*?|-[^\s:][^:]*?)\s*:(?:\s+(.*))?$/;

function parseBlock(state: State, indent: number): YamlValue {
	const line = state.lines[state.pos]!;
	if (line.text === '-' || line.text.startsWith('- ')) return parseSequence(state, indent);
	if (KEY.test(line.text)) return parseMapping(state, indent);
	state.pos++;
	return parseScalar(line.text, line.no);
}

function parseSequence(state: State, indent: number): YamlValue[] {
	const out: YamlValue[] = [];
	while (state.pos < state.lines.length) {
		const line = state.lines[state.pos]!;
		if (line.indent !== indent || !(line.text === '-' || line.text.startsWith('- '))) break;
		const rest = line.text === '-' ? '' : line.text.slice(2).trimStart();
		if (rest === '') {
			state.pos++;
			const next = state.lines[state.pos];
			out.push(next && next.indent > indent ? parseBlock(state, next.indent) : null);
			continue;
		}
		if (KEY.test(rest) && !/^["'[]/.test(rest)) {
			// Mapping item: re-read the text after "- " as a line indented to its own column.
			const column = line.indent + (line.text.length - rest.length);
			state.lines[state.pos] = { indent: column, text: rest, no: line.no };
			out.push(parseMapping(state, column));
			continue;
		}
		state.pos++;
		out.push(parseScalar(rest, line.no));
	}
	return out;
}

function parseMapping(state: State, indent: number): { [key: string]: YamlValue } {
	const out: { [key: string]: YamlValue } = {};
	while (state.pos < state.lines.length) {
		const line = state.lines[state.pos]!;
		if (line.indent !== indent) break;
		const m = KEY.exec(line.text);
		if (!m) throw new YamlError(`expected "key: value" on line ${line.no}`);
		const key = unquote(m[1]!, line.no);
		const rest = (m[2] ?? '').trim();
		if (key in out) throw new YamlError(`duplicate key "${key}" on line ${line.no}`);
		state.pos++;
		if (rest === '' || rest.startsWith('#')) {
			const next = state.lines[state.pos];
			if (next && next.indent > indent) {
				out[key] = parseBlock(state, next.indent);
			} else if (
				next &&
				next.indent === indent &&
				(next.text === '-' || next.text.startsWith('- '))
			) {
				out[key] = parseSequence(state, indent);
			} else {
				out[key] = null;
			}
		} else {
			out[key] = parseScalar(rest, line.no);
		}
	}
	return out;
}

function parseScalar(text: string, no: number): YamlValue {
	if (/^[|>][-+]?\d*\s*$/.test(text)) throw new YamlError(`block scalar on line ${no}`);
	if (text.startsWith('{')) throw new YamlError(`flow mapping on line ${no}`);
	if (text.startsWith('[')) return parseFlowSequence(text, no);
	if (text.startsWith('"') || text.startsWith("'")) {
		const end = findClosingQuote(text, 0);
		if (end !== text.length - 1 && !/^\s*#/.test(text.slice(end + 1))) {
			throw new YamlError(`text after closing quote on line ${no}`);
		}
		return unquote(text.slice(0, end + 1), no);
	}
	if (/^[&*!]/.test(text)) throw new YamlError(`anchor, alias or tag on line ${no}`);
	const plain = text.replace(/\s+#.*$/, '');
	if (plain === 'true') return true;
	if (plain === 'false') return false;
	if (plain === 'null' || plain === '~') return null;
	if (/^-?\d+(\.\d+)?$/.test(plain)) return Number(plain);
	return plain;
}

function findClosingQuote(text: string, start: number): number {
	const q = text[start]!;
	for (let i = start + 1; i < text.length; i++) {
		if (q === '"' && text[i] === '\\') {
			i++;
			continue;
		}
		if (text[i] === q) {
			if (q === "'" && text[i + 1] === "'") {
				i++;
				continue;
			}
			return i;
		}
	}
	throw new YamlError(`unterminated quote in: ${text.slice(0, 40)}`);
}

function unquote(text: string, no: number): string {
	if (text.startsWith("'")) return text.slice(1, -1).replace(/''/g, "'");
	if (text.startsWith('"')) {
		try {
			return JSON.parse(text) as string;
		} catch {
			throw new YamlError(`bad double-quoted string on line ${no}`);
		}
	}
	return text;
}

function parseFlowSequence(text: string, no: number): YamlValue[] {
	if (!text.endsWith(']')) throw new YamlError(`unterminated flow sequence on line ${no}`);
	const inner = text.slice(1, -1);
	const items: YamlValue[] = [];
	let i = 0;
	while (i < inner.length) {
		while (i < inner.length && /\s/.test(inner[i]!)) i++;
		if (i >= inner.length) break;
		if (inner[i] === '"' || inner[i] === "'") {
			const end = findClosingQuote(inner, i);
			items.push(unquote(inner.slice(i, end + 1), no));
			i = end + 1;
			while (i < inner.length && /\s/.test(inner[i]!)) i++;
			if (inner[i] === ',') i++;
			continue;
		}
		if (inner[i] === '[' || inner[i] === '{') {
			throw new YamlError(`nested flow collection on line ${no}`);
		}
		const comma = inner.indexOf(',', i);
		const end = comma === -1 ? inner.length : comma;
		items.push(parseScalar(inner.slice(i, end).trim(), no));
		i = end + 1;
	}
	return items;
}

/** Split `---` front matter from the body. Returns empty data when there is none. */
export function splitFrontMatter(text: string): { data: Record<string, YamlValue>; body: string } {
	const normalised = text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
	const m = /^---\n([\s\S]*?)\n---[ \t]*(?:\n|$)/.exec(normalised);
	if (!m) return { data: {}, body: normalised };
	const data = parseYaml(m[1]!);
	if (data === null || typeof data !== 'object' || Array.isArray(data)) {
		throw new YamlError('front matter is not a mapping');
	}
	return { data, body: normalised.slice(m[0].length) };
}
