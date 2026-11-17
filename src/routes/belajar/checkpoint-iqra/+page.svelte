<script lang="ts">
	import { resolve } from '$app/paths';
	import { iqraSelfCheckGroups, iqraSelfCheckSources } from '#lib/content/checkpoints-iqra.js';
</script>

<svelte:head>
	<title>Latihan cek mandiri Iqra · Belajar Bahasa Arab</title>
	<meta
		name="description"
		content="20 bacaan Arab berharakat untuk latihan mengenali harakat, sukun, tanwin, tasydid dan membaca kalimat pendek secara mandiri."
	/>
</svelte:head>

<main class="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
	<a
		href={resolve('belajar/')}
		class="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
		>Kembali ke peta belajar</a
	>
	<header class="space-y-3">
		<p class="font-medium text-primary">Iqra · opsional · titik cek mandiri</p>
		<h1 class="text-3xl font-bold">Latihan membaca teks baru</h1>
		<p class="max-w-[65ch] text-muted-foreground">
			Tersedia 20 bacaan berbeda. Baca setiap teks dengan suara keras terlebih dahulu, lalu buka
			petunjuk untuk memeriksa tanda dan sambungan huruf. Ulangi tanpa melihat petunjuk.
		</p>
		<p class="max-w-[65ch] font-medium">
			Ini latihan mandiri, bukan tes otomatis kemampuan membaca lisan. Situs belum dapat memastikan
			makhraj, panjang pendek, atau kelancaran bacaan Anda. Mintalah guru atau pendamping menyimak
			bila ingin umpan balik pelafalan.
		</p>
		<p class="text-muted-foreground">
			Draf · disusun orisinal dengan rujukan aturan tulisan Arab, belum ditashih guru. Halaman ini
			tidak mengubah nilai pemahaman atau status pelajaran.
		</p>
	</header>
	{#each iqraSelfCheckGroups as group (group.id)}
		<section id={group.id} class="scroll-mt-24 space-y-4" aria-labelledby={`${group.id}-title`}>
			<h2 id={`${group.id}-title`} class="text-2xl font-semibold">{group.title}</h2>
			<p class="text-muted-foreground">{group.items.length} bacaan berbeda</p>
			<ol class="space-y-4">
				{#each group.items as item, index (item.id)}
					<li id={item.id} class="space-y-3 rounded-2xl border bg-card p-4 sm:p-6">
						<p class="text-sm text-muted-foreground">
							Bacaan {index + 1} dari {group.items.length}
						</p>
						<p lang="ar" dir="rtl" class="arabic-word text-right">{item.arabic}</p>
						<p>{item.focus}</p>
						<details class="border-t pt-3">
							<summary class="min-h-11 cursor-pointer py-2 font-medium text-primary">
								Buka petunjuk pemeriksaan tanda
							</summary>
							<p class="mt-2 max-w-[65ch] text-muted-foreground">{item.check}</p>
						</details>
					</li>
				{/each}
			</ol>
		</section>
	{/each}
	<aside class="space-y-2 border-t pt-4">
		<h2 class="text-lg font-semibold">Rujukan dan batas latihan</h2>
		<ul class="list-disc space-y-2 ps-5">
			{#each iqraSelfCheckSources as source (source.href)}
				<li>
					<a class="text-primary underline underline-offset-4" href={source.href}>{source.label}</a>
				</li>
			{/each}
		</ul>
		<p class="text-sm text-muted-foreground">
			Teks latihan dan petunjuk adalah karya proyek. Rujukan ini menjelaskan sistem tulisan, bukan
			bukti bahwa pelafalan Anda telah diperiksa.
		</p>
	</aside>
	<a
		href={resolve('belajar/')}
		class="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
		>Kembali ke peta belajar</a
	>
</main>
