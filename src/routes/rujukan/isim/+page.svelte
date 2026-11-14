<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ReferenceSection from '#lib/components/learning/ReferenceSection.svelte';
	import SectionTabs from '#lib/components/learning/SectionTabs.svelte';
	import ReferenceSubnav from '#lib/components/learning/ReferenceSubnav.svelte';
	import {
		adjectiveAgreement,
		attachedPronouns,
		demonstratives,
		derivedPatterns,
		separatePronouns
	} from '#lib/content/reference-isim.js';

	const toc = [
		[separatePronouns, 'Kata ganti'],
		[attachedPronouns, 'Kata ganti menempel'],
		[demonstratives, 'Kata tunjuk'],
		[derivedPatterns, 'Pola isim'],
		[adjectiveAgreement, 'Kata sifat']
	] as const;
</script>

<PageIntro
	title="Rujukan kata benda dan sifat"
	section="rujukan"
	description="Tabel isim bahasa Arab: kata ganti, kata tunjuk, kata sifat yang mengikuti kata benda, dan pola isim turunan seperti isim fa‘il dan maf‘ul."
>
	{#snippet lead()}
		<p>Kata ganti, kata tunjuk, dan kata sifat, ditambah pola yang membantu menebak arti.</p>
	{/snippet}
</PageIntro>

<div class="mt-8 space-y-14">
	<ReferenceSubnav current="isim" />
	<SectionTabs items={toc.map(([table, label]) => ({ id: table.id, label }))} />

	<ReferenceSection
		table={separatePronouns}
		glossary={{
			groups: [
				{ title: 'Orang ketiga', ids: ['huwa', 'hiya', 'huma', 'hum', 'hunna'] },
				{ title: 'Orang kedua', ids: ['anta', 'anti', 'antuma', 'antum', 'antunna'] },
				{ title: 'Orang pertama', ids: ['ana', 'nahnu'] }
			]
		}}
		intro="Kata ganti dipilih menurut orang (ketiga, kedua, pertama), jumlah, dan jenis kelamin."
		tip="Hafalkan dalam tiga kelompok: huwa dan hiya, anta dan anti, lalu ana dan nahnu."
	/>
	<ReferenceSection
		table={attachedPronouns}
		glossary={{}}
		tip="Akhiran ini menempel pada kata benda untuk menyatakan kepemilikan, dan pada kata kerja atau huruf sebagai objek."
	/>
	<ReferenceSection
		table={demonstratives}
		glossary={{
			groups: [
				{ title: 'Dekat', ids: ['hadha', 'hadhihi', 'haula'] },
				{ title: 'Jauh', ids: ['dhalika', 'tilka', 'ulaika'] }
			]
		}}
		tip="Awalan ha- berarti dekat; ذَلِكَ dan تِلْكَ berarti jauh."
	/>
	<ReferenceSection
		table={derivedPatterns}
		glossary={{ arabicKey: 'pattern' }}
		intro="Pola ini turunan dari akar kata kerja, jadi saling terkait dengan tabel tashrif."
	/>
	<ReferenceSection table={adjectiveAgreement} />

	<p class="text-muted-foreground">
		Pola isim turunan dibahas lebih lengkap pada
		<a href={resolve('rujukan/fiil/')} class="font-medium text-primary underline"
			>tabel 22 wazan kata kerja</a
		>.
	</p>
</div>
