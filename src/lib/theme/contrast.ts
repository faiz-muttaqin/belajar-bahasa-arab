// WCAG 2.2 AA contrast audit for a set of theme colours.
// Text pairs need 4.5:1 (SC 1.4.3); UI parts and graphics need 3:1 (SC 1.4.11).

import { contrastRatio } from './color.js';
import type { ColorToken, ColorTokens } from './tokens.js';

export type ContrastKind = 'text' | 'ui';

export type ContrastPair = {
	id: string;
	label: string;
	foreground: ColorToken;
	background: ColorToken;
	kind: ContrastKind;
};

export const CONTRAST_MINIMUM: Record<ContrastKind, number> = { text: 4.5, ui: 3 };

export const CONTRAST_PAIRS: ContrastPair[] = [
	{
		id: 'body',
		label: 'Teks utama',
		foreground: 'foreground',
		background: 'background',
		kind: 'text'
	},
	{
		id: 'card',
		label: 'Teks kartu',
		foreground: 'card-foreground',
		background: 'card',
		kind: 'text'
	},
	{
		id: 'popover',
		label: 'Teks popover',
		foreground: 'popover-foreground',
		background: 'popover',
		kind: 'text'
	},
	{
		id: 'muted-page',
		label: 'Teks redup di halaman',
		foreground: 'muted-foreground',
		background: 'background',
		kind: 'text'
	},
	{
		id: 'muted-muted',
		label: 'Teks redup di latar redup',
		foreground: 'muted-foreground',
		background: 'muted',
		kind: 'text'
	},
	{
		id: 'muted-card',
		label: 'Teks redup di kartu',
		foreground: 'muted-foreground',
		background: 'card',
		kind: 'text'
	},
	{
		id: 'primary',
		label: 'Tombol utama',
		foreground: 'primary-foreground',
		background: 'primary',
		kind: 'text'
	},
	{
		id: 'link',
		label: 'Tautan di halaman',
		foreground: 'primary',
		background: 'background',
		kind: 'text'
	},
	{
		id: 'secondary',
		label: 'Tombol sekunder',
		foreground: 'secondary-foreground',
		background: 'secondary',
		kind: 'text'
	},
	{
		id: 'accent',
		label: 'Sorotan',
		foreground: 'accent-foreground',
		background: 'accent',
		kind: 'text'
	},
	{
		id: 'destructive',
		label: 'Teks peringatan',
		foreground: 'destructive',
		background: 'background',
		kind: 'text'
	},
	{
		id: 'sidebar',
		label: 'Teks sidebar',
		foreground: 'sidebar-foreground',
		background: 'sidebar',
		kind: 'text'
	},
	{
		id: 'sidebar-primary',
		label: 'Utama di sidebar',
		foreground: 'sidebar-primary-foreground',
		background: 'sidebar-primary',
		kind: 'text'
	},
	{
		id: 'sidebar-accent',
		label: 'Sorotan sidebar',
		foreground: 'sidebar-accent-foreground',
		background: 'sidebar-accent',
		kind: 'text'
	},
	{ id: 'input', label: 'Garis isian', foreground: 'input', background: 'background', kind: 'ui' },
	{ id: 'ring', label: 'Cincin fokus', foreground: 'ring', background: 'background', kind: 'ui' },
	{ id: 'chart-1', label: 'Grafik 1', foreground: 'chart-1', background: 'background', kind: 'ui' },
	{ id: 'chart-2', label: 'Grafik 2', foreground: 'chart-2', background: 'background', kind: 'ui' },
	{ id: 'chart-3', label: 'Grafik 3', foreground: 'chart-3', background: 'background', kind: 'ui' },
	{ id: 'chart-4', label: 'Grafik 4', foreground: 'chart-4', background: 'background', kind: 'ui' },
	{ id: 'chart-5', label: 'Grafik 5', foreground: 'chart-5', background: 'background', kind: 'ui' }
];

export type ContrastResult = ContrastPair & {
	ratio: number | null;
	minimum: number;
	passes: boolean;
};

export function auditContrast(colors: ColorTokens, pairs = CONTRAST_PAIRS): ContrastResult[] {
	return pairs.map((pair) => {
		const ratio = contrastRatio(colors[pair.foreground], colors[pair.background]);
		const minimum = CONTRAST_MINIMUM[pair.kind];
		return { ...pair, ratio, minimum, passes: ratio !== null && ratio >= minimum };
	});
}

/** Rounds down so a value shown as passing is never actually below the minimum. */
export const formatRatio = (ratio: number | null) =>
	ratio === null ? 'tidak terbaca' : `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;
