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

export type BuilderMode = 'nominal' | 'verbal';
export type BuilderSlot = 'subject' | 'predicate' | 'verb' | 'agent' | 'object';
export type Gender = 'masculine' | 'feminine';

export type BuilderState = {
	subject: string;
	predicate: string;
	verb: string;
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
};

export type BuilderToken = {
	slot: BuilderSlot;
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
type VerbAgent = { id: string; raf: string; gloss: string };
type DirectObject = { id: string; nasb: string; gloss: string };
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
	{ id: 'msa-talib', raf: 'الطَّالِبُ', gloss: 'murid itu' },
	{ id: 'msa-ustadh', raf: 'الْأُسْتَاذُ', gloss: 'guru itu' },
	{ id: 'msa-walad', raf: 'الْوَلَدُ', gloss: 'anak laki-laki itu' }
];

const objects: readonly DirectObject[] = [
	{ id: 'msa-risalah', nasb: 'الرِّسَالَةَ', gloss: 'surat itu' },
	{ id: 'msa-kitab', nasb: 'الْكِتَابَ', gloss: 'buku itu' },
	{ id: 'bab', nasb: 'الْبَابَ', gloss: 'pintu itu' }
];

const verbs: readonly VerbSelection[] = [
	{ id: 'fiil-kataba', gloss: 'menulis', allowedObjects: ['msa-risalah', 'msa-kitab'] },
	{ id: 'fiil-qaraa', gloss: 'membaca', allowedObjects: ['msa-risalah', 'msa-kitab'] },
	{ id: 'fiil-fataha', gloss: 'membuka', allowedObjects: ['bab', 'msa-kitab'] }
];

const vocabulary = [
	...publishedVocabulary('msa'),
	...publishedVocabulary('harian')
];

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

function adjectiveChoice(id: string, gender: Gender): BuilderChoice {
	const entry = vocab(id);
	if (entry.msa?.wordClass !== 'adjective' || !entry.msa.feminine) {
		throw new Error('Adjective lacks explicit feminine form: ' + id);
	}
	const gloss = adjectives.find((item) => item.id === id)?.gloss;
	if (!gloss) throw new Error('Adjective outside safe pilot list: ' + id);
	return {
		id,
		arabic: gender === 'feminine' ? entry.msa.feminine : entry.arabic,
		lemma: entry.arabic,
		gloss,
		meaning: entry.meaning,
		source: 'msa'
	};
}

function nounChoice(item: NominalNoun | VerbAgent | DirectObject): BuilderChoice {
	const entry = ensureNoun(item.id);
	return {
		id: item.id,
		arabic: 'raf' in item ? item.raf : item.nasb,
		lemma: entry.arabic,
		gloss: item.gloss,
		meaning: entry.meaning,
		source: entry.collection === 'harian' ? 'harian' : 'msa'
	};
}

function verbChoice(item: VerbSelection): BuilderChoice {
	const entry = sharaf(item.id);
	return {
		id: item.id,
		arabic: entry.lemma,
		lemma: entry.lemma,
		gloss: item.gloss,
		meaning: entry.meaning,
		source: 'sharaf',
		bab: entry.bab ? 'Bab ' + entry.bab.number : undefined
	};
}

export const initialBuilderState: BuilderState = {
	subject: 'msa-kitab',
	predicate: 'msa-jadid',
	verb: 'fiil-kataba',
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
	verb: 'Fi‘il māḍī · orang ketiga maskulin',
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
			return objects.filter((item) => verb.allowedObjects.includes(item.id)).map(nounChoice);
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
		[choice.arabic, choice.lemma, choice.gloss, choice.meaning, choice.bab ?? '']
			.some((text) => normalizeArabicSearch(text).includes(normalized))
	);
}

export type SelectionResult = { state: BuilderState; resetObject: boolean };

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
	let resetObject = false;
	if (slot === 'verb' && !optionsForBuilderSlot(next, 'object').some((choice) => choice.id === next.object)) {
		next.object = optionsForBuilderSlot(next, 'object')[0]!.id;
		resetObject = true;
	}
	return { state: next, resetObject };
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
				{ slot: 'subject', arabic: subject.arabic, gloss: subject.gloss, role: 'Mubtada', marker: 'Rafa‘ · ḍamma' },
				{ slot: 'predicate', arabic: predicate.arabic, gloss: predicate.gloss, role: 'Khabar', marker: 'Rafa‘ · tanwin ḍamm' }
			],
			translation: subject.gloss.charAt(0).toUpperCase() + subject.gloss.slice(1) + ' ' + predicate.gloss + '.',
			explanation: 'Isim ma‘rifah sebagai mubtada; khabar nakirah mengikuti gender dan jumlah mufrad tanpa menjadi na‘at.',
			changedObject: false
		};
	}
	const verb = picked(state, 'verb');
	const agent = picked(state, 'agent');
	const object = picked(state, 'object');
	return {
		tokens: [
			{ slot: 'verb', arabic: verb.arabic, gloss: verb.gloss, role: 'Fi‘il māḍī', marker: 'Bentuk tetap · orang ketiga maskulin' },
			{ slot: 'agent', arabic: agent.arabic, gloss: agent.gloss, role: 'Fā‘il', marker: 'Rafa‘ · ḍamma' },
			{ slot: 'object', arabic: object.arabic, gloss: object.gloss, role: 'Maf‘ūl bih', marker: 'Naṣb · fatḥa' }
		],
		translation: agent.gloss.charAt(0).toUpperCase() + agent.gloss.slice(1) + ' ' + verb.gloss + ' ' + object.gloss + '.',
		explanation: 'Kalimat VSO memakai fi‘il māḍī maskulin tunggal; fā‘il marfū‘ dan objek manṣūb. Kata dipilih dari daftar kompatibilitas semantis yang terbatas.',
		changedObject: false
	};
}

export function validateBuilderRegistry(): string[] {
	const errors: string[] = [];
	for (const noun of [...nouns, ...agents, ...objects]) {
		try { ensureNoun(noun.id); } catch { errors.push('Missing noun source: ' + noun.id); }
	}
	for (const adjective of adjectives) {
		try { adjectiveChoice(adjective.id, 'feminine'); } catch { errors.push('Missing adjective form: ' + adjective.id); }
	}
	for (const verb of verbs) {
		try { verbChoice(verb); } catch { errors.push('Missing verb source: ' + verb.id); }
		for (const objectId of verb.allowedObjects) {
			if (!objects.some((object) => object.id === objectId))
				errors.push('Unknown compatible object: ' + verb.id + '/' + objectId);
		}
		if (!verb.allowedObjects.length) errors.push('Verb has no compatible object: ' + verb.id);
	}
	for (const mode of ['nominal', 'verbal'] as const) {
		try { composeBuilderExample(mode, initialBuilderState); } catch {
			errors.push('Broken initial example: ' + mode);
		}
	}
	return errors;
}
