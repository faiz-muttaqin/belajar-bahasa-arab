<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import LocalBadge from '#lib/components/local/LocalBadge.svelte';
	import type { LocalLessonMeta } from '#lib/domain/local-content/types.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// Keep the source order; a new group starts a new heading.
	let groups = $derived.by(() => {
		const out: { label: string | undefined; lessons: LocalLessonMeta[] }[] = [];
		for (const lesson of data.track.lessons) {
			const last = out[out.length - 1];
			if (last && last.label === lesson.group) last.lessons.push(lesson);
			else out.push({ label: lesson.group, lessons: [lesson] });
		}
		return out;
	});
	const rtl = $derived(data.track.lang === 'ar');
</script>

<div class="min-w-0 space-y-8">
	<a
		href={resolve('pustaka/')}
		class="inline-flex min-h-11 items-center gap-1 font-medium text-primary hover:underline"
	>
		<ChevronLeft class="size-5" aria-hidden="true" />
		Pustaka
	</a>

	<PageIntro
		title={data.track.title}
		description="{data.track.description} Salinan lokal, belum ditinjau."
		section="pustaka"
	>
		{#snippet lead()}
			<p>{data.track.description}</p>
		{/snippet}
	</PageIntro>

	<LocalBadge source={data.source} />

	<div class="space-y-10">
		{#each groups as group, g (g)}
			<section class="space-y-4" aria-label={group.label ?? 'Pelajaran'}>
				{#if group.label}
					<h2
						class="text-2xl font-semibold"
						lang={rtl ? 'ar' : undefined}
						dir={rtl ? 'rtl' : undefined}
					>
						{group.label}
					</h2>
				{/if}
				<ol class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-4">
					{#each group.lessons as lesson (lesson.id)}
						<li>
							<a
								href={resolve(`pustaka/${data.track.slug}/${lesson.slug}/`)}
								class="group flex h-full items-center justify-between gap-4 rounded-xl border bg-card px-4 py-4 transition-colors hover:bg-accent sm:px-6"
							>
								<span class="min-w-0">
									<span
										class="block font-semibold group-hover:underline"
										lang={rtl ? 'ar' : undefined}
										dir={rtl ? 'rtl' : undefined}>{lesson.title}</span
									>
									{#if lesson.minutes}
										<span class="mt-1 block text-base text-muted-foreground"
											>± {lesson.minutes} menit</span
										>
									{/if}
								</span>
								<ArrowRight class="size-5 shrink-0 text-primary" aria-hidden="true" />
							</a>
						</li>
					{/each}
				</ol>
			</section>
		{/each}
	</div>
</div>
