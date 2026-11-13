<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
</script>

<svelte:head>
	<title>
		{page.status === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan'} · Belajar Bahasa Arab
	</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="max-w-[65ch] space-y-4">
	<h1 class="text-3xl font-bold">
		{page.status === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan'}
	</h1>
	<p class="text-pretty text-muted-foreground">
		{page.status === 404
			? 'Alamat ini tidak ada atau sudah dipindahkan.'
			: 'Halaman ini gagal dimuat. Coba muat ulang, atau kembali ke beranda.'}
	</p>
	<Button href={resolve('/')}>Ke beranda</Button>
</div>
