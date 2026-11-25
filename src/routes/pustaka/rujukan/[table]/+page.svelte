<script lang="ts">
	import { resolve } from '$app/paths';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ReferenceTable from '#lib/components/learning/ReferenceTable.svelte';
	import LocalBadge from '#lib/components/local/LocalBadge.svelte';
	import type { ReferenceTableData } from '#lib/domain/reference/table.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// A local table is shown with the shared reference table (memorisation mode, row notes).
	// It is never marked as approved: it stays a draft and never goes through `isPublishable`.
	let table = $derived<ReferenceTableData>({
		id: data.table.id,
		title: data.table.title,
		caption: data.table.caption,
		columns: data.table.columns,
		rows: data.table.rows,
		reviewStatus: 'draft',
		sources: [data.table.origin]
	});
</script>

<div class="min-w-0 space-y-8">
	<a
		href={resolve('pustaka/')}
		class="inline-flex min-h-11 items-center gap-1 font-medium text-primary hover:underline"
	>
		<ChevronLeft class="size-5" aria-hidden="true" />
		Pustaka
	</a>

	<PageIntro
		title={data.table.title}
		description="Tabel rujukan dari {data.source
			.name}, dalam bahasa aslinya. Salinan lokal, belum ditinjau."
		section="pustaka"
	/>

	<LocalBadge source={data.source} origin={data.table.origin} />

	{#key data.table.id}
		<ReferenceTable {table} />
	{/key}
</div>
