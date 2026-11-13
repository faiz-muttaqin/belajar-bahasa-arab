<script lang="ts">
	import type { Component } from 'svelte';
	import { resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BookHeart from '@lucide/svelte/icons/book-heart';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Brain from '@lucide/svelte/icons/brain';
	import CalendarClock from '@lucide/svelte/icons/calendar-clock';
	import Headphones from '@lucide/svelte/icons/headphones';
	import Info from '@lucide/svelte/icons/info';
	import Languages from '@lucide/svelte/icons/languages';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import ScanEye from '@lucide/svelte/icons/scan-eye';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Sun from '@lucide/svelte/icons/sun';
	import UserX from '@lucide/svelte/icons/user-x';
	import { Button } from '#lib/components/ui/button/index.js';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';

	// Learning cycle from the research doc (§1), one short line each.
	const steps: { title: string; text: string; icon: Component }[] = [
		{ title: 'Dengar', text: 'Mulai dari suara dan situasi.', icon: Headphones },
		{ title: 'Pahami', text: 'Tebak makna dari konteks.', icon: Lightbulb },
		{ title: 'Lihat polanya', text: 'Penjelasan singkat berbahasa Indonesia.', icon: ScanEye },
		{ title: 'Ingat kembali', text: 'Latihan tanpa melihat jawaban.', icon: Brain },
		{ title: 'Ulangi', text: 'Muncul lagi beberapa hari kemudian.', icon: CalendarClock }
	];

	// Decorative only: the first hijaiyah letters as the page's visual signature.
	const letters = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح'];
</script>

<div class="grid items-center gap-10 lg:grid-cols-[1fr_22rem]">
	<div class="space-y-8">
		<PageIntro
			title="Belajar Bahasa Arab"
			heading="Pahami bahasa Arab, bukan sekadar menghafal"
			description="Belajar bahasa Arab untuk penutur Indonesia: dengarkan, pahami artinya, lalu pelajari polanya. Tanpa akun, data belajar tersimpan di perangkat Anda."
		>
			{#snippet lead()}
				<p>Dengarkan, pahami, lalu pelajari polanya.</p>
			{/snippet}
		</PageIntro>
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
			<Button href={resolve('belajar/')} size="lg">
				Mulai belajar
				<ArrowRight aria-hidden="true" />
			</Button>
			<a
				href={resolve('iqra/')}
				class="inline-flex min-h-11 items-center justify-center font-medium text-primary underline decoration-1 underline-offset-4 hover:decoration-2 sm:justify-start"
			>
				Belum bisa baca tulisan Arab?
			</a>
		</div>
		<ul class="flex flex-wrap gap-x-6 gap-y-3 text-base text-muted-foreground">
			<li class="inline-flex items-center gap-2">
				<UserX class="size-5 text-primary" aria-hidden="true" />
				Tanpa akun
			</li>
			<li class="inline-flex items-center gap-2">
				<Smartphone class="size-5 text-primary" aria-hidden="true" />
				Data tersimpan di perangkat Anda
			</li>
		</ul>
	</div>

	<div class="hidden rounded-3xl bg-secondary px-8 py-6 text-primary lg:block" aria-hidden="true">
		<p lang="ar" dir="rtl" class="flex flex-wrap justify-center gap-x-6 arabic-display">
			{#each letters as letter (letter)}<span>{letter}</span>{/each}
		</p>
	</div>
</div>

{#if import.meta.env.DEV}
	{#await import('#lib/fixtures/HomePreview.svelte') then { default: HomePreview }}
		<HomePreview />
	{/await}
{/if}

<section class="mt-24" aria-labelledby="alur-heading">
	<h2 id="alur-heading" class="text-2xl font-semibold">Cara belajarnya</h2>
	<ol class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
		{#each steps as step, i (step.title)}
			{@const Icon = step.icon}
			<li class="rounded-2xl border bg-card p-5">
				<div class="flex items-center justify-between">
					<span
						class="inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"
					>
						<Icon class="size-5" aria-hidden="true" />
					</span>
					<span class="text-sm font-semibold text-muted-foreground tabular-nums">{i + 1}</span>
				</div>
				<p class="mt-4 font-semibold">{step.title}</p>
				<p class="mt-1 text-base text-pretty text-muted-foreground">{step.text}</p>
			</li>
		{/each}
	</ol>
</section>

<section class="mt-24" aria-labelledby="jalur-heading">
	<h2 id="jalur-heading" class="text-2xl font-semibold">Pilih titik mulai</h2>
	<ul class="mt-8 grid gap-4 md:grid-cols-2">
		<li>
			<a
				href={resolve('belajar/')}
				class="group flex h-full gap-4 rounded-2xl border bg-card p-6 transition-colors hover:border-primary"
			>
				<span
					class="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"
				>
					<BookOpen class="size-6" aria-hidden="true" />
				</span>
				<span class="flex-1">
					<span class="block text-lg font-semibold">Sudah bisa membaca Arab</span>
					<span class="mt-1 block text-pretty text-muted-foreground">
						Langsung belajar memahami kata dan kalimat.
					</span>
				</span>
				<ArrowRight
					class="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
					aria-hidden="true"
				/>
			</a>
		</li>
		<li>
			<a
				href={resolve('iqra/')}
				class="group flex h-full gap-4 rounded-2xl border bg-card p-6 transition-colors hover:border-primary"
			>
				<span
					class="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"
				>
					<Languages class="size-6" aria-hidden="true" />
				</span>
				<span class="flex-1">
					<span class="block text-lg font-semibold">Mulai dari huruf</span>
					<span class="mt-1 block text-pretty text-muted-foreground">
						Huruf, bunyi dan harakat, pelan-pelan.
					</span>
				</span>
				<ArrowRight
					class="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
					aria-hidden="true"
				/>
			</a>
		</li>
	</ul>
</section>

<section class="mt-24" aria-labelledby="kosakata-heading">
	<h2 id="kosakata-heading" class="text-2xl font-semibold">Koleksi kosakata</h2>
	<ul class="mt-8 grid gap-4 md:grid-cols-2">
		<li>
			<a
				href={resolve('kosakata/')}
				class="flex h-full gap-4 rounded-2xl bg-secondary p-6 transition-colors hover:bg-accent"
			>
				<span
					class="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-background text-chart-3"
				>
					<Sun class="size-6" aria-hidden="true" />
				</span>
				<span>
					<span class="block text-lg font-semibold">Kosakata harian</span>
					<span class="mt-1 block text-pretty text-secondary-foreground">
						Benda dan kegiatan sehari-hari, dengan ikon pengingat.
					</span>
				</span>
			</a>
		</li>
		<li>
			<a
				href={resolve('kosakata/')}
				class="flex h-full gap-4 rounded-2xl bg-secondary p-6 transition-colors hover:bg-accent"
			>
				<span
					class="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-background text-primary"
				>
					<BookHeart class="size-6" aria-hidden="true" />
				</span>
				<span>
					<span class="block text-lg font-semibold">Al-Qur'an dan bacaan shalat</span>
					<span class="mt-1 block text-pretty text-secondary-foreground">
						Kata yang sudah sering Anda dengar, kini dengan artinya.
					</span>
				</span>
			</a>
		</li>
	</ul>
</section>

<aside
	class="mt-16 flex max-w-[60ch] gap-3 rounded-xl border border-dashed p-4 text-base text-muted-foreground"
>
	<Info class="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
	<p class="text-pretty">
		Materi sedang disiapkan dan akan ditinjau guru bahasa Arab sebelum terbit.
		<a
			href={resolve('tentang/')}
			class="text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
		>
			Cara materi disusun
		</a>
	</p>
</aside>
