import { expect, test } from '@playwright/test';

test('Qur’anic vocabulary shows distinct uses, ayah evidence, and a linked verb', async ({
	page
}) => {
	await page.goto('/kosakata/#al-quran');
	const collection = page.getByRole('region', { name: 'Kosakata Al-Qur’an', exact: true });
	await expect(collection.getByRole('navigation').getByRole('link')).toHaveCount(6);
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
