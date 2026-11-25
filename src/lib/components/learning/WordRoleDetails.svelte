<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		RELATION_LABELS,
		ROLE_LABELS,
		SHARAF_KIND_LABELS,
		WORD_CLASS_LABELS,
		tokenById,
		type AnnotatedSentence
	} from '#lib/domain/grammar/annotation.js';
	import { IRAB_CASE_LABELS } from '#lib/content/phrase-rules.js';
	import ArabicText from './ArabicText.svelte';

	let { sentence }: { sentence: AnnotatedSentence } = $props();

	const usageLabels = {
		'independent-original': 'Contoh dan penjelasan ditulis sendiri oleh proyek',
		adaptation: 'Adaptasi dari sumber',
		verbatim: 'Kutipan utuh dari sumber'
	} as const;
</script>

<!-- Plain HTML list: the full analysis stays readable without JavaScript and without hover. -->
<details class="rounded-xl border px-4" data-wr-details={sentence.id}>
	<summary class="min-h-11 cursor-pointer py-3 font-semibold text-primary">
		Rincian per kata, sumber, dan status
	</summary>
	<div class="space-y-4 border-t pt-4 pb-4">
		<ol class="divide-y rounded-lg border">
			{#each sentence.tokens as token, i (token.id)}
				<li class="space-y-2 px-3 py-3 sm:px-4">
					<p class="flex flex-wrap items-baseline gap-x-3">
						<span class="text-muted-foreground tabular-nums">{i + 1}.</span>
						<ArabicText text={token.text} class="font-semibold" />
						<span>{token.gloss}</span>
					</p>
					<dl class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
						<div>
							<dt class="font-semibold">Jenis kata</dt>
							<dd class="text-muted-foreground">
								{WORD_CLASS_LABELS[token.wordClass]}. {token.wordClassReason}
							</dd>
						</div>
						<div>
							<dt class="font-semibold">Peran dalam kalimat</dt>
							<dd class="text-muted-foreground">
								{ROLE_LABELS[token.role]}. {token.roleReason}
								{#if token.partOf}Bagian dari {ROLE_LABELS[token.partOf]}.{/if}
								{#if token.alsoRoles?.length}
									Sekaligus {token.alsoRoles.map((role) => ROLE_LABELS[role]).join(', ')}.
								{/if}
							</dd>
						</div>
						{#if token.finalVowel}
							<div>
								<dt class="font-semibold">Akhir kata</dt>
								<dd class="text-muted-foreground">
									{token.finalVowel.sign}, {IRAB_CASE_LABELS[token.finalVowel.case]}.
									{token.finalVowel.reason}
								</dd>
							</div>
						{/if}
						{#if token.sharaf}
							<div>
								<dt class="font-semibold">Bentuk sharaf</dt>
								<dd class="text-muted-foreground">
									{SHARAF_KIND_LABELS[token.sharaf.kind]}. {token.sharaf.note}
								</dd>
							</div>
						{/if}
						{#if token.segments?.length}
							<div>
								<dt class="font-semibold">Bagian satu kata ini</dt>
								<dd class="text-muted-foreground">
									{#each token.segments as segment, s (s)}
										{#if s > 0}<span class="mx-1">+</span>{/if}<ArabicText
											text={segment.text}
										/>{/each}
								</dd>
							</div>
						{/if}
					</dl>
				</li>
			{/each}
		</ol>

		{#if sentence.relations.length}
			<div>
				<h5 class="font-semibold">Hubungan antarkata</h5>
				<ul class="mt-2 list-disc space-y-1 ps-5 text-muted-foreground">
					{#each sentence.relations as relation (relation.id)}
						<li>
							<strong class="text-foreground">{RELATION_LABELS[relation.type]}</strong>:
							{#each relation.from as id, k (id)}{#if k > 0}<span class="mx-1">+</span
									>{/if}<ArabicText text={tokenById(sentence, id)?.text ?? ''} />{/each}
							→
							{#each relation.to as id, k (id)}{#if k > 0}<span class="mx-1">+</span
									>{/if}<ArabicText text={tokenById(sentence, id)?.text ?? ''} />{/each}.
							{relation.reason}
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class="space-y-2">
			<h5 class="font-semibold">Sumber dan status</h5>
			<p class="text-muted-foreground">
				Status: <strong class="text-foreground">draf</strong>, belum ditinjau ustadz.
				{usageLabels[sentence.analysis.usageType]}.
			</p>
			<ul class="list-disc space-y-1 ps-5">
				{#each sentence.analysis.sources as source (source.label + source.locator)}
					<li>
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external source -->
						<a href={source.url} class="break-words underline">{source.label}</a>
						<span class="text-muted-foreground"> · {source.locator}</span>
					</li>
				{/each}
			</ul>
			<p class="text-muted-foreground">
				<strong class="text-foreground">Batas bukti:</strong>
				{sentence.analysis.limits}
			</p>
			{#if sentence.ruleLinks.length}
				<ul class="list-disc space-y-1 ps-5">
					{#each sentence.ruleLinks as link (link.path + link.label)}
						<li><a href={resolve(link.path)} class="underline">{link.label}</a></li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</details>
