<script lang="ts">
	import { resolve } from '$app/paths';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Tabel rujukan"
	section="rujukan"
	description="Tabel rujukan bahasa Arab yang ringkas untuk diulang dan dihafal, seperti tashrif istilahi dan jenis huruf, dengan penjelasan per baris."
>
	{#snippet lead()}
		<p>Tabel ringkas untuk dihafal, seperti tashrif istilahi dan jenis-jenis huruf.</p>
	{/snippet}
</PageIntro>

<div class="mt-12">
	<EmptyState title="Tabel sedang disiapkan">
		<p>Isi tabel disusun dari riset dan ditinjau guru. Tabel bersifat rujukan, bukan syarat.</p>
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
