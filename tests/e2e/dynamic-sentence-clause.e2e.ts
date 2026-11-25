import { expect, test, type Locator, type Page } from '@playwright/test';

/**
 * D-05b (G-04 sentences) and D-05c (G-05 clauses): word substitution on the original
 * cards. Arabic text is compared after NFC normalisation because the curriculum data
 * orders shadda and fatḥa differently from typed text; the glyphs are identical.
 */
const nfc = (text: string) => text.normalize('NFC');

async function expectArabic(locator: Locator, text: string) {
	await expect.poll(async () => nfc(await locator.innerText())).toContain(nfc(text));
}

async function expectNoArabic(locator: Locator, text: string) {
	await expect.poll(async () => nfc(await locator.innerText())).not.toContain(nfc(text));
}

function modalOf(page: Page) {
	return page.getByRole('dialog', { name: 'Pilih variasi contoh' });
}

/** Visible Arabic tokens of a card (the dialog also lists Arabic, so scope to token boxes). */
async function tokensOf(card: Locator) {
	return (await card.locator('[data-irab] > span[lang="ar"]').allInnerTexts()).map(nfc);
}

async function expectNoOverflow(page: Page) {
	const size = await page.evaluate(() => ({
		scroll: document.documentElement.scrollWidth,
		client: document.documentElement.clientWidth
	}));
	expect(size.scroll).toBeLessThanOrEqual(size.client);
}

test('D-05b replaces the whole verbal sentence: verb, agent, glosses, i‘rab and translation', async ({
	page
}) => {
	await page.goto('/kaidah/kalimat/');
	const card = page.locator('figure[data-inline-example="verbal-past"]');
	await expectArabic(card, 'كَتَبَ');
	await expect(card.locator('[data-inline-translation]')).toHaveText(
		'Murid itu telah menulis pelajaran tersebut.'
	);

	await card.locator('[data-role="verb"]').getByRole('button', { name: 'Ganti Fi‘il' }).click();
	const modal = modalOf(page);
	await expect(modal).toBeVisible();
	await modal.getByRole('searchbox').fill('siswi');
	await expect(modal.locator('[data-inline-choice]')).toHaveCount(2);
	await modal.locator('[data-inline-choice="vso-girl-write"]').click();
	await expect(modal).not.toBeVisible();

	await expect(card).toHaveAttribute('data-inline-selected', 'vso-girl-write');
	await expectArabic(card.locator('[data-role="verb"]'), 'كَتَبَتِ');
	await expectArabic(card.locator('[data-role="agent"]'), 'الطَّالِبَةُ');
	await expect(card.locator('[data-role="agent"]')).toContainText('siswi itu');
	await expect(card.locator('[data-role="agent"]')).toContainText('Isim · Rafa‘');
	await expect(card.locator('[data-role="object"]')).toContainText('pelajaran itu');
	await expect(card.locator('[data-inline-translation]')).toHaveText(
		'Siswi itu telah menulis pelajaran itu.'
	);
	await expect(card).toContainText('Fi‘il mengikuti gender fā‘il');
	await expect(card).toContainText('Kalimat diganti sebagai satu unit');

	await card.getByRole('button', { name: 'Reset contoh' }).click();
	await expect(card).toHaveAttribute('data-inline-selected', 'verbal-past');
	await expectArabic(card.locator('[data-role="verb"]'), 'كَتَبَ');
	await expectNoArabic(card, 'كَتَبَتِ');
	await expect(card.locator('[data-inline-translation]')).toHaveText(
		'Murid itu telah menulis pelajaran tersebut.'
	);
});

test('D-05b lists unrecorded D-03 forms as disabled options with the reason', async ({ page }) => {
	await page.goto('/kaidah/kalimat/');
	const card = page.locator('figure[data-inline-example="verbal-past"]');
	await card.locator('[data-role="verb"]').getByRole('button', { name: 'Ganti Fi‘il' }).click();
	const modal = modalOf(page);

	const gap = modal.locator('[data-inline-blocked="gap-d03-fiil-qaraa-lam"]');
	await expect(gap).toBeDisabled();
	await expect(modal.locator('[data-inline-reason="gap-d03-fiil-qaraa-lam"]')).toContainText(
		'belum tercatat pada tabel D-03'
	);
	await expect(
		modal.locator('[data-inline-blocked="gap-d03-fiil-kataba-imperative"]')
	).toBeDisabled();
	await expect(modal.locator('[data-inline-choice="imperative-open"]')).toBeEnabled();
	// A disabled option cannot be applied.
	await gap.click({ force: true });
	await expect(card).toHaveAttribute('data-inline-selected', 'verbal-past');
	await page.keyboard.press('Escape');
	await expect(modal).not.toBeVisible();

	// The agent slot shows frames only, no verb-form gaps.
	await card.locator('[data-role="agent"]').getByRole('button', { name: 'Ganti Fā‘il' }).click();
	await expect(modal.locator('[data-inline-blocked^="gap-d03"]')).toHaveCount(0);
	await modal.getByRole('button', { name: 'Tutup' }).click();
});

test('D-05b explains why the dual and passive-of-mu‘tal options are unavailable', async ({
	page
}) => {
	await page.goto('/kaidah/kalimat/');
	const nominal = page.locator('figure[data-inline-example="nominal-simple"]');
	await nominal.getByRole('button', { name: 'Ganti Topik / ism' }).click();
	const modal = modalOf(page);
	await expect(modal.locator('[data-inline-blocked="gap-dual-subject"]')).toBeDisabled();
	await expect(modal.locator('[data-inline-reason="gap-dual-subject"]')).toContainText('mutsanna');
	await modal.getByRole('button', { name: 'Tutup' }).click();

	const passive = page.locator('figure[data-inline-example="passive-writing"]');
	await passive.getByRole('button', { name: 'Ganti Fi‘il' }).click();
	await expect(modal.locator('[data-inline-blocked="gap-passive-mutal"]')).toBeDisabled();
	await expect(modal.locator('[data-inline-choice="passive-letter"]')).toBeEnabled();
	await modal.locator('[data-inline-choice="passive-letter"]').click();
	await expectArabic(passive.locator('[data-role="deputy"]'), 'الرِّسَالَةُ');
	await expectArabic(passive.locator('[data-role="verb"]'), 'كُتِبَتِ');
	await expect(passive.locator('[data-inline-translation]')).toHaveText('Surat itu telah ditulis.');
	await expect(passive).toContainText('Nā’ib al-fā‘il');
});

test('D-05b swaps a negation card for a mu‘tal verb and keeps the mood label', async ({ page }) => {
	await page.goto('/kaidah/kalimat/');
	const card = page.locator('figure[data-inline-example="negation-la"]');
	await card.locator('[data-role="verb"]').getByRole('button', { name: 'Ganti Fi‘il' }).click();
	const modal = modalOf(page);
	await modal.getByRole('searchbox').fill('absen');
	await modal.locator('[data-inline-choice="neg-la-absent"]').click();
	await expectArabic(card, 'يَغِيبُ');
	await expect(card.locator('[data-role="verb"]')).toHaveAttribute('data-mood', 'indicative');
	await expect(card.locator('[data-role="object"]')).toHaveCount(0);
	await expect(card.locator('[data-inline-translation]')).toHaveText('Murid itu tidak absen.');

	// lam and lan are only offered for forms D-03 records.
	await card.getByRole('button', { name: 'Reset contoh' }).click();
	await card.locator('[data-role="verb"]').getByRole('button', { name: 'Ganti Fi‘il' }).click();
	await modal.locator('[data-inline-choice="neg-lan-letter"]').click();
	await expect(card.locator('[data-role="verb"]')).toHaveAttribute('data-mood', 'subjunctive');
	await expect(card.locator('[data-inline-translation]')).toHaveText(
		'Anak laki-laki itu tidak akan menulis surat itu.'
	);
});

test('D-05b covers kāna, inna and questions with the case changes of the new frame', async ({
	page
}) => {
	await page.goto('/kaidah/kalimat/');
	const kana = page.locator('figure[data-inline-example="nawasikh-kana"]');
	await kana.getByRole('button', { name: 'Ganti Topik / ism' }).first().click();
	const modal = modalOf(page);
	await modal.getByRole('searchbox').fill('dahulu besar');
	await modal.locator('[data-inline-choice="nasikh-kana-school"]').click();
	await expectArabic(kana.locator('[data-role="verb"]'), 'كَانَتِ');
	await expect(kana.locator('[data-irab="nasb"]').first()).toContainText('Isim · Naṣb');
	expect(await tokensOf(kana)).toEqual(['كَانَتِ', 'الْمَدْرَسَةُ', 'كَبِيرَةً'].map(nfc));
	await expect(kana.locator('[data-inline-translation]')).toHaveText('Sekolah itu dahulu besar.');

	const question = page.locator('figure[data-inline-example="question-verbal"]');
	await question.getByRole('button', { name: 'Ganti Fi‘il' }).click();
	await modal.locator('[data-inline-choice="q-absent"]').click();
	await expect(question.locator('[data-inline-translation]')).toHaveText('Apakah murid itu absen?');
	await expectArabic(question, 'غَابَ');
});

test('D-05c replaces a relative clause as one unit and keeps the ‘ā’id clitic in one token', async ({
	page
}) => {
	await page.goto('/kaidah/klausa/');
	const card = page.locator('figure[data-inline-example="relative-object-return"]');
	await expectArabic(card, 'قَرَأْتُهُ');
	await card
		.getByRole('button', { name: /Ganti Mubtada/ })
		.first()
		.click();
	const modal = modalOf(page);
	await modal.getByRole('searchbox').fill('pelajaran');
	await modal.locator('[data-inline-choice="rel-return-lesson"]').click();
	await expectArabic(card, 'الدَّرْسُ');
	await expect(card.locator('[data-inline-translation]')).toHaveText(
		'Pelajaran yang saya baca itu bermanfaat.'
	);
	// قَرَأْتُهُ stays one visible token, never split into verb + pronoun.
	const tokens = await tokensOf(card);
	expect(tokens).toContain(nfc('قَرَأْتُهُ'));
	expect(tokens.some((token) => /\s/u.test(token.trim()))).toBe(false);
	await expect(card).toContainText('‘ā’id');

	await card.getByRole('button', { name: 'Reset contoh' }).click();
	await expectArabic(card, 'الْكِتَابُ');
});

test('D-05c matches mawṣūl, ṣilah verb and khabar to a feminine antecedent', async ({ page }) => {
	await page.goto('/kaidah/klausa/');
	const card = page.locator('figure[data-inline-example="relative-male"]');
	await card
		.getByRole('button', { name: /Ganti Mubtada/ })
		.first()
		.click();
	const modal = modalOf(page);
	await modal.locator('[data-inline-choice="rel-female-read"]').click();
	expect(await tokensOf(card)).toEqual(['الطَّالِبَةُ', 'الَّتِي', 'تَقْرَأُ', 'الْكِتَابَ', 'مُجْتَهِدَةٌ'].map(nfc));
	await expect(card.locator('[data-inline-translation]')).toHaveText(
		'Siswi yang membaca buku itu rajin.'
	);
	await expect(card.locator('[data-mood="indicative"]')).toContainText('Marfū‘');
	// The unrecorded feminine ‘ā’id and the plural mawṣūl are visible but disabled.
	await card
		.getByRole('button', { name: /Ganti Mubtada/ })
		.first()
		.click();
	await expect(
		modal.locator('[data-inline-blocked="gap-relative-feminine-return"]')
	).toBeDisabled();
	await expect(modal.locator('[data-inline-reason="gap-relative-feminine-return"]')).toContainText(
		'belum tercatat'
	);
	await expect(modal.locator('[data-inline-blocked="gap-relative-dual-plural"]')).toBeDisabled();
});

test('D-05c swaps ‘aṭf and conditional cards and keeps و / ثم as the right kind of token', async ({
	page
}) => {
	await page.goto('/kaidah/klausa/');
	const actions = page.locator('figure[data-inline-example="and-two-actions"]');
	await actions
		.getByRole('button', { name: /Ganti Fi‘il māḍī/ })
		.first()
		.click();
	const modal = modalOf(page);
	await modal.locator('[data-inline-choice="athaf-girl"]').click();
	expect(await tokensOf(actions)).toEqual(['قَرَأَتِ', 'الطَّالِبَةُ', 'الْكِتَابَ', 'وَكَتَبَتِ', 'الدَّرْسَ'].map(nfc));
	await expect(actions.locator('[data-span="link"]')).toContainText('وَ + fi‘il māḍī');
	await expect(actions.locator('[data-inline-translation]')).toHaveText(
		'Siswi itu telah membaca buku itu dan menulis pelajaran itu.'
	);

	const then = page.locator('figure[data-inline-example="then-sequence"]');
	await then
		.getByRole('button', { name: /Ganti Fi‘il māḍī/ })
		.first()
		.click();
	await modal.locator('[data-inline-choice="then-teacher"]').click();
	await expectArabic(then, 'ثُمَّ');
	await expectArabic(then, 'جَاءَ');
	await expect(then.locator('[data-inline-translation]')).toHaveText(
		'Guru itu datang, kemudian duduk.'
	);
	// ثُمَّ never changes, so it has no replace button.
	await expect(
		then.locator('[data-span="link"]').getByRole('button', { name: /Ganti/ })
	).toHaveCount(0);

	const condition = page.locator('figure[data-inline-example="if-study"]');
	await condition
		.getByRole('button', { name: /Ganti Fi‘il muḍāri‘/ })
		.first()
		.click();
	await modal.locator('[data-inline-choice="if-study-understand"]').click();
	await expect(condition.locator('[data-mood="jussive"]')).toHaveCount(2);
	await expect(condition.locator('[data-inline-translation]')).toHaveText(
		'Jika kamu belajar, kamu akan memahami.'
	);
});

test('D-05c leaves cards without a sourced alternative static', async ({ page }) => {
	await page.goto('/kaidah/klausa/');
	for (const id of [
		'if-nominal-result',
		'because-sentence',
		'because-of-noun',
		'but-font',
		'but-lesson',
		'circumstance',
		'exception',
		'number-tamyiz'
	]) {
		const card = page.locator(`figure[data-inline-example="${id}"]`);
		await expect(card).toBeVisible();
		await expect(card.getByRole('button', { name: /Ganti/ })).toHaveCount(0);
	}
});

test('D-05b/c dialogs work from the keyboard: open, Escape closes, focus returns, search filters', async ({
	page
}) => {
	await page.goto('/kaidah/kalimat/');
	const card = page.locator('figure[data-inline-example="nominal-simple"]');
	const trigger = card.getByRole('button', { name: 'Ganti Topik / ism' });
	await trigger.focus();
	await page.keyboard.press('Enter');
	const modal = modalOf(page);
	await expect(modal).toBeVisible();
	await modal.getByRole('searchbox').focus();
	await page.keyboard.type('مدرسة');
	await expect(modal.locator('[data-inline-choice]')).toHaveCount(1);
	await expect(modal.locator('[data-inline-provenance="nominal-school"]')).toContainText(
		'ditulis untuk proyek ini'
	);
	await page.keyboard.press('Escape');
	await expect(modal).not.toBeVisible();
	await expect(trigger).toBeFocused();
	await expect(card).toHaveAttribute('data-inline-selected', 'nominal-simple');

	await page.goto('/kaidah/klausa/');
	const clause = page.locator('figure[data-inline-example="if-read"]');
	const clauseTrigger = clause.getByRole('button', { name: /Ganti Fi‘il muḍāri‘/ }).first();
	await clauseTrigger.focus();
	await page.keyboard.press('Enter');
	await expect(modal).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(modal).not.toBeVisible();
	await expect(clauseTrigger).toBeFocused();
});

test.describe('D-05b/c on a 375 px screen with JavaScript', () => {
	test.use({ viewport: { width: 375, height: 812 } });

	test('opens the dialog inside the viewport and shows no horizontal overflow', async ({
		page
	}) => {
		await page.goto('/kaidah/kalimat/');
		await expectNoOverflow(page);
		const card = page.locator('figure[data-inline-example="verbal-past"]');
		await card.locator('[data-role="verb"]').getByRole('button', { name: 'Ganti Fi‘il' }).click();
		const modal = modalOf(page);
		await expect(modal).toBeVisible();
		const box = await modal.boundingBox();
		expect(box!.x).toBeGreaterThanOrEqual(0);
		expect(box!.x + box!.width).toBeLessThanOrEqual(375);
		await modal.locator('[data-inline-choice="vso-students"]').click();
		await expectArabic(card, 'الطُّلَّابُ');
		await expectNoOverflow(page);

		await page.goto('/kaidah/klausa/');
		const clause = page.locator('figure[data-inline-example="relative-female"]');
		await clause
			.getByRole('button', { name: /Ganti Mubtada/ })
			.first()
			.click();
		await modal.locator('[data-inline-choice="rel-male-open"]').click();
		await expectArabic(clause, 'يَفْتَحُ');
		await expectNoOverflow(page);
	});
});

test.describe('D-05b/c static-first examples with JavaScript disabled', () => {
	test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

	test('keeps the original G-04 sentences and hides every edit affordance', async ({ page }) => {
		await page.goto('/kaidah/kalimat/');
		const verbal = page.locator('figure[data-inline-example="verbal-past"]');
		await expectArabic(verbal, 'كَتَبَ');
		await expect(verbal.locator('[data-inline-translation]')).toBeVisible();
		await expect(verbal).toContainText('Murid itu telah menulis pelajaran tersebut.');
		await expectNoArabic(verbal, 'كَتَبَتِ');
		await expect(page.getByRole('button', { name: /Ganti/ })).toHaveCount(0);
		await expect(page.locator('figure[data-inline-example]')).toHaveCount(18);
		await expectNoOverflow(page);
	});

	test('keeps the original G-05 clauses, including attached و and the ‘ā’id token', async ({
		page
	}) => {
		await page.goto('/kaidah/klausa/');
		const actions = page.locator('figure[data-inline-example="and-two-actions"]');
		await expectArabic(actions, 'وَكَتَبَ');
		const relative = page.locator('figure[data-inline-example="relative-object-return"]');
		await expectArabic(relative, 'قَرَأْتُهُ');
		await expect(relative).toContainText('Buku yang saya baca itu bermanfaat.');
		await expect(page.getByRole('button', { name: /Ganti/ })).toHaveCount(0);
		await expect(page.locator('figure[data-inline-example]')).toHaveCount(
			await page.locator('section[id] figure').count()
		);
		await expectNoOverflow(page);
	});
});
