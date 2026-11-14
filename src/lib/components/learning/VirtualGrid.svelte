<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	/**
	 * Windowed grid: renders only the rows in view (plus a margin), so thousands of items
	 * cost as little as dozens. Every item must have the same height (`rowHeight`, px).
	 * The scrolling element is this component's own container; give it a height via `class`.
	 */
	let {
		items,
		rowHeight,
		gap = 8,
		minColumnWidth = 320,
		overscan = 3,
		label,
		class: className = '',
		children
	}: {
		items: readonly T[];
		rowHeight: number;
		gap?: number;
		minColumnWidth?: number;
		overscan?: number;
		label: string;
		class?: string;
		children: Snippet<[T, number]>;
	} = $props();

	let scroller = $state<HTMLDivElement>();
	let width = $state(800);
	let height = $state(400);
	let scrollTop = $state(0);

	let columns = $derived(Math.max(1, Math.floor((width + gap) / (minColumnWidth + gap))));
	let rowCount = $derived(Math.ceil(items.length / columns));
	let step = $derived(rowHeight + gap);
	let first = $derived(Math.max(0, Math.floor(scrollTop / step) - overscan));
	let last = $derived(Math.min(rowCount, Math.ceil((scrollTop + height) / step) + overscan));
	let visible = $derived(items.slice(first * columns, last * columns));

	// A new list (new search) starts at the top.
	$effect(() => {
		void items;
		if (scroller) scroller.scrollTop = 0;
		scrollTop = 0;
	});
</script>

<!-- A scrollable region must be keyboard focusable. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={scroller}
	bind:clientWidth={width}
	bind:clientHeight={height}
	onscroll={() => (scrollTop = scroller?.scrollTop ?? 0)}
	role="list"
	aria-label={label}
	class="overflow-y-auto {className}"
	tabindex="0"
>
	<div style="height: {Math.max(0, rowCount * step - gap)}px; position: relative;">
		<div
			style="position: absolute; inset-inline: 0; top: {first *
				step}px; display: grid; grid-template-columns: repeat({columns}, minmax(0, 1fr)); gap: {gap}px; grid-auto-rows: {rowHeight}px;"
		>
			{#each visible as item, i (first * columns + i)}
				{@render children(item, first * columns + i)}
			{/each}
		</div>
	</div>
</div>
