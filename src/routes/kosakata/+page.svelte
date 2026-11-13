<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
	import EmptyState from '#lib/components/layout/EmptyState.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<PageIntro
	title="Kosakata"
	description="Daftar kosakata bahasa Arab yang sudah dipelajari, masing-masing dengan contoh kalimat dan penjelasan dalam bahasa Indonesia."
>
	{#snippet lead()}
		<p>Kata yang sudah Anda pelajari, masing-masing dengan contoh dalam konteks.</p>
	{/snippet}
</PageIntro>

<div class="mt-12">
	<EmptyState title="Belum ada kosakata">
		<p>
			Setiap kata yang muncul di pelajaran akan tercatat di sini, lengkap dengan contoh kalimat dan
			audio yang sudah ditinjau.
		</p>
		{#snippet actions()}
			<Button href={resolve('belajar/')}>Mulai belajar</Button>
			<a
				href={resolve('rujukan/')}
				class="inline-flex min-h-11 items-center text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
			>
				Lihat tabel rujukan
			</a>
		{/snippet}
	</EmptyState>
</div>
