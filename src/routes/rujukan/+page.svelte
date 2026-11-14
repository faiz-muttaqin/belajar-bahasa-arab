<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import ReferenceTable from '#lib/components/learning/ReferenceTable.svelte';
	import TransposedTashrif from '#lib/components/learning/TransposedTashrif.svelte';
	import { connectorsReference } from '#lib/content/connectors.js';
	import { particlesReference, tashrifIstilahi } from '#lib/content/reference.js';
</script>

<PageIntro
	title="Tabel rujukan"
	section="rujukan"
	description="Tabel tashrif istilahi 22 kelompok wazan: tsulatsi dan ruba’i, dilengkapi kamus contoh, pencarian arti Indonesia, dan penjelasan perubahan kata."
>
	{#snippet lead()}
		<p>Bandingkan bentuk kata kerja dan cek arti kata tugas saat membaca.</p>
	{/snippet}
</PageIntro>

<div class="mt-10 min-w-0 space-y-16">
	<nav aria-label="Isi rujukan" class="flex flex-wrap gap-x-5 text-primary">
		<a class="inline-flex min-h-11 items-center underline" href={resolve('sharaf/')}
			>Cari akar dan wazan</a
		>
		<a class="inline-flex min-h-11 items-center underline" href="#tashrif-istilahi"
			>Tashrif istilahi</a
		>
		<a class="inline-flex min-h-11 items-center underline" href="#kata-penghubung"
			>Glosarium kata penghubung</a
		>
		<a class="inline-flex min-h-11 items-center underline" href="#kata-tugas">Kata tugas</a>
	</nav>
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

	<section
		id="kata-penghubung"
		aria-labelledby="penghubung-heading"
		class="min-w-0 scroll-mt-24 space-y-4"
	>
		<h2 id="penghubung-heading" class="text-2xl font-semibold">{connectorsReference.title}</h2>
		<p class="max-w-[65ch] text-pretty">
			Pilih “Sembunyikan hubungan” untuk mengingat maknanya, atau “Sembunyikan efek pada kalimat”
			untuk menguji i‘rab. Bedakan penghubung urutan dari partikel yang mengubah status kata.
		</p>
		<ReferenceTable table={connectorsReference} />
		<details>
			<summary class="min-h-11 cursor-pointer py-3 font-medium text-primary"
				>Rujukan tata bahasa</summary
			>
			<ul class="list-disc space-y-2 ps-5">
				{#each connectorsReference.sources as source (source)}
					<li>
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external source -->
						<a href={source} class="break-all underline">{source}</a>
					</li>
				{/each}
			</ul>
		</details>
	</section>

	<section
		id="kata-tugas"
		aria-labelledby="kata-tugas-heading"
		class="min-w-0 scroll-mt-24 space-y-4"
	>
		<h2 id="kata-tugas-heading" class="text-2xl font-semibold">{particlesReference.title}</h2>
		<ReferenceTable table={particlesReference} />
		<a
			class="inline-flex min-h-11 items-center font-medium text-primary underline"
			href={resolve('belajar/hubungkan-antar-kalimat/')}
		>
			Latih membaca urutan, alasan, dan pertentangan
		</a>
	</section>
</div>
