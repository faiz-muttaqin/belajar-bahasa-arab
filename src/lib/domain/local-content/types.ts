/**
 * Local content contract (personal-use mode).
 *
 * Copies of third-party curriculum converted by `scripts/import-local/` into the gitignored
 * `/content-local/` folder. This material is for the owner's own study on their own machine:
 * it is never committed, never pushed and never part of a public deploy, and it bypasses the
 * review gate (ADR-004 D-7) only because it is never published. Every item keeps its source,
 * so the UI can always label it "salinan lokal, belum ditinjau".
 *
 * Plan and status: docs/plans/local-content-import.md.
 */

export type LocalSourceId = 'cahaya-tauhid' | 'learn-tajweed' | 'arabic-grammar' | 'arabic-vocab';

/** Language of the running prose. 'ar' bodies render RTL as a whole. */
export type ContentLang = 'id' | 'ar' | 'en';

export type LocalSource = {
	id: LocalSourceId;
	name: string;
	repoUrl: string;
	/** Commit the import was made from (pinned in docs/research/SOURCE_INVENTORY.md). */
	commit: string;
	licence: string;
	/** Attribution line shown on every page that uses this source. */
	attribution: string;
	/** ISO date of the import run. */
	importedAt: string;
};

/** Inline run of text. Formatting flags combine; `lang: 'ar'` renders an Arabic span. */
export type Inline = {
	text: string;
	bold?: boolean;
	italic?: boolean;
	code?: boolean;
	lang?: 'ar';
	/** Only http(s) links are kept; anything else is dropped to plain text by the importer. */
	href?: string;
};

export type CalloutKind =
	'rule' | 'note' | 'tip' | 'warning' | 'mistake' | 'example' | 'quiz' | 'compare' | 'letters';

export type Block =
	| { type: 'heading'; level: 2 | 3 | 4; inlines: Inline[] }
	| { type: 'paragraph'; inlines: Inline[] }
	| { type: 'list'; ordered: boolean; items: Inline[][] }
	| { type: 'table'; header: Inline[][]; rows: Inline[][][] }
	| { type: 'quote'; blocks: Block[] }
	/** Display Arabic: Qur'anic verse, hadith, or another standalone Arabic line. */
	| { type: 'arabic'; variant: 'ayat' | 'hadits' | 'plain'; text: string; reference?: string }
	| { type: 'callout'; kind: CalloutKind; title?: string; blocks: Block[] };

export type LocalLessonMeta = {
	id: string;
	/** URL segment, unique within its track. */
	slug: string;
	title: string;
	order: number;
	minutes?: number;
	/** Optional grouping label inside a track (e.g. a tajweed unit). */
	group?: string;
};

export type LocalTrack = {
	id: string;
	/** URL segment, unique across all sources. */
	slug: string;
	source: LocalSourceId;
	title: string;
	description: string;
	lang: ContentLang;
	lessons: LocalLessonMeta[];
};

export type LocalLesson = LocalLessonMeta & {
	source: LocalSourceId;
	trackId: string;
	lang: ContentLang;
	subtitle?: string;
	blocks: Block[];
	/** Path of the original file inside the source repo, for provenance. */
	origin: string;
};

export type LocalVocabItem = {
	id: string;
	arabic: string;
	meaning: string;
	plural?: string;
};

export type LocalVocabSetMeta = {
	id: string;
	slug: string;
	title: string;
	order: number;
	itemCount: number;
};

export type LocalVocabSet = LocalVocabSetMeta & {
	source: LocalSourceId;
	/** Language of `meaning` (arabic-vocab gives English, not Indonesian). */
	meaningLang: ContentLang;
	items: LocalVocabItem[];
	origin: string;
	/** Known data-quality caveats, shown above the list (e.g. OCR errors, missing harakat). */
	caveats?: string[];
};

export type LocalTableColumn = {
	key: string;
	label: string;
	lang: ContentLang;
	hideable?: boolean;
};

export type LocalTableMeta = { id: string; slug: string; title: string; order: number };

export type LocalTable = LocalTableMeta & {
	source: LocalSourceId;
	caption: string;
	columns: LocalTableColumn[];
	rows: { id: string; cells: Record<string, string>; explanation?: string }[];
	origin: string;
};

/** `content-local/<source>/index.json`: everything except bodies (loaded eagerly). */
export type LocalSourceIndex = {
	schemaVersion: 1;
	source: LocalSource;
	tracks: LocalTrack[];
	vocabSets: LocalVocabSetMeta[];
	tables: LocalTableMeta[];
};
