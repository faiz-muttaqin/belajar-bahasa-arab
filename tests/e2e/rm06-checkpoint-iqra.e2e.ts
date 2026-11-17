import { expect, test } from '@playwright/test';

test('Iqra optional checkpoint is linked and stays ungraded', async ({ page }) => {
	await page.goto('/belajar/');
	const stage = page.locator('#stage-iqra');
	await expect(stage.getByRole('link', { name: /mulai titik cek/i })).toContainText('20 varian');
	await stage.getByRole('link', { name: /mulai titik cek/i }).click();
	await expect(page.getByRole('heading', { name: 'Latihan membaca teks baru' })).toBeVisible();
	await expect(
		page.getByText('Ini latihan mandiri, bukan tes otomatis', { exact: false })
	).toBeVisible();
	await expect(page.locator('[id^="iqra-check-"]')).toHaveCount(20);
	await page.getByText('Buka petunjuk pemeriksaan tanda').first().click();
	await expect(page.getByText('Vokal panjang pada بَابٌ', { exact: false })).toBeVisible();
});

test.describe('static Iqra checkpoint', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
	test('has 20 readable cards, keyboard-accessible disclosures and no horizontal scroll', async ({
		page
	}) => {
		await page.goto('/belajar/checkpoint-iqra/');
		await expect(page.locator('[id^="iqra-check-"]')).toHaveCount(20);
		await expect(page.locator('#iqra-check-20')).toContainText('الْمُدَرِّسُ فِي الْغُرْفَةِ.');
		await page.locator('#iqra-check-20 summary').click();
		await expect(page.locator('#iqra-check-20')).toContainText('Ra pada الْمُدَرِّسُ');
		const width = await page.evaluate(() => ({
			viewport: document.documentElement.clientWidth,
			content: document.documentElement.scrollWidth
		}));
		expect(width.content).toBeLessThanOrEqual(width.viewport);
	});
});
