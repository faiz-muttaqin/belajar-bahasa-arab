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

## Review lanjutan — batch 1

Baseline CI pertama: 424 tanpa kandidat, 72 Form I pada akar kandidat, 30 akar saja, 7 headword persis, 2 headword dan marker cocok, 1 sufiks, 1 akar bermasalah. Normalisasi tambahan menyetarakan hamzah berdiri sendiri dengan varian dudukannya untuk pencarian dan mengompres akar mudha'af tiga huruf ke label dua huruf. Ejaan tanpa harakat juga hanya lead. Hitungan baru harus dikonfirmasi lewat CI.

Enam keputusan awal tersimpan di `scripts/lane/p3-reviewed-decisions.json`: tiga draf didukung (صَمَرَ, مَطَأَ, وَتَأَ), tiga ditahan karena bukti bab tidak cocok (كَشَبَ, هَجَبَ, ثَلَّ). Locator dan ID asli diverifikasi oleh CI. Draf diekspor ke `draft-glosses.json` untuk batch penerapan berikutnya; data recall dan bundle learner belum diubah. Makna ditulis mandiri, tanpa menyalin definisi. Qabas dan sumber independen belum digunakan untuk validasi batch ini.

## Bulk lintas sumber

CI sebelumnya menghasilkan 373 rekaman tanpa kandidat Lane (turun dari 424), 95 Form I pada akar kandidat, 57 akar/alias, 7 headword persis, 2 headword dan marker vokal, 2 sufiks, 1 akar bermasalah. Seluruh 537 diperiksa kembali sekaligus terhadap snapshot Wiktionary Form I serta Qutrub dan Arramooz. Kandidat dibedakan antara bab utama yang cocok, bab alternatif, lemma dengan bab berbeda, variasi ejaan, dan anomali akar/bab sumber morfologi. Artefak terpisah p3-crosscheck-all memuat semua rekaman dan atribusi (Wiktionary CC BY-SA 4.0/GFDL, data morfologi GPL-2.0); tidak ada penerapan otomatis pada kamus. CI memeriksa reproduktibilitas dan melaporkan seluruh kunci rekaman dalam log. Qabas masih belum dapat dipakai dalam CI: halaman unduh resmi https://sina.birzeit.edu/qabas/about tidak memberikan file yang dapat diverifikasi dalam sesi ini, dan web service kamus memerlukan autentikasi. Jangan menganggap sumber ini sudah diperiksa. Hasil lintas sumber harus dikonfirmasi melalui CI; peninjauan sense masih terpisah dari pencarian otomatis.

## Penerapan draf Lane

Tiga draf (صَمَرَ bab 2, مَطَأَ bab 3, وَتَأَ bab 3) diterapkan pada recall dan bundle statis; confidence medium, status draf, belum ditinjau independen. Baseline audit 537 tetap mencakup rekaman yang telah diterapkan agar histori tidak hilang; jumlah unknown aktif menjadi 534. Tiga keputusan hold_bab tidak mengubah arti atau bab. CI memverifikasi keterkaitan keputusan dan data recall.

## Pencarian empat kamus klasik

Seluruh baseline 537 ditelusuri dalam Ṣiḥāḥ al-Jawharī, Maqāyīs al-Lugha, Lisān al-ʿArab, dan al-Qāmūs al-Muḥīṭ melalui edisi digital OpenITI yang dipatok dengan commit, Git blob hash, dan ukuran asli. Sumber ini CC BY-NC-SA 4.0, dipakai hanya untuk penelusuran referensi nonkomersial; teks/ekstrak tidak disimpan dalam repo atau artefak. Hasil hanya jumlah kecocokan dan locator baris untuk membaca sumber asli. Ejaan telanjang, token berharakat, dan label akar dalam tanda kurung adalah kandidat, bukan bukti POS atau bab. Edisi digital tidak selalu memuat semua harakat. CI membangun daftar locator dua kali dan menguji integritas sumber; hasil aktual belum diketahui saat commit ini dibuat. Qabas masih belum tersedia. CI juga meregenerasi bundle kamus untuk memeriksa kesamaan byte terhadap sumber recall dan menjalankan kebijakan provenance.
