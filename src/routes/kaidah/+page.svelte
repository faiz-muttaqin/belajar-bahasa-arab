<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import GrammarExample from '#lib/components/learning/GrammarExample.svelte';
	import { grammarRules } from '#lib/content/grammar-rules.js';
</script>

<PageIntro
	title="Kaidah nahwu dan sharaf"
	section="kaidah"
	description="Pelajari kaidah susunan frasa dan kalimat Arab dengan penanda fungsi kata, glos Indonesia tepat di bawah teks Arab, dan latihan singkat."
>
	{#snippet lead()}
		<p>
			Mulai dari kata, lihat bagaimana susunannya mengubah makna. Setiap warna juga punya label
			fungsi kata.
		</p>
	{/snippet}
</PageIntro>

<div class="mt-8 max-w-4xl space-y-3">
	<p class="text-muted-foreground">
		Peta ini menghubungkan <strong>nahwu</strong> (fungsi kata dalam susunan) dengan
		<strong>sharaf</strong> (perubahan bentuk kata). Contoh di sini berstatus draft dan ditulis khusus
		untuk website; sumber kaidah dicantumkan di tiap topik.
	</p>
	<nav aria-label="Pilih kaidah" class="flex flex-wrap gap-2">
		{#each grammarRules as rule (rule.id)}
			<a
				href="#{rule.id}"
				class="inline-flex min-h-11 items-center rounded-full border bg-card px-4 text-sm font-semibold hover:border-primary hover:text-primary"
			>
				{rule.title}
			</a>
		{/each}
	</nav>
</div>

<aside class="mt-9 max-w-4xl rounded-xl border bg-card p-5">
	<h2 class="text-lg font-semibold">Baru: bagaimana kata berubah?</h2>
	<p class="mt-2 text-muted-foreground">
		Pelajari akar dan wazan, tashrif istilahi, serta tashrif lughawi dengan arti Indonesia tepat di
		bawah bentuk Arab.
	</p>
	<a
		href={resolve('kaidah/sharaf/')}
		class="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline"
	>
		Pelajari perubahan kata (sharaf)
	</a>
</aside>

<aside class="mt-6 max-w-4xl rounded-xl border bg-card p-5">
	<h2 class="text-lg font-semibold">Lanjut: frasa dan perubahan harakat akhir</h2>
	<p class="mt-2 text-muted-foreground">
		Kenali ma‘rifah dan nakirah, kesesuaian sifat, idafah, serta perubahan rafa‘–naṣb–jarr. Setiap
		kata Arab mempunyai glos Indonesia tepat di bawahnya.
	</p>
	<a
		href={resolve('kaidah/frasa/')}
		class="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline"
	>
		Pelajari frasa dan i‘rab
	</a>
</aside>

<aside class="mt-6 max-w-4xl rounded-xl border bg-card p-5">
	<h2 class="text-lg font-semibold">Berikutnya: bangun kalimat utuh</h2>
	<p class="mt-2 text-muted-foreground">
		Bandingkan kalimat nominal dan verbal, peran fā‘il–maf‘ūl, aktif–pasif,
		negasi, kāna, dan inna. Setiap contoh tetap mempunyai glos di bawah kata Arab.
	</p>
	<a href={resolve('kaidah/kalimat/')} class="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline">
		Pelajari susunan kalimat lengkap
	</a>
</aside>

<div class="mt-12 max-w-5xl space-y-16">
	{#each grammarRules as rule, i (rule.id)}
		<section id={rule.id} class="scroll-mt-24 space-y-5" aria-labelledby="{rule.id}-title">
			<div class="flex flex-wrap items-center gap-3">
				<span class="rounded-full border bg-secondary px-3 py-1 text-xs font-semibold">
					{i + 1} · {rule.kind === 'frasa' ? 'Frasa' : 'Kalimat lengkap'}
				</span>
				<ArabicText text={rule.arabicTerm} />
			</div>
			<h2 id="{rule.id}-title" class="text-2xl font-semibold">{rule.title}</h2>
			<p class="max-w-3xl">{rule.summary}</p>
			<p class="max-w-3xl text-muted-foreground">{rule.keyRule}</p>

			<div class="grid gap-4 lg:grid-cols-2">
				{#each rule.examples as example (example.id)}
					<GrammarExample {example} />
				{/each}
			</div>

			<p class="max-w-3xl border-s-4 border-primary ps-4 text-sm">{rule.contrast}</p>

			<details class="max-w-3xl rounded-xl border p-4">
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
					Sumber kaidah
				</summary>
				<ul class="list-disc space-y-2 ps-5 text-sm">
					{#each rule.sources as source (source.url)}
						<li>
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external bibliographic links -->
							<a href={source.url} class="break-words underline">{source.name}</a>
						</li>
					{/each}
				</ul>
			</details>
		</section>
	{/each}
</div>

<aside class="mt-16 max-w-3xl space-y-3 rounded-2xl border bg-card p-5">
	<h2 class="text-xl font-semibold">Lanjutkan ke materi terkait</h2>
	<p class="text-muted-foreground">
		Lihat bentuk kata dari tabel tashrif, cocokkan dengan kamus, lalu terapkan dalam pelajaran
		membaca yang sudah tersedia.
	</p>
	<nav aria-label="Materi terkait" class="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
		<a href={resolve('rujukan/fiil/')} class="text-primary underline">Tabel tashrif</a>
		<a href={resolve('rujukan/isim/')} class="text-primary underline">Pola isim</a>
		<a href={resolve('kosakata/')} class="text-primary underline">Kosakata</a>
		<a href={resolve('belajar/')} class="text-primary underline">Jalur belajar</a>
	</nav>
</aside>
