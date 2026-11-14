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
	let recallGroups = $derived(
		data.recall.groups.map((group) => ({ title: group.letter, ids: group.ids }))
	);
	let tabs = $derived(
		data.groups.map((group) => ({ id: `huruf-${group.letter}`, label: group.letter }))
	);
	let recallTable = $derived({
		id: `kata-kerja-bab-${data.info.slug}-model`,
		title: 'Daftar tambahan',
		caption: '',
		reviewStatus: 'draft' as const,
		sources: [],
		columns: [],
		rows: data.recall.rows
	});
	const recallDetails = [
		{ key: 'root', label: 'Akar', lang: 'ar' },
		{ key: 'meaningsFull', label: 'Arti (dari pengetahuan model, belum diverifikasi)', lang: 'id' },
		{
			key: 'description',
			label: 'Deskripsi (bukan padanan, dari pengetahuan model, belum diverifikasi)',
			lang: 'id'
		},
		{ key: 'unknown', label: 'Keterangan', lang: 'id' },
		{ key: 'confidence', label: 'Keyakinan model (hanya petunjuk kasar)', lang: 'id' },
		{ key: 'model', label: 'Model', lang: 'id' },
		{ key: 'code', label: 'Kode transitivitas sumber', lang: 'id' },
		{ key: 'src', label: 'Sumber daftar kata', lang: 'id' }
	] as const;
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
	description="Kata kerja untuk wazan ini, dikelompokkan menurut huruf akar pertama, dengan transliterasi, mudhari, mashdar, dan arti dari Wiktionary."
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
		<WordGlossary
			{table}
			{groups}
			{details}
			linkKey="page"
			linkLabel="Lihat di Wiktionary"
			groupIdPrefix="huruf-"
		/>
	{/if}

	{#if data.recall.rows.length > 0}
		<section aria-labelledby="tambahan-h" class="space-y-4">
			<h2 id="tambahan-h" class="text-2xl font-semibold">
				Daftar tambahan dari Qutrub dan Arramooz
			</h2>
			<p class="max-w-[65ch] rounded-xl bg-accent p-4 text-accent-foreground">
				<span class="font-semibold">Belum diverifikasi.</span>
				{data.recall.rows.length.toLocaleString('id')} kata kerja ini hanya ada di daftar kata Qutrub
				dan Arramooz, tanpa arti, transliterasi, mudhari, atau mashdar. Arti Indonesia berasal dari pengetahuan
				model Claude, bukan dari kamus: {data.recall.counts.padanan.toLocaleString('id')}
				padanan, {data.recall.counts.deskripsi.toLocaleString('id')} deskripsi, dan
				{data.recall.counts.unknown.toLocaleString('id')} yang artinya belum diketahui. Pada uji dengan
				kata yang jawabannya diketahui, sekitar 86% benar; pada kata langka angkanya diperkirakan lebih
				rendah. Daftar kata tersebut berlisensi GPLv2.
			</p>
			<details class="rounded-xl border p-4">
				<summary class="min-h-11 cursor-pointer py-2 font-semibold text-primary">
					Tampilkan daftar tambahan
				</summary>
				<div class="mt-4">
					<WordGlossary
						table={recallTable}
						groups={recallGroups}
						details={recallDetails}
						chipKey="badge"
					/>
				</div>
			</details>
		</section>
	{/if}

	<p class="text-sm text-muted-foreground">{data.attribution}</p>
</div>
