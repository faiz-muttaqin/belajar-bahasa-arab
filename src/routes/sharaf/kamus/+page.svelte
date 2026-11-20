<script lang="ts">
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import { dictionaryPilot } from '#lib/content/dictionary-pilot.js';
	import {
		rootFamily,
		searchDictionary,
		type DictionaryPos,
		type DictionaryRegister
	} from '#lib/domain/dictionary/senses.js';

	let query = $state('');
	let pos = $state<DictionaryPos | 'all'>('all');
	let register = $state<DictionaryRegister | 'all'>('all');
	let results = $derived(searchDictionary(dictionaryPilot, query, pos, register));
	const labels = {
		noun: 'Nomina',
		adjective: 'Sifat',
		verb: 'Fi’il',
		adverb: 'Adverbia',
		pronoun: 'Pronomina',
		particle: 'Kata tugas',
		expression: 'Ungkapan',
		other: 'Lainnya'
	};
</script>

<PageIntro
	title="Kamus Arab–Indonesia"
	section="rujukan"
	description="Pilot kamus per makna dan keluarga akar. Lema, bentuk kata, dan makna mempunyai bukti masing-masing."
/>

<p class="mt-4 text-sm text-muted-foreground">
	Indeks awal keluarga ك ت ب; belum kamus lengkap. Semua entri masih draf. Register belum
	ditentukan, dan hubungan akar tidak berarti maknanya sama. Rujukan: kontributor English
	Wiktionary (CC BY-SA 4.0 / GFDL); glos Indonesia ditulis untuk proyek ini.
</p>
<section class="mt-8 space-y-4" aria-label="Cari kamus">
	<label for="dictionary-query" class="block font-medium">Lema, akar, bentuk, atau arti</label>
	<input
		id="dictionary-query"
		type="search"
		dir="auto"
		bind:value={query}
		class="min-h-12 w-full rounded-xl border bg-card px-4"
		placeholder="كتب, kantor, buku"
	/>
	<div class="flex flex-wrap gap-4">
		<label class="flex flex-col gap-1 text-sm">
			Kelas kata
			<select bind:value={pos} class="min-h-11 rounded-lg border bg-card px-3">
				<option value="all">Semua</option>
				<option value="noun">Nomina</option>
				<option value="verb">Fi’il</option>
			</select>
		</label>
		<label class="flex flex-col gap-1 text-sm">
			Register
			<select bind:value={register} class="min-h-11 rounded-lg border bg-card px-3">
				<option value="all">Semua</option>
				<option value="msa">MSA</option>
				<option value="classical">Klasik</option>
				<option value="historical">Historis</option>
				<option value="unspecified">Belum ditentukan</option>
			</select>
		</label>
	</div>
</section>

<section class="mt-8 space-y-4" aria-label="Hasil kamus">
	<h2 class="text-xl font-semibold">{results.length} lema</h2>
	{#if results.length === 0}
		<p>Tidak ada dalam pilot ini. Coba kata lain atau hapus filter.</p>
	{/if}
	{#each results as entry (entry.id)}
		<article id={entry.id} class="scroll-mt-24 rounded-xl border bg-card p-5">
			<h3 class="text-xl font-semibold"><ArabicText text={entry.lemma} size="block" /></h3>
			<p class="text-sm text-muted-foreground">
				{labels[entry.pos]} · Draf{entry.bab ? ' · Bab ' + entry.bab.number : ''}
			</p>
			<ol class="mt-4 list-inside list-decimal space-y-2">
				{#each entry.senses as sense (sense.id)}
					<li>
						{sense.glossId}
						<a
							href={sense.evidence.url}
							class="ml-2 text-sm text-primary underline"
							target="_blank"
							rel="noreferrer"
						>Sumber: {sense.evidence.locator}</a>
					</li>
				{/each}
			</ol>
			{#if entry.forms.length}
				<h4 class="mt-4 font-medium">Bentuk tercatat</h4>
				<ul class="mt-2 space-y-1">
					{#each entry.forms.filter((form) => form.origin === 'attested') as form}
						<li>
							<ArabicText text={form.ar} /> · {form.kind}
							<a href={form.evidence.url} class="text-sm text-primary underline">Sumber</a>
						</li>
					{/each}
				</ul>
			{/if}
			{#if entry.root}
				<h4 class="mt-4 font-medium">
					Keluarga akar <ArabicText text={entry.root.ar} />
				</h4>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each rootFamily(dictionaryPilot, entry) as related (related.id)}
						<button
							type="button"
							class="min-h-11 rounded-lg border px-3"
							onclick={() => {
								pos = 'all';
								register = 'all';
								query = related.lemma;
							}}
						><ArabicText text={related.lemma} /></button>
					{/each}
				</div>
			{/if}
		</article>
	{/each}
</section>
