import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('the build exports a versioned catalog alongside static HTML', async () => {
	const manifest = JSON.parse(await readFile('build/data/manifest.json', 'utf8'));
	const bytes = await readFile('build/data/materi.json');
	const catalog = JSON.parse(bytes.toString('utf8'));
	expect(catalog).toMatchObject({ schemaVersion: 1, version: manifest.version });
	expect(manifest.bytes).toBe(bytes.length);
	expect(
		catalog.lessons.some(({ slug }: { slug: string }) => slug === 'bedah-kalimat-bacaan')
	).toBe(true);
	expect(catalog.vocabulary).not.toHaveLength(0);
	expect(catalog.references.map(({ id }: { id: string }) => id)).toContain('kata-penghubung');
	expect(bytes.toString('utf8')).not.toContain('"reviews":');
});

test('background download enables a fresh offline search and lesson navigation', async ({
	page,
	context
}) => {
	const download = page.waitForResponse(
		(response) => response.url().includes('/data/materi.json?v=') && response.ok()
	);
	await page.goto('/');
	await download;
	await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
	await expect
		.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller)))
		.toBe(true);

	await page.getByRole('link', { name: 'Cari materi', exact: true }).click();
	await expect(page.getByText('Materi tersimpan di perangkat.')).toBeVisible();
	await context.setOffline(true);
	await page.goto('/cari/?jenis=word&q=مفتاح');
	await expect(page.getByText('Materi tersimpan di perangkat.')).toBeVisible();
	await expect(page.getByRole('link', { name: /مِفْتَاحٌ.*Kunci/ }).first()).toBeVisible();
	const input = page.getByRole('searchbox');
	await input.fill('kunci');
	await expect(page.getByRole('link', { name: /مِفْتَاحٌ.*Kunci/ }).first()).toBeVisible();

	await page.getByLabel('Jenis materi').selectOption('lesson');
	await input.fill('Bedah kalimat dalam cerita');
	await page
		.getByRole('link', { name: /Bedah kalimat dalam cerita/ })
		.first()
		.click();
	await expect(page.getByRole('heading', { name: 'Bedah kalimat dalam cerita' })).toBeVisible();
});

test('a broken replacement leaves the last complete catalog searchable', async ({
	page,
	context
}) => {
	await page.goto('/cari/');
	await expect(page.getByText('Materi tersimpan di perangkat.')).toBeVisible();

	await context.route('**/data/manifest.json', (route) =>
		route.fulfill({
			json: { schemaVersion: 1, version: 'a'.repeat(64), bytes: 100 }
		})
	);
	await context.route('**/data/materi.json?*', (route) =>
		route.fulfill({ json: { schemaVersion: 1 } })
	);

	await page.reload();
	await expect(
		page.getByText('Memakai salinan tersimpan. Pembaruan belum tersedia.')
	).toBeVisible();
	await page.getByRole('searchbox').fill('tashrif');
	await page.getByLabel('Jenis materi').selectOption('reference');
	await expect(page.getByRole('link', { name: /Tashrif istilahi/ }).first()).toBeVisible();
});
