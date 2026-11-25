import { expect, test, type Page } from '@playwright/test';

/** Stage 2 has three steps: step-u2, step-u3-01 and step-u3-02. */
async function seedProgress(page: Page) {
	await page.goto('/progres/');
	await expect(page.locator('[data-roadmap-coverage="ready"]')).toBeVisible();
	await page.evaluate(
		() =>
			new Promise<void>((resolve, reject) => {
				const request = indexedDB.open('belajar-bahasa-arab-progres');
				request.onerror = () => reject(request.error);
				request.onsuccess = () => {
					const db = request.result;
					const tx = db.transaction(['lessons', 'marks', 'attempts'], 'readwrite');
					tx.objectStore('lessons').put({
						lessonId: 'lesson-u2-01',
						contentRevision: 1,
						completedRevision: 1,
						lastOpenedAt: 100
					});
					tx.objectStore('lessons').put({
						lessonId: 'lesson-u3-02',
						contentRevision: 1,
						lastOpenedAt: 101
					});
					tx.objectStore('marks').put({ stepId: 'step-u3-01', mark: 'skipped', at: 102 });
					tx.objectStore('attempts').put({
						id: 'seeded-answer-1',
						itemId: 'u1-rabbi-meaning',
						lessonId: 'lesson-u1-01',
						contentRevision: 1,
						competencyIds: ['CB-01'],
						skill: 'meaning',
						outcome: 'correct',
						assisted: false,
						selfAssessed: false,
						seenWhileAuthoring: false,
						at: 103
					});
					tx.oncomplete = () => {
						db.close();
						resolve();
					};
					tx.onabort = () => {
						db.close();
						reject(tx.error);
					};
				};
			})
	);
	await page.reload();
	await expect(page.locator('[data-roadmap-coverage="ready"]')).toBeVisible();
}

test('VP-04 shows no evidence and no inflated coverage on a fresh device', async ({ page }) => {
	await page.goto('/progres/');
	const coverage = page.locator('[data-roadmap-coverage="ready"]');
	await expect(coverage).toBeVisible();
	await expect(
		coverage.locator('[data-coverage-stage="stage-2"] [data-coverage-label]')
	).toHaveText('0 dari 3 langkah selesai');
	await expect(coverage.locator('[data-coverage-stage="stage-iqra"]')).toHaveCount(0);
	const evidence = page.locator('[data-roadmap-evidence="ready"]');
	await expect(evidence.locator('[data-evidence-empty]')).toHaveText('Belum ada bukti latihan.');
	await expect(evidence.locator('[data-evidence-row="stage-2"]')).toContainText(
		'Belum ada bukti latihan'
	);
	await expect(page.getByText('%')).toHaveCount(0);
});

test('VP-04 draws bars, labels and an equivalent table from stored progress', async ({ page }) => {
	await seedProgress(page);
	const coverage = page.locator('[data-roadmap-coverage="ready"]');
	const stage = coverage.locator('[data-coverage-stage="stage-2"]');
	await expect(stage.locator('[data-coverage-label]')).toHaveText(
		'1 dari 3 langkah selesai · 1 dilewati'
	);
	await expect(stage).toContainText(
		'Belum dimulai: 0 · Sedang dipelajari: 1 · Selesai: 1 · Dilewati: 1'
	);
	await expect(stage.locator('.coverage-segment')).toHaveCount(3);
	await expect(stage.locator('.coverage-not_started')).toHaveCount(0);
	const bar = await stage.locator('.coverage-bar').boundingBox();
	expect(bar?.height).toBeGreaterThan(8);
	await expect(coverage.locator('[data-coverage-summary]')).toContainText(
		/^Di jalur utama, 1 dari \d+ langkah selesai, 1 sedang dipelajari, 1 dilewati, dan \d+ belum dimulai\.$/
	);

	const cells = await coverage.locator('[data-coverage-row="stage-2"] td').allTextContents();
	expect(cells).toEqual(['0', '1', '1', '1', '3']);
	const total = coverage.locator('[data-coverage-row="total"] td');
	const stages = await coverage.locator('[data-coverage-stage]').count();
	expect(stages).toBeGreaterThanOrEqual(6);
	const totalCounts = (await total.allTextContents()).map(Number);
	expect(totalCounts.slice(0, 4).reduce((sum, value) => sum + value, 0)).toBe(totalCounts[4]);

	const outside = coverage.locator('[data-coverage-outside]');
	await expect(outside).toContainText('Iqra (opsional)');
	await expect(outside).toContainText('direncanakan, belum tersedia');
	await expect(coverage.getByRole('table')).toContainText('Jalur utama');
});

test('VP-04 evidence comes from answers only and labels what it is not', async ({ page }) => {
	await seedProgress(page);
	const evidence = page.locator('[data-roadmap-evidence="ready"]');
	await expect(evidence.locator('[data-evidence-empty]')).toHaveCount(0);
	await expect(evidence.locator('[data-evidence-row="stage-1"]')).toContainText(
		'1 dari 1 kemampuan sudah punya jawaban latihan: 0 Mengenal, 1 Paham pada contoh, 0 Bisa pada contoh baru.'
	);
	// Stage 2 has a completed, a skipped and an opened step but no stored answer.
	await expect(evidence.locator('[data-evidence-row="stage-2"]')).toContainText(
		'Belum ada bukti latihan'
	);
	const row = await evidence.locator('[data-evidence-table-row="stage-2"] td').allTextContents();
	// Cells: abilities, no evidence, Mengenal, Paham pada contoh, Bisa pada contoh baru, ...
	expect(row.slice(2, 5)).toEqual(['0', '0', '0']);
	expect(row[1]).toBe(row[0]);
	await expect(evidence).toContainText(
		'Membuka, menyelesaikan, atau melewati langkah tidak menaikkan'
	);
});

test('VP-04 does not show zeros before IndexedDB is read when storage is unavailable', async ({
	page
}) => {
	await page.addInitScript(() => {
		Object.defineProperty(window, 'indexedDB', {
			get: () => {
				throw new DOMException('Blocked', 'SecurityError');
			}
		});
	});
	await page.goto('/progres/');
	const coverage = page.locator('[data-roadmap-coverage="unavailable"]');
	await expect(coverage).toContainText('status langkah tidak bisa dibaca');
	await expect(coverage.locator('[data-coverage-static] li').first()).toContainText('langkah');
	await expect(coverage.locator('[data-coverage-label]')).toHaveCount(0);
	await expect(coverage.getByRole('table')).toHaveCount(0);
	await expect(page.locator('[data-roadmap-evidence="unavailable"]')).toContainText(
		'tidak bisa dibaca'
	);
});

test.describe('VP-04 without JavaScript', () => {
	test.use({ javaScriptEnabled: false });
	test('shows the static stage structure and says status comes from this device', async ({
		page
	}) => {
		await page.goto('/progres/');
		const coverage = page.locator('[data-roadmap-coverage="pending"]');
		await expect(coverage).toContainText('Status langkah dibaca dari perangkat ini');
		// Browsers with scripting off render the <noscript> note; check it in the served HTML.
		const html = await (await page.request.get('/progres/')).text();
		expect(html).toContain('Aktifkan JavaScript untuk membaca status langkah');
		await expect(coverage.locator('[data-coverage-static] li')).toHaveCount(6);
		await expect(coverage.locator('[data-coverage-static]')).toContainText(
			'Tahap 2 · Benda dan pertanyaan: 3 langkah'
		);
		await expect(coverage.locator('[data-coverage-label]')).toHaveCount(0);
		await expect(coverage.getByRole('table')).toHaveCount(0);
		await expect(coverage).not.toContainText('langkah selesai');
		const evidence = page.locator('[data-roadmap-evidence="pending"]');
		await expect(evidence).toContainText('belum ada angka bukti latihan');
		await expect(evidence.locator('[data-evidence-static] li')).toHaveCount(6);
		await expect(evidence.locator('[data-evidence-empty]')).toHaveCount(0);
	});
});

for (const width of [320, 390, 768, 1440]) {
	test(`VP-04 fits without sideways page scrolling at ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await seedProgress(page);
		const coverage = page.locator('[data-roadmap-coverage="ready"]');
		await expect(coverage.locator('[data-coverage-stage="stage-2"] .coverage-bar')).toBeVisible();
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth
		);
		expect(overflow).toBeLessThanOrEqual(0);
		// The wide tables scroll inside their own focusable region.
		await expect(
			page.getByRole('region', { name: 'Tabel cakupan langkah per tahap' })
		).toHaveAttribute('tabindex', '0');
	});
}
