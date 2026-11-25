<script lang="ts">
	import type { RoadmapCoverage, StageCoverage } from '#lib/domain/roadmap/coverage.js';
	import { levelLabels } from '#lib/domain/roadmap/evidence.js';

	/**
	 * Evidence per stage (VP-04). Built only from stored practice answers. Opening,
	 * completing or skipping a step never raises a number here.
	 */
	let {
		structure,
		coverage,
		state
	}: {
		structure: readonly { id: string; number: number; title: string }[];
		coverage?: RoadmapCoverage;
		state: 'pending' | 'ready' | 'unavailable';
	} = $props();

	const levels = [1, 2, 3] as const;
	const sentence = (stage: StageCoverage) => {
		const { evidence } = stage;
		const parts = levels.map((level) => `${evidence.levels[level]} ${levelLabels[level]}`);
		return `${evidence.withAnswers} dari ${evidence.totalCompetencies} kemampuan sudah punya jawaban latihan: ${parts.join(', ')}.`;
	};
</script>

<section
	class="space-y-4 rounded-2xl border p-4 sm:p-6"
	aria-labelledby="ringkasan-bukti"
	data-roadmap-evidence={state}
>
	<h2 id="ringkasan-bukti" class="text-xl font-semibold">Bukti latihan per tahap</h2>
	<p class="text-base text-muted-foreground">
		Dihitung hanya dari jawaban latihan yang tersimpan di perangkat ini. Membuka, menyelesaikan,
		atau melewati langkah tidak menaikkan tingkat. Setiap kemampuan dihitung satu kali, yaitu di
		langkah asalnya.
	</p>
	{#if coverage}
		{#if coverage.totals.evidence.withAnswers === 0}
			<p data-evidence-empty>Belum ada bukti latihan.</p>
		{/if}
		<ul class="space-y-3" aria-label="Daftar bukti latihan tiap tahap">
			{#each coverage.stages as stage (stage.stageId)}
				<li data-evidence-row={stage.stageId}>
					<strong class="font-medium">Tahap {stage.number} · {stage.title}</strong>:
					{#if stage.evidence.totalCompetencies === 0}
						Tidak ada kemampuan yang dihitung di tahap ini.
					{:else if stage.evidence.withAnswers === 0}
						Belum ada bukti latihan.
					{:else}
						{sentence(stage)}
						{#if stage.evidence.selfAssessed > 0}
							{stage.evidence.selfAssessed} di antaranya dari penilaian Anda sendiri.
						{/if}
					{/if}
					{#if stage.evidence.withoutPractice > 0}
						<span class="text-muted-foreground">
							{stage.evidence.withoutPractice} kemampuan belum punya soal latihan.</span
						>
					{/if}
				</li>
			{/each}
		</ul>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="overflow-x-auto"
			role="region"
			aria-label="Tabel bukti latihan per tahap"
			tabindex="0"
		>
			<table class="w-full min-w-[44rem] border-collapse text-start text-base">
				<caption class="pb-2 text-start text-muted-foreground"
					>Angka yang sama dalam bentuk tabel. Kolom tingkat berisi jumlah kemampuan pada tingkat
					itu.</caption
				>
				<thead>
					<tr class="border-b align-bottom">
						<th scope="col" class="py-2 pe-3 text-start font-semibold">Tahap</th>
						<th scope="col" class="px-2 py-2 text-end font-semibold">Jumlah kemampuan</th>
						<th scope="col" class="px-2 py-2 text-end font-semibold">{levelLabels[0]}</th>
						{#each levels as level (level)}
							<th scope="col" class="px-2 py-2 text-end font-semibold">{levelLabels[level]}</th>
						{/each}
						<th scope="col" class="px-2 py-2 text-end font-semibold">Dari penilaian sendiri</th>
						<th scope="col" class="py-2 ps-2 text-end font-semibold">Belum punya soal latihan</th>
					</tr>
				</thead>
				<tbody>
					{#each coverage.stages as stage (stage.stageId)}
						<tr class="border-b" data-evidence-table-row={stage.stageId}>
							<th scope="row" class="py-2 pe-3 text-start font-normal">Tahap {stage.number}</th>
							<td class="px-2 py-2 text-end tabular-nums">{stage.evidence.totalCompetencies}</td>
							<td class="px-2 py-2 text-end tabular-nums">{stage.evidence.levels[0]}</td>
							{#each levels as level (level)}
								<td class="px-2 py-2 text-end tabular-nums">{stage.evidence.levels[level]}</td>
							{/each}
							<td class="px-2 py-2 text-end tabular-nums">{stage.evidence.selfAssessed}</td>
							<td class="py-2 ps-2 text-end tabular-nums">{stage.evidence.withoutPractice}</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr data-evidence-table-row="total">
						<th scope="row" class="py-2 pe-3 text-start font-semibold">Jalur utama</th>
						<td class="px-2 py-2 text-end font-semibold tabular-nums"
							>{coverage.totals.evidence.totalCompetencies}</td
						>
						<td class="px-2 py-2 text-end font-semibold tabular-nums"
							>{coverage.totals.evidence.levels[0]}</td
						>
						{#each levels as level (level)}
							<td class="px-2 py-2 text-end font-semibold tabular-nums"
								>{coverage.totals.evidence.levels[level]}</td
							>
						{/each}
						<td class="px-2 py-2 text-end font-semibold tabular-nums"
							>{coverage.totals.evidence.selfAssessed}</td
						>
						<td class="py-2 ps-2 text-end font-semibold tabular-nums"
							>{coverage.totals.evidence.withoutPractice}</td
						>
					</tr>
				</tfoot>
			</table>
		</div>
		<p class="text-base text-muted-foreground">
			Tingkat ditentukan dengan batas sementara dari situs ini, bukan dengan penilaian kemampuan
			bahasa yang sudah teruji. Soal saat ini berstatus draf, belum ditinjau ustadz.
		</p>
	{:else}
		<p role="status">
			{#if state === 'unavailable'}
				Penyimpanan di perangkat ini tidak tersedia sehingga jawaban latihan tidak bisa dibaca.
			{:else}
				Jawaban latihan dibaca dari perangkat ini setelah halaman dimuat. Sebelum itu, belum ada
				angka bukti latihan.
			{/if}
		</p>
		<ol class="space-y-1 text-base" aria-label="Tahap jalur utama" data-evidence-static>
			{#each structure as stage (stage.id)}
				<li>Tahap {stage.number} · {stage.title}</li>
			{/each}
		</ol>
	{/if}
</section>
