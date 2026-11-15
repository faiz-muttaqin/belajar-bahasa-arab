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
		<p class="rounded-xl bg-secondary p-4 text-secondary-foreground">{term.note}</p>
	{/if}

	<section aria-labelledby="contoh" class="space-y-2">
		<h2 id="contoh" class="text-xl font-semibold">Contoh</h2>
		<ArabicText text={term.example.arabic} size="block" />
		<p class="font-medium">{term.example.meaning}</p>
		<p><MixedText text={term.example.explanation} /></p>
	</section>

	{#if term.roles}
		<figure aria-labelledby="jenis-dan-tugas" class="space-y-3 border-y py-5">
			<figcaption id="jenis-dan-tugas" class="text-xl font-semibold">
				Jenis dan tugas kata
			</figcaption>
			<ol dir="rtl" class="grid gap-3 sm:grid-cols-2">
				{#each term.roles as word (word.arabic)}
					<li dir="ltr" class="space-y-1 rounded-xl bg-secondary p-4 text-secondary-foreground">
						<ArabicText text={word.arabic} size="block" />
						<p class="font-medium">{word.meaning}</p>
						<dl class="mt-2 space-y-1 border-t pt-2">
							<div class="flex flex-wrap gap-x-2">
								<dt class="font-semibold">Jenis kata</dt>
								<dd>{word.kind}</dd>
							</div>
							<div class="flex flex-wrap gap-x-2">
								<dt class="font-semibold">Tugas</dt>
								<dd>{word.role}</dd>
							</div>
						</dl>
					</li>
				{/each}
			</ol>
			<p>Kedua kata termasuk isim. Dalam jumlah ini, masing-masing punya tugas berbeda.</p>
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
