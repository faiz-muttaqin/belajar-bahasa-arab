<script lang="ts">
	import { resolve } from '$app/paths';
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

<a
	href={resolve('belajar/isim-fiil-harf/#bedah-kalimat')}
	class="mt-6 inline-flex min-h-11 items-center font-medium text-primary underline"
>
	Mulai dari isim, fi‘il, dan harf
</a>

<LessonList track="belajar" lessons={data.lessons} />

<a
	href={resolve('iqra/')}
	class="mt-8 inline-flex min-h-11 items-center font-medium text-primary underline"
>
	Perlu berlatih membaca huruf dan harakat?
</a>
