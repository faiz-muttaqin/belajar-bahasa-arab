<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let guide = $derived(data.guide);
</script>

<nav aria-label="Kembali ke tabel dan jenis kata" class="mb-6 flex flex-wrap gap-x-6 gap-y-2">
	<a
		href={resolve('rujukan/fiil/#tashrif-istilahi')}
		class="inline-flex min-h-11 items-center font-medium text-primary underline"
	>
		Kembali ke tabel 22 wazan
	</a>
	<a
		href={resolve(guide.group === 'isim' ? 'rujukan/istilah/isim/' : 'rujukan/istilah/fiil/')}
		class="inline-flex min-h-11 items-center font-medium text-primary underline"
	>
		Apa itu {guide.group === 'isim' ? 'isim' : 'fi‘il'}?
	</a>
</nav>

<div class="max-w-4xl space-y-10" data-morphology-guide={guide.key}>
	<PageIntro title={guide.title} section="rujukan" description={guide.summary}>
		{#snippet lead()}
			<ArabicText text={guide.arabic} size="block" />
			<p>
				Penjelasan ini berkaitan dengan kolom <strong>{guide.title}</strong> pada tabel 22 wazan.
			</p>
		{/snippet}
	</PageIntro>

	<section class="rounded-2xl border bg-card p-5 sm:p-6" aria-labelledby="mulai">
		<h2 id="mulai" class="text-xl font-semibold">Mulai dari pertanyaan ini</h2>
		<p class="mt-2 text-lg">{guide.question}</p>
		<p class="mt-3 border-s-4 border-primary ps-4">{guide.distinction}</p>
	</section>

	<nav aria-label="Bagian pembahasan" class="space-y-3">
		<h2 class="font-semibold">Dalam pembahasan ini</h2>
		<ol class="flex flex-wrap gap-2">
			<li>
				<a
					href="#contoh-bentuk"
					class="inline-flex min-h-11 items-center rounded-full border px-4 text-sm hover:bg-secondary"
					>Contoh berharakat</a
				>
			</li>
			{#each guide.sections as section, i (section.heading)}
				<li>
					<a
						href={'#pembahasan-' + (i + 1)}
						class="inline-flex min-h-11 items-center rounded-full border px-4 text-sm hover:bg-secondary"
						>{section.heading}</a
					>
				</li>
			{/each}
			<li>
				<a
					href="#kesalahan-umum"
					class="inline-flex min-h-11 items-center rounded-full border px-4 text-sm hover:bg-secondary"
					>Hindari kekeliruan</a
				>
			</li>
		</ol>
	</nav>

	<section id="contoh-bentuk" class="scroll-mt-24 space-y-4" aria-labelledby="contoh-judul">
		<h2 id="contoh-judul" class="text-2xl font-semibold">Contoh berharakat</h2>
		<p class="text-muted-foreground">
			Baca bentuknya, bandingkan arti, lalu perhatikan penjelasan. Contoh berstatus draf hingga
			ditashih pengajar.
		</p>
		<ol class="grid gap-4 sm:grid-cols-2">
			{#each guide.examples as example, i (example.arabic)}
				<li class="min-w-0 rounded-xl border bg-card p-5">
					<span class="text-xs font-semibold text-muted-foreground">Contoh {i + 1}</span>
					<div class="mt-3"><ArabicText text={example.arabic} size="block" /></div>
					<p class="mt-3 font-semibold">{example.gloss}</p>
					<p class="mt-2 text-sm text-muted-foreground">{example.observation}</p>
				</li>
			{/each}
		</ol>
	</section>

	{#each guide.sections as section, i (section.heading)}
		<section
			id={'pembahasan-' + (i + 1)}
			class="scroll-mt-24 space-y-2"
			aria-labelledby={'pembahasan-judul-' + (i + 1)}
		>
			<h2 id={'pembahasan-judul-' + (i + 1)} class="text-xl font-semibold">{section.heading}</h2>
			<p class="max-w-[75ch] leading-relaxed">{section.text}</p>
		</section>
	{/each}

	<section id="kesalahan-umum" class="scroll-mt-24 space-y-3" aria-labelledby="kesalahan-judul">
		<h2 id="kesalahan-judul" class="text-xl font-semibold">Hal yang perlu diwaspadai</h2>
		<ul class="list-disc space-y-2 ps-6">
			{#each guide.watchOut as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</section>

	<nav class="space-y-3 border-t pt-5" aria-label="Pelajaran bentuk terkait">
		<h2 class="text-xl font-semibold">Baca selanjutnya</h2>
		<ul class="flex flex-wrap gap-3">
			{#each data.related as item (item.key)}
				<li>
					<a
						href={resolve(`rujukan/bentuk/${item.key}/`)}
						class="inline-flex min-h-11 items-center rounded-lg border border-primary/30 px-4 font-medium text-primary hover:bg-secondary"
					>
						{item.title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<details class="rounded-xl border p-4">
		<summary class="min-h-11 cursor-pointer font-semibold"
			>Sumber untuk audit dan penjelasan lanjut</summary
		>
		<ul class="mt-3 list-disc space-y-3 ps-5">
			{#each guide.references as source (source.url)}
				<li>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external grammar source -->
					<a
						href={source.url}
						target="_blank"
						rel="noopener noreferrer"
						class="break-words text-primary underline">{source.label}</a
					>
				</li>
			{/each}
		</ul>
		<p class="mt-3 text-sm text-muted-foreground">
			Sumber mendukung kaidah umum; setiap contoh, arti dan pemakaian bentuk di sini masih
			memerlukan tinjauan pengajar bahasa Arab. Status: draf.
		</p>
	</details>
</div>
