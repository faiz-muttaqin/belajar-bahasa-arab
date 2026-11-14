import { expect, test } from '@playwright/test';

test('grammar map contrasts phrase, nominal sentence and idafah', async ({ page }) => {
	await page.goto('/kaidah/');

	await expect(page.getByRole('heading', { name: 'Kaidah nahwu dan sharaf' })).toBeVisible();
	await expect(page.locator('#nat-manut')).toContainText('كِتَابٌ');
	await expect(page.locator('#nat-manut')).toContainText('جَدِيدٌ');
	await expect(page.locator('#mubtada-khabar')).toContainText('الْكِتَابُ');
	await expect(page.locator('#idafah')).toContainText('الطَّالِبِ');

	const tokens = page.locator('#nat-manut figure [data-role]');
	await expect(tokens).toHaveCount(4);
	await expect(tokens.first()).toContainText('buku');
	await expect(tokens.first()).toContainText('Man‘ūt');
	await expect(page.locator('#nat-manut figure').first()).toContainText('Sebuah buku baru.');

	await page.locator('#nat-manut summary').first().click();
	await expect(page.locator('#nat-manut details').first()).toContainText(
		'Karena جَدِيدٌ menerangkan'
	);
});

test('source links and navigation from the word-class reference are available', async ({
	page
}) => {
	await page.goto('/rujukan/');
	await page.getByRole('link', { name: 'Buka peta kaidah' }).click();
	await expect(page).toHaveURL(/\/kaidah\/$/);
	await expect(page.getByRole('link', { name: 'Tabel tashrif' })).toBeVisible();
	await expect(page.locator('#idafah details').last()).toContainText('Lesson 5');
});

test.describe('no-script grammar reading on narrow screen', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

	test('renders word gloss beneath Arabic and exercises without client JS', async ({ page }) => {
		await page.goto('/kaidah/');
		await expect(page.locator('section[id="nat-manut"] figure')).toHaveCount(2);
		await expect(page.locator('#idafah [data-role="mudaf-ilaih"]').first()).toContainText(
			'murid itu'
		);
		await expect(page.locator('#mubtada-khabar figure').first()).toContainText(
			'Buku itu baru.'
		);

		const sizes = await page.evaluate(() => ({
			page: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
	});
});
