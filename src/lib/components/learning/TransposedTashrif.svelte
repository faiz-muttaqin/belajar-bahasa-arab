<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import { sharafEntries } from '#lib/content/sharaf.js';
	import {
		parseSharafCatalog,
		readSharafCache,
		writeSharafCache
	} from '#lib/domain/sharaf/cache.js';
	import {
		babGroups,
		referenceWazanValue,
		selectableVerbs,
		tashrifColumns,
		tashrifValue
	} from '#lib/domain/sharaf/matrix.js';
	import type { SharafEntry } from '#lib/domain/sharaf/lexicon.js';

	// The project ships an immediately readable static reference. A same-origin
	// prerendered JSON snapshot is refreshed in the background and cached locally.
	let entries = $state<readonly SharafEntry[]>(sharafEntries);
	let query = $state('');
	let babFilter = $state<number | 'all'>('all');
	let selected = $state<Record<number, string>>({});
	let cacheStatus = $state('Data awal dari website');

	const rtlColumns = [...tashrifColumns].reverse();
	let groups = $derived(babGroups(entries));
	let visibleGroups = $derived(
		groups.filter((group) => babFilter === 'all' || group.number === babFilter)
	);
	let suggestions = $derived(selectableVerbs(entries, babFilter, query));

	function selectWord(entry: SharafEntry) {
		if (!entry.bab) return;
		selected = { ...selected, [entry.bab.number]: entry.id };
	}

	function resetBab(bab: number) {
		const next = { ...selected };
		delete next[bab];
		selected = next;
	}

	onMount(() => {
		let cancelled = false;

		async function refresh() {
			const cached = await readSharafCache();
			if (cached && !cancelled) {
				entries = cached.entries;
				cacheStatus = 'Data tersedia di penyimpanan lokal';
			}

			try {
				const response = await fetch(resolve('data/sharaf.json'));
				if (!response.ok) throw new Error('Unduhan glosarium gagal');
				const snapshot = parseSharafCatalog(await response.json());
				if (!snapshot) throw new Error('Format glosarium tidak sesuai');
				if (cancelled) return;
				entries = snapshot.entries;
				const backend = await writeSharafCache(snapshot);
				if (!cancelled) {
					cacheStatus =
						backend === 'indexeddb'
							? 'Glosarium tersimpan di IndexedDB'
							: backend === 'localStorage'
								? 'Glosarium tersimpan di localStorage'
								: 'Glosarium tersedia selama halaman terbuka';
				}
			} catch {
				if (!cancelled) {
					cacheStatus = cached
						? 'Memakai glosarium dari cache lokal'
						: 'Memakai data statis bawaan';
				}
			}
		}

		void refresh();
		return () => {
			cancelled = true;
		};
	});
</script>

<div class="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_17rem] xl:items-start">
	<div class="min-w-0 space-y-3">
		<div class="flex flex-wrap items-baseline justify-between gap-3">
			<p class="text-sm text-muted-foreground">
				Bentuk dibaca dari kanan ke kiri. Semua bab mulai dengan wazan ف–ع–ل.
			</p>
			{#if Object.keys(selected).length > 0}
				<button
					type="button"
					class="min-h-11 text-sm font-medium text-primary underline"
					onclick={() => (selected = {})}
				>
					Kembalikan semua ke wazan
				</button>
			{/if}
		</div>
		<!-- The bab label is the first physical (leftmost) column. Forms appear in
		     reverse DOM order so madhi sits at the far right and reads RTL. -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="relative min-w-0 overflow-x-auto rounded-xl border"
			role="region"
			aria-label="Tabel tashrif istilahi: bab di kiri, bentuk dari kanan ke kiri"
			tabindex="0"
		>
			<table class="w-full min-w-max border-collapse text-start">
				<caption class="px-4 py-3 text-start text-sm text-muted-foreground">
					Enam bab × sebelas bentuk. Geser horizontal untuk melihat seluruh perubahan.
				</caption>
				<thead class="border-y bg-secondary">
					<tr>
						<th
							scope="col"
							class="sticky left-0 z-20 min-w-40 border-r bg-secondary px-3 py-3 text-start text-xs font-semibold"
							>Bab / kata</th
						>
						{#each rtlColumns as column (column.key)}
							<th
								scope="col"
								class="min-w-32 px-3 py-3 text-center text-xs font-medium text-secondary-foreground"
								>{column.label}</th
							>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each visibleGroups as group (group.number)}
						{@const active = entries.find(
							(entry) => entry.id === selected[group.number] && entry.bab?.number === group.number
						)}
						<tr class="border-b last:border-b-0">
							<th
								scope="row"
								class="sticky left-0 z-10 min-w-40 border-r bg-card px-3 py-4 text-start align-middle"
							>
								<p class="text-sm font-semibold">Bab {group.number}</p>
								<ArabicText text={active?.lemma ?? group.pattern} />
								<p class="max-w-36 text-xs text-muted-foreground">
									{active ? active.meaning : 'Wazan dasar'}
								</p>
								{#if active}
									<button
										type="button"
										class="mt-1 min-h-9 text-xs font-medium text-primary underline"
										onclick={() => resetBab(group.number)}>Kembalikan wazan</button
									>
								{/if}
							</th>
							{#each rtlColumns as column (column.key)}
								{@const value = active
									? tashrifValue(active, column.key)
									: referenceWazanValue(group.number, column.key)}
								<td class="px-3 py-4 text-center align-middle">
									{#if value}
										<span
											lang="ar"
											dir="rtl"
											class="block arabic-block text-center whitespace-nowrap">{value}</span
										>
									{:else}
										<span
											class="text-sm text-muted-foreground"
											title={active
												? 'Bentuk ini belum tercatat untuk kata yang dipilih'
												: 'Tidak dicontohkan dalam tabel rujukan'}>—</span
										>
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="text-sm text-muted-foreground">
			Baris default adalah pola simbolik, bukan klaim bahwa semua mashdar atau isim alat terbentuk
			secara otomatis. Jika memilih kata, tanda — berarti bentuk tersebut belum tercatat atau tidak
			dicontohkan dalam glosarium.
		</p>
	</div>

	<aside
		class="order-first space-y-4 rounded-xl border bg-card p-4 xl:sticky xl:top-24 xl:order-last"
		aria-label="Pilih kata contoh"
	>
		<div>
			<h3 class="text-lg font-semibold">Pilih contoh kata</h3>
			<p class="mt-1 text-sm text-muted-foreground">
				Pilih fi’il dari glosarium; baris bab yang sesuai akan menampilkan bentuk kata itu.
			</p>
		</div>

		<div class="space-y-2">
			<label for="tashrif-bab" class="block text-sm font-medium">Tampilkan bab</label>
			<select
				id="tashrif-bab"
				bind:value={babFilter}
				class="min-h-11 w-full rounded-lg border bg-background px-3 text-sm"
			>
				<option value="all">Semua bab</option>
				{#each groups as group (group.number)}
					<option value={group.number}>Bab {group.number}</option>
				{/each}
			</select>
		</div>

		<div class="space-y-2">
			<label for="tashrif-search" class="block text-sm font-medium">Cari kata atau akar</label>
			<input
				id="tashrif-search"
				bind:value={query}
				type="search"
				lang="ar"
				dir="rtl"
				autocomplete="off"
				placeholder="كتب، يكتب، نصر..."
				class="min-h-11 w-full rounded-lg border bg-background px-3 text-lg"
			/>
			<p class="text-xs text-muted-foreground">
				Bisa tanpa harakat. {suggestions.length} kata ditemukan.
			</p>
		</div>

		<ul class="max-h-[24rem] space-y-2 overflow-y-auto pe-1">
			{#each suggestions.slice(0, 40) as entry (entry.id)}
				<li>
					<button
						type="button"
						aria-pressed={selected[entry.bab?.number ?? 0] === entry.id}
						onclick={() => selectWord(entry)}
						class="w-full rounded-lg border px-3 py-2 text-start transition-colors hover:border-primary hover:bg-secondary aria-pressed:border-primary aria-pressed:bg-secondary"
					>
						<span class="flex flex-wrap items-center justify-between gap-1">
							<ArabicText text={entry.lemma} />
							<span class="text-xs text-muted-foreground">Bab {entry.bab?.number}</span>
						</span>
						<span class="block text-sm text-muted-foreground">{entry.meaning}</span>
					</button>
				</li>
			{/each}
		</ul>
		{#if suggestions.length > 40}
			<p class="text-xs text-muted-foreground">
				Menampilkan 40 hasil pertama. Persempit kata pencarian.
			</p>
		{:else if suggestions.length === 0}
			<p class="text-sm text-muted-foreground">
				Belum ada entri yang cocok. Coba akar atau bentuk lain.
			</p>
		{/if}

		<p role="status" class="border-t pt-3 text-xs text-muted-foreground">{cacheStatus}</p>
		<a
			href={resolve('sharaf/')}
			class="inline-flex min-h-11 items-center text-sm font-medium text-primary underline"
		>
			Buka kamus sharaf
		</a>
		<a
			href={resolve('data/sharaf.json')}
			download
			class="inline-flex min-h-11 items-center text-xs font-medium text-primary underline"
		>
			Unduh glosarium JSON
		</a>
	</aside>
</div>
