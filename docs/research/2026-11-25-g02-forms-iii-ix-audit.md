# Audit G-02 — keluarga verba Form III, V–X dan maṣdar mazīd

**25 November 2026 · materi draf (ADR-004 D-9) · sub-deliverable G-02 / OER-02a dan OER-02b**

Lanjutan dari [audit OER-02b](./2026-11-20-participle-source-audit.md). Implementasi oleh Sonnet 5.5; pemeriksaan kebahasaan oleh Fable 5.2 dalam dua putaran. Kalimat latihan adalah tulisan proyek; kamus hanya mendukung bentuk dan makna kata, bukan kalimatnya.

## Cakupan baru

**Halaman `/kaidah/participle/`:** dari 6 menjadi 15 keluarga verba dan dari 24 menjadi 60 latihan (4 per keluarga). Setiap keluarga kini memuat māḍī, muḍāri‘, maṣdar, isim fā‘il, isim maf‘ūl (atau “tidak lazim”), arti Indonesia, catatan pola, tautan entri dan ID baris data.

| Keluarga | Form | Jenis akar | Isim maf‘ūl                    |
| -------- | ---- | ---------- | ------------------------------ |
| سَاعَدَ     | III  | ṣaḥīḥ      | مُسَاعَدٌ                          |
| تَعَلَّمَ     | V    | ṣaḥīḥ      | مُتَعَلَّمٌ                          |
| تَبَادَلَ    | VI   | ṣaḥīḥ      | مُتَبَادَلٌ                         |
| اِنْقَطَعَ    | VII  | ṣaḥīḥ      | tidak lazim                    |
| اِنْتَظَرَ    | VIII | ṣaḥīḥ      | مُنْتَظَرٌ                          |
| اِخْتَارَ    | VIII | ajwaf      | مُخْتَارٌ (sama dengan isim fā‘il) |
| اِتَّصَلَ     | VIII | mithāl     | tidak lazim                    |
| اِسْتَقْبَلَ   | X    | ṣaḥīḥ      | مُسْتَقْبَلٌ (juga “masa depan”)     |
| اِحْمَرَّ     | IX   | ṣaḥīḥ      | tidak lazim                    |

Enam keluarga lama mendapat kolom maṣdar dan catatan pola: كَتَبَ, فَتَحَ, نَظَّمَ, أَرْسَلَ, اِسْتَخْدَمَ, بَاعَ.

**Halaman `/kaidah/masdar/`:** dari 5 menjadi 11 pasangan dan dari 20 menjadi 44 latihan. Pasangan baru: سَاعَدَ → مُسَاعَدَةٌ (مُفَاعَلَةٌ) dan قَاتَلَ → قِتَالٌ (فِعَالٌ) untuk Form III; تَعَلَّمَ → تَعَلُّمٌ (تَفَعُّلٌ); تَعَاوَنَ → تَعَاوُنٌ (تَفَاعُلٌ); اِنْقَطَعَ → اِنْقِطَاعٌ (اِنْفِعَالٌ); اِحْمَرَّ → اِحْمِرَارٌ (اِفْعِلَالٌ). Form VIII (اِفْتِعَالٌ) dan X (اِسْتِفْعَالٌ) sudah ada. Form II dan IV belum masuk halaman maṣdar.

## Sumber

Semua bentuk diambil dari data repo `data/wiktionary/verbs-mazid.json` (turunan entri Wiktionary Inggris via kaikki.org, CC BY-SA 4.0) dan glos Indonesia dari `verbs-mazid.id.json`; baris yang dipakai dicatat per butir pada kolom `dataId`. Tidak ada data dari `lex.zip` dan tidak ada kalimat dari buku teks berhak cipta.

Fable membuka 11 entri Wiktionary (sembilan keluarga ditambah قاتل dan تعاون untuk maṣdar) dan memeriksa bagian Arabic. Semuanya mencatat māḍī, muḍāri‘, maṣdar, isim fā‘il dan arti verba seperti yang dipakai di sini. Catatan per entri:

- **ساعد, تعلم, تبادل, انتظر, اختار, استقبل, قاتل:** tabel memuat isim maf‘ūl penuh. Pada اختار tabel mencatat مُخْتَار di kedua baris. Maṣdar yang tercatat: اِخْتِيَار, خِيرَة, خِيَار.
- **انقطع, احمر:** tabel menandai “no passive (?)”. Label “tidak lazim” di halaman mengikuti tanda tanya itu.
- **اتصل, تعاون:** tabel memuat pasif impersonal (مُتَّصَل, مُتَعَاوَن). Untuk اتصل, halaman menandai “tidak lazim” dan menjelaskan bahwa verba ini memakai بِـ. Tabel Wiktionary memberi label “sound”; analisis mithāl berasal dari akar و ص ل, bukan dari label entri.
- **Tidak ada di entri yang dikutip:** makna “timbal balik” untuk مُتَبَادَلٌ, makna “masa depan” untuk مُسْتَقْبَلٌ (ada di entri مستقبل, yang menyebutnya isim maf‘ūl dari اِسْتَقْبَلَ), bentuk feminin مُسَاعَدَةٌ (aturan beraturan, bukan baris tabel), dan glos “asisten” serta “pelajar”.

## Putaran 1 — 60 butir diperiksa

Fable memeriksa harakat, morfologi, bukti sumber, i‘rab, dan bahasa Indonesia untuk sembilan keluarga, 36 latihan partisip, 24 latihan maṣdar, teks kaidah, dan kolom baru pada enam keluarga lama. Bentuk kepala (māḍī, muḍāri‘, maṣdar, dua isim) benar semuanya.

Hasil: 15 butir perlu diperbaiki, enam butir ditandai tidak pasti (soal kewajaran).

| Butir                                   | Masalah                                                                                                | Perubahan                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| keluarga `ihmarra` dan `part-57`        | Catatan menyebut radikal kedua dan ketiga melebur bershadda. Yang bershadda adalah radikal ketiga (ر). | Teks diperbaiki.                                      |
| keluarga `ihmarra`                      | Jenis akar ditulis مُضَعَّفٌ. Akar ح م ر ṣaḥīḥ; penggandaan ada pada pola.                                  | Diganti صَحِيحٌ. Tes “akar mudhā‘af” dihapus.            |
| `part-40`                               | مُنْقَطِعَةً diterjemahkan “terputus-putus” (itu مُتَقَطِّعَة).                                                    | Kalimat diganti: أَصْلَحْنَا خُطُوطًا مُنْقَطِعَةً.                 |
| `part-60`                               | “mata-mata” berarti spy.                                                                               | Menjadi “mata itu”.                                   |
| kaidah “Pola dasar”                     | Klaim kasrah dan fatḥah sebelum radikal terakhir salah untuk مُخْتَارٌ dan مُحْمَرٌّ.                           | Dibatasi pada contoh ṣaḥīḥ, dua pengecualian disebut. |
| kaidah “Bentuk yang tidak lazim”        | Tidak menyebut اِتَّصَلَ بِـ.                                                                                | Ditambah catatan pasif impersonal.                    |
| keluarga `inqataa`                      | “pemutusan” adalah قَطْعٌ.                                                                                | “keterputusan; terhentinya”.                          |
| keluarga `ikhtara`                      | “berbentuk sama dalam tulisan” kurang tepat.                                                           | Sama persis dalam tulisan dan ucapan.                 |
| `part-54`                               | “kepala kantor” tidak konsisten dengan الْمُدِيرِ = direktur.                                              | “direktur perempuan”.                                 |
| `m23`                                   | “dua kata terakhir” untuk frasa dua kata.                                                              | Pertanyaan diperbaiki.                                |
| `m29`                                   | Jawaban tidak menjawab “apa bukti”.                                                                    | Jawaban memakai ḍammah pada ل maṣdar.                 |
| `m39`                                   | Muḍāf disebut بِسَبَبِ; yang benar سَبَبِ.                                                                    | Jawaban ditulis ulang.                                |
| `kataba`                                | “Tidak bisa ditebak” berlebihan.                                                                       | “tidak selalu bisa ditebak dari polanya”.             |
| `baa`                                   | Yā’ tidak tampak pada بَاعَ dan بَائِعٌ.                                                                    | Penjelasan diperinci.                                 |
| sumber `inqataa`, `ihmarra`, `ittasala` | Tanda “(?)” dan pasif impersonal tidak tercatat.                                                       | Kolom `section` diperbarui.                           |

Butir tidak pasti dan keputusannya:

- `part-39` (jalan terputus): diganti kalimat sambungan terputus karena badai.
- `part-46`: kalimat diganti pada putaran 2 (lihat di bawah).
- `part-56`: الْمُسْتَقْبِلَةُ sebagai kata benda orang jarang; diganti kalimat jamak (الْمُسْتَقْبِلُونَ يَنْتَظِرُونَ الْوَفْدَ).
- `part-32` (الدُّرُوسُ الْمُتَعَلَّمَةُ): dipertahankan, bentuk benar tetapi jarang; berfungsi sebagai latihan bentuk pasif. Tetap dicatat sebagai pertanyaan kewajaran.
- `m32`: “pembelajaran yang cepat”.
- `m35`: diganti مَعَ الْمَدَارِسِ (kolokasi lebih umum).

## Putaran 2 — butir yang berubah

Hanya butir yang diubah setelah putaran 1 dikirim ulang: enam keluarga, tujuh latihan partisip, tiga kaidah, lima latihan maṣdar. Semua OK kecuali:

- **`part-46`:** kalimat هُوَ مُخْتَارٌ لِهَذِهِ الْوَظِيفَةِ tetap ambigu karena isim fā‘il dapat memberi objek dengan لِـ. Diganti الْكِتَابُ مُخْتَارٌ لِلْمُسَابَقَةِ (subjek yang tidak dapat memilih), dengan jawaban yang menyatakan bahwa petunjuknya makna, bukan bentuk.
- **Dua kaidah:** “contoh ṣaḥīḥ” kini “contoh ṣaḥīḥ Form II sampai X”; yang melebur adalah wāw akar mithāl, bukan akarnya.
- **`m35`:** terjemahan menjadi “melalui kerja sama dengan sekolah-sekolah”.

Satu saran opsional juga diterapkan (`m32`: “pengajaran” untuk تَعْلِيمٌ). Saran opsional lain tidak diterapkan.

**Belum diperiksa ulang:** kalimat pengganti `part-46` dan teks `m35`, serta dua kalimat kaidah yang dikoreksi setelah putaran 2, diubah persis sesuai usulan Fable tetapi tidak dikirim ke putaran ketiga.

## Tetap tidak pasti

- Kewajaran dan frekuensi: خُطُوطٌ مُنْقَطِعَةٌ lawan مَقْطُوعَةٌ; الدُّرُوسُ الْمُتَعَلَّمَةُ; مُتَبَادَلٌ “timbal balik”. Belum dicek pada korpus. Perlu pembaca penutur asli atau ustadz.
- Makna “timbal balik” untuk مُتَبَادَلٌ dan glos “asisten”, “pelajar”: standar dalam MSA tetapi tidak ada pada entri yang dikutip. Entri متبادل tidak dapat dibuka pada saat audit.
- Penulisan hamzat al-waṣl tengah frasa (اِنْقِطَاعِ, الِاحْتِرَامُ) mengikuti konvensi Wiktionary, belum dicocokkan dengan aturan ortografi repo.
- Tampilan harakat bertumpuk (مُحْمَرٌّ, مُهِمٌّ) pada font situs belum diuji pada perangkat nyata (menunggu tinjauan manual).
- Fable memeriksa teks, bukan tampilan; tidak ada tinjauan pengajar dan uji pelajar.

## Belum selesai — jangan tutup OER-02 atau G-02

- Form II dan IV pada halaman maṣdar; akar nāqiṣ, lafīf, mahmūz; pola lain di luar yang dibahas; pengamalan (عمل) isim fā‘il dan maf‘ūl.
- Tinjauan pengajar dan uji pelajar. [Issue #55](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/55), [issue #15](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/15).
