import type { Component } from 'svelte';
import BookA from '@lucide/svelte/icons/book-a';
import BookOpen from '@lucide/svelte/icons/book-open';
import Bookmark from '@lucide/svelte/icons/bookmark';
import ChartNoAxesColumn from '@lucide/svelte/icons/chart-no-axes-column';
import House from '@lucide/svelte/icons/house';
import Info from '@lucide/svelte/icons/info';
import Languages from '@lucide/svelte/icons/languages';
import ListChecks from '@lucide/svelte/icons/list-checks';
import Palette from '@lucide/svelte/icons/palette';
import Table2 from '@lucide/svelte/icons/table-2';
import type { SectionId } from '#lib/navigation.js';

/** One icon per section, reused as a marker in the tab bar, menu, page intros and footer. */
export const sectionIcons: Record<SectionId, Component> = {
	beranda: House,
	belajar: BookOpen,
	iqra: Languages,
	latihan: ListChecks,
	kosakata: BookA,
	rujukan: Table2,
	progres: ChartNoAxesColumn,
	bookmark: Bookmark,
	tema: Palette,
	tentang: Info
};
