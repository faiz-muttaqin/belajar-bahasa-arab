<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import {
		builderSlotLabels,
		chooseBuilderWord,
		chooseVerbFrame,
		composeBuilderExample,
		initialBuilderState,
		searchBuilderChoiceAssessments,
		type BuilderMode,
		type BuilderSlot,
		type BuilderState
	} from '#lib/domain/grammar/dynamic-examples.js';
	import { verbFrameOptions, type VerbFrameId } from '#lib/domain/grammar/verb-frames.js';

	let { mode }: { mode: BuilderMode } = $props();
	let selection: BuilderState = $state({ ...initialBuilderState });
	let activeSlot: BuilderSlot = $state('subject');
	let query = $state('');
	let hydrated = $state(false);
	let notice = $state('');
	let pickerDialog: HTMLDialogElement;
	let previousTrigger: HTMLButtonElement | undefined;

	let example = $derived(composeBuilderExample(mode, selection));
	let results = $derived(searchBuilderChoiceAssessments(selection, activeSlot, query));
	let hasSelectable = $derived(results.some((item) => item.compatibility.allowed));
	let availableFrames = $derived(verbFrameOptions(selection.verb));

	onMount(() => {
		hydrated = true;
	});

	function openPicker(slot: BuilderSlot | 'operator', event: MouseEvent) {
		if (slot === 'operator') return;
		activeSlot = slot;
		query = '';
		previousTrigger =
			event.currentTarget instanceof HTMLButtonElement ? event.currentTarget : undefined;
		pickerDialog.showModal();
	}

	function choose(id: string) {
		const result = chooseBuilderWord(selection, activeSlot, id);
		selection = result.state;
		const changes = [
			result.resetObject
				? 'Objek otomatis disesuaikan karena tidak cocok dengan fi‘il yang dipilih.'
				: '',
			result.resetFrame
				? 'Bentuk fi‘il kembali ke māḍī: bentuk sebelumnya belum tersedia untuk lema baru.'
				: '',
			activeSlot === 'subject'
				? 'Bentuk sifat otomatis mengikuti gender isim; khabar tetap nakirah.'
				: ''
		].filter(Boolean);
		notice = changes.length
			? changes.join(' ')
			: 'Contoh diperbarui. Perhatikan harakat dan arti setiap kata.';
		pickerDialog.close();
	}

	function setFrame(frame: VerbFrameId) {
		selection = chooseVerbFrame(selection, frame);
		notice = 'Bentuk fi‘il diperbarui. Perhatikan pengaruh partikel, mood dan pelaku.';
	}

	function reset() {
		selection = { ...initialBuilderState };
		notice = 'Contoh dikembalikan ke bentuk awal.';
	}
</script>

<section
	class="min-w-0 space-y-4 rounded-2xl border bg-card p-4 sm:p-6"
	aria-label="Contoh Arab interaktif {mode}"
>
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div>
			<h3 class="font-semibold">
				{mode === 'nominal'
					? 'Kalimat nominal · mubtada dan khabar'
					: 'Kalimat verbal · fi‘il dan objek'}
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
				>Reset</button
			>
		{/if}
	</div>

	{#if mode === 'verbal'}
		<div class="space-y-2 rounded-xl border bg-secondary/45 p-3">
			{#if hydrated}
				<label class="block space-y-2">
					<span class="text-sm font-semibold">Pilih bentuk fi‘il dan konteks i‘rab</span>
					<select
						aria-label="Bentuk fi‘il"
						value={selection.verbFrame}
						onchange={(event) => setFrame(event.currentTarget.value as VerbFrameId)}
						class="min-h-12 w-full rounded-lg border bg-background px-3 text-sm"
					>
						{#each availableFrames as frame (frame.id)}
							<option value={frame.id} disabled={!frame.available}>
								{frame.label}{frame.available ? '' : ' · belum tersedia untuk fi‘il ini'}
							</option>
						{/each}
					</select>
				</label>
			{:else}
				<p class="text-sm">Bentuk awal: fi‘il māḍī (lampau).</p>
			{/if}
			<p class="text-xs text-muted-foreground">
				Opsi yang belum memiliki bentuk tertulis dalam referensi dinonaktifkan. Bentuk amr memakai
				pelaku tersirat أَنْتَ, bukan fā‘il eksplisit.
			</p>
		</div>
	{/if}

	<figure class="space-y-4">
		<div
			dir="rtl"
			class="flex min-w-0 flex-wrap justify-start gap-3"
			aria-label="Kalimat Arab dengan glos dan pilihan pengganti kata"
		>
			{#each example.tokens as token (token.slot)}
				<div
					class="flex max-w-full min-w-0 flex-col items-center gap-1 rounded-xl border bg-secondary/45 p-3 text-center"
					data-slot={token.slot}
				>
					<span lang="ar" dir="rtl" class="text-3xl leading-[1.9]">{token.arabic}</span>
					<span lang="id" dir="ltr" class="text-sm font-semibold">{token.gloss}</span>
					<span lang="id" dir="ltr" class="text-xs text-muted-foreground">{token.role}</span>
					<span lang="id" dir="ltr" class="text-xs text-muted-foreground">{token.marker}</span>
					{#if hydrated && token.slot !== 'operator'}
						<button
							type="button"
							class="mt-2 min-h-11 rounded-lg border border-primary/40 bg-background px-3 text-xs font-semibold text-primary hover:bg-accent"
							aria-label="Ganti {builderSlotLabels[token.slot]}"
							onclick={(event) => openPicker(token.slot, event)}
						>
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
		onkeydown={(event) => {
			// Search inputs may consume Escape to clear their value. Close the modal regardless.
			if (event.key === 'Escape') {
				event.preventDefault();
				pickerDialog.close();
			}
		}}
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
				{#each results as { choice, compatibility } (choice.id)}
					<li class="rounded-xl border bg-background p-2">
						<button
							type="button"
							disabled={!compatibility.allowed}
							class="flex min-h-16 w-full flex-wrap items-center justify-between gap-3 rounded-lg px-2 py-2 text-start enabled:hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-65"
							data-evidence={choice.evidence.kind}
							data-choice={compatibility.allowed ? choice.id : undefined}
							data-blocked={compatibility.allowed ? undefined : choice.id}
							onclick={() => choose(choice.id)}
						>
							<span class="flex flex-col items-start">
								<span lang="ar" dir="rtl" class="text-2xl leading-[1.8]">{choice.arabic}</span>
								<span class="text-sm font-medium">{choice.gloss}</span>
							</span>
							<span class="max-w-44 text-xs text-muted-foreground">
								{choice.source === 'sharaf' ? 'Kamus sharaf' : 'Kosakata MSA'}
								{choice.bab ? ' · ' + choice.bab : ''}
							</span>
						</button>
						<p class="px-2 text-xs" data-reason={choice.id}>
							{compatibility.allowed
								? 'Bisa digunakan: ' + compatibility.allowedExplanation
								: 'Belum bisa dipilih: ' +
									compatibility.reasons.map((item) => item.message).join(' ')}
						</p>
						<div
							class="mt-1 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-muted-foreground"
						>
							<span>Bentuk contoh · draft (belum ditashih guru bahasa Arab)</span>
							{#if choice.evidence.sourceUrls[0]}
								<!-- eslint-disable svelte/no-navigation-without-resolve -- external lexical reference URL -->
								<a
									href={choice.evidence.sourceUrls[0]}
									target="_blank"
									rel="noopener noreferrer"
									class="underline hover:text-foreground">Rujukan lema</a
								>
								<!-- eslint-enable svelte/no-navigation-without-resolve -->
							{/if}
						</div>
					</li>
				{:else}
					<li class="rounded-lg border border-dashed px-4 py-5 text-sm text-muted-foreground">
						Tidak ada kata yang cocok sekaligus memenuhi aturan contoh ini.
					</li>
				{/each}
				{#if results.length > 0 && !hasSelectable}
					<li class="rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
						Tidak ada kata yang cocok untuk dipilih dalam contoh ini; lihat alasan di atas.
					</li>
				{/if}
			</ul>
			<p class="text-xs text-muted-foreground">
				Kata yang cocok ditampilkan sebagai pilihan aktif. Kata yang belum cocok tetap terlihat
				dengan alasan, tetapi tidak bisa dipilih. Tidak semua entri kamus boleh digunakan langsung.
				Buka <a href={resolve('kosakata/')} class="underline">kamus kosakata</a>
				atau <a href={resolve('sharaf/')} class="underline">kamus sharaf dan wazan</a>
				untuk daftar lebih luas.
			</p>
		</div>
	</dialog>
</section>
