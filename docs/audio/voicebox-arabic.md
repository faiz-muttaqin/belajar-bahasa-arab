# Arabic audio with Voicebox

How this project generates Arabic audio with Voicebox, what was tested, and what a human reviewer must check before any clip is published. Setup on a new machine is in [voicebox-setup.md](voicebox-setup.md). The batch script is [voicebox_arabic_batch.py](voicebox_arabic_batch.py).

Status as of 14 November 2026: every clip generated so far is `needs_human_review`. Nothing here establishes that the pronunciation is correct. Unreviewed audio must not be presented to learners as a pronunciation standard.

Voicebox runs on the editor's machine only. It never runs in the frontend, on a server, or in CI.

## Engine

Of the Voicebox engines, the Arabic path is Chatterbox Multilingual (23 languages including Arabic, per the Voicebox README and `backend/backends/__init__.py`). Two other Voicebox engines list Arabic, TADA 3B Multilingual and OmniVoice, but they were not tested and have different licences (see below).

| Item                     | Value                                                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Voicebox                 | 0.6.0, commit `8af7efe` of `github.com/jamiepine/voicebox`                                                                                                                                              |
| Voicebox engine id       | `chatterbox` (model name `chatterbox-tts`, "Chatterbox TTS (Multilingual)")                                                                                                                             |
| Model on Apple Silicon   | `mlx-community/chatterbox-multilingual-v3`, revision `03565773edd7`. An MLX conversion of Resemble AI's Chatterbox Multilingual V3, made with mlx-audio 0.4.7. Weights 2.71 GB.                         |
| Speech tokenizer         | `mlx-community/S3TokenizerV2`, revision `e0c9886f0e1c`, derived from `FunAudioLLM/CosyVoice2-0.5B`. 0.49 GB.                                                                                            |
| Runtime                  | `mlx-audio` 0.4.1, `mlx` 0.32.4                                                                                                                                                                         |
| Model on other platforms | `ResembleAI/chatterbox` via the `chatterbox-tts` 0.1.7 PyTorch package. Not tested here.                                                                                                                |
| Sampling settings        | Fixed in Voicebox (`chatterbox_mlx_backend.py`): exaggeration 0.1, cfg_weight 0.5, temperature 0.8, repetition_penalty 1.2. The Voicebox API does not expose them or a speed control. Seed is settable. |
| Output                   | 24 kHz mono WAV, trimmed and peak-normalised by Voicebox                                                                                                                                                |

## Licences and consent

| Component                                        | Licence                             | Source                                                                                            |
| ------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| Voicebox app                                     | MIT                                 | `LICENSE` in the Voicebox repo                                                                    |
| `mlx-community/chatterbox-multilingual-v3`       | MIT                                 | Hugging Face model card                                                                           |
| `ResembleAI/chatterbox` (upstream model)         | MIT                                 | Hugging Face model card                                                                           |
| `mlx-community/S3TokenizerV2`                    | Not declared on its model card      | Its base model, `FunAudioLLM/CosyVoice2-0.5B`, is Apache-2.0. Confirm before publishing at scale. |
| `mlx-audio`, `mlx`, `chatterbox-tts`             | MIT                                 | Package metadata                                                                                  |
| `hexgrad/Kokoro-82M` (synthetic reference voice) | Apache-2.0                          | Hugging Face model card                                                                           |
| TADA 3B Multilingual (untested)                  | Llama 3.2 licence tag               | Hugging Face model card                                                                           |
| OmniVoice (untested)                             | Labelled non-commercial in Voicebox | Voicebox model list                                                                               |

Voice cloning consent. Voicebox's `RESPONSIBLE_USE.md` allows cloning your own voice, a voice with the speaker's explicit permission, or licensed material. It prohibits impersonation and commercial use of a person's voice without the legal right, and asks you to disclose that published audio is AI-generated where law, platform policy or audience expectations require it. Voicebox cannot verify who owns a voice.

For this project:

- Every manifest entry records the voice and its licence or consent in `voiceLicenceOrConsent`.
- A human reference voice needs written consent that covers synthetic reuse on this website. Keep the signed record outside the repo and cite where it is in the manifest.
- The upstream PyTorch Chatterbox package adds Resemble's Perth watermark to its output. The MLX code path used here (mlx-audio 0.4.1) contains no watermarking, so these files carry none.
- Whether and how to label synthetic audio on the site is a product and legal question. Ask the relevant adviser; this guide does not decide it.

## How Arabic text reaches the model

Checked in the mlx-audio 0.4.1 source and the model's `tokenizer.json`:

- There is no Arabic-specific preprocessing (Hebrew, Japanese, Korean, Russian and Chinese have some; Arabic does not).
- Text is lower-cased, NFKD-normalised, prefixed with `[ar]`, and a full stop is appended if the text has no final punctuation.
- Every haraka is its own token: fathah, dammah, kasrah, sukun, shaddah, the three tanwin marks and superscript alif. All four specimens tokenised with no unknown tokens.
- NFKD splits `آ` into alif plus combining maddah (U+0653), and `أ` into alif plus hamzah above. Both are in the vocabulary.

Having a token for each haraka does not mean the model learned to pronounce it. That can only be judged by listening.

## Smoke test

Neutral typography QA specimens only, not lesson content: `بِسْمِ اللَّهِ`, `السَّلَامُ عَلَيْكُمْ`, `مُعَلِّمٌ`, `قُرْآنٌ`. Two of them are religious formulae or Qur'anic vocabulary; the pedagogy research (§8) says Qur'anic words need their own sourcing and handling rules, so do not reuse these clips in lessons.

Settings: Voicebox 0.6.0, engine `chatterbox`, language `ar`, seeds 1001, 1002 and 1003 (three takes each), normalise on, fixed sampling settings as above. Voice: a synthetic reference made with Kokoro voice `am_michael` (English, 10.6 s). No real person was cloned.

Run on an M4 Pro (24 GB): 12 takes in 65 s. The first take took 29 s because it loaded the model; the rest took about 3 s each.

| Specimen       | Take | File length (ms) | Speech ends at (s) | MP3 64k (bytes) | Opus 32k (bytes) |
| -------------- | ---- | ---------------- | ------------------ | --------------- | ---------------- |
| `بِسْمِ اللَّهِ`     | 1    | 1020             | 0.83               | 8,876           | 4,318            |
|                | 2    | 1000             | 0.89               | 8,684           | 4,242            |
|                | 3    | 1160             | 1.03               | 10,028          | 4,880            |
| `السَّلَامُ عَلَيْكُمْ` | 1    | 1480             | 1.32               | 12,524          | 6,134            |
|                | 2    | 1220             | 1.09               | 10,412          | 5,085            |
|                | 3    | 1180             | 1.06               | 10,220          | 4,947            |
| `مُعَلِّمٌ`         | 1    | 960              | 0.79               | 8,300           | 4,036            |
|                | 2    | 800              | 0.64               | 7,148           | 3,412            |
|                | 3    | 880              | 0.72               | 7,724           | 3,729            |
| `قُرْآنٌ`         | 1    | 880              | 0.76               | 7,724           | 3,718            |
|                | 2    | 760              | 0.63               | 6,764           | 3,245            |
|                | 3    | 860              | 0.73               | 7,532           | 3,658            |

"Speech ends at" is where the signal drops below -45 dB for the rest of the file.

What the machine checks found:

- No failures. All 12 takes completed, including the shortest input (`مُعَلِّمٌ`, four letters). No empty output, no runaway length, no codec noise visible in the spectrograms.
- Peak level -6.4 to -1.5 dBFS, mean -20 dB on every take, so no clipping.
- No silence before the first sound, and 0.11 to 0.17 s of quiet at the end. Check that the first consonant is not cut off.
- Takes of the same text vary in length by up to 0.26 s, so pace differs between seeds.
- The pace looks fast for teaching: about 0.6 to 0.8 s of speech for a single word. The API has no speed setting.
- A faint noise floor is visible in the spectrograms between sounds. Check it on headphones.

Not assessed, and still needing a human listener for every take: whether short and long vowels, shaddah, tanwin, hamzah and maddah are audible and correct; makharij; and whether the accent of the English reference voice carries into the Arabic. The `chatterbox-tts` package documentation warns that a reference clip in another language can pass its accent to the output, and suggests `cfg_weight` 0 as a mitigation. Voicebox does not expose that setting.

The audio, spectrograms, reference clip and manifest are on the editor's Mac at `~/git/voicebox-data/qa/arabic-smoke-2026-11-14/` and are not committed.

## Encoding

Measured on the 12 takes:

| Format                      | Total for 12 takes | Per take       | Content above 8 kHz vs master |
| --------------------------- | ------------------ | -------------- | ----------------------------- |
| WAV master (24 kHz, 16-bit) | 586 KB             | 36 to 71 KB    | reference                     |
| MP3, 64 kbps CBR, mono      | 106 KB             | 6.8 to 12.5 KB | about the same                |
| Opus, 32 kbps VBR           | 51 KB              | 3.2 to 6.1 KB  | about 2 dB lower              |

Recommendation: publish MP3 at 64 kbps mono. It plays in every browser, and at under 13 KB per clip the saving from Opus is small in absolute terms (about 9 MB vs 4.3 MB per 1,000 clips at these lengths). Keep the WAV masters locally so you can re-encode later. If storage becomes a concern, add Opus as a first `<source>` with MP3 as fallback, after testing Opus playback on the iOS and Safari versions you support. Do not lower the bitrate below these levels: sibilant contrasts such as `س`, `ش` and `ص` depend on the higher frequencies.

## Batch pipeline

Flow: reviewed, fully vocalised text → batch script (Voicebox, two or three takes) → human review → approved take copied into the site's static audio path with its manifest entry.

Usage is in [voicebox-setup.md](voicebox-setup.md#6-generate-audio). In short:

```bash
python3 docs/audio/voicebox_arabic_batch.py --input utterances.json --out ~/voicebox-out/batch-01 --profile-id <id> --voice "<label>" --voice-consent "<licence or consent record>"
```

The script:

- refuses to run if `CI` is set or ports 5173 or 4173 are open;
- rejects input with Latin letters or digits, missing fields, duplicate ids, or a variant other than `msa` or `classical`;
- normalises text to NFC and reports letters without a haraka (expected for hamzat al-wasl, lam shamsiyyah and madd letters);
- writes the manifest after every take, and on a re-run skips takes already done for the same text and `textVersion`. Change the text or `textVersion` and that utterance is regenerated.

Manifest fields per clip:

| Field                   | Meaning                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `id`                    | Stable utterance id from the input                                                       |
| `take`                  | Take number. Each take has its own entry.                                                |
| `arabicText`            | Exact text sent (NFC)                                                                    |
| `variant`               | `msa` or `classical`                                                                     |
| `engine`                | Engine and Voicebox engine id                                                            |
| `engineVersion`         | Voicebox version, model repo and revision, mlx-audio version                             |
| `voice`                 | Voice profile label                                                                      |
| `voiceLicenceOrConsent` | Licence or consent record for the reference voice                                        |
| `settings`              | Language, seed, normalise, sampling defaults, encoder arguments                          |
| `durationMs`            | Length of the encoded file                                                               |
| `sha256`                | Hash of the encoded file                                                                 |
| `outputPath`            | Path relative to the output folder                                                       |
| `reviewStatus`          | Always `needs_human_review` from the script. The reviewer sets `approved` or `rejected`. |
| `reviewer`              | Reviewer's name, set at review                                                           |
| `textVersion`           | Version of the reviewed text                                                             |

Extra fields: `bytes`, `voiceboxGenerationId` and `generationSeconds`.

## Review checklist

The reviewer is a qualified Arabic teacher. Listen to the file that will be published (the MP3, not the WAV), on headphones, at normal speed.

For each take:

1. The written harakat match what is spoken, letter by letter.
2. Makharij: emphatic and plain pairs (`ص`/`س`, `ض`/`د`, `ط`/`ت`, `ظ`/`ذ`), throat letters (`ع`, `ح`, `ه`, `ء`, `غ`, `خ`), `ق`/`ك`, `ث`/`س`, `ذ`/`ز` are distinct and correct.
3. Short vowels are short; long vowels and madd (`ا`, `و`, `ي`, `آ`) are clearly long.
4. Shaddah is audibly doubled.
5. Tanwin is pronounced when the text shows it.
6. Hamzah is audible as a glottal stop where written, and hamzat al-wasl is silent in connected speech.
7. Alif maqsurah is read as a long a.
8. Ta marbutah is read as t in connected speech and h at a pause.
9. Waqaf vs washal: the ending matches the written form. A word read alone usually takes the pausal form (for example `مُعَلِّمْ` rather than `مُعَلِّمٌ`), and the model appends a full stop, which may push it towards pausing. Decide with the teacher whether isolated words are written in the pausal form, and make the text match what is spoken.
10. The first sound is not cut off, the end is not cut off, and there is no noise, hiss, echo or extra syllable.
11. The pace is suitable for learners, and the accent does not sound foreign.

Then, per utterance: mark at most one take `approved`, set `reviewer`, and mark the others `rejected`. If no take passes, regenerate with new seeds or record a human speaker. For minimal pairs and phonology lessons, prefer a human recording if in doubt (pedagogy research §8).

## Known issues

- Voicebox's in-app model download can fail with an `HF_HUB_OFFLINE` error. The direct download in the setup guide works around it.
- The smoke test used a synthetic English reference voice. A consenting native Arabic speaker's reference is likely to give a better accent, but that has not been tested.
- The Voicebox API cannot change Chatterbox's sampling settings or speed. Changing them means editing Voicebox itself.
- The Arabic quality of TADA and OmniVoice has not been compared.
