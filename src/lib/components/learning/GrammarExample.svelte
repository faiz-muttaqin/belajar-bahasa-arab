<script lang="ts">
	import type { GrammarExample, GrammarRole } from '#lib/content/grammar-rules.js';
	import { GRAMMAR_ROLE_LABELS } from '#lib/content/grammar-rules.js';

	let { example }: { example: GrammarExample } = $props();

	// Colour is redundant with the explicit grammatical role. These use the site's
	// configurable chart colours and stay visible in dark mode and without JS.
	const roleColors: Record<GrammarRole, string> = {
		manut: 'border-chart-2/50 bg-chart-2/10',
		nat: 'border-chart-4/50 bg-chart-4/10',
		mubtada: 'border-chart-2/50 bg-chart-2/10',
		khabar: 'border-chart-3/50 bg-chart-3/10',
		mudaf: 'border-chart-2/50 bg-chart-2/10',
		'mudaf-ilaih': 'border-chart-1/50 bg-chart-1/10'
	};
</script>

<figure class="min-w-0 rounded-2xl border bg-card p-4 sm:p-5">
	<div
		class="flex flex-wrap justify-start gap-3"
		dir="rtl"
		aria-label="Contoh kata Arab, arti per kata, dan peran nahwu"
	>
		{#each example.tokens as token, i (`${example.id}-${i}`)}
			<div
				class="flex max-w-full min-w-0 flex-col items-center gap-1 rounded-xl border px-3 py-2 text-center {roleColors[
					token.role
				]}"
				data-role={token.role}
			>
				<span lang="ar" dir="rtl" class="arabic-block! text-2xl! sm:text-3xl!">
					{token.arabic}
				</span>
				<span lang="id" dir="ltr" class="text-sm font-semibold text-foreground">
					{token.gloss}
				</span>
				<span lang="id" dir="ltr" class="max-w-40 text-xs text-muted-foreground">
					{GRAMMAR_ROLE_LABELS[token.role]}
				</span>
			</div>
		{/each}
	</div>
	<figcaption class="mt-4 space-y-1 border-t pt-3">
		<p class="font-medium">{example.translation}</p>
		<p class="text-sm text-muted-foreground">{example.note}</p>
	</figcaption>
</figure>
