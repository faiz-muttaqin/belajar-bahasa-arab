import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { competencies } from './competencies.js';
import { g02Rules, g02RuleIndex, validateG02Rules, type G02Rule } from './g02-rules.js';
import { masdarLexemes } from './masdar-lessons.js';
import { participlePairs } from './participle-lessons.js';
import { sharafSections } from './sharaf-lessons.js';
import { wazanHash, wazanLink } from './wazan-links.js';

type Row = {
	id: string;
	ar: string;
	nonPast?: string;
	verbalNouns: string[];
	activeParticiple?: string;
	passiveParticiple?: string;
	bab: number;
};

const dataDir = join(process.cwd(), 'data', 'wiktionary');
const rows = new Map<string, Row>();
for (const file of ['verbs-form-i.json', 'verbs-mazid.json']) {
	const { verbs } = JSON.parse(readFileSync(join(dataDir, file), 'utf8')) as { verbs: Row[] };
	for (const verb of verbs) rows.set(verb.id, verb);
}

/** Wiktionary lists the bare form; the lessons add tanwin to stand-alone participles and masdars. */
const bare = (text: string) => text.normalize('NFC').replace(/[ً-ٍ]/gu, '');

describe('G-02 rule registry', () => {
	it('has unique stable IDs and no dangling or cyclic prerequisites', () => {
		expect(validateG02Rules()).toEqual([]);
		expect(g02Rules.length).toBe(sharafSections.length + 11 + 4 + 4);
		expect(g02RuleIndex.size).toBe(g02Rules.length);
	});

	it('links prerequisites to learning-map competencies instead of a second graph', () => {
		const known = new Set(competencies.map((item) => item.id));
		const used = new Set(g02Rules.flatMap((rule) => rule.prerequisites.competencies));
		expect(used.size).toBeGreaterThan(5);
		for (const id of used) expect(known.has(id)).toBe(true);
	});

	it('orders the three sharaf rules and the participle chain by prerequisite', () => {
		expect(g02RuleIndex.get('g02.akar-dan-wazan')?.prerequisites.rules).toEqual([]);
		expect(g02RuleIndex.get('g02.tashrif-istilahi')?.prerequisites.rules).toEqual([
			'g02.akar-dan-wazan'
		]);
		expect(g02RuleIndex.get('g02.akar-lafif')?.prerequisites.rules).toEqual(['g02.akar-naqis']);
		expect(g02RuleIndex.get('g02.amal-isim-maful')?.prerequisites.rules).toEqual([
			'g02.amal-isim-fail'
		]);
	});

	it('rejects bad IDs, unknown prerequisites and cycles', () => {
		const base = (id: string, rules: string[] = [], competencyIds: string[] = []): G02Rule => ({
			id,
			title: id,
			page: 'kaidah/sharaf/',
			prerequisites: { rules, competencies: competencyIds }
		});
		expect(validateG02Rules([base('G02-bad')])).toContain('Invalid rule ID: G02-bad');
		expect(validateG02Rules([base('g02.a'), base('g02.a')])).toContain('Duplicate rule ID: g02.a');
		expect(validateG02Rules([base('g02.a', ['g02.zzz'])])).toContain(
			'Unknown rule prerequisite: g02.a needs g02.zzz'
		);
		expect(validateG02Rules([base('g02.a', [], ['CB-99'])])).toContain(
			'Unknown competency prerequisite: g02.a needs CB-99'
		);
		const cycle = validateG02Rules([base('g02.a', ['g02.b']), base('g02.b', ['g02.a'])]);
		expect(cycle.some((message) => message.startsWith('Prerequisite cycle'))).toBe(true);
	});
});

describe('G-02 examples against the dictionary data', () => {
	const items = [
		...sharafSections.map((item) => ({ key: item.id, dataId: item.dataId, bab: item.wazanBab })),
		...participlePairs.map((item) => ({ key: item.id, dataId: item.dataId, bab: item.wazanBab })),
		...masdarLexemes.map((item) => ({ key: item.id, dataId: item.dataId, bab: item.wazanBab }))
	];

	it('points each example at the wazan group recorded for its data row', () => {
		expect(items.length).toBe(3 + 26 + 13);
		for (const item of items) {
			const row = rows.get(item.dataId);
			expect(row, `${item.key}: missing row ${item.dataId}`).toBeDefined();
			expect(item.bab, `${item.key}: wazan group`).toBe(row?.bab);
		}
	});

	it('builds an anchor that matches the verb row on the group page', () => {
		const link = wazanLink(7, 'نظم-II-1');
		expect(link.path).toBe('rujukan/fiil/kata-kerja/7/');
		expect(link.anchor).toBe('kata-kerja-bab-7-نظم-II-1');
		expect(wazanHash(link)).toBe(`#${encodeURIComponent('kata-kerja-bab-7-نظم-II-1')}`);
		expect(wazanLink(0, 'وقى-1').path).toBe('rujukan/fiil/kata-kerja/lain/');
		expect(() => wazanLink(99, 'x')).toThrow();
	});

	it('matches every family to its māḍī, muḍāri‘, masdar and participles in the data', () => {
		for (const pair of participlePairs) {
			const row = rows.get(pair.dataId)!;
			expect(bare(pair.verb), `${pair.id}: verb`).toBe(bare(row.ar));
			expect(bare(pair.present), `${pair.id}: present`).toBe(bare(row.nonPast ?? ''));
			expect(row.verbalNouns.map(bare), `${pair.id}: masdar`).toContain(bare(pair.masdar));
			expect(bare(pair.active), `${pair.id}: active`).toBe(bare(row.activeParticiple ?? ''));
			if (pair.passive !== null) {
				expect(bare(pair.passive), `${pair.id}: passive`).toBe(bare(row.passiveParticiple ?? ''));
			}
		}
		for (const lexeme of masdarLexemes) {
			const row = rows.get(lexeme.dataId)!;
			expect(bare(lexeme.verb), `${lexeme.id}: verb`).toBe(bare(row.ar));
			expect(bare(lexeme.present), `${lexeme.id}: present`).toBe(bare(row.nonPast ?? ''));
			expect(row.verbalNouns.map(bare), `${lexeme.id}: masdar`).toContain(bare(lexeme.masdar));
		}
	});
});
