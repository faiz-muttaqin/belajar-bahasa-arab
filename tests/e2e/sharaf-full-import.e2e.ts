import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('the deployed static lexicon contains 7,938 unique verb combinations', async ({ request }) => {
	const response = await request.get('/data/sharaf-lexicon-v1.json');
	expect(response.ok()).toBe(true);
	const bulk = await response.json();
	expect(bulk.schema).toBe(1);
	expect(bulk.license).toBe('GPL-2.0');
	expect(bulk.totals).toMatchObject({
		qutrub: 7889,
		arramooz: 7952,
		uniqueVerbs: 7938,
		stopwordRecords: 596
	});
	expect(bulk.verbs).toHaveLength(7938);
	const license = await readFile('data/sharaf-upstream/GPL-2.0.txt', 'utf8');
	expect(license).toContain('GNU GENERAL PUBLIC LICENSE');
});

test('the modal lists thousands of words but renders only the rows in view', async ({ page }) => {
	await page.goto('/rujukan/fiil/#tashrif-istilahi');
	await page.getByRole('button', { name: 'Cari kata atau arti Indonesia' }).click();
	const modal = page.getByRole('dialog', { name: 'Kamus dan penjelasan sharaf' });
	await expect
		.poll(
			async () => {
				const raw = await modal.getByText(/contoh kata tersedia/).textContent();
				return Number(raw?.match(/[\d.]+/)?.[0].replace(/\./g, '') ?? 0);
			},
			{ timeout: 30_000 }
		)
		.toBeGreaterThan(12_000);
	// Windowed list: thousands of words, a few dozen DOM rows.
	expect(await modal.getByRole('listitem').count()).toBeLessThanOrEqual(60);
	await modal.getByRole('searchbox', { name: 'Cari Arab atau Indonesia' }).fill('آبَ');
	await expect(modal.getByText('آبَ', { exact: true }).first()).toBeVisible();
	await modal.getByRole('button', { name: 'Gunakan' }).first().click();
	await expect(modal).toBeHidden();
	await expect(page.locator('#tashrif-matrix tbody tr').first()).toContainText('آبَ');
});

test('the modal covers mazid bab and shows Indonesian meanings with their source', async ({
	page
}) => {
	await page.goto('/rujukan/fiil/#tashrif-istilahi');
	await page.getByRole('button', { name: 'Cari kata atau arti Indonesia' }).click();
	const modal = page.getByRole('dialog', { name: 'Kamus dan penjelasan sharaf' });
	await expect(modal.getByText(/contoh kata tersedia/)).toContainText(/1\d\.\d{3}/, {
		timeout: 30_000
	});
	await modal.getByLabel('Batasi ke bab').selectOption('15');
	await expect(modal.getByText(/contoh kata tersedia/)).toContainText('319');
	await modal.getByRole('searchbox', { name: 'Cari Arab atau Indonesia' }).fill('اسْتَخْرَجَ');
	const card = modal.getByRole('listitem').first();
	await expect(card).toContainText('terjemahan Claude');
});

test('the full dataset is persisted under an IndexedDB v2 store, not a second database', async ({
	page
}) => {
	await page.goto('/sharaf/');
	await expect
		.poll(
			() =>
				page.evaluate(async () => {
					const matches = await indexedDB.databases();
					const own = matches.find((item) => item.name === 'belajar-bahasa-arab-materi');
					if (!own || (own.version ?? 0) < 2) return false;
					return new Promise<boolean>((resolve) => {
						const request = indexedDB.open('belajar-bahasa-arab-materi');
						request.onerror = () => resolve(false);
						request.onsuccess = () => {
							const db = request.result;
							if (!db.objectStoreNames.contains('sharaf-lexicon')) {
								db.close();
								resolve(false);
								return;
							}
							const lookup = db
								.transaction('sharaf-lexicon', 'readonly')
								.objectStore('sharaf-lexicon')
								.get('active');
							lookup.onerror = () => {
								db.close();
								resolve(false);
							};
							lookup.onsuccess = () => {
								const value = lookup.result;
								db.close();
								resolve(value?.totals?.uniqueVerbs === 7938);
							};
						};
					});
				}),
			{ timeout: 30_000 }
		)
		.toBe(true);
});

test('sitewide search includes corpus-only words and can open the corresponding lemma', async ({
	page
}) => {
	await page.goto('/cari/?jenis=word&q=آب');
	await expect(page.getByText('7.938 entri verba leksikal tersedia.')).toBeVisible({
		timeout: 30_000
	});
	const link = page.locator('a[href*="sharaf/#bulk-qutrub-t278-bab-1"]');
	await expect(link).toBeVisible();
	await link.click();
	await expect(page.locator('#bulk-qutrub-t278-bab-1')).toContainText('آبَ');
});
