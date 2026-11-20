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

- **P7.1 — Pipeline dibuat; hasil CI belum ada.** Eksekusi P4 pada dump nyata; rekam URL, varian raw/postprocessed, tanggal, checksum, statistik POS/register/bucket/ambigu/duplikat; audit lisensi dan contoh nyata. Dependensi: P4.
- **P7.2 — Terbuka.** Audit 501 verba tersisa per batch; makna/bab/locator didukung; hold jika bukti tidak cukup; Qabas reference-only. Dependensi: P2/P3.
- **P7.3 — Terbuka.** Audit 152 starter dan perluas korpus MSA formal berlisensi; rekonsiliasi kandidat tanpa auto-merge. Dependensi: P6; P7.1 untuk lead tambahan.
- **P7.4 — Terbuka.** Integrasi nyata Lane/P4/MSA/katalog lama via P5; mapping ID eksplisit, konflik dan lisensi diperiksa. Dependensi: P7.1–3 per batch.
- **P7.5 — Terbuka.** Glos Indonesia per sense, definisi/contoh orisinal, sumber per klaim; batch yang dapat direview. Dependensi: P7.4 per batch.
- **P7.6 — Terbuka.** Audit kualitas, register, duplikasi, provenance, kompatibilitas lisensi dan keputusan hold. Dependensi: P7.5 per batch.
- **P7.7 — Terbuka.** Benchmark build, ukuran manifest/shard, fan-out, latency, no-JS/SEO untuk dataset nyata; fixture sintetis hanya benchmark awal. Dependensi: P5/P7.4.
- **P7.8 — Terbuka.** Publikasi bertahap serta integrasi konteks pembelajaran LM-04/05 dan 20–50 variasi latihan per bank. Dependensi: P7.6–7 per batch.

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

- Batch 1: workflow `p7-nonverb-pr.yml` mengambil snapshot postprocessed Kaikki sebagai riset internal, mengulang ekstraksi dan memakai output yang sama untuk P6. Laporan publik hanya agregat, checksum dan metadata; bukan glos atau baris kandidat. Sumber upstream mutable: cek deklarasi dump/ekstraksi sebelum dan sesudah unduh, rekam hash aktual; raw dump dan audit hak data tambahan tetap pending. Sumber: [Kaikki Arabic](https://kaikki.org/dictionary/Arabic/index.html), [raw downloads](https://kaikki.org/dictionary/rawdata.html).
