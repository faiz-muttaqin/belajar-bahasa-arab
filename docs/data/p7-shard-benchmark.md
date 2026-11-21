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

## Hasil CI awal — 21 November 2026

[Workflow 44905689817](https://github.com/faiz-muttaqin/belajar-bahasa-arab/actions/runs/44905689817) telah lulus pada PR #73 (merged). Angka berupa JSON tanpa kompresi dan benchmark sintetis, sehingga tidak mewakili distribusi lema nyata atau performa browser.

| Simulasi lema | Shard | Manifest (byte) | Shard JSON total (byte) | Build runner (ms) | RSS teramati (byte) |
| ------------: | ----: | --------------: | ----------------------: | ----------------: | ------------------: |
|        10.000 |    79 |         160.059 |               5.857.637 |               125 |          77.500.416 |
|        25.000 |   196 |         410.599 |              14.662.754 |               316 |         143.953.920 |
|        50.000 |   391 |         839.700 |              29.341.293 |               513 |         226.914.304 |

Pada 50k sintetis, pencarian `ك` dan prefiks glos `con` memilih 391/391 shard. Ini skenario adversarial yang memang dirancang untuk mengekspos risiko indeks, bukan estimasi persentase query pengguna. Lanjutkan melalui [issue #74](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/74): tentukan strategi query pendek/paginasi, evaluasi ukuran transfer gzip/brotli, search completeness, dan pengujian perangkat nyata. Tidak ada perubahan algoritma produksi atau dataset yang dipublikasikan dalam PR benchmark.

## Mitigasi awal fan-out (branch `feat/p7-search-fanout-guard`)

- Loader mengizinkan maksimal **32 shard** yang terpilih atau yang diperlukan setelah ekspansi keluarga akar, saat manifest lebih besar dari 32 shard. Jika melampaui batas, ia memberikan error eksplisit `DictionaryQueryTooBroadError` **sebelum** mengunduh shard pada tahap seleksi awal; tidak pernah memilih 32 shard pertama dan diam-diam kehilangan hasil.
- Halaman kamus memberi instruksi mempersempit query, tanpa menyamarkan penolakan sebagai tidak ditemukannya lema; query lain dapat dicoba lagi tanpa me-reset manifest.
- Benchmark sintetis tetap menghitung fan-out penuh dan menandai `requiresQueryRefinement`, bukan melaporkan fan-out yang telah dipotong.
- Ini **mitigasi sementara**, bukan penyelesaian issue #74. Kata Arab pendek yang tepat tetapi umum masih mungkin ditolak pada korpus besar. Desain indeks exact-match/ranked pagination yang lengkap, audit data nyata, gzip/brotli, Android, offline dan a11y masih harus dikerjakan. Tetap jangan publikasikan 10k–50k lema sebelum gerbang tersebut lulus.

## P7.7 lanjutan — pengukuran kompresi per aset

Benchmark menghasilkan ukuran **gzip dan Brotli** secara terpisah untuk manifest dan setiap shard, termasuk akumulasi transfer shard pada tiap query. Perhitungan memampatkan setiap berkas JSON secara independen dengan default Node `zlib`, bukan satu arsip gabungan; ini lebih dekat dengan struktur aset static hosting daripada kompresi semua data sekaligus. Nilainya merupakan **estimasi payload**, belum termasuk overhead HTTP/TLS, header `Content-Encoding` sesungguhnya, cache, latency, dan waktu dekompresi Android.

Kolom baru dalam JSON: `manifestGzipBytes`, `manifestBrotliBytes`, `totalShardGzipBytes`, `totalShardBrotliBytes`, `maxShardGzipBytes`, `maxShardBrotliBytes`, serta `approxTransferGzipBytes` dan `approxTransferBrotliBytes` per query. Fan-out tetap dihitung tanpa pemotongan hasil; query yang ditolak guard 32 shard tetap terdeteksi.

Tes regresi menolak ID shard manifest di luar rentang **sebelum pengunduhan awal** serta sebelum pengambilan shard tambahan keluarga akar. Ini menutup sebagian kewajiban integritas pada issue #74, tetapi tidak menyelesaikan indeks untuk query luas.

**Status:** PR lanjutan dibuka untuk verifikasi CI. Masukkan hasil kompresi aktual dari workflow dan run ID setelah CI berhasil; jangan menyalin angka sintetis awal sebagai angka kompresi baru. Gate distribusi data nyata, p50/p95 fan-out, uji Android, offline, no-JS dan aksesibilitas tetap terbuka.
