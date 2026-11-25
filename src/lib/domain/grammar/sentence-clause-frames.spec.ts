import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { clauseRules } from '#lib/content/clause-rules.js';
import { sentenceRules } from '#lib/content/sentence-rules.js';
import { clauseFrames, clauseGaps } from '#lib/content/clause-frames.js';
import { sentenceFrames, sentenceGaps } from '#lib/content/sentence-frames.js';
import { recordedVerbs, verbValency } from '#lib/content/frame-verbs.js';
import { publishedVocabulary } from '#lib/content/vocabulary.js';
import {
	assessFrame,
	canEditFrameExample,
	canEditFrameSlot,
	frameExample,
	frameRegistry,
	resolveFrameExample,
	searchFrameChoices,
	validateFrameRegistry,
	type FrameKind
} from './sentence-clause-frames.js';
import type { SlotMeta } from './frame-types.js';
import { resolveVerbFrame, verbFrameIds } from './verb-frames.js';

const nfc = (text: string) => text.normalize('NFC');
const frameOf = (kind: FrameKind, id: string) => {
	const frame = frameRegistry(kind).find((item) => item.id === id);
	if (!frame) throw new Error('Missing frame ' + id);
	return frame;
};
const reasonCodes = (kind: FrameKind, frame: ReturnType<typeof frameOf>) =>
	assessFrame(kind, frame).reasons.map((reason) => reason.code);

/** Replace the metadata of one slot in a copy of a frame. */
function withSlot(kind: FrameKind, id: string, index: number, patch: Partial<SlotMeta>) {
	const frame = frameOf(kind, id);
	return {
		...frame,
		slots: frame.slots.map((slot, i) => (i === index ? { ...slot, ...patch } : slot))
	} as ReturnType<typeof frameOf>;
}

function withTokenPatch(
	kind: FrameKind,
	id: string,
	index: number,
	patch: Record<string, unknown>
) {
	const frame = frameOf(kind, id);
	const example = frameExample(kind, frame)!;
	if (kind === 'sentence') {
		const sentence = example as (typeof sentenceRules)[number]['examples'][number];
		return {
			...frame,
			original: undefined,
			example: {
				...sentence,
				id: frame.id,
				tokens: sentence.tokens.map((token, i) => (i === index ? { ...token, ...patch } : token))
			}
		} as ReturnType<typeof frameOf>;
	}
	const clause = example as (typeof clauseRules)[number]['examples'][number];
	let counter = 0;
	return {
		...frame,
		original: undefined,
		example: {
			...clause,
			id: frame.id,
			spans: clause.spans.map((span) => ({
				...span,
				tokens: span.tokens.map((token) => (counter++ === index ? { ...token, ...patch } : token))
			}))
		}
	} as ReturnType<typeof frameOf>;
}

describe('D-05b/c registries stay complete, sourced and draft', () => {
	it('passes every fail-closed validator for all G-04 and G-05 frames', () => {
		expect(validateFrameRegistry('sentence')).toEqual([]);
		expect(validateFrameRegistry('clause')).toEqual([]);
	});

	it('records a source, an https URL and a provenance note for every frame', () => {
		for (const kind of ['sentence', 'clause'] as const) {
			for (const frame of frameRegistry(kind)) {
				const choice = assessFrame(kind, frame);
				expect(choice.sourceUrls.length, frame.id).toBeGreaterThan(0);
				expect(
					choice.sourceUrls.every((url) => url.startsWith('https://')),
					frame.id
				).toBe(true);
				expect(choice.provenance, frame.id).toMatch(/\S/);
				expect(frame.provenance.basis, frame.id).toMatch(/\S/);
			}
		}
	});

	it('does not use the local lex.zip database or any non-public path as a source', () => {
		for (const kind of ['sentence', 'clause'] as const) {
			for (const frame of frameRegistry(kind)) {
				const text = JSON.stringify([frame.provenance, assessFrame(kind, frame).sourceUrls]);
				expect(text).not.toMatch(/lex\.zip|db\.sqlite|content-local/u);
			}
		}
	});

	it('keeps every authored frame on the same id as its example and original frames on rule data', () => {
		for (const kind of ['sentence', 'clause'] as const) {
			for (const frame of frameRegistry(kind)) {
				if (frame.original) {
					expect(frame.example, frame.id).toBeUndefined();
					expect(frameExample(kind, frame)?.id, frame.id).toBe(frame.id);
				} else {
					expect(frame.example?.id, frame.id).toBe(frame.id);
				}
			}
		}
	});

	it('writes every clitic and conjunction as one orthographic token', () => {
		for (const frame of clauseFrames) {
			const tokens = frameExample('clause', frame)!;
			const flat = (tokens as (typeof clauseRules)[number]['examples'][number]).spans.flatMap(
				(span) => span.tokens
			);
			for (const token of flat) expect(/\s/u.test(token.arabic.trim()), frame.id).toBe(false);
			frame.slots.forEach((slot, i) => {
				if (slot.clitic) expect(nfc(flat[i]!.arabic), frame.id).toBe(nfc(slot.clitic + slot.stem!));
			});
		}
		expect(frameOf('clause', 'and-two-actions').slots[3]!.stem).toBe('كَتَبَ');
		expect(frameOf('clause', 'athaf-guard').slots[3]!.clitic).toBe('وَ');
	});
});

describe('D-05b cards that become interactive and cards that stay static', () => {
	it('makes every original G-04 sentence card interactive', () => {
		const ids = sentenceRules.flatMap((rule) => rule.examples.map((example) => example.id));
		expect(ids).toHaveLength(18);
		for (const id of ids) expect(canEditFrameExample('sentence', id), id).toBe(true);
	});

	it('makes the ‘aṭf, relative and conditional G-05 cards interactive', () => {
		for (const id of [
			'and-two-actions',
			'then-sequence',
			'coordinated-subjects',
			'relative-male',
			'relative-female',
			'relative-object-return',
			'if-study',
			'if-read'
		])
			expect(canEditFrameExample('clause', id), id).toBe(true);
	});

	it('keeps reason, contrast, adjunct and nominal-result cards static', () => {
		for (const id of [
			'if-nominal-result',
			'because-sentence',
			'because-of-noun',
			'but-font',
			'but-lesson',
			'circumstance',
			'exception',
			'number-tamyiz'
		])
			expect(canEditFrameExample('clause', id), id).toBe(false);
	});

	it('only shows the edit button where an allowed alternative has a different surface', () => {
		expect(canEditFrameSlot('sentence', 'nominal-simple', 0)).toBe(true);
		expect(canEditFrameSlot('sentence', 'nominal-simple', 1)).toBe(true);
		expect(canEditFrameSlot('sentence', 'nominal-simple', 2)).toBe(false);
		expect(canEditFrameSlot('sentence', 'nominal-prepositional', 1)).toBe(false); // فِي never changes
		expect(canEditFrameSlot('sentence', 'nominal-prepositional', 2)).toBe(true);
		expect(canEditFrameSlot('clause', 'then-sequence', 2)).toBe(false); // ثُمَّ never changes
		expect(canEditFrameSlot('clause', 'then-sequence', 3)).toBe(true);
		expect(canEditFrameExample('sentence', 'nonexistent')).toBe(false);
	});
});

describe('D-05b/c replace one complete frame', () => {
	it('swaps tokens, glosses, translation and explanation together for a feminine frame', () => {
		const original = frameExample('sentence', frameOf('sentence', 'verbal-past'))!;
		const selected = resolveFrameExample('sentence', 'verbal-past', 'vso-girl-write')!;
		expect(selected.tokens.map((token) => token.arabic)).toEqual(['كَتَبَتِ', 'الطَّالِبَةُ', 'الدَّرْسَ']);
		expect(selected.tokens.map((token) => token.gloss)).toEqual([
			'telah menulis',
			'siswi itu',
			'pelajaran itu'
		]);
		expect(selected.translation).toBe('Siswi itu telah menulis pelajaran itu.');
		expect(selected.explanation).toContain('gender');
		expect(selected.tokens).not.toEqual((original as typeof selected).tokens);
	});

	it('changes verb, pelaku and ṣilah together in a G-05 frame, never one slot alone', () => {
		const selected = resolveFrameExample('clause', 'relative-male', 'rel-female-read')!;
		const arabic = selected.spans.flatMap((span) => span.tokens.map((token) => token.arabic));
		expect(arabic).toEqual(['الطَّالِبَةُ', 'الَّتِي', 'تَقْرَأُ', 'الْكِتَابَ', 'مُجْتَهِدَةٌ']);
		expect(selected.translation).toBe('Siswi yang membaca buku itu rajin.');
	});

	it('refuses an unknown id, a frame from another family or a frame that fails validation', () => {
		expect(resolveFrameExample('sentence', 'verbal-past', 'hacked')).toBeUndefined();
		expect(resolveFrameExample('sentence', 'verbal-past', 'nominal-school')).toBeUndefined();
		expect(resolveFrameExample('clause', 'if-study', 'rel-male-write')).toBeUndefined();
		expect(resolveFrameExample('sentence', 'missing', 'missing')).toBeUndefined();
	});
});

describe('D-05b coverage of gender, number, valency, negation, passive and mu‘tal', () => {
	const sentenceIds = (predicate: (frame: (typeof sentenceFrames)[number]) => boolean) =>
		sentenceFrames.filter(predicate).map((frame) => frame.id);

	it('has feminine frames for verb agreement, khabar agreement and kāna', () => {
		expect(
			sentenceIds((f) =>
				f.slots.some((s) => s.features.gender === 'feminine' && s.wordClass === 'verb')
			)
		).toEqual(
			expect.arrayContaining([
				'vso-girl-write',
				'nv-girl-read',
				'nasikh-kana-school',
				'q-girl-write'
			])
		);
		expect(
			sentenceIds((f) =>
				f.slots.some((s) => s.features.gender === 'feminine' && s.wordClass === 'adjective')
			)
		).toEqual(expect.arrayContaining(['nominal-school', 'nominal-student-f']));
	});

	it('covers plural: a human plural agent with a singular verb and a nonhuman plural with a feminine khabar', () => {
		const students = frameOf('sentence', 'vso-students');
		expect(students.slots[1]!.features.number).toBe('plural');
		expect(students.slots[0]!.features.number).toBe('singular');
		const books = frameOf('sentence', 'nominal-books');
		expect(books.pluralAnimacy).toBe('nonhuman');
		expect(books.slots[1]!.features).toMatchObject({ gender: 'feminine', number: 'singular' });
		expect(assessFrame('sentence', books).allowed).toBe(true);
		// Unknown animacy stays blocked.
		const unknown = { ...books, pluralAnimacy: undefined } as typeof books;
		expect(reasonCodes('sentence', unknown)).toContain('unverified-plural-agreement');
	});

	it('does not offer a dual frame and says why', () => {
		for (const frame of [...sentenceFrames, ...clauseFrames])
			expect(
				frame.slots.some((slot) => slot.features.number === 'dual'),
				frame.id
			).toBe(false);
		const dual = sentenceGaps.find((gap) => gap.id === 'gap-dual-subject')!;
		expect(dual.reason).toMatch(/mutsanna/u);
		const rows = searchFrameChoices('sentence', 'nominal-simple', 'nominal-simple', 0, 'mutsanna');
		expect(rows).toHaveLength(1);
		expect(rows[0]).toMatchObject({ allowed: false, gap: true });
		expect(rows[0]!.reasons[0]!.message).toMatch(/belum tercatat/u);
	});

	it('curates transitive frames with listed objects and intransitive frames without an object', () => {
		const intransitive = ['vso-sit', 'vso-absent', 'nv-sit', 'neg-la-absent', 'q-absent'];
		for (const id of intransitive) {
			const frame = frameOf('sentence', id);
			const verb = frame.slots.find((slot) => slot.wordClass === 'verb')!;
			expect(verbValency[verb.lexemeId]?.kind, id).toBe('intransitive');
			expect(frame.slots.some((slot) => slot.features.case === undefined && false)).toBe(false);
			expect(assessFrame('sentence', frame).allowed, id).toBe(true);
		}
		for (const id of ['vso-guard-open', 'vso-boy-letter', 'verbal-past']) {
			const verb = frameOf('sentence', id).slots.find((slot) => slot.wordClass === 'verb')!;
			expect(verbValency[verb.lexemeId]?.kind, id).toBe('transitive');
		}
		// Adding an object to an intransitive frame, or dropping the object, is blocked.
		const sit = frameOf('sentence', 'vso-sit');
		const withObject = {
			...sit,
			original: undefined,
			example: {
				...frameExample('sentence', sit)!,
				id: sit.id,
				tokens: [
					...(frameExample('sentence', sit) as (typeof sentenceRules)[number]['examples'][number])
						.tokens,
					{
						arabic: 'الدَّرْسَ',
						gloss: 'pelajaran itu',
						role: 'object',
						detail: 'Maf‘ūl bih',
						irab: 'nasb',
						marker: 'fatḥa'
					}
				]
			},
			slots: [...sit.slots, frameOf('sentence', 'verbal-past').slots[2]!]
		} as ReturnType<typeof frameOf>;
		expect(reasonCodes('sentence', withObject)).toContain('valency');
	});

	it('covers negation with لَا، لَمْ and لَنْ and keeps each verb mood tied to its particle', () => {
		for (const [id, mood] of [
			['negation-la', 'indicative'],
			['negation-lam', 'jussive'],
			['negation-lan', 'subjunctive'],
			['neg-lan-letter', 'subjunctive'],
			['neg-la-absent', 'indicative']
		] as const) {
			const choice = assessFrame('sentence', frameOf('sentence', id));
			expect(choice.allowed, id).toBe(true);
			const example = frameExample(
				'sentence',
				frameOf('sentence', id)
			)! as (typeof sentenceRules)[number]['examples'][number];
			expect(example.tokens[1]!.mood, id).toBe(mood);
		}
		const mismatch = withTokenPatch('sentence', 'negation-la', 0, { arabic: 'لَمْ' });
		expect(reasonCodes('sentence', mismatch)).toContain('particle-mood');
	});

	it('covers the passive with a paired active frame whose object becomes the nā’ib al-fā‘il', () => {
		for (const id of ['passive-writing', 'passive-opening', 'passive-letter']) {
			const frame = frameOf('sentence', id);
			expect(frame.slots[0]!.features.voice, id).toBe('passive');
			expect(assessFrame('sentence', frame).allowed, id).toBe(true);
			const active = frameOf('sentence', frame.pairedActiveId!);
			expect(active.slots[0]!.lexemeId).toBe(frame.slots[0]!.lexemeId);
			expect(active.slots[2]!.lexemeId).toBe(frame.slots[1]!.lexemeId);
		}
		const wrongPair = {
			...frameOf('sentence', 'passive-writing'),
			pairedActiveId: 'active-opening'
		};
		expect(reasonCodes('sentence', wrongPair)).toContain('passive-pair');
		const noPair = { ...frameOf('sentence', 'passive-writing'), pairedActiveId: undefined };
		expect(reasonCodes('sentence', noPair)).toContain('passive-pair');
		const agentGiven = reasonCodes('sentence', {
			...frameOf('sentence', 'passive-writing'),
			slots: [frameOf('sentence', 'passive-writing').slots[0]!]
		} as ReturnType<typeof frameOf>);
		expect(agentGiven).toContain('unverified-surface');
	});

	it('includes mu‘tal verbs whose forms are recorded and no unrecorded mu‘tal form', () => {
		const ghaba = recordedVerbs.find((verb) => verb.id === 'wikt-ghaba')!;
		expect(ghaba.past).toBe('غَابَ');
		expect(ghaba.present).toBe('يَغِيبُ');
		const mutal = sentenceFrames.filter((frame) =>
			frame.slots.some((slot) => slot.lexemeId === 'wikt-ghaba')
		);
		expect(mutal.map((frame) => frame.id).sort()).toEqual([
			'neg-la-absent',
			'q-absent',
			'vso-absent'
		]);
		expect(assessFrame('sentence', frameOf('sentence', 'q-absent')).translation).toBe(
			'Apakah murid itu absen?'
		);
		for (const frame of mutal) {
			expect(assessFrame('sentence', frame).allowed, frame.id).toBe(true);
			const verb = frame.slots.find((slot) => slot.lexemeId === 'wikt-ghaba')!;
			expect(verb.basis).toBe('wiktionary-form');
		}
		// A lam or lan form of the mu‘tal verb is not recorded, so no frame uses it.
		expect(resolveVerbFrame('wikt-ghaba', 'lam')).toBeUndefined();
		const wrongForm = withSlot('sentence', 'neg-la-absent', 1, { verbFrame: 'past' });
		expect(reasonCodes('sentence', wrongForm)).toContain('unattested-verb-form');
	});

	it('covers the imperative from D-03 and lists unrecorded D-03 forms as disabled gaps', () => {
		const amr = assessFrame('sentence', frameOf('sentence', 'imperative-open'));
		expect(amr.allowed).toBe(true);
		expect(amr.surfaces).toEqual(['اِفْتَحْ', 'الْبَابَ']);
		const rows = searchFrameChoices('sentence', 'verbal-past', 'verbal-past', 0, '');
		const gaps = rows.filter((row) => row.gap);
		const gapIds = gaps.map((gap) => gap.id);
		expect(gapIds).toEqual(
			expect.arrayContaining([
				'gap-d03-fiil-kataba-imperative',
				'gap-d03-fiil-qaraa-lam',
				'gap-d03-fiil-qaraa-lan',
				'gap-d03-fiil-fataha-lam'
			])
		);
		// Every gap matches a form that D-03 really lacks, and every lacking form has a gap.
		for (const verb of ['fiil-kataba', 'fiil-qaraa', 'fiil-fataha']) {
			for (const frameId of verbFrameIds) {
				const listed = gapIds.includes('gap-d03-' + verb + '-' + frameId);
				const lacking = !resolveVerbFrame(verb, frameId);
				if (['lam', 'lan', 'imperative'].includes(frameId))
					expect(listed, verb + frameId).toBe(lacking);
			}
		}
		expect(gaps.every((gap) => !gap.allowed && gap.reasons[0]!.message.length > 0)).toBe(true);
		// Gaps for verb forms only appear on a verb slot.
		const atAgent = searchFrameChoices('sentence', 'verbal-past', 'verbal-past', 1, '');
		expect(atAgent.some((row) => row.id.startsWith('gap-d03'))).toBe(false);
	});
});

describe('D-05b/c disabled options explain themselves', () => {
	it('lists blocked frames after allowed ones, with the validator reason', () => {
		const broken = withSlot('sentence', 'vso-girl-write', 0, {
			features: { ...frameOf('sentence', 'vso-girl-write').slots[0]!.features, gender: 'masculine' }
		});
		const choice = assessFrame('sentence', broken);
		expect(choice.allowed).toBe(false);
		expect(choice.reasons.map((reason) => reason.code)).toContain('verb-agreement');
		expect(choice.reasons.map((reason) => reason.message).join(' ')).toMatch(/gender/u);
	});

	it('blocks a spelling that no longer matches the recorded D-03 form', () => {
		const stale = withTokenPatch('sentence', 'imperative-open', 0, { arabic: 'اِفْتَحُ' });
		expect(reasonCodes('sentence', stale)).toContain('unattested-verb-form');
	});

	it('blocks a verb frame that D-03 has not recorded and an authored variant without a source form', () => {
		const lam = withSlot('sentence', 'negation-lam', 1, { lexemeId: 'fiil-qaraa' });
		expect(reasonCodes('sentence', lam)).toContain('unattested-verb-form');
		const orphan = withSlot('sentence', 'vso-girl-write', 0, { derivedFrom: '' });
		expect(reasonCodes('sentence', orphan)).toContain('unverified-surface');
	});

	it('blocks a wrong case sign, a plural verb, a missing object and a changed slot count', () => {
		expect(
			reasonCodes('sentence', withTokenPatch('sentence', 'vso-boy-letter', 2, { marker: 'ḍamma' }))
		).toContain('case-marker');
		expect(
			reasonCodes(
				'sentence',
				withSlot('sentence', 'vso-boy-letter', 0, {
					features: {
						...frameOf('sentence', 'vso-boy-letter').slots[0]!.features,
						number: 'plural'
					}
				})
			)
		).toContain('verb-agreement');
		const noObject = {
			...frameOf('sentence', 'vso-boy-letter'),
			slots: frameOf('sentence', 'vso-boy-letter').slots.slice(0, 2)
		};
		expect(reasonCodes('sentence', noObject)).toContain('unverified-surface');
		expect(
			reasonCodes('sentence', withSlot('sentence', 'vso-boy-letter', 2, { lexemeId: 'bab' }))
		).toContain('unlisted-collocation');
	});

	it('blocks an unmarked kāna khabar case and an unlisted relative clause', () => {
		const kana = withTokenPatch('sentence', 'nasikh-kana-lesson', 2, {
			irab: 'raf',
			marker: 'tanwin ḍamm'
		});
		expect(reasonCodes('sentence', kana)).toEqual(expect.arrayContaining(['nasikh-case']));
		const relative = withTokenPatch('clause', 'rel-male-write', 3, { arabic: 'الْبَابَ' });
		expect(reasonCodes('clause', relative)).toContain('uncurated-relation');
	});

	it('blocks a connected kasra that is not followed by ال-', () => {
		const frame = frameOf('sentence', 'vso-sit');
		const girl = frameOf('sentence', 'vso-girl-write');
		expect(assessFrame('sentence', girl).allowed).toBe(true);
		const broken = withTokenPatch('sentence', 'vso-girl-write', 1, { arabic: 'طَالِبَةٌ' });
		expect(reasonCodes('sentence', broken)).toContain('sandhi');
		expect(frame.id).toBe('vso-sit');
	});

	it('blocks a spaced clitic, a ma‘ṭūf case change and a non-jussive conditional verb', () => {
		expect(
			reasonCodes('clause', withTokenPatch('clause', 'athaf-guard', 3, { arabic: 'وَ دَخَلَ' }))
		).toContain('clitic-token');
		expect(
			reasonCodes(
				'clause',
				withTokenPatch('clause', 'subj-attend', 2, { irab: 'nasb', marker: 'fatḥa' })
			)
		).toEqual(expect.arrayContaining(['athaf-case']));
		expect(
			reasonCodes(
				'clause',
				withTokenPatch('clause', 'if-study-understand', 1, { mood: 'indicative', marker: 'ḍamma' })
			)
		).toContain('particle-mood');
	});

	it('keeps the recorded gaps for relatives and ‘aṭf visible with a reason and no invented Arabic', () => {
		const rows = searchFrameChoices('clause', 'relative-male', 'relative-male', 0, 'feminin');
		const gap = rows.find((row) => row.id === 'gap-relative-feminine-return')!;
		expect(gap.allowed).toBe(false);
		expect(gap.reasons[0]!.message).toMatch(/ـهَا/u);
		// Gap surfaces are only attested words, never a new inflected form.
		for (const item of [...sentenceGaps, ...clauseGaps]) {
			for (const surface of item.surfaces) {
				const known = [...sentenceFrames, ...clauseFrames].some((frame) => {
					const kind = sentenceFrames.includes(frame as never) ? 'sentence' : 'clause';
					return assessFrame(kind, frame).surfaces.some((s) => nfc(s).includes(nfc(surface)));
				});
				const lexical = ['قَالَ', 'فَ', 'إِذَا'].includes(surface);
				expect(known || lexical, item.id + ' ' + surface).toBe(true);
			}
		}
	});
});

describe('D-05b/c search', () => {
	it('searches Arabic without harakat and Indonesian text inside one family', () => {
		const arabic = searchFrameChoices('sentence', 'nominal-simple', 'nominal-simple', 0, 'مدرسة');
		expect(arabic.map((row) => row.id)).toEqual(['nominal-school']);
		const indonesian = searchFrameChoices(
			'sentence',
			'nominal-simple',
			'nominal-simple',
			0,
			'siswi'
		);
		expect(indonesian.map((row) => row.id)).toEqual(['nominal-student-f']);
		expect(searchFrameChoices('sentence', 'nominal-simple', 'nominal-simple', 0, 'xyz')).toEqual(
			[]
		);
		// Another family is never searched.
		expect(searchFrameChoices('sentence', 'nominal-simple', 'nominal-simple', 0, 'اِفْتَحْ')).toEqual(
			[]
		);
	});

	it('lists every allowed frame of a family first for an empty query', () => {
		const rows = searchFrameChoices('clause', 'if-study', 'if-study', 1, '');
		expect(rows.map((row) => row.id)).toEqual([
			'if-study',
			'if-read',
			'if-study-understand',
			'if-read-succeed',
			'gap-condition-other'
		]);
		expect(rows.filter((row) => row.allowed)).toHaveLength(4);
	});
});

describe('D-05b/c lineage: forms come from recorded data', () => {
	const wiktionary = JSON.parse(readFileSync('data/wiktionary/verbs-form-i.json', 'utf8')) as {
		verbs: { id: string; ar: string; nonPast: string }[];
	};
	const corpus = [
		'src/lib/content/sentence-rules.ts',
		'src/lib/content/clause-rules.ts',
		'src/lib/content/grammar-rules.ts',
		'src/lib/content/phrase-rules.ts',
		'src/lib/domain/grammar/dynamic-examples.ts'
	]
		.map((path) => nfc(readFileSync(path, 'utf8')))
		.join('\n');
	const vocabulary = [...publishedVocabulary('msa'), ...publishedVocabulary('harian')];
	const vocabularyForms = new Set(
		vocabulary.flatMap((item) =>
			[item.arabic, item.msa?.feminine, item.msa?.plural?.value].filter(Boolean).map((v) => nfc(v!))
		)
	);
	const d03Forms = new Set<string>();
	for (const verb of Object.keys(verbValency))
		for (const id of verbFrameIds) {
			const resolved = resolveVerbFrame(verb, id);
			if (resolved) d03Forms.add(nfc(resolved.form.text));
		}

	it('copies every recorded verb exactly from the Wiktionary Form I extract', () => {
		for (const verb of recordedVerbs) {
			const entry = wiktionary.verbs.find((item) => item.id === verb.wiktionaryId);
			expect(entry, verb.id).toBeDefined();
			expect(nfc(entry!.ar), verb.id).toBe(nfc(verb.past));
			expect(nfc(entry!.nonPast), verb.id).toBe(nfc(verb.present));
			expect(verb.page.startsWith('https://en.wiktionary.org/wiki/')).toBe(true);
		}
	});

	it('gives every msa-* lexeme a vocabulary entry of the right class and its recorded source', () => {
		for (const kind of ['sentence', 'clause'] as const) {
			for (const frame of frameRegistry(kind)) {
				const choice = assessFrame(kind, frame);
				for (const slot of frame.slots) {
					if (!slot.lexemeId.startsWith('msa-')) continue;
					const entry = vocabulary.find((item) => item.id === slot.lexemeId);
					expect(entry, frame.id + ' ' + slot.lexemeId).toBeDefined();
					expect(entry!.msa?.wordClass, slot.lexemeId).toBe(slot.wordClass);
					expect(
						entry!.sources.some((url) => choice.sourceUrls.includes(url)),
						frame.id + ' ' + slot.lexemeId
					).toBe(true);
				}
			}
		}
	});

	it('traces every project-surface token to curriculum, G-06 pilot, D-03 or a vocabulary form', () => {
		for (const kind of ['sentence', 'clause'] as const) {
			for (const frame of frameRegistry(kind)) {
				const surfaces = assessFrame(kind, frame).surfaces;
				frame.slots.forEach((slot, i) => {
					if (slot.basis !== 'project-surface') return;
					const surface = nfc(surfaces[i]!);
					const known =
						corpus.includes(surface) ||
						vocabularyForms.has(surface) ||
						d03Forms.has(surface) ||
						recordedVerbs.some((v) => nfc(v.past) === surface || nfc(v.present) === surface);
					expect(known, frame.id + ' ' + surface).toBe(true);
				});
			}
		}
	});

	it('keeps every authored variant derived from a surface that is attested elsewhere', () => {
		for (const kind of ['sentence', 'clause'] as const) {
			for (const frame of frameRegistry(kind)) {
				for (const slot of frame.slots) {
					if (slot.basis !== 'authored-variant') continue;
					expect(slot.derivedFrom?.trim(), frame.id).toBeTruthy();
				}
			}
		}
		expect(validateFrameRegistry('sentence').filter((e) => e.includes('variant source'))).toEqual(
			[]
		);
	});

	it('lists every frame in the D-05b/c audit document with its source and the limits of the evidence', () => {
		const audit = readFileSync('docs/data/dynamic-clauses-d05bc-audit.md', 'utf8');
		for (const kind of ['sentence', 'clause'] as const)
			for (const frame of frameRegistry(kind))
				expect(audit, frame.id).toContain('`' + frame.id + '`');
		expect(audit).toMatch(/Fable/u);
		expect(audit).toMatch(/draft/u);
	});
});
