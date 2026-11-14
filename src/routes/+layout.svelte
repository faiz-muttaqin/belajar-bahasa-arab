<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import '#lib/theme/fonts.css';
	import { onMount } from 'svelte';
	import { startBackgroundCatalog } from '#lib/catalog/sync.svelte.js';
	import favicon from '#lib/assets/favicon.svg';
	import SiteFooter from '#lib/components/layout/SiteFooter.svelte';
	import DesktopSidebar from '#lib/components/layout/DesktopSidebar.svelte';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import TabBar from '#lib/components/layout/TabBar.svelte';
	import { themeInitScriptTag, themeMode } from '#lib/theme/index.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	let isWideReference = $derived(page.route.id === '/rujukan' || page.route.id === '/sharaf');

	// Follow saved preference, OS colour-scheme changes and other tabs (reference counted).
	onMount(() => themeMode.start());
	onMount(startBackgroundCatalog);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- Saved mode and colours applied before first paint (no flash). Idempotent. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static script built from our own source, no user input -->
	{@html themeInitScriptTag}
</svelte:head>

<a
	href="#konten"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:font-semibold focus:shadow-md"
>
	Langsung ke konten
</a>

<DesktopSidebar />

<!-- Keep mobile header and tabs. Desktop uses a fixed sidebar and available content width. -->
<div class="min-w-0 lg:pl-60">
	<SiteHeader />

	<!-- The reference matrix uses all remaining width. Lessons keep a readable measure. -->
	<div class="min-w-0 pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
		<main
			id="konten"
			tabindex="-1"
			class={isWideReference
				? 'w-full min-w-0 px-4 pt-8 md:px-6 lg:px-8 lg:pt-10 2xl:px-12'
				: 'mx-auto max-w-5xl px-4 pt-10 md:px-6 md:pt-16'}
		>
			{@render children()}
		</main>
		<SiteFooter />
	</div>
</div>

<TabBar />
