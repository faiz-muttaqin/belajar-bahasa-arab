<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import '#lib/theme/fonts.css';
	import { onMount } from 'svelte';
	import { startBackgroundCatalog } from '#lib/catalog/sync.svelte.js';
	import { startBrowserSpeech } from '#lib/audio/speech.svelte.js';
	import { asset } from '$app/paths';
	import favicon from '#lib/assets/favicon.svg';
	import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from '#lib/site.js';
	import SiteFooter from '#lib/components/layout/SiteFooter.svelte';
	import DesktopSidebar from '#lib/components/layout/DesktopSidebar.svelte';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import TabBar from '#lib/components/layout/TabBar.svelte';
	import { themeInitScriptTag, themeMode } from '#lib/theme/index.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	let isThemeEditor = $derived(page.route.id === '/editor/theme');

	// Follow saved preference, OS colour-scheme changes and other tabs (reference counted).
	onMount(() => themeMode.start());
	onMount(startBackgroundCatalog);
	onMount(startBrowserSpeech);
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="icon" href={asset('favicon.ico')} sizes="48x48" />
	<link rel="apple-touch-icon" href={asset('apple-touch-icon.png')} />
	<meta name="theme-color" content="#fbfaf7" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#111715" media="(prefers-color-scheme: dark)" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="id_ID" />
	<meta property="og:url" content={`${SITE_ORIGIN}${page.url.pathname}`} />
	<meta property="og:image" content={OG_IMAGE.url} />
	<meta property="og:image:width" content={String(OG_IMAGE.width)} />
	<meta property="og:image:height" content={String(OG_IMAGE.height)} />
	<meta property="og:image:alt" content={OG_IMAGE.alt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={OG_IMAGE.url} />
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

	<div
		class={[
			'min-w-0 pb-[calc(4rem+env(safe-area-inset-bottom))]',
			isThemeEditor ? 'md:pb-0' : 'lg:pb-0'
		]}
	>
		<main
			id="konten"
			tabindex="-1"
			class="w-full min-w-0 px-4 pt-8 md:px-6 lg:px-8 lg:pt-10 2xl:px-12"
		>
			{@render children()}
		</main>
		<SiteFooter />
	</div>
</div>

{#if !isThemeEditor}
	<TabBar />
{/if}
