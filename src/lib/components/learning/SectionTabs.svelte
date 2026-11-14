<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * Sticky sub tabs: anchors to the sections of the current page. The tab of the section being
	 * read is marked with aria-current="location". Works as plain links without JavaScript.
	 */
	let { items }: { items: readonly { id: string; label: string }[] } = $props();

	let activeId = $state('');

	onMount(() => {
		const sections = items
			.map((item) => document.getElementById(item.id))
			.filter((el): el is HTMLElement => el !== null);
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((entry) => entry.isIntersecting);
				const first = visible.sort(
					(a, b) => a.boundingClientRect.top - b.boundingClientRect.top
				)[0];
				if (first) activeId = first.target.id;
			},
			{ rootMargin: '-120px 0px -60% 0px' }
		);
		for (const section of sections) observer.observe(section);
		return () => observer.disconnect();
	});
</script>

<nav
	aria-label="Bagian halaman"
	class="sticky top-16 z-10 -mx-4 overflow-x-auto border-b bg-background px-4 md:-mx-6 md:px-6 lg:top-0 lg:-mx-8 lg:px-8"
>
	<ul class="flex min-w-max gap-1">
		{#each items as item (item.id)}
			<li>
				<a
					href="#{item.id}"
					aria-current={activeId === item.id ? 'location' : undefined}
					class="inline-flex min-h-11 items-center border-b-2 border-transparent px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current=location]:border-primary aria-[current=location]:text-primary"
					>{item.label}</a
				>
			</li>
		{/each}
	</ul>
</nav>
