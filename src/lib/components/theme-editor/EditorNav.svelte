<script lang="ts" module>
	import type { Component } from 'svelte';

	export type NavItem = { id: string; label: string; short: string; icon: Component };
</script>

<script lang="ts">
	let { items, active }: { items: NavItem[]; active: string } = $props();
</script>

<!-- Fixed at the bottom on phones and part of the toolbar on larger screens. -->
<nav
	aria-label="Bagian editor"
	class="max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:z-30 max-md:border-t max-md:border-sidebar-border max-md:bg-sidebar max-md:pb-[env(safe-area-inset-bottom)] max-md:text-sidebar-foreground md:overflow-x-auto"
>
	<ul class="flex md:w-max md:gap-1 md:pb-2">
		{#each items as item (item.id)}
			{@const Icon = item.icon}
			<li class="min-w-0 max-md:flex-1">
				<a
					href={`#${item.id}`}
					aria-label={item.label}
					aria-current={active === item.id ? 'location' : undefined}
					class="group flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-xs font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring md:min-h-11 md:flex-row md:gap-2 md:rounded-md md:px-3 md:text-sm md:hover:bg-accent md:aria-[current]:bg-accent md:aria-[current]:text-accent-foreground"
				>
					<span
						class="grid place-items-center max-md:h-8 max-md:w-full max-md:max-w-14 max-md:rounded-full max-md:group-aria-[current]:bg-sidebar-primary max-md:group-aria-[current]:text-sidebar-primary-foreground"
					>
						<Icon class="size-5" aria-hidden="true" />
					</span>
					<span class="max-w-full truncate xl:hidden">{item.short}</span>
					<span class="hidden xl:inline">{item.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
