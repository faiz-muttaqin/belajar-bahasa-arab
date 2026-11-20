# P6 — ekspansi kosakata MSA, audit dan kandidat korpus

Status 20 November 2026: draft; batch 3–8 berada di satu PR, commit terpisah. Tidak semua
pekerjaan editorial selesai dan tidak ada entri yang dipromosikan ke research_verified.

## Cakupan

- Batch 3 menambah 17 kata bisnis/pekerjaan; batch 4 menambah 14 kata kesehatan/transportasi;
  batch 5 menambah sembilan kata berita/politik/lingkungan/sains. Total 223 entri, 177 nomina,
  34 sifat, 11 ungkapan, satu partikel; 19 tema; 71 entri mempunyai audit parsial.
- Batch 6 membuat antrean untuk 152 entri awal tanpa audit. URL lookup bukan bukti. Jika
  tersedia, input hasil P4 menambahkan ID sense/lemma dan locator; tidak mengubah status.
- Batch 7 menghitung frekuensi lema + UPOS pada UD Arabic-PUD r2.17. Sumber CC BY-SA 3.0,
  [deskripsi resmi](https://universaldependencies.org/treebanks/ar_pud/index.html).
  Korpus hanya 1.000 kalimat dari berita dan Wikipedia yang diterjemahkan; lema otomatis
  belum diperiksa manual. Tidak ada klaim frekuensi seluruh MSA atau bukti sense/register.
  Artefak mencatat sumber, versi, checksum input, atribusi dan locator token.
- Batch 8 mencocokkan kandidat korpus dengan katalog MSA dan, secara opsional, array
  DictionaryEntry P5. Hasil berupa lead per ejaan/POS, bukan deduplikasi sense atau
  relasi akar. P5 PR #67 belum merged saat kontrak diperiksa. Tidak bergantung pada branch P5.

## Reproduksi

```sh
bun scripts/p6-msa-audit.mjs /tmp/queue.json
# Opsional: gunakan hasil ekstraksi P4 schema 1, bukan dump kedua.
bun scripts/p6-msa-audit.mjs /tmp/queue.json /tmp/p4-nonverbs.json
curl -fL https://raw.githubusercontent.com/UniversalDependencies/UD_Arabic-PUD/r2.17/ar_pud-ud-test.conllu -o /tmp/pud.conllu
node scripts/p6-msa-corpus.mjs /tmp/pud.conllu /tmp/corpus.json
bun scripts/p6-msa-reconcile.mjs /tmp/corpus.json /tmp/reconcile.json
# Setelah ekspor array DictionaryEntry dari P5 tersedia:
bun scripts/p6-msa-reconcile.mjs /tmp/corpus.json /tmp/reconcile.json /tmp/p5.json
node --test scripts/p6-msa-*.test.mjs
```

CI mengunggah tiga laporan JSON, bukan teks korpus. Korpus dan keluaran tidak dipublikasikan
di katalog pembelajar. Kaikki dump postprocessed saat diperiksa 827,9 MB dan ditandai
deprecated; gunakan raw dump yang dipilih P4, simpan versi dan checksum, dan jangan membuat
ekstraktor kedua.

## Gate yang belum selesai

1. Audit manual/riset terhadap setiap klaim 152 starter: bentuk, arti, POS, register, contoh
   dan bentuk turunan yang ditampilkan. Antrean bukan audit selesai.
2. Koroborasi register modern dari sumber independen, analisis polisemi dan etimologi;
   pemetaan sense-level P5 dengan bukti masing-masing, tidak menggabungkan homograf.
3. Korpus PUD hanya pilot; perbanyak korpus MSA formal yang berlisensi sesuai kebijakan,
   validasi tokenisasi, domain, bias sampel, lema dan anotasi POS.
4. LM-04/05: bacaan kontekstual, 20–50 variasi latihan per bank, uji pengguna dan perangkat.
5. Penerbitan ribuan lema: review ID, dedup lintas koleksi, makna ID dan provenance,
   sharding/static performance serta CI. Jangan otomatis menerbitkan seluruh kandidat.

Tidak ada perubahan backend atau dependency. Hasil CI harus diperiksa sebelum merge.
