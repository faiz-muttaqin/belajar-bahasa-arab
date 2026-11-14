<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import {
		builderSlotLabels,
		builderSlots,
		chooseBuilderWord,
		composeBuilderExample,
		initialBuilderState,
		searchBuilderChoices,
		type BuilderMode,
		type BuilderSlot,
		type BuilderState
	} from '#lib/domain/grammar/dynamic-examples.js';

	let { mode }: { mode: BuilderMode } = $props();
	let state = $state<BuilderState>({ ...initialBuilderState });
	let activeSlot = $state<BuilderSlot>('subject');
	let query = $state('');
	let hydrated = $state(false);
	let notice = $state('');
	let pickerDialog: HTMLDialogElement;
	let previousTrigger: HTMLButtonElement | undefined;

	let example = $derived(composeBuilderExample(mode, state));
	let results = $derived(searchBuilderChoices(state, activeSlot, query));

	onMount(() => {
		hydrated = true;
	});

	function openPicker(slot: BuilderSlot, event: MouseEvent) {
		activeSlot = slot;
		query = '';
		previousTrigger =
			event.currentTarget instanceof HTMLButtonElement ? event.currentTarget : undefined;
		pickerDialog.showModal();
	}

	function choose(id: string) {
		const result = chooseBuilderWord(state, activeSlot, id);
		state = result.state;
		notice = result.resetObject
			? 'Objek otomatis disesuaikan karena tidak cocok dengan fi‘il yang dipilih.'
			: 'Contoh diperbarui. Perhatikan harakat dan arti setiap kata.';
		pickerDialog.close();
	}

	function reset() {
		state = { ...initialBuilderState };
		notice = 'Contoh dikembalikan ke bentuk awal.';
	}
</script>

<section class="min-w-0 space-y-4 rounded-2xl border bg-card p-4 sm:p-6" aria-label="Contoh Arab interaktif {mode}">
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div>
			<h3 class="font-semibold">
				{mode === 'nominal' ? 'Kalimat nominal · mubtada dan khabar' : 'Kalimat verbal · fi‘il dan objek'}
			</h3>
			<p class="text-sm text-muted-foreground">
				{mode === 'nominal'
					? 'Sifat mengikuti gender isim; khabar tetap nakirah.'
					: 'Ganti fi‘il dengan pasangan objek yang cocok secara makna.'}
			</p>
		</div>
		{#if hydrated}
			<button
				type="button"
				onclick={reset}
				class="min-h-11 rounded-lg border px-3 text-sm font-semibold hover:bg-secondary"
			>Reset</button>
		{/if}
	</div>

	<figure class="space-y-4">
		<div
			dir="rtl"
			class="flex min-w-0 flex-wrap justify-start gap-3"
			aria-label="Kalimat Arab dengan glos dan pilihan pengganti kata"
		>
			{#each example.tokens as token (token.slot)}
				<div
					class="flex min-w-0 max-w-full flex-col items-center gap-1 rounded-xl border bg-secondary/45 p-3 text-center"
					data-slot={token.slot}
				>
					<span lang="ar" dir="rtl" class="text-3xl leading-[1.9]">{token.arabic}</span>
					<span lang="id" dir="ltr" class="text-sm font-semibold">{token.gloss}</span>
					<span lang="id" dir="ltr" class="text-xs text-muted-foreground">{token.role}</span>
					<span lang="id" dir="ltr" class="text-xs text-muted-foreground">{token.marker}</span>
					{#if hydrated}
						<button
							type="button"
							class="mt-2 min-h-11 rounded-lg border border-primary/40 bg-background px-3 text-xs font-semibold text-primary hover:bg-accent"
							aria-label="Ganti {builderSlotLabels[token.slot]}"
							onclick={(event) => openPicker(token.slot, event)}
						>
							<icon name="search" aria-hidden="true" />
							Ganti kata
						</button>
					{/if}
				</div>
			{/each}
		</div>
		<figcaption class="border-t pt-3">
			<p class="font-semibold" data-translation>{example.translation}</p>
			<p class="mt-2 text-sm text-muted-foreground">{example.explanation}</p>
		</figcaption>
	</figure>

	{#if hydrated}
		<p aria-live="polite" class="min-h-5 text-sm text-muted-foreground">{notice}</p>
	{/if}

	<dialog
		bind:this={pickerDialog}
		onclose={() => previousTrigger?.focus()}
		class="w-[min(92vw,38rem)] max-w-none rounded-2xl border bg-card p-0 text-foreground shadow-xl backdrop:bg-black/60"
		aria-label="Cari pengganti kata"
	>
		<div class="max-h-[85dvh] space-y-4 overflow-y-auto p-5 sm:p-6">
			<div class="flex items-start justify-between gap-3">
				<div>
					<h4 class="text-lg font-semibold">Pilih kata pengganti</h4>
					<p class="text-sm text-muted-foreground">{builderSlotLabels[activeSlot]}</p>
				</div>
				<form method="dialog">
					<button type="submit" class="min-h-11 rounded-lg border px-3 text-sm">Tutup</button>
				</form>
			</div>

			<label class="block space-y-2">
				<span class="text-sm font-semibold">Cari Arab, tanpa harakat, atau arti Indonesia</span>
				<input
					type="search"
					bind:value={query}
					placeholder="Contoh: كتاب, baru, membuka"
					class="min-h-12 w-full rounded-xl border bg-background px-3 text-foreground"
					autocomplete="off"
				/>
			</label>

			<ul class="max-h-72 space-y-2 overflow-y-auto" aria-label="Hasil pilihan kamus">
				{#each results as item (item.id)}
					<li>
						<button
							type="button"
							class="flex min-h-16 w-full flex-wrap items-center justify-between gap-3 rounded-xl border bg-background px-4 py-3 text-start hover:border-primary"
							onclick={() => choose(item.id)}
							data-choice={item.id}
						>
							<span class="flex flex-col items-start">
								<span lang="ar" dir="rtl" class="text-2xl leading-[1.8]">{item.arabic}</span>
								<span class="text-sm font-medium">{item.gloss}</span>
							</span>
							<span class="max-w-44 text-xs text-muted-foreground">
								{item.source === 'sharaf' ? 'Kamus sharaf' : 'Kosakata MSA'}
								{item.bab ? ' · ' + item.bab : ''}
							</span>
						</button>
					</li>
				{:else}
					<li class="rounded-lg border border-dashed px-4 py-5 text-sm text-muted-foreground">
						Tidak ada kata yang cocok sekaligus memenuhi aturan contoh ini.
					</li>
				{/each}
			</ul>
			<p class="text-xs text-muted-foreground">
				Pencarian dibatasi pada pengganti yang sudah memiliki bentuk, i‘rab, dan konteks
				kompatibel. Tidak semua entri kamus boleh digunakan langsung.
				Buka <a href={resolve('kosakata/')} class="underline">kamus kosakata</a>
				atau <a href={resolve('sharaf/')} class="underline">kamus sharaf dan wazan</a>
				untuk daftar lebih luas.
			</p>
		</div>
	</dialog>
</section>
