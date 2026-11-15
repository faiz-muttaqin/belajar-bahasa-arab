<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
	import LearningRoadmap from '#lib/components/learning/LearningRoadmap.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageIntro
	title="Peta belajar"
	section="belajar"
	description="Peta belajar bahasa Arab setelah Iqra: enam tahap dari makna kata hingga dokumen pendek, dengan pelajaran, tujuan, prasyarat dan sumber yang dapat dibuka."
>
	{#snippet lead()}
		<p>Dari kata yang akrab hingga membaca kalimat, paragraf, dan dokumen pendek.</p>
		<p class="text-base">Draf · bersumber, belum ditinjau ustadz.</p>
	{/snippet}
</PageIntro>

<div class="mt-6">
	<Button href={resolve(`belajar/${data.start.slug}/`)}>Mulai belajar</Button>
	<p class="mt-2 text-base text-muted-foreground">
		{data.map.mainLessons} pelajaran jalur utama · Mulai dari {data.start.title.toLowerCase()}.
	</p>
</div>

<LearningRoadmap map={data.map} />

<aside class="mt-8 space-y-2 border-t pt-6">
	<h2 class="text-lg font-semibold">Pendalaman</h2>
	<a
		href={resolve('belajar/isim-fiil-harf/#bedah-kalimat')}
		class="inline-flex min-h-11 items-center font-medium text-primary underline"
	>
		Bedah isim, fi‘il, dan harf
	</a>
</aside>

<a
	href={resolve('iqra/')}
	class="mt-8 inline-flex min-h-11 items-center font-medium text-primary underline"
>
	Perlu berlatih membaca huruf dan harakat?
</a>
