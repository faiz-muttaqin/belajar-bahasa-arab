import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const first = '/belajar/kata-inti-shalat/';
const second = '/belajar/menunjuk-dan-bertanya/';

test('RM-05 U1 answers are persisted, labelled and shared with the map and progress page', async ({
	page,
	context
}) => {
	await page.goto(first);
	const practice = page.getByRole('region', { name: 'Latihan makna' });
	await practice.getByRole('radio', { name: 'Tuhanku', exact: true }).check();
	await practice.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(practice.getByRole('status')).toContainText('Naik ke Paham pada contoh');
	await practice.getByRole('button', { name: 'Coba contoh baru' }).click();
	await practice.getByRole('radio', { name: 'Bukuku', exact: true }).check();
	await practice.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(practice.getByRole('status')).toContainText('Naik ke Bisa pada contoh baru');

	const other = await context.newPage();
	try {
		await other.goto('/belajar/');
		await expect(other.locator('#step-u1 [data-step-understanding]')).toContainText(
			'1 dari 1 kemampuan bisa pada contoh baru'
		);
		await other
			.getByRole('button', { name: 'Rincian langkah: Kata inti shalat' })
			.click();
		await expect(other.getByRole('dialog').locator('[data-competency-level="CB-01"]')).toContainText(
			'Bisa pada contoh baru'
		);
		await other.goto('/progres/');
		await expect(other.locator('[data-evidence-stage="stage-1"]')).toContainText(
			'1 dari 1 kemampuan'
		);
		await expect(other.getByText('2 jawaban latihan tersimpan')).toBeVisible();
	} finally {
		await other.close();
	}
});

test('RM-05 answered transfer is not novel on retry; author review caps it at 2', async ({
	page
}) => {
	await page.goto(first);
	const practice = page.getByRole('region', { name: 'Latihan makna' });
	await practice.getByRole('button', { name: 'Belum tahu' }).click();
	await expect(practice.getByRole('status')).toContainText('Naik ke Mengenal');
	await practice.getByRole('button', { name: 'Coba contoh baru' }).click();
	await practice.getByRole('button', { name: 'Belum tahu' }).click();
	await expect(practice.getByRole('status')).toContainText('Tetap Mengenal');
	await practice.getByRole('button', { name: 'Coba lagi' }).click();
	await practice.getByRole('radio', { name: 'Bukuku', exact: true }).check();
	await practice.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(practice.getByRole('status')).toContainText('Naik ke Paham pada contoh');
	await page.reload();
	await page.goto('/belajar/');
	await page.getByRole('button', { name: 'Rincian langkah: Kata inti shalat' }).click();
	await expect(page.getByRole('dialog').locator('[data-competency-level="CB-01"]')).toContainText(
		'Paham pada contoh'
	);
});

test('RM-05 explicit author-seen checkbox prevents level 3', async ({ page }) => {
	await page.goto(first);
	const practice = page.getByRole('region', { name: 'Latihan makna' });
	await practice.getByRole('button', { name: 'Belum tahu' }).click();
	await practice.getByRole('button', { name: 'Coba contoh baru' }).click();
	await practice.getByRole('checkbox', { name: /sudah melihat soal ini saat menyusun/i }).check();
	await practice.getByRole('radio', { name: 'Bukuku', exact: true }).check();
	await practice.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(practice.getByRole('status')).toContainText('Naik ke Paham pada contoh');
});

test('RM-05 U2 self-check is labelled self-reported, never transfer evidence', async ({ page }) => {
	await page.goto(second);
	await page.locator('#soal-1').getByText('Lihat pembahasan').click();
	const selfCheck = page.locator('[data-self-assessment="u2-key-question"]');
	await expect(selfCheck).toBeVisible();
	await selfCheck.getByRole('button', { name: 'Jawaban saya cocok' }).click();
	await expect(selfCheck.getByRole('status')).toContainText('Menurut penilaian Anda');
	await page.goto('/belajar/');
	await page.getByRole('button', { name: 'Rincian langkah: Menunjuk dan bertanya' }).click();
	await expect(page.getByRole('dialog').locator('[data-competency-level="CB-04"]')).toContainText(
		'Paham pada contoh · menurut penilaian Anda'
	);
});

test('RM-05 exports and merges attempts across devices without duplicates', async ({
	page,
	browser,
	baseURL
}) => {
	await page.goto(first);
	const practice = page.getByRole('region', { name: 'Latihan makna' });
	await practice.getByRole('radio', { name: 'Tuhanku', exact: true }).check();
	await practice.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(practice.getByRole('status')).toContainText('Naik ke');
	await page.goto('/progres/');
	await page.getByText('Cadangan progres', { exact: true }).click();
	const [download] = await Promise.all([
		page.waitForEvent('download'),
		page.getByRole('button', { name: 'Ekspor progres' }).click()
	]);
	const bytes = await readFile(await download.path());
	const backup = JSON.parse(bytes.toString());
	expect(backup).toMatchObject({
		schemaVersion: 2,
		attempts: [{ itemId: 'u1-rabbi-meaning', lessonId: 'lesson-u1-01', skill: 'meaning', outcome: 'correct' }]
	});
	const other = await browser.newContext({ baseURL });
	try {
		const target = await other.newPage();
		await target.goto('/progres/');
		await target.getByText('Cadangan progres', { exact: true }).click();
		const input = target.locator('input[type=file]');
		for (let repeat = 0; repeat < 2; repeat++) {
			await input.setInputFiles({ name: 'backup.json', mimeType: 'application/json', buffer: bytes });
			await expect(target.getByText('1 jawaban latihan tersimpan')).toBeVisible();
		}
		await target.reload();
		await expect(target.getByText('1 jawaban latihan tersimpan')).toBeVisible();
	} finally {
		await other.close();
	}
});

test('RM-05 storage failure does not hide feedback or falsely claim saving', async ({ page }) => {
	await page.addInitScript(() => {
		Object.defineProperty(window, 'indexedDB', {
			get: () => { throw new DOMException('Blocked', 'SecurityError'); }
		});
	});
	await page.goto(first);
	const practice = page.getByRole('region', { name: 'Latihan makna' });
	await practice.getByRole('radio', { name: 'Tuhanku', exact: true }).check();
	await practice.getByRole('button', { name: 'Cek jawaban' }).click();
	await expect(practice.getByText('Tepat. Tuhanku.', { exact: true })).toBeVisible();
	await expect(practice.getByRole('status')).toContainText('Jawaban belum tersimpan');
});

test('RM-05 self-check remains an ordinary readable disclosure without JavaScript', async ({
	page
}) => {
	await page.addInitScript(() => {
		Object.defineProperty(window, 'indexedDB', {
			get: () => { throw new DOMException('Blocked', 'SecurityError'); }
		});
	});
	await page.goto(second);
	await page.locator('#soal-1').getByText('Lihat pembahasan').click();
	await expect(page.locator('#soal-1')).toContainText('مَا هَذَا');
});
