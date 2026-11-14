<script lang="ts">
	import Eye from '@lucide/svelte/icons/eye';
	import type { Snippet } from 'svelte';
	import type { VocabularyItem } from '#lib/domain/vocabulary/types.js';
	import { vocabIcons } from './vocab-icons.js';
	import AudioPlayButton from './AudioPlayButton.svelte';

	/**
	 * One vocabulary item: association icon, the Arabic word large, and its meaning.
	 * In hafalan mode the meaning starts hidden and is revealed with a real button.
	 */
	let {
		item,
		hafalan = false,
		details
	}: { item: VocabularyItem; hafalan?: boolean; details?: Snippet } = $props();

	let shown = $state(false);
	let meaningVisible = $derived(!hafalan || shown);
	let Icon = $derived(item.icon ? vocabIcons[item.icon] : undefined);
</script>

<article class="flex h-full flex-col rounded-2xl border bg-card p-5">
	{#if item.collection === 'quran'}
		<p class="mb-2 text-xs font-medium text-muted-foreground">
			{#if item.quranFrequency}
				{item.quranFrequency.occurrences.toLocaleString('id-ID')}× dalam Al-Qur’an
				<span class="font-normal">({item.quranFrequency.basis === 'verb' ? 'lema fi’il' : 'lema'})</span>
			{:else}
				Frekuensi belum diverifikasi
			{/if}
		</p>
	{/if}
	{#if Icon && !hafalan}
		<span
			class="inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-primary"
		>
			<Icon class="size-6" aria-hidden="true" />
		</span>
	{/if}

	<div class="mt-4 flex items-start justify-between gap-2">
		<p lang="ar" dir="rtl" class="min-w-0 arabic-word">{item.arabic}</p>
		<AudioPlayButton text={item.arabic} label="Dengarkan kata Arab" compact />
	</div>

	<div class="mt-auto min-h-11 pt-3" aria-live="polite">
		{#if meaningVisible}
			{#if item.transliteration}
				<p class="mb-1 text-sm text-muted-foreground">{item.transliteration}</p>
			{/if}
			<p class="text-lg font-medium">{item.meaning}</p>
			{#if item.context}
				<p class="mt-1 text-sm text-pretty text-muted-foreground">{item.context}</p>
			{/if}
		{:else}
			<button
				type="button"
				onclick={() => (shown = true)}
				class="inline-flex min-h-11 items-center gap-2 rounded-md border border-dashed px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
			>
				<Eye class="size-4" aria-hidden="true" />
				Lihat arti
			</button>
		{/if}
	</div>
	{#if meaningVisible && details}
		<div class="mt-3 border-t pt-1">{@render details()}</div>
	{/if}
</article>
