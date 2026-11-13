<script lang="ts">
	import { resolve } from '$app/paths';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Bookmark"
	section="bookmark"
	description="Pelajaran dan kosakata bahasa Arab yang Anda tandai untuk dibuka lagi, tersimpan di perangkat ini."
>
	{#snippet lead()}
		<p>Pelajaran dan kata yang Anda tandai untuk dibuka lagi.</p>
	{/snippet}
</PageIntro>

<div class="mt-12">
	<EmptyState title="Belum ada bookmark">
		<p>Tandai pelajaran atau kata saat belajar, dan semuanya akan terkumpul di sini.</p>
		{#snippet actions()}
			<a
				href={resolve('belajar/')}
				class="inline-flex min-h-11 items-center text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
			>
				Ke halaman Belajar
			</a>
		{/snippet}
	</EmptyState>
</div>
