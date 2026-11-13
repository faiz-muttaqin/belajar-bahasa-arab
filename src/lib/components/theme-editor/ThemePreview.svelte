<!--
	Sample interface that uses every token, so changes can be judged in context.
	The Arabic line is a neutral font specimen, not lesson content.
-->
<script lang="ts">
	import ArabicSpecimen from './ArabicSpecimen.svelte';
	import { Badge } from '#lib/components/ui/badge/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Card from '#lib/components/ui/card/index.js';
	import { Input } from '#lib/components/ui/input/index.js';

	const bars = [
		{ token: 'chart-1', height: 'h-16' },
		{ token: 'chart-2', height: 'h-24' },
		{ token: 'chart-3', height: 'h-12' },
		{ token: 'chart-4', height: 'h-20' },
		{ token: 'chart-5', height: 'h-14' }
	];
</script>

<div class="space-y-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>Contoh tampilan</Card.Title>
			<Card.Description>Teks ini hanya contoh untuk menilai warna dan huruf.</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<figure class="rounded-lg bg-muted px-4 py-3">
				<p class="text-right text-4xl"><ArabicSpecimen /></p>
				<p class="text-right text-2xl"><ArabicSpecimen /></p>
				<figcaption class="text-sm text-muted-foreground">
					Contoh huruf Arab dengan harakat, bukan materi pelajaran.
				</figcaption>
			</figure>
			<p class="leading-relaxed">
				Paragraf biasa untuk membaca penjelasan. <span
					class="text-primary underline underline-offset-4">Teks tautan</span
				>
				memakai warna utama, dan <span class="text-muted-foreground">teks redup</span> untuk keterangan.
			</p>
			<div class="flex flex-wrap gap-2">
				<Button>Utama</Button>
				<Button variant="secondary">Sekunder</Button>
				<Button variant="outline">Garis</Button>
				<Button variant="ghost">Polos</Button>
				<Button variant="destructive">Hapus</Button>
			</div>
			<div class="flex flex-wrap gap-2">
				<Badge>Baru</Badge>
				<Badge variant="secondary">Latihan</Badge>
				<Badge variant="outline">Draf</Badge>
				<Badge variant="destructive">Perlu dicek</Badge>
			</div>
			<div class="space-y-1.5">
				<label for="pratinjau-isian" class="text-sm font-medium">Contoh isian</label>
				<Input id="pratinjau-isian" placeholder="Ketik di sini" />
				<p class="text-sm text-muted-foreground">Tekan Tab untuk melihat cincin fokus.</p>
			</div>
			<p class="rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground">
				Kotak sorotan untuk catatan penting.
			</p>
			<p class="text-sm text-destructive">Pesan peringatan atau kesalahan.</p>
		</Card.Content>
	</Card.Root>

	<div class="grid gap-4 sm:grid-cols-2">
		<div
			class="rounded-xl bg-popover p-4 text-popover-foreground shadow-md ring-1 ring-foreground/10"
		>
			<p class="text-sm font-medium">Popover</p>
			<p class="text-sm text-muted-foreground">Panel kecil yang muncul di atas halaman.</p>
		</div>
		<div class="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
			<p class="mb-2 text-sm font-medium">Grafik</p>
			<div class="flex h-24 items-end gap-2" aria-hidden="true">
				{#each bars as bar (bar.token)}
					<div
						class={['flex-1 rounded-t-sm', bar.height]}
						style:background-color={`var(--${bar.token})`}
					></div>
				{/each}
			</div>
		</div>
	</div>

	<nav
		aria-label="Contoh sidebar"
		class="rounded-xl border border-sidebar-border bg-sidebar p-2 text-sm text-sidebar-foreground"
	>
		<p class="px-2 py-1 text-xs font-medium tracking-wide uppercase opacity-80">Sidebar</p>
		<ul class="space-y-1">
			<li class="rounded-md bg-sidebar-primary px-2 py-1.5 text-sidebar-primary-foreground">
				Halaman aktif
			</li>
			<li class="rounded-md bg-sidebar-accent px-2 py-1.5 text-sidebar-accent-foreground">
				Disorot
			</li>
			<li class="px-2 py-1.5">Halaman lain</li>
		</ul>
	</nav>
</div>
