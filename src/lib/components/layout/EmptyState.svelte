<script lang="ts">
	import Sprout from '@lucide/svelte/icons/sprout';
	import type { Snippet } from 'svelte';

	/**
	 * Section without content yet: a soft panel with a marker icon, the status in one line,
	 * one or two short sentences, and one next action. No illustration.
	 */
	let { title, children, actions }: { title: string; children: Snippet; actions?: Snippet } =
		$props();

	const uid = $props.id();
</script>

<section class="rounded-2xl bg-secondary/70 p-6 md:p-8" aria-labelledby="{uid}-heading">
	<div class="flex gap-4">
		<span
			class="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-background text-primary"
		>
			<Sprout class="size-5" aria-hidden="true" />
		</span>
		<div class="space-y-3">
			<h2 id="{uid}-heading" class="text-xl font-semibold">{title}</h2>
			<div class="space-y-3 text-pretty text-secondary-foreground">{@render children()}</div>
			{#if actions}
				<div class="flex flex-wrap items-center gap-x-6 gap-y-3 pt-3">{@render actions()}</div>
			{/if}
		</div>
	</div>
</section>
