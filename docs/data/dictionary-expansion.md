# Perluasan kamus Arab–Indonesia

Status: riset dan rencana, 20 November 2026. Target bukan klaim jumlah yang sudah tercapai.

## Urutan pekerjaan

1. Audit verba kosong: ekstrak artikel Lane lengkap, bukan hanya artikel Form I pertama. Cocokkan bentuk, vokal mudhari, masdar dan objek. Validasi dengan Qabas serta kamus klasik lain. Pertahankan tidak diketahui bila hanya akar atau bentuk hipotetis yang cocok; catat kesalahan akar/bab terpisah.
2. Perluas Wiktionary/Kaikki ke nomina, adjektiva, adverbia, pronomina, partikel, dan ungkapan. Pilih lema MSA/klasik; pisahkan infleksi, nama diri dan dialek. Catat dump, tanggal, lisensi dan halaman lema. Koleksi recall 5.005 adalah kombinasi lema, akar dan bab; 2.788 verba Form I dan 4.479 verba turunan Wiktionary tumpang tindih dengannya. Hitung lema unik menurut vokalisasi, POS, akar (jika diketahui) dan bab; hitung sense terpisah.
3. Kamus sense-level: lemma, root (opsional untuk serapan), POS, register, bab, masdar, jamak, gender, arti dan definisi Indonesia orisinal, contoh orisinal, sumber per sense dan relasi keluarga kata. Bedakan bentuk tercatat dari bentuk hasil aturan.
4. Tambah terminologi MSA (dokumen, teknologi, kesehatan, transportasi, komunikasi) serta kosakata sehari-hari menurut frekuensi. Target bertahap 10.000, 25.000, 50.000 lema unik jika sumber dan review memungkinkan. Bukan janji jumlah.
5. Integrasikan pencarian lema, akar, arti Indonesia, filter register/POS dan keluarga kata. Aset besar dipecah per indeks/prefix dan dimuat sesuai kebutuhan; pertahankan static-first.

## Sumber kandidat

- [Kaikki Arabic](https://kaikki.org/dictionary/Arabic/index.html): ekstrak Wiktionary; sekitar 177 ribu bentuk berbeda pada halaman 20 November 2026, bukan 177 ribu lema. Ikuti CC BY-SA dan atribusi sumber.
- [Qabas, LREC-COLING 2024](https://aclanthology.org/2024.lrec-main.1170/): sekitar 58 ribu lema, 45 ribu nominal dan 12,5 ribu verba. Validasi saja menurut registry (CC BY-ND); jangan distribusikan adaptasi data terlindungi tanpa izin.
- Lane (Perseus/Alpheios, CC BY-SA 3.0 US): makna dan turunan klasik, gunakan artikel akar lengkap dengan atribusi dan lisensi.
- [Arabic Lexicon](https://arabiclexicon.hawramani.com/): kandidat pencarian kamus klasik; verifikasi edisi digital dan izin redistribusi sebelum impor. Kamus modern untuk fakta dan sintesis mandiri, bukan terjemahan massal atau parafrasa dekat.

## Gerbang kualitas

Jangan membuat arti berdasarkan pola atau akar saja. Setiap sense memiliki sumber dan locator, status draft, serta lisensi yang sesuai. Cakupan bukan akurasi. Ikuti ADR-004/005 dan audit kutipan kumulatif.

## Progres implementasi lanjutan

- Pemisahan sumber pembanding pada hasil pengayaan dan tampilan kamus sharaf: implementasi serta uji regresi di PR lanjutan; CI belum terverifikasi. Langkah ini menghindari klaim bukti yang keliru saat perluasan kamus dilakukan.
- Audit 537 verba kosong, ekstraksi Lane lengkap, penambahan nomina serta penghitungan lema/sense unik tetap terbuka. Tidak ada klaim ekspansi selesai.
