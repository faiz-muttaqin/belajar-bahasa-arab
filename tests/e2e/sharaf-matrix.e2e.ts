import { expect, test } from '@playwright/test';

test('transposed tashrif starts with six symbolic wazan rows', async ({ page }) => {
	await page.goto('/rujukan/#tashrif-istilahi');
	const table = page
		.getByRole('region', { name: 'Tabel tashrif istilahi: bab di kiri, bentuk dari kanan ke kiri' })
		.locator('table');

	await expect(table.locator('tbody tr')).toHaveCount(6);
	const headers = await table.locator('thead th').allTextContents();
	expect(headers[0]?.trim()).toBe('Bab / kata');
	expect(headers.at(-1)?.trim()).toBe('fi’il madhi');
	await expect(table.locator('tbody tr').first().locator('td').last()).toHaveText('فَعَلَ');
	await expect(table.locator('tbody tr').last().locator('td').last()).toHaveText('فَعُلَ');
});

test('searching existing glossary changes only the selected bab, then restores the wazan', async ({
	page
}) => {
	await page.goto('/rujukan/#tashrif-istilahi');
	const table = page
		.getByRole('region', { name: 'Tabel tashrif istilahi: bab di kiri, bentuk dari kanan ke kiri' })
		.locator('table');
	const rows = table.locator('tbody tr');

	await page.getByRole('searchbox', { name: 'Cari kata atau akar' }).fill('كتب');
	await page.getByRole('button', { name: /كَتَبَ/ }).click();
	await expect(rows.first().locator('td').last()).toHaveText('كَتَبَ');
	await expect(rows.first().locator('td').nth(9)).toHaveText('يَكْتُبُ');
	await expect(rows.first().locator('td').nth(5)).toHaveText('—');
	await expect(rows.nth(1).locator('td').last()).toHaveText('فَعَلَ');

	await rows.first().getByRole('button', { name: 'Kembalikan wazan' }).click();
	await expect(rows.first().locator('td').last()).toHaveText('فَعَلَ');
});

test('the glossary snapshot is served as static JSON', async ({ request }) => {
	const response = await request.get('/data/sharaf.json');
	expect(response.ok()).toBe(true);
	const catalog = await response.json();
	expect(catalog.schema).toBe(1);
	expect(catalog.entries.some((entry: { id: string }) => entry.id === 'fiil-kataba')).toBe(true);
});

test('general search links to a glossary entry and the corresponding tashrif column', async ({
	page
}) => {
	await page.goto('/cari/?jenis=word&q=قول');
	await page.getByRole('link', { name: /قَالَ.*berkata/ }).click();
	await expect(page).toHaveURL(/\/sharaf\/#fiil-qala$/);
	await expect(page.locator('#fiil-qala')).toContainText('Kaidah khusus');

	await page.goto('/cari/?jenis=reference&q=mashdar');
	await page.locator('a[href$="#tashrif-istilahi-mashdar"]').click();
	await expect(page).toHaveURL(/#tashrif-istilahi-mashdar$/);
	await expect(page.locator('#tashrif-istilahi-mashdar')).toHaveText('mashdar');
});

test.describe('static reference without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('contains all bab and morphology headings in the HTML', async ({ page }) => {
		await page.goto('/rujukan/');
		const table = page
			.getByRole('region', {
				name: 'Tabel tashrif istilahi: bab di kiri, bentuk dari kanan ke kiri'
			})
			.locator('table');
		await expect(table.locator('tbody tr')).toHaveCount(6);
		await expect(table.getByRole('columnheader', { name: 'fi’il madhi' })).toHaveCount(1);
	});
});
