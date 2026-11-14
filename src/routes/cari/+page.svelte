<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import Search from '@lucide/svelte/icons/search';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import MixedText from '#lib/components/learning/MixedText.svelte';
	import { Button } from '#lib/components/ui/button/index.js';
	import { Input } from '#lib/components/ui/input/index.js';
	import { catalogState, bulkSharafState, prepareCatalog, prepareBulkSharaf } from '#lib/catalog/sync.svelte.js';
	import { mergeBulkSharaf } from '#lib/domain/sharaf/bulk.js';
	import {
		hasArabic,
		indexCatalog,
		searchCatalog,
		searchKinds,
		type SearchKind
	} from '#lib/catalog/search.js';
	import { CATALOG_PATH } from '#lib/catalog/types.js';

	let query = $state('');
	let category = $state<SearchKind | 'all'>('all');
	let visible = $state(20);
	const options = Object.entries(searchKinds) as [SearchKind, string][];
	let allSharaf = $derived(mergeBulkSharaf(catalogState.catalog?.sharaf ?? [], bulkSharafState.data));
	let index = $derived(catalogState.catalog ? indexCatalog(catalogState.catalog, allSharaf) : []);
	let results = $derived(searchCatalog(index, query, category === 'all' ? undefined : category));

	onMount(() => {
		const params = new URLSearchParams(location.search);
		query = (params.get('q') ?? '').slice(0, 100);
		const selected = options.find(([value]) => value === params.get('jenis'));
		if (selected) category = selected[0];
		void prepareCatalog();
		void prepareBulkSharaf();
	});
</script>

<PageIntro
	title="Cari materi"
	section="cari"
	description="Cari arti kata Arab, pelajaran, latihan, dan rujukan jenis kata. Pencarian berjalan di perangkat dengan salinan data yang diunduh."
>
	{#snippet lead()}
		<p>Cari kata Arab dengan atau tanpa harakat, atau masukkan arti dalam bahasa Indonesia.</p>
	{/snippet}
</PageIntro>

<div class="mt-8 space-y-6">
	<div class="grid max-w-[65ch] gap-4 sm:grid-cols-[minmax(0,1fr)_12rem]">
		<div class="space-y-2">
			<label for="cari-materi" class="block font-medium">Kata atau frasa</label>
			<div class="relative">
				<Search
					class="pointer-events-none absolute top-3 left-3 size-5 text-muted-foreground"
					aria-hidden="true"
				/>
				<Input
					id="cari-materi"
					type="search"
					bind:value={query}
					oninput={() => (visible = 20)}
					dir="auto"
					maxlength={100}
					placeholder="Misalnya: kunci atau مفتاح"
					class="min-h-11 pl-10 md:text-base"
				/>
			</div>
		</div>
		<div class="space-y-2">
			<label for="jenis-materi" class="block font-medium">Jenis materi</label>
			<select
				id="jenis-materi"
				bind:value={category}
				onchange={() => (visible = 20)}
				class="min-h-11 w-full rounded-md border border-input bg-background px-3 text-base"
			>
				<option value="all">Semua</option>
				{#each options as [value, label] (value)}
					<option {value}>{label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div
		class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b pb-4 text-sm text-muted-foreground"
	>
		<p role="status">
			{#if catalogState.busy}
				{catalogState.catalog ? 'Memeriksa pembaruan materi…' : 'Menyiapkan materi…'}
			{:else if catalogState.saved}
				{catalogState.error
					? 'Memakai salinan tersimpan. Pembaruan belum tersedia.'
					: 'Materi tersimpan di perangkat.'}
			{:else if catalogState.catalog}
				Materi tersedia untuk sesi ini.
			{:else if catalogState.error}
				Materi belum bisa dimuat.
			{:else}
				Sambungkan ke internet untuk mengunduh materi pertama kali.
			{/if}
		</p>
		{#if bulkSharafState.busy}
			<p>Kamus sharaf besar sedang diunduh…</p>
		{:else if bulkSharafState.data}
			<p>{bulkSharafState.data.totals.uniqueVerbs.toLocaleString('id-ID')} entri verba leksikal tersedia.</p>
		{/if}
		{#if catalogState.error || (catalogState.catalog && !catalogState.saved)}
			<Button
				size="sm"
				variant="outline"
				disabled={catalogState.busy}
				onclick={() => void prepareCatalog(true)}
			>
				Coba lagi
			</Button>
		{/if}
		<a
			href={resolve(CATALOG_PATH)}
			download="materi-bahasa-arab.json"
			class="inline-flex min-h-11 items-center text-primary underline"
		>
			Unduh data JSON
		</a>
	</div>

	{#if query.trim() && catalogState.catalog}
		<p role="status" class="text-muted-foreground">{results.length} hasil</p>
		{#if results.length}
			<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-4">
				{#each results.slice(0, visible) as result (result.key)}
					<li>
						<a
							href={resolve(result.href)}
							class="block h-full space-y-1 rounded-xl border bg-card px-4 py-3 hover:bg-accent"
						>
							<span class="block text-sm text-muted-foreground">{searchKinds[result.kind]}</span>
							{#if result.arabic}
								<ArabicText text={result.arabic} class="block text-lg wrap-break-word" />
							{/if}
							<p class="font-semibold"><MixedText text={result.title} /></p>
							{#if result.context && result.context !== result.title}
								<p class="text-pretty text-muted-foreground"><MixedText text={result.context} /></p>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
			{#if visible < results.length}
				<Button variant="outline" onclick={() => (visible += 20)}>Tampilkan lebih banyak</Button>
			{/if}
		{:else}
			<p>Coba kata yang lebih pendek atau pilih jenis materi lain.</p>
		{/if}
	{:else if !query.trim()}
		<p class="text-muted-foreground">
			Coba
			{#each ['مفتاح', 'kata penghubung', 'tashrif'] as example (example)}
				<button
					type="button"
					class="mx-1 inline-flex min-h-11 items-center text-primary underline"
					onclick={() => {
						query = example;
						visible = 20;
					}}
				>
					{#if hasArabic(example)}<ArabicText text={example} />{:else}{example}{/if}
				</button>
			{/each}
		</p>
	{/if}

	<noscript
		><p>
			Pencarian di perangkat memerlukan JavaScript. Materi tetap bisa dibaca melalui menu.
		</p></noscript
	>
</div>
