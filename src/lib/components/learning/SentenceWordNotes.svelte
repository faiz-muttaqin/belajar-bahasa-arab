<script lang="ts">
	import type { SentenceAnalysis } from '#lib/content/lessons/analysis.js';
	import ArabicText from './ArabicText.svelte';
	import AudioPlayButton from './AudioPlayButton.svelte';
	import MixedText from './MixedText.svelte';

	let { sentence }: { sentence: SentenceAnalysis } = $props();
</script>

<div class="space-y-3">
	<ol class="divide-y rounded-lg border">
		{#each sentence.words as [arabic, meaning, kind, sharaf, nahwu], w (w)}
			<li class="space-y-2 px-3 py-3 sm:px-4">
				<p class="flex flex-wrap items-baseline gap-x-3">
					<ArabicText text={arabic} class="font-semibold" />
					<AudioPlayButton text={arabic} label="Dengarkan kata Arab" compact />
					<span>{meaning}</span>
					<span class="text-sm font-medium text-muted-foreground">{kind}</span>
				</p>
				<dl class="grid gap-x-4 gap-y-2 text-base sm:grid-cols-2">
					<div>
						<dt class="font-semibold">Sharaf</dt>
						<dd class="text-muted-foreground"><MixedText text={sharaf} /></dd>
					</div>
					<div>
						<dt class="font-semibold">Nahwu</dt>
						<dd class="text-muted-foreground"><MixedText text={nahwu} /></dd>
					</div>
				</dl>
			</li>
		{/each}
	</ol>
	<p><strong>Susunan</strong> · <MixedText text={sentence.structure} /></p>
	<details class="border-t">
		<summary class="min-h-11 cursor-pointer py-3 font-medium text-primary">
			Lihat makna utuh
		</summary>
		<p>{sentence.translation}</p>
	</details>
</div>
