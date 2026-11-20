# Kebijakan hak cipta dan sumber kamus

**20 November 2026 · Berlaku untuk semua konten kamus dan kosakata · [ADR-004 D-10](../decisions/0004-content-decisions.md#d-10-teks-kamus-dan-sumber-pihak-ketiga)**

Dokumen ini adalah latar belakang dan aturan kerja proyek, bukan pendapat hukum. Untuk redistribusi kamus modern dalam jumlah besar, minta izin tertulis atau pendapat ahli HKI lebih dulu.

## Yang dibedakan

| Jenis isi                                                    | Status umum                                                      |
| ------------------------------------------------------------ | ---------------------------------------------------------------- |
| Kosakata, akar, wazan, bentuk tashrif, arti dasar            | Fakta kebahasaan; boleh dipakai dan dipublikasikan               |
| Penjelasan, glos, dan contoh yang kita tulis sendiri         | Karya proyek (CC BY-SA 4.0, ADR-004 D-1)                         |
| Redaksi definisi dan contoh kalimat kamus modern             | Berpotensi dilindungi; kutip seperlunya dengan rujukan           |
| Teks asli kitab klasik (Lisān, Ṣiḥāḥ, Maqāyīs, Tāj al-ʿArūs) | Umumnya domain publik; tahqiq dan catatan editor bisa dilindungi |
| Kompilasi atau basis data kamus                              | Bisa punya syarat sendiri, terlepas dari isi kamusnya            |

Dasar yang dirujuk riset: UU No. 28 Tahun 2014 tentang Hak Cipta, terutama Pasal 44 ayat (1) tentang penggunaan untuk pendidikan dan penelitian dengan sumber dicantumkan dan tanpa merugikan kepentingan wajar pemegang hak. Status nonkomersial membantu, tetapi bukan izin tanpa batas, karena repository publik bisa diunduh dan disebarkan ulang.

## Aturan kerja

1. **Domain publik:** boleh disalin lengkap, dengan pengarang, kitab, edisi, dan sumber digital yang jelas.
2. **Berlisensi terbuka:** boleh disalin atau diubah sesuai lisensinya. Simpan di `data/third-party/<sumber>/` bersama `README.md` berisi atribusi dan lisensi. Folder itu mengikuti lisensinya sendiri, bukan lisensi kode situs.
3. **Kamus modern:** dipakai sebagai rujukan untuk menyusun definisi sendiri dan mengambil fakta kebahasaan. Kutipan langsung hanya jika diizinkan oleh lisensi atau pengecualian hukum yang berlaku, pendek, diperlukan dan proporsional. Batas internal 120 karakter per kutipan di `audit.note` bukan batas aman menurut hukum.
4. **Deskripsi sendiri:** tidak dibatasi panjangnya selama ditulis sendiri, bukan salinan atau terjemahan utuh redaksi kamus yang dilindungi.
5. **Sumber tanpa kejelasan lisensi:** jangan impor teks lengkapnya ke repository publik.
6. **Verifikasi:** setiap makna punya rujukan yang benar-benar mendukung kata, bentuk, bab, dan maknanya (ADR-004 D-9).
7. **Basis data lokal** `lex.zip` / `db.sqlite` (tujuh kamus, asal tidak diketahui) tidak boleh di-commit atau didistribusikan.

## Daftar sumber

Sumber kebenaran: [`data/sources/registry.json`](../../data/sources/registry.json). Setiap sumber punya `copyrightStatus` (`public-domain`, `open-license`, `copyrighted`, `unknown`) dan `usage` (`verbatim`, `quotation`, `original-synthesis`, `reference-only`).

| Sumber                                   | Status                       | Pemakaian di repo                                                                         |
| ---------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------- |
| Lane's Lexicon (Perseus, Alpheios)       | CC BY-SA 3.0 US              | Teks Form I per akar di [`data/third-party/lane/`](../../data/third-party/lane/README.md) |
| Wiktionary (kaikki.org)                  | CC BY-SA 4.0 dan GFDL        | Data verba di `data/wiktionary/`                                                          |
| Qutrub, Arramooz, Arabic Stopwords       | GPL-2.0                      | Daftar kata di `data/sharaf-upstream/`                                                    |
| Lisān al-ʿArab                           | Domain publik (teks asli)    | Kutipan; teks lengkap menunggu salinan digital yang jelas, misalnya OpenITI               |
| Al-Muʿjam al-Wasīṭ                       | Belum jelas                  | Kutipan dan rujukan                                                                       |
| "Al-Muʿjam al-Muḥīṭ" di basis data lokal | Identitas belum pasti        | Kutipan; tautan ejtaal hanya pembanding                                                   |
| Al-Muʿāṣira, Al-Ghanī, Hans Wehr         | Dilindungi                   | Kutipan dan rujukan                                                                       |
| ejtaal.net                               | Kode GPL-3.0, pindaian tidak | Tautan untuk memeriksa, bukan sumber salinan                                              |
| OpenITI                                  | CC BY-NC-SA 4.0              | Calon sumber teks klasik; syarat NonCommercial perlu dicocokkan dulu                      |
| Qabas (Birzeit)                          | CC BY-ND 4.0                 | Validasi saja; jangan kirim salinan yang diubah                                           |

## Di data verba

Setiap `audit` menyimpan `source` (URL), `sourceId` (ID di daftar sumber), dan `sourceRole`. `utama` berarti tautan membuka kamus yang dipakai. `pembanding` berarti tautan hanya untuk membandingkan, dan kamus utamanya disebut di `audit.note`. Bila akar yang sama ada di Lane, `audit.lane` menunjuk ID entri di `data/third-party/lane/form-i.json`, sehingga peninjau punya teks terbuka untuk dibandingkan.

`node scripts/check-sources.mjs` (bagian dari `bun run lint` dan CI) menolak:

- pemakaian verbatim dari sumber yang tidak domain publik atau terbuka;
- folder `data/third-party/` tanpa entri daftar atau tanpa `README.md`;
- `sourceId` yang tidak dikenal;
- kutipan lebih dari 120 karakter dari sumber yang tidak terbuka;
- nilai `sourceRole` selain `utama` atau `pembanding`;
- file `lex.zip` atau `db.sqlite` yang terlacak Git, termasuk jika ditambahkan dengan paksa.

Pemeriksa juga melaporkan jumlah kutipan bertanda `«…»` dan total karakternya per sumber. Ini indikator audit, bukan bukti izin: kutipan tanpa penanda, parafrasa yang terlalu mirip, hak atas edisi digital, dan dampak kumulatif tetap membutuhkan pemeriksaan substantif. Jangan tambah batch kutipan dari sumber tertutup atau salinan digital tak jelas sebelum pemeriksaan kumulatif. Utamakan fakta kebahasaan, redaksi sendiri, dan locator (lema, akar, bab, jilid/halaman bila tersedia). Tautan pembanding tidak membuktikan sumber utama atau kesesuaian bab. Referensi Lane pada akar yang sama juga bukan verifikasi otomatis atas makna atau vokal mudhari tertentu.

## Belum terverifikasi

- Asal persis `lex.zip` dan identitas Al-Muḥīṭ di dalamnya.
- Status Al-Wasīṭ edisi awal di bawah UU Mesir No. 82/2002 dan lintas yurisdiksi.
- Kecocokan lisensi OpenITI (NonCommercial) dengan lisensi konten proyek.
- Kesesuaian tiap kutipan yang sudah masuk PR #60; pemeriksa hanya mengukur panjangnya.
