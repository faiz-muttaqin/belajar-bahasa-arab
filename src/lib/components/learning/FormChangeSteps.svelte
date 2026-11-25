<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { annotatedText, type AnnotatedSentence } from '#lib/domain/grammar/annotation.js';
	import { SWATCH_TOKEN, TINT_PERCENT } from '#lib/domain/grammar/annotation-layers.js';
	import {
		STEP_MARK_LABELS,
		stepAnnouncement,
		type ResolvedChange,
		type ResolvedSequence,
		type ResolvedStep,
		type StepMark
	} from '#lib/domain/grammar/change-steps.js';
	import ArabicText from './ArabicText.svelte';
	import MixedText from './MixedText.svelte';

	/**
	 * VP-03: the learner moves through the changes between two annotated sentences, one step at a
	 * time. Nothing plays by itself and nothing loops. The Arabic stays in two fixed rows (before
	 * and after) and a step only marks words by background colour plus a written label, so
	 * harakat are never covered and letters never move. The full list of steps is plain HTML in a
	 * `details`, so it also works without JavaScript.
	 */
	let {
		sequence,
		heading = 'Lihat perubahan langkah demi langkah'
	}: { sequence: ResolvedSequence; heading?: string } = $props();

	const uid = $props.id();

	let hydrated = $state(false);
	/** 0 = not started; otherwise the 1-based step number. */
	let current = $state(0);
	let announcement = $state('');
	let nextButton: HTMLButtonElement | undefined = $state();
	let repeatButton: HTMLButtonElement | undefined = $state();

	const total = $derived(sequence.steps.length);
	const step = $derived<ResolvedStep | undefined>(sequence.steps[current - 1]);

	const usageLabels = {
		'independent-original': 'Contoh dan penjelasan ditulis sendiri oleh proyek',
		adaptation: 'Adaptasi dari sumber',
		verbatim: 'Kutipan utuh dari sumber'
	} as const;

	const markSwatch: Record<StepMark, string | null> = {
		changing: SWATCH_TOKEN.amber,
		dependent: SWATCH_TOKEN.blue,
		stays: null
	};

	// Both theme modes are written here; the `.dark` class picks one (same scheme as VP-02).
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

	async function go(next: number, focus: 'next' | 'repeat') {
		const target = sequence.steps[next - 1];
		if (!target) return;
		current = next;
		announcement = stepAnnouncement(target, total);
		await tick();
		(focus === 'next' ? nextButton : repeatButton)?.focus();
	}

	const start = () => go(1, 'next');
	const forward = () => go(Math.min(current + 1, total), current + 1 >= total ? 'repeat' : 'next');
	const back = () => go(Math.max(current - 1, 1), 'next');
	const repeat = () => go(1, 'next');

	const markOf = (side: 'before' | 'after', id: string): StepMark | undefined =>
		step?.marks[side][id];

	function swatchStyle(mark: StepMark | undefined): string | undefined {
		const token = mark && markSwatch[mark];
		return token ? `--fcs-swatch: var(--${token})` : undefined;
	}

	const tintState = (mark: StepMark | undefined) =>
		mark === 'changing' ? 'selected' : mark === 'dependent' ? 'related' : 'none';

	const ROW_LABEL = { before: 'Sebelum', after: 'Sesudah' } as const;
</script>

{#snippet word(change: ResolvedChange)}
	<span class="inline-flex flex-wrap items-baseline gap-x-2" data-fcs-change={change.aspect}>
		{#if change.before}
			<ArabicText text={change.before.text} class="font-semibold" />
		{:else}
			<span class="text-muted-foreground">(belum ada)</span>
		{/if}
		<span aria-hidden="true">→</span><span class="sr-only">menjadi</span>
		{#if change.after}
			<ArabicText text={change.after.text} class="font-semibold" />
		{:else}
			<span class="text-muted-foreground">(tidak disebut)</span>
		{/if}
	</span>
{/snippet}

{#snippet changeItem(change: ResolvedChange)}
	<li class="space-y-1">
		<p>
			<span class="font-semibold">{change.aspectLabel}</span> ·
			{@render word(change)}
		</p>
		{#if change.aspect === 'role' && change.before && change.after}
			<p class="text-muted-foreground">
				Peran: {change.before.roleLabel} → {change.after.roleLabel}
			</p>
		{/if}
		<p class="text-muted-foreground"><MixedText text={change.summary} /></p>
	</li>
{/snippet}

{#snippet stepBody(item: ResolvedStep)}
	<div class="space-y-3">
		<ul class="space-y-3">
			{#each item.changes as change, c (c)}
				{@render changeItem(change)}
			{/each}
		</ul>
		<p>
			<span class="font-semibold">Alasan</span> · <MixedText text={item.reason} />
		</p>
		{#if item.dependents.length}
			<div>
				<p class="font-semibold">Kata lain yang ikut berubah</p>
				<ul class="mt-1 space-y-3" data-fcs-dependents>
					{#each item.dependents as change, c (c)}
						{@render changeItem(change)}
					{/each}
				</ul>
			</div>
		{/if}
		{#if item.stays.length}
			<div>
				<p class="font-semibold">Kata yang tetap</p>
				<ul class="mt-1 list-disc space-y-1 ps-5 text-muted-foreground" data-fcs-stays>
					{#each item.stays as stay (stay.before.id)}
						<li><MixedText text={stay.note} /></li>
					{/each}
				</ul>
			</div>
		{/if}
		<p class="text-sm text-muted-foreground">
			Sumber:
			{#each item.sources as source, s (source.label + source.locator)}
				{#if s > 0};
				{/if}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external source -->
				<a href={source.url} class="break-words underline">{source.label}</a>
				· {source.locator}
			{/each}
		</p>
	</div>
{/snippet}

{#snippet row(side: 'before' | 'after', sentence: AnnotatedSentence)}
	<div
		role="group"
		aria-label="{ROW_LABEL[side]}: {annotatedText(sentence)}"
		class="space-y-2"
		data-fcs-row={side}
	>
		<p class="text-sm font-semibold text-muted-foreground">{ROW_LABEL[side]}</p>
		<ol
			class="flex flex-wrap justify-start gap-x-5 gap-y-3"
			dir="rtl"
			role="list"
			aria-label="Kata dalam urutan baca, dari kanan ke kiri"
		>
			{#each sentence.tokens as token (token.id)}
				{@const mark = markOf(side, token.id)}
				<li
					class="flex max-w-full min-w-0 flex-col items-center gap-1 text-center"
					data-token={token.id}
				>
					<span
						lang="ar"
						dir="rtl"
						class="fcs-word arabic-word"
						data-mark={mark ?? 'none'}
						data-tint={tintState(mark)}
						style={swatchStyle(mark)}>{token.text}</span
					>
					<span lang="id" dir="ltr" class="flex flex-col items-center text-sm">
						<span class="font-semibold">{token.gloss}</span>
						{#if mark}
							<span class="font-semibold text-primary" data-fcs-mark>{STEP_MARK_LABELS[mark]}</span>
						{/if}
					</span>
				</li>
			{/each}
		</ol>
		<p><span class="font-semibold">Terjemahan</span> · {sentence.translation}</p>
	</div>
{/snippet}

<section
	aria-labelledby="{uid}-heading"
	class="fcs-root space-y-4 rounded-2xl border bg-card p-4 sm:p-5"
	style={tintVars}
	data-form-change-steps={sequence.id}
	data-step={current}
>
	<div class="space-y-1">
		<h3 id="{uid}-heading" class="text-lg font-semibold">{heading}</h3>
		<p class="font-semibold">{sequence.title}</p>
		<p class="text-pretty text-muted-foreground">{sequence.intro}</p>
	</div>

	<div class="space-y-5">
		{@render row('before', sequence.before)}
		{@render row('after', sequence.after)}
	</div>

	{#if hydrated}
		<div class="flex flex-wrap items-center gap-2" data-fcs-controls>
			{#if current === 0}
				<button type="button" class="fcs-button fcs-primary" onclick={start}>
					Lihat perubahan
				</button>
			{:else}
				<button type="button" class="fcs-button" onclick={back} disabled={current <= 1}>
					Sebelumnya
				</button>
				<button
					type="button"
					class="fcs-button fcs-primary"
					onclick={forward}
					disabled={current >= total}
					bind:this={nextButton}
				>
					Berikutnya
				</button>
				<button
					type="button"
					class="fcs-button"
					onclick={repeat}
					disabled={current <= 1}
					bind:this={repeatButton}
				>
					Ulangi
				</button>
				<p class="ms-1 text-sm text-muted-foreground" data-fcs-progress>
					Langkah {current} dari {total}
				</p>
			{/if}
		</div>

		{#if step}
			{#key current}
				<div
					class="fcs-step space-y-3 rounded-xl border bg-secondary/40 p-4 text-start"
					role="region"
					aria-label="Langkah {step.number} dari {total}"
					data-fcs-step={step.number}
				>
					<h4 class="text-lg font-semibold">
						<span class="text-muted-foreground">Langkah {step.number}.</span>
						<MixedText text={step.title} />
					</h4>
					{@render stepBody(step)}
				</div>
			{/key}
		{:else}
			<p class="text-sm text-muted-foreground">
				Tekan “Lihat perubahan” untuk membaca satu perubahan sekaligus beserta alasannya. Tidak ada
				yang berjalan sendiri.
			</p>
		{/if}
	{/if}

	<p class="sr-only" aria-live="polite" data-fcs-announcement>{announcement}</p>

	<!-- Plain HTML list: all steps and reasons stay readable without JavaScript. -->
	<details class="rounded-xl border px-4" data-fcs-details={sequence.id}>
		<summary class="min-h-11 cursor-pointer py-3 font-semibold text-primary">
			Semua langkah perubahan sebagai daftar
		</summary>
		<div class="space-y-4 border-t pt-4 pb-4">
			<ol class="divide-y rounded-lg border">
				{#each sequence.steps as item (item.id)}
					<li class="space-y-2 px-3 py-3 sm:px-4" data-fcs-list-step={item.number}>
						<p class="font-semibold"><MixedText text={item.title} /></p>
						{@render stepBody(item)}
					</li>
				{/each}
			</ol>
			<p class="text-muted-foreground">
				Status: <strong class="text-foreground">draf</strong>, belum ditinjau ustadz.
				{usageLabels[sequence.usageType]}.
			</p>
			<p class="text-muted-foreground">
				<strong class="text-foreground">Batas bukti:</strong>
				{sequence.limits}
			</p>
		</div>
	</details>
</section>

<style>
	.fcs-root {
		--wr-idle: var(--wr-idle-light);
		--wr-related: var(--wr-related-light);
		--wr-selected: var(--wr-selected-light);
	}
	:global(.dark) .fcs-root {
		--wr-idle: var(--wr-idle-dark);
		--wr-related: var(--wr-related-dark);
		--wr-selected: var(--wr-selected-dark);
	}

	/*
	 * Marking = colour or background only. No padding, border, margin, weight or direction change,
	 * so letters keep joining and harakat keep their place (taste.md, Arabic typography). Every mark
	 * is also written as text under the word.
	 */
	.fcs-word {
		display: inline;
		color: var(--foreground);
		background-color: transparent;
	}
	.fcs-word[data-mark='stays'] {
		background-color: var(--muted);
	}
	.fcs-word[data-tint='selected'] {
		background-color: color-mix(in srgb, var(--fcs-swatch) var(--wr-selected), var(--card));
	}
	.fcs-word[data-tint='related'] {
		background-color: color-mix(in srgb, var(--fcs-swatch) var(--wr-related), var(--card));
	}

	.fcs-button {
		display: inline-flex;
		min-height: 2.75rem;
		align-items: center;
		border-radius: var(--radius-lg, 0.5rem);
		border: 1px solid var(--border);
		background-color: var(--card);
		padding-inline: 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
	}
	.fcs-button:hover:not(:disabled) {
		background-color: var(--secondary);
	}
	.fcs-button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
	.fcs-button:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 2px;
	}
	.fcs-primary {
		border-color: var(--primary);
		background-color: var(--primary);
		color: var(--primary-foreground);
	}
	.fcs-primary:hover:not(:disabled) {
		background-color: color-mix(in srgb, var(--primary) 90%, var(--foreground));
	}

	/* Short, one-off transitions only; none when the learner asks for reduced motion. */
	@media (prefers-reduced-motion: no-preference) {
		.fcs-word {
			transition: background-color 160ms ease-out;
		}
		.fcs-step {
			animation: fcs-in 180ms ease-out both;
		}
	}
	@keyframes fcs-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
