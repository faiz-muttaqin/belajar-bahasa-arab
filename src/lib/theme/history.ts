// Undo/redo history for the theme editor, kept framework-free so it can be unit tested.
//
// Fixes two problems in the editor this was ported from:
// - every new change clears the redo stack, including changes merged into the
//   previous step, so redo can never jump to a stale branch;
// - only rapid changes to the *same* field are merged into one step (dragging a
//   colour picker), so two different edits are always two undo steps.

export const HISTORY_LIMIT = 50;
export const MERGE_WINDOW_MS = 600;

export class History<T> {
	#past: T[] = [];
	#future: T[] = [];
	#lastField: string | null = null;
	#lastTime = 0;

	constructor(
		private readonly limit = HISTORY_LIMIT,
		private readonly mergeWindow = MERGE_WINDOW_MS
	) {}

	get canUndo() {
		return this.#past.length > 0;
	}

	get canRedo() {
		return this.#future.length > 0;
	}

	/** Call before applying a change, with the state as it was before the change. */
	record(previous: T, field: string | null, now = Date.now()) {
		const merge =
			field !== null &&
			field === this.#lastField &&
			now - this.#lastTime < this.mergeWindow &&
			this.#past.length > 0;
		if (!merge) {
			this.#past.push(previous);
			if (this.#past.length > this.limit) this.#past.shift();
		}
		this.#future = [];
		this.#lastField = field;
		this.#lastTime = now;
	}

	undo(current: T): T | null {
		const previous = this.#past.pop();
		if (previous === undefined) return null;
		this.#future.push(current);
		this.#lastField = null;
		return previous;
	}

	redo(current: T): T | null {
		const next = this.#future.pop();
		if (next === undefined) return null;
		this.#past.push(current);
		this.#lastField = null;
		return next;
	}

	clear() {
		this.#past = [];
		this.#future = [];
		this.#lastField = null;
	}
}
