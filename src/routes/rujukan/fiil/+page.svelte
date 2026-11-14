<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import ReferenceSubnav from '#lib/components/learning/ReferenceSubnav.svelte';
	import ReferenceTable from '#lib/components/learning/ReferenceTable.svelte';
	import TransposedTashrif from '#lib/components/learning/TransposedTashrif.svelte';
	import { tashrifIstilahi } from '#lib/content/reference.js';
</script>

<PageIntro
	title="Rujukan kata kerja"
	section="rujukan"
	description="Tabel tashrif istilahi 22 kelompok wazan: tsulatsi dan ruba’i, dilengkapi contoh, pencarian arti Indonesia, dan penjelasan perubahan kata."
>
	{#snippet lead()}
		<p>Bandingkan bentuk kata kerja dari satu akar: lampau, sekarang, perintah, dan turunannya.</p>
	{/snippet}
</PageIntro>

<div class="mt-8 space-y-10">
	<ReferenceSubnav current="fiil" />

	<a
		href={resolve('rujukan/fiil/kata-kerja/')}
		class="block rounded-2xl border border-t-4 border-t-chart-1 bg-card p-5 transition-colors hover:bg-secondary"
	>
		<span class="block text-lg font-semibold">Daftar kata kerja per bab</span>
		<span class="mt-1 block text-muted-foreground"
			>Ribuan kata kerja untuk 22 wazan dengan transliterasi, mudhari, mashdar, dan arti. Ketuk
			untuk melihat.</span
		>
	</a>

	<section
		id="tashrif-istilahi"
		aria-labelledby="tashrif-heading"
		class="min-w-0 scroll-mt-24 space-y-4"
	>
		<h2 id="tashrif-heading" class="text-2xl font-semibold">{tashrifIstilahi.title}</h2>
		<p class="max-w-[85ch] text-pretty">
			Kenali 22 kelompok wazan dari <ArabicText text="فَعَلَ" /> sampai pola ruba’i mazid. Klik bab untuk
			memilih contoh kata nyata dari glosarium; klik salah satu bentuk untuk melihat kaidahnya. Semua
			sebelas bentuk tetap ada dan dapat digeser horizontal.
		</p>
		<TransposedTashrif />
		<details class="space-y-4 rounded-xl border p-4">
			<summary class="min-h-11 cursor-pointer py-2 font-semibold text-primary">
				Contoh per bab dan mode hafalan
			</summary>
			<ReferenceTable table={{ ...tashrifIstilahi, id: 'tashrif-contoh' }} />
		</details>

		<p class="max-w-[85ch] text-base text-muted-foreground">
			Kolom mengikuti urutan madhi, mudhari, mashdar, dan seterusnya sampai isim alat. Kamus proyek
			disimpan secara statis, dan versi datanya tersedia di penyimpanan lokal bila browser
			mendukungnya. Wazan simbolik tidak menjamin semua turunan digunakan secara leksikal.
		</p>
		<a
			class="inline-flex min-h-11 items-center font-medium text-primary underline"
			href={resolve('belajar/akar-dan-bentuk-kata/')}
		>
			Latih mengenali akar dan bentuk kata
		</a>
		<p class="text-base text-muted-foreground">
			Keenam bab awal merupakan tsulatsi mujarrad; bab selanjutnya mencakup tsulatsi mazid dan
			ruba’i. Penomoran 22 kelompok mengikuti tabel rujukan sharaf tradisional, bukan penomoran Form
			I–X dalam tata bahasa Arab modern.
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external reference -->
			<a
				href="https://www.terjemahmatan.com/2017/03/download-buku-ringkasan-al-amtsilah-at.html"
				class="underline">Rujukan urutan bab</a
			>.
		</p>
	</section>
</div>
