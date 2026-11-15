<script lang="ts">
  import { resolve } from '$app/paths';
  import { stage3CheckpointGroups } from '#lib/content/checkpoints.js';
  import { evidenceItems } from '#lib/content/lessons/index.js';
  import MeaningPractice from '#lib/components/learning/MeaningPractice.svelte';
</script>

<svelte:head>
  <title>Titik cek Tahap 3 · Belajar Bahasa Arab</title>
  <meta name="description" content="Latihan pemahaman kata ganti, lokasi, idhafah dan kepemilikan: 24 varian dengan pembahasan." />
</svelte:head>

<main class="mx-auto max-w-4xl space-y-9 px-4 py-8 sm:px-6">
  <a href={resolve('belajar/')} class="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Kembali ke peta belajar</a>
  <header class="space-y-3">
    <p class="font-medium text-primary">Titik cek · Tahap 3</p>
    <h1 class="text-3xl font-bold">Tempat, milik dan kata ganti</h1>
    <p class="max-w-[65ch] text-muted-foreground">
      Ada 24 soal berbeda, dibagi menjadi tiga kelompok. Coba tanpa membuka rujukan terlebih dahulu.
      Hasil tiap jawaban dapat menaikkan, mempertahankan atau menurunkan bukti pemahaman; tidak
      mengubah status selesai maupun tanda posisi. Anda boleh mengerjakan sebagian dan melanjutkan lain waktu.
    </p>
    <p class="text-base text-muted-foreground">Draf · bersumber, belum ditinjau ustadz. Setiap jawaban memiliki tautan sumber yang dapat diperiksa.</p>
  </header>
  <nav aria-label="Kelompok latihan" class="flex flex-wrap gap-x-6 gap-y-2 border-y py-3">
    {#each stage3CheckpointGroups as group (group.id)}
      <a class="inline-flex min-h-11 items-center text-primary underline underline-offset-4" href={`#${group.id}`}>{group.title} · {group.questions.length} soal</a>
    {/each}
  </nav>
  {#each stage3CheckpointGroups as group (group.id)}
    <section id={group.id} class="scroll-mt-24 space-y-3" aria-label={group.title}>
      <h2 class="text-2xl font-semibold">{group.title}</h2>
      <p class="text-base text-muted-foreground">Kemampuan {group.competencyId} · {group.questions.length} varian berbasis sumber.</p>
      <MeaningPractice
        questions={group.questions}
        lessonId={group.lessonId}
        contentRevision={group.contentRevision}
        competencyIds={[group.competencyId]}
        {evidenceItems}
      />
    </section>
  {/each}
  <a href={resolve('belajar/')} class="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Lihat posisi dan tingkat pemahaman di peta</a>
</main>
