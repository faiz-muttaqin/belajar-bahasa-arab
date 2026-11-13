<script lang="ts">
	// DEV-only UI preview (TEST FIXTURE — NOT A LESSON). Loaded with a dynamic import inside
	// `import.meta.env.DEV`, so it is not part of the production bundle.
	import { Button } from '#lib/components/ui/button/index.js';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import { stripHarakat } from '#lib/domain/arabic/harakat.js';
	import { FIXTURE_LABEL, previewSpecimen } from './ui-preview.js';

	let showPlain = $state(false);
</script>

<section class="mt-16 max-w-[65ch] space-y-4 border-t pt-8" aria-labelledby="pratinjau-heading">
	<h2 id="pratinjau-heading" class="text-sm font-semibold text-muted-foreground">
		{FIXTURE_LABEL} · hanya tampil saat pengembangan
	</h2>
	<ArabicText size="display" text={showPlain ? stripHarakat(previewSpecimen) : previewSpecimen} />
	<Button variant="outline" onclick={() => (showPlain = !showPlain)} aria-pressed={showPlain}>
		{showPlain ? 'Tampilkan harakat' : 'Sembunyikan harakat'}
	</Button>
</section>
