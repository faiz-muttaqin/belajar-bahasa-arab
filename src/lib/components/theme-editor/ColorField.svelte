<!--
	One colour token: a native colour picker plus a text field that accepts hex, rgb(),
	hsl() and oklch(). Invalid text is never applied; the field shows why instead.
-->
<script lang="ts">
	import { Input } from '#lib/components/ui/input/index.js';
	import { isValidColor, toHex } from '#lib/theme/color.js';

	let {
		id,
		label,
		token,
		value,
		changed = false,
		onchange
	}: {
		id: string;
		label: string;
		token: string;
		value: string;
		changed?: boolean;
		onchange: (value: string) => void;
	} = $props();

	// Writable derived: follows `value` (undo, reset, import) but can hold a draft while typing.
	let draft = $derived(value);
	const invalid = $derived(!isValidColor(draft));
	const hex = $derived(toHex(value) ?? '#000000');

	function onText(event: Event & { currentTarget: HTMLInputElement }) {
		draft = event.currentTarget.value;
		if (!invalid && draft.trim() !== value) onchange(draft.trim());
	}

	function onBlur() {
		if (invalid) draft = value;
	}
</script>

<div class="grid grid-cols-[2.75rem_minmax(0,1fr)] items-end gap-x-2 gap-y-1">
	<label for={id} class="col-span-2 flex flex-wrap items-baseline gap-x-2 text-sm font-medium">
		{label}
		<code class="text-xs font-normal text-muted-foreground">--{token}</code>
		{#if changed}<span class="text-xs font-normal text-primary">(diubah)</span>{/if}
	</label>
	<input
		type="color"
		value={hex}
		oninput={(event) => onchange(event.currentTarget.value)}
		aria-label={`Pilih warna: ${label}`}
		class="h-11 w-11 cursor-pointer rounded-md border border-input bg-transparent p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
	/>
	<Input
		{id}
		value={draft}
		oninput={onText}
		onblur={onBlur}
		spellcheck={false}
		autocomplete="off"
		aria-invalid={invalid || undefined}
		aria-describedby={invalid ? `${id}-error` : undefined}
		class="h-11 font-mono"
	/>
	{#if invalid}
		<p id={`${id}-error`} class="col-span-2 text-sm text-destructive">
			Warna belum valid. Contoh: #145f4c, rgb(20 95 76) atau oklch(0.45 0.08 170).
		</p>
	{/if}
</div>
