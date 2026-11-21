# P7.7 — Benchmark indeks dan shard kamus statis

Status: benchmark sintetis, bukan evaluasi kosakata terbit. Rujuk [rencana P7](../plans/p7-dictionary-expansion.md) dan implementasi `src/lib/domain/dictionary/shards.ts`.

## Scope

Jalankan `bun scripts/p7-dictionary-benchmark.ts /tmp/p7-benchmark.json` di luar folder terbit, atau workflow `P7 static dictionary scale benchmark`. Alat ini membangun data **sintetis, bukan kata Arab terverifikasi** dengan jumlah 10.000 / 25.000 / 50.000 lema dan satu sense tiap lema. Aset sintetis tidak ditulis ke `static/` maupun diunggah; hanya ringkasan JSON.

Ukur waktu membangun indeks, RSS teramati, ukuran manifest, total JSON shard, ukuran shard terbesar dan fan-out permintaan untuk prefix Arab satu–tiga karakter serta glos Indonesia yang banyak dipakai. Hitungan shard wajib sesuai `Math.ceil(n/128)`, berisi 1–128 entri. Gunakan rentang ini untuk mengidentifikasi kebutuhan indeks berbeda, pembatasan query pendek, caching dan target transfer seluler.

## Keterbatasan dan gate

- Benchmark sintetis **bukan** ukuran, sebaran token, performa perangkat nyata, validitas kosakata atau benchmark glos Indonesia sesungguhnya. Prefix sintetis memang sengaja dapat menciptakan fan-out buruk untuk menampilkan batas terburuk.
- Waktu dan RSS bergantung runner; jangan menetapkan status lulus/gagal memakai threshold waktu arbitrer. CI memverifikasi integritas shard dan kelengkapan laporan.
- Hasil yang memerlukan penilaian manusia: frekuensi query riil, p95/p99 perangkat Android, transfer terkompresi, penggunaan offline/no-JS, dedup pasangan lema-sense, uji paket statis dan pengalaman pencarian.
- Sebelum memuat 10k+ entri sesungguhnya, selesaikan keputusan per sense, hak penggunaan, data shard hasil tinjauan, serta uji performa pada dataset nyata dan perangkat mobile.

Catat hasil run dan keputusan di plan induk P7 saat CI selesai.
