import { expect, test } from '@playwright/test';

test('sharaf links to participles with 26 families and 104 exercises', async ({ page }) => {
	await page.goto('/kaidah/sharaf/');
	await page.getByRole('link', { name: 'Pelajari isim fā‘il dan isim maf‘ūl' }).click();
	await expect(page).toHaveURL(/\/kaidah\/participle\/$/);
	await expect(
		page.getByRole('heading', { name: 'Isim fā‘il dan isim maf‘ūl', exact: true })
	).toBeVisible();
	await expect(page.locator('li[id^="pair-"]')).toHaveCount(26);
	await expect(page.locator('li[id^="part-"]')).toHaveCount(104);
	await page.locator('#part-22 summary').click();
	await expect(page.locator('#part-22')).toContainText('maf‘ūl bih');
	await page.locator('#part-45 summary').click();
	await expect(page.locator('#part-45')).toContainText('tertulis sama');
});

test('each example links to its own wazan group and verb row', async ({ page }) => {
	await page.goto('/kaidah/participle/');
	const link = page.locator('#pair-nazama a[data-wazan-bab]');
	await expect(link).toHaveAttribute('data-wazan-bab', '7');
	await expect(link).toHaveAttribute('data-wazan-row', 'kata-kerja-bab-7-نظم-II-1');
	await expect(link).toHaveAttribute('href', /\/rujukan\/fiil\/kata-kerja\/7\/#/);
	await link.click();
	await expect(page).toHaveURL(/\/rujukan\/fiil\/kata-kerja\/7\/#/);
	await expect(page.locator('[id="kata-kerja-bab-7-نظم-II-1"]')).toHaveCount(1);
});

test('every wazan link on the participle page leads to an existing verb row', async ({
	page,
	request
}) => {
	await page.goto('/kaidah/participle/');
	const links = await page.locator('li[id^="pair-"] a[data-wazan-bab]').evaluateAll((nodes) =>
		nodes.map((node) => ({
			href: (node as HTMLAnchorElement).getAttribute('href') ?? '',
			row: (node as HTMLAnchorElement).dataset.wazanRow ?? ''
		}))
	);
	expect(links).toHaveLength(26);
	for (const { href, row } of links) {
		const response = await request.get(href.split('#')[0]!);
		expect(response.ok(), href).toBe(true);
		expect(await response.text(), row).toContain(`id="${row}"`);
	}
});

test('shows rule IDs and prerequisites that point at rules and learning-map competencies', async ({
	page
}) => {
	await page.goto('/kaidah/participle/');
	const rule = page.locator('[id="g02.akar-lafif"]');
	await expect(rule).toContainText('g02.akar-lafif');
	await expect(rule.locator('[data-prerequisite-rule="g02.akar-naqis"] a')).toHaveAttribute(
		'href',
		/#g02\.akar-naqis$/
	);
	await expect(rule.locator('[data-prerequisite-competency="CB-18"]')).toContainText(
		'Keluarga akar kata'
	);
});

test('weak-root and rubā‘ī families show their forms and exercises', async ({ page }) => {
	await page.goto('/kaidah/participle/');
	await expect(page.locator('#pair-daa')).toContainText('دَاعٍ');
	await expect(page.locator('#pair-daa')).toContainText('مَدْعُوٌّ');
	await expect(page.locator('#pair-waqaa')).toContainText('لَفِيفٌ مَفْرُوقٌ');
	await expect(page.locator('#pair-rawaa')).toContainText('لَفِيفٌ مَقْرُونٌ');
	await expect(page.locator('#pair-akhadha')).toContainText('آخِذٌ');
	await expect(page.locator('#pair-madda')).toContainText('مَمْدُودٌ');
	await expect(page.locator('#pair-tarjama')).toContainText('Form Iq');
	await expect(page.locator('#pair-tadahraja')).toContainText('Form IIq');
	await expect(page.locator('#pair-istamarra [data-passive="tidak-lazim"]')).toHaveText(
		'Tidak lazim'
	);
	await page.locator('#part-65 summary').click();
	await expect(page.locator('#part-65')).toContainText('menjadi hamzah');
	await page.locator('#part-97 summary').click();
	await expect(page.locator('#part-97')).toContainText('huruf akar');
});

test.describe('static participle reader', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
	test('renders every form, unusual cases and all exercises without JavaScript', async ({
		page
	}) => {
		await page.goto('/kaidah/participle/');
		await expect(page.locator('#pair-baa')).toContainText('مَبِيعٌ');
		await expect(page.locator('li[id^="pair-"]')).toHaveCount(26);
		await expect(page.locator('li[id^="part-"]')).toHaveCount(104);
		for (const form of ['III', 'V', 'VI', 'VII', 'VIII', 'IX', 'Iq', 'IIq']) {
			await expect(
				page.locator('li[id^="pair-"]', { hasText: `Form ${form} ·` }).first()
			).toBeVisible();
		}
		await expect(page.locator('#pair-ikhtara')).toContainText('مُخْتَارٌ');
		await expect(page.locator('#pair-ittasala')).toContainText('مِثَالٌ');
		await expect(page.locator('#pair-inqataa [data-passive="tidak-lazim"]')).toHaveText(
			'Tidak lazim'
		);
		await expect(page.locator('#pair-ihmarra [data-passive="tidak-lazim"]')).toBeVisible();
		await expect(page.locator('#pair-saada')).toContainText('مُسَاعَدَةٌ');
		await expect(page.locator('#pair-banaa')).toContainText('نَاقِصٌ');
		await expect(page.locator('#pair-saala')).toContainText('مَسْؤُولٌ');
		await expect(page.locator('li[id^="pair-"] a[data-wazan-bab]')).toHaveCount(26);
		await expect(page.locator('[id="g02.akar-mahmuz"] [data-rule-id]')).toHaveText(
			'g02.akar-mahmuz'
		);
		await page.locator('#part-21 summary').click();
		await expect(page.locator('#part-21')).toContainText('ajwaf');
		await page.locator('#part-49 summary').click();
		await expect(page.locator('#part-49')).toContainText('mithāl');
		await page.locator('#part-69 summary').click();
		await expect(page.locator('#part-69')).toContainText('lafīf mafrūq');
		const dimensions = await page.evaluate(() => ({
			content: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth
		}));
		expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
	});
});
