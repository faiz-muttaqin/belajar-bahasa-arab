<script lang="ts">
	import Settings2 from '@lucide/svelte/icons/settings-2';
	import {
		browserSpeech,
		setSpeechRate,
		setSpeechVoice,
		SPEECH_RATES,
		type SpeechRate
	} from '#lib/audio/speech.svelte.js';

	const rateLabel = (rate: number) =>
		`${rate.toLocaleString('id-ID', { maximumFractionDigits: 2 })}×`;
</script>

<details class="max-w-xl rounded-xl border bg-card px-4 py-2 text-sm">
	<summary class="inline-flex min-h-9 cursor-pointer items-center gap-2 font-medium text-primary">
		<Settings2 class="size-4" aria-hidden="true" />
		Pengaturan audio browser
	</summary>
	<div class="space-y-4 border-t pt-4">
		<p class="text-pretty text-muted-foreground">
			Suara dihasilkan oleh browser/perangkat, bukan rekaman guru. Cocok sebagai bantuan mendengar,
			tetapi makhraj, harakat akhir, dan tajwid perlu dikonfirmasi kepada pengajar. Tidak ada audio
			yang diunggah ke situs.
		</p>
		{#if browserSpeech.initialized && !browserSpeech.supported}
			<p role="status" class="font-medium text-destructive">
				Web Speech API tidak tersedia di browser ini. Teks Arab tetap dapat dipelajari.
			</p>
		{:else}
			<div class="grid gap-3 sm:grid-cols-2">
				<label class="grid gap-2">
					<span class="font-medium">Kecepatan bicara</span>
					<select
						aria-label="Kecepatan audio Arab"
						class="min-h-11 rounded-lg border bg-background px-3"
						value={String(browserSpeech.rate)}
						onchange={(event) => setSpeechRate(Number(event.currentTarget.value) as SpeechRate)}
					>
						{#each SPEECH_RATES as rate (rate)}
							<option value={rate}>{rateLabel(rate)}</option>
						{/each}
					</select>
				</label>
				<label class="grid gap-2">
					<span class="font-medium">Suara Arab</span>
					<select
						aria-label="Pilih suara Arab"
						class="min-h-11 max-w-full rounded-lg border bg-background px-3"
						value={browserSpeech.voiceId}
						onchange={(event) => setSpeechVoice(event.currentTarget.value)}
					>
						<option value="">Otomatis</option>
						{#each browserSpeech.voices as voice (voice.id)}
							<option value={voice.id}>
								{voice.name} · {voice.lang}{voice.local ? ' (lokal)' : ''}
							</option>
						{/each}
					</select>
				</label>
			</div>
			{#if browserSpeech.initialized && browserSpeech.voices.length === 0}
				<p role="status" class="text-muted-foreground">
					Belum terdeteksi suara Arab. Browser mungkin masih memuat daftar suara; jika pelafalan
					gagal, pasang suara bahasa Arab dari pengaturan sistem.
				</p>
			{/if}
			<p class="text-xs text-muted-foreground">
				Pilihan kecepatan dan suara disimpan di perangkat ini. Sebagian suara browser mungkin
				memerlukan koneksi internet.
			</p>
		{/if}
	</div>
</details>
