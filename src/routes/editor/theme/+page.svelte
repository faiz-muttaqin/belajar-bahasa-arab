<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Code from '@lucide/svelte/icons/code';
	import Eye from '@lucide/svelte/icons/eye';
	import Palette from '@lucide/svelte/icons/palette';
	import SwatchBook from '@lucide/svelte/icons/swatch-book';
	import Redo2 from '@lucide/svelte/icons/redo-2';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import Type from '@lucide/svelte/icons/type';
	import Undo2 from '@lucide/svelte/icons/undo-2';
	import ArabicSpecimen from '#lib/components/theme-editor/ArabicSpecimen.svelte';
	import ColorField from '#lib/components/theme-editor/ColorField.svelte';
	import ContrastReport from '#lib/components/theme-editor/ContrastReport.svelte';
	import CssExport from '#lib/components/theme-editor/CssExport.svelte';
	import CssImport from '#lib/components/theme-editor/CssImport.svelte';
	import EditorNav, { type NavItem } from '#lib/components/theme-editor/EditorNav.svelte';
	import ModeSwitcher from '#lib/components/theme-editor/ModeSwitcher.svelte';
	import ThemeChoices from '#lib/components/theme-editor/ThemeChoices.svelte';
	import ThemePreview from '#lib/components/theme-editor/ThemePreview.svelte';
	import { Button } from '#lib/components/ui/button/index.js';
	import { Input } from '#lib/components/ui/input/index.js';
	import { themeToCss, type ThemeOverrides } from '#lib/theme/css.js';
	import { ThemeEditor } from '#lib/theme/editor.svelte.js';
	import { themeInitScriptTag, themeMode } from '#lib/theme/index.js';
	import {
		ARABIC_FONTS,
		COLOR_GROUPS,
		COLOR_LABELS,
		MODE_LABELS,
		RADIUS_MAX,
		RADIUS_MIN,
		RADIUS_STEP,
		UI_FONTS,
		isArabicFontId,
		isUiFontId,
		type ModePreference,
		type Theme
	} from '#lib/theme/tokens.js';

	const editor = new ThemeEditor();

	const navItems: NavItem[] = [
		{ id: 'tema', label: 'Pilihan tema', short: 'Tema', icon: SwatchBook },
		{ id: 'warna', label: 'Warna', short: 'Warna', icon: Palette },
		{ id: 'bentuk', label: 'Bentuk dan huruf', short: 'Huruf', icon: Type },
		{ id: 'pratinjau', label: 'Pratinjau dan kontras', short: 'Pratinjau', icon: Eye },
		{ id: 'ekspor', label: 'Ekspor dan impor', short: 'Ekspor', icon: Code }
	];

	let activeSection = $state('tema');
	let status = $state('');

	const mode = $derived(editor.resolvedMode);
	const colors = $derived(editor.theme[mode]);
	const changedColors = $derived(editor.overrides[mode]);
	const css = $derived(themeToCss(editor.theme));
	const radiusId = 'radius-angka';

	// Apply and save on every change (no-op until saved preferences are loaded).
	$effect(() => {
		editor.sync();
	});

	onMount(() => {
		const stopMode = themeMode.start();
		editor.load();

		// Highlight the navigation item for the section currently in view.
		const sections = navItems
			.map((item) => document.getElementById(item.id))
			.filter((el): el is HTMLElement => el !== null);
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
				if (visible) activeSection = visible.target.id;
			},
			{ rootMargin: '-20% 0px -60% 0px' }
		);
		sections.forEach((section) => observer.observe(section));
		// The last section is short and never reaches the band above; mark it at the page end.
		const onScroll = () => {
			const atEnd =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
			const last = navItems.at(-1);
			if (atEnd && last) activeSection = last.id;
		};
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			stopMode();
			window.removeEventListener('scroll', onScroll);
			observer.disconnect();
		};
	});

	// Saved theme changed in another tab: show it and start a fresh history.
	let seenRevision = 0;
	$effect(() => {
		if (themeMode.externalRevision !== seenRevision) {
			seenRevision = themeMode.externalRevision;
			editor.reload();
		}
	});

	function setMode(value: ModePreference) {
		themeMode.set(value);
		status = `Mode tampilan: ${MODE_LABELS[value].toLowerCase()}.`;
	}

	function undo() {
		editor.undo();
		status = 'Perubahan terakhir dibatalkan.';
	}

	function redo() {
		editor.redo();
		status = 'Perubahan diulang.';
	}

	function reset() {
		editor.reset();
		status = 'Tema dikembalikan ke bawaan. Tekan Urungkan untuk membatalkan.';
	}

	function resetMode() {
		editor.resetMode(mode);
		status = `Warna mode ${MODE_LABELS[mode].toLowerCase()} dikembalikan ke bawaan.`;
	}

	function onApplyTheme(theme: Theme, label: string) {
		editor.applyTheme(theme);
		status = `Tema "${label}" dipakai. Tekan Urungkan untuk kembali.`;
	}

	function onImport(overrides: ThemeOverrides) {
		editor.merge(overrides);
	}

	function onRadius(event: Event & { currentTarget: HTMLInputElement }) {
		const value = Number(event.currentTarget.value);
		if (Number.isFinite(value) && value >= RADIUS_MIN && value <= RADIUS_MAX) {
			editor.setShared('radius', value);
		}
	}
</script>

<svelte:head>
	<!-- Saved theme before first paint. Idempotent, so it can stay once the root layout includes it too. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static script built from our own source, no user input -->
	{@html themeInitScriptTag}
	<title>Editor tema · Belajar Bahasa Arab</title>
	<meta
		name="description"
		content="Atur warna, sudut dan huruf situs Belajar Bahasa Arab untuk mode terang dan gelap, periksa kontrasnya, lalu salin CSS-nya. Pilihan Anda tersimpan di browser ini."
	/>
</svelte:head>

<a
	href="#konten"
	class="sr-only z-50 rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
	>Lewati ke konten</a
>

<EditorNav items={navItems} active={activeSection} />

<div class="pb-24 md:pb-0 md:pl-20 lg:pl-56" data-editor-ready={editor.ready || undefined}>
	<header class="border-b border-border">
		<div class="mx-auto max-w-6xl px-4 pt-4 pb-5 md:px-6">
			<a
				href={resolve('/')}
				class="inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
			>
				<ArrowLeft class="size-4" aria-hidden="true" />
				Beranda
			</a>
			<h1 class="mt-1 text-2xl font-semibold md:text-3xl">Editor tema</h1>
			<p class="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
				Atur warna, sudut dan huruf untuk mode terang dan gelap. Perubahan langsung terlihat di
				seluruh halaman dan tersimpan di browser ini saja. Anda bisa mengembalikannya ke tema bawaan
				kapan saja.
			</p>
			<noscript>
				<p class="mt-3 rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground">
					JavaScript tidak aktif. Anda masih bisa melihat nilai tema bawaan dan menyalin CSS di
					bagian Ekspor, tetapi perubahan baru bisa dilakukan setelah JavaScript diaktifkan.
				</p>
			</noscript>
		</div>
	</header>

	<!-- Toolbar: sticky so the main actions stay in reach while scrolling long lists. -->
	<div
		class="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85"
	>
		<div class="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2 md:px-6">
			<ModeSwitcher value={themeMode.preference} onchange={setMode} hideLegend />
			<div class="ml-auto flex items-center gap-0.5 sm:gap-1">
				<Button variant="ghost" onclick={undo} disabled={!editor.canUndo} aria-label="Urungkan">
					<Undo2 aria-hidden="true" /><span class="hidden sm:inline">Urungkan</span>
				</Button>
				<Button variant="ghost" onclick={redo} disabled={!editor.canRedo} aria-label="Ulangi">
					<Redo2 aria-hidden="true" /><span class="hidden sm:inline">Ulangi</span>
				</Button>
				<Button
					variant="outline"
					onclick={reset}
					disabled={!editor.isCustomised}
					aria-label="Kembalikan ke tema bawaan"
				>
					<RotateCcw aria-hidden="true" /><span class="hidden sm:inline">Bawaan</span>
				</Button>
			</div>
		</div>
		<p role="status" class="sr-only">{status}</p>
	</div>

	{#if editor.ready && !editor.storageAvailable}
		<p class="mx-auto mt-4 max-w-6xl px-4 text-sm text-destructive md:px-6">
			Penyimpanan browser tidak tersedia. Perubahan hanya berlaku sampai halaman ini ditutup.
		</p>
	{/if}

	<main
		id="konten"
		tabindex="-1"
		class="mx-auto max-w-6xl space-y-10 px-4 py-6 outline-none md:px-6"
	>
		<section id="tema" aria-labelledby="tema-judul" class="scroll-mt-16 space-y-4">
			<div>
				<h2 id="tema-judul" class="text-lg font-semibold">Pilihan tema</h2>
				<p class="text-sm text-muted-foreground">
					Mulai dari tema siap pakai, atau simpan tema Anda sendiri.
				</p>
			</div>
			<ThemeChoices theme={editor.theme} onapply={onApplyTheme} />
		</section>

		<!-- Own grid, so the sticky preview stops before the export section. -->
		<div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
			<div class="min-w-0 space-y-10">
				<section id="warna" aria-labelledby="warna-judul" class="scroll-mt-16 space-y-4">
					<div class="flex flex-wrap items-end justify-between gap-2">
						<div>
							<h2 id="warna-judul" class="text-lg font-semibold">
								Warna mode {MODE_LABELS[mode].toLowerCase()}
							</h2>
							<p class="text-sm text-muted-foreground">
								Ganti mode tampilan di atas untuk mengedit warna mode {mode === 'light'
									? 'gelap'
									: 'terang'}.
							</p>
						</div>
						<Button
							variant="link"
							class="h-auto px-0"
							onclick={resetMode}
							disabled={Object.keys(changedColors).length === 0}
						>
							Kembalikan warna mode ini
						</Button>
					</div>

					{#each COLOR_GROUPS as group (group.id)}
						<details open={group.open} class="group rounded-xl border border-border bg-card">
							<summary
								class="flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 rounded-xl px-4 py-3 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden"
							>
								<span>{group.title}</span>
								<span class="flex items-center gap-1" aria-hidden="true">
									{#each group.tokens as token (token)}
										<span
											class="size-4 rounded-full border border-border"
											style:background-color={colors[token]}
										></span>
									{/each}
									<span
										class="ml-1 text-muted-foreground group-open:rotate-180 motion-safe:transition-transform"
										>▾</span
									>
								</span>
							</summary>
							<div class="space-y-4 border-t border-border px-4 py-4">
								{#each group.tokens as token (token)}
									<ColorField
										id={`warna-${mode}-${token}`}
										{token}
										label={COLOR_LABELS[token]}
										value={colors[token]}
										changed={token in changedColors}
										onchange={(value) => editor.setColor(mode, token, value)}
									/>
								{/each}
							</div>
						</details>
					{/each}
				</section>

				<section id="bentuk" aria-labelledby="bentuk-judul" class="scroll-mt-16 space-y-6">
					<div>
						<h2 id="bentuk-judul" class="text-lg font-semibold">Bentuk dan huruf</h2>
						<p class="text-sm text-muted-foreground">Berlaku untuk mode terang dan gelap.</p>
					</div>

					<div class="space-y-2">
						<div class="flex items-center justify-between gap-3">
							<label for="radius" class="text-sm font-medium">Kelengkungan sudut</label>
							<div class="flex items-center gap-1.5">
								<Input
									id={radiusId}
									type="number"
									min={RADIUS_MIN}
									max={RADIUS_MAX}
									step={RADIUS_STEP}
									value={editor.theme.shared.radius}
									onchange={onRadius}
									aria-label="Kelengkungan sudut dalam rem"
									class="h-11 w-24 text-right tabular-nums"
								/>
								<span class="text-sm text-muted-foreground">rem</span>
							</div>
						</div>
						<input
							id="radius"
							type="range"
							min={RADIUS_MIN}
							max={RADIUS_MAX}
							step={RADIUS_STEP}
							value={editor.theme.shared.radius}
							oninput={onRadius}
							class="h-11 w-full cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
						/>
						<div class="flex gap-2" aria-hidden="true">
							<span class="h-10 flex-1 rounded-sm border border-input bg-muted"></span>
							<span class="h-10 flex-1 rounded-md border border-input bg-muted"></span>
							<span class="h-10 flex-1 rounded-lg border border-input bg-muted"></span>
							<span class="h-10 flex-1 rounded-xl border border-input bg-muted"></span>
						</div>
					</div>

					<div class="space-y-2">
						<label for="huruf-ui" class="text-sm font-medium">Huruf antarmuka</label>
						<select
							id="huruf-ui"
							value={editor.theme.shared.uiFont}
							onchange={(e) => {
								const id = e.currentTarget.value;
								if (isUiFontId(id)) editor.setShared('uiFont', id);
							}}
							class="h-11 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:text-sm dark:bg-input/30"
						>
							{#each Object.entries(UI_FONTS) as [id, font] (id)}
								<option value={id}>{font.label}</option>
							{/each}
						</select>
					</div>

					<fieldset class="space-y-2">
						<legend class="text-sm font-medium">Huruf Arab</legend>
						<p class="text-sm text-muted-foreground">
							Bandingkan bentuk harakat (tanda baca vokal) pada setiap huruf.
						</p>
						<div class="grid gap-2 sm:grid-cols-3">
							{#each Object.entries(ARABIC_FONTS) as [id, font] (id)}
								<label
									class="flex cursor-pointer flex-col gap-1 rounded-lg border border-border bg-card p-3 has-checked:border-primary has-checked:ring-2 has-checked:ring-primary has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
								>
									<span class="flex items-center gap-2 text-sm font-medium">
										<input
											type="radio"
											name="huruf-arab"
											value={id}
											checked={editor.theme.shared.arabicFont === id}
											onchange={() => {
												if (isArabicFontId(id)) editor.setShared('arabicFont', id);
											}}
											class="size-4 accent-primary"
										/>
										{font.label}
									</span>
									<span class="text-right text-3xl"><ArabicSpecimen family={font.stack} /></span>
								</label>
							{/each}
						</div>
					</fieldset>
				</section>
			</div>

			<div
				class="min-w-0 lg:sticky lg:top-16 lg:max-h-[calc(100dvh-5rem)] lg:self-start lg:overflow-y-auto"
			>
				<section id="pratinjau" aria-labelledby="pratinjau-judul" class="scroll-mt-16 space-y-8">
					<div class="space-y-4">
						<div>
							<h2 id="pratinjau-judul" class="text-lg font-semibold">Pratinjau</h2>
							<p class="text-sm text-muted-foreground">Komponen situs dengan tema saat ini.</p>
						</div>
						<ThemePreview />
					</div>
					<ContrastReport {colors} {mode} />
				</section>
			</div>
		</div>

		<section
			id="ekspor"
			aria-label="Ekspor dan impor"
			class="grid scroll-mt-16 gap-10 lg:grid-cols-2 lg:gap-8"
		>
			<CssExport {css} />
			<CssImport onimport={onImport} />
		</section>
	</main>
</div>
