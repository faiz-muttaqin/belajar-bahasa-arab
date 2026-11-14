import { expect, test } from '@playwright/test';

test('Qur’anic vocabulary shows distinct uses, ayah evidence, and a linked verb', async ({
	page
}) => {
	await page.goto('/kosakata/#al-quran');
	const collection = page.getByRole('region', { name: 'Kosakata Al-Qur’an', exact: true });
	await expect(
		collection.getByRole('group', { name: 'Filter jenis kata Al-Qur’an' }).getByRole('button')
	).toHaveCount(7);
	await expect(page.locator('#kata-quran-la-nafy')).toContainText('tidak');
	await expect(page.locator('#kata-quran-la-nahy')).toContainText('jangan');
	const verb = page.locator('#kata-quran-qala');
	await expect(verb.getByText('qāla', { exact: true })).toBeVisible();
	await page.getByRole('button', { name: /Mode hafalan/ }).click();
	await expect(verb.getByText('berkata', { exact: true })).toBeHidden();
	await verb.getByRole('button', { name: 'Lihat arti' }).click();
	await verb.getByText('Bentuk di ayat 2:30', { exact: true }).click();
	await expect(verb.getByRole('link', { name: 'Buka ayat di Tanzil' })).toBeVisible();
	await verb.getByRole('link', { name: 'Lihat di kamus fi’il' }).click();
	await expect(page).toHaveURL(/\/rujukan\/fiil\/kata-kerja\/1\/#kata-kerja-bab-1-/);
	await expect(page.getByRole('dialog')).toBeVisible();
});

test('the site search can find a Qur’anic card using the attested spelling', async ({ page }) => {
	await page.goto('/cari/?jenis=word&q=فٱتبعونى');
	const result = page.locator('a[href$="#kata-quran-ittabaa"]');
	await expect(result).toContainText('mengikuti');
	await result.click();
	await expect(page.locator('#kata-quran-ittabaa')).toBeVisible();
});

test('collection pills filter cards while preserving All and the sharaf audio controls', async ({
	page
}) => {
	await page.goto('/kosakata/');
	const filters = page.getByRole('group', { name: 'Pilih koleksi' });
	await expect(filters.getByRole('button')).toHaveCount(4);
	await filters.getByRole('button', { name: /Al-Qur’an/ }).click();
	await expect(page.getByRole('heading', { name: 'Kosakata harian' })).toHaveCount(0);
	await expect(page.getByRole('heading', { name: 'Kosakata bacaan shalat' })).toHaveCount(0);
	await expect(page.getByRole('heading', { name: 'Kosakata Al-Qur’an' })).toBeVisible();
	await filters.getByRole('button', { name: /^All/ }).click();
	await expect(page.getByRole('heading', { name: 'Kosakata harian' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Kosakata bacaan shalat' })).toBeVisible();
});

test('Qur’anic cards start with verified high-frequency lemmas and support group + sort filters', async ({
	page
}) => {
	await page.goto('/kosakata/#al-quran');
	const section = page.getByRole('region', { name: 'Kosakata Al-Qur’an', exact: true });
	const list = section.getByRole('list', { name: 'Daftar kata Al-Qur’an berdasarkan frekuensi' });
	await expect(list.locator('> li').first()).toHaveAttribute('id', 'kata-quran-min');
	await expect(page.locator('#kata-quran-min')).toContainText('3.226×');
	await expect(section.getByText(/85 sudah memiliki hitungan terverifikasi/)).toBeVisible();
	await expect(page.locator('#kata-quran-kull')).toContainText('359×');
	await section.getByLabel('Urutkan').selectOption('rare');
	await expect(list.locator('> li').first()).toHaveAttribute('id', 'kata-quran-sabr');
	await section.getByLabel('Urutkan').selectOption('frequent');
	await section
		.getByRole('group', { name: 'Filter jenis kata Al-Qur’an' })
		.getByRole('button', { name: /Fi’il · Iman dan ibadah/ })
		.click();
	await expect(page.locator('#kata-quran-kull')).toHaveCount(0);
	await expect(page.locator('#kata-quran-amana')).toBeVisible();
	await section
		.getByRole('group', { name: 'Filter jenis kata Al-Qur’an' })
		.getByRole('button', { name: /Semua jenis/ })
		.click();
	await expect(page.locator('#kata-quran-kull')).toBeVisible();
});
