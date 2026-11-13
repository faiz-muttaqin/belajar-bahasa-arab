<!--
	Neutral Arabic font specimen for the theme editor (not lesson content). Kept local to
	the editor so it does not overlap the app's own ArabicText component. Uses the theme's
	`--font-arabic`, or an explicit `family` to compare fonts side by side.
-->
<script lang="ts">
	import { ARABIC_FONTS, DEFAULT_THEME } from '#lib/theme/tokens.js';
	import { cn } from '#lib/utils.js';

	let { family, class: className }: { family?: string; class?: string } = $props();

	const fallback = ARABIC_FONTS[DEFAULT_THEME.shared.arabicFont].stack;
</script>

<bdi
	lang="ar"
	dir="rtl"
	class={cn('inline-block leading-[1.9]', className)}
	style:font-family={family ?? `var(--font-arabic, ${fallback})`}>بِسْمِ اللَّهِ</bdi
>
