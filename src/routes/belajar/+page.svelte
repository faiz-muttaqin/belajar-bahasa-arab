<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Belajar"
	section="belajar"
	description="Jalur utama belajar bahasa Arab untuk yang sudah bisa membaca tulisan Arab berharakat: dari suara dan makna ke pola kalimat."
>
	{#snippet lead()}
		<p>Untuk Anda yang sudah bisa membaca tulisan Arab berharakat.</p>
	{/snippet}
</PageIntro>

<div class="mt-12">
	<EmptyState title="Pelajaran pertama sedang disiapkan">
		<p>Unit-unit pelajaran akan tampil di sini, masing-masing dengan tujuan yang jelas.</p>
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
