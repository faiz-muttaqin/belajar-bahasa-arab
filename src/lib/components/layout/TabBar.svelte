<script lang="ts">
	import type { Component } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import BookA from '@lucide/svelte/icons/book-a';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import ChartNoAxesColumn from '@lucide/svelte/icons/chart-no-axes-column';
	import House from '@lucide/svelte/icons/house';
	import ListChecks from '@lucide/svelte/icons/list-checks';
	import { activeSectionId, sections, type SectionId } from '#lib/navigation.js';

	// Mobile-only bottom bar: exactly five labelled destinations. Everything else is in Menu.
	const icons: Partial<Record<SectionId, Component>> = {
		beranda: House,
		belajar: BookOpen,
		latihan: ListChecks,
		kosakata: BookA,
		progres: ChartNoAxesColumn
	};
	const tabs = sections.filter((s) => s.inTabBar);

	let active = $derived(activeSectionId(page.route.id));
</script>

<nav
	aria-label="Navigasi cepat"
	class="fixed inset-x-0 bottom-0 z-40 border-t bg-background pb-[env(safe-area-inset-bottom)] lg:hidden"
>
	<ul class="mx-auto grid max-w-xl grid-cols-5">
		{#each tabs as tab (tab.id)}
			{@const Icon = icons[tab.id]}
			<li>
				<a
					href={resolve(tab.path)}
					aria-current={active === tab.id ? 'page' : undefined}
					class="flex min-h-16 flex-col items-center justify-center gap-1 rounded-md text-xs font-medium text-muted-foreground aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
				>
					{#if Icon}<Icon class="size-6" aria-hidden="true" />{/if}
					{tab.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
