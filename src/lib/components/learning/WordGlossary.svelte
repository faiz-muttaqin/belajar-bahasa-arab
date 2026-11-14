<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import X from '@lucide/svelte/icons/x';
	import type { ReferenceTableData } from '#lib/domain/reference/table.js';
	import ArabicText from './ArabicText.svelte';

	/**
	 * Word grid: each word is a tile with the Arabic and its meaning right below, like the
	 * tashrif pattern list. Tapping a tile opens a modal (native <dialog>: focus trap, Esc and
	 * focus return are built in) with the example and notes. A switch hides the meanings to
	 * practise recall. Without JavaScript the example is printed under each tile.
	 */
	type Detail = { key: string; label: string; lang: 'ar' | 'id' };
	type Group = { title: string; ids: readonly string[] };

	let {
		table,
		groups,
		details = [],
		chipKey,
		arabicKey = 'arabic',
		meaningKey = 'meaning',
		exampleKey = 'example',
		linkKey,
		linkLabel = 'Sumber',
		groupIdPrefix
	}: {
		table: ReferenceTableData;
		groups?: readonly Group[];
		/** Extra columns shown as labelled lines in the modal. */
		details?: readonly Detail[];
		/** Column shown as a small label on the tile and in the modal. */
		chipKey?: string;
		arabicKey?: string;
		meaningKey?: string;
		exampleKey?: string;
		/** Column holding an external URL, shown as a link in the modal. */
		linkKey?: string;
		linkLabel?: string;
		/** Adds an anchor id (prefix + group title) to each group, for sub tabs. */
		groupIdPrefix?: string;
	} = $props();

	const uid = $props.id();
	let dialog = $state<HTMLDialogElement>();
	let selectedId = $state<string | null>(null);
	let hideMeaning = $state(false);
	const revealed = new SvelteSet<string>();

	let rowsById = $derived(new Map(table.rows.map((row) => [row.id, row])));
	let shownGroups = $derived<readonly Group[]>(
		groups ?? [{ title: '', ids: table.rows.map((row) => row.id) }]
	);
	let selected = $derived(selectedId ? rowsById.get(selectedId) : undefined);

	function open(id: string) {
		selectedId = id;
		revealed.add(id);
		dialog?.showModal();
	}

	function isShown(id: string) {
		return !hideMeaning || revealed.has(id);
	}

	function onHideChange() {
		revealed.clear();
	}

	// Search results and old links point at `#<table>-<row>`: open that word directly.
	onMount(() => {
		const prefix = `#${table.id}-`;
		if (!location.hash.startsWith(prefix)) return;
		try {
			const id = decodeURIComponent(location.hash.slice(prefix.length));
			if (rowsById.has(id)) open(id);
		} catch {
			// Ignore malformed percent encoding in incoming links.
		}
	});
</script>

<div class="space-y-6">
	<label class="inline-flex min-h-11 items-center gap-3">
		<input
			type="checkbox"
			bind:checked={hideMeaning}
			onchange={onHideChange}
			class="size-5 accent-primary"
		/>
		<span>Sembunyikan arti, untuk latihan mengingat</span>
	</label>

	{#each shownGroups as group (group.title)}
		<div
			id={groupIdPrefix ? `${groupIdPrefix}${group.title}` : undefined}
			class="scroll-mt-32 space-y-3"
		>
			{#if group.title}<h3 class="font-semibold text-muted-foreground">{group.title}</h3>{/if}
			<ul class="grid grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-3">
				{#each group.ids as id (id)}
					{@const row = rowsById.get(id)}
					{#if row}
						<li id="{table.id}-{row.id}" class="scroll-mt-24">
							<button
								type="button"
								aria-haspopup="dialog"
								onclick={() => open(row.id)}
								class="flex h-full min-h-28 w-full flex-col items-center justify-center gap-1 rounded-2xl border bg-card p-3 text-center transition-colors hover:bg-secondary"
							>
								<ArabicText text={row.cells[arabicKey] ?? ''} size="block" class="text-3xl" />
								<span class="line-clamp-3 text-sm leading-snug">
									{#if isShown(row.id)}
										{row.cells[meaningKey]}
									{:else}
										<span class="text-muted-foreground">Ketuk untuk melihat arti</span>
									{/if}
								</span>
								{#if chipKey && row.cells[chipKey]}
									<span
										class="mt-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
										>{row.cells[chipKey]}</span
									>
								{/if}
							</button>
							<noscript>
								<p class="mt-2 text-sm"><ArabicText text={row.cells[exampleKey] ?? ''} /></p>
								{#if row.explanation}<p class="text-sm text-muted-foreground">
										{row.explanation}
									</p>{/if}
							</noscript>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	{/each}
</div>

<dialog
	bind:this={dialog}
	aria-labelledby="{uid}-title"
	onclose={() => (selectedId = null)}
	onclick={(event) => {
		if (event.target === dialog) dialog?.close();
	}}
	class="m-auto max-h-[88vh] w-[min(92vw,34rem)] overflow-y-auto rounded-2xl border bg-card p-0 text-card-foreground shadow-xl backdrop:bg-black/40"
>
	{#if selected}
		<div class="space-y-5 p-6">
			<div class="flex items-start justify-between gap-4">
				<div>
					<h2 id="{uid}-title" class="sr-only">{selected.cells[meaningKey]}</h2>
					<ArabicText text={selected.cells[arabicKey] ?? ''} size="block" class="text-5xl" />
					<p class="mt-2 text-lg font-medium">{selected.cells[meaningKey]}</p>
					{#if chipKey && selected.cells[chipKey]}
						<p
							class="mt-2 inline-block rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
						>
							{selected.cells[chipKey]}
						</p>
					{/if}
				</div>
				<button
					type="button"
					onclick={() => dialog?.close()}
					aria-label="Tutup"
					class="inline-flex size-11 shrink-0 items-center justify-center rounded-full border hover:bg-secondary"
				>
					<X class="size-5" aria-hidden="true" />
				</button>
			</div>

			{#each details as detail (detail.key)}
				{#if selected.cells[detail.key]}
					<div>
						<h3 class="text-sm font-semibold text-muted-foreground">{detail.label}</h3>
						{#if detail.lang === 'ar'}
							<ArabicText text={selected.cells[detail.key] ?? ''} />
						{:else}
							<p class="text-pretty">{selected.cells[detail.key]}</p>
						{/if}
					</div>
				{/if}
			{/each}

			{#if linkKey && selected.cells[linkKey]}
				<!-- eslint-disable svelte/no-navigation-without-resolve -- external source -->
				<a
					href={selected.cells[linkKey]}
					rel="noopener noreferrer"
					class="inline-flex min-h-11 items-center text-primary underline">{linkLabel}</a
				>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			{/if}

			{#if selected.cells[exampleKey]}
				<div class="rounded-xl bg-secondary p-4">
					<h3 class="text-sm font-semibold text-muted-foreground">Contoh</h3>
					<ArabicText text={selected.cells[exampleKey] ?? ''} size="block" class="mt-1 text-2xl" />
					{#if selected.explanation}
						<p class="mt-2 text-pretty">{selected.explanation}</p>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</dialog>
