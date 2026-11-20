import { expect, test } from '@playwright/test';

test('sharaf links to participles with six pairs and 24 exercises', async ({ page }) => {
	await page.goto('/kaidah/sharaf/');
	await page.getByRole('link', { name: 'Pelajari isim fā‘il dan isim maf‘ūl' }).click();
	await expect(page).toHaveURL(/\/kaidah\/participle\/$/);
	await expect(
		page.getByRole('heading', { name: 'Isim fā‘il dan isim maf‘ūl', exact: true })
	).toBeVisible();
	await expect(page.locator('li[id^="pair-"]')).toHaveCount(6);
	await expect(page.locator('li[id^="part-"]')).toHaveCount(24);
	await page.locator('#part-22 summary').click();
	await expect(page.locator('#part-22')).toContainText('maf‘ūl bih');
});

test.describe('static participle reader', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
	test('renders lexical exception and all exercises without JavaScript', async ({ page }) => {
		await page.goto('/kaidah/participle/');
		await expect(page.locator('#pair-baa')).toContainText('مَبِيعٌ');
		await expect(page.locator('li[id^="part-"]')).toHaveCount(24);
		await page.locator('#part-21 summary').click();
		await expect(page.locator('#part-21')).toContainText('ajwaf');
		const dimensions = await page.evaluate(() => ({
			content: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
	});
});
