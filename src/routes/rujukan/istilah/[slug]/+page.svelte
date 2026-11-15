<script lang="ts">
	import { resolve } from '$app/paths';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import MixedText from '#lib/components/learning/MixedText.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const term = $derived(data.term);
</script>

<div class="max-w-3xl space-y-8">
	<a
		href={resolve('rujukan/#istilah-dasar')}
		class="inline-flex min-h-11 items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
	>
		<ChevronLeft class="size-5" aria-hidden="true" /> Istilah dasar
	</a>

	<PageIntro title={term.title} description={term.definition} section="rujukan">
		{#snippet lead()}
			<ArabicText text={term.arabic} size="block" />
			<p>{term.definition}</p>
		{/snippet}
	</PageIntro>

	{#if term.note}
		<p class="rounded-xl bg-secondary p-4 text-secondary-foreground">
			<MixedText text={term.note} />
		</p>
	{/if}

	<section aria-labelledby="contoh" class="space-y-2">
		<h2 id="contoh" class="text-xl font-semibold">Contoh</h2>
		<ArabicText text={term.example.arabic} size="block" />
		<p class="font-medium">{term.example.meaning}</p>
		<p><MixedText text={term.example.explanation} /></p>
	</section>

	{#if term.illustration}
		<figure aria-labelledby="ilustrasi-istilah" class="space-y-3 border-y py-5">
			<figcaption id="ilustrasi-istilah" class="text-xl font-semibold">
				{term.illustration.heading}
			</figcaption>
			<ol dir="rtl" class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-3">
				{#each term.illustration.words as word (word.arabic)}
					<li dir="ltr" class="space-y-1 rounded-xl bg-secondary p-4 text-secondary-foreground">
						<ArabicText text={word.arabic} size="block" />
						<p class="font-medium">{word.meaning}</p>
						<dl class="mt-2 space-y-1 border-t pt-2">
							{#each word.labels as item (item.label)}
								<div class="flex flex-wrap gap-x-2">
									<dt class="font-semibold">{item.label}</dt>
									<dd>{item.value}</dd>
								</div>
							{/each}
						</dl>
					</li>
				{/each}
			</ol>
			<p>{term.illustration.explanation}</p>
		</figure>
	{/if}

	{#each term.details as section (section.heading)}
		<section class="space-y-2">
			<h2 class="text-xl font-semibold">{section.heading}</h2>
			<p><MixedText text={section.text} /></p>
		</section>
	{/each}

	<nav aria-label="Istilah dan pelajaran terkait" class="space-y-2 border-t pt-4">
		<h2 class="text-xl font-semibold">Baca juga</h2>
		<ul class="flex flex-wrap gap-x-6">
			{#each data.related as related (related.id)}
				<li>
					<a
						class="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
						href={resolve(`rujukan/istilah/${related.id}/`)}>{related.title}</a
					>
				</li>
			{/each}
			<li>
				<a
					class="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
					href={resolve('belajar/isim-fiil-harf/#bedah-kalimat')}>Kembali ke contoh pelajaran</a
				>
			</li>
		</ul>
	</nav>

	<details class="border-t text-base">
		<summary class="min-h-11 cursor-pointer py-3 font-medium">Rujukan</summary>
		<ul class="space-y-2">
			{#each term.references as reference (reference.href)}
				<li>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external reference URL -->
					<a href={reference.href} class="text-primary underline underline-offset-4"
						>{reference.label}</a
					>
				</li>
			{/each}
		</ul>
	</details>
</div>
