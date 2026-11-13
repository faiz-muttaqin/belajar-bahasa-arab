<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Sheet from '#lib/components/ui/sheet/index.js';
	import { activeSectionId, sections } from '#lib/navigation.js';

	const headerSections = sections.filter((s) => s.inHeader);

	let active = $derived(activeSectionId(page.route.id));
	let menuOpen = $state(false);
</script>

<header class="sticky top-0 z-40 border-b bg-background">
	<div class="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 md:px-6">
		<a
			href={resolve('/')}
			class="me-auto inline-flex min-h-11 items-center rounded-md text-lg font-semibold"
			aria-current={active === 'beranda' ? 'page' : undefined}
		>
			Belajar Bahasa Arab
		</a>

		<nav aria-label="Navigasi utama" class="hidden lg:block">
			<ul class="flex items-center gap-1">
				{#each headerSections as section (section.id)}
					<li>
						<a
							href={resolve(section.path)}
							aria-current={active === section.id ? 'page' : undefined}
							class="inline-flex min-h-11 items-center rounded-md px-3 text-base font-medium text-muted-foreground decoration-2 underline-offset-8 transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline"
						>
							{section.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

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
							<li>
								<a
									href={resolve(section.path)}
									aria-current={active === section.id ? 'page' : undefined}
									onclick={() => (menuOpen = false)}
									class="block rounded-md py-3 aria-[current=page]:text-primary"
								>
									<span class="block text-base font-semibold">{section.label}</span>
									<span class="block text-sm text-pretty text-muted-foreground">
										{section.summary}
									</span>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</header>
