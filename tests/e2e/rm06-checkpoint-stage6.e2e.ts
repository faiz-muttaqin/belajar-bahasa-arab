import { expect, test } from '@playwright/test';

test('RM-06 Stage 6 answers support both independent reading evidence skills', async ({ page }) => {
	await page.goto('/belajar/');
	await page
		.locator('#stage-6')
		.getByRole('link', { name: /mulai titik cek/i })
		.click();
	await expect(page.getByRole('heading', { name: 'Uji pemahaman dokumen baru' })).toBeVisible();

	const scenarios = [
		{
			section: '#integrasi-dokumen',
			answer: 'Kunjungan keluarga gratis Jumat, Sabtu belum dijelaskan'
		},
		{
			section: '#ringkas-dokumen',
			answer: 'Kelas dipindahkan ke aula kedua karena aula pertama terpakai'
		}
	] as const;

	for (const { section, answer } of scenarios) {
		const practice = page.locator(section).getByRole('region', { name: 'Latihan makna' });
		await expect(practice).toContainText('Soal 1 dari 20');
		await practice.getByRole('radio', { name: answer, exact: true }).check();
		await practice.getByRole('button', { name: 'Cek jawaban' }).click();
		await expect(practice.getByRole('status')).toContainText('Naik ke Bisa pada contoh baru');
		await practice.getByRole('button', { name: 'Coba contoh baru' }).click();
		await expect(practice).toContainText('Soal 2 dari 20');
	}

	await page.goto('/belajar/');
	await page.getByRole('button', { name: 'Rincian langkah: Uji membaca dokumen' }).click();
	const dialog = page.getByRole('dialog');
	await expect(dialog.locator('[data-competency-level="CB-21"]')).toContainText(
		'Bisa pada contoh baru'
	);
	await expect(dialog.locator('[data-competency-level="CB-24"]')).toContainText(
		'Bisa pada contoh baru'
	);
});

test('RM-06 Stage 6 publishes directly readable static Arabic without JavaScript', async ({
	page
}) => {
	await page.route('**/*', (route) =>
		route.request().resourceType() === 'script' ? route.abort() : route.continue()
	);
	await page.goto('/belajar/checkpoint-6/');
	await expect(page.getByRole('heading', { name: 'Uji pemahaman dokumen baru' })).toBeVisible();
	await expect(
		page.getByText('أَعْلَنَ الْمَتْحَفُ أَنَّ زِيَارَةَ الْأُسَرِ سَتَكُونُ مَجَّانِيَّةً', { exact: false }).first()
	).toBeVisible();
	await expect(
		page.getByText('أَرَادَ الْمُدَرِّسُ اسْتِخْدَامَ الْقَاعَةِ الْأُولَى.', { exact: false }).first()
	).toBeVisible();
});
