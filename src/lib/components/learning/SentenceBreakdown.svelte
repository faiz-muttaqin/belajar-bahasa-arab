<script lang="ts">
	import { analyzedText, type AnalysisGroup } from '#lib/content/lessons/analysis.js';
	import ArabicText from './ArabicText.svelte';
	import AudioPlayButton from './AudioPlayButton.svelte';
	import SentenceWordNotes from './SentenceWordNotes.svelte';
	import MixedText from './MixedText.svelte';

	let { groups }: { groups: readonly AnalysisGroup[] } = $props();
</script>

<section id="bedah-kalimat" aria-labelledby="bedah-heading" class="scroll-mt-24 space-y-4">
	<h2 id="bedah-heading" class="text-2xl font-semibold">Bedah per kata</h2>
	<p class="text-pretty text-muted-foreground">
		Sharaf menjelaskan bentuk kata. Nahwu menjelaskan tugas kata di kalimat dan alasan harakat
		akhirnya.
	</p>

	{#each groups as group, g (group.heading)}
		<details open={g === 0} class="rounded-xl border bg-card px-4 sm:px-5">
			<summary class="min-h-11 cursor-pointer py-3 font-semibold text-primary">
				{group.heading}
			</summary>
			<div class="space-y-6 border-t pb-5">
				{#each group.sentences as sentence, i (i)}
					<div class="space-y-3 pt-4">
						<div class="text-start text-xl">
							<div class="flex flex-wrap items-start gap-2">
								<ArabicText text={analyzedText(sentence)} class="block wrap-break-word" />
								<AudioPlayButton text={analyzedText(sentence)} label="Dengarkan kalimat Arab" compact />
							</div>
						</div>
						<SentenceWordNotes {sentence} />
					</div>
				{/each}
				{#if group.comparison}
					<p class="rounded-lg bg-secondary p-4 text-secondary-foreground">
						<strong>Yang berubah</strong> · <MixedText text={group.comparison} />
					</p>
				{/if}
			</div>
		</details>
	{/each}
</section>
