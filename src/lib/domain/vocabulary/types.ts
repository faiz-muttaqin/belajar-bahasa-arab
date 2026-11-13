/**
 * Vocabulary content contract (no content here). Real items come from reviewed, sourced
 * curriculum research; see docs/arabic-learning-pedagogy-ux-research-reissued.md §6.1b.
 */
import type { ReviewStatus } from '#lib/domain/reference/table.js';

/** Collections shown on /kosakata/. Qur'anic/classical words are labelled separately (§3.3). */
export type VocabularyCollectionId = 'harian' | 'quran';

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

export type VocabularyItem = {
	id: string;
	collection: VocabularyCollectionId;
	register: 'msa' | 'classical';
	arabic: string;
	meaning: string;
	/** Optional association icon. Never the only carrier of meaning (text always shown). */
	icon?: VocabIconKey;
	reviewStatus: ReviewStatus;
	sources: string[];
	/** Free-text note on where learners meet the word, e.g. a shalat recitation. */
	context?: string;
};

export const COLLECTION_LABELS: Record<VocabularyCollectionId, string> = {
	harian: 'Kosakata harian',
	quran: "Al-Qur'an dan bacaan shalat"
};

export function isPublishableVocab(item: VocabularyItem): boolean {
	return (
		item.reviewStatus === 'approved' &&
		item.sources.length > 0 &&
		item.arabic.trim() !== '' &&
		item.meaning.trim() !== ''
	);
}
