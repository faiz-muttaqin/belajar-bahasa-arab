import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

// Architecture guard: public routes must ship complete static HTML that is readable
// without client-side JavaScript (see AGENTS.md, "Non-negotiable architecture").

test('adapter-static writes a complete HTML document for the home page', async () => {
	const html = await readFile('build/index.html', 'utf8');

	expect(html).toContain('<html lang="id">');
	expect(html).toMatch(/<title>Belajar Bahasa Arab<\/title>/);
	expect(html).toMatch(/<h1[^>]*>Belajar Bahasa Arab<\/h1>/);
});

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('home page is readable from prerendered HTML', async ({ page }) => {
		await page.goto('/');

		await expect(page.locator('html')).toHaveAttribute('lang', 'id');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Belajar Bahasa Arab');
		await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
	});
});
