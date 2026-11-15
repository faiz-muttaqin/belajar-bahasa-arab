<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RoadmapReferencePath } from '#lib/content/roadmap.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import type { RoadmapStageView } from '#lib/domain/roadmap/presentation.js';
	import type { CompetencyUnderstanding } from '#lib/domain/roadmap/evidence.js';
	import type { StepMark, StepStatus } from '#lib/domain/roadmap/types.js';
	import RoadmapStepDetails from './RoadmapStepDetails.svelte';
	import RoadmapSources from './RoadmapSources.svelte';
	let {
		stage,
		onOpen,
		statusByStep = {},
		understandingByCompetency,
		marks = [],
		currentStepId,
		onMark,
		savingStepId
	}: {
		stage: RoadmapStageView;
		onOpen?: (stepId: string, trigger: HTMLButtonElement) => void;
		statusByStep?: Record<string, StepStatus>;
		understandingByCompetency?: Record<string, CompetencyUnderstanding>;
		marks?: readonly StepMark[];
		currentStepId?: string;
		onMark?: (stepId: string, mark: StepMark['mark']) => void;
		savingStepId?: string;
	} = $props();
</script>

<section
	id={stage.id}
	aria-labelledby={`${stage.id}-title`}
	class="scroll-mt-24 space-y-6"
	data-roadmap-stage={stage.id}
>
	<header class="space-y-2">
		<p class="text-base font-medium text-primary">
			{stage.optional ? 'Iqra · opsional' : `Tahap ${stage.number}`} · ± {stage.minutes} menit
		</p>
		<h3 id={`${stage.id}-title`} class="text-2xl font-semibold">{stage.title}</h3>
		<p class="max-w-[65ch] text-muted-foreground">{stage.canDo}</p>
	</header>
	<ol class="space-y-5 border-s-2 ps-4 sm:ps-6" aria-label={`Langkah ${stage.title}`}>
		{#each stage.steps as step, index (step.id)}
			{@const status = statusByStep[step.id]}
			{@const competence = step.primaryCompetencyIds
				.map((id) => understandingByCompetency?.[id])
				.filter((item) => item !== undefined)}
			{@const tested = competence.filter((item) => item.hasPractice)}
			{@const newExampleCount = competence.filter((item) => item.level === 3).length}
			{@const existingMark = marks.find(
				(item) => item.stepId === step.id && item.mark !== 'cleared'
			)}
			<li
				id={step.id}
				class="scroll-mt-24 rounded-2xl border bg-card p-4 sm:p-6"
				data-roadmap-step={step.id}
				data-current-step={currentStepId === step.id ? 'true' : undefined}
			>
				<p class="text-base text-muted-foreground">
					Langkah {index + 1} dari {stage.steps.length} · ± {step.minutes} menit
				</p>
				<h4 class="mt-1 text-xl font-semibold">{step.title}</h4>
				{#if status}
					<p class="mt-2 text-base font-medium" data-step-status={status}>
						{status === 'completed'
							? '✓ Selesai'
							: status === 'skipped'
								? '↗ Dilewati, belum ada bukti'
								: status === 'learning'
									? '◐ Sedang dipelajari'
									: '○ Belum dimulai'}
						{#if currentStepId === step.id}
							· Anda di sini{/if}
					</p>
				{/if}
				{#if understandingByCompetency}
					<p class="mt-2 text-base text-muted-foreground" data-step-understanding={step.id}>
						{#if !tested.length}
							Belum ada latihan dengan jawaban di langkah ini.
						{:else if !tested.some((item) => item.hasAttempts)}
							Bukti pemahaman: belum dicoba.
						{:else}
							Bukti pemahaman: {newExampleCount} dari {step.primaryCompetencyIds.length}
							kemampuan bisa pada contoh baru.
						{/if}
					</p>
				{/if}
				<ul class="mt-4 space-y-3" aria-label={`Pelajaran ${step.title}`}>
					{#each step.lessons as lesson (lesson.id)}
						<li>
							<a
								href={resolve(`${lesson.track}/${lesson.slug}/`)}
								class="group flex min-h-11 items-start justify-between gap-3 py-1 text-primary"
								data-map-lesson={lesson.id}
							>
								<span class="min-w-0 font-semibold underline underline-offset-4"
									>{lesson.title}</span
								>
								<ArrowRight class="mt-1 size-5 shrink-0" aria-hidden="true" />
							</a>
							<p class="max-w-[65ch] text-muted-foreground">{lesson.goal}</p>
						</li>
					{/each}
				</ul>
				{#if onMark}
					<div
						class="mt-4 flex flex-wrap gap-2 border-t pt-4"
						aria-label={`Tanda posisi: ${step.title}`}
					>
						<button
							type="button"
							onclick={() => onMark?.(step.id, 'learning')}
							disabled={savingStepId !== undefined}
							class="min-h-11 rounded-lg border px-3 text-base font-medium hover:bg-secondary disabled:opacity-60"
							>Sedang saya pelajari</button
						>
						<button
							type="button"
							onclick={() => onMark?.(step.id, 'skipped')}
							disabled={savingStepId !== undefined}
							class="min-h-11 rounded-lg border px-3 text-base font-medium hover:bg-secondary disabled:opacity-60"
							>Saya sudah bisa, lewati</button
						>
						{#if existingMark}
							<button
								type="button"
								onclick={() => onMark?.(step.id, 'cleared')}
								disabled={savingStepId !== undefined}
								class="min-h-11 rounded-lg border px-3 text-base font-medium hover:bg-secondary disabled:opacity-60"
								>Hapus tanda</button
							>
						{/if}
					</div>
				{/if}
				{#if onOpen}
					<button
						type="button"
						onclick={(event) => onOpen?.(step.id, event.currentTarget)}
						aria-haspopup="dialog"
						aria-label={`Rincian langkah: ${step.title}`}
						class="mt-4 min-h-11 rounded-lg border px-4 text-base font-medium hover:bg-secondary"
						>Tujuan dan rujukan</button
					>
				{:else}
					<details class="mt-4 border-t pt-3">
						<summary class="min-h-11 cursor-pointer font-medium">Tujuan dan rujukan</summary>
						<div class="pt-3"><RoadmapStepDetails {step} {understandingByCompetency} /></div>
					</details>
				{/if}
			</li>
		{/each}
	</ol>
	{#each stage.branches as branch (branch.id)}
		<aside
			id={branch.id}
			aria-labelledby={`${branch.id}-title`}
			class="scroll-mt-24 space-y-3 rounded-2xl border border-dashed p-4 sm:p-6"
		>
			<p class="text-base text-muted-foreground">
				Cabang opsional{branch.status === 'planned' ? ' · Direncanakan' : ''}
			</p>
			<h4 id={`${branch.id}-title`} class="text-lg font-semibold">{branch.title}</h4>
			<p class="max-w-[65ch] text-muted-foreground">{branch.canDo}</p>
			{#if branch.links.length}
				<ul class="flex flex-wrap gap-x-6 gap-y-2">
					{#each branch.links as link (link.path)}
						<!-- Paths are checked against Kit's route manifest in content/roadmap.ts. -->
						<li>
							<a
								href={resolve(link.path as RoadmapReferencePath)}
								class="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
								>{link.label}</a
							>
						</li>
					{/each}
				</ul>
			{/if}
			<RoadmapSources sources={branch.sources} />
		</aside>
	{/each}
	<aside class="space-y-2 border-y py-4" aria-label={`Titik cek ${stage.title}`}>
		<p class="text-base text-muted-foreground">Titik cek · Direncanakan</p>
		<p class="font-medium">{stage.checkpoint.title}</p>
		<RoadmapSources sources={stage.checkpoint.sources} />
	</aside>
</section>
