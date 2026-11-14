<script lang="ts">
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Tentang"
	section="tentang"
	description="Metode belajar, status materi, sumber dan cara data disimpan di situs belajar bahasa Arab untuk penutur Indonesia."
>
	{#snippet lead()}
		<p>Metode, status materi, sumber, dan cara data Anda disimpan.</p>
	{/snippet}
</PageIntro>

<div class="mt-12 max-w-[65ch] space-y-12">
	<section aria-labelledby="metode" class="space-y-3">
		<h2 id="metode" class="text-2xl font-semibold">Metode</h2>
		<p>
			Mulailah dari contoh berharakat dan artinya. Perhatikan polanya, lalu jawab pertanyaan dengan
			kata-kata Anda sendiri. Pada tingkat menengah, cari bukti dalam teks untuk menjelaskan
			hubungan antarkalimat dan fungsi tiap paragraf.
		</p>
		<p>
			Bacaan shalat diperkenalkan melalui makna frasa pendek. Pelajaran selanjutnya menggunakan
			bahasa Arab standar dalam situasi sehari-hari.
		</p>
	</section>

	<section aria-labelledby="status" class="space-y-3">
		<h2 id="status" class="text-2xl font-semibold">Isi pelajaran</h2>
		<p>
			Setiap pelajaran memuat bacaan, contoh, dan pembahasan dalam bahasa Indonesia. Rujukan
			tercantum di akhir pelajaran.
		</p>
	</section>

	<section aria-labelledby="data" class="space-y-3">
		<h2 id="data" class="text-2xl font-semibold">Data dan privasi</h2>
		<p>
			Salinan pelajaran, kosakata, dan tabel diunduh ke IndexedDB. Pencarian membaca salinan itu
			langsung di perangkat.
		</p>
		<p>
			Tidak ada akun dan tidak ada server untuk data Anda. Pengaturan disimpan di browser, dan
			progres belajar akan disimpan di penyimpanan lokal browser (IndexedDB). Data ini tidak
			berpindah antarperangkat dan bisa hilang jika data situs dihapus.
		</p>
	</section>

	<section aria-labelledby="sumber" class="space-y-3">
		<h2 id="sumber" class="text-2xl font-semibold">Sumber dan atribusi</h2>
		<p>Rujukan dan lisensi CC BY-SA 4.0 untuk tulisan asli dicantumkan pada setiap pelajaran.</p>
		<ul class="list-disc space-y-2 ps-6">
			<li>Huruf antarmuka: Plus Jakarta Sans (SIL Open Font License 1.1).</li>
			<li>Huruf Arab: Noto Naskh Arabic (SIL Open Font License 1.1).</li>
			<li>Ikon: Lucide (lisensi ISC).</li>
		</ul>
	</section>
</div>
