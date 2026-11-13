<!-- Light / dark / system choice as a native radio group: keyboard and screen reader friendly. -->
<script lang="ts">
	import { MODE_LABELS, MODE_PREFERENCES, type ModePreference } from '#lib/theme/tokens.js';

	let {
		value,
		onchange,
		hideLegend = false
	}: {
		value: ModePreference;
		onchange: (value: ModePreference) => void;
		hideLegend?: boolean;
	} = $props();
</script>

<fieldset class="min-w-0">
	<legend class={hideLegend ? 'sr-only' : 'mb-1.5 text-sm font-medium'}>Mode tampilan</legend>
	<div class="inline-flex flex-wrap gap-1 rounded-lg border border-border bg-muted p-1">
		{#each MODE_PREFERENCES as mode (mode)}
			<label
				class="relative flex min-h-9 cursor-pointer items-center rounded-md px-2.5 text-sm font-medium text-muted-foreground has-checked:bg-background has-checked:text-foreground has-checked:shadow-xs has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring sm:px-3"
			>
				<input
					type="radio"
					name="mode"
					value={mode}
					checked={value === mode}
					onchange={() => onchange(mode)}
					class="sr-only"
				/>
				{#if mode === 'system'}
					<!-- Shorter label on phones so the toolbar fits on one row. -->
					<span class="sm:hidden">Sistem</span><span class="hidden sm:inline"
						>{MODE_LABELS[mode]}</span
					>
				{:else}
					{MODE_LABELS[mode]}
				{/if}
			</label>
		{/each}
	</div>
</fieldset>
