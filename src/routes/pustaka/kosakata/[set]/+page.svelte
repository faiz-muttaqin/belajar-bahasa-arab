<script lang="ts">
	import { resolve } from '$app/paths';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import LocalBadge from '#lib/components/local/LocalBadge.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let hasPlural = $derived(data.set.items.some((item) => item.plural));
	const meaningLang = { id: 'Indonesia', ar: 'Arab', en: 'Inggris' } as const;
</script>

<div class="min-w-0 space-y-8">
	<a
		href={resolve('pustaka/')}
		class="inline-flex min-h-11 items-center gap-1 font-medium text-primary hover:underline"
	>
		<ChevronLeft class="size-5" aria-hidden="true" />
		Pustaka
	</a>

	<PageIntro
		title="Kosakata: {data.set.title}"
		description="{data.set.itemCount} kata dari {data.source.name}, arti dalam bahasa {meaningLang[
			data.set.meaningLang
		]}. Salinan lokal, belum ditinjau."
		section="pustaka"
	/>

	<LocalBadge source={data.source} origin={data.set.origin} />

	{#if data.set.caveats?.length}
		<section aria-labelledby="catatan-data" class="max-w-[68ch] space-y-2">
			<h2 id="catatan-data" class="text-xl font-semibold">Catatan kualitas data</h2>
			<ul class="list-disc space-y-1 ps-6 text-pretty">
				{#each data.set.caveats as caveat (caveat)}
					<li>{caveat}</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- Scrollable region must be keyboard-focusable (axe: scrollable-region-focusable). -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="overflow-x-auto rounded-md border"
		role="region"
		aria-labelledby="daftar-kata"
		tabindex="0"
	>
		<table class="w-full border-collapse text-start">
			<caption id="daftar-kata" class="px-4 pt-3 pb-2 text-start text-base text-muted-foreground">
				Daftar kata: {data.set.title}, {data.set.itemCount} kata
			</caption>
			<thead>
				<tr class="border-b">
					<th scope="col" class="px-4 py-3 text-start text-base font-semibold">Arab</th>
					<th scope="col" class="px-4 py-3 text-start text-base font-semibold">
						Arti ({meaningLang[data.set.meaningLang]})
					</th>
					{#if hasPlural}
						<th scope="col" class="px-4 py-3 text-start text-base font-semibold">Jamak</th>
					{/if}
				</tr>
			</thead>
			<tbody>
				{#each data.set.items as item (item.id)}
					<tr class="border-b last:border-b-0">
						<td class="px-4 py-3 align-middle">
							<span lang="ar" dir="rtl" class="block arabic-block whitespace-nowrap"
								>{item.arabic}</span
							>
						</td>
						<td class="px-4 py-3 align-middle text-base text-pretty" lang={data.set.meaningLang}
							>{item.meaning}</td
						>
						{#if hasPlural}
							<td class="px-4 py-3 align-middle">
								{#if item.plural}
									<span lang="ar" dir="rtl" class="block arabic-block whitespace-nowrap"
										>{item.plural}</span
									>
								{/if}
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
