import { describe, expect, it } from 'vitest';
import { activeSectionId, sections } from './navigation.js';

describe('sections', () => {
	it('has exactly five tab-bar destinations (mobile combo navigation)', () => {
		expect(sections.filter((s) => s.inTabBar)).toHaveLength(5);
	});

	it('uses unique ids and trailing-slash paths', () => {
		expect(new Set(sections.map((s) => s.id)).size).toBe(sections.length);
		for (const s of sections) {
			expect(s.path.endsWith('/')).toBe(true);
		}
	});
});

describe('activeSectionId', () => {
	it.each([
		['/', 'beranda'],
		['/belajar', 'belajar'],
		['/belajar/[slug]', 'belajar'],
		['/rujukan', 'rujukan'],
		['/kosakata', 'kosakata'],
		['/editor/theme', 'tema']
	])('maps route %s to %s', (routeId, expected) => {
		expect(activeSectionId(routeId)).toBe(expected);
	});

	it('matches whole segments only', () => {
		expect(activeSectionId('/belajar-lanjut')).toBeUndefined();
	});

	it('returns undefined for other routes and unmatched pages', () => {
		expect(activeSectionId('/editor/other')).toBe('tema');
		expect(activeSectionId('/unknown')).toBeUndefined();
		expect(activeSectionId(null)).toBeUndefined();
	});
});
