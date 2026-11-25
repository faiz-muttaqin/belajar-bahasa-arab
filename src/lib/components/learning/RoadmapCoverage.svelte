<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RoadmapCoverage, StageCoverage } from '#lib/domain/roadmap/coverage.js';
	import type { StepStatus } from '#lib/domain/roadmap/types.js';

	/**
	 * Step coverage per stage (VP-04). Counts come from the roadmap catalogue and from
	 * progress stored on this device. They describe how much of the map has been walked,
	 * not how well anything is understood.
	 */
	let {
		structure,
		coverage,
		state
	}: {
		/** Static stage list from the catalogue, safe to render before IndexedDB is read. */
		structure: readonly { id: string; number: number; title: string; totalSteps: number }[];
		coverage?: RoadmapCoverage;
		state: 'pending' | 'ready' | 'unavailable';
	} = $props();

	const order = [
		{ key: 'completed', label: 'Selesai', mark: '✓' },
		{ key: 'learning', label: 'Sedang dipelajari', mark: '◐' },
		{ key: 'skipped', label: 'Dilewati', mark: '↗' },
		{ key: 'not_started', label: 'Belum dimulai', mark: '○' }
	] as const satisfies readonly { key: StepStatus; label: string; mark: string }[];
	const tableOrder = [order[3], order[1], order[0], order[2]] as const;

	const stageLabel = (stage: StageCoverage) =>
		`${stage.counts.completed} dari ${stage.totalSteps} langkah selesai${
			stage.counts.skipped ? ` · ${stage.counts.skipped} dilewati` : ''
		}`;
	const detail = (stage: Pick<StageCoverage, 'counts'>) =>
		tableOrder.map((item) => `${item.label}: ${stage.counts[item.key]}`).join(' · ');
	const summary = $derived(
		coverage
			? `Di jalur utama, ${coverage.totals.counts.completed} dari ${coverage.totals.totalSteps} langkah selesai, ${coverage.totals.counts.learning} sedang dipelajari, ${coverage.totals.counts.skipped} dilewati, dan ${coverage.totals.counts.not_started} belum dimulai.`
			: undefined
	);
</script>

<section
	class="space-y-4 rounded-2xl border p-4 sm:p-6"
	aria-labelledby="cakupan-langkah"
	data-roadmap-coverage={state}
>
	<h2 id="cakupan-langkah" class="text-xl font-semibold">Cakupan langkah per tahap</h2>
	{#if coverage && summary}
		<p data-coverage-summary>{summary}</p>
		<ul class="space-y-5" aria-label="Daftar cakupan langkah tiap tahap">
			{#each coverage.stages as stage (stage.stageId)}
				<li class="space-y-2" data-coverage-stage={stage.stageId}>
					<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
						<a
							href={resolve(`belajar/#${stage.stageId}`)}
							class="font-medium text-primary underline underline-offset-4"
							>Tahap {stage.number} · {stage.title}</a
						>
						<span class="font-medium tabular-nums" data-coverage-label>{stageLabel(stage)}</span>
					</div>
					<div class="coverage-bar" aria-hidden="true">
						{#each order as item (item.key)}
							{#if stage.counts[item.key] > 0}
								<span
									class={`coverage-segment coverage-${item.key}`}
									style:flex-grow={stage.counts[item.key]}
								></span>
							{/if}
						{/each}
					</div>
					<p class="text-base text-muted-foreground">{detail(stage)}</p>
				</li>
			{/each}
		</ul>
		<ul class="flex flex-wrap gap-x-5 gap-y-2 text-base" aria-label="Keterangan batang">
			{#each order as item (item.key)}
				<li class="flex items-center gap-2">
					<span class={`coverage-swatch coverage-${item.key}`} aria-hidden="true"></span>
					<span><span aria-hidden="true">{item.mark}</span> {item.label}</span>
				</li>
			{/each}
		</ul>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="overflow-x-auto"
			role="region"
			aria-label="Tabel cakupan langkah per tahap"
			tabindex="0"
		>
			<table class="w-full min-w-[34rem] border-collapse text-start text-base">
				<caption class="pb-2 text-start text-muted-foreground"
					>Angka yang sama dalam bentuk tabel.</caption
				>
				<thead>
					<tr class="border-b">
						<th scope="col" class="py-2 pe-3 text-start font-semibold">Tahap</th>
						{#each tableOrder as item (item.key)}
							<th scope="col" class="px-2 py-2 text-end font-semibold">{item.label}</th>
						{/each}
						<th scope="col" class="py-2 ps-2 text-end font-semibold">Jumlah langkah</th>
					</tr>
				</thead>
				<tbody>
					{#each coverage.stages as stage (stage.stageId)}
						<tr class="border-b" data-coverage-row={stage.stageId}>
							<th scope="row" class="py-2 pe-3 text-start font-normal">Tahap {stage.number}</th>
							{#each tableOrder as item (item.key)}
								<td class="px-2 py-2 text-end tabular-nums">{stage.counts[item.key]}</td>
							{/each}
							<td class="py-2 ps-2 text-end tabular-nums">{stage.totalSteps}</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr data-coverage-row="total">
						<th scope="row" class="py-2 pe-3 text-start font-semibold">Jalur utama</th>
						{#each tableOrder as item (item.key)}
							<td class="px-2 py-2 text-end font-semibold tabular-nums"
								>{coverage.totals.counts[item.key]}</td
							>
						{/each}
						<td class="py-2 ps-2 text-end font-semibold tabular-nums"
							>{coverage.totals.totalSteps}</td
						>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="space-y-2 border-t pt-4" data-coverage-outside>
			<h3 class="text-lg font-semibold">Di luar jalur utama</h3>
			<p class="text-base text-muted-foreground">
				Bagian ini tidak masuk hitungan di atas dan tidak menambah jumlah langkah jalur utama.
			</p>
			<ul class="space-y-1 text-base">
				{#each coverage.foundation as stage (stage.stageId)}
					<li>
						Iqra (opsional): {stage.counts.completed} dari {stage.totalSteps} langkah selesai
						{#if stage.counts.skipped}
							· {stage.counts.skipped} dilewati{/if}
					</li>
				{/each}
				{#each coverage.branches as branch (branch.id)}
					<li>
						{branch.title} (opsional) ·
						{branch.status === 'planned' ? 'direncanakan, belum tersedia' : 'tersedia'}
					</li>
				{/each}
				{#each coverage.plannedCheckpoints as checkpoint (checkpoint.id)}
					<li>{checkpoint.title} · titik cek direncanakan, belum tersedia</li>
				{/each}
			</ul>
		</div>
	{:else}
		<p role="status">
			{#if state === 'unavailable'}
				Penyimpanan di perangkat ini tidak tersedia sehingga status langkah tidak bisa dibaca.
				Jumlah langkah per tahap tetap tampil di bawah.
			{:else}
				Status langkah dibaca dari perangkat ini setelah halaman dimuat. Sebelum itu, hanya jumlah
				langkah per tahap yang tampil; belum ada angka progres.
			{/if}
		</p>
		<noscript>
			<p>Aktifkan JavaScript untuk membaca status langkah yang tersimpan di perangkat ini.</p>
		</noscript>
		<ol class="space-y-1 text-base" aria-label="Jumlah langkah per tahap" data-coverage-static>
			{#each structure as stage (stage.id)}
				<li>Tahap {stage.number} · {stage.title}: {stage.totalSteps} langkah</li>
			{/each}
		</ol>
	{/if}
	<p class="text-base text-muted-foreground">
		Hitungan ini menunjukkan berapa banyak langkah di peta yang sudah Anda jalani, bukan seberapa
		paham Anda. Iqra dan cabang opsional tidak masuk jalur utama.
	</p>
</section>

<style>
	.coverage-bar {
		display: flex;
		height: 0.875rem;
		overflow: hidden;
		border: 1px solid var(--foreground);
		border-radius: 0.25rem;
		background: var(--card);
	}
	.coverage-segment {
		flex-basis: 0;
		min-width: 0.25rem;
	}
	.coverage-segment + .coverage-segment {
		border-inline-start: 1px solid var(--foreground);
	}
	.coverage-swatch {
		display: inline-block;
		width: 1.5rem;
		height: 0.875rem;
		border: 1px solid var(--foreground);
		border-radius: 0.25rem;
	}
	.coverage-completed {
		background: var(--primary);
	}
	.coverage-learning {
		background: repeating-linear-gradient(135deg, var(--primary) 0 3px, var(--card) 3px 6px);
	}
	.coverage-skipped {
		background-color: var(--card);
		background-image: radial-gradient(var(--foreground) 1px, transparent 1.5px);
		background-size: 5px 5px;
	}
	.coverage-not_started {
		background: var(--card);
	}
	@media (forced-colors: active) {
		.coverage-completed {
			background: CanvasText;
		}
		.coverage-learning {
			background: repeating-linear-gradient(135deg, CanvasText 0 3px, Canvas 3px 6px);
		}
		.coverage-skipped {
			background-image: radial-gradient(CanvasText 1px, transparent 1.5px);
		}
	}
</style>
