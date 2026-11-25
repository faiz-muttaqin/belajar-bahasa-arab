/**
 * Importer: Arabic Vocab Trainer. Reads ONLY `public/data/book1.json`, `book2.json` and
 * `book3.json`. `public/index.html` (Firebase key) and the Firestore rules (admin email) are
 * never opened, and nothing else in the clone is read.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { LocalVocabItem, LocalVocabSet } from '../../src/lib/domain/local-content/types.js';
import { makeSource, pad, readSourceFile, type ImportResult } from './common.js';

const BOOK_FILES = ['book1.json', 'book2.json', 'book3.json'];
const HARAKAT = /[ً-ْٰ]/;

type RawLesson = { book?: unknown; lesson?: unknown; lesson_label?: unknown; items?: unknown };

function text(v: unknown): string {
	return typeof v === 'string' ? v.trim() : '';
}

export function convertBook(raw: unknown, origin: string): LocalVocabSet[] {
	if (!Array.isArray(raw)) throw new Error(`${origin}: expected an array of lessons`);
	const sets: LocalVocabSet[] = [];
	for (const entry of raw as RawLesson[]) {
		const book = Number(entry.book);
		const lesson = Number(entry.lesson);
		if (!Number.isInteger(book) || !Number.isInteger(lesson) || !Array.isArray(entry.items)) {
			throw new Error(`${origin}: lesson entry without book, lesson or items`);
		}
		const items: LocalVocabItem[] = [];
		(entry.items as Record<string, unknown>[]).forEach((item, i) => {
			const arabic = text(item.arabic);
			const meaning = text(item.english);
			if (!arabic || !meaning) return;
			const plural = text(item.plural);
			items.push({
				id: text(item.id) || `b${book}-l${lesson}-${pad(i + 1, 3)}`,
				arabic,
				meaning,
				...(plural ? { plural } : {})
			});
		});
		const withHarakat = items.filter((i) => HARAKAT.test(i.arabic)).length;
		const caveats = [
			'Arti dalam bahasa Inggris, sesuai sumber. Tidak diterjemahkan.',
			'Teks Arab berasal dari OCR dan bisa memuat kesalahan, misalnya kata yang tertulis menyambung atau huruf keliru. Kesalahan dibiarkan apa adanya.',
			`${withHarakat} dari ${items.length} kata berharakat; sisanya tanpa harakat.`
		];
		if (book === 3) caveats.push('Buku asal untuk buku 3 tidak disebutkan di repositori sumber.');
		sets.push({
			id: `vocab-b${book}-l${pad(lesson)}`,
			slug: `buku-${book}-pelajaran-${pad(lesson)}`,
			title: `Buku ${book}, pelajaran ${lesson}`,
			order: book * 1000 + lesson,
			itemCount: items.length,
			source: 'arabic-vocab',
			meaningLang: 'en',
			items,
			origin,
			caveats
		});
	}
	return sets;
}

export function importSource(root: string, options: { now?: Date } = {}): ImportResult {
	const vocabSets: LocalVocabSet[] = [];
	for (const file of BOOK_FILES) {
		const path = `public/data/${file}`;
		if (!existsSync(join(root, path))) continue;
		vocabSets.push(...convertBook(JSON.parse(readSourceFile(root, path)) as unknown, path));
	}
	vocabSets.sort((a, b) => a.order - b.order);
	return {
		index: {
			schemaVersion: 1,
			source: makeSource('arabic-vocab', root, options.now),
			tracks: [],
			vocabSets: vocabSets.map(({ id, slug, title, order, itemCount }) => ({
				id,
				slug,
				title,
				order,
				itemCount
			})),
			tables: []
		},
		lessons: [],
		vocabSets,
		tables: []
	};
}
