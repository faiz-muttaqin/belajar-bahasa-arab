import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('RM-03 prerenders all seven stages, 27 steps and 29 uniquely identified lesson links', async () => {
	const html = await readFile('build/belajar/index.html', 'utf8');
	expect(html).toContain('<title>Peta belajar · Belajar Bahasa Arab</title>');
	expect([...html.matchAll(/data-roadmap-stage="([^"]+)"/g)]).toHaveLength(7);
	expect([...html.matchAll(/data-roadmap-step="([^"]+)"/g)]).toHaveLength(27);
	const ids = [...html.matchAll(/data-map-lesson="([^"]+)"/g)].map((match) => match[1]);
	expect(ids).toHaveLength(29);
	expect(new Set(ids).size).toBe(29);
	expect(html).toContain('Draf · bersumber, belum ditinjau ustadz');
	expect(html).not.toContain('Belum dimulai');
	expect(html).not.toContain('Anda di sini');
});

for (const width of [320, 390, 1440]) {
	test.describe(`RM-03 no JavaScript at ${width}px`, () => {
		test.use({ javaScriptEnabled: false, viewport: { width, height: 900 } });
		test('reads goals, prerequisites and sources through native disclosures', async ({ page }) => {
			await page.goto('/belajar/');
			await expect(page.getByRole('heading', { level: 1, name: 'Peta belajar' })).toBeVisible();
			await expect(page.locator('[data-map-lesson]')).toHaveCount(29);
			const step = page.locator('#step-u5');
			await step.getByText('Tujuan dan rujukan', { exact: true }).click();
			await expect(step.getByRole('list', { name: 'Tujuan langkah' })).toBeVisible();
			await expect(step.getByRole('list', { name: 'Prasyarat yang disarankan' })).toBeVisible();
			await expect(
				step.getByRole('link', { name: 'Benda di sekitar', exact: true })
			).toHaveAttribute('href', '#step-u2');
			await step.getByText('Sumber pembelajaran', { exact: true }).click();
			await expect(step.getByRole('link', { name: /Graf kompetensi/ })).toBeVisible();
			const widths = await page.evaluate(() => ({
				scroll: document.documentElement.scrollWidth,
				client: document.documentElement.clientWidth
			}));
			expect(widths.scroll).toBeLessThanOrEqual(widths.client);
			await step.locator('[data-map-lesson]').click();
			await expect(page).toHaveURL(/\/belajar\/hubungan-milik\/$/);
			await expect(page.locator('p[lang="ar"][dir="rtl"]').first()).toBeVisible();
		});
	});
}

test('RM-03 keeps planned branches and checkpoints informational and Iqra optional', async ({
	page
}) => {
	await page.goto('/belajar/');
	await expect(page.locator('#branch-conversation')).toContainText('Direncanakan');
	await expect(page.locator('#branch-conversation').getByRole('link')).toHaveCount(0);
	await expect(page.getByRole('complementary', { name: /^Titik cek / })).toHaveCount(7);
	await expect(
		page.getByRole('complementary', { name: /^Titik cek / }).getByRole('button')
	).toHaveCount(0);
	const firstLesson = page.locator('[data-map-lesson]').first();
	await expect(firstLesson).toHaveAttribute('data-map-lesson', 'lesson-u1-01');
	await expect(
		page.getByRole('region', { name: 'Fondasi membaca opsional' }).locator('[data-map-lesson]')
	).toHaveCount(6);
	await expect(
		page.locator('#branch-reference').getByRole('link', { name: 'Sharaf', exact: true })
	).toHaveAttribute('href', '/kaidah/sharaf/');
});

test.describe('RM-03 keyboard detail dialog', () => {
	test.use({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
	test('opens with Enter, contains keyboard focus and returns focus on Escape and close', async ({
		page
	}) => {
		await page.goto('/belajar/');
		const trigger = page.getByRole('button', {
			name: 'Rincian langkah: Hubungan milik',
			exact: true
		});
		await trigger.focus();
		await page.keyboard.press('Enter');
		const dialog = page.getByRole('dialog', { name: 'Hubungan milik', exact: true });
		await expect(dialog).toBeVisible();
		await expect(dialog.getByRole('button', { name: 'Tutup' })).toBeFocused();
		await page.keyboard.press('Shift+Tab');
		expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
		await page.keyboard.press('Escape');
		await expect(dialog).toBeHidden();
		await expect(trigger).toBeFocused();
		await page.keyboard.press('Enter');
		await dialog.getByRole('button', { name: 'Tutup' }).click();
		await expect(trigger).toBeFocused();
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
			390
		);
	});
	test('following a suggested step closes the dialog and changes the map anchor', async ({
		page
	}) => {
		await page.goto('/belajar/');
		await page
			.getByRole('button', { name: 'Rincian langkah: Hubungan milik', exact: true })
			.click();
		const dialog = page.getByRole('dialog', { name: 'Hubungan milik', exact: true });
		await dialog.getByRole('link', { name: 'Benda di sekitar', exact: true }).click();
		await expect(dialog).toBeHidden();
		await expect(page).toHaveURL(/\/belajar\/#step-u2$/);
		await expect(page.locator('#step-u2')).toBeInViewport();
	});
});

test('RM-03 lesson navigation and browser back/forward preserve the client document', async ({
	page
}) => {
	await page.goto('/belajar/#menengah');
	await page.evaluate(() => {
		(window as Window & { roadmapNavigation?: string }).roadmapNavigation = 'same-document';
	});
	await page.locator('[data-map-lesson="lesson-u11-01"]').click();
	await expect(page).toHaveURL(/\/belajar\/gagasan-utama-paragraf\/$/);
	await page.goBack();
	await expect(page).toHaveURL(/\/belajar\/#menengah$/);
	await expect(page.getByRole('heading', { level: 1, name: 'Peta belajar' })).toBeVisible();
	await page.goForward();
	await expect(page).toHaveURL(/\/belajar\/gagasan-utama-paragraf\/$/);
	expect(
		await page.evaluate(() => (window as Window & { roadmapNavigation?: string }).roadmapNavigation)
	).toBe('same-document');
});

for (const colorScheme of ['light', 'dark'] as const) {
	test.describe(`RM-03 ${colorScheme} map`, () => {
		test.use({ colorScheme, viewport: { width: 1440, height: 900 } });
		test('keeps desktop stage navigation and detail controls readable', async ({ page }) => {
			await page.goto('/belajar/');
			await expect(page.locator('html')).toHaveCSS('color-scheme', colorScheme);
			await expect(page.getByRole('navigation', { name: 'Tahap peta belajar' })).toBeVisible();
			await page
				.getByRole('button', { name: 'Rincian langkah: Kata inti shalat', exact: true })
				.click();
			await expect(
				page.getByRole('dialog', { name: 'Kata inti shalat', exact: true })
			).toBeVisible();
			await page.keyboard.press('Escape');
		});
	});
}
