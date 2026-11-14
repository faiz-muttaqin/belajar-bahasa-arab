import { expect, test } from '@playwright/test';

test('G-06 prerequisite map is reachable from grammar, sentences and exercise navigation', async ({
	page
}) => {
	await page.goto('/kaidah/');
	await page.getByRole('link', { name: 'Praktik interaktif dan contoh dinamis' }).click();
	await expect(page).toHaveURL(/\/kaidah\/praktik\/$/);
	await expect(page.getByRole('heading', { name: 'Praktik bahasa Arab: dari kata ke paragraf' })).toBeVisible();
	await expect(page.locator('section[aria-labelledby="prereq-title"] li')).toHaveCount(6);

	await page.goto('/kaidah/kalimat/');
	await page.getByRole('link', { name: 'Buka contoh dinamis' }).click();
	await expect(page).toHaveURL(/\/kaidah\/praktik\/$/);

	await page.goto('/latihan/');
	await page.getByRole('link', { name: 'Buka praktik contoh dinamis' }).click();
	await expect(page).toHaveURL(/\/kaidah\/praktik\/$/);
});

test('nominal example modal filters source vocabulary and updates female agreement', async ({
	page
}) => {
	await page.goto('/kaidah/praktik/');
	const nominal = page.getByRole('region', { name: 'Contoh Arab interaktif nominal' });
	await expect(nominal.locator('[data-slot="subject"]')).toContainText('الْكِتَابُ');
	await expect(nominal.locator('[data-slot="predicate"]')).toContainText('جَدِيدٌ');

	const trigger = nominal.getByRole('button', { name: 'Ganti Mubtada · isim marfū‘' });
	await trigger.click();
	const modal = page.getByRole('dialog', { name: 'Cari pengganti kata' });
	await expect(modal).toBeVisible();
	await modal.getByRole('searchbox').fill('مدرسة');
	await expect(modal.locator('[data-choice]')).toHaveCount(1);
	await modal.locator('[data-choice="msa-madrasah"]').click();
	await expect(modal).not.toBeVisible();

	await expect(nominal.locator('[data-slot="subject"]')).toContainText('الْمَدْرَسَةُ');
	await expect(nominal.locator('[data-slot="predicate"]')).toContainText('جَدِيدَةٌ');
	await expect(nominal.locator('[data-translation]')).toHaveText('Sekolah itu baru.');

	await nominal.getByRole('button', { name: 'Ganti Khabar · sifat marfū‘' }).click();
	await modal.getByRole('searchbox').fill('besar');
	await modal.locator('[data-choice="msa-kabir"]').click();
	await expect(nominal.locator('[data-slot="predicate"]')).toContainText('كَبِيرَةٌ');
	await expect(nominal.locator('[data-translation]')).toHaveText('Sekolah itu besar.');
});

test('verbal modal selects source sharaf entry and automatically fixes incompatible object', async ({
	page
}) => {
	await page.goto('/kaidah/praktik/');
	const verbal = page.getByRole('region', { name: 'Contoh Arab interaktif verbal' });
	const modal = page.getByRole('dialog', { name: 'Cari pengganti kata' });
	await expect(verbal.locator('[data-slot="verb"]')).toContainText('كَتَبَ');
	await expect(verbal.locator('[data-slot="object"]')).toContainText('الرِّسَالَةَ');

	await verbal.getByRole('button', { name: 'Ganti Fi‘il māḍī · orang ketiga maskulin' }).click();
	await modal.getByRole('searchbox').fill('فتح');
	await expect(modal.locator('[data-choice="fiil-fataha"]')).toContainText('Bab 3');
	await modal.locator('[data-choice="fiil-fataha"]').click();

	await expect(verbal.locator('[data-slot="verb"]')).toContainText('فَتَحَ');
	await expect(verbal.locator('[data-slot="object"]')).toContainText('الْبَابَ');
	await expect(verbal.locator('[data-translation]')).toHaveText('Murid itu membuka pintu itu.');
	await expect(verbal).toContainText('Objek otomatis disesuaikan');

	await verbal.getByRole('button', { name: 'Ganti Maf‘ūl bih · isim manṣūb' }).click();
	await modal.getByRole('searchbox').fill('رسالة');
	await expect(modal.locator('[data-choice]')).toHaveCount(0);
	await expect(modal).toContainText('Tidak ada kata yang cocok');
	await page.keyboard.press('Escape');
	await expect(modal).not.toBeVisible();
});

test.describe('G-06 prerender fallback with JavaScript disabled', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

	test('keeps original examples, glos and openable reading questions without overflow', async ({
		page
	}) => {
		await page.goto('/kaidah/praktik/');
		await expect(page.getByRole('region', { name: 'Contoh Arab interaktif nominal' })).toContainText('الْكِتَابُ');
		await expect(page.getByRole('region', { name: 'Contoh Arab interaktif verbal' })).toContainText('الرِّسَالَةَ');
		await expect(page.getByRole('button', { name: /Ganti Mubtada/ })).toHaveCount(0);
		await expect(page.locator('section[aria-labelledby="reading-title"] figure')).toHaveCount(1);
		await expect(page.locator('section[aria-labelledby="reading-title"] details')).toHaveCount(3);
		await page.locator('section[aria-labelledby="reading-title"] summary').first().click();
		await expect(page.locator('section[aria-labelledby="reading-title"] details').first()).toContainText(
			'Pertama membaca buku'
		);

		const sizes = await page.evaluate(() => ({
			page: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
	});
});
