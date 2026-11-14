<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import ClauseGloss from '#lib/components/learning/ClauseGloss.svelte';
	import { clauseRules } from '#lib/content/clause-rules.js';
</script>

<PageIntro
	title="Kalimat majemuk dan hubungan klausa"
	section="kaidah"
	description="Pelajari 'athaf, isim maushul dan shilah, syarat-jawab, sebab-akibat, kontras, hal, pengecualian, dan tamyiz dengan glos tiap kata."
>
	{#snippet lead()}
		<p>
			Satu kalimat dapat mempunyai beberapa bagian. Kenali batas klausa, fungsi penghubung, lalu
			periksa mengapa akhir kata atau fi‘il berubah.
		</p>
	{/snippet}
</PageIntro>

<div class="mt-8 max-w-4xl space-y-4">
	<p class="text-muted-foreground">
		Ini adalah tahap <strong>G-05</strong>. Tiap blok berwarna menandai
		<strong>bagian kalimat</strong>, bukan otomatis i‘rab kata-katanya. Glos Indonesia berada di
		bawah tiap token Arab, sedangkan label kecil menjelaskan perannya. Harakat, i‘rab isim, dan mood
		muḍāri‘ tetap harus dianalisis tersendiri.
	</p>
	<p class="text-sm text-muted-foreground">
		Tanda hubung وَ dan فَ ditulis melekat pada kata berikutnya sesuai ejaan Arab. Contoh dan
		penjelasan merupakan materi proyek yang masih berstatus draft.
	</p>
	<nav aria-label="Pilih jenis hubungan klausa" class="flex flex-wrap gap-2">
		{#each clauseRules as rule (rule.id)}
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
	{#each clauseRules as rule, i (rule.id)}
		<section id={rule.id} class="scroll-mt-24 space-y-5" aria-labelledby="{rule.id}-title">
			<div class="flex flex-wrap items-center gap-3">
				<span class="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
					{i + 1} · Klausa · draft
				</span>
				<ArabicText text={rule.arabicTerm} />
			</div>
			<h2 id="{rule.id}-title" class="text-2xl font-semibold">{rule.title}</h2>
			<p class="max-w-3xl">{rule.summary}</p>
			<p class="max-w-3xl text-muted-foreground">{rule.keyRule}</p>

			<div class="grid gap-4 lg:grid-cols-2">
				{#each rule.examples as example (example.id)}
					<ClauseGloss {example} />
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
					Sumber kaidah
				</summary>
				<ul class="list-disc space-y-2 ps-5 text-sm">
					{#each rule.sources as source (source.url)}
						<li>
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external references -->
							<a href={source.url} class="break-words underline">{source.name}</a>
						</li>
					{/each}
				</ul>
			</details>
		</section>
	{/each}
</div>

<aside class="mt-14 max-w-4xl space-y-3 rounded-2xl border bg-card p-5">
	<h2 class="text-lg font-semibold">Kembali ke prasyarat</h2>
	<p class="text-muted-foreground">
		Klausa yang tersambung terdiri dari kalimat dan frasa yang telah dipelajari. G-06
		memperkenalkan contoh dinamis dan latihan membaca paragraf dengan peta prasyarat.
	</p>
	<nav
		aria-label="Materi dasar terkait"
		class="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"
	>
		<a href={resolve('kaidah/')} class="text-primary underline">Peta kaidah</a>
		<a href={resolve('kaidah/praktik/')} class="text-primary underline">Praktik interaktif</a>
		<a href={resolve('kaidah/kalimat/')} class="text-primary underline">Kalimat lengkap</a>
		<a href={resolve('kaidah/frasa/')} class="text-primary underline">Frasa dan i‘rab</a>
		<a href={resolve('belajar/')} class="text-primary underline">Jalur belajar</a>
	</nav>
</aside>
