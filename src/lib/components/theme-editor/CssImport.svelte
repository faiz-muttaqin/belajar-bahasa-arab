<script lang="ts">
	import { Button } from '#lib/components/ui/button/index.js';
	import { Textarea } from '#lib/components/ui/textarea/index.js';
	import { countParsed, parseThemeCss, type ThemeOverrides } from '#lib/theme/css.js';

	let { onimport }: { onimport: (overrides: ThemeOverrides) => void } = $props();

	let text = $state('');
	let message = $state('');
	let isError = $state(false);

	function apply() {
		const parsed = parseThemeCss(text);
		const count = countParsed(parsed);
		if (count === 0) {
			isError = true;
			message =
				'Tidak ada variabel tema yang bisa dipakai. Pastikan ada blok :root { ... } atau .dark { ... } berisi misalnya --primary: #145f4c;';
			return;
		}
		onimport(parsed);
		isError = false;
		message =
			`${count} nilai diterapkan.` +
			(parsed.ignored.length ? ` Diabaikan: ${parsed.ignored.join(', ')}.` : '') +
			' Tekan Urungkan untuk membatalkan.';
		text = '';
	}
</script>

<section aria-labelledby="impor-judul" class="space-y-3">
	<div>
		<h2 id="impor-judul" class="text-lg font-semibold">Impor CSS</h2>
		<p id="impor-bantuan" class="text-sm text-muted-foreground">
			Tempel CSS tema shadcn (blok <code>:root</code> dan <code>.dark</code>). Warna hex, rgb(),
			hsl() dan oklch() diterima. Nilai yang tidak dikenal diabaikan.
		</p>
	</div>
	<label for="impor-css" class="sr-only">CSS untuk diimpor</label>
	<Textarea
		id="impor-css"
		bind:value={text}
		rows={8}
		spellcheck={false}
		aria-describedby="impor-bantuan impor-pesan"
		aria-invalid={isError || undefined}
		placeholder={':root {\n\t--primary: #145f4c;\n}\n.dark {\n\t--primary: #7ad4b0;\n}'}
		class="field-sizing-fixed h-48 font-mono text-xs"
	/>
	<div class="flex flex-wrap items-center gap-3">
		<Button variant="secondary" onclick={apply} disabled={text.trim() === ''}>Terapkan CSS</Button>
		<p
			id="impor-pesan"
			role={isError ? 'alert' : 'status'}
			class={['text-sm', isError ? 'text-destructive' : 'text-muted-foreground']}
		>
			{message}
		</p>
	</div>
</section>
