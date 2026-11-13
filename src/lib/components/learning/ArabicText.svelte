<script lang="ts" module>
	export type ArabicTextSize = 'inline' | 'block' | 'display';
</script>

<script lang="ts">
	import { cn } from '#lib/utils.js';

	/**
	 * Arabic text with the correct language and direction. Inline Arabic is isolated from the
	 * surrounding Indonesian sentence by its own `dir` (UA stylesheet: unicode-bidi: isolate).
	 * Keep Indonesian punctuation outside this component and Arabic punctuation inside it.
	 */
	let {
		text,
		size = 'inline',
		class: className
	}: { text: string; size?: ArabicTextSize; class?: string } = $props();

	const sizeClass: Record<ArabicTextSize, string> = {
		inline: 'arabic-inline',
		block: 'arabic-block',
		display: 'arabic-display'
	};
</script>

{#if size === 'inline'}
	<span lang="ar" dir="rtl" class={cn(sizeClass[size], className)}>{text}</span>
{:else}
	<p lang="ar" dir="rtl" class={cn(sizeClass[size], className)}>{text}</p>
{/if}
