<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import MeaningPractice from '#lib/components/learning/MeaningPractice.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageIntro
	title="Bandingkan dua riwayat tasyahud"
	section="belajar"
	description="Latihan CB-02 untuk mengenali persamaan dan perbedaan makna pada tasyahud riwayat Ibnu Mas‘ud dan Ibnu Abbas."
>
	{#snippet lead()}
		<p>Bandingkan bagian pembuka dan syahadat kedua. Baca tiap cuplikan menurut riwayatnya.</p>
	{/snippet}
</PageIntro>

<p class="mt-5 max-w-[65ch] rounded-lg border bg-accent px-4 py-3 text-sm text-accent-foreground">
	Draf bersumber · menunggu tinjauan ustadz. Latihan ini menguji pemahaman makna kata dalam bacaan.
</p>

<nav aria-label="Navigasi latihan tasyahud" class="mt-4 flex flex-wrap gap-x-6">
	<a
		href={resolve('belajar/#branch-shalat-variants')}
		class="inline-flex min-h-11 items-center font-medium text-primary underline">Ke Peta Belajar</a
	>
	<a href="#latihan" class="inline-flex min-h-11 items-center font-medium text-primary underline">
		Langsung ke latihan
	</a>
</nav>

<section class="mt-8 space-y-4" aria-labelledby="bandingkan-heading">
	<h2 id="bandingkan-heading" class="text-2xl font-semibold">Bagian yang dibandingkan</h2>
	<p class="max-w-[65ch] text-pretty text-muted-foreground">
		Kedua pembuka dimulai dengan <ArabicText text="التَّحِيَّاتُ" />, “segala penghormatan”. Teks Arab
		yang ditonjolkan menunjukkan kata pembeda yang dibahas dalam latihan.
	</p>
	<div class="grid gap-4 md:grid-cols-2">
		{#each data.comparisons as variant (variant.id)}
			<article class="min-w-0 space-y-4 rounded-xl border bg-card p-4 sm:p-5">
				<h3 class="text-lg font-semibold">{variant.title}</h3>
				<div class="space-y-4">
					{#each variant.fragments as fragment (fragment.label)}
						<div class="space-y-2 rounded-lg bg-accent px-3 py-2 text-accent-foreground">
							<h4 class="text-sm font-semibold">{fragment.label}</h4>
							<p lang="ar" dir="rtl" class="arabic-block text-2xl leading-loose">
								{#each fragment.words as word, i (i)}
									{i > 0 ? ' ' : ''}<span
										class:font-bold={word.emphasized}
										class:text-primary={word.emphasized}>{word.arabic}</span
									>
								{/each}
							</p>
							<p class="text-pretty">{fragment.meaning}</p>
						</div>
					{/each}
				</div>
				<div class="flex flex-wrap gap-x-5">
					<a
						href={variant.source.href}
						rel="external"
						class="inline-flex min-h-11 items-center text-primary underline"
						>{variant.source.label}</a
					>
					<a
						href={resolve(`rujukan/bacaan-shalat/#${variant.id}`)}
						class="inline-flex min-h-11 items-center text-primary underline"
						>Lafaz lengkap dan glos</a
					>
				</div>
			</article>
		{/each}
	</div>
</section>

<section id="latihan" class="mt-10 scroll-mt-24 space-y-4" aria-labelledby="latihan-heading">
	<h2 id="latihan-heading" class="text-2xl font-semibold">Cek pemahaman</h2>
	<MeaningPractice questions={data.questions} />
</section>
