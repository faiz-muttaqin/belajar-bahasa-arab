import { expect, test } from '@playwright/test';

const columns = [
	'madhi',
	'mudhari',
	'mashdar',
	'mimi',
	'fail',
	'maful',
	'amr',
	'nahy',
	'zaman',
	'makan',
	'alah'
] as const;

test('F-16 matrix makes all 11 headings direct links to detail pages', async ({ page }) => {
	await page.goto('/rujukan/fiil/');
	const table = page.locator('#tashrif-matrix');
	const links = table.locator('thead th a[href*="/rujukan/bentuk/"]');
	await expect(links).toHaveCount(11);
	for (const key of columns) {
		await expect(table.locator('thead th a[href$="/rujukan/bentuk/' + key + '/"]')).toHaveCount(1);
	}
	await table.locator('thead th a[href$="/rujukan/bentuk/fail/"]').click();
	await expect(page).toHaveURL(/\/rujukan\/bentuk\/fail\/$/);
	await expect(page.getByRole('heading', { level: 1, name: 'Isim fā‘il' })).toBeVisible();
	await expect(page.locator('body')).toContainText('كَاتِبٌ');
	await expect(
		page.getByRole('heading', { name: 'Isim fā‘il berbeda dari subjek nahwu' })
	).toBeVisible();
	await page.getByRole('link', { name: 'Isim maf‘ūl' }).click();
	await expect(page).toHaveURL(/\/rujukan\/bentuk\/maful\/$/);
});

test('F-16 fallback reference-table form row labels also navigate to the same detail', async ({
	page
}) => {
	await page.goto('/rujukan/fiil/');
	const section = page.getByText('Contoh per bab dan mode hafalan', { exact: true });
	await section.click();
	const details = page.locator('details').filter({ has: section });
	await details
		.locator('tbody tr[id="tashrif-contoh-madhi"] a[href$="/rujukan/bentuk/madhi/"]')
		.click();
	await expect(page).toHaveURL(/\/rujukan\/bentuk\/madhi\/$/);
	await expect(page.locator('#contoh-bentuk').getByText('كَتَبْتُ', { exact: true })).toBeVisible();
});

test('F-16 detailed isim classification covers distinct axes and links to forms', async ({
	page
}) => {
	await page.goto('/rujukan/istilah/isim/');
	const guide = page.locator('[data-classification="isim"]');
	await expect(guide).toBeVisible();
	await expect(
		guide.getByRole('heading', { name: '1. Berdasarkan arti dan jenis rujukan' })
	).toBeVisible();
	await expect(
		guide.getByRole('heading', { name: '2. Berdasarkan asal dan pembentukan kata' })
	).toBeVisible();
	await expect(
		guide.getByRole('heading', { name: '3. Berdasarkan ketentuan rujukan' })
	).toBeVisible();
	await expect(
		guide.getByRole('heading', { name: '4. Berdasarkan gender, jumlah dan i‘rab' })
	).toBeVisible();
	await expect(guide).toContainText('Isim maf‘ūl');
	await guide.getByRole('link', { name: 'Pelajari bentuk ini lebih lanjut' }).first().click();
	await expect(page).toHaveURL(/\/rujukan\/bentuk\/mashdar\/$/);
	await expect(page.getByRole('heading', { level: 1, name: 'Maṣdar' })).toBeVisible();
});

test('F-16 separates three verb forms from prohibition, weak roots and voice', async ({ page }) => {
	await page.goto('/rujukan/istilah/fiil/');
	const guide = page.locator('[data-classification="fiil"]');
	await expect(guide).toContainText('Nahy (larangan)');
	await expect(guide).toContainText('Mu‘tal ajwaf');
	await expect(guide).toContainText('Majhūl (pasif)');
	await expect(guide).toContainText('Manṣūb');
	await guide.getByRole('link', { name: 'Pelajari bentuk ini lebih lanjut' }).nth(3).click();
	await expect(page).toHaveURL(/\/rujukan\/bentuk\/nahy\/$/);
	await expect(page.locator('body')).toContainText('bukan kategori kala fi‘il keempat');
});

test.describe('F-16 full reference remains readable without JavaScript', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

	for (const path of ['bentuk/amr', 'istilah/isim', 'istilah/fiil']) {
		test(`isolates Arabic within Indonesian explanations at ${path}`, async ({ page }) => {
			await page.goto(`/rujukan/${path}/`);
			const unmarked = await page
				.locator('[data-morphology-guide], [data-classification]')
				.evaluate((element) => {
					const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
					const missing: string[] = [];
					while (walker.nextNode()) {
						const node = walker.currentNode;
						if (
							/[\u0600-\u06ff]/u.test(node.textContent ?? '') &&
							!node.parentElement?.closest('[lang="ar"][dir="rtl"]')
						) {
							missing.push(node.textContent ?? '');
						}
					}
					return missing;
				});
			expect(unmarked).toEqual([]);
		});
	}

	test('prerenders form content, in-page toc, sources and related links', async ({ page }) => {
		await page.goto('/rujukan/bentuk/zaman/');
		await expect(page.getByRole('heading', { level: 1, name: 'Isim zamān' })).toBeVisible();
		await expect(page.getByText('مَوْعِدٌ', { exact: true })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Isim makān', exact: true })).toBeVisible();
		await expect(page.getByText('Sumber untuk audit dan penjelasan lanjut')).toBeVisible();
		const size = await page.evaluate(() => ({
			width: document.documentElement.clientWidth,
			scroll: document.documentElement.scrollWidth
		}));
		expect(size.scroll).toBeLessThanOrEqual(size.width);
	});

	test('navigates from static tashrif header to generated explanation', async ({ page }) => {
		await page.goto('/rujukan/fiil/');
		const link = page.locator('#tashrif-matrix thead a[href$="/rujukan/bentuk/alah/"]');
		await expect(link).toHaveCount(1);
		await link.click();
		await expect(page).toHaveURL(/\/rujukan\/bentuk\/alah\/$/);
		await expect(page.getByRole('heading', { level: 1, name: 'Isim ālah (alat)' })).toBeVisible();
	});

	test('renders classification axes without requiring dialogs', async ({ page }) => {
		await page.goto('/rujukan/istilah/isim/');
		await expect(page.locator('[data-classification="isim"]')).toContainText('Isim tafḍīl');
		await expect(page.locator('[data-classification="isim"]')).toContainText(
			'Ma‘rifah melalui iḍāfah'
		);
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
			375
		);
	});
});
