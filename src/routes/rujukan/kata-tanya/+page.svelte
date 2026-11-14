<script lang="ts">
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import ReferenceSection from '#lib/components/learning/ReferenceSection.svelte';
	import ReferenceSubnav from '#lib/components/learning/ReferenceSubnav.svelte';
	import { questionWords } from '#lib/content/reference-tanya.js';
</script>

<PageIntro
	title="Rujukan kata tanya"
	section="rujukan"
	description="Delapan kata tanya bahasa Arab yang sering dipakai, dengan arti dan contoh kalimat pendek: mā, man, ayna, matā, kayfa, limādhā, kam, dan hal."
>
	{#snippet lead()}
		<p>
			Delapan kata tanya untuk bertanya apa, siapa, di mana, kapan, bagaimana, mengapa, dan berapa.
		</p>
	{/snippet}
</PageIntro>

<div class="mt-8 space-y-10">
	<ReferenceSubnav current="tanya" />
	<ReferenceSection
		table={questionWords}
		tip="Letakkan kata tanya di awal kalimat. Untuk pertanyaan ya atau tidak, pakai هَلْ."
	/>
</div>
