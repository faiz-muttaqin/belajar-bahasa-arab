import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('static catalogs contain the traced staging preview without fabricated conjugations', async () => {
	const complete = JSON.parse(await readFile('build/data/materi.json', 'utf8'));
	const separate = JSON.parse(await readFile('build/data/sharaf.json', 'utf8'));
	const variants = complete.sharaf.filter(
		(entry: { lemma: string; root?: string }) => entry.lemma === 'كَتَبَ' && entry.root === 'كتب'
	);
	expect(variants.map((entry: { bab: { number: number } }) => entry.bab.number).sort()).toEqual([
		1, 2
	]);
	const preview = complete.sharaf.find(
		(entry: { id: string }) => entry.id === 'ar-verb-992502ac2973cfa7dd'
	);
	expect(preview.forms).toEqual([]);
	expect(preview.meaning).toBe('Arti Indonesia belum tersedia');
	expect(preview.reviewStatus).toBe('draft');
	expect(separate.entries.some((entry: { id: string }) => entry.id === preview.id)).toBe(true);
	expect(
		complete.sharaf.filter((entry: { id: string }) => entry.id.startsWith('ar-function-'))
	).toHaveLength(3);
});

test('background manifest refresh saves the enriched glossary to IndexedDB', async ({ page }) => {
	await page.goto('/sharaf/');
	await expect
		.poll(
			() =>
				page.evaluate(async () => {
					// Do not create an empty v1 database while probing for the application's store.
					const existing = await indexedDB.databases();
					if (!existing.some((db) => db.name === 'belajar-bahasa-arab-materi')) {
						return false;
					}
					return new Promise<boolean>((resolve) => {
						const request = indexedDB.open('belajar-bahasa-arab-materi', 1);
						request.onerror = () => resolve(false);
						request.onsuccess = () => {
							const db = request.result;
							if (!db.objectStoreNames.contains('packages')) {
								db.close();
								resolve(false);
								return;
							}
							const lookup = db
								.transaction('packages', 'readonly')
								.objectStore('packages')
								.get('active');
							lookup.onerror = () => {
								db.close();
								resolve(false);
							};
							lookup.onsuccess = () => {
								const data = lookup.result;
								db.close();
								resolve(
									Boolean(
										data?.sharaf?.some(
											(entry: { id: string }) => entry.id === 'ar-verb-992502ac2973cfa7dd'
										)
									)
								);
							};
						};
					});
				}),
			{ timeout: 25_000 }
		)
		.toBe(true);
});

test('restricted browsers can save the small catalog to localStorage if IndexedDB is blocked', async ({
	page
}) => {
	await page.addInitScript(() => {
		Object.defineProperty(window, 'indexedDB', {
			configurable: true,
			get: () => {
				throw new Error('IndexedDB deliberately unavailable in this test');
			}
		});
	});
	await page.goto('/sharaf/');
	await expect
		.poll(
			() =>
				page.evaluate(() => {
					const backup = localStorage.getItem('belajar-bahasa-arab:materi:v1');
					if (!backup) return false;
					const data = JSON.parse(backup);
					return data.sharaf?.some(
						(entry: { id: string }) => entry.id === 'ar-verb-992502ac2973cfa7dd'
					);
				}),
			{ timeout: 25_000 }
		)
		.toBe(true);
});
