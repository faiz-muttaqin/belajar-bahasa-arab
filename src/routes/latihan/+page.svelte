<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const levels = ['Dasar', 'Menengah', 'Fondasi'] as const;
</script>

<PageIntro
	title="Latihan"
	section="latihan"
	description="Latihan membaca tulisan Arab, memahami makna kalimat, dan menganalisis paragraf dengan pembahasan dalam bahasa Indonesia."
>
	{#snippet lead()}
		<p>Pilih pelajaran dan jawab pertanyaannya sebelum membuka pembahasan.</p>
	{/snippet}
</PageIntro>

<div class="mt-10 space-y-10">
	{#each levels as level (level)}
		<section aria-label={level} class="space-y-4">
			<h2 class="text-2xl font-semibold">{level}</h2>
			<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,18rem),1fr))] gap-3">
				{#each data.lessons.filter((lesson) => lesson.level === level) as lesson (lesson.id)}
					<li>
						<a
							class="flex h-full min-h-11 flex-wrap items-center justify-between gap-x-4 rounded-xl border bg-card px-4 py-3 hover:bg-accent"
							href={resolve(`${lesson.track}/${lesson.slug}/#latihan`)}
						>
							<span class="font-medium">{lesson.title}</span>
							<span class="text-base text-muted-foreground">{lesson.count} soal</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>
