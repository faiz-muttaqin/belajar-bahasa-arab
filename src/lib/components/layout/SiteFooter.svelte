<script lang="ts">
	import { resolve } from '$app/paths';
	import { sections } from '#lib/navigation.js';
</script>

<footer class="mt-24 border-t">
	<div class="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-[1fr_2fr] md:px-6">
		<div class="max-w-[65ch] space-y-3 text-base text-pretty text-muted-foreground">
			<p class="font-semibold text-foreground">Belajar Bahasa Arab</p>
			<p>Tanpa akun. Data belajar Anda disimpan di perangkat ini, bukan di server.</p>
			<p>
				Materi sedang disiapkan. Setiap contoh dan audio akan ditinjau guru bahasa Arab sebelum
				terbit.
			</p>
		</div>
		<nav aria-label="Semua bagian (footer)">
			<ul class="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
				{#each sections as section (section.id)}
					<li>
						<a
							href={resolve(section.path)}
							class="inline-flex min-h-11 items-center rounded-md text-base hover:underline"
						>
							{section.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</footer>
