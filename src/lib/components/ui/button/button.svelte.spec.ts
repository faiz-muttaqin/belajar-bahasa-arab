import { createRawSnippet } from 'svelte';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
// Imported through the `#lib` subpath mapping on purpose: this proves the
// shadcn-svelte aliases in components.json resolve under SvelteKit 3 and Vitest.
import { Button } from '#lib/components/ui/button/index.js';

const text = (value: string) => createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe('Button (shadcn-svelte)', () => {
	it('renders a native button with type="button" by default', async () => {
		render(Button, { children: text('Simpan') });

		await expect
			.element(page.getByRole('button', { name: 'Simpan' }))
			.toHaveAttribute('type', 'button');
	});

	it('renders a link when href is set', async () => {
		render(Button, { href: '/belajar/', children: text('Belajar') });

		await expect
			.element(page.getByRole('link', { name: 'Belajar' }))
			.toHaveAttribute('href', '/belajar/');
	});

	it('forwards the disabled state', async () => {
		render(Button, { disabled: true, children: text('Kirim') });

		await expect.element(page.getByRole('button', { name: 'Kirim' })).toBeDisabled();
	});
});
