<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Section without content yet: status, what will appear here and how, one next action.
	 * Left-aligned in the reading column; no illustration.
	 */
	let { title, children, actions }: { title: string; children: Snippet; actions?: Snippet } =
		$props();
</script>

<section class="max-w-[65ch] space-y-4 border-t pt-8" aria-labelledby="status-heading">
	<h2 id="status-heading" class="text-xl font-semibold">{title}</h2>
	<div class="space-y-3 text-pretty">{@render children()}</div>
	{#if actions}
		<div class="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">{@render actions()}</div>
	{/if}
</section>
