<script lang="ts">
	import { onMount } from 'svelte';
	import {
		searchInlineExampleChoices,
		type InlineExampleSource
	} from '#lib/domain/grammar/inline-curated-examples.js';

	let {
		source,
		originalId,
		selectedId,
		tokenIndex,
		roleLabel,
		onSelect
	}: {
		source: InlineExampleSource;
		originalId: string;
		selectedId: string;
		tokenIndex: number;
		roleLabel: string;
		onSelect: (id: string) => void;
	} = $props();

	let hydrated = $state(false);
	let query = $state('');
	let pickerDialog: HTMLDialogElement;
	let trigger = $state<HTMLButtonElement | undefined>(undefined);
	let results = $derived(searchInlineExampleChoices(source, originalId, tokenIndex, query));

	onMount(() => {
		hydrated = true;
	});

	function open() {
		query = '';
		pickerDialog.showModal();
	}

	function choose(id: string) {
		onSelect(id);
		pickerDialog.close();
	}
</script>

{#if hydrated}
	<button
		bind:this={trigger}
		type="button"
		class="mt-2 min-h-11 rounded-lg border border-primary/40 bg-background px-3 text-xs font-semibold text-primary hover:bg-secondary"
		aria-label="Ganti {roleLabel}"
		onclick={open}
	>
		Ganti kata
	</button>
{/if}

<dialog
	bind:this={pickerDialog}
	dir="ltr"
	aria-label="Pilih variasi contoh"
	class="w-[min(92vw,38rem)] max-w-none rounded-2xl border bg-card p-0 text-foreground shadow-xl backdrop:bg-black/60"
	onclose={() => trigger?.focus()}
	onkeydown={(event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			pickerDialog.close();
		}
	}}
>
	<div class="max-h-[85dvh] space-y-4 overflow-y-auto p-5 sm:p-6">
		<div class="flex items-start justify-between gap-3">
			<div>
				<h4 class="font-semibold">Pilih contoh kata</h4>
				<p class="text-sm text-muted-foreground">Posisi: {roleLabel}</p>
			</div>
			<form method="dialog">
				<button class="min-h-11 rounded-lg border px-3 text-sm" type="submit">Tutup</button>
			</form>
		</div>

		<p class="text-sm text-muted-foreground">
			Jika kata ini diganti, kata pasangannya ikut disesuaikan. Semua pilihan adalah
			<strong>contoh utuh yang sudah dicatat</strong>, bukan hasil mengarang perubahan kata.
		</p>

		<label class="block space-y-2">
			<span class="text-sm font-semibold">Cari tulisan Arab atau arti Indonesia</span>
			<input
				type="search"
				bind:value={query}
				class="min-h-12 w-full rounded-xl border bg-background px-3"
				placeholder="Contoh: مدرسة, buku, besar"
				autocomplete="off"
			/>
		</label>

		<ul class="max-h-72 space-y-2 overflow-y-auto" aria-label="Pilihan contoh terkurasi">
			{#each results as item (item.id)}
				<li class="rounded-xl border p-3">
					<button
						type="button"
						class="flex min-h-14 w-full flex-col gap-1 rounded-lg p-2 text-start enabled:hover:bg-secondary disabled:opacity-60"
						disabled={!item.allowed}
						data-inline-choice={item.allowed ? item.id : undefined}
						data-inline-blocked={item.allowed ? undefined : item.id}
						aria-current={item.id === selectedId ? 'true' : undefined}
						onclick={() => choose(item.id)}
					>
						<span class="text-xl leading-[1.9]" lang="ar" dir="rtl">
							{item.surfaces.join(' ')}
						</span>
						<span class="text-sm font-medium">{item.translation}</span>
						{#if item.id === selectedId}
							<span class="text-xs text-muted-foreground">Contoh saat ini</span>
						{/if}
					</button>
					<p class="mt-1 px-2 text-xs text-muted-foreground" data-inline-reason={item.id}>
						{item.allowed
							? item.explanation
							: 'Belum bisa dipilih: ' + item.reasons.map((reason) => reason.message).join(' ')}
					</p>
					<p class="mt-2 px-2 text-xs text-muted-foreground">
						Materi draft · belum ditashih guru.
						{#if item.sourceUrls[0]}
							<!-- eslint-disable svelte/no-navigation-without-resolve -- external grammar source -->
							<a
								href={item.sourceUrls[0]}
								class="underline hover:text-foreground"
								target="_blank"
								rel="noopener noreferrer">Rujukan kaidah</a
							>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						{/if}
					</p>
				</li>
			{:else}
				<li class="rounded-lg border border-dashed px-4 py-5 text-sm text-muted-foreground">
					Tidak ada pilihan contoh yang cocok dengan pencarian ini.
				</li>
			{/each}
		</ul>
		<p class="text-xs text-muted-foreground">
			Perubahan hanya berlaku di kartu ini sampai halaman dimuat ulang. Gunakan Reset untuk kembali
			ke contoh awal.
		</p>
	</div>
</dialog>
