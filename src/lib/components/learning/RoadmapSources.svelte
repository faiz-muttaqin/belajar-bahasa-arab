<script lang="ts">
	import type { RoadmapSource } from '#lib/domain/roadmap/types.js';
	let { sources }: { sources: readonly RoadmapSource[] } = $props();
</script>

<details class="border-t pt-3">
	<summary class="min-h-11 cursor-pointer font-medium">Sumber pembelajaran</summary>
	<ul class="mt-2 space-y-3">
		{#each sources as source (source.href)}
			<li>
				<!-- eslint-disable svelte/no-navigation-without-resolve -- external source recorded in the map -->
				<a
					href={source.href}
					target="_blank"
					rel="noopener noreferrer"
					class="break-words text-primary underline underline-offset-4">{source.label}</a
				>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</li>
		{/each}
	</ul>
</details>
