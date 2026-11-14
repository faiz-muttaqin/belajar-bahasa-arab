# Arti kata kerja dari pengetahuan model (Qutrub dan Arramooz)

**Status:** draft, tidak diverifikasi. Dipakai di bagian "Daftar tambahan" pada
`/rujukan/fiil/kata-kerja/1/` sampai `/6/`.

## Isi

`data/recall/verbs-qutrub-arramooz-recall.json`: **5.005** kombinasi madhi, akar, dan bab dari
daftar Qutrub dan Arramooz (PR #6, GPLv2, `data/sharaf-upstream/`) yang **tidak ada** sebagai
Form I di Wiktionary. Daftar kata itu berlisensi GPLv2; arti diberikan model Claude.
Per bab: 1 = 1.228, 2 = 1.049, 3 = 835, 4 = 1.518, 5 = 18, 6 = 357.

| Jenis                                                 | Jumlah | Model                             |
| ----------------------------------------------------- | ------ | --------------------------------- |
| Padanan (1 sampai 3 arti singkat)                     | 2.470  | Fable 5.2: 1.650; Sonnet 5.5: 820 |
| Deskripsi (satu kalimat, tidak ada padanan satu kata) | 833    | Fable 5.2                         |
| Tidak diketahui                                       | 1.702  | Fable 5.2                         |

Tidak ada transliterasi, mudhari, atau mashdar untuk kata-kata ini karena sumbernya tidak
memilikinya; tidak ada yang diisi dengan tebakan. Kode transitivitas sumber (ل, م, ك) ditampilkan
apa adanya; artinya belum dikonfirmasi.

## Cara dibuat

1. **Putaran 1 (Sonnet 5.5, 12 agen):** meminta arti hanya bila verbanya dikenali; kalau tidak,
   "tidak ada". Hasil: 1.095 berisi (202 tinggi, 618 sedang, 275 rendah), 3.910 kosong.
2. **Putaran 2 (Fable 5.2, 14 agen):** dijalankan ulang pada 4.185 verba yang kosong atau
   berkeyakinan rendah, dengan tiga jenis jawaban (`padanan`, `deskripsi`, `tidak_diketahui`) dan
   penegasan bahwa "tidak diketahui" lebih baik daripada menebak. 820 jawaban Sonnet berkeyakinan
   tinggi atau sedang dipertahankan.
3. Tanpa akses web; murni recall. Label di antarmuka: "dari pengetahuan model, belum diverifikasi".

## Ketepatan (diukur, bukan dijamin)

- **Uji kalibrasi** (160 verba Wiktionary yang jawabannya diketahui): Fable benar 138 (86% dari
  yang dijawab), Sonnet 116 (81%).
- **Verba kontrol** (210 verba Wiktionary disamarkan di antara target Fable): 201 dijawab, 172
  benar (86%), 6 sebagian, 23 salah, 9 "tidak diketahui". Menurut keyakinan: tinggi 88%, sedang
  87%, rendah 76%. Satu bagian dari 14 jauh lebih lemah (62%).
- Penilainya model juga, dan kata uji lebih umum daripada kata target. **Ketepatan pada kata
  langka hampir pasti lebih rendah.** Keyakinan model hanya petunjuk kasar.

## Batasan

- Tidak ditinjau guru, tidak ada sumber kamus. Jangan dipakai sebagai rujukan tanpa dicek.
- Bagian kontrol nomor 8 (313 verba target) lebih lemah dan layak diulang.
- Kata yang sama muncul dengan homograf berbeda bab sebagai baris terpisah.
- Verba yang ada di Wiktionary memakai data Wiktionary, bukan data ini.
