<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import ReferenceSubnav from '#lib/components/learning/ReferenceSubnav.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let total = $derived(data.babs.reduce((sum, bab) => sum + bab.count, 0));
	let families = $derived(
		[...new Set(data.babs.filter((bab) => bab.count > 0).map((bab) => bab.family))].map(
			(family) => ({
				family,
				babs: data.babs.filter((bab) => bab.count > 0 && bab.family === family)
			})
		)
	);
</script>

<PageIntro
	title="Daftar kata kerja per bab"
	section="rujukan"
	description="Ribuan kata kerja Arab dikelompokkan menurut 22 wazan tashrif, dengan transliterasi, mudhari, mashdar, dan arti, bersumber dari Wiktionary."
>
	{#snippet lead()}
		<p>
			{total.toLocaleString('id')} kata kerja, dikelompokkan menurut 22 wazan tashrif. Ketuk sebuah kata
			untuk melihat bentuk dan artinya.
		</p>
	{/snippet}
</PageIntro>

<div class="mt-8 space-y-8">
	<ReferenceSubnav current="fiil" />

	{#each families as { family, babs } (family || 'lain')}
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">{family || 'Belum diketahui'}</h2>
			<ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{#each babs as bab (bab.slug)}
					<li>
						<a
							href={resolve(`rujukan/fiil/kata-kerja/${bab.slug}/` as '/')}
							class="block h-full rounded-2xl border border-t-4 border-t-chart-1 bg-card p-5 transition-colors hover:bg-secondary"
						>
							<span class="block text-lg font-semibold">{bab.title}</span>
							{#if bab.madhi}
								<span class="mt-3 flex items-center justify-between gap-3">
									<ArabicText text={bab.madhi} class="text-2xl" />
									<ArabicText text={bab.mudhari} class="text-2xl" />
								</span>
							{/if}
							<span class="mt-3 block text-sm text-muted-foreground"
								>{bab.count.toLocaleString('id')} kata kerja</span
							>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}

	<p class="max-w-[65ch] text-muted-foreground">
		Tabel 22 wazan tetap ada di
		<a href={resolve('rujukan/fiil/')} class="font-medium text-primary underline"
			>halaman rujukan kata kerja</a
		> (tabel 22 wazan dengan contoh dan kaidah). Wiktionary tidak memuat Form XIV, jadi bentuk itu tidak
		ada di daftar ini.
	</p>
</div>
