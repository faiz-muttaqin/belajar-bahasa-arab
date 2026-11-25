<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		RELATION_LABELS,
		ROLE_LABELS,
		ROLE_MEANINGS,
		SHARAF_KIND_LABELS,
		WORD_CLASS_LABELS,
		relationsOf,
		tokenById,
		type AnnotatedSentence,
		type AnnotatedToken
	} from '#lib/domain/grammar/annotation.js';
	import { LAYER_LABELS, type AnnotationLayer } from '#lib/domain/grammar/annotation-layers.js';
	import { IRAB_CASE_LABELS } from '#lib/content/phrase-rules.js';
	import ArabicText from './ArabicText.svelte';

	let {
		sentence,
		token,
		layer,
		panelId,
		onclose
	}: {
		sentence: AnnotatedSentence;
		token: AnnotatedToken;
		layer: AnnotationLayer;
		panelId: string;
		onclose: () => void;
	} = $props();

	const position = $derived(sentence.tokens.findIndex((item) => item.id === token.id) + 1);
	const relations = $derived(relationsOf(sentence, token.id));
	const titleId = $derived(`${panelId}-title`);
</script>

<div
	id={panelId}
	role="region"
	aria-labelledby={titleId}
	data-wr-panel
	data-layer={layer}
	class="space-y-3 rounded-xl border bg-secondary/40 p-4 text-start"
>
	<div class="flex items-start justify-between gap-3">
		<h4 id={titleId} class="min-w-0 text-lg font-semibold">
			<ArabicText text={token.text} class="me-2" />
			<span class="wrap-break-word">{token.gloss}</span>
		</h4>
		<button
			type="button"
			class="inline-flex min-h-11 shrink-0 items-center rounded-lg border bg-card px-3 text-sm font-semibold hover:bg-secondary"
			onclick={onclose}
		>
			Tutup<span class="sr-only"> penjelasan kata {token.gloss}</span>
		</button>
	</div>

	<p class="text-sm text-muted-foreground">
		Kata ke-{position} dari {sentence.tokens.length} dalam urutan baca (kanan ke kiri). Urutan ini hanya
		posisi tampilan; peran kata berasal dari analisis.
	</p>
	<p>
		<span class="font-semibold">Terjemahan kalimat</span> · {sentence.translation}
	</p>

	<div class="space-y-2 border-t pt-3">
		<p class="text-sm font-semibold text-muted-foreground">{LAYER_LABELS[layer]}</p>

		{#if layer === 'wordClass'}
			<p>
				<span class="font-semibold">{WORD_CLASS_LABELS[token.wordClass]}</span>
				· {token.wordClassReason}
			</p>
			{#if token.segments?.length}
				<div>
					<p class="font-semibold">Bagian dari satu kata ini</p>
					<ul class="mt-1 list-disc space-y-1 ps-5 text-muted-foreground">
						{#each token.segments as segment, s (s)}
							<li><ArabicText text={segment.text} /> · {segment.note}</li>
						{/each}
					</ul>
				</div>
			{/if}
		{:else if layer === 'role'}
			<p>
				<span class="font-semibold">{ROLE_LABELS[token.role]}</span>
				<span class="text-muted-foreground"> ({ROLE_MEANINGS[token.role]})</span>
			</p>
			<p>{token.roleReason}</p>
			{#if token.partOf}
				<p class="text-muted-foreground">
					Kata ini bagian dari {ROLE_LABELS[token.partOf]}.
				</p>
			{/if}
			{#if token.alsoRoles?.length}
				<p class="text-muted-foreground">
					Sekaligus: {token.alsoRoles.map((role) => ROLE_LABELS[role]).join(', ')}.
				</p>
			{/if}
			{#if token.finalVowel}
				<p>
					<span class="font-semibold">Akhir kata:</span>
					{token.finalVowel.sign} · {IRAB_CASE_LABELS[token.finalVowel.case]}.
					{token.finalVowel.reason}
				</p>
			{/if}
			{#if relations.length}
				<div>
					<p class="font-semibold">Kata yang berhubungan</p>
					<ul class="mt-1 list-disc space-y-1 ps-5">
						{#each relations as relation (relation.id)}
							<li>
								{RELATION_LABELS[relation.type]}:
								{#each [...relation.from, ...relation.to].filter((id) => id !== token.id) as id, k (id)}{#if k > 0}<span
											class="mx-1">+</span
										>{/if}<ArabicText text={tokenById(sentence, id)?.text ?? ''} />{/each}.
								<span class="text-muted-foreground">{relation.reason}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{:else if token.sharaf}
			<p>
				<span class="font-semibold">{SHARAF_KIND_LABELS[token.sharaf.kind]}</span>
				{#if token.sharaf.root}
					· akar <ArabicText text={token.sharaf.root} />{/if}
				{#if token.sharaf.pattern}
					· pola <ArabicText text={token.sharaf.pattern} />{/if}
			</p>
			<p>{token.sharaf.note}</p>
		{:else}
			<p class="text-muted-foreground">
				Contoh ini belum memuat catatan sharaf untuk kata ini. Jenis kata dan perannya tetap
				tersedia pada lapisan lain.
			</p>
		{/if}
	</div>

	<div class="space-y-1 border-t pt-3 text-sm text-muted-foreground">
		<p>
			Status: <strong class="text-foreground">draf</strong>, belum ditinjau ustadz. Sumber:
			{#each sentence.analysis.sources as source, s (source.label + source.locator)}
				{#if s > 0}<span>;&nbsp;</span
					>{/if}<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external source --><a
					href={source.url}
					class="break-words underline">{source.label}</a
				>
				({source.locator}){/each}.
		</p>
		{#if sentence.ruleLinks.length}
			<p>
				Kaidah:
				{#each sentence.ruleLinks as link, k (link.path + link.label)}
					{#if k > 0}<span>;&nbsp;</span>{/if}<a href={resolve(link.path)} class="underline"
						>{link.label}</a
					>{/each}.
			</p>
		{/if}
	</div>
</div>
