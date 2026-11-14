import type { Lesson } from '#lib/content/lessons/types.js';
import type { ReferenceTableData } from '#lib/domain/reference/table.js';
import { isSharafEntries, type SharafEntry } from '#lib/domain/sharaf/lexicon.js';
import type { VocabularyItem } from '#lib/domain/vocabulary/types.js';

export const CATALOG_SCHEMA = 1;
export const MANIFEST_PATH = 'data/manifest.json';
export const CATALOG_PATH = 'data/materi.json';

export type CatalogContent = {
	lessons: Omit<Lesson, 'reviews'>[];
	vocabulary: Omit<VocabularyItem, 'reviews'>[];
	references: Omit<ReferenceTableData, 'reviews'>[];
	sharaf?: readonly SharafEntry[];
};

export type CatalogVersion = {
	schemaVersion: typeof CATALOG_SCHEMA;
	version: string;
};

export type Catalog = CatalogVersion & CatalogContent;
export type CatalogManifest = CatalogVersion & { bytes: number };

function hasVersion(value: unknown): value is CatalogVersion {
	return (
		value !== null &&
		typeof value === 'object' &&
		'schemaVersion' in value &&
		value.schemaVersion === CATALOG_SCHEMA &&
		'version' in value &&
		typeof value.version === 'string' &&
		/^[a-f0-9]{64}$/.test(value.version)
	);
}

export function isCatalog(value: unknown): value is Catalog {
	return (
		hasVersion(value) &&
		'lessons' in value &&
		Array.isArray(value.lessons) &&
		'vocabulary' in value &&
		Array.isArray(value.vocabulary) &&
		'references' in value &&
		Array.isArray(value.references) &&
		(!('sharaf' in value) || isSharafEntries(value.sharaf))
	);
}

export function isCatalogManifest(value: unknown): value is CatalogManifest {
	return (
		hasVersion(value) &&
		'bytes' in value &&
		typeof value.bytes === 'number' &&
		Number.isSafeInteger(value.bytes) &&
		value.bytes > 0
	);
}
