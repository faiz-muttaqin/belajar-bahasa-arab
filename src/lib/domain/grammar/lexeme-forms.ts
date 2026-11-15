/**
 * D-02: shared, conservative lexeme + surface-form contracts.
 *
 * A lexical entry is NOT a ready-to-insert inflected sentence token. Morphological
 * features are recorded only when explicitly known. This module does not parse,
 * conjugate, synthesize case endings, or infer a Form-I bab from a consonantal root.
 */
import type { VocabularyItem } from '#lib/domain/vocabulary/types.js';
import type { SharafEntry } from '#lib/domain/sharaf/lexicon.js';
import { normalizeArabicSearch } from '#lib/domain/sharaf/lexicon.js';
import type { IrabCase } from '#lib/content/phrase-rules.js';
import type { VerbMood } from '#lib/content/sentence-rules.js';

export type WordClass = 'noun' | 'adjective' | 'verb' | 'particle' | 'expression';
export type Gender = 'masculine' | 'feminine';
export type GrammaticalNumber = 'singular' | 'dual' | 'plural';
export type Definiteness = 'definite' | 'indefinite';
export type VerbAspect = 'perfect' | 'imperfect' | 'imperative';
export type VerbVoice = 'active' | 'passive';
export type ReviewState = 'fixture' | 'draft' | 'linguist_reviewed' | 'approved';

export type MorphFeatures = {
	gender?: Gender;
	number?: GrammaticalNumber;
	definiteness?: Definiteness;
	/** For nouns/adjectives only. */
	case?: IrabCase;
	/** For finite imperfect verbs only. */
	mood?: VerbMood;
	aspect?: VerbAspect;
	voice?: VerbVoice;
	person?: 1 | 2 | 3;
};

/** Provenance of a particular *surface*, distinct from the provenance of the lemma. */
export type SurfaceEvidence = {
	kind: 'dictionary-lemma' | 'explicit-dictionary-form' | 'curated-example';
	/** Curated teaching examples are NOT linguist approved. */
	reviewStatus: ReviewState;
	sourceUrls: readonly string[];
	note: string;
};

export type WordSurface = {
	id: string;
	text: string;
	features: MorphFeatures;
	evidence: SurfaceEvidence;
};

export type LexemeValency =
	| { kind: 'unknown' }
	| { kind: 'intransitive'; evidence: 'curated-frame' }
	| {
			kind: 'transitive';
			/** Meaning-checked sample collocations, not a universal object inventory. */
			exampleObjectIds: readonly string[];
			evidence: 'curated-frame';
	  };

export type LexemeRecord = {
	id: string;
	wordClass: WordClass;
	lemma: string;
	meaning: string;
	register: 'msa' | 'classical' | 'unknown';
	lexicon: 'vocabulary' | 'sharaf';
	collection?: VocabularyItem['collection'];
	root?: string;
	bab?: number;
	lemmaEvidence: SurfaceEvidence;
	forms: readonly WordSurface[];
	valency: LexemeValency;
};

function evidence(
	kind: SurfaceEvidence['kind'],
	status: ReviewState,
	sources: readonly string[],
	note: string
): SurfaceEvidence {
	return { kind, reviewStatus: status, sourceUrls: [...sources], note };
}

function wordClassForVocabulary(item: VocabularyItem): WordClass {
	if (item.msa) return item.msa.wordClass;
	if (item.verbReference) return 'verb';
	// Many Quran/shalat vocabulary entries lack an explicit POS annotation.
	// Never label them nouns solely because the item is outside MSA.
	return 'expression';
}

/** Adapter: preserve what the vocabulary record says, not what morphology might imply. */
export function lexemeFromVocabulary(item: VocabularyItem): LexemeRecord {
	const wordClass = wordClassForVocabulary(item);
	const lemmaEvidence = evidence(
		'dictionary-lemma',
		item.reviewStatus,
		item.sources,
		'Bentuk kepala entri kamus; belum tentu tepat untuk suatu posisi kalimat.'
	);
	const forms: WordSurface[] = [
		{ id: 'lemma', text: item.arabic, features: {}, evidence: lemmaEvidence }
	];
	if (item.msa?.feminine && wordClass === 'adjective') {
		forms.push({
			id: 'feminine-reference',
			text: item.msa.feminine,
			features: { gender: 'feminine' },
			evidence: evidence(
				'explicit-dictionary-form',
				item.reviewStatus,
				item.sources,
				'Bentuk feminin tercatat eksplisit pada entri MSA; kasus/definiteness belum dianalisis.'
			)
		});
	}
	if (item.msa?.plural) {
		forms.push({
			id: 'plural-reference',
			text: item.msa.plural.value,
			features: { number: 'plural' },
			evidence: evidence(
				'explicit-dictionary-form',
				item.reviewStatus,
				item.sources,
				'Bentuk jamak eksplisit; tanda kasus dan agreement tidak disimpulkan.'
			)
		});
	}
	return {
		id: item.id,
		wordClass,
		lemma: item.arabic,
		meaning: item.meaning,
		register: item.register,
		lexicon: 'vocabulary',
		collection: item.collection,
		root: item.msa?.root,
		bab: item.verbReference?.bab,
		lemmaEvidence,
		forms,
		valency: { kind: 'unknown' }
	};
}

/** Adapter: source-rich sharaf forms may still be draft and lack person/voice metadata. */
export function lexemeFromSharaf(entry: SharafEntry): LexemeRecord {
	const wordClass: WordClass = entry.partOfSpeech;
	const lemmaEvidence = evidence(
		'dictionary-lemma',
		entry.reviewStatus,
		entry.sources,
		'Entri sharaf; bab leksikal tidak membuktikan semua tashrifnya.'
	);
	const forms: WordSurface[] = [
		{ id: 'lemma', text: entry.lemma, features: {}, evidence: lemmaEvidence },
		...entry.forms.map((form, i): WordSurface => ({
			id: 'form-' + i,
			text: form.value,
			features:
				entry.partOfSpeech !== 'verb'
					? {}
					: form.label === 'mudhari'
						? { aspect: 'imperfect' }
						: form.label === 'amr'
							? { aspect: 'imperative' }
							: form.label === 'madhi'
								? { aspect: 'perfect' }
								: {},
			evidence: evidence(
				'explicit-dictionary-form',
				entry.reviewStatus,
				entry.sources,
				'Bentuk yang tercantum (' + form.label + '), bukan hasil conjugator.'
			)
		}))
	];
	return {
		id: entry.id,
		wordClass,
		lemma: entry.lemma,
		meaning: entry.meaning,
		register: 'unknown',
		lexicon: 'sharaf',
		root: entry.root,
		bab: entry.bab?.number,
		lemmaEvidence,
		forms,
		valency: { kind: 'unknown' }
	};
}

export type CuratedFrameForm = {
	lexeme: LexemeRecord;
	id: string;
	surface: string;
	features: MorphFeatures;
	/**
	 * Explicit POS override for a specific curated teaching frame ONLY. The
	 * unannotated dictionary entry itself remains unclassified.
	 */
	frameWordClass?: WordClass;
	/** Explain why this form may be used in this particular teaching frame. */
	reason: string;
};

/**
 * Explicit object compatibility in ONE curated teaching frame. This is not an
 * assertion that the verb can never take other objects or is always transitive.
 */
export function withCuratedValency(
	lexeme: LexemeRecord,
	objectIds: readonly string[]
): LexemeRecord {
	if (lexeme.wordClass !== 'verb' || !objectIds.length || objectIds.some((id) => !id.trim()))
		throw new Error('Invalid curated verb/object frame');
	return {
		...lexeme,
		valency: {
			kind: 'transitive',
			exampleObjectIds: [...new Set(objectIds)],
			evidence: 'curated-frame'
		}
	};
}

/**
 * Only curated template forms can become choices in a grammar slot.
 * The input source status is never elevated: every constructed frame is draft.
 */
export function curatedFrameSurface(input: CuratedFrameForm): WordSurface {
	const { lexeme, id, surface, features, reason, frameWordClass } = input;
	if (!id.trim() || !surface.trim() || !reason.trim()) throw new Error('Incomplete curated form');
	if (frameWordClass && (lexeme.wordClass !== 'expression' || frameWordClass === 'expression'))
		throw new Error('Invalid curated POS override');
	const usedClass = frameWordClass ?? lexeme.wordClass;
	if (features.case && (!['noun', 'adjective'].includes(usedClass) || features.mood))
		throw new Error('Noun case cannot be mixed with verb mood or a non-noun');
	if (features.mood && (lexeme.wordClass !== 'verb' || features.aspect !== 'imperfect'))
		throw new Error('Verb mood requires an explicitly imperfect verb');
	if (features.aspect && lexeme.wordClass !== 'verb')
		throw new Error('Verb aspect cannot be assigned to non-verbs');
	if (features.voice && lexeme.wordClass !== 'verb')
		throw new Error('Verb voice cannot be assigned to non-verbs');
	if (features.person && lexeme.wordClass !== 'verb')
		throw new Error('Verb person cannot be assigned to non-verbs');
	if (!lexeme.lemmaEvidence.sourceUrls.length) throw new Error('Missing lexeme sources');
	return {
		id,
		text: surface,
		features: { ...features },
		evidence: evidence(
			'curated-example',
			'draft',
			lexeme.lemmaEvidence.sourceUrls,
			reason +
				(frameWordClass ? ' Kelas kata ditetapkan manual hanya pada bingkai ini.' : '') +
				' Bentuk ini masih menunggu tashih guru bahasa Arab.'
		)
	};
}

export function validateLexemeRecord(record: LexemeRecord): string[] {
	const errors: string[] = [];
	if (!record.id.trim() || !record.lemma.trim() || !record.meaning.trim())
		errors.push('Missing lexeme identity or gloss');
	if (!record.forms.length || record.forms[0]?.text !== record.lemma)
		errors.push('Missing exact lemma form');
	if (!record.lemmaEvidence.sourceUrls.length) errors.push('Missing lexical source');
	const ids = new Set<string>();
	for (const form of record.forms) {
		if (ids.has(form.id)) errors.push('Duplicate form id: ' + form.id);
		ids.add(form.id);
		if (!form.text.trim() || !form.evidence.note.trim() || !form.evidence.sourceUrls.length)
			errors.push('Incomplete form: ' + form.id);
		if (form.evidence.sourceUrls.some((url) => !url.startsWith('https://')))
			errors.push('Invalid source URL: ' + form.id);
		const f = form.features;
		if (f.case && (f.mood || !['noun', 'adjective'].includes(record.wordClass)))
			errors.push('Case/mood mismatch: ' + form.id);
		if ((f.aspect || f.voice || f.person) && record.wordClass !== 'verb')
			errors.push('Verb features on non-verb: ' + form.id);
		if (f.mood && (record.wordClass !== 'verb' || f.aspect !== 'imperfect'))
			errors.push('Mood without imperfect verb: ' + form.id);
	}
	if (record.valency.kind === 'transitive' && !record.valency.exampleObjectIds.length)
		errors.push('Unbounded transitivity claim');
	return errors;
}

export function searchLexemeRecords(
	records: readonly LexemeRecord[],
	query: string
): LexemeRecord[] {
	const normalized = normalizeArabicSearch(query);
	if (!normalized) return [...records];
	return records.filter((record) =>
		[
			record.lemma,
			record.meaning,
			record.root ?? '',
			record.bab ? String(record.bab) : '',
			...record.forms.map((form) => form.text)
		].some((value) => normalizeArabicSearch(value).includes(normalized))
	);
}
