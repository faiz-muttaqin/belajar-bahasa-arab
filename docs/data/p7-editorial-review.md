# P7.5 — Alur keputusan sense-level secara privat

Status: perangkat review, **belum ada persetujuan 25 sense pertama**. Rujukan: [checkpoint P7](../plans/p7-dictionary-expansion.md), [kebijakan hak cipta](copyright-policy.md), dan [issue #79](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/79).

## Langkah reviewer

1. Gunakan snapshot P4 dan antrean P6 dengan checksum identik; keduanya disimpan di luar Git, bukan aset situs atau artefak CI. Siapkan batch dengan `scripts/p7_review_batch.py`. Batch sumber bisa mengandung glos Inggris pihak ketiga.
2. Baca sumber Arab asli per `lemmaId`/`senseId` dan `sourceLocations`; periksa POS, homograf, glos per sense dan register. Jangan menganggap lead ejaan dari P6 sudah membuktikan kesamaan makna.
3. Untuk setiap tugas, pilih `reviewStatus`: `pending`, `hold`, atau `ready`. Status `ready` hanya boleh dipakai setelah makna, glos Indonesia orisinal, dan register diperiksa. Isi semua `decisionDraft` serta `audit`; jangan menyalin definisi pihak ketiga.
4. Lengkapi berkas catatan hak sumber terpisah, dengan status `reviewed-for-private-staging` dan disposisi `research-only-no-redistribution`. Simpan ketidakpastian lisensi/atribusi pada catatan; ini **bukan izin publikasi**.
5. Jalankan compiler dan importer di bawah; kedua output harus baru dan berada di luar folder repositori. Periksa `duplicateCandidates` dan konflik rekonsiliasi sebelum mengambil keputusan berikutnya.

Contoh audit pada **satu tugas** (semua nilai ini hanya struktur, bukan klaim audit aktual):

```json
{
  "reviewStatus": "ready",
  "decisionDraft": {
    "entryId": "local-lemma-id",
    "localSenseId": "local-sense-id",
    "glossId": "glos Indonesia orisinal yang sudah diperiksa",
    "register": "unspecified",
    "checkedOn": "2026-11-22",
    "locator": "Arabic > bagian kelas kata > sense yang diperiksa"
  },
  "audit": {
    "sourceSenseChecked": true,
    "originalIndonesianGlossChecked": true,
    "registerEvidenceChecked": true,
    "reviewedBy": "identitas reviewer",
    "notes": "alasan dan batas interpretasi sense yang diperiksa"
  }
}
```

Nilai di atas ditempelkan pada tugas batch yang sudah memiliki ID snapshot. Mengisi flag `true` tanpa benar-benar memeriksa sumber adalah kesalahan editorial yang tidak bisa dideteksi otomatis oleh CI.

Contoh struktur metadata hak sumber yang **hanya** mengizinkan staging privat:

```json
{
  "status": "reviewed-for-private-staging",
  "rightsDisposition": "research-only-no-redistribution",
  "reviewedBy": "identitas reviewer",
  "reviewedOn": "2026-11-22",
  "sourceTerms": "hasil pemeriksaan syarat dan sumber lisensi",
  "attributionPlan": "rencana atribusi kontributor dan ekstraktor",
  "rightsNotes": "hak atas snapshot postprocessed masih ditahan untuk publikasi"
}
```

Perintah ketika input sudah diaudit secara nyata:

```sh
python3 scripts/p7_compile_decisions.py /tmp/p7-review-25.json /tmp/p7-rights.json /tmp/p7-decisions.json
bun scripts/prepare-dictionary-import.ts /tmp/nonverbs.json /tmp/p7-decisions.json /tmp/p7-staging.json
```

Compiler hanya memasukkan `ready` (bukan `pending` atau `hold`), menolak promosi register yang tidak didukung, dan mengharuskan metadata review. Importer memverifikasi checksum/revisi dan mengeluarkan `privateStagingOnly=true`, `publicationApproved=false`, serta `reviewStatus=draft`. Flag tersebut bukan verifikasi linguistik independen, bukan audit hukum dan tidak memberi hak untuk memasukkan hasilnya ke `static/`.

## Kriteria keluar dari tahap ini

Persetujuan penerbitan baru dapat dibahas setelah sumber/izin redistribusi, glos Indonesia per sense, register dan konflik ID diperiksa. Issue #74 untuk kinerja pencarian dan issue #79 untuk audit editorial tetap terbuka. Jangan menghitung tugas review sebagai lema atau sense yang sudah terbit.
