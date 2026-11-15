import { expect, test } from '@playwright/test';

test('RM-06 stage 4 shows two 20-item transfer sets and saves evidence', async ({ page }) => {
	await page.goto('/belajar/');
	await page
		.locator('#stage-4')
		.getByRole('link', { name: /mulai titik cek/i })
		.click();
	await expect(page.getByRole('heading', { name: 'Siapa melakukan apa dan kapan?' })).toBeVisible();
	const actors = page.locator('#pelaku-tindakan').getByRole('region', { name: 'Latihan makna' });
	await expect(actors).toContainText('Soal 1 dari 20');
	await actors.getByRole('radio', { name: 'Penjaga' }).check();
	await actors.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(actors.getByRole('status')).toContainText('Naik ke Bisa pada contoh baru');
	const time = page.locator('#negasi-waktu').getByRole('region', { name: 'Latihan makna' });
	await expect(time).toContainText('Soal 1 dari 20');
	await time.getByRole('radio', { name: 'Kemarin' }).check();
	await time.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(time.getByRole('status')).toContainText('Naik ke Bisa pada contoh baru');
	await page.goto('/belajar/');
	await page.getByRole('button', { name: 'Rincian langkah: Pelaku, tindakan dan waktu' }).click();
	const detail = page.getByRole('dialog');
	await expect(detail.locator('[data-competency-level="CB-14"]')).toContainText(
		'Bisa pada contoh baru'
	);
	await expect(detail.locator('[data-competency-level="CB-15"]')).toContainText(
		'Bisa pada contoh baru'
	);
});

test('RM-06 Stage 4 Arabic, source and explanation are present without JavaScript', async ({
	page
}) => {
	await page.route('**/*', (route) =>
		route.request().resourceType() === 'script' ? route.abort() : route.continue()
	);
	await page.goto('/belajar/checkpoint-4/');
	await expect(page.getByRole('heading', { name: 'Siapa melakukan apa dan kapan?' })).toBeVisible();
	await expect(page.getByText('فَتَحَ الْحَارِسُ الْبَابَ.')).toBeVisible();
	await expect(page.getByText('لَمْ يَكْتُبْ سَامِي الرِّسَالَةَ أَمْسِ.')).toBeVisible();
});
