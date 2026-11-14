<script lang="ts">
	import { resolve } from '$app/paths';
	import LessonList from '#lib/components/learning/LessonList.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageIntro
	title="Iqra (opsional)"
	section="iqra"
	heading="Mulai dari huruf"
	description="Jalur fondasi opsional untuk melatih bentuk huruf, harakat, vokal panjang, sukun, tasydid, dan tanwin dengan contoh asli."
>
	{#snippet lead()}
		<p>Latih membaca tulisan Arab berharakat sebelum masuk ke jalur utama.</p>
	{/snippet}
</PageIntro>

<LessonList track="iqra" lessons={data.lessons} />

<a
	href={resolve('belajar/')}
	class="mt-8 inline-flex min-h-11 items-center font-medium text-primary underline"
>
	Sudah lancar membaca? Ke jalur utama
</a>
