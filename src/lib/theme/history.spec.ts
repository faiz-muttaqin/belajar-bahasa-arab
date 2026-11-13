import { describe, expect, it } from 'vitest';
import { History } from './history.js';

describe('History', () => {
	it('merges rapid changes to the same field into one step', () => {
		const h = new History<number>(10, 500);
		h.record(0, 'a', 1000);
		h.record(1, 'a', 1200);
		h.record(2, 'a', 1400);
		expect(h.undo(3)).toBe(0);
		expect(h.canUndo).toBe(false);
	});

	it('keeps changes to different fields as separate steps', () => {
		const h = new History<number>(10, 500);
		h.record(0, 'a', 1000);
		h.record(1, 'b', 1100);
		expect(h.undo(2)).toBe(1);
		expect(h.undo(1)).toBe(0);
	});

	it('clears redo on any new change, even a merged one', () => {
		const h = new History<number>(10, 500);
		h.record(0, 'a', 1000);
		h.record(1, 'a', 1100);
		expect(h.undo(2)).toBe(0);
		expect(h.canRedo).toBe(true);
		h.record(0, 'a', 1200);
		expect(h.canRedo).toBe(false);
	});

	it('redoes what was undone', () => {
		const h = new History<string>();
		h.record('one', null);
		expect(h.undo('two')).toBe('one');
		expect(h.redo('one')).toBe('two');
		expect(h.redo('two')).toBeNull();
	});

	it('caps the number of steps', () => {
		const h = new History<number>(3, 0);
		for (let i = 0; i < 5; i++) h.record(i, null, i * 10);
		expect([h.undo(5), h.undo(4), h.undo(3), h.undo(2)]).toEqual([4, 3, 2, null]);
	});
});
