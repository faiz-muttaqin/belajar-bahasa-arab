/**
 * G-06 pilot: slot-scoped word replacements, reusing the first-party MSA vocabulary
 * and verified *entry identities* from the existing sharaf index.
 *
 * Dictionary entries are LEMMAS, not ready-to-insert inflected words. Every surface
 * used here is hand-curated for exactly one grammatical frame and constrained for
 * agreement, transitivity, and semantic compatibility. This is not a conjugator.
 */
import { publishedVocabulary } from '#lib/content/vocabulary.js';
import { sharafEntries } from '#lib/content/sharaf.js';
import { normalizeArabicSearch } from '#lib/domain/sharaf/lexicon.js';
import {
	curatedFrameSurface,
	withCuratedValency,
	lexemeFromVocabulary,
	lexemeFromSharaf,
	validateLexemeRecord,
	type MorphFeatures,
	type SurfaceEvidence,
	type LexemeRecord,
	type WordClass
} from './lexeme-forms.js';
import { resolveVerbFrame, validateVerbFrameRegistry, type VerbFrameId } from './verb-frames.js';

export type BuilderMode = 'nominal' | 'verbal';
export type BuilderSlot = 'subject' | 'predicate' | 'verb' | 'agent' | 'object';
export type Gender = 'masculine' | 'feminine';

export type BuilderState = {
	subject: string;
	predicate: string;
	verb: string;
	verbFrame: VerbFrameId;
	agent: string;
	object: string;
};

export type BuilderChoice = {
	id: string;
	arabic: string;
	lemma: string;
	gloss: string;
	meaning: string;
	source: 'msa' | 'harian' | 'sharaf';
	bab?: string;
	/** Morphology of the actual inserted word, not of its dictionary lemma. */
	features: MorphFeatures;
	evidence: SurfaceEvidence;
	/** Curated compatibility for teaching frames; undefined for non-verbs. */
	valency?: readonly string[];
};

export type BuilderToken = {
	slot: BuilderSlot | 'operator';
	arabic: string;
	gloss: string;
	role: string;
	marker: string;
};

export type BuiltExample = {
	tokens: readonly BuilderToken[];
	translation: string;
	explanation: string;
	changedObject: boolean;
};

type NominalNoun = { id: string; raf: string; gloss: string; gender: Gender };
type VerbAgent = { id: string; raf: string; gloss: string; gender: 'masculine' };
type DirectObject = { id: string; nasb: string; gloss: string; gender: Gender };
type VerbSelection = { id: string; gloss: string; allowedObjects: readonly string[] };

const nouns: readonly NominalNoun[] = [
	{ id: 'msa-kitab', raf: 'الْكِتَابُ', gloss: 'buku itu', gender: 'masculine' },
	{ id: 'msa-bayt', raf: 'الْبَيْتُ', gloss: 'rumah itu', gender: 'masculine' },
	{ id: 'msa-madrasah', raf: 'الْمَدْرَسَةُ', gloss: 'sekolah itu', gender: 'feminine' },
	{ id: 'msa-risalah', raf: 'الرِّسَالَةُ', gloss: 'surat itu', gender: 'feminine' }
];

const adjectives = [
	{ id: 'msa-jadid', gloss: 'baru' },
	{ id: 'msa-kabir', gloss: 'besar' },
	{ id: 'msa-saghir', gloss: 'kecil' },
	{ id: 'msa-jamil', gloss: 'indah' }
] as const;

const agents: readonly VerbAgent[] = [
	{ id: 'msa-talib', raf: 'الطَّالِبُ', gloss: 'murid itu', gender: 'masculine' },
	{ id: 'msa-ustadh', raf: 'الْأُسْتَاذُ', gloss: 'guru itu', gender: 'masculine' },
	{ id: 'msa-walad', raf: 'الْوَلَدُ', gloss: 'anak laki-laki itu', gender: 'masculine' }
];

const objects: readonly DirectObject[] = [
	{ id: 'msa-risalah', nasb: 'الرِّسَالَةَ', gloss: 'surat itu', gender: 'feminine' },
	{ id: 'msa-kitab', nasb: 'الْكِتَابَ', gloss: 'buku itu', gender: 'masculine' },
	{ id: 'bab', nasb: 'الْبَابَ', gloss: 'pintu itu', gender: 'masculine' }
];

const verbs: readonly VerbSelection[] = [
	{ id: 'fiil-kataba', gloss: 'menulis', allowedObjects: ['msa-risalah', 'msa-kitab'] },
	{ id: 'fiil-qaraa', gloss: 'membaca', allowedObjects: ['msa-risalah', 'msa-kitab'] },
	{ id: 'fiil-fataha', gloss: 'membuka', allowedObjects: ['bab', 'msa-kitab'] }
];

const vocabulary = [...publishedVocabulary('msa'), ...publishedVocabulary('harian')];

function vocab(id: string) {
	const entry = vocabulary.find((item) => item.id === id);
	if (!entry || !entry.sources.length || entry.register !== 'msa') {
		throw new Error('Missing sourced MSA vocabulary choice: ' + id);
	}
	return entry;
}

function sharaf(id: string) {
	const entry = sharafEntries.find((item) => item.id === id);
	if (!entry || entry.partOfSpeech !== 'verb' || !entry.sources.length || !entry.bab) {
		throw new Error('Missing sourced verbal choice: ' + id);
	}
	return entry;
}

function ensureNoun(id: string) {
	const entry = vocab(id);
	if (entry.id.startsWith('msa-') && entry.msa?.wordClass !== 'noun') {
		throw new Error('Wrong noun class: ' + id);
	}
	return entry;
}

function inFrame(
	lexeme: LexemeRecord,
	id: string,
	surface: string,
	features: MorphFeatures,
	reason: string,
	frameWordClass?: WordClass
) {
	if (validateLexemeRecord(lexeme).length) throw new Error('Invalid lexeme contract: ' + id);
	return curatedFrameSurface({ lexeme, id, surface, features, reason, frameWordClass });
}

function adjectiveChoice(id: string, gender: Gender): BuilderChoice {
	const entry = vocab(id);
	if (entry.msa?.wordClass !== 'adjective' || !entry.msa.feminine) {
		throw new Error('Adjective lacks explicit feminine form: ' + id);
	}
	const gloss = adjectives.find((item) => item.id === id)?.gloss;
	if (!gloss) throw new Error('Adjective outside safe pilot list: ' + id);
	const arabic = gender === 'feminine' ? entry.msa.feminine : entry.arabic;
	const form = inFrame(
		lexemeFromVocabulary(entry),
		'predicate',
		arabic,
		{ case: 'raf', number: 'singular', definiteness: 'indefinite', gender },
		'Khabar sifat mufrad berstatus marfū‘; bentuk feminin diambil dari field msa.feminine.'
	);
	return {
		id,
		arabic,
		lemma: entry.arabic,
		gloss,
		meaning: entry.meaning,
		source: 'msa',
		features: form.features,
		evidence: form.evidence
	};
}

function nounChoice(item: NominalNoun | VerbAgent | DirectObject): BuilderChoice {
	const entry = ensureNoun(item.id);
	const caseName = 'raf' in item ? 'raf' : 'nasb';
	const arabic = 'raf' in item ? item.raf : item.nasb;
	const form = inFrame(
		lexemeFromVocabulary(entry),
		caseName === 'raf' ? 'subject-or-agent' : 'object',
		arabic,
		{ case: caseName, number: 'singular', definiteness: 'definite', gender: item.gender },
		'Bentuk isim tunggal ber-ال untuk slot kaidah tertentu. Harakat akhir dipilih manual dari bingkai pengajaran.',
		entry.id === 'bab' ? 'noun' : undefined
	);
	return {
		id: item.id,
		arabic,
		lemma: entry.arabic,
		gloss: item.gloss,
		meaning: entry.meaning,
		source: entry.collection === 'harian' ? 'harian' : 'msa',
		features: form.features,
		evidence: form.evidence
	};
}

function verbChoice(item: VerbSelection): BuilderChoice {
	const entry = sharaf(item.id);
	const frameLexeme = withCuratedValency(lexemeFromSharaf(entry), item.allowedObjects);
	const form = inFrame(
		frameLexeme,
		'verb-past-third-masculine',
		entry.lemma,
		{ aspect: 'perfect', voice: 'active', number: 'singular', person: 3, gender: 'masculine' },
		'Fi‘il māḍī aktif orang ketiga maskulin tunggal dari lema yang telah disertakan dalam pilot.'
	);
	return {
		id: item.id,
		arabic: entry.lemma,
		lemma: entry.lemma,
		gloss: item.gloss,
		meaning: entry.meaning,
		source: 'sharaf',
		bab: entry.bab ? 'Bab ' + entry.bab.number : undefined,
		features: form.features,
		evidence: form.evidence,
		valency:
			frameLexeme.valency.kind === 'transitive' ? frameLexeme.valency.exampleObjectIds : undefined
	};
}

export const initialBuilderState: BuilderState = {
	subject: 'msa-kitab',
	predicate: 'msa-jadid',
	verb: 'fiil-kataba',
	verbFrame: 'past',
	agent: 'msa-talib',
	object: 'msa-risalah'
};

export const builderSlots: Readonly<Record<BuilderMode, readonly BuilderSlot[]>> = {
	nominal: ['subject', 'predicate'],
	verbal: ['verb', 'agent', 'object']
};

export const builderSlotLabels: Record<BuilderSlot, string> = {
	subject: 'Mubtada · isim marfū‘',
	predicate: 'Khabar · sifat marfū‘',
	verb: 'Fi‘il · pilih kata kerja',
	agent: 'Fā‘il · maskulin tunggal marfū‘',
	object: 'Maf‘ūl bih · isim manṣūb'
};

export function optionsForBuilderSlot(state: BuilderState, slot: BuilderSlot): BuilderChoice[] {
	switch (slot) {
		case 'subject':
			return nouns.map(nounChoice);
		case 'predicate': {
			const noun = nouns.find((entry) => entry.id === state.subject);
			if (!noun) return [];
			return adjectives.map((entry) => adjectiveChoice(entry.id, noun.gender));
		}
		case 'verb':
			return verbs.map(verbChoice);
		case 'agent':
			return agents.map(nounChoice);
		case 'object': {
			const verb = verbs.find((item) => item.id === state.verb);
			if (!verb) return [];
			return verb.allowedObjects
				.map((id) => objects.find((item) => item.id === id))
				.filter((item): item is DirectObject => item !== undefined)
				.map(nounChoice);
		}
	}
}

/** Search Arabic with/without ḥarakāt, Indonesian meaning, source lemma or wazan bab. */
export function searchBuilderChoices(
	state: BuilderState,
	slot: BuilderSlot,
	query: string
): BuilderChoice[] {
	const all = optionsForBuilderSlot(state, slot);
	const normalized = normalizeArabicSearch(query);
	if (!normalized) return all;
	return all.filter((choice) =>
		[choice.arabic, choice.lemma, choice.gloss, choice.meaning, choice.bab ?? ''].some((text) =>
			normalizeArabicSearch(text).includes(normalized)
		)
	);
}

export type SelectionResult = { state: BuilderState; resetObject: boolean; resetFrame: boolean };

/** Do not accept a frame unless the chosen verb has an explicit source-linked form. */
export function chooseVerbFrame(state: BuilderState, frame: VerbFrameId): BuilderState {
	if (!resolveVerbFrame(state.verb, frame)) {
		throw new Error('Unavailable verbal frame: ' + state.verb + '/' + frame);
	}
	return { ...state, verbFrame: frame };
}

/** A selection must be present in the currently compatible, source-linked options. */
export function chooseBuilderWord(
	state: BuilderState,
	slot: BuilderSlot,
	id: string
): SelectionResult {
	if (!optionsForBuilderSlot(state, slot).some((option) => option.id === id)) {
		throw new Error('Incompatible replacement: ' + slot + '/' + id);
	}
	const next = { ...state, [slot]: id };
	let resetFrame = false;
	if (slot === 'verb' && !resolveVerbFrame(next.verb, next.verbFrame)) {
		next.verbFrame = 'past';
		resetFrame = true;
	}
	let resetObject = false;
	if (
		slot === 'verb' &&
		!optionsForBuilderSlot(next, 'object').some((choice) => choice.id === next.object)
	) {
		next.object = optionsForBuilderSlot(next, 'object')[0]!.id;
		resetObject = true;
	}
	return { state: next, resetObject, resetFrame };
}

function picked(state: BuilderState, slot: BuilderSlot): BuilderChoice {
	const id = state[slot];
	const choice = optionsForBuilderSlot(state, slot).find((item) => item.id === id);
	if (!choice) throw new Error('Invalid current slot: ' + slot + '/' + id);
	return choice;
}

export function composeBuilderExample(mode: BuilderMode, state: BuilderState): BuiltExample {
	if (mode === 'nominal') {
		const subject = picked(state, 'subject');
		const predicate = picked(state, 'predicate');
		return {
			tokens: [
				{
					slot: 'subject',
					arabic: subject.arabic,
					gloss: subject.gloss,
					role: 'Mubtada',
					marker: 'Rafa‘ · ḍamma'
				},
				{
					slot: 'predicate',
					arabic: predicate.arabic,
					gloss: predicate.gloss,
					role: 'Khabar',
					marker: 'Rafa‘ · tanwin ḍamm'
				}
			],
			translation:
				subject.gloss.charAt(0).toUpperCase() +
				subject.gloss.slice(1) +
				' ' +
				predicate.gloss +
				'.',
			explanation:
				'Isim ma‘rifah sebagai mubtada; khabar nakirah mengikuti gender dan jumlah mufrad tanpa menjadi na‘at.',
			changedObject: false
		};
	}
	const verb = picked(state, 'verb');
	const agent = picked(state, 'agent');
	const object = picked(state, 'object');
	const resolved = resolveVerbFrame(state.verb, state.verbFrame);
	if (!resolved) throw new Error('Verb frame is not available for this lexical entry');
	const command = resolved.actor === 'implicit-second-masculine';
	const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
	const translation =
		state.verbFrame === 'imperative'
			? 'Bukalah ' + object.gloss + '!'
			: state.verbFrame === 'lam'
				? capitalize(agent.gloss) +
					' tidak ' +
					verb.gloss +
					' ' +
					object.gloss +
					' (pada waktu lampau).'
				: state.verbFrame === 'lan'
					? capitalize(agent.gloss) + ' tidak akan ' + verb.gloss + ' ' + object.gloss + '.'
					: state.verbFrame === 'present'
						? capitalize(agent.gloss) +
							' ' +
							verb.gloss +
							' ' +
							object.gloss +
							' (konteks nonlampau).'
						: capitalize(agent.gloss) + ' ' + verb.gloss + ' ' + object.gloss + '.';
	return {
		tokens: [
			...(resolved.particle
				? [
						{
							slot: 'operator' as const,
							arabic: resolved.particle.arabic,
							gloss: resolved.particle.gloss,
							role: 'Harf naṣb / jazm',
							marker: resolved.particle.marker
						}
					]
				: []),
			{
				slot: 'verb',
				arabic: resolved.form.text,
				gloss: state.verbFrame === 'imperative' ? 'bukalah!' : verb.gloss,
				role: command ? 'Fi‘il amr' : state.verbFrame === 'past' ? 'Fi‘il māḍī' : 'Fi‘il muḍāri‘',
				marker: resolved.marker
			},
			...(command
				? []
				: [
						{
							slot: 'agent' as const,
							arabic: agent.arabic,
							gloss: agent.gloss,
							role: 'Fā‘il',
							marker: 'Rafa‘ · ḍamma'
						}
					]),
			{
				slot: 'object',
				arabic: object.arabic,
				gloss: object.gloss,
				role: 'Maf‘ūl bih',
				marker: 'Naṣb · fatḥa'
			}
		],
		translation,
		explanation:
			resolved.detail +
			'. ' +
			(command
				? 'Pelaku أَنْتَ tersirat, sehingga kartu tidak menampilkan fā‘il eksplisit. '
				: 'Fā‘il tunggal maskulin marfū‘ tetap disebutkan. ') +
			'Pilihan objek mengikuti daftar kompatibilitas contoh yang terbatas; bentuk fi‘il dan mood tidak ditebak dari wazan.',
		changedObject: false
	};
}

export function validateBuilderRegistry(): string[] {
	const errors: string[] = [...validateVerbFrameRegistry()];
	for (const noun of [...nouns, ...agents, ...objects]) {
		try {
			ensureNoun(noun.id);
		} catch {
			errors.push('Missing noun source: ' + noun.id);
		}
	}
	for (const adjective of adjectives) {
		try {
			adjectiveChoice(adjective.id, 'feminine');
		} catch {
			errors.push('Missing adjective form: ' + adjective.id);
		}
	}
	for (const verb of verbs) {
		try {
			verbChoice(verb);
			if (!resolveVerbFrame(verb.id, 'past')) errors.push('Missing pilot past frame: ' + verb.id);
		} catch {
			errors.push('Missing verb source: ' + verb.id);
		}
		for (const objectId of verb.allowedObjects) {
			if (!objects.some((object) => object.id === objectId))
				errors.push('Unknown compatible object: ' + verb.id + '/' + objectId);
		}
		if (!verb.allowedObjects.length) errors.push('Verb has no compatible object: ' + verb.id);
	}
	for (const mode of ['nominal', 'verbal'] as const) {
		try {
			composeBuilderExample(mode, initialBuilderState);
		} catch {
			errors.push('Broken initial example: ' + mode);
		}
	}
	return errors;
}
