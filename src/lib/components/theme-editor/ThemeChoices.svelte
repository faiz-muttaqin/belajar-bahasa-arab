<!--
	"Pilihan tema": ready-made themes for people without a starting point, plus themes the
	visitor saved under their own name. Applying any of them is one undo step.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import Check from '@lucide/svelte/icons/check';
	import Save from '@lucide/svelte/icons/save';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import { Button } from '#lib/components/ui/button/index.js';
	import { Input } from '#lib/components/ui/input/index.js';
	import { applyOverrides, diffTheme } from '#lib/theme/css.js';
	import { THEME_PRESETS, findPreset } from '#lib/theme/presets.js';
	import {
		SAVED_THEMES_KEY,
		SAVED_THEMES_LIMIT,
		SAVED_THEME_NAME_MAX,
		addSavedTheme,
		readSavedThemes,
		writeSavedThemes,
		type SavedTheme
	} from '#lib/theme/saved-themes.js';
	import { getBrowserStorage } from '#lib/theme/storage.js';
	import ThemeSwatch from './ThemeSwatch.svelte';
	import type { Theme } from '#lib/theme/tokens.js';

	let { theme, onapply }: { theme: Theme; onapply: (theme: Theme, label: string) => void } =
		$props();

	let saved = $state<SavedTheme[]>([]);
	let name = $state('');
	let message = $state('');
	let isError = $state(false);
	let lastDeleted = $state<{ item: SavedTheme; index: number } | null>(null);

	const activePresetId = $derived(findPreset(theme)?.id);
	const presetGroups = [
		{
			id: 'hangat',
			title: 'Hangat, nyaman di mata',
			presets: THEME_PRESETS.filter((p) => p.warm)
		},
		{ id: 'sejuk', title: 'Sejuk dan netral', presets: THEME_PRESETS.filter((p) => !p.warm) }
	];
	const currentKey = $derived(JSON.stringify(diffTheme(theme)));

	onMount(() => {
		saved = readSavedThemes(getBrowserStorage());
		const onStorage = (event: StorageEvent) => {
			if (event.key === null || event.key === SAVED_THEMES_KEY) {
				saved = readSavedThemes(getBrowserStorage());
			}
		};
		window.addEventListener('storage', onStorage);
		return () => window.removeEventListener('storage', onStorage);
	});

	function persist(next: SavedTheme[]) {
		if (!writeSavedThemes(getBrowserStorage(), next)) {
			isError = true;
			message = 'Penyimpanan browser tidak tersedia, tema tidak bisa disimpan.';
			return false;
		}
		saved = next;
		return true;
	}

	function save(event: SubmitEvent) {
		event.preventDefault();
		const result = addSavedTheme(saved, name, diffTheme(theme));
		if (!result.ok) {
			isError = true;
			message =
				result.reason === 'empty'
					? 'Tulis nama tema dulu.'
					: `Maksimal ${SAVED_THEMES_LIMIT} tema tersimpan. Hapus salah satu dulu.`;
			return;
		}
		if (!persist(result.themes)) return;
		isError = false;
		lastDeleted = null;
		message = result.replaced
			? `Tema "${result.themes[0]?.name}" diperbarui.`
			: `Tema "${result.themes[0]?.name}" disimpan.`;
		name = '';
	}

	function remove(item: SavedTheme) {
		const index = saved.indexOf(item);
		if (!persist(saved.filter((t) => t !== item))) return;
		lastDeleted = { item, index };
		isError = false;
		message = `Tema "${item.name}" dihapus.`;
	}

	function restore() {
		if (!lastDeleted) return;
		const next = [...saved];
		next.splice(lastDeleted.index, 0, lastDeleted.item);
		if (!persist(next)) return;
		message = `Tema "${lastDeleted.item.name}" dikembalikan.`;
		lastDeleted = null;
	}

	const formatDate = (iso: string) =>
		new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(
			new Date(iso)
		);
</script>

<div class="space-y-8">
	<div class="space-y-3">
		<div>
			<h3 class="font-semibold">Tema siap pakai</h3>
			<p class="text-sm text-muted-foreground">
				Belum tahu mau warna apa? Pilih salah satu dari {THEME_PRESETS.length} tema, lalu ubah sesuka
				hati. Tema hangat memakai latar kekuningan yang lebih sedikit cahaya birunya dan tidak menyilaukan.
				Semua tema lulus pemeriksaan kontras WCAG AA di mode terang dan gelap.
			</p>
		</div>
		{#each presetGroups as group (group.id)}
			<div class="space-y-2">
				<h4 class="text-sm font-medium">{group.title}</h4>
				<!-- Phones: one swipeable row per group; larger screens: a grid. -->
				<ul
					class="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-4"
				>
					{#each group.presets as preset (preset.id)}
						{@const active = activePresetId === preset.id}
						<li class="w-64 shrink-0 snap-start sm:w-auto">
							<button
								type="button"
								aria-pressed={active}
								onclick={() => onapply(preset.theme, preset.label)}
								class="flex h-full w-full flex-col gap-2 rounded-xl border border-border bg-card p-3 text-left text-card-foreground hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-pressed:border-primary aria-pressed:ring-2 aria-pressed:ring-primary"
							>
								<span class="flex items-center justify-between gap-2 font-medium">
									{preset.label}
									{#if active}
										<span class="flex items-center gap-1 text-xs text-primary">
											<Check class="size-3.5" aria-hidden="true" />Dipakai
										</span>
									{/if}
								</span>
								<span class="text-sm text-muted-foreground">{preset.description}</span>
								<span class="mt-auto"><ThemeSwatch theme={preset.theme} /></span>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="space-y-3">
		<div>
			<h3 class="font-semibold">Tema saya</h3>
			<p class="text-sm text-muted-foreground">
				Simpan tema yang sedang dipakai dengan nama sendiri, untuk dipakai lagi nanti. Tersimpan di
				browser ini saja.
			</p>
		</div>
		<form class="flex flex-col gap-2 sm:flex-row sm:items-end" onsubmit={save}>
			<div class="flex-1 space-y-1.5">
				<label for="nama-tema" class="text-sm font-medium">Nama tema</label>
				<Input
					id="nama-tema"
					bind:value={name}
					maxlength={SAVED_THEME_NAME_MAX}
					placeholder="Misalnya: Malam yang nyaman"
					autocomplete="off"
					aria-describedby="tema-saya-pesan"
					class="h-11"
				/>
			</div>
			<Button type="submit" class="h-11" disabled={name.trim() === ''}>
				<Save aria-hidden="true" />Simpan tema saat ini
			</Button>
		</form>
		<div class="flex flex-wrap items-center gap-2">
			<p
				id="tema-saya-pesan"
				role={isError ? 'alert' : 'status'}
				class={['text-sm', isError ? 'text-destructive' : 'text-muted-foreground']}
			>
				{message}
			</p>
			{#if lastDeleted}
				<Button variant="link" class="h-auto px-0" onclick={restore}>Batalkan hapus</Button>
			{/if}
		</div>

		{#if saved.length === 0}
			<p
				class="rounded-lg border border-dashed border-border px-3 py-4 text-sm text-muted-foreground"
			>
				Belum ada tema tersimpan.
			</p>
		{:else}
			<ul class="space-y-2">
				{#each saved as item (item.id)}
					{@const itemTheme = applyOverrides(item.overrides)}
					{@const active = JSON.stringify(item.overrides) === currentKey}
					<li
						class="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3 text-card-foreground"
					>
						<div class="min-w-0 flex-1">
							<p class="truncate font-medium">{item.name}</p>
							<p class="text-xs text-muted-foreground">
								Disimpan {formatDate(item.savedAt)}{active ? ' · sedang dipakai' : ''}
							</p>
						</div>
						<div class="w-36"><ThemeSwatch theme={itemTheme} /></div>
						<div class="flex gap-1">
							<Button
								variant="secondary"
								onclick={() => onapply(itemTheme, item.name)}
								aria-label={`Pakai tema ${item.name}`}
								disabled={active}>Pakai</Button
							>
							<Button
								variant="ghost"
								size="icon"
								onclick={() => remove(item)}
								aria-label={`Hapus tema ${item.name}`}
							>
								<Trash2 aria-hidden="true" />
							</Button>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
