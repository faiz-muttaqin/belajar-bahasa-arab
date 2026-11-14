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
	import {
		sortQuranVocabulary,
		verifiedFrequencyCount,
		type QuranOrder
	} from '#lib/domain/vocabulary/frequency.js';
	import { QURAN_GROUPS, type QuranGroup } from '#lib/domain/vocabulary/types.js';

	let { hafalan }: { hafalan: boolean } = $props();

	let activeGroup = $state<'all' | QuranGroup>('all');
	let order = $state<QuranOrder>('frequent');
	const groups: { id: 'all' | QuranGroup; title: string; count: number }[] = [
		{ id: 'all', title: 'Semua jenis', count: quranVocabulary.length },
		...Object.entries(QURAN_GROUPS).map(([id, title]) => ({
			id: id as QuranGroup,
			title,
			count: quranVocabulary.filter((item) => item.quranGroup === id).length
		}))
	];
	let visible = $derived(
		sortQuranVocabulary(
			quranVocabulary.filter((item) => activeGroup === 'all' || item.quranGroup === activeGroup),
			order
		)
	);
	let verified = $derived(verifiedFrequencyCount(visible));

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
	<header class="space-y-2">
		<h2 id="al-quran-heading" class="text-2xl font-semibold">Kosakata Al-Qur’an</h2>
		<p class="max-w-[75ch] text-pretty text-muted-foreground">
			{quranVocabulary.length} entri dari glosarium proyek. Urutan awal berdasarkan jumlah kemunculan
			lema atau fi’il di Al-Qur’an, bukan frekuensi akar kata.
		</p>
	</header>

	<div class="space-y-3" role="group" aria-label="Filter jenis kata Al-Qur’an">
		<p class="text-sm font-semibold text-muted-foreground">Jenis kata</p>
		<div class="flex flex-wrap gap-2">
			{#each groups as group (group.id)}
				<button
					type="button"
					aria-pressed={activeGroup === group.id}
					onclick={() => (activeGroup = group.id)}
					class="inline-flex min-h-11 items-center gap-2 rounded-full border bg-card px-3 text-sm font-medium transition-colors hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
				>
					{group.title}
					<span class="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
						>{group.count}</span
					>
				</button>
			{/each}
		</div>
	</div>

	<div class="flex flex-wrap items-end justify-between gap-4 border-y py-3">
		<div>
			<p class="text-sm font-semibold">{visible.length} kata ditampilkan</p>
			<p class="text-sm text-muted-foreground">
				{verified} sudah memiliki hitungan terverifikasi; lainnya diletakkan di akhir urutan frekuensi.
			</p>
		</div>
		<div class="space-y-1">
			<label for="quran-vocab-order" class="block text-sm font-medium">Urutkan</label>
			<select
				id="quran-vocab-order"
				bind:value={order}
				class="min-h-11 rounded-lg border bg-background px-3 text-sm"
			>
				<option value="frequent">Paling sering disebut</option>
				<option value="rare">Paling jarang disebut</option>
				<option value="alphabetical">Abjad Arab</option>
			</select>
		</div>
	</div>

	<details class="max-w-[75ch] rounded-xl border bg-card px-4">
		<summary class="min-h-11 cursor-pointer py-3 font-medium"
			>Cara menghitung, sumber, dan playlist</summary
		>
		<div class="space-y-3 pb-4 text-sm text-muted-foreground">
			<p>
				Frekuensi merujuk pada Quranic Arabic Corpus: daftar lema nonverba atau konkordansi fi’il
				menurut pola morfologinya. Angka bukan hitungan ejaan yang persis sama dalam ayat dan bukan
				jumlah seluruh turunan akar. Bentuk ambigu dipisahkan jika data gramatikalnya memungkinkan.
				Data yang belum diperiksa tidak diberi angka nol.
			</p>
			<p>
				Contoh kata dari ayat mengikuti {TANZIL_TEXT_VERSION}. Seluruh angka berstatus pemeriksaan
				data awal; tinjauan bahasa Arab oleh pengajar masih diperlukan.
			</p>
			<div class="flex flex-wrap gap-x-5">
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- QAC corpus -->
				<a class="text-primary underline" href="https://corpus.quran.com/lemmas.jsp?group=1"
					>Daftar lema</a
				>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- QAC corpus -->
				<a class="text-primary underline" href="https://corpus.quran.com/verbs.jsp"
					>Konkordansi fi’il</a
				>
			</div>
			<ul class="flex flex-wrap gap-x-5">
				{#each playlists as playlist (playlist.href)}
					<li>
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- Arabic101 playlist -->
						<a href={playlist.href} class="inline-flex min-h-11 items-center text-primary underline"
							>{playlist.label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</details>

	<ul
		class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))] gap-4"
		aria-label="Daftar kata Al-Qur’an berdasarkan frekuensi"
	>
		{#each visible as item (item.id)}
			<li id={`kata-${item.id}`} class="scroll-mt-24">
				{#key hafalan}
					<VocabCard {item} {hafalan}>
						{#snippet details()}
							<div class="flex flex-wrap gap-x-4 text-sm">
								{#if item.quranFrequency}
									<details class="w-full">
										<summary class="min-h-11 cursor-pointer py-3 font-medium text-primary"
											>Lihat sumber hitungan</summary
										>
										<p class="pb-2 text-muted-foreground">
											{item.quranFrequency.note ??
												'Berdasarkan identitas lema dalam Quranic Arabic Corpus; bentuk berimbuhan dapat ikut terhitung.'}
										</p>
										<!-- eslint-disable svelte/no-navigation-without-resolve -- external QAC frequency link -->
										<a
											href={item.quranFrequency.source}
											class="inline-flex min-h-11 items-center text-primary underline"
											>Verifikasi frekuensi</a
										>
										<!-- eslint-enable svelte/no-navigation-without-resolve -->
									</details>
								{/if}
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

	<p class="text-sm text-muted-foreground">
		{TANZIL_NOTICE}.
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- Tanzil license -->
		<a href={TANZIL_LICENSE_URL} class="text-primary underline"
			>Lisensi CC BY 3.0 · teks apa adanya</a
		>. Data frekuensi dirujuk ke Quranic Arabic Corpus (© Kais Dukes, versi korpus 0.4); tidak ada
		berkas anotasi korpus yang disalin ke proyek. Transliterasi fi’il bertaut bersumber dari
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- Wiktionary attribution -->
		<a href="https://en.wiktionary.org/" class="text-primary underline">Wiktionary</a>,
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- Wiktionary content license -->
		<a href="https://creativecommons.org/licenses/by-sa/4.0/" class="text-primary underline"
			>CC BY-SA 4.0</a
		>.
	</p>
</section>
