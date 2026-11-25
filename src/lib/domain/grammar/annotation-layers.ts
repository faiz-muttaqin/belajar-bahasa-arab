/**
 * VP-02: the three explanation layers of the word-role explorer and their colour mapping.
 *
 * The learner sees one layer at a time. A layer turns each token into one category with a text
 * label; colour is only an extra cue on top of that label (WCAG 1.4.1). Swatches use the
 * theme's chart tokens mixed into the page background, so a custom theme keeps working; the
 * contrast of every mix is checked in `annotation-layers.spec.ts` for the default theme.
 */
import {
	ROLE_LABELS,
	ROLE_MEANINGS,
	SHARAF_KIND_LABELS,
	WORD_CLASS_LABELS,
	type AnnotatedSentence,
	type AnnotatedToken,
	type RoleId,
	type SharafKind,
	type WordClass
} from './annotation.js';

export type AnnotationLayer = 'wordClass' | 'role' | 'sharaf';

export const LAYER_ORDER: readonly AnnotationLayer[] = ['wordClass', 'role', 'sharaf'];

export const LAYER_LABELS: Record<AnnotationLayer, string> = {
	wordClass: 'Jenis kata',
	role: 'Peran dalam kalimat',
	sharaf: 'Bentuk sharaf'
};

export const LAYER_HELP: Record<AnnotationLayer, string> = {
	wordClass: 'Isim, fi‘il atau harf. Ini jenis kata, bukan tugasnya di kalimat.',
	role: 'Tugas kata di kalimat menurut nahwu, misalnya mubtada’, khabar atau fā‘il.',
	sharaf: 'Bentuk kata menurut sharaf. Bentuk tidak otomatis menentukan peran.'
};

export type Swatch = 'blue' | 'teal' | 'amber' | 'violet' | 'coral' | 'grey';

/** Theme tokens (without the `--`) each swatch is mixed from. */
export const SWATCH_TOKEN: Record<
	Swatch,
	'chart-1' | 'chart-2' | 'chart-3' | 'chart-4' | 'chart-5' | 'muted-foreground'
> = {
	blue: 'chart-2',
	teal: 'chart-1',
	amber: 'chart-3',
	violet: 'chart-4',
	coral: 'chart-5',
	grey: 'muted-foreground'
};

export const SWATCHES = Object.keys(SWATCH_TOKEN) as Swatch[];

/** Share of the swatch colour mixed into the background, per state and theme mode. */
export const TINT_PERCENT = {
	idle: { light: 18, dark: 18 },
	related: { light: 30, dark: 28 },
	selected: { light: 42, dark: 38 }
} as const;
export type TintState = keyof typeof TINT_PERCENT;

export type LayerCategory = { id: string; label: string; swatch: Swatch; meaning?: string };

const WORD_CLASS_SWATCH: Record<WordClass, Swatch> = { isim: 'blue', fiil: 'amber', harf: 'coral' };

const ROLE_SWATCH: Record<RoleId, Swatch> = {
	mubtada: 'blue',
	fail: 'blue',
	'naib-fail': 'blue',
	khabar: 'teal',
	fiil: 'teal',
	'maful-bih': 'amber',
	naat: 'violet',
	manut: 'violet',
	'harf-jar': 'coral',
	majrur: 'coral',
	mudhaf: 'grey',
	'mudhaf-ilaih': 'grey'
};

const SHARAF_SWATCH: Record<SharafKind, Swatch> = {
	'fiil-madhi-aktif': 'teal',
	'fiil-madhi-pasif': 'violet',
	'isim-fail': 'blue',
	'isim-maful': 'amber',
	'isim-alat': 'coral'
};

/** The category a token falls into on a layer, or null when the layer has nothing to say. */
export function layerCategory(token: AnnotatedToken, layer: AnnotationLayer): LayerCategory | null {
	switch (layer) {
		case 'wordClass':
			return {
				id: token.wordClass,
				label: WORD_CLASS_LABELS[token.wordClass],
				swatch: WORD_CLASS_SWATCH[token.wordClass]
			};
		case 'role':
			return {
				id: token.role,
				label: ROLE_LABELS[token.role],
				swatch: ROLE_SWATCH[token.role],
				meaning: ROLE_MEANINGS[token.role]
			};
		case 'sharaf':
			return token.sharaf
				? {
						id: token.sharaf.kind,
						label: SHARAF_KIND_LABELS[token.sharaf.kind],
						swatch: SHARAF_SWATCH[token.sharaf.kind]
					}
				: null;
	}
}

/** Layers with something to show for at least one token of the given sentences. */
export function availableLayers(sentences: readonly AnnotatedSentence[]): AnnotationLayer[] {
	return LAYER_ORDER.filter((layer) =>
		sentences.some((sentence) => sentence.tokens.some((token) => layerCategory(token, layer)))
	);
}

/** Distinct categories used by the sentences on a layer, in order of first appearance. */
export function layerCategories(
	sentences: readonly AnnotatedSentence[],
	layer: AnnotationLayer
): LayerCategory[] {
	const seen = new Map<string, LayerCategory>();
	for (const sentence of sentences) {
		for (const token of sentence.tokens) {
			const category = layerCategory(token, layer);
			if (category && !seen.has(category.id)) seen.set(category.id, category);
		}
	}
	return [...seen.values()];
}
