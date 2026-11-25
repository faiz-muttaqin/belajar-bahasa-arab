import { expect, test } from '@playwright/test';

test.describe('prerendered prayer readings', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 800 } });

	test('shows separate tasyahud variants, hadith links and word notes without JavaScript', async ({
		page
	}) => {
		await page.goto('/rujukan/bacaan-shalat/#tasyahud-ibn-abbas');
		await expect(page).toHaveTitle(/Bacaan shalat dari hadis/);
		await expect(page.getByText(/menunggu tinjauan ustadz/)).toBeVisible();
		const ibnAbbas = page.locator('#tasyahud-ibn-abbas');
		await expect(ibnAbbas.getByRole('link', { name: 'Sahih Muslim 403a' })).toHaveAttribute(
			'href',
			'https://sunnah.com/muslim:403a'
		);
		await expect(ibnAbbas.locator('p[lang="ar"][dir="rtl"]')).toContainText('الْمُبَارَكَاتُ');
		await expect(
			page.locator('#tasyahud-ibn-masud').getByRole('link', { name: 'Sahih al-Bukhari 831' })
		).toBeAttached();
		await ibnAbbas.getByText('Arti per kata', { exact: true }).click();
		await expect(ibnAbbas.getByText('yang diberkahi', { exact: true })).toBeVisible();
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
			375
		);
	});

	test('keeps the funeral prayer and its emphasized word glosses available by deep link', async ({
		page
	}) => {
		await page.goto('/rujukan/bacaan-shalat/#jenazah-awf');
		const card = page.locator('#jenazah-awf');
		await expect(card.getByRole('link', { name: 'Sahih Muslim 963b' })).toHaveAttribute(
			'href',
			'https://sunnah.com/muslim:963b'
		);
		await expect(card.locator('p[lang="ar"][dir="rtl"]')).toContainText('وَوَسِّعْ مُدْخَلَهُ');
		await card.getByText('Arti per kata', { exact: true }).click();
		const row = card.locator('dl div').filter({ hasText: 'tempat masuknya' });
		await expect(row.locator('dt [lang="ar"]')).toHaveClass(/font-bold/);
		await expect(row.getByText('tempat masuknya', { exact: true })).toBeVisible();
	});
});

test('a gloss found through Indonesian search links to its reading', async ({ page }) => {
	await page.goto('/cari/?q=Pulihkanlah%20kekuranganku&jenis=word');
	await page.locator('a[href$="#kata-shalat-wajburni"]').click();
	const card = page.locator('#kata-shalat-wajburni');
	await expect(card).toContainText('وَاجْبُرْنِي');
	await card.getByRole('link', { name: 'Lihat dalam bacaan' }).click();
	await expect(page).toHaveURL(/\/rujukan\/bacaan-shalat\/#rabbighfirli-warhamni$/);
	await expect(page.locator('#rabbighfirli-warhamni')).toContainText('Sunan Ibn Majah 898');
});
