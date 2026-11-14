<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Search from '@lucide/svelte/icons/search';
	import { activeSectionId, sections } from '#lib/navigation.js';
	import { sectionIcons } from './section-icons.js';
	import ThemeToggle from './ThemeToggle.svelte';

	let active = $derived(activeSectionId(page.route.id));
</script>

<aside
	class="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r bg-sidebar text-sidebar-foreground lg:flex"
	aria-label="Navigasi desktop"
>
	<div class="border-b px-5 py-6">
		<a href={resolve('/')} class="block rounded-md text-lg leading-tight font-bold">
			Belajar Bahasa Arab
		</a>
		<p class="mt-2 text-xs text-muted-foreground">Belajar, telusuri, dan hafalkan</p>
	</div>

	<nav aria-label="Navigasi utama" class="min-h-0 flex-1 overflow-y-auto px-3 py-4">
		<ul class="space-y-1">
			{#each sections as section (section.id)}
				{@const Icon = sectionIcons[section.id]}
				<li>
					<a
						href={resolve(section.path)}
						aria-current={active === section.id ? 'page' : undefined}
						class="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground aria-[current=page]:bg-sidebar-accent aria-[current=page]:font-semibold aria-[current=page]:text-primary"
					>
						<Icon aria-hidden="true" class="size-5 shrink-0" />
						{section.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="flex items-center justify-between gap-3 border-t px-5 py-4">
		<span class="text-xs text-muted-foreground">Tampilan</span>
		<ThemeToggle />
	</div>
</aside>
