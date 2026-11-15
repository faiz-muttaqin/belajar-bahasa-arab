<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Button } from '#lib/components/ui/button/index.js';
	import type { MeaningPractice } from '#lib/content/lessons/types.js';
	import ArabicText from './ArabicText.svelte';
	import MixedText from './MixedText.svelte';

	let { questions }: { questions: MeaningPractice } = $props();
	const id = $props.id();
	let interactive = $state(false);
	let step = $state<0 | 1>(0);
	let selected = $state<number>();
	let checked = $state(false);
	let prompt = $state<HTMLHeadingElement>();
	let feedback = $state<HTMLParagraphElement>();
	const current = $derived(questions[step]);
	const correct = $derived(selected === current.correct);

	onMount(() => {
		interactive = true;
	});

	async function showFeedback(choice: number | undefined) {
		selected = choice;
		checked = true;
		await tick();
		feedback?.focus();
	}

	async function openQuestion(index: 0 | 1) {
		step = index;
		selected = undefined;
		checked = false;
		await tick();
		prompt?.focus();
	}
</script>

<section
	aria-labelledby="{id}-title"
	class="max-w-2xl space-y-4 rounded-2xl border bg-card p-4 sm:p-6"
>
	<h3 id="{id}-title" class="text-xl font-semibold">Latihan makna</h3>
	{#if interactive}
		<div class="space-y-2">
			<p class="text-base text-muted-foreground">
				Soal {step + 1} dari {questions.length} · {current.context}
			</p>
			<h4
				id="{id}-prompt"
				bind:this={prompt}
				tabindex="-1"
				aria-describedby="{id}-word"
				class="scroll-mt-24 font-semibold"
			>
				{current.prompt}
			</h4>
			<div id="{id}-word"><ArabicText text={current.arabic} size="block" /></div>
		</div>

		<fieldset disabled={checked} aria-labelledby="{id}-prompt" class="space-y-2">
			{#each current.choices as choice, index (choice)}
				<label
					class="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 has-checked:border-primary has-checked:bg-secondary has-disabled:cursor-default"
				>
					<input
						type="radio"
						name={id}
						value={index}
						bind:group={selected}
						class="size-4 shrink-0 accent-primary"
					/>
					<span>{choice}</span>
				</label>
			{/each}
		</fieldset>

		{#if checked}
			<div class="space-y-2 rounded-lg bg-secondary p-4 text-secondary-foreground">
				<p
					bind:this={feedback}
					tabindex="-1"
					aria-describedby="{id}-reason"
					class="scroll-mt-24 font-semibold"
				>
					{selected === undefined ? 'Mari lihat polanya.' : correct ? 'Tepat.' : 'Belum tepat.'}
					{current.choices[current.correct]}.
				</p>
				<p id="{id}-reason"><MixedText text={current.reason} /></p>
			</div>
			<div class="flex flex-wrap gap-2">
				{#if !correct}
					<Button variant="outline" onclick={() => openQuestion(step)}>Coba lagi</Button>
				{/if}
				{#if step === 0}
					<Button onclick={() => openQuestion(1)}>Coba contoh baru</Button>
				{:else if correct}
					<Button variant="outline" onclick={() => openQuestion(0)}>Ulangi latihan</Button>
				{/if}
			</div>
		{:else}
			<div class="flex flex-wrap gap-2">
				<Button disabled={selected === undefined} onclick={() => showFeedback(selected)}
					>Cek jawaban</Button
				>
				<Button variant="outline" onclick={() => showFeedback(undefined)}>Belum tahu</Button>
			</div>
		{/if}
	{:else}
		<p class="text-base text-muted-foreground">Pilih jawaban dalam hati, lalu buka alasannya.</p>
		<ol class="space-y-4">
			{#each questions as question (question.arabic)}
				<li class="space-y-2 border-t pt-4">
					<p class="text-base text-muted-foreground">{question.context}</p>
					<h4 class="font-semibold">{question.prompt}</h4>
					<ArabicText text={question.arabic} size="block" />
					<ul class="list-disc ps-5">
						{#each question.choices as choice (choice)}<li>{choice}</li>{/each}
					</ul>
					<details>
						<summary class="min-h-11 cursor-pointer py-2 font-medium text-primary"
							>Lihat alasan</summary
						>
						<p class="font-semibold">{question.choices[question.correct]}.</p>
						<p><MixedText text={question.reason} /></p>
					</details>
				</li>
			{/each}
		</ol>
	{/if}
</section>
