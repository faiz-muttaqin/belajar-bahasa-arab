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

- **P7.1 — Ekstraksi nyata berhasil; audit masih terbuka.** Eksekusi P4 pada dump nyata; rekam URL, varian raw/postprocessed, tanggal, checksum, statistik POS/register/bucket/ambigu/duplikat; audit lisensi dan contoh nyata. Dependensi: P4.
- **P7.2 — Retrieval klasik selesai tahap awal, audit semantik terbuka.** Audit 501 verba tersisa per batch; makna/bab/locator didukung; hold jika bukti tidak cukup; Qabas reference-only. Dependensi: P2/P3.
- **P7.3 — Retrieval 136/152 dan audit gap POS selesai; audit editorial terbuka.** Audit 152 starter dan perluas korpus MSA formal berlisensi; rekonsiliasi kandidat tanpa auto-merge. Dependensi: P6; P7.1 untuk lead tambahan.
- **P7.4 — Preflight kompatibilitas snapshot nyata selesai; impor ber-review belum ada.** Integrasi nyata Lane/P4/MSA/katalog lama via P5; mapping ID eksplisit, konflik dan lisensi diperiksa. Dependensi: P7.1–3 per batch.
- **P7.5 — Terbuka.** Glos Indonesia per sense, definisi/contoh orisinal, sumber per klaim; batch yang dapat direview. Dependensi: P7.4 per batch.
- **P7.6 — Terbuka.** Audit kualitas, register, duplikasi, provenance, kompatibilitas lisensi dan keputusan hold. Dependensi: P7.5 per batch.
- **P7.7 — Benchmark sintetis lulus; guard fan-out sementara dalam review; indeks lengkap dan uji data nyata/perangkat pending.** Benchmark build, ukuran manifest/shard, fan-out, latency, no-JS/SEO untuk dataset nyata; fixture sintetis hanya benchmark awal. Dependensi: P5/P7.4.
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

- Batch 1, CI run [44718897669](https://github.com/faiz-muttaqin/belajar-bahasa-arab/actions/runs/44718897669), head `6ed0ef6`: 868082330 bytes, 233417 lines, 17347 candidate lemma keys, 29319 distinct sense keys (29320 candidate rows), 14 duplicate rows collapsed, 12714 form/variant rows, 2843 names, 104 dialect and 108 missing gloss. 1130 candidate rows historical/classical, 28190 unspecified; 1425 ambiguous canonical, 122 no canonical. Nomina 12642 lemma keys, adjektiva 3785. P6: 136 of 152 with retrieval leads, 16 without. Two extracts identical. Published new entries: zero.
- SHA-256 input: `19eee17681c23b3da039878ee7c970d93b75a339989a17a842f14aa7f44ea236`; output: `14cc72d910b78ddc8a2c3396b419ad351ac42ab1fde31bd79e99bfde3e5f3b3d`. Main verification run 44718897488 failed only on missing plan inventory; fix inventory, rerun before merge.

- 21 November 2026: PR #70 merged `f22e197`, #71 merged `72bb8e2` setelah semua CI hijau. P7.1 retrieval sukses tetapi audit hak redistribusi dan klasifikasi belum disetujui. Hasil P7.2 dari run [44734683395](https://github.com/faiz-muttaqin/belajar-bahasa-arab/actions/runs/44734683395): 501 active unknown -> 15 same-bab exact spelling leads, 5 weak/possible conjunction leads, 29 different-bab leads, 3 prior holds, 449 no explicit bab marker. **0 arti baru disetujui**. Output markernya baru kandidat; wajib baca konteks asli untuk menyingkirkan homograf, penanda salah dan kesalahan akar/bab.
- Batch berikutnya (PR P7.3/P7.4): `scripts/p7_preflight.py` mengaudit snapshot P4 nyata yang sama sebelum memulai impor P5. Menghitung hambatan POS, canonical ambigu/tidak ada, upstream ID ganda, glos sumber, provenance, register dan tabrakan ejaan indikatif; P6 dirinci menurut kelas kata untuk 16 yang belum punya kandidat. Output hanya agregat, tidak ada definisi/kata, tanpa keputusan review otomatis. Jika CI lolos, rekam angka yang benar di sini sebelum memberi pekerjaan penelaahan per batch.
- Acceptance gate P7.4 berikutnya: pilih sumber raw/snapshot yang memenuhi lisensi, audit calon sense secara manual, sediakan berkas keputusan ber-ID dan locator nyata serta `licenseReview`, jalankan `scripts/prepare-dictionary-import.ts` di luar repo lalu benchmark shard. Semua ini masih pending dan **jangan** dianggap rampung oleh laporan preflight.

- 21 November 2026: PR #72 merged `127b6f8` setelah dua workflow lulus. [P7 preflight run 44905111271](https://github.com/faiz-muttaqin/belajar-bahasa-arab/actions/runs/44905111271): 29.320 candidate rows, **27.771 lolos gate struktural awal**, 16.407 kunci lema, 1.000 kelompok tabrakan ejaan perkiraan. Kategori penahanan disjungtif: 1.425 canonical ambigu/tidak cocok, 122 tanpa canonical dan 2 identitas upstream ganda. Dari 152 starter MSA: 136 punya candidate lead; 16 belum (11 ungkapan, 3 nomina, 2 adjektiva). Angka ini bukan keputusan publikasi. **0 glos disetujui/diimpor**.
- P7.7 batch benchmark: `scripts/p7-dictionary-benchmark.ts` dan workflow P7 tersendiri mengukur ukuran manifest/shard, RSS, waktu build, serta fan-out query pada 10k/25k/50k **entri sintetis**, bukan dataset Arab nyata. Status validasi dan metrik dicatat setelah CI. Sumber dokumentasi: [benchmark](../data/p7-shard-benchmark.md). Longgar untuk report runtimes, ketat untuk integritas shard. Sebelum publikasi perlu dataset nyata, lisensi, QA data dan tes perangkat Android.

- 21 November 2026: PR #73 merged `c6285bf` (CI benchmark, snapshot P7, roadmap hijau). [Run 44905689817](https://github.com/faiz-muttaqin/belajar-bahasa-arab/actions/runs/44905689817) pada data **sintetis satu sense per lema**: 10k/25k/50k entri menghasilkan 79/196/391 shard, manifest 160.059/410.599/839.700 bytes, JSON shard total 5.857.637/14.662.754/29.341.293 bytes; waktu build teramati 125/316/513 ms pada runner. Ini **bukan** ukuran produksi atau pengalaman mobile. Pada 50k sintetis, query 1 huruf atau glos dengan prefiks umum memilih seluruh 391 shard (~29,3 MB tanpa kompresi). Blocker dicatat di [issue #74](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/74): desain indeks yang membatasi fan-out tanpa kehilangan hasil, benchmark pada data nyata, kompresi dan uji Android sebelum publikasi masif.
- Status akhir sesi: P7.1 ekstraksi nyata selesai tahap awal; P7.2 retrieval 501 verba selesai tahap awal (15 prioritas, glos tambahan 0), P7.3 136/152 punya kandidat, P7.4 27.771 sense lolos gate struktural awal (tetap belum melalui review), P7.5–6/8 terbuka, P7.7 measurement saja selesai. Keputusan lisensi pascaproses dan sumber raw/atribusi masih terbuka. **Jangan** menandai P7 lengkap atau menerbitkan seluruh kandidat otomatis.

- 21 November 2026, pekerjaan lanjutan P7.7 pada branch `feat/p7-search-fanout-guard`: pembatas pemuatan otomatis >32 shard memberi hasil `query too broad` yang eksplisit; tes regresi memastikan tidak ada hasil parsial dan pencarian ulang spesifik tetap berfungsi. Benchmark menandai query yang perlu dipersempit. Ini **belum** memenuhi seluruh issue #74 dan **belum** diuji pada Android/korpus nyata. Selalu perbarui status berdasarkan latest CI sebelum merge dan jangan mengubah status P7.8.
