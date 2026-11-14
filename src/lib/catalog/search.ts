import { stripHarakat } from '#lib/domain/arabic/harakat.js';
import { groupOfTable } from '#lib/content/reference-groups.js';
import type { Catalog } from './types.js';

export const searchKinds = {
	word: 'Kamus',
	lesson: 'Pelajaran',
	exercise: 'Latihan',
	reference: 'Jenis kata'
} as const;

export type SearchKind = keyof typeof searchKinds;
type LessonLink = `${'belajar' | 'iqra'}/${string}/`;
type SearchLink =
	| LessonLink
	| `${LessonLink | 'kosakata/' | 'rujukan/fiil/' | 'rujukan/isim/' | 'rujukan/harf/' | 'rujukan/kata-tanya/' | 'rujukan/' | 'sharaf/'}#${string}`;

type Entry = {
	key: string;
	kind: SearchKind;
	href: SearchLink;
	title: string;
	arabic?: string;
	context?: string;
};
type SearchEntry = Entry & { primary: string; arabicKey: string; secondary: string };
const arabicPattern = /\p{Script=Arabic}/u;

function normalize(text: string) {
	return stripHarakat(text.normalize('NFKC'))
		.toLowerCase()
		.replace(/[أإآٱ]/gu, 'ا')
		.replace(/ى/gu, 'ي')
		.replace(/ـ/gu, '')
		.replace(/[^\p{L}\p{N}]+/gu, ' ')
		.trim();
}

function buildEntry(entry: Entry, extra: string[] = []): SearchEntry {
	return {
		...entry,
		primary: normalize(entry.title),
		arabicKey: normalize(entry.arabic ?? ''),
		secondary: normalize([entry.context ?? '', ...extra].join(' '))
	};
}

export function indexCatalog(catalog: Catalog): SearchEntry[] {
	const entries: SearchEntry[] = [];

	for (const entry of catalog.sharaf ?? []) {
		entries.push(
			buildEntry(
				{
					key: `sharaf:${entry.id}`,
					kind: 'word',
					href: `sharaf/#${entry.id}`,
					title: entry.meaning,
					arabic: entry.lemma,
					context: entry.bab ? `Sharaf · Bab ${entry.bab.number}` : 'Sharaf'
				},
				[
					entry.root ?? '',
					[...(entry.root ?? '')].join(' '),
					...entry.forms.map((form) => form.value)
				]
			)
		);
	}

	for (const word of catalog.vocabulary) {
		entries.push(
			buildEntry({
				key: `vocab:${word.id}`,
				kind: 'word',
				href: `kosakata/#kata-${word.id}`,
				title: word.meaning,
				arabic: word.arabic,
				context: word.context
			})
		);
	}

	for (const lesson of catalog.lessons) {
		const href = `${lesson.track}/${lesson.slug}/` as const;
		const passage = lesson.passage;
		const words = [
			...(lesson.analysis ?? []).flatMap((group) => group.sentences),
			...(passage?.analysis ?? []).flat()
		].flatMap((sentence) => sentence.words);
		entries.push(
			buildEntry(
				{
					key: lesson.id,
					kind: 'lesson',
					href,
					title: lesson.title,
					arabic: passage?.arabicTitle,
					context: lesson.goal
				},
				[
					lesson.intro,
					...lesson.patterns,
					passage?.title ?? '',
					...lesson.examples.flatMap(({ arabic, meaning, note }) => [arabic, meaning, note ?? '']),
					...(passage?.paragraphs ?? []).flatMap(({ arabic, meaning, role }) => [
						arabic,
						meaning,
						role
					]),
					...words.flat()
				]
			)
		);

		for (const [index, exercise] of lesson.exercises.entries()) {
			entries.push(
				buildEntry(
					{
						key: `${lesson.id}:exercise:${index}`,
						kind: 'exercise',
						href: `${href}#soal-${index + 1}`,
						title: exercise.prompt,
						arabic: exercise.arabic,
						context: lesson.title
					},
					[exercise.answer]
				)
			);
		}

		const glossary = (passage?.glossary ?? []).map(({ arabic, meaning }) => ({
			arabic,
			meaning,
			context: lesson.title,
			link: href
		}));
		const annotations = words.map(([arabic, meaning, kind, sharaf, nahwu]) => ({
			arabic,
			meaning,
			context: `${kind} · ${lesson.title}`,
			link: `${href}#bedah-kalimat` as const,
			extra: [sharaf, nahwu]
		}));
		const seen = new Set<string>();
		for (const [index, word] of [...annotations, ...glossary].entries()) {
			const key = `${normalize(word.arabic)}:${normalize(word.meaning)}`;
			if (seen.has(key)) continue;
			seen.add(key);
			entries.push(
				buildEntry(
					{
						key: `${lesson.id}:word:${index}`,
						kind: 'word',
						href: word.link,
						title: word.meaning,
						arabic: word.arabic,
						context: word.context
					},
					'extra' in word ? word.extra : []
				)
			);
		}
	}

	for (const table of catalog.references) {
		const page = (groupOfTable(table.id)?.path ?? 'rujukan/') as
			'rujukan/fiil/' | 'rujukan/isim/' | 'rujukan/harf/' | 'rujukan/kata-tanya/' | 'rujukan/';
		const href = `${page}#${table.id}` as const;
		entries.push(
			buildEntry({
				key: table.id,
				kind: 'reference',
				href,
				title: table.title,
				context: table.caption
			})
		);
		for (const row of table.rows) {
			const arabic = row.cells.arabic ?? row.cells.pattern ?? row.cells.fataha;
			const title = row.cells.meaning ?? row.cells.form ?? table.title;
			const context = row.cells.effect ?? row.explanation ?? table.title;
			entries.push(
				buildEntry(
					{
						key: `${table.id}:${row.id}`,
						kind: 'reference',
						href: `${page}#${table.id}-${row.id}`,
						title,
						arabic,
						context
					},
					[table.title, ...Object.values(row.cells), row.explanation ?? '']
				)
			);
		}
	}

	return entries;
}

function matchScore(field: string, term: string) {
	if (field === term) return 10;
	if (field.startsWith(term)) return 6;
	if (term.length > 1 && field.includes(term)) return 2;
	return field.split(' ').includes(term) ? 2 : 0;
}

export function searchCatalog(index: readonly SearchEntry[], query: string, kind?: SearchKind) {
	const normalized = normalize(query.slice(0, 100));
	if (!normalized) return [];
	const terms = [...new Set(normalized.split(' '))];

	return index
		.flatMap((entry) => {
			if (kind && entry.kind !== kind) return [];
			let score = 0;
			for (const term of terms) {
				const weight = Math.max(
					matchScore(entry.primary, term) * 2,
					matchScore(entry.arabicKey, term) * 3,
					matchScore(entry.secondary, term)
				);
				if (weight === 0) return [];
				score += weight;
			}
			if (entry.primary === normalized || entry.arabicKey === normalized) score += 25;
			if (entry.key.startsWith('vocab:')) score += 1;
			return [{ entry, score }];
		})
		.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, 'id'))
		.map(({ entry }) => entry);
}

export function hasArabic(text: string) {
	return arabicPattern.test(text);
}
