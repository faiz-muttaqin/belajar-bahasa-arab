<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		masdarGrammarSource,
		masdarLexemes,
		masdarRules,
		masdarTasks
	} from '#lib/content/masdar-lessons.js';

	const kinds = {
		verb: 'Kenali fi‘il',
		nominal: 'Maṣdar dalam kalimat',
		preposition: 'Maṣdar dalam frasa',
		meaning: 'Pahami konteks'
	} as const;
</script>

<svelte:head>
	<title>Memahami maṣdar dalam dokumen Arab · Belajar Bahasa Arab</title>
	<meta
		name="description"
		content="Rujukan maṣdar untuk pelajar Arab pasca-Iqra: 5 pasangan verba–maṣdar berbukti kamus, 20 latihan bacaan MSA berharakat dan pembahasan Indonesia."
	/>
</svelte:head>

<main class="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6">
	<a href={resolve('kaidah/sharaf/')} class="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">Kembali ke pembahasan sharaf</a>
	<header class="max-w-3xl space-y-3">
		<p class="text-sm font-semibold text-primary">G-02 · OER-02 · pendalaman sharaf</p>
		<h1 class="text-3xl font-bold">Maṣdar: dari perbuatan menjadi nama kegiatan</h1>
		<p>
			Bahasa Arab baku sering menggunakan nama kegiatan pada judul, jadwal, dan dokumen.
			Pelajari bedanya dengan fi‘il, lalu baca 20 contoh berharakat yang ditulis mandiri.
		</p>
		<p class="text-sm text-muted-foreground">
			Semua contoh masih draf. Kamus mendukung pasangan kata, sedangkan kebenaran seluruh
			kalimat dan pembahasan belum diklaim selesai diaudit. Latihan ini cek mandiri tanpa skor.
		</p>
	</header>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Apa itu maṣdar?</h2>
		<div class="grid gap-4 md:grid-cols-3">
			{#each masdarRules as rule (rule.id)}
				<article class="rounded-xl border bg-card p-4">
					<h3 class="font-semibold">{rule.title}</h3>
					<p class="mt-2 text-sm">{rule.note}</p>
					<p class="mt-2 text-sm text-muted-foreground">{rule.caution}</p>
				</article>
			{/each}
		</div>
		<p class="text-sm">
			Bacaan rujukan:
			<!-- eslint-disable svelte/no-navigation-without-resolve -- external licensed grammar chapter -->
			<a class="text-primary underline underline-offset-4" href={masdarGrammarSource.href}>
				{masdarGrammarSource.name}
			</a>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
			<span class="text-muted-foreground"> · {masdarGrammarSource.license}</span>
		</p>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Lima pasangan yang diperiksa per lema</h2>
		<p class="max-w-3xl text-muted-foreground">
			Bentuk maṣdar Form I tidak selalu bisa ditebak dengan satu rumus. Setiap pasangan di bawah
			mempunyai entri kamus spesifik; jangan menggeneralisasi bentuk kata ke seluruh akar.
		</p>
		<ul class="grid gap-3 sm:grid-cols-2">
			{#each masdarLexemes as lexeme (lexeme.id)}
				<li class="min-w-0 space-y-2 rounded-xl border bg-card p-4">
					<p class="text-sm text-muted-foreground">Fi‘il māḍī / muḍāri‘ / maṣdar · draf</p>
					<p lang="ar" dir="rtl" class="arabic-word text-right">{lexeme.verb} · {lexeme.present} · {lexeme.masdar}</p>
					<p>{lexeme.meaning}</p>
					<!-- eslint-disable svelte/no-navigation-without-resolve -- external entry -->
					<a class="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4" href={lexeme.source}>Periksa pasangan pada entri kamus</a>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				</li>
			{/each}
		</ul>
	</section>

	<section id="latihan-masdar" class="scroll-mt-24 space-y-4">
		<h2 class="text-2xl font-semibold">Latihan menerapkan makna dalam 20 bacaan</h2>
		<p class="max-w-3xl text-muted-foreground">
			Baca sebelum membuka jawaban. Tugasnya berubah dari mengenali kata kerja, memahami
			peran maṣdar hingga membedakan frasa dan kalimat. Pengacakan opsi bukan variasi soal.
		</p>
		<ol class="grid gap-4 md:grid-cols-2">
			{#each masdarTasks as task, index (task.id)}
				{@const source = masdarLexemes.find((lexeme) => lexeme.id === task.lexemeId)}
				<li id={task.id} class="min-w-0 space-y-3 rounded-xl border bg-card p-4">
					<p class="text-xs font-semibold text-muted-foreground">
						{index + 1} dari {masdarTasks.length} · {kinds[task.kind]} · Draf
					</p>
					<p lang="ar" dir="rtl" class="arabic-word text-right">{task.arabic}</p>
					<p>{task.question}</p>
					<details class="border-t pt-2">
						<summary class="min-h-11 cursor-pointer py-2 font-medium text-primary">
							Lihat jawaban dan bukti kata
						</summary>
						<p class="mt-2">{task.answer}</p>
						{#if source}
							<!-- eslint-disable svelte/no-navigation-without-resolve -- external lexeme source -->
							<a href={source.source} class="mt-2 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">Periksa lema sumber</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						{/if}
					</details>
				</li>
			{/each}
		</ol>
	</section>

	<aside class="max-w-3xl space-y-2 border-t pt-4">
		<h2 class="text-lg font-semibold">Status penelitian</h2>
		<p>
			Halaman ini mengajarkan satu bagian G-02. Masih dibutuhkan audit per kalimat dan
			perluasan ke masdar pola mazīd, bentuk mu‘tal, sinonim makna, serta bacaan dokumen
			yang lebih panjang. Lihat roadmap OER-01–06 pada issue #55.
		</p>
		<a href={resolve('kaidah/sharaf/')} class="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Kembali ke sharaf</a>
	</aside>
</main>
