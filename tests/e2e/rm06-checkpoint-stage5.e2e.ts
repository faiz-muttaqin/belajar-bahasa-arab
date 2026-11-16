import { expect, test } from '@playwright/test';

test('RM-06 stage 5 records three reading-transfer skills independently', async ({ page }) => {
	await page.goto('/belajar/');
	await page.locator('#stage-5').getByRole('link', { name: /mulai titik cek/i }).click();
	await expect(
		page.getByRole('heading', { name: 'Baca hubungan, gagasan, dan struktur teks' })
	).toBeVisible();

	const scenarios = [
		{ section: '#hubungan-antar-kalimat', answer: 'Angin bertiup kencang' },
		{ section: '#gagasan-utama-bacaan', answer: 'Siswa merawat kebun sayur sekolah' },
		{ section: '#struktur-dokumen', answer: 'Jam layanan ditambah pada Senin' }
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
	for (const [step, competency] of [
		['Hubungan antarkalimat', 'CB-22'],
		['Gagasan utama paragraf', 'CB-23'],
		['Struktur dokumen pendek', 'CB-24']
	] as const) {
		await page.getByRole('button', { name: `Rincian langkah: ${step}` }).click();
		await expect(page.getByRole('dialog').locator(`[data-competency-level="${competency}"]`))
			.toContainText('Bisa pada contoh baru');
		await page.getByRole('dialog').getByRole('button', { name: /tutup/i }).click();
	}
});

test('RM-06 Stage 5 is readable as prerendered Arabic without JS', async ({ page }) => {
	await page.route('**/*', (route) =>
		route.request().resourceType() === 'script' ? route.abort() : route.continue()
	);
	await page.goto('/belajar/checkpoint-5/');
	await expect(
		page.getByRole('heading', { name: 'Baca hubungan, gagasan, dan struktur teks' })
	).toBeVisible();
	await expect(page.getByText('أَغْلَقَ سَامِي النَّافِذَةَ لِأَنَّ الرِّيحَ قَوِيَّةٌ.')).toBeVisible();
	await expect(page.getByText('زَرَعَ الطُّلَّابُ خَضْرَوَاتٍ فِي حَدِيقَةِ الْمَدْرَسَةِ.', { exact: false }).first()).toBeVisible();
	await expect(page.getByText('كَانَتِ الْعِيَادَةُ تُغْلِقُ قَبْلَ وَصُولِ بَعْضِ الْمَرْضَى.', { exact: false }).first()).toBeVisible();
});
