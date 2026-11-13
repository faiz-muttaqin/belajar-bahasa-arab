import type { Component } from 'svelte';
import Apple from '@lucide/svelte/icons/apple';
import Book from '@lucide/svelte/icons/book';
import Car from '@lucide/svelte/icons/car';
import DoorOpen from '@lucide/svelte/icons/door-open';
import Droplet from '@lucide/svelte/icons/droplet';
import House from '@lucide/svelte/icons/house';
import Moon from '@lucide/svelte/icons/moon';
import Pencil from '@lucide/svelte/icons/pencil';
import School from '@lucide/svelte/icons/school';
import Sun from '@lucide/svelte/icons/sun';
import TreePine from '@lucide/svelte/icons/tree-pine';
import Utensils from '@lucide/svelte/icons/utensils';
import type { VocabIconKey } from '#lib/domain/vocabulary/types.js';

/**
 * Curated association icons (Lucide, ISC licence). Content refers to icons by key so
 * the bundle only contains this short list. Add a key here before using it in content.
 */
export const vocabIcons: Record<VocabIconKey, Component> = {
	book: Book,
	pen: Pencil,
	house: House,
	door: DoorOpen,
	school: School,
	water: Droplet,
	food: Utensils,
	apple: Apple,
	tree: TreePine,
	sun: Sun,
	moon: Moon,
	car: Car
};
