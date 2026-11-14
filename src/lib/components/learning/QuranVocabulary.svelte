<script lang="ts">
	import { resolve } from '$app/paths';
	import ArabicText from './ArabicText.svelte';
	import VocabCard from './VocabCard.svelte';
	import {
		TANZIL_LICENSE_URL,
		TANZIL_NOTICE,
		TANZIL_TEXT_VERSION,
		quranVocabulary
	} from '#lib/content/quran-vocabulary.js';
	import { QURAN_GROUPS, type QuranGroup } from '#lib/domain/vocabulary/types.js';

	let { hafalan }: { hafalan: boolean } = $props();
	const groups = Object.entries(QURAN_GROUPS).map(([id, title]) => ({
		id: id as QuranGroup,
		title,
		items: quranVocabulary.filter((item) => item.quranGroup === id)
	}));
	const playlists = [
		{
			label: 'Panduan membaca dan memahami',
			href: 'https://www.youtube.com/playlist?list=PL6TlMIZ5ylgrYBl5c2LGoc1iwTPyYMMYH'
		},
		{
			label: 'Kosakata dasar yang sering muncul',
			href: 'https://www.youtube.com/playlist?list=PL6TlMIZ5ylgrtqN60yWKuS6xvPDUx6cNZ'
		},
		{
			label: 'Kosakata lanjutan dan pola kata',
			href: 'https://www.youtube.com/playlist?list=PL6TlMIZ5ylgr0FQHVC3yzL6TM9lOXHXc7'
		}
	];
</script>

<section id="al-quran" class="mt-16 scroll-mt-24 space-y-6" aria-labelledby="al-quran-heading">
	<div class="space-y-2">
		<h2 id="al-quran-heading" class="text-2xl font-semibold">Kosakata Al-Qur’an</h2>
		<p class="max-w-[65ch] text-pretty text-muted-foreground">
			{quranVocabulary.length} entri awal. Mulai dari kata penghubung dan kata rujukan, lalu pelajari
			fi’il dan isim yang membantu memahami susunan ayat.
		</p>
	</div>
	<nav aria-label="Kelompok kosakata Al-Qur’an" class="flex flex-wrap gap-2">
		{#each groups as group (group.id)}
			<a
				href={`#quran-${group.id}`}
				class="inline-flex min-h-11 items-center rounded-md border bg-card px-3 text-sm font-medium hover:bg-accent"
			>
				{group.title} <span class="ms-2 text-muted-foreground">{group.items.length}</span>
			</a>
		{/each}
	</nav>
	<details class="max-w-[70ch] rounded-xl border bg-card px-4">
		<summary class="min-h-11 cursor-pointer py-3 font-medium">Sumber dan playlist belajar</summary>
		<p class="text-sm text-muted-foreground">
			Lema memakai bentuk kamus. Contoh dari ayat mengikuti {TANZIL_TEXT_VERSION}. Arti di kartu
			adalah glos Indonesia untuk belajar kosakata.
		</p>
		<ul class="mt-2 flex flex-wrap gap-x-5 pb-3 text-sm">
			{#each playlists as playlist (playlist.href)}
				<li>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- Arabic101 playlist -->
					<a href={playlist.href} class="inline-flex min-h-11 items-center text-primary underline">
						{playlist.label}
					</a>
				</li>
			{/each}
		</ul>
	</details>
	{#each groups as group (group.id)}
		<section id={`quran-${group.id}`} aria-label={group.title} class="scroll-mt-24 space-y-4">
			<h3 class="text-xl font-semibold">{group.title}</h3>
			<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))] gap-4">
				{#each group.items as item (item.id)}
					<li id={`kata-${item.id}`} class="scroll-mt-24">
						{#key hafalan}
							<VocabCard {item} {hafalan}>
								{#snippet details()}
									<div class="flex flex-wrap gap-x-4 text-sm">
										{#if item.quranOccurrence}
											<details class="w-full">
												<summary class="min-h-11 cursor-pointer py-3 font-medium text-primary">
													Bentuk di ayat {item.quranOccurrence.reference}
												</summary>
												<div class="space-y-1 pb-3">
													<ArabicText text={item.quranOccurrence.token} size="block" />
													<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- Tanzil ayah source -->
													<a
														href={`https://tanzil.net/#${item.quranOccurrence.reference}`}
														class="text-primary underline"
													>
														Buka ayat di Tanzil
													</a>
												</div>
											</details>
										{/if}
										{#if item.verbReference}
											<a
												href={resolve(
													`rujukan/fiil/kata-kerja/${item.verbReference.bab}/#kata-kerja-bab-${item.verbReference.bab}-${item.verbReference.id}`
												)}
												class="inline-flex min-h-11 items-center text-primary underline"
											>
												Lihat di kamus fi’il
											</a>
										{/if}
									</div>
								{/snippet}
							</VocabCard>
						{/key}
					</li>
				{/each}
			</ul>
		</section>
	{/each}
	<p class="text-sm text-muted-foreground">
		{TANZIL_NOTICE}.
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- Tanzil license -->
		<a href={TANZIL_LICENSE_URL} class="text-primary underline"
			>Lisensi CC BY 3.0 · teks apa adanya</a
		>. Transliterasi fi’il bertaut bersumber dari
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- Wiktionary attribution -->
		<a href="https://en.wiktionary.org/" class="text-primary underline">Wiktionary</a>,
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- Wiktionary content license -->
		<a href="https://creativecommons.org/licenses/by-sa/4.0/" class="text-primary underline">
			CC BY-SA 4.0
		</a>.
	</p>
</section>
