<script lang="ts">
	import { onMount } from 'svelte';
	import InlineCuratedExamplePicker from './InlineCuratedExamplePicker.svelte';
	import {
		canEditInlineExample,
		canEditInlineSlot,
		resolveInlineGrammarExample
	} from '#lib/domain/grammar/inline-curated-examples.js';
	import type { GrammarExample, GrammarRole } from '#lib/content/grammar-rules.js';
	import { GRAMMAR_ROLE_LABELS } from '#lib/content/grammar-rules.js';

	let { example }: { example: GrammarExample } = $props();
	let selectedId = $state<string | null>(null);
	let activeId = $derived(selectedId ?? example.id);
	let hydrated = $state(false);
	let notice = $state('');
	let current = $derived(resolveInlineGrammarExample(example.id, activeId) ?? example);
	let editable = $derived(canEditInlineExample('grammar', example.id));

	onMount(() => {
		hydrated = true;
	});

	function select(id: string) {
		if (!resolveInlineGrammarExample(example.id, id)) return;
		selectedId = id;
		notice =
			id === example.id
				? 'Contoh awal dipilih kembali.'
				: 'Pasangan contoh diperbarui bersama agar susunan dan harakat tetap sesuai.';
	}

	function reset() {
		selectedId = null;
		notice = 'Contoh dikembalikan ke bentuk awal.';
	}

	// Colour is redundant with the explicit grammatical role. These use the site's
	// configurable chart colours and stay visible in dark mode and without JS.
	const roleColors: Record<GrammarRole, string> = {
		manut: 'border-chart-2/50 bg-chart-2/10',
		nat: 'border-chart-4/50 bg-chart-4/10',
		mubtada: 'border-chart-2/50 bg-chart-2/10',
		khabar: 'border-chart-3/50 bg-chart-3/10',
		mudaf: 'border-chart-2/50 bg-chart-2/10',
		'mudaf-ilaih': 'border-chart-1/50 bg-chart-1/10'
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
		aria-label="Contoh kata Arab, arti per kata, dan peran nahwu"
	>
		{#each current.tokens as token, i (`${example.id}-${i}`)}
			<div
				class="flex max-w-full min-w-0 flex-col items-center gap-1 rounded-xl border px-3 py-2 text-center {roleColors[
					token.role
				]}"
				data-role={token.role}
			>
				<span lang="ar" dir="rtl" class="arabic-block! text-2xl! sm:text-3xl!">
					{token.arabic}
				</span>
				<span lang="id" dir="ltr" class="text-sm font-semibold text-foreground">
					{token.gloss}
				</span>
				<span lang="id" dir="ltr" class="max-w-40 text-xs text-muted-foreground">
					{GRAMMAR_ROLE_LABELS[token.role]}
				</span>
				{#if editable && canEditInlineSlot('grammar', example.id, i)}
					<InlineCuratedExamplePicker
						source="grammar"
						originalId={example.id}
						selectedId={activeId}
						tokenIndex={i}
						roleLabel={GRAMMAR_ROLE_LABELS[token.role]}
						onSelect={select}
					/>
				{/if}
			</div>
		{/each}
	</div>
	<figcaption class="mt-4 space-y-1 border-t pt-3">
		<p class="font-medium" data-inline-translation>{current.translation}</p>
		<p class="text-sm text-muted-foreground">{current.note}</p>
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
