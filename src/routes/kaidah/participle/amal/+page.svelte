<script lang="ts">
	import { resolve } from '$app/paths';
	import MixedText from '#lib/components/learning/MixedText.svelte';
	import RuleMeta from '#lib/components/learning/RuleMeta.svelte';
	import { amalExamples, amalRules, amalSources, amalTasks } from '#lib/content/participle-amal.js';

	const kinds = {
		recognise: 'Kenali kata yang bekerja',
		case: 'I‘rab objek',
		contrast: 'Bandingkan susunan',
		limit: 'Batas pemakaian'
	} as const;
</script>

<svelte:head>
	<title>‘Amal isim fā‘il dan isim maf‘ūl · Belajar Bahasa Arab</title>
	<meta
		name="description"
		content="Pelajaran pendek: isim fā‘il dapat memberi objek manṣūb atau muḍāf ilaih, dan isim maf‘ūl dapat disusul nā’ib al-fā‘il. {amalExamples.length} contoh berharakat dan {amalTasks.length} latihan."
	/>
</svelte:head>

<main class="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6">
	<a
		href={resolve('kaidah/participle/')}
		class="inline-flex min-h-11 items-center font-medium text-primary underline"
		>Kembali ke isim fā‘il dan isim maf‘ūl</a
	>
	<header class="max-w-3xl space-y-3">
		<p class="text-sm font-semibold text-primary">G-02 · OER-02b · pendalaman sharaf</p>
		<h1 class="text-3xl font-bold">‘Amal isim fā‘il dan isim maf‘ūl</h1>
		<p>
			Isim fā‘il dan isim maf‘ūl adalah isim, tetapi masih dapat bekerja seperti fi‘il asalnya:
			memberi objek, atau disusul pengganti pelaku. Pelajari kapan itu terjadi dan kapan tidak, lalu
			periksa pada kalimat.
		</p>
		<p class="text-sm text-muted-foreground">
			Kalimat contoh dan latihan ditulis sendiri dan berstatus draf. Sumber mendukung pernyataan
			kaidah, bukan kalimatnya. Latihan ini cek mandiri tanpa skor.
		</p>
	</header>

	<section class="space-y-4" aria-labelledby="amal-rules-h">
		<h2 id="amal-rules-h" class="text-2xl font-semibold">{amalRules.length} kaidah untuk mulai</h2>
		<div class="grid gap-4 md:grid-cols-2">
			{#each amalRules as rule (rule.id)}
				{@const source = amalSources.find((item) => item.id === rule.sourceId)}
				<article id={rule.id} class="scroll-mt-24 space-y-2 rounded-xl border bg-card p-4">
					<h3 class="font-semibold">{rule.title}</h3>
					<p class="text-sm"><MixedText text={rule.text} /></p>
					<p class="text-sm text-muted-foreground">{rule.caution}</p>
					<RuleMeta ruleId={rule.id} prerequisites={rule.prerequisites} />
					{#if source}
						<!-- eslint-disable svelte/no-navigation-without-resolve -- external grammar reference -->
						<a
							href={source.url}
							class="inline-flex min-h-11 items-center text-sm text-primary underline"
							>Sumber: {source.title}</a
						>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					{/if}
				</article>
			{/each}
		</div>
		<details class="rounded-xl border p-4">
			<summary class="min-h-11 cursor-pointer py-2 font-semibold"
				>Sumber, lisensi dan batasnya</summary
			>
			<ul class="space-y-3">
				{#each amalSources as source (source.id)}
					<li class="text-sm">
						<!-- eslint-disable svelte/no-navigation-without-resolve -- external source attribution -->
						<a href={source.url} class="break-words text-primary underline">{source.title}</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
						<p>{source.license} · diperiksa {source.checked}</p>
						<p class="text-muted-foreground">{source.note}</p>
					</li>
				{/each}
			</ul>
		</details>
	</section>

	<section class="space-y-4" aria-labelledby="amal-examples-h">
		<h2 id="amal-examples-h" class="text-2xl font-semibold">
			{amalExamples.length} contoh berharakat
		</h2>
		<ol class="grid gap-4 md:grid-cols-2">
			{#each amalExamples as example (example.id)}
				<li
					id={example.id}
					data-rule={example.ruleId}
					class="min-w-0 space-y-2 rounded-xl border bg-card p-4"
				>
					<p lang="ar" dir="rtl" class="arabic-word text-right">{example.arabic}</p>
					<p class="font-medium">{example.translation}</p>
					<p class="text-sm"><MixedText text={example.explanation} /></p>
					<p class="text-xs text-muted-foreground">
						Kaidah <a href={'#' + example.ruleId} class="text-primary underline">{example.ruleId}</a
						> · Draf
					</p>
				</li>
			{/each}
		</ol>
	</section>

	<section id="latihan-amal" class="scroll-mt-24 space-y-4" aria-labelledby="amal-tasks-h">
		<h2 id="amal-tasks-h" class="text-2xl font-semibold">{amalTasks.length} latihan penerapan</h2>
		<p class="text-muted-foreground">Jawab dahulu sebelum membuka pembahasan.</p>
		<ol class="grid gap-4 md:grid-cols-2">
			{#each amalTasks as task, index (task.id)}
				<li
					id={task.id}
					data-rule={task.ruleId}
					class="min-w-0 space-y-3 rounded-xl border bg-card p-4"
				>
					<p class="text-xs font-semibold text-muted-foreground">
						{index + 1} dari {amalTasks.length} · {kinds[task.kind]} · Draf
					</p>
					<p lang="ar" dir="rtl" class="arabic-word text-right">{task.arabic}</p>
					<p><MixedText text={task.question} /></p>
					<details class="border-t pt-2">
						<summary class="min-h-11 cursor-pointer py-2 font-medium text-primary"
							>Lihat pembahasan</summary
						>
						<p class="mt-2"><MixedText text={task.answer} /></p>
						<p class="mt-2 text-xs text-muted-foreground">
							Kaidah <a href={'#' + task.ruleId} class="text-primary underline">{task.ruleId}</a>
						</p>
					</details>
				</li>
			{/each}
		</ol>
	</section>

	<aside class="max-w-3xl space-y-2 border-t pt-4">
		<h2 class="text-lg font-semibold">Batas pelajaran ini</h2>
		<p>
			Pelajaran ini pendek. Belum mencakup semua syarat klasik, shifah musyabbahah, dan kasus lain
			pada isim maf‘ūl. Teks artikel Wikipedia Arab yang dipakai tampak rusak pada beberapa bagian,
			dan kaidah nā’ib al-fā‘il dibaca sebagian dari ringkasan pemeriksa. Tinjauan pengajar dan uji
			pelajar masih terbuka.
		</p>
		<a
			href={resolve('kaidah/kalimat/')}
			class="inline-flex min-h-11 items-center text-primary underline"
			>Lihat kalimat dengan fā‘il dan nā’ib al-fā‘il</a
		>
		<a
			href={resolve('kaidah/participle/')}
			class="inline-flex min-h-11 items-center text-primary underline">Kembali ke isim fā‘il</a
		>
	</aside>
</main>
