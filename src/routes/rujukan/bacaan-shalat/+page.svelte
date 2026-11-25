<script lang="ts">
	import { resolve } from '$app/paths';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ArabicText from '#lib/components/learning/ArabicText.svelte';
	import MixedText from '#lib/components/learning/MixedText.svelte';
	import { fatihahWords } from '#lib/content/shalat-fatihah.js';
	import { TANZIL_NOTICE, TANZIL_TEXT_VERSION } from '#lib/content/quran-vocabulary.js';
	import { prayerReadings, readingSource } from '#lib/content/shalat-readings.js';
</script>

<PageIntro
	title="Bacaan shalat dari hadis"
	section="rujukan"
	description="Pelajari arti bacaan shalat dari takbir hingga salam, dengan glos Arab–Indonesia per kata dan pilihan lafaz beserta rujukan hadisnya."
>
	{#snippet lead()}
		<p>
			Baca lafaz Arab dan makna utuhnya. Buka “Arti per kata” untuk melihat kosakata dan susunannya.
		</p>
	{/snippet}
</PageIntro>

<p class="mt-5 rounded-lg border bg-accent px-4 py-3 text-sm text-accent-foreground">
	Draf bersumber · menunggu tinjauan ustadz. Bacaan dikelompokkan menurut posisi dan konteks yang
	disebut dalam riwayat. Jika ada beberapa lafaz, pelajari setiap riwayat secara terpisah.
</p>

<nav aria-label="Bagian bacaan shalat" class="mt-6">
	<ul class="flex flex-wrap gap-x-5">
		{#each prayerReadings as group (group.id)}
			<li>
				<a
					href={`#${group.id}`}
					class="inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4"
					>{group.title}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<div class="mt-8 space-y-10">
	{#each prayerReadings as group (group.id)}
		<section id={group.id} aria-labelledby={`${group.id}-heading`} class="scroll-mt-24 space-y-4">
			<h2 id={`${group.id}-heading`} class="text-2xl font-semibold">{group.title}</h2>

			{#if group.id === 'qiraah'}
				<p class="max-w-[65ch] text-pretty">
					Riwayat Ubadah bin ash-Shamit menyebut pembacaan Al-Fatihah dalam shalat.
					<a class="text-primary underline" href="https://sunnah.com/bukhari:756"
						>Sahih al-Bukhari 756</a
					>. Riwayat Abu Qatadah menyebut bacaan surah lain sesudah Al-Fatihah pada dua rakaat awal
					Zuhur.
					<a class="text-primary underline" href="https://sunnah.com/bukhari:759"
						>Sahih al-Bukhari 759</a
					>.
				</p>
				<a
					class="inline-flex min-h-11 items-center text-primary underline"
					href="https://quran.kemenag.go.id/assets/files/Juz-Amma-Metode-Tilawah.pdf#page=1"
					>Buka Al-Fatihah di bahan tilawah LPMQ</a
				>
				<details
					id="kosakata-al-fatihah"
					class="scroll-mt-24 rounded-xl border bg-card px-4 py-1 sm:px-5"
				>
					<summary class="min-h-11 cursor-pointer py-3 font-semibold text-primary"
						>Kosakata pilihan Al-Fatihah</summary
					>
					<dl class="grid gap-x-8 sm:grid-cols-2">
						{#each fatihahWords as [arabic, meaning, verse, note] (arabic)}
							<div class="border-t py-3">
								<dt><ArabicText text={arabic} class="text-xl" /></dt>
								<dd>
									{meaning}
									{#if note}<p class="mt-1 text-sm text-muted-foreground">
											<MixedText text={note} />
										</p>{/if}
									<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external verse locator -->
									<a
										class="inline-flex min-h-11 items-center text-sm text-primary underline"
										href={`https://tanzil.net/#1:${verse}`}>Al-Fatihah ayat {verse}</a
									>
								</dd>
							</div>
						{/each}
					</dl>
					<p class="border-t py-3 text-sm text-muted-foreground">
						{TANZIL_NOTICE} ·
						<a href="https://tanzil.net/" class="text-primary underline">{TANZIL_TEXT_VERSION}</a>.
						Glos Indonesia disusun untuk pembelajaran.
					</p>
				</details>
			{/if}

			{#if group.id === 'sujud'}
				<p class="text-sm text-muted-foreground">
					Tasbih <a class="text-primary underline" href="#subbuhun-quddus">Subbūḥun Quddūs</a>
					dan
					<a class="text-primary underline" href="#dhil-jabarut">tasbih pemilik segala keagungan</a>
					juga diriwayatkan ketika sujud.
				</p>
			{:else if group.id === 'rukuk'}
				<p class="text-sm text-muted-foreground">
					Lihat juga <a class="text-primary underline" href="#subhanaka-rabbana"
						>tasbih dan permohonan ampun</a
					>, yang diriwayatkan untuk rukuk dan sujud.
				</p>
			{/if}

			<div class="grid items-start gap-4 lg:grid-cols-2">
				{#each group.readings as reading (reading.id)}
					{@const source = readingSource(reading)}
					<article
						id={reading.id}
						class="scroll-mt-24 space-y-3 rounded-xl border bg-card p-4 sm:p-5"
					>
						<h3 class="text-lg font-semibold">{reading.title}</h3>
						<ArabicText
							text={reading.words.map(([arabic]) => arabic).join(' ')}
							size="block"
							class="text-3xl leading-loose"
						/>
						<p class="text-pretty">{reading.meaning}</p>
						<p class="text-sm text-muted-foreground">
							{reading.riwayat} ·
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external hadith source -->
							<a class="text-primary underline" href={source.href}>{source.label}</a>
							{#if reading.grade}
								· {reading.grade}
							{/if}
							{#if reading.gradeSource}
								<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external hadith grading -->
								<a class="text-primary underline" href={reading.gradeSource}>Penilaian al-Albani</a>
							{/if}
						</p>
						{#if reading.note}
							<p class="text-sm text-muted-foreground"><MixedText text={reading.note} /></p>
						{/if}
						<details class="border-t">
							<summary class="min-h-11 cursor-pointer py-3 font-medium text-primary">
								Arti per kata
							</summary>
							<dl class="divide-y">
								{#each reading.words as [arabic, meaning, note], index (index)}
									<div class="grid grid-cols-[minmax(5rem,1fr)_2fr] gap-x-3 py-2">
										<dt class="text-end"><ArabicText text={arabic} class="text-xl" /></dt>
										<dd>
											{meaning}
											{#if note}
												<p class="mt-1 text-sm text-muted-foreground"><MixedText text={note} /></p>
											{/if}
										</dd>
									</div>
								{/each}
							</dl>
						</details>
					</article>
				{/each}
			</div>
		</section>
	{/each}
</div>

<aside class="mt-10 flex flex-wrap gap-x-6 border-t pt-3">
	<a
		class="inline-flex min-h-11 items-center text-primary underline"
		href={resolve('kosakata/#quran')}>Kosakata bacaan shalat</a
	>
	<a
		class="inline-flex min-h-11 items-center text-primary underline"
		href={resolve('belajar/kata-inti-shalat/')}>Pelajaran kata inti shalat</a
	>
</aside>
