<script lang="ts">
	import { onMount } from 'svelte';
	import { recordLearningAnswer } from '#lib/progress/answers.js';
	import type { EvidenceItem, EvidenceSkill } from '#lib/domain/roadmap/evidence.js';

	let {
		itemId,
		lessonId,
		contentRevision,
		competencyIds,
		skill,
		evidenceItems
	}: {
		itemId: string;
		lessonId: string;
		contentRevision: number;
		competencyIds: readonly string[];
		skill: EvidenceSkill;
		evidenceItems: readonly EvidenceItem[];
	} = $props();
	let ready = $state(false);
	let saving = $state(false);
	let message = $state('');
	let error = $state(false);
	onMount(() => {
		ready = true;
	});
	async function assess(matches: boolean) {
		if (saving) return;
		saving = true;
		error = false;
		message = '';
		try {
			const result = await recordLearningAnswer(
				{
					itemId,
					lessonId,
					contentRevision,
					competencyIds: [...competencyIds],
					skill,
					outcome: matches ? 'correct' : 'incorrect',
					assisted: false,
					selfAssessed: true,
					seenWhileAuthoring: false
				},
				evidenceItems
			);
			message = `${matches ? 'Menurut penilaian Anda' : 'Perlu diulang'} · ${result.changes
				.map(
					({ change, label }) =>
						`${change === 'up' ? 'Naik ke' : change === 'down' ? 'Turun ke' : 'Tetap'} ${label}`
				)
				.join(' · ')}`;
		} catch {
			error = true;
		} finally {
			saving = false;
		}
	}
</script>

{#if ready}
	<div class="mt-3 space-y-2 border-t pt-3" data-self-assessment={itemId}>
		<p class="text-base text-muted-foreground">
			Penilaian diri: bandingkan jawaban yang sudah Anda pikirkan sebelum membuka pembahasan. Anggap
			belum cocok bila ragu atau perlu melihat pembahasan. Hasil ini bukan jawaban yang diperiksa
			otomatis, dan tidak bisa mencapai tingkat contoh baru.
		</p>
		<div class="flex flex-wrap gap-2">
			<button
				type="button"
				disabled={saving}
				onclick={() => assess(true)}
				class="min-h-11 rounded-lg border px-3 text-base font-medium hover:bg-secondary disabled:opacity-60"
				>Jawaban saya cocok</button
			>
			<button
				type="button"
				disabled={saving}
				onclick={() => assess(false)}
				class="min-h-11 rounded-lg border px-3 text-base font-medium hover:bg-secondary disabled:opacity-60"
				>Belum cocok</button
			>
		</div>
		{#if saving}
			<p role="status" class="text-base">Menyimpan penilaian…</p>
		{:else if error}
			<p role="status" class="text-base">Penilaian belum tersimpan. Anda tetap bisa belajar.</p>
		{:else if message}
			<p role="status" class="text-base">{message}</p>
		{/if}
	</div>
{/if}
