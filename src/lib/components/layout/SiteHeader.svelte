<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Search from '@lucide/svelte/icons/search';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Sheet from '#lib/components/ui/sheet/index.js';
	import ModeSwitcher from '#lib/components/theme-editor/ModeSwitcher.svelte';
	import { activeSectionId, sections } from '#lib/navigation.js';
	import { themeMode } from '#lib/theme/index.js';
	import { sectionIcons } from './section-icons.js';

	let active = $derived(activeSectionId(page.route.id));
	let menuOpen = $state(false);
</script>

<header class="sticky top-0 z-40 border-b bg-background lg:hidden">
	<div class="flex h-16 items-center gap-2 px-4 md:gap-4 md:px-6">
		<a
			href={resolve('/')}
			class="me-auto inline-flex min-h-11 items-center rounded-md text-lg font-semibold"
			aria-current={active === 'beranda' ? 'page' : undefined}
		>
			Belajar Bahasa Arab
		</a>

		<a
			href={resolve('cari/')}
			aria-label="Cari materi"
			aria-current={active === 'cari' ? 'page' : undefined}
			class="inline-flex size-11 shrink-0 items-center justify-center rounded-md hover:bg-accent aria-[current=page]:text-primary"
		>
			<Search class="size-5" aria-hidden="true" />
		</a>

		<Sheet.Root bind:open={menuOpen}>
			<Sheet.Trigger>
				{#snippet child({ props })}
					<Button variant="ghost" class="lg:hidden" {...props}>
						<MenuIcon aria-hidden="true" />
						Menu
					</Button>
				{/snippet}
			</Sheet.Trigger>
			<Sheet.Content side="right" class="overflow-y-auto overscroll-contain">
				<Sheet.Header>
					<Sheet.Title class="text-lg">Menu</Sheet.Title>
					<Sheet.Description>Semua bagian situs.</Sheet.Description>
				</Sheet.Header>
				<nav aria-label="Semua bagian" class="px-4 pb-6">
					<ul class="divide-y">
						{#each sections as section (section.id)}
							{@const Icon = sectionIcons[section.id]}
							<li>
								<a
									href={resolve(section.path)}
									aria-current={active === section.id ? 'page' : undefined}
									onclick={() => (menuOpen = false)}
									class="flex gap-3 rounded-md py-3 aria-[current=page]:text-primary"
								>
									<span
										class="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"
									>
										<Icon class="size-5" aria-hidden="true" />
									</span>
									<span>
										<span class="block text-base font-semibold">{section.label}</span>
										<span class="block text-sm text-pretty text-muted-foreground">
											{section.summary}
										</span>
									</span>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
				<div class="border-t px-4 py-5">
					<ModeSwitcher value={themeMode.preference} onchange={(v) => themeMode.set(v)} />
				</div>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</header>
