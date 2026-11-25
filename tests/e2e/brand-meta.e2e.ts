import { expect, test } from '@playwright/test';

test.describe('site icons and link previews without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('ships the brand icons and absolute preview tags per page', async ({ page, request }) => {
		await page.goto('/belajar/');
		const head = page.locator('head');
		await expect(head.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveCount(1);
		expect(
			await head.locator('link[rel="icon"][type="image/svg+xml"]').getAttribute('href')
		).not.toContain('svelte-logo');
		await expect(head.locator('meta[property="og:image"]')).toHaveAttribute(
			'content',
			'https://belajar-bahasa-arab.faizmuttaqin.com/og-image.png'
		);
		await expect(head.locator('meta[property="og:url"]')).toHaveAttribute(
			'content',
			'https://belajar-bahasa-arab.faizmuttaqin.com/belajar/'
		);
		await expect(head.locator('meta[property="og:title"]')).toHaveAttribute(
			'content',
			/· Belajar Bahasa Arab$/
		);
		await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute(
			'content',
			'summary_large_image'
		);
		for (const file of ['/favicon.ico', '/apple-touch-icon.png', '/og-image.png']) {
			expect((await request.get(file)).ok(), file).toBe(true);
		}
	});
});
