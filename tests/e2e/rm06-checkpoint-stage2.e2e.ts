import { expect, test } from '@playwright/test';

test('RM-06 stage 2: checkpoint records answer and shows next of twenty', async ({ page }) => {
	await page.goto('/belajar/');
	const stage = page.locator('#stage-2');
	await stage.getByRole('link', { name: /mulai titik cek/i }).click();
	await expect(page.getByRole('heading', { name: 'Benda dan pertanyaan' })).toBeVisible();
	const group = page.getByRole('region', { name: 'Pertanyaan benda dan orang' });
	await expect(group).toContainText('Soal 1 dari 20');
	await group.getByRole('radio', { name: 'Pena', exact: true }).check();
	await group.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(group.getByRole('status')).toContainText('Bisa pada contoh baru');
	await group.getByRole('button', { name: 'Coba contoh baru' }).click();
	await expect(group).toContainText('Soal 2 dari 20');
	await page.goto('/belajar/');
	await page.getByRole('button', { name: 'Rincian langkah: Menunjuk dan bertanya' }).click();
	await expect(page.getByRole('dialog').locator('[data-competency-level="CB-04"]')).toContainText(
		'Bisa pada contoh baru'
	);
});

test('RM-06 stage 2 is still readable in static HTML without JS', async ({ page }) => {
	await page.route('**/*', (route) =>
		route.request().resourceType() === 'script' ? route.abort() : route.continue()
	);
	await page.goto('/belajar/checkpoint-2/');
	await expect(page.getByRole('heading', { name: 'Benda dan pertanyaan' })).toBeVisible();
	await expect(page.getByText('مَا هَذَا؟ هَذَا قَلَمٌ.')).toBeVisible();
	await expect(page.getByText('الْمِفْتَاحُ صَغِيرٌ.')).toBeVisible();
});
