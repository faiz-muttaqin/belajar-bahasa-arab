<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SectionId } from '#lib/navigation.js';
	import { sectionIcons } from './section-icons.js';

	/**
	 * Page metadata plus the single H1 and a short lead. Every prerendered page uses this so
	 * each URL ships its own title and description in static HTML.
	 */
	let {
		title,
		description,
		heading = title,
		section,
		lead
	}: {
		/** Topic part of the <title>; the brand is appended. */
		title: string;
		/** Meta description, about 120 to 160 characters, honest about what is on the page. */
		description: string;
		heading?: string;
		/** Shows the section's icon as a marker above the heading. */
		section?: SectionId;
		lead?: Snippet;
	} = $props();

	let documentTitle = $derived(
		title === 'Belajar Bahasa Arab' ? title : `${title} · Belajar Bahasa Arab`
	);
	let Icon = $derived(section ? sectionIcons[section] : undefined);
</script>

<svelte:head>
	<title>{documentTitle}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="max-w-[60ch] space-y-5">
	{#if Icon}
		<span
			class="inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-primary"
		>
			<Icon class="size-6" aria-hidden="true" />
		</span>
	{/if}
	<h1 class="text-[clamp(2rem,1.6rem+2vw,2.5rem)] leading-tight font-bold tracking-tight">
		{heading}
	</h1>
	{#if lead}
		<div class="text-lg text-pretty text-muted-foreground md:text-xl">{@render lead()}</div>
	{/if}
</div>
