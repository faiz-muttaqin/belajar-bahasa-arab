#!/usr/bin/env node
/**
 * Renders the site icons and the social preview image from src/lib/assets/favicon.svg.
 *
 *   bun scripts/build-brand-assets.mjs
 *
 * Writes static/favicon.ico, static/apple-touch-icon.png and static/og-image.png. Uses the
 * Playwright Chromium already installed for the e2e tests, with the bundled Noto Naskh Arabic
 * and Plus Jakarta Sans files, so Arabic shaping matches the site. Needs ImageMagick (`magick`)
 * only for packing favicon.ico.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const root = resolve(import.meta.dirname, '..');
// Embedded as data URLs: a page set with setContent() may not load file:// fonts.
const font = (pkg, file) =>
	'data:font/woff2;base64,' +
	readFileSync(join(root, 'node_modules/@fontsource-variable', pkg, 'files', file)).toString(
		'base64'
	);
const naskh = font('noto-naskh-arabic', 'noto-naskh-arabic-arabic-wght-normal.woff2');
const jakarta = font('plus-jakarta-sans', 'plus-jakarta-sans-latin-wght-normal.woff2');

// Static PNGs use the light palette; the SVG favicon keeps its dark-mode variant.
const svg = readFileSync(join(root, 'src/lib/assets/favicon.svg'), 'utf8').replace(
	/@media \(prefers-color-scheme: dark\) \{[^}]*\{[^}]*\}[^}]*\{[^}]*\}\s*\}/,
	''
);
const mark = (size, radius = true) =>
	svg
		.replace('width="64" height="64"', `width="${size}" height="${size}"`)
		.replace(' rx="14"', radius ? ' rx="14"' : '');

const page = (body, width, height) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Naskh'; src: url('${naskh}') format('woff2'); font-weight: 400 700; }
@font-face { font-family: 'Jakarta'; src: url('${jakarta}') format('woff2'); font-weight: 200 800; }
html, body { margin: 0; width: ${width}px; height: ${height}px; overflow: hidden; }
</style></head><body>${body}</body></html>`;

const og = page(
	`<div style="box-sizing:border-box;width:1200px;height:630px;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;background:#f6faf8;color:#10231d;font-family:Jakarta,sans-serif">
		<div style="display:flex;align-items:center;gap:24px">
			${mark(88)}
			<div style="font-size:40px;font-weight:700;letter-spacing:-0.5px">Belajar Bahasa Arab</div>
		</div>
		<div lang="ar" dir="rtl" style="font-family:Naskh,serif;font-size:112px;line-height:1.6;color:#145f4c;text-align:right">اللُّغَةُ الْعَرَبِيَّةُ</div>
		<div>
			<div style="font-size:36px;font-weight:600;line-height:1.3;max-width:960px">Dari huruf dan harakat sampai memahami kalimat, paragraf, dan dokumen pendek.</div>
			<div style="margin-top:18px;font-size:26px;color:#3d5a50">Untuk penutur Indonesia · Tanpa akun · Data tersimpan di perangkat Anda</div>
		</div>
	</div>`,
	1200,
	630
);

const shots = [
	{ file: 'static/og-image.png', html: og, width: 1200, height: 630 },
	// iOS applies its own corner mask, so the touch icon is a full square.
	{
		file: 'static/apple-touch-icon.png',
		html: page(mark(180, false), 180, 180),
		width: 180,
		height: 180
	}
];

const tmp = mkdtempSync(join(tmpdir(), 'brand-'));
const browser = await chromium.launch();
try {
	for (const shot of shots) {
		const tab = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
		await tab.setContent(shot.html, { waitUntil: 'load' });
		await tab.evaluate(async () => {
			await document.fonts.load('700 40px Jakarta');
			await document.fonts.load('400 112px Naskh', 'ع');
			await document.fonts.ready;
		});
		await tab.screenshot({ path: join(root, shot.file) });
		await tab.close();
	}
	const icoParts = [];
	for (const size of [16, 32, 48]) {
		const tab = await browser.newPage({ viewport: { width: size, height: size } });
		await tab.setContent(page(mark(size), size, size), { waitUntil: 'load' });
		const part = join(tmp, `${size}.png`);
		await tab.screenshot({ path: part, omitBackground: true });
		icoParts.push(part);
		await tab.close();
	}
	execFileSync('magick', [...icoParts, join(root, 'static/favicon.ico')]);
} finally {
	await browser.close();
	rmSync(tmp, { recursive: true, force: true });
}
console.log('wrote static/og-image.png, static/apple-touch-icon.png, static/favicon.ico');
