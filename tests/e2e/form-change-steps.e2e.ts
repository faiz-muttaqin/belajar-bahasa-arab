import { expect, test, type Locator, type Page } from '@playwright/test';

const pages = {
	nominal: { url: '/kaidah/', scope: '#mubtada-khabar', id: 'cs-sifat-ke-khabar' },
	preposition: { url: '/kaidah/frasa/', scope: '#idafah-jar', id: 'cs-fi-mudhaf' },
	passive: { url: '/belajar/kalimat-aktif-dan-pasif/', scope: 'main', id: 'cs-aktif-ke-pasif' }
} as const;

type Entry = (typeof pages)[keyof typeof pages];

const box = (page: Page, entry: Entry) =>
	page.locator(`${entry.scope} [data-form-change-steps="${entry.id}"]`);
const button = (scope: Locator, name: string) => scope.getByRole('button', { name, exact: true });

async function open(page: Page, entry: Entry) {
	await page.goto(entry.url);
	const root = box(page, entry);
	await expect(button(root, 'Lihat perubahan')).toBeVisible(); // hydrated
	return root;
}

test.describe('VP-03 change steps: active to passive lesson', () => {
	test('shows nothing moving until the learner asks, then one change at a time', async ({
		page
	}) => {
		const root = await open(page, pages.passive);
		await expect(root).toHaveAttribute('data-step', '0');
		await expect(root.locator('[data-fcs-step]')).toHaveCount(0);
		await expect(root.locator('[data-fcs-mark]')).toHaveCount(0);
		await expect(root.locator('[data-fcs-row="before"]')).toContainText('فَتَحَ');
		await expect(root.locator('[data-fcs-row="after"]')).toContainText('فُتِحَ');
		await expect(button(root, 'Hentikan')).toHaveCount(0);

		// Nothing advances by itself.
		await page.waitForTimeout(700);
		await expect(root).toHaveAttribute('data-step', '0');

		await button(root, 'Lihat perubahan').click();
		await expect(root).toHaveAttribute('data-step', '1');
		const step = root.locator('[data-fcs-step="1"]');
		await expect(step).toContainText('Vokal fi‘il berubah');
		await expect(step).toContainText('فَتَحَ');
		await expect(step).toContainText('فُتِحَ');
		await expect(step).toContainText('Alasan');
		await expect(step).toContainText('fataḥa menjadi futiḥa');
		await expect(step.getByRole('link', { name: /Al-Ājurrūmiyyah/ })).toHaveAttribute(
			'href',
			/wikisource\.org/
		);
		// The marked words carry a written label, not only a colour.
		await expect(
			root.locator('[data-fcs-row="before"] [data-token="wc-penjaga-membuka.t1"]')
		).toContainText('Berubah');
		await expect(
			root.locator('[data-fcs-row="before"] [data-token="wc-penjaga-membuka.t2"]')
		).not.toContainText('Berubah');

		await expect(button(root, 'Sebelumnya')).toBeDisabled();
		await button(root, 'Berikutnya').click();
		await expect(root).toHaveAttribute('data-step', '2');
		await expect(root.locator('[data-fcs-step="2"]')).toContainText('Pelaku tidak disebut');
		await expect(root.locator('[data-fcs-step="2"]')).toContainText('(tidak disebut)');
		await expect(root.locator('[data-fcs-step]')).toHaveCount(1);

		await button(root, 'Berikutnya').click();
		const last = root.locator('[data-fcs-step="3"]');
		await expect(last).toContainText('Objek menempati tempat pelaku');
		await expect(last).toContainText('الْبَابَ');
		await expect(last).toContainText('الْبَابُ');
		await expect(last).toContainText('Maf‘ūl bih → Nā’ib al-fā‘il');
		await expect(button(root, 'Berikutnya')).toBeDisabled();
		await expect(root.locator('[data-fcs-progress]')).toHaveText('Langkah 3 dari 3');

		await button(root, 'Sebelumnya').click();
		await expect(root).toHaveAttribute('data-step', '2');

		await button(root, 'Ulangi').click();
		await expect(root).toHaveAttribute('data-step', '1');
		await expect(button(root, 'Ulangi')).toBeDisabled();
	});

	test('works with the keyboard, keeps focus on an enabled control and announces politely', async ({
		page
	}) => {
		const root = await open(page, pages.passive);
		const live = root.locator('[data-fcs-announcement]');
		await expect(live).toHaveAttribute('aria-live', 'polite');

		await button(root, 'Lihat perubahan').focus();
		await page.keyboard.press('Enter');
		await expect(button(root, 'Berikutnya')).toBeFocused();
		await expect(live).toContainText('Langkah 1 dari 3: Vokal fi‘il berubah');

		await page.keyboard.press('Enter');
		await expect(live).toContainText('Langkah 2 dari 3: Pelaku tidak disebut');
		await page.keyboard.press('Space');
		await expect(live).toContainText('Langkah 3 dari 3');
		// The focused "Berikutnya" became disabled: focus moves on instead of being lost.
		await expect(button(root, 'Ulangi')).toBeFocused();

		await page.keyboard.press('Enter');
		await expect(root).toHaveAttribute('data-step', '1');
		await expect(button(root, 'Berikutnya')).toBeFocused();

		// Visible focus ring.
		const outline = await button(root, 'Berikutnya').evaluate(
			(el) => getComputedStyle(el).outlineStyle
		);
		expect(outline).not.toBe('none');
	});

	test('keeps the Arabic selectable, joined, right to left and unmoved between steps', async ({
		page
	}) => {
		const root = await open(page, pages.passive);
		const word = root.locator('[data-token="wc-penjaga-membuka.t2"] [lang="ar"]');
		await expect(word).toHaveAttribute('dir', 'rtl');
		const style = () =>
			word.evaluate((el) => {
				const s = getComputedStyle(el);
				const r = el.getBoundingClientRect();
				return {
					width: r.width,
					height: r.height,
					userSelect: s.userSelect,
					padding: s.padding,
					border: s.borderTopWidth,
					letterSpacing: s.letterSpacing,
					direction: s.direction
				};
			});
		const before = await style();
		await button(root, 'Lihat perubahan').click();
		await button(root, 'Berikutnya').click(); // step 2 marks this word
		await expect(word).toHaveAttribute('data-mark', 'changing');
		const during = await style();
		expect(during).toEqual(before);
		expect(during.userSelect).not.toBe('none');
		expect(during.direction).toBe('rtl');
	});

	test('with reduced motion no animation or transition runs and each step still shows its content', async ({
		page
	}) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		const root = await open(page, pages.passive);
		await button(root, 'Lihat perubahan').click();
		const step = root.locator('[data-fcs-step="1"]');
		await expect(step).toBeVisible();
		const motion = await step.evaluate((el) => {
			const s = getComputedStyle(el);
			return { name: s.animationName, opacity: s.opacity };
		});
		expect(motion.name).toBe('none');
		expect(motion.opacity).toBe('1');
		const wordTransition = await root
			.locator('.fcs-word')
			.first()
			.evaluate((el) => parseFloat(getComputedStyle(el).transitionDuration));
		expect(wordTransition).toBeLessThanOrEqual(0.001);

		await button(root, 'Berikutnya').click();
		await button(root, 'Berikutnya').click();
		await expect(root.locator('[data-fcs-step="3"]')).toContainText('Alasan');
		await expect(root.locator('[data-fcs-step="3"]')).toContainText('الْبَابُ');
	});

	test('uses a short animation only when motion is allowed', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'no-preference' });
		const root = await open(page, pages.passive);
		await button(root, 'Lihat perubahan').click();
		const motion = await root.locator('[data-fcs-step="1"]').evaluate((el) => {
			const s = getComputedStyle(el);
			return {
				name: s.animationName,
				duration: parseFloat(s.animationDuration),
				count: s.animationIterationCount
			};
		});
		expect(motion.name).toMatch(/fcs-in$/);
		expect(motion.duration).toBeLessThanOrEqual(0.2);
		expect(motion.count).toBe('1');
	});
});

test.describe('VP-03 change steps: G-01 and G-03 pages', () => {
	test('G-01 phrase with adjective becomes a nominal sentence', async ({ page }) => {
		const root = await open(page, pages.nominal);
		await expect(root.locator('[data-fcs-row="before"]')).toContainText('الْكِتَابُ');
		await expect(root.locator('[data-fcs-row="before"]')).toContainText('الْجَدِيدُ');
		await expect(root.locator('[data-fcs-row="after"]')).toContainText('جَدِيدٌ');
		await button(root, 'Lihat perubahan').click();
		await expect(root.locator('[data-fcs-step="1"]')).toContainText('Kata sifat melepas');
		// Step 1 names the word that stays.
		await expect(root.locator('[data-fcs-step="1"] [data-fcs-stays]')).toContainText(
			'tidak berubah bentuk'
		);
		await button(root, 'Berikutnya').click();
		const step = root.locator('[data-fcs-step="2"]');
		await expect(step).toContainText('Na‘at → Khabar');
		// Another word changes together with the main change.
		await expect(step.locator('[data-fcs-dependents]')).toContainText('Man‘ūt → Mubtada’');
		await expect(
			root.locator('[data-fcs-row="before"] [data-token="ph-kitab-jadid-def.t1"]')
		).toContainText('Ikut berubah');
		await expect(
			root.locator('[data-fcs-row="after"] [data-token="g1-kitab-jadid-khabar.t1"]')
		).toContainText('Ikut berubah');
	});

	test('G-03 muḍāf takes the case of a preceding harf jarr', async ({ page }) => {
		const root = await open(page, pages.preposition);
		await button(root, 'Lihat perubahan').click();
		const first = root.locator('[data-fcs-step="1"]');
		await expect(first).toContainText('فِي');
		await expect(first).toContainText('(belum ada)');
		await button(root, 'Berikutnya').click();
		const second = root.locator('[data-fcs-step="2"]');
		await expect(second).toContainText('كِتَابُ');
		await expect(second).toContainText('كِتَابِ');
		await expect(second).toContainText('Harakat akhir');
		await expect(second.locator('[data-fcs-stays]')).toContainText('sebab yang berbeda');
		await expect(
			root.locator('[data-fcs-row="after"] [data-token="ph-fi-kitab-talib.t3"]')
		).toContainText('Tetap');
	});
});

test.describe('VP-03 change steps without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	for (const entry of Object.values(pages)) {
		test(`${entry.url} lists every step with its reason and source in the HTML`, async ({
			page
		}) => {
			await page.goto(entry.url);
			const root = box(page, entry);
			await expect(root.getByRole('button')).toHaveCount(0);
			await expect(root.locator('[data-fcs-row="before"] [lang="ar"]').first()).toBeVisible();

			const details = root.locator('[data-fcs-details]');
			await details.getByText('Semua langkah perubahan sebagai daftar').click();
			const items = details.locator('[data-fcs-list-step]');
			const count = await items.count();
			expect(count).toBeGreaterThanOrEqual(2);
			for (let i = 0; i < count; i++) {
				await expect(items.nth(i)).toContainText('Alasan');
				await expect(items.nth(i).getByRole('link').first()).toHaveAttribute('href', /^https:/);
			}
			await expect(details).toContainText('Status: draf');
			await expect(details).toContainText('Batas bukti');
		});
	}

	test('the passive list keeps all three steps and the changed forms', async ({ page }) => {
		await page.goto(pages.passive.url);
		const details = box(page, pages.passive).locator('[data-fcs-details]');
		await details.getByText('Semua langkah perubahan sebagai daftar').click();
		await expect(details.locator('[data-fcs-list-step]')).toHaveCount(3);
		await expect(details).toContainText('Vokal fi‘il berubah');
		await expect(details).toContainText('Pelaku tidak disebut');
		await expect(details).toContainText('Objek menempati tempat pelaku');
	});
});

test.describe('VP-03 change steps: layout', () => {
	for (const entry of Object.values(pages)) {
		for (const width of [320, 390, 768, 1440]) {
			test(`${entry.id} at ${width}px: no horizontal overflow with every step open`, async ({
				page
			}) => {
				await page.setViewportSize({ width, height: 900 });
				const root = await open(page, entry);
				await button(root, 'Lihat perubahan').click();
				await root.locator('details').first().locator('summary').click();

				const total = await root.locator('[data-fcs-progress]').innerText();
				const steps = Number(/dari (\d+)/.exec(total)?.[1]);
				for (let n = 1; n <= steps; n++) {
					await expect(root.locator(`[data-fcs-step="${n}"]`)).toBeVisible();
					const overflow = await page.evaluate(
						() => document.documentElement.scrollWidth - document.documentElement.clientWidth
					);
					expect(overflow, `step ${n}`).toBeLessThanOrEqual(0);
					const inner = await root.evaluate(
						(el) =>
							[...el.querySelectorAll('*')].filter(
								(node) => node.getBoundingClientRect().right > el.getBoundingClientRect().right + 1
							).length
					);
					expect(inner, `step ${n}`).toBe(0);
					if (n < steps) await button(root, 'Berikutnya').click();
				}
			});
		}
	}

	test('uses the dark theme tokens and keeps the marked words readable', async ({ page }) => {
		await page.goto(pages.passive.url);
		const root = box(page, pages.passive);
		await expect(button(root, 'Lihat perubahan')).toBeVisible();
		await page.evaluate(() => document.documentElement.classList.add('dark'));
		await button(root, 'Lihat perubahan').click();
		const colours = await root
			.locator('[data-token="wc-penjaga-membuka.t1"] [lang="ar"]')
			.evaluate((el) => {
				const s = getComputedStyle(el);
				return { color: s.color, background: s.backgroundColor };
			});
		expect(colours.background).not.toBe('rgba(0, 0, 0, 0)');
		expect(colours.color).not.toBe(colours.background);
	});
});
