import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

// Architecture guard: every public route ships complete static HTML that is readable without
// client-side JavaScript (see AGENTS.md, "Non-negotiable architecture").

const routes = [
	{ path: '/', file: 'index.html', h1: 'Pahami bahasa Arab, bukan sekadar menghafal' },
	{ path: '/belajar/', file: 'belajar/index.html', h1: 'Belajar' },
	{ path: '/iqra/', file: 'iqra/index.html', h1: 'Mulai dari huruf' },
	{ path: '/latihan/', file: 'latihan/index.html', h1: 'Latihan' },
	{ path: '/kosakata/', file: 'kosakata/index.html', h1: 'Kosakata' },
	{ path: '/rujukan/', file: 'rujukan/index.html', h1: 'Tabel rujukan' },
	{ path: '/progres/', file: 'progres/index.html', h1: 'Progres' },
	{ path: '/bookmark/', file: 'bookmark/index.html', h1: 'Bookmark' },
	{ path: '/tentang/', file: 'tentang/index.html', h1: 'Tentang' }
];

for (const route of routes) {
	test(`adapter-static writes ${route.file}`, async () => {
		const html = await readFile(`build/${route.file}`, 'utf8');
		expect(html).toContain('<html lang="id">');
		expect(html).toMatch(/<title>[^<]*Belajar Bahasa Arab<\/title>/);
		expect(html).toMatch(/<meta name="description" content="[^"]{60,}"/);
		expect(html).toContain(route.h1);
		// UI-preview fixtures must never reach the public build.
		expect(html).not.toContain('TEST FIXTURE');
	});
}

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	for (const route of routes) {
		test(`${route.path} is readable from prerendered HTML`, async ({ page }) => {
			await page.goto(route.path);
			await expect(page.locator('html')).toHaveAttribute('lang', 'id');
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.h1);
			await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
			await expect(page.locator('main#konten')).toBeVisible();
		});
	}
});

test.describe('mobile layout', () => {
	test.use({ viewport: { width: 375, height: 812 } });

	for (const route of routes) {
		test(`${route.path} has no horizontal page scroll at 375px`, async ({ page }) => {
			await page.goto(route.path);
			const widths = await page.evaluate(() => ({
				scroll: document.documentElement.scrollWidth,
				client: document.documentElement.clientWidth
			}));
			expect(widths.scroll).toBeLessThanOrEqual(widths.client);
		});
	}

	test('tab bar marks the current section', async ({ page }) => {
		await page.goto('/latihan/');
		const tabs = page.getByRole('navigation', { name: 'Navigasi cepat' });
		await expect(tabs.getByRole('link', { name: 'Latihan' })).toHaveAttribute(
			'aria-current',
			'page'
		);
		await expect(tabs.getByRole('link')).toHaveCount(5);
	});
});

test('skip link moves focus to the main content', async ({ page }) => {
	await page.goto('/');
	await page.keyboard.press('Tab');
	const skip = page.getByRole('link', { name: 'Langsung ke konten' });
	await expect(skip).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(/#konten$/);
	await expect(page.locator('main#konten')).toBeFocused();
});

test('prerendered pages mark the current section without JavaScript', async () => {
	const html = await readFile('build/latihan/index.html', 'utf8');
	expect(html).toMatch(
		/<a[^>]*href="[^"]*latihan\/"[^>]*aria-current="page"|aria-current="page"[^>]*href="[^"]*latihan\/"/
	);
});

test('UI-preview fixtures are not shipped in the production bundle', async () => {
	const { readdir } = await import('node:fs/promises');
	const files = await readdir('build/_app', { recursive: true });
	for (const file of files.filter((f) => f.endsWith('.js'))) {
		const js = await readFile(`build/_app/${file}`, 'utf8');
		expect(js, file).not.toContain('TEST FIXTURE');
	}
	await expect(readFile('build/404.html', 'utf8')).resolves.toContain('<html lang="id">');
});

test('client-side navigation keeps the trailing slash', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 800 });
	await page.goto('/');
	await page
		.getByRole('navigation', { name: 'Navigasi utama' })
		.getByRole('link', { name: 'Kosakata' })
		.click();
	await expect(page).toHaveURL(/\/kosakata\/$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kosakata');
});
