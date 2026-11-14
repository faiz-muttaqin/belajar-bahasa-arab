<script lang="ts">
	import type { SharafForm, SharafFormCategory } from '#lib/content/sharaf-lessons.js';
	import { SHARAF_FORM_LABELS } from '#lib/content/sharaf-lessons.js';

	let { forms }: { forms: readonly SharafForm[] } = $props();

	const colors: Record<SharafFormCategory, string> = {
		root: 'border-chart-4/40 bg-chart-4/10',
		past: 'border-chart-2/40 bg-chart-2/10',
		present: 'border-chart-1/40 bg-chart-1/10',
		imperative: 'border-chart-3/40 bg-chart-3/10',
		masdar: 'border-chart-4/40 bg-chart-4/10',
		agent: 'border-chart-2/40 bg-chart-2/10',
		patient: 'border-chart-5/40 bg-chart-5/10'
	};
</script>

<ul
	class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-3"
	aria-label="Contoh bentuk sharaf, arti dan kategorinya"
>
	{#each forms as form (form.id)}
		<li
			data-form={form.id}
			data-category={form.category}
			class="flex min-w-0 flex-col items-center gap-2 rounded-xl border p-4 text-center {colors[
				form.category
			]}"
		>
			{#if form.pronoun}
				<p class="text-xs font-medium text-muted-foreground">
					Dhamir <span lang="ar" dir="rtl" class="arabic-inline">{form.pronoun.arabic}</span>
					<span lang="id" dir="ltr">({form.pronoun.gloss})</span>
				</p>
			{/if}
			<span lang="ar" dir="rtl" class="text-3xl leading-[1.9] font-semibold">
				{form.arabic}
			</span>
			<span lang="id" dir="ltr" class="text-sm font-semibold">{form.gloss}</span>
			<span class="text-xs text-muted-foreground">
				{SHARAF_FORM_LABELS[form.category]} · {form.label}
			</span>
			{#if form.pattern}
				<p class="text-sm text-muted-foreground">
					Wazan: <span lang="ar" dir="rtl" class="arabic-inline">{form.pattern}</span>
				</p>
			{/if}
		</li>
	{/each}
</ul>
