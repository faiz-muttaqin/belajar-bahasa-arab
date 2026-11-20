<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		participleSources,
		participlePairs,
		participleRules,
		participleTasks
	} from '#lib/content/participle-lessons.js';

	const kinds = {
		formation: 'Bentuk kata',
		role: 'Fungsi sintaksis',
		agreement: 'I‘rab dan kesesuaian',
		meaning: 'Makna dalam konteks'
	} as const;
</script>

<svelte:head>
	<title>Isim fā‘il dan isim maf‘ūl · Belajar Bahasa Arab</title>
	<meta
		name="description"
		content="Enam pasangan bentuk aktif dan pasif dari kamus, termasuk Form I, II, IV, X dan ajwaf, dengan 24 latihan membaca bahasa Arab berharakat."
	/>
</svelte:head>

<main class="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6">
	<a
		href={resolve('kaidah/sharaf/')}
		class="inline-flex min-h-11 items-center font-medium text-primary underline"
		>Kembali ke sharaf</a
	>
	<header class="max-w-3xl space-y-3">
		<p class="text-sm font-semibold text-primary">G-02 · OER-02b · pendalaman sharaf</p>
		<h1 class="text-3xl font-bold">Isim fā‘il dan isim maf‘ūl</h1>
		<p>
			Kenali bentuk yang menyatakan pelaku dan yang dikenai perbuatan. Bedakan bentuk kata dari
			fungsi dalam kalimat, kemudian coba membaca pengumuman dan dokumen sederhana.
		</p>
		<p class="text-sm text-muted-foreground">
			Pasangan bentuk di bawah diperiksa pada tabel konjugasi Arab dalam kamus. Kalimat latihan
			ditulis mandiri dan masih draf; belum ada klaim bahwa seluruh contoh telah diaudit. Latihan
			adalah cek mandiri tanpa skor.
		</p>
	</header>
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Empat kaidah untuk mulai</h2>
		<div class="grid gap-4 md:grid-cols-2">
			{#each participleRules as rule (rule.title)}
				{@const source = participleSources.find((item) => item.id === rule.sourceId)}
				<article class="space-y-2 rounded-xl border bg-card p-4">
					<h3 class="font-semibold">{rule.title}</h3>
					<p class="text-sm">{rule.text}</p>
					{#if source}
						<!-- eslint-disable svelte/no-navigation-without-resolve -- external grammar reference -->
						<a href={source.url} class="text-sm text-primary underline">{source.title}</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					{/if}
				</article>
			{/each}
		</div>
		<details class="rounded-xl border p-4">
			<summary class="min-h-11 cursor-pointer font-semibold">Sumber, bagian dan lisensi</summary>
			<ul class="space-y-3">
				{#each participleSources as source (source.id)}
					<li class="text-sm">
						<!-- eslint-disable svelte/no-navigation-without-resolve -- external source attribution -->
						<a href={source.url} class="break-words text-primary underline">{source.title}</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
						<p>{source.author} · {source.license}</p>
						<p class="text-muted-foreground">{source.section}</p>
					</li>
				{/each}
			</ul>
		</details>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Enam pasangan bentuk dari kamus</h2>
		<p class="max-w-3xl text-muted-foreground">
			Bandingkan bentuk aktif dan pasif. Tanwin ḍammah dipakai sebagai bentuk contoh berdiri
			sendiri, bukan akhir kata yang tetap di semua kalimat. Bentuk-bentuk ini bukan hasil generator
			semua akar.
		</p>
		<ul class="grid gap-4 sm:grid-cols-2">
			{#each participlePairs as pair (pair.id)}
				<li id={'pair-' + pair.id} class="min-w-0 space-y-3 rounded-xl border bg-card p-4">
					<p class="text-sm text-muted-foreground">
						Form {pair.form} · <span lang="ar" dir="rtl">{pair.rootKind}</span>
					</p>
					<p lang="ar" dir="rtl" class="arabic-word text-right">{pair.verb} · {pair.present}</p>
					<p>{pair.meaning}</p>
					<div class="grid grid-cols-2 gap-2 border-t pt-3">
						<div class="min-w-0">
							<p class="text-xs font-semibold">Isim fā‘il</p>
							<p lang="ar" dir="rtl" class="arabic-word text-right">{pair.active}</p>
							<p class="text-sm">{pair.activeMeaning}</p>
						</div>
						<div class="min-w-0">
							<p class="text-xs font-semibold">Isim maf‘ūl</p>
							<p lang="ar" dir="rtl" class="arabic-word text-right">{pair.passive}</p>
							<p class="text-sm">{pair.passiveMeaning}</p>
						</div>
					</div>
					<!-- eslint-disable svelte/no-navigation-without-resolve -- external lexical evidence -->
					<a
						href={pair.source}
						class="inline-flex min-h-11 items-center text-sm text-primary underline"
						>Periksa tabel konjugasi</a
					>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
					<p class="text-xs text-muted-foreground">Diperiksa 20 Nov 2026 · {pair.section}</p>
				</li>
			{/each}
		</ul>
	</section>
	<section id="latihan-participle" class="scroll-mt-24 space-y-4">
		<h2 class="text-2xl font-semibold">24 latihan penerapan</h2>
		<p class="text-muted-foreground">Jawab dahulu sebelum membuka pembahasan.</p>
		<ol class="grid gap-4 md:grid-cols-2">
			{#each participleTasks as task, index (task.id)}
				{@const pair = participlePairs.find((item) => item.id === task.pairId)}
				<li id={task.id} class="min-w-0 space-y-3 rounded-xl border bg-card p-4">
					<p class="text-xs font-semibold text-muted-foreground">
						{index + 1} dari {participleTasks.length} · {kinds[task.kind]} · Draf
					</p>
					<p lang="ar" dir="rtl" class="arabic-word text-right">{task.arabic}</p>
					<p>{task.question}</p>
					<details class="border-t pt-2">
						<summary class="min-h-11 cursor-pointer py-2 font-medium text-primary"
							>Lihat pembahasan</summary
						>
						<p class="mt-2">{task.answer}</p>
						{#if pair}
							<!-- eslint-disable svelte/no-navigation-without-resolve -- external lexical evidence -->
							<a
								href={pair.source}
								class="mt-2 inline-flex min-h-11 items-center text-sm text-primary underline"
								>Periksa bentuk di kamus</a
							>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						{/if}
					</details>
				</li>
			{/each}
		</ol>
	</section>
	<aside class="max-w-3xl space-y-2 border-t pt-4">
		<h2 class="text-lg font-semibold">Batas pendalaman ini</h2>
		<p>
			Belum mencakup seluruh 22 wazan, semua bentuk mu‘tal, atau pengamalan isim fā‘il dan isim
			maf‘ūl sebagai ‘āmil. Audit kalimat dan uji pelajar tetap terbuka.
		</p>
		<a
			href={resolve('kaidah/masdar/')}
			class="inline-flex min-h-11 items-center text-primary underline">Bandingkan dengan maṣdar</a
		>
	</aside>
</main>
