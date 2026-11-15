<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { summarizeRoadmap } from '#lib/domain/roadmap/progress.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import { notifyProgress, useProgress } from '#lib/progress/browser.svelte.js';
	import {
		parseProgressBackup,
		serializeProgress,
		summarizeProgress
	} from '#lib/progress/lessons.js';
	import { importProgressBackup, readPersistenceStatus } from '#lib/progress/storage.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const progress = useProgress();
	const summary = $derived(summarizeProgress(data.progressLessons, progress.records));
	const roadmapSummary = $derived(
		progress.status === 'ready'
			? summarizeRoadmap(data.roadmap, data.roadmapLessons, progress.records, progress.marks)
			: undefined
	);
	let persistenceStatus = $state<'granted' | 'not-granted' | 'unsupported' | 'loading'>('loading');
	onMount(() => {
		void readPersistenceStatus().then((status) => {
			persistenceStatus = status;
		});
	});
	let backupInput = $state<HTMLInputElement>();
	let importing = $state(false);
	let backupMessage = $state('');

	function exportBackup() {
		const url = URL.createObjectURL(
			new Blob([serializeProgress(progress.records, progress.marks)], {
				type: 'application/json'
			})
		);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'progres-belajar-bahasa-arab.json';
		link.click();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	async function importBackup(event: Event & { currentTarget: HTMLInputElement }) {
		const input = event.currentTarget;
		const file = input.files?.[0];
		if (!file) return;
		input.value = '';
		importing = true;
		backupMessage = '';
		try {
			const backup = parseProgressBackup(await file.text());
			await importProgressBackup(backup);
			notifyProgress();
			backupMessage = 'Cadangan digabungkan dengan progres di browser ini.';
		} catch {
			backupMessage = 'Cadangan tidak dapat diimpor. Gunakan file JSON dari Ekspor progres.';
		} finally {
			importing = false;
		}
	}
</script>

<PageIntro
	title="Progres"
	section="progres"
	description="Lanjutkan pelajaran dan lihat progres belajar bahasa Arab yang tersimpan di browser ini."
>
	{#snippet lead()}
		<p>Lanjutkan pelajaran dari tempat Anda berhenti.</p>
	{/snippet}
</PageIntro>

<div class="mt-8 max-w-3xl space-y-8">
	{#if roadmapSummary}
		<section class="space-y-4 rounded-2xl border p-4 sm:p-6" aria-labelledby="posisi-peta">
			<h2 id="posisi-peta" class="text-xl font-semibold">Posisi di peta belajar</h2>
			{#if roadmapSummary.position}
				<p>
					Anda di <strong
						>Tahap {roadmapSummary.position.stageNumber} · langkah
						{roadmapSummary.position.stepNumber} dari {roadmapSummary.position.stepCount}</strong
					>.
				</p>
				<a
					href={resolve(`belajar/#${roadmapSummary.position.stepId}`)}
					class="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
					>Ke posisi saya</a
				>
			{:else}
				<p>Semua langkah jalur utama sudah selesai atau dilewati.</p>
				<a href={resolve('belajar/')} class="font-medium text-primary underline">Lihat peta</a>
			{/if}
			<ul class="space-y-2 text-base" aria-label="Cakupan langkah per tahap">
				{#each roadmapSummary.stages.filter((stage) => !stage.optional) as stage (stage.stageId)}
					<li>
						Tahap {data.roadmap.stages.find((item) => item.id === stage.stageId)?.number}:
						{stage.counts.completed} dari {stage.totalSteps} langkah selesai
						{#if stage.counts.skipped}
							· {stage.counts.skipped} dilewati{/if}
					</li>
				{/each}
			</ul>
			<p class="text-base text-muted-foreground">
				Hitungan ini adalah cakupan langkah, bukan nilai pemahaman. Iqra dan pendalaman opsional
				tidak dihitung dalam jalur utama.
			</p>
		</section>
	{/if}
	{#if progress.status === 'initial' || progress.status === 'loading'}
		<p role="status">Memuat progres…</p>
	{:else if progress.status === 'ready' && summary.recent.length}
		<section
			class="space-y-3 rounded-2xl bg-secondary p-4 sm:p-6"
			aria-labelledby="langkah-belajar"
		>
			{#if summary.resume}
				<h2 id="langkah-belajar" class="text-xl font-semibold">{summary.resume.title}</h2>
				<Button href={resolve(`${summary.resume.track}/${summary.resume.slug}/`)}
					>Lanjut belajar</Button
				>
			{:else}
				<h2 id="langkah-belajar" class="text-xl font-semibold">Jalur belajar selesai</h2>
				<Button href={resolve('belajar/')}>Lihat daftar pelajaran</Button>
			{/if}
		</section>
		<section class="space-y-3" aria-labelledby="terakhir-dibuka">
			<h2 id="terakhir-dibuka" class="text-xl font-semibold">Pelajaran yang dibuka</h2>
			<ul class="divide-y rounded-xl border bg-card">
				{#each summary.recent as lesson (lesson.id)}
					<li class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2">
						<a
							class="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
							href={resolve(`${lesson.track}/${lesson.slug}/`)}>{lesson.title}</a
						>
						<span class="text-base text-muted-foreground"
							>{summary.isComplete(lesson) ? 'Selesai' : 'Sedang dipelajari'}</span
						>
					</li>
				{/each}
			</ul>
		</section>
	{:else}
		<EmptyState
			title={progress.status === 'unavailable'
				? 'Penyimpanan progres tidak tersedia'
				: 'Mulai pelajaran pertama'}
		>
			{#if progress.status === 'unavailable'}
				<p>Anda tetap bisa membaca pelajaran. Coba muat ulang untuk memeriksa penyimpanan.</p>
			{:else if progress.status === 'ready'}
				<p>Pelajaran yang Anda buka akan muncul di sini.</p>
			{:else}
				<noscript><p>Aktifkan JavaScript untuk menyimpan dan membuka progres.</p></noscript>
			{/if}
			{#snippet actions()}
				<Button href={resolve(`belajar/${data.startSlug}/`)}>Mulai belajar</Button>
			{/snippet}
		</EmptyState>
	{/if}

	{#if progress.status === 'ready'}
		<details class="border-t pt-4">
			<summary class="min-h-11 cursor-pointer py-2 font-medium">Cadangan progres</summary>
			<div class="space-y-3">
				<p class="text-base text-muted-foreground">
					Simpan salinan progres atau gabungkan cadangan dengan progres di browser ini.
				</p>
				<input
					bind:this={backupInput}
					type="file"
					accept=".json,application/json"
					hidden
					onchange={importBackup}
				/>
				<div class="flex flex-wrap gap-3">
					<Button
						variant="outline"
						onclick={exportBackup}
						disabled={(!progress.records.length && !progress.marks.length) || importing}
						>Ekspor progres</Button
					>
					<Button variant="outline" onclick={() => backupInput?.click()} disabled={importing}
						>Impor cadangan</Button
					>
				</div>
				<p role="status" class="text-base">{backupMessage}</p>
				<p class="text-base text-muted-foreground">
					{persistenceStatus === 'granted'
						? 'Penyimpanan persisten telah diberikan oleh browser.'
						: persistenceStatus === 'not-granted'
							? 'Penyimpanan belum dijamin persisten oleh browser. Simpan cadangan secara berkala.'
							: persistenceStatus === 'unsupported'
								? 'Status persistensi penyimpanan tidak tersedia di browser ini.'
								: 'Memeriksa status penyimpanan…'}
				</p>
			</div>
		</details>
	{/if}
</div>
