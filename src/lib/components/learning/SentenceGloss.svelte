<script lang="ts">
	import type { SentenceExample, SentenceRole } from '#lib/content/sentence-rules.js';
	import { SENTENCE_ROLE_LABELS, VERB_MOOD_LABELS } from '#lib/content/sentence-rules.js';
	import { IRAB_CASE_LABELS } from '#lib/content/phrase-rules.js';

	let { example }: { example: SentenceExample } = $props();

	// A grammatical role is visually different from another, but text labels are always shown.
	// Do NOT conflate the colors with noun case (i‘rab) or verb mood.
	const roleColor: Record<SentenceRole, string> = {
		topic: 'border-chart-2/50 bg-chart-2/10',
		predicate: 'border-chart-3/50 bg-chart-3/10',
		verb: 'border-chart-1/50 bg-chart-1/10',
		agent: 'border-chart-2/50 bg-chart-2/10',
		object: 'border-chart-5/50 bg-chart-5/10',
		deputy: 'border-chart-4/50 bg-chart-4/10',
		particle: 'border-border bg-secondary/70'
	};
</script>

<figure class="min-w-0 rounded-2xl border bg-card p-4 sm:p-5">
	<div
		class="flex flex-wrap justify-start gap-3"
		dir="rtl"
		aria-label="Kalimat Arab dengan glos Indonesia, peran kata dan penanda i‘rab"
	>
		{#each example.tokens as token, i (example.id + '-' + i)}
			<div
				class="flex max-w-full min-w-0 flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center {roleColor[
					token.role
				]}"
				data-role={token.role}
				data-irab={token.irab ?? 'none'}
				data-mood={token.mood ?? 'none'}
			>
				<span lang="ar" dir="rtl" class="text-3xl leading-[1.9]">{token.arabic}</span>
				<span lang="id" dir="ltr" class="text-sm font-semibold">{token.gloss}</span>
				<span lang="id" dir="ltr" class="max-w-44 text-xs text-muted-foreground">
					{SENTENCE_ROLE_LABELS[token.role]} · {token.detail}
				</span>
				{#if token.irab}
					<span class="rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium">
						Isim · {IRAB_CASE_LABELS[token.irab]} ({token.marker})
					</span>
				{:else if token.mood}
					<span class="rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium">
						Fi‘il · {VERB_MOOD_LABELS[token.mood]} ({token.marker})
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
