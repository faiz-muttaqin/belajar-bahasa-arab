<script lang="ts">
  import { resolve } from '$app/paths';
  import { stage2CheckpointGroups } from '#lib/content/checkpoints-stage2.js';
  import { evidenceItems } from '#lib/content/lessons/index.js';
  import MeaningPractice from '#lib/components/learning/MeaningPractice.svelte';
</script>

<svelte:head>
  <title>Titik cek Tahap 2 · Belajar Bahasa Arab</title>
  <meta name="description" content="40 latihan pemahaman benda/orang dan kalimat lengkap dengan sumber dan pembahasan bahasa Indonesia." />
</svelte:head>

<main class="mx-auto max-w-4xl space-y-9 px-4 py-8 sm:px-6">
  <a href={resolve('belajar/')} class="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Kembali ke peta belajar</a>
  <header class="space-y-3">
    <p class="font-medium text-primary">Titik cek · Tahap 2</p>
    <h1 class="text-3xl font-bold">Benda dan pertanyaan</h1>
    <p class="max-w-[65ch] text-muted-foreground">
      Dua kelompok dengan masing-masing 20 soal berbeda. Kelompok pertama menguji
      pertanyaan tentang benda dan orang; kelompok kedua memeriksa kapan sebuah
      pernyataan sudah memberikan kabar. Anda boleh mengerjakannya bertahap.
      Jawaban tersimpan sebagai bukti pemahaman, bukan tanda selesai pelajaran.
    </p>
    <p class="text-base text-muted-foreground">Draf · bersumber, belum ditinjau ustadz. Tautan rujukan tersedia untuk setiap soal.</p>
  </header>
  <nav aria-label="Kelompok titik cek" class="flex flex-wrap gap-x-6 gap-y-2 border-y py-3">
    {#each stage2CheckpointGroups as group (group.id)}
      <a href={`#${group.id}`} class="inline-flex min-h-11 items-center text-primary underline underline-offset-4">{group.title} · {group.questions.length} soal</a>
    {/each}
  </nav>
  {#each stage2CheckpointGroups as group (group.id)}
    <section id={group.id} aria-label={group.title} class="scroll-mt-24 space-y-3">
      <h2 class="text-2xl font-semibold">{group.title}</h2>
      <p class="text-base text-muted-foreground">Kemampuan {group.competencyId} · {group.questions.length} varian.</p>
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
  <a href={resolve('belajar/')} class="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Lihat hasil pada peta belajar</a>
</main>
