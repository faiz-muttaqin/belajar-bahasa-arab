<script lang="ts">
	// DEV-only UI preview (TEST FIXTURE — NOT A LESSON). See HomePreview.svelte.
	import VocabCard from '#lib/components/learning/VocabCard.svelte';
	import { FIXTURE_LABEL, previewVocabulary } from './ui-preview.js';

	let { hafalan = false }: { hafalan?: boolean } = $props();
</script>

<div class="space-y-3">
	<p class="text-sm font-semibold text-muted-foreground">
		{FIXTURE_LABEL} · hanya tampil saat pengembangan
	</p>
	<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each previewVocabulary as item (item.id)}
			<li>
				{#key hafalan}<VocabCard {item} {hafalan} />{/key}
			</li>
		{/each}
	</ul>
</div>
