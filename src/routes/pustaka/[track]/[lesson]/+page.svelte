<script lang="ts">
	import { resolve } from '$app/paths';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import BlockRenderer from '#lib/components/local/BlockRenderer.svelte';
	import LocalBadge from '#lib/components/local/LocalBadge.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// Arabic-language lessons run right to left as a whole; the page itself stays Indonesian.
	let rtl = $derived(data.lesson.lang === 'ar');
</script>

<div class="min-w-0 space-y-8">
	<a
		href={resolve(`pustaka/${data.track.slug}/`)}
		class="inline-flex min-h-11 items-center gap-1 font-medium text-primary hover:underline"
	>
		<ChevronLeft class="size-5" aria-hidden="true" />
		{data.track.title}
	</a>

	<PageIntro
		title={data.lesson.title}
		description="{data.track.title}: {data.lesson
			.title}. Salinan lokal dari repositori sumber, belum ditinjau, hanya untuk belajar pribadi."
		section="pustaka"
		headingLang={rtl ? 'ar' : undefined}
	/>

	<LocalBadge source={data.source} origin={data.lesson.origin} />

	{#if data.lesson.subtitle}
		<p
			lang={data.lesson.lang}
			dir={rtl ? 'rtl' : 'ltr'}
			class="max-w-[68ch] text-lg text-pretty text-muted-foreground"
		>
			{data.lesson.subtitle}
		</p>
	{/if}
	{#if data.lesson.minutes}
		<p class="text-base text-muted-foreground">± {data.lesson.minutes} menit</p>
	{/if}

	<!-- Naskh runs about 25% smaller than the UI face at the same size (docs/design/taste.md). -->
	<article
		lang={data.lesson.lang}
		dir={rtl ? 'rtl' : 'ltr'}
		class={['min-w-0 space-y-8', rtl && 'arabic-inline leading-[1.9]']}
	>
		<BlockRenderer blocks={data.lesson.blocks} />
	</article>

	<nav aria-label="Pelajaran lain" class="flex flex-wrap justify-between gap-4 border-t pt-6">
		{#if data.previous}
			<a
				href={resolve(`pustaka/${data.track.slug}/${data.previous.slug}/`)}
				class="inline-flex min-h-11 items-center gap-1 font-medium text-primary hover:underline"
			>
				<ChevronLeft class="size-5 shrink-0" aria-hidden="true" />
				<span>
					<span class="block text-base text-muted-foreground">Sebelumnya</span>
					<span class="block" lang={data.track.lang} dir={rtl ? 'rtl' : undefined}
						>{data.previous.title}</span
					>
				</span>
			</a>
		{:else}
			<span></span>
		{/if}
		{#if data.next}
			<a
				href={resolve(`pustaka/${data.track.slug}/${data.next.slug}/`)}
				class="inline-flex min-h-11 items-center gap-1 text-end font-medium text-primary hover:underline"
			>
				<span>
					<span class="block text-base text-muted-foreground">Berikutnya</span>
					<span class="block" lang={data.track.lang} dir={rtl ? 'rtl' : undefined}
						>{data.next.title}</span
					>
				</span>
				<ChevronRight class="size-5 shrink-0" aria-hidden="true" />
			</a>
		{/if}
	</nav>
</div>
