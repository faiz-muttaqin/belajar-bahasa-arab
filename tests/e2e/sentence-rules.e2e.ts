import { expect, test } from '@playwright/test';

test('G-04 sentence rules connect to previous grammar stages', async ({ page }) => {
	await page.goto('/kaidah/');
	await page.getByRole('link', { name: 'Pelajari susunan kalimat lengkap' }).click();
	await expect(page).toHaveURL(/\/kaidah\/kalimat\/$/);
	await expect(page.getByRole('heading', { name: 'Susunan kalimat bahasa Arab' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Frasa dan i‘rab' })).toBeVisible();

	await page.goto('/kaidah/frasa/');
	await page.getByRole('link', { name: 'Lanjutkan ke kalimat lengkap' }).click();
	await expect(page).toHaveURL(/\/kaidah\/kalimat\/$/);
});

test('G-04 shows source-backed nominal, verbal and passive roles', async ({ page }) => {
	await page.goto('/kaidah/kalimat/');
	await expect(page.locator('section[id] figure')).toHaveCount(18);
	await expect(page.locator('#nominal figure')).toHaveCount(3);
	await expect(page.locator('#verbal figure')).toHaveCount(2);
	await expect(page.locator('#passive figure')).toHaveCount(4);

	const active = page.locator('#passive figure').nth(0);
	const passive = page.locator('#passive figure').nth(1);
	await expect(active.locator('[data-role="object"]')).toContainText('الدَّرْسَ');
	await expect(passive.locator('[data-role="deputy"]')).toContainText('الدَّرْسُ');
	await expect(passive.locator('[data-role="deputy"]')).toContainText('Nā’ib al-fā‘il');

	const nominal = page.locator('#nominal figure').nth(2);
	await expect(nominal.locator('[data-role="topic"]')).toContainText('الطَّالِبُ');
	await expect(nominal.locator('[data-role="predicate"]')).toContainText('يَكْتُبُ');
});

test('G-04 distinguishes noun case, verb mood and nasikh operators', async ({ page }) => {
	await page.goto('/kaidah/kalimat/');
	const negation = page.locator('#negation figure');
	await expect(negation).toHaveCount(4);
	await expect(negation.nth(1).locator('[data-mood="indicative"]')).toContainText('يَكْتُبُ');
	await expect(negation.nth(2).locator('[data-mood="jussive"]')).toContainText('يَكْتُبْ');
	await expect(negation.nth(3).locator('[data-mood="subjunctive"]')).toContainText('يَكْتُبَ');

	const inna = page.locator('#nawasikh figure').nth(1);
	const kana = page.locator('#nawasikh figure').nth(2);
	await expect(inna.locator('[data-role="topic"]')).toContainText('الْكِتَابَ');
	await expect(inna.locator('[data-irab="nasb"]')).toContainText('Ism inna');
	await expect(kana.locator('[data-role="predicate"]')).toContainText('جَدِيدًا');

	await page.locator('#negation summary').first().click();
	await expect(page.locator('#negation details').first()).toContainText('لَمْ adalah harf jazm');
});

test.describe('G-04 static grammar reading on small screens without JavaScript', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

	test('shows 18 glossed examples and native exercises with no horizontal scrolling', async ({
		page
	}) => {
		await page.goto('/kaidah/kalimat/');
		await expect(page.locator('section[id] figure')).toHaveCount(18);
		await expect(page.locator('#questions figure')).toHaveCount(2);
		await expect(page.locator('#passive [data-role="deputy"]')).toHaveCount(2);
		await page.locator('#passive summary').first().click();
		await expect(page.locator('#passive details').first()).toContainText('nā’ib al-fā‘il');

		const sizes = await page.evaluate(() => ({
			page: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
	});
});
