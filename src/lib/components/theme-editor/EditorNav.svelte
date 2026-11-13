<!--
	Section navigation for the theme editor, adapted to the screen (Material 3 window
	size classes, Apple HIG):
	- phones: fixed bottom navigation bar, icon with label, 48px+ targets in thumb reach;
	- tablets (md): left navigation rail;
	- desktop (lg): left sidebar with full labels.
	Items are plain hash links, so they also work without JavaScript.
-->
<script lang="ts" module>
	import type { Component } from 'svelte';

	export type NavItem = { id: string; label: string; short: string; icon: Component };
</script>

<script lang="ts">
	let { items, active }: { items: NavItem[]; active: string } = $props();
</script>

<!-- Tablet and desktop: rail / sidebar -->
<nav
	aria-label="Bagian editor"
	class="fixed inset-y-0 left-0 z-30 hidden w-20 flex-col border-r border-sidebar-border bg-sidebar pt-4 text-sidebar-foreground md:flex lg:w-56 lg:px-3"
>
	<ul class="flex flex-col gap-1 px-2 lg:px-0">
		{#each items as item (item.id)}
			{@const Icon = item.icon}
			<li>
				<a
					href={`#${item.id}`}
					aria-current={active === item.id ? 'location' : undefined}
					class="flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-1 text-center text-xs font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring aria-[current]:bg-sidebar-primary aria-[current]:text-sidebar-primary-foreground lg:min-h-11 lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:text-left lg:text-sm"
				>
					<Icon class="size-5 shrink-0" aria-hidden="true" />
					<span class="lg:hidden">{item.short}</span>
					<span class="hidden lg:inline">{item.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<!-- Phones: bottom navigation bar -->
<nav
	aria-label="Bagian editor"
	class="fixed inset-x-0 bottom-0 z-30 border-t border-sidebar-border bg-sidebar pb-[env(safe-area-inset-bottom)] text-sidebar-foreground md:hidden"
>
	<ul class="grid" style:grid-template-columns={`repeat(${items.length}, minmax(0, 1fr))`}>
		{#each items as item (item.id)}
			{@const Icon = item.icon}
			<li>
				<a
					href={`#${item.id}`}
					aria-current={active === item.id ? 'location' : undefined}
					class="group flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-xs font-medium focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-sidebar-ring"
				>
					<span
						class="grid h-8 w-14 place-items-center rounded-full group-aria-[current]:bg-sidebar-primary group-aria-[current]:text-sidebar-primary-foreground"
					>
						<Icon class="size-5" aria-hidden="true" />
					</span>
					<span class="max-w-full truncate">{item.short}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
