<script lang="ts">
	import { resolve } from '$app/paths';
	import { referenceGroups, type ReferenceGroupId } from '#lib/content/reference-groups.js';
	import { groupStyle } from './reference-group-style.js';

	/** Switch between word-class reference pages. `current` is marked with aria-current. */
	let { current }: { current?: ReferenceGroupId } = $props();
</script>

<nav aria-label="Pilih jenis kata" class="-mx-4 overflow-x-auto px-4 pb-1">
	<ul class="flex min-w-max gap-2">
		{#each referenceGroups as group (group.id)}
			{@const Icon = groupStyle[group.id].icon}
			<li>
				<a
					href={resolve(group.path)}
					aria-current={current === group.id ? 'page' : undefined}
					class="inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors hover:bg-secondary aria-[current=page]:border-primary aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground"
				>
					<Icon class="size-4" aria-hidden="true" />
					{group.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
