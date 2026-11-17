import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

type Audit = {
	checkedOn: string;
	plans: {
		file: string;
		status: 'implemented' | 'partial' | 'planned' | 'deferred';
		evidence: string[];
		remaining: string;
		next: string;
	}[];
};

const root = process.cwd();
const audit = JSON.parse(
	readFileSync(join(root, 'docs/plans/implementation-status.json'), 'utf8')
) as Audit;

describe('plan completion audit', () => {
	it('inventories every docs/plans markdown file, without conflating PR merge with done', () => {
		const all = readdirSync(join(root, 'docs/plans')).filter(
			(file) => file.endsWith('.md') && file !== 'IMPLEMENTATION_STATUS.md'
		);
		expect(audit.plans.map((item) => item.file).sort()).toEqual(all.sort());
		expect(new Set(audit.plans.map((item) => item.file)).size).toBe(all.length);
		expect(audit.plans.some((item) => item.status !== 'implemented')).toBe(true);
	});
	it('requires concrete existing evidence for implemented/pilot statuses and explicit follow-up', () => {
		for (const item of audit.plans) {
			expect(item.remaining.trim().length).toBeGreaterThan(20);
			expect(item.next.trim().length).toBeGreaterThan(0);
			expect(existsSync(join(root, 'docs/plans', item.file))).toBe(true);
			for (const path of item.evidence) {
				expect(existsSync(join(root, path)), path).toBe(true);
			}
			if (item.status === 'implemented' || item.status === 'partial') {
				expect(item.evidence.length).toBeGreaterThan(0);
			}
		}
	});
});
