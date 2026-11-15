<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
	import LessonList from '#lib/components/learning/LessonList.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageIntro
	title="Belajar"
	section="belajar"
	description="Belajar memahami bahasa Arab setelah Iqra, mulai dari makna kata dan pola kalimat hingga gagasan utama dan struktur dokumen."
>
	{#snippet lead()}
		<p>Dari kata yang akrab hingga membaca kalimat, paragraf, dan dokumen pendek.</p>
	{/snippet}
</PageIntro>

<div class="mt-6">
	<Button href={resolve(`belajar/${data.start.slug}/`)}>Mulai belajar</Button>
	<p class="mt-2 text-base text-muted-foreground">{data.start.title}</p>
</div>

<LessonList track="belajar" lessons={data.lessons} />

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
