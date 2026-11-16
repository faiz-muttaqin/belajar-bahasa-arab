<script lang="ts">
	import { resolve } from '$app/paths';
	import MeaningPractice from '#lib/components/learning/MeaningPractice.svelte';
	import { stage5CheckpointGroups } from '#lib/content/checkpoints-stage5.js';
	import { evidenceItems } from '#lib/content/lessons/index.js';
</script>

<svelte:head>
	<title>Titik cek Tahap 5 · Belajar Bahasa Arab</title>
	<meta
		name="description"
		content="60 tugas transfer membaca bahasa Arab: hubungan antarkalimat, gagasan utama paragraf, dan struktur dokumen pendek."
	/>
</svelte:head>

<main class="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
	<a
		href={resolve('belajar/')}
		class="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
		>Kembali ke peta belajar</a
	>
	<header class="space-y-3">
		<p class="font-medium text-primary">Titik cek · Tahap 5</p>
		<h1 class="text-3xl font-bold">Baca hubungan, gagasan, dan struktur teks</h1>
		<p class="max-w-[65ch] text-muted-foreground">
			Tiga kelompok latihan dengan total 60 soal berbeda: hubungkan sebab, akibat, urutan, dan
			kontras; pilih gagasan utama paragraf; lalu nilai fungsi bagian serta batas kesimpulan
			dokumen. Baca teks Arab terlebih dahulu sebelum memilih jawaban.
		</p>
		<p class="text-base text-muted-foreground">
			Draf · bersumber pada metodologi pemahaman bacaan dan disusun orisinal, belum ditinjau
			ustadz. Jawaban tersimpan sebagai bukti belajar; tidak otomatis menyelesaikan pelajaran.
		</p>
	</header>

	{#each stage5CheckpointGroups as group (group.id)}
		<section id={group.id} class="scroll-mt-24 space-y-4" aria-label={group.title}>
			<h2 class="text-2xl font-semibold">{group.title}</h2>
			<p class="text-base text-muted-foreground">
				{group.questions.length} soal · kemampuan {group.competencyId}
			</p>
			<MeaningPractice
				questions={group.questions}
				lessonId={group.lessonId}
				contentRevision={group.contentRevision}
				competencyIds={[group.competencyId]}
				skill={group.skill ?? 'meaning'}
				{evidenceItems}
			/>
		</section>
	{/each}
	<a
		href={resolve('belajar/')}
		class="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
		>Lihat hasil pada peta belajar</a
	>
</main>
