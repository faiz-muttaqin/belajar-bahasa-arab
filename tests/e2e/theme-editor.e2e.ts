import { readFile } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';

// The theme editor must ship as prerendered static HTML (AGENTS.md) and hydrate for editing.
const STORAGE_KEY = 'belajar-bahasa-arab:theme:v1';
const URL = '/editor/theme/';

/** Opens the editor and waits until it has hydrated and loaded saved preferences. */
async function openEditor(page: Page) {
	await page.goto(URL);
	await expect(page.locator('[data-editor-ready]')).toBeAttached();
}

test('adapter-static writes the theme editor with server-rendered controls', async () => {
	const html = await readFile('build/editor/theme/index.html', 'utf8');

	expect(html).toContain('<html lang="id">');
	expect(html).toMatch(/<title>Editor tema · Belajar Bahasa Arab<\/title>/);
	expect(html).toMatch(/<h1[^>]*>Editor tema<\/h1>/);
	expect(html).toMatch(/<meta name="description" content="[^"]+"/);
	// Controls are rendered by SSR with the default theme values.
	expect(html).toMatch(/<label[^>]*for="warna-light-primary"/);
	expect(html).toMatch(
		/id="warna-light-primary"[^>]*value="#145f4c"|value="#145f4c"[^>]*id="warna-light-primary"/
	);
	expect(html).toContain('--primary: #145f4c;');
	// Early theme script is inline in <head>.
	expect(html).toMatch(/<head>[\s\S]*<script>\(function initTheme[\s\S]*<\/head>/);
});

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('editor page is readable from prerendered HTML', async ({ page }) => {
		await page.goto(URL);

		await expect(page.locator('html')).toHaveAttribute('lang', 'id');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Editor tema');
		await expect(page.locator('#warna-light-primary')).toHaveValue('#145f4c');
		await expect(page.getByRole('radio', { name: 'Ikuti sistem' })).toBeChecked();
		await expect(page.getByRole('textbox', { name: 'CSS tema' })).toHaveValue(
			/--background: #fbfaf7;/
		);
		await expect(page.getByRole('heading', { name: 'Pemeriksaan kontras' })).toBeVisible();
	});
});

test.describe('with JavaScript', () => {
	test.beforeEach(async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
	});

	test('edits a colour live, saves it and restores it before first paint', async ({ page }) => {
		await openEditor(page);
		const field = page.locator('#warna-light-primary');
		await expect(field).toBeEditable();
		// Wait for hydration: the toolbar only enables undo after a change.
		await field.fill('#0a5c8a');

		await expect
			.poll(() =>
				page.evaluate(() =>
					getComputedStyle(document.documentElement).getPropertyValue('--primary')
				)
			)
			.toBe('#0a5c8a');
		const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
		expect(JSON.parse(stored ?? '{}').overrides.light.primary).toBe('#0a5c8a');

		// On reload the inline script applies the saved value before any app code runs.
		await page.reload({ waitUntil: 'domcontentloaded' });
		const early = await page.evaluate(() => ({
			primary: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
			style: !!document.getElementById('theme-overrides')
		}));
		expect(early).toEqual({ primary: '#0a5c8a', style: true });

		await expect(page.locator('[data-editor-ready]')).toBeAttached();
		await page.getByRole('button', { name: 'Kembalikan ke tema bawaan' }).click();
		await expect(page.locator('#warna-light-primary')).toHaveValue('#145f4c');
		expect(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).toBeNull();
	});

	test('rejects an invalid colour without applying it', async ({ page }) => {
		await openEditor(page);
		const field = page.locator('#warna-light-primary');
		await field.fill('notacolor');
		await expect(page.getByText('Warna belum valid.')).toBeVisible();
		await expect(field).toHaveAttribute('aria-invalid', 'true');
		expect(
			await page.evaluate(() =>
				getComputedStyle(document.documentElement).getPropertyValue('--primary')
			)
		).toBe('#145f4c');
		await field.blur();
		await expect(field).toHaveValue('#145f4c');
	});

	test('switches to dark mode, persists it and edits dark colours separately', async ({ page }) => {
		await openEditor(page);
		await page.getByText('Gelap', { exact: true }).click();
		await expect(page.locator('html')).toHaveClass(/dark/);
		await expect(page.getByRole('heading', { name: 'Warna mode gelap' })).toBeVisible();
		await expect(page.locator('#warna-dark-primary')).toHaveValue('#7ad4b0');

		await page.reload();
		await expect(page.locator('html')).toHaveClass(/dark/);
		await expect(page.locator('[data-editor-ready]')).toBeAttached();
		await page.getByText('Ikuti sistem', { exact: true }).click();
		await expect(page.locator('html')).not.toHaveClass(/dark/);
	});

	test('imports CSS and undoes it in one step', async ({ page }) => {
		await openEditor(page);
		await page
			.getByRole('textbox', { name: 'CSS untuk diimpor' })
			.fill(':root { --primary: #112233; --radius: 1rem; --made-up: red; }');
		await page.getByRole('button', { name: 'Terapkan CSS' }).click();
		await expect(page.getByText(/2 nilai diterapkan\. Diabaikan: --made-up/)).toBeVisible();
		await expect(page.locator('#warna-light-primary')).toHaveValue('#112233');

		await page.getByRole('button', { name: 'Urungkan' }).click();
		await expect(page.locator('#warna-light-primary')).toHaveValue('#145f4c');
	});
});

test.describe('theme choices', () => {
	test('applies a preset and undoes it', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await openEditor(page);
		const preset = page.getByRole('button', { name: /^Teh susu/ });
		await preset.click();
		await expect(preset).toHaveAttribute('aria-pressed', 'true');
		await expect(page.locator('#warna-light-primary')).not.toHaveValue('#145f4c');
		await expect(page.getByRole('button', { name: /^Hijau tenang/ })).toHaveAttribute(
			'aria-pressed',
			'false'
		);
		await page.getByRole('button', { name: 'Urungkan' }).click();
		await expect(page.locator('#warna-light-primary')).toHaveValue('#145f4c');
	});

	test('saves the current theme under a name, reapplies and deletes it', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await openEditor(page);
		await page.locator('#warna-light-primary').fill('#0a5c8a');
		await page.getByLabel('Nama tema').fill('Tema uji');
		await page.getByRole('button', { name: 'Simpan tema saat ini' }).click();
		await expect(page.getByText('Tema "Tema uji" disimpan.')).toBeVisible();

		await page.getByRole('button', { name: /^Kertas klasik/ }).click();
		await expect(page.locator('#warna-light-primary')).not.toHaveValue('#0a5c8a');

		await page.reload();
		await expect(page.locator('[data-editor-ready]')).toBeAttached();
		await page.getByRole('button', { name: 'Pakai tema Tema uji' }).click();
		await expect(page.locator('#warna-light-primary')).toHaveValue('#0a5c8a');

		await page.getByRole('button', { name: 'Hapus tema Tema uji' }).click();
		await expect(page.getByText('Belum ada tema tersimpan.')).toBeVisible();
		await page.getByRole('button', { name: 'Batalkan hapus' }).click();
		await expect(page.getByRole('button', { name: 'Pakai tema Tema uji' })).toBeVisible();
	});
});

test.describe('navigation adapts to the screen', () => {
	test('phones get a bottom navigation bar', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.goto(URL);
		const navs = page.getByRole('navigation', { name: 'Bagian editor' });
		await expect(navs).toHaveCount(1);
		const box = await navs.boundingBox();
		expect(box && box.y + box.height).toBeCloseTo(812, 0);
	});

	test('desktop gets a left sidebar', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 800 });
		await page.goto(URL);
		const nav = page.getByRole('navigation', { name: 'Bagian editor' });
		await expect(nav).toHaveCount(1);
		const box = await nav.boundingBox();
		expect(box?.x).toBe(0);
		await expect(nav.getByRole('link', { name: 'Bentuk dan huruf' })).toBeVisible();
	});
});
