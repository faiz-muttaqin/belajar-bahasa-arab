# P2 — Ekstraksi Lane lengkap

Status: ekstraktor dan verifikasi CI diajukan; cakupan aktual baru dapat dinyatakan
setelah workflow berhasil. P3 (audit 537 verba) belum dikerjakan.

## Sumber dan lisensi

- [Alpheios Lane](https://github.com/alpheios-project/lan/tree/7dd04e1182c13a4b0883978867d2a3b04616542a), 38 berkas XML leksikon, 58.265.482 byte.
- Edward William Lane, _An Arabic-English Lexicon_, 1863–1893. Digitalisasi Perseus Digital Library, koreksi Alpheios Project.
- [CC BY-SA 3.0 US](https://creativecommons.org/licenses/by-sa/3.0/us/); data hasil ekstraksi tetap terpisah lisensinya dari kode.
- Manifest input mengikat setiap path ke ukuran dan Git blob SHA asli.

## Reproduksi

Jalankan dari root proyek (Python 3, tanpa paket tambahan):

```sh
git clone https://github.com/alpheios-project/lan.git /tmp/lane-source
git -C /tmp/lane-source checkout 7dd04e1182c13a4b0883978867d2a3b04616542a
python3 -m unittest discover -s scripts/lane -p 'test_*.py'
python3 scripts/lane/extract_lane_full.py /tmp/lane-source /tmp/lane-output
```

Direktori output harus belum ada. Bila proses gagal, hapus output parsial
sebelum mencoba kembali. Workflow PR membangun dua kali, membandingkan seluruh
output, dan mengunggah artefak `lane-full-v1` selama 30 hari. Tidak ada
`lex.zip`, XML upstream, atau data besar baru yang dikomit atau dikirim ke
browser. Jalankan kembali untuk reproduksi setelah artefak kedaluwarsa.

## Kontrak P3

- `roots.jsonl`: satu baris per artikel akar (`div2 type="root"`), termasuk
  seluruh XML artikel, urutan dalam berkas, akar asli, key pencarian, daftar ID dan locator entri.
- `entries.jsonl`: satu baris per `entryFree`, termasuk entri di luar artikel
  akar, ID asli, locator, relasi artikel akar, atribut key/type, daftar itype
  dan orth asli, teks untuk pencarian dan XML entri. Beberapa artikel Form I
  dalam satu akar tidak disatukan. `itypes` kosong berarti tidak ada penanda,
  bukan klasifikasi nomina.
- `manifest.json`: revisi, lisensi, manifest input, hitungan aktual dan SHA-256 output.
- `ATTRIBUTION.txt`: atribusi, lisensi dan catatan transformasi.

Locator entri adalah path XML relatif sumber ditambah ordinal `#entry-N`;
locator akar menggunakan ordinal `#root-N` pada revisi yang dipatok. ID asli
adalah metadata nullable, bukan identitas primer: sumber u$0.xml memuat entri
tanpa ID. Semua entri tersebut dipertahankan dan dihitung terpisah.
ID sumber dapat berulang lintas berkas: misalnya u_0.xml dan ua0.xml sama-sama
memuat n13600. Semua rekaman dipertahankan; manifest menghitung ID berbeda dan
pengulangan ID, serta jumlah entri tanpa ID. P3 harus memakai locator, bukan ID global, dan meninjau duplikat
sebelum menghitung lema. Key
pencarian akar hanya menghapus harakat, tatwil, dan spasi; tidak menyatukan
hamzah, alif atau ya. XML diserialisasi ulang (bukan byte asli); teks pencarian
dinormalisasi whitespace. Penanda sense asli dipertahankan dalam XML, bukan
dievaluasi sebagai sense yang tervalidasi.

## Gerbang sebelum P3

CI harus berhasil pada seluruh input, tanpa kehilangan atau duplikasi locator,
dan menghasilkan manifest aktual. Reviewer harus memeriksa entri lintas
bentuk, halaman suplemen/rujukan silang, dan kecocokan vokalisasi. Entri tanpa
itype dan referensi silang dapat relevan tetapi membutuhkan pemeriksaan
linguistik. Jangan mengubah arti Indonesia hanya karena akar cocok. Hitungan
artikel/entri bukan jumlah lema unik atau sense tervalidasi. P1, P4, dan P6
tetap independen; P3 dapat stack di atas branch ini setelah output tersedia.
