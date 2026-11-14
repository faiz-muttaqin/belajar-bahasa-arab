import { expect, test } from '@playwright/test';

const pages = [
	['/rujukan/fiil/', 'Rujukan kata kerja'],
	['/rujukan/isim/', 'Rujukan kata benda dan sifat'],
	['/rujukan/harf/', 'Rujukan kata hubung dan kata tugas'],
	['/rujukan/kata-tanya/', 'Rujukan kata tanya']
] as const;

test('the hub links to each word-class page', async ({ page }) => {
	await page.goto('/rujukan/');
	for (const [path] of pages) {
		await expect(page.locator(`main a[href$="${path}"]`)).toHaveCount(1);
	}
});

for (const [path, title] of pages) {
	test(`${path} has a subnav marking the current page and fits a phone`, async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.goto(path);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
		const nav = page.getByRole('navigation', { name: 'Jenis kata' });
		await expect(nav.getByRole('link')).toHaveCount(4);
		await expect(nav.locator('[aria-current="page"]')).toHaveAttribute('href', new RegExp(path));
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
			375
		);
	});
}

test('isim tables render with hafalan mode', async ({ page }) => {
	await page.goto('/rujukan/isim/');
	const pronouns = page.getByRole('region', { name: /Kata ganti berdiri sendiri/ });
	await expect(pronouns.getByRole('row')).toHaveCount(13);
	await expect(pronouns.getByText('نَحْنُ', { exact: true })).toBeVisible();
	await pronouns.getByRole('radio', { name: 'Sembunyikan arti' }).check();
	await expect(pronouns.getByText('saya', { exact: true })).toHaveCount(0);
});

test('an old anchor link on the hub moves to the new page', async ({ page }) => {
	await page.goto('/rujukan/#kata-penghubung');
	await expect(page).toHaveURL(/\/rujukan\/harf\/#kata-penghubung$/);
});

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('question words ship as static HTML', async ({ page }) => {
		await page.goto('/rujukan/kata-tanya/');
		await expect(page.getByText('لِمَاذَا', { exact: true }).first()).toBeVisible();
	});
});
