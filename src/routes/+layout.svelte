<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import SiteFooter from '#lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import TabBar from '#lib/components/layout/TabBar.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a
	href="#konten"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:font-semibold focus:shadow-md"
>
	Langsung ke konten
</a>

<SiteHeader />

<!-- Bottom padding keeps the footer clear of the mobile tab bar. -->
<div class="pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
	<main id="konten" tabindex="-1" class="mx-auto max-w-5xl px-4 pt-12 md:px-6 md:pt-16">
		{@render children()}
	</main>
	<SiteFooter />
</div>

<TabBar />
