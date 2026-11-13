# Voicebox local setup for audio generation

This guide sets up Voicebox on a new editor machine so you can generate Arabic audio for this website. For the engine facts, smoke-test results and review checklist, read [voicebox-arabic.md](voicebox-arabic.md).

Voicebox is an editor-side tool only. It must never run in the website frontend, on a server, or in CI (see `AGENTS.md`). Nothing in this repo's build installs or calls it.

## What you need

| Item                   | Notes                                                                                                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mac with Apple Silicon | Tested on an M4 Pro, 24 GB RAM, macOS 27.0.1. Voicebox uses the MLX build of Chatterbox on Apple Silicon. Other platforms use a different PyTorch model and were not tested. |
| Homebrew tools         | `brew install git python@3.12 just ffmpeg`                                                                                                                                   |
| Disk space             | About 2.6 GB for the Python environment, 3.2 GB for the Chatterbox model, 0.3 GB for Kokoro (only if you make a synthetic reference voice).                                  |
| Network                | Only for the first install and model download. Generation runs offline.                                                                                                      |

Stop the website dev server (`bun run dev`, port 5173) and preview server (port 4173) before you start Voicebox. The batch script refuses to run while either port is open.

## 1. Clone the two repos

```bash
git clone https://github.com/jamiepine/voicebox.git ~/git/voicebox
```

```bash
git -C ~/git/voicebox checkout 8af7efe62fab8d33e2a5dfbedabaa45f68a5184f
```

That commit (Voicebox 0.6.0) is the version tested in this guide. A newer commit may work, but re-run the smoke test before trusting it.

You also need this website repo, because the batch script lives at `docs/audio/voicebox_arabic_batch.py`.

## 2. Install the Voicebox backend

You only need the Python backend. The desktop app (Rust, Tauri, Bun) is not required.

```bash
cd ~/git/voicebox && just setup-python
```

This creates `backend/venv` with Python 3.12 and installs the dependencies for every engine, including MLX and `mlx-audio==0.4.1` on Apple Silicon. On the tested machine the environment is 2.6 GB.

## 3. Start the server

Keep data and models outside the repo so a re-clone does not lose them:

```bash
mkdir -p ~/git/voicebox-data/hf/hub
```

```bash
cd ~/git/voicebox && VOICEBOX_MODELS_DIR="$HOME/git/voicebox-data/hf/hub" backend/venv/bin/python -m backend.main --port 17493 --data-dir "$HOME/git/voicebox-data"
```

Check it in another terminal:

```bash
curl -s http://127.0.0.1:17493/health
```

You should see `"status":"healthy"` and `"backend_type":"mlx"`. Stop the server with Ctrl-C when you finish.

## 4. Download the Chatterbox model

Arabic needs the `chatterbox-tts` model (about 3.2 GB from Hugging Face). Ask Voicebox to fetch it:

```bash
curl -s -X POST http://127.0.0.1:17493/models/download -H 'Content-Type: application/json' -d '{"model_name":"chatterbox-tts"}'
```

Check progress with `curl -s http://127.0.0.1:17493/tasks/active`.

If that reports an error mentioning `HF_HUB_OFFLINE`, or the download stalls, fetch the files directly into the same cache. The server picks them up without a restart.

```bash
cd ~/git/voicebox && HF_HUB_OFFLINE=0 HF_HUB_DISABLE_XET=1 HF_HUB_CACHE="$HOME/git/voicebox-data/hf/hub" backend/venv/bin/python -c "from huggingface_hub import snapshot_download as d; [print(d(r)) for r in ('mlx-community/S3TokenizerV2', 'mlx-community/chatterbox-multilingual-v3')]"
```

`HF_HUB_DISABLE_XET=1` switches to plain HTTP downloads. On the tested network the default Xet transfer stalled at about 40 MB.

Confirm the downloaded revisions match the tested ones:

```bash
cat ~/git/voicebox-data/hf/hub/models--mlx-community--chatterbox-multilingual-v3/refs/main ~/git/voicebox-data/hf/hub/models--mlx-community--S3TokenizerV2/refs/main
```

Tested revisions: `03565773edd72e949572557597af8063bb49a18a` (chatterbox-multilingual-v3) and `e0c9886f0e1c35ae85b1f27277416fb19fc72bec` (S3TokenizerV2). If yours differ, the upstream model changed: re-run the smoke test and record the new revision.

## 5. Create a voice profile

The MLX Chatterbox model has no built-in default voice, so every generation clones a reference recording. Pick one of these, and record the choice in the manifest.

**A consenting speaker (recommended for published audio).** Record 8 to 12 seconds of clean speech from the speaker, ideally a native Arabic speaker, because Chatterbox can carry the reference speaker's accent into the output. Get written consent that covers synthetic reuse of their voice on this website, and store it outside the repo. Do not clone anyone without that consent.

**A synthetic reference (testing only).** Make the reference with the local Kokoro model (`hexgrad/Kokoro-82M`, Apache-2.0, about 0.3 GB). No real person is cloned, but expect a non-Arabic accent. This is what the smoke test used.

Create a Kokoro preset profile and render a reference clip:

```bash
curl -s -X POST http://127.0.0.1:17493/profiles -H 'Content-Type: application/json' -d '{"name":"Kokoro am_michael","language":"en","voice_type":"preset","preset_engine":"kokoro","preset_voice_id":"am_michael","default_engine":"kokoro"}'
```

```bash
curl -s -X POST http://127.0.0.1:17493/generate -H 'Content-Type: application/json' -d '{"profile_id":"<kokoro profile id>","engine":"kokoro","language":"en","seed":7,"text":"This is a short reference recording made for testing speech synthesis. It is read at a steady and even pace, with a clear pause between each phrase, and nothing else."}'
```

When `curl -s http://127.0.0.1:17493/history/<generation id>` shows `"status":"completed"`, save the clip:

```bash
curl -s -o ref.wav http://127.0.0.1:17493/audio/<generation id>
```

Then create the cloned profile that Chatterbox uses, and attach the reference with its exact transcript. Use the same steps with a consenting speaker's WAV.

```bash
curl -s -X POST http://127.0.0.1:17493/profiles -H 'Content-Type: application/json' -d '{"name":"QA Arabic ref (synthetic Kokoro am_michael)","language":"en","voice_type":"cloned","default_engine":"chatterbox"}'
```

```bash
curl -s -X POST http://127.0.0.1:17493/profiles/<cloned profile id>/samples -F "file=@ref.wav" -F "reference_text=This is a short reference recording made for testing speech synthesis. It is read at a steady and even pace, with a clear pause between each phrase, and nothing else."
```

List profiles and their ids with `curl -s http://127.0.0.1:17493/profiles`.

## 6. Generate audio

Write a JSON file of reviewed Arabic utterances. Every item needs `id`, `arabicText` (fully vocalised, exactly as it should be spoken), `variant` (`msa` or `classical`) and `textVersion`. `takes` is optional.

```json
[
	{
		"id": "qa-typo-003",
		"arabicText": "مُعَلِّمٌ",
		"variant": "msa",
		"textVersion": "qa-specimen-1",
		"takes": 3
	}
]
```

Run the batch script from the website repo:

```bash
python3 docs/audio/voicebox_arabic_batch.py --input utterances.json --out ~/voicebox-out/batch-01 --profile-id <cloned profile id> --voice "QA Arabic ref (synthetic Kokoro am_michael)" --voice-consent "Synthetic Kokoro-82M voice am_michael, Apache-2.0; no real person"
```

Output:

- `masters/<id>/take-<n>.wav`: the 24 kHz master from Voicebox. Keep it locally; do not publish it.
- `mp3/<id>/take-<n>.mp3`: the web encoding (MP3, 64 kbps, mono). Add `--format both` to also get `opus/<id>/take-<n>.opus`.
- `manifest.json`: one entry per encoded file, every one marked `needs_human_review`.

Then follow the review steps in [voicebox-arabic.md](voicebox-arabic.md). Only approved takes go into `static/`.

## Troubleshooting

| Symptom                                    | Fix                                                                                                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `port 5173 is listening`                   | Stop the website dev server, then re-run.                                                                                                                    |
| `CI is set`                                | Expected. Never generate audio in CI.                                                                                                                        |
| Download error mentioning `HF_HUB_OFFLINE` | Use the direct download command in step 4.                                                                                                                   |
| Download stuck at the same size            | Kill it and re-run with `HF_HUB_DISABLE_XET=1`. It resumes.                                                                                                  |
| Machine slow after generating              | Free the model memory: `curl -s -X POST http://127.0.0.1:17493/models/chatterbox-tts/unload`, or stop the server.                                            |
| `generation ... timed out`                 | The first take loads the model (about 3 GB). Re-run the same command: finished takes in the manifest are kept and skipped. `--force` regenerates everything. |
