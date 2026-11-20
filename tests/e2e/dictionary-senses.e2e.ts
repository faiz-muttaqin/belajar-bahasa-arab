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

test('dictionary requests the generated manifest only after search', async ({ page }) => {
	let requested = false;
	page.on('request', (request) => {
		if (request.url().includes('/dictionary-generated/')) requested = true;
	});
	await page.goto('/sharaf/kamus/');
	await expect(page.getByRole('heading', { name: '5 lema' })).toBeVisible();
	expect(requested).toBe(false);
	const manifest = page.waitForResponse((response) =>
		response.url().includes('/dictionary-generated/manifest-v1.json') && response.ok()
	);
	await page.getByRole('searchbox').fill('kantor');
	await manifest;
	await expect(page.getByRole('heading', { name: '1 lema' })).toBeVisible();
	await expect(page.locator('#maktab')).toContainText('kantor');
});
