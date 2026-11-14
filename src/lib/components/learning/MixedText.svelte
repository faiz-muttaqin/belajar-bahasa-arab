<script lang="ts">
	import ArabicText from './ArabicText.svelte';

	let { text }: { text: string } = $props();

	// Keep quoted Arabic together, including harakat and any spaces between its words.
	const arabicRun = /([\u0600-\u06ff]+(?:[\t ][\u0600-\u06ff]+)*)/u;
	let runs = $derived(text.split(arabicRun));
</script>

{#each runs as run, i (i)}{#if i % 2}<ArabicText text={run} />{:else}{run}{/if}{/each}
