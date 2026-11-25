/**
 * Loader for the personal-use local copies in the gitignored `/content-local/` folder
 * (docs/plans/local-content-import.md, RS-12).
 *
 * The folder exists only on the owner's machine after `bun run content:import`. On CI and in
 * public builds the globs match nothing, every list is empty and no `/pustaka/*` entries are
 * prerendered. Local content never passes through `isPublishable` and never feeds `/belajar/`
 * or the published vocabulary.
 */
import type {
	LocalLesson,
	LocalLessonMeta,
	LocalSource,
	LocalSourceId,
	LocalSourceIndex,
	LocalTable,
	LocalTableMeta,
	LocalTrack,
	LocalVocabSet,
	LocalVocabSetMeta
} from '#lib/domain/local-content/types.js';

type Importer<T> = () => Promise<T>;

/** First URL segments under `/pustaka/` that belong to fixed routes, not to a track. */
export const RESERVED_TRACK_SLUGS: readonly string[] = ['kosakata', 'rujukan'];

export type LocalTrackView = LocalTrack & { sourceInfo: LocalSource };
export type LocalVocabSetView = LocalVocabSetMeta & { sourceInfo: LocalSource };
export type LocalTableView = LocalTableMeta & { sourceInfo: LocalSource };

export type LocalSourceView = {
	source: LocalSource;
	tracks: LocalTrack[];
	vocabSets: LocalVocabSetMeta[];
	tables: LocalTableMeta[];
};

/** Accept an index module only when it has the shape and schema version this code reads. */
export function isLocalSourceIndex(value: unknown): value is LocalSourceIndex {
	if (value === null || typeof value !== 'object') return false;
	const v = value as Partial<LocalSourceIndex>;
	return (
		v.schemaVersion === 1 &&
		v.source !== undefined &&
		typeof v.source === 'object' &&
		typeof v.source.id === 'string' &&
		Array.isArray(v.tracks) &&
		Array.isArray(v.vocabSets) &&
		Array.isArray(v.tables)
	);
}

export type LocalContentModules = {
	indexes: Record<string, unknown>;
	lessons: Record<string, Importer<unknown>>;
	vocab: Record<string, Importer<unknown>>;
	tables: Record<string, Importer<unknown>>;
};

/** Build the loader over glob results. Separate from the globs so tests can feed synthetic data. */
export function createLocalContent(
	modules: LocalContentModules,
	warn: (message: string) => void = (m) => console.warn(m)
) {
	const sources: LocalSourceView[] = [];
	const trackSlugs = new Set<string>();

	for (const [path, module] of Object.entries(modules.indexes).sort(([a], [b]) =>
		a.localeCompare(b)
	)) {
		if (!isLocalSourceIndex(module)) {
			warn(`content-local: skipped ${path} (not a schemaVersion 1 source index)`);
			continue;
		}
		const tracks = module.tracks.filter((track) => {
			if (RESERVED_TRACK_SLUGS.includes(track.slug) || trackSlugs.has(track.slug)) {
				warn(
					`content-local: skipped track "${track.slug}" in ${path} (reserved or duplicate slug)`
				);
				return false;
			}
			trackSlugs.add(track.slug);
			return true;
		});
		sources.push({
			source: module.source,
			tracks,
			vocabSets: module.vocabSets,
			tables: module.tables
		});
	}

	const trackViews: LocalTrackView[] = sources.flatMap((s) =>
		s.tracks.map((track) => ({ ...track, sourceInfo: s.source }))
	);
	const vocabViews: LocalVocabSetView[] = sources.flatMap((s) =>
		s.vocabSets.map((set) => ({ ...set, sourceInfo: s.source }))
	);
	const tableViews: LocalTableView[] = sources.flatMap((s) =>
		s.tables.map((table) => ({ ...table, sourceInfo: s.source }))
	);

	async function loadFile<T>(
		group: Record<string, Importer<unknown>>,
		source: LocalSourceId,
		folder: string,
		id: string
	): Promise<T | undefined> {
		const importer = group[`/content-local/${source}/${folder}/${id}.json`];
		return importer ? ((await importer()) as T) : undefined;
	}

	const sortedLessons = (track: LocalTrack): LocalLessonMeta[] =>
		[...track.lessons].sort((a, b) => a.order - b.order);

	return {
		/** True when at least one source was imported. */
		get hasContent() {
			return sources.length > 0;
		},
		sources: () => sources,
		tracks: () => trackViews,
		track: (slug: string) => trackViews.find((t) => t.slug === slug),
		vocabSets: () => vocabViews,
		vocabSet: (slug: string) => vocabViews.find((s) => s.slug === slug),
		tables: () => tableViews,
		table: (slug: string) => tableViews.find((t) => t.slug === slug),
		/** Every `[track]/[lesson]` pair, for `entries()`. */
		lessonEntries: () =>
			trackViews.flatMap((track) =>
				track.lessons.map((lesson) => ({ track: track.slug, lesson: lesson.slug }))
			),
		/** Lessons of a track in reading order, with the neighbours of one lesson. */
		neighbours(track: LocalTrack, lessonSlug: string) {
			const lessons = sortedLessons(track);
			const at = lessons.findIndex((l) => l.slug === lessonSlug);
			return {
				previous: at > 0 ? lessons[at - 1] : undefined,
				next: at !== -1 && at < lessons.length - 1 ? lessons[at + 1] : undefined
			};
		},
		sortedLessons,
		loadLesson: (source: LocalSourceId, id: string) =>
			loadFile<LocalLesson>(modules.lessons, source, 'lessons', id),
		loadVocabSet: (source: LocalSourceId, id: string) =>
			loadFile<LocalVocabSet>(modules.vocab, source, 'vocab', id),
		loadTable: (source: LocalSourceId, id: string) =>
			loadFile<LocalTable>(modules.tables, source, 'tables', id)
	};
}

export type LocalContent = ReturnType<typeof createLocalContent>;

// Root-relative globs match nothing when the folder is absent (CI, public builds).
export const localContent: LocalContent = createLocalContent({
	indexes: import.meta.glob('/content-local/*/index.json', { eager: true, import: 'default' }),
	lessons: import.meta.glob('/content-local/*/lessons/*.json', { import: 'default' }),
	vocab: import.meta.glob('/content-local/*/vocab/*.json', { import: 'default' }),
	tables: import.meta.glob('/content-local/*/tables/*.json', { import: 'default' })
});
