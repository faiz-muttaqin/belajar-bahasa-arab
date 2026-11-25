import { expect, test } from '@playwright/test';

test('G-03 is linked from the grammar map and original isim reference', async ({ page }) => {
	await page.goto('/kaidah/');
	await page.getByRole('link', { name: 'Pelajari frasa dan i‘rab' }).click();
	await expect(page).toHaveURL(/\/kaidah\/frasa\/$/);
	await expect(page.getByRole('heading', { name: 'Frasa dan i‘rab' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Perubahan kata (sharaf)' })).toBeVisible();

	await page.goto('/rujukan/isim/');
	await page.getByRole('link', { name: 'Buka kaidah frasa dan i‘rab' }).click();
	await expect(page).toHaveURL(/\/kaidah\/frasa\/$/);
});

test('G-03 presents distinct case labels, word glosses and a clarifying exercise', async ({
	page
}) => {
	await page.goto('/kaidah/frasa/');
	await expect(page.locator('section[id] figure')).toHaveCount(51);
	await expect(page.getByLabel('Legenda i‘rab')).toContainText('Rafa‘');
	await expect(page.getByLabel('Legenda i‘rab')).toContainText('Naṣb');
	await expect(page.getByLabel('Legenda i‘rab')).toContainText('Jarr');

	const cases = page.locator('#perubahan-irab figure');
	await expect(cases).toHaveCount(3);
	await expect(cases.nth(0)).toContainText('الطَّالِبُ');
	await expect(cases.nth(1)).toContainText('الطَّالِبَ');
	await expect(cases.nth(2)).toContainText('الطَّالِبِ');
	await expect(cases.nth(0).locator('[data-irab="raf"]')).toContainText('ḍamma');
	await expect(cases.nth(1).locator('[data-irab="nasb"]')).toContainText('fatḥa');
	await expect(cases.nth(2).locator('[data-irab="jarr"]')).toContainText('kasra');

	await page.locator('#perubahan-irab summary').first().click();
	await expect(page.locator('#perubahan-irab details').first()).toContainText('Lema dasarnya sama');
});

test('G-03 illustrates nominal plurality and nested idafah without colour-only labels', async ({
	page
}) => {
	await page.goto('/kaidah/frasa/');
	await expect(page.locator('#naat-agreement')).toContainText('كُتُبٌ');
	await expect(page.locator('#naat-agreement')).toContainText('Jamak benda tidak berakal');
	await expect(page.locator('#idafah-jar')).toContainText('كِتَابِ');
	await expect(page.locator('#idafah-jar')).toContainText('الطَّالِبِ');
	await expect(page.locator('#jumlah-dan-gender')).toContainText('طَالِبَانِ');
	await expect(page.locator('#jumlah-dan-gender')).toContainText('طَالِبَيْنِ');
});

const edgeRules = [
	['zharf-makan-zaman', 5],
	['muannath-salim', 6],
	['asma-khamsa', 4],
	['jamak-taksir-mamnu', 5],
	['maqshur-manqush', 5],
	['kata-mabni', 5],
	['idafah-nasb-marifah', 5]
] as const;

test('G-03 edge cases present each sourced rule with its own limit and citations', async ({
	page
}) => {
	await page.goto('/kaidah/frasa/');
	for (const [id, count] of edgeRules) {
		const section = page.locator(`#${id}`);
		await expect(section.locator('figure'), id).toHaveCount(count);
		await expect(section, id).toContainText('Batas kaidah:');
		await expect(section.locator('details').last(), id).toContainText('Wikisource');
	}
	await expect(page.locator('[data-scope-note]')).toContainText('kata mabnī');
	// Section 7 teaches kasrah as the naṣb sign of the feminine sound plural.
	const object = page.locator('#muannath-salim figure').nth(3);
	await expect(object).toContainText('الْمُعَلِّمَاتِ');
	await expect(object.locator('[data-irab="nasb"]')).toContainText('kasra (pengganti fatḥa)');
	// Section 8: wāw, alif and yā’ on the same noun.
	const father = page.locator('#asma-khamsa figure');
	await expect(father.nth(0).locator('[data-irab="raf"]').first()).toContainText('wāw');
	await expect(father.nth(1).locator('[data-irab="nasb"]')).toContainText('alif');
	await expect(father.nth(2).locator('[data-irab="jarr"]').first()).toContainText('yā’');
	// A mabnī word carries no case chip.
	const mabni = page.locator('#kata-mabni figure').nth(2);
	await expect(mabni.locator('[data-irab="none"]')).toHaveCount(2);
	await expect(mabni).toContainText('mabnī');
});

test('G-03 word-role explorer covers the new rules and Ẓarf has its own label', async ({
	page
}) => {
	await page.goto('/kaidah/frasa/');
	for (const [id, count] of edgeRules) {
		const box = page.locator(`#${id} [data-word-role-explorer]`);
		await expect(box.getByRole('button').first(), id).toBeVisible();
		await expect(box.locator('[data-wr-sentence]'), id).toHaveCount(count);
	}
	const box = page.locator('#zharf-makan-zaman [data-word-role-explorer]');
	await box.getByRole('button', { name: 'فَوْقَ', exact: true }).click();
	const panel = box.locator('[data-wr-panel]');
	await expect(panel).toBeVisible();
	await expect(panel).toContainText('Ẓarf');
	await expect(panel).toContainText('fatḥah');
});

test('G-03 change sequences show kasrah in naṣb and the alif of أَبَا', async ({ page }) => {
	await page.goto('/kaidah/frasa/');
	await expect(page.locator('#idafah-nasb-marifah [data-form-change-steps]')).toHaveCount(1);
	await expect(page.locator('#asma-khamsa [data-form-change-steps]')).toHaveCount(1);
	await expect(page.locator('#muannath-salim [data-form-change-steps]')).toContainText('الْمُعَلِّمَاتِ');
});

test.describe('G-03 dark theme', () => {
	test.use({ colorScheme: 'dark' });

	test('case colours stay distinct and every label keeps 4.5:1 contrast', async ({ page }) => {
		await page.goto('/kaidah/frasa/');
		await page.evaluate(() => document.documentElement.classList.add('dark'));
		await expect(page.locator('section[id] figure').first()).toBeVisible();

		const report = await page.evaluate(() => {
			const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!;
			// The canvas resolves any CSS colour (rgb, srgb, oklab from color-mix) to sRGB bytes.
			const paint = (css: string) => {
				ctx.fillStyle = css;
				ctx.fillRect(0, 0, 1, 1);
			};
			const pixel = () => Array.from(ctx.getImageData(0, 0, 1, 1).data);
			const lum = ([r, g, b]: number[]) => {
				const [x, y, z] = [r!, g!, b!].map((v) => {
					const c = v / 255;
					return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
				});
				return 0.2126 * x! + 0.7152 * y! + 0.0722 * z!;
			};
			const effectiveBackground = (el: Element) => {
				ctx.clearRect(0, 0, 1, 1);
				const chain: Element[] = [];
				for (let n: Element | null = el; n; n = n.parentElement) chain.unshift(n);
				for (const node of chain) paint(getComputedStyle(node).backgroundColor);
				return pixel();
			};
			const ratioOf = (el: Element) => {
				const bg = effectiveBackground(el);
				ctx.clearRect(0, 0, 1, 1);
				paint(`rgb(${bg[0]} ${bg[1]} ${bg[2]})`);
				paint(getComputedStyle(el).color);
				const fg = pixel();
				const [a, b] = [lum(fg), lum(bg)];
				return { ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), bg };
			};

			const page = effectiveBackground(document.body);
			const failures: string[] = [];
			const tints: Record<string, string> = {};
			for (const card of document.querySelectorAll('section[id] figure [data-irab]')) {
				const kind = card.getAttribute('data-irab')!;
				tints[kind] ??= effectiveBackground(card).join(',');
				for (const label of card.querySelectorAll('span')) {
					if (!label.textContent?.trim()) continue;
					const { ratio } = ratioOf(label);
					if (ratio < 4.5)
						failures.push(`${kind} ${label.textContent.trim().slice(0, 18)}: ${ratio.toFixed(2)}`);
				}
			}
			return { dark: lum(page) < 0.1, failures: failures.slice(0, 10), tints };
		});

		expect(report.dark).toBe(true);
		expect(report.failures).toEqual([]);
		const colours = ['raf', 'nasb', 'jarr', 'none'].map((kind) => report.tints[kind]);
		expect(new Set(colours).size).toBe(4);
	});

	test('the page body text is light on dark', async ({ page }) => {
		await page.goto('/kaidah/frasa/');
		await page.evaluate(() => document.documentElement.classList.add('dark'));
		const colours = await page.evaluate(() => ({
			text: getComputedStyle(document.querySelector('#zharf-makan-zaman p')!).color,
			bg: getComputedStyle(document.body).backgroundColor
		}));
		expect(colours.text).not.toBe(colours.bg);
	});
});

test.describe('G-03 static narrow-screen rendering with JavaScript disabled', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

	test('renders every annotated example without overflow and can reveal native exercise', async ({
		page
	}) => {
		await page.goto('/kaidah/frasa/');
		await expect(page.locator('section[id] figure')).toHaveCount(51);
		await expect(page.locator('#marifah-nakirah [data-irab="raf"]')).toHaveCount(2);
		await expect(page.locator('#jumlah-dan-gender [data-irab="nasb"]')).toHaveCount(2);
		await page.locator('#idafah-jar summary').first().click();
		await expect(page.locator('#idafah-jar details').first()).toContainText('كِتَابِ');
		const sizes = await page.evaluate(() => ({
			page: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
	});

	test('keeps the new rules right to left, in order and inside 375 px', async ({ page }) => {
		await page.goto('/kaidah/frasa/');
		for (const [id, count] of edgeRules) {
			const section = page.locator(`#${id}`);
			await expect(section.locator('figure'), id).toHaveCount(count);
			const arabic = section.locator('figure [lang="ar"]');
			for (const span of await arabic.all()) await expect(span).toHaveAttribute('dir', 'rtl');
			for (const row of await section.locator('figure [dir="rtl"][aria-label]').all()) {
				const cards = await row.locator('> div').all();
				if (cards.length < 2) continue;
				const first = await cards[0]!.boundingBox();
				const second = await cards[1]!.boundingBox();
				// Same line: the first word is on the right. Wrapped: it is on an earlier line.
				expect(first!.x > second!.x || first!.y < second!.y, id).toBe(true);
			}
			const overflow = await section.evaluate((el) => el.scrollWidth - el.clientWidth);
			expect(overflow, id).toBeLessThanOrEqual(0);
		}
		const sizes = await page.evaluate(() => ({
			page: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
	});
});
