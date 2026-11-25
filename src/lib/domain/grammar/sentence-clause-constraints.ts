/**
 * D-05b/c: fail-closed validators for whole G-04 sentence and G-05 clause frames.
 *
 * Each function checks ONE syntactic relation on slots whose features were
 * declared by the curator. Nothing is parsed from a spelling and nothing is
 * generated. A missing feature is never treated as compatible, and an unlisted
 * pairing means "not curated for this example", not "ungrammatical".
 */
import type { IrabCase } from '#lib/content/phrase-rules.js';
import type { VerbMood } from '#lib/content/sentence-rules.js';
import {
	evaluateAdjectiveAgreement,
	evaluateSlotCandidate,
	type PluralAnimacy
} from './grammar-constraints.js';
import {
	evaluatePrepositionalPhrase,
	evaluateRelativeClause,
	type CuratedRelativeFrame,
	type RelationCode,
	type RelationWord
} from './phrase-relation-constraints.js';

export type FrameReasonCode =
	| RelationCode
	| 'case-marker'
	| 'verb-agreement'
	| 'verb-person'
	| 'valency'
	| 'unattested-verb-form'
	| 'passive-pair'
	| 'particle-mood'
	| 'nasikh-case'
	| 'athaf-case'
	| 'clitic-token'
	| 'template-shape'
	| 'sandhi'
	| 'unrecorded-form';

export type FrameReason = { code: FrameReasonCode; message: string };

/** A token plus its curator metadata, ready for validation. */
export type FrameSlot = RelationWord & {
	/** Visible ending sign printed on the card (ḍamma, tanwin fatḥ, sukūn ...). */
	marker?: string;
	clitic?: 'وَ' | 'فَ';
	stem?: string;
};

export type VerbValency =
	{ kind: 'transitive'; objectIds: readonly string[] } | { kind: 'intransitive' };

const nfc = (text: string) => text.normalize('NFC');

const nounMarkers: Readonly<Record<IrabCase, readonly string[]>> = {
	raf: ['ḍamma', 'tanwin ḍamm', 'wāw', 'alif'],
	nasb: ['fatḥa', 'tanwin fatḥ', 'yā’', 'alif'],
	jarr: ['kasra', 'tanwin kasr', 'yā’']
};
const moodMarkers: Readonly<Record<VerbMood, readonly string[]>> = {
	indicative: ['ḍamma'],
	jussive: ['sukūn'],
	subjunctive: ['fatḥa']
};

function reason(code: FrameReasonCode, message: string): FrameReason {
	return { code, message };
}

function fromConstraint(
	result: { reasons: readonly { code: string; message: string }[] },
	prefix = ''
): FrameReason[] {
	return result.reasons.map((item) => ({
		code: item.code as FrameReasonCode,
		message: prefix + item.message
	}));
}

/** The printed ending sign must belong to the declared case or mood. */
export function evaluateCaseMarker(slot: FrameSlot): FrameReason[] {
	const { case: irab, mood } = slot.features;
	if (irab && mood)
		return [
			reason('case-marker', 'Kasus isim dan mood fi‘il tidak boleh bercampur pada satu kata.')
		];
	if (!irab && !mood) {
		return slot.marker
			? [reason('case-marker', 'Penanda akhir dicantumkan tanpa kasus atau mood yang tercatat.')]
			: [];
	}
	const allowed = irab ? nounMarkers[irab] : moodMarkers[mood!];
	if (!slot.marker || !allowed.includes(slot.marker)) {
		return [
			reason(
				'case-marker',
				'Penanda akhir ' +
					(slot.marker ?? '(kosong)') +
					' tidak cocok dengan ' +
					(irab ? 'kasus ' + irab : 'mood ' + mood) +
					' pada contoh ini.'
			)
		];
	}
	return [];
}

function noun(
	slot: FrameSlot | undefined,
	irab: IrabCase,
	label: string,
	options: { definite?: boolean } = {}
): FrameReason[] {
	if (!slot) return [reason('template-shape', 'Posisi ' + label + ' belum terisi.')];
	const reasons = fromConstraint(
		evaluateSlotCandidate(
			{
				expectedClass: 'noun',
				required: {
					case: irab,
					...(options.definite === false ? {} : { definiteness: 'definite' as const })
				},
				explanation: label
			},
			slot
		),
		label + ': '
	);
	for (const key of ['gender', 'number'] as const) {
		if (slot.features[key] === undefined)
			reasons.push(reason('missing-feature', label + ': ' + key + ' belum dicatat.'));
	}
	if (slot.features.number === 'dual') {
		reasons.push(
			reason('unrecorded-form', label + ': bentuk mutsanna belum tercatat pada data contoh.')
		);
	}
	return reasons;
}

function agreeGender(verb: FrameSlot, subject: FrameSlot, subjectLabel: string): FrameReason[] {
	if (!verb.features.gender || !subject.features.gender) {
		return [reason('missing-feature', 'Gender fi‘il atau ' + subjectLabel + ' belum dicatat.')];
	}
	return verb.features.gender === subject.features.gender
		? []
		: [
				reason(
					'verb-agreement',
					'Fi‘il bergender ' +
						verb.features.gender +
						' tetapi ' +
						subjectLabel +
						' bergender ' +
						subject.features.gender +
						'; keduanya harus sama pada pola fi‘il–fā‘il ini.'
				)
			];
}

function checkValency(
	verb: FrameSlot,
	object: FrameSlot | undefined,
	valency: VerbValency | undefined
): FrameReason[] {
	if (!valency)
		return [reason('valency', 'Valensi fi‘il ini belum dikurasi untuk contoh mana pun.')];
	if (object) {
		if (valency.kind !== 'transitive')
			return [
				reason('valency', 'Fi‘il ini dikurasi sebagai lazim pada contoh; ia tidak diberi objek.')
			];
		if (!valency.objectIds.includes(object.id)) {
			return [
				reason(
					'unlisted-collocation',
					'Pasangan fi‘il dan objek ini belum dikurasi. Ini tidak berarti susunannya salah dalam bahasa Arab.'
				)
			];
		}
		return noun(object, 'nasb', 'Maf‘ūl bih');
	}
	return valency.kind === 'intransitive'
		? []
		: [reason('valency', 'Fi‘il ini dikurasi sebagai muta‘addi dan contohnya memerlukan objek.')];
}

function verbBasics(
	verb: FrameSlot | undefined,
	options: {
		aspects: readonly ('perfect' | 'imperfect' | 'imperative')[];
		moods?: readonly VerbMood[];
		voice: 'active' | 'passive';
		person?: 1 | 2 | 3;
	}
): FrameReason[] {
	if (!verb || verb.wordClass !== 'verb')
		return [reason('word-class', 'Posisi fi‘il memerlukan kata kerja.')];
	const reasons: FrameReason[] = [];
	const f = verb.features;
	if (!f.aspect || !options.aspects.includes(f.aspect))
		reasons.push(
			reason('feature-mismatch', 'Bentuk waktu fi‘il tidak sesuai dengan susunan contoh ini.')
		);
	if (f.voice !== options.voice)
		reasons.push(reason('feature-mismatch', 'Fi‘il harus berstatus ' + options.voice + '.'));
	if (f.person !== (options.person ?? 3))
		reasons.push(reason('verb-person', 'Orang fi‘il tidak sesuai dengan susunan contoh ini.'));
	if (f.aspect === 'imperfect') {
		const moods = options.moods ?? ['indicative'];
		if (!f.mood || !moods.includes(f.mood))
			reasons.push(
				reason('feature-mismatch', 'Mood fi‘il muḍāri‘ tidak sesuai dengan partikel di depannya.')
			);
	} else if (f.mood) {
		reasons.push(reason('case-marker', 'Mood hanya berlaku untuk fi‘il muḍāri‘.'));
	}
	reasons.push(...evaluateCaseMarker(verb));
	return reasons;
}

/** Fi‘il + fā‘il (+ maf‘ūl bih), in VSO or the khabar order of a nominal sentence. */
export function evaluateVerbalFrame(input: {
	verb: FrameSlot | undefined;
	agent: FrameSlot | undefined;
	object?: FrameSlot;
	valency: VerbValency | undefined;
	moods?: readonly VerbMood[];
}): FrameReason[] {
	const { verb, agent, object, valency } = input;
	const reasons = verbBasics(verb, {
		aspects: ['perfect', 'imperfect'],
		moods: input.moods,
		voice: 'active'
	});
	reasons.push(...noun(agent, 'raf', 'Fā‘il'));
	if (verb && agent) {
		reasons.push(...agreeGender(verb, agent, 'fā‘il'));
		// Verb before its subject stays singular, also before a plural fā‘il.
		if (verb.features.number !== 'singular')
			reasons.push(reason('verb-agreement', 'Fi‘il tetap tunggal pada contoh fi‘il–fā‘il ini.'));
		reasons.push(...evaluateCaseMarker(agent));
	}
	if (verb) reasons.push(...checkValency(verb, object, valency));
	if (object) reasons.push(...evaluateCaseMarker(object));
	return reasons;
}

/** Amr: the second-person subject is implied, so no explicit fā‘il token exists. */
export function evaluateImperativeFrame(input: {
	verb: FrameSlot | undefined;
	object: FrameSlot | undefined;
	valency: VerbValency | undefined;
}): FrameReason[] {
	const { verb, object, valency } = input;
	const reasons = verbBasics(verb, { aspects: ['imperative'], voice: 'active', person: 2 });
	if (verb) {
		if (verb.features.gender !== 'masculine' || verb.features.number !== 'singular')
			reasons.push(
				reason('verb-person', 'Amr pada contoh ini hanya untuk orang kedua maskulin tunggal.')
			);
		reasons.push(...checkValency(verb, object, valency));
	}
	if (object) reasons.push(...evaluateCaseMarker(object));
	return reasons;
}

/** Passive: the active object becomes nā’ib al-fā‘il, and no agent is stated. */
export function evaluatePassiveFrame(input: {
	verb: FrameSlot | undefined;
	deputy: FrameSlot | undefined;
	active?: { verbId: string; objectId: string };
}): FrameReason[] {
	const { verb, deputy, active } = input;
	const reasons = verbBasics(verb, { aspects: ['perfect'], voice: 'passive' });
	reasons.push(...noun(deputy, 'raf', 'Nā’ib al-fā‘il'));
	if (verb && deputy) {
		reasons.push(...agreeGender(verb, deputy, 'nā’ib al-fā‘il'));
		if (verb.features.number !== 'singular')
			reasons.push(reason('verb-agreement', 'Fi‘il pasif pada contoh ini tetap tunggal.'));
		reasons.push(...evaluateCaseMarker(deputy));
		if (!active) {
			reasons.push(
				reason('passive-pair', 'Pasangan kalimat aktif belum dicatat untuk bentuk pasif ini.')
			);
		} else if (active.verbId !== verb.id || active.objectId !== deputy.id) {
			reasons.push(
				reason(
					'passive-pair',
					'Nā’ib al-fā‘il harus berasal dari objek kalimat aktif yang sama, dengan fi‘il yang sama.'
				)
			);
		}
	}
	return reasons;
}

const negationMood: Readonly<Record<string, VerbMood>> = {
	[nfc('لَا')]: 'indicative',
	[nfc('لَمْ')]: 'jussive',
	[nfc('لَنْ')]: 'subjunctive'
};

/** The mood each curated negation particle requires, or undefined for an unmapped particle. */
export function negationMoodOf(text: string): VerbMood | undefined {
	return negationMood[nfc(text)];
}

/** لَا keeps marfū‘, لَمْ is jazm, لَنْ is naṣb. The particle is its own token. */
export function evaluateNegatedVerb(input: {
	particle: FrameSlot | undefined;
	verb: FrameSlot | undefined;
}): FrameReason[] {
	const { particle, verb } = input;
	if (!particle || particle.wordClass !== 'particle')
		return [reason('particle-mood', 'Posisi partikel negasi memerlukan kata tugas.')];
	const expected = negationMood[nfc(particle.text)];
	if (!expected)
		return [
			reason(
				'unsupported-particle',
				'Partikel negasi ini belum dipetakan; hanya لَا، لَمْ dan لَنْ yang dikurasi.'
			)
		];
	const reasons: FrameReason[] = [];
	if (!verb || verb.features.aspect !== 'imperfect' || verb.features.mood !== expected) {
		reasons.push(
			reason(
				'particle-mood',
				'Partikel ini menuntut muḍāri‘ ' + expected + '; mood fi‘il pada frame tidak cocok.'
			)
		);
	}
	return reasons;
}

/** Nominal sentence with an adjective or noun khabar: gender and number follow the mubtada. */
export function evaluateNominalAdjective(input: {
	subject: FrameSlot | undefined;
	predicate: FrameSlot | undefined;
	pluralAnimacy?: PluralAnimacy;
	/** raf for a plain khabar or after inna; nasb after kāna. */
	predicateCase?: 'raf' | 'nasb';
	subjectCase?: IrabCase;
}): FrameReason[] {
	const { subject, predicate, pluralAnimacy, predicateCase = 'raf', subjectCase = 'raf' } = input;
	const reasons = noun(subject, subjectCase, 'Mubtada / ism');
	if (!predicate || predicate.wordClass !== 'adjective')
		return [...reasons, reason('word-class', 'Khabar pada pola ini harus berupa kata sifat.')];
	if (subject) {
		reasons.push(
			...fromConstraint(
				evaluateAdjectiveAgreement({
					head: subject.features,
					adjective: predicate.features,
					relation: 'nominal-predicate',
					pluralAnimacy,
					predicateCase
				})
			)
		);
		reasons.push(...evaluateCaseMarker(subject));
	}
	reasons.push(...evaluateCaseMarker(predicate));
	return reasons;
}

/** Mubtada + huruf jar + majrūr as khabar; the existing D-04b relation does the pair check. */
export function evaluateNominalPrepositional(input: {
	subject: FrameSlot | undefined;
	preposition: FrameSlot | undefined;
	complement: FrameSlot | undefined;
}): FrameReason[] {
	const { subject, preposition, complement } = input;
	const reasons = noun(subject, 'raf', 'Mubtada');
	if (subject) reasons.push(...evaluateCaseMarker(subject));
	if (!preposition || !complement)
		return [...reasons, reason('template-shape', 'Syibh-jumlah belum lengkap.')];
	reasons.push(
		...fromConstraint(
			evaluatePrepositionalPhrase({
				preposition,
				complement,
				allowedPairs: [
					{
						particle: preposition.text,
						complementId: complement.id,
						complementText: complement.text
					}
				]
			})
		)
	);
	reasons.push(...evaluateCaseMarker(complement));
	return reasons;
}

/** Kāna raises the ism and lowers the khabar; inna does the reverse. */
export function evaluateNasikh(input: {
	kind: 'kana' | 'inna';
	operator: FrameSlot | undefined;
	ism: FrameSlot | undefined;
	khabar: FrameSlot | undefined;
	pluralAnimacy?: PluralAnimacy;
}): FrameReason[] {
	const { kind, operator, ism, khabar } = input;
	const reasons: FrameReason[] = [];
	if (kind === 'inna') {
		if (!operator || operator.wordClass !== 'particle' || nfc(operator.text) !== nfc('إِنَّ'))
			reasons.push(
				reason('unsupported-particle', 'Pola ini memerlukan إِنَّ sebagai token terpisah.')
			);
	} else {
		if (!operator || operator.wordClass !== 'verb' || operator.id !== 'curr-kana')
			reasons.push(reason('word-class', 'Pola ini memerlukan fi‘il nāsikh كَانَ.'));
		else {
			const f = operator.features;
			if (f.aspect !== 'perfect' || f.voice !== 'active' || f.person !== 3)
				reasons.push(reason('verb-person', 'كَانَ pada contoh ini māḍī orang ketiga.'));
			if (ism) reasons.push(...agreeGender(operator, ism, 'ism kāna'));
			if (f.number !== 'singular')
				reasons.push(reason('verb-agreement', 'كَانَ tetap tunggal pada contoh ini.'));
		}
	}
	const ismCase: IrabCase = kind === 'inna' ? 'nasb' : 'raf';
	const khabarCase = kind === 'inna' ? 'raf' : 'nasb';
	reasons.push(
		...evaluateNominalAdjective({
			subject: ism,
			predicate: khabar,
			pluralAnimacy: input.pluralAnimacy,
			predicateCase: khabarCase,
			subjectCase: ismCase
		}).map((item) =>
			item.code === 'feature-mismatch' && /i‘rab|case/u.test(item.message)
				? reason('nasikh-case', item.message)
				: item
		)
	);
	return reasons;
}

/** هَلْ only changes the communicative function; the embedded frame keeps its own case marking. */
export function evaluateQuestionParticle(particle: FrameSlot | undefined): FrameReason[] {
	return particle && particle.wordClass === 'particle' && nfc(particle.text) === nfc('هَلْ')
		? []
		: [reason('unsupported-particle', 'Pertanyaan ya/tidak memerlukan هَلْ sebagai token terpisah.')];
}

/**
 * A verb written with a final ت + kasra (كَتَبَتِ) is the connected reading of the
 * feminine ending كَتَبَتْ. That kasra is only correct before a word that starts with
 * hamzat al-waṣl in ال-, so the next token must begin with ال. Fail closed otherwise.
 */
export function evaluateLinkingKasra(slots: readonly FrameSlot[]): FrameReason[] {
	const reasons: FrameReason[] = [];
	slots.forEach((slot, index) => {
		if (slot.wordClass !== 'verb' || !nfc(slot.text).endsWith('تِ')) return;
		const next = slots[index + 1];
		if (!next || !nfc(next.text).startsWith('ال')) {
			reasons.push(
				reason(
					'sandhi',
					'Kasra pada ت akhir fi‘il hanya benar sebelum kata berawalan ال-; di tempat lain bentuknya bersukūn.'
				)
			);
		}
	});
	return reasons;
}

/** One orthographic token: a prefixed conjunction plus the word it joins. */
export function evaluateClitic(slot: FrameSlot | undefined): FrameReason[] {
	if (!slot?.clitic || !slot.stem)
		return [
			reason('clitic-token', 'Token sambung belum mencatat huruf sambung dan kata dasarnya.')
		];
	const reasons: FrameReason[] = [];
	if (/\s/u.test(slot.text))
		reasons.push(reason('clitic-token', 'Huruf sambung harus menyatu dengan kata berikutnya.'));
	if (nfc(slot.text) !== nfc(slot.clitic + slot.stem))
		reasons.push(
			reason('clitic-token', 'Ejaan token tidak sama dengan huruf sambung ditambah kata dasarnya.')
		);
	return reasons;
}

/** Athaf of two actions by the same agent: وَ / فَ is joined to the second verb. */
export function evaluateAthafActions(input: {
	verb: FrameSlot | undefined;
	agent: FrameSlot | undefined;
	object: FrameSlot | undefined;
	joined: FrameSlot | undefined;
	joinedObject?: FrameSlot;
	valency: VerbValency | undefined;
	joinedValency: VerbValency | undefined;
}): FrameReason[] {
	const reasons = evaluateVerbalFrame({
		verb: input.verb,
		agent: input.agent,
		object: input.object,
		valency: input.valency
	});
	reasons.push(...evaluateClitic(input.joined));
	if (input.joined) {
		reasons.push(...verbBasics(input.joined, { aspects: ['perfect'], voice: 'active' }));
		if (input.agent) reasons.push(...agreeGender(input.joined, input.agent, 'pelaku yang sama'));
		reasons.push(...checkValency(input.joined, input.joinedObject, input.joinedValency));
		if (input.joined.features.number !== 'singular')
			reasons.push(reason('verb-agreement', 'Fi‘il kedua tetap tunggal pada contoh ini.'));
	}
	if (input.joinedObject) reasons.push(...evaluateCaseMarker(input.joinedObject));
	return reasons;
}

/** Athaf with ثُمَّ: a separate particle and an implied same agent. */
export function evaluateAthafSequence(input: {
	verb: FrameSlot | undefined;
	agent: FrameSlot | undefined;
	particle: FrameSlot | undefined;
	next: FrameSlot | undefined;
	valency: VerbValency | undefined;
	nextValency: VerbValency | undefined;
}): FrameReason[] {
	const reasons = evaluateVerbalFrame({
		verb: input.verb,
		agent: input.agent,
		valency: input.valency
	});
	if (
		!input.particle ||
		nfc(input.particle.text) !== nfc('ثُمَّ') ||
		input.particle.wordClass !== 'particle'
	)
		reasons.push(
			reason('unsupported-particle', 'Urutan dengan jeda memerlukan ثُمَّ sebagai token terpisah.')
		);
	if (!input.next || input.next.wordClass !== 'verb') {
		reasons.push(reason('template-shape', 'Fi‘il kedua belum terisi.'));
	} else {
		reasons.push(...verbBasics(input.next, { aspects: ['perfect'], voice: 'active' }));
		if (input.agent) reasons.push(...agreeGender(input.next, input.agent, 'pelaku yang sama'));
		reasons.push(...checkValency(input.next, undefined, input.nextValency));
	}
	return reasons;
}

/** Ma‘ṭūf follows the case of its ma‘ṭūf ‘alaih; the verb agrees with the first conjunct. */
export function evaluateAthafSubjects(input: {
	verb: FrameSlot | undefined;
	first: FrameSlot | undefined;
	joined: FrameSlot | undefined;
	valency: VerbValency | undefined;
}): FrameReason[] {
	const { verb, first, joined } = input;
	const reasons = evaluateVerbalFrame({ verb, agent: first, valency: input.valency });
	reasons.push(...evaluateClitic(joined));
	if (joined) {
		reasons.push(...noun(joined, 'raf', 'Ma‘ṭūf'));
		if (first && first.features.case !== joined.features.case)
			reasons.push(
				reason(
					'athaf-case',
					'Ma‘ṭūf harus mengikuti kasus ma‘ṭūf ‘alaih (keduanya marfū‘ di sini).'
				)
			);
		reasons.push(...evaluateCaseMarker(joined));
	}
	return reasons;
}

/** إِنْ jazm: both verbs are majzūm. Only second-person masculine singular forms are curated. */
export function evaluateCondition(input: {
	particle: FrameSlot | undefined;
	condition: FrameSlot | undefined;
	result: FrameSlot | undefined;
}): FrameReason[] {
	const { particle, condition, result } = input;
	const reasons: FrameReason[] = [];
	if (!particle || particle.wordClass !== 'particle' || nfc(particle.text) !== nfc('إِنْ'))
		reasons.push(
			reason('unsupported-particle', 'Syarat jazm memerlukan إِنْ sebagai token terpisah.')
		);
	for (const [label, verb] of [
		['Fi‘l asy-syarṭ', condition],
		['Jawāb asy-syarṭ', result]
	] as const) {
		if (!verb || verb.wordClass !== 'verb') {
			reasons.push(reason('word-class', label + ' memerlukan kata kerja.'));
			continue;
		}
		const f = verb.features;
		if (f.aspect !== 'imperfect' || f.mood !== 'jussive' || f.voice !== 'active')
			reasons.push(reason('particle-mood', label + ' harus muḍāri‘ majzūm.'));
		if (f.person !== 2 || f.gender !== 'masculine' || f.number !== 'singular')
			reasons.push(
				reason('verb-person', label + ': hanya orang kedua maskulin tunggal yang dikurasi.')
			);
		reasons.push(...evaluateCaseMarker(verb));
	}
	return reasons;
}

/** Antecedent + mawṣūl + ṣilah + khabar, through the D-04b relation and its own agreement rules. */
export function evaluateRelativeFrame(input: {
	frameId: string;
	antecedent: FrameSlot | undefined;
	relative: FrameSlot | undefined;
	sila: readonly FrameSlot[];
	khabar: FrameSlot | undefined;
	object?: FrameSlot;
	allowedFrames: readonly CuratedRelativeFrame[];
	valency: VerbValency | undefined;
}): FrameReason[] {
	const { antecedent, relative, sila, khabar } = input;
	if (!antecedent || !relative || !sila.length || !khabar)
		return [reason('template-shape', 'Rangkaian isim mawṣūl dan ṣilah belum lengkap.')];
	const head = sila[0]!;
	// A single first-person verb carrying the object suffix (قَرَأْتُهُ) is the ‘ā’id pattern.
	const returnLink =
		sila.length === 1 && head.features.person === 1 ? 'explicit-object-suffix' : 'implicit-subject';
	const reasons = fromConstraint(
		evaluateRelativeClause({
			exampleId: input.frameId,
			antecedent,
			relative,
			silaTokens: sila.map((slot) => slot.text),
			returnLink,
			allowedFrames: input.allowedFrames
		})
	);
	reasons.push(...evaluateCaseMarker(antecedent));
	if (returnLink === 'implicit-subject') {
		reasons.push(
			...verbBasics(head, { aspects: ['imperfect'], voice: 'active' }),
			...agreeGender(head, antecedent, 'isim yang diterangkan'),
			...checkValency(head, input.object, input.valency)
		);
		if (head.features.number !== 'singular')
			reasons.push(reason('verb-agreement', 'Fi‘il ṣilah tunggal pada contoh ini.'));
		if (input.object) reasons.push(...evaluateCaseMarker(input.object));
	} else {
		if (head.wordClass !== 'verb' || head.features.person !== 1)
			reasons.push(
				reason(
					'unverified-relative-return',
					'Ṣilah dengan dhamir ‘ā’id memakai fi‘il orang pertama di sini.'
				)
			);
		if (antecedent.features.gender !== 'masculine')
			reasons.push(
				reason(
					'unrecorded-form',
					'Dhamir ‘ā’id feminin (ـهَا) belum tercatat sebagai token utuh; contoh ini hanya untuk ـهُ.'
				)
			);
	}
	reasons.push(
		...evaluateNominalAdjective({ subject: antecedent, predicate: khabar, predicateCase: 'raf' })
	);
	return reasons;
}
