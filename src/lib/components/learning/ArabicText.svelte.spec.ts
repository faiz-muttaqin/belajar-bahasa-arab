import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ArabicText from '#lib/components/learning/ArabicText.svelte';

const specimen = 'مُعَلِّمٌ';

describe('ArabicText', () => {
	it('renders inline Arabic as an isolated RTL span', async () => {
		render(ArabicText, { text: specimen });
		const el = page.getByText(specimen).element();
		expect(el.tagName).toBe('SPAN');
		expect(el.getAttribute('lang')).toBe('ar');
		expect(el.getAttribute('dir')).toBe('rtl');
	});

	it('renders block and display sizes as paragraphs with the Arabic face', async () => {
		render(ArabicText, { text: specimen, size: 'display' });
		const el = page.getByText(specimen).element();
		expect(el.tagName).toBe('P');
		const style = getComputedStyle(el);
		expect(style.letterSpacing === 'normal' || style.letterSpacing === '0px').toBe(true);
		expect(style.direction).toBe('rtl');
		expect(style.overflow).toBe('visible');
	});
});
