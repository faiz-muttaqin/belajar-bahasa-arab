import { expect, test } from '@playwright/test';

test('masdar resource is linked from sharaf and has 20 sourced exercises', async ({ page }) => {
	await page.goto('/kaidah/sharaf/');
	await page.getByRole('link', { name: 'Pelajari maṣdar dalam dokumen formal' }).click();
	await expect(page).toHaveURL(/\/kaidah\/masdar\/$/);
	await expect(page.getByRole('heading', { name: /Maṣdar: dari perbuatan/i })).toBeVisible();
	await expect(page.locator('li[id^="m0"], li[id^="m1"], li[id^="m2"]')).toHaveCount(20);
	await expect(page.getByText('Fi‘il māḍī / muḍāri‘ / maṣdar · draf')).toHaveCount(5);
	await page.locator('#m14 summary').click();
	await expect(page.locator('#m14')).toContainText('penggunaan komputer mudah');
});

test.describe('static masdar reader', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
	test('renders 20 Arabic prompts and allows independent disclosure without JS', async ({
		page
	}) => {
		await page.goto('/kaidah/masdar/');
		await expect(page.locator('[id^="m0"], [id^="m1"], [id^="m2"]')).toHaveCount(20);
		await expect(page.locator('#m01')).toContainText('كَتَبَ الْمُوَظَّفُ رِسَالَةً.');
		await page.locator('#m20 summary').click();
		await expect(page.locator('#m20')).toContainText('قَصِيرٌ adalah na‘at');
		const dims = await page.evaluate(() => ({
			content: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(dims.content).toBeLessThanOrEqual(dims.viewport);
	});
});
