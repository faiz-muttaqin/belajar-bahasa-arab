<script lang="ts">
	import { resolve } from '$app/paths';
	import LessonList from '#lib/components/learning/LessonList.svelte';
	import ReferenceTable from '#lib/components/learning/ReferenceTable.svelte';
	import { harakatReference } from '#lib/content/harakat-reference.js';
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

<p class="mt-8 max-w-[65ch] text-muted-foreground">
	Butuh bantuan mengenali tanda baca?
	<a href="#bagan-harakat" class="font-medium text-primary underline">Lihat bagan harakat</a>
	setelah daftar pelajaran.
</p>

<LessonList track="iqra" lessons={data.lessons} />

<section
	id="bagan-harakat"
	aria-labelledby="bagan-harakat-heading"
	class="mt-16 scroll-mt-24 space-y-5"
>
	<div class="max-w-[65ch] space-y-2">
		<h2 id="bagan-harakat-heading" class="text-2xl font-semibold">Bagan harakat dan tanda baca</h2>
		<p class="text-muted-foreground">
			Bandingkan tanda pendek, sukun, tasydid, tanwin, dan vokal panjang. Sembunyikan kolom bunyi
			untuk menguji ingatan, lalu buka kembali jawabannya.
		</p>
	</div>
	<ReferenceTable table={harakatReference} />
	<p class="max-w-[70ch] text-sm text-muted-foreground">
		Contoh ini adalah latihan tulisan Arab, bukan kutipan ayat. Bunyi tanwin ditulis untuk bacaan
		sambung; cara berhenti dapat berbeda. Materi masih menunggu tinjauan pengajar.
	</p>
</section>

<a
	href={resolve('belajar/')}
	class="mt-8 inline-flex min-h-11 items-center font-medium text-primary underline"
>
	Sudah lancar membaca? Ke jalur utama
</a>
