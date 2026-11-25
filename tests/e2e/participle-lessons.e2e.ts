import { expect, test } from '@playwright/test';

test('sharaf links to participles with 15 families and 60 exercises', async ({ page }) => {
	await page.goto('/kaidah/sharaf/');
	await page.getByRole('link', { name: 'Pelajari isim fā‘il dan isim maf‘ūl' }).click();
	await expect(page).toHaveURL(/\/kaidah\/participle\/$/);
	await expect(
		page.getByRole('heading', { name: 'Isim fā‘il dan isim maf‘ūl', exact: true })
	).toBeVisible();
	await expect(page.locator('li[id^="pair-"]')).toHaveCount(15);
	await expect(page.locator('li[id^="part-"]')).toHaveCount(60);
	await page.locator('#part-22 summary').click();
	await expect(page.locator('#part-22')).toContainText('maf‘ūl bih');
	await page.locator('#part-45 summary').click();
	await expect(page.locator('#part-45')).toContainText('tertulis sama');
});

test.describe('static participle reader', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
	test('renders every form, unusual cases and all exercises without JavaScript', async ({
		page
	}) => {
		await page.goto('/kaidah/participle/');
		await expect(page.locator('#pair-baa')).toContainText('مَبِيعٌ');
		await expect(page.locator('li[id^="pair-"]')).toHaveCount(15);
		await expect(page.locator('li[id^="part-"]')).toHaveCount(60);
		for (const form of ['III', 'V', 'VI', 'VII', 'VIII', 'IX']) {
			await expect(
				page.locator('li[id^="pair-"]', { hasText: `Form ${form} ·` }).first()
			).toBeVisible();
		}
		await expect(page.locator('#pair-ikhtara')).toContainText('مُخْتَارٌ');
		await expect(page.locator('#pair-ittasala')).toContainText('مِثَالٌ');
		await expect(page.locator('#pair-inqataa [data-passive="tidak-lazim"]')).toHaveText(
			'Tidak lazim'
		);
		await expect(page.locator('#pair-ihmarra [data-passive="tidak-lazim"]')).toBeVisible();
		await expect(page.locator('#pair-saada')).toContainText('مُسَاعَدَةٌ');
		await page.locator('#part-21 summary').click();
		await expect(page.locator('#part-21')).toContainText('ajwaf');
		await page.locator('#part-49 summary').click();
		await expect(page.locator('#part-49')).toContainText('mithāl');
		const dimensions = await page.evaluate(() => ({
			content: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
	});
});
