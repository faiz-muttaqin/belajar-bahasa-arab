import { expect, test } from '@playwright/test';

test('RM-04 optional Iqra marks and completion persist without changing the main position', async ({
	page
}) => {
	await page.goto('/belajar/');
	const foundation = page.locator('#step-a1');
	const mainPosition = page.getByRole('link', { name: 'Ke posisi saya' });
	await expect(foundation.locator('[data-step-status]')).toContainText('Belum dimulai');
	await foundation.getByRole('button', { name: 'Sedang saya pelajari' }).click();
	await expect(foundation.locator('[data-step-status]')).toContainText('Sedang dipelajari');
	await expect(mainPosition).toHaveAttribute('href', '#step-u1');
	await page.reload();
	await expect(foundation.locator('[data-step-status]')).toContainText('Sedang dipelajari');
	await foundation.getByRole('button', { name: 'Hapus tanda' }).click();
	await expect(foundation.locator('[data-step-status]')).toContainText('Belum dimulai');
	await foundation.locator('[data-map-lesson]').click();
	await page.getByRole('button', { name: 'Tandai selesai', exact: true }).click();
	await expect(page.getByRole('button', { name: 'Pelajaran selesai', exact: true })).toBeDisabled();
	await page.goto('/belajar/');
	await expect(foundation.locator('[data-step-status]')).toContainText('Selesai');
	await expect(mainPosition).toHaveAttribute('href', '#step-u1');
	await page.goto('/progres/');
	const mainCoverage = page.getByRole('list', { name: 'Daftar cakupan langkah tiap tahap' });
	await expect(mainCoverage.locator('[data-coverage-stage="stage-1"]')).toContainText(
		'0 dari 1 langkah selesai'
	);
	await expect(mainCoverage).not.toContainText('Tahap 0');
});

test('RM-04 map marks persist, synchronize to other tabs and keep resume separate', async ({
	page,
	context
}) => {
	await page.goto('/belajar/');
	const first = page.locator('#step-u1');
	await expect(first.locator('[data-step-status]')).toContainText('Belum dimulai');
	await expect(page.getByRole('link', { name: 'Ke posisi saya' })).toHaveAttribute(
		'href',
		'#step-u1'
	);

	const secondTab = await context.newPage();
	try {
		await secondTab.goto('/belajar/');
		await expect(secondTab.locator('#step-u1 [data-step-status]')).toContainText('Belum dimulai');
		await first.getByRole('button', { name: 'Saya sudah bisa, lewati' }).click();
		await expect(first.locator('[data-step-status]')).toContainText('Dilewati, belum ada bukti');
		await expect(secondTab.locator('#step-u1 [data-step-status]')).toContainText('Dilewati');
		await expect(page.getByRole('link', { name: 'Ke posisi saya' })).toHaveAttribute(
			'href',
			'#step-u2'
		);
		await page.goto('/progres/');
		await expect(page.getByRole('region', { name: 'Posisi di peta belajar' })).toContainText(
			'Tahap 2'
		);
		await expect(
			page.locator('[data-coverage-stage="stage-1"] [data-coverage-label]')
		).toContainText('1 dilewati');
		await expect(page.getByRole('link', { name: 'Lanjut belajar' })).toHaveCount(0);

		await page.goto('/belajar/');
		await first.getByRole('button', { name: 'Sedang saya pelajari' }).click();
		await expect(first.locator('[data-step-status]')).toContainText('Sedang dipelajari');
		await first.getByRole('button', { name: 'Hapus tanda' }).click();
		await expect(first.locator('[data-step-status]')).toContainText('Belum dimulai');
		await page.reload();
		await expect(first.locator('[data-step-status]')).toContainText('Belum dimulai');
	} finally {
		await secondTab.close();
	}
});

test('RM-04 upgrades IndexedDB v1 in place and retains completed lessons', async ({ page }) => {
	await page.goto('/belajar/');
	await expect(page.locator('#step-u1 [data-step-status]')).toContainText('Belum dimulai');
	await page.evaluate(async () => {
		const name = 'belajar-bahasa-arab-progres';
		await new Promise<void>((resolve, reject) => {
			const request = indexedDB.deleteDatabase(name);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
			request.onblocked = () => reject(new Error('Blocked deleting test database'));
		});
		await new Promise<void>((resolve, reject) => {
			const request = indexedDB.open(name, 1);
			request.onupgradeneeded = () =>
				request.result.createObjectStore('lessons', { keyPath: 'lessonId' });
			request.onerror = () => reject(request.error);
			request.onsuccess = () => {
				const database = request.result;
				const transaction = database.transaction('lessons', 'readwrite');
				transaction.objectStore('lessons').put({
					lessonId: 'lesson-u1-01',
					contentRevision: 1,
					lastOpenedAt: 100,
					completedRevision: 1
				});
				transaction.oncomplete = () => {
					database.close();
					resolve();
				};
				transaction.onabort = () => {
					database.close();
					reject(transaction.error);
				};
			};
		});
	});
	await page.reload();
	await expect(page.locator('#step-u1 [data-step-status]')).toContainText('Selesai');
	await expect(page.getByRole('link', { name: 'Ke posisi saya' })).toHaveAttribute(
		'href',
		'#step-u2'
	);
	const snapshot = await page.evaluate(
		() =>
			new Promise<{ version: number; stores: string[] }>((resolve, reject) => {
				const request = indexedDB.open('belajar-bahasa-arab-progres');
				request.onerror = () => reject(request.error);
				request.onsuccess = () => {
					const database = request.result;
					resolve({ version: database.version, stores: [...database.objectStoreNames] });
					database.close();
				};
			})
	);
	expect(snapshot).toEqual({ version: 3, stores: ['attempts', 'lessons', 'marks'] });
	await page.goto('/progres/');
	await expect(page.getByRole('link', { name: 'Lanjut belajar' })).toHaveAttribute(
		'href',
		/\/belajar\/menunjuk-dan-bertanya\/$/
	);
});

test('RM-04 schema 1 import and latest-mark schema 2 import work across devices', async ({
	page,
	browser,
	baseURL
}) => {
	await page.goto('/belajar/');
	await page.locator('#step-u1').getByRole('button', { name: 'Saya sudah bisa, lewati' }).click();
	await expect(page.locator('#step-u1 [data-step-status]')).toContainText('Dilewati');
	await page.goto('/progres/');
	await page.getByText('Cadangan progres', { exact: true }).click();
	const [download] = await Promise.all([
		page.waitForEvent('download'),
		page.getByRole('button', { name: 'Ekspor progres' }).click()
	]);
	const { readFile } = await import('node:fs/promises');
	const backup = JSON.parse(await readFile(await download.path(), 'utf8'));
	expect(backup).toMatchObject({
		schemaVersion: 2,
		lessons: [],
		marks: [{ stepId: 'step-u1', mark: 'skipped' }],
		attempts: []
	});

	const other = await browser.newContext({ baseURL });
	try {
		const otherPage = await other.newPage();
		await otherPage.goto('/progres/');
		await otherPage.getByText('Cadangan progres', { exact: true }).click();
		const input = otherPage.locator('input[type=file]');
		const legacy = {
			schemaVersion: 1,
			lessons: [
				{ lessonId: 'lesson-u1-01', contentRevision: 1, lastOpenedAt: 100, completedRevision: 1 }
			]
		};
		await input.setInputFiles({
			name: 'v1.json',
			mimeType: 'application/json',
			buffer: Buffer.from(JSON.stringify(legacy))
		});
		await expect(otherPage.getByRole('link', { name: 'Lanjut belajar' })).toHaveAttribute(
			'href',
			/\/belajar\/menunjuk-dan-bertanya\/$/
		);
		await input.setInputFiles({
			name: 'v2.json',
			mimeType: 'application/json',
			buffer: Buffer.from(JSON.stringify(backup))
		});
		const skipped = otherPage.locator('[data-coverage-stage="stage-1"] [data-coverage-label]');
		await expect(skipped).toContainText('1 dilewati');
		await otherPage.reload();
		await expect(skipped).toContainText('1 dilewati');
	} finally {
		await other.close();
	}
});

test('RM-04 disabled IndexedDB leaves static roadmap and lessons accessible', async ({ page }) => {
	await page.addInitScript(() => {
		Object.defineProperty(window, 'indexedDB', {
			get: () => {
				throw new DOMException('Blocked', 'SecurityError');
			}
		});
	});
	await page.goto('/belajar/');
	await expect(page.getByRole('status')).toContainText(
		'Penyimpanan di perangkat ini tidak tersedia'
	);
	await expect(page.getByRole('button', { name: 'Saya sudah bisa, lewati' })).toHaveCount(0);
	await expect(page.locator('[data-map-lesson]')).toHaveCount(29);
	await page.locator('#step-u1 [data-map-lesson]').click();
	await expect(page).toHaveURL(/\/belajar\/kata-inti-shalat\/$/);
});
