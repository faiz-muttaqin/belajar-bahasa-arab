import { expect, test, type Page } from '@playwright/test';

async function useMockArabicSpeech(page: Page, arabic = true) {
	await page.addInitScript((hasArabicVoice) => {
		const mock = {
			spoken: [] as { text: string; lang: string; rate: number; voice: string | null }[],
			canceled: 0
		};
		(window as Window & { __ttsMock?: typeof mock }).__ttsMock = mock;
		class StubUtterance {
			text: string;
			lang = '';
			rate = 1;
			pitch = 1;
			volume = 1;
			voice: { name: string } | null = null;
			onend: (() => void) | null = null;
			onerror: ((event: { error: string }) => void) | null = null;
			constructor(text: string) {
				this.text = text;
			}
		}
		const voice = {
			name: hasArabicVoice ? 'Arabic Test' : 'English Test',
			lang: hasArabicVoice ? 'ar-SA' : 'en-US',
			voiceURI: 'voice-mock',
			localService: true,
			default: true
		};
		Object.defineProperty(window, 'SpeechSynthesisUtterance', {
			configurable: true,
			value: StubUtterance
		});
		Object.defineProperty(window, 'speechSynthesis', {
			configurable: true,
			value: {
				getVoices: () => [voice],
				addEventListener: () => undefined,
				removeEventListener: () => undefined,
				cancel: () => {
					mock.canceled++;
				},
				speak: (utterance: StubUtterance) => {
					mock.spoken.push({
						text: utterance.text,
						lang: utterance.lang,
						rate: utterance.rate,
						voice: utterance.voice?.name ?? null
					});
				}
			}
		});
	}, arabic);
}

test('browser Arabic audio plays a vocabulary item on click, stops and can replay', async ({
	page
}) => {
	await useMockArabicSpeech(page);
	await page.goto('/kosakata/');
	const word = page.getByRole('article').filter({ hasText: 'دَفْتَرٌ' });
	const play = word.getByRole('button', { name: 'Dengarkan kata Arab' });
	await expect(play).toBeEnabled();
	expect(await page.evaluate(() => (window as unknown as Window & { __ttsMock: { spoken: unknown[] } }).__ttsMock.spoken.length)).toBe(0);
	await play.click();
	expect(await page.evaluate(() => (window as unknown as Window & { __ttsMock: { spoken: unknown[] } }).__ttsMock.spoken)).toEqual([
		{ text: 'دَفْتَرٌ', lang: 'ar-SA', rate: 0.8, voice: 'Arabic Test' }
	]);
	const stop = word.getByRole('button', { name: 'Hentikan audio Arab' });
	await expect(stop).toHaveAttribute('aria-pressed', 'true');
	await stop.click();
	await expect(word.getByRole('button', { name: 'Dengarkan kata Arab' })).toBeEnabled();
	await word.getByRole('button', { name: 'Dengarkan kata Arab' }).click();
	expect(await page.evaluate(() => (window as unknown as Window & { __ttsMock: { spoken: unknown[] } }).__ttsMock.spoken.length)).toBe(2);
});

test('voice rate and locale preference persist across navigation and browser reload', async ({
	page
}) => {
	await useMockArabicSpeech(page);
	await page.goto('/kosakata/');
	await page.getByText('Pengaturan audio browser').click();
	await page.getByLabel('Kecepatan audio Arab').selectOption('0.65');
	await page.getByLabel('Pilih suara Arab').selectOption('voice-mock|ar-SA|Arabic Test');
	await page.reload();
	await page.getByText('Pengaturan audio browser').click();
	await expect(page.getByLabel('Kecepatan audio Arab')).toHaveValue('0.65');
	await expect(page.getByLabel('Pilih suara Arab')).toHaveValue('voice-mock|ar-SA|Arabic Test');
	await page.getByRole('article').filter({ hasText: 'دَفْتَرٌ' }).getByRole('button', { name: 'Dengarkan kata Arab' }).click();
	const last = await page.evaluate(() => (window as unknown as Window & { __ttsMock: { spoken: { rate: number; voice: string }[] } }).__ttsMock.spoken.at(-1));
	expect(last).toMatchObject({ rate: 0.65, voice: 'Arabic Test' });
});

test('Arabic lessons speak the original vocalized sentence even when harakat are hidden', async ({
	page
}) => {
	await useMockArabicSpeech(page);
	await page.goto('/belajar/struktur-dokumen-pendek/');
	await page.getByLabel('Tampilkan harakat').uncheck();
	const passage = page.locator('#bacaan');
	await passage.getByRole('button', { name: 'Dengarkan kalimat Arab' }).first().click();
	const sentence = await page.evaluate(() => (window as unknown as Window & { __ttsMock: { spoken: { text: string; lang: string }[] } }).__ttsMock.spoken[0]);
	expect(sentence?.lang).toBe('ar-SA');
	expect(sentence?.text).toMatch(/[\u064b-\u0652]/u);
});

test('missing Arabic voice yields clear feedback rather than reading in another language', async ({
	page
}) => {
	await useMockArabicSpeech(page, false);
	await page.goto('/kosakata/');
	const word = page.getByRole('article').filter({ hasText: 'دَفْتَرٌ' });
	await word.getByRole('button', { name: 'Dengarkan kata Arab' }).click();
	await expect(word.getByRole('alert')).toContainText('Tidak ada suara bahasa Arab');
	expect(await page.evaluate(() => (window as unknown as Window & { __ttsMock: { spoken: unknown[] } }).__ttsMock.spoken.length)).toBe(0);
});

test('UI does not remove learning content without speech synthesis or JavaScript', async ({
	page
}) => {
	await page.addInitScript(() => {
		Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: undefined });
	});
	await page.goto('/kosakata/');
	await expect(page.getByRole('article').filter({ hasText: 'دَفْتَرٌ' }).getByRole('button', { name: 'Dengarkan kata Arab' })).toBeDisabled();
	await expect(page.getByText('Buku catatan', { exact: true })).toBeVisible();
});

test.describe('static HTML without scripts', () => {
	test.use({ javaScriptEnabled: false });

	test('ships vocalized Arabic lesson text independently of browser audio', async ({ page }) => {
		await page.goto('/belajar/kata-inti-shalat/');
		await expect(page.locator('p[lang="ar"][dir="rtl"]').first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Baca contohnya' })).toBeVisible();
	});
});
