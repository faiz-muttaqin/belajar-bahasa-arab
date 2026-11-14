<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import { catalogState, bulkSharafState, prepareBulkSharaf } from '#lib/catalog/sync.svelte.js';
	import { mergeBulkSharaf } from '#lib/domain/sharaf/bulk.js';
	import { sharafEntries } from '#lib/content/sharaf.js';
	import { tashrifColumns } from '#lib/domain/sharaf/matrix.js';
	import { searchSharaf, type SharafFilter } from '#lib/domain/sharaf/lexicon.js';

	let query = $state('');
	let filter = $state<SharafFilter>('all');
	let visible = $state(48);
	let targetId = $state('');
	let entries = $derived(
		mergeBulkSharaf(catalogState.catalog?.sharaf ?? sharafEntries, bulkSharafState.data)
	);
	let results = $derived(searchSharaf(entries, query, filter));
	let shown = $derived.by(() => {
		const first = results.slice(0, visible);
		const pinned = targetId ? entries.find((entry) => entry.id === targetId) : undefined;
		return pinned && !first.some((entry) => entry.id === pinned.id) ? [pinned, ...first] : first;
	});

	onMount(() => {
		void prepareBulkSharaf();
		targetId = decodeURIComponent(location.hash.slice(1));
	});
	$effect(() => {
		if (targetId && shown.some((entry) => entry.id === targetId)) {
			void tick().then(() =>
				document.getElementById(targetId)?.scrollIntoView({ block: 'center' })
			);
		}
	});
	function formLabel(label: string): string {
		return tashrifColumns.find((column) => column.key === label.toLowerCase())?.label ?? label;
	}
	const filters: { value: SharafFilter; label: string }[] = [
		{ value: 'all', label: 'Semua' },
		{ value: 'verb', label: 'Fi’il' },
		{ value: 'noun', label: 'Isim' },
		{ value: 'particle', label: 'Kata tugas' }
	];
	const behaviorLabels = {
		regular: 'Kaidah umum',
		'special-rule': 'Kaidah khusus',
		irregular: 'Pengecualian',
		fixed: 'Kata tetap',
		unverified: 'Bentuk belum diverifikasi'
	} as const;
	const selectionLabels = {
		lexical: 'Bab perlu diketahui dari pasangan madhi–mudhari',
		rule: 'Bab ditetapkan dengan kaidah',
		'not-applicable': 'Tidak memakai bab fi’il'
	} as const;
</script>

<PageIntro
	title="Cari akar dan wazan"
	section="rujukan"
	description="Cari contoh kata bahasa Arab berdasarkan ejaan, akar, maupun bentuk tashrif; lihat bab, wazan, serta alasan perubahan bentuknya."
>
	{#snippet lead()}
		<p>
			Cari tanpa harakat atau ketik akar kata. Temukan bab tashrif dan bedakan hafalan leksikal dari
			kaidah pembentukan.
		</p>
	{/snippet}
</PageIntro>

<section class="mt-10 space-y-5" aria-label="Pencarian sharaf">
	<div class="space-y-2">
		<label for="sharaf-query" class="block font-medium">Kata atau akar bahasa Arab</label>
		<input
			id="sharaf-query"
			type="search"
			dir="auto"
			placeholder="Contoh: كتب، يكتب، فتح، menolong"
			autocomplete="off"
			bind:value={query}
			oninput={() => (visible = 48)}
			class="min-h-14 w-full rounded-xl border bg-card px-4 py-2 arabic-block text-foreground outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
		/>
		<p class="text-sm text-muted-foreground">
			Pencarian mengabaikan harakat; satu ejaan bisa mempunyai beberapa analisis.
		</p>
	</div>
	<fieldset class="space-y-2">
		<legend class="font-medium">Jenis kata</legend>
		<div class="flex flex-wrap gap-2">
			{#each filters as option (option.value)}
				<button
					type="button"
					aria-pressed={filter === option.value}
					onclick={() => {
						filter = option.value;
						visible = 48;
					}}
					class="min-h-11 rounded-full border px-4 text-sm font-medium transition-colors aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
					>{option.label}</button
				>
			{/each}
		</div>
	</fieldset>
</section>

<section class="mt-10" aria-label="Hasil pencarian">
	<h2 class="mb-5 text-xl font-semibold">
		{results.length.toLocaleString('id-ID')} entri ditemukan
	</h2>
	{#if results.length === 0}
		<div class="rounded-xl border border-dashed p-6">
			<p class="font-medium">Tidak ditemukan dalam indeks awal.</p>
			<p class="mt-2 text-muted-foreground">
				Ini belum kamus bahasa Arab lengkap. Coba akar kata seperti كتب atau فتح, atau hapus filter.
				Tidak ditemukan bukan berarti katanya tidak ada.
			</p>
		</div>
	{:else}
		<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,22rem),1fr))] gap-4">
			{#each shown as entry (entry.id)}
				<li id={entry.id} class="scroll-mt-24 rounded-2xl border bg-card p-5">
					<div class="flex flex-wrap items-start justify-between gap-2">
						<div>
							<ArabicText text={entry.lemma} size="block" class="text-3xl" />
							<p class="mt-1 font-medium">{entry.meaning}</p>
						</div>
						<span
							class="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
							>{behaviorLabels[entry.formBehavior]}</span
						>
					</div>
					<dl class="mt-5 grid grid-cols-2 gap-4 text-sm">
						<div>
							<dt class="text-muted-foreground">Akar</dt>
							<dd>
								{#if entry.root}<ArabicText text={entry.root} />{:else}Tidak berlaku{/if}
							</dd>
						</div>
						<div>
							<dt class="text-muted-foreground">Bab</dt>
							<dd>
								{#if entry.bab}Bab {entry.bab.number}: <ArabicText
										text={entry.bab.exemplar}
									/>{:else}Tidak berlaku{/if}
							</dd>
						</div>
						{#if entry.bab}
							<div class="col-span-2">
								<dt class="text-muted-foreground">Wazan</dt>
								<dd><ArabicText text={entry.bab.pattern} /></dd>
							</div>
						{/if}
					</dl>
					{#if entry.forms.length > 0}
						<details class="mt-5 rounded-lg bg-secondary p-3">
							<summary class="min-h-9 cursor-pointer font-medium">Lihat bentuk kata</summary>
							<dl class="mt-2 space-y-2">
								{#each entry.forms as form (form.label)}
									<div class="flex items-center justify-between gap-3 border-t border-border pt-2">
										<dt class="text-sm text-muted-foreground">{formLabel(form.label)}</dt>
										<dd><ArabicText text={form.value} /></dd>
									</div>
								{/each}
							</dl>
						</details>
					{/if}
					<p class="mt-4 text-sm font-medium">{selectionLabels[entry.babSelection]}</p>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.explanation}</p>
					<details class="mt-4 text-sm">
						<summary class="cursor-pointer font-medium text-primary">Sumber</summary>
						<ul class="mt-2 space-y-1">
							{#each entry.sources as source (source)}
								<li>
									<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external source -->
									<a href={source} class="break-all underline">{source}</a>
								</li>
							{/each}
						</ul>
					</details>
				</li>
			{/each}
		</ul>
		{#if visible < results.length}
			<button
				type="button"
				onclick={() => (visible += 48)}
				class="mt-5 min-h-11 rounded-lg border px-4 text-sm font-medium hover:bg-secondary"
			>
				Tampilkan lebih banyak ({Math.min(visible, results.length).toLocaleString('id-ID')} dari {results.length.toLocaleString(
					'id-ID'
				)})
			</button>
		{/if}
	{/if}
</section>

<p class="mt-8 text-sm text-muted-foreground">
	Kamus ini menggabungkan contoh kurikulum dengan data leksikal Qutrub dan Arramooz (sekitar 7.938
	kombinasi verba), serta kelas kata yang dipilih dari Arabic Stopwords. Entri leksikal yang belum
	mempunyai terjemahan atau turunan terverifikasi ditandai secara eksplisit.
	{#if bulkSharafState.busy}
		Dataset lengkap sedang diunduh ke cache browser.
	{:else if bulkSharafState.saved}
		Dataset lengkap sudah tersedia di cache lokal.
	{:else if bulkSharafState.error}
		Dataset besar belum tersedia; contoh dasar tetap bisa dipakai.
	{/if}
	<a href={resolve('rujukan/')} class="font-medium text-primary underline"
		>Buka tabel tashrif istilahi</a
	>.
</p>
