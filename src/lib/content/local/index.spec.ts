import { describe, expect, it } from 'vitest';
import type { LocalSourceIndex } from '#lib/domain/local-content/types.js';
import { createLocalContent, isLocalSourceIndex } from './index.js';

const empty = { indexes: {}, lessons: {}, vocab: {}, tables: {} };

// Synthetic fixtures written for this test; not copied from any source.
const source = (id: 'cahaya-tauhid' | 'arabic-vocab') => ({
	id,
	name: `Test ${id}`,
	repoUrl: 'https://example.test/repo',
	commit: 'abc',
	licence: 'test',
	attribution: 'test attribution',
	importedAt: '2026-01-01'
});

const index = (over: Partial<LocalSourceIndex> = {}): LocalSourceIndex => ({
	schemaVersion: 1,
	source: source('cahaya-tauhid'),
	tracks: [
		{
			id: 't1',
			slug: 'track-one',
			source: 'cahaya-tauhid',
			title: 'T1',
			description: 'd',
			lang: 'id',
			lessons: [
				{ id: 'l2', slug: 'second', title: 'Second', order: 2 },
				{ id: 'l1', slug: 'first', title: 'First', order: 1 },
				{ id: 'l3', slug: 'third', title: 'Third', order: 3 }
			]
		}
	],
	vocabSets: [{ id: 'v1', slug: 'set-one', title: 'S', order: 1, itemCount: 2 }],
	tables: [{ id: 'tb1', slug: 'table-one', title: 'Tb', order: 1 }],
	...over
});

describe('local content loader without content-local/', () => {
	it('is empty and creates no prerender entries', () => {
		const content = createLocalContent(empty);
		expect(content.hasContent).toBe(false);
		expect(content.sources()).toEqual([]);
		expect(content.tracks()).toEqual([]);
		expect(content.vocabSets()).toEqual([]);
		expect(content.tables()).toEqual([]);
		expect(content.lessonEntries()).toEqual([]);
		expect(content.track('anything')).toBeUndefined();
	});

	it('returns undefined for a file that is not there', async () => {
		const content = createLocalContent(empty);
		expect(await content.loadLesson('cahaya-tauhid', 'x')).toBeUndefined();
	});
});

describe('local content loader with synthetic content', () => {
	const modules = {
		indexes: { '/content-local/cahaya-tauhid/index.json': index() },
		lessons: { '/content-local/cahaya-tauhid/lessons/l1.json': async () => ({ id: 'l1' }) },
		vocab: {},
		tables: {}
	};

	it('lists tracks, vocabulary sets, tables and prerender entries', () => {
		const content = createLocalContent(modules);
		expect(content.hasContent).toBe(true);
		expect(content.tracks().map((t) => t.slug)).toEqual(['track-one']);
		expect(content.vocabSet('set-one')?.sourceInfo.id).toBe('cahaya-tauhid');
		expect(content.table('table-one')?.title).toBe('Tb');
		expect(content.lessonEntries()).toEqual([
			{ track: 'track-one', lesson: 'second' },
			{ track: 'track-one', lesson: 'first' },
			{ track: 'track-one', lesson: 'third' }
		]);
	});

	it('finds neighbours in reading order, not file order', () => {
		const content = createLocalContent(modules);
		const track = content.track('track-one')!;
		const middle = content.neighbours(track, 'second');
		expect(middle.previous?.slug).toBe('first');
		expect(middle.next?.slug).toBe('third');
		expect(content.neighbours(track, 'first').previous).toBeUndefined();
		expect(content.neighbours(track, 'third').next).toBeUndefined();
	});

	it('loads a lesson file by source and id', async () => {
		const content = createLocalContent(modules);
		expect(await content.loadLesson('cahaya-tauhid', 'l1')).toEqual({ id: 'l1' });
		expect(await content.loadLesson('cahaya-tauhid', 'missing')).toBeUndefined();
	});

	it('skips a malformed or newer-schema source with a warning instead of failing', () => {
		const warnings: string[] = [];
		const content = createLocalContent(
			{
				...empty,
				indexes: {
					'/content-local/cahaya-tauhid/index.json': index(),
					'/content-local/arabic-vocab/index.json': {
						schemaVersion: 2,
						source: source('arabic-vocab')
					},
					'/content-local/learn-tajweed/index.json': 'nonsense'
				}
			},
			(m) => warnings.push(m)
		);
		expect(content.sources()).toHaveLength(1);
		expect(warnings).toHaveLength(2);
	});

	it('skips reserved and duplicate track slugs with a warning', () => {
		const warnings: string[] = [];
		const base = index();
		const track = base.tracks[0]!;
		const content = createLocalContent(
			{
				...empty,
				indexes: {
					'/content-local/a/index.json': index({
						tracks: [track, { ...track, id: 't2', slug: 'kosakata' }]
					}),
					'/content-local/b/index.json': index({ tracks: [{ ...track, id: 't3' }] })
				}
			},
			(m) => warnings.push(m)
		);
		expect(content.tracks().map((t) => t.id)).toEqual(['t1']);
		expect(warnings).toHaveLength(2);
	});
});

describe('isLocalSourceIndex', () => {
	it('accepts a valid index and rejects other shapes', () => {
		expect(isLocalSourceIndex(index())).toBe(true);
		expect(isLocalSourceIndex(null)).toBe(false);
		expect(isLocalSourceIndex({ schemaVersion: 1 })).toBe(false);
		expect(isLocalSourceIndex({ ...index(), tracks: 'x' })).toBe(false);
	});
});
