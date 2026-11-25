import { expect, test, type Locator, type Page } from '@playwright/test';

const lesson = '/belajar/isim-fiil-harf/';
const frasa = '/kaidah/frasa/';

const explorer = (page: Page, index = 0) => page.locator('[data-word-role-explorer]').nth(index);
const layerChoice = (scope: Locator, name: string) =>
	scope.locator('fieldset').getByText(name, { exact: true });
const word = (scope: Locator, text: string) =>
	scope.getByRole('button', { name: text, exact: true });

async function openFirstGroup(page: Page) {
	await page.goto(lesson);
	const first = explorer(page);
	await expect(first.getByRole('button').first()).toBeVisible(); // hydrated
	return first;
}

test.describe('VP-02 word-role explorer: lesson', () => {
	test('opens a word with the keyboard, shows its role and returns focus on close', async ({
		page
	}) => {
		const box = await openFirstGroup(page);
		await layerChoice(box, 'Peran dalam kalimat').click();

		const bab = word(box, 'الْبَابُ').first();
		await bab.focus();
		await page.keyboard.press('Enter');
		await expect(bab).toHaveAttribute('aria-expanded', 'true');

		const panel = box.locator('[data-wr-panel]');
		await expect(panel).toBeVisible();
		await expect(panel).toContainText('Mubtada’');
		await expect(panel).toContainText('Topik kalimat nominal');
		await expect(panel).toContainText('Pintu itu terbuka.');
		await expect(panel).toContainText('ḍammah');
		await expect(panel).toContainText('Status: draf');
		await expect(panel.getByRole('link', { name: /Al-Ājurrūmiyyah/ }).first()).toBeVisible();
		await expect(
			panel.getByRole('link', { name: 'Pelajaran: isim, fi‘il, dan harf dalam kalimat' })
		).toBeVisible();
		await expect(panel).toContainText('Mubtada’–khabar');

		// The partner word is marked with text as well as colour.
		const khabar = word(box, 'مَفْتُوحٌ').first();
		await expect(khabar).toHaveAttribute('data-state', 'related');
		await expect(box.locator('[data-token] >> text=Berhubungan').first()).toBeVisible();
		await expect(box.locator('[data-token] >> text=Dipilih').first()).toBeVisible();

		await panel.getByRole('button', { name: /Tutup/ }).click();
		await expect(panel).toBeHidden();
		await expect(bab).toBeFocused();

		// Escape closes the panel too, and focus stays on the word.
		await page.keyboard.press('Enter');
		await expect(panel).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(panel).toBeHidden();
		await expect(bab).toBeFocused();
	});

	test('shows one layer at a time and each word keeps a text label', async ({ page }) => {
		const box = await openFirstGroup(page);
		await expect(box).toHaveAttribute('data-layer', 'wordClass');
		await expect(box.locator('[data-wr-legend]')).toContainText('Isim');
		await expect(box.locator('[data-wr-legend]')).not.toContainText('Mubtada’');
		await expect(box.locator('[data-token="wc-pintu-terbuka.t1"]')).toContainText('Isim');

		await layerChoice(box, 'Peran dalam kalimat').click();
		await expect(box).toHaveAttribute('data-layer', 'role');
		await expect(box.locator('[data-token="wc-pintu-terbuka.t1"]')).toContainText('Mubtada’');
		await expect(box.locator('[data-token="wc-pintu-terbuka.t1"]')).not.toContainText('Isim');
		await expect(box.locator('[data-token="wc-pintu-terbuka.t2"]')).toContainText('Khabar');
		await expect(box.locator('[data-wr-legend]')).toContainText('Khabar');
		await expect(box.locator('[data-wr-legend]')).toContainText('kabar tentang mubtada’');

		await layerChoice(box, 'Bentuk sharaf').click();
		await expect(box).toHaveAttribute('data-layer', 'sharaf');
		await expect(box.locator('[data-token="wc-pintu-terbuka.t2"]')).toContainText('Isim maf‘ūl');
		await expect(box.locator('[data-token="wc-pintu-terbuka.t1"]')).toContainText('Tanpa catatan');

		await word(box, 'مَفْتُوحٌ').first().click();
		const panel = box.locator('[data-wr-panel]');
		await expect(panel).toContainText('akar');
		await expect(panel).toContainText('perannya di kalimat ini adalah khabar');
		// The sharaf layer does not repeat the nahwu role or the final vowel.
		await expect(panel).not.toContainText('Akhir kata');
	});

	test('explains an isim fā‘il token without giving it the fā‘il role by name alone', async ({
		page
	}) => {
		await page.goto(lesson);
		await page.getByText('Kalimat verbal aktif dan pasif', { exact: true }).click();
		const box = explorer(page, 1);
		await layerChoice(box, 'Bentuk sharaf').click();
		await word(box, 'الْحَارِسُ').first().click();
		await expect(box.locator('[data-wr-panel]')).toContainText('bukan karena bentuknya isim fā‘il');
		await layerChoice(box, 'Peran dalam kalimat').click();
		await expect(box.locator('[data-wr-panel]')).toContainText('Fā‘il');
		await expect(box.locator('[data-wr-panel]')).toContainText('Fā‘il berstatus rafa‘');
		// The fi‘il is not given a final-vowel reason because the annotation has none.
		await word(box, 'فَتَحَ').first().click();
		await expect(box.locator('[data-wr-panel]')).not.toContainText('Akhir kata');
	});

	test('"Tanpa warna peran" removes colour but keeps labels, legend text and state text', async ({
		page
	}) => {
		const box = await openFirstGroup(page);
		await layerChoice(box, 'Peran dalam kalimat').click();
		const bab = word(box, 'الْبَابُ').first();
		const bg = () => bab.evaluate((el) => getComputedStyle(el).backgroundColor);
		expect(await bg()).not.toBe('rgba(0, 0, 0, 0)');
		await expect(box.locator('.wr-dot').first()).toBeVisible();

		await box.getByLabel('Tanpa warna peran').check();
		await expect(box).toHaveAttribute('data-colour', 'off');
		expect(await bg()).toBe('rgba(0, 0, 0, 0)');
		await expect(box.locator('.wr-dot')).toHaveCount(0);
		await expect(box.locator('[data-wr-legend]')).toContainText('Mubtada’');
		await expect(box.locator('[data-token="wc-pintu-terbuka.t1"]')).toContainText('Mubtada’');

		await bab.click();
		await expect(box.locator('[data-token="wc-pintu-terbuka.t1"]')).toContainText('Dipilih');
		await expect(box.locator('[data-token="wc-pintu-terbuka.t2"]')).toContainText('Berhubungan');
		await box.getByLabel('Tanpa warna peran').uncheck();
		await expect(box).toHaveAttribute('data-colour', 'on');
	});

	test('highlighting changes only colour: no spacing, border or direction change', async ({
		page
	}) => {
		const box = await openFirstGroup(page);
		await layerChoice(box, 'Peran dalam kalimat').click();
		const bab = word(box, 'الْبَابُ').first();
		const measure = () =>
			bab.evaluate((el) => {
				const style = getComputedStyle(el);
				const rect = el.getBoundingClientRect();
				return {
					width: rect.width,
					height: rect.height,
					padding: style.padding,
					border: style.borderTopWidth + style.borderLeftWidth,
					margin: style.margin,
					letterSpacing: style.letterSpacing,
					direction: style.direction,
					lang: el.getAttribute('lang'),
					fontWeight: style.fontWeight
				};
			});
		const before = await measure();
		await bab.click();
		const after = await measure();
		expect(after).toEqual(before);
		expect(before.padding).toBe('0px');
		expect(before.border).toBe('0px0px');
		expect(before.direction).toBe('rtl');
		expect(before.lang).toBe('ar');
		expect(['normal', '0px']).toContain(before.letterSpacing);
	});

	test('lays out Arabic right to left with the first word on the right', async ({ page }) => {
		const box = await openFirstGroup(page);
		const row = box.locator('[data-wr-sentence="wc-pintu-terbuka"] ol').first();
		await expect(row).toHaveAttribute('dir', 'rtl');
		const first = await word(box, 'الْبَابُ').first().boundingBox();
		const second = await word(box, 'مَفْتُوحٌ').first().boundingBox();
		expect(first!.x).toBeGreaterThan(second!.x);
		// Translation and glosses are left-to-right Indonesian.
		await expect(
			box.locator('[data-token="wc-pintu-terbuka.t1"] [lang="id"]').first()
		).toHaveAttribute('dir', 'ltr');
	});

	for (const mode of ['light', 'dark'] as const) {
		test(`every highlighted word keeps 4.5:1 text contrast in ${mode} theme`, async ({ page }) => {
			await page.goto(lesson);
			await page.evaluate(
				(m) => document.documentElement.classList.toggle('dark', m === 'dark'),
				mode
			);
			const box = explorer(page);
			await expect(box.getByRole('button').first()).toBeVisible();
			const failures: string[] = [];
			for (const layer of ['Jenis kata', 'Peran dalam kalimat', 'Bentuk sharaf']) {
				await layerChoice(box, layer).click();
				for (const target of await box.locator('button.wr-word').all()) {
					await target.click();
					for (const el of await box.locator('button.wr-word').all()) {
						const ratio = await el.evaluate((node) => {
							const read = (value: string) => {
								const rgb = /rgba?\(([^)]+)\)/.exec(value);
								if (rgb)
									return rgb[1]!
										.split(',')
										.slice(0, 3)
										.map((n) => Number(n) / 255);
								const srgb = /color\(srgb ([^)]+)\)/.exec(value);
								return srgb![1]!
									.split(/[\s/]+/)
									.slice(0, 3)
									.map(Number);
							};
							const lum = (c: number[]) => {
								const [r, g, b] = c.map((v) =>
									v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
								);
								return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
							};
							const style = getComputedStyle(node);
							const card = getComputedStyle(node.closest('section')!).backgroundColor;
							const bgValue =
								style.backgroundColor === 'rgba(0, 0, 0, 0)' ? card : style.backgroundColor;
							const a = lum(read(style.color));
							const b = lum(read(bgValue));
							return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
						});
						if (ratio < 4.5) failures.push(`${layer}: ${ratio.toFixed(2)}`);
					}
				}
			}
			expect(failures).toEqual([]);
		});
	}
});

test.describe('VP-02 word-role explorer: G-01/G-03 examples on /kaidah/frasa/', () => {
	test('highlights both ends of jarr–majrūr and iḍāfah, with the reason for each kasrah', async ({
		page
	}) => {
		await page.goto(frasa);
		const box = page.locator('#idafah-jar [data-word-role-explorer]');
		await expect(box.getByRole('button').first()).toBeVisible();
		await expect(box).toHaveAttribute('data-layer', 'role');

		const sentence = box.locator('[data-wr-sentence="ph-fi-kitab-talib"]');
		await word(sentence, 'كِتَابِ').click();
		await expect(word(sentence, 'فِي')).toHaveAttribute('data-state', 'related');
		await expect(word(sentence, 'الطَّالِبِ')).toHaveAttribute('data-state', 'related');
		const panel = sentence.locator('[data-wr-panel]');
		await expect(panel).toContainText('Muḍāf');
		await expect(panel).toContainText('Sekaligus: Majrūr');
		await expect(panel).toContainText('Berkasrah karena فِي, bukan karena menjadi muḍāf');
		await expect(panel).toContainText('Di dalam buku murid itu.');
		await expect(
			panel.getByRole('link', { name: 'Kaidah iḍāfah dan jarr–majrūr' })
		).toHaveAttribute('href', /\/kaidah\/frasa\/#idafah-jar$/);

		// Choosing another word in another sentence closes the first panel.
		await word(box.locator('[data-wr-sentence="ph-fi-al-bait"]'), 'الْبَيْتِ').click();
		await expect(panel).toBeHidden();
		await expect(box.locator('[data-wr-panel]')).toHaveCount(1);
	});

	test('keeps an attached subject pronoun inside its verb', async ({ page }) => {
		await page.goto(frasa);
		const box = page.locator('#perubahan-irab [data-word-role-explorer]');
		await expect(box.getByRole('button').first()).toBeVisible();
		await layerChoice(box, 'Jenis kata').click();
		const sentence = box.locator('[data-wr-sentence="ph-raaytu-talib"]');
		// One button for the whole written verb, never one per part.
		await expect(sentence.getByRole('button')).toHaveCount(2);
		await word(sentence, 'رَأَيْتُ').click();
		const panel = sentence.locator('[data-wr-panel]');
		await expect(panel).toContainText('Bagian dari satu kata ini');
		await expect(panel).toContainText('Kata ganti pelaku');
	});

	test('does not offer the sharaf layer where no annotation carries sharaf notes', async ({
		page
	}) => {
		await page.goto(frasa);
		const box = page.locator('#naat-agreement [data-word-role-explorer]');
		await expect(box.getByRole('button').first()).toBeVisible();
		await expect(layerChoice(box, 'Jenis kata')).toBeVisible();
		await expect(layerChoice(box, 'Peran dalam kalimat')).toBeVisible();
		await expect(layerChoice(box, 'Bentuk sharaf')).toHaveCount(0);
	});
});

test.describe('VP-02 word-role explorer: G-01 on /kaidah/', () => {
	test('contrasts mubtada’–khabar with na‘at–man‘ūt for the same words', async ({ page }) => {
		await page.goto('/kaidah/');
		const nominal = page.locator('#mubtada-khabar [data-word-role-explorer]');
		await expect(nominal.getByRole('button').first()).toBeVisible();
		await expect(nominal.locator('[data-wr-sentence]')).toHaveCount(2);
		const sentence = nominal.locator('[data-wr-sentence="g1-kitab-jadid-khabar"]');
		await word(sentence, 'جَدِيدٌ').click();
		await expect(word(sentence, 'الْكِتَابُ')).toHaveAttribute('data-state', 'related');
		const panel = sentence.locator('[data-wr-panel]');
		await expect(panel).toContainText('Khabar');
		await expect(panel).toContainText('Buku itu baru.');
		await expect(panel.getByRole('link', { name: /Kaidah mubtada’ dan khabar/ })).toHaveAttribute(
			'href',
			/\/kaidah\/#mubtada-khabar$/
		);

		const phrase = page.locator('#nat-manut [data-word-role-explorer]');
		await expect(phrase.locator('[data-wr-sentence]')).toHaveCount(2);
		await word(phrase.locator('[data-wr-sentence="ph-kitab-jadid"]'), 'جَدِيدٌ').click();
		await expect(phrase.locator('[data-wr-panel]')).toContainText('Na‘at');
		await expect(page.locator('#idafah [data-wr-sentence]')).toHaveCount(2);
	});
});

test.describe('VP-02 without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('lesson keeps sentence, glosses, labels, reasons and sources in the HTML', async ({
		page
	}) => {
		await page.goto(lesson);
		const box = explorer(page);
		await expect(box.getByRole('button')).toHaveCount(0);
		await expect(box.locator('span.wr-word').first()).toHaveText('الْبَابُ');
		await expect(box.locator('span.wr-word').first()).toHaveAttribute('dir', 'rtl');
		await expect(box.getByText('pintu itu', { exact: true }).first()).toBeVisible();
		await expect(box.getByText('Isim', { exact: true }).first()).toBeVisible();
		await expect(box.getByText('Terjemahan', { exact: true }).first()).toBeVisible();

		const details = box.locator('[data-wr-details]').first();
		await details.getByText('Rincian per kata, sumber, dan status').click();
		await expect(details.locator('ol > li')).toHaveCount(2);
		await expect(details).toContainText('Topik kalimat nominal');
		await expect(details).toContainText('Mubtada’ berstatus rafa‘, tandanya ḍammah.');
		await expect(details).toContainText('Isim maf‘ūl dari فَتَحَ');
		await expect(details).toContainText('Mubtada’–khabar');
		await expect(details).toContainText('Status: draf');
		await expect(details.getByRole('link', { name: /Al-Ājurrūmiyyah/ }).first()).toHaveAttribute(
			'href',
			/wikisource\.org/
		);
		await expect(details).toContainText('Bāb al-mubtada’ wa-l-khabar');
	});

	test('G-03 section lists the same analysis for each annotated example', async ({ page }) => {
		await page.goto(frasa);
		const box = page.locator('#idafah-jar [data-word-role-explorer]');
		await expect(box.locator('[data-wr-sentence]')).toHaveCount(3);
		await expect(box.locator('[data-wr-details]')).toHaveCount(3);
		await expect(box).toContainText('Berkasrah karena فِي, bukan karena menjadi muḍāf');
	});
});

test.describe('VP-02 layout at four widths', () => {
	for (const width of [320, 390, 768, 1440]) {
		test(`${width}px: no horizontal overflow with a panel open`, async ({ page }) => {
			await page.setViewportSize({ width, height: 900 });
			for (const [url, selector, wordText] of [
				[lesson, '[data-word-role-explorer]', 'الْبَابُ'],
				[frasa, '#idafah-jar [data-word-role-explorer]', 'كِتَابِ']
			] as const) {
				await page.goto(url);
				const box = page.locator(selector).first();
				await expect(box.getByRole('button').first()).toBeVisible();
				await layerChoice(box, 'Peran dalam kalimat').click();
				await word(box, wordText).first().click();
				await expect(box.locator('[data-wr-panel]')).toBeVisible();
				await box.locator('[data-wr-details] summary').first().click();
				const { scrollWidth, clientWidth } = await page.evaluate(() => ({
					scrollWidth: document.documentElement.scrollWidth,
					clientWidth: document.documentElement.clientWidth
				}));
				expect(scrollWidth, url).toBeLessThanOrEqual(clientWidth);
				const overflowing = await box.evaluate((el) => {
					const right = el.getBoundingClientRect().right;
					return [...el.querySelectorAll('*')].filter(
						(node) => node.getBoundingClientRect().right > right + 1
					).length;
				});
				expect(overflowing, url).toBe(0);
			}
		});
	}
});
