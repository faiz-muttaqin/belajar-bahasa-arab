<script lang="ts">
	import { resolve } from '$app/paths';
	import { wazanHash, wazanLink } from '#lib/content/wazan-links.js';
	import ArabicText from './ArabicText.svelte';

	/** Link from an example to its own wazan group and verb row in the 22-bab reference. */
	let { bab, dataId, class: className }: { bab: number; dataId: string; class?: string } = $props();

	let link = $derived(wazanLink(bab, dataId));
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- resolve() gives the path; the fragment is the verb row on that page -->
<a
	href={resolve(link.path as '/') + wazanHash(link)}
	class="inline-flex min-h-11 items-center text-sm text-primary underline {className ?? ''}"
	data-wazan-bab={link.bab}
	data-wazan-row={link.anchor}
>
	Kelompok wazan: {link.title}{#if link.madhi}
		(<ArabicText text={link.madhi} /> / <ArabicText text={link.mudhari} />){/if}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
