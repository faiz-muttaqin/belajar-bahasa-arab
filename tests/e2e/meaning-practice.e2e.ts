import { expect, test } from '@playwright/test';

const shalat = '/belajar/kata-inti-shalat/';

test.describe('latihan makna di ponsel', () => {
	test.use({ viewport: { width: 390, height: 664 }, isMobile: true, hasTouch: true });

	test('gives a reason after the answer, supports a retry, and opens a new example', async ({
		page
	}) => {
		await page.goto(shalat);
		await page.getByRole('link', { name: 'Coba latihan makna' }).tap();
		const practice = page.getByRole('region', { name: 'Latihan makna' });
		const check = practice.getByRole('button', { name: 'Cek jawaban' });
		const reason = practice.getByText(/di akhir menambahkan makna/);
		await expect(check).toBeDisabled();
		await expect(reason).toHaveCount(0);
		await expect(practice.getByRole('button', { name: 'Coba contoh baru' })).toHaveCount(0);

		await practice.getByRole('radio', { name: 'Tuhan kalian', exact: true }).check();
		await check.tap();
		await expect(practice.getByText('Belum tepat. Tuhanku.', { exact: true })).toBeFocused();
		await expect(reason).toBeVisible();
		await practice.getByRole('button', { name: 'Coba lagi' }).tap();
		await expect(check).toBeDisabled();
		await practice.getByRole('radio', { name: 'Tuhanku', exact: true }).check();
		await check.tap();
		await expect(practice.getByText('Tepat. Tuhanku.', { exact: true })).toBeVisible();
		await practice.getByRole('button', { name: 'Coba contoh baru' }).tap();
		await expect(
			practice.getByRole('heading', { name: 'Apa arti kata ini?', exact: true })
		).toBeFocused();
		await expect(practice.getByText('كِتَابِي', { exact: true })).toHaveAttribute('dir', 'rtl');
		await expect(check).toBeDisabled();
		await expect(reason).toHaveCount(0);

		await practice.getByRole('button', { name: 'Belum tahu' }).tap();
		await expect(practice.getByText('Mari lihat polanya. Bukuku.', { exact: true })).toBeVisible();
		await practice.getByRole('button', { name: 'Coba lagi' }).tap();
		await practice.getByRole('radio', { name: 'Bukuku', exact: true }).check();
		await check.tap();
		await expect(practice.getByText('Tepat. Bukuku.', { exact: true })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Tandai selesai' })).toBeEnabled();
		await practice.getByRole('button', { name: 'Ulangi latihan' }).tap();
		await expect(practice.getByText('رَبِّي', { exact: true })).toBeVisible();
		await expect(check).toBeDisabled();
	});
});

test.describe('latihan makna tanpa JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('shows both examples and reveals each reason on request', async ({ page }) => {
		await page.goto(`${shalat}#latihan`);
		const practice = page.getByRole('region', { name: 'Latihan makna' });
		const reveal = practice.getByText('Lihat alasan', { exact: true });
		const reason = practice.getByText(/di akhir menambahkan makna/);
		await expect(reveal).toHaveCount(2);
		await expect(reason.first()).toBeHidden();
		await expect(reason.last()).toBeHidden();
		await reveal.first().click();
		await expect(reason.first()).toBeVisible();
		await expect(reason.last()).toBeHidden();
		await reveal.last().click();
		await expect(reason.last()).toBeVisible();
		await expect(page.getByRole('link', { name: 'Pelajaran berikutnya' })).toBeVisible();
	});
});
