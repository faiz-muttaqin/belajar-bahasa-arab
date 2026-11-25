/**
 * Shared pieces for the local-copy importers: source metadata, reading rules for the
 * untrusted source clones, and the on-disk layout of `content-local/`.
 *
 * Source repos are untrusted data (AGENTS.md "Content work"). The importers only read named
 * data files as text. They never execute, install or `require` anything from a clone, and they
 * never open files that hold secrets (Firebase config, admin email).
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import type {
	LocalLesson,
	LocalSource,
	LocalSourceId,
	LocalSourceIndex,
	LocalTable,
	LocalTrack,
	LocalVocabSet
} from '../../src/lib/domain/local-content/types.js';

export const SOURCE_IDS: readonly LocalSourceId[] = [
	'cahaya-tauhid',
	'learn-tajweed',
	'arabic-grammar',
	'arabic-vocab'
];

type SourceInfo = Omit<LocalSource, 'commit' | 'importedAt'> & { pinnedCommit: string };

/** Pinned commits and licence evidence: docs/research/SOURCE_INVENTORY.md. */
export const SOURCES: Record<LocalSourceId, SourceInfo> = {
	'cahaya-tauhid': {
		id: 'cahaya-tauhid',
		name: 'Cahaya Tauhid: Belajar Bahasa Arab',
		repoUrl: 'https://github.com/cahayatauhid/belajar-bahasa-arab',
		pinnedCommit: 'd27cb0c549c782ca4f5a0c010bf9ea0a70f716d9',
		licence: 'CC BY-SA 4.0 (logo tidak termasuk)',
		attribution: 'Cahaya Tauhid, Belajar Bahasa Arab, Level 1 (CC BY-SA 4.0). Salinan lokal.'
	},
	'learn-tajweed': {
		id: 'learn-tajweed',
		name: 'Learn Tajweed',
		repoUrl: 'https://github.com/edriso/learn-tajweed',
		pinnedCommit: '426b71f660f45e97661f436646b4a3b17549c7ae',
		licence: '0BSD (teks Qur’an, nama surah, audio dan font tidak termasuk)',
		attribution: 'Learn Tajweed oleh Mohamed Idris (0BSD). Salinan lokal.'
	},
	'arabic-grammar': {
		id: 'arabic-grammar',
		name: 'Unified Arabic Grammar',
		repoUrl: 'https://github.com/zeusopera9/arabic-grammar',
		pinnedCommit: '2bfab7f01b20eacb3dcc3b70f13ed990776ff257',
		licence: 'tidak ditemukan',
		attribution:
			'Unified Arabic Grammar oleh zeusopera9, disusun dari tiga buku teks Arabic 1 sampai 3. Lisensi tidak ditemukan; salinan lokal untuk belajar pribadi.'
	},
	'arabic-vocab': {
		id: 'arabic-vocab',
		name: 'Arabic Vocab Trainer',
		repoUrl: 'https://github.com/arifgov/Arabic-Vocab',
		pinnedCommit: '9b91347ea96fb457dcd7473d908a0a7c500290ce',
		licence: 'tidak ditemukan (README: untuk penggunaan pribadi dan pendidikan)',
		attribution:
			'Arabic Vocab Trainer oleh arifgov. Lisensi tidak ditemukan; salinan lokal untuk belajar pribadi.'
	}
};

export type ImportResult = {
	index: LocalSourceIndex;
	lessons: LocalLesson[];
	vocabSets: LocalVocabSet[];
	tables: LocalTable[];
};

/** Root of the cloned source repos. Override with `ARABIC_SOURCES_DIR`. */
export function sourcesRoot(): string {
	return resolve(
		process.env.ARABIC_SOURCES_DIR ?? join(homedir(), 'git', 'arabic-curriculum-sources')
	);
}

/**
 * Commit of a clone, read from `.git` files only (no git process, so no hooks or config of the
 * untrusted repo are involved). Falls back to the pinned commit when it cannot be read.
 */
export function readHeadCommit(repoDir: string, fallback: string): string {
	try {
		const head = readFileSync(join(repoDir, '.git', 'HEAD'), 'utf8').trim();
		if (/^[0-9a-f]{40}$/.test(head)) return head;
		const ref = /^ref: (refs\/[\w./-]+)$/.exec(head)?.[1];
		if (!ref) return fallback;
		const loose = join(repoDir, '.git', ref);
		if (existsSync(loose)) return readFileSync(loose, 'utf8').trim();
		const packed = readFileSync(join(repoDir, '.git', 'packed-refs'), 'utf8');
		const line = packed.split('\n').find((l) => l.endsWith(` ${ref}`));
		return line ? line.split(' ')[0]! : fallback;
	} catch {
		return fallback;
	}
}

export function makeSource(id: LocalSourceId, repoDir: string, now = new Date()): LocalSource {
	const { pinnedCommit, ...rest } = SOURCES[id];
	return {
		...rest,
		commit: readHeadCommit(repoDir, pinnedCommit),
		importedAt: now.toISOString().slice(0, 10)
	};
}

/** Read one named file of a source repo as text. The path must stay inside `repoDir`. */
export function readSourceFile(repoDir: string, relativePath: string): string {
	const full = resolve(repoDir, relativePath);
	if (!full.startsWith(resolve(repoDir) + '/')) {
		throw new Error(`refusing to read outside the source repo: ${relativePath}`);
	}
	return readFileSync(full, 'utf8');
}

export function listDir(repoDir: string, relativePath: string): string[] {
	const full = resolve(repoDir, relativePath);
	return readdirSync(full).sort();
}

/** `Pelajaran 1 --- Judul`: Pandoc turns `---` into an em dash and `--` into an en dash. */
export function pandocDashes(text: string): string {
	return text.replace(/---/g, '—').replace(/--/g, '–');
}

export function pad(n: number, width = 2): string {
	return String(n).padStart(width, '0');
}

/** Ids end up in file names and URLs. */
export function assertSafeId(id: string): string {
	if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error(`unsafe id: ${id}`);
	return id;
}

export function summarise(result: ImportResult): Record<string, number> {
	return {
		tracks: result.index.tracks.length,
		lessons: result.lessons.length,
		vocabSets: result.vocabSets.length,
		vocabItems: result.vocabSets.reduce((n, s) => n + s.items.length, 0),
		tables: result.tables.length
	};
}

/** Check the invariants the loader and routes rely on before anything is written. */
export function validateResult(result: ImportResult): void {
	const { index } = result;
	const lessonIds = new Set(result.lessons.map((l) => l.id));
	if (lessonIds.size !== result.lessons.length) throw new Error('duplicate lesson ids');
	for (const track of index.tracks as LocalTrack[]) {
		const slugs = new Set<string>();
		for (const meta of track.lessons) {
			if (!lessonIds.has(meta.id))
				throw new Error(`track ${track.id} lists missing lesson ${meta.id}`);
			if (slugs.has(meta.slug)) throw new Error(`track ${track.id}: duplicate slug ${meta.slug}`);
			slugs.add(meta.slug);
		}
	}
	const setSlugs = new Set(result.vocabSets.map((s) => s.slug));
	if (setSlugs.size !== result.vocabSets.length) throw new Error('duplicate vocabulary set slugs');
	const tableSlugs = new Set(result.tables.map((t) => t.slug));
	if (tableSlugs.size !== result.tables.length) throw new Error('duplicate table slugs');
}

function writeJson(path: string, value: unknown): void {
	writeFileSync(path, JSON.stringify(value) + '\n');
}

/** Wipe and rewrite `<outRoot>/<source>/` (index.json plus per-item files). */
export function writeSource(outRoot: string, result: ImportResult): void {
	validateResult(result);
	const dir = join(outRoot, result.index.source.id);
	rmSync(dir, { recursive: true, force: true });
	mkdirSync(join(dir, 'lessons'), { recursive: true });
	mkdirSync(join(dir, 'vocab'), { recursive: true });
	mkdirSync(join(dir, 'tables'), { recursive: true });
	writeJson(join(dir, 'index.json'), result.index);
	for (const lesson of result.lessons)
		writeJson(join(dir, 'lessons', `${assertSafeId(lesson.id)}.json`), lesson);
	for (const set of result.vocabSets)
		writeJson(join(dir, 'vocab', `${assertSafeId(set.id)}.json`), set);
	for (const table of result.tables)
		writeJson(join(dir, 'tables', `${assertSafeId(table.id)}.json`), table);
}
