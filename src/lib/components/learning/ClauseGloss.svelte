<script lang="ts">
	import { onMount } from 'svelte';
	import InlineCuratedExamplePicker from './InlineCuratedExamplePicker.svelte';
	import type { ClauseExample, ClauseSpanKind } from '#lib/content/clause-rules.js';
	import { CLAUSE_SPAN_LABELS } from '#lib/content/clause-rules.js';
	import { IRAB_CASE_LABELS } from '#lib/content/phrase-rules.js';
	import { VERB_MOOD_LABELS } from '#lib/content/sentence-rules.js';
	import {
		canEditFrameExample,
		canEditFrameSlot,
		resolveFrameExample,
		searchFrameChoices
	} from '#lib/domain/grammar/sentence-clause-frames.js';

	let { example }: { example: ClauseExample } = $props();

	// D-05c: same static-first model as G-04. The prerendered HTML is the curriculum example;
	// after hydration a token with a sourced alternative opens a picker that swaps the whole clause.
	let selectedId = $state<string | null>(null);
	let activeId = $derived(selectedId ?? example.id);
	let hydrated = $state(false);
	let notice = $state('');
	let current = $derived(resolveFrameExample('clause', example.id, activeId) ?? example);
	let editable = $derived(canEditFrameExample('clause', example.id));
	// Flat token index of the first token in each span, matching the registry's token order.
	let starts = $derived(
		current.spans.map((_, i) =>
			current.spans.slice(0, i).reduce((count, span) => count + span.tokens.length, 0)
		)
	);

	onMount(() => {
		hydrated = true;
	});

	function select(id: string) {
		if (!resolveFrameExample('clause', example.id, id)) return;
		selectedId = id;
		notice =
			id === example.id
				? 'Contoh awal dipilih kembali.'
				: 'Klausa diganti sebagai satu unit; fi‘il, pelaku, ṣilah, glos dan terjemahan ikut disesuaikan.';
	}

	function reset() {
		selectedId = null;
		notice = 'Contoh dikembalikan ke bentuk awal.';
	}

	// Colour marks CLAUSE FUNCTION only; role, noun case and verb mood stay explicit.
	const spanColors: Record<ClauseSpanKind, string> = {
		main: 'border-chart-2/50 bg-chart-2/10',
		link: 'border-chart-4/50 bg-chart-4/10',
		relative: 'border-chart-1/50 bg-chart-1/10',
		condition: 'border-chart-1/50 bg-chart-1/10',
		result: 'border-chart-3/50 bg-chart-3/10',
		reason: 'border-chart-3/50 bg-chart-3/10',
		contrast: 'border-chart-5/50 bg-chart-5/10',
		circumstance: 'border-chart-3/50 bg-chart-3/10',
		exception: 'border-chart-5/50 bg-chart-5/10',
		specification: 'border-chart-4/50 bg-chart-4/10'
	};
</script>

<figure
	class="min-w-0 rounded-2xl border bg-card p-4 sm:p-5"
	data-inline-example={example.id}
	data-inline-selected={activeId}
>
	<div
		dir="rtl"
		class="flex min-w-0 flex-wrap items-start justify-start gap-3"
		aria-label="Klausa berlabel, kata Arab dan glos Indonesia di bawah setiap kata"
	>
		{#each current.spans as span, spanIndex (example.id + '-' + span.id)}
			<section
				data-span={span.kind}
				class="flex max-w-full min-w-0 flex-col gap-3 rounded-xl border p-3 {spanColors[span.kind]}"
				aria-label={CLAUSE_SPAN_LABELS[span.kind]}
			>
				<div class="text-start" dir="ltr">
					<p class="text-xs font-semibold">{CLAUSE_SPAN_LABELS[span.kind]}</p>
					<p class="max-w-60 text-xs text-muted-foreground">{span.note}</p>
				</div>
				<div class="flex min-w-0 flex-wrap justify-start gap-2" dir="rtl">
					{#each span.tokens as token, i (span.id + '-' + i)}
						{@const flat = (starts[spanIndex] ?? 0) + i}
						<div
							class="flex max-w-full min-w-0 flex-col items-center gap-1 rounded-lg border border-border/70 bg-background/80 px-2 py-2 text-center"
							data-irab={token.irab ?? 'none'}
							data-mood={token.mood ?? 'none'}
						>
							<span lang="ar" dir="rtl" class="text-2xl leading-[2] sm:text-3xl">
								{token.arabic}
							</span>
							<span lang="id" dir="ltr" class="text-sm font-semibold">
								{token.gloss}
							</span>
							<span lang="id" dir="ltr" class="max-w-48 text-xs text-muted-foreground">
								{token.role}
							</span>
							{#if token.irab}
								<span class="max-w-48 text-xs font-medium" dir="ltr">
									Isim · {IRAB_CASE_LABELS[token.irab]} · {token.marker}
								</span>
							{:else if token.mood}
								<span class="max-w-48 text-xs font-medium" dir="ltr">
									Fi‘il · {VERB_MOOD_LABELS[token.mood]} · {token.marker}
								</span>
							{/if}
							{#if editable && canEditFrameSlot('clause', example.id, flat)}
								<InlineCuratedExamplePicker
									selectedId={activeId}
									tokenIndex={flat}
									roleLabel={token.role}
									search={(query) =>
										searchFrameChoices('clause', example.id, activeId, flat, query)}
									onSelect={select}
								/>
							{/if}
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
	<figcaption class="mt-4 border-t pt-3">
		<p class="font-medium" data-inline-translation>{current.translation}</p>
		<p class="mt-1 text-sm text-muted-foreground">{current.explanation}</p>
		{#if editable && hydrated}
			<div class="flex flex-wrap items-center justify-between gap-3 pt-2">
				<p aria-live="polite" class="text-xs text-muted-foreground">{notice}</p>
				{#if activeId !== example.id}
					<button
						type="button"
						class="min-h-11 rounded-lg border px-3 text-xs font-semibold hover:bg-secondary"
						onclick={reset}>Reset contoh</button
					>
				{/if}
			</div>
		{/if}
	</figcaption>
</figure>
