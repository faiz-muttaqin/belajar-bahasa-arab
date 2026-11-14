<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ReferenceSection from '#lib/components/learning/ReferenceSection.svelte';
	import ReferenceSubnav from '#lib/components/learning/ReferenceSubnav.svelte';
	import { connectorsReference } from '#lib/content/connectors.js';
	import { particlesReference } from '#lib/content/reference.js';
</script>

<PageIntro
	title="Rujukan kata hubung dan kata tugas"
	section="rujukan"
	description="Glosarium kata hubung bahasa Arab beserta efeknya pada kalimat, dan tabel kata tugas seperti fī, min, dan ilā dalam konteks."
>
	{#snippet lead()}
		<p>Kata kecil yang menghubungkan kalimat dan menentukan makna kata di sekitarnya.</p>
	{/snippet}
</PageIntro>

<div class="mt-8 space-y-14">
	<ReferenceSubnav current="harf" />
	<nav aria-label="Isi halaman" class="flex flex-wrap gap-x-5 text-primary">
		<a class="inline-flex min-h-11 items-center underline" href="#kata-penghubung">Kata hubung</a>
		<a class="inline-flex min-h-11 items-center underline" href="#kata-tugas">Kata tugas</a>
	</nav>

	<ReferenceSection
		table={connectorsReference}
		intro="Pilih “Sembunyikan hubungan” untuk mengingat maknanya, atau “Sembunyikan efek pada kalimat” untuk menguji i‘rab."
		tip="Bedakan penghubung urutan dari partikel yang mengubah status kata."
	/>
	<ReferenceSection
		table={particlesReference}
		tip="Baca kata tugas bersama kata yang mengikutinya, bukan sendirian."
	/>

	<a
		class="inline-flex min-h-11 items-center font-medium text-primary underline"
		href={resolve('belajar/hubungkan-antar-kalimat/')}
	>
		Latih membaca urutan, alasan, dan pertentangan
	</a>
</div>
