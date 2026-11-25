/**
 * `bun run content:import [--source <id>] [--out <dir>]`
 *
 * Converts the cloned source repos (`~/git/arabic-curriculum-sources/`, or
 * `ARABIC_SOURCES_DIR`) into the gitignored `content-local/` folder for personal study.
 * Each run wipes and rewrites the chosen sources' folders, then prints counts.
 * Plan: docs/plans/local-content-import.md.
 */
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { LocalSourceId } from '../../src/lib/domain/local-content/types.js';
import {
	SOURCE_IDS,
	SOURCES,
	sourcesRoot,
	summarise,
	writeSource,
	type ImportResult
} from './common.js';
import { importSource as importArabicGrammar } from './arabic-grammar.js';
import { importSource as importArabicVocab } from './arabic-vocab.js';
import { importSource as importCahayaTauhid } from './cahaya-tauhid.js';
import { importSource as importLearnTajweed } from './learn-tajweed.js';

const IMPORTERS: Record<LocalSourceId, (root: string) => ImportResult> = {
	'cahaya-tauhid': importCahayaTauhid,
	'learn-tajweed': importLearnTajweed,
	'arabic-grammar': importArabicGrammar,
	'arabic-vocab': importArabicVocab
};

function parseArgs(argv: string[]): { sources: LocalSourceId[]; out: string } {
	let only: string | undefined;
	let out = resolve(fileURLToPath(new URL('../../content-local', import.meta.url)));
	for (let i = 0; i < argv.length; i++) {
		if (argv[i] === '--source') only = argv[++i];
		else if (argv[i] === '--out') out = resolve(argv[++i] ?? '');
		else throw new Error(`unknown argument: ${argv[i]}`);
	}
	if (only !== undefined && !(SOURCE_IDS as readonly string[]).includes(only)) {
		throw new Error(`unknown source "${only}". Choose one of: ${SOURCE_IDS.join(', ')}`);
	}
	return { sources: only ? [only as LocalSourceId] : [...SOURCE_IDS], out };
}

function main(): void {
	const { sources, out } = parseArgs(process.argv.slice(2));
	const root = sourcesRoot();
	console.log(`sources: ${root}\noutput:  ${out}\n`);
	let failed = false;
	for (const id of sources) {
		const dir = join(root, id);
		if (!existsSync(dir)) {
			console.error(`${id}: skipped, ${dir} does not exist`);
			failed = true;
			continue;
		}
		try {
			const result = IMPORTERS[id](dir);
			if (result.index.source.commit !== SOURCES[id].pinnedCommit) {
				console.warn(
					`${id}: clone is at ${result.index.source.commit.slice(0, 9)}, not the pinned ${SOURCES[id].pinnedCommit.slice(0, 9)}`
				);
			}
			writeSource(out, result);
			const counts = Object.entries(summarise(result))
				.filter(([, n]) => n > 0)
				.map(([k, n]) => `${k} ${n}`)
				.join(', ');
			console.log(`${id}: ${counts}`);
		} catch (error) {
			failed = true;
			console.error(`${id}: FAILED, ${error instanceof Error ? error.message : String(error)}`);
		}
	}
	if (failed) process.exitCode = 1;
}

main();
