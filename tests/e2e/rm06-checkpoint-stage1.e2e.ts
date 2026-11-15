import { expect, test } from '@playwright/test';

test('RM-06 stage 1 records a genuinely new -ku example', async ({ page }) => {
	await page.goto('/belajar/');
	await page
		.locator('#stage-1')
		.getByRole('link', { name: /mulai titik cek/i })
		.click();
	await expect(page.getByRole('heading', { name: 'Kenali makna pada kata baru' })).toBeVisible();
	const practice = page.getByRole('region', { name: 'Latihan makna' });
	await expect(practice).toContainText('Soal 1 dari 20');
	await practice.getByRole('radio', { name: 'Temanku' }).check();
	await practice.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(practice.getByRole('status')).toContainText('Naik ke Bisa pada contoh baru');
	await practice.getByRole('button', { name: 'Coba contoh baru' }).click();
	await expect(practice).toContainText('Soal 2 dari 20');
	await page.goto('/progres/');
	await expect(page.locator('[data-competency-level="CB-01"]')).toContainText(
		'Bisa pada contoh baru'
	);
});

test('RM-06 stage 1 works without JavaScript, showing published Arabic text and explanations', async ({
	page
}) => {
	await page.route('**/*', (route) =>
		route.request().resourceType() === 'script' ? route.abort() : route.continue()
	);
	await page.goto('/belajar/checkpoint-1/');
	await expect(page.getByRole('heading', { name: 'Kenali makna pada kata baru' })).toBeVisible();
	await expect(page.getByText('صَدِيقِي')).toBeVisible();
	await expect(page.getByText('بَلَدِي')).toBeVisible();
});
