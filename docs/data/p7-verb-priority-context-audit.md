# P7.2 — Pemeriksaan konteks 15 lead verba prioritas

Tanggal telaah awal: 22 November 2026. Ini **antrean audit sumber**, bukan daftar kosakata baru. Semua entri tetap `tidak_diketahui` pada baseline dan tidak ada glos atau bab baru yang disetujui.

## Jejak data

- Reproduksi: skrip `scripts/lane/p7_qamus_markers.py` pada [CI 44734683395](https://github.com/faiz-muttaqin/belajar-bahasa-arab/actions/runs/44734683395). Dari 501 unknown aktif, 15 termasuk kategori `inspect_matching_marker`.
- Teks primer yang dipin: _Al-Qāmūs al-Muḥīṭ_, [OpenITI 0825AH, revisi `2630748`](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1), sumber berlisensi CC BY-NC-SA 4.0 di katalog OpenITI; **reference-only**, bukan sumber teks untuk dikirim ulang.
- Baris berikut adalah locator digital dan fakta pembanding bab, bukan kutipan definisi. `HOLD` berarti membutuhkan pemeriksaan lanjutan, `PENDING` berarti belum ditelaah semantik. Tidak ada entri berstatus `draft_supported` dalam batch ini.

## Lima belas lead yang diverifikasi dari log

- **سَنَعَ** (akar `سنع`, bab 1, penanda نصر, [baris 48842](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L48842)): HOLD: teks menyebut tiga pola (نصر، منع، كرم); satu marker bukan satu makna yang unik.
- **لَهَّ** (akar `لهه`, bab 1, penanda نصر, [baris 84797](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L84797)): HOLD: geminat/homograf; terdapat marker bab lain pada banyak bagian sumber.
- **دَثَعَ** (akar `دثع`, bab 3, penanda منع, [baris 47697](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L47697)): HOLD: konteks mengaitkan verba dengan injakan kuat; pisahkan dari nomina tentang jenis tanah, perlu saksi leksikal kedua.
- **دَخَضَ** (akar `دخض`, bab 3, penanda منع, [baris 42648](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L42648)): PENDING: marker sesuai bab; arti, pasangan fiil dan homograf belum diperiksa.
- **فَعَرَ** (akar `فعر`, bab 3, penanda منع, [baris 29985](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L29985)): HOLD: konteks menyebut memakan الفعارير; identifikasi benda dan parafrasa Indonesia belum cukup terverifikasi.
- **لَبَحَ** (akar `لبح`, bab 3, penanda منع, [baris 14747](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L14747)): HOLD: entri digital memerlukan pembacaan konteks lengkap untuk memastikan makna setelah penanda.
- **مَأَلَ** (akar `مءل`, bab 3, penanda منع, [baris 71795](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L71795)): PENDING: marker sesuai bab; arti, pasangan fiil dan homograf belum diperiksa.
- **بَهَّ** (akar `بهه`, bab 4, penanda فرح, [baris 3967](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L3967)): HOLD: banyak rujukan dari bab berbeda; exact-marker saja tidak cukup untuk mengisolasi sense.
- **فَضِحَ** (akar `فضح`, bab 4, penanda فرح, [baris 14328](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L14328)): HOLD: bentuk bab 4 dikaitkan dengan warna pucat/keputihan, berbeda dari فضحه bab 3 tentang membuka aib.
- **قَبِسَ** (akar `قبس`, bab 4, penanda فرح, [baris 37496](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L37496)): HOLD: konteks كفرح/كرم berkaitan dengan pejantan cepat membuahi; bukan otomatis sense umum mengambil api.
- **قَثِمَ** (akar `قثم`, bab 4, penanda فرح, [baris 78710](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L78710)): HOLD: dua pola (فرح/كرم) pada teks berdekatan; konteks bernuansa najis/kotoran dan harus dibedakan.
- **بَدُغَ** (akar `بدغ`, bab 6, penanda كرم, [baris 52213](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L52213)): PENDING: marker sesuai bab; arti, pasangan fiil dan homograf belum diperiksa.
- **بَذُمَ** (akar `بذم`, bab 6, penanda كرم, [baris 73650](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L73650)): PENDING: marker sesuai bab; arti, pasangan fiil dan homograf belum diperiksa.
- **جَبُزَ** (akar `جبز`, bab 6, penanda كرم, [baris 33405](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L33405)): PENDING: marker sesuai bab; arti, pasangan fiil dan homograf belum diperiksa.
- **مَلُطَ** (akar `ملط`, bab 6, penanda كرم, [baris 45946](https://github.com/OpenITI/0825AH/blob/2630748a4754b509908048087e569ccc8dd251ce/data/0817MajdDinFiruzabadi/0817MajdDinFiruzabadi.QamusMuhit/0817MajdDinFiruzabadi.QamusMuhit.Shamela0007283-ara1#L45946)): PENDING: marker sesuai bab; arti, pasangan fiil dan homograf belum diperiksa; ada penanda bab alternatif.

## Temuan konteks tambahan

Penelusuran pada penyajian digital lain dari **kitab yang sama** mendukung perlunya kehati-hatian berikut; ini bukan dua kamus independen dan belum menghasilkan keputusan arti final.

- `سَنَعَ`: lebih dari satu pola disebut dalam konteks sifat `سنيع`; jangan pilih satu bab hanya dari penanda. [Al-Qāmūs — سنع](https://www.ibnalarabi.com/books/qamus-muhit.php?id=5790).
- `دَثَعَ`: bagian `الدثع` mencampurkan nomina tanah dan verba terkait injakan berat, sehingga ID sense perlu dipisah. [Al-Qāmūs — دثع](https://www.ibnalarabi.com/books/qamus-muhit.php?id=1207).
- `فَعَرَ`: teks berkaitan dengan `الفعارير`; padanan Indonesianya belum boleh ditebak sebagai definisi umum. [Al-Qāmūs — فعر](https://www.islamweb.net/ar/library/content/123/2705/%D9%81%D8%B5%D9%84-%D8%A7%D9%84%D9%81%D8%A7%D8%A1).
- `فَضِحَ`: bentuk `كفرح` perlu dipisahkan dari bentuk `فضحه كمنعه` yang berbeda pola dan makna. [Al-Qāmūs — فضح](https://ibnalarabi.com/books/qamus-muhit.php?id=1994).
- `قَبِسَ`: teks `كفرح وكرم` berada pada sense tentang pejantan, bukan bukti sense umum menyalakan/mengambil api. [Al-Qāmūs — قبس](https://ibnalarabi.com/books/qamus-muhit.php?id=4402).
- `قَثِمَ`: konteks `كفرح وكرم` terhubung dengan `القثم`; dua pola harus dipisah selama review. [Al-Qāmūs — قثم](https://ablibrary.net/book_content/b/5148/161?lang=ar).
- `لَبَحَ`: perlu tinjauan kalimat lengkap setelah marker `كمنع`; jangan langsung memasangkan arti nomina `اللبح` ke verba. [Al-Qāmūs — لبح](https://www.ibnalarabi.com/books/qamus-muhit.php?id=2050).

## Gate menuju keputusan

1. Periksa konteks pada file OpenITI yang dipin, cek vokalisasi serta bentuk māḍī/muḍāriʿ dan makna verbanya. Baris bisa mengandung beberapa homograf/sense.
2. Cari konfirmasi semantik dari **kamus independen** yang boleh dirujuk; salinan situs berbeda dari Qāmūs bukan saksi independen.
3. Catat pasangan bentuk, makna Indonesia orisinal, register, locator, hash/sumber, dan alasan `draft_supported` atau `hold`. Hindari merombak data baseline hanya dari marker.
4. Audit hak redistribusi dan kecocokan lisensi terpisah. Tidak ada teks sumber pihak ketiga atau definisi panjang ditambahkan di sini.

Sisa pekerjaan lintas P7: 16 gap MSA, 25 sense P4 pertama, keputusan lisensi, dan seluruh antrean lain masih dalam [issue #79](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/79). P7.8 tetap diblokir.
