import type { Path } from '$app/types';

/**
 * The section pages as literals. `resolve()` stops type-checking once `Path` has more than
 * about 25 members (TypeScript cannot match a union argument against its overloads), so
 * components pass this narrow type instead. The check below keeps it honest.
 */
export type SectionPath =
	| 'belajar/'
	| 'iqra/'
	| 'latihan/'
	| 'kosakata/'
	| 'rujukan/'
	| 'cari/'
	| 'progres/'
	| 'bookmark/'
	| 'editor/theme/'
	| 'tentang/';
export const sectionPathsExist: SectionPath extends Path ? true : never = true;

/**
 * Site sections. One source of truth for the sidebar, mobile tab bar, menu sheet and footer.
 * Paths are SvelteKit 3 pathnames (no leading slash, trailing slash because the site uses
 * `trailingSlash = 'always'`), typed against the real routes; the home page uses the route
 * ID '/'. Pass them through `resolve()` from `$app/paths` when rendering.
 */
export type SectionId =
	| 'beranda'
	| 'belajar'
	| 'iqra'
	| 'latihan'
	| 'kosakata'
	| 'rujukan'
	| 'cari'
	| 'progres'
	| 'bookmark'
	| 'tema'
	| 'tentang';

export type Section = {
	id: SectionId;
	label: string;
	path: SectionPath | '/';
	/** One plain sentence: used in the menu sheet and empty states. */
	summary: string;
	/** One of the five mobile tab-bar destinations. */
	inTabBar: boolean;
};

export const sections: readonly Section[] = [
	{
		id: 'beranda',
		label: 'Beranda',
		path: '/',
		summary: 'Halaman awal dan titik untuk melanjutkan belajar.',
		inTabBar: true
	},
	{
		id: 'belajar',
		label: 'Belajar',
		path: 'belajar/',
		summary: 'Jalur utama untuk yang sudah bisa membaca tulisan Arab berharakat.',
		inTabBar: true
	},
	{
		id: 'iqra',
		label: 'Iqra',
		path: 'iqra/',
		summary: 'Jalur fondasi opsional: huruf, bunyi dan harakat dari awal.',
		inTabBar: false
	},
	{
		id: 'latihan',
		label: 'Latihan',
		path: 'latihan/',
		summary: 'Latihan mengingat dan memahami, dengan umpan balik yang menjelaskan alasannya.',
		inTabBar: true
	},
	{
		id: 'kosakata',
		label: 'Kosakata',
		path: 'kosakata/',
		summary: 'Daftar kata yang sudah dipelajari, lengkap dengan contoh dalam konteks.',
		inTabBar: true
	},
	{
		id: 'rujukan',
		label: 'Jenis kata',
		path: 'rujukan/',
		summary: 'Kata kerja, kata benda, kata hubung, dan kata tanya, ringkas dan bisa dihafal.',
		inTabBar: false
	},
	{
		id: 'cari',
		label: 'Cari',
		path: 'cari/',
		summary: 'Cari arti kata Arab, pelajaran, latihan, atau tabel dari perangkat ini.',
		inTabBar: false
	},
	{
		id: 'progres',
		label: 'Progres',
		path: 'progres/',
		summary: 'Ringkasan belajar yang tersimpan di perangkat ini.',
		inTabBar: true
	},
	{
		id: 'bookmark',
		label: 'Bookmark',
		path: 'bookmark/',
		summary: 'Pelajaran dan kata yang Anda tandai untuk dibuka lagi.',
		inTabBar: false
	},
	{
		id: 'tema',
		label: 'Tema',
		path: 'editor/theme/',
		summary: 'Atur warna, huruf dan mode terang atau gelap sesuai kenyamanan Anda.',
		inTabBar: false
	},
	{
		id: 'tentang',
		label: 'Tentang',
		path: 'tentang/',
		summary: 'Metode, sumber, status materi dan cara data Anda disimpan.',
		inTabBar: false
	}
];

export function sectionById(id: SectionId): Section {
	const section = sections.find((s) => s.id === id);
	if (!section) throw new Error(`Unknown section: ${id}`);
	return section;
}

/**
 * Which section a route belongs to, for `aria-current`. Uses the SvelteKit route ID
 * (`page.route.id`, e.g. '/latihan' or '/belajar/[slug]'), which is identical during
 * prerendering and in the browser and does not depend on the base path. Matches whole
 * path segments, so a future '/belajar-lanjut' does not count as 'belajar'.
 */
export function activeSectionId(routeId: string | null | undefined): SectionId | undefined {
	if (routeId == null) return undefined;
	const first = routeId.split('/').filter(Boolean)[0];
	if (first === undefined) return 'beranda';
	return sections.find((s) => s.path !== '/' && s.path.split('/')[0] === first)?.id;
}
