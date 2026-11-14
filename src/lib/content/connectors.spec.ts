import { describe, expect, it } from 'vitest';
import { connectorGroups, connectorsReference } from './connectors.js';

describe('connector groups', () => {
	it('cover every connector exactly once', () => {
		const grouped = connectorGroups.flatMap((group) => [...group.ids]);
		const all = connectorsReference.rows.map((row) => row.id);
		expect([...grouped].sort()).toEqual([...all].sort());
	});

	it('give every connector an example and a note', () => {
		for (const row of connectorsReference.rows) {
			expect(row.cells.example, row.id).toBeTruthy();
			expect(row.explanation, row.id).toBeTruthy();
		}
	});
});
