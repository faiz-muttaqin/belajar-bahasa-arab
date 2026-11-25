/**
 * Importer: Cahaya Tauhid (Pandoc Markdown, Indonesian).
 * Reads `textbook/pelajaran-NN/index.md` and `workbook/pelajaran-NN/index.md` only. PDFs, the
 * logo, `_build/`, `docs/` and slides are never opened.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type {
	LocalLesson,
	LocalLessonMeta,
	LocalTrack
} from '../../src/lib/domain/local-content/types.js';
import {
	listDir,
	makeSource,
	pad,
	pandocDashes,
	readSourceFile,
	type ImportResult
} from './common.js';
import { markdownToBlocks } from './markdown.js';
import { splitFrontMatter } from './yaml-lite.js';

const TRACKS = [
	{
		dir: 'textbook',
		id: 'cahaya-buku',
		title: 'Cahaya Tauhid: buku pelajaran',
		description: 'Level 1, 34 pelajaran nahwu dan sharaf berbahasa Indonesia.'
	},
	{
		dir: 'workbook',
		id: 'cahaya-latihan',
		title: 'Cahaya Tauhid: buku latihan',
		description: 'Latihan untuk setiap pelajaran Level 1, berbahasa Indonesia.'
	}
] as const;

/** Convert one lesson file. Pure: no file access, so tests can feed synthetic text. */
export function convertLesson(
	text: string,
	ctx: { trackId: string; slug: string; order: number; origin: string }
): LocalLesson {
	const { data, body } = splitFrontMatter(text);
	const title = pandocDashes(typeof data.title === 'string' ? data.title : ctx.slug);
	return {
		id: `${ctx.trackId}-${pad(ctx.order)}`,
		slug: ctx.slug,
		title,
		order: ctx.order,
		source: 'cahaya-tauhid',
		trackId: ctx.trackId,
		lang: 'id',
		blocks: markdownToBlocks(body, { cahaya: true }),
		origin: ctx.origin
	};
}

export function importSource(root: string, options: { now?: Date } = {}): ImportResult {
	const lessons: LocalLesson[] = [];
	const tracks: LocalTrack[] = [];
	for (const track of TRACKS) {
		const metas: LocalLessonMeta[] = [];
		if (!existsSync(join(root, track.dir))) continue;
		for (const entry of listDir(root, track.dir)) {
			const m = /^pelajaran-(\d+)$/.exec(entry);
			if (!m) continue;
			const file = `${track.dir}/${entry}/index.md`;
			if (!existsSync(join(root, file))) continue;
			const order = Number(m[1]);
			const lesson = convertLesson(readSourceFile(root, file), {
				trackId: track.id,
				slug: entry,
				order,
				origin: file
			});
			lessons.push(lesson);
			metas.push({ id: lesson.id, slug: lesson.slug, title: lesson.title, order });
		}
		metas.sort((a, b) => a.order - b.order);
		tracks.push({
			id: track.id,
			slug: track.id,
			source: 'cahaya-tauhid',
			title: track.title,
			description: track.description,
			lang: 'id',
			lessons: metas
		});
	}
	return {
		index: {
			schemaVersion: 1,
			source: makeSource('cahaya-tauhid', root, options.now),
			tracks,
			vocabSets: [],
			tables: []
		},
		lessons,
		vocabSets: [],
		tables: []
	};
}
