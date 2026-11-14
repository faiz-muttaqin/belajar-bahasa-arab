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
	description="Tabel tashrif istilahi enam bab kata kerja Arab tiga huruf dan rujukan kata tugas untuk memahami hubungan dalam kalimat."
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
		<p class="max-w-[65ch] text-pretty">
			Mulai dari bab ketiga. <ArabicText text="فَتَحَ" /> menyatakan tindakan membuka,
			<ArabicText text="فَتْحٌ" /> menamai tindakan itu, dan <ArabicText text="مَفْتُوحٌ" />
			berarti “terbuka” atau “yang dibuka”. Ketiganya berbagi akar
			<ArabicText text="ف ت ح" />.
		</p>
		<TransposedTashrif />
		<p class="max-w-[65ch] text-base text-muted-foreground">
			Tabel dimulai dari wazan dengan huruf ف–ع–ل. Di panel kanan, cari dan pilih kata yang
			tersedia dalam glosarium untuk mengganti baris babnya. Bentuk turunan yang belum dicatat
			tidak diisi otomatis. Contoh mashdar, isim tempat, dan isim alat tidak selalu dapat
			ditebak hanya dari bab fi’il.
		</p>
		<a
			class="inline-flex min-h-11 items-center font-medium text-primary underline"
			href={resolve('belajar/akar-dan-bentuk-kata/')}
		>
			Latih mengenali akar dan bentuk kata
		</a>
		<p class="text-base text-muted-foreground">
			Urutan enam bab mengikuti tradisi <cite>Al-Amtsilah at-Tashrifiyyah</cite>.
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
