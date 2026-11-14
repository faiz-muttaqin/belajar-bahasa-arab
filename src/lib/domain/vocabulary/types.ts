/**
 * Vocabulary content contract (no content here). Real items come from reviewed, sourced
 * curriculum research; see docs/arabic-learning-pedagogy-ux-research-reissued.md §6.1b and
 * docs/decisions/0004-content-decisions.md (D-6 icons, D-7 reviews).
 */
import type { ReviewStatus } from '#lib/domain/reference/table.js';
import { hasApprovingReview, type ReviewRecord, type ReviewerRole } from '#lib/domain/review.js';

/** Collections shown on /kosakata/. Qur'anic/classical words are labelled separately (§3.3). */
export type VocabularyCollectionId = 'harian' | 'quran' | 'shalat' | 'msa';

export const QURAN_GROUPS = {
	harf: 'Harf dan kata penghubung',
	rujukan: 'Isim rujukan dan keterangan',
	'fiil-ujar': 'Fi’il · Ucapan dan pengetahuan',
	'fiil-iman': 'Fi’il · Iman dan ibadah',
	'fiil-tindakan': 'Fi’il · Keadaan dan tindakan',
	isim: 'Isim · Benda, konsep, dan sifat'
} as const;

export type QuranGroup = keyof typeof QURAN_GROUPS;
/**
 * A manually verified statistic for a particular lemma/verb analysis.
 * Not a root count, substring count, or token total.
 */
export type QuranFrequency = {
	occurrences: number;
	basis: 'lemma' | 'verb';
	source: string;
	evidence: 'manually-checked';
	note?: string;
};

export type QuranOccurrence = {
	/** Surah and ayah in the Tanzil download. */
	reference: `${number}:${number}`;
	/** Complete, unmodified orthographic token, including any attached particle. */
	token: string;
	textVersion: 'Tanzil Uthmani 1.1';
};
export type VerbReference = { bab: number; id: string };

/** Keys of the curated icon registry (src/lib/components/learning/vocab-icons.ts). */
export type VocabIconKey =
	| 'book'
	| 'pen'
	| 'house'
	| 'door'
	| 'school'
	| 'water'
	| 'food'
	| 'apple'
	| 'tree'
	| 'sun'
	| 'moon'
	| 'car';

/** D-6: only concrete words may have an icon; abstract words use a context sentence. */
export type Concreteness = 'concrete' | 'abstract' | 'function';

/** MSA is a curated thematic lexicon, not a frequency ranking or a fourth Arabic word class. */
export const MSA_TOPICS = {
	people: 'Orang dan keluarga',
	places: 'Tempat',
	objects: 'Benda sehari-hari',
	food: 'Makanan dan minuman',
	nature: 'Alam',
	time: 'Waktu',
	qualities: 'Sifat dan keadaan',
	technology: 'Teknologi modern',
	social: 'Sapaan dan ungkapan'
} as const;
export type MsaTopic = keyof typeof MSA_TOPICS;
export const MSA_CLASSES = {
	noun: 'Isim · kata benda',
	adjective: 'Isim · kata sifat',
	expression: 'Ungkapan',
	particle: 'Harf · kata tugas'
} as const;
export type MsaClass = keyof typeof MSA_CLASSES;

export type MsaLexicalInfo = {
	wordClass: MsaClass;
	topic: MsaTopic;
	/** Only record morphological information explicitly selected for review, never infer it from a root. */
	root?: string;
	plural?: { value: string; kind: 'broken' | 'sound' | 'lexical' };
	feminine?: string;
	/** Original illustration for teaching phrase composition; not a corpus quotation. */
	example?: { arabic: string; meaning: string };
	/** These are candidates, not entries individually checked against an external dictionary. */
	attestation: 'curated-draft';
	/** Modern innovations: loanword, compound or regular Arabic formation. Otherwise omit. */
	formation?: 'loanword' | 'compound' | 'derived';
};

export type VocabularyItem = {
	id: string;
	collection: VocabularyCollectionId;
	register: 'msa' | 'classical';
	arabic: string;
	meaning: string;
	concreteness: Concreteness;
	/** Optional association icon, concrete words only. Never the only carrier of meaning. */
	icon?: VocabIconKey;
	reviewStatus: ReviewStatus;
	sources: string[];
	reviews?: ReviewRecord[];
	/** Free-text note on where learners meet the word, e.g. a shalat recitation. */
	context?: string;
	transliteration?: string;
	quranGroup?: QuranGroup;
	quranOccurrence?: QuranOccurrence;
	quranFrequency?: QuranFrequency;
	verbReference?: VerbReference;
	msa?: MsaLexicalInfo;
};

export const COLLECTION_LABELS: Record<VocabularyCollectionId, string> = {
	harian: 'Kosakata harian',
	quran: 'Kosakata Al-Qur’an',
	shalat: 'Kosakata bacaan shalat',
	msa: 'Kosakata umum MSA'
};

/** D-7: who must approve items in each collection. */
export const REQUIRED_REVIEWER: Record<VocabularyCollectionId, ReviewerRole> = {
	harian: 'arabic_teacher',
	quran: 'ustadz',
	shalat: 'ustadz',
	msa: 'arabic_teacher'
};

export type VocabIssue = { id: string; message: string };

export function validateVocab(item: VocabularyItem): VocabIssue[] {
	const issues: VocabIssue[] = [];
	const add = (message: string) => issues.push({ id: item.id, message });
	if (item.arabic.trim() === '') add('Empty Arabic text');
	if (item.meaning.trim() === '') add('Empty meaning');
	if (item.icon && item.concreteness !== 'concrete') add('Icon on a non-concrete word (D-6)');
	if (
		(item.collection === 'quran' || item.collection === 'shalat') &&
		item.register !== 'classical'
	) {
		add('Classical collections must use the classical register label');
	}
	if (
		item.collection === 'quran' &&
		(!item.quranGroup || !item.quranOccurrence || !item.transliteration)
	) {
		add('Qur’anic items require a group, a transliteration and an ayah witness');
	}
	if (item.collection === 'msa') {
		if (item.register !== 'msa') add('MSA collection must use msa register');
		if (!item.msa) add('MSA lexical metadata is required');
		else {
			if (!Object.hasOwn(MSA_TOPICS, item.msa.topic)) add('Unknown MSA topic');
			if (!Object.hasOwn(MSA_CLASSES, item.msa.wordClass)) add('Unknown MSA word class');
			if (item.msa.plural && item.msa.wordClass !== 'noun')
				add('Only noun entries can have a nominal plural');
			if (item.msa.feminine && item.msa.wordClass !== 'adjective') {
				add('Feminine adjective belongs to an adjective entry');
			}
			if (item.msa.attestation !== 'curated-draft') add('Unexpected MSA attestation status');
		}
	} else if (item.msa) add('MSA metadata outside the MSA collection');
	if (item.quranFrequency) {
		const freq = item.quranFrequency;
		if (item.collection !== 'quran') add('Only Qur’anic entries can carry Quran frequency');
		if (!Number.isSafeInteger(freq.occurrences) || freq.occurrences <= 0) {
			add('Quran frequency must be a positive verified integer');
		}
		if (!/^https:\/\/corpus\.quran\.com\//.test(freq.source)) {
			add('Quran frequency requires a Quranic Arabic Corpus source URL');
		}
	}
	return issues;
}

export function isPublishableVocab(item: VocabularyItem): boolean {
	return (
		item.reviewStatus === 'approved' &&
		item.sources.length > 0 &&
		validateVocab(item).length === 0 &&
		hasApprovingReview(item.reviews, REQUIRED_REVIEWER[item.collection])
	);
}
