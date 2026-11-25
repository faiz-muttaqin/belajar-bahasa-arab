<script lang="ts">
	import { onMount } from 'svelte';
	import InlineCuratedExamplePicker from './InlineCuratedExamplePicker.svelte';
	import type { SentenceExample, SentenceRole } from '#lib/content/sentence-rules.js';
	import { SENTENCE_ROLE_LABELS, VERB_MOOD_LABELS } from '#lib/content/sentence-rules.js';
	import { IRAB_CASE_LABELS } from '#lib/content/phrase-rules.js';
	import {
		canEditFrameExample,
		canEditFrameSlot,
		resolveFrameExample,
		searchFrameChoices
	} from '#lib/domain/grammar/sentence-clause-frames.js';

	let { example }: { example: SentenceExample } = $props();

	// D-05b: the card shows the curriculum example in the prerendered HTML. After hydration
	// a token with a sourced alternative gets a picker that swaps the WHOLE example.
	let selectedId = $state<string | null>(null);
	let activeId = $derived(selectedId ?? example.id);
	let hydrated = $state(false);
	let notice = $state('');
	let current = $derived(resolveFrameExample('sentence', example.id, activeId) ?? example);
	let editable = $derived(canEditFrameExample('sentence', example.id));

	onMount(() => {
		hydrated = true;
	});

	function select(id: string) {
		if (!resolveFrameExample('sentence', example.id, id)) return;
		selectedId = id;
		notice =
			id === example.id
				? 'Contoh awal dipilih kembali.'
				: 'Kalimat diganti sebagai satu unit; fi‘il, pelaku, objek, glos, i‘rab dan terjemahan ikut disesuaikan.';
	}

	function reset() {
		selectedId = null;
		notice = 'Contoh dikembalikan ke bentuk awal.';
	}

	// A grammatical role is visually different from another, but text labels are always shown.
	// Do NOT conflate the colors with noun case (i‘rab) or verb mood.
	const roleColor: Record<SentenceRole, string> = {
		topic: 'border-chart-2/50 bg-chart-2/10',
		predicate: 'border-chart-3/50 bg-chart-3/10',
		verb: 'border-chart-1/50 bg-chart-1/10',
		agent: 'border-chart-2/50 bg-chart-2/10',
		object: 'border-chart-5/50 bg-chart-5/10',
		deputy: 'border-chart-4/50 bg-chart-4/10',
		particle: 'border-border bg-secondary/70'
	};
</script>

<figure
	class="min-w-0 rounded-2xl border bg-card p-4 sm:p-5"
	data-inline-example={example.id}
	data-inline-selected={activeId}
>
	<div
		class="flex flex-wrap justify-start gap-3"
		dir="rtl"
		aria-label="Kalimat Arab dengan glos Indonesia, peran kata dan penanda i‘rab"
	>
		{#each current.tokens as token, i (example.id + '-' + i)}
			<div
				class="flex max-w-full min-w-0 flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center {roleColor[
					token.role
				]}"
				data-role={token.role}
				data-irab={token.irab ?? 'none'}
				data-mood={token.mood ?? 'none'}
			>
				<span lang="ar" dir="rtl" class="text-3xl leading-[1.9]">{token.arabic}</span>
				<span lang="id" dir="ltr" class="text-sm font-semibold">{token.gloss}</span>
				<span lang="id" dir="ltr" class="max-w-44 text-xs text-muted-foreground">
					{SENTENCE_ROLE_LABELS[token.role]} · {token.detail}
				</span>
				{#if token.irab}
					<span class="rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium">
						Isim · {IRAB_CASE_LABELS[token.irab]} ({token.marker})
					</span>
				{:else if token.mood}
					<span class="rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium">
						Fi‘il · {VERB_MOOD_LABELS[token.mood]} ({token.marker})
					</span>
				{/if}
				{#if editable && canEditFrameSlot('sentence', example.id, i)}
					<InlineCuratedExamplePicker
						selectedId={activeId}
						tokenIndex={i}
						roleLabel={SENTENCE_ROLE_LABELS[token.role]}
						search={(query) => searchFrameChoices('sentence', example.id, activeId, i, query)}
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
