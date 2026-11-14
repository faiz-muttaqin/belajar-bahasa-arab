<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import ReferenceSubnav from '#lib/components/learning/ReferenceSubnav.svelte';
	import SectionTabs from '#lib/components/learning/SectionTabs.svelte';
	import WordGlossary from '#lib/components/learning/WordGlossary.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let table = $derived({
		id: `kata-kerja-bab-${data.info.slug}`,
		title: data.info.title,
		caption: '',
		reviewStatus: 'draft' as const,
		sources: [],
		columns: [],
		rows: data.rows
	});
	let groups = $derived(data.groups.map((group) => ({ title: group.letter, ids: group.ids })));
	let tabs = $derived(
		data.groups.map((group) => ({ id: `huruf-${group.letter}`, label: group.letter }))
	);
	const details = [
		{ key: 'tr', label: 'Transliterasi (Wiktionary)', lang: 'id' },
		{ key: 'nonPast', label: 'Mudhari‘', lang: 'ar' },
		{ key: 'masdar', label: 'Mashdar', lang: 'ar' },
		{ key: 'participles', label: 'Isim fa‘il dan maf‘ul', lang: 'ar' },
		{ key: 'type', label: 'Jenis', lang: 'id' },
		{
			key: 'idFull',
			label: 'Arti Indonesia (terjemahan Claude dari Wiktionary, belum ditinjau)',
			lang: 'id'
		},
		{ key: 'en', label: 'Arti Inggris (Wiktionary)', lang: 'id' },
		{ key: 'google', label: 'Pembanding: Google Translate, Arab ke Indonesia', lang: 'id' },
		{ key: 'babNote', label: 'Catatan bab', lang: 'id' }
	] as const;
</script>

<PageIntro
	title={data.info.title}
	section="rujukan"
	description="Kata kerja tsulatsi mujarrad untuk bab ini, dikelompokkan menurut huruf pertama, dengan transliterasi, mudhari, mashdar, dan arti dari Wiktionary."
>
	{#snippet lead()}
		<p>
			{data.total.toLocaleString('id')} kata kerja.
			{#if data.info.madhi}
				Pola <ArabicText text={data.info.madhi} /> dan <ArabicText text={data.info.mudhari} />.
			{/if}
		</p>
	{/snippet}
</PageIntro>

<div class="mt-8 space-y-8">
	<ReferenceSubnav current="fiil" />
	<p class="max-w-[65ch] rounded-xl bg-accent p-4 text-accent-foreground">
		<span class="font-semibold">Perhatikan.</span> Transliterasi, mudhari, mashdar, dan arti Inggris
		diambil apa adanya dari Wiktionary. Arti Indonesia adalah terjemahan dari arti Inggris itu dan
		belum ditinjau guru. Google Translate hanya pembanding dan sering keliru pada kata kerja.
		{data.translated.toLocaleString('id')} dari {data.total.toLocaleString('id')} kata sudah punya arti
		Indonesia.
	</p>
	<a
		href={resolve('rujukan/fiil/kata-kerja/')}
		class="inline-flex min-h-11 items-center text-primary underline">Semua bab</a
	>
	<SectionTabs items={tabs} />

	{#if data.rows.length === 0}
		<p>Belum ada data untuk bab ini.</p>
	{:else}
		<div class="space-y-10">
			{#each data.groups as group (group.letter)}
				<section id="huruf-{group.letter}" class="min-w-0 scroll-mt-32">
					<WordGlossary
						{table}
						groups={groups.filter((g) => g.title === group.letter)}
						{details}
						linkKey="page"
						linkLabel="Lihat di Wiktionary"
					/>
				</section>
			{/each}
		</div>
	{/if}

	<p class="text-sm text-muted-foreground">{data.attribution}</p>
</div>
