# P3 — Audit 537 verba: tahap pencarian bukti Lane

Status: tahap kandidat otomatis diajukan, bukan verifikasi makna. P3 belum selesai.
Baseline: 537 rekaman `tidak_diketahui` dari koleksi recall pada penutupan P2.
Data learner dan glos Indonesia tidak diubah pada tahap ini.

## Metode

Semua 537 kombinasi lema–akar–bab dibandingkan dengan seluruh entri P2,
termasuk entri tanpa ID. Pencarian akar asli dan alias hamzah/alif/ya dilakukan
terpisah. Pencarian headword persis lintas akar membantu mendeteksi akar yang
keliru (misalnya placeholder جذر). Vokalisasi lema dipertahankan; bentuk
dengan sufiks objek hanya kandidat.

Bab internal 1–6 mengikuti patternCatalog: mudhari dhammah, kasrah, fathah,
fathah, kasrah, dhammah. Penanda Lane Bu/Bi/Ba dibaca dari form infl;
kehadiran penanda tidak membuktikan cakupannya pada lema atau sense tertentu.
Aorist dan masdar eksplisit juga dicatat bila pola markup sederhana cocok,
tetapi bukan parsing linguistik lengkap. Kandidat tanpa penanda tidak ditolak.

## Artefak dan peninjauan

Workflow menghasilkan `lane-verb-review-p3`, dengan review-queue.json
(satu rekaman per kombinasi unresolved, seluruh locator kandidat),
summary.json (checksum input, revisi Lane, hitungan), dan atribusi P2.
Bukti sumber tetap CC BY-SA 3.0 US. Tidak ada teks kamus tertutup atau
lex.zip yang diimpor. Qabas hanya pembanding validasi; tahap ini belum
menggunakan Qabas.

Urutan review: headword dan penanda vokal cocok; headword Form I persis;
varian dengan sufiks; Form I di artikel akar; entri tanpa penanda; akar
saja; lalu sumber klasik terbuka lain untuk kandidat kosong. Lokasi akar
yang sama tidak membuktikan bentuk atau bab. Ketiadaan kandidat tidak
membuktikan verba tidak ada.

Untuk setiap keputusan glos berikutnya baca XML utuh berdasarkan locator
P2, konfirmasi madhi aktif/pasif, mudhari dalam sense yang sama, masdar,
subjek/objek, register dan rujukan silang; cocokkan sumber lain bila
diperlukan. Tulis glos Indonesia mandiri dengan sourceId, sourceRole,
locator dan status draft. Tahan kombinasi bab yang belum terbukti.
Pisahkan koreksi akar dari penambahan arti. Jangan masukkan kandidat
otomatis ke kamus pengguna.

## Reproduksi

```sh
python3 -m unittest discover -s scripts/lane -p 'test_*.py'
python3 scripts/lane/extract_lane_full.py /tmp/lane-source /tmp/lane-output
python3 scripts/lane/audit_unresolved_verbs.py data/recall/verbs-qutrub-arramooz-recall.json /tmp/lane-output /tmp/lane-audit
```

Output harus belum ada. Workflow memeriksa checksum dan jumlah entri P2,
mengunci baseline 537 (perbarui dengan sengaja bila baseline berubah),
membangun audit dua kali, dan membandingkan hasil. Artefak bukan kamus
final. Hitungan kategori baru diketahui setelah workflow berhasil.
