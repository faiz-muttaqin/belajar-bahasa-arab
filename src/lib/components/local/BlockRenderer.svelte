<script lang="ts">
	import type { Block } from '#lib/domain/local-content/types.js';
	import BlockRenderer from './BlockRenderer.svelte';
	import Callout from './Callout.svelte';
	import InlineText from './InlineText.svelte';

	/** Renders a local lesson body from the block model. Elements only, no `{@html}`. */
	let { blocks }: { blocks: Block[] } = $props();

	const uid = $props.id();
</script>

<div class="min-w-0 space-y-5">
	{#each blocks as block, i (i)}
		{#if block.type === 'heading'}
			{#if block.level === 2}
				<h2 class="mt-10 text-2xl font-semibold text-balance first:mt-0">
					<InlineText inlines={block.inlines} />
				</h2>
			{:else if block.level === 3}
				<h3 class="mt-8 text-xl font-semibold text-balance">
					<InlineText inlines={block.inlines} />
				</h3>
			{:else}
				<h4 class="mt-6 text-lg font-semibold text-balance">
					<InlineText inlines={block.inlines} />
				</h4>
			{/if}
		{:else if block.type === 'paragraph'}
			<p class="max-w-[68ch] text-pretty"><InlineText inlines={block.inlines} /></p>
		{:else if block.type === 'list'}
			{#if block.ordered}
				<ol class="max-w-[68ch] list-decimal space-y-2 ps-6">
					{#each block.items as item, j (j)}
						<li class="ps-1"><InlineText inlines={item} /></li>
					{/each}
				</ol>
			{:else}
				<ul class="max-w-[68ch] list-disc space-y-2 ps-6">
					{#each block.items as item, j (j)}
						<li class="ps-1"><InlineText inlines={item} /></li>
					{/each}
				</ul>
			{/if}
		{:else if block.type === 'table'}
			<!-- Scrollable region must be keyboard-focusable (axe: scrollable-region-focusable). -->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="overflow-x-auto rounded-md border"
				role="region"
				aria-label="Tabel"
				tabindex="0"
				id="{uid}-table-{i}"
			>
				<table class="w-full border-collapse text-start">
					<thead>
						<tr class="border-b bg-muted/40">
							{#each block.header as cell, j (j)}
								<th scope="col" class="px-4 py-3 text-start text-base font-semibold">
									<InlineText inlines={cell} />
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each block.rows as row, r (r)}
							<tr class="border-b last:border-b-0">
								{#each row as cell, c (c)}
									<td class="px-4 py-3 align-top text-base">
										<InlineText inlines={cell} />
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else if block.type === 'quote'}
			<blockquote class="max-w-[68ch] border-s-4 border-primary/40 ps-4 text-muted-foreground">
				<BlockRenderer blocks={block.blocks} />
			</blockquote>
		{:else if block.type === 'arabic'}
			<figure
				class="space-y-1 rounded-2xl bg-secondary/70 px-4 py-4 md:px-6"
				data-arabic={block.variant}
			>
				<p lang="ar" dir="rtl" class="arabic-block text-secondary-foreground">{block.text}</p>
				{#if block.reference}
					<figcaption class="font-sans text-base text-muted-foreground">
						<bdi lang="id">QS</bdi>
						<bdi class="tabular-nums">{block.reference}</bdi>
					</figcaption>
				{/if}
			</figure>
		{:else if block.type === 'callout'}
			<Callout kind={block.kind} title={block.title}>
				<BlockRenderer blocks={block.blocks} />
			</Callout>
		{/if}
	{/each}
</div>
