<script lang="ts">
	import { resolve } from '$app/paths';
	import { competencyTitle, g02RuleIndex } from '#lib/content/g02-rules.js';
	import type { RulePrerequisites } from '#lib/content/g02-types.js';

	/** Stable rule ID and its prerequisites: other G-02 rules and learning-map competencies. */
	let { ruleId, prerequisites }: { ruleId: string; prerequisites: RulePrerequisites } = $props();

	let rules = $derived(
		prerequisites.rules
			.map((id) => ({ id, rule: g02RuleIndex.get(id) }))
			.filter((item) => item.rule)
	);
	let competencies = $derived(
		prerequisites.competencies.map((id) => ({ id, title: competencyTitle(id) ?? '' }))
	);
</script>

<div class="space-y-1 text-xs text-muted-foreground" data-rule-meta={ruleId}>
	<p>ID kaidah: <code data-rule-id>{ruleId}</code></p>
	{#if rules.length || competencies.length}
		<p>Prasyarat:</p>
		<ul class="list-disc space-y-1 ps-5">
			{#each rules as { id, rule } (id)}
				<li data-prerequisite-rule={id}>
					Kaidah
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() gives the path; the fragment is an in-page anchor -->
					<a href={resolve(rule!.page as '/') + '#' + id} class="text-primary underline">{id}</a>
					· {rule!.title}
				</li>
			{/each}
			{#each competencies as competency (competency.id)}
				<li data-prerequisite-competency={competency.id}>
					Kompetensi <code>{competency.id}</code> · {competency.title}
				</li>
			{/each}
		</ul>
	{:else}
		<p>Prasyarat kaidah: tidak ada; hanya kompetensi dasar pada peta belajar.</p>
	{/if}
</div>
