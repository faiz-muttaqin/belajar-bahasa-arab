<!--
	Arabic text with the correct language, direction and isolation. Uses the theme's
	Arabic font (`--arabic-font`) through the `:lang(ar)` base style in layout.css.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '#lib/utils.js';

	let {
		children,
		class: className,
		...rest
	}: HTMLAttributes<HTMLSpanElement> & { children: Snippet } = $props();
</script>

<bdi lang="ar" dir="rtl" class={cn('inline-block', className)} {...rest}>{@render children()}</bdi>
