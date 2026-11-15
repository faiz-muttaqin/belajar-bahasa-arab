<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { RoadmapView } from '#lib/domain/roadmap/presentation.js';
	import RoadmapStage from './RoadmapStage.svelte';
	import RoadmapStepDetails from './RoadmapStepDetails.svelte';
	let { map }: { map: RoadmapView } = $props();
	const uid = $props.id();
	let dialog = $state<HTMLDialogElement>();
	let supportsDialog = $state(false);
	let selectedId = $state<string>();
	let trigger: HTMLButtonElement | undefined;
	let restoreFocus = true;
	const selected = $derived(
		map.stages.flatMap((stage) => stage.steps).find((step) => step.id === selectedId)
	);
	const mainStages = $derived(map.stages.filter((stage) => !stage.optional));
	const optionalStages = $derived(map.stages.filter((stage) => stage.optional));
	const groups = $derived(
		['Dasar', 'Menengah'].map((level) => ({
			level,
			stages: mainStages.filter((stage) => stage.level === level)
		}))
	);

	onMount(() => {
		supportsDialog = typeof dialog?.showModal === 'function';
	});
	async function openStep(stepId: string, source: HTMLButtonElement) {
		if (!dialog || !supportsDialog) return;
		trigger = source;
		restoreFocus = true;
		selectedId = stepId;
		await tick();
		if (dialog.isConnected && !dialog.open) {
			dialog.showModal();
			dialog.querySelector('button')?.focus({ preventScroll: true });
		}
	}
	function close() {
		if (restoreFocus && trigger?.isConnected) trigger.focus({ preventScroll: true });
		selectedId = undefined;
		trigger = undefined;
	}
	function followLink() {
		restoreFocus = false;
		dialog?.close();
	}
</script>

{#snippet mapGuide()}
	<div class="space-y-6">
		<nav aria-label="Tahap peta belajar" class="space-y-3">
			<h2 class="text-lg font-semibold">Pilih tahap</h2>
			<ol class="space-y-1">
				{#each mainStages as stage (stage.id)}
					<li>
						<a
							href={`#${stage.id}`}
							class="flex min-h-11 items-start gap-3 py-2 text-primary underline underline-offset-4"
							><span class="shrink-0 tabular-nums">{stage.number}.</span><span>{stage.title}</span
							></a
						>
					</li>
				{/each}
			</ol>
			<a
				href="#fondasi"
				class="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
				>Fondasi membaca · opsional</a
			>
		</nav>
		<div class="space-y-3 border-t pt-4">
			<h2 class="text-lg font-semibold">Cara membaca peta</h2>
			<dl class="space-y-3 text-base">
				<div>
					<dt class="font-semibold">Jalur utama</dt>
					<dd class="text-muted-foreground">Enam tahap setelah Iqra.</dd>
				</div>
				<div>
					<dt class="font-semibold">Opsional</dt>
					<dd class="text-muted-foreground">Latihan fondasi atau rujukan tambahan.</dd>
				</div>
				<div>
					<dt class="font-semibold">Direncanakan</dt>
					<dd class="text-muted-foreground">Bahan belajar atau titik cek belum tersedia.</dd>
				</div>
				<div>
					<dt class="font-semibold">Urutan tidak ketat</dt>
					<dd class="text-muted-foreground">
						Buka tahap yang Anda perlukan; bekal sebelumnya ada dalam rincian langkah.
					</dd>
				</div>
			</dl>
			<p class="text-base text-muted-foreground">
				Peta ini mencakup pelajaran publik. Draf · bersumber, belum ditinjau ustadz.
			</p>
		</div>
	</div>
{/snippet}

<div
	class="mt-10 grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-14"
	data-learning-roadmap
>
	<aside class="min-w-0 xl:order-2">
		<details class="rounded-xl border p-4 xl:hidden">
			<summary class="min-h-11 cursor-pointer font-semibold">Tahap dan panduan peta</summary>
			<div class="pt-4">{@render mapGuide()}</div>
		</details>
		<div class="hidden xl:sticky xl:top-24 xl:block">{@render mapGuide()}</div>
	</aside>
	<div class="min-w-0 space-y-16 xl:order-1">
		{#each groups as group (group.level)}
			<section
				id={group.level.toLowerCase()}
				aria-label={group.level}
				class="scroll-mt-24 space-y-10"
			>
				<h2 class="border-b pb-3 text-2xl font-semibold">{group.level}</h2>
				{#each group.stages as stage (stage.id)}
					<RoadmapStage {stage} onOpen={supportsDialog ? openStep : undefined} />
				{/each}
			</section>
		{/each}
		<section
			id="fondasi"
			aria-label="Fondasi membaca opsional"
			class="scroll-mt-24 space-y-8 border-t pt-8"
		>
			<h2 class="text-2xl font-semibold">Berlatih membaca sebelum melanjutkan</h2>
			<p class="max-w-[65ch] text-muted-foreground">
				Jalur Iqra dapat dipakai kapan saja untuk melatih huruf, harakat dan kalimat pendek.
			</p>
			{#each optionalStages as stage (stage.id)}
				<RoadmapStage {stage} onOpen={supportsDialog ? openStep : undefined} />
			{/each}
		</section>
	</div>
</div>

<dialog
	bind:this={dialog}
	aria-labelledby={`${uid}-title`}
	onclose={close}
	class="m-auto max-h-[85dvh] w-[min(92vw,42rem)] max-w-none overflow-y-auto overscroll-contain rounded-2xl border bg-card p-5 text-card-foreground backdrop:bg-black/45 sm:p-7"
>
	{#if selected}
		<div class="mb-6 flex items-start justify-between gap-4">
			<h2 id={`${uid}-title`} class="text-2xl font-semibold">{selected.title}</h2>
			<form method="dialog">
				<button type="submit" class="min-h-11 rounded-lg border px-4 font-medium hover:bg-secondary"
					>Tutup</button
				>
			</form>
		</div>
		<RoadmapStepDetails step={selected} onFollowLink={followLink} />
	{/if}
</dialog>
