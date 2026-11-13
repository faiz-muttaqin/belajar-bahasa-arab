<script lang="ts">
	import { Button } from '#lib/components/ui/button/index.js';
	import { Textarea } from '#lib/components/ui/textarea/index.js';

	let { css }: { css: string } = $props();

	let status = $state('');
	let textarea = $state<HTMLTextAreaElement | null>(null);

	async function copy() {
		try {
			await navigator.clipboard.writeText(css);
			status = 'CSS disalin ke papan klip.';
		} catch {
			// Clipboard can be blocked (permissions, insecure context): select the text instead.
			textarea?.focus();
			textarea?.select();
			status = 'Tidak bisa menyalin otomatis. Teks sudah dipilih, tekan Ctrl+C atau Cmd+C.';
		}
	}
</script>

<section aria-labelledby="ekspor-judul" class="space-y-3">
	<div>
		<h2 id="ekspor-judul" class="text-lg font-semibold">Ekspor CSS</h2>
		<p class="text-sm text-muted-foreground">
			Tempel ke <code>src/routes/layout.css</code> untuk menjadikannya tema bawaan situs.
		</p>
	</div>
	<label for="ekspor-css" class="sr-only">CSS tema</label>
	<Textarea
		id="ekspor-css"
		bind:ref={textarea}
		readonly
		value={css}
		rows={12}
		spellcheck={false}
		class="field-sizing-fixed h-72 font-mono text-xs"
	/>
	<div class="flex flex-wrap items-center gap-3">
		<Button onclick={copy}>Salin CSS</Button>
		<p role="status" class="text-sm text-muted-foreground">{status}</p>
	</div>
</section>
