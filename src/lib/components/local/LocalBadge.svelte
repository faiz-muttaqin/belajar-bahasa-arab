<script lang="ts">
	import Copy from '@lucide/svelte/icons/copy';
	import type { LocalSource } from '#lib/domain/local-content/types.js';

	/**
	 * Status and attribution shown on every local page (plan, hard rule 6). Local copies are
	 * unreviewed and for personal study only; the source's attribution line always appears.
	 */
	let { source, origin }: { source: LocalSource; origin?: string } = $props();

	const safeUrl = (url: string) => (/^https:\/\//i.test(url) ? url : undefined);
	let repo = $derived(safeUrl(source.repoUrl));
</script>

<aside
	class="max-w-[68ch] space-y-2 rounded-2xl bg-secondary/70 p-4 md:p-6"
	aria-label="Status dan sumber"
>
	<p class="flex items-center gap-2 text-base font-semibold text-secondary-foreground">
		<Copy class="size-5 shrink-0 text-primary" aria-hidden="true" />
		Salinan lokal · belum ditinjau
	</p>
	<p class="text-base text-pretty text-secondary-foreground">{source.attribution}</p>
	<p class="text-base text-pretty text-muted-foreground">
		Sumber:
		{#if repo}
			<!-- eslint-disable svelte/no-navigation-without-resolve -- external source repository, https only -->
			<a
				href={repo}
				rel="noopener noreferrer"
				class="underline underline-offset-4 hover:text-foreground">{source.name}</a
			>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		{:else}
			{source.name}
		{/if}
		· lisensi: {source.licence} · diimpor {source.importedAt}
	</p>
	{#if origin}
		<p class="text-base text-pretty text-muted-foreground">
			Berkas asal: <code class="rounded bg-background px-1 py-0.5 text-[0.9em] break-all"
				>{origin}</code
			>
		</p>
	{/if}
</aside>
