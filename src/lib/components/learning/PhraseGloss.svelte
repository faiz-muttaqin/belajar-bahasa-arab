<script lang="ts">
	import { onMount } from 'svelte';
	import InlineCuratedExamplePicker from './InlineCuratedExamplePicker.svelte';
	import {
		canEditInlineExample,
		resolveInlinePhraseExample
	} from '#lib/domain/grammar/inline-curated-examples.js';
	import type { IrabCase, PhraseExample } from '#lib/content/phrase-rules.js';
	import { IRAB_CASE_LABELS } from '#lib/content/phrase-rules.js';

	let { example }: { example: PhraseExample } = $props();
	let selectedId = $state(example.id);
	let hydrated = $state(false);
	let notice = $state('');
	let current = $derived(resolveInlinePhraseExample(example.id, selectedId) ?? example);
	const editable = canEditInlineExample('phrase', example.id);

	onMount(() => {
		hydrated = true;
	});

	function select(id: string) {
		if (!resolveInlinePhraseExample(example.id, id)) return;
		selectedId = id;
		notice =
			id === example.id
				? 'Contoh awal dipilih kembali.'
				: 'Susunan contoh diperbarui sebagai satu unit; penanda i‘rab dan artinya ikut disesuaikan.';
	}

	function reset() {
		selectedId = example.id;
		notice = 'Contoh dikembalikan ke bentuk awal.';
	}

	// Colours indicate *case*, not word class or lexical meaning. Text labels remain visible.
	const caseTint: Record<IrabCase, string> = {
		raf: 'border-chart-2/50 bg-chart-2/10',
		nasb: 'border-chart-3/50 bg-chart-3/10',
		jarr: 'border-chart-4/50 bg-chart-4/10'
	};
</script>

<figure
	class="min-w-0 rounded-2xl border bg-card p-4 sm:p-5"
	data-inline-example={example.id}
	data-inline-selected={selectedId}
>
	<div
		class="flex flex-wrap justify-start gap-3"
		dir="rtl"
		aria-label="Susunan Arab dan terjemahan di bawah setiap kata, dengan label i‘rab"
	>
		{#each current.tokens as token, i (example.id + '-' + i)}
			<div
				data-irab={token.irab ?? 'none'}
				class="flex max-w-full min-w-0 flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center {token.irab
					? caseTint[token.irab]
					: 'border-border bg-secondary/50'}"
			>
				<span lang="ar" dir="rtl" class="text-3xl leading-[1.9]">{token.arabic}</span>
				<span lang="id" dir="ltr" class="text-sm font-semibold text-foreground">{token.gloss}</span>
				<span lang="id" dir="ltr" class="max-w-44 text-xs text-muted-foreground">{token.role}</span>
				{#if token.irab}
					<span class="rounded-md bg-background/70 px-2 py-0.5 text-xs font-semibold">
						{IRAB_CASE_LABELS[token.irab]} · {token.marker}
					</span>
				{/if}
				{#if editable}
					<InlineCuratedExamplePicker
						source="phrase"
						originalId={example.id}
						{selectedId}
						tokenIndex={i}
						roleLabel={token.role}
						onSelect={select}
					/>
				{/if}
			</div>
		{/each}
	</div>
	<figcaption class="mt-4 border-t pt-3">
		<p class="font-medium" data-inline-translation>{current.translation}</p>
		<p class="mt-1 text-sm text-muted-foreground">{current.explanation}</p>
		{#if editable && hydrated}
			<div class="flex flex-wrap items-center justify-between gap-3 pt-2">
				<p aria-live="polite" class="text-xs text-muted-foreground">{notice}</p>
				{#if selectedId !== example.id}
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
