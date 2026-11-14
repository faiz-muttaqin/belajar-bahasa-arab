<script lang="ts">
	import { analyzedText, type AnalysisGroup } from '#lib/content/lessons/analysis.js';
	import ArabicText from './ArabicText.svelte';
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
				{#if group.paragraph}Paragraf {group.paragraph} ·
				{/if}{group.heading}
			</summary>
			<div class="space-y-6 border-t pb-5">
				{#each group.sentences as sentence, i (i)}
					<div class="space-y-3 pt-4">
						<div class="text-start text-xl">
							<ArabicText text={analyzedText(sentence)} class="block wrap-break-word" />
						</div>
						<ol class="divide-y rounded-lg border">
							{#each sentence.words as [arabic, meaning, kind, sharaf, nahwu], w (w)}
								<li class="space-y-2 px-3 py-3 sm:px-4">
									<p class="flex flex-wrap items-baseline gap-x-3">
										<ArabicText text={arabic} class="font-semibold" />
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
