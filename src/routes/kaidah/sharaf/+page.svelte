<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import SharafForms from '#lib/components/learning/SharafForms.svelte';
	import { sharafSections } from '#lib/content/sharaf-lessons.js';
</script>

<PageIntro
	title="Perubahan kata: akar, wazan, dan tashrif"
	section="kaidah"
	description="Contoh sharaf berharakat dari akar ك ت ب: tashrif istilahi, tashrif lughawi, pasangan madhi–mudhari, dan arti Indonesia di bawah setiap bentuk."
>
	{#snippet lead()}
		<p>Kenali keluarga kata, lalu bedakan perubahan jenis kata dari perubahan akibat dhamir.</p>
	{/snippet}
</PageIntro>

<nav aria-label="Bagian kaidah sharaf" class="mt-8 flex flex-wrap gap-2">
	{#each sharafSections as section (section.id)}
		<a
			href="#{section.id}"
			class="inline-flex min-h-11 items-center rounded-full border bg-card px-4 text-sm font-semibold hover:border-primary hover:text-primary"
		>
			{section.title}
		</a>
	{/each}
</nav>

<div class="mt-10 max-w-5xl space-y-16">
	{#each sharafSections as section, i (section.id)}
		<section id={section.id} class="scroll-mt-24 space-y-5" aria-labelledby="{section.id}-title">
			<div class="flex items-center gap-3">
				<span class="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
					{i + 1} · Sharaf · draft
				</span>
			</div>
			<h2 id="{section.id}-title" class="text-2xl font-semibold">{section.title}</h2>
			<p class="max-w-3xl">{section.summary}</p>
			<p class="max-w-3xl text-muted-foreground">{section.rule}</p>

			<SharafForms forms={section.forms} />

			<p class="max-w-3xl border-s-4 border-primary ps-4 text-sm">
				<strong>Perhatikan:</strong> {section.note}
			</p>

			<details class="max-w-3xl rounded-xl border bg-card p-4">
				<summary class="min-h-11 cursor-pointer font-semibold">
					Latihan · {section.exercise.question}
				</summary>
				<div class="space-y-2 pt-3">
					<p class="font-semibold">{section.exercise.answer}</p>
					<p class="text-sm text-muted-foreground">{section.exercise.reason}</p>
				</div>
			</details>

			<details class="max-w-3xl">
				<summary class="min-h-11 cursor-pointer py-2 text-sm font-semibold text-primary">
					Sumber dan verifikasi
				</summary>
				<ul class="list-disc space-y-2 ps-5 text-sm">
					{#each section.sources as source (source.url)}
						<li>
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external evidence URLs -->
							<a href={source.url} class="break-words underline">{source.name}</a>
						</li>
					{/each}
				</ul>
			</details>
		</section>
	{/each}
</div>

<aside class="mt-14 max-w-4xl space-y-4 rounded-2xl border bg-card p-5">
	<h2 class="text-xl font-semibold">Lanjutkan ke 22 kelompok wazan</h2>
	<p class="text-muted-foreground">
		Contoh di atas memakai fi‘il tsulātsī mujarrad ṣaḥīḥ (كَتَبَ) agar prinsipnya mudah
		dibandingkan. Verba mu‘tal, mahmūz, muḍā‘af, serta pola mazīd mempunyai perubahan tambahan.
		Jangan menghasilkan semua bentuk hanya dari tiga huruf akar tanpa kamus dan pemeriksaan.
	</p>
	<nav aria-label="Rujukan lanjutan" class="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
		<a href={resolve('rujukan/fiil/')} class="text-primary underline">
			Lihat tabel 22 bab tashrif
		</a>
		<a href={resolve('sharaf/')} class="text-primary underline">
			Cari akar dan wazan di kamus
		</a>
		<a href={resolve('kaidah/')} class="text-primary underline">
			Kembali ke peta nahwu
		</a>
	</nav>
</aside>
