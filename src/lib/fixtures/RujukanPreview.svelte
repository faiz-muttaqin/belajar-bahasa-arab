<script lang="ts">
	// DEV-only UI preview (TEST FIXTURE — NOT A LESSON). See HomePreview.svelte.
	import ReferenceTable from '#lib/components/learning/ReferenceTable.svelte';
	import { FIXTURE_LABEL, previewTable } from './ui-preview.js';
</script>

<section class="mt-16 space-y-4" aria-labelledby="pratinjau-tabel">
	<h2 id="pratinjau-tabel" class="text-sm font-semibold text-muted-foreground">
		{FIXTURE_LABEL} · hanya tampil saat pengembangan
	</h2>
	<ReferenceTable table={previewTable} />
</section>
