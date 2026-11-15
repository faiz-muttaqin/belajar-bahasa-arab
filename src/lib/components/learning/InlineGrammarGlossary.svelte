<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount, tick } from 'svelte';
	import { Button } from '#lib/components/ui/button/index.js';
	import {
		grammarTerms,
		type GlossaryText,
		type GrammarTermId
	} from '#lib/content/grammar-glossary.js';
	import ArabicText from './ArabicText.svelte';
	import MixedText from './MixedText.svelte';

	let { text }: { text: GlossaryText } = $props();
	const id = $props.id();
	let dialog = $state<HTMLDialogElement>();
	let supportsDialog = $state(false);
	let selected = $state<GrammarTermId>();
	let trigger: HTMLAnchorElement | undefined;
	const term = $derived(selected ? grammarTerms[selected] : undefined);

	onMount(() => {
		supportsDialog = typeof dialog?.showModal === 'function';
	});

	async function openTerm(
		event: MouseEvent & { currentTarget: HTMLAnchorElement },
		termId: GrammarTermId
	) {
		if (
			!supportsDialog ||
			!dialog ||
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		)
			return;

		event.preventDefault();
		trigger = event.currentTarget;
		selected = termId;
		await tick();
		if (dialog?.isConnected && !dialog.open) {
			dialog.showModal();
			dialog.querySelector('button')?.focus({ preventScroll: true });
		}
	}

	function returnFocus() {
		trigger?.focus({ preventScroll: true });
		trigger = undefined;
		selected = undefined;
	}
</script>

<p class="max-w-[65ch] text-pretty">
	{#each text as part, index (index)}{#if typeof part === 'string'}<MixedText
				text={part}
			/>{:else}<a
				href={resolve(`rujukan/istilah/${part.term}/`)}
				aria-haspopup={supportsDialog ? 'dialog' : undefined}
				onclick={(event) => openTerm(event, part.term)}
				class="font-semibold text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
				>{grammarTerms[part.term].title.toLowerCase()}</a
			>{/if}{/each}
</p>

<dialog
	bind:this={dialog}
	aria-labelledby="{id}-heading"
	aria-describedby="{id}-definition"
	onclose={returnFocus}
	class="m-auto w-[min(92vw,32rem)] overflow-hidden rounded-2xl border bg-card p-0 text-card-foreground backdrop:bg-black/45"
>
	{#if term}
		<div class="flex max-h-[85dvh] flex-col">
			<div class="flex shrink-0 items-start justify-between gap-3 px-5 pt-5 pb-3 sm:px-6">
				<h2 id="{id}-heading" class="flex flex-wrap items-baseline gap-x-3 text-2xl font-semibold">
					{term.title}<ArabicText text={term.arabic} />
				</h2>
				<form method="dialog">
					<Button type="submit" variant="outline">Tutup</Button>
				</form>
			</div>
			<!-- Keep a keyboard target for scrolling when the example is taller than the available space. -->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				role="region"
				aria-label="Penjelasan dan contoh"
				tabindex="0"
				class="min-h-0 space-y-3 overflow-y-auto overscroll-contain px-5 pb-3 focus-visible:outline-offset-[-2px] sm:px-6"
			>
				<p id="{id}-definition">{term.definition}</p>
				{#if term.note}
					<p class="text-base text-muted-foreground"><MixedText text={term.note} /></p>
				{/if}
				<div class="space-y-1 border-t pt-3">
					<ArabicText text={term.example.arabic} size="block" />
					<p class="font-medium">{term.example.meaning}</p>
					<p class="text-muted-foreground"><MixedText text={term.example.explanation} /></p>
				</div>
			</div>
			<div class="shrink-0 border-t px-5 py-3 sm:px-6">
				<Button href={resolve(`rujukan/istilah/${term.id}/`)}>Baca penjelasan lengkap</Button>
			</div>
		</div>
	{/if}
</dialog>
