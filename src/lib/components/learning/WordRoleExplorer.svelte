<script lang="ts">
	import { onMount } from 'svelte';
	import {
		annotatedText,
		relatedTokenIds,
		type AnnotatedSentence
	} from '#lib/domain/grammar/annotation.js';
	import {
		availableLayers,
		layerCategories,
		layerCategory,
		LAYER_HELP,
		LAYER_LABELS,
		SWATCH_TOKEN,
		TINT_PERCENT,
		type AnnotationLayer
	} from '#lib/domain/grammar/annotation-layers.js';
	import WordRoleDetails from './WordRoleDetails.svelte';
	import WordRolePanel from './WordRolePanel.svelte';
	import { roleColourPrefs } from './word-role-prefs.svelte.js';

	let {
		sentences,
		initialLayer = 'role',
		heading = 'Jelajahi peran tiap kata'
	}: {
		sentences: readonly AnnotatedSentence[];
		initialLayer?: AnnotationLayer;
		heading?: string;
	} = $props();

	const uid = $props.id();

	let hydrated = $state(false);
	let chosen = $state<AnnotationLayer | null>(null);
	let selected = $state<{ sentenceId: string; tokenId: string } | null>(null);
	let root: HTMLElement | undefined = $state();
	const wordEls: Record<string, HTMLButtonElement | undefined> = $state({});
	let announcement = $state('');

	const layers = $derived(availableLayers(sentences));
	const layer = $derived<AnnotationLayer>(
		chosen && layers.includes(chosen)
			? chosen
			: layers.includes(initialLayer)
				? initialLayer
				: (layers[0] ?? 'wordClass')
	);
	const legend = $derived(layerCategories(sentences, layer));
	const colourOn = $derived(!roleColourPrefs.noColour);

	// Both theme modes are written here; layout rules pick one with the `.dark` class.
	const tintVars = (
		Object.entries(TINT_PERCENT) as [keyof typeof TINT_PERCENT, { light: number; dark: number }][]
	)
		.flatMap(([state, value]) => [
			`--wr-${state}-light:${value.light}%`,
			`--wr-${state}-dark:${value.dark}%`
		])
		.join(';');

	onMount(() => {
		hydrated = true;
	});

	function toggle(sentence: AnnotatedSentence, tokenId: string) {
		if (selected?.tokenId === tokenId) {
			selected = null;
			announcement = '';
			return;
		}
		selected = { sentenceId: sentence.id, tokenId };
		const token = sentence.tokens.find((item) => item.id === tokenId);
		const category = token && layerCategory(token, layer);
		announcement = token
			? `${token.text}, ${token.gloss}. ${LAYER_LABELS[layer]}: ${category?.label ?? 'tidak ada catatan'}. Penjelasan terbuka di bawah kalimat.`
			: '';
	}

	/** Closes the panel and puts focus back on the word it was opened from. */
	function close() {
		const id = selected?.tokenId;
		selected = null;
		announcement = '';
		if (id) wordEls[id]?.focus();
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape' || !selected || !root?.contains(document.activeElement)) return;
		event.preventDefault();
		close();
	}
</script>

<svelte:window onkeydown={onWindowKeydown} />

<section
	bind:this={root}
	aria-labelledby="{uid}-heading"
	class="wr-root space-y-4 rounded-2xl border bg-card p-4 sm:p-5"
	style={tintVars}
	data-word-role-explorer
	data-layer={layer}
	data-colour={colourOn ? 'on' : 'off'}
>
	<h3 id="{uid}-heading" class="text-lg font-semibold">{heading}</h3>

	{#if hydrated}
		<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
			<fieldset class="min-w-0">
				<legend class="mb-2 text-sm font-semibold text-muted-foreground">Lapisan penjelasan</legend>
				<div class="flex flex-wrap gap-2">
					{#each layers as option (option)}
						<label
							class="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border bg-background px-4 text-sm font-semibold has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
						>
							<input
								type="radio"
								class="sr-only"
								name="{uid}-layer"
								value={option}
								checked={layer === option}
								onchange={() => (chosen = option)}
							/>
							{LAYER_LABELS[option]}
						</label>
					{/each}
				</div>
			</fieldset>
			<label class="inline-flex min-h-11 items-center gap-3 text-sm font-medium">
				<input
					type="checkbox"
					class="size-5 accent-primary"
					bind:checked={roleColourPrefs.noColour}
				/>
				Tanpa warna peran
			</label>
		</div>

		<p class="text-sm text-muted-foreground">{LAYER_HELP[layer]}</p>

		<ul
			aria-label="Legenda {LAYER_LABELS[layer]}"
			class="flex flex-wrap gap-x-5 gap-y-2 text-sm"
			data-wr-legend
		>
			{#each legend as category (category.id)}
				<li class="inline-flex items-center gap-2">
					{#if colourOn}
						<span
							class="wr-dot"
							style="--wr-swatch: var(--{SWATCH_TOKEN[category.swatch]})"
							aria-hidden="true"
						></span>
					{/if}
					<span class="font-semibold">{category.label}</span>
					{#if category.meaning}<span class="text-muted-foreground">· {category.meaning}</span>{/if}
				</li>
			{/each}
		</ul>
		<p class="text-sm text-muted-foreground">
			Ketuk atau tekan kata untuk membuka penjelasannya. Warna hanya pelengkap; label tertulis
			selalu tampil.
		</p>
	{/if}

	<p class="sr-only" aria-live="polite" data-wr-announcement>{announcement}</p>

	<div class="space-y-6">
		{#each sentences as sentence (sentence.id)}
			{@const picked =
				selected?.sentenceId === sentence.id
					? sentence.tokens.find((item) => item.id === selected?.tokenId)
					: undefined}
			{@const related = picked ? relatedTokenIds(sentence, picked.id) : []}
			{@const panelId = `${uid}-${sentence.id}-panel`}
			<div
				role="group"
				aria-label="Kalimat Arab: {annotatedText(sentence)}"
				class="space-y-3 border-t pt-4 first:border-t-0 first:pt-0"
				data-wr-sentence={sentence.id}
			>
				<ol
					class="flex flex-wrap justify-start gap-x-5 gap-y-3"
					dir="rtl"
					role="list"
					aria-label="Kata dalam urutan baca, dari kanan ke kiri"
				>
					{#each sentence.tokens as token (token.id)}
						{@const category = layerCategory(token, layer)}
						{@const isSelected = picked?.id === token.id}
						{@const isRelated = related.includes(token.id)}
						{@const tint = !category
							? 'none'
							: isSelected
								? 'selected'
								: isRelated
									? 'related'
									: 'idle'}
						{@const metaId = `${uid}-${token.id}-meta`}
						<li
							class="flex max-w-full min-w-0 flex-col items-center gap-1 text-center"
							data-token={token.id}
						>
							{#if hydrated}
								<button
									type="button"
									lang="ar"
									dir="rtl"
									class="wr-word arabic-word"
									data-tint={tint}
									data-state={isSelected ? 'selected' : isRelated ? 'related' : 'idle'}
									style={category
										? `--wr-swatch: var(--${SWATCH_TOKEN[category.swatch]})`
										: undefined}
									aria-expanded={isSelected}
									aria-controls={isSelected ? panelId : undefined}
									aria-describedby={metaId}
									bind:this={wordEls[token.id]}
									onclick={() => toggle(sentence, token.id)}>{token.text}</button
								>
							{:else}
								<span
									lang="ar"
									dir="rtl"
									class="wr-word arabic-word"
									data-tint={tint}
									style={category
										? `--wr-swatch: var(--${SWATCH_TOKEN[category.swatch]})`
										: undefined}>{token.text}</span
								>
							{/if}
							<span id={metaId} lang="id" dir="ltr" class="flex flex-col items-center text-sm">
								<span class="font-semibold">{token.gloss}</span>
								<span class="text-muted-foreground">{category?.label ?? 'Tanpa catatan'}</span>
								{#if isSelected}
									<span class="font-semibold text-primary">Dipilih</span>
								{:else if isRelated}
									<span class="font-semibold text-primary">Berhubungan</span>
								{/if}
							</span>
						</li>
					{/each}
				</ol>

				{#if picked}
					<WordRolePanel {sentence} token={picked} {layer} {panelId} onclose={close} />
				{/if}

				<p>
					<span class="font-semibold">Terjemahan</span> · {sentence.translation}
				</p>
				<WordRoleDetails {sentence} />
			</div>
		{/each}
	</div>
</section>

<style>
	.wr-root {
		--wr-idle: var(--wr-idle-light);
		--wr-related: var(--wr-related-light);
		--wr-selected: var(--wr-selected-light);
	}
	:global(.dark) .wr-root {
		--wr-idle: var(--wr-idle-dark);
		--wr-related: var(--wr-related-dark);
		--wr-selected: var(--wr-selected-dark);
	}

	/*
	 * Highlight = colour or background only. No padding, border, margin, weight or direction
	 * change, so letters keep joining and harakat keep their place (taste.md, Arabic typography).
	 */
	.wr-word {
		display: inline;
		color: var(--foreground);
		background-color: transparent;
		cursor: pointer;
	}
	span.wr-word {
		cursor: default;
	}
	.wr-root[data-colour='on'] .wr-word[data-tint='idle'] {
		background-color: color-mix(in srgb, var(--wr-swatch) var(--wr-idle), var(--card));
	}
	.wr-root[data-colour='on'] .wr-word[data-tint='related'] {
		background-color: color-mix(in srgb, var(--wr-swatch) var(--wr-related), var(--card));
	}
	.wr-root[data-colour='on'] .wr-word[data-tint='selected'] {
		background-color: color-mix(in srgb, var(--wr-swatch) var(--wr-selected), var(--card));
	}
	/* Without role colour the state is still visible as a neutral background plus text. */
	.wr-root[data-colour='off'] .wr-word[data-state='related'] {
		background-color: var(--muted);
	}
	.wr-root[data-colour='off'] .wr-word[data-state='selected'] {
		background-color: var(--accent);
	}

	.wr-dot {
		display: inline-block;
		inline-size: 0.875rem;
		block-size: 0.875rem;
		border-radius: 9999px;
		background-color: var(--wr-swatch);
	}
</style>
