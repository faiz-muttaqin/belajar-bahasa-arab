import { describe, expect, it } from 'vitest';
import { referenceGroups, groupOfTable } from './reference-groups.js';
import { referenceTables } from './reference.js';

describe('reference groups', () => {
	it('places every reference table on exactly one page', () => {
		for (const table of referenceTables) {
			const owners = referenceGroups.filter((group) => group.tables.includes(table.id));
			expect(owners, table.id).toHaveLength(1);
		}
	});

	it('lists no table that does not exist', () => {
		const ids = new Set(referenceTables.map((table) => table.id));
		for (const group of referenceGroups) {
			for (const id of group.tables) expect(ids.has(id), id).toBe(true);
		}
	});

	it('finds the group of a table', () => {
		expect(groupOfTable('kata-tanya')?.id).toBe('tanya');
		expect(groupOfTable('nope')).toBeUndefined();
	});
});
