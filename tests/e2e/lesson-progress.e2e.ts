import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const start = '/belajar/kata-inti-shalat/';
const next = '/belajar/menunjuk-dan-bertanya/';
const firstTitle = 'Pahami kata inti bacaan shalat';

test.describe('mobile lesson progress', () => {
	test.use({ viewport: { width: 390, height: 664 }, isMobile: true, hasTouch: true });

	test('starts directly, resumes an open lesson, and advances after explicit completion', async ({
		page,
		context
	}) => {
		await page.goto('/');
		const startButton = page.getByRole('link', { name: 'Mulai belajar', exact: true });
		await expect(startButton).toBeInViewport({ ratio: 1 });
		await startButton.tap();
		await expect(page).toHaveURL(new RegExp(`${start}$`));
		await expect(page.getByRole('heading', { name: firstTitle })).toBeVisible();
		await page.getByText('Lihat pembahasan', { exact: true }).first().tap();
		await expect(
			page.getByText('Yang Mahatinggi. Kata ini muncul dalam frasa sujud di atas.')
		).toBeVisible();

		const progressTab = await context.newPage();
		await progressTab.goto('/progres/');
		let resume = progressTab.getByRole('link', { name: 'Lanjut belajar' });
		await expect(resume).toHaveAttribute('href', new RegExp(`${start}$`));
		await expect(
			progressTab
				.getByRole('region', { name: 'Pelajaran yang dibuka' })
				.getByText('Sedang dipelajari', { exact: true })
		).toBeVisible();

		await page.getByRole('button', { name: 'Tandai selesai' }).tap();
		await expect(page.getByRole('button', { name: 'Pelajaran selesai' })).toBeDisabled();
		await expect(resume).toHaveAttribute('href', new RegExp(`${next}$`));
		await expect(
			progressTab
				.getByRole('region', { name: 'Pelajaran yang dibuka' })
				.getByText('Selesai', { exact: true })
		).toBeVisible();
		await page.close();
		await progressTab.close();

		const reopened = await context.newPage();
		await reopened.goto('/');
		resume = reopened.getByRole('link', { name: 'Lanjut belajar' });
		await expect(resume).toHaveAttribute('href', new RegExp(`${next}$`));
		await reopened.reload();
		await resume.tap();
		await expect(reopened).toHaveURL(new RegExp(`${next}$`));
		await reopened
			.getByRole('link', { name: 'Progres', exact: true })
			.filter({ visible: true })
			.first()
			.tap();
		await expect(reopened.getByRole('link', { name: 'Lanjut belajar' })).toBeVisible();
		await expect(
			reopened
				.getByRole('region', { name: 'Pelajaran yang dibuka' })
				.getByText('Selesai', { exact: true })
		).toBeVisible();
		await expect(
			reopened
				.getByRole('region', { name: 'Pelajaran yang dibuka' })
				.getByText('Sedang dipelajari', { exact: true })
		).toBeVisible();
	});

	test('round-trips a progress backup and preserves completion when reimporting an older record', async ({
		page,
		browser,
		baseURL
	}) => {
		await page.goto(start);
		await page.getByRole('button', { name: 'Tandai selesai' }).tap();
		await expect(page.getByRole('button', { name: 'Pelajaran selesai' })).toBeDisabled();
		await page.goto('/progres/');
		await page.getByText('Cadangan progres', { exact: true }).tap();
		const [download] = await Promise.all([
			page.waitForEvent('download'),
			page.getByRole('button', { name: 'Ekspor progres' }).tap()
		]);
		const exported = await readFile(await download.path());
		const backup = JSON.parse(exported.toString());
		expect(backup).toMatchObject({
			schemaVersion: 2,
			lessons: [{ lessonId: 'lesson-u1-01', contentRevision: 1, completedRevision: 1 }],
			marks: [],
			attempts: []
		});

		const fresh = await browser.newContext({ baseURL });
		try {
			const newPage = await fresh.newPage();
			await newPage.goto('/progres/');
			await newPage.getByText('Cadangan progres', { exact: true }).click();
			await newPage.locator('input[type=file]').setInputFiles({
				name: 'progres.json',
				mimeType: 'application/json',
				buffer: exported
			});
			const resume = newPage.getByRole('link', { name: 'Lanjut belajar' });
			await expect(resume).toHaveAttribute('href', new RegExp(`${next}$`));

			const older = { ...backup.lessons[0], completedRevision: undefined, lastOpenedAt: 1 };
			await newPage.locator('input[type=file]').setInputFiles({
				name: 'lama.json',
				mimeType: 'application/json',
				buffer: Buffer.from(JSON.stringify({ schemaVersion: 1, lessons: [older] }))
			});
			await expect(newPage.getByRole('status')).toContainText('Cadangan digabungkan');
			await newPage.reload();
			await expect(resume).toHaveAttribute('href', new RegExp(`${next}$`));
			await expect(
				newPage
					.getByRole('region', { name: 'Pelajaran yang dibuka' })
					.getByText('Selesai', { exact: true })
			).toBeVisible();
		} finally {
			await fresh.close();
		}
	});

	test('keeps reading available and explains when browser storage cannot be used', async ({
		page
	}) => {
		await page.addInitScript(() => {
			Object.defineProperty(window, 'indexedDB', {
				get: () => {
					throw new DOMException('Blocked', 'SecurityError');
				}
			});
		});
		await page.goto('/progres/');
		await expect(
			page.getByRole('heading', { name: 'Penyimpanan progres tidak tersedia' })
		).toBeVisible();
		await page.getByRole('link', { name: 'Mulai belajar', exact: true }).tap();
		await expect(page.getByRole('heading', { name: firstTitle })).toBeVisible();
		await page.getByRole('button', { name: 'Tandai selesai' }).tap();
		await expect(page.getByRole('status')).toContainText('Progres belum tersimpan');
		await expect(page.getByRole('link', { name: 'Pelajaran berikutnya' })).toBeVisible();
	});
});

test.describe('static first lesson', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 664 } });

	test('opens the first lesson directly and allows self-check and onward navigation', async ({
		page
	}) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'Mulai belajar', exact: true }).click();
		await expect(page).toHaveURL(new RegExp(`${start}$`));
		await expect(page.getByRole('heading', { name: firstTitle })).toBeVisible();
		await page.getByText('Lihat pembahasan', { exact: true }).first().click();
		await expect(
			page.getByText('Yang Mahatinggi. Kata ini muncul dalam frasa sujud di atas.')
		).toBeVisible();
		await page.getByRole('link', { name: 'Pelajaran berikutnya' }).click();
		await expect(page).toHaveURL(new RegExp(`${next}$`));
	});
});
