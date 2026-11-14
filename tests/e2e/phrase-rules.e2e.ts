import { expect, test } from '@playwright/test';

test('G-03 is linked from the grammar map and original isim reference', async ({ page }) => {
	await page.goto('/kaidah/');
	await page.getByRole('link', { name: 'Pelajari frasa dan i‘rab' }).click();
	await expect(page).toHaveURL(/\/kaidah\/frasa\/$/);
	await expect(page.getByRole('heading', { name: 'Frasa dan i‘rab' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Perubahan kata (sharaf)' })).toBeVisible();

	await page.goto('/rujukan/isim/');
	await page.getByRole('link', { name: 'Buka kaidah frasa dan i‘rab' }).click();
	await expect(page).toHaveURL(/\/kaidah\/frasa\/$/);
});

test('G-03 presents distinct case labels, word glosses and a clarifying exercise', async ({
	page
}) => {
	await page.goto('/kaidah/frasa/');
	await expect(page.locator('section[id] figure')).toHaveCount(16);
	await expect(page.getByLabel('Legenda i‘rab')).toContainText('Rafa‘');
	await expect(page.getByLabel('Legenda i‘rab')).toContainText('Naṣb');
	await expect(page.getByLabel('Legenda i‘rab')).toContainText('Jarr');

	const cases = page.locator('#perubahan-irab figure');
	await expect(cases).toHaveCount(3);
	await expect(cases.nth(0)).toContainText('الطَّالِبُ');
	await expect(cases.nth(1)).toContainText('الطَّالِبَ');
	await expect(cases.nth(2)).toContainText('الطَّالِبِ');
	await expect(cases.nth(0).locator('[data-irab="raf"]')).toContainText('ḍamma');
	await expect(cases.nth(1).locator('[data-irab="nasb"]')).toContainText('fatḥa');
	await expect(cases.nth(2).locator('[data-irab="jarr"]')).toContainText('kasra');

	await page.locator('#perubahan-irab summary').first().click();
	await expect(page.locator('#perubahan-irab details').first()).toContainText(
		'Lema dasarnya sama'
	);
});

test('G-03 illustrates nominal plurality and nested idafah without colour-only labels', async ({
	page
}) => {
	await page.goto('/kaidah/frasa/');
	await expect(page.locator('#naat-agreement')).toContainText('كُتُبٌ');
	await expect(page.locator('#naat-agreement')).toContainText('Jamak benda tidak berakal');
	await expect(page.locator('#idafah-jar')).toContainText('كِتَابِ');
	await expect(page.locator('#idafah-jar')).toContainText('الطَّالِبِ');
	await expect(page.locator('#jumlah-dan-gender')).toContainText('طَالِبَانِ');
	await expect(page.locator('#jumlah-dan-gender')).toContainText('طَالِبَيْنِ');
});

test.describe('G-03 static narrow-screen rendering with JavaScript disabled', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

	test('renders every annotated example without overflow and can reveal native exercise', async ({
		page
	}) => {
		await page.goto('/kaidah/frasa/');
		await expect(page.locator('section[id] figure')).toHaveCount(16);
		await expect(page.locator('#marifah-nakirah [data-irab="raf"]')).toHaveCount(2);
		await expect(page.locator('#jumlah-dan-gender [data-irab="nasb"]')).toHaveCount(2);
		await page.locator('#idafah-jar summary').first().click();
		await expect(page.locator('#idafah-jar details').first()).toContainText(
			'كِتَابِ'
		);
		const sizes = await page.evaluate(() => ({
			page: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
	});
});
