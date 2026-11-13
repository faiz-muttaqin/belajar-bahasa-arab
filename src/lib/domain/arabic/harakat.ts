/**
 * Arabic diacritics (harakat/tashkil) helpers. Pure functions: no DOM, no Svelte.
 *
 * Removing marks is a mechanical Unicode operation (for "with / without harakat" views and
 * search indexes). It never changes the base letters, so it cannot invent content.
 */

/**
 * Combining marks removed by `stripHarakat`: fathatan..sukun (U+064B-U+0652), maddah and
 * hamza marks above/below (U+0653-U+0655), and superscript (dagger) alif (U+0670).
 */
const HARAKAT = /[ً-ٰٕ]/g;

/** Tatweel (kashida), used as a neutral base when a mark is shown on its own. */
export const TATWEEL = 'ـ';

export function stripHarakat(text: string): string {
	return text.normalize('NFC').replace(HARAKAT, '');
}

export function hasHarakat(text: string): boolean {
	return /[ً-ٰٕ]/.test(text);
}

/** Show a single mark on a tatweel base, e.g. for a harakat chart (not on U+25CC). */
export function markOnTatweel(mark: string): string {
	return TATWEEL + mark;
}
