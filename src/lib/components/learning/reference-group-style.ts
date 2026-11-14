import type { Component } from 'svelte';
import Activity from '@lucide/svelte/icons/activity';
import Box from '@lucide/svelte/icons/box';
import CircleHelp from '@lucide/svelte/icons/circle-help';
import Link from '@lucide/svelte/icons/link';
import type { ReferenceGroupId } from '#lib/content/reference-groups.js';

/** Icon and colour per word class, so each kind of word is recognisable at a glance. */
export const groupStyle: Record<ReferenceGroupId, { icon: Component; tint: string; bar: string }> =
	{
		fiil: { icon: Activity, tint: 'bg-chart-1/15 text-chart-1', bar: 'border-t-chart-1' },
		isim: { icon: Box, tint: 'bg-chart-2/15 text-chart-2', bar: 'border-t-chart-2' },
		harf: { icon: Link, tint: 'bg-chart-3/15 text-chart-3', bar: 'border-t-chart-3' },
		tanya: { icon: CircleHelp, tint: 'bg-chart-4/15 text-chart-4', bar: 'border-t-chart-4' }
	};
