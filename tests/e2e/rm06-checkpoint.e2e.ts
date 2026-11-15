import { expect, test } from '@playwright/test';

test('RM-06 stage 3 checkpoint is reachable and publishes 24 distinct questions', async ({
	page
}) => {
	await page.goto('/belajar/');
	const checkpoint = page.locator('#stage-3').getByRole('link', { name: /mulai titik cek/i });
	await expect(checkpoint).toBeVisible();
	await checkpoint.click();
	await expect(page.getByRole('heading', { name: 'Tempat, milik dan kata ganti' })).toBeVisible();
	const group = page.getByRole('region', { name: 'Kata ganti dan lokasi' });
	await group.getByRole('radio', { name: 'Di atas meja' }).check();
	await group.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(group.getByRole('status')).toContainText('Naik ke Bisa pada contoh baru');
	await group.getByRole('button', { name: 'Coba contoh baru' }).click();
	await expect(group).toContainText('Soal 2 dari 8');
	await page.goto('/belajar/');
	await page.getByRole('button', { name: 'Rincian langkah: Kata ganti dan lokasi' }).click();
	await expect(page.getByRole('dialog').locator('[data-competency-level="CB-07"]')).toContainText(
		'Bisa pada contoh baru'
	);
});

test('RM-06 checkpoint remains readable without JavaScript', async ({ page }) => {
	await page.route('**/*', (route) => {
		if (route.request().resourceType() === 'script') return route.abort();
		return route.continue();
	});
	await page.goto('/belajar/checkpoint-3/');
	await expect(page.getByRole('heading', { name: 'Tempat, milik dan kata ganti' })).toBeVisible();
	await expect(page.getByText('Soal 1 dari 8')).toHaveCount(0);
	await expect(page.getByText('أَيْنَ الْمِفْتَاحُ؟ هُوَ عَلَى الْمَكْتَبِ.')).toBeVisible();
});
