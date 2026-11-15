import { competencyUnderstanding, levelLabels, type EvidenceItem, type LearningAttempt } from '#lib/domain/roadmap/evidence.js';
import { notifyProgress } from './browser.svelte.js';
import { readProgressSnapshot, requestPersistentStorage, saveAttempt } from './storage.js';

export type AnswerInput = Omit<LearningAttempt, 'id' | 'at'>;

/** Records only an explicit learner action. Never called on lesson open, mark done, or reveal. */
export async function recordLearningAnswer(input: AnswerInput, item: EvidenceItem) {
	const previous = await readProgressSnapshot();
	const attempt: LearningAttempt = { ...input, id: crypto.randomUUID(), at: Date.now() };
	const { firstAnswer } = await saveAttempt(attempt);
	const current = await readProgressSnapshot();
	notifyProgress();
	if (firstAnswer) void requestPersistentStorage();
	const changes = input.competencyIds.map((competencyId) => {
		const before = competencyUnderstanding(competencyId, previous.attempts, [item]);
		const after = competencyUnderstanding(competencyId, current.attempts, [item]);
		return {
			competencyId,
			before: before.level,
			after: after.level,
			change: after.level > before.level ? 'up' : after.level < before.level ? 'down' : 'same',
			label: levelLabels[after.level]
		};
	});
	return { attempt, changes };
}
