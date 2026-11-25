<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import BookOpenCheck from '@lucide/svelte/icons/book-open-check';
	import CircleQuestionMark from '@lucide/svelte/icons/circle-question-mark';
	import CircleX from '@lucide/svelte/icons/circle-x';
	import Columns2 from '@lucide/svelte/icons/columns-2';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import Scale from '@lucide/svelte/icons/scale';
	import StickyNote from '@lucide/svelte/icons/sticky-note';
	import TriangleExclamationPoint from '@lucide/svelte/icons/triangle-exclamation-point';
	import Type from '@lucide/svelte/icons/type';
	import type { CalloutKind } from '#lib/domain/local-content/types.js';

	/**
	 * Quiet panel for a callout block: a tinted icon marker, the kind as a text label and the
	 * block's own title. The label is Indonesian interface text, isolated so it keeps its
	 * direction inside an Arabic (RTL) lesson. See docs/design/taste.md, "Layout".
	 */
	let { kind, title, children }: { kind: CalloutKind; title?: string; children: Snippet } =
		$props();

	const kinds: Record<CalloutKind, { label: string; icon: Component; tint: string }> = {
		rule: { label: 'Kaidah', icon: Scale, tint: 'text-primary' },
		note: { label: 'Catatan', icon: StickyNote, tint: 'text-chart-2' },
		tip: { label: 'Kiat', icon: Lightbulb, tint: 'text-chart-3' },
		warning: { label: 'Perhatian', icon: TriangleExclamationPoint, tint: 'text-chart-5' },
		mistake: { label: 'Kesalahan umum', icon: CircleX, tint: 'text-chart-5' },
		example: { label: 'Contoh', icon: BookOpenCheck, tint: 'text-primary' },
		quiz: { label: 'Uji diri', icon: CircleQuestionMark, tint: 'text-chart-4' },
		compare: { label: 'Perbandingan', icon: Columns2, tint: 'text-chart-2' },
		letters: { label: 'Huruf', icon: Type, tint: 'text-primary' }
	};

	let meta = $derived(kinds[kind]);
	let Icon = $derived(meta.icon);
</script>

<aside class="space-y-3 rounded-2xl border bg-card p-4 md:p-6" data-callout={kind}>
	<div class="flex items-center gap-3">
		<span
			class="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary {meta.tint}"
		>
			<Icon class="size-5" aria-hidden="true" />
		</span>
		<p class="text-base font-semibold">
			<bdi lang="id" class="font-sans">{meta.label}</bdi>{#if title}<span
					class="font-normal text-muted-foreground"
				>
					· {title}</span
				>{/if}
		</p>
	</div>
	<div class="min-w-0 space-y-3">{@render children()}</div>
</aside>
