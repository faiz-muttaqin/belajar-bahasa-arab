<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import { groupStyle } from '#lib/components/learning/reference-group-style.js';
	import { groupOfTable, referenceGroups } from '#lib/content/reference-groups.js';

	// Old links used one long page with section anchors: send them to the new page.
	onMount(() => {
		const id = location.hash.slice(1).split('-row-')[0] ?? '';
		const group = groupOfTable(id);
		if (group) {
			void goto(resolve(group.path), { replaceState: true }).then(() => {
				location.hash = id;
			});
		}
	});
</script>

<PageIntro
	title="Jenis kata"
	section="rujukan"
	description="Rujukan bahasa Arab per jenis kata: kata kerja dan wazan tashrif, kata benda dan sifat, kata hubung dan kata tugas, serta kata tanya."
>
	{#snippet lead()}
		<p>Pilih jenis kata yang ingin dicek. Ketuk sebuah kata untuk melihat contohnya.</p>
	{/snippet}
</PageIntro>

<ul class="mt-10 grid gap-4 sm:grid-cols-2">
	{#each referenceGroups as group (group.id)}
		{@const style = groupStyle[group.id]}
		<li>
			<a
				href={resolve(group.path)}
				class="block h-full rounded-2xl border border-t-4 bg-card p-5 transition-colors hover:bg-secondary {style.bar}"
			>
				<span class="flex items-center justify-between gap-3">
					<span class="inline-flex size-11 items-center justify-center rounded-xl {style.tint}">
						<style.icon class="size-6" aria-hidden="true" />
					</span>
					<ArabicText text={group.arabic} size="block" class="text-3xl" />
				</span>
				<span class="mt-4 block text-lg font-semibold">{group.label}</span>
				<span class="mt-1 block text-muted-foreground">{group.summary}</span>
				<span class="mt-3 block text-sm text-muted-foreground">
					<span class="font-medium text-foreground">Ciri:</span>
					{group.hint}
				</span>
			</a>
		</li>
	{/each}
</ul>

<aside class="mt-8 max-w-3xl rounded-xl border bg-card p-5">
	<h2 class="font-semibold">Dari jenis kata ke susunan kalimat</h2>
	<p class="mt-2 text-muted-foreground">
		Pelajari na‘at–man‘ūt, mubtada–khabar, dan idafah dengan warna peran serta arti yang terletak
		tepat di bawah tiap kata Arab.
	</p>
	<a
		href={resolve('kaidah/')}
		class="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline"
	>
		Buka peta kaidah
	</a>
</aside>

<p class="mt-8 text-muted-foreground">
	Mencari kata tertentu?
	<a href={resolve('sharaf/')} class="font-medium text-primary underline">Cari akar dan wazan</a>
	atau
	<a href={resolve('cari/')} class="font-medium text-primary underline">cari di semua materi</a>.
</p>
