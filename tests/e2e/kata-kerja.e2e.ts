import { expect, test } from '@playwright/test';

test('the verb index lists the 22 groups by family', async ({ page }) => {
	await page.goto('/rujukan/fiil/kata-kerja/');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Daftar kata kerja per bab');
	for (const bab of ['Bab 1 · Menolong', 'Bab 3 · Membuka', 'Bab 7', 'Bab 15', 'Bab 19']) {
		await expect(page.getByRole('link', { name: new RegExp(bab) })).toBeVisible();
	}
	await expect(page.getByRole('heading', { name: 'Tsulatsi mazid +3' })).toBeVisible();
});

test('a bab page shows verbs with the meaning under the Arabic and a detail modal', async ({
	page
}) => {
	await page.goto('/rujukan/fiil/kata-kerja/3/');
	const tile = page.getByRole('button', { name: /فَتَحَ/ });
	await expect(tile).toBeVisible();
	await tile.click();
	const modal = page.getByRole('dialog');
	await expect(modal.getByText('fataḥa')).toBeVisible();
	await expect(modal.getByText('يَفْتَحُ')).toBeVisible();
	await expect(modal.getByText('Arti Inggris (Wiktionary)')).toBeVisible();
	await expect(modal.getByRole('link', { name: 'Lihat di Wiktionary' })).toHaveAttribute(
		'href',
		/en\.wiktionary\.org\/wiki\//
	);
	await page.keyboard.press('Escape');
	await expect(modal).toBeHidden();
});

test('the page fits a phone and credits Wiktionary', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('/rujukan/fiil/kata-kerja/1/');
	expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
	await expect(page.getByText(/English Wiktionary/)).toBeVisible();
});

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('verbs are in the static HTML', async ({ page }) => {
		await page.goto('/rujukan/fiil/kata-kerja/4/');
		await expect(page.getByText('عَلِمَ', { exact: true }).first()).toBeAttached();
	});
});

test('the 22 wazan table page is unchanged and links to the verb list', async ({ page }) => {
	await page.goto('/rujukan/fiil/');
	await expect(page.getByRole('link', { name: /Daftar kata kerja per bab/ })).toBeVisible();
});

test('a mazid page groups verbs by root letter and opens the detail modal', async ({ page }) => {
	await page.goto('/rujukan/fiil/kata-kerja/15/');
	const tile = page.getByRole('button', { name: /اِسْتَخْرَجَ/ });
	await expect(tile).toBeVisible();
	await tile.click();
	await expect(page.getByRole('dialog').getByText('Transliterasi (Wiktionary)')).toBeVisible();
});

test('the extra list on a bab page is labelled as model knowledge and unverified', async ({
	page
}) => {
	await page.goto('/rujukan/fiil/kata-kerja/1/');
	await expect(
		page.getByRole('heading', { name: /Daftar tambahan dari Qutrub dan Arramooz/ })
	).toBeVisible();
	await expect(page.getByText('Belum diverifikasi.')).toBeVisible();
	await page.getByText('Tampilkan daftar tambahan').click();
	await expect(page.getByText('Arti belum diketahui').first()).toBeVisible();
	await page
		.getByRole('button', { name: /dari model/ })
		.first()
		.click();
	const modal = page.getByRole('dialog');
	await expect(modal.getByText('belum diverifikasi', { exact: false }).first()).toBeVisible();
	await expect(modal.getByText('Claude', { exact: false }).first()).toBeVisible();
});
