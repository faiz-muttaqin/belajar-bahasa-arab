<script lang="ts">
	import { resolve } from '$app/paths';
	import MeaningPractice from '#lib/components/learning/MeaningPractice.svelte';
	import { stage6CheckpointGroups } from '#lib/content/checkpoints-stage6.js';
	import { evidenceItems } from '#lib/content/lessons/index.js';
</script>

<svelte:head>
	<title>Titik cek Tahap 6 · Belajar Bahasa Arab</title>
	<meta
		name="description"
		content="40 soal baru untuk menguji pemahaman pengumuman, inferensi yang didukung teks, dan ringkasan dokumen Arab."
	/>
</svelte:head>

<main class="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
	<a
		href={resolve('belajar/')}
		class="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
		>Kembali ke peta belajar</a
	>
	<header class="space-y-3">
		<p class="font-medium text-primary">Titik cek · Tahap 6</p>
		<h1 class="text-3xl font-bold">Uji pemahaman dokumen baru</h1>
		<p class="max-w-[65ch] text-muted-foreground">
			Baca pengumuman dan dokumen pendek baru. Temukan fakta yang benar-benar tertulis,
			pisahkan dugaan dari bukti, lacak rujukan, lalu pilih ringkasan paling tepat. Ada 40
			butir orisinal, masing-masing 20 pada dua kemampuan.
		</p>
		<p class="text-base text-muted-foreground">
			Draf · bersumber pada metodologi pemahaman bacaan dan belum ditinjau ustadz. Jawaban
			menjadi bukti pemahaman, bukan kelulusan otomatis atau penyelesaian pelajaran.
		</p>
	</header>

	{#each stage6CheckpointGroups as group (group.id)}
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
