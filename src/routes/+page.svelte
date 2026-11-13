<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';

	// Learning cycle from the research doc (§1), shortened for the landing page.
	const steps = [
		{ title: 'Dengar', text: 'Mulai dari suara dan situasi, bukan dari daftar istilah.' },
		{ title: 'Pahami', text: 'Lihat tulisan berharakat dan tebak maknanya dari konteks.' },
		{
			title: 'Perhatikan polanya',
			text: 'Penjelasan singkat dalam bahasa Indonesia, baru istilahnya.'
		},
		{
			title: 'Ingat kembali',
			text: 'Latihan tanpa jawaban terlihat, dengan alasan di setiap umpan balik.'
		},
		{ title: 'Ulangi terjadwal', text: 'Yang perlu diulang muncul lagi beberapa hari kemudian.' }
	];
</script>

<PageIntro
	title="Belajar Bahasa Arab"
	heading="Bahasa Arab yang dipahami, bukan sekadar dihafal"
	description="Belajar bahasa Arab untuk penutur Indonesia: dengarkan, pahami artinya, lalu pelajari polanya. Tanpa akun, data belajar tersimpan di perangkat Anda."
>
	{#snippet lead()}
		<p>Dengarkan, pahami, lalu pelajari polanya.</p>
	{/snippet}
</PageIntro>

<div class="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
	<Button href={resolve('belajar/')} size="lg">Mulai belajar</Button>
	<a
		href={resolve('iqra/')}
		class="inline-flex min-h-11 items-center justify-center rounded-md font-medium text-primary underline decoration-1 underline-offset-4 hover:decoration-2 sm:justify-start"
	>
		Belum bisa baca tulisan Arab?
	</a>
</div>
<p class="mt-4 text-base text-muted-foreground">
	Tanpa akun. Data belajar disimpan di perangkat Anda, bukan di server.
</p>

{#if import.meta.env.DEV}
	{#await import('#lib/fixtures/HomePreview.svelte') then { default: HomePreview }}
		<HomePreview />
	{/await}
{/if}

<section class="mt-16 max-w-[65ch]" aria-labelledby="alur-heading">
	<h2 id="alur-heading" class="text-2xl font-semibold">Alur satu pelajaran</h2>
	<ol class="mt-6 space-y-5">
		{#each steps as step, i (step.title)}
			<li class="grid grid-cols-[2rem_1fr] gap-x-3">
				<span class="font-semibold text-primary tabular-nums" aria-hidden="true">{i + 1}.</span>
				<div>
					<p class="font-semibold">{step.title}</p>
					<p class="text-pretty text-muted-foreground">{step.text}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<section class="mt-16 max-w-[65ch]" aria-labelledby="jalur-heading">
	<h2 id="jalur-heading" class="text-2xl font-semibold">Pilih titik mulai</h2>
	<ul class="mt-6 divide-y border-y">
		<li>
			<a href={resolve('belajar/')} class="block rounded-md py-4 hover:bg-muted/50">
				<span class="block font-semibold">Saya sudah bisa membaca tulisan Arab</span>
				<span class="block text-pretty text-muted-foreground">
					Jalur utama: langsung belajar memahami kata dan kalimat.
				</span>
			</a>
		</li>
		<li>
			<a href={resolve('iqra/')} class="block rounded-md py-4 hover:bg-muted/50">
				<span class="block font-semibold">Saya ingin mulai dari huruf</span>
				<span class="block text-pretty text-muted-foreground">
					Jalur fondasi opsional: huruf, bunyi dan harakat.
				</span>
			</a>
		</li>
	</ul>
	<p class="mt-6 text-base text-pretty text-muted-foreground">
		Materi sedang disiapkan. Setiap contoh dan audio akan ditinjau guru bahasa Arab sebelum terbit.
	</p>
</section>
