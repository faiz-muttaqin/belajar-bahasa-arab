/** Learning evidence is deliberately separate from lesson completion and manually marked position. */
export type EvidenceSkill = 'decoding' | 'meaning' | 'structure' | 'listening' | 'recall';
export type EvidenceOutcome = 'correct' | 'incorrect' | 'dont_know';
export type EvidenceItem = {
	id: string;
	lessonId: string;
	competencyIds: readonly string[];
	skill: EvidenceSkill;
	/** A transfer candidate is only novel on the first answer; never store a novelty flag on an attempt. */
	kind: 'guided' | 'transfer' | 'self-assessment';
};
export type LearningAttempt = {
	id: string;
	itemId: string;
	lessonId: string;
	contentRevision: number;
	competencyIds: string[];
	skill: EvidenceSkill;
	outcome: EvidenceOutcome;
	assisted: boolean;
	selfAssessed: boolean;
	seenWhileAuthoring: boolean;
	at: number;
};
export type UnderstandingLevel = 0 | 1 | 2 | 3;
export const levelLabels = {
	0: 'Belum ada bukti',
	1: 'Mengenal',
	2: 'Paham pada contoh',
	3: 'Bisa pada contoh baru'
} as const satisfies Record<UnderstandingLevel, string>;

const positive = (value: unknown) =>
	typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
const stableId = (value: unknown): value is string =>
	typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const skills: readonly string[] = ['decoding', 'meaning', 'structure', 'listening', 'recall'];
const outcomes: readonly string[] = ['correct', 'incorrect', 'dont_know'];

export function isLearningAttempt(value: unknown): value is LearningAttempt {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
	const attempt = value as Record<string, unknown>;
	return (
		stableId(attempt.id) &&
		stableId(attempt.itemId) &&
		stableId(attempt.lessonId) &&
		positive(attempt.contentRevision) &&
		positive(attempt.at) &&
		Array.isArray(attempt.competencyIds) &&
		attempt.competencyIds.length > 0 &&
		attempt.competencyIds.every(
			(id: unknown) => typeof id === 'string' && /^[A-Z]{2}-[0-9]{2}$/.test(id)
		) &&
		new Set(attempt.competencyIds).size === attempt.competencyIds.length &&
		typeof attempt.skill === 'string' &&
		skills.includes(attempt.skill) &&
		typeof attempt.outcome === 'string' &&
		outcomes.includes(attempt.outcome) &&
		typeof attempt.assisted === 'boolean' &&
		typeof attempt.selfAssessed === 'boolean' &&
		typeof attempt.seenWhileAuthoring === 'boolean'
	);
}

/** Identical attempt IDs are idempotent. Conflicting IDs must never silently replace evidence. */
export function mergeAttempts(records: readonly LearningAttempt[]): LearningAttempt[] {
	const byId = new Map<string, LearningAttempt>();
	for (const record of records) {
		if (!isLearningAttempt(record)) throw new Error('Catatan jawaban tidak valid.');
		const current = byId.get(record.id);
		if (current && JSON.stringify(current) !== JSON.stringify(record))
			throw new Error('ID jawaban sama memiliki isi berbeda.');
		byId.set(record.id, record);
	}
	return [...byId.values()].sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
}

/** Only published, still-addressable items can produce evidence; retired items remain in backups. */
export function isEligibleAttempt(attempt: LearningAttempt, item: EvidenceItem | undefined) {
	return !!(
		item &&
		attempt.itemId === item.id &&
		attempt.lessonId === item.lessonId &&
		attempt.skill === item.skill &&
		attempt.selfAssessed === (item.kind === 'self-assessment') &&
		attempt.competencyIds.length === item.competencyIds.length &&
		attempt.competencyIds.every((id) => item.competencyIds.includes(id))
	);
}

export type CompetencyUnderstanding = {
	level: UnderstandingLevel;
	hasPractice: boolean;
	hasAttempts: boolean;
	selfAssessed: boolean;
};

/**
 * Levels are initial product thresholds, not validated language-proficiency ratings.
 * Multiple answers to the same item never create new-example evidence. Assisted and
 * self-assessed responses cannot claim transfer; recall never grants levels 2 or 3.
 * An unassisted wrong answer on a different item lowers one step, never by elapsed time.
 */
export function competencyUnderstanding(
	competencyId: string,
	attempts: readonly LearningAttempt[],
	items: readonly EvidenceItem[]
): CompetencyUnderstanding {
	const byId = new Map(items.map((item) => [item.id, item]));
	const hasPractice = items.some((item) => item.competencyIds.includes(competencyId));
	const ordered = [...attempts].sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
	const seen = new Set<string>();
	const penalized = new Set<string>();
	let level: UnderstandingLevel = 0;
	let sourceItemId: string | undefined;
	let sourceIsSelfAssessed = false;
	let hasAttempts = false;
	for (const attempt of ordered) {
		const item = byId.get(attempt.itemId);
		if (!isEligibleAttempt(attempt, item)) continue;
		const firstAnswer = !seen.has(attempt.itemId);
		seen.add(attempt.itemId);
		if (!item?.competencyIds.includes(competencyId)) continue;
		hasAttempts = true;
		if (attempt.outcome === 'incorrect' || attempt.outcome === 'dont_know') {
			if (
				attempt.outcome === 'incorrect' &&
				!attempt.assisted &&
				!attempt.selfAssessed &&
				level > 1 &&
				attempt.itemId !== sourceItemId &&
				!penalized.has(attempt.itemId)
			) {
				level = (level - 1) as UnderstandingLevel;
				penalized.add(attempt.itemId);
				sourceIsSelfAssessed = false;
			} else if (level === 0) level = 1;
			continue;
		}
		let candidate: UnderstandingLevel = 1;
		if (attempt.selfAssessed) {
			candidate = 2;
		} else if (!attempt.assisted && attempt.skill !== 'recall') {
			candidate = item.kind === 'transfer' && firstAnswer && !attempt.seenWhileAuthoring ? 3 : 2;
		}
		if (candidate >= level) {
			level = candidate;
			sourceItemId = attempt.itemId;
			sourceIsSelfAssessed = attempt.selfAssessed;
		}
	}
	return { level, hasPractice, hasAttempts, selfAssessed: sourceIsSelfAssessed };
}

export function summarizeEvidence(
	competencyIds: readonly string[],
	attempts: readonly LearningAttempt[],
	items: readonly EvidenceItem[]
) {
	const unique = [...new Set(competencyIds)];
	const counts: Record<UnderstandingLevel, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
	for (const id of unique) counts[competencyUnderstanding(id, attempts, items).level]++;
	return { total: unique.length, counts };
}
