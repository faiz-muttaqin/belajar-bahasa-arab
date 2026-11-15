# D-04b — Audit hubungan frasa dan klausa

**Tanggal:** 15 November 2026. **Status:** domain-validator pilot, bukan editor seluruh G-01–G-05. Semua contoh Arab masih **draft**, menunggu tashih guru. Lanjutan [issue #24](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/24).

## Masalah dan keputusan

Bentuk isim berkasus benar belum tentu dapat disisipkan ke frasa yang lebih panjang tanpa memeriksa **hubungan antar-slot**. PR ini memperkenalkan modul **phrase-relation-constraints.ts**, melengkapi validator D-04a. Tidak ada aturan yang merangkai huruf atau menurunkan harakat secara otomatis.

| API | Bukti yang diwajibkan | Fallback |
| --- | --- | --- |
| **evaluateIdafa** | Muḍāf dan muḍāf ilaih memiliki bentuk sumber; kasus muḍāf ditetapkan oleh konteks; muḍāf ilaih jarr; status construct dan ketiadaan al-/tanwin dinyatakan eksplisit; ejaan pasangan tercatat persis dalam fixture | Tolak dan jelaskan metadata atau pasangan belum dikurasi |
| **evaluatePrepositionalPhrase** | Huruf jar dari pilot فِي/عَلَى, komplemen dengan kasus jarr, dan pasangan bentuk tercatat per contoh | Tidak mengubah kasus atau memasangkan awalan secara otomatis |
| **resolveAttachedPossessive** | Host ID msa-kitab, suffix ID, dan **bentuk kata utuh** yang sama persis dengan tabel attachedPronouns | Tolak hasil penyambungan string yang tidak tercatat; tolak kasus yang belum dianotasi |
| **evaluateRelativeClause** | Antecedent ma‘rifah mufrad, bentuk الَّذِي/الَّتِي sesuai gender, seluruh token ṣilah dan jenis dhamir kembali cocok dengan satu contoh G-05 | Tolak pergantian satu token yang merusak hubungan kalimat |

## Contoh yang diikat ke konten aktual

- **G-03:** بَابُ الْبَيْتِ (muḍāf rafa‘, muḍāf ilaih jarr); فِي الْبَيْتِ (huruf jar + isim jarr); فِي كِتَابِ الطَّالِبِ (dua isim sama-sama jarr karena sebab berbeda). Rujukan kaidah dan contoh berasal dari **src/lib/content/phrase-rules.ts**.
- **Kata ganti sambung:** كِتَابُهُ dan كِتَابِي dari nilai sel **src/lib/content/reference-isim.ts**, bukan dari menambahkan suffix ke lema sembarang. Bentuk alternatif, termasuk perubahan i‘rab pada host, belum diaktifkan.
- **G-05:** relative-male, relative-female, relative-object-return pada **src/lib/content/clause-rules.ts**; bentuk قَرَأْتُهُ adalah satu token ortografis dengan dhamir objek yang kembali ke kepala frasa.

## Pembatasan penting

1. Muḍāf **tidak selalu marfū‘**. Pilihan kasusnya bergantung pada fungsi frasa dalam susunan yang lebih besar.
2. Iḍāfah **tidak selalu bermakna kepemilikan**; pasangan tidak terdaftar berarti belum dikurasi untuk latihan, bukan salah secara universal.
3. Dhamir ـهُ dalam قَرَأْتُهُ memiliki fungsi penghubung balik (*‘ā’id*) yang tidak bisa disamakan begitu saja dengan posesif pada كِتَابُهُ.
4. Saat kata kepala berubah, isim mawṣūl dan ṣilah belum bisa diubah dengan satu operasi; PR ini memblokir pergantian parsial yang tidak terbukti.
5. Evaluator memerlukan metadata morfologi eksplisit dan sumber setiap token. Pengujian unit memeriksa kontrak dan fixture, **bukan** membuktikan keabsahan semua contoh bahasa Arab.

## Kelanjutan

**D-05a** akan menggunakan validator pada sebagian contoh G-01/G-03 yang memiliki data ejaan dan relasi terkurasi. Contoh yang belum memiliki metadata slot tetap statis. D-05b/c mencakup kalimat dan klausa; D-06 untuk progres lokal dan optimasi kamus. Glosarium PR #33 tidak diubah dalam PR ini.

Lihat [roadmap](../plans/dynamic-example-slots.md) dan [audit D-04a](dynamic-example-constraints-audit.md).
