<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { tick } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import type { ReferenceTableData } from '#lib/domain/reference/table.js';
	import { cn } from '#lib/utils.js';

	/**
	 * Reference table with two learning aids:
	 * - hafalan (memorisation) mode: hide one column, recall, then reveal each cell;
	 * - per-row explanation in a disclosure (native button + aria-expanded).
	 * Wide tables scroll inside their own keyboard-focusable region; the page never scrolls
	 * sideways and Arabic cells are never clipped.
	 */
	let { table }: { table: ReferenceTableData } = $props();

	const uid = $props.id();
	let hiddenKey = $state<string>('');
	const revealed = new SvelteSet<string>();
	const expanded = new SvelteSet<string>();

	let hideable = $derived(table.columns.filter((c) => c.hideable));
	let hiddenLabel = $derived(table.columns.find((c) => c.key === hiddenKey)?.label ?? '');

	function chooseHidden(key: string) {
		hiddenKey = key;
		revealed.clear();
	}

	/** Reveal a hidden cell and keep keyboard/screen-reader focus on the revealed value. */
	async function reveal(cellId: string) {
		revealed.add(cellId);
		await tick();
		document.getElementById(`${uid}-cell-${cellId}`)?.focus();
	}

	function toggle(set: SvelteSet<string>, id: string) {
		if (set.has(id)) set.delete(id);
		else set.add(id);
	}
</script>

<div class="space-y-4">
	{#if hideable.length > 0}
		<fieldset class="space-y-2">
			<legend class="text-base font-semibold">Mode hafalan</legend>
			<p class="text-sm text-muted-foreground">
				Sembunyikan satu kolom, coba ingat isinya, lalu buka satu per satu.
			</p>
			<div class="flex flex-wrap gap-x-6 gap-y-1">
				<label class="inline-flex min-h-11 items-center gap-2">
					<input
						type="radio"
						name="{uid}-hide"
						value=""
						checked={hiddenKey === ''}
						onchange={() => chooseHidden('')}
						class="size-5 accent-primary"
					/>
					Tampilkan semua
				</label>
				{#each hideable as column (column.key)}
					<label class="inline-flex min-h-11 items-center gap-2">
						<input
							type="radio"
							name="{uid}-hide"
							value={column.key}
							checked={hiddenKey === column.key}
							onchange={() => chooseHidden(column.key)}
							class="size-5 accent-primary"
						/>
						Sembunyikan {column.label.toLowerCase()}
					</label>
				{/each}
			</div>
		</fieldset>
	{/if}

	<!-- Scrollable region must be keyboard-focusable (axe: scrollable-region-focusable). -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="relative overflow-x-auto rounded-md border"
		role="region"
		aria-labelledby="{uid}-caption"
		tabindex="0"
	>
		<table class="w-full border-collapse text-start">
			<caption id="{uid}-caption" class="px-4 pt-3 pb-2 text-start text-sm text-muted-foreground">
				{table.caption}{#if hiddenKey}
					· kolom {hiddenLabel.toLowerCase()} disembunyikan{/if}
			</caption>
			<thead>
				<tr class="border-b">
					<th scope="col" class="w-12 py-3 ps-2"><span class="sr-only">Penjelasan</span></th>
					{#each table.columns as column (column.key)}
						<th scope="col" class="px-4 py-3 text-start text-sm font-semibold">{column.label}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each table.rows as row, rowIndex (row.id)}
					{@const isExpanded = expanded.has(row.id)}
					<tr
						id={`${table.id}-${row.id}`}
						class={cn('scroll-mt-24 align-middle', !isExpanded && 'border-b last:border-b-0')}
					>
						<td class="py-3 ps-2">
							{#if row.explanation}
								<button
									type="button"
									aria-expanded={isExpanded}
									aria-controls="{uid}-{row.id}-explanation"
									aria-label="Penjelasan baris {rowIndex + 1}"
									class="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted"
									onclick={() => toggle(expanded, row.id)}
								>
									<ChevronDown
										class={cn('size-5 transition-transform', isExpanded && 'rotate-180')}
										aria-hidden="true"
									/>
								</button>
							{/if}
						</td>
						{#each table.columns as column (column.key)}
							{@const cellId = `${row.id}:${column.key}`}
							{@const value = row.cells[column.key] ?? ''}
							<td class="px-4 py-3">
								{#if column.key === hiddenKey && !revealed.has(cellId)}
									<button
										type="button"
										class="inline-flex min-h-11 items-center rounded-md border border-dashed px-3 text-sm text-muted-foreground hover:text-foreground"
										aria-label="Buka: {column.label}, baris {rowIndex + 1}"
										onclick={() => reveal(cellId)}
									>
										Buka
									</button>
								{:else if column.lang === 'ar'}
									<span
										id="{uid}-cell-{cellId}"
										tabindex="-1"
										lang="ar"
										dir="rtl"
										class="block arabic-block whitespace-nowrap"
									>
										{value}
									</span>
								{:else}
									<span id="{uid}-cell-{cellId}" tabindex="-1" class="text-base text-pretty"
										>{value}</span
									>
								{/if}
							</td>
						{/each}
					</tr>
					{#if row.explanation}
						<tr
							id="{uid}-{row.id}-explanation"
							hidden={!isExpanded}
							class="border-b bg-muted/40 last:border-b-0"
						>
							<td colspan={table.columns.length + 1} class="px-4 py-3 text-base text-pretty">
								<!-- Sticky + viewport-capped so the text stays readable while the table scrolls. -->
								<p class="sticky start-4 max-w-[min(65ch,calc(100vw-4rem))]">{row.explanation}</p>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</div>
