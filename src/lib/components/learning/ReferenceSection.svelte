<script lang="ts">
	import ReferenceTable from './ReferenceTable.svelte';
	import type { ReferenceTableData } from '#lib/domain/reference/table.js';

	/** One reference table in a titled section, with its tip and sources. */
	let { table, tip, intro }: { table: ReferenceTableData; tip?: string; intro?: string } = $props();
</script>

<section id={table.id} aria-labelledby="{table.id}-h" class="min-w-0 scroll-mt-24 space-y-4">
	<h2 id="{table.id}-h" class="text-2xl font-semibold">{table.title}</h2>
	{#if intro}<p class="max-w-[65ch] text-pretty text-muted-foreground">{intro}</p>{/if}
	{#if tip}
		<p class="max-w-[65ch] rounded-xl bg-accent p-4 text-accent-foreground">
			<span class="font-semibold">Tip.</span>
			{tip}
		</p>
	{/if}
	<ReferenceTable {table} />
	<details>
		<summary class="min-h-11 cursor-pointer py-3 font-medium text-primary">Sumber</summary>
		<ul class="list-disc space-y-2 ps-5">
			{#each table.sources as source (source)}
				<li>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external source -->
					<a href={source} class="break-all underline">{source}</a>
				</li>
			{/each}
		</ul>
	</details>
</section>
