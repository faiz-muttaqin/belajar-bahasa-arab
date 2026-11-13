<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Latihan"
	section="latihan"
	description="Latihan mengingat dan memahami bahasa Arab tanpa jawaban terlihat, dengan umpan balik yang menjelaskan alasannya."
>
	{#snippet lead()}
		<p>Ingat kembali tanpa melihat jawaban, lalu lihat alasannya.</p>
	{/snippet}
</PageIntro>

<div class="mt-12">
	<EmptyState title="Belum ada latihan">
		<p>Latihan muncul setelah pelajaran pertama. Tanpa batas waktu, tanpa skor harian.</p>
		{#snippet actions()}
			<Button href={resolve('belajar/')}>Mulai belajar</Button>
		{/snippet}
	</EmptyState>
</div>
