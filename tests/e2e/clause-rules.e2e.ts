import { expect, test } from '@playwright/test';

test('G-05 clause roadmap and previous sentence lessons link in both directions', async ({ page }) => {
	await page.goto('/kaidah/');
	await page.getByRole('link', { name: /Pelajari hubungan klausa/ }).click();
	await expect(page).toHaveURL(/\/kaidah\/klausa\/$/);
	await expect(page.getByRole('heading', { name: 'Kalimat majemuk dan hubungan klausa' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Kalimat lengkap' })).toBeVisible();

	await page.goto('/kaidah/kalimat/');
	await page.getByRole('link', { name: 'Lanjutkan ke kalimat majemuk' }).click();
	await expect(page).toHaveURL(/\/kaidah\/klausa\/$/);
});

test('G-05 renders 16 examples with explicit nested clause and token roles', async ({ page }) => {
	await page.goto('/kaidah/klausa/');
	await expect(page.locator('section[id] figure')).toHaveCount(16);
	await expect(page.locator('#coordination figure')).toHaveCount(3);
	await expect(page.locator('#relative-clauses figure')).toHaveCount(3);
	await expect(page.locator('#conditions figure')).toHaveCount(3);

	const relative = page.locator('#relative-clauses figure').first();
	await expect(relative.locator('[data-span="relative"]')).toContainText('يَقْرَأُ');
	await expect(relative.locator('[data-span="link"]')).toContainText('الَّذِي');
	await expect(relative.locator('[data-span="main"]').last()).toContainText('مُجْتَهِدٌ');
	await expect(page.locator('#relative-clauses')).toContainText('قَرَأْتُهُ');
});

test('G-05 shows conditional jussive and distinguishes cause, contrast and exception', async ({ page }) => {
	await page.goto('/kaidah/klausa/');
	const condition = page.locator('#conditions figure').first();
	await expect(condition.locator('[data-mood="jussive"]')).toHaveCount(2);
	await expect(condition.locator('[data-span="condition"]')).toContainText('تَدْرُسْ');
	await expect(condition.locator('[data-span="result"]')).toContainText('تَنْجَحْ');

	const cause = page.locator('#reasons figure').first();
	await expect(cause.locator('[data-irab="nasb"]')).toContainText('الدَّرْسَ');
	await expect(page.locator('#reasons figure').nth(1)).toContainText('بِسَبَبِ');
	await expect(page.locator('#contrast figure').first()).toContainText('لَكِنَّ');
	await expect(page.locator('#adjuncts figure')).toHaveCount(3);
	await expect(page.locator('#adjuncts [data-span="exception"]')).toContainText('طَالِبًا');

	await page.locator('#conditions summary').first().click();
	await expect(page.locator('#conditions details').first()).toContainText('إِنْ menjazmkan');
});

test.describe('G-05 Arabic clause reading without JS on narrow screen', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

	test('keeps 16 examples, labels and native exercises accessible without overflow', async ({ page }) => {
		await page.goto('/kaidah/klausa/');
		await expect(page.locator('section[id] figure')).toHaveCount(16);
		await expect(page.locator('[data-span="relative"]')).toHaveCount(3);
		await expect(page.locator('#conditions [data-mood="jussive"]')).toHaveCount(5);
		await expect(page.locator('#adjuncts [data-span="specification"]')).toContainText('كِتَابًا');

		await page.locator('#adjuncts summary').first().click();
		await expect(page.locator('#adjuncts details').first()).toContainText('Contoh positif lengkap');

		const sizes = await page.evaluate(() => ({
			page: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
	});
});
