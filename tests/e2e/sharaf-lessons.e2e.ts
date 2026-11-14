import { expect, test } from '@playwright/test';

test('G-02 morphology page links back to existing 22 wazan reference and lexicon', async ({
	page
}) => {
	await page.goto('/kaidah/');
	await page.getByRole('link', { name: 'Pelajari perubahan kata (sharaf)' }).click();
	await expect(page).toHaveURL(/\/kaidah\/sharaf\/$/);
	await expect(
		page.getByRole('heading', { name: 'Perubahan kata: akar, wazan, dan tashrif' })
	).toBeVisible();
	await expect(page.getByRole('link', { name: 'Lihat tabel 22 bab tashrif' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Cari akar dan wazan di kamus' })).toBeVisible();
});

test('shows root, derived forms and correct pronoun disambiguation', async ({ page }) => {
	await page.goto('/kaidah/sharaf/');
	await expect(page.locator('#akar-dan-wazan [data-form]')).toHaveCount(3);
	await expect(page.locator('#tashrif-istilahi [data-form]')).toHaveCount(6);
	await expect(page.locator('#tashrif-lughawi [data-form]')).toHaveCount(9);

	const masdar = page.locator('[data-form="ist-masdar"]');
	await expect(masdar).toContainText('كِتَابَةٌ');
	await expect(masdar).toContainText('kegiatan menulis');

	await expect(page.locator('[data-form="lug-she-present"]')).toContainText('هِيَ');
	await expect(page.locator('[data-form="lug-you-present"]')).toContainText('أَنْتَ');
	await expect(page.locator('[data-form="lug-she-present"]')).toContainText('تَكْتُبُ');

	await page.locator('#tashrif-lughawi summary').first().click();
	await expect(page.locator('#tashrif-lughawi details').first()).toContainText(
		'Karena bentuk muḍāri‘ tersebut'
	);
});

test.describe('static sharaf page without JavaScript', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

	test('prerenders vocalized forms, word glosses and links without horizontal overflow', async ({
		page
	}) => {
		await page.goto('/kaidah/sharaf/');
		await expect(page.locator('[data-form]')).toHaveCount(18);
		await expect(page.locator('[data-form="ist-maf-ul"]')).toContainText('yang ditulis');
		await expect(page.locator('[data-form="lug-i-past"]')).toContainText('كَتَبْتُ');
		await expect(page.getByRole('link', { name: 'Lihat tabel 22 bab tashrif' })).toBeVisible();
		const sizes = await page.evaluate(() => ({
			page: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
	});
});
