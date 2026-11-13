<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Page metadata plus the single H1 and lead paragraph. Every prerendered page uses this so
	 * each URL ships its own title and description in static HTML.
	 */
	let {
		title,
		description,
		heading = title,
		lead
	}: {
		/** Topic part of the <title>; the brand is appended. */
		title: string;
		/** Meta description, about 120 to 160 characters, honest about what is on the page. */
		description: string;
		heading?: string;
		lead?: Snippet;
	} = $props();

	let documentTitle = $derived(
		title === 'Belajar Bahasa Arab' ? title : `${title} · Belajar Bahasa Arab`
	);
</script>

<svelte:head>
	<title>{documentTitle}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="max-w-[65ch] space-y-4">
	<h1 class="text-[clamp(2rem,1.6rem+2vw,2.5rem)] leading-tight font-bold tracking-tight">
		{heading}
	</h1>
	{#if lead}
		<div class="text-lg text-pretty text-muted-foreground md:text-xl">{@render lead()}</div>
	{/if}
</div>
