<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Belajar"
	description="Jalur utama belajar bahasa Arab untuk yang sudah bisa membaca tulisan Arab berharakat: dari suara dan makna ke pola kalimat."
>
	{#snippet lead()}
		<p>
			Jalur utama untuk Anda yang sudah bisa membaca tulisan Arab berharakat. Setiap pelajaran
			dimulai dari suara dan makna, lalu polanya.
		</p>
	{/snippet}
</PageIntro>

<div class="mt-12">
	<EmptyState title="Pelajaran pertama sedang disiapkan">
		<p>
			Daftar unit akan tampil di sini. Setiap unit punya tujuan yang jelas, misalnya “memahami
			kalimat sederhana tentang benda di sekitar”, dan setiap pelajaran punya alamat sendiri.
		</p>
		<p>Belum bisa membaca tulisan Arab? Mulai dari jalur fondasi.</p>
		{#snippet actions()}
			<Button href={resolve('iqra/')}>Ke jalur fondasi</Button>
			<a
				href={resolve('tentang/')}
				class="inline-flex min-h-11 items-center text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
			>
				Cara materi disusun
			</a>
		{/snippet}
	</EmptyState>
</div>
