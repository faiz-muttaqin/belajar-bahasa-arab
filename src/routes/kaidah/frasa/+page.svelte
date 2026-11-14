<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import PhraseGloss from '#lib/components/learning/PhraseGloss.svelte';
	import { IRAB_CASE_LABELS, phraseRules, type IrabCase } from '#lib/content/phrase-rules.js';

	const caseLegend: readonly IrabCase[] = ['raf', 'nasb', 'jarr'];
	const caseColor: Record<IrabCase, string> = {
		raf: 'bg-chart-2',
		nasb: 'bg-chart-3',
		jarr: 'bg-chart-4'
	};
</script>

<PageIntro
	title="Frasa dan i‘rab"
	section="kaidah"
	description="Nahwu frasa dan perubahan harakat akhir: ma‘rifah, nakirah, na‘at, idafah, jar–majrur, rafa, nasb, jarr, bentuk ganda dan jamak."
>
	{#snippet lead()}
		<p>
			Bandingkan bentuk yang hampir sama, baca fungsi dan akhir katanya, lalu lihat arti Indonesia
			tepat di bawah setiap kata Arab.
		</p>
	{/snippet}
</PageIntro>

<div class="mt-8 max-w-4xl space-y-4">
	<p class="text-muted-foreground">
		<strong>I‘rab</strong> adalah perubahan penanda pada akhir kata akibat fungsi dalam susunan. Di
		bawah ini warna membedakan <em>kasus i‘rab</em>, bukan jenis kata. Label teks tetap tersedia
		ketika warna tidak terlihat.
	</p>
	<div class="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Legenda i‘rab">
		{#each caseLegend as irab (irab)}
			<span class="inline-flex items-center gap-2">
				<span class="size-3 rounded-sm {caseColor[irab]}" aria-hidden="true"></span>
				{IRAB_CASE_LABELS[irab]}
			</span>
		{/each}
	</div>
	<nav aria-label="Pilih kaidah frasa" class="flex flex-wrap gap-2">
		{#each phraseRules as rule (rule.id)}
			<a
				href="#{rule.id}"
				class="inline-flex min-h-11 items-center rounded-full border bg-card px-4 text-sm font-semibold hover:border-primary hover:text-primary"
			>
				{rule.title}
			</a>
		{/each}
	</nav>
</div>

<div class="mt-12 max-w-5xl space-y-16">
	{#each phraseRules as rule, i (rule.id)}
		<section id={rule.id} class="scroll-mt-24 space-y-5" aria-labelledby="{rule.id}-title">
			<div class="flex flex-wrap items-center gap-3">
				<span class="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
					{i + 1} · Nahwu · draft
				</span>
				<ArabicText text={rule.arabicTerm} />
			</div>
			<h2 id="{rule.id}-title" class="text-2xl font-semibold">{rule.title}</h2>
			<p class="max-w-3xl">{rule.summary}</p>
			<p class="max-w-3xl text-muted-foreground">{rule.keyRule}</p>

			<div class="grid gap-4 lg:grid-cols-2">
				{#each rule.examples as example (example.id)}
					<PhraseGloss {example} />
				{/each}
			</div>
			<p class="max-w-3xl border-s-4 border-primary ps-4 text-sm">
				<strong>Batas kaidah:</strong>
				{rule.limitation}
			</p>

			<details class="max-w-3xl rounded-xl border bg-card p-4">
				<summary class="min-h-11 cursor-pointer font-semibold">
					Latihan · {rule.exercise.question}
				</summary>
				<div class="space-y-2 pt-3">
					<p class="font-semibold">{rule.exercise.answer}</p>
					<p class="text-sm text-muted-foreground">{rule.exercise.reason}</p>
				</div>
			</details>

			<details class="max-w-3xl">
				<summary class="min-h-11 cursor-pointer py-2 text-sm font-semibold text-primary">
					Rujukan kaidah
				</summary>
				<ul class="list-disc space-y-2 ps-5 text-sm">
					{#each rule.sources as source (source.url)}
						<li>
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external source -->
							<a href={source.url} class="break-words underline">{source.name}</a>
						</li>
					{/each}
				</ul>
			</details>
		</section>
	{/each}
</div>

<aside class="mt-9 max-w-4xl rounded-xl border bg-card p-5">
	<h2 class="text-lg font-semibold">Dari frasa menjadi kalimat</h2>
	<p class="mt-2 text-muted-foreground">
		Lihat bagaimana rafa‘, naṣb, dan jarr digunakan dalam kalimat nominal,
		verbal, negasi, dan pasif.
	</p>
	<a href={resolve('kaidah/kalimat/')} class="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline">
		Lanjutkan ke kalimat lengkap
	</a>
</aside>

<aside class="mt-14 max-w-4xl space-y-3 rounded-2xl border bg-card p-5">
	<h2 class="text-lg font-semibold">Hubungkan dengan materi sebelumnya</h2>
	<p class="text-muted-foreground">
		Frasa sifat dan idafah sudah diperkenalkan di G-01. Di sini tanda akhir kata diterangkan lebih
		lanjut; untuk perubahan bentuk fi‘il, gunakan G-02.
	</p>
	<nav
		aria-label="Kembali ke materi terkait"
		class="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"
	>
		<a href={resolve('kaidah/')} class="text-primary underline">Peta kaidah</a>
		<a href={resolve('kaidah/sharaf/')} class="text-primary underline">Perubahan kata (sharaf)</a>
		<a href={resolve('rujukan/isim/')} class="text-primary underline">Tabel isim dan sifat</a>
		<a href={resolve('belajar/')} class="text-primary underline">Pelajaran membaca</a>
	</nav>
</aside>
