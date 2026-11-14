<script lang="ts">
	import ArabicText from './ArabicText.svelte';
	import VocabCard from './VocabCard.svelte';
	import { publishedVocabulary } from '#lib/content/vocabulary.js';
	import {
		MSA_CLASSES,
		MSA_TOPICS,
		type MsaClass,
		type MsaTopic
	} from '#lib/domain/vocabulary/types.js';
	import { normalizeArabicSearch } from '#lib/domain/sharaf/lexicon.js';

	let { hafalan }: { hafalan: boolean } = $props();

	const vocabulary = publishedVocabulary('msa');
	const classes: { id: 'all' | MsaClass; label: string }[] = [
		{ id: 'all', label: 'Semua jenis kata' },
		...Object.entries(MSA_CLASSES).map(([id, label]) => ({
			id: id as MsaClass,
			label
		}))
	];
	const topics: { id: 'all' | MsaTopic; label: string }[] = [
		{ id: 'all', label: 'Semua tema' },
		...Object.entries(MSA_TOPICS).map(([id, label]) => ({
			id: id as MsaTopic,
			label
		}))
	];

	let activeClass = $state<'all' | MsaClass>('all');
	let activeTopic = $state<'all' | MsaTopic>('all');
	let query = $state('');

	let results = $derived(
		vocabulary.filter((entry) => {
			if (activeClass !== 'all' && entry.msa?.wordClass !== activeClass) return false;
			if (activeTopic !== 'all' && entry.msa?.topic !== activeTopic) return false;
			const search = normalizeArabicSearch(query).toLocaleLowerCase('id');
			if (!search) return true;
			return [
				entry.arabic,
				entry.meaning,
				entry.msa?.root ?? '',
				entry.msa?.plural?.value ?? '',
				entry.msa?.feminine ?? '',
				entry.msa?.example?.arabic ?? '',
				entry.msa?.example?.meaning ?? ''
			].some((value) => normalizeArabicSearch(value).toLocaleLowerCase('id').includes(search));
		})
	);

	function setClass(value: 'all' | MsaClass) {
		activeClass = value;
	}

	function setTopic(value: 'all' | MsaTopic) {
		activeTopic = value;
		shown = 48;
	}
</script>

<section id="msa" class="mt-16 scroll-mt-24 space-y-6" aria-labelledby="msa-heading">
	<header class="max-w-[75ch] space-y-2">
		<h2 id="msa-heading" class="text-2xl font-semibold">Kosakata umum MSA</h2>
		<p class="text-muted-foreground">
			Benda, sifat, sapaan, waktu, alam, dan istilah modern dalam bahasa Arab baku. Ini
			daftar belajar tematik, bukan urutan berdasarkan frekuensi.
		</p>
	</header>

	<div class="space-y-4">
		<div class="space-y-2">
			<label for="msa-word-search" class="block text-sm font-semibold">Cari kata atau arti</label>
			<input
				id="msa-word-search"
				type="search"
				bind:value={query}
				autocomplete="off"
				placeholder="Contoh: كِتَاب، komputer, besar ..."
				class="min-h-11 w-full max-w-2xl rounded-lg border bg-background px-4"
			/>
			<p class="text-sm text-muted-foreground">Bisa tanpa harakat, atau dengan arti Indonesia.</p>
		</div>

		<fieldset class="space-y-2">
			<legend class="text-sm font-semibold">Jenis kata</legend>
			<div class="flex flex-wrap gap-2">
				{#each classes as option (option.id)}
					<button
						type="button"
						aria-pressed={activeClass === option.id}
						onclick={() => setClass(option.id)}
						class="min-h-11 rounded-full border bg-card px-3 text-sm font-medium transition-colors hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
					>
						{option.label}
					</button>
				{/each}
			</div>
		</fieldset>

		<fieldset class="space-y-2">
			<legend class="text-sm font-semibold">Tema</legend>
			<div class="flex flex-wrap gap-2">
				{#each topics as option (option.id)}
					<button
						type="button"
						aria-pressed={activeTopic === option.id}
						onclick={() => setTopic(option.id)}
						class="min-h-11 rounded-full border bg-card px-3 text-sm font-medium transition-colors hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
					>
						{option.label}
					</button>
				{/each}
			</div>
		</fieldset>
	</div>

	<div class="space-y-4">
		<p role="status" class="text-sm text-muted-foreground">
			{results.length} dari {vocabulary.length} kata cocok. Menampilkan {results.length} entri.
		</p>
		{#if results.length === 0}
			<p class="rounded-xl border border-dashed p-5 text-muted-foreground">
				Kata belum ada di koleksi MSA awal. Coba ejaan Arab lain atau hapus filter.
			</p>
		{:else}
			<ul
				class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))] gap-4"
				aria-label="Daftar kosakata MSA"
			>
				{#each results as item (item.id)}
					<li id={`kata-${item.id}`} class="scroll-mt-24">
						{#key hafalan}
							<VocabCard {item} {hafalan}>
								{#snippet details()}
									<div class="space-y-2 text-sm">
										<p class="text-muted-foreground">
											{MSA_CLASSES[item.msa?.wordClass ?? 'noun']} · {MSA_TOPICS[item.msa?.topic ?? 'objects']}
										</p>
										{#if item.msa?.root}
											<p>Akar: <ArabicText text={item.msa.root} /></p>
										{/if}
										{#if item.msa?.plural}
											<div>
												<p class="text-muted-foreground">
													{item.msa.plural.kind === 'sound' ? 'Jamak salim' : item.msa.plural.kind === 'broken' ? 'Jamak taksir' : 'Jamak leksikal'}
												</p>
												<ArabicText text={item.msa.plural.value} />
											</div>
										{/if}
										{#if item.msa?.feminine}
											<div>
												<p class="text-muted-foreground">Bentuk feminin</p>
												<ArabicText text={item.msa.feminine} />
											</div>
										{/if}
										{#if item.msa?.formation === 'loanword'}
											<p class="text-muted-foreground">Kata serapan; jangan memaksakan akar tsulatsi.</p>
										{:else if item.msa?.formation === 'compound'}
											<p class="text-muted-foreground">Gabungan beberapa kata; periksa strukturnya sebagai frasa.</p>
										{/if}
										{#if item.msa?.example}
											<div class="space-y-1 border-t pt-2">
												<p class="text-muted-foreground">Contoh frasa (draft)</p>
												<ArabicText text={item.msa.example.arabic} />
												<p>{item.msa.example.meaning}</p>
											</div>
										{/if}
										<!-- eslint-disable svelte/no-navigation-without-resolve -- external lexical lookup -->
										<a
											href={item.sources[0]}
											class="inline-flex min-h-11 items-center text-primary underline"
										>
											Periksa di kamus sumber
										</a>
										<!-- eslint-enable svelte/no-navigation-without-resolve -->
									</div>
								{/snippet}
							</VocabCard>
						{/key}
					</li>
				{/each}
			</ul>

		{/if}
	</div>

	<p class="max-w-[75ch] text-sm text-muted-foreground">
		Semua contoh masih draft; belum ditashih guru bahasa Arab. Beberapa bentuk jamak dicatat
		sebagai data leksikal, bukan aturan otomatis. Sumber katalog ini adalah rujukan untuk
		pemeriksaan lanjut, bukan klaim bahwa setiap lema sudah diverifikasi sendiri.
	</p>
</section>
