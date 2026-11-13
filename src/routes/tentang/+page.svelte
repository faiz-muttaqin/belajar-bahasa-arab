<script lang="ts">
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Tentang"
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
			Bahasa Arab yang dipahami, bukan sekadar istilah yang dihafal. Setiap konsep berjalan dari
			situasi dan suara, ke tulisan berharakat dan maknanya, lalu pola dan penjelasan singkat dalam
			bahasa Indonesia, kemudian latihan mengingat dan pengulangan terjadwal.
		</p>
		<p>
			Fokus awal adalah bahasa Arab fusha (bahasa Arab standar). Perbedaan dengan bahasa Arab klasik
			dan dialek percakapan akan dijelaskan secara terpisah.
		</p>
	</section>

	<section aria-labelledby="status" class="space-y-3">
		<h2 id="status" class="text-2xl font-semibold">Status materi</h2>
		<p>
			Materi sedang disusun. Setiap contoh bahasa Arab, penjelasan tata bahasa dan audio wajib punya
			sumber dan ditinjau guru bahasa Arab sebelum terbit. Audio tidak pernah diputar otomatis.
		</p>
	</section>

	<section aria-labelledby="data" class="space-y-3">
		<h2 id="data" class="text-2xl font-semibold">Data dan privasi</h2>
		<p>
			Tidak ada akun dan tidak ada server untuk data Anda. Pengaturan disimpan di browser, dan
			progres belajar akan disimpan di penyimpanan lokal browser (IndexedDB). Data ini tidak
			berpindah antarperangkat dan bisa hilang jika data situs dihapus.
		</p>
	</section>

	<section aria-labelledby="sumber" class="space-y-3">
		<h2 id="sumber" class="text-2xl font-semibold">Sumber dan atribusi</h2>
		<ul class="list-disc space-y-2 ps-6">
			<li>Huruf antarmuka: Plus Jakarta Sans (SIL Open Font License 1.1).</li>
			<li>Huruf Arab: Noto Naskh Arabic (SIL Open Font License 1.1).</li>
			<li>Ikon: Lucide (lisensi ISC).</li>
		</ul>
	</section>
</div>
