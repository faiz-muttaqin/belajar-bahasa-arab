<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import type { LessonSummary, LessonTrack } from '#lib/content/lessons/types.js';

	let { lessons, track }: { lessons: readonly LessonSummary[]; track: LessonTrack } = $props();
	const levels = ['Fondasi', 'Dasar', 'Menengah'] as const;
</script>

<div class="mt-10 max-w-3xl space-y-12">
	{#if track === 'belajar'}
		<nav class="flex flex-wrap gap-x-6" aria-label="Tingkat pelajaran">
			<a class="inline-flex min-h-11 items-center font-medium text-primary underline" href="#dasar"
				>Dasar</a
			>
			<a
				class="inline-flex min-h-11 items-center font-medium text-primary underline"
				href="#menengah">Menengah</a
			>
		</nav>
	{/if}
	{#each levels as level (level)}
		{@const group = lessons.filter((lesson) => lesson.level === level)}
		{#if group.length}
			<section id={level.toLowerCase()} aria-label={level} class="scroll-mt-24 space-y-4">
				<h2 class="text-2xl font-semibold">{level}</h2>
				<ol class="divide-y rounded-2xl border bg-card">
					{#each group as lesson (lesson.id)}
						<li>
							<a
								href={resolve(`${track}/${lesson.slug}/`)}
								class="group flex items-center justify-between gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-accent sm:px-6"
							>
								<span>
									<span class="block font-semibold group-hover:underline">{lesson.title}</span>
									<span class="mt-1 block text-base text-pretty text-muted-foreground"
										>{lesson.goal}</span
									>
									<span class="mt-1 block text-base text-muted-foreground"
										>± {lesson.minutes} menit</span
									>
								</span>
								<ArrowRight class="size-5 shrink-0 text-primary" aria-hidden="true" />
							</a>
						</li>
					{/each}
				</ol>
			</section>
		{/if}
	{/each}
</div>
