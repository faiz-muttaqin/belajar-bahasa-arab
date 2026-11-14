import { expect, test } from '@playwright/test';

test('MSA collection is independently selectable without changing Quran and prayer collections', async ({
	page
}) => {
	await page.goto('/kosakata/');
	const filters = page.getByRole('group', { name: 'Pilih koleksi' });
	await expect(filters.getByRole('button')).toHaveCount(5);
	await filters.getByRole('button', { name: /Umum MSA/ }).click();

	const section = page.locator('#msa');
	await expect(section.getByRole('heading', { name: 'Kosakata umum MSA' })).toBeVisible();
	await expect(section.locator('li[id^="kata-msa-"]')).toHaveCount(157);
	await expect(page.getByRole('heading', { name: 'Kosakata Al-Qur’an' })).toHaveCount(0);
	await expect(page.getByRole('heading', { name: 'Kosakata bacaan shalat' })).toHaveCount(0);
	await filters.getByRole('button', { name: /^All/ }).click();
	await expect(page.getByRole('heading', { name: 'Kosakata Al-Qur’an' })).toBeVisible();
});

test('word class and semantic topic filters keep adjectives separate from nouns', async ({ page }) => {
	await page.goto('/kosakata/');
	await page.getByRole('group', { name: 'Pilih koleksi' })
		.getByRole('button', { name: /Umum MSA/ }).click();
	const section = page.locator('#msa');

	await section.getByRole('button', { name: 'Isim · kata sifat' }).click();
	await expect(section.locator('li[id^="kata-msa-"]')).toHaveCount(34);
	await expect(section.getByText(/34 dari 157 kata cocok/)).toBeVisible();
	await section.getByRole('button', { name: 'Sifat dan keadaan' }).click();
	await expect(section.locator('#kata-msa-saghir')).toBeVisible();
	await expect(section.locator('#kata-msa-kitab')).toHaveCount(0);
});

test('searches Arabic without harakat, Indonesian meaning and recorded plural', async ({ page }) => {
	await page.goto('/kosakata/');
	await page.getByRole('group', { name: 'Pilih koleksi' })
		.getByRole('button', { name: /Umum MSA/ }).click();
	const section = page.locator('#msa');
	const input = section.getByRole('searchbox', { name: 'Cari kata atau arti' });

	await input.fill('حاسوب');
	await expect(section.locator('li[id^="kata-msa-"]')).toHaveCount(1);
	await expect(section.locator('#kata-msa-hasub')).toBeVisible();
	await expect(section.locator('#kata-msa-hasub')).toContainText('حَوَاسِيبُ');
	await input.fill('komputer');
	await expect(section.locator('#kata-msa-hasub')).toBeVisible();
	await input.fill('نساء');
	await expect(section.locator('#kata-msa-imraah')).toBeVisible();
});

test('deep links and original phrase examples remain in static HTML with JavaScript off', async ({
	page
}) => {
	await page.goto('/kosakata/#kata-msa-kitab');
	await expect(page.locator('#kata-msa-kitab')).toBeVisible();
	await expect(page.locator('#kata-msa-kitab')).toContainText('كِتَابٌ جَدِيدٌ');
	await expect(page.locator('#kata-msa-internet')).toContainText('Kata serapan');
});

test.describe('static MSA vocabulary without JavaScript', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
	test('renders all 157 entries on initial response and avoids horizontal overflow', async ({ page }) => {
		await page.goto('/kosakata/#kata-msa-imraah');
		await expect(page.locator('#msa li[id^="kata-msa-"]')).toHaveCount(157);
		await expect(page.locator('#kata-msa-imraah')).toContainText('نِسَاءٌ');
		const sizes = await page.evaluate(() => ({
			page: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
	});
});
