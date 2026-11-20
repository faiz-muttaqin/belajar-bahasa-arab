import { describe, expect, it } from 'vitest';
import { dictionaryPilot } from '#lib/content/dictionary-pilot.js';
import { rootFamily, searchDictionary, validateDictionary } from './senses.js';

describe('P5 dictionary pilot', () => {
	it('preserves eleven separately documented senses for five lemmas', () => {
		expect(validateDictionary(dictionaryPilot)).toEqual([]);
		expect(dictionaryPilot).toHaveLength(5);
		expect(dictionaryPilot.flatMap((entry) => entry.senses)).toHaveLength(11);
	});

	it('matches Indonesian glosses and explicit Arabic forms', () => {
		expect(searchDictionary(dictionaryPilot, 'kantor').map((entry) => entry.id)).toEqual([
			'maktab'
		]);
		expect(searchDictionary(dictionaryPilot, 'كُتُب')[0]?.id).toBe('kitab');
		expect(searchDictionary(dictionaryPilot, 'كتب')).toHaveLength(5);
	});

	it('filters POS and register without promoting unspecified to MSA', () => {
		expect(searchDictionary(dictionaryPilot, '', 'noun')).toHaveLength(4);
		expect(searchDictionary(dictionaryPilot, '', 'all', 'msa')).toEqual([]);
		expect(searchDictionary(dictionaryPilot, '', 'all', 'unspecified')).toHaveLength(5);
		const historical = searchDictionary(dictionaryPilot, '', 'all', 'historical');
		expect(historical.map((entry) => entry.id)).toEqual(['maktab']);
		expect(historical[0]?.senses.map((sense) => sense.id)).toEqual(['school']);
	});

	it('only groups explicitly recorded roots and rejects dangling relations', () => {
		const entry = dictionaryPilot[0]!;
		expect(rootFamily(dictionaryPilot, entry)).toHaveLength(4);
		expect(rootFamily(dictionaryPilot, { ...entry, root: undefined })).toEqual([]);
		expect(validateDictionary([dictionaryPilot[4]!])).toContain('kitabah: Invalid lexical relation');
	});

	it('does not treat rule-generated forms as attested search words', () => {
		const entry = dictionaryPilot[0]!;
		expect(
			searchDictionary(
				[
					{
						...entry,
						forms: [
							{ ar: 'غير موجود', kind: 'other', origin: 'rule-generated', evidence: entry.evidence }
						]
					}
				],
				'غير موجود'
			)
		).toEqual([]);
	});
});
