<script lang="ts">
	import type { Inline } from '#lib/domain/local-content/types.js';

	/**
	 * Inline runs of a local lesson as elements, never as HTML. Arabic runs are isolated with
	 * their own `lang` and `dir`; only http(s) links are rendered as links (the importer
	 * already drops other targets, and this check keeps the page safe on its own).
	 */
	let { inlines }: { inlines: Inline[] } = $props();

	const safeHref = (href: string | undefined) =>
		href && /^https?:\/\//i.test(href) ? href : undefined;
	const lines = (text: string) => text.split('\n');
</script>

{#each inlines as run, i (i)}
	{@const href = safeHref(run.href)}
	{#if href}
		<!-- eslint-disable svelte/no-navigation-without-resolve -- external source link, http(s) only -->
		<a
			{href}
			rel="noopener noreferrer"
			class="font-medium text-primary underline underline-offset-4 hover:text-foreground"
			>{@render styled(run)}</a
		>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	{:else}
		{@render styled(run)}
	{/if}
{/each}

{#snippet styled(run: Inline)}
	{#if run.lang === 'ar'}
		<span lang="ar" dir="rtl" class="arabic-inline">{@render formatted(run)}</span>
	{:else}
		{@render formatted(run)}
	{/if}
{/snippet}

{#snippet formatted(run: Inline)}
	{#if run.code}
		<code class="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em] whitespace-pre-wrap"
			>{run.text}</code
		>
	{:else if run.bold && run.italic}
		<strong><em>{@render plain(run.text)}</em></strong>
	{:else if run.bold}
		<strong>{@render plain(run.text)}</strong>
	{:else if run.italic}
		<em>{@render plain(run.text)}</em>
	{:else}
		{@render plain(run.text)}
	{/if}
{/snippet}

{#snippet plain(text: string)}
	{#each lines(text) as line, i (i)}{#if i > 0}<br />{/if}{line}{/each}
{/snippet}
