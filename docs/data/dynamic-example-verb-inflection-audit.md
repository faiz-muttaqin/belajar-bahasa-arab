# Audit D-03 — Pemilihan bentuk fi‘il terkontrol

**Tanggal:** 15 November 2026 · **Status:** pilot terbatas / seluruh konten bahasa Arab tetap \`draft\` menunggu guru bahasa Arab. Lanjutan dari D-02 dan G-06.

## Batas engine

\`src/lib/domain/grammar/verb-frames.ts\` adalah **selector bentuk terkurasi**, bukan konjugator atau mesin yang menebak semua ṣīghah. Ia menerima ID lema dan frame pilihan, mengembalikan \`WordSurface\` berfitur eksplisit atau \`undefined\` bila belum ada rujukan. Bentuk yang tidak tersedia dibuat **disabled**, bukan dihasilkan lewat mengganti harakat akhir.

| Lema fi‘il | Māḍī | Muḍāri‘ marfū‘ | \`لَمْ\` + majzūm | \`لَنْ\` + manṣūb | Amr orang kedua |
|---|---|---|---|---|---|
| \`fiil-kataba\` كَتَبَ | كَتَبَ | يَكْتُبُ | لَمْ يَكْتُبْ | لَنْ يَكْتُبَ | **Belum tersedia** |
| \`fiil-qaraa\` قَرَأَ | قَرَأَ | يَقْرَأُ | **Belum tersedia** | **Belum tersedia** | **Belum tersedia** |
| \`fiil-fataha\` فَتَحَ | فَتَحَ | يَفْتَحُ | **Belum tersedia** | **Belum tersedia** | اِفْتَحْ |

Sumber yang **dipakai** dalam repo:

- Māḍī dan muḍāri‘ diambil dari entri sharaf sendiri (\`src/lib/content/sharaf.ts\` dan \`src/lib/content/reference.ts\`), terhubung ke sumber halaman referensi tiap lema/bab. Ini sumber dari tabel/entri yang masih draft, bukan validasi eksternal lengkap.
- Bentuk \`لَمْ يَكْتُبْ\` dan \`لَنْ يَكْتُبَ\` **harus sama persis** dengan token contoh G-04 (\`src/lib/content/sentence-rules.ts\`, kelompok negasi) dan mengikuti sumber pelajaran G-04 yang dilampirkan; tidak digeneralisasi untuk akar hamzah dan verba mu‘tal.
- \`اِفْتَحْ\` **harus ditemukan secara eksplisit** di \`tashrifIstilahi\`/entri \`fiil-fataha\`. Bentuk \`اُكْتُبْ\` atau \`اِقْرَأْ\` tidak ditambah hanya karena pola kebahasaan mungkin mengizinkan—belum ada entri sumber dalam indeks pilot.
- \`validateVerbFrameRegistry()\` memastikan ejaan bentuk hasil selector cocok dengan daftar bentuk kecil yang ditetapkan untuk pengajaran. Unit test mengecek status \`draft\`, provenance, gender, orang, number, mood, dan fallback.
- Tiga fi‘il yang didukung **bukan seluruh verba** pada bulk lexicon. Untuk verba di luar whitelist, selector selalu mengembalikan \`undefined\`.

## Implikasi sintaksis untuk editor contoh

1. Māḍī dan muḍāri‘ menggunakan kerangka kalimat VSO dengan fā‘il maskulin tunggal marfū‘ dan maf‘ūl bih manṣūb; mood **hanya untuk muḍāri‘**.
2. \`لَمْ\` mengubah status muḍāri‘ menjadi majzūm dan menegasikan tindakan lampau; \`لَنْ\` mengubahnya menjadi manṣūb dan menegasikan masa depan. Partikel ditampilkan sebagai **token ortografis terpisah**, bukan digabung sembarangan dengan fi‘il.
3. Amr berubah ke orang kedua maskulin tunggal: fā‘il \`أَنْتَ\` **tersirat** sehingga token fā‘il eksplisit dihilangkan, sedangkan maf‘ūl bih tetap manṣūb. Ini mencegah kalimat imperatif yang salah secara struktur.
4. Mengganti verba saat frame sebelumnya tak ada di lema baru mengembalikan ke \`past\` dan memberi pesan. Objek juga disesuaikan jika valensi contoh melarang pasangan lama.
5. Teks asli tersaji dalam HTML yang diprerender dan dapat dibaca tanpa JavaScript; selector hanya aktif setelah hydration.

## Belum dilakukan

- Dhamir lengkap (seluruh orang/gender/jumlah), fi‘il mu‘tal/mahmūz bertashrif penuh, plural/dual, pasif, nāhī, klitik pronomina, dan tanda jazm/nashab selain 3ms belum cukup bukti bentuk untuk dibuka secara umum.
- Terjemahan Indonesia untuk imperfect bersifat terbuka terhadap konteks; selector memberi label \`nonlampau\` dan tidak otomatis menyatakan *sedang* / *akan* tanpa konteks.
- Layanan generator umum / NLP, menyulap 22 pola wazan menjadi ribuan konjugasi, atau menampilkan hasil inference tanpa review tidak termasuk scope.
- Rollout ke semua kartu materi G-01–G-05 butuh D-04 / D-05 (constraint agreement, slot i‘rab, klitik, dan semantic roles). Penyimpanan progres menunggu D-06.

**Catatan verifikasi:** semua contoh masih draft. Unit/E2E yang hijau memvalidasi kesesuaian implementasi dengan kontrak dan contoh terkurasi, bukan menyatakan konten telah ditashih oleh penutur/guru Arab.

Lihat [roadmap dynamic examples](../plans/dynamic-example-slots.md) dan [issue #24](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/24).
