// Small, dependency-free colour helpers for the theme editor.
// Supports the CSS colour syntaxes the editor accepts: hex (#rgb, #rgba, #rrggbb,
// #rrggbbaa), rgb()/rgba(), hsl()/hsla() and oklch(). Everything else is rejected,
// so a value we cannot measure for contrast never reaches the stylesheet.

/** sRGB colour with channels in 0..1 (may be out of gamut before clamping) and alpha 0..1. */
export type Rgba = { r: number; g: number; b: number; a: number };

const NUMBER = String.raw`[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?`;
const FUNCTION_RE = new RegExp(String.raw`^(rgba?|hsla?|oklch)\(\s*(.*)\s*\)$`, 'i');
const NUMBER_RE = new RegExp(String.raw`^(${NUMBER})(%|deg|turn|rad|grad)?$`, 'i');

type Part = { value: number; unit: string } | 'none';

function parseParts(body: string): { parts: Part[]; alpha?: Part } | null {
	let main = body.trim();
	let alphaText: string | undefined;

	if (main.includes('/')) {
		const [before, after, ...extra] = main.split('/');
		if (before === undefined || after === undefined || extra.length > 0) return null;
		main = before.trim();
		alphaText = after.trim();
	}

	// Legacy comma syntax: rgb(1, 2, 3) or rgba(1, 2, 3, 0.5).
	let tokens: string[];
	if (main.includes(',')) {
		if (alphaText !== undefined) return null;
		tokens = main.split(',').map((t) => t.trim());
		if (tokens.length === 4) alphaText = tokens.pop();
	} else {
		tokens = main.split(/\s+/).filter(Boolean);
	}
	if (tokens.length !== 3) return null;

	const toPart = (text: string): Part | null => {
		if (text.toLowerCase() === 'none') return 'none';
		const match = NUMBER_RE.exec(text);
		if (!match) return null;
		return { value: Number(match[1]), unit: (match[2] ?? '').toLowerCase() };
	};

	const parts = tokens.map(toPart);
	if (parts.some((p) => p === null)) return null;
	let alpha: Part | undefined;
	if (alphaText !== undefined) {
		const parsed = toPart(alphaText);
		if (parsed === null) return null;
		alpha = parsed;
	}
	return { parts: parts as Part[], alpha };
}

const num = (part: Part): number => (part === 'none' ? 0 : part.value);

function alphaOf(part: Part | undefined): number | null {
	if (part === undefined) return 1;
	if (part === 'none') return 0;
	if (part.unit === '%') return clamp01(part.value / 100);
	if (part.unit !== '') return null;
	return clamp01(part.value);
}

function hueOf(part: Part): number | null {
	if (part === 'none') return 0;
	switch (part.unit) {
		case '':
		case 'deg':
			return part.value;
		case 'turn':
			return part.value * 360;
		case 'rad':
			return (part.value * 180) / Math.PI;
		case 'grad':
			return part.value * 0.9;
		default:
			return null;
	}
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function parseHex(input: string): Rgba | null {
	const hex = input.slice(1);
	if (!/^[\da-f]+$/i.test(hex)) return null;
	let full: string;
	if (hex.length === 3 || hex.length === 4) {
		full = [...hex].map((c) => c + c).join('');
	} else if (hex.length === 6 || hex.length === 8) {
		full = hex;
	} else {
		return null;
	}
	const channel = (i: number) => parseInt(full.slice(i, i + 2), 16) / 255;
	return { r: channel(0), g: channel(2), b: channel(4), a: full.length === 8 ? channel(6) : 1 };
}

function parseRgb(parts: Part[], alpha: Part | undefined): Rgba | null {
	const units = parts.map((p) => (p === 'none' ? '' : p.unit));
	// Channels must all be numbers or all be percentages.
	const allPercent = units.every((u) => u === '%');
	const allNumber = units.every((u) => u === '');
	if (!allPercent && !allNumber) return null;
	const scale = allPercent ? 100 : 255;
	const a = alphaOf(alpha);
	if (a === null) return null;
	const [r = 0, g = 0, b = 0] = parts.map((p) => clamp01(num(p) / scale));
	return { r, g, b, a };
}

function parseHsl([hp, sp, lp]: Part[], alpha: Part | undefined): Rgba | null {
	if (!hp || !sp || !lp) return null;
	const h = hueOf(hp);
	if (h === null) return null;
	// Saturation and lightness accept percentages or bare numbers (CSS Color 4).
	const pct = (p: Part) => {
		if (p === 'none') return 0;
		if (p.unit !== '%' && p.unit !== '') return null;
		return clamp01(p.value / 100);
	};
	const s = pct(sp);
	const l = pct(lp);
	const a = alphaOf(alpha);
	if (s === null || l === null || a === null) return null;

	const hue = (((h % 360) + 360) % 360) / 360;
	const f = (n: number) => {
		const k = (n + hue * 12) % 12;
		return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
	};
	return { r: f(0), g: f(8), b: f(4), a };
}

function parseOklch(parts: Part[], alpha: Part | undefined): Rgba | null {
	const [lp, cp, hp] = parts;
	if (!lp || !cp || !hp) return null;
	let l: number;
	if (lp === 'none') l = 0;
	else if (lp.unit === '%') l = lp.value / 100;
	else if (lp.unit === '') l = lp.value;
	else return null;

	let c: number;
	if (cp === 'none') c = 0;
	else if (cp.unit === '%') c = (cp.value / 100) * 0.4;
	else if (cp.unit === '') c = cp.value;
	else return null;

	const h = hueOf(hp);
	const a = alphaOf(alpha);
	if (h === null || a === null) return null;

	const { r, g, b } = oklchToSrgb(clamp01(l), Math.max(0, c), h);
	return { r, g, b, a };
}

/** OKLCH to gamma-encoded sRGB (unclamped). Matrices from CSS Color 4. */
export function oklchToSrgb(l: number, c: number, hDeg: number) {
	const hr = (hDeg * Math.PI) / 180;
	const A = c * Math.cos(hr);
	const B = c * Math.sin(hr);

	const l_ = l + 0.3963377774 * A + 0.2158037573 * B;
	const m_ = l - 0.1055613458 * A - 0.0638541728 * B;
	const s_ = l - 0.0894841775 * A - 1.291485548 * B;
	const L = l_ ** 3;
	const M = m_ ** 3;
	const S = s_ ** 3;

	const lr = 4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
	const lg = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
	const lb = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S;
	return { r: encode(lr), g: encode(lg), b: encode(lb) };
}

function encode(linear: number): number {
	const sign = linear < 0 ? -1 : 1;
	const abs = Math.abs(linear);
	return sign * (abs <= 0.0031308 ? 12.92 * abs : 1.055 * abs ** (1 / 2.4) - 0.055);
}

function decode(channel: number): number {
	return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/** Parses a supported CSS colour. Returns null for anything else (including keywords). */
export function parseColor(input: string): Rgba | null {
	const value = input.trim();
	if (value.length === 0 || value.length > 120) return null;
	if (value.startsWith('#')) return parseHex(value);

	const match = FUNCTION_RE.exec(value);
	if (!match) return null;
	const parsed = parseParts(match[2] ?? '');
	if (!parsed) return null;
	const kind = (match[1] ?? '').toLowerCase();

	let rgba: Rgba | null;
	if (kind.startsWith('rgb')) rgba = parseRgb(parsed.parts, parsed.alpha);
	else if (kind.startsWith('hsl')) rgba = parseHsl(parsed.parts, parsed.alpha);
	else rgba = parseOklch(parsed.parts, parsed.alpha);

	if (!rgba || [rgba.r, rgba.g, rgba.b, rgba.a].some((n) => !Number.isFinite(n))) return null;
	return rgba;
}

export const isValidColor = (input: string): boolean => parseColor(input) !== null;

/** Lower-case #rrggbb, clamped to the sRGB gamut. Alpha is dropped. */
export function toHex(color: Rgba | string): string | null {
	const rgba = typeof color === 'string' ? parseColor(color) : color;
	if (!rgba) return null;
	const byte = (n: number) =>
		Math.round(clamp01(n) * 255)
			.toString(16)
			.padStart(2, '0');
	return `#${byte(rgba.r)}${byte(rgba.g)}${byte(rgba.b)}`;
}

/** Composites a translucent colour over an opaque backdrop (simple sRGB alpha blending). */
export function composite(top: Rgba, backdrop: Rgba): Rgba {
	const a = top.a;
	return {
		r: top.r * a + backdrop.r * (1 - a),
		g: top.g * a + backdrop.g * (1 - a),
		b: top.b * a + backdrop.b * (1 - a),
		a: 1
	};
}

/** WCAG 2 relative luminance. */
export function luminance(color: Rgba): number {
	const [r = 0, g = 0, b = 0] = [color.r, color.g, color.b].map((c) => decode(clamp01(c)));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * WCAG 2 contrast ratio between a foreground and background. Translucent colours
 * are composited first (background over white, foreground over the background),
 * which matches how they render on the page. Returns null if either is invalid.
 */
export function contrastRatio(foreground: string, background: string): number | null {
	const fg = parseColor(foreground);
	const bg = parseColor(background);
	if (!fg || !bg) return null;
	const white: Rgba = { r: 1, g: 1, b: 1, a: 1 };
	const solidBg = bg.a < 1 ? composite(bg, white) : bg;
	const solidFg = fg.a < 1 ? composite(fg, solidBg) : fg;
	const l1 = luminance(solidFg);
	const l2 = luminance(solidBg);
	return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
