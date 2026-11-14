<script lang="ts">
	import type { IrabCase, PhraseExample } from '#lib/content/phrase-rules.js';
	import { IRAB_CASE_LABELS } from '#lib/content/phrase-rules.js';

	let { example }: { example: PhraseExample } = $props();

	// Colours indicate *case*, not word class or lexical meaning. Text labels remain visible.
	const caseTint: Record<IrabCase, string> = {
		raf: 'border-chart-2/50 bg-chart-2/10',
		nasb: 'border-chart-3/50 bg-chart-3/10',
		jarr: 'border-chart-4/50 bg-chart-4/10'
	};
</script>

<figure class="min-w-0 rounded-2xl border bg-card p-4 sm:p-5">
	<div
		class="flex flex-wrap justify-start gap-3"
		dir="rtl"
		aria-label="Susunan Arab dan terjemahan di bawah setiap kata, dengan label i‘rab"
	>
		{#each example.tokens as token, i (example.id + '-' + i)}
			<div
				data-irab={token.irab ?? 'none'}
				class="flex min-w-0 max-w-full flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center {token.irab
					? caseTint[token.irab]
					: 'border-border bg-secondary/50'}"
			>
				<span lang="ar" dir="rtl" class="text-3xl leading-[1.9]">{token.arabic}</span>
				<span lang="id" dir="ltr" class="text-sm font-semibold text-foreground">{token.gloss}</span>
				<span lang="id" dir="ltr" class="max-w-44 text-xs text-muted-foreground">{token.role}</span>
				{#if token.irab}
					<span class="rounded-md bg-background/70 px-2 py-0.5 text-xs font-semibold">
						{IRAB_CASE_LABELS[token.irab]} · {token.marker}
					</span>
				{/if}
			</div>
		{/each}
	</div>
	<figcaption class="mt-4 border-t pt-3">
		<p class="font-medium">{example.translation}</p>
		<p class="mt-1 text-sm text-muted-foreground">{example.explanation}</p>
	</figcaption>
</figure>
