<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { analyzedText } from '#lib/content/lessons/analysis.js';
	import { stripHarakat } from '#lib/domain/arabic/harakat.js';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import { Button } from '#lib/components/ui/button/index.js';
	import { LESSON_LICENSE, type Lesson } from '#lib/content/lessons/types.js';
	import ArabicText from './ArabicText.svelte';
	import MixedText from './MixedText.svelte';
	import SentenceBreakdown from './SentenceBreakdown.svelte';
	import SentenceWordNotes from './SentenceWordNotes.svelte';

	type LessonLink = Pick<Lesson, 'title' | 'slug'>;
	let { lesson, previous, next }: { lesson: Lesson; previous?: LessonLink; next?: LessonLink } =
		$props();

	let showHarakat = $state(true);
	let interactive = $state(false);
	onMount(() => {
		interactive = true;
	});

	const register = {
		msa: 'Arab standar',
		classical: 'Bahasa bacaan shalat',
		script: 'Tulisan Arab'
	};
</script>

<div class="mx-auto max-w-[68ch] space-y-8">
	<a
		href={resolve(lesson.track === 'iqra' ? 'iqra/' : 'belajar/')}
		class="inline-flex min-h-11 items-center gap-1 font-medium text-primary hover:underline"
	>
		<ChevronLeft class="size-5" aria-hidden="true" />
		{lesson.track === 'iqra' ? 'Semua pelajaran Iqra' : 'Semua pelajaran'}
	</a>

	<PageIntro title={lesson.title} description={lesson.goal} section={lesson.track}>
		{#snippet lead()}
			<p>{lesson.goal}</p>
		{/snippet}
	</PageIntro>

	<p class="text-base text-muted-foreground">
		{lesson.level} · {register[lesson.register]} · ± {lesson.minutes} menit
	</p>

	{#if lesson.analysis?.length || lesson.passage?.analysis}
		<a
			href="#bedah-kalimat"
			class="inline-flex min-h-11 items-center font-medium text-primary underline"
		>
			Buka bedah per kata
		</a>
	{/if}

	<article class="space-y-12">
		<p class="text-pretty">{lesson.intro}</p>

		{#if lesson.analysis?.length && !lesson.passage}
			<SentenceBreakdown groups={lesson.analysis} />
		{/if}

		{#if lesson.examples.length}
			<section aria-labelledby="contoh" class="space-y-4">
				<h2 id="contoh" class="text-2xl font-semibold">Baca contohnya</h2>
				<ul class="space-y-4">
					{#each lesson.examples as example, i (i)}
						<li class="space-y-2 rounded-2xl border bg-card p-4 sm:p-6">
							<ArabicText text={example.arabic} size="block" class="wrap-break-word" />
							<p class="font-semibold"><MixedText text={example.meaning} /></p>
							{#if example.note}
								<p class="text-pretty text-muted-foreground"><MixedText text={example.note} /></p>
							{/if}
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if lesson.passage}
			<section
				id={lesson.passage.analysis ? 'bedah-kalimat' : undefined}
				aria-labelledby="bacaan"
				class="scroll-mt-24 space-y-4 rounded-2xl border bg-card p-4 sm:p-6"
			>
				<h2 id="bacaan" class="text-2xl font-semibold">
					<ArabicText
						text={showHarakat
							? lesson.passage.arabicTitle
							: stripHarakat(lesson.passage.arabicTitle)}
					/>
				</h2>
				{#if interactive}
					<label class="inline-flex min-h-11 items-center gap-3 text-base font-medium">
						<input type="checkbox" bind:checked={showHarakat} class="size-5 accent-primary" />
						Tampilkan harakat
					</label>
				{/if}
				{#if lesson.passage.analysis}
					<p class="text-muted-foreground">
						Buka “Bedah per kata” tepat di bawah kalimat. Harakat akhir bisa berubah karena peran
						kata, seperti kasrah setelah harf jarr, atau karena cara menyambung bunyi. Bentuk yang
						tetap disebut mabni.
					</p>
				{/if}
				<div class="space-y-6">
					{#each lesson.passage.paragraphs as paragraph, i (i)}
						{@const sentences = lesson.passage.analysis?.[i]}
						<section aria-label={`Paragraf ${i + 1}`} class="space-y-3">
							<h3 class="font-medium text-muted-foreground">Paragraf {i + 1}</h3>
							{#if sentences}
								{#each sentences as sentence, j (j)}
									{@const text = analyzedText(sentence)}
									<div class="space-y-1 border-b pb-2 last:border-b-0">
										<ArabicText
											text={showHarakat ? text : stripHarakat(text)}
											size="block"
											class="wrap-break-word"
										/>
										<details open={i === 0 && j === 0}>
											<summary class="min-h-11 cursor-pointer py-3 font-semibold text-primary">
												Bedah per kata <span class="sr-only">kalimat {j + 1}</span>
											</summary>
											<SentenceWordNotes {sentence} />
										</details>
									</div>
								{/each}
							{:else}
								<ArabicText
									text={showHarakat ? paragraph.arabic : stripHarakat(paragraph.arabic)}
									size="block"
									class="wrap-break-word"
								/>
							{/if}
						</section>
					{/each}
				</div>
				{#if lesson.passage.glossary?.length}
					<details class="border-t">
						<summary class="min-h-11 cursor-pointer py-3 font-semibold text-primary"
							>Kata kunci</summary
						>
						<dl class="space-y-2">
							{#each lesson.passage.glossary as word (word.arabic)}
								<div class="flex flex-wrap items-baseline gap-x-3">
									<dt><ArabicText text={word.arabic} /></dt>
									<dd>{word.meaning}</dd>
								</div>
							{/each}
						</dl>
					</details>
				{/if}
			</section>

			<details class="rounded-xl border bg-card px-4 pb-2 sm:px-5">
				<summary class="min-h-11 cursor-pointer py-3 font-semibold text-primary">
					Terjemahan dan fungsi paragraf
				</summary>
				<p class="mt-2 font-semibold">{lesson.passage.title}</p>
				<ol class="mt-2 list-decimal space-y-3 ps-6">
					{#each lesson.passage.paragraphs as paragraph, i (i)}
						<li class="space-y-1">
							<p>{paragraph.meaning}</p>
							<p class="text-muted-foreground">{paragraph.role}</p>
						</li>
					{/each}
				</ol>
			</details>
		{/if}

		<section id="latihan" aria-labelledby="latihan-heading" class="scroll-mt-24 space-y-4">
			<h2 id="latihan-heading" class="text-2xl font-semibold">Latihan pemahaman</h2>
			<p class="text-muted-foreground">
				Jawab dalam hati atau tulis di kertas, lalu buka pembahasan.
			</p>
			<ol class="list-decimal space-y-5 ps-6">
				{#each lesson.exercises as exercise, i (i)}
					<li
						id={`soal-${i + 1}`}
						class="scroll-mt-24 space-y-2 rounded-xl border bg-card px-4 py-3"
					>
						{#if exercise.arabic}
							<ArabicText text={exercise.arabic} size="block" />
						{/if}
						<p class="font-medium"><MixedText text={exercise.prompt} /></p>
						<details class="border-t">
							<summary class="min-h-11 cursor-pointer py-3 font-semibold text-primary">
								Lihat pembahasan
							</summary>
							<p class="pb-2 text-pretty"><MixedText text={exercise.answer} /></p>
						</details>
					</li>
				{/each}
			</ol>
		</section>

		<section
			aria-labelledby="pola"
			class="space-y-4 rounded-2xl bg-secondary p-4 text-secondary-foreground sm:p-6"
		>
			<h2 id="pola" class="text-2xl font-semibold">Pola yang perlu diingat</h2>
			<ul class="list-disc space-y-2 ps-6">
				{#each lesson.patterns as pattern, i (i)}
					<li><MixedText text={pattern} /></li>
				{/each}
			</ul>
		</section>
	</article>

	{#if lesson.related}
		<ul class="space-y-1">
			{#each lesson.related as link (link.path)}
				<li>
					<a
						class="inline-flex min-h-11 items-center font-medium text-primary underline"
						href={resolve(link.path)}>{link.label}</a
					>
				</li>
			{/each}
		</ul>
	{/if}

	<nav aria-label="Urutan pelajaran" class="flex flex-wrap justify-between gap-3 border-t pt-6">
		{#if previous}
			<Button variant="outline" href={resolve(`${lesson.track}/${previous.slug}/`)}>
				<ChevronLeft aria-hidden="true" /> Sebelumnya
			</Button>
		{/if}
		{#if next}
			<Button class="ms-auto" href={resolve(`${lesson.track}/${next.slug}/`)}>
				Pelajaran berikutnya <ChevronRight aria-hidden="true" />
			</Button>
		{:else if lesson.track === 'iqra'}
			<Button class="ms-auto" href={resolve('belajar/')}>
				Ke jalur utama <ChevronRight aria-hidden="true" />
			</Button>
		{:else}
			<Button class="ms-auto" variant="outline" href={resolve('belajar/')}>Kembali ke daftar</Button
			>
		{/if}
	</nav>

	<details class="border-t text-base text-muted-foreground">
		<summary class="min-h-11 cursor-pointer py-3 font-medium">Rujukan dan lisensi</summary>
		<ul class="list-disc space-y-2 ps-6">
			{#each lesson.references as reference (reference.href)}
				<li>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external source URL validated at build -->
					<a href={reference.href} class="underline">{reference.label}</a>
				</li>
			{/each}
		</ul>
		<p class="mt-3">
			Penjelasan dan latihan asli ·
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external Creative Commons URL -->
			<a href={LESSON_LICENSE} class="underline">CC BY-SA 4.0</a>
		</p>
	</details>
</div>
