import { createHash } from 'node:crypto';
import { CATALOG_SCHEMA, type CatalogContent, type CatalogManifest } from '#lib/catalog/types.js';
import { lessonsFor } from '#lib/content/lessons/index.js';
import { referenceTables } from '#lib/content/reference.js';
import { publishedVocabulary } from '#lib/content/vocabulary.js';

function publicRecord<T extends { reviews?: unknown }>(source: T): Omit<T, 'reviews'> {
	const record = { ...source };
	delete record.reviews;
	return record;
}

const content: CatalogContent = {
	lessons: [...lessonsFor('belajar'), ...lessonsFor('iqra')].map(publicRecord),
	vocabulary: [...publishedVocabulary('harian'), ...publishedVocabulary('quran')].map(publicRecord),
	references: referenceTables.map(publicRecord)
};

const version = createHash('sha256')
	.update(JSON.stringify({ schemaVersion: CATALOG_SCHEMA, ...content }))
	.digest('hex');
export const catalogJson = JSON.stringify({ schemaVersion: CATALOG_SCHEMA, version, ...content });
export const catalogManifest: CatalogManifest = {
	schemaVersion: CATALOG_SCHEMA,
	version,
	bytes: Buffer.byteLength(catalogJson)
};
