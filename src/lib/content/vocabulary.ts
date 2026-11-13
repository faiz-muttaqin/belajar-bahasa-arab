/**
 * Published vocabulary. Empty until items are researched, sourced and reviewed by an Arabic
 * teacher (AGENTS.md; research doc §6.1b). Add items to `vocabulary`; only approved,
 * sourced ones are rendered.
 */
import {
	isPublishableVocab,
	type VocabularyCollectionId,
	type VocabularyItem
} from '#lib/domain/vocabulary/types.js';

const vocabulary: VocabularyItem[] = [];

export function publishedVocabulary(collection: VocabularyCollectionId): VocabularyItem[] {
	return vocabulary.filter((item) => item.collection === collection && isPublishableVocab(item));
}
