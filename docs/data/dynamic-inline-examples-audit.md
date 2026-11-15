# D-05a — Audit integrasi pemilih kata langsung pada contoh G-01/G-03

**Tanggal:** 15 November 2026. **Status:** pilot UI statis + interaktif; semua contoh Arab dan interpretasi gramatikal tetap **draft**, menunggu peninjauan guru bahasa Arab.

## Perubahan

Komponen **GrammarExample** (G-01) dan **PhraseGloss** (G-03) kini memakai pemilih kata yang sama, **InlineCuratedExamplePicker**. Setelah hydration, kata yang memiliki alternatif berbukti mendapat tombol **Ganti kata** → dialog dengan pencarian Arab tanpa harakat/Indonesia, bentuk seluruh frasa, terjemahan dan rujukan kaidah. Perubahan hanya di kartu tersebut, tidak disimpan, dan dapat direset. Keyboard Escape / tombol Tutup mengembalikan fokus ke pemicu.

**HTML hasil prerender tetap berisi contoh awal, glos, arti, i‘rab dan penjelasan** dari data materi. Tanpa JavaScript pemilih tidak muncul dan seluruh bacaan, latihan serta tautan tetap berfungsi. Dialog tidak memaksa registrasi, penyimpanan, network request, atau transpilasi infleksi.

## Daftar contoh yang dapat berubah

| Halaman                | Family dan sumber yang telah ditulis                                                  | Batas perubahan                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| G-01 `nat-manut`       | `sifat-nakirah` ⇄ `sifat-feminin`                                                     | Satu pasangan man‘ūt + na‘at (buku baru ⇄ sekolah besar)                                                    |
| G-01 `mubtada-khabar`  | `khabar-buku` ⇄ `khabar-sekolah`                                                      | Khabar nakirah meskipun mubtada ma‘rifah                                                                    |
| G-01 `idafah`          | `idafah-buku` ⇄ `idafah-pintu`                                                        | Muḍāf dan muḍāf ilaih harus diganti sebagai **pasangan terkurasi**                                          |
| G-03 `marifah-nakirah` | `indefinite-book` ⇄ `definite-book`                                                   | Lema buku; bentuk marfū‘ nakirah vs ma‘rifah yang sudah ditulis                                             |
| G-03 `naat-agreement`  | `indefinite-adjective`, `definite-adjective`, `feminine-adjective`, `nonhuman-plural` | Perhatikan ma‘rifah/nakirah serta bentuk feminin tunggal pada كُتُبٌ                                           |
| G-03 `idafah-jar`      | `preposition-house` ⇄ `preposition-idafah`                                            | Frasa **فِي** + isim majrūr dibanding **فِي** + iḍāfah lengkap yang kedua isimnya majrūr karena sebab berbeda |

**Tidak ada tombol palsu:** jika satu slot tetap sama pada semua variasi terkurasi (misalnya فِي) atau tidak punya alternatif (misalnya token ketiga yang hanya ada di satu bingkai), tombol Ganti kata disembunyikan. Pilih kata yang memang berubah, bukan partikel yang tetap.

**Tidak otomatis aktif:** G-03 `idafah-door`, contoh dual/jamak yang belum mempunyai alternatif pasangan dalam korpus, serta contoh G-04/G-05. Kartu tersebut tetap statis. Keputusan ini lebih aman daripada mengarang perubahan i‘rab dari regex atau memutar 8k+ lema kamus di modal.

## Kontrak dan pemeriksaan

- Registry `src/lib/domain/grammar/inline-curated-examples.ts` mengaitkan ID contoh ke **teks Arab asli secara persis**, ID lema, kelas kata, fitur morfologi manual, sumber dan family yang diizinkan. Perubahan spelling di sumber membatalkan pilihan hingga audit.
- `evaluateAdjectiveAgreement()` (D-04a) digunakan membedakan na‘at mengikuti ma‘rifah/nakirah dari khabar yang tetap nakirah; jumlah plural bukan manusia diberi **animacy eksplisit**.
- `evaluateIdafa()` serta `evaluatePrepositionalPhrase()` (D-04b) menguji pasangan konstruksi dan dua sebab jarr terpisah. Bentuk G-01 tidak memiliki kolom i‘rab pada token, sehingga metadata berasal dari penjelasan yang telah ditulis dan **tetap audit-level draft**, bukan certified inflection.
- Sebuah tindakan pada kata tetap memilih **contoh utuh yang sumbernya ada**, tidak hanya mengganti huruf dalam token terpisah. Hal ini penting pada relasi na‘at/khabar/iḍāfah dan kasus jamak taksir. Modal menjelaskan bahwa pasangan yang tergantung bisa berubah bersamaan.
- Pilihan hanya ditemukan di family yang sama; data ID lain ditolak bahkan jika ejaan atau POS tampak mirip. Tidak ada IndexedDB untuk state sementara D-05a, sesuai D-06.
- Pengujian unit mencakup konsistensi registry, penolakan ejaan berubah, metadata gender hilang, ketidakcocokan kasus, aturan jamak dan sumber; Playwright mencakup G-01/G-03, pencarian, modal, reset, no-JS 375 px.

## Tahap berikutnya

**D-05b** dapat memperkenalkan `templateId/slotId` bersama untuk G-04 dan subset G-05 yang punya data pasangan klausa, kemudian D-05c mengaudit aksesibilitas dan variasi bahasa. Untuk frame yang tidak memiliki alternatif lengkap, lebih baik _contoh statis_ daripada membuka selector palsu.

**D-06** terpisah: progres/hasil latihan berbasis IndexedDB existing, pencarian lazy katalog besar, dan audit offline/assistive-technology. Tidak ada klaim audio/speech assessment atau penerbitan konten approved.

Rujukan: [roadmap dynamic examples](../plans/dynamic-example-slots.md), [audit D-04a](dynamic-example-constraints-audit.md), [audit D-04b](dynamic-example-phrase-relations-audit.md).
