<script lang="ts">
	import { onDestroy } from 'svelte';
	import Volume2 from '@lucide/svelte/icons/volume-2';
	import Square from '@lucide/svelte/icons/square';
	import { browserSpeech, speakArabic, stopArabicSpeech } from '#lib/audio/speech.svelte.js';

	let {
		text,
		label = 'Dengarkan bahasa Arab',
		compact = false
	}: {
		/** Exact Arabic source, with harakat if available. Never generated from an Indonesian gloss. */
		text: string;
		label?: string;
		compact?: boolean;
	} = $props();

	const key = $props.id();
	let playing = $derived(browserSpeech.activeKey === key);
	let repeated = $derived(browserSpeech.lastKey === key);
	let error = $derived(browserSpeech.errorKey === key ? browserSpeech.error : null);

	onDestroy(() => {
		if (browserSpeech.activeKey === key) stopArabicSpeech();
	});

	function toggle() {
		if (playing) stopArabicSpeech();
		else speakArabic(text, key);
	}
</script>

<div class="inline-flex max-w-full flex-col items-start gap-1">
	<button
		type="button"
		disabled={!browserSpeech.supported || !text.trim()}
		aria-label={playing ? 'Hentikan audio Arab' : label}
		aria-pressed={playing}
		title={browserSpeech.supported
			? playing
				? 'Hentikan audio'
				: repeated
					? 'Putar ulang melalui browser'
					: 'Dengarkan melalui browser'
			: 'Web Speech API tidak tersedia di browser ini'}
		onclick={toggle}
		class={compact
			? 'inline-flex size-11 shrink-0 items-center justify-center rounded-lg border bg-card text-primary hover:bg-secondary disabled:opacity-40'
			: 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border bg-card px-3 text-sm font-medium text-primary hover:bg-secondary disabled:opacity-40'}
	>
		{#if playing}
			<Square aria-hidden="true" class="size-4" />
		{:else}
			<Volume2 aria-hidden="true" class="size-4" />
		{/if}
		{#if !compact}
			{playing ? 'Hentikan' : repeated ? 'Putar ulang' : 'Dengarkan'}
		{/if}
	</button>
	{#if error}
		<span role="alert" class="max-w-56 text-xs text-destructive">{error}</span>
	{/if}
</div>
