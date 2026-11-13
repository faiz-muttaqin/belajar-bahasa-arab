<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Progres"
	section="progres"
	description="Ringkasan progres belajar bahasa Arab yang tersimpan di perangkat ini: pelajaran, kosakata dan latihan yang perlu diulang."
>
	{#snippet lead()}
		<p>Ringkasan belajar Anda. Semua data tersimpan di perangkat ini.</p>
	{/snippet}
</PageIntro>

<div class="mt-12">
	<EmptyState title="Belum ada progres di perangkat ini">
		<p>Progres tersimpan otomatis di browser ini setelah pelajaran pertama. Tidak ada akun.</p>
		{#snippet actions()}
			<Button href={resolve('belajar/')}>Mulai belajar</Button>
		{/snippet}
	</EmptyState>
</div>
