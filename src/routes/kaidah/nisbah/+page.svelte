<script lang="ts">
	import { resolve } from '$app/paths';
	import { nisbahRules, nisbahSources, nisbahTasks } from '#lib/content/nisbah-lessons.js';
</script>

<svelte:head>
	<title>Nisbah: istilah formal Arab modern · Belajar Bahasa Arab</title>
	<meta name="description" content="Pelajari bentuk sifat nisbah, kesesuaian gender dan ma‘rifah, serta 20 latihan membaca istilah resmi, digital, medis dan berbahasa Arab dengan rujukan terbuka." />
</svelte:head>

<main class="mx-auto max-w-4xl space-y-10 px-4 py-8 sm:px-6">
	<a href={resolve('kaidah/')} class="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">Kembali ke peta kaidah</a>
	<header class="space-y-4">
		<p class="text-sm font-semibold text-primary">Materi tambahan · Bahasa Arab baku modern</p>
		<h1 class="text-3xl font-bold">Nisbah untuk memahami istilah formal</h1>
		<p class="max-w-[66ch]">Istilah seperti resmi, digital, medis, dan berbahasa Arab sering berfungsi sebagai kata sifat. Kenali bentuknya, bedakan frasa dari kalimat, lalu terapkan pada contoh yang belum dihafal.</p>
		<p class="max-w-[66ch] text-sm text-muted-foreground">Penjelasan dan 20 latihan ditulis mandiri berdasarkan bab tata bahasa berlisensi terbuka serta entri kamus. Semua contoh masih draf; sumber kaidah tidak otomatis membuktikan seluruh kalimat buatan proyek. Latihan periksa mandiri tidak memberi penilaian otomatis.</p>
	</header>
	<nav class="flex flex-wrap gap-3" aria-label="Lompat ke pembahasan">
		{#each nisbahRules as rule (rule.id)}
			<a href={`#${rule.id}`} class="inline-flex min-h-11 items-center rounded-lg border px-3 text-sm font-medium text-primary">{rule.title}</a>
		{/each}
		<a href="#latihan-nisbah" class="inline-flex min-h-11 items-center rounded-lg border px-3 text-sm font-medium text-primary">20 latihan</a>
	</nav>
	{#each nisbahRules as rule (rule.id)}
		<section id={rule.id} class="scroll-mt-24 space-y-4">
			<h2 class="text-2xl font-semibold">{rule.title}</h2>
			<p dir="rtl" lang="ar" class="arabic-word text-right">{rule.arabic}</p>
			<p class="max-w-[66ch]">{rule.explanation}</p>
			<details class="rounded-xl border p-3">
				<summary class="min-h-11 cursor-pointer py-2 font-medium">Sumber kaidah dan lema</summary>
				<ul class="mt-2 list-disc space-y-2 ps-5 text-sm">
					{#each rule.sourceIds as sourceId (sourceId)}
						{@const source = nisbahSources[sourceId]}
						<li>
							<!-- eslint-disable svelte/no-navigation-without-resolve -- external bibliographic source -->
							<a href={source.href} class="text-primary underline underline-offset-4">{source.label}</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
							<p class="text-muted-foreground">{source.license} · {source.usage}</p>
						</li>
					{/each}
				</ul>
			</details>
		</section>
	{/each}
	<section id="latihan-nisbah" class="scroll-mt-24 space-y-5">
		<h2 class="text-2xl font-semibold">Latihan penerapan pada 20 contoh</h2>
		<p class="text-muted-foreground">Bacalah teks Arab dan jawab pertanyaan dengan usaha sendiri sebelum membuka pembahasan. Tidak ada poin atau klaim lulus.</p>
		<ol class="grid gap-4 sm:grid-cols-2">
			{#each nisbahTasks as task, index (task.id)}
				<li id={task.id} class="min-w-0 space-y-3 rounded-xl border bg-card p-4">
					<p class="text-sm text-muted-foreground">Contoh {index + 1} dari {nisbahTasks.length} · Draf</p>
					<p lang="ar" dir="rtl" class="arabic-word text-right">{task.arabic}</p>
					<p>{task.question}</p>
					<details class="border-t pt-2">
						<summary class="min-h-11 cursor-pointer py-2 font-medium text-primary">Lihat jawaban dan dasar</summary>
						<p class="mt-2">{task.answer}</p>
						<p class="mt-2 text-sm text-muted-foreground">Pola: {nisbahRules.find((rule) => rule.id === task.ruleId)?.title}</p>
						<!-- eslint-disable svelte/no-navigation-without-resolve -- external lexicon reference -->
						<a href={nisbahSources[task.lexicalSource].href} class="mt-2 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">Periksa lema di kamus</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					</details>
				</li>
			{/each}
		</ol>
	</section>
	<aside class="space-y-2 border-t pt-4">
		<h2 class="text-lg font-semibold">Mengapa ada label draf?</h2>
		<p class="max-w-[66ch] text-sm text-muted-foreground">Buku terbuka dapat dipakai untuk memeriksa kaidah dan kamus untuk memeriksa lema. Contoh kalimat yang kami susun tetap perlu diperiksa terhadap kaidah, bentuk akhir, konteks dan pilihan makna sebelum dinaikkan menjadi “terverifikasi berdasarkan sumber”. Sumber bukan berarti teks situs lain disalin.</p>
		<a href={resolve('kaidah/')} class="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">Kembali ke peta kaidah</a>
	</aside>
</main>
