<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RoadmapStepView } from '#lib/domain/roadmap/presentation.js';
	import MixedText from './MixedText.svelte';
	import RoadmapSources from './RoadmapSources.svelte';
	let { step, onFollowLink }: { step: RoadmapStepView; onFollowLink?: () => void } = $props();
</script>

<div class="space-y-6">
	<div class="space-y-3">
		<p class="font-semibold">Kemampuan terkait</p>
		<ul class="space-y-3" aria-label="Tujuan langkah">
			{#each step.competencies as competency (competency.id)}
				<li>
					<p><MixedText text={competency.canDo} /></p>
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
	<p class="text-base text-muted-foreground">Draf · bersumber, belum ditinjau ustadz.</p>
	<RoadmapSources sources={step.sources} />
</div>
