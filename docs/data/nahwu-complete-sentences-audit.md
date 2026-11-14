# G-04 — Rujukan dan audit kalimat lengkap

**Tanggal:** 14 November 2026 · **Status konten:** draft. Tidak mengklaim tashih linguistik otomatis.

G-04 menghubungkan materi [G-01 (frasa / jumlah ismiyyah awal)](../../src/lib/content/grammar-rules.ts), [G-02 (sharaf)](../../src/lib/content/sharaf-lessons.ts), dan [G-03 (frasa / i‘rab)](../../src/lib/content/phrase-rules.ts) menjadi contoh kalimat utuh. Ini bukan grammar engine: seluruh kalimat, glos, role, dan tanda ditulis dan ditinjau sebagai satu kesatuan contoh.

## Rujukan per topik

| Kelompok | Dasar kaidah | Batas materi |
| --- | --- | --- |
| **Jumlah ismiyyah (mubtada–khabar)** | [Madinah Arabic lesson 4 part 9](https://madinaharabic.com/free-content/grammar/lesson-4/part-9), [lesson 58 part 1](https://madinaharabic.com/free-content/grammar/lesson-58/part-1) dan [part 6](https://madinaharabic.com/free-content/grammar/lesson-58/part-6) | Khabar mufrad, syibh-jumlah, jumlah fi‘liyyah. Ketika khabar terdiri dari klausa lain, setiap kata di dalamnya tetap mempunyai fungsi tersendiri. |
| **Jumlah fi‘liyyah dan objek** | [Lesson 64 fā‘il](https://madinaharabic.com/free-content/grammar/lesson-64/part-1), [lesson 66 maf‘ūl bih](https://madinaharabic.com/free-content/grammar/lesson-66/part-1) | VSO dengan isim tunggal; tidak semua verba transitif. |
| **Aktif/pasif dan nā’ib al-fā‘il** | [Lesson 34 active/passive](https://madinaharabic.com/free-content/grammar/lesson-34/part-1), [lesson 65 pro-agent](https://madinaharabic.com/free-content/grammar/lesson-65/part-1) | Dua pasangan fi‘il shahih Form I lampau: كَتَبَ/كُتِبَ dan فَتَحَ/فُتِحَ. Nā’ib al-fā‘il **bukan pelaku faktual**. |
| **Negasi dan i‘rab muḍāri‘** | [Lesson 31 affirmative/negative](https://madinaharabic.com/free-content/grammar/lesson-31/part-1), [lesson 36 verb declension](https://madinaharabic.com/free-content/grammar/lesson-36/part-1), [Ryding, A Reference Grammar of Modern Standard Arabic, bagian negation](https://imamhamzatcoed.edu.ng/library/ebooks/resources/Modern_Standard_Arabic_Reference_Grammar.pdf) | لَا النافية + marfū‘; لَمْ + majzūm menegasikan masa lalu; لَنْ + manṣūb menegasikan masa depan. Bentuk fi‘il mu‘tal/af‘āl khamsah memiliki tanda lain. |
| **Nawāsikh** | [Lesson 59 kāna and sisters](https://madinaharabic.com/free-content/grammar/lesson-59/part-1), [lesson 60 inna and sisters](https://madinaharabic.com/free-content/grammar/lesson-60/part-1) | إِنَّ: ism manṣūb, khabar marfū‘. كَانَ: ism marfū‘, khabar manṣūb. Khabar berupa kata sifat mufrad. |
| **Pertanyaan هَلْ** | [Madinah Arabic lessons nominal sentence](https://madinaharabic.com/free-content/grammar/lesson-58/part-1), [course index](https://madinaharabic.com/free-content/grammar) | هَلْ mengubah pernyataan menjadi pertanyaan ya/tidak; demonstrasi ini tidak mencakup seluruh alat tanya. |

Klasifikasi tambahan dirujuk silang terhadap *Al-Ājurrūmiyyah* (Ibn Ājurrūm) untuk marfū‘āt/mansūbāt dan fi‘il, sementara *Qaṭr al-Nadā* (Ibn Hishām) menjadi jalur pendalaman nāsikh/jenis khabar. Nama kitab bukan lisensi menyalin isi edisi modern; teks, terjemahan, dan penjelasan di frontend adalah redaksi original.

## Kontrak visual dan audit

1. Semua kata Arab ditulis **berharakat**. Glos Indonesia berada tepat di bawah token, lalu label peran, kemudian label kasus/mood jika ada.
2. Warna di G-04 mengkode **peran sintaksis** (topik, khabar, fi‘il, fā‘il, objek, nā’ib al-fā‘il, partikel); konvensi ini tidak setara dengan palet kasus pada G-03. Jangan mengambil keputusan hanya dari warna.
3. **Kasus isim (\`irab\`)** dan **mood fi‘il muḍāri‘ (\`mood\`)** adalah field yang saling eksklusif. Tidak semua fi‘il māḍī diberi tag kasus.
4. Bentuk huruf pada akhir token bukan analisis otomatis. Tanda pada kartu adalah anotasi manual dari contoh terbatas: ḍamma, tanwin, kasra, fatḥa, sukūn.
5. Contoh tidak mencantumkan pelaku pasif jika memang tak diketahui; nā’ib al-fā‘il adalah subjek gramatikal yang menggantikan unsur objek.
6. Teks HTML tetap tersedia saat JavaScript tidak aktif, termasuk penjelasan yang dapat dibuka lewat native \`details\`. Lulus CI bukan bukti seluruh klaim di atas sudah diperiksa guru bahasa Arab. Ikuti [protokol verifikasi sumber](../research/2026-11-14-source-based-verification.md).

## Masih di luar cakupan

- Khabar berupa jumlah ismiyyah bertingkat dan kasus khabar muqaddam/mubtada muakhkhar.
- Fi‘il yang memiliki dua objek, agreement VSO/SVO jamak dan pengecualian fi‘il mu‘tal.
- Pelarangan لَا الناهية dan semua alat tanya secara sistematis.
- Lā nāfiyah li-l-jins, mā / laysa, serta seluruh variasi nawāsikh.
- G-05 akan mencakup athaf, isim maushul, syarat, sebab-akibat, dan hubungan antarklausa.

Lihat issue [G-04 #17](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/17).
