<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import favicon from '#lib/assets/favicon.svg';
	import { startThemeSync, themeInitScriptTag } from '#lib/theme/runtime.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Follow OS colour scheme changes and theme changes made in other tabs.
	onMount(() => startThemeSync());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- Applies the saved theme (localStorage) before first paint to avoid a flash. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static script built from our own source, no user input -->
	{@html themeInitScriptTag}
</svelte:head>

{@render children()}
