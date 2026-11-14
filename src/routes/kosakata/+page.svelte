<script lang="ts">
	import type { Component } from 'svelte';
	import { resolve } from '$app/paths';
	import BookHeart from '@lucide/svelte/icons/book-heart';
	import Brain from '@lucide/svelte/icons/brain';
	import Sun from '@lucide/svelte/icons/sun';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import QuranVocabulary from '#lib/components/learning/QuranVocabulary.svelte';
	import VocabCard from '#lib/components/learning/VocabCard.svelte';
	import SpeechSettings from '#lib/components/learning/SpeechSettings.svelte';
	import { publishedVocabulary } from '#lib/content/vocabulary.js';
	import { type VocabularyCollectionId } from '#lib/domain/vocabulary/types.js';

	const collections: {
		id: VocabularyCollectionId;
		icon: Component;
		iconClass: string;
		title: string;
		blurb: string;
		lesson: 'belajar/kata-inti-shalat/' | 'belajar/menunjuk-dan-bertanya/';
	}[] = [
		{
			id: 'harian',
			icon: Sun,
			iconClass: 'text-chart-3',
			title: 'Kosakata harian',
			blurb: 'Kata benda, kata kerja, dan kata penghubung dari pelajaran.',
			lesson: 'belajar/menunjuk-dan-bertanya/'
		},
		{
			id: 'shalat',
			icon: BookHeart,
			iconClass: 'text-primary',
			title: 'Kosakata bacaan shalat',
			blurb: 'Makna kata yang muncul dalam takbir, tasbih, dan salam.',
			lesson: 'belajar/kata-inti-shalat/'
		}
	];

	let hafalan = $state(false);
</script>

<PageIntro
	title="Kosakata"
	section="kosakata"
	description="Kosakata bahasa Arab sehari-hari, bacaan shalat, dan Al-Qur’an menurut jenis kata, dengan glos bahasa Indonesia dan mode hafalan."
>
	{#snippet lead()}
		<p>Temukan arti kata yang muncul dalam bacaan dan coba ingat tanpa bantuan.</p>
	{/snippet}
</PageIntro>

<div class="mt-8"><SpeechSettings /></div>

<div class="mt-10">
	<a
		href="#al-quran"
		class="me-4 inline-flex min-h-11 items-center font-medium text-primary underline"
	>
		Kosakata Al-Qur’an
	</a>
	<a
		href={resolve('cari/?jenis=word')}
		class="me-4 inline-flex min-h-11 items-center font-medium text-primary underline"
		>Cari di kamus</a
	>
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
	<section
		id={collection.id === 'shalat' ? 'quran' : collection.id}
		class="mt-16 scroll-mt-24"
		aria-labelledby="{collection.id}-heading"
	>
		<div class="flex items-center gap-3">
			<span
				class="inline-flex size-10 items-center justify-center rounded-xl bg-secondary {collection.iconClass}"
			>
				<Icon class="size-5" aria-hidden="true" />
			</span>
			<h2 id="{collection.id}-heading" class="text-2xl font-semibold">
				{collection.title}
			</h2>
		</div>
		<p class="mt-3 max-w-[60ch] text-pretty text-muted-foreground">{collection.blurb}</p>

		<ul class="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))] gap-4">
			{#each items as item (item.id)}
				<li id={`kata-${item.id}`} class="scroll-mt-24">
					{#key hafalan}<VocabCard {item} {hafalan} />{/key}
				</li>
			{/each}
		</ul>
		<a
			href={resolve(collection.lesson)}
			class="mt-4 inline-flex min-h-11 items-center font-medium text-primary underline"
		>
			Lihat kata-kata ini dalam pelajaran
		</a>
	</section>
{/each}

<QuranVocabulary {hafalan} />
