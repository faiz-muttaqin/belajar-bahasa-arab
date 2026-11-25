import { describe, expect, it } from 'vitest';
import { feat } from '#lib/content/frame-authoring.js';
import { evaluateAdjectiveAgreement } from './grammar-constraints.js';
import { evaluateRelativeClause, type RelationWord } from './phrase-relation-constraints.js';
import {
	evaluateAthafActions,
	evaluateAthafSubjects,
	evaluateCaseMarker,
	evaluateClitic,
	evaluateCondition,
	evaluateImperativeFrame,
	evaluateLinkingKasra,
	evaluateNasikh,
	evaluateNegatedVerb,
	evaluateNominalAdjective,
	evaluatePassiveFrame,
	evaluateQuestionParticle,
	evaluateRelativeFrame,
	evaluateVerbalFrame,
	type FrameSlot,
	type VerbValency
} from './sentence-clause-constraints.js';
import type { IrabCase } from '#lib/content/phrase-rules.js';
import type { VerbMood } from '#lib/content/sentence-rules.js';
import type { WordClass } from './lexeme-forms.js';

const evidence = {
	kind: 'curated-example',
	reviewStatus: 'draft',
	sourceUrls: ['https://example.org/source'],
	note: 'fixture'
} as const;

function slot(
	id: string,
	text: string,
	wordClass: WordClass,
	features: string,
	extra: {
		irab?: IrabCase;
		mood?: VerbMood;
		marker?: string;
		clitic?: 'وَ' | 'فَ';
		stem?: string;
	} = {}
): FrameSlot {
	return {
		id,
		text,
		wordClass,
		features: {
			...feat(features),
			...(extra.irab ? { case: extra.irab } : {}),
			...(extra.mood ? { mood: extra.mood } : {})
		},
		evidence,
		marker: extra.marker,
		clitic: extra.clitic,
		stem: extra.stem
	};
}

const talib = slot('t', 'الطَّالِبُ', 'noun', 'm sg def', { irab: 'raf', marker: 'ḍamma' });
const talibah = slot('tf', 'الطَّالِبَةُ', 'noun', 'f sg def', { irab: 'raf', marker: 'ḍamma' });
const dars = slot('d', 'الدَّرْسَ', 'noun', 'm sg def', { irab: 'nasb', marker: 'fatḥa' });
const kataba = slot('v', 'كَتَبَ', 'verb', '3 m sg perf act');
const katabat = slot('v', 'كَتَبَتِ', 'verb', '3 f sg perf act');
const transitive: VerbValency = { kind: 'transitive', objectIds: ['d'] };
const intransitive: VerbValency = { kind: 'intransitive' };
const codes = (reasons: readonly { code: string }[]) => reasons.map((item) => item.code);

describe('D-05b/c case and mood markers', () => {
	it('accepts a printed sign that belongs to the declared case or mood', () => {
		expect(evaluateCaseMarker(talib)).toEqual([]);
		expect(evaluateCaseMarker(dars)).toEqual([]);
		const lam = slot('v', 'يَكْتُبْ', 'verb', '3 m sg impf act', { mood: 'jussive', marker: 'sukūn' });
		expect(evaluateCaseMarker(lam)).toEqual([]);
	});

	it('rejects a sign from another case, a missing sign and a sign without case or mood', () => {
		expect(codes(evaluateCaseMarker({ ...dars, marker: 'ḍamma' }))).toEqual(['case-marker']);
		expect(codes(evaluateCaseMarker({ ...dars, marker: undefined }))).toEqual(['case-marker']);
		expect(codes(evaluateCaseMarker({ ...kataba, marker: 'fatḥa' }))).toEqual(['case-marker']);
		const wrongMood = slot('v', 'يَكْتُبْ', 'verb', '3 m sg impf act', {
			mood: 'jussive',
			marker: 'ḍamma'
		});
		expect(codes(evaluateCaseMarker(wrongMood))).toEqual(['case-marker']);
	});
});

describe('D-05b fi‘il, fā‘il and maf‘ūl bih', () => {
	it('accepts agreement in gender, with a singular verb before singular and plural agents', () => {
		expect(
			evaluateVerbalFrame({ verb: kataba, agent: talib, object: dars, valency: transitive })
		).toEqual([]);
		expect(
			evaluateVerbalFrame({ verb: katabat, agent: talibah, object: dars, valency: transitive })
		).toEqual([]);
		const students = slot('t', 'الطُّلَّابُ', 'noun', 'm pl def', { irab: 'raf', marker: 'ḍamma' });
		expect(
			evaluateVerbalFrame({ verb: kataba, agent: students, object: dars, valency: transitive })
		).toEqual([]);
	});

	it('blocks a gender mismatch, a plural verb and a dual agent instead of guessing', () => {
		expect(
			codes(
				evaluateVerbalFrame({ verb: kataba, agent: talibah, object: dars, valency: transitive })
			)
		).toContain('verb-agreement');
		const pluralVerb = slot('v', 'كَتَبُوا', 'verb', '3 m pl perf act');
		expect(
			codes(
				evaluateVerbalFrame({ verb: pluralVerb, agent: talib, object: dars, valency: transitive })
			)
		).toContain('verb-agreement');
		const dual = slot('t', 'الطَّالِبَانِ', 'noun', 'm du def', { irab: 'raf', marker: 'alif' });
		expect(
			codes(evaluateVerbalFrame({ verb: kataba, agent: dual, object: dars, valency: transitive }))
		).toContain('unrecorded-form');
	});

	it('requires an object for a transitive frame and forbids one for an intransitive frame', () => {
		expect(codes(evaluateVerbalFrame({ verb: kataba, agent: talib, valency: transitive }))).toEqual(
			['valency']
		);
		expect(
			codes(evaluateVerbalFrame({ verb: kataba, agent: talib, valency: intransitive }))
		).toEqual([]);
		expect(
			codes(
				evaluateVerbalFrame({ verb: kataba, agent: talib, object: dars, valency: intransitive })
			)
		).toEqual(['valency']);
		expect(codes(evaluateVerbalFrame({ verb: kataba, agent: talib, valency: undefined }))).toEqual([
			'valency'
		]);
	});

	it('treats an unlisted object as not curated, never as ungrammatical', () => {
		const other = slot('x', 'الْكِتَابَ', 'noun', 'm sg def', { irab: 'nasb', marker: 'fatḥa' });
		const result = evaluateVerbalFrame({
			verb: kataba,
			agent: talib,
			object: other,
			valency: transitive
		});
		expect(codes(result)).toEqual(['unlisted-collocation']);
		expect(result[0]!.message).toContain('tidak berarti');
	});

	it('checks mood only for the imperfect and requires a marfū‘ fā‘il with a sign', () => {
		const present = slot('v', 'يَكْتُبُ', 'verb', '3 m sg impf act', {
			mood: 'indicative',
			marker: 'ḍamma'
		});
		expect(
			evaluateVerbalFrame({ verb: present, agent: talib, object: dars, valency: transitive })
		).toEqual([]);
		const noMood = slot('v', 'يَكْتُبُ', 'verb', '3 m sg impf act');
		expect(
			codes(evaluateVerbalFrame({ verb: noMood, agent: talib, object: dars, valency: transitive }))
		).toContain('feature-mismatch');
		expect(
			codes(
				evaluateVerbalFrame({
					verb: kataba,
					agent: { ...talib, features: { ...talib.features, case: 'nasb' } },
					object: dars,
					valency: transitive
				})
			)
		).toContain('feature-mismatch');
	});
});

describe('D-05b connected kasra of the feminine verb ending', () => {
	const feminine = slot('v', 'كَتَبَتِ', 'verb', '3 f sg perf act');
	it('accepts the kasra only before a word that starts with ال-', () => {
		expect(evaluateLinkingKasra([feminine, talibah])).toEqual([]);
		expect(codes(evaluateLinkingKasra([feminine]))).toEqual(['sandhi']);
		const indefinite = slot('n', 'طَالِبَةٌ', 'noun', 'f sg indef', {
			irab: 'raf',
			marker: 'tanwin ḍamm'
		});
		expect(codes(evaluateLinkingKasra([feminine, indefinite]))).toEqual(['sandhi']);
	});

	it('does not touch the pausal sukūn form or non-verbs', () => {
		const pausal = slot('v', 'جَلَسَتْ', 'verb', '3 f sg perf act');
		expect(evaluateLinkingKasra([pausal])).toEqual([]);
		expect(evaluateLinkingKasra([slot('n', 'سَيَّارَتِ', 'noun', 'f sg def')])).toEqual([]);
	});
});

describe('D-05b amr, passive and negation', () => {
	const amr = slot('v', 'اِفْتَحْ', 'verb', '2 m sg imv act');

	it('accepts a second-person masculine amr with an object and no agent token', () => {
		const door = slot('b', 'الْبَابَ', 'noun', 'm sg def', { irab: 'nasb', marker: 'fatḥa' });
		expect(
			evaluateImperativeFrame({
				verb: amr,
				object: door,
				valency: { kind: 'transitive', objectIds: ['b'] }
			})
		).toEqual([]);
		expect(
			codes(
				evaluateImperativeFrame({
					verb: { ...amr, features: { ...amr.features, gender: 'feminine' } },
					object: door,
					valency: { kind: 'transitive', objectIds: ['b'] }
				})
			)
		).toContain('verb-person');
	});

	it('turns the active object into the nā’ib al-fā‘il of the same verb and nothing else', () => {
		const passive = slot('v', 'كُتِبَ', 'verb', '3 m sg perf pass');
		const deputy = slot('d', 'الدَّرْسُ', 'noun', 'm sg def', { irab: 'raf', marker: 'ḍamma' });
		expect(
			evaluatePassiveFrame({ verb: passive, deputy, active: { verbId: 'v', objectId: 'd' } })
		).toEqual([]);
		expect(codes(evaluatePassiveFrame({ verb: passive, deputy }))).toEqual(['passive-pair']);
		expect(
			codes(
				evaluatePassiveFrame({ verb: passive, deputy, active: { verbId: 'other', objectId: 'd' } })
			)
		).toEqual(['passive-pair']);
		expect(
			codes(evaluatePassiveFrame({ verb: kataba, deputy, active: { verbId: 'v', objectId: 'd' } }))
		).toContain('feature-mismatch');
		const feminineDeputy = slot('d', 'الرِّسَالَةُ', 'noun', 'f sg def', {
			irab: 'raf',
			marker: 'ḍamma'
		});
		expect(
			codes(
				evaluatePassiveFrame({
					verb: passive,
					deputy: feminineDeputy,
					active: { verbId: 'v', objectId: 'd' }
				})
			)
		).toContain('verb-agreement');
	});

	it('maps each negation particle to its mood and blocks an unmapped particle', () => {
		const la = slot('la', 'لَا', 'particle', '');
		const lam = slot('lam', 'لَمْ', 'particle', '');
		const lan = slot('lan', 'لَنْ', 'particle', '');
		const present = slot('v', 'يَكْتُبُ', 'verb', '3 m sg impf act', {
			mood: 'indicative',
			marker: 'ḍamma'
		});
		const jussive = slot('v', 'يَكْتُبْ', 'verb', '3 m sg impf act', {
			mood: 'jussive',
			marker: 'sukūn'
		});
		const subjunctive = slot('v', 'يَكْتُبَ', 'verb', '3 m sg impf act', {
			mood: 'subjunctive',
			marker: 'fatḥa'
		});
		expect(evaluateNegatedVerb({ particle: la, verb: present })).toEqual([]);
		expect(evaluateNegatedVerb({ particle: lam, verb: jussive })).toEqual([]);
		expect(evaluateNegatedVerb({ particle: lan, verb: subjunctive })).toEqual([]);
		expect(codes(evaluateNegatedVerb({ particle: lam, verb: present }))).toEqual(['particle-mood']);
		expect(codes(evaluateNegatedVerb({ particle: lan, verb: jussive }))).toEqual(['particle-mood']);
		expect(codes(evaluateNegatedVerb({ particle: la, verb: kataba }))).toEqual(['particle-mood']);
		expect(
			codes(evaluateNegatedVerb({ particle: slot('m', 'مَا', 'particle', ''), verb: present }))
		).toEqual(['unsupported-particle']);
	});
});

describe('D-05b nominal sentence, kāna and inna', () => {
	const jadid = slot('j', 'جَدِيدٌ', 'adjective', 'm sg indef', {
		irab: 'raf',
		marker: 'tanwin ḍamm'
	});
	const kitab = slot('k', 'الْكِتَابُ', 'noun', 'm sg def', { irab: 'raf', marker: 'ḍamma' });

	it('requires the khabar to follow the mubtada in gender and number', () => {
		expect(evaluateNominalAdjective({ subject: kitab, predicate: jadid })).toEqual([]);
		const feminine = slot('j', 'جَدِيدَةٌ', 'adjective', 'f sg indef', {
			irab: 'raf',
			marker: 'tanwin ḍamm'
		});
		expect(codes(evaluateNominalAdjective({ subject: kitab, predicate: feminine }))).toContain(
			'feature-mismatch'
		);
	});

	it('uses the feminine singular khabar for a nonhuman plural and refuses unknown animacy', () => {
		const books = slot('k', 'الْكُتُبُ', 'noun', 'm pl def', { irab: 'raf', marker: 'ḍamma' });
		const feminine = slot('j', 'جَدِيدَةٌ', 'adjective', 'f sg indef', {
			irab: 'raf',
			marker: 'tanwin ḍamm'
		});
		expect(
			evaluateNominalAdjective({ subject: books, predicate: feminine, pluralAnimacy: 'nonhuman' })
		).toEqual([]);
		expect(codes(evaluateNominalAdjective({ subject: books, predicate: feminine }))).toContain(
			'unverified-plural-agreement'
		);
		expect(
			codes(
				evaluateNominalAdjective({ subject: books, predicate: jadid, pluralAnimacy: 'nonhuman' })
			)
		).toContain('feature-mismatch');
	});

	it('supports a manṣūb khabar after kāna only through the new predicateCase option', () => {
		const nasb = slot('j', 'جَدِيدًا', 'adjective', 'm sg indef', {
			irab: 'nasb',
			marker: 'tanwin fatḥ'
		});
		expect(
			evaluateAdjectiveAgreement({
				head: kitab.features,
				adjective: nasb.features,
				relation: 'nominal-predicate',
				predicateCase: 'nasb'
			}).allowed
		).toBe(true);
		// The default stays raf, so existing frames are unchanged.
		expect(
			evaluateAdjectiveAgreement({
				head: kitab.features,
				adjective: nasb.features,
				relation: 'nominal-predicate'
			}).allowed
		).toBe(false);
	});

	it('raises the ism after kāna and lowers it after inna, with the verb following the ism gender', () => {
		const kana = slot('curr-kana', 'كَانَ', 'verb', '3 m sg perf act');
		const nasbKhabar = slot('j', 'جَدِيدًا', 'adjective', 'm sg indef', {
			irab: 'nasb',
			marker: 'tanwin fatḥ'
		});
		expect(
			evaluateNasikh({ kind: 'kana', operator: kana, ism: kitab, khabar: nasbKhabar })
		).toEqual([]);
		// khabar left marfū‘ after kāna
		expect(
			codes(evaluateNasikh({ kind: 'kana', operator: kana, ism: kitab, khabar: jadid }))
		).toContain('nasikh-case');
		// ism left marfū‘ after inna
		const inna = slot('i', 'إِنَّ', 'particle', '');
		const nasbIsm = slot('k', 'الْكِتَابَ', 'noun', 'm sg def', { irab: 'nasb', marker: 'fatḥa' });
		expect(evaluateNasikh({ kind: 'inna', operator: inna, ism: nasbIsm, khabar: jadid })).toEqual(
			[]
		);
		expect(
			codes(evaluateNasikh({ kind: 'inna', operator: inna, ism: kitab, khabar: jadid }))
		).toContain('nasikh-case');
		// feminine ism with a masculine kāna
		const school = slot('m', 'الْمَدْرَسَةُ', 'noun', 'f sg def', { irab: 'raf', marker: 'ḍamma' });
		const bigNasb = slot('b', 'كَبِيرَةً', 'adjective', 'f sg indef', {
			irab: 'nasb',
			marker: 'tanwin fatḥ'
		});
		expect(
			codes(evaluateNasikh({ kind: 'kana', operator: kana, ism: school, khabar: bigNasb }))
		).toContain('verb-agreement');
	});

	it('accepts only هَلْ as the question particle', () => {
		expect(evaluateQuestionParticle(slot('h', 'هَلْ', 'particle', ''))).toEqual([]);
		expect(codes(evaluateQuestionParticle(slot('h', 'أَ', 'particle', '')))).toEqual([
			'unsupported-particle'
		]);
		expect(codes(evaluateQuestionParticle(undefined))).toEqual(['unsupported-particle']);
	});
});

describe('D-05c ‘aṭf, syarat and mawṣūl–ṣilah', () => {
	const joined = slot('v2', 'وَقَرَأَ', 'verb', '3 m sg perf act', { clitic: 'وَ', stem: 'قَرَأَ' });

	it('keeps a prefixed conjunction in one orthographic token and rejects a spaced or altered one', () => {
		expect(evaluateClitic(joined)).toEqual([]);
		expect(codes(evaluateClitic({ ...joined, text: 'وَ قَرَأَ' }))).toContain('clitic-token');
		expect(codes(evaluateClitic({ ...joined, stem: 'كَتَبَ' }))).toContain('clitic-token');
		expect(codes(evaluateClitic({ ...joined, clitic: undefined }))).toEqual(['clitic-token']);
	});

	it('makes the second verb follow the shared agent and checks its own valency', () => {
		const base = {
			verb: kataba,
			agent: talib,
			object: dars,
			joined,
			joinedObject: slot('d', 'الدَّرْسَ', 'noun', 'm sg def', { irab: 'nasb', marker: 'fatḥa' }),
			valency: transitive,
			joinedValency: transitive
		};
		expect(
			evaluateAthafActions({ ...base, joinedValency: { kind: 'transitive', objectIds: ['d'] } })
		).toEqual([]);
		expect(
			codes(
				evaluateAthafActions({
					...base,
					joined: { ...joined, features: { ...joined.features, gender: 'feminine' } },
					joinedValency: { kind: 'transitive', objectIds: ['d'] }
				})
			)
		).toContain('verb-agreement');
		expect(codes(evaluateAthafActions({ ...base, joinedObject: undefined }))).toContain('valency');
	});

	it('makes the ma‘ṭūf follow the case of the ma‘ṭūf ‘alaih', () => {
		const verb = slot('j', 'جَاءَ', 'verb', '3 m sg perf act');
		const teacher = slot('m', 'الْمُعَلِّمُ', 'noun', 'm sg def', { irab: 'raf', marker: 'ḍamma' });
		const second = slot('t', 'وَالطَّالِبُ', 'noun', 'm sg def', {
			irab: 'raf',
			marker: 'ḍamma',
			clitic: 'وَ',
			stem: 'الطَّالِبُ'
		});
		expect(
			evaluateAthafSubjects({ verb, first: teacher, joined: second, valency: intransitive })
		).toEqual([]);
		const nasb = {
			...second,
			text: 'وَالطَّالِبَ',
			stem: 'الطَّالِبَ',
			marker: 'fatḥa',
			features: { ...second.features, case: 'nasb' as const }
		};
		expect(
			codes(evaluateAthafSubjects({ verb, first: teacher, joined: nasb, valency: intransitive }))
		).toEqual(expect.arrayContaining(['athaf-case', 'feature-mismatch']));
	});

	it('requires إِنْ with two majzūm second-person masculine singular verbs', () => {
		const inn = slot('c', 'إِنْ', 'particle', '');
		const make = (text: string, mood?: VerbMood, gender: 'm' | 'f' = 'm') =>
			slot('x', text, 'verb', '2 ' + gender + ' sg impf act', {
				mood,
				marker: mood ? 'sukūn' : undefined
			});
		expect(
			evaluateCondition({
				particle: inn,
				condition: make('تَدْرُسْ', 'jussive'),
				result: make('تَنْجَحْ', 'jussive')
			})
		).toEqual([]);
		expect(
			codes(
				evaluateCondition({
					particle: inn,
					condition: make('تَدْرُسُ', 'indicative'),
					result: make('تَنْجَحْ', 'jussive')
				})
			)
		).toContain('particle-mood');
		expect(
			codes(
				evaluateCondition({
					particle: slot('c', 'إِذَا', 'particle', ''),
					condition: make('تَدْرُسْ', 'jussive'),
					result: make('تَنْجَحْ', 'jussive')
				})
			)
		).toContain('unsupported-particle');
		expect(
			codes(
				evaluateCondition({
					particle: inn,
					condition: make('تَدْرُسِينَ', 'jussive', 'f'),
					result: make('تَنْجَحْ', 'jussive')
				})
			)
		).toContain('verb-person');
	});
});

describe('D-05c relative clauses through the D-04b relation', () => {
	const antecedent = slot('t', 'الطَّالِبُ', 'noun', 'm sg def', { irab: 'raf', marker: 'ḍamma' });
	const relative = slot('r', 'الَّذِي', 'noun', 'm sg def');
	const verb = slot('v', 'يَكْتُبُ', 'verb', '3 m sg impf act', {
		mood: 'indicative',
		marker: 'ḍamma'
	});
	const khabar = slot('mj', 'مُجْتَهِدٌ', 'adjective', 'm sg indef', {
		irab: 'raf',
		marker: 'tanwin ḍamm'
	});
	const curated = [
		{
			antecedent: 'الطَّالِبُ',
			relative: 'الَّذِي',
			silaTokens: ['يَكْتُبُ', 'الدَّرْسَ'],
			returnLink: 'implicit-subject' as const
		}
	];
	const input = {
		frameId: 'x',
		antecedent,
		relative,
		sila: [verb, dars],
		khabar,
		object: dars,
		allowedFrames: curated,
		valency: transitive
	};

	it('accepts a whole curated antecedent + mawṣūl + ṣilah + khabar frame', () => {
		expect(evaluateRelativeFrame(input)).toEqual([]);
	});

	it('rejects a frame that is not on the curated list, even when each token looks fine', () => {
		expect(codes(evaluateRelativeFrame({ ...input, allowedFrames: [] }))).toContain(
			'uncurated-relation'
		);
		const base = {
			exampleId: 'x',
			antecedent: antecedent as RelationWord,
			relative: relative as RelationWord,
			silaTokens: ['يَكْتُبُ', 'الدَّرْسَ'],
			returnLink: 'implicit-subject' as const
		};
		// Without allowedFrames the original D-04b behaviour is unchanged: only the three G-05 examples.
		expect(codes(evaluateRelativeClause(base).reasons)).toContain('uncurated-relation');
		expect(evaluateRelativeClause({ ...base, allowedFrames: curated }).allowed).toBe(true);
	});

	it('requires the mawṣūl, ṣilah verb and khabar to follow the antecedent gender', () => {
		expect(
			codes(
				evaluateRelativeFrame({
					...input,
					antecedent: talibah,
					allowedFrames: [{ ...curated[0]!, antecedent: 'الطَّالِبَةُ' }]
				})
			)
		).toEqual(expect.arrayContaining(['feature-mismatch', 'verb-agreement']));
	});

	it('keeps the explicit return suffix to the attested masculine ـهُ and blocks the feminine', () => {
		const returnVerb = slot('q', 'قَرَأْتُهُ', 'verb', '1 sg perf act');
		const book = slot('k', 'الْكِتَابُ', 'noun', 'm sg def', { irab: 'raf', marker: 'ḍamma' });
		const objectFrame = [
			{
				antecedent: 'الْكِتَابُ',
				relative: 'الَّذِي',
				silaTokens: ['قَرَأْتُهُ'],
				returnLink: 'explicit-object-suffix' as const
			}
		];
		const objectInput = {
			frameId: 'y',
			antecedent: book,
			relative,
			sila: [returnVerb],
			khabar: slot('mf', 'مُفِيدٌ', 'adjective', 'm sg indef', { irab: 'raf', marker: 'tanwin ḍamm' }),
			allowedFrames: objectFrame,
			valency: undefined
		};
		expect(evaluateRelativeFrame(objectInput)).toEqual([]);
		const feminineBook = slot('k', 'الرِّسَالَةُ', 'noun', 'f sg def', { irab: 'raf', marker: 'ḍamma' });
		expect(
			codes(
				evaluateRelativeFrame({
					...objectInput,
					antecedent: feminineBook,
					relative: slot('r', 'الَّتِي', 'noun', 'f sg def'),
					allowedFrames: [{ ...objectFrame[0]!, antecedent: 'الرِّسَالَةُ', relative: 'الَّتِي' }],
					khabar: slot('mf', 'مُفِيدَةٌ', 'adjective', 'f sg indef', {
						irab: 'raf',
						marker: 'tanwin ḍamm'
					})
				})
			)
		).toContain('unrecorded-form');
	});
});
