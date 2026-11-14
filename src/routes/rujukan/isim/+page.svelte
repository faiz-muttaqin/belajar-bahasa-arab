<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ReferenceSection from '#lib/components/learning/ReferenceSection.svelte';
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
	<nav aria-label="Isi halaman" class="flex flex-wrap gap-x-5 text-primary">
		{#each toc as [table, label] (table.id)}
			<a class="inline-flex min-h-11 items-center underline" href="#{table.id}">{label}</a>
		{/each}
	</nav>

	<ReferenceSection
		table={separatePronouns}
		intro="Kata ganti dipilih menurut orang (ketiga, kedua, pertama), jumlah, dan jenis kelamin."
		tip="Hafalkan dalam tiga kelompok: huwa dan hiya, anta dan anti, lalu ana dan nahnu."
	/>
	<ReferenceSection
		table={attachedPronouns}
		tip="Akhiran ini menempel pada kata benda untuk menyatakan kepemilikan, dan pada kata kerja atau huruf sebagai objek."
	/>
	<ReferenceSection
		table={demonstratives}
		tip="Awalan ha- berarti dekat; ذَلِكَ dan تِلْكَ berarti jauh."
	/>
	<ReferenceSection
		table={derivedPatterns}
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
