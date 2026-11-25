import { expect, test } from '@playwright/test';

test('masdar resource is linked from sharaf and has 52 sourced exercises', async ({ page }) => {
	await page.goto('/kaidah/sharaf/');
	await page.getByRole('link', { name: 'Pelajari maṣdar dalam dokumen formal' }).click();
	await expect(page).toHaveURL(/\/kaidah\/masdar\/$/);
	await expect(page.getByRole('heading', { name: /Maṣdar: dari perbuatan/i })).toBeVisible();
	await expect(page.locator('#latihan-masdar li[id^="m"]')).toHaveCount(52);
	await expect(page.getByText('Fi‘il māḍī / muḍāri‘ / maṣdar · draf')).toHaveCount(13);
	await page.locator('#m14 summary').click();
	await expect(page.locator('#m14')).toContainText('penggunaan komputer mudah');
});

test.describe('static masdar reader', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
	test('renders 52 Arabic prompts and allows independent disclosure without JS', async ({
		page
	}) => {
		await page.goto('/kaidah/masdar/');
		await expect(page.locator('#latihan-masdar li[id^="m"]')).toHaveCount(52);
		await expect(page.locator('#m01')).toContainText('كَتَبَ الْمُوَظَّفُ رِسَالَةً.');
		await expect(page.locator('#m22')).toContainText('مُسَاعَدَةُ الْمَرِيضِ ضَرُورِيَّةٌ.');
		for (const pattern of [
			'تَفَعُّلٌ',
			'تَفَاعُلٌ',
			'اِنْفِعَالٌ',
			'اِفْعِلَالٌ',
			'مُفَاعَلَةٌ',
			'فِعَالٌ',
			'تَفْعِيلٌ',
			'إِفْعَالٌ'
		]) {
			await expect(page.locator('body')).toContainText(pattern);
		}
		await page.locator('#m20 summary').click();
		await expect(page.locator('#m20')).toContainText('قَصِيرٌ adalah na‘at');
		await page.locator('#m42 summary').click();
		await expect(page.locator('#m42')).toContainText('اِفْعِلَالٌ');
		await page.locator('#m46 summary').click();
		await expect(page.locator('#m46')).toContainText('تَفْعِيلٌ');
		await page.locator('#m50 summary').click();
		await expect(page.locator('#m50')).toContainText('إِفْعَالٌ');
		await expect(page.locator('[id="g02.masdar-form-ii-iv"]')).toContainText('g02.masdar-vs-fiil');
		await expect(page.locator('#lexeme-nazama a[data-wazan-bab="7"]')).toBeVisible();
		await expect(page.locator('#lexeme-arsala a[data-wazan-bab="9"]')).toBeVisible();
		await expect(page.locator('li[id^="lexeme-"] a[data-wazan-bab]')).toHaveCount(13);
		const dims = await page.evaluate(() => ({
			content: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(dims.content).toBeLessThanOrEqual(dims.viewport);
	});
});
