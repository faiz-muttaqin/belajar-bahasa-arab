<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<footer class="mt-16 border-t border-border/60">
	<div
		class="flex flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:px-6 lg:px-8 2xl:px-12"
	>
		<p>Materi masih dalam peninjauan pengajar.</p>
		<div class="flex flex-wrap items-center gap-x-4 gap-y-1">
			<span>Tanpa akun · Data belajar disimpan di perangkat</span>
			<a
				href={resolve('tentang/')}
				class="inline-flex min-h-11 items-center rounded-md font-medium text-foreground underline underline-offset-4 hover:text-primary"
			>
				Sumber &amp; privasi
			</a>
		</div>
	</div>
</footer>
