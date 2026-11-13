import { page, userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ReferenceTable from '#lib/components/learning/ReferenceTable.svelte';
import { previewTable } from '#lib/fixtures/ui-preview.js';

describe('ReferenceTable', () => {
	it('renders Arabic cells with lang and dir', async () => {
		render(ReferenceTable, { table: previewTable });
		const first = previewTable.rows[0]!.cells['vocalised']!;
		const cell = page.getByText(first, { exact: true }).element();
		expect(cell.getAttribute('lang')).toBe('ar');
		expect(cell.getAttribute('dir')).toBe('rtl');
	});

	it('hides a column in hafalan mode and reveals one cell at a time', async () => {
		render(ReferenceTable, { table: previewTable });
		const first = previewTable.rows[0]!.cells['vocalised']!;

		await userEvent.click(page.getByLabelText('Sembunyikan berharakat'));
		await expect.element(page.getByText(first, { exact: true })).not.toBeInTheDocument();
		const reveal = page.getByRole('button', { name: 'Buka: Berharakat, baris 1' });
		await userEvent.click(reveal);
		const revealed = page.getByText(first, { exact: true });
		await expect.element(revealed).toBeVisible();
		// Focus must follow the reveal, not drop to <body>.
		await expect.element(revealed).toHaveFocus();
	});

	it('toggles a row explanation as an accessible disclosure', async () => {
		render(ReferenceTable, { table: previewTable });
		const toggle = page.getByRole('button', { name: 'Penjelasan baris 1' });
		await expect.element(toggle).toHaveAttribute('aria-expanded', 'false');
		await userEvent.click(toggle);
		await expect.element(toggle).toHaveAttribute('aria-expanded', 'true');
		await expect.element(page.getByText(previewTable.rows[0]!.explanation!).first()).toBeVisible();
	});
});
