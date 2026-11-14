<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import ReferenceTable from '#lib/components/learning/ReferenceTable.svelte';
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
		<ReferenceTable table={tashrifIstilahi} />
		<p class="max-w-[65ch] text-base text-muted-foreground">
			Mashdar ditulis dalam bentuk kamus. Garis menandai bentuk yang tidak dicontohkan pada bab
			tersebut. Sebagian bentuk dipakai untuk latihan pola, seperti contoh isim alat pada bab
			pertama. Untuk arti dalam bacaan, periksa pemakaian katanya di kamus.
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
