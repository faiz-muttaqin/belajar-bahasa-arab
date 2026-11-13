<script lang="ts">
	import type { Component } from 'svelte';
	import BookHeart from '@lucide/svelte/icons/book-heart';
	import Brain from '@lucide/svelte/icons/brain';
	import Sun from '@lucide/svelte/icons/sun';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import VocabCard from '#lib/components/learning/VocabCard.svelte';
	import { publishedVocabulary } from '#lib/content/vocabulary.js';
	import { COLLECTION_LABELS, type VocabularyCollectionId } from '#lib/domain/vocabulary/types.js';

	const collections: {
		id: VocabularyCollectionId;
		icon: Component;
		iconClass: string;
		blurb: string;
		empty: string;
	}[] = [
		{
			id: 'harian',
			icon: Sun,
			iconClass: 'text-chart-3',
			blurb: 'Benda dan kegiatan sehari-hari, masing-masing dengan ikon pengingat.',
			empty: 'Kata-kata harian sedang dipilih dan ditinjau.'
		},
		{
			id: 'quran',
			icon: BookHeart,
			iconClass: 'text-primary',
			blurb: 'Kata yang sering Anda dengar dalam Al-Qur’an dan bacaan shalat.',
			empty: 'Daftar kata sedang disusun dari sumber yang jelas dan ditinjau guru.'
		}
	];

	let hafalan = $state(false);
</script>

<PageIntro
	title="Kosakata"
	section="kosakata"
	description="Koleksi kosakata bahasa Arab untuk dihafal: kosakata harian dan kosakata Al-Qur'an serta bacaan shalat, dengan ikon pengingat dan arti."
>
	{#snippet lead()}
		<p>Dua koleksi untuk dihafal pelan-pelan: harian, serta Al-Qur’an dan bacaan shalat.</p>
	{/snippet}
</PageIntro>

<div class="mt-10">
	<button
		type="button"
		aria-pressed={hafalan}
		onclick={() => (hafalan = !hafalan)}
		class="inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-medium transition-colors aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
	>
		<Brain class="size-5" aria-hidden="true" />
		Mode hafalan: {hafalan ? 'arti disembunyikan' : 'mati'}
	</button>
</div>

{#each collections as collection (collection.id)}
	{@const Icon = collection.icon}
	{@const items = publishedVocabulary(collection.id)}
	<section id={collection.id} class="mt-16 scroll-mt-24" aria-labelledby="{collection.id}-heading">
		<div class="flex items-center gap-3">
			<span
				class="inline-flex size-10 items-center justify-center rounded-xl bg-secondary {collection.iconClass}"
			>
				<Icon class="size-5" aria-hidden="true" />
			</span>
			<h2 id="{collection.id}-heading" class="text-2xl font-semibold">
				{COLLECTION_LABELS[collection.id]}
			</h2>
		</div>
		<p class="mt-3 max-w-[60ch] text-pretty text-muted-foreground">{collection.blurb}</p>

		<div class="mt-6">
			{#if items.length > 0}
				<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each items as item (item.id)}
						<li>
							{#key hafalan}<VocabCard {item} {hafalan} />{/key}
						</li>
					{/each}
				</ul>
			{:else}
				<EmptyState title="Segera hadir">
					<p>{collection.empty}</p>
				</EmptyState>
			{/if}
		</div>

		{#if import.meta.env.DEV && collection.id === 'harian'}
			<div class="mt-8">
				{#await import('#lib/fixtures/VocabPreview.svelte') then { default: VocabPreview }}
					<VocabPreview {hafalan} />
				{/await}
			</div>
		{/if}
	</section>
{/each}
