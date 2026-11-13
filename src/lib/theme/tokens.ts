// Theme token definitions. The default values here must match `src/routes/layout.css`
// (a unit test enforces this). See docs/decisions/0003-default-theme-and-editor.md.

export const COLOR_TOKENS = [
	'background',
	'foreground',
	'card',
	'card-foreground',
	'popover',
	'popover-foreground',
	'primary',
	'primary-foreground',
	'secondary',
	'secondary-foreground',
	'muted',
	'muted-foreground',
	'accent',
	'accent-foreground',
	'destructive',
	'border',
	'input',
	'ring',
	'chart-1',
	'chart-2',
	'chart-3',
	'chart-4',
	'chart-5',
	'sidebar',
	'sidebar-foreground',
	'sidebar-primary',
	'sidebar-primary-foreground',
	'sidebar-accent',
	'sidebar-accent-foreground',
	'sidebar-border',
	'sidebar-ring'
] as const;

export type ColorToken = (typeof COLOR_TOKENS)[number];
export type ColorTokens = Record<ColorToken, string>;
export type Mode = 'light' | 'dark';
export type ModePreference = Mode | 'system';

export const MODE_PREFERENCES: readonly ModePreference[] = ['light', 'dark', 'system'];

/** Font choices are stored as ids, never as free text, so stored data cannot inject CSS. */
export const UI_FONTS = {
	'plus-jakarta-sans': {
		label: 'Plus Jakarta Sans',
		stack: "'Plus Jakarta Sans Variable', ui-sans-serif, system-ui, sans-serif"
	},
	system: {
		label: 'Huruf sistem',
		stack: 'ui-sans-serif, system-ui, sans-serif'
	}
} as const;

export const ARABIC_FONTS = {
	'noto-naskh-arabic': {
		label: 'Noto Naskh Arabic',
		stack: "'Noto Naskh Arabic Variable', 'Noto Naskh Arabic', serif"
	},
	amiri: { label: 'Amiri', stack: "'Amiri', serif" },
	'scheherazade-new': { label: 'Scheherazade New', stack: "'Scheherazade New', serif" }
} as const;

export type UiFontId = keyof typeof UI_FONTS;
export type ArabicFontId = keyof typeof ARABIC_FONTS;

/** Values shared by light and dark mode. */
export type SharedTokens = {
	/** Base corner radius in rem. */
	radius: number;
	uiFont: UiFontId;
	arabicFont: ArabicFontId;
};

export type Theme = { light: ColorTokens; dark: ColorTokens; shared: SharedTokens };

export const RADIUS_MIN = 0;
export const RADIUS_MAX = 1.5;
export const RADIUS_STEP = 0.125;

export const DEFAULT_THEME: Theme = {
	light: {
		background: '#fbfaf7',
		foreground: '#17212d',
		card: '#ffffff',
		'card-foreground': '#17212d',
		popover: '#ffffff',
		'popover-foreground': '#17212d',
		primary: '#145f4c',
		'primary-foreground': '#ffffff',
		secondary: '#eaf1ee',
		'secondary-foreground': '#17302a',
		muted: '#f1f1ec',
		'muted-foreground': '#56616b',
		accent: '#ddefe7',
		'accent-foreground': '#0f4a3b',
		destructive: '#a61e14',
		border: '#e1e4de',
		input: '#8a938e',
		ring: '#145f4c',
		'chart-1': '#145f4c',
		'chart-2': '#2f7fa3',
		'chart-3': '#b7791f',
		'chart-4': '#7a5ba6',
		'chart-5': '#c2554a',
		sidebar: '#f4f5f0',
		'sidebar-foreground': '#17212d',
		'sidebar-primary': '#145f4c',
		'sidebar-primary-foreground': '#ffffff',
		'sidebar-accent': '#e6eee9',
		'sidebar-accent-foreground': '#17302a',
		'sidebar-border': '#e1e4de',
		'sidebar-ring': '#145f4c'
	},
	dark: {
		background: '#111715',
		foreground: '#e8ece9',
		card: '#18201d',
		'card-foreground': '#e8ece9',
		popover: '#1c2522',
		'popover-foreground': '#e8ece9',
		primary: '#7ad4b0',
		'primary-foreground': '#0b2a20',
		secondary: '#22302b',
		'secondary-foreground': '#e8ece9',
		muted: '#1e2825',
		'muted-foreground': '#a2ada8',
		accent: '#1f3b32',
		'accent-foreground': '#cdefe2',
		destructive: '#f59d93',
		border: '#2b3732',
		input: '#6b7873',
		ring: '#7ad4b0',
		'chart-1': '#7ad4b0',
		'chart-2': '#7cc0e0',
		'chart-3': '#e8b661',
		'chart-4': '#b9a2de',
		'chart-5': '#ee9a8f',
		sidebar: '#151c19',
		'sidebar-foreground': '#e8ece9',
		'sidebar-primary': '#7ad4b0',
		'sidebar-primary-foreground': '#0b2a20',
		'sidebar-accent': '#22302b',
		'sidebar-accent-foreground': '#e8ece9',
		'sidebar-border': '#2b3732',
		'sidebar-ring': '#7ad4b0'
	},
	shared: {
		radius: 0.625,
		uiFont: 'plus-jakarta-sans',
		arabicFont: 'noto-naskh-arabic'
	}
};

/** Indonesian labels for the editor, grouped the way people think about a page. */
export const COLOR_GROUPS: { id: string; title: string; open?: boolean; tokens: ColorToken[] }[] = [
	{
		id: 'dasar',
		title: 'Dasar halaman',
		open: true,
		tokens: ['background', 'foreground', 'muted', 'muted-foreground', 'border']
	},
	{
		id: 'utama',
		title: 'Warna utama dan tombol',
		open: true,
		tokens: ['primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'ring']
	},
	{
		id: 'sorotan',
		title: 'Sorotan dan peringatan',
		tokens: ['accent', 'accent-foreground', 'destructive']
	},
	{
		id: 'permukaan',
		title: 'Kartu, popover dan isian',
		tokens: ['card', 'card-foreground', 'popover', 'popover-foreground', 'input']
	},
	{
		id: 'grafik',
		title: 'Grafik',
		tokens: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']
	},
	{
		id: 'sidebar',
		title: 'Sidebar',
		tokens: [
			'sidebar',
			'sidebar-foreground',
			'sidebar-primary',
			'sidebar-primary-foreground',
			'sidebar-accent',
			'sidebar-accent-foreground',
			'sidebar-border',
			'sidebar-ring'
		]
	}
];

export const COLOR_LABELS: Record<ColorToken, string> = {
	background: 'Latar halaman',
	foreground: 'Teks utama',
	card: 'Latar kartu',
	'card-foreground': 'Teks kartu',
	popover: 'Latar popover',
	'popover-foreground': 'Teks popover',
	primary: 'Warna utama',
	'primary-foreground': 'Teks di atas warna utama',
	secondary: 'Warna sekunder',
	'secondary-foreground': 'Teks di atas warna sekunder',
	muted: 'Latar redup',
	'muted-foreground': 'Teks redup',
	accent: 'Sorotan',
	'accent-foreground': 'Teks sorotan',
	destructive: 'Peringatan atau hapus',
	border: 'Garis pemisah',
	input: 'Garis isian',
	ring: 'Cincin fokus',
	'chart-1': 'Grafik 1',
	'chart-2': 'Grafik 2',
	'chart-3': 'Grafik 3',
	'chart-4': 'Grafik 4',
	'chart-5': 'Grafik 5',
	sidebar: 'Latar sidebar',
	'sidebar-foreground': 'Teks sidebar',
	'sidebar-primary': 'Warna utama sidebar',
	'sidebar-primary-foreground': 'Teks di atas warna utama sidebar',
	'sidebar-accent': 'Sorotan sidebar',
	'sidebar-accent-foreground': 'Teks sorotan sidebar',
	'sidebar-border': 'Garis sidebar',
	'sidebar-ring': 'Cincin fokus sidebar'
};

export const MODE_LABELS: Record<ModePreference, string> = {
	light: 'Terang',
	dark: 'Gelap',
	system: 'Ikuti sistem'
};

export const isColorToken = (key: string): key is ColorToken =>
	(COLOR_TOKENS as readonly string[]).includes(key);

export const isUiFontId = (value: unknown): value is UiFontId =>
	typeof value === 'string' && Object.hasOwn(UI_FONTS, value);

export const isArabicFontId = (value: unknown): value is ArabicFontId =>
	typeof value === 'string' && Object.hasOwn(ARABIC_FONTS, value);

export const cloneTheme = (theme: Theme): Theme => ({
	light: { ...theme.light },
	dark: { ...theme.dark },
	shared: { ...theme.shared }
});
