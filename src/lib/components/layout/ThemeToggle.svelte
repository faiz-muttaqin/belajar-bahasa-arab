<script lang="ts">
	import Monitor from '@lucide/svelte/icons/monitor';
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import { Button } from '#lib/components/ui/button/index.js';
	import { MODE_LABELS, themeMode, type ModePreference } from '#lib/theme/index.js';

	// Compact header control: cycles light -> dark -> system. The full radio group lives in
	// the Menu sheet and the theme editor.
	const order: ModePreference[] = ['light', 'dark', 'system'];
	const icons = { light: Sun, dark: Moon, system: Monitor };

	let current = $derived(themeMode.preference);
	let next = $derived(order[(order.indexOf(current) + 1) % order.length] ?? 'system');
	let Icon = $derived(icons[current]);
</script>

<Button
	variant="ghost"
	size="icon"
	onclick={() => themeMode.set(next)}
	aria-label="Mode tampilan: {MODE_LABELS[current]}. Ganti ke {MODE_LABELS[next]}"
	title="Mode tampilan: {MODE_LABELS[current]}"
>
	<Icon class="size-5" aria-hidden="true" />
</Button>
