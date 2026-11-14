import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('every lesson listed in the public catalogs has a static Arabic reader', async () => {
	const tracks = [
		{ route: 'belajar', first: 'kata-inti-shalat', last: 'uji-membaca-dokumen' },
		{ route: 'iqra', first: 'bentuk-huruf', last: 'baca-kalimat-pendek' }
	];

	for (const { route, first, last } of tracks) {
		const catalog = await readFile(`build/${route}/index.html`, 'utf8');
		const links = new RegExp(`href="[^"]*/${route}/([a-z0-9-]+)/"`, 'g');
		const slugs = new Set(Array.from(catalog.matchAll(links), ([, slug]) => slug));
		expect(slugs).toContain(first);
		expect(slugs).toContain(last);

		for (const slug of slugs) {
			const html = await readFile(`build/${route}/${slug}/index.html`, 'utf8');
			expect(html).toContain('<html lang="id">');
			expect(html).toMatch(/<p lang="ar" dir="rtl"/);
			expect(html).toContain('Latihan pemahaman');
			expect(html).not.toContain('Draf publik.');
		}
	}
});

test.describe('public lesson reader without JavaScript', () => {
	test.use({
		javaScriptEnabled: false,
		viewport: { width: 375, height: 812 },
		colorScheme: 'dark'
	});

	test('opens the intermediate reader, hides the answers and can reveal them', async ({ page }) => {
		await page.goto('/belajar/');
		await page.getByRole('link', { name: /Petakan fungsi setiap paragraf/ }).click();
		await expect(page).toHaveURL(/\/belajar\/struktur-dokumen-pendek\/$/);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(
			'Petakan fungsi setiap paragraf'
		);
		await expect(page.locator('#bacaan')).toBeVisible();
		await expect(
			page.locator('section[aria-labelledby="bacaan"] p[lang="ar"][dir="rtl"]')
		).toHaveCount(3);

		await expect(page.getByText('Perpanjangan jam layanan', { exact: true })).toBeHidden();
		await page.getByText('Kata kunci', { exact: true }).click();
		await expect(page.getByText('Perpanjangan jam layanan', { exact: true })).toBeVisible();
		await expect(page.getByText(/Latar dan masalah\./)).toBeHidden();

		const answer = page.getByText('Itulah masalah pada paragraf pertama.', { exact: false });
		await expect(answer).toBeHidden();
		await page.getByText('Lihat pembahasan', { exact: true }).first().click();
		await expect(answer).toBeVisible();

		await page.getByText('Terjemahan dan fungsi paragraf', { exact: true }).click();
		await expect(page.getByText(/Latar dan masalah\./)).toBeVisible();
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
			375
		);
	});

	test('shows word formation and grammar before the full translation', async ({ page }) => {
		await page.goto('/belajar/');
		await page.getByRole('link', { name: 'Mulai dari isim, fi‘il, dan harf' }).click();
		await expect(page).toHaveURL(/\/belajar\/isim-fiil-harf\/#bedah-kalimat$/);
		const analysis = page.getByRole('region', { name: 'Bedah per kata' });
		await expect(analysis.getByText('Isim', { exact: true }).first()).toBeVisible();
		await expect(analysis.getByText('Sharaf', { exact: true }).first()).toBeVisible();
		await expect(analysis.getByText('Nahwu', { exact: true }).first()).toBeVisible();

		await analysis.getByText('Kalimat verbal aktif dan pasif', { exact: true }).click();
		const comparison = analysis
			.locator('details')
			.filter({ has: page.getByText('Kalimat verbal aktif dan pasif', { exact: true }) });
		await expect(comparison.getByText('الْبَابَ', { exact: true }).first()).toBeVisible();
		await expect(comparison.getByText('الْبَابُ', { exact: true }).first()).toBeVisible();
		const translation = comparison.getByText('Pintu itu dibuka.', { exact: true });
		await expect(translation).toBeHidden();
		await comparison.getByText('Lihat makna utuh', { exact: true }).last().click();
		await expect(translation).toBeVisible();
	});

	test('offers all three new multi-paragraph readings with exercises and feedback', async ({
		page
	}) => {
		await page.goto('/belajar/#menengah');
		const intermediate = page.getByRole('region', { name: 'Menengah' });
		for (const [title, slug, paragraphs, questions, feedback] of [
			[
				'Bedah kalimat dalam cerita',
				'bedah-kalimat-bacaan',
				3,
				5,
				'Bagian sebelum koma menjelaskan kapan'
			],
			['Lacak kata ganti antarparagraf', 'lacak-kata-ganti', 3, 4, 'rujukannya pameran'],
			[
				'Rangkum gagasan utama dari empat paragraf',
				'rangkum-gagasan-dokumen',
				4,
				5,
				'Tim kebersihan memperhatikan'
			]
		] as const) {
			await intermediate.getByRole('link', { name: new RegExp(title) }).click();
			expect(new URL(page.url()).pathname).toBe(`/belajar/${slug}/`);
			const passage = page.locator('#bedah-kalimat');
			const blocks = passage.getByRole('region', { name: /^Paragraf/ });
			await expect(blocks).toHaveCount(paragraphs);
			const sentences = blocks.locator('p[lang="ar"][dir="rtl"]');
			await expect(sentences).toHaveCount(8);
			for (const sentence of await sentences.all()) {
				const notes = sentence.locator('+ details');
				await expect(notes).toHaveCount(1);
				const words = (await sentence.innerText()).trim().split(/\s+/u);
				await expect(notes.locator('li > p > [lang="ar"]')).toHaveText(words);
			}
			await page.getByRole('link', { name: 'Buka bedah per kata' }).click();
			await expect(page).toHaveURL(/#bedah-kalimat$/);
			const firstNotes = sentences.first().locator('+ details');
			await expect(firstNotes.getByText('Sharaf', { exact: true }).first()).toBeVisible();
			await expect(firstNotes.getByText('Nahwu', { exact: true }).first()).toBeVisible();
			const lastNotes = sentences.last().locator('+ details');
			await lastNotes.locator('summary').first().click();
			await expect(lastNotes.getByText('Nahwu', { exact: true }).first()).toBeVisible();
			await expect(lastNotes.locator('details > p')).toBeHidden();
			await lastNotes.getByText('Lihat makna utuh', { exact: true }).click();
			await expect(lastNotes.locator('details > p')).toBeVisible();
			expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
				375
			);
			await expect(
				page.getByRole('link', { name: 'Hafalkan kata penghubung dan efeknya' })
			).toHaveAttribute('href', /rujukan\/#kata-penghubung$/);
			await page.goBack();
			const exercises = page.getByRole('region', { name: 'Latihan pemahaman' });
			const reveal = exercises.getByText('Lihat pembahasan', { exact: true });
			await expect(reveal).toHaveCount(questions);
			const answer = exercises.getByText(feedback, { exact: false }).first();
			await expect(answer).toBeHidden();
			await reveal.first().click();
			await expect(answer).toBeVisible();
			await page.goBack();
		}
	});
});

test('exercise index deep links to a lesson and navigation closes open feedback', async ({
	page
}) => {
	await page.goto('/latihan/');
	await page.getByRole('link', { name: /Petakan fungsi setiap paragraf/ }).click();
	await expect(page).toHaveURL(/\/belajar\/struktur-dokumen-pendek\/#latihan$/);
	await page.getByText('Lihat pembahasan', { exact: true }).first().click();
	const paragraph = page.locator('section[aria-labelledby="bacaan"] p[lang="ar"]').first();
	await expect(paragraph).toContainText('كَانَتِ');
	await page.getByLabel('Tampilkan harakat').uncheck();
	await expect(paragraph).toContainText('كانت المكتبة');
	await page.getByRole('link', { name: 'Pelajaran berikutnya' }).click();
	await expect(page.getByLabel('Tampilkan harakat')).toBeChecked();
	await expect(page).toHaveURL(/\/belajar\/bandingkan-dua-pilihan\/$/);
	await expect(page.locator('details[open]')).toHaveCount(0);
	await page.goBack();
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'Petakan fungsi setiap paragraf'
	);
});

test('tashrif and vocabulary contain lesson material on a phone', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('/rujukan/');
	await page.getByText('Contoh per bab dan mode hafalan', { exact: true }).click();
	const tashrif = page.getByRole('region', { name: /Sebelas bentuk/ });
	await expect(tashrif.getByRole('row')).toHaveCount(12);
	await expect(tashrif.getByRole('columnheader', { name: /Bab 6/ })).toBeVisible();
	await expect(tashrif.getByText('مِفْتَاحٌ', { exact: true })).toBeVisible();
	expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
	await page.getByRole('radio', { name: 'Sembunyikan bab 1 · menolong' }).check();
	await expect(tashrif.getByText('نَصَرَ', { exact: true })).toBeHidden();
	await tashrif
		.getByRole('button', { name: 'Buka: Bab 1 · Menolong, baris 1', exact: true })
		.click();
	await expect(tashrif.getByText('نَصَرَ', { exact: true })).toBeFocused();

	await page.goto('/kosakata/');
	await expect(page.getByRole('heading', { name: 'Kosakata bacaan shalat' })).toBeVisible();
	const word = page.getByRole('article').filter({ hasText: 'دَفْتَرٌ' });
	await expect(word.getByText('Buku catatan', { exact: true })).toBeVisible();
	await page.getByRole('button', { name: /Mode hafalan/ }).click();
	await expect(word.getByText('Buku catatan', { exact: true })).toBeHidden();
	await word.getByRole('button', { name: 'Lihat arti' }).click();
	await expect(word.getByText('Buku catatan', { exact: true })).toBeVisible();
});

test('the connector glossary supports recall of grammatical effects', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('/rujukan/#kata-penghubung');
	const glossary = page.getByRole('region', { name: 'Glosarium kata penghubung' });
	const effect = glossary.getByText('Menashabkan fi‘il mudhari‘.', { exact: false });
	await expect(effect).toBeVisible();
	await glossary.getByRole('radio', { name: 'Sembunyikan efek pada kalimat' }).check();
	await expect(effect).toHaveCount(0);
	const row = glossary.getByRole('row').filter({ has: page.getByText('أَنْ', { exact: true }) });
	await row.getByRole('button', { name: /Buka: Efek pada kalimat/ }).click();
	await expect(effect).toBeVisible();
});
