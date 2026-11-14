<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { resolve } from '$app/paths';
	import Search from '@lucide/svelte/icons/search';
	import X from '@lucide/svelte/icons/x';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import ListPlus from '@lucide/svelte/icons/list-plus';
	import Check from '@lucide/svelte/icons/check';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import {
		catalogState,
		bulkSharafState,
		enrichmentState,
		prepareBulkSharaf,
		prepareEnrichment
	} from '#lib/catalog/sync.svelte.js';
	import VirtualGrid from '#lib/components/learning/VirtualGrid.svelte';
	import { mergeEnrichment } from '#lib/domain/sharaf/enrichment.js';
	import { mergeBulkSharaf } from '#lib/domain/sharaf/bulk.js';
	import { sharafEntries } from '#lib/content/sharaf.js';
	import {
		babGroups,
		referenceWazanValue,
		selectedBabRows,
		selectableVerbs,
		tashrifColumns,
		tashrifMeaning,
		tashrifValue,
		type TashrifColumnKey,
		type BabGroup
	} from '#lib/domain/sharaf/matrix.js';
	import type { SharafEntry } from '#lib/domain/sharaf/lexicon.js';
	import type { PatternFamily } from '#lib/domain/sharaf/patterns.js';

	const allFamilies: { key: PatternFamily | 'all'; name: string }[] = [
		{ key: 'all', name: 'Semua kelompok (22)' },
		{ key: 'tsulatsi-mujarrad', name: 'Tsulatsi mujarrad (6)' },
		{ key: 'tsulatsi-mazid-1', name: 'Tsulatsi mazid +1 (3)' },
		{ key: 'tsulatsi-mazid-2', name: 'Tsulatsi mazid +2 (5)' },
		{ key: 'tsulatsi-mazid-3', name: 'Tsulatsi mazid +3 (4)' },
		{ key: 'rubai-mujarrad', name: 'Ruba’i mujarrad (1)' },
		{ key: 'rubai-mazid-1', name: 'Ruba’i mazid +1 (1)' },
		{ key: 'rubai-mazid-2', name: 'Ruba’i mazid +2 (2)' }
	];

	const explanations: Record<TashrifColumnKey, string> = {
		madhi:
			'Fi’il madhi menunjukkan peristiwa yang sudah terjadi. Pola harakat dan jumlah huruf tambahan menjadi petunjuk identifikasi bab.',
		mudhari:
			'Fi’il mudhari menunjukkan peristiwa nonlampau. Pada tsulatsi mujarrad, pasangan madhi dan mudhari membantu menentukan bab sima’i.',
		mashdar:
			'Mashdar menamai perbuatan tanpa waktu. Bentuknya sering perlu rujukan kamus; pola di tabel hanya contoh representatif.',
		mimi: 'Mashdar mimi memiliki tambahan mim. Untuk beberapa bentuk, ejaannya serupa dengan isim zaman dan tempat.',
		fail: 'Isim fa’il menyatakan pelaku atau sifat. Untuk bentuk mazid, polanya umumnya mengikuti mudhari dengan mim dan kasrah sebelum huruf terakhir.',
		maful:
			'Isim maf’ul menyatakan yang dikenai perbuatan. Tidak setiap fi’il lazim memiliki isim maf’ul yang umum digunakan.',
		amr: 'Fi’il amr untuk perintah. Perubahan huruf illat dan hamzah dapat memerlukan aturan khusus.',
		nahy: 'Fi’il nahy menggabungkan partikel larangan لا dengan mudhari majzum. Contohnya di tabel berupa pola dasar.',
		zaman:
			'Isim zaman menunjuk waktu terjadinya suatu perbuatan. Bentuk leksikalnya perlu dibedakan dari pola simbolik.',
		makan:
			'Isim makan menunjuk tempat terjadinya suatu perbuatan. Tidak semua akar menghasilkan bentuk tempat yang lazim.',
		alah: 'Isim alat menamai alat. Banyak bentuknya bersifat leksikal dan tidak boleh diturunkan secara otomatis hanya dari akar.'
	};

	const sourceLabels = {
		wiktionary: 'Wiktionary (Inggris)',
		terjemahan: 'terjemahan Claude',
		model: 'dari model',
		'deskripsi-model': 'deskripsi model',
		'belum-diketahui': 'belum diketahui'
	} as const;

	type CellDetail = { group: BabGroup; key: TashrifColumnKey; entry?: SharafEntry };
	type ModalMode = 'search' | 'word' | 'cell';

	let entries = $derived(
		mergeEnrichment(
			mergeBulkSharaf(catalogState.catalog?.sharaf ?? sharafEntries, bulkSharafState.data),
			enrichmentState.data
		)
	);
	let selected = $state<Record<number, string>>({});
	let showMeanings = $state(false);
	let interactive = $state(false);
	let family = $state<PatternFamily | 'all'>('all');
	let dialogEl: HTMLDialogElement;
	let queryInput = $state<HTMLInputElement>();
	let tableScroller: HTMLDivElement;
	let modalMode = $state<ModalMode>('search');
	let modalBab = $state<number | 'all'>('all');
	let modalQuery = $state('');
	let inspected = $state<SharafEntry | null>(null);
	let cell = $state<CellDetail | null>(null);

	const rtlColumns = [...tashrifColumns].reverse();
	let groups = $derived(babGroups(entries));
	let visibleGroups = $derived(
		groups.filter((group) => family === 'all' || group.family === family)
	);
	let suggestions = $derived(selectableVerbs(entries, modalBab, modalQuery));
	let visibleNumbers = $derived(new Set(visibleGroups.map((group) => group.number)));
	let fillable = $derived(visibleGroups.some((group) => group.count > 0 && !activeFor(group)));

	function activeFor(group: BabGroup): SharafEntry | undefined {
		return entries.find(
			(entry) => entry.id === selected[group.number] && entry.bab?.number === group.number
		);
	}

	function fillExamples() {
		const next = { ...selected };
		for (const entry of selectedBabRows(entries, selected, 'all')) {
			if (entry.bab && visibleNumbers.has(entry.bab.number)) next[entry.bab.number] = entry.id;
		}
		selected = next;
	}

	async function openSearch(bab: number | 'all' = 'all') {
		modalBab = bab;
		modalQuery = '';
		modalMode = 'search';
		inspected = null;
		cell = null;
		if (!dialogEl.open) dialogEl.showModal();
		await tick();
		queryInput?.focus();
	}

	function inspectWord(entry: SharafEntry) {
		inspected = entry;
		modalMode = 'word';
	}

	function useWord(entry: SharafEntry) {
		if (!entry.bab) return;
		selected = { ...selected, [entry.bab.number]: entry.id };
		dialogEl.close();
	}

	function inspectCell(group: BabGroup, key: TashrifColumnKey) {
		cell = { group, key, entry: activeFor(group) };
		modalMode = 'cell';
		dialogEl.showModal();
	}

	onMount(() => {
		interactive = true;
		void prepareBulkSharaf();
		void prepareEnrichment();
		// Put fi'il madhi, the rightmost column, in view without affecting SSR.
		if (!location.hash.startsWith('#tashrif-istilahi-')) {
			tableScroller.scrollLeft = tableScroller.scrollWidth;
		}
	});
</script>

<section class="min-w-0 space-y-4" aria-label="Matriks wazan 22 bab">
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div class="flex flex-wrap items-center gap-2">
			<button
				type="button"
				onclick={() => openSearch()}
				disabled={!interactive}
				class="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-55"
			>
				<Search class="size-4" aria-hidden="true" />
				Cari kata atau arti Indonesia
			</button>
			<label class="sr-only" for="pattern-family-filter">Kelompok tashrif</label>
			<select
				id="pattern-family-filter"
				bind:value={family}
				disabled={!interactive}
				class="min-h-11 min-w-48 rounded-lg border bg-card px-3 text-sm"
			>
				{#each allFamilies as item (item.key)}
					<option value={item.key}>{item.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<button
				type="button"
				onclick={fillExamples}
				disabled={!interactive || !fillable}
				class="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/50 bg-accent px-3 text-sm font-semibold text-accent-foreground hover:border-primary disabled:opacity-45"
			>
				<ListPlus class="size-4" aria-hidden="true" />
				Isi contoh
			</button>
			<button
				type="button"
				onclick={() => (selected = {})}
				disabled={!interactive || Object.keys(selected).length === 0}
				class="inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm font-medium hover:bg-secondary disabled:opacity-45"
				aria-label="Kembali ke wazan untuk semua bab"
			>
				<RotateCcw class="size-4" aria-hidden="true" />
				Kembali ke wazan
			</button>
			<label
				class="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm font-medium"
			>
				<input
					type="checkbox"
					role="switch"
					checked={showMeanings}
					onchange={async (event) => {
						const atMadhi =
							tableScroller.scrollWidth - tableScroller.clientWidth - tableScroller.scrollLeft < 2;
						showMeanings = event.currentTarget.checked;
						if (atMadhi) {
							await tick();
							tableScroller.scrollLeft = tableScroller.scrollWidth;
						}
					}}
					disabled={!interactive}
					class="peer sr-only"
					aria-controls="tashrif-matrix"
				/>
				<span
					aria-hidden="true"
					class="relative h-5 w-9 shrink-0 rounded-full border border-muted-foreground bg-muted-foreground peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring before:absolute before:start-0.5 before:top-0.5 before:size-3.5 before:rounded-full before:bg-card peer-checked:before:translate-x-4 peer-checked:before:bg-primary-foreground"
				></span>
				Arti Indonesia
			</label>
		</div>
	</div>

	<p class="text-sm text-muted-foreground">
		{visibleGroups.length} bab · 11 bentuk dari kanan ke kiri. Klik bab di kolom kiri untuk memilih kata,
		atau klik sel untuk melihat penjelasan perubahan. Geser tabel ke samping untuk melihat seluruh bentuk.
	</p>
	{#if family !== 'all'}
		<p class="text-sm text-muted-foreground">Isi contoh berlaku untuk kelompok yang ditampilkan.</p>
	{/if}
	{#if showMeanings}
		<p class="text-sm text-muted-foreground">
			Padanan pendek untuk mengingat fungsi bentuk. Terjemahan lengkap mengikuti konteks kalimat.
		</p>
	{/if}

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		id="tashrif-matrix"
		bind:this={tableScroller}
		role="region"
		aria-label="Tabel tashrif istilahi: bab di kiri, bentuk dari kanan ke kiri"
		tabindex="0"
		class="relative max-w-full overflow-x-auto rounded-xl border bg-card"
	>
		<table class="w-max min-w-full border-collapse">
			<caption class="sr-only">
				22 pola tradisional dari tsulatsi hingga ruba’i; kolom fi’il madhi di paling kanan. Sel
				tanpa bentuk tercatat diberi tanda —.
			</caption>
			<thead class="border-y bg-secondary">
				<tr>
					<th
						scope="col"
						class="sticky left-0 z-20 min-w-36 border-r bg-secondary px-3 py-3 text-start text-xs font-semibold sm:min-w-48"
						>Bab dan kelompok</th
					>
					{#each rtlColumns as column (column.key)}
						<th
							id={`tashrif-istilahi-${column.key}`}
							scope="col"
							class="min-w-36 scroll-mt-24 scroll-ml-36 px-3 py-3 text-center text-xs font-semibold text-secondary-foreground sm:scroll-ml-48"
							>{column.label}</th
						>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each visibleGroups as group (group.number)}
					{@const active = activeFor(group)}
					{@const statusId = `tashrif-status-${group.number}`}
					<tr
						class={active
							? 'border-b border-primary/25 bg-primary/15 last:border-b-0'
							: 'border-b last:border-b-0'}
					>
						<th
							scope="row"
							class={[
								'sticky left-0 z-10 min-w-36 border-r p-0 text-start sm:min-w-48',
								active
									? 'border-r-primary/30 bg-[color-mix(in_oklab,var(--primary)_22%,var(--card))]'
									: 'bg-card'
							]}
						>
							<button
								type="button"
								onclick={() => openSearch(group.number)}
								class={[
									'flex min-h-24 w-full flex-col items-start justify-center gap-1 border-l-4 px-3 py-3 text-start focus-visible:z-30',
									active
										? 'border-l-primary hover:bg-primary/10'
										: 'border-l-transparent hover:bg-secondary'
								]}
								aria-label={`Pilih kata untuk bab ${group.number}`}
								aria-describedby={statusId}
							>
								<span class="flex flex-wrap items-center gap-x-2 gap-y-1">
									<span class="text-sm font-semibold">Bab {group.number}</span>
									{#if active}
										<span
											id={statusId}
											class="inline-flex items-center gap-1 rounded bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground"
										>
											<Check class="size-3" aria-hidden="true" />
											Kata dipilih
										</span>
									{:else}
										<span id={statusId} class="text-xs font-medium text-muted-foreground"
											>Wazan</span
										>
									{/if}
								</span>
								<span lang="ar" dir="rtl" class="arabic-inline"
									>{active?.lemma ?? group.pattern}</span
								>
								<span class="max-w-44 text-xs font-medium text-muted-foreground"
									>{active?.meaning ?? group.familyLabel}</span
								>
							</button>
						</th>
						{#each rtlColumns as column (column.key)}
							{@const value = active
								? tashrifValue(active, column.key)
								: referenceWazanValue(group.number, column.key)}
							{@const meaning =
								showMeanings && value ? tashrifMeaning(column.key, active) : undefined}
							{@const meaningId = `tashrif-arti-${group.number}-${column.key}`}
							<td class="px-1 py-2 text-center align-middle">
								<button
									type="button"
									onclick={() => inspectCell(group, column.key)}
									aria-label={`Detail ${column.label}, bab ${group.number}`}
									aria-describedby={meaning ? meaningId : undefined}
									class={[
										'min-h-16 w-full rounded-md px-3 py-2 focus-visible:relative',
										active ? 'hover:bg-primary/10' : 'hover:bg-secondary'
									]}
								>
									{#if value}
										<span
											lang="ar"
											dir="rtl"
											class="block arabic-block text-center whitespace-nowrap">{value}</span
										>
									{:else}
										<span class="text-sm text-muted-foreground">—</span>
									{/if}
									{#if meaning}
										<span id={meaningId} lang="id" class="block text-xs leading-relaxed"
											>{meaning}</span
										>
									{/if}
								</button>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<p class="text-sm text-muted-foreground">
		Tampilan awal menunjukkan wazan simbolik; bukan berarti setiap akar menghasilkan semua bentuk.
		Ketika kata dipilih, hanya bentuk yang tercatat dalam glosarium yang ditampilkan. Tanda — tidak
		berarti bentuk tersebut pasti tidak ada.
	</p>
	<div class="flex flex-wrap items-center gap-5 text-sm">
		<a href={resolve('sharaf/')} class="min-h-11 content-center font-medium text-primary underline"
			>Buka kamus lengkap dalam proyek</a
		>
		<a
			href={resolve('data/sharaf.json')}
			download
			class="min-h-11 content-center font-medium text-primary underline"
			>Unduh data glosarium JSON</a
		>
		{#if catalogState.saved && catalogState.catalog?.sharaf}
			<span class="text-muted-foreground">Glosarium tersimpan di perangkat</span>
		{/if}
	</div>
</section>

<!-- eslint-disable svelte/no-navigation-without-resolve -- modal contains verified external source links -->
<dialog
	bind:this={dialogEl}
	onclose={() => {
		inspected = null;
		cell = null;
	}}
	class="fixed inset-0 m-auto h-[min(94dvh,64rem)] w-[min(97vw,88rem)] flex-col overflow-hidden rounded-2xl border bg-card p-0 text-card-foreground shadow-xl backdrop:bg-black/60 open:flex"
	aria-label="Kamus dan penjelasan sharaf"
>
	<div class="flex shrink-0 items-center justify-between gap-3 border-b bg-card px-5 py-4">
		<div>
			<h3 class="font-semibold">
				{modalMode === 'search'
					? 'Cari contoh kata dan wazan'
					: modalMode === 'word'
						? 'Detail kata dan pola'
						: 'Penjelasan perubahan kata'}
			</h3>
			<p class="text-sm text-muted-foreground">
				{modalMode === 'search'
					? 'Cari dengan bahasa Indonesia, Arab, madhi, mudhari, atau akar kata.'
					: 'Lihat alasan pola, bentuk yang tercatat, dan sumber rujukan.'}
			</p>
		</div>
		<button
			type="button"
			onclick={() => dialogEl.close()}
			aria-label="Tutup modal"
			class="inline-flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-secondary"
		>
			<X aria-hidden="true" class="size-5" />
		</button>
	</div>

	{#if modalMode === 'search'}
		<div class="flex min-h-0 flex-1 flex-col gap-4 p-5">
			<div class="grid gap-3 sm:grid-cols-[1fr_13rem]">
				<div>
					<label for="modal-sharaf-query" class="mb-2 block text-sm font-medium"
						>Cari Arab atau Indonesia</label
					>
					<input
						id="modal-sharaf-query"
						type="search"
						bind:this={queryInput}
						bind:value={modalQuery}
						dir="auto"
						autocomplete="off"
						placeholder="menulis, membuka, كتب، يكتب..."
						class="min-h-11 w-full rounded-lg border bg-background px-3 text-base"
					/>
				</div>
				<div>
					<label for="modal-sharaf-bab" class="mb-2 block text-sm font-medium">Batasi ke bab</label>
					<select
						id="modal-sharaf-bab"
						bind:value={modalBab}
						class="min-h-11 w-full rounded-lg border bg-background px-3 text-sm"
					>
						<option value="all">Semua bab</option>
						{#each groups as group (group.number)}
							<option value={group.number}>Bab {group.number} · {group.familyLabel}</option>
						{/each}
					</select>
				</div>
			</div>
			<p class="text-sm text-muted-foreground">
				{suggestions.length.toLocaleString('id-ID')} contoh kata tersedia.
				{#if bulkSharafState.busy || enrichmentState.busy}
					Sedang menyiapkan kamus besar…
				{:else if bulkSharafState.error && !bulkSharafState.data}
					Kamus besar belum bisa diunduh; contoh bawaan masih tersedia.
				{/if}
				Pilih “Gunakan” untuk mengisi baris yang sesuai.
			</p>
			{#if suggestions.length}
				<VirtualGrid
					items={suggestions}
					rowHeight={172}
					minColumnWidth={300}
					label="Hasil pencarian kata"
					class="min-h-0 flex-1"
				>
					{#snippet children(entry)}
						<div
							role="listitem"
							class="flex h-full flex-col justify-between overflow-hidden rounded-lg border p-3"
						>
							<div class="min-h-0">
								<ArabicText text={entry.lemma} />
								<p class="line-clamp-2 text-sm font-medium">{entry.meaning}</p>
								<p class="text-xs text-muted-foreground">
									Bab {entry.bab?.number} · {entry.root ?? 'Tanpa akar'}
									{#if entry.meaningSource}
										· <span class="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground"
											>{sourceLabels[entry.meaningSource]}</span
										>
									{/if}
								</p>
							</div>
							<div class="flex gap-2">
								<button
									type="button"
									onclick={() => useWord(entry)}
									class="min-h-10 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground"
									>Gunakan</button
								>
								<button
									type="button"
									onclick={() => inspectWord(entry)}
									class="min-h-10 rounded-md border px-3 text-sm font-medium hover:bg-secondary"
									>Detail</button
								>
							</div>
						</div>
					{/snippet}
				</VirtualGrid>
			{:else}
				<p class="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
					Belum ditemukan dalam glosarium. Tidak ada bentuk kata yang dibuat tanpa rujukan.
				</p>
			{/if}
		</div>
	{:else if modalMode === 'word' && inspected}
		<div class="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
			<button
				type="button"
				onclick={() => (modalMode = 'search')}
				class="min-h-10 text-sm font-medium text-primary underline">Kembali ke pencarian</button
			>
			<div class="flex flex-wrap justify-between gap-3">
				<div>
					<ArabicText text={inspected.lemma} size="display" />
					<p class="font-semibold">{inspected.meaning}</p>
					<p class="text-sm text-muted-foreground">
						Akar: <ArabicText text={inspected.root ?? '—'} /> · Bab {inspected.bab?.number}
					</p>
				</div>
				<button
					type="button"
					onclick={() => useWord(inspected!)}
					class="min-h-11 self-start rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
					>Gunakan di tabel</button
				>
			</div>
			<p class="rounded-lg bg-secondary p-4 text-sm leading-relaxed">{inspected.explanation}</p>
			<div>
				<h4 class="font-semibold">Bentuk kata yang tercatat</h4>
				<dl class="mt-2 grid gap-2 sm:grid-cols-2">
					{#each tashrifColumns as column (column.key)}
						{@const value = tashrifValue(inspected, column.key)}
						<div
							class="flex min-h-12 items-center justify-between gap-3 rounded-lg border px-3 py-2"
						>
							<dt class="text-sm">{column.label}</dt>
							<dd>
								{#if value}<ArabicText text={value} />{:else}<span
										class="text-xs text-muted-foreground">Belum tercatat</span
									>{/if}
							</dd>
						</div>
					{/each}
				</dl>
			</div>
			<h4 class="font-semibold">Sumber</h4>
			<ul class="space-y-2 text-sm">
				{#each inspected.sources as source (source)}
					<li>
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external morphological reference -->
						<a
							href={source}
							target="_blank"
							rel="noopener noreferrer"
							class="break-all text-primary underline">{source}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	{:else if modalMode === 'cell' && cell}
		<div class="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
			<p class="text-sm text-muted-foreground">
				{cell.group.familyLabel} · Bab {cell.group.number}
			</p>
			<div class="rounded-lg bg-secondary p-4">
				<p class="font-semibold">{tashrifColumns.find((col) => col.key === cell?.key)?.label}</p>
				<ArabicText
					text={cell.entry
						? (tashrifValue(cell.entry, cell.key) ?? '—')
						: (referenceWazanValue(cell.group.number, cell.key) ?? '—')}
					size="display"
				/>
				<p class="mt-2 text-sm">{explanations[cell.key]}</p>
			</div>
			<p class="text-sm leading-relaxed">{cell.group.notes}</p>
			{#if cell.entry}
				<p class="text-sm">
					Kata yang dipilih: <ArabicText text={cell.entry.lemma} /> — {cell.entry.meaning}
				</p>
				<p class="text-sm text-muted-foreground">{cell.entry.explanation}</p>
				<button
					type="button"
					onclick={() => inspectWord(cell!.entry!)}
					class="min-h-11 rounded-md border px-4 text-sm font-medium hover:bg-secondary"
					>Lihat seluruh bentuk kata</button
				>
			{:else}
				<button
					type="button"
					onclick={() => void openSearch(cell!.group.number)}
					class="min-h-11 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
					>Cari kata pada bab ini</button
				>
			{/if}
			<p class="text-xs text-muted-foreground">Referensi pola:</p>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external reference -->
			<a
				href={cell.group.source}
				target="_blank"
				rel="noopener noreferrer"
				class="block text-sm break-all text-primary underline">{cell.group.source}</a
			>
		</div>
	{/if}
</dialog>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
