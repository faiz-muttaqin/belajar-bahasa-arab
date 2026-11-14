/**
 * Vocabulary content contract (no content here). Real items come from reviewed, sourced
 * curriculum research; see docs/arabic-learning-pedagogy-ux-research-reissued.md §6.1b and
 * docs/decisions/0004-content-decisions.md (D-6 icons, D-7 reviews).
 */
import type { ReviewStatus } from '#lib/domain/reference/table.js';
import { hasApprovingReview, type ReviewRecord, type ReviewerRole } from '#lib/domain/review.js';

/** Collections shown on /kosakata/. Qur'anic/classical words are labelled separately (§3.3). */
export type VocabularyCollectionId = 'harian' | 'quran' | 'shalat';

export const QURAN_GROUPS = {
	harf: 'Harf dan kata penghubung',
	rujukan: 'Isim rujukan dan keterangan',
	'fiil-ujar': 'Fi’il · Ucapan dan pengetahuan',
	'fiil-iman': 'Fi’il · Iman dan ibadah',
	'fiil-tindakan': 'Fi’il · Keadaan dan tindakan',
	isim: 'Isim · Benda, konsep, dan sifat'
} as const;

export type QuranGroup = keyof typeof QURAN_GROUPS;
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
	verbReference?: VerbReference;
};

export const COLLECTION_LABELS: Record<VocabularyCollectionId, string> = {
	harian: 'Kosakata harian',
	quran: 'Kosakata Al-Qur’an',
	shalat: 'Kosakata bacaan shalat'
};

/** D-7: who must approve items in each collection. */
export const REQUIRED_REVIEWER: Record<VocabularyCollectionId, ReviewerRole> = {
	harian: 'arabic_teacher',
	quran: 'ustadz',
	shalat: 'ustadz'
};

export type VocabIssue = { id: string; message: string };

export function validateVocab(item: VocabularyItem): VocabIssue[] {
	const issues: VocabIssue[] = [];
	const add = (message: string) => issues.push({ id: item.id, message });
	if (item.arabic.trim() === '') add('Empty Arabic text');
	if (item.meaning.trim() === '') add('Empty meaning');
	if (item.icon && item.concreteness !== 'concrete') add('Icon on a non-concrete word (D-6)');
	if (item.collection !== 'harian' && item.register !== 'classical') {
		add('Classical collections must use the classical register label');
	}
	if (
		item.collection === 'quran' &&
		(!item.quranGroup || !item.quranOccurrence || !item.transliteration)
	) {
		add('Qur’anic items require a group, a transliteration and an ayah witness');
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
