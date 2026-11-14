/**
 * Optional Arabic pronunciation aid using browser/OS text-to-speech.
 * Not a reviewed recording and not suitable as authoritative tajwid instruction.
 * No external API, audio upload, autoplay or server-side synthesis.
 */
export type ArabicVoice = { id: string; name: string; lang: string; local: boolean };
export const SPEECH_RATES = [0.65, 0.8, 1, 1.2] as const;
export type SpeechRate = (typeof SPEECH_RATES)[number];

const SETTINGS_KEY = 'belajar-bahasa-arab:speech:v1';
const ARABIC_LOCALE = 'ar-SA';

export const browserSpeech = $state<{
	initialized: boolean;
	supported: boolean;
	voices: ArabicVoice[];
	voiceId: string;
	rate: SpeechRate;
	activeKey: string | null;
	lastKey: string | null;
	error: string | null;
	errorKey: string | null;
}>({
	initialized: false,
	supported: false,
	voices: [],
	voiceId: '',
	rate: 0.8,
	activeKey: null,
	lastKey: null,
	error: null,
	errorKey: null
});

let sequence = 0;
let activeUtterance: SpeechSynthesisUtterance | undefined;

function getEngine(): SpeechSynthesis | undefined {
	if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined;
	return window.speechSynthesis;
}

function voiceId(voice: SpeechSynthesisVoice): string {
	return `${voice.voiceURI}|${voice.lang}|${voice.name}`;
}

function arabicVoices(engine: SpeechSynthesis): SpeechSynthesisVoice[] {
	return engine.getVoices().filter((voice) => /^ar(?:[-_]|$)/i.test(voice.lang));
}

function updateVoices(engine: SpeechSynthesis) {
	browserSpeech.voices = arabicVoices(engine).map((voice) => ({
		id: voiceId(voice),
		name: voice.name,
		lang: voice.lang,
		local: voice.localService
	}));
}

function readSettings() {
	try {
		const saved: unknown = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? 'null');
		if (!saved || typeof saved !== 'object') return;
		if ('voiceId' in saved && typeof saved.voiceId === 'string') {
			browserSpeech.voiceId = saved.voiceId.slice(0, 300);
		}
		if ('rate' in saved && SPEECH_RATES.some((rate) => rate === saved.rate)) {
			browserSpeech.rate = saved.rate as SpeechRate;
		}
	} catch {
		// Persistence may be disabled; speech remains usable with defaults.
	}
}

function persistSettings() {
	try {
		localStorage.setItem(
			SETTINGS_KEY,
			JSON.stringify({ voiceId: browserSpeech.voiceId, rate: browserSpeech.rate })
		);
	} catch {
		// Keep current-session preferences when localStorage is unavailable.
	}
}

export function setSpeechRate(rate: SpeechRate) {
	if (!SPEECH_RATES.includes(rate)) return;
	browserSpeech.rate = rate;
	persistSettings();
}

export function setSpeechVoice(id: string) {
	if (id && !browserSpeech.voices.some((voice) => voice.id === id)) return;
	browserSpeech.voiceId = id;
	persistSettings();
}

/**
 * Called from the root layout's onMount; keeps preferences and available
 * voices synchronized while SPA navigation swaps learning components.
 */
export function startBrowserSpeech(): () => void {
	const engine = getEngine();
	browserSpeech.initialized = true;
	browserSpeech.supported = Boolean(engine && typeof SpeechSynthesisUtterance !== 'undefined');
	readSettings();
	if (!engine || !browserSpeech.supported) {
		return () => {
			browserSpeech.initialized = false;
		};
	}
	updateVoices(engine);
	const onVoicesChanged = () => updateVoices(engine);
	const onStorage = (event: StorageEvent) => {
		if (event.key === SETTINGS_KEY) readSettings();
	};
	engine.addEventListener('voiceschanged', onVoicesChanged);
	window.addEventListener('storage', onStorage);
	return () => {
		engine.removeEventListener('voiceschanged', onVoicesChanged);
		window.removeEventListener('storage', onStorage);
		stopArabicSpeech();
		browserSpeech.initialized = false;
	};
}

export function stopArabicSpeech() {
	sequence++;
	if (activeUtterance) {
		// Detach callbacks before cancel() to ignore stale interrupted utterances.
		activeUtterance.onend = null;
		activeUtterance.onerror = null;
	}
	activeUtterance = undefined;
	browserSpeech.activeKey = null;
	try {
		getEngine()?.cancel();
	} catch {
		// Some restricted browser environments may fail to cancel.
	}
}

/** Only call from an explicit click/keyboard user action. */
export function speakArabic(text: string, key: string): boolean {
	const engine = getEngine();
	if (!engine || !browserSpeech.supported) {
		browserSpeech.error = 'Browser ini belum mendukung pembacaan suara.';
		browserSpeech.errorKey = key;
		return false;
	}
	const cleaned = text.trim().normalize('NFC');
	if (!cleaned) return false;
	const available = engine.getVoices();
	const arabic = arabicVoices(engine);
	if (available.length > 0 && arabic.length === 0) {
		browserSpeech.error =
			'Tidak ada suara bahasa Arab di perangkat. Tambahkan suara Arab melalui pengaturan sistem.';
		browserSpeech.errorKey = key;
		return false;
	}

	stopArabicSpeech();
	browserSpeech.error = null;
	browserSpeech.errorKey = null;

	const token = sequence;
	const utterance = new SpeechSynthesisUtterance(cleaned);
	const voice =
		arabic.find((item) => voiceId(item) === browserSpeech.voiceId) ??
		arabic.find((item) => item.lang.toLowerCase() === ARABIC_LOCALE.toLowerCase()) ??
		arabic.find((item) => item.default) ??
		arabic[0];
	if (voice) utterance.voice = voice;
	utterance.lang = voice?.lang ?? ARABIC_LOCALE;
	utterance.rate = browserSpeech.rate;
	utterance.pitch = 1;
	utterance.volume = 1;
	utterance.onend = () => {
		if (token !== sequence) return;
		activeUtterance = undefined;
		browserSpeech.activeKey = null;
	};
	utterance.onerror = (event) => {
		if (token !== sequence) return;
		activeUtterance = undefined;
		browserSpeech.activeKey = null;
		if (event.error === 'canceled' || event.error === 'interrupted') return;
		browserSpeech.error =
			event.error === 'language-unavailable' || event.error === 'voice-unavailable'
				? 'Suara Arab tidak tersedia. Coba pasang atau pilih suara Arab lain pada pengaturan perangkat.'
				: 'Suara tidak dapat diputar. Periksa pengaturan audio browser lalu coba lagi.';
		browserSpeech.errorKey = key;
	};
	activeUtterance = utterance;
	browserSpeech.activeKey = key;
	browserSpeech.lastKey = key;
	try {
		engine.speak(utterance);
		return true;
	} catch {
		if (token === sequence) {
			activeUtterance = undefined;
			browserSpeech.activeKey = null;
			browserSpeech.error = 'Gagal memulai audio browser.';
			browserSpeech.errorKey = key;
		}
		return false;
	}
}
