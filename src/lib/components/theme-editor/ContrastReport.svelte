<script lang="ts">
	import { auditContrast, formatRatio } from '#lib/theme/contrast.js';
	import type { ColorTokens, Mode } from '#lib/theme/tokens.js';
	import { MODE_LABELS } from '#lib/theme/tokens.js';

	let { colors, mode }: { colors: ColorTokens; mode: Mode } = $props();

	const results = $derived(auditContrast(colors));
	const failures = $derived(results.filter((r) => !r.passes).length);
</script>

<section aria-labelledby="kontras-judul" class="space-y-3">
	<div>
		<h2 id="kontras-judul" class="text-lg font-semibold">Pemeriksaan kontras</h2>
		<p class="text-sm text-muted-foreground">
			Mode {MODE_LABELS[mode].toLowerCase()}. WCAG 2.2 AA: teks minimal 4,5:1, garis dan grafik
			minimal 3:1.
		</p>
	</div>
	<p class="text-sm font-medium" role="status">
		{#if failures === 0}
			Semua {results.length} pasangan warna lulus.
		{:else}
			{failures} dari {results.length} pasangan warna belum lulus.
		{/if}
	</p>
	<ul class="divide-y divide-border rounded-lg border border-border bg-card text-sm">
		{#each results as result (result.id)}
			<li class="flex items-center gap-3 px-3 py-2">
				<span
					aria-hidden="true"
					class="grid size-8 shrink-0 place-items-center rounded-md border border-border text-xs font-semibold"
					style:background-color={colors[result.background]}
					style:color={colors[result.foreground]}>Aa</span
				>
				<span class="min-w-0 flex-1">
					{result.label}
					<span class="block text-xs text-muted-foreground"
						>{result.kind === 'text' ? 'Teks' : 'Garis atau grafik'}, minimal {result.minimum}:1</span
					>
				</span>
				<span class="text-right font-mono text-xs tabular-nums">{formatRatio(result.ratio)}</span>
				<span
					class={[
						'w-16 shrink-0 text-right text-xs font-semibold',
						result.passes ? 'text-primary' : 'text-destructive'
					]}
				>
					{result.passes ? '✓ Lulus' : '✗ Gagal'}
				</span>
			</li>
		{/each}
	</ul>
</section>
