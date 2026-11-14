import type { VocabularyItem } from './types.js';

export type QuranOrder = 'frequent' | 'rare' | 'alphabetical';

/**
 * Sort only within the curated Qur'anic vocabulary, not over all Arabic.
 * Unknown counts stay last for both frequency directions.
 */
export function sortQuranVocabulary(
	items: readonly VocabularyItem[],
	order: QuranOrder = 'frequent'
): VocabularyItem[] {
	return items
		.map((item, index) => ({ item, index }))
		.sort((a, b) => {
			if (order === 'alphabetical') {
				return a.item.arabic.localeCompare(b.item.arabic, 'ar') || a.index - b.index;
			}
			const left = a.item.quranFrequency?.occurrences;
			const right = b.item.quranFrequency?.occurrences;
			if (left === undefined) return right === undefined ? a.index - b.index : 1;
			if (right === undefined) return -1;
			return (order === 'frequent' ? right - left : left - right) || a.index - b.index;
		})
		.map(({ item }) => item);
}

export function verifiedFrequencyCount(items: readonly VocabularyItem[]): number {
	return items.filter((item) => item.quranFrequency !== undefined).length;
}
