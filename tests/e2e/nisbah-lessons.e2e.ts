import { expect, test } from '@playwright/test';

test('Nisbah lesson is linked from the grammar map and shows sourced original exercises', async ({ page }) => {
	await page.goto('/kaidah/');
	await page.getByRole('link', { name: 'Baca istilah formal dengan sifat nisbah' }).click();
	await expect(page).toHaveURL(/\/kaidah\/nisbah\/$/);
	await expect(page.getByRole('heading', { name: 'Nisbah untuk memahami istilah formal' })).toBeVisible();
	await expect(page.locator('[id^="nis-"]')).toHaveCount(20);
	await page.locator('#nis-15 summary').click();
	await expect(page.locator('#nis-15')).toContainText('khabar');
	await expect(page.locator('#nisbah-gender')).toContainText('CC BY 4.0');
});

test.describe('static-first nisbah lesson', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
	test('renders distinct Arabic and explanations without scripts and no overflow', async ({ page }) => {
		await page.goto('/kaidah/nisbah/');
		await expect(page.locator('[id^="nis-"]')).toHaveCount(20);
		await expect(page.locator('#nis-01')).toContainText('كِتَابٌ عَرَبِيٌّ');
		await page.locator('#nis-20 summary').click();
		await expect(page.locator('#nis-20')).toContainText('صَفْحَةٌ termasuk feminin');
		const dimensions = await page.evaluate(() => ({
			content: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
	});
});
