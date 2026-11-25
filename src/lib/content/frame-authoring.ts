/**
 * D-05b/c: small helpers for writing curated frame data compactly.
 *
 * They only assemble records the author typed. Feature strings such as "m sg def"
 * are explicit curator metadata, parsed with a closed vocabulary; an unknown word
 * throws so a typo cannot silently weaken a validator.
 */
import type {
	Definiteness,
	Gender,
	GrammaticalNumber,
	MorphFeatures,
	VerbAspect,
	VerbVoice,
	WordClass
} from '#lib/domain/grammar/lexeme-forms.js';
import type { SlotBasis, SlotMeta } from '#lib/domain/grammar/frame-types.js';
import type { VerbFrameId } from '#lib/domain/grammar/verb-frames.js';
import { wiktionaryPage } from './frame-verbs.js';

const genders: Record<string, Gender> = { m: 'masculine', f: 'feminine' };
const numbers: Record<string, GrammaticalNumber> = { sg: 'singular', du: 'dual', pl: 'plural' };
const definiteness: Record<string, Definiteness> = { def: 'definite', indef: 'indefinite' };
const aspects: Record<string, VerbAspect> = {
	perf: 'perfect',
	impf: 'imperfect',
	imv: 'imperative'
};
const voices: Record<string, VerbVoice> = { act: 'active', pass: 'passive' };

/** "3 f sg perf act" -> explicit MorphFeatures. */
export function feat(spec: string): MorphFeatures {
	const f: MorphFeatures = {};
	for (const word of spec.split(/\s+/u).filter(Boolean)) {
		if (genders[word]) f.gender = genders[word];
		else if (numbers[word]) f.number = numbers[word];
		else if (definiteness[word]) f.definiteness = definiteness[word];
		else if (aspects[word]) f.aspect = aspects[word];
		else if (voices[word]) f.voice = voices[word];
		else if (word === '1' || word === '2' || word === '3') f.person = Number(word) as 1 | 2 | 3;
		else throw new Error('Unknown feature word: ' + word);
	}
	return f;
}

const KAIKKI = 'https://kaikki.org/dictionary/Arabic/index.html';

/** Where each lexeme was recorded. Unit tests compare the msa-* entries with the vocabulary data. */
const lexemeSource: Readonly<Record<string, string>> = {
	'msa-kitab': 'https://en.wiktionary.org/wiki/كتاب',
	'msa-saghir': 'https://en.wiktionary.org/wiki/صغير',
	'msa-talib': KAIKKI,
	'msa-ustadh': KAIKKI,
	'msa-walad': KAIKKI,
	'msa-bayt': KAIKKI,
	'msa-madrasah': KAIKKI,
	'msa-risalah': KAIKKI,
	'msa-jadid': KAIKKI,
	'msa-kabir': KAIKKI,
	'msa-tawil': KAIKKI,
	'msa-sahl': KAIKKI,
	'msa-mufid': KAIKKI,
	bab: 'https://madinaharabic.com/free-content/grammar',
	haqibah: 'https://madinaharabic.com/free-content/grammar'
};

export function sourcesFor(slots: readonly SlotMeta[]): string[] {
	const urls = new Set<string>();
	for (const slot of slots) {
		const url = lexemeSource[slot.lexemeId] ?? wiktionaryPage(slot.lexemeId);
		if (url) urls.add(url);
	}
	return [...urls];
}

/** Slot metadata for an original or authored token. */
export function slot(
	lexemeId: string,
	wordClass: WordClass,
	features: string,
	options: {
		basis?: SlotBasis;
		verbFrame?: VerbFrameId;
		from?: string;
		clitic?: 'وَ' | 'فَ';
		stem?: string;
	} = {}
): SlotMeta {
	const basis: SlotBasis = options.basis ?? (options.from ? 'authored-variant' : 'project-surface');
	return {
		lexemeId,
		wordClass,
		features: feat(features),
		basis,
		...(options.verbFrame ? { verbFrame: options.verbFrame } : {}),
		...(options.from ? { derivedFrom: options.from } : {}),
		...(options.clitic ? { clitic: options.clitic, stem: options.stem } : {})
	};
}

/** The D-03 form of a teaching verb for a frame (exact attested spelling checked at run time). */
export function d03(lexemeId: string, frame: VerbFrameId): SlotMeta {
	const features =
		frame === 'imperative'
			? '2 m sg imv act'
			: frame === 'past'
				? '3 m sg perf act'
				: '3 m sg impf act';
	return slot(lexemeId, 'verb', features, { basis: 'verb-frame', verbFrame: frame });
}

/** The Wiktionary madhi or mudhari form of a recorded verb. */
export function recorded(lexemeId: string, form: 'past' | 'present'): SlotMeta {
	return slot(lexemeId, 'verb', form === 'past' ? '3 m sg perf act' : '3 m sg impf act', {
		basis: 'wiktionary-form',
		verbFrame: form
	});
}
