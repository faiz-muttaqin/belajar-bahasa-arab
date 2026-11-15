<script lang="ts">
	import { resolve } from '$app/paths';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import MixedText from '#lib/components/learning/MixedText.svelte';
	import { wordClassGuides } from '#lib/content/word-class-guides.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const term = $derived(data.term);
	let classification = $derived(
		term.id === 'isim'
			? wordClassGuides.isim
			: term.id === 'fiil'
				? wordClassGuides.fiil
				: undefined
	);
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

	{#if classification}
		<section
			id="peta-jenis"
			class="scroll-mt-24 space-y-6 border-t pt-7"
			aria-labelledby="peta-jenis-title"
			data-classification={classification.id}
		>
			<div class="space-y-2">
				<h2 id="peta-jenis-title" class="text-2xl font-semibold">
					Jenis-jenis {classification.id === 'isim' ? 'isim' : 'fi‘il'} secara lebih lengkap
				</h2>
				<p class="leading-relaxed">{classification.lead}</p>
				<p class="border-s-4 border-primary ps-4 text-sm text-muted-foreground">
					{classification.warning}
				</p>
			</div>
			<nav aria-label="Kelompok pembahasan" class="flex flex-wrap gap-2">
				{#each classification.axes as axis (axis.id)}
					<a
						href={'#' + axis.id}
						class="inline-flex min-h-11 items-center rounded-full border px-3 py-2 text-sm font-medium hover:bg-secondary"
						>{axis.heading}</a
					>
				{/each}
			</nav>
			{#each classification.axes as axis (axis.id)}
				<section id={axis.id} class="scroll-mt-24 space-y-4" aria-labelledby={axis.id + '-heading'}>
					<h3 id={axis.id + '-heading'} class="text-xl font-semibold">{axis.heading}</h3>
					<p class="text-muted-foreground">{axis.intro}</p>
					<ul class="grid gap-3 sm:grid-cols-2">
						{#each axis.entries as item (item.title)}
							<li class="min-w-0 space-y-2 rounded-xl border bg-card p-4">
								<h4 class="font-semibold">{item.title}</h4>
								<ArabicText text={item.arabic} size="block" />
								<p class="font-medium">{item.meaning}</p>
								<p class="text-sm leading-relaxed text-muted-foreground">{item.explanation}</p>
								{#if item.form}
									<a
										href={resolve(`rujukan/bentuk/${item.form}/`)}
										class="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4"
										>Pelajari bentuk ini lebih lanjut</a
									>
								{/if}
							</li>
						{/each}
					</ul>
					{#if axis.note}<p class="rounded-xl bg-secondary p-4 text-sm text-secondary-foreground">
							{axis.note}
						</p>{/if}
				</section>
			{/each}
			<details class="rounded-xl border p-4">
				<summary class="min-h-11 cursor-pointer font-semibold"
					>Rujukan klasifikasi tambahan · status draf</summary
				>
				<ul class="mt-3 list-disc space-y-2 ps-5">
					{#each classification.references as source (source.url)}
						<li>
							<!-- eslint-disable svelte/no-navigation-without-resolve -- external academic/grammar references -->
							<a
								href={source.url}
								class="break-words text-primary underline"
								target="_blank"
								rel="noopener noreferrer">{source.label}</a
							>
						</li>
					{/each}
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				</ul>
				<p class="mt-3 text-sm text-muted-foreground">
					Contoh asli untuk situs ini, tetapi belum mendapat tashih pengajar bahasa Arab.
				</p>
			</details>
		</section>
	{/if}

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
