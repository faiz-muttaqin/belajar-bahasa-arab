# Audit integrasi PR dan commit lokal

**15 November 2026 · Baseline `origin/main` = `072e777` (#38)**

Pemilik meminta semua PR dan perubahan lokal disatukan ke main, dengan memilih versi terbaik untuk perubahan yang duplikat. Audit dilakukan sebelum pengerjaan RM-03, melalui fetch seluruh ref, daftar PR GitHub, ancestry Git, perbandingan tree, stash, worktree dan reflog.

## Hasil baseline

- **31 PR tercatat, seluruhnya merged; tidak ada PR terbuka.** Nomor PR memang memiliki sela karena issue memakai urutan nomor yang sama.
- **25 cabang sumber remote** semuanya cocok dengan head PR yang sudah merged. Perbedaan SHA dari main berasal dari squash merge; bukan bukti fitur belum masuk.
- **Tiga cabang lokal:** main, `feat/learning-roadmap-data-20261115`, dan `review/arabic-morphology-guides-37`.
- Satu worktree, bersih saat audit dimulai; tidak ada stash atau commit reflog di luar seluruh ref.

| Cabang lokal                          | Bukti                                                                                                                                            | Keputusan                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `main`                                | `f560eb9` adalah ancestor dari baseline; tertinggal 23 commit.                                                                                   | Fast-forward ke `072e777`, tanpa menimpa commit lokal.                                     |
| `feat/learning-roadmap-data-20261115` | Tree `f21a2d5` identik dengan `072e777`; PR #38 sudah merged.                                                                                    | Sudah terintegrasi. Pertahankan main; jangan menerapkan ulang patch.                       |
| `review/arabic-morphology-guides-37`  | `2666b10` adalah ancestor head PR #37 (`7d3432e`). Selisihnya satu perbaikan locator tes yang lebih baru; PR #37 sudah merged sebagai `5f17765`. | Versi main memuat perbaikan akhir tersebut. Jangan membawa ulang snapshot yang lebih lama. |

PR sumber lainnya: #1–#12, #14, #20–#23, #25–#38. Seluruh head pada 25 ref remote cocok dengan snapshot PR berstatus merged. Tidak ditemukan perubahan unik yang memerlukan cherry-pick atau penyelesaian konflik.

## Kelanjutan

RM-03 dikembangkan dari main yang telah diselaraskan. Pemindaian Aikido dihapus dari instruksi repo atas permintaan pemilik; keputusan penonaktifan disimpan di AGENTS.md. Gate proyek tetap typecheck, lint, unit, build statis dan E2E. Setelah PR RM-03 lulus, gabungkan lalu fast-forward main lokal ke hasilnya dan periksa kembali daftar PR serta working tree.
