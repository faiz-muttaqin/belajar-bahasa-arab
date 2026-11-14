import { expect, test } from '@playwright/test';

test('footer has no duplicated navigation and keeps a single source/privacy link', async ({
	page
}) => {
	await page.setViewportSize({ width: 1280, height: 850 });
	await page.goto('/');
	const footer = page.getByRole('contentinfo');
	await expect(footer.getByRole('navigation')).toHaveCount(0);
	await expect(footer.getByRole('link')).toHaveCount(1);
	await expect(footer.getByRole('link', { name: 'Sumber & privasi' })).toHaveAttribute(
		'href',
		/\/tentang\/$/
	);
	await expect(footer).toContainText('Materi masih dalam peninjauan pengajar.');
	await expect(page.getByRole('navigation', { name: 'Navigasi utama' })).toBeVisible();
});

test('compact footer and harakat chart fit a mobile viewport', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('/iqra/');
	const footer = page.getByRole('contentinfo');
	await expect(footer.getByRole('navigation')).toHaveCount(0);
	const widths = await page.evaluate(() => ({
		scroll: document.documentElement.scrollWidth,
		client: document.documentElement.clientWidth
	}));
	expect(widths.scroll).toBeLessThanOrEqual(widths.client);
});

test('Iqra chart shows eleven marks and a working recall column', async ({ page }) => {
	await page.goto('/iqra/#bagan-harakat');
	const chart = page.locator('#bagan-harakat');
	const table = chart.getByRole('table');
	await expect(table.locator('tbody tr[id^="bagan-harakat-"]')).toHaveCount(11);
	await expect(table.getByText('ـَ', { exact: true })).toBeVisible();
	await expect(chart.getByText('Materi masih menunggu tinjauan pengajar.')).toBeVisible();
	await chart.getByRole('radio', { name: 'Sembunyikan bunyi' }).check();
	await expect(table.getByText('ba', { exact: true })).toBeHidden();
	await chart.getByRole('button', { name: 'Buka: Bunyi, baris 1' }).click();
	await expect(table.getByText('ba', { exact: true })).toBeVisible();
});

test('new transfer lesson contains original exercises and the previous foundation track', async ({
	page
}) => {
	await page.goto('/iqra/');
	await page.getByRole('link', { name: /Latih harakat pada rangkaian baru/ }).click();
	await expect(page).toHaveURL(/\/iqra\/latih-harakat\/$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'Latih harakat pada rangkaian baru'
	);
	const exercises = page.getByRole('region', { name: 'Latihan pemahaman' });
	await expect(exercises.getByText('Lihat pembahasan', { exact: true })).toHaveCount(4);
});

test.describe('static HTML without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('contains harakat reference and new Iqra content', async ({ page }) => {
		await page.goto('/iqra/');
		await expect(page.locator('#bagan-harakat').getByRole('table')).toBeVisible();
		await expect(page.locator('#bagan-harakat tbody tr[id^="bagan-harakat-"]')).toHaveCount(11);
		await expect(
			page.getByRole('link', { name: /Latih harakat pada rangkaian baru/ })
		).toBeVisible();
		await page.goto('/iqra/latih-harakat/');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(
			'Latih harakat pada rangkaian baru'
		);
	});
});
