<script lang="ts">
	import { resolve } from '$app/paths';
	import { stage4CheckpointGroups } from '#lib/content/checkpoints-stage4.js';
	import { evidenceItems } from '#lib/content/lessons/index.js';
	import MeaningPractice from '#lib/components/learning/MeaningPractice.svelte';
</script>

<svelte:head>
	<title>Titik cek Tahap 4 · Belajar Bahasa Arab</title>
	<meta
		name="description"
		content="40 latihan baru untuk memahami pelaku dan tindakan, kalimat pasif, negasi, serta waktu dalam bahasa Arab."
	/>
</svelte:head>

<main class="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
	<a
		href={resolve('belajar/')}
		class="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
		>Kembali ke peta belajar</a
	>
	<header class="space-y-3">
		<p class="font-medium text-primary">Titik cek · Tahap 4</p>
		<h1 class="text-3xl font-bold">Siapa melakukan apa dan kapan?</h1>
		<p class="max-w-[65ch] text-muted-foreground">
			Latih pemahaman pelaku dan sasaran tindakan, perbedaan kalimat aktif dan pasif,
			serta negasi kejadian lampau, nonlampau, dan masa depan. Ada 40 soal berbeda
			dari contoh pelajaran; setiap soal memiliki pembahasan dan sumber.
		</p>
		<p class="text-base text-muted-foreground">
			Draf · bersumber, belum ditinjau ustadz. Jawaban adalah bukti latihan
			yang terpisah dari tanda posisi dan penyelesaian pelajaran.
		</p>
	</header>
	{#each stage4CheckpointGroups as group (group.id)}
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
