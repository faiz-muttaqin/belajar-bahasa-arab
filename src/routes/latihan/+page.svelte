<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Latihan"
	description="Latihan mengingat dan memahami bahasa Arab tanpa jawaban terlihat, dengan umpan balik yang menjelaskan alasannya."
>
	{#snippet lead()}
		<p>Latihan mengingat tanpa melihat jawaban, dengan umpan balik yang menjelaskan alasannya.</p>
	{/snippet}
</PageIntro>

<div class="mt-12">
	<EmptyState title="Belum ada latihan">
		<p>
			Latihan muncul setelah Anda menyelesaikan pelajaran. Yang perlu diulang akan tampil di sini
			sesuai jadwal, tanpa batas waktu dan tanpa skor harian.
		</p>
		{#snippet actions()}
			<Button href={resolve('belajar/')}>Mulai belajar</Button>
		{/snippet}
	</EmptyState>
</div>
