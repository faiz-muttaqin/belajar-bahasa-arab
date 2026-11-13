<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.js';
</script>

<svelte:head>
	<title>Belajar Bahasa Arab</title>
	<meta
		name="description"
		content="Situs belajar bahasa Arab untuk pembelajar berbahasa Indonesia. Saat ini masih dalam tahap persiapan."
	/>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-12">
	<h1 class="text-3xl font-semibold">Belajar Bahasa Arab</h1>
	<p class="mt-4 text-lg leading-relaxed">
		Situs ini masih dalam tahap persiapan. Materi belajar belum diterbitkan.
	</p>
	<div class="mt-8 flex flex-col items-start gap-2">
		<Button size="lg" disabled aria-describedby="status-materi">Mulai belajar</Button>
		<p id="status-materi" class="text-sm text-muted-foreground">Materi sedang disiapkan.</p>
	</div>
	<p class="mt-10 text-sm">
		<a
			href={resolve('editor/theme/')}
			class="text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
			>Atur tampilan dan warna</a
		>
	</p>
</main>
