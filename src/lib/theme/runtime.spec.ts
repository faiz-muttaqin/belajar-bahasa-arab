import { afterEach, describe, expect, it, vi } from 'vitest';
import { THEME_STORAGE_KEY } from './storage.js';
import { OVERRIDES_STYLE_ID, resolveMode, themeInitScript } from './runtime.js';

type FakeElement = { id?: string; textContent?: string };

function setupDom(stored: string | null, prefersDark: boolean, storageThrows = false) {
	const classes = new Set<string>();
	const head: FakeElement[] = [];
	vi.stubGlobal('window', {
		localStorage: {
			getItem: (key: string) => {
				if (storageThrows) throw new Error('blocked');
				return key === THEME_STORAGE_KEY ? stored : null;
			}
		},
		matchMedia: () => ({ matches: prefersDark })
	});
	const style: { colorScheme?: string } = {};
	vi.stubGlobal('document', {
		documentElement: {
			classList: {
				toggle: (name: string, on: boolean) => (on ? classes.add(name) : classes.delete(name))
			},
			style
		},
		createElement: () => ({}),
		getElementById: (id: string) => head.find((el) => el.id === id) ?? null,
		head: { appendChild: (el: FakeElement) => head.push(el) }
	});
	return { classes, head, style };
}

const run = () => new Function(themeInitScript)();

describe('inline theme init script', () => {
	afterEach(() => vi.unstubAllGlobals());

	it('follows the system preference when nothing is saved', () => {
		const dom = setupDom(null, true);
		run();
		expect(dom.classes.has('dark')).toBe(true);
		expect(dom.head).toEqual([]);
	});

	it('applies a saved mode and overrides before first paint', () => {
		const dom = setupDom(
			JSON.stringify({
				version: 1,
				mode: 'light',
				overrides: { light: { primary: '#123456' }, dark: {}, shared: { radius: 1 } }
			}),
			true
		);
		run();
		expect(dom.classes.has('dark')).toBe(false);
		expect(dom.head).toHaveLength(1);
		expect(dom.head[0]?.id).toBe(OVERRIDES_STYLE_ID);
		expect(dom.head[0]?.textContent).toContain('html:not(.dark) { --primary: #123456; }');
		expect(dom.head[0]?.textContent).toContain('--radius: 1rem;');
	});

	it('sets color-scheme and stays idempotent when included twice', () => {
		const dom = setupDom(
			JSON.stringify({
				version: 1,
				mode: 'dark',
				overrides: { light: {}, dark: { primary: '#123456' }, shared: {} }
			}),
			false
		);
		run();
		run();
		expect(dom.style.colorScheme).toBe('dark');
		expect(dom.head).toHaveLength(1);
	});

	it('ignores other versions and survives blocked or corrupt storage', () => {
		let dom = setupDom(JSON.stringify({ version: 99, mode: 'dark' }), false);
		run();
		expect(dom.classes.has('dark')).toBe(false);

		dom = setupDom('{broken', false);
		expect(run).not.toThrow();
		expect(dom.head).toEqual([]);

		dom = setupDom(null, false, true);
		expect(run).not.toThrow();
		expect(dom.head).toEqual([]);
	});

	it('cannot close its own script element', () => {
		expect(themeInitScript.toLowerCase()).not.toContain('</script');
	});
});

describe('resolveMode', () => {
	it('resolves the system preference', () => {
		expect(resolveMode('system', true)).toBe('dark');
		expect(resolveMode('system', false)).toBe('light');
		expect(resolveMode('light', true)).toBe('light');
	});
});
