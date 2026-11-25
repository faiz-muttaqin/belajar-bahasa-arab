import { expect, test } from '@playwright/test';

test.describe('CB-02 without JavaScript', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 800 } });

	test('links the optional branch to the two readings and native answer disclosure', async ({
		page
	}) => {
		await page.goto('/belajar/#branch-shalat-variants');
		const branch = page.locator('#branch-shalat-variants');
		await expect(branch).toContainText('Cabang opsional');
		await branch.getByRole('link', { name: 'Latihan varian tasyahud' }).click();

		await expect(page).toHaveURL(/\/belajar\/varian-tasyahud\/$/);
		await expect(page).toHaveTitle(/Bandingkan dua riwayat tasyahud/);
		await expect(page.getByText(/Draf bersumber/)).toBeVisible();
		const ibnAbbas = page.locator('article').filter({ hasText: 'Tasyahud riwayat Ibnu Abbas' });
		await expect(
			ibnAbbas.locator('p[lang="ar"][dir="rtl"]').first().getByText('الْمُبَارَكَاتُ')
		).toHaveClass(/font-bold/);
		await expect(ibnAbbas.getByRole('link', { name: 'Sahih Muslim 403a' })).toHaveAttribute(
			'href',
			'https://sunnah.com/muslim:403a'
		);
		await expect(ibnAbbas.getByRole('link', { name: 'Lafaz lengkap dan glos' })).toHaveAttribute(
			'href',
			'/rujukan/bacaan-shalat/#tasyahud-ibn-abbas'
		);

		const first = page.locator('#latihan ol > li').first();
		await first.getByText('Lihat alasan', { exact: true }).click();
		await expect(first.getByText('Yang diberkahi.', { exact: true })).toBeVisible();
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
			375
		);
	});
});

test('checks a choice, explains the word, and advances to the other riwayat', async ({ page }) => {
	await page.goto('/belajar/varian-tasyahud/#latihan');
	const quiz = page.getByRole('region', { name: 'Latihan makna' });
	await quiz.getByRole('radio', { name: 'Segala shalat', exact: true }).check();
	await quiz.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(quiz.getByText('Belum tepat. Yang diberkahi.')).toBeVisible();
	await expect(quiz.getByRole('link', { name: /Sahih Muslim 403a/ })).toBeVisible();
	await quiz.getByRole('button', { name: 'Coba contoh baru' }).click();
	await quiz.getByRole('radio', { name: 'Hamba-Nya', exact: true }).check();
	await quiz.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(quiz.getByText('Tepat. Hamba-Nya.')).toBeVisible();
	await expect(quiz.getByRole('link', { name: /Sahih al-Bukhari 831/ })).toBeVisible();
});
