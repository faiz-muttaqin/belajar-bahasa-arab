# P7 — Ekspansi kamus skala besar

Status: dimulai 20 November 2026. Baseline main: merge PR #69, `4437a76`. Dokumen ini adalah checkpoint lintas sesi; perbarui setelah setiap batch. Lihat [rencana induk](../data/dictionary-expansion.md), [aturan hak cipta](../data/copyright-policy.md), dan AGENTS.md.

## Baseline dan batasan

- P1 #62: pemisahan provenance pembanding/utama; audit lisensi substantif tetap berjalan.
- P2 #65: ekstraktor lengkap Lane dan artefak CI, bukan glos Indonesia.
- P3 #66: 537 rekaman baseline, 36 draf diterapkan, 501 masih unknown; locator bukan bukti bab/makna.
- P4 #64: ekstraktor nonverba, belum ada hasil snapshot nyata.
- P5 #67: lima lema/11 sense pilot, adapter keputusan review, rekonsiliasi, lazy shard; belum ada bulk import nyata.
- P6 #63/#68/#69: 223 entri draf, 19 tema, 71 audit parsial, 152 starter belum diaudit; korpus PUD pilot dan rekonsiliasi kandidat.
- Semua PR di atas merged; tidak berarti seluruh pekerjaan editorial selesai.

## Urutan dan checkpoint

| ID | Scope dan acceptance gate | Dependensi | Status |
| --- | --- | --- | --- |
| P7.1 | Eksekusi P4 pada dump nyata; rekam URL, varian raw/postprocessed, tanggal, checksum, statistik POS/register/bucket/ambigu/duplikat; audit lisensi dan contoh nyata | P4 | Pipeline direncanakan; hasil belum ada |
| P7.2 | Audit 501 verba tersisa per batch; makna/bab/locator didukung; hold jika bukti tidak cukup; Qabas reference-only | P2/P3 | Terbuka |
| P7.3 | Audit 152 starter dan perluas korpus MSA formal berlisensi; rekonsiliasi kandidat tanpa auto-merge | P6; P7.1 untuk lead tambahan | Terbuka |
| P7.4 | Integrasi nyata Lane/P4/MSA/katalog lama via P5; mapping ID eksplisit, konflik dan lisensi diperiksa | P7.1–3 per batch | Terbuka |
| P7.5 | Glos Indonesia per sense, definisi/contoh orisinal, sumber per klaim; batch yang dapat direview | P7.4 per batch | Terbuka |
| P7.6 | Audit kualitas, register, duplikasi, provenance, kompatibilitas lisensi dan keputusan hold | P7.5 per batch | Terbuka |
| P7.7 | Benchmark build, ukuran manifest/shard, fan-out, latency, no-JS/SEO untuk dataset nyata; fixture sintetis hanya benchmark awal | P5/P7.4 | Terbuka |
| P7.8 | Publikasi bertahap serta integrasi konteks pembelajaran LM-04/05 dan 20–50 variasi latihan per bank | P7.6–7 per batch | Terbuka |

## Cara lanjut jika sesi terputus

1. Baca dokumen ini, cek main dan PR terbuka beserta head SHA dan latest CI.
2. P7.1–3 independen secara editorial; gabungkan pekerjaan kecil yang memakai snapshot atau workflow sama; pisah commit per batch. Jangan mengulang unduhan P4 untuk P6 jika output tersedia.
3. Sebelum commit batch, catat input (URL, tanggal/revisi, checksum), output/count, keputusan, sisa dan sumber; jangan menandai selesai berdasarkan PR merged saja.
4. Buka PR segera, gunakan GitHub Actions sebagai gate; merge hanya latest CI hijau dan tidak konflik. Jangan tempel dump mentah atau hasil riset proprietary ke Git/artefak publik.
5. Setelah CI selesai, catat run ID, hasil dan SHA; jika source berubah, jangan diam-diam menganggapnya snapshot lama. Review batch berikutnya dari checkpoint pertama yang belum selesai.

## Target dan definisi hitungan

10.000 → 25.000 → 50.000 lema unik adalah milestone bersyarat, bukan target wajib atau klaim bahwa jumlah tersebut tersedia. Hitung lema, sense, akar, bentuk infleksi, kandidat dan entri learner secara terpisah. Jangan menebak akar, menggabungkan homograf, menyamakan unspecified dengan MSA atau mempromosikan draf hanya karena CI lulus.

## Log checkpoint

- 20 November 2026: #69 merged setelah konflik tracker diatasi dan tiga workflow lulus. P7 dimulai dari main. Prioritas pertama P7.1: jalankan extractor pada sumber nyata dan gunakan hasil internal untuk antrean P6; keluarkan hanya laporan agregat sampai audit izin redistribusi selesai. Snapshot dan hasil aktual belum diklaim.
