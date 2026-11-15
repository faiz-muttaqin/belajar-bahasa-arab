import { expect, test } from '@playwright/test';

const lesson = '/belajar/isim-fiil-harf/#bedah-kalimat';
const reference = '/rujukan/istilah/';

test.describe('glosarium di layar kecil', () => {
	test.use({ viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true });

	test('opens in context, returns focus and opens the full reference', async ({ page }) => {
		await page.goto(lesson);
		await page.evaluate(() => document.fonts.ready.then(() => undefined));
		const bedah = page.getByRole('region', { name: 'Bedah per kata' });
		const isim = bedah.getByRole('link', { name: 'isim', exact: true });
		await expect(isim).toHaveAttribute('aria-haspopup', 'dialog');
		await isim.scrollIntoViewIfNeeded();
		const before = await page.evaluate(() => scrollY);
		await isim.tap();
		let dialog = page.getByRole('dialog', { name: /Isim/ });
		await expect(dialog.getByText(/kata benda, kata sifat, dan kata ganti/)).toBeVisible();
		await expect(dialog.getByText('الْبَابُ مَفْتُوحٌ', { exact: true })).toHaveAttribute('dir', 'rtl');
		await expect(dialog.getByRole('button', { name: 'Tutup', exact: true })).toBeFocused();
		await page.keyboard.press('Escape');
		await expect(dialog).toBeHidden();
		await expect(isim).toBeFocused();
		expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThan(3);

		const kalimah = bedah.getByRole('link', { name: 'kalimah', exact: true });
		await kalimah.tap();
		dialog = page.getByRole('dialog', { name: /Kalimah/ });
		await expect(dialog.getByText(/kalimah berarti satu kata/)).toBeVisible();
		await expect(dialog.getByText(/Istilah Indonesia “kalimat”/)).toBeVisible();
		await dialog.getByRole('button', { name: 'Tutup', exact: true }).tap();
		await expect(kalimah).toBeFocused();

		await bedah.getByRole('link', { name: 'jumlah', exact: true }).tap();
		dialog = page.getByRole('dialog', { name: /Jumlah/ });
		await expect(dialog.getByText(/banyaknya sesuatu/)).toBeVisible();
		await dialog.getByRole('link', { name: 'Baca penjelasan lengkap' }).tap();
		await expect(page).toHaveURL(new RegExp(`${reference}jumlah/$`));
		await expect(page).toHaveTitle('Jumlah · Belajar Bahasa Arab');
		const figure = page.getByRole('figure', { name: 'Jenis dan tugas kata' });
		await expect(figure.getByText('Pokok pembicaraan', { exact: true })).toBeVisible();
		await expect(figure.getByText('Memberi kabar', { exact: true })).toBeVisible();
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
			320
		);
		await page.goBack();
		await expect(page).toHaveURL(new RegExp(`${lesson}$`));
		await expect(isim).toBeVisible();
	});

	test('uses the same term dialogs from lesson examples and Kaidah', async ({ page }) => {
		await page.goto(lesson);
		const bedah = page.getByRole('region', { name: 'Bedah per kata' });
		for (const [heading, name, definition] of [
			['Kalimat verbal aktif dan pasif', 'fi‘il', /Fi‘il adalah kata kerja/],
			['Harf dan pengaruhnya pada kata sesudahnya', 'harf', /Harf adalah kata tugas/]
		] as const) {
			await bedah.getByText(heading, { exact: true }).tap();
			const link = bedah.getByRole('link', { name, exact: true });
			await expect(link).toHaveAttribute('aria-haspopup', 'dialog');
			await link.tap();
			const dialog = page.getByRole('dialog');
			await expect(dialog.getByText(definition)).toBeVisible();
			await expect(dialog.getByRole('link', { name: 'Baca penjelasan lengkap' })).toBeInViewport({
				ratio: 1
			});
			await dialog.getByRole('button', { name: 'Tutup' }).tap();
			await expect(link).toBeFocused();
		}

		await page.goto('/kaidah/');
		const sharaf = page.getByRole('link', { name: 'sharaf', exact: true });
		await expect(sharaf).toHaveAttribute('aria-haspopup', 'dialog');
		await sharaf.tap();
		let dialog = page.getByRole('dialog', { name: /Sharaf/ });
		await expect(dialog.getByText(/akar dan pola/)).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(sharaf).toBeFocused();

		await page.getByRole('link', { name: 'nahwu', exact: true }).tap();
		dialog = page.getByRole('dialog', { name: /Nahwu/ });
		await expect(dialog.getByText(/Nahwu membahas susunan kata/)).toBeVisible();
		await dialog.getByRole('link', { name: 'Baca penjelasan lengkap' }).tap();
		await expect(page).toHaveURL(new RegExp(`${reference}nahwu/$`));
		await expect(page.getByRole('figure', { name: 'Jenis dan tugas kata' })).toBeVisible();
		await page.getByRole('link', { name: 'Sharaf', exact: true }).click();
		const words = page.getByRole('figure', { name: 'Satu akar, tiga bentuk' });
		await expect(words.getByText('كَاتِبٌ', { exact: true })).toHaveAttribute('lang', 'ar');
		await expect(words.getByText('مَكْتُوبٌ', { exact: true })).toHaveAttribute('dir', 'rtl');
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
			320
		);
	});
});

test.describe('rujukan istilah statis', () => {
	test.use({ javaScriptEnabled: false });

	test('links directly to the three entries with readable definitions and metadata', async ({
		page
	}) => {
		await page.goto(lesson);
		await page
			.getByRole('region', { name: 'Bedah per kata' })
			.getByRole('link', {
				name: 'kalimah',
				exact: true
			})
			.click();
		await expect(page).toHaveURL(new RegExp(`${reference}kalimah/$`));
		await expect(page.getByRole('heading', { level: 1, name: 'Kalimah' })).toBeVisible();
		await expect(page.getByText(/Istilah Indonesia “kalimat”/)).toBeVisible();

		await page.getByRole('link', { name: 'Isim', exact: true }).click();
		await expect(page).toHaveTitle('Isim · Belajar Bahasa Arab');
		await expect(page.getByRole('heading', { name: 'Kapan harakat akhir berubah?' })).toBeVisible();
		await page.getByRole('link', { name: 'Jumlah', exact: true }).click();
		await expect(page.getByRole('heading', { level: 1, name: 'Jumlah' })).toBeVisible();
		await expect(page.getByRole('figure', { name: 'Jenis dan tugas kata' })).toBeVisible();
		await page.getByRole('link', { name: 'Kembali ke contoh pelajaran' }).click();
		await expect(page).toHaveURL(new RegExp(`${lesson}$`));
		await expect(page.getByRole('heading', { name: 'Bedah per kata' })).toBeVisible();
	});

	test('prerenders all four new terms from the Jenis kata index', async ({ page }) => {
		for (const [slug, name, topic] of [
			['fiil', 'Fi‘il', 'Apa yang terjadi setelah lam?'],
			['harf', 'Harf', 'Pengaruh pada kata sesudahnya'],
			['nahwu', 'Nahwu', 'Frasa dan kalimat'],
			['sharaf', 'Sharaf', 'Akar dan pola']
		] as const) {
			await page.goto('/rujukan/#istilah-dasar');
			await page
				.getByRole('region', { name: 'Istilah dasar' })
				.getByRole('link', { name, exact: true })
				.click();
			await expect(page).toHaveURL(new RegExp(`${reference}${slug}/$`));
			await expect(page).toHaveTitle(`${name} · Belajar Bahasa Arab`);
			await expect(page.getByRole('heading', { name: topic, exact: true })).toBeVisible();
		}
	});
});
