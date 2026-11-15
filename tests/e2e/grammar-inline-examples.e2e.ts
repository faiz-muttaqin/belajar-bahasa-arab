import { expect, test } from '@playwright/test';

test('D-05a G-01 changes a sourced noun–adjective pair and restores it locally', async ({
	page
}) => {
	await page.goto('/kaidah/');
	const first = page.locator('figure[data-inline-example="sifat-nakirah"]');
	const neighbor = page.locator('figure[data-inline-example="sifat-feminin"]');
	await expect(first).toContainText('كِتَابٌ');
	await expect(first).toContainText('جَدِيدٌ');
	await expect(neighbor).toContainText('مَدْرَسَةٌ');

	const trigger = first.getByRole('button', { name: /Ganti Man‘ūt/ });
	await trigger.click();
	const modal = page.getByRole('dialog', { name: 'Pilih variasi contoh' });
	await expect(modal).toBeVisible();
	await expect(modal).toContainText('contoh utuh yang sudah dicatat');
	await modal.getByRole('searchbox').fill('مدرسة');
	await expect(modal.locator('[data-inline-choice]')).toHaveCount(1);
	await modal.locator('[data-inline-choice="sifat-feminin"]').click();
	await expect(modal).not.toBeVisible();

	await expect(first).toHaveAttribute('data-inline-selected', 'sifat-feminin');
	await expect(first).toContainText('مَدْرَسَةٌ');
	await expect(first).toContainText('كَبِيرَةٌ');
	await expect(first.locator('[data-inline-translation]')).toHaveText('Sebuah sekolah besar.');
	await expect(neighbor).toHaveAttribute('data-inline-selected', 'sifat-feminin');
	await expect(neighbor).toContainText('مَدْرَسَةٌ');
	await expect(first).toContainText('Pasangan contoh diperbarui bersama');

	await first.getByRole('button', { name: 'Reset contoh' }).click();
	await expect(first).toHaveAttribute('data-inline-selected', 'sifat-nakirah');
	await expect(first.locator('[data-inline-translation]')).toHaveText('Sebuah buku baru.');
	await expect(first).toContainText('جَدِيدٌ');
});

test('D-05a distinguishes G-01 khabar and idafa, with correct dependent word', async ({ page }) => {
	await page.goto('/kaidah/');
	const khabar = page.locator('figure[data-inline-example="khabar-buku"]');
	await khabar.getByRole('button', { name: /Ganti Mubtada/ }).click();
	let modal = page.getByRole('dialog', { name: 'Pilih variasi contoh' });
	await expect(modal.locator('[data-inline-reason="khabar-sekolah"]')).toContainText('nakirah');
	await modal.locator('[data-inline-choice="khabar-sekolah"]').click();
	await expect(khabar.locator('[data-inline-translation]')).toHaveText('Sekolah itu besar.');
	await expect(khabar).toContainText('الْمَدْرَسَةُ');
	await expect(khabar).toContainText('كَبِيرَةٌ');

	const idafa = page.locator('figure[data-inline-example="idafah-buku"]');
	await idafa.getByRole('button', { name: /Ganti Muḍāf · unsur utama/ }).click();
	modal = page.getByRole('dialog', { name: 'Pilih variasi contoh' });
	await expect(modal.locator('[data-inline-reason="idafah-pintu"]')).toContainText('muḍāf ilaih');
	await modal.locator('[data-inline-choice="idafah-pintu"]').click();
	await expect(idafa.locator('[data-inline-translation]')).toHaveText('Pintu rumah itu.');
	await expect(idafa).toContainText('بَابُ');
	await expect(idafa).toContainText('الْبَيْتِ');
});

test('D-05a G-03 demonstrates definite and nonhuman plural adjective frames', async ({ page }) => {
	await page.goto('/kaidah/frasa/');
	const book = page.locator('figure[data-inline-example="indefinite-book"]');
	await book.getByRole('button', { name: /Ganti Isim nakirah/ }).click();
	const modal = page.getByRole('dialog', { name: 'Pilih variasi contoh' });
	await modal.locator('[data-inline-choice="definite-book"]').click();
	await expect(book).toContainText('الْكِتَابُ');
	await expect(book.locator('[data-inline-translation]')).toHaveText('Buku itu.');

	const naat = page.locator('figure[data-inline-example="indefinite-adjective"]');
	await naat.getByRole('button', { name: /Ganti Man‘ūt/ }).click();
	await expect(modal.locator('[data-inline-choice="nonhuman-plural"]')).toContainText('كُتُبٌ');
	await expect(modal.locator('[data-inline-reason="nonhuman-plural"]')).toContainText('gender');
	await modal.locator('[data-inline-choice="nonhuman-plural"]').click();
	await expect(naat.locator('[data-inline-translation]')).toHaveText('Buku-buku baru.');
	await expect(naat).toContainText('جَدِيدَةٌ');
	await expect(naat).toContainText('Na‘at · feminin tunggal');
	await expect(naat.locator('[data-irab="raf"]')).toHaveCount(2);
});

test('D-05a G-03 updates the complete jar–idafa frame without guessing a declension', async ({
	page
}) => {
	await page.goto('/kaidah/frasa/');
	const jar = page.locator('figure[data-inline-example="preposition-house"]');
	await jar.getByRole('button', { name: /Ganti Huruf jar/ }).click();
	const modal = page.getByRole('dialog', { name: 'Pilih variasi contoh' });
	await modal.locator('[data-inline-choice="preposition-idafah"]').click();
	await expect(jar.locator('[data-irab="jarr"]')).toHaveCount(2);
	await expect(jar).toContainText('كِتَابِ');
	await expect(jar).toContainText('الطَّالِبِ');
	await expect(jar.locator('[data-inline-translation]')).toHaveText('Di dalam buku murid itu.');

	await jar.getByRole('button', { name: 'Ganti Muḍāf', exact: true }).click();
	await expect(modal.locator('[data-inline-choice="preposition-house"]')).toBeEnabled();
	await page.keyboard.press('Escape');
	await expect(modal).not.toBeVisible();
	await expect(jar).toHaveAttribute('data-inline-selected', 'preposition-idafah');
	await jar.getByRole('button', { name: 'Reset contoh' }).click();
	await expect(jar.locator('[data-irab="jarr"]')).toHaveCount(1);
	await expect(jar).toContainText('الْبَيْتِ');
});

test('D-05a only enables the audited cards, and search never crosses families', async ({
	page
}) => {
	await page.goto('/kaidah/frasa/');
	const staticCase = page.locator('figure[data-inline-example="case-object"]');
	await expect(staticCase).toContainText('الطَّالِبَ');
	await expect(staticCase.getByRole('button', { name: /Ganti/ })).toHaveCount(0);
	const singular = page.locator('figure[data-inline-example="definite-adjective"]');
	await singular.getByRole('button', { name: /Ganti Man‘ūt/ }).click();
	const modal = page.getByRole('dialog', { name: 'Pilih variasi contoh' });
	await modal.getByRole('searchbox').fill('فِي');
	await expect(modal.locator('[data-inline-choice]')).toHaveCount(0);
	await expect(modal).toContainText('Tidak ada pilihan contoh');
	await modal.getByRole('button', { name: 'Tutup' }).click();
	await expect(modal).not.toBeVisible();
});

test.describe('D-05a static-first examples with JavaScript disabled', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

	test('keeps G-01 original HTML and hides edit affordances', async ({ page }) => {
		await page.goto('/kaidah/');
		const noun = page.locator('figure[data-inline-example="sifat-nakirah"]');
		await expect(noun.locator('[data-inline-translation]')).toHaveText('Sebuah buku baru.');
		await expect(noun).toContainText('كِتَابٌ');
		await expect(noun.getByRole('button', { name: /Ganti/ })).toHaveCount(0);
		await expect(page.locator('figure[data-inline-example="khabar-buku"]')).toContainText('الْكِتَابُ');
		const size = await page.evaluate(() => ({
			scroll: document.documentElement.scrollWidth,
			client: document.documentElement.clientWidth
		}));
		expect(size.scroll).toBeLessThanOrEqual(size.client);
	});

	test('keeps G-03 original vowel marks, glossary and exercises without editing', async ({
		page
	}) => {
		await page.goto('/kaidah/frasa/');
		const naat = page.locator('figure[data-inline-example="indefinite-adjective"]');
		await expect(naat).toContainText('جَدِيدٌ');
		await expect(naat.getByRole('button', { name: /Ganti/ })).toHaveCount(0);
		const idafa = page.locator('figure[data-inline-example="idafah-door"]');
		await expect(idafa).toContainText('الْبَيْتِ');
		await expect(idafa.getByRole('button', { name: /Ganti/ })).toHaveCount(0);
		await expect(page.locator('section#idafah-jar details')).toHaveCount(2);
		const size = await page.evaluate(() => ({
			scroll: document.documentElement.scrollWidth,
			client: document.documentElement.clientWidth
		}));
		expect(size.scroll).toBeLessThanOrEqual(size.client);
	});
});
