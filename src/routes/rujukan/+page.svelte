<script lang="ts">
	import { resolve } from '$app/paths';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Tabel rujukan"
	description="Tabel rujukan bahasa Arab yang ringkas untuk diulang dan dihafal, seperti tashrif istilahi dan jenis huruf, dengan penjelasan per baris."
>
	{#snippet lead()}
		<p>
			Tabel ringkas untuk diulang dan dihafal, misalnya tashrif istilahi dan jenis-jenis huruf.
			Setiap baris punya penjelasan dan contoh dalam konteks.
		</p>
	{/snippet}
</PageIntro>

<div class="mt-12">
	<EmptyState title="Tabel sedang disiapkan">
		<p>
			Isi tabel disusun dari riset kurikulum dan ditinjau guru bahasa Arab sebelum terbit. Tabel
			bersifat rujukan: Anda tetap bisa belajar tanpa menghafalnya lebih dulu.
		</p>
		{#snippet actions()}
			<a
				href={resolve('tentang/')}
				class="inline-flex min-h-11 items-center text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
			>
				Cara materi disusun
			</a>
		{/snippet}
	</EmptyState>
</div>

{#if import.meta.env.DEV}
	{#await import('#lib/fixtures/RujukanPreview.svelte') then { default: RujukanPreview }}
		<RujukanPreview />
	{/await}
{/if}
