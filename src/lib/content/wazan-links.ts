import { babInfos } from '#lib/domain/sharaf/wiktionary-verbs.js';

/**
 * Where a G-02 example sits in the 22-group wazan reference at `/rujukan/fiil/kata-kerja/<slug>/`.
 * `bab` is the group number used by the dictionary data (0 means the data has not classified it).
 * The verb row on the group page has the anchor `kata-kerja-bab-<slug>-<dataId>`.
 */
export type WazanLink = {
	bab: number;
	title: string;
	madhi: string;
	mudhari: string;
	/** Path for `resolve()`, with a trailing slash. */
	path: string;
	/** Element ID of the verb row on that page (not URL-encoded). */
	anchor: string;
};

export function wazanLink(bab: number, dataId: string): WazanLink {
	const info = babInfos.find((item) => item.bab === bab);
	if (!info) throw new Error(`Unknown wazan group: ${bab}`);
	return {
		bab,
		title: info.title,
		madhi: info.madhi,
		mudhari: info.mudhari,
		path: `rujukan/fiil/kata-kerja/${info.slug}/`,
		anchor: `kata-kerja-bab-${info.slug}-${dataId}`
	};
}

/** Fragment for the verb row; Arabic letters in the ID are percent-encoded. */
export function wazanHash(link: WazanLink): string {
	return `#${encodeURIComponent(link.anchor)}`;
}
