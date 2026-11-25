import { expect, test } from '@playwright/test';

test('‘amal lesson shows rules, examples and exercises with prerequisites', async ({ page }) => {
	await page.goto('/kaidah/participle/amal/');
	await expect(
		page.getByRole('heading', { name: '‘Amal isim fā‘il dan isim maf‘ūl', level: 1 })
	).toBeVisible();
	await expect(page.locator('article[id^="g02.amal-"]')).toHaveCount(4);
	await expect(page.locator('li[id^="amal-ex-"]')).toHaveCount(7);
	await expect(page.locator('li[id^="amal-0"]')).toHaveCount(7);
	await expect(page.locator('#amal-ex-02')).toContainText('كَاتِبٌ الدَّرْسَ');
	await expect(page.locator('#amal-ex-04')).toContainText('كَاتِبُ الدَّرْسِ');
	await expect(page.locator('#amal-ex-05')).toContainText('nā’ib al-fā‘il');
	const maful = page.locator('[id="g02.amal-isim-maful"]');
	await expect(maful.locator('[data-prerequisite-rule="g02.amal-isim-fail"] a')).toHaveAttribute(
		'href',
		/#g02\.amal-isim-fail$/
	);
	await expect(maful.locator('[data-prerequisite-competency="CB-14"]')).toBeVisible();
	await page.locator('#amal-05 summary').click();
	await expect(page.locator('#amal-05')).toContainText('nā’ib al-fā‘il');
	await expect(page.locator('#amal-04 summary')).toBeVisible();
});

test('participle page links to the ‘amal lesson', async ({ page }) => {
	await page.goto('/kaidah/participle/');
	await page.getByRole('link', { name: /pengamalan isim fā‘il dan isim maf‘ūl/ }).click();
	await expect(page).toHaveURL(/\/kaidah\/participle\/amal\/$/);
});

test.describe('static ‘amal lesson', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
	test('renders all content without JavaScript and fits 375 px', async ({ page }) => {
		await page.goto('/kaidah/participle/amal/');
		await expect(page.locator('li[id^="amal-ex-"]')).toHaveCount(7);
		await expect(page.locator('li[id^="amal-0"]')).toHaveCount(7);
		await expect(page.locator('#amal-01')).toContainText('الْمُهَنْدِسُ مُصَمِّمٌ الْجِسْرَ');
		await expect(page.locator('html')).toHaveAttribute('lang', 'id');
		const arabic = page.locator('#amal-ex-01 [lang="ar"], #amal-ex-01 p[lang="ar"]').first();
		await expect(arabic).toHaveAttribute('dir', 'rtl');
		await page.locator('#amal-06 summary').click();
		await expect(page.locator('#amal-06')).toContainText('آثَارُهُ');
		const dimensions = await page.evaluate(() => ({
			content: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
	});
});
