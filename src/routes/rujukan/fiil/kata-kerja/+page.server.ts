import { loadRecall, loadVerbs } from '#lib/content/wiktionary-verbs.server.js';
import { babInfos } from '#lib/domain/sharaf/wiktionary-verbs.js';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = () => {
	const { verbs } = loadVerbs();
	const recall = loadRecall();
	return {
		babs: babInfos.map((info) => ({
			...info,
			count: verbs.filter((v) => v.bab === info.bab).length,
			recallCount: recall.filter((v) => v.bab === info.bab).length
		}))
	};
};
