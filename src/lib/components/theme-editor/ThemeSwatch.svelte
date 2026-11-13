<!-- Small light/dark sample of a theme, so choices can be compared at a glance. -->
<script lang="ts">
	import type { Theme } from '#lib/theme/tokens.js';

	let { theme }: { theme: Theme } = $props();
</script>

<span class="grid grid-cols-2 overflow-hidden rounded-md border border-border" aria-hidden="true">
	{#each ['light', 'dark'] as const as mode (mode)}
		{@const c = theme[mode]}
		<span class="flex items-center gap-1.5 px-2 py-2" style:background-color={c.background}>
			<span class="text-sm font-semibold" style:color={c.foreground}>Aa</span>
			<span class="size-3.5 rounded-full" style:background-color={c.primary}></span>
			<span class="size-3.5 rounded-full" style:background-color={c.accent}></span>
			<span class="size-3.5 rounded-full" style:background-color={c['muted-foreground']}></span>
		</span>
	{/each}
</span>
