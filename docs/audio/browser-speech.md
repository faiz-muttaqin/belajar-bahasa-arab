# Browser Arabic speech (F-08)

Status: implemented as optional **browser-generated audio**; human validation on
physical devices remains necessary. This supplements rather than replaces the
existing Voicebox/human-recording workflow (A-01/A-02/A-03).

## Why this approach

The public learning website is SvelteKit 3, fully prerendered and static.
The browser Web Speech API (speech synthesis) offers a simple one-click
pronunciation aid without bundling a server, API key, audio-generation model
or large MP3 library.

It does **not** guarantee exact Arabic phonology, tajwid, case-ending
vowels, local availability or offline playback. Some system voices are
downloaded on demand. The UI explicitly says it is synthesized and not
teacher-reviewed; the same Arabic text remains readable with JavaScript off.

Documentation reviewed 2026-11-14:

- [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
- [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)
- [SpeechSynthesis.getVoices()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices)
- [voiceschanged](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event)
- [cancel()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel)
- [rate](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate)

## Components and behavior

- `src/lib/audio/speech.svelte.ts`: single root-layout controller
  initialized only on the client. Uses `speechSynthesis.getVoices()`,
  listens for `voiceschanged`, chooses an Arabic `ar-*` voice when known,
  or sets `ar-SA` if the asynchronous voice list is still empty. If the
  voice list is known and contains no Arabic voice, it refuses English
  fallback and explains the installation requirement.
- `src/lib/components/learning/AudioPlayButton.svelte`: user-clicked
  play/stop/replay button; each trigger has a unique component identifier.
  Starting one audio cancels any previous utterance. Unmounting a playing
  button cancels it. No autoplay or audio network fetch by our application.
- `SpeechSettings.svelte`: optional device voice and speed 0.65×, 0.8×,
  1×, 1.2×; preferences saved in versioned `localStorage` (best effort).
  A voice can be changed if `voiceschanged` updates available entries;
  if a previously selected voice is gone, the controller chooses a
  matching available Arabic voice.
- Buttons are placed in published lesson examples, original vocalized
  passages, sentence breakdown, word analysis, Arabic exercises,
  vocabulary cards, sharaf dictionary and tashrif details/word glossary.
  Hiding harakat visually does **not** remove them from the spoken input.
- Each button reports errors near the item. `aria-pressed`, labels,
  keyboard controls and ≥44px targets aid usability.
- Built with native APIs, zero extra packages or server endpoints. Works
  alongside static HTML and IndexedDB vocabulary/sharaf caches.

## Decision on accuracy and privacy

This is **not** a generated audio asset reviewed against the curriculum.
Do not silently mark an item `reviewStatus: 'approved'` or satisfy A-02
with browser synthesis. Synthesizer voices may process text using a cloud
service provided by the OS/browser, even though this application does not
send requests itself. The audio quality, voice data, user locale and
ability to work offline vary by device.

Future reviewed MP3/Opus clips can take precedence over browser synthesis
when they pass the listening check; retain browser TTS as an explicitly
labelled optional fallback.

## Verification

- `bun run verify`: strict TypeScript, lint, unit, static build, E2E.
- `tests/e2e/browser-arabic-audio.e2e.ts`: mock voice selection, click,
  stop, replay, rate persistence, no Arabic voice, audio/text independence
  when toggling harakat, and readable lessons with no JS.
- Manual QA outstanding on Android Chrome, iOS Safari, macOS Safari/Chrome:
  quality of a known Arabic voice, how `voiceschanged` populates,
  pronunciation of hamza, madd, shadda, sukun, definite article and
  endings, interaction with silent mode and background/tab navigation.

## Other tracker work

F-07: IndexedDB progress/bookmark/review queue and export/import — pending.
F-09: FSRS client-side scheduler — pending, should use F-07 storage model.
F-06: static reviewed-audio manifest/checksum validation — still pending.
A-02/A-03: listener review and encoding choices for _recorded_ clips —
unchanged.
