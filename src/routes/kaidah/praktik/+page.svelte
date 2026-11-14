<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import DynamicSentenceExample from '#lib/components/learning/DynamicSentenceExample.svelte';
	import ClauseGloss from '#lib/components/learning/ClauseGloss.svelte';
	import {
		grammarStages,
		practiceReading,
		readingQuestions,
		type GrammarStageId
	} from '#lib/content/grammar-pathway.js';

	const stageLinks: Record<GrammarStageId, string> = {
		g01: resolve('kaidah/'),
		g02: resolve('kaidah/sharaf/'),
		g03: resolve('kaidah/frasa/'),
		g04: resolve('kaidah/kalimat/'),
		g05: resolve('kaidah/klausa/'),
		g06: resolve('kaidah/praktik/')
	};
</script>

<PageIntro
	title="Praktik bahasa Arab: dari kata ke paragraf"
	section="kaidah"
	description="Peta prasyarat G-01 sampai G-06, latihan menyusun kalimat dengan kata yang bisa diganti dari kamus, dan pemahaman dua kalimat Arab."
>
	{#snippet lead()}
		<p>
			Pilih bentuk dan kata yang sudah dikenali, bandingkan susunannya,
			lalu coba membaca kalimat yang saling terhubung.
		</p>
	{/snippet}
</PageIntro>

<section class="mt-8 max-w-5xl space-y-4" aria-labelledby="prereq-title">
	<h2 id="prereq-title" class="text-xl font-semibold">Peta prasyarat</h2>
	<p class="text-sm text-muted-foreground">
		G-02 dan G-03 sama-sama berangkat dari fondasi G-01; keduanya
		diperlukan sebelum mendalami kalimat di G-04. Dari sana, lanjut ke klausa dan praktik.
		Peta ini menunjukkan hubungan materi, bukan rekam kemajuan pribadi.
	</p>
	<ol class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-3">
		{#each grammarStages as stage (stage.id)}
			<li class="min-w-0 rounded-xl border bg-card p-4">
				<a href={stageLinks[stage.id]} class="group block space-y-2">
					<span class="text-xs font-semibold text-primary">{stage.label}</span>
					<h3 class="font-semibold group-hover:underline">{stage.title}</h3>
					<p class="text-sm text-muted-foreground">{stage.outcome}</p>
					<p class="text-xs text-muted-foreground">
						Prasyarat: {stage.prerequisites.length ? stage.prerequisites.map((id) => id.toUpperCase().replace('G', 'G-')).join(', ') : 'mulai di sini'}
					</p>
				</a>
			</li>
		{/each}
	</ol>
</section>

<section class="mt-14 max-w-5xl space-y-5" aria-labelledby="builder-title">
	<div>
		<h2 id="builder-title" class="text-2xl font-semibold">Contoh dinamis dengan pemilihan kata</h2>
		<p class="mt-2 max-w-3xl text-muted-foreground">
			Ketuk <strong>Ganti kata</strong> untuk membuka pencarian dalam kamus terpilih.
			Pilihannya dibatasi oleh fungsi kata, gender, kasus, dan kecocokan makna.
			Bukan sembarang kata dari kamus dapat dimasukkan ke semua posisi.
		</p>
	</div>
	<div class="grid gap-5 lg:grid-cols-2">
		<DynamicSentenceExample mode="nominal" />
		<DynamicSentenceExample mode="verbal" />
	</div>
	<p class="text-sm text-muted-foreground">
		Ini pilot dengan lema sumber MSA/kamus sharaf proyek dan bentuk yang sudah ditetapkan
		untuk contoh ini. Fi‘il pada contoh verbal masih terbatas pada māḍī orang ketiga
		maskulin tunggal, sementara jenis objek hanya yang cocok dengan fi‘il.
		Tidak ada perubahan bentuk atau terjemahan otomatis yang diklaim berlaku universal.
	</p>
	<nav aria-label="Kamus terkait" class="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
		<a href={resolve('kosakata/')} class="text-primary underline">Kamus MSA</a>
		<a href={resolve('sharaf/')} class="text-primary underline">Cari akar dan wazan</a>
		<a href={resolve('rujukan/fiil/')} class="text-primary underline">Tabel 22 wazan</a>
	</nav>
</section>

<section class="mt-14 max-w-5xl space-y-5" aria-labelledby="reading-title">
	<div>
		<h2 id="reading-title" class="text-2xl font-semibold">Baca rangkaian dua kalimat</h2>
		<p class="mt-2 max-w-3xl text-muted-foreground">
			Gunakan kemampuan G-04 untuk mengenali pelaku dan objek, lalu G-05 untuk memahami
			penghubung serta pelaku yang tidak diulang. Teks dapat dibaca tanpa JavaScript.
		</p>
	</div>
	<div class="max-w-3xl">
		<ClauseGloss example={practiceReading} />
	</div>
	<div class="grid gap-3 lg:grid-cols-3">
		{#each readingQuestions as question (question.id)}
			<details class="rounded-xl border bg-card p-4">
				<summary class="min-h-11 cursor-pointer font-semibold">
					{question.question}
				</summary>
				<p class="mt-3 font-semibold">{question.answer}</p>
				<p class="mt-2 text-sm text-muted-foreground">{question.reason}</p>
			</details>
		{/each}
	</div>
	<p class="text-sm text-muted-foreground">
		Ini latihan mandiri dengan pembahasan terbuka, belum menyimpan skor atau mengubah
		progres pelajaran di perangkat. Materi dan contoh masih berstatus draft untuk audit kebahasaan.
	</p>
</section>

<aside class="mt-14 max-w-4xl space-y-3 rounded-2xl border bg-card p-5">
	<h2 class="font-semibold">Kembali ke jalur belajar</h2>
	<p class="text-sm text-muted-foreground">
		Peta ini adalah pelengkap konsep, bukan pengganti pelajaran dan latihan utama.
	</p>
	<nav class="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold" aria-label="Materi lanjutan">
		<a href={resolve('kaidah/')} class="text-primary underline">Peta kaidah</a>
		<a href={resolve('belajar/')} class="text-primary underline">Pelajaran lengkap</a>
		<a href={resolve('latihan/')} class="text-primary underline">Latihan kurikulum</a>
	</nav>
</aside>
