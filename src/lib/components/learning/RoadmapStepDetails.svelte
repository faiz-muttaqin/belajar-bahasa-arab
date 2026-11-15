<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RoadmapStepView } from '#lib/domain/roadmap/presentation.js';
	import { levelLabels, type CompetencyUnderstanding } from '#lib/domain/roadmap/evidence.js';
	import MixedText from './MixedText.svelte';
	import RoadmapSources from './RoadmapSources.svelte';
	let {
		step,
		onFollowLink,
		understandingByCompetency
	}: {
		step: RoadmapStepView;
		onFollowLink?: () => void;
		understandingByCompetency?: Record<string, CompetencyUnderstanding>;
	} = $props();
</script>

<div class="space-y-6">
	<div class="space-y-3">
		<p class="font-semibold">Kemampuan terkait</p>
		<ul class="space-y-3" aria-label="Tujuan langkah">
			{#each step.competencies as competency (competency.id)}
				{@const evidence = understandingByCompetency?.[competency.id]}
				<li>
					<p><MixedText text={competency.canDo} /></p>
					{#if evidence}
						<p class="mt-1 text-base text-muted-foreground" data-competency-level={competency.id}>
							{#if evidence.level > 0}
								<strong>{levelLabels[evidence.level]}</strong>
								{#if evidence.selfAssessed}
									· menurut penilaian Anda{/if}
							{:else if !evidence.hasPractice}
								Belum ada latihan dengan jawaban untuk kemampuan ini.
							{:else}
								Belum dicoba.
							{/if}
						</p>
					{/if}
					{#if competency.home.planned}
						<p class="mt-1 text-base text-muted-foreground">
							Pendalaman {competency.home.title.toLowerCase()} masih direncanakan.
						</p>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
	<div class="space-y-2">
		<p class="font-semibold">Pelajaran · ± {step.minutes} menit</p>
		<ul class="space-y-2">
			{#each step.lessons as lesson (lesson.id)}
				<li>
					<a
						href={resolve(`${lesson.track}/${lesson.slug}/`)}
						onclick={onFollowLink}
						class="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
						>{lesson.title}</a
					>
				</li>
			{/each}
		</ul>
	</div>
	{#if step.prerequisites.length}
		<div class="space-y-3">
			<p class="font-semibold">Bekal yang membantu</p>
			<p class="text-base text-muted-foreground">
				Gunakan sebagai rujukan. Anda tetap dapat langsung membuka pelajaran ini.
			</p>
			<ul class="space-y-3" aria-label="Prasyarat yang disarankan">
				{#each step.prerequisites as prerequisite (prerequisite.id)}
					<li>
						<span class="block text-base text-muted-foreground"
							>{prerequisite.strength === 'optional'
								? 'Rujukan tambahan'
								: prerequisite.strength === 'hard'
									? 'Bekal membaca'
									: 'Disarankan dulu'}</span
						>
						{#if prerequisite.home.planned}
							<MixedText text={prerequisite.title} />
							<span class="text-base text-muted-foreground">· Direncanakan</span>
						{:else}
							<a
								href={`#${prerequisite.home.id}`}
								onclick={onFollowLink}
								class="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
								><MixedText text={prerequisite.title} /></a
							>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	{#if understandingByCompetency}
		<p class="text-base text-muted-foreground">
			Tingkat mencerminkan bukti latihan, bukan penyelesaian pelajaran. Tingkat “Tetap ingat” baru
			tersedia sesudah ulangan terjadwal dikembangkan.
		</p>
	{/if}
	<p class="text-base text-muted-foreground">Draf · bersumber, belum ditinjau ustadz.</p>
	<RoadmapSources sources={step.sources} />
</div>
