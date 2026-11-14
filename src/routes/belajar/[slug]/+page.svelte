<script lang="ts">
	import LessonReader from '#lib/components/learning/LessonReader.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#key data.lesson.id}
	<LessonReader {...data} />
{/key}
