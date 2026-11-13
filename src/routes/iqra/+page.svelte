<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Iqra (opsional)"
	heading="Mulai dari huruf"
	description="Jalur fondasi opsional untuk pemula: mengenal huruf, bunyi, sambungan huruf dan harakat sampai bisa membaca kata berharakat."
>
	{#snippet lead()}
		<p>
			Jalur fondasi opsional: huruf dan bunyinya, sambungan huruf, lalu harakat, sampai Anda bisa
			membaca kata dan kalimat pendek berharakat.
		</p>
	{/snippet}
</PageIntro>

<div class="mt-12">
	<EmptyState title="Jalur fondasi sedang disiapkan">
		<p>
			Latihan di jalur ini dirancang sendiri dan tidak menyalin buku Iqra. Setelah bisa membaca
			kalimat pendek berharakat, Anda bisa langsung bergabung ke jalur utama.
		</p>
		{#snippet actions()}
			<Button href={resolve('belajar/')} variant="outline">Lihat jalur utama</Button>
		{/snippet}
	</EmptyState>
</div>
