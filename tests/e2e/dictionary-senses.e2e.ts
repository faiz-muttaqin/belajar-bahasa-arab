import { expect, test } from '@playwright/test';

test('sense dictionary exposes the pilot and filters by Indonesian meaning', async ({ page }) => {
	await page.goto('/sharaf/kamus/');
	await expect(page.getByRole('heading', { name: '5 lema' })).toBeVisible();
	await page.getByRole('searchbox').fill('kantor');
	await expect(page.getByRole('heading', { name: '1 lema' })).toBeVisible();
	await expect(page.locator('#maktab')).toContainText('meja kerja');
	await expect(page.locator('#maktab')).toContainText('kantor');
});

test('sense dictionary is readable without JavaScript', async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	try {
		const page = await context.newPage();
		await page.goto('/sharaf/kamus/');
		await expect(page.locator('#maktabah')).toContainText('perpustakaan');
		await expect(page.locator('#maktabah')).toContainText('toko buku');
	} finally {
		await context.close();
	}
});
