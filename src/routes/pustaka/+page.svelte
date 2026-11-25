<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import LocalBadge from '#lib/components/local/LocalBadge.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const langName = { id: 'Indonesia', ar: 'Arab', en: 'Inggris' } as const;
</script>

<PageIntro
	title="Pustaka"
	description="Salinan lokal materi dari repositori sumber, untuk belajar pribadi di perangkat pemilik. Belum ditinjau, tidak diterbitkan, dan kosong di situs publik."
	section="pustaka"
>
	{#snippet lead()}
		<p>Salinan lokal materi sumber untuk belajar pribadi. Belum ditinjau ustadz.</p>
	{/snippet}
</PageIntro>

{#if data.sources.length === 0}
	<div class="mt-10 max-w-[68ch]">
		<EmptyState title="Belum ada salinan lokal">
			<p>
				Pustaka berisi salinan materi dari repositori sumber yang sebagian lisensinya belum jelas,
				jadi hanya ada di perangkat pemilik dan tidak ikut diterbitkan.
			</p>
			<p>
				Untuk mengisinya, jalankan <code class="rounded bg-background px-1 py-0.5 text-[0.9em]"
					>bun run content:import</code
				>
				di checkout lokal, lalu mulai ulang server pengembangan.
			</p>
			{#snippet actions()}
				<a
					href={resolve('belajar/')}
					class="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
					>Kembali ke jalur belajar</a
				>
			{/snippet}
		</EmptyState>
	</div>
{:else}
	<div class="mt-10 space-y-16">
		{#each data.sources as entry (entry.source.id)}
			<section aria-labelledby="sumber-{entry.source.id}" class="space-y-6">
				<h2 id="sumber-{entry.source.id}" class="text-2xl font-semibold">{entry.source.name}</h2>
				<LocalBadge source={entry.source} />

				{#if entry.tracks.length > 0}
					<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-4">
						{#each entry.tracks as track (track.id)}
							<li>
								<a
									href={resolve(`pustaka/${track.slug}/`)}
									class="group flex h-full items-center justify-between gap-4 rounded-xl border bg-card px-4 py-4 transition-colors hover:bg-accent sm:px-6"
								>
									<span>
										<span class="block font-semibold group-hover:underline">{track.title}</span>
										<span class="mt-1 block text-base text-pretty text-muted-foreground"
											>{track.description}</span
										>
										<span class="mt-1 block text-base text-muted-foreground"
											>{track.lessonCount} pelajaran · bahasa {langName[track.lang]}</span
										>
									</span>
									<ArrowRight class="size-5 shrink-0 text-primary" aria-hidden="true" />
								</a>
							</li>
						{/each}
					</ul>
				{/if}

				{#if entry.vocabSets.length > 0}
					<div class="space-y-3">
						<h3 class="text-xl font-semibold">Kosakata</h3>
						<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,12rem),1fr))] gap-3">
							{#each entry.vocabSets as set (set.id)}
								<li>
									<a
										href={resolve(`pustaka/kosakata/${set.slug}/`)}
										class="flex min-h-11 flex-col rounded-xl border bg-card px-4 py-3 transition-colors hover:bg-accent"
									>
										<span class="font-semibold">{set.title}</span>
										<span class="text-base text-muted-foreground tabular-nums"
											>{set.itemCount} kata</span
										>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if entry.tables.length > 0}
					<div class="space-y-3">
						<h3 class="text-xl font-semibold">Tabel rujukan</h3>
						<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] gap-3">
							{#each entry.tables as table (table.id)}
								<li>
									<a
										href={resolve(`pustaka/rujukan/${table.slug}/`)}
										class="flex min-h-11 items-center rounded-xl border bg-card px-4 py-3 font-semibold transition-colors hover:bg-accent"
										>{table.title}</a
									>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</section>
		{/each}
	</div>
{/if}
