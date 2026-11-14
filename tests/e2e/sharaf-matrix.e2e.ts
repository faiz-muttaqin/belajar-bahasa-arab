import { expect, test } from '@playwright/test';

test('transposed tashrif includes 22 rows and all 11 horizontally scrollable forms', async ({
	page
}) => {
	await page.goto('/rujukan/#tashrif-istilahi');
	const table = page
		.getByRole('region', { name: 'Tabel tashrif istilahi: bab di kiri, bentuk dari kanan ke kiri' })
		.locator('table');

	await expect(table.locator('tbody tr')).toHaveCount(22);
	const headers = await table.locator('thead th').allTextContents();
	expect(headers).toHaveLength(12);
	expect(headers[0]?.trim()).toBe('Bab dan kelompok');
	expect(headers.at(-1)?.trim()).toBe('fi’il madhi');
	await expect(table.locator('tbody tr').first().locator('td').last()).toHaveText('فَعَلَ');
	await expect(table.locator('tbody tr').last().locator('td').last()).toHaveText('اِفْعَلَلَّ');
	const region = page.getByRole('region', {
		name: 'Tabel tashrif istilahi: bab di kiri, bentuk dari kanan ke kiri'
	});
	expect(await region.evaluate((element) => element.scrollWidth)).toBeGreaterThan(
		await region.evaluate((element) => element.clientWidth)
	);
});

test('global Indonesian search and one clear button replace and restore the matching row', async ({
	page
}) => {
	await page.goto('/rujukan/#tashrif-istilahi');
	const table = page.getByRole('region', {
		name: 'Tabel tashrif istilahi: bab di kiri, bentuk dari kanan ke kiri'
	});
	const rows = table.locator('tbody tr');
	await page.getByRole('button', { name: 'Cari kata atau arti Indonesia' }).click();
	const modal = page.getByRole('dialog', { name: 'Kamus dan penjelasan sharaf' });
	await expect(modal).toBeVisible();
	await modal.getByRole('searchbox', { name: 'Cari Arab atau Indonesia' }).fill('mengajarkan');
	await expect(modal.getByText('عَلَّمَ')).toBeVisible();
	await modal.getByRole('button', { name: 'Detail' }).click();
	await expect(modal.getByText('Bentuk kata yang tercatat')).toBeVisible();
	await modal.getByRole('button', { name: 'Gunakan di tabel' }).click();
	await expect(modal).not.toBeVisible();
	await expect(rows.nth(6).locator('td').last()).toHaveText('عَلَّمَ');
	await expect(rows.first().locator('td').last()).toHaveText('فَعَلَ');

	await page.getByRole('button', { name: 'Clear semua pilihan kata dan kembalikan wazan' }).click();
	await expect(rows.nth(6).locator('td').last()).toHaveText('فَعَّلَ');
});

test('clicking a bab narrows the glossary, and cell detail explains form and source', async ({
	page
}) => {
	await page.goto('/rujukan/#tashrif-istilahi');
	const modal = page.getByRole('dialog', { name: 'Kamus dan penjelasan sharaf' });
	await page.getByRole('button', { name: 'Pilih kata untuk bab 15' }).click();
	await expect(modal).toBeVisible();
	await expect(modal.getByRole('combobox', { name: 'Batasi ke bab' })).toHaveValue('15');
	await expect(modal.getByText('اِسْتَغْفَرَ')).toBeVisible();
	await modal.getByRole('button', { name: 'Gunakan' }).click();

	await page.getByRole('button', { name: 'Detail fi’il mudhari’, bab 15' }).click();
	await expect(modal.getByText('Penjelasan perubahan kata')).toBeVisible();
	await expect(modal.getByText('يَسْتَغْفِرُ')).toBeVisible();
	await expect(modal.getByText(/Fi’il mudhari menunjukkan peristiwa nonlampau/)).toBeVisible();
});

test('the glossary snapshot is served as static JSON including the new patterns', async ({
	request
}) => {
	const response = await request.get('/data/sharaf.json');
	expect(response.ok()).toBe(true);
	const catalog = await response.json();
	expect(catalog.schema).toBe(1);
	expect(catalog.entries.some((entry: { id: string }) => entry.id === 'fiil-expanded-22')).toBe(true);
});

test('general search links to glossary entry and the corresponding tashrif column', async ({
	page
}) => {
	await page.goto('/cari/?jenis=word&q=قول');
	await page.getByRole('link', { name: /قَالَ.*berkata/ }).click();
	await expect(page).toHaveURL(/\/sharaf\/#fiil-qala$/);
	await expect(page.locator('#fiil-qala')).toContainText('Kaidah khusus');
	await page.goto('/cari/?jenis=reference&q=mashdar');
	await page.locator('a[href$="#tashrif-istilahi-mashdar"]').click();
	await expect(page).toHaveURL(/#tashrif-istilahi-mashdar$/);
});

test('desktop uses a sidebar and the matrix occupies the remaining page width', async ({
	page
}) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/rujukan/#tashrif-istilahi');
	await expect(page.getByRole('navigation', { name: 'Navigasi utama' })).toBeVisible();
	const sidebar = page.getByRole('complementary', { name: 'Navigasi desktop' });
	await expect(sidebar).toBeVisible();
	const main = page.locator('main#konten');
	const rect = await main.boundingBox();
	expect(rect?.x).toBeGreaterThanOrEqual(230);
	expect(rect?.width).toBeGreaterThan(1000);
});

test.describe('static HTML without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('ships all 22 bab and eleven header forms without client JavaScript', async ({
		page
	}) => {
		await page.goto('/rujukan/');
		const table = page.getByRole('region', {
			name: 'Tabel tashrif istilahi: bab di kiri, bentuk dari kanan ke kiri'
		});
		await expect(table.locator('tbody tr')).toHaveCount(22);
		await expect(table.getByRole('columnheader', { name: 'fi’il madhi' })).toHaveCount(1);
	});
});
