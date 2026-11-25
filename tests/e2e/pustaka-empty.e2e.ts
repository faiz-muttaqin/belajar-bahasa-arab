import { existsSync, readdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

// Personal-use local copies (docs/plans/local-content-import.md, hard rule 5): a build without
// `content-local/` (CI, public deploys) must show only the empty state under /pustaka/ and
// must not contain a single detail page. This test is about that build, so it skips itself
// when the owner has imported local content into this checkout.
const hasLocalContent = existsSync('content-local');

test.describe('/pustaka/ without content-local/', () => {
	test.skip(hasLocalContent, 'content-local/ exists in this checkout; run in CI or move it away');

	test('the build writes the section page and no detail pages', async () => {
		const entries = readdirSync('build/pustaka', { withFileTypes: true });
		expect(entries.filter((e) => e.isDirectory()).map((e) => e.name)).toEqual([]);
		const html = await readFile('build/pustaka/index.html', 'utf8');
		expect(html).toContain('<html lang="id">');
		expect(html).toContain('Belum ada salinan lokal');
	});

	test('shows the empty state, with no lesson, vocabulary or table links', async ({ page }) => {
		await page.goto('/pustaka/');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pustaka');
		await expect(page.getByRole('heading', { name: 'Belum ada salinan lokal' })).toBeVisible();
		await expect(page.locator('main a[href^="/pustaka/"]')).toHaveCount(0);
	});

	test('is readable without JavaScript', async ({ browser }) => {
		const context = await browser.newContext({ javaScriptEnabled: false });
		const page = await context.newPage();
		await page.goto('/pustaka/');
		await expect(page.getByRole('heading', { name: 'Belum ada salinan lokal' })).toBeVisible();
		await context.close();
	});

	test('a detail URL does not exist', async ({ page }) => {
		const response = await page.goto('/pustaka/tajweed/', { waitUntil: 'domcontentloaded' });
		// The static host serves the 404 shell; the content never reaches the page.
		expect(response?.status()).toBe(404);
	});

	test('the menu links to Pustaka but the mobile tab bar does not', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 800 });
		await page.goto('/pustaka/');
		await expect(
			page.getByRole('navigation', { name: 'Navigasi cepat' }).getByRole('link')
		).toHaveCount(5);
		await expect(
			page
				.getByRole('navigation', { name: 'Navigasi cepat' })
				.getByRole('link', { name: 'Pustaka' })
		).toHaveCount(0);
		await page.getByRole('button', { name: 'Menu' }).click();
		await expect(
			page.getByRole('navigation', { name: 'Semua bagian' }).getByRole('link', { name: /Pustaka/ })
		).toBeVisible();
	});
});
